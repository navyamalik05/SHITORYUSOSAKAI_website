from flask import Flask, render_template, request, jsonify, send_file, send_from_directory, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import inspect, text
from datetime import datetime
from email.message import EmailMessage
from functools import wraps
from io import BytesIO
import re
import secrets
import smtplib
import ssl
import os
from urllib.parse import urlparse
from werkzeug.utils import secure_filename

# Initialize Flask without its automatic static route. The catch-all route
# below serves real files from the React build and falls back to index.html
# for client-side routes such as /programs and /members.
DIST_DIR = os.path.join(os.path.dirname(__file__), 'frontend', 'dist')
app = Flask(__name__)
CORS(app)

# Configuration
database_url = os.environ.get('DATABASE_URL', 'sqlite:///database.db')
if database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or os.urandom(32)
app.config['MAX_CONTENT_LENGTH'] = 80 * 1024 * 1024
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = bool(os.environ.get('RENDER'))

ALLOWED_ADMIN_EMAILS = {
    'malikna1@msu.edu',
    'donadoto@msu.edu',
    'hanshi18@gmail.com',
}

ALLOWED_MEDIA_TYPES = {
    'image/jpeg': 'image',
    'image/png': 'image',
    'image/webp': 'image',
    'image/gif': 'image',
    'application/pdf': 'pdf',
    'video/mp4': 'video',
    'video/webm': 'video',
    'video/quicktime': 'video',
}

# Initialize database
db = SQLAlchemy(app)

# ============================================
# DATABASE MODELS
# ============================================

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age_group = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    days = db.Column(db.String(100))
    time = db.Column(db.String(50))
    price = db.Column(db.String(50))
    instructor = db.Column(db.String(100))
    image = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age_group': self.age_group,
            'description': self.description,
            'days': self.days,
            'time': self.time,
            'price': self.price,
            'instructor': self.instructor,
            'image': self.image
        }


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'message': self.message,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'))
    belt_level = db.Column(db.String(50), default="White")
    joined_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default="Active")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'program_id': self.program_id,
            'belt_level': self.belt_level,
            'status': self.status
        }


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    subtitle = db.Column(db.String(300))
    description = db.Column(db.Text)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200))
    image = db.Column(db.String(200))
    youtube_url = db.Column(db.String(500))
    external_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    media = db.relationship('EventMedia', backref='event', cascade='all, delete-orphan', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'subtitle': self.subtitle,
            'description': self.description,
            'date': self.date.strftime('%Y-%m-%d %H:%M:%S'),
            'location': self.location,
            'image': self.image,
            'youtube_url': self.youtube_url,
            'external_url': self.external_url,
            'media': [item.to_dict() for item in self.media]
        }


class EventMedia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False, index=True)
    filename = db.Column(db.String(255), nullable=False)
    mime_type = db.Column(db.String(100), nullable=False)
    media_type = db.Column(db.String(20), nullable=False)
    data = db.Column(db.LargeBinary, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'mime_type': self.mime_type,
            'media_type': self.media_type,
            'url': f'/api/event-media/{self.id}'
        }


# ============================================
# API ENDPOINTS (used by the React frontend)
# ============================================

def admin_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if session.get('admin_email') not in ALLOWED_ADMIN_EMAILS:
            return jsonify({'error': 'Administrator login required'}), 401
        return view(*args, **kwargs)
    return wrapped


def clean_text(value, limit):
    return str(value or '').strip()[:limit]


def clean_url(value):
    url = clean_text(value, 500)
    if not url:
        return ''
    parsed = urlparse(url)
    if parsed.scheme not in {'http', 'https'} or not parsed.netloc:
        raise ValueError('Links must begin with http:// or https://')
    return url


def update_event_from_form(event):
    title = clean_text(request.form.get('title'), 200)
    event_date = clean_text(request.form.get('date'), 40)
    if not title or not event_date:
        raise ValueError('Title and event date are required')

    try:
        parsed_date = datetime.fromisoformat(event_date.replace('Z', '+00:00'))
        if parsed_date.tzinfo:
            parsed_date = parsed_date.replace(tzinfo=None)
    except ValueError as error:
        raise ValueError('Please enter a valid event date and time') from error

    event.title = title
    event.subtitle = clean_text(request.form.get('subtitle'), 300)
    event.description = clean_text(request.form.get('description'), 10000)
    event.date = parsed_date
    event.location = clean_text(request.form.get('location'), 200)
    event.youtube_url = clean_url(request.form.get('youtube_url'))
    event.external_url = clean_url(request.form.get('external_url'))


