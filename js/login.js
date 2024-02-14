let isImageLog = true;

/**
 * Executes code when the DOM content is fully loaded.
 * Initiates a fade-out animation on the landing page modal after 1 second,
 * and hides it after the animation completes.
 */
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    fadeOutModal();
  }, 1000);

  /**
   * Initiates a fade-out animation on the landing page modal
   * and hides it after the animation completes.
   */
  function fadeOutModal() {
    let modal = document.getElementById("landing_page");
    modal.classList.add("fade-out");
    setTimeout(function () {
      modal.style.display = "none";
    }, 500);
  }
});

/**
 * Toggles the visibility of the password input field between hidden and visible,
 * and changes the password visibility icon accordingly.
 */
function togglePwIcon() {
  let passwordInput = document.getElementById("password");
  let passwordImg = document.getElementById("passwordImg");
  let currentSrc = passwordImg.src;

  if (currentSrc.includes("visibility_off.png")) {
    passwordImg.src = "./assets/img/logIn/visibility.png";
    passwordInput.type = "text";
  } else {
    passwordImg.src = "./assets/img/logIn/visibility_off.png";
    passwordInput.type = "password";
  }
}

/**
 * Toggles the state of the login checkbox between checked and unchecked.
 * If checked, saves input values to localStorage; if unchecked,
 * clears saved input values from localStorage.
 */
function toggleCheckboxLogin() {
  let uncheckedBox = document.getElementById("unchecked");
  let checkedBox = document.getElementById("checked");

  if (uncheckedBox) {
    uncheckedBox.src = "assets/img/signUp/checked.png";
    uncheckedBox.id = "checked";
    rememberInput();
  } else if (checkedBox) {
    checkedBox.src = "assets/img/signUp/unchecked.png";
    checkedBox.id = "unchecked";
    clearStorageInput();
    clearInput();
  }
}

/**
 * Saves the email and password input values to localStorage.
 */
function rememberInput() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
}

/**
 * Clears values from input fields.
 */
function clearInput() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

/**
 * Clears saved email and password from localStorage.
 */
function clearStorageInput() {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
}

/**
 * Loads input values from localStorage, if available, and updates
 * corresponding input fields.
 */
function loadInput() {
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  let rememberedEmail = localStorage.getItem("email");
  let rememberedPassword = localStorage.getItem("password");
  let checkedBox = document.getElementById("unchecked");

  if (rememberedEmail && rememberedPassword) {
    emailInput.value = rememberedEmail;
    passwordInput.value = rememberedPassword;
    if (checkedBox) {
      checkedBox.src = "assets/img/signUp/checked.png";
      checkedBox.id = "checked";
    }
  }
}

window.onload = loadInput;

/**
 * Performs login authentication.
 */
async function loginCheck() {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;

  try {
    let response = await getItem("users");
    let responseAsJson = JSON.parse(response);
    const filteredUser = responseAsJson.users.find(
      (user) => user.userMail === userEmail && user.userPwd === userPassword
    );

    if (filteredUser) {
      alert("Eingabe sind ="); // Kann final weg
      displayErrorMessage("");
      window.location.href = `./summary.html?mail=${filteredUser.userMail}`;
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      removeRedOutline();
    } else {
      displayErrorMessage("The email or password provided is incorrect.");
      errorRedOutline();
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    displayErrorMessage("An error has occurred. Please try again later.");
  }
}

/**
 * Displays an error message on the web page.
 * @param {string} message - The error message to display.
 */
function displayErrorMessage(message) {
  let errorMessage = document.getElementById("errorTxt");
  errorMessage.textContent = message;
}

/**
 * Applies a red outline to the input div containers to indicate an error.
 */
function errorRedOutline() {
  let password1Outline = document.getElementById("emailContainer");
  let password2Outline = document.getElementById("passwordContainer");
  password1Outline.classList.add("outline_red");
  password2Outline.classList.add("outline_red");
}

/**
 * Removes the red outline from input div containers.
 */
function removeRedOutline() {
  let password1Outline = document.getElementById("emailContainer");
  let password2Outline = document.getElementById("passwordContainer");
  password1Outline.classList.remove("outline_red");
  password2Outline.classList.remove("outline_red");
}
