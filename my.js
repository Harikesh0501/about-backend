// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active section in navbar on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  let scrollPos = window.scrollY || window.pageYOffset;
  let found = false;
  sections.forEach(section => {
    const top = section.offsetTop - 90;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < bottom && !found) {
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector(`nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
      found = true;
    }
  });
});

// Hamburger menu toggle for mobile
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Contact form AJAX submit to backend (UPDATED URL)
const contactForm = document.querySelector('.contact form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('https://your-backend-api.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert('Thank you for contacting me! I will get back to you soon.');
        contactForm.reset();
      } else {
        alert('There was an error. Please try again.');
      }
    } catch (err) {
      alert('Could not connect to the server. Please try again later.');
    }
  });
}