def attach_event_media(event):
    for uploaded_file in request.files.getlist('media'):
        if not uploaded_file or not uploaded_file.filename:
            continue
        mime_type = uploaded_file.mimetype or ''
        media_type = ALLOWED_MEDIA_TYPES.get(mime_type)
        if not media_type:
            raise ValueError(f'Unsupported file type: {uploaded_file.filename}')

        file_data = uploaded_file.read()
        max_size = 50 * 1024 * 1024 if media_type == 'video' else 15 * 1024 * 1024
        if len(file_data) > max_size:
            raise ValueError(f'{uploaded_file.filename} is too large')

        event.media.append(EventMedia(
            filename=secure_filename(uploaded_file.filename) or f'{media_type}-upload',
            mime_type=mime_type,
            media_type=media_type,
            data=file_data,
        ))


@app.route('/api/admin/session', methods=['GET'])
def admin_session_status():
    email = session.get('admin_email')
    return jsonify({'authenticated': email in ALLOWED_ADMIN_EMAILS, 'email': email if email in ALLOWED_ADMIN_EMAILS else None})


@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json(silent=True) or {}
    email = clean_text(data.get('email'), 120).lower()
    password = str(data.get('password') or '')
    configured_password = os.environ.get('ADMIN_SHARED_PASSWORD')

    if not configured_password:
        return jsonify({'error': 'Admin login is not configured yet'}), 503
    if email not in ALLOWED_ADMIN_EMAILS or not secrets.compare_digest(password, configured_password):
        return jsonify({'error': 'Invalid email or password'}), 401

    session.clear()
    session['admin_email'] = email
    return jsonify({'authenticated': True, 'email': email})


@app.route('/api/admin/logout', methods=['POST'])
def admin_logout():
    session.clear()
    return jsonify({'authenticated': False})

@app.route('/api/programs', methods=['GET'])
def get_programs():
    programs = Program.query.all()
    return jsonify([p.to_dict() for p in programs])


@app.route('/api/programs/<int:id>', methods=['GET'])
def get_program(id):
    program = Program.query.get(id)
    if not program:
        return jsonify({'error': 'Program not found'}), 404
    return jsonify(program.to_dict())


@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.order_by(Event.date).all()
    return jsonify([e.to_dict() for e in events])


@app.route('/api/event-media/<int:media_id>', methods=['GET'])
def get_event_media(media_id):
    media = db.session.get(EventMedia, media_id)
    if not media:
        return jsonify({'error': 'Media not found'}), 404
    return send_file(
        BytesIO(media.data),
        mimetype=media.mime_type,
        download_name=media.filename,
        as_attachment=request.args.get('download') == '1',
        max_age=86400,
    )


@app.route('/api/admin/events', methods=['POST'])
@admin_required
def create_event():
    event = Event(title='', date=datetime.utcnow())
    try:
        update_event_from_form(event)
        attach_event_media(event)
        db.session.add(event)
        db.session.commit()
        return jsonify(event.to_dict()), 201
    except ValueError as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    except Exception:
        db.session.rollback()
        app.logger.exception('Event creation failed')
        return jsonify({'error': 'The event could not be saved'}), 500


