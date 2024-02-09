let isImageLog = true;

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    fadeOutModal();
  }, 1000);

  function fadeOutModal() {
    let modal = document.getElementById("landing_page");
    modal.classList.add("fade-out");

    setTimeout(function () {
      modal.style.display = "none";
    }, 300);
  }
});

function toggleCheckboxLogin() {
  let image = document.getElementById("checkLogin");

  if (isImageLog) {
    image.src = "./assets/img/login/checked.png";
  } else {
    image.src = "./assets/img/login/unchecked.png";
  }

  isImageLog = !isImageLog;
}

async function checkUser() {
  let responseUser = await getItem("users");
  let responseUserAsJson = JSON.parse(responseUser);
  let loginEmail = document.getElementById("email").value;
  let loginPwd = document.getElementById("password").value;

  if (
    loginEmail == responseUserAsJson.mail &&
    loginPwd == responseUserAsJson.password
  ) {
    alert("Eingabe sind =");
    USER.push(responseUserAsJson);
    console.log(USER);
  } else {
    alert("Eingabe sind !=");
  }
}
