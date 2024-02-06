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

function inputValue() {
  let signupName = document.getElementById("nameSignup").value;
  let signupMail = document.getElementById("emailSignup").value;
  let signupPwd = document.getElementById("passwordSignup").value;
  let signupConfirm = document.getElementById("passwordConfirm").value;

  let user = {
    name: signupName,
    mail: signupMail,
    password: signupPwd,
    tasks: [
      {
        "assignet to": ["Florian", "Daniel", "Roman"],
        category: "User Story",
        desription: "Denk an die Milch",
        dueDate: "2024-02-08",
        prio: "urgent",
        subtasks: [
          {
            title: "Tanken fahren",
            check: false,
          },
          {
            title: "Kind abholen!",
            check: false,
          },
        ],
      },
    ],
    contacts: [],
  };

  setItem("users", user);
}
