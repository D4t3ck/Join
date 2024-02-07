////////// SUBMENU HEADER //////////

function toggleSubMenu() {
    const submenuContainer = document.querySelector(".header_submenu_container");
    const submenuToggle = document.querySelector(".submenu_toggle");
  
    submenuContainer.classList.toggle("show");
    submenuToggle.classList.toggle("back_color");
  }
  
  document.addEventListener("click", function (event) {
    const submenuContainer = document.querySelector(".header_submenu_container");
    const submenuToggle = document.querySelector(".submenu_toggle");
  
    if (
      !event.target.closest(".header_submenu_container") &&
      !event.target.closest(".submenu_toggle")
    ) {
      if (submenuContainer.classList.contains("show")) {
        submenuContainer.classList.remove("show");
        submenuToggle.classList.remove("back_color");
      }
    }
  });