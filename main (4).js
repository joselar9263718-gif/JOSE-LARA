// ============================================
//  PALABRAS QUE CONSTRUYEN — main.js
// ============================================

// ----- NAV MOBILE -----
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// ----- FRASES MOTIVACIONALES (Página principal) -----
const frases = [
  "Las palabras que eliges hoy construyen la persona que serás mañana.",
  "Comunicarte con respeto no es debilidad, es una fortaleza que pocos dominan.",
  "El vocabulario rico es la llave que abre puertas que las groserías mantienen cerradas.",
  "Tu forma de hablar es el espejo de tu mente; cuídala, puléla, hazla brillar.",
  "Una sola palabra amable puede cambiar el día de alguien para siempre.",
  "Elegir las palabras correctas es un acto de amor hacia ti mismo y hacia los demás.",
  "La comunicación respetuosa transforma conflictos en conversaciones, y extraños en amigos."
];

let fraseIndex = 0;

function mostrarFrase() {
  const el = document.getElementById('motivationalQuote');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = frases[fraseIndex];
    el.style.opacity = '1';
    fraseIndex = (fraseIndex + 1) % frases.length;
  }, 400);
}

const quoteEl = document.getElementById('motivationalQuote');
if (quoteEl) {
  mostrarFrase();
  setInterval(mostrarFrase, 5000);
  quoteEl.style.transition = 'opacity 0.4s ease';
}

// ----- CONTADOR DE ESTADÍSTICAS -----
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// Intersection Observer para los contadores
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsSection);
}

// ----- CAROUSEL DE FRASES (Página informativa) -----
let currentSlide = 0;
const slides = document.querySelectorAll('.quote-slide');
const dotsContainer = document.getElementById('dots');

if (slides.length > 0 && dotsContainer) {
  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
  }

  window.nextQuote = () => goToSlide(currentSlide + 1);
  window.prevQuote = () => goToSlide(currentSlide - 1);

  // Auto-advance
  setInterval(() => goToSlide(currentSlide + 1), 6000);
}

// ----- VALIDACIÓN DEL FORMULARIO -----
window.enviarFormulario = function () {
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');

  if (!nombre) return; // Not on contact page

  let valid = true;

  // Reset errors
  [nombre, email, mensaje].forEach(field => {
    field.classList.remove('error');
  });
  document.querySelectorAll('.field-error').forEach(e => e.textContent = '');

  // Validate nombre
  if (!nombre.value.trim()) {
    showError(nombre, 'error-nombre', 'Por favor ingresa tu nombre completo.');
    valid = false;
  } else if (nombre.value.trim().length < 3) {
    showError(nombre, 'error-nombre', 'El nombre debe tener al menos 3 caracteres.');
    valid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showError(email, 'error-email', 'Por favor ingresa tu correo electrónico.');
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, 'error-email', 'Ingresa un correo electrónico válido.');
    valid = false;
  }

  // Validate mensaje
  if (!mensaje.value.trim()) {
    showError(mensaje, 'error-mensaje', 'Por favor escribe tu mensaje o comentario.');
    valid = false;
  } else if (mensaje.value.trim().length < 10) {
    showError(mensaje, 'error-mensaje', 'El mensaje debe tener al menos 10 caracteres.');
    valid = false;
  }

  if (valid) {
    // Simulate sending (mailto fallback)
    const destinatario = 'tucorreo@ejemplo.com'; // ← Cambiar por tu correo real
    const asunto = encodeURIComponent('Mensaje desde el sitio Palabras que Construyen');
    const cuerpo = encodeURIComponent(
      `Nombre: ${nombre.value.trim()}\nCorreo: ${email.value.trim()}\n\nMensaje:\n${mensaje.value.trim()}`
    );

    // Open mail client
    window.location.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;

    // Show success message
    const successMsg = document.getElementById('successMsg');
    if (successMsg) {
      successMsg.style.display = 'flex';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset form
    document.getElementById('contactForm').reset();
  }
};

function showError(field, errorId, message) {
  field.classList.add('error');
  const errEl = document.getElementById(errorId);
  if (errEl) errEl.textContent = message;
  field.focus();
}

// ----- SCROLL ANIMATIONS -----
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .impact-card, .tip-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animateOnScroll.observe(el);
});
