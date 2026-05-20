// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', e => {
  if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Contact form
const form       = document.getElementById('contactForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const submitBtn  = document.getElementById('submitBtn');
const formOk     = document.getElementById('formSuccess');

const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

emailInput.addEventListener('input', () => {
  emailInput.classList.remove('err');
  emailError.textContent = '';
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const val = emailInput.value.trim();

  if (!val) {
    emailInput.classList.add('err');
    emailError.textContent = 'El correo es obligatorio.';
    emailInput.focus();
    return;
  }

  if (!isValidEmail(val)) {
    emailInput.classList.add('err');
    emailError.textContent = 'Ingresa un correo valido.';
    emailInput.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';
    formOk.classList.add('visible');
    setTimeout(() => formOk.classList.remove('visible'), 5000);
  }, 800);
});