@app.route('/api/admin/events/<int:event_id>', methods=['PUT', 'DELETE'])
@admin_required
def manage_event(event_id):
    event = db.session.get(Event, event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    if request.method == 'DELETE':
        db.session.delete(event)
        db.session.commit()
        return jsonify({'deleted': True})

    try:
        update_event_from_form(event)
        attach_event_media(event)
        db.session.commit()
        return jsonify(event.to_dict())
    except ValueError as error:
        db.session.rollback()
        return jsonify({'error': str(error)}), 400
    except Exception:
        db.session.rollback()
        app.logger.exception('Event update failed')
        return jsonify({'error': 'The event could not be updated'}), 500


@app.route('/api/admin/event-media/<int:media_id>', methods=['DELETE'])
@admin_required
def delete_event_media(media_id):
    media = db.session.get(EventMedia, media_id)
    if not media:
        return jsonify({'error': 'Media not found'}), 404
    db.session.delete(media)
    db.session.commit()
    return jsonify({'deleted': True})


@app.route('/api/contact', methods=['POST'])
def create_contact():
    data = request.get_json(silent=True) or {}

    if not all([data.get('name'), data.get('email'), data.get('message')]):
        return jsonify({'error': 'Missing required fields'}), 400

    name = re.sub(r'[\r\n]+', ' ', data['name'].strip())
    sender_email = data['email'].strip()
    phone = (data.get('phone') or '').strip()
    message_text = data['message'].strip()

    if not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', sender_email):
        return jsonify({'error': 'Please enter a valid email address'}), 400

    if len(name) > 100 or len(sender_email) > 120 or len(phone) > 30 or len(message_text) > 5000:
        return jsonify({'error': 'One or more fields are too long'}), 400

    smtp_username = os.environ.get('SMTP_USERNAME')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    recipient = os.environ.get('CONTACT_RECIPIENT', 'hanshi18@gmail.com')

    if not smtp_username or not smtp_password:
        return jsonify({'error': 'Email delivery is not configured yet. Please email hanshi18@gmail.com directly.'}), 503

    email_message = EmailMessage()
    email_message['Subject'] = f'Website contact from {name}'
    email_message['From'] = smtp_username
    email_message['To'] = recipient
    email_message['Reply-To'] = sender_email
    email_message.set_content(
        f'Name: {name}\n'
        f'Email: {sender_email}\n'
        f'Phone: {phone or "Not provided"}\n\n'
        f'Message:\n{message_text}\n'
    )

    try:
        with smtplib.SMTP_SSL(smtp_host, smtp_port, context=ssl.create_default_context()) as server:
            server.login(smtp_username, smtp_password)
            server.send_message(email_message)
    except Exception:
        app.logger.exception('Contact email delivery failed')
        return jsonify({'error': 'We could not send your message. Please email hanshi18@gmail.com directly.'}), 502

    contact = Contact(
        name=name,
        email=sender_email,
        phone=phone,
        message=message_text
    )

    try:
        db.session.add(contact)
        db.session.commit()
        return jsonify(contact.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/api/students', methods=['POST'])
def enroll_student():
    data = request.get_json()

    if not all([data.get('name'), data.get('email'), data.get('program_id')]):
        return jsonify({'error': 'Missing required fields'}), 400

    student = Student(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        program_id=data['program_id'],
        belt_level=data.get('belt_level', 'White')
    )

    try:
        db.session.add(student)
        db.session.commit()
        return jsonify(student.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/api/students/<int:id>', methods=['GET', 'PUT'])
def manage_student(id):
    student = Student.query.get(id)

    if not student:
        return jsonify({'error': 'Student not found'}), 404

    if request.method == 'GET':
        return jsonify(student.to_dict())

    if request.method == 'PUT':
        data = request.get_json()
        student.name = data.get('name', student.name)
        student.email = data.get('email', student.email)
        student.phone = data.get('phone', student.phone)
        student.belt_level = data.get('belt_level', student.belt_level)
        student.status = data.get('status', student.status)

        try:
            db.session.commit()
            return jsonify(student.to_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400


# ============================================
# SERVE THE REACT FRONTEND
# ============================================
# Everything that ISN'T an /api/... route falls through to here, and we hand
# back the React app's index.html. React Router then takes over in the
# browser and shows the right page (Home, About, Programs, etc).

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    full_path = os.path.join(DIST_DIR, path)
    if path != '' and os.path.exists(full_path):
        return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, 'index.html')


# ============================================
# DATABASE INITIALIZATION
# ============================================

def init_db():
    with app.app_context():
        db.create_all()

        existing_event_columns = {column['name'] for column in inspect(db.engine).get_columns('event')}
        event_column_migrations = {
            'subtitle': 'VARCHAR(300)',
            'youtube_url': 'VARCHAR(500)',
            'external_url': 'VARCHAR(500)',
        }
        with db.engine.begin() as connection:
            for column_name, column_type in event_column_migrations.items():
                if column_name not in existing_event_columns:
                    connection.execute(text(f'ALTER TABLE "event" ADD COLUMN {column_name} {column_type}'))

        if Program.query.first():
            return

        programs = [
            Program(
                name="Little Dragons",
                age_group="4-6 years",
                description="Introduction to karate for young children.",
                days="Mon, Wed, Fri",
                time="4:00 PM - 4:45 PM",
                price="$60/month",
                instructor="Sensei Maria",
                image="/images/default-program.jpg"
            ),
        ]

        db.session.add_all(programs)
        db.session.commit()
        print("Database initialized with sample data!")


if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5001))
    if os.environ.get('RENDER'):
        os.execvp('gunicorn', [
            'gunicorn',
            'app:app',
            '--bind',
            f'0.0.0.0:{port}',
            '--workers',
            '1'
        ])
    app.run(debug=True, host='0.0.0.0', port=port)
else:
    # When run by gunicorn on Render, __name__ != '__main__', so make sure
    # the database tables still get created.
    init_db()
