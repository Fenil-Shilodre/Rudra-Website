/* ============================================
   RUDRA INDUSTRIES – Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      overlay.classList.toggle('active');
      const isOpen = navLinks.classList.contains('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate hamburger to X
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        spans[0].style.background = '#1E40AF';
        spans[2].style.background = '#1E40AF';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        resetHamburger();
      });
    });

    const menuClose = document.getElementById('menuClose');
    if (menuClose) {
      menuClose.addEventListener('click', () => {
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        resetHamburger();
      });
    }

    overlay.addEventListener('click', () => {
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      resetHamburger();
    });

    function resetHamburger() {
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
        s.style.background = '';
      });
    }
  }

  /* ---- HERO SLIDESHOW ---- */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  if (slides.length > 0) {
    let current = 0;
    let timer;

    const goTo = (index) => {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    };

    const next = () => goTo((current + 1) % slides.length);

    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(next, 5000);
    };

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index));
        startTimer();
      });
    });

    startTimer();
  }

  /* ---- SCROLL REVEAL (Fallback if GSAP not loaded) ---- */
  if (typeof gsap === 'undefined') {
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((sib, idx) => {
              if (sib === entry.target) delay = idx * 80;
            });
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => observer.observe(el));
    }

    /* ---- COUNTER ANIMATION (Fallback) ---- */
    const counters = document.querySelectorAll('.stat-num');

    if (counters.length > 0) {
      const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const duration = 1800;
            const step = target / (duration / 16);
            let current = 0;

            const tick = () => {
              current = Math.min(current + step, target);
              el.textContent = Math.floor(current);
              if (current < target) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            countObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(c => countObserver.observe(c));
    }
  }

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        }
      });

      if (!valid) return;

      // Simulate submission
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.classList.add('visible');
      }, 1200);
    });

    // Clear error on input
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

});
