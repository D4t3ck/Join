let contacts;

let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ü",
  "Ä",
  "Ö",
];
let colors = [
  "#FF7A00",
  "#FF5EB3",
  "#6E52FF",
  "#9327FF",
  "#00BEE8",
  "#1FD7C1",
  "#FF745E",
  "#FFA35E",
  "#FC71FF",
  "#FFC701",
  "#0038FF",
  "#C3FF2B",
  "#FFE62B",
  "#FF4646",
  "#FFBB2B",
];

let backendData;

async function initContact() {
  init();
  await getDataForContacts();
  logUserAccount();
  renderletters();
}

async function getDataForContacts() {
  let response = await getItem("users");
  let responseAsJson = JSON.parse(response);
  contacts = responseAsJson.contacts;
  backendData = responseAsJson;
}

function renderletters() {
  let contactArea = document.getElementById("contactScroll");
  contactArea.innerHTML = "";
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    for (let j = 0; j < contacts.length; j++) {
      const element = contacts[j];
      const name = element["name"];
      const mail = element["mail"];
      const phone = element["phone"];
      const firstletter = element["name"].charAt(0).toUpperCase();
      element.color = colors[j % colors.length];
      if (letter == firstletter) {
        const profil = getFirstChars(name);
        contactArea.innerHTML += /*html*/ `              
                <div class="contacts_scroll_abc">
                    <div id="letterbox${i}"></div>
                </div>
                <div class="contact_scrolls_card_small" onclick="showContactInformation('${name}', '${mail}', '${phone}','${j}','${profil}')" id="contact_card${j}">
                    <div class="profil_ellipse" style="background-color: ${element.color};">${profil}</div>
                    <div class="contact_scrolls_card_small_contact">
                        <span id="contact_card_name${j}" class="contact_scrolls_card_small_name">${name}</span>
                        <span class="contact_scrolls_card_small_email">${mail}</span>
                    </div>
                </div>`;
      }
    }
    let letterbox = document.getElementById(`letterbox${i}`);
    if (letterbox) {
      letterbox.innerHTML += `
            <span class="contacts_scroll_abc_text">${letter}</span>
            <div class="contact_scrolls_stroke">
            <img class="letter_stroke" src="./assets/img/contacts/strokeGray.png" alt="" />
            </div>
            `;
    }
  }
}

function addContact() {
  let name = document.getElementById("inputName").value;
  let number = document.getElementById("inputPhone").value;
  let email = document.getElementById("inputEmail").value;
  let contact = {
    name: name,
    mail: email,
    phone: number,
    color: null,
  };
  backendData.contacts.push(contact);
  setItem("users", backendData);
  renderletters();
  closeOverlayAddContact();
  // clearInputField();
}

function clearInputField() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputPhone").value = "";
  document.getElementById("inputEmail").value = "";
}

function openOverlayAddContact() {
  document.getElementById("addContactOverlay").classList.remove("d_none");
}

function closeOverlayAddContact() {
  document.getElementById("addContactOverlay").classList.add("d_none");
  clearInputField();
}

function showContactInformation(name, mail, phone, j, profil) {
  
  if (window.innerWidth >= 801) {

  renderletters();
  // document
  //   .getElementById(`me_contact_card`)
  //   .classList.add("contact_scrolls_card_small");
  // document
  //   .getElementById(`me_contact_name`)
  //   .classList.add("contact_scrolls_card_small_name");
  document.getElementById('contactInformationMobile')
  .classList.remove("d_none");


  document
    .getElementById(`contact_card${j}`)
    .classList.remove("contact_scrolls_card_small");
  document
    .getElementById(`contact_card${j}`)
    .classList.add("contact_scrolls_card_small_onclick");
  document
    .getElementById(`contact_card_name${j}`)
    .classList.remove("contact_scrolls_card_small_name");
  document
    .getElementById(`contact_card_name${j}`)
    .classList.add("contact_scrolls_card_small_onclick_name");
  document.getElementById("contactInformation").classList.remove("d_none");
  let contactInformation = document.getElementById("contactInformation");
  


  contactInformation.innerHTML = "";
  contactInformation.innerHTML = generateContactHTML(name, mail, phone, j, profil);
  document.getElementById('editMobileView').classList.remove('d_none')

  }

  if (window.innerWidth < 801) {
    renderletters();

    document
    .getElementById('contactInformationMobile')
    .classList.remove("d_none");
    document.getElementById("contactInformation").classList.remove("d_none");

    let contactInformation = document.getElementById("contactInformation");
    document.getElementById("addContactMobile").classList.add("d_none");
    contactInformation.innerHTML = "";
    contactInformation.innerHTML = generateContactHTML(name, mail, phone, j, profil);
    document.getElementById("editContactMobile").classList.remove("d_none");
  
  }


}

