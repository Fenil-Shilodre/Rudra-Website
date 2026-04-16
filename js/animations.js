/* ============================================
   RUDRA INDUSTRIES – Premium Animations JS
   GSAP + ScrollTrigger + Vanilla Tilt + Particles
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. PRELOADER
  // ============================================
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        // Initialize animations after preloader is done
        initAllAnimations();
      }, 800);
    });

    // Fallback: hide preloader after 3s max
    setTimeout(() => {
      if (!preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initAllAnimations();
      }
    }, 3000);
  } else {
    initAllAnimations();
  }

  function initAllAnimations() {
    initCustomCursor();
    initScrollProgress();
    initGSAPAnimations();
    initTiltEffects();
    initParticles();
    initMagneticButtons();
    initFloatingIcons();
    initImageReveal();
    initMapReveal();
    initTextSplitAnimation();
    initEnhancedCounters();
    initParallaxHero();
    initSectionTitleAnimation();
    initStaggerItems();
    initConfetti();
  }

  // ============================================
  // 2. CUSTOM CURSOR
  // ============================================
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const ring = document.querySelector('.cursor-ring');
    if (!cursor || !ring) return;

    // Don't show on touch devices
    if ('ontouchstart' in window) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      cursor.classList.add('visible');
      ring.classList.add('visible');
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverables = document.querySelectorAll('a, button, .btn, .product-card, .service-card, .team-card, .testimonial-card, .industry-item, .dot, input, select, textarea');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('visible');
      ring.classList.remove('visible');
    });

    document.addEventListener('mouseenter', () => {
      cursor.classList.add('visible');
      ring.classList.add('visible');
    });
  }

  // ============================================
  // 3. SCROLL PROGRESS BAR
  // ============================================
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      bar.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  // ============================================
  // 4. GSAP SCROLL ANIMATIONS
  // ============================================
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // --- MASSIVE GLOBAL SCROLL REVEALS --- 
    // Automatically fade-up and stagger key elements as they enter the viewport
    
    // 1. Reveal all sections (fade up)
    const sections = gsap.utils.toArray('.section');
    sections.forEach(sec => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // 2. Reveal all H2/H3 titles (slide left)
    const headings = gsap.utils.toArray('h2, h3');
    headings.forEach(heading => {
      // exclude hero headings
      if (heading.closest('.hero-content') || heading.closest('.page-hero-content')) return;
      gsap.fromTo(heading,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            once: true
          }
        }
      );
    });

    // 3. Stagger Grids (Products, Services, Testimonials, Team)
    const grids = gsap.utils.toArray('.services-grid, .products-grid, .testimonials-grid, .team-grid, .industries-grid');
    grids.forEach(grid => {
      const cards = grid.children;
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // 4. Reveal existing .reveal classes (Fallback/Explicit)
    const revealEls = gsap.utils.toArray('.reveal');
    revealEls.forEach(el => {
      if (el.closest('.services-grid') || el.closest('.products-grid') || el.closest('.testimonials-grid')) return; // Already staggered
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Hero content parallax on scroll
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        y: 80,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Page hero parallax
    const pageHeroContent = document.querySelector('.page-hero-content');
    if (pageHeroContent) {
      gsap.to(pageHeroContent, {
        y: 60,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.page-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // CTA band slide in
    const ctaBand = document.querySelector('.cta-band-inner');
    if (ctaBand) {
      gsap.fromTo(ctaBand,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-band',
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // Footer reveal
    const footer = document.querySelector('.footer');
    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
            once: true
          }
        }
      );
    }

    // Product detail cards alternating slide-in
    const productCards = document.querySelectorAll('.product-detail-card');
    productCards.forEach((card, i) => {
      const isReverse = card.classList.contains('reverse');
      gsap.fromTo(card,
        {
          opacity: 0,
          x: isReverse ? 60 : -60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Product feature lists stagger
    const featureLists = document.querySelectorAll('.product-features');
    featureLists.forEach(list => {
      const items = list.querySelectorAll('li');
      gsap.fromTo(items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // About values stagger
    const valueItems = document.querySelectorAll('.value-item');
    if (valueItems.length > 0) {
      gsap.fromTo(valueItems,
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-values',
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // Contact detail items bounce-in
    const contactItems = document.querySelectorAll('.contact-detail-item');
    if (contactItems.length > 0) {
      gsap.fromTo(contactItems,
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.contact-details',
            start: 'top 85%',
            once: true
          }
        }
      );
    }
  }

  // ============================================
  // 5. VANILLA TILT (3D Card Effects)
  // ============================================
  function initTiltEffects() {
    if (typeof VanillaTilt === 'undefined') return;

    // Only on desktop
    if (window.innerWidth < 768) return;

    const tiltCards = document.querySelectorAll('.service-card, .testimonial-card');
    tiltCards.forEach(card => {
      VanillaTilt.init(card, {
        max: 8,
        speed: 400,
        scale: 1.02,
        glare: true,
        'max-glare': 0.08,
        perspective: 900
      });
    });

    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
      VanillaTilt.init(card, {
        max: 6,
        speed: 400,
        scale: 1.01,
        glare: true,
        'max-glare': 0.05,
        perspective: 1100
      });
    });

    const industryItems = document.querySelectorAll('.industry-item');
    industryItems.forEach(item => {
      VanillaTilt.init(item, {
        max: 12,
        speed: 350,
        scale: 1.05,
        glare: true,
        'max-glare': 0.1,
        perspective: 800
      });
    });
  }

  // ============================================
  // 6. PARTICLES (Hero Background)
  // ============================================
  function initParticles() {
    const heroParticles = document.getElementById('hero-particles');
    if (!heroParticles) return;
    if (typeof tsParticles === 'undefined') return;

    tsParticles.load('hero-particles', {
      particles: {
        number: {
          value: 40,
          density: { enable: true, value_area: 1000 }
        },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.15,
          random: true,
          animation: { enable: true, speed: 0.5, minimumValue: 0.05 }
        },
        size: {
          value: 3,
          random: true,
          animation: { enable: true, speed: 1, minimumValue: 0.5 }
        },
        links: {
          enable: true,
          distance: 140,
          color: '#ffffff',
          opacity: 0.06,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' }
        }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: { enable: true, mode: 'grab' },
          resize: true
        },
        modes: {
          grab: { distance: 150, links: { opacity: 0.15 } }
        }
      },
      detectRetina: true
    });
  }

  // ============================================
  // 7. MAGNETIC BUTTONS
  // ============================================
  function initMagneticButtons() {
    if (window.innerWidth < 768) return;

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        btn.style.transform = `translate(${deltaX * 4}px, ${deltaY * 3}px)`;
        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================
  // 8. FLOATING ICONS
  // ============================================
  function initFloatingIcons() {
    const industryItems = document.querySelectorAll('.industry-item');
    industryItems.forEach((item) => {
      item.classList.add('float-icon');
    });
  }

  // ============================================
  // 9. IMAGE REVEAL MASK
  // ============================================
  function initImageReveal() {
    const imgBlocks = document.querySelectorAll('.about-img-block, .product-detail-img');
    if (imgBlocks.length === 0) return;

    imgBlocks.forEach(block => {
      block.classList.add('image-reveal');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      observer.observe(block);
    });
  }

  // ============================================
  // 10. MAP SECTION REVEAL
  // ============================================
  function initMapReveal() {
    const map = document.querySelector('.map-section');
    if (!map) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(map);
  }

  // ============================================
  // 11. TEXT SPLIT ANIMATION
  // ============================================
  function initTextSplitAnimation() {
    if (typeof gsap === 'undefined') return;

    // Animate the main hero h1
    const heroH1 = document.querySelector('.hero-content h1');
    if (heroH1) {
      const text = heroH1.innerHTML;
      const words = text.split(/(<br\s*\/?>)/gi);
      let result = '';
      words.forEach(segment => {
        if (segment.match(/<br\s*\/?>/i)) {
          result += segment;
        } else {
          const wordArr = segment.split(' ').filter(w => w.length > 0);
          wordArr.forEach((word, i) => {
            result += `<span class="word"><span class="char">${word}</span></span>`;
            if (i < wordArr.length - 1) result += ' ';
          });
        }
      });

      heroH1.innerHTML = result;
      heroH1.classList.add('split-text');

      const chars = heroH1.querySelectorAll('.char');
      gsap.fromTo(chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }

  // ============================================
  // 12. ENHANCED COUNTER ANIMATION
  // ============================================
  function initEnhancedCounters() {
    if (typeof gsap === 'undefined') return;

    const counters = document.querySelectorAll('.stat-num');
    if (counters.length === 0) return;

    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      if (!target) return;

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.floor(obj.val);
            },
            onComplete: () => {
              counter.textContent = target;
              counter.classList.add('counted');

              // Pulse effect
              gsap.fromTo(counter,
                { scale: 1 },
                { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }
              );
            }
          });
        }
      });
    });
  }

  // ============================================
  // 13. PARALLAX EFFECTS (GSAP ScrollTrigger)
  // ============================================
  function initParallaxHero() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      initBasicParallax();
      return;
    }

    // --- HERO MULTI-LAYER PARALLAX ---
    const heroSlides = document.querySelector('.hero-slides');
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroTag = document.querySelector('.hero-content .hero-tag');
    const heroH1 = document.querySelector('.hero-content h1');
    const heroSub = document.querySelector('.hero-sub');
    const heroActions = document.querySelector('.hero-actions');
    const heroParticles = document.getElementById('hero-particles');

    if (heroSlides) {
      gsap.to(heroSlides, {
        y: 200,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
      });
    }

    if (heroOverlay) {
      gsap.to(heroOverlay, {
        y: 100,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
      });
    }

    if (heroParticles) {
      gsap.to(heroParticles, {
        y: 150,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.3 }
      });
    }

    // Depth for text layers
    if (heroTag) {
      gsap.to(heroTag, {
        y: -30, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: 0.8 }
      });
    }

    if (heroH1) {
      gsap.to(heroH1, {
        y: -60, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '65% top', scrub: 0.6 }
      });
    }

    if (heroSub) {
      gsap.to(heroSub, {
        y: -90, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '70% top', scrub: 0.7 }
      });
    }

    if (heroActions) {
      gsap.to(heroActions, {
        y: -120, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: 0.9 }
      });
    }

    // --- PAGE HERO PARALLAX ---
    const pageHero = document.querySelector('.page-hero');
    const pageHeroContent = document.querySelector('.page-hero-content');
    
    if (pageHero) {
      gsap.fromTo(pageHero, 
        { backgroundPositionY: '0%' },
        { 
          backgroundPositionY: '50%', 
          ease: 'none',
          scrollTrigger: { trigger: pageHero, start: 'top top', end: 'bottom top', scrub: true }
        }
      );
    }
    
    if (pageHeroContent) {
      gsap.to(pageHeroContent, {
        y: 80, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: pageHero, start: 'top top', end: 'bottom top', scrub: 1 }
      });
    }

    // --- PRODUCT IMAGES INNER PARALLAX ---
    const productDetailImgs = document.querySelectorAll('.product-detail-img');
    productDetailImgs.forEach(img => {
      gsap.fromTo(img,
        { backgroundPositionY: '-20%' },
        {
          backgroundPositionY: '20%',
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 }
        }
      );
    });

    const productImgs = document.querySelectorAll('.product-card .product-img');
    productImgs.forEach(img => {
      gsap.fromTo(img,
        { backgroundPositionY: '0%' },
        {
          backgroundPositionY: '100%',
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );
    });

    // --- SECTION TITLES PARALLAX OFFSETS ---
    const sectionLabels = document.querySelectorAll('.section-label');
    sectionLabels.forEach(label => {
      gsap.to(label, {
        y: -20,
        ease: 'none',
        scrollTrigger: { trigger: label.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    });

    // --- SERVICE ICONS FLOAT ---
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
      gsap.to(icon, {
        y: -15,
        ease: 'none',
        scrollTrigger: { trigger: icon.closest('.service-card'), start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });

    // --- ABOUT IMAGE PARALLAX BLOCK ---
    const aboutImgBlock = document.querySelector('.about-img-block');
    if (aboutImgBlock) {
      gsap.fromTo(aboutImgBlock,
        { y: 30, backgroundPositionY: '-10%' },
        {
          y: -30, backgroundPositionY: '10%',
          ease: 'none',
          scrollTrigger: { trigger: aboutImgBlock.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );
    }
  }

  // Fallback for non-GSAP environments
  function initBasicParallax() {
    const heroSlides = document.querySelector('.hero-slides');
    const pageHero = document.querySelector('.page-hero');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      if (heroSlides) {
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 800;
        if (scrollY < heroHeight) {
          heroSlides.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
      }

      if (pageHero && scrollY < 500) {
        pageHero.style.backgroundPositionY = `${scrollY * 0.4}px`;
      }
    }, { passive: true });
  }

  // ============================================
  // 14. SECTION TITLE ANIMATION
  // ============================================
  function initSectionTitleAnimation() {
    const titles = document.querySelectorAll('.section-title');
    if (titles.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    titles.forEach(t => observer.observe(t));
  }

  // ============================================
  // 15. STAGGER LIST ITEMS
  // ============================================
  function initStaggerItems() {
    const features = document.querySelectorAll('.product-features li, .about-values .value-item');
    features.forEach(item => item.classList.add('stagger-item'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll('.stagger-item');
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
    }, { threshold: 0.15 });

    features.forEach(item => observer.observe(item));
  }

  // ============================================
  // 16. CONFETTI ON FORM SUCCESS
  // ============================================
  function initConfetti() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    if (!form || !successMsg) return;

    // Watch for success state
    const formObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains('visible')) {
          triggerConfetti();
        }
      });
    });

    formObserver.observe(successMsg, { attributes: true, attributeFilter: ['class'] });
  }

  function triggerConfetti() {
    const colors = ['#2E4EA1', '#6b8cff', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.top = '-10px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (Math.random() * 8 + 4) + 'px';
      piece.style.height = (Math.random() * 8 + 4) + 'px';
      piece.style.animationDuration = (Math.random() * 1 + 1) + 's';
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      document.body.appendChild(piece);

      // Cleanup
      setTimeout(() => piece.remove(), 2500);
    }
  }

});
