////////// SUBMENU HEADER //////////

/**
 * Toggles the visibility of the submenu and changes the background color of its toggle button.
 * @function toggleSubMenu
 * @returns {void}
 */
function toggleSubMenu() {
  const submenuContainer = document.querySelector(".header_submenu_container");
  const submenuToggle = document.querySelector(".submenu_toggle");

  submenuContainer.classList.toggle("show");
  submenuToggle.classList.toggle("back_color");
}

/**
 * Adds a click event listener to the document that closes the submenu if clicked outside the submenu or its toggle.
 * @param {Event} event - The click event.
 * @returns {void}
 */
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

/**
 * Retrieves the user account information and updates the user initials displayed on the webpage.
 * @async
 * @function getUserAccount
 * @returns {Promise<void>}
 */
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

/**
 * Returns the initials of a given name.
 * @param {string} name - The full name from which to extract initials.
 * @returns {string} The initials, consisting of the first letter of the first word and the first letter of the last word, both capitalized.
 */
function getFirstChars(name) {
  const names = name.split(" ");

  const first1letter = names[0].charAt(0).toUpperCase();
  const lastIndex = names.length - 1;
  const secondLetter = names[lastIndex].charAt(0).toUpperCase();
  const profilLetter = first1letter + secondLetter;

  return profilLetter;
}
