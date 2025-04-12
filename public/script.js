const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }
});

const observerOptions = {
  root: null,
  rootMargin: `-${navbarHeight}px 0px 0px 0px`,
  threshold: 1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.id;
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (navLink && entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => observer.observe(section));

function toggleDetails(button) {
  const details = button.nextElementSibling;

  if (details) {
    const isHidden = details.style.display === 'none' || details.style.display === '';

    if (isHidden) {
      details.style.display = 'block';
      button.textContent = 'Hide Details';
    } else {
      details.style.display = 'none';
      button.textContent = 'View Details';
    }
  }
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
      const response = await fetch("https://aalok-tejas.onrender.com/api/message", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();
      console.log('📨 Server response:', result);

      if (response.ok) {
        alert('✅ Thank you for reaching out! I will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send. Please try again later.');
    }
  });
}

// Carousel logic
const carouselImages = document.querySelector('.carousel-images');
const totalImages = document.querySelectorAll('.carousel-item').length;
let currentIndex = 0;
let autoSlideInterval;

function slideToNextImage() {
  currentIndex = (currentIndex + 1) % totalImages;
  updateCarouselPosition();
}

function slideToPreviousImage() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateCarouselPosition();
}

function updateCarouselPosition() {
  const newTransform = -currentIndex * 100;
  carouselImages.style.transform = `translateX(${newTransform}%)`;
}

function startAutoSlide() {
  autoSlideInterval = setInterval(slideToNextImage, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();

const socket = io();
socket.on('newMessage', (msg) => {
  console.log('📥 New message received:', msg);

  const messageBox = document.getElementById('realtime-messages');
  if (messageBox) {
    const div = document.createElement('div');
    div.className = 'new-message';
    div.innerHTML = `<strong>${msg.name}</strong>: ${msg.message}`;
    messageBox.appendChild(div);
  }
});