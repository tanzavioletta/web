document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#nav-toggle');
  const mobileMenuWrapper = document.querySelector('#mobile-wrapper');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link a');

  // Función para abrir
  function openMenu() {
    mobileMenuWrapper.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
  }

  // Función para cerrar
  function closeMenu() {
    if (mobileMenuWrapper.classList.contains('open')) {
      mobileMenuWrapper.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    }
  }

  // 1. Alternar con el botón
  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el evento "click afuera" cierre el menú inmediatamente
    const isOpen = mobileMenuWrapper.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // 2. Cerrar con la tecla Escape (Accesibilidad)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // 3. Cerrar al hacer clic fuera del header
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      closeMenu();
    }
  });

  // 4. Cerrar al hacer scroll 
  window.addEventListener('scroll', closeMenu, { passive: true });

  // 5. Cerrar al hacer clic en cualquier enlace del menú
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});