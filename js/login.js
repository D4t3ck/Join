let isImageLog = true;

function toggleCheckboxLogin() {
  let image = document.getElementById("checkLogin");

  if (isImageLog) {
    image.src = "./assets/img/login/checked.png";
  } else {
    image.src = "./assets/img/login/unchecked.png";
  }

  isImageLog = !isImageLog;
}

let isImageSign = true;

function toggleCheckboxSignup() {
  let image = document.getElementById("checkSignup");

  if (isImageSign) {
    image.src = "./assets/img/login/checked.png";
  } else {
    image.src = "./assets/img/login/unchecked.png";
  }

  isImageSign = !isImageSign;
}

function toggleLogin() {
  let login = document.getElementById("loginCard");
  let signup = document.getElementById("signupCard");
  let signupButton = document.getElementById("signUpContainer");

  if (signup.style.display === "none" || signup.style.display === "") {
    login.style.display = "none";
    signupButton.style.display = "none";
    signup.style.display = "flex";
  } else {
    login.style.display = "flex";
    signupButton.style.display = "flex";
    signup.style.display = "none";
  }
}

function toggleSignupBack() {
  let login = document.getElementById("loginCard");
  let signup = document.getElementById("signupCard");
  let signupButton = document.getElementById("signUpContainer");

  login.style.display = "flex";
  signupButton.style.display = "flex";
  signup.style.display = "none";
}
