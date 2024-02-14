/**
 * Function toggles acceptance of Privacy Policys checkbox
 */
function toggleCheckboxSignup() {
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

/**
 * This asynchronous function captures input values from a signup form and, based on checkbox
 * state, either displays an alert message or adds user data to a list,
 * though currently not storing it persistently.
 */
async function inputValue() {
  let signupName = document.getElementById('nameSignup').value;
  let signupMail = document.getElementById('emailSignup').value;
  let signupPwd = document.getElementById('passwordSignup').value;
  let checkBoxUnchecked = document.getElementById('unchecked');
  let checkBoxChecked = document.getElementById('checked');

  const data = await getItem('users');
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
    console.log(dataAsJson);
    /* setItem("users", dataAsJson);*/
  }
}

/**
 * Auxiliary function who gives an error message if checkbox not checked.
 */
function errorSignUpCheckbox() {
  let errorMessage = document.getElementById('errorTxt');
  errorMessage.textContent = 'Please read and accept our Privacy Policy first';
}

/**
 * 
 * 
 */
function checkPasswords() {
  let password1 = document.getElementById('passwordSignup').value;
  let password2 = document.getElementById('passwordConfirm').value;

  if (password1 === password2) {
    document.getElementById('signUpBtn').disabled = false;
    removeRedOutline();
  } else {
    displayErrorMessage('The passwords do not match!');
    document.getElementById('signUpBtn').disabled = true;
    errorRedOutline();
  }
}

function displayErrorMessage(message) {
  let errorMessage = document.getElementById('errorTxt');
  errorMessage.textContent = message;
}

function errorRedOutline() {
  let password1Outline = document.getElementById('passwordContainer');
  let password2Outline = document.getElementById('passwordConfirmContainer');
  password1Outline.classList.add('outline_red');
  password2Outline.classList.add('outline_red');
}

function removeRedOutline() {
  let password1Outline = document.getElementById('passwordContainer');
  let password2Outline = document.getElementById('passwordConfirmContainer');
  password1Outline.classList.remove('outline_red');
  password2Outline.classList.remove('outline_red');
}





//////////  //////////

// noch nicht löschen oder bearbeiten!

// let user = {
//   users: [

//   ],

//   tasks: [
//     {
//       "assigned to": ["Florian", "Daniel", "Roman"],
//       category: "User Story",
//       desription: "Denk an die Milch",
//       dueDate: "2024-02-08",
//       prio: "urgent",
//       subtasks: [
//         {
//           title: "Tanken fahren",
//           check: false,
//         },
//         {
//           title: "Kind abholen!",
//           check: false,
//         },
//       ],
//     }
//   ],

//   contacts: []
// };