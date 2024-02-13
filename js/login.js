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
 * function toggles remember me checkbox
 */
function toggleCheckboxLogin() {
  let uncheckedBox = document.getElementById('unchecked');
  let checkedBox = document.getElementById('checked');

  if (uncheckedBox) {
    uncheckedBox.src = 'assets/img/signUp/checked.png';
    uncheckedBox.id = 'checked';
  } else if (checkedBox) {
    checkedBox.src = 'assets/img/signUp/unchecked.png';
    checkedBox.id = 'unchecked';
  }
}

async function checkUser() {
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