/* ============================================================
   ECOBLACK — Landing Page B2B
   script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. HEADER CON SOMBRA AL HACER SCROLL
     ---------------------------------------------------------- */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });

  /* ----------------------------------------------------------
     2. MENÚ MÓVIL (hamburguesa)
     ---------------------------------------------------------- */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------
     3. SCROLL REVEAL — animación de entrada para tarjetas
     ---------------------------------------------------------- */
  const revealSelectors = '.card, .aplic-card, .cliente-item, .flow-step, .section-head, .media-card, .form-card';
  const revealEls = document.querySelectorAll(revealSelectors);
  revealEls.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Navegadores sin soporte de IntersectionObserver: mostrar todo directamente
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ----------------------------------------------------------
     4. FORMULARIO DE CONTACTO — ESTADO ACTUAL: DEMO VISUAL
     ----------------------------------------------------------
     IMPORTANTE: este formulario NO envía datos reales todavía.
     El código de abajo solo simula visualmente una confirmación
     de envío para efectos de la demo / presentación al cliente.

     No se realiza ninguna petición de red, no se guarda ningún
     dato y no se promete el envío de muestras físicas.

     PARA PRODUCCIÓN, conectar este formulario a uno de estos canales:
       - Backend propio (Node.js / PHP / Python) que reciba el
         POST del formulario y lo despache por correo o a una BD.
       - Servicio de formularios listo para usar
         (Formspree, Web3Forms, Getform, etc.) vía fetch() al
         endpoint correspondiente.
       - Integración directa con CRM (HubSpot, Pipedrive, etc.)
         mediante su API o un formulario embebido.
       - Automatización low-code: Google Sheets, Make.com o n8n
         recibiendo los datos vía webhook.

     Al conectar un canal real, reemplazar el bloque de
     "preventDefault + mensaje simulado" por el envío real
     (fetch/AJAX) y manejar los estados de éxito/error según
     la respuesta del servicio elegido.
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita el envío real mientras no haya backend conectado

      const submitBtn = contactForm.querySelector('.form-submit');
      if (submitBtn) {
        submitBtn.textContent = 'Solicitud recibida. El equipo comercial revisará la información y se pondrá en contacto.';
        submitBtn.disabled = true;
      }

      // TODO (producción): reemplazar este bloque por el envío real, ej:
      //
      // fetch('https://TU-ENDPOINT-AQUI', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     nombre: document.getElementById('nombre').value,
      //     empresa: document.getElementById('empresa').value,
      //     cargo: document.getElementById('cargo').value,
      //     pais: document.getElementById('pais').value,
      //     correo: document.getElementById('correo').value,
      //     telefono: document.getElementById('telefono').value,
      //     industria: document.getElementById('industria').value,
      //     mensaje: document.getElementById('mensaje').value
      //   })
      // })
      // .then(response => { /* manejar éxito */ })
      // .catch(error => { /* manejar error */ });
    });
  }

  /* ----------------------------------------------------------
     5. VIDEO HERO — reproducción robusta
     ----------------------------------------------------------
     El video de fondo está en modo muted/autoplay/loop para uso
     visual. Este bloque intenta reiniciar la reproducción si el
     navegador la pausa al cargar o al volver a la pestaña.
     ---------------------------------------------------------- */
  const heroVideo = document.querySelector('.hero-bg-video');
  if (heroVideo) {
    const tryPlayHeroVideo = () => {
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Si el navegador bloquea autoplay, queda visible el poster.
        });
      }
    };
    tryPlayHeroVideo();
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tryPlayHeroVideo();
    });
  }

});