function generateContactHTML(name, mail, phone, j, profil) {
  return /*html*/ ` 
  <section class="contacts_bigcard_container">
   <div class="contacts_bigcard_contact_area">
     <div class="profil_ellipse_info" style="background-color: ${
       colors[j % colors.length]
     };"> <span class="profil_ellipse_info_text">${profil}</span> </div>
     <div class="contacts_bigcard_name_area">
       <span class="contacts_bigcard_name">${name}</span>
       <div class="contacts_bigcard_edit d_none" id="editMobileView">
         <div class="edit_area" onclick="editContact('${name}', '${mail}', '${phone}', '${j}','${profil}')">
           <div class="edit_area_img"></div>
           <span class="edit_text">Edit</span>
         </div>
         <div class="edit_area">
           <div class="edit_area_delete_img"></div>
           <span class="edit_text" onclick="deleteContact(${j})">Delete</span>
         </div>
       </div>
     </div>
   </div>
   <span class="contacts_bigcard_Information_text"
     >Contact Information</span
   >
   <div class="contacts_bigcard_Information_email_phone">
     <span class="contacts_bigcard_Information_email_phone_span"
       >Email</span
     >
     <a href="mailto:${mail}" class="contacts_bigcard_Information_email"
       >${mail}</a
     >
     <span class="contacts_bigcard_Information_email_phone_span"
       >Phone</span
     >
     <a href="tel:${phone}" class="contacts_bigcard_Information_phone"
       >${phone}</a
     >
   </div>
 </section>
`;
}

function editContact(name, mail, phone, j, profil) {
  document.getElementById("editContactOverlay").classList.remove("d_none");

  let editContact = document.getElementById("editContactOverlay");

  editContact.innerHTML = /*html*/ `
  <section class="contact_overlay_add_contact_card">
              <div class="contact_overlay_add_contact_card_left">
                <img
                  class="contact_overlay_add_contact_card_left_logo"
                  src="./assets/img/contacts/joinLogo.png"
                  alt=""
                />
                <div class="contact_overlay_add_contact_card_left_text_area">
                  <span
                    class="contact_overlay_add_contact_card_left_text_area_heandline"
                    >Edit contact</span
                  >
                  <img
                    class="contact_overlay_add_contact_card_left_stroke"
                    src="./assets/img/contacts/strokeBlueAddOverlay.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="contact_overlay_add_contact_card_right">
                <div
                  onclick="closeOverlayEditContact()"
                  class="contact_overlay_add_contact_card_right_close_div"
                >
                  <div class="contact_overlay_add_contact_card_right_close_x">
                    X
                  </div>
                </div>
                <div class="contact_overlay_add_contact_card_right_center">
                  <div class="profil_ellipse_info" style="background-color: ${
                    colors[j % colors.length]
                  };">${profil}</div>
                  <form return false;
                    class="contact_overlay_add_contact_card_right_input_area"
                  >
                    <input
                      id="inputEditName"
                      required
                      class="contact_overlay_add_contact_card_right_inputfield person_img"
                      type="text"
                      value="${name}"
                    />
                    <input
                      id="inputEditEmail"
                      required
                      class="contact_overlay_add_contact_card_right_inputfield mail_img"
                      type="email"
                      value="${mail}"
                    />
                    <input
                      id="inputEditPhone"
                      required
                      class="contact_overlay_add_contact_card_right_inputfield phone_img"
                      type="tel"
                      value="${phone}"
                    />
                    <div
                      class="contact_overlay_add_contact_card_right_btn_area"
                    >
                      <button
                        onclick="deleteContact(${j})"
                        class="contact_overlay_add_contact_card_right_btn_cancel"
                      >
                        Delete
                      </button>
                      <button
                        onclick="editContactTest(${j})"
                        class="contact_overlay_add_contact_card_right_btn_create"
                      >
                        Save
                        <img
                          class="contact_overlay_add_contact_card_right_btn_check"
                          src="./assets/img/contacts/check.png"
                          alt=""
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
  `;
}

function closeOverlayEditContact() {
  document.getElementById("editContactOverlay").classList.add("d_none");
}

function editContactTest(j) {
  backendData.contacts[j].name = document.getElementById("inputEditName").value;
  backendData.contacts[j].mail =
    document.getElementById("inputEditEmail").value;
  backendData.contacts[j].phone =
    document.getElementById("inputEditPhone").value;
  setItem("users", backendData);

  renderletters();
  document.getElementById("contactInformation").classList.add("d_none");
  closeOverlayEditContact();
}

