
// basic animations: reveal on scroll, counters, contact form handling
document.addEventListener('DOMContentLoaded', () => {
  // reveal elements
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('show'));
  }

  // counters
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(el => {
    const target = +el.dataset.target || 0;
    let count = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = count;
      }
    }, 20);
  });

  // contact form demo
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      // For demo: open mail client with prefilled content
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const phone = data.get('phone') || '';
      const course = data.get('course') || '';
      const message = data.get('message') || '';
      const subject = encodeURIComponent('New Enquiry: ' + (course || 'General'));
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nCourse: ' + course + '\n\nMessage:\n' + message);
      window.location.href = 'mailto:admissions@kryptora.com?subject=' + subject + '&body=' + body;
    });
  }
});
