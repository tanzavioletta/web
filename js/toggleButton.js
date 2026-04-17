/**
 * toggleButton.js
 * Gestiona la apertura/cierre del menú de navegación móvil.
 *
 * Mejoras respecto a la versión original:
 * - Usa <button> reales en lugar de labels vinculados a un checkbox oculto.
 * - Cierra el menú con la tecla Escape.
 * - Cierra el menú al hacer clic en el overlay.
 * - Devuelve el foco al botón de apertura al cerrar (accesibilidad).
 * - Gestiona el atributo `hidden` del wrapper para el correcto comportamiento
 *   del atributo `aria-modal` en lectores de pantalla.
 * - Cierra el menú al redimensionar a escritorio, evitando parpadeos.
 */

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("nav-open-btn");
  const closeBtn = document.getElementById("nav-close-btn");
  const menuWrapper = document.getElementById("nav-menu-wrapper");
  const overlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link");

  // Breakpoint sincronizado con la media query del CSS
  const DESKTOP_BREAKPOINT = 956;

  // ── Helpers ────────────────────────────────────────────────────────────────

  /**
   * Abre el menú lateral móvil.
   */
  function openMenu() {
    menuWrapper.removeAttribute("hidden");
    // Forzar reflow para que la transición CSS funcione
    menuWrapper.getBoundingClientRect();
    menuWrapper.classList.add("is-open");
    overlay.classList.add("is-visible");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Bloquea scroll del fondo

    // Mueve el foco al botón de cierre dentro del menú
    closeBtn.focus();
  }

  /**
   * Cierra el menú lateral móvil.
   * @param {boolean} [returnFocus=true] - Si debe devolver el foco al botón de apertura.
   */
  function closeMenu(returnFocus = true) {
    menuWrapper.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    if (returnFocus) {
      openBtn.focus();
    }

    // Espera a que termine la transición CSS antes de ocultar con `hidden`
    menuWrapper.addEventListener(
      "transitionend",
      () => {
        // Solo ocultar si el menú sigue cerrado (el usuario no lo volvió a abrir)
        if (!menuWrapper.classList.contains("is-open")) {
          menuWrapper.setAttribute("hidden", "");
        }
      },
      { once: true },
    );
  }

  // ── Event listeners ────────────────────────────────────────────────────────

  // Abrir menú
  openBtn?.addEventListener("click", openMenu);

  // Cerrar menú con el botón interno
  closeBtn?.addEventListener("click", () => closeMenu(true));

  // Cerrar menú al hacer clic en el overlay
  overlay?.addEventListener("click", () => closeMenu(true));

  // Cerrar menú al hacer clic en un enlace de navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu(false));
  });

  // Cerrar menú con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuWrapper.classList.contains("is-open")) {
      closeMenu(true);
    }
  });

  // ── Resize: cerrar si se pasa a desktop ───────────────────────────────────

  let resizeTimer;

  window.addEventListener("resize", () => {
    // Evita parpadeos durante el redimensionado
    document.body.classList.add("resize-animation-stopper");

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");

      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        // En desktop: resetea el estado sin redirigir el foco
        menuWrapper.classList.remove("is-open");
        overlay.classList.remove("is-visible");
        openBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";

        // En desktop el wrapper siempre es visible (CSS lo gestiona)
        menuWrapper.removeAttribute("hidden");
      }
    }, 150);
  });

  // ── Estado inicial ─────────────────────────────────────────────────────────

  // En desktop el menú siempre visible; en móvil comienza oculto
  if (window.innerWidth < DESKTOP_BREAKPOINT) {
    menuWrapper.setAttribute("hidden", "");
  }

  openBtn?.setAttribute("aria-expanded", "false");
});
