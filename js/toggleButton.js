document.addEventListener("DOMContentLoaded", () => {
  // Elementos del menú
  const menuToggle = document.getElementById("menu-toggle");
  const openButton = document.querySelector(".nav-toggle-open");
  const navLinks = document.querySelectorAll(".nav-link");

  // Función para cerrar el menú (desmarcar el checkbox)
  const closeMenu = () => {
    if (menuToggle && menuToggle.checked) {
      menuToggle.checked = false;
      if (openButton) openButton.setAttribute("aria-expanded", "false");
    }
  };

  // Cerrar el menú al hacer clic en cualquier enlace de navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Sincronizar el atributo aria-expanded con el estado del checkbox
  if (menuToggle) {
    menuToggle.addEventListener("change", () => {
      const isExpanded = menuToggle.checked;
      if (openButton) openButton.setAttribute("aria-expanded", isExpanded);
    });
    // Estado inicial
    if (openButton) openButton.setAttribute("aria-expanded", "false");
  }

  // Evitar parpadeos en redimensionado y cerrar si pasa a escritorio
  let resizeTimer;
  window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
      if (window.innerWidth > 955 && menuToggle && menuToggle.checked) {
        closeMenu();
      }
    }, 400);
  });
});
