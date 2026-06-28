from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

# Initialize Flask app
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
    days = db.Column(db.String(100))  # e.g., "Mon, Wed, Fri"
    time = db.Column(db.String(50))   # e.g., "4:00 PM - 5:00 PM"
    price = db.Column(db.String(50))  # e.g., "$60/month"
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
    status = db.Column(db.String(20), default="Active")  # Active, Inactive, On Hold

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
# ROUTES
# ============================================

@app.route('/')
def index():
    """Homepage"""
    programs = Program.query.limit(3).all()
    events = Event.query.order_by(Event.date).limit(3).all()
    return render_template('index.html', programs=programs, events=events)


@app.route('/programs')
def programs():
    """Programs page"""
    all_programs = Program.query.all()
    return render_template('programs.html', programs=all_programs)


@app.route('/about')
def about():
    """About page"""
    return render_template('about.html')


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page and form submission"""
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        
        contact = Contact(
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone'),
            message=data.get('message')
        )
        
        try:
            db.session.add(contact)
            db.session.commit()
            return jsonify({'success': True, 'message': 'Message sent successfully!'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'success': False, 'message': str(e)}), 400
    
    return render_template('contact.html')


@app.route('/events')
def events():
    """Events page"""
    all_events = Event.query.order_by(Event.date).all()
    return render_template('events.html', events=all_events)


# ============================================
# API ENDPOINTS
# ============================================

@app.route('/api/programs', methods=['GET'])
def get_programs():
    """Get all programs as JSON"""
    programs = Program.query.all()
    return jsonify([p.to_dict() for p in programs])


@app.route('/api/programs/<int:id>', methods=['GET'])
def get_program(id):
    """Get single program"""
    program = Program.query.get(id)
    if not program:
        return jsonify({'error': 'Program not found'}), 404
    return jsonify(program.to_dict())


@app.route('/api/events', methods=['GET'])
def get_events():
    """Get all events as JSON"""
    events = Event.query.order_by(Event.date).all()
    return jsonify([e.to_dict() for e in events])


@app.route('/api/contact', methods=['POST'])
def create_contact():
    """Create contact submission via API"""
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
    """Enroll new student"""
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
    """Get or update student"""
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
# ERROR HANDLERS
# ============================================

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def server_error(error):
    return render_template('500.html'), 500


# ============================================
# DATABASE INITIALIZATION
# ============================================

def init_db():
    """Initialize database with sample data"""
    with app.app_context():
        db.create_all()
        
        # Check if data already exists
        if Program.query.first():
            return
        
        # Add sample programs
        programs = [
            Program(
                name="Little Dragons",
                age_group="4-6 years",
                description="Introduction to karate for young children. Focus on basic stances, kicks, and building confidence.",
                days="Mon, Wed, Fri",
                time="4:00 PM - 4:45 PM",
                price="$60/month",
                instructor="Sensei Maria",
                image="/static/images/little-dragons.jpg"
            ),
            Program(
                name="Youth Karate",
                age_group="7-12 years",
                description="Intermediate karate training for school-age children. Learn self-defense and discipline.",
                days="Tue, Thu, Sat",
                time="5:00 PM - 6:00 PM",
                price="$70/month",
                instructor="Sensei James",
                image="/static/images/youth-karate.jpg"
            ),
            Program(
                name="Teen & Adult",
                age_group="13+ years",
                description="Advanced training for teens and adults. Competition prep and personal development.",
                days="Mon, Wed, Fri, Sat",
                time="6:30 PM - 7:30 PM",
                price="$85/month",
                instructor="Sensei David",
                image="/static/images/adult-karate.jpg"
            ),
            Program(
                name="Competition Team",
                age_group="10+ years",
                description="Intensive training for competitive karate athletes.",
                days="Sat, Sun",
                time="3:00 PM - 5:00 PM",
                price="$120/month",
                instructor="Sensei David",
                image="/static/images/competition.jpg"
            ),
        ]
        
        db.session.add_all(programs)
        db.session.commit()
        
        print("Database initialized with sample data!")


if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5001)