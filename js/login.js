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