function deleteContact(j) {
  backendData.contacts.splice(j, 1);
  setItem("users", backendData);
  closeOverlayEditContact();
  clearContactInformation();
  renderletters();
}

function clearContactInformation() {
  let contactInformation = document.getElementById("contactInformation");
  contactInformation.innerHTML = "";
}

function getFirstChars(name) {
  const names = name.split(" ");

  const first1letter = names[0].charAt(0).toUpperCase();
  const lastIndex = names.length - 1;
  const secondLetter = names[lastIndex].charAt(0).toUpperCase();
  const profilLetter = first1letter + secondLetter;

  return profilLetter;
  // console.log(profilLetter)
}

async function logUserAccount() {
  let response = await getItem("users");
  let responseAsJson = JSON.parse(response);
  let users = responseAsJson.users;

  const urlParams = new URLSearchParams(window.location.search);
  let userInContacts;
  let userName;
  let userMail = urlParams.get("mail");
  let user = users.find((task) => task.userMail == userMail);
  console.log(user);

  if (user == null || user == "null") {
    document.getElementById("userAccount").innerHTML = "";
  } else {
    userInContacts = backendData.contacts.find(
      (contact) => contact.mail == user.userMail
    );
    userName = user.userName;

    console.log(userName);
    const profil = getFirstChars(userName);
    document.getElementById("userAccount").innerHTML = /*html*/ `
  <div class="contact_scrolls_card_small" onclick="showMeInformation('${userName}', '${userMail}','${profil}')" id="me_contact_card">
    <div class="profil_ellipse" style="background-color: #c0c0c0;">${profil}</div>
    <div class="contact_scrolls_card_small_contact">
        <span class="contact_scrolls_card_small_name" id="me_contact_name">${userName} (ME)</span>
        <span class="contact_scrolls_card_small_email">${userMail}</span>
    </div>
  </div>`;

    if (!userInContacts) {
      let contact = {
        name: userName,
        mail: userMail,
        phone: "",
        color: null,
      };
      backendData.contacts.push(contact);
    }
  }
  renderletters();
  // console.log(users);
}

function showMeInformation(userName, userMail, profil) {
  renderletters();
  // document.getElementById(`me_contact_card`).classList.remove("contact_scrolls_card_small");
  // document.getElementById(`me_contact_card`).classList.add("contact_scrolls_card_small_onclick");
  // document.getElementById(`me_contact_name`).classList.remove("contact_scrolls_card_small_name");
  // document.getElementById(`me_contact_name`).classList.add("contact_scrolls_card_small_onclick_name");
  document.getElementById("contactInformation").classList.remove("d_none");
  let contactInformation = document.getElementById("contactInformation");
  contactInformation.innerHTML = "";
  contactInformation.innerHTML = /*html*/ ` 
   <section class="contacts_bigcard_container">
    <div class="contacts_bigcard_contact_area">
      <div class="profil_ellipse_info" style="background-color: #c0c0c0;"> <span class="profil_ellipse_info_text">${profil}</span> </div>
      <div class="contacts_bigcard_name_area">
        <span class="contacts_bigcard_name">${userName} (ME)</span>
        </div>
      </div>
    </div>
    <span class="contacts_bigcard_Information_text"
      >User Information</span
    >
    <div class="contacts_bigcard_Information_email_phone">
      <span class="contacts_bigcard_Information_email_phone_span"
        >Email</span
      >
      <a href="mailto:${userMail}" class="contacts_bigcard_Information_email"
        >${userMail}</a
      >
  
    </div>
  </section>
`;
}

function successContact() {
  let successContainer = document.getElementById("success_contact");
  let successMessage = document.getElementById("success_contact_animation");

  successContainer.classList.add("visible");
  successMessage.classList.add("translate_0");

  return new Promise((resolve) => {
    setTimeout(() => {
      successMessage.classList.remove("translate_0");
      successContainer.classList.remove("visible");
      resolve();
    }, 1500);
  });
}

function closeContactInfoMobile() {
  document.getElementById('contactInformationMobile').classList.add('d_none')
  document.getElementById('editContactMobile').classList.add('d_none')
  document.getElementById('addContactMobile').classList.remove('d_none')
}

function editFunctionMobile() {
document.getElementById('editContactMobile').classList.add('d_none')
document.getElementById('editMobileView').classList.remove('d_none')

 
} 