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

async function inputValue() {
  let signupName = document.getElementById("nameSignup").value;
  let signupMail = document.getElementById("emailSignup").value;
  let signupPwd = document.getElementById("passwordSignup").value;
  let signupConfirm = document.getElementById("passwordConfirm").value;
  const data = await getItem('users');
  const dataAsJson = JSON.parse(data);
  const userList = dataAsJson.users;

  let user = {
    userName: signupName,
    userMail: signupMail,
    userPwd: signupPwd
  }

  userList.push(user);
  console.log(dataAsJson);
  setItem("users", dataAsJson);
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