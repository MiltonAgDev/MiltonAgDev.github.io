/* ============================================
   MILTON AGUIRRE - PORTFOLIO JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ─────────────────────────
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── SMOOTH ACTIVE NAV LINK ─────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observerNav.observe(s));

  // ── SCROLL REVEAL ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── SKILL BARS ─────────────────────────────
  const skillBars = document.querySelectorAll('.skill-bar');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
          bar.style.width = `${level}%`;
        }, 300);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach(bar => barObserver.observe(bar));

  // ── TYPED HERO SUBTITLE ────────────────────
  const subtitleEl = document.querySelector('.hero-subtitle');
  if (subtitleEl) {
    const originalHTML = subtitleEl.innerHTML;
    // Just ensure it's visible with a slight fade-in after page load
    subtitleEl.style.opacity = '0';
    setTimeout(() => {
      subtitleEl.style.transition = 'opacity 1s ease';
      subtitleEl.style.opacity = '1';
    }, 800);
  }

  // ── HERO CONTENT INITIAL ANIMATION ─────────
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.querySelectorAll('.reveal-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 160);
      });
    }, 200);
  }

  const heroCard = document.querySelector('.reveal-right');
  if (heroCard) {
    setTimeout(() => heroCard.classList.add('visible'), 600);
  }

  // ── CONTACT FORM ───────────────────────────
  window.handleSubmit = function(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Enviando...';

    setTimeout(() => {
      form.classList.add('d-none');
      success.classList.remove('d-none');
    }, 1500);
  };

  // ── NAVBAR COLLAPSE ON LINK CLICK (mobile) ──
  const navbarCollapse = document.getElementById('navMenu');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ── ROLE ITEMS STAGGERED ENTRANCE ──────────
  const roleItems = document.querySelectorAll('.role-item');
  const rolesObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      roleItems.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          item.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          });
        }, i * 60);
      });
      rolesObserver.disconnect();
    }
  }, { threshold: 0.2 });

  const rolesSection = document.querySelector('.roles-section');
  if (rolesSection) rolesObserver.observe(rolesSection);

  // Init roles hidden
  roleItems.forEach(item => { item.style.opacity = '0'; });

  // ── SMOOTH SCROLL OFFSET FOR FIXED NAV ─────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
