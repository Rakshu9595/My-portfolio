// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Navbar scroll behavior
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Initialize scrollspy (for Bootstrap)
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#navbar'
    });
    
    // Smooth scroll for nav links and scroll down button
    const smoothScroll = function(target, duration) {
      const targetElement = document.querySelector(target);
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition - 80; // Offset for fixed navbar
      let startTime = null;
      
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
      
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
      
      requestAnimationFrame(animation);
    };
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.hash !== '') {
          e.preventDefault();
          const hash = this.hash;
          smoothScroll(hash, 800);
          
          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
          }
        
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
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Portfolio filtering
    const portfolioFilters = document.querySelectorAll('.portfolio-filters button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Remove active class from all filters
        portfolioFilters.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked filter
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Automatic animations on scroll
    function revealElements() {
      const elements = document.querySelectorAll('.animate-top, .animate-left, .animate-right, .animate-bottom, .animate-fade');
      
      elements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.style.animationDelay = element.getAttribute('data-delay') || '0s';
          element.style.animationPlayState = 'running';
          element.style.opacity = '1';
        }
      });
    }
    
    window.addEventListener('scroll', revealElements);
    window.addEventListener('load', revealElements);
    
    // Typing effect for profession
    const professionText = document.getElementById('profession-text');
    const professions = ['Web Developer', 'UI/UX Designer', 'Frontend Expert', 'Creative Thinker'];
    let currentProfessionIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
      const currentProfession = professions[currentProfessionIndex];
      
      if (isDeleting) {
        professionText.textContent = currentProfession.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        professionText.textContent = currentProfession.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && currentCharIndex === currentProfession.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at the end
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
        typingSpeed = 500; // Pause before starting new word
      }
      
      setTimeout(typeEffect, typingSpeed);
    }
    
    if (professionText) {
      setTimeout(typeEffect, 1000);
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '' || email === '' || message === '') {
          alert('Please fill in all fields');
          return;
        }
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show a success message
        contactForm.innerHTML = `
          <div class="text-center">
            <i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>
            <h3 class="mt-3">Thank You!</h3>
            <p>Your message has been sent successfully.</p>
            <p>I'll get back to you soon!</p>
          </div>
        `;
      });
    }
  });