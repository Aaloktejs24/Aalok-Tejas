// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    const targetSection = document.querySelector(link.getAttribute('href'));
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Toggle Project Details
function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.style.display === 'none' || !details.style.display) {
        details.style.display = 'block';
        button.textContent = 'Hide Details';
    } else {
        details.style.display = 'none';
        button.textContent = 'View Details';
    }
}

// Highlight Current Section on Scroll
const sections = document.querySelectorAll('section');
const observerOptions = { threshold: 1.1 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.id;
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
});