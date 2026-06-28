// ============================================
// WORLD KARATE DOJO - MAIN JAVASCRIPT
// ============================================

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showMessage('Thank you! We will get back to you soon.', 'success');
                contactForm.reset();
                setTimeout(() => {
                    document.querySelector('.form-message').style.display = 'none';
                }, 5000);
            } else {
                showMessage('An error occurred. Please try again.', 'error');
            }
        } catch (error) {
            showMessage('Error submitting form: ' + error.message, 'error');
        }
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const messageDiv = document.querySelector('.form-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = 'form-message ' + type;
        messageDiv.style.display = 'block';
    }
}

// ============================================
// ENROLLMENT FUNCTIONALITY
// ============================================

function enrollProgram(programId) {
    const modal = document.getElementById('enrollment-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('program-id').value = programId;
    }
}

function closeModal() {
    const modal = document.getElementById('enrollment-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    const modal = document.getElementById('enrollment-modal');
    if (modal && e.target === modal) {
        modal.style.display = 'none';
    }
});

const enrollmentForm = document.getElementById('enrollment-form');
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('enroll-name').value,
            email: document.getElementById('enroll-email').value,
            phone: document.getElementById('enroll-phone').value,
            program_id: parseInt(document.getElementById('program-id').value),
            belt_level: 'White'
        };

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Successfully enrolled! We will contact you soon.');
                closeModal();
                enrollmentForm.reset();
            } else {
                alert('Error enrolling. Please try again.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
}

// ============================================
// SMOOTH SCROLL ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ANIMATE ELEMENTS ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.program-card, .benefit-card, .program-full-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// LOAD PROGRAMS DYNAMICALLY
// ============================================

async function loadPrograms() {
    try {
        const response = await fetch('/api/programs');
        const programs = await response.json();
        displayPrograms(programs);
    } catch (error) {
        console.error('Error loading programs:', error);
    }
}

function displayPrograms(programs) {
    const container = document.querySelector('.programs-grid');
    if (!container) return;

    container.innerHTML = programs.map(program => `
        <div class="program-card fade-in">
            <div class="program-card-image">
                <img src="${program.image || '/static/images/default-program.jpg'}" alt="${program.name}">
            </div>
            <div class="program-card-content">
                <h3 class="program-name">${program.name}</h3>
                <p class="program-age">${program.age_group}</p>
                <p class="program-description">${program.description.substring(0, 100)}...</p>
                <div class="program-details">
                    <span class="detail-item">⏰ ${program.time}</span>
                    <span class="detail-item">📅 ${program.days}</span>
                    <span class="detail-item">💰 ${program.price}</span>
                </div>
                <button class="btn btn-primary btn-small" onclick="enrollProgram(${program.id})">ENROLL NOW</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// LOAD EVENTS
// ============================================

async function loadEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function displayEvents(events) {
    const container = document.querySelector('.events-list');
    if (!container) return;

    if (events.length === 0) {
        container.innerHTML = '<p>No upcoming events at this time.</p>';
        return;
    }

    container.innerHTML = events.map(event => `
        <div class="event-card fade-in">
            <div class="event-date">
                <span>${new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p class="event-location">📍 ${event.location}</p>
            </div>
        </div>
    `).join('');
}

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================

function setActiveNavLink() {
    const currentPage = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.color = 'var(--accent-blue)';
            link.style.borderBottom = '2px solid var(--accent-blue)';
        }
    });
}

// ============================================
// PAGE LOAD INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    
    // Load data if on relevant pages
    if (document.querySelector('.programs-grid')) {
        loadPrograms();
    }
    
    if (document.querySelector('.events-list')) {
        loadEvents();
    }
});

// ============================================
// SEARCH/FILTER FUNCTIONALITY
// ============================================

function filterPrograms(ageGroup) {
    const cards = document.querySelectorAll('.program-card');
    
    cards.forEach(card => {
        if (ageGroup === 'all') {
            card.style.display = 'block';
        } else {
            const cardAgeGroup = card.querySelector('.program-age').textContent;
            if (cardAgeGroup.includes(ageGroup)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.id = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--primary-blue);
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// CONSOLE LOG
// ============================================

console.log('World Karate Dojo Website - Loaded Successfully');