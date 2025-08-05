
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Menu filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form submission handling
    const reservationForm = document.getElementById('reservationForm');
    const contactForm = document.querySelector('.contact-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            alert('Thank you for your reservation! We will contact you shortly to confirm.');
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Set minimum date for reservation to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const minDate = yyyy + '-' + mm + '-' + dd;
        
        dateInput.setAttribute('min', minDate);
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});// WhatsApp & Email Booking System
document.getElementById('reservationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const guests = document.getElementById('guests').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const requests = document.getElementById('specialRequests').value;

  // Format date (e.g., "05 August 2023")
  const formattedDate = new Date(date).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Create booking message
  const message = `📅 *New Booking Request* 📅
  \n*Name:* ${name}
  *Email:* ${email}
  *Phone:* ${phone}
  *Guests:* ${guests}
  *Date:* ${formattedDate}
  *Time:* ${time}
  *Special Requests:* ${requests || 'None'}`;

  // Encode for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  
  // Send via WhatsApp (opens in new tab)
  const whatsappUrl = `https://wa.me/27639374786?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
  
  // Send via Email (mailto link)
  const emailSubject = `New Booking: ${name} - ${formattedDate}`;
  const emailBody = message.replace(/\*/g, ''); // Remove Markdown for email
  const emailUrl = `mailto:makgomoshayi@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.location.href = emailUrl;

  // Show confirmation to user
  alert('Thank you! Your booking request has been sent. We will confirm shortly via WhatsApp or email.');
  
  // Reset form
  this.reset();
});