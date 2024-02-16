////////// SUBMENU HEADER //////////

/**
 * function to toggle switch the headers submenu
 */
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

async function getUserAccount() {
  let response = await getItem("users");
  let responseAsJson = JSON.parse(response);
  let users = responseAsJson.users;

  const urlParams = new URLSearchParams(window.location.search);

  let userMail = urlParams.get("mail");
  let user = users.find((task) => task.userMail == userMail);
  if (user == null || user == "null") {
    document.getElementById("userInitials").innerHTML = "G";
  } else {
    let userName = user.userName;
    document.getElementById("userInitials").innerHTML = getFirstChars(userName);
  }
}

function getFirstChars(name) {
  const names = name.split(" ");

  const first1letter = names[0].charAt(0).toUpperCase();
  const lastIndex = names.length - 1;
  const secondLetter = names[lastIndex].charAt(0).toUpperCase();
  const profilLetter = first1letter + secondLetter;

  return profilLetter;
  // console.log(profilLetter)
}
