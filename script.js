// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

// Attach click event listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const targetSection = document.querySelector(link.getAttribute('href'));

    if (targetSection) {
      // Smoothly scroll to the target section
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Toggle Project Details
function toggleDetails(button) {
    const details = button.nextElementSibling; // Find the next sibling element (details)
  
    if (details) {
      // Check if the details are currently hidden
      const isHidden = details.style.display === 'none' || details.style.display === '';
  
      // Toggle the display property
      if (isHidden) {
        details.style.display = 'block'; // Show details
        button.textContent = 'Hide Details'; // Update button text
      } else {
        details.style.display = 'none'; // Hide details
        button.textContent = 'View Details'; // Reset button text
      }
    }
  }

// Highlight Current Section on Scroll
const sections = document.querySelectorAll('section'); // Select all sections by tag
const observerOptions = {
  threshold: 0.6, // Trigger when 60% of the section is visible
};

// Initialize IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.id; // Get the ID of the current section
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`); // Match the section with its nav link

    if (navLink) {
      // Toggle 'active' class based on visibility
      if (entry.isIntersecting) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}, observerOptions);

// Observe each section
sections.forEach((section) => {
  if (section) observer.observe(section);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    alert('Thank you for reaching out! I will get back to you soon.');
    contactForm.reset(); // Reset form fields after submission
  });
}