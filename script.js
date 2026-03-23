// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const saved = localStorage.getItem('theme') || 'light';
body.classList.remove('light-mode','dark-mode');
body.classList.add(saved + '-mode');

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-mode');
  body.classList.toggle('dark-mode', !isDark);
  body.classList.toggle('light-mode', isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// Typing animation
const phrases = [
  'AI & Data Science Enthusiast',
  'Problem Solver in C++',
  'Full Stack Developer',
  'Data-Driven Thinker',
  'B.Tech CSE @ LPU'
];
let pi = 0, ci = 0, del = false;
const el = document.getElementById('typingText');
function type() {
  const cur = phrases[pi];
  el.textContent = del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
  del ? ci-- : ci++;
  let speed = del ? 36 : 62;
  if (!del && ci === cur.length) { speed = 2200; del = true; }
  else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; speed = 500; }
  setTimeout(type, speed);
}
type();

// Hero number counters
function counter(el, target) {
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(n + 1, target);
    el.textContent = n + '+';
    if (n >= target) clearInterval(t);
  }, 55);
}
const numbersObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.hn-val').forEach(el => {
        counter(el, parseInt(el.dataset.target));
      });
      numbersObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
const nums = document.querySelector('.hero-numbers');
if (nums) numbersObserver.observe(nums);

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Skill bar fill
const so = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      so.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sr-fill').forEach(el => so.observe(el));

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
