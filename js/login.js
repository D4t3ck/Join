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


