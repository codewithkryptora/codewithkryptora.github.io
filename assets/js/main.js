// AOS
AOS.init({ once: true, duration: 700, offset: 60 });

// Typed hero
new Typed('#typed', {
  strings: ['I build models ↗', 'I deploy ML to prod ⚙️', 'I love causal experiments 🧪', 'I make data beautiful 📊'],
  typeSpeed: 45, backSpeed: 18, backDelay: 1200, loop: true
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
function setTheme(t){
  document.documentElement.setAttribute('data-bs-theme', t);
  localStorage.setItem('theme', t);
  themeToggle.innerHTML = t === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
}
const saved = localStorage.getItem('theme'); setTheme(saved || 'dark');
themeToggle.addEventListener('click', ()=> setTheme(document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'));

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', ()=>{ backToTop.style.display = window.scrollY > 500 ? 'inline-flex' : 'none'; });
backToTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// Year + name sync
document.getElementById('year').textContent = new Date().getFullYear();

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  projects.forEach(card => {
    const show = f === 'all' || card.dataset.category === f;
    card.style.display = show ? '' : 'none';
  });
}));

// Animated counters
const counters = document.querySelectorAll('#stats [data-count]');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target; const target = +el.dataset.count; let cur = 0; const step = Math.ceil(target/50);
      const tick = () => { cur += step; if(cur>target) cur = target; el.textContent = cur; if(cur<target) requestAnimationFrame(tick); };
      tick(); io.unobserve(el);
    }
  });
}, { threshold: .5 });
counters.forEach(c => io.observe(c));

// Contact form (demo)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const toast = new bootstrap.Toast(document.getElementById('liveToast'));
  toast.show();
  contactForm.reset();
});

/* --- Personalization (edit these) --- */
const PROFILE = {
  name: 'YOUR_NAME',
  email: 'you@example.com',
  phone: '+91 12345 67890',
  links: {
    github: '#',
    linkedin: '#',
    twitter: '#',
    kaggle: '#'
  }
};
document.getElementById('yourName').textContent = PROFILE.name;
document.getElementById('footerName').textContent = PROFILE.name;
document.getElementById('emailLink').href = `mailto:${PROFILE.email}`;
document.getElementById('emailLink').textContent = PROFILE.email;
document.getElementById('phoneLink').href = `tel:${PROFILE.phone.replace(/\s+/g,'')}`;
document.getElementById('phoneLink').textContent = PROFILE.phone;
document.getElementById('githubLink').href = PROFILE.links.github;
document.getElementById('linkedinLink').href = PROFILE.links.linkedin;
document.getElementById('twitterLink').href = PROFILE.links.twitter;
document.getElementById('kaggleLink').href = PROFILE.links.kaggle;
