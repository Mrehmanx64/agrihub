/**
 * Agricultural Information Hub - Main JavaScript
 * Features:
 *  - Sticky navbar scroll effect
 *  - Smooth scrolling
 *  - Scroll-to-top button
 *  - Fade-in animations on scroll
 *  - Guide card category filter
 *  - Contact form validation
 */

$(document).ready(function () {

  /* =============================================
     NAVBAR - Scroll shadow
     ============================================= */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
    scrollTopToggle();
    revealOnScroll();
  });

  // Add scrolled style dynamically
  $('<style>').text('.navbar.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important; }').appendTo('head');


  /* =============================================
     SMOOTH SCROLLING
     ============================================= */
  $('a[href*="#"]').not('[href="#"]').on('click', function (e) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600, 'swing');
    }
  });


  /* =============================================
     SCROLL TO TOP BUTTON
     ============================================= */
  function scrollTopToggle() {
    if ($(window).scrollTop() > 300) {
      $('#scrollTop').addClass('visible');
    } else {
      $('#scrollTop').removeClass('visible');
    }
  }

  $('#scrollTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });


  /* =============================================
     FADE IN ON SCROLL (Intersection Observer)
     ============================================= */
  function revealOnScroll() {
    $('.fade-in').each(function () {
      var elemTop = $(this).offset().top;
      var viewBottom = $(window).scrollTop() + $(window).height();
      if (elemTop < viewBottom - 60) {
        $(this).addClass('visible');
      }
    });
  }

  // Trigger on load
  revealOnScroll();


  /* =============================================
     GUIDE CARD CATEGORY FILTER (Farming Guides Page)
     ============================================= */
  $('.filter-btn').on('click', function () {
    var filter = $(this).data('filter');

    // Update active state
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      // Show all with animation
      $('.guide-card-wrap').fadeIn(300);
    } else {
      $('.guide-card-wrap').each(function () {
        if ($(this).data('category') === filter) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });


  /* =============================================
     CONTACT FORM VALIDATION
     ============================================= */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    var valid = true;

    // Clear previous errors
    $(this).find('.form-control, .form-select').removeClass('is-invalid');
    $(this).find('.invalid-feedback').remove();

    // Name validation
    var name = $('#name').val().trim();
    if (name.length < 2) {
      showError('#name', 'Please enter your full name (at least 2 characters).');
      valid = false;
    }

    // Email validation
    var email = $('#email').val().trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError('#email', 'Please enter a valid email address.');
      valid = false;
    }

    // Subject validation
    var subject = $('#subject').val().trim();
    if (subject.length < 4) {
      showError('#subject', 'Please enter a subject (at least 4 characters).');
      valid = false;
    }

    // Message validation
    var message = $('#message').val().trim();
    if (message.length < 10) {
      showError('#message', 'Please enter a message (at least 10 characters).');
      valid = false;
    }

    if (valid) {
      // Success
      $('#contactForm').hide();
      $('.success-message').fadeIn(400);
    }
  });

  function showError(selector, msg) {
    $(selector).addClass('is-invalid');
    $(selector).after('<div class="invalid-feedback">' + msg + '</div>');
  }


  /* =============================================
     ACCORDION CROP DETAILS - Auto-open first
     ============================================= */
  // Bootstrap handles accordion by default; this just ensures first is open
  var firstAccordion = $('.accordion-button').first();
  if (firstAccordion.length && firstAccordion.hasClass('collapsed')) {
    firstAccordion.click();
  }


  /* =============================================
     MOBILE NAV - Close on link click
     ============================================= */
  $('.navbar-nav .nav-link').on('click', function () {
    var navbarCollapse = $('#navbarNav');
    if (navbarCollapse.hasClass('show')) {
      $('#navbarToggler').click();
    }
  });


  /* =============================================
     PAGE LOAD ANIMATION
     ============================================= */
  $('body').css('opacity', 0).animate({ opacity: 1 }, 500);

  // Initial reveal for elements in view
  setTimeout(revealOnScroll, 300);

});
