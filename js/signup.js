
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

async function inputValue() {
  let signupName = document.getElementById("nameSignup").value;
  let signupMail = document.getElementById("emailSignup").value;
  let signupPwd = document.getElementById("passwordSignup").value;
  let signupConfirm = document.getElementById("passwordConfirm").value;
  let checkBox = document.getElementById('unchecked');
  const data = await getItem('users');
  const dataAsJson = JSON.parse(data);
  const userList = dataAsJson.users;

  if (checkBox.id === 'unchecked') {
    alert("Du kommst nicht vorbei!");
  } else {
    let user = {
      userName: signupName,
      userMail: signupMail,
      userPwd: signupPwd
    }
  
    userList.push(user);
    console.log(dataAsJson);
    alert('user registriert')
    /* setItem("users", dataAsJson); */
  }

  
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

  function checkPasswords() {
    let password1 = document.getElementById('passwordSignup').value;
    let password2 = document.getElementById('passwordConfirm').value;
    let errorMessage = document.getElementById('errorTxt');
    let password1Container = document.getElementById('passwordContainer');
    let password2Container = document.getElementById('passwordConfirmContainer');
  
    if (password1 === password2) {
      errorMessage.innerHTML = "";
      document.getElementById('signUpBtn').disabled = false;
      password1Container.classList.remove('outline_red');
      password2Container.classList.remove('outline_red');
    } else {
      errorMessage.innerHTML = "The passwords do not match.";
      document.getElementById('signUpBtn').disabled = true;
      errorRedOutline();
    }
  }
  

function errorRedOutline() {
  let password1 = document.getElementById('passwordContainer');
  let password2 = document.getElementById('passwordConfirmContainer');
  password1.classList.add('outline_red');
  password2.classList.add('outline_red');
}