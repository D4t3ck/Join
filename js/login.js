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
    }, 200);
  }
});

/**
 * Toggles the visibility icon of the password input field based on its current type and value.
 */
let passwordInput = document.getElementById("password");
let passwordImg = document.getElementById("passwordImg");

function togglePwIcon() {
  if (passwordInput.type === "password") {
    if (passwordInput.value !== "") {
      passwordImg.src = "./assets/img/logIn/visibility_off.png";
    } else {
      passwordImg.src = "./assets/img/logIn/lock.png";
    }
  } else if (passwordInput.type === "text") {
    passwordImg.src = "./assets/img/logIn/visibility_on.png";
  }
}

/**
 * Toggles the visibility of the password input field and updates the visibility icon accordingly.
 * Only works if there is text present in the input field.
 */
function togglePwVisibility() {
  if (passwordInput.value !== "") {
    let currentSrc = passwordImg.src;

    if (currentSrc.includes("visibility_off.png")) {
      passwordImg.src = "./assets/img/logIn/visibility_on.png";
      passwordInput.type = "text";
    } else {
      passwordImg.src = "./assets/img/logIn/visibility_off.png";
      passwordInput.type = "password";
    }
  }
}

/**
 * Handles the blur event on the password input field.
 * Updates the visibility icon to the lock icon if the input field is empty when it loses focus.
 */
passwordInput.addEventListener("blur", function () {
  if (passwordInput.value === "") {
    passwordImg.src = "./assets/img/logIn/lock.png";
  }
});

//////////////////////////////////////////////////////////////////////



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
 * Toggles the blue outline class on the specified container based on the value of the input element.
 * @param {HTMLInputElement} input - The input element to check its value.
 * @param {HTMLElement} container - The container element to toggle the outline class on.
 */
function toggleOutline(input, container) {
  if (input.value !== "") {
    container.classList.add("outline_blue");
  } else {
    container.classList.remove("outline_blue");
  }
}

/**
 * Toggles the blue outline class on email and password input field containers based on their input values.
 */
function toggleBlueOutline() {
 
  let emailContainer = document.getElementById("emailContainer");
  let passwordContainer = document.getElementById("passwordContainer");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");

  toggleOutline(emailInput, emailContainer);
  toggleOutline(passwordInput, passwordContainer);
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
