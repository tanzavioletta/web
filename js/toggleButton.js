document.addEventListener("DOMContentLoaded", () => {
  const navMenuWrapper = document.getElementById("nav-menu");
  const btnOpen = document.getElementById("nav-toggle-open");
  const btnClose = document.getElementById("nav-toggle-close");

  // --- Lógica para abrir y cerrar el menú ---
  btnOpen.addEventListener("click", () => {
    navMenuWrapper.classList.add("show-mobile-menu");
    btnOpen.setAttribute("aria-expanded", "true"); // Accesibilidad: indica que está abierto
  });

  btnClose.addEventListener("click", () => {
    navMenuWrapper.classList.remove("show-mobile-menu");
    btnOpen.setAttribute("aria-expanded", "false"); // Accesibilidad: indica que está cerrado
  });

  // --- Solución al parpadeo (flash) al redimensionar la pantalla ---
  let resizeTimer;
  window.addEventListener("resize", () => {
    // Agregamos la clase que quita las transiciones mientras se mueve la ventana
    document.body.classList.add("resize-animation-stopper");

    // Limpiamos el temporizador si el usuario sigue moviendo la ventana
    clearTimeout(resizeTimer);

    // Quitamos la clase 400ms después de que el usuario dejó de redimensionar
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");

      // Opcional: Cerrar el menú automáticamente si volvemos a vista de escritorio
      if (window.innerWidth > 955) {
        navMenuWrapper.classList.remove("show-mobile-menu");
        btnOpen.setAttribute("aria-expanded", "false");
      }
    }, 400);
  });
});
