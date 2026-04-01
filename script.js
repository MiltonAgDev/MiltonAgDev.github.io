/* ============================================
   MILTON AGUIRRE - PORTFOLIO JS (fixed)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ─────────────────────────
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── HERO: force visible immediately on load ─
  function showHeroElements() {
    const heroSection = document.getElementById('inicio');
    if (!heroSection) return;
    heroSection.querySelectorAll('.reveal-up, .reveal-right, .reveal-left').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 150);
    });
  }
  showHeroElements();
  setTimeout(showHeroElements, 400);

  // ── SCROLL REVEAL (sections outside hero) ──
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── SKILL BARS ─────────────────────────────
  const skillBars = document.querySelectorAll('.skill-bar');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        setTimeout(() => { bar.style.width = bar.getAttribute('data-level') + '%'; }, 200);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => barObserver.observe(bar));

  // ── ACTIVE NAV LINK ─────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObserver.observe(s));

  // ── NAVBAR MOBILE CLOSE ─────────────────────
  const navbarCollapse = document.getElementById('navMenu');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsc = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsc) bsc.hide();
      }
    });
  });

  // ── ROLES STAGGER ───────────────────────────
  const roleItems = document.querySelectorAll('.role-item');
  roleItems.forEach(item => { item.style.opacity = '0'; item.style.transform = 'translateY(20px)'; });
  const rolesSection = document.querySelector('.roles-section');
  if (rolesSection) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        roleItems.forEach((item, i) => {
          setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, i * 70);
        });
      }
    }, { threshold: 0.15 }).observe(rolesSection);
  }

  // ── SMOOTH SCROLL ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
      }
    });
  });

});
