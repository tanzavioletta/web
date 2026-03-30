const menuOpenBtn = document.querySelector("#nav-toggle-open");
const navMenu = document.querySelector("#nav-menu")
const menuCloseBtn = document.querySelector("#nav-toggle-close");

menuOpenBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show-mobile-menu")
});

menuCloseBtn.addEventListener("click", ()=>{
   navMenu.classList.remove("show-mobile-menu")
})
