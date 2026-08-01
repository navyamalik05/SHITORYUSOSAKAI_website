from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

# Initialize Flask without its automatic static route. The catch-all route
# below serves real files from the React build and falls back to index.html
# for client-side routes such as /programs and /members.
DIST_DIR = os.path.join(os.path.dirname(__file__), 'frontend', 'dist')
app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-change-this'

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
    description = db.Column(db.Text)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200))
    image = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.strftime('%Y-%m-%d %H:%M:%S'),
            'location': self.location,
            'image': self.image
        }


# ============================================
# API ENDPOINTS (used by the React frontend)
# ============================================

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


@app.route('/api/contact', methods=['POST'])
def create_contact():
    data = request.get_json()

    if not all([data.get('name'), data.get('email'), data.get('message')]):
        return jsonify({'error': 'Missing required fields'}), 400

    contact = Contact(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        message=data['message']
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
