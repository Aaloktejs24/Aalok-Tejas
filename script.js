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

const carouselImages = document.querySelector('.carousel-images');
const totalImages = document.querySelectorAll('.carousel-item').length;

let currentIndex = 0; // Track the current slide
let autoSlideInterval; // To store the interval ID

// Slide to the next image
function slideToNextImage() {
  currentIndex = (currentIndex + 1) % totalImages;
  updateCarouselPosition();
}

// Slide to the previous image
function slideToPreviousImage() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateCarouselPosition();
}

// Update the carousel's position
function updateCarouselPosition() {
  const newTransform = -currentIndex * 100; // Slide by 100% of the container width
  carouselImages.style.transform = `translateX(${newTransform}%)`;
}

// Start the automatic sliding
function startAutoSlide() {
  autoSlideInterval = setInterval(slideToNextImage, 3000); // Slide every 3 seconds
}

// Stop the automatic sliding
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Add event listeners to stop auto-sliding when hovering over the carousel
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

// Start auto-sliding on page load
startAutoSlide();