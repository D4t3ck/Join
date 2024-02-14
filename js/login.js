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
    }, 500);
  }
});

/**
 * toggles the img and visibility of the password
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
 * function toggles remember me checkbox
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
    clearInput();
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
}

function rememberInput() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
}

function clearInput() {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
}

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

/* async function checkUser() {
  let response = await getItem("users");
  let responseAsJson = JSON.parse(response);
  let loginEmail = document.getElementById("email").value;
  let loginPwd = document.getElementById("password").value;
  const filteredUser = responseAsJson.users.find(user => user.userMail == loginEmail && user.userPwd == loginPwd);
  console.log(filteredUser);
  if(filteredUser) {
    if (
      loginEmail == filteredUser.userMail &&
      loginPwd == filteredUser.userPwd
    ) {
      alert("Eingabe sind =");
      window.location.href = `./summary.html?mail=${filteredUser.userMail}`;
    } else {
      alert("Eingabe sind !=");
    }
  }
}
*/

async function loginCheck() {
  let userEmail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;
  let errorMessage = document.getElementById("errorTxt");

  try {
    let response = await getItem("users");
    let responseAsJson = JSON.parse(response);
    const filteredUser = responseAsJson.users.find(
      (user) => user.userMail === userEmail && user.userPwd === userPassword
    );

    if (filteredUser) {
      alert("Eingabe sind ="); // Kann final weg
      errorMessage.textContent = "";
      window.location.href = `./summary.html?mail=${filteredUser.userMail}`;
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    } else {
      errorMessage.textContent = "The email or password provided is incorrect.";
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    errorMessage.textContent = "An error has occurred. Please try again later.";
  }
}
