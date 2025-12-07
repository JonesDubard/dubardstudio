// theme toggle + persistence
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('dubard-theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
root.setAttribute('data-theme', initialTheme);
if (themeToggle) themeToggle.setAttribute('aria-pressed', initialTheme === 'dark');

// toggle handler
themeToggle && themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('dubard-theme', next);
  themeToggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
  themeToggle.animate([{ transform:'scale(1)' }, { transform:'scale(.96)' }, { transform:'scale(1)' }], { duration:220 });
});

// mobile menu toggle & sticky dropdown
const menuBtn = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const hamburgerIcon = document.getElementById('hamburgerIcon');
menuBtn && menuBtn.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');

  // rotate hamburger slightly for feedback
  if (open) hamburgerIcon.style.transform = 'rotate(90deg)';
  else hamburgerIcon.style.transform = 'rotate(0deg)';

  // ensure sticky at top by toggling style
  if (open) {
    mobileNav.style.position = 'fixed';
    mobileNav.style.top = '0';
  } else {
    mobileNav.style.position = '';
  }
});

// close mobile nav when link clicked
document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  hamburgerIcon.style.transform = 'rotate(0deg)';
}));

// intersection observer for section appear
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.section-appear').forEach(el => observer.observe(el));

// testimonials carousel (auto-rotate + controls)
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
let currentTestimonial = 0;
const showTestimonial = (index) => {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
};
if (testimonials.length) {
  showTestimonial(0);
  const nextBtn = document.getElementById('nextTestimonial');
  const prevBtn = document.getElementById('prevTestimonial');

  nextBtn && nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
    resetTestimonialTimer();
  });
  prevBtn && prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
    resetTestimonialTimer();
  });

  let testimonialTimer = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 6000);

  const resetTestimonialTimer = () => {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 6000);
  };
}

// Back to top behavior
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// project hover stagger (small load animation)
window.addEventListener('load', () => {
  document.querySelectorAll('.project').forEach((p, i) => { p.style.transitionDelay = `${i * 80}ms`; });
});

// Contact form UX - small toast on submit (Netlify handles real submit)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.textContent = 'Thanks — your message was sent!';
      el.style.position = 'fixed'; el.style.right = '16px'; el.style.bottom = '24px';
      el.style.padding = '12px 16px'; el.style.background = 'var(--accent)'; el.style.color = '#fff';
      el.style.borderRadius = '10px'; el.style.zIndex = 9999; document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }, 300);
  });
}

// footer year
document.getElementById('year').textContent = new Date().getFullYear();
