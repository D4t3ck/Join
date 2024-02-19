/**
 * Function toggles acceptance of Privacy Policys checkbox
 */
function toggleCheckboxSignup() {
  let uncheckedBox = document.getElementById("unchecked");
  let checkedBox = document.getElementById("checked");

  if (uncheckedBox) {
    uncheckedBox.src = "assets/img/signUp/checked.png";
    uncheckedBox.id = "checked";
  } else if (checkedBox) {
    checkedBox.src = "assets/img/signUp/unchecked.png";
    checkedBox.id = "unchecked";
  }
}

/**
 * Toggles the visibility icon of the password input field based on its current type and value.
 */
let passwordInput = document.getElementById("passwordSignup");
let passwordImg = document.getElementById("signupPwImg");

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
 * Toggles the visibility icon of the password input confirm field based on its current type and value.
 */
let pwdConfirmInput = document.getElementById("passwordConfirm");
let pwdConfirmImg = document.getElementById("signupPwImgConfirm");

function toggleConfirmIcon() {
  if (pwdConfirmInput.type === "password") {
    if (pwdConfirmInput.value !== "") {
      pwdConfirmImg.src = "./assets/img/logIn/visibility_off.png";
    } else {
      pwdConfirmImg.src = "./assets/img/logIn/lock.png";
    }
  } else if (pwdConfirmInput.type === "text") {
    pwdConfirmImg.src = "./assets/img/logIn/visibility_on.png";
  }
}

/**
 * Toggles the visibility of the password input confirm field and updates the visibility icon accordingly.
 * Only works if there is text present in the input field.
 */
function toggleConfirmVisibility() {
  if (pwdConfirmInput.value !== "") {
    let currentSrc = pwdConfirmImg.src;

    if (currentSrc.includes("visibility_off.png")) {
      pwdConfirmImg.src = "./assets/img/logIn/visibility_on.png";
      pwdConfirmInput.type = "text";
    } else {
      pwdConfirmImg.src = "./assets/img/logIn/visibility_off.png";
      pwdConfirmInput.type = "password";
    }
  }
}

/**
 * Process the input values for sign-up.
 * @returns {Promise<void>} A Promise that resolves after the sign-up process is completed.
 */
async function inputValue() {
  let signupName = document.getElementById("nameSignup").value;
  let signupMail = document.getElementById("emailSignup").value;
  let signupPwd = document.getElementById("passwordSignup").value;
  let checkBoxUnchecked = document.getElementById("unchecked");
  let checkBoxChecked = document.getElementById("checked");

  const data = await getItem("users");
  const dataAsJson = JSON.parse(data);
  const userList = dataAsJson.users;

  if (checkBoxUnchecked) {
    errorSignUpCheckbox();
  } else if (checkBoxChecked) {
    let user = {
      userName: signupName,
      userMail: signupMail,
      userPwd: signupPwd,
    };

    userList.push(user);

    successSignup().then(() => {
      window.location.href = "./index.html";
    });
  }
}

/**
 * Auxiliary function who gives an error message if checkbox not checked.
 */
function errorSignUpCheckbox() {
  let errorMessage = document.getElementById("errorTxt");
  errorMessage.textContent = "Please read and accept our Privacy Policy first";
}

/**
 * Checks if the passwords entered in the signup form match.
 * Enables the signup button if they match, otherwise displays an error message and disables the button.
 */
function checkPasswords() {
  let password1 = document.getElementById("passwordSignup").value;
  let password2 = document.getElementById("passwordConfirm").value;

  if (password1 === password2) {
    document.getElementById("signUpBtn").disabled = false;
    removeRedOutline();
  } else {
    displayErrorMessage("The passwords do not match!");
    document.getElementById("signUpBtn").disabled = true;
    errorRedOutline();
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
 * Toggles the blue outline for input containers based on whether the corresponding input fields have values or not.
 * Adds a blue outline to the container if the input field has a value, otherwise removes it.
 */
function toggleBlueOutline() {
  let nameContainer = document.getElementById("nameContainer");
  let nameInput = document.getElementById("nameSignup");
  let emailContainer = document.getElementById("emailContainer");
  let emailInput = document.getElementById("emailSignup");
  let pwdContainer = document.getElementById("passwordContainer");
  let pwdInput = document.getElementById("passwordSignup");
  let pwdConfirmContainer = document.getElementById("passwordConfirmContainer");
  let pwdConfirmInput = document.getElementById("passwordConfirm");

  if (nameInput.value !== "") {
    nameContainer.classList.add("outline_blue");
  } else {
    nameContainer.classList.remove("outline_blue");
  }

  if (emailInput.value !== "") {
    emailContainer.classList.add("outline_blue");
  } else {
    emailContainer.classList.remove("outline_blue");
  }

  if (pwdInput.value !== "") {
    pwdContainer.classList.add("outline_blue");
  } else {
    pwdContainer.classList.remove("outline_blue");
  }

  if (pwdConfirmInput.value !== "") {
    pwdConfirmContainer.classList.add("outline_blue");
  } else {
    pwdConfirmContainer.classList.remove("outline_blue");
  }
}

/**
 * Applies a red outline to the input div containers to indicate an error.
 */
function errorRedOutline() {
  let password1Outline = document.getElementById("passwordContainer");
  let password2Outline = document.getElementById("passwordConfirmContainer");
  password1Outline.classList.add("outline_red");
  password2Outline.classList.add("outline_red");
}

/**
 * Removes the red outline from input div containers.
 */
function removeRedOutline() {
  let password1Outline = document.getElementById("passwordContainer");
  let password2Outline = document.getElementById("passwordConfirmContainer");
  password1Outline.classList.remove("outline_red");
  password2Outline.classList.remove("outline_red");
}

/**
 * Displays a success message for sign-up.
 * @returns {Promise} A Promise that resolves after the success message animation is completed.
 */
function successSignup() {
  let successContainer = document.getElementById("signup_success");
  let successMessage = document.getElementById("signup_container");

  successContainer.classList.add("visible");
  successMessage.classList.add("translate_0");

  /**
   * Promise that resolves after a delay, removing the success message animation.
   * @type {Promise}
   */
  return new Promise((resolve) => {
    setTimeout(() => {
      successMessage.classList.remove("translate_0");
      successContainer.classList.remove("visible");
      resolve();
    }, 1500);
  });
}
