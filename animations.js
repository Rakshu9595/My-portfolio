// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Function to add animation class when element is in viewport
    function animateOnScroll() {
      const elements = document.querySelectorAll('.reveal');
      
      elements.forEach(element => {
        if (isInViewport(element)) {
          element.classList.add('active');
        }
      });
      
      // Progress bars animation for skills section
      const progressBars = document.querySelectorAll('.progress-bar');
      
      progressBars.forEach(progressBar => {
        const progressSection = document.getElementById('skills');
        
        if (progressSection && isInViewport(progressSection)) {
          const width = progressBar.getAttribute('aria-valuenow') + '%';
          progressBar.style.width = width;
        }
      });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger once on page load
    animateOnScroll();
    
    // Portfolio image hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-card');
    
    portfolioItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.querySelector('.portfolio-overlay').style.opacity = '1';
      });
      
      item.addEventListener('mouseleave', function() {
        this.querySelector('.portfolio-overlay').style.opacity = '0';
      });
    });
    
    // Testimonial carousel custom animation
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    
    if (testimonialCarousel) {
      testimonialCarousel.addEventListener('slide.bs.carousel', function(e) {
        const nextSlide = e.relatedTarget;
        const activeSlide = document.querySelector('.carousel-item.active');
        
        // Add fade-out class to the current active slide
        activeSlide.classList.add('animate-fade-out');
        
        // Remove the fade-out class after animation completes
        setTimeout(() => {
          activeSlide.classList.remove('animate-fade-out');
        }, 600);
        
        // Add fade-in class to the next slide
        nextSlide.classList.add('animate-fade-in');
        
        // Remove the fade-in class after animation completes
        setTimeout(() => {
          nextSlide.classList.remove('animate-fade-in');
        }, 600);
      });
    }
    
    // Contact form input animation
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('input-focused');
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '') {
          this.parentElement.classList.remove('input-focused');
        }
      });
    });
    
    // Custom cursor effect (optional)
    function customCursor() {
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      document.body.appendChild(cursor);
      
      const cursorDot = document.createElement('div');
      cursorDot.className = 'cursor-dot';
      document.body.appendChild(cursorDot);
      
      document.addEventListener('mousemove', function(e) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
      
      const links = document.querySelectorAll('a, button');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-expanded');
        });
        
        link.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-expanded');
        });
      });
    }
    
    // Uncomment to enable custom cursor
    // customCursor();
    
    // Parallax effect on hero section
    function parallaxEffect() {
      window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
          heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
      });
    }
    
    // Uncomment to enable parallax effect
    // parallaxEffect();
    
    // Counter animation for statistics (if added later)
    function animateCounter(element, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
    
    // Example usage for stats counters (if added later)
    const statCounters = document.querySelectorAll('.stat-counter');
    
    if (statCounters.length > 0) {
      const statsSection = document.querySelector('.stats-section');
      
      const animateStats = function() {
        if (isInViewport(statsSection)) {
          statCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, 0, target, 2000);
          });
          window.removeEventListener('scroll', animateStats);
        }
      };
      
      window.addEventListener('scroll', animateStats);
      animateStats(); // Check on load
    }
    
    // Add floating animation to certain elements
    const floatingElements = document.querySelectorAll('.float-animation');
    
    floatingElements.forEach(element => {
      element.classList.add('float');
    });
    
    // Add pulse animation to call-to-action buttons
    const ctaButtons = document.querySelectorAll('.btn-cta');
    
    ctaButtons.forEach(button => {
      button.classList.add('pulse');
    });
  });