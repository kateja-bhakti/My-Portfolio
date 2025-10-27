/* =========================================
Theme toggle (persist)
========================================= */
const THEME_KEY = 'portfolio-theme';
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem(THEME_KEY);

// Check for saved theme or system preference
if (savedTheme === 'dark') body.setAttribute('data-theme', 'dark');
else if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
body.setAttribute('data-theme', 'dark');
}

function animateThemeToggle() {
themeToggle.classList.add('rotated');
setTimeout(()=> themeToggle.classList.remove('rotated'), 700);
}

themeToggle.addEventListener('click', () => {
const isDark = body.getAttribute('data-theme') === 'dark';
if (isDark) {
body.removeAttribute('data-theme');
localStorage.setItem(THEME_KEY, 'light');
} else {
body.setAttribute('data-theme', 'dark');
localStorage.setItem(THEME_KEY, 'dark');
}
animateThemeToggle();
});

/* =========================================
Mobile burger toggle
========================================= */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger) {
burger.addEventListener('click', () => {
const cur = getComputedStyle(navLinks).display;
navLinks.style.display = cur === 'flex' ? 'none' : 'flex';
navLinks.style.flexDirection = 'column';
navLinks.style.position = 'absolute';
navLinks.style.right = '20px';
navLinks.style.top = '64px';
navLinks.style.background = 'var(--card)';
navLinks.style.padding = '12px';
navLinks.style.borderRadius = '12px';
navLinks.style.boxShadow = 'var(--shadow)';
});
}

/* =========================================
Header shadow on scroll + active nav highlight
========================================= */
const header = document.getElementById('siteHeader');
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
if (window.scrollY > 40) header.classList.add('scrolled');
else header.classList.remove('scrolled');
});

const navObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
  navItems.forEach(n => n.classList.toggle('active', n.getAttribute('href') === `#${entry.target.id}`));
}
});
}, { threshold: 0.55 });

sections.forEach(s => navObserver.observe(s));

/* =========================================
Reveal on scroll (stagger quicker)
========================================= */
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) entry.target.classList.add('revealed');
});
}, { threshold: 0.12 });

reveals.forEach((r, i) => {
r.style.transitionDelay = `${Math.min(i * 45, 400)}ms`;
obs.observe(r);
});

/* =========================================
Typewriter (hero) - faster
========================================= */
const typeEl = document.getElementById('typewriter');
// UPDATED PHRASES to match Java/Software Developer focus
const phrases = ["Java & Web Enthusiast", "Logical Problem Solver", "BCA Student (1st Rank Holder)", "Aspiring Software Engineer"]; 
let pIndex = 0, chIndex = 0, typing = true;

function typeLoop() {
if (!typeEl) return;
const current = phrases[pIndex];

if (typing) {
if (chIndex <= current.length) {
  typeEl.textContent = current.slice(0, chIndex) + (chIndex % 2 === 0 ? '|' : '');
  chIndex++;
  setTimeout(typeLoop, 60);
} else {
  typing = false;
  setTimeout(typeLoop, 700);
}
} else {
if (chIndex >= 0) {
  typeEl.textContent = current.slice(0, chIndex) + (chIndex % 2 === 0 ? '|' : '');
  chIndex--;
  setTimeout(typeLoop, 30);
} else {
  typing = true;
  pIndex = (pIndex + 1) % phrases.length;
  setTimeout(typeLoop, 250);
}
}
}

window.addEventListener('load', () => typeLoop());

/* =========================================
Certificate modal (lightbox)
========================================= */
const certThumbs = document.querySelectorAll('.cert-thumb');
const certModal = document.getElementById('cert-modal');
const certImg = document.getElementById('cert-img');
const certClose = document.querySelector('.modal-close');

function openCert(src, alt='Certificate') {
certImg.src = src;
certImg.alt = alt;
certModal.setAttribute('aria-hidden','false');
certClose.focus();
}

function closeCert() {
certModal.setAttribute('aria-hidden','true');
certImg.src = '';
}

certThumbs.forEach(card => {
const src = card.getAttribute('data-cert');
card.addEventListener('click', () => openCert(src, card.querySelector('h4')?.innerText || 'Certificate'));
const btn = card.querySelector('.view-cert');
if (btn) btn.addEventListener('click', (e) => { e.stopPropagation(); openCert(src, card.querySelector('h4')?.innerText || 'Certificate'); });
});

if (certClose) certClose.addEventListener('click', closeCert);
certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCert(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && certModal.getAttribute('aria-hidden') === 'false') closeCert(); });

/* =========================================
Scroll to top button
========================================= */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
if (window.scrollY > 420) scrollTopBtn.classList.add('show');
else scrollTopBtn.classList.remove('show');
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* =========================================
Smooth anchor scroll & close mobile nav
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click', function(e){
const href = this.getAttribute('href');
if (href.startsWith('#')) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  if (window.innerWidth <= 880 && navLinks) navLinks.style.display = 'none';
}
});
});

/* =========================================
Set current year
========================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();