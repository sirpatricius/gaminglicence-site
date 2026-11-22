document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      form.reset();
      status.textContent = 'Thank you — we will be in touch shortly.';
    } else {
      status.textContent = data.error || 'Something went wrong. Please email info@gaminglicence.uk.';
    }
  } catch {
    status.textContent = 'Could not send. Please email info@gaminglicence.uk.';
  }
});
