// DOM Elements
const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const loadingScreen = document.getElementById("loading-screen");
const backToTopBtn = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");

// Custom cursor
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2000);
});

// Mobile menu toggle
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("open");
  menuBtn.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-link")) {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("active");
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("active");
  }
});

// Custom cursor movement
window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
  }

  if (cursorOutline) {
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  }
});

// Typing animation
const typingText = document.querySelector('.typing-text');
const texts = [
  'Full Stack Developer',
  'Web Designer',
  'Problem Solver',
  'Tech Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  setTimeout(typeWriter, 1000);
});

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Skills functionality
const skillCategories = document.querySelectorAll('.skill-category');
const skillItems = document.querySelectorAll('.skill-item');

skillCategories.forEach(category => {
  category.addEventListener('click', () => {
    const targetCategory = category.getAttribute('data-category');
    
    // Update active category
    skillCategories.forEach(cat => cat.classList.remove('active'));
    category.classList.add('active');
    
    // Show/hide skills
    skillItems.forEach(item => {
      item.classList.remove('active');
      if (targetCategory === 'frontend' || item.classList.contains(targetCategory)) {
        setTimeout(() => {
          item.classList.add('active');
        }, 100);
      }
    });
    
    // Animate skill bars
    setTimeout(() => {
      animateSkillBars();
    }, 200);
  });
});

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-item.active .skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 100);
  });
}

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio__card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    
    // Update active filter button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter portfolio items
    portfolioCards.forEach(card => {
      const categories = card.getAttribute('data-category');
      
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.9)';
  }
});

// Back to top button
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Contact form handling
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span><i class="ri-loader-4-line"></i>';
    submitBtn.disabled = true;
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="ri-check-line"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      // Error
      submitBtn.innerHTML = '<span>Error! Try Again</span><i class="ri-error-warning-line"></i>';
      submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      
      // Trigger counter animation when stats section is visible
      if (entry.target.classList.contains('hero__stats')) {
        animateCounters();
      }
      
      // Trigger skill bar animation when skills section is visible
      if (entry.target.classList.contains('skills')) {
        setTimeout(() => {
          animateSkillBars();
        }, 500);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hero__content, .hero__image, .about__text, .about__image, .service__card, .portfolio__card, .contact__item, .hero__stats, .skills').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// ScrollReveal animations
const sr = ScrollReveal({
  distance: '60px',
  duration: 2500,
  delay: 400,
  reset: false
});

// Hero animations
sr.reveal('.hero__content', { origin: 'left' });
sr.reveal('.hero__image', { origin: 'right', delay: 600 });

// About animations
sr.reveal('.about__text', { origin: 'left' });
sr.reveal('.about__image', { origin: 'right', delay: 600 });

// Services animations
sr.reveal('.service__card', { 
  origin: 'bottom',
  interval: 200
});

// Skills animations
sr.reveal('.skill-item', {
  origin: 'bottom',
  interval: 100
});

// Portfolio animations
sr.reveal('.portfolio__card', {
  origin: 'bottom',
  interval: 200
});

// Contact animations
sr.reveal('.contact__item', {
  origin: 'left',
  interval: 200
});

sr.reveal('.contact__form', {
  origin: 'right',
  delay: 600
});

// Floating elements animation
function animateFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((element, index) => {
    const speed = element.getAttribute('data-speed') || 1;
    const offset = Math.sin(Date.now() * 0.001 * speed + index) * 10;
    element.style.transform = `translateY(${offset}px)`;
  });
  
  requestAnimationFrame(animateFloatingElements);
}

// Start floating animation
animateFloatingElements();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-element');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add hover effects to interactive elements
document.querySelectorAll('.btn, .service__card, .portfolio__card, .skill-item').forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (cursorOutline) {
      cursorOutline.style.transform = 'scale(1.5)';
      cursorOutline.style.borderColor = 'var(--primary-color)';
    }
  });
  
  element.addEventListener('mouseleave', () => {
    if (cursorOutline) {
      cursorOutline.style.transform = 'scale(1)';
      cursorOutline.style.borderColor = 'var(--primary-color)';
    }
  });
});

// Initialize skills on page load
document.addEventListener('DOMContentLoaded', () => {
  // Show frontend skills by default
  skillItems.forEach(item => {
    if (item.classList.contains('frontend')) {
      item.classList.add('active');
    }
  });
  
  // Animate skill bars after a delay
  setTimeout(() => {
    animateSkillBars();
  }, 1000);
});

// Add active class to current navigation item
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Preload images
function preloadImages() {
  const images = [
    'assets/header1.jpeg',
    'assets/WhatsApp Image 2025-04-03 at 3.33.46 PM.jpeg',
    'assets/project-1.jpg',
    'assets/project-2.jpg',
    'assets/project-3.jpg',
    'assets/project-4.jpg',
    'assets/project-5.jpg',
    'assets/project-6.jpg'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Navbar background
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.9)';
  }
  
  // Back to top button
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, 16)); // ~60fps