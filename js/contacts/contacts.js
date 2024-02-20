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

/**
 * Initializes the contact functionality.
 * Calls the initialization function, fetches the data for contacts,
 * logs the user account, and renders the letters for contacts.
 */
async function initContact() {
  init();
  await getDataForContacts();
  logUserAccount();
  renderletters();
}

/**
 * Fetches data required for contacts from the storage.
 * Retrieves user data including contacts from the storage and updates global variables.
 */
async function getDataForContacts() {
  let response = await getItem("users");
  let responseAsJson = JSON.parse(response);
  contacts = responseAsJson.contacts;
  backendData = responseAsJson;
}

/**
 * Renders the contact list based on the initial letters of the contacts' names.
 * Generates HTML for each contact card and displays them in the contact area.
 * Also renders the corresponding letterbox for each letter.
 */
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
                ${renderContactCard(name, mail, phone, j, profil, element.color)}`;
      }
    }
    renderlettersBox(i, letter);
  }
}

/**
 * Renders the letterbox for a given letter in the contact list.
 * Appends HTML representing the letter to the corresponding letterbox element.
 * @param {number} i - The index of the letterbox.
 * @param {string} letter - The letter to be rendered.
 */
function renderlettersBox(i, letter) {
  let letterbox = document.getElementById(`letterbox${i}`);
  if (letterbox) {
    letterbox.innerHTML += renderLettersHtml(letter);
  }
}

/**
 * Adds a new contact to the list of contacts.
 * Retrieves the values of name, number, and email from input fields,
 * creates a new contact object, adds it to the list of contacts in backend data,
 * updates the storage with the new data, renders the contact list, and closes the add contact overlay.
 */
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
}

/**
 * Clears the input fields for name, phone number, and email.
 * Retrieves the input fields by their IDs and sets their values to an empty string.
 */
function clearInputField() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputPhone").value = "";
  document.getElementById("inputEmail").value = "";
}

/**
 * Opens the overlay for adding a new contact.
 * and removes the "d_none" class to make it visible.
 */
function openOverlayAddContact() {
  document.getElementById("addContactOverlay").classList.remove("d_none");
}

/**
 * Closes the overlay for adding a new contact.
 * and adds the "d_none" class to hide it. Also, clears the input fields.
 */
function closeOverlayAddContact() {
  document.getElementById("addContactOverlay").classList.add("d_none");
  clearInputField();
}

/**
 * Displays contact information based on the window width.
 * Renders the contact list and adjusts the UI accordingly.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {number} j - The index of the contact.
 * @param {string} profil - The profile abbreviation of the contact.
 */
function showContactInformation(name, mail, phone, j, profil) {
  if (window.innerWidth >= 801) {
    renderletters();
    changeClasslistInfo(name, mail, phone, j, profil);
  }
  if (window.innerWidth < 801) {
    renderletters();
    changeClasslistInfoMobil(name, mail, phone, j, profil);
  }
}

/**
 * Changes the class list to display contact information in desktop view.
 * Removes the "d_none" class from the mobile contact information area,
 * updates the class of the clicked contact card to highlight it,
 * updates the class of the contact name to highlight it,
 * removes the "d_none" class from the desktop contact information area,
 * populates the desktop contact information area with the provided contact details,
 * and removes the "d_none" class from the edit contact form in mobile view.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {number} j - The index of the contact.
 * @param {string} profil - The profile abbreviation of the contact.
 */
function changeClasslistInfo(name, mail, phone, j, profil) {
  document.getElementById("contactInformationMobile").classList.remove("d_none");
  document.getElementById(`contact_card${j}`).classList.remove("contact_scrolls_card_small");
  document.getElementById(`contact_card${j}`).classList.add("contact_scrolls_card_small_onclick");
  document.getElementById(`contact_card_name${j}`).classList.remove("contact_scrolls_card_small_name");
  document.getElementById(`contact_card_name${j}`).classList.add("contact_scrolls_card_small_onclick_name");
  document.getElementById("contactInformation").classList.remove("d_none");
  let contactInformation = document.getElementById("contactInformation");
  contactInformation.innerHTML = "";
  contactInformation.innerHTML = generateContactHTML(name,mail,phone,j,profil);
  document.getElementById("editMobileView").classList.remove("d_none");
}

/**
 * Changes the class list to display contact information in mobile view.
 * Removes the "d_none" class from the mobile contact information area and the desktop contact information area,
 * hides the add contact button in mobile view,
 * populates the mobile contact information area with the provided contact details,
 * displays the edit contact button in mobile view, and
 * shows the close arrow button.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {number} j - The index of the contact.
 * @param {string} profil - The profile abbreviation of the contact.
 */
function changeClasslistInfoMobil(name, mail, phone, j, profil) {
  document.getElementById("contactInformationMobile").classList.remove("d_none");
  document.getElementById("contactInformation").classList.remove("d_none");
  let contactInformation = document.getElementById("contactInformation");
  document.getElementById("addContactMobile").classList.add("d_none");
  contactInformation.innerHTML = "";
  contactInformation.innerHTML = generateContactHTML(name,mail,phone,j,profil);
  document.getElementById("editContactMobile").classList.remove("d_none");
  document.getElementById("closeArrow").classList.remove("d_none");
}

/**
 * Displays the overlay for editing a contact with pre-filled information.
 * Removes the "d_none" class from the edit contact overlay and populates it with the edit form.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {number} j - The index of the contact.
 * @param {string} profil - The profile picture of the contact.
 */
function editContact(name, mail, phone, j, profil) {
  document.getElementById("editContactOverlay").classList.remove("d_none");
  let editContact = document.getElementById("editContactOverlay");
  editContact.innerHTML = generateEditContactHTML(name, mail, phone, j, profil);
}

/**
 * Closes the overlay for editing a contact.
 * Retrieves the edit contact overlay element by its ID
 * and adds the "d_none" class to hide it.
 */
function closeOverlayEditContact() {
  document.getElementById("editContactOverlay").classList.add("d_none");
}

/**
 * Modifies the information of a contact based on the input values in the edit form.
 * Updates the name, email, and phone number of the contact in backend data,
 * saves the updated data to storage, re-renders the contact list, 
 * and hides the contact information overlay and edit contact overlay.
 * @param {number} j - The index of the contact to be edited.
 */
function editContactTest(j) {
  backendData.contacts[j].name = document.getElementById("inputEditName").value;
  backendData.contacts[j].mail = document.getElementById("inputEditEmail").value;
  backendData.contacts[j].phone = document.getElementById("inputEditPhone").value;
  setItem("users", backendData);
  renderletters();
  document.getElementById("contactInformation").classList.add("d_none");
  closeOverlayEditContact();
  closeContactInfoMobile();
}

/**
 * Deletes a contact from the list based on its index.
 * Removes the contact from the backend data, saves the updated data to storage,
 * closes the edit contact overlay, clears the contact information,
 * closes the mobile contact information overlay, and re-renders the contact list.
 * @param {number} j - The index of the contact to be deleted.
 */
function deleteContact(j) {
  backendData.contacts.splice(j, 1);
  setItem("users", backendData);
  closeOverlayEditContact();
  clearContactInformation();
  closeContactInfoMobile();
  renderletters();
}

/**
 * Clears the contact information displayed in the contact information area.
 * and sets its inner HTML to an empty string.
 */
function clearContactInformation() {
  let contactInformation = document.getElementById("contactInformation");
  contactInformation.innerHTML = "";
}

/**
 * Generates a profile abbreviation based on the first letter of the first and last names.
 * Splits the full name into an array of names, takes the first letter of the first name
 * and the first letter of the last name, converts them to uppercase, and concatenates them.
 * @param {string} name - The full name of the contact.
 * @returns {string} - The profile abbreviation consisting of the first letters of the first and last names.
 */
function getFirstChars(name) {
  const names = name.split(" ");
  const first1letter = names[0].charAt(0).toUpperCase();
  const lastIndex = names.length - 1;
  const secondLetter = names[lastIndex].charAt(0).toUpperCase();
  const profilLetter = first1letter + secondLetter;
  return profilLetter;
}

/**
 * Retrieves user information from storage, checks if the user is in contacts,
 * and renders the contact list.
 * @returns {Promise<void>} - A Promise that resolves when the function completes.
 */
async function logUserAccount() {
  let response = await getItem("users");
  let responseAsJson = JSON.parse(response);
  let users = responseAsJson.users;
  const urlParams = new URLSearchParams(window.location.search);
  let userInContacts;
  let userName;
  let userMail = urlParams.get("mail");
  let user = users.find((task) => task.userMail == userMail);
  pushUser(user, userInContacts, userName, userMail);
  renderletters();
}

/**
 * Adds user information to the contact list if the user exists and is not already in contacts.
 * If the user exists, populates the user account area with user information.
 * @param {object} user - The user object containing user information.
 * @param {object} userInContacts - The user object in the contacts list.
 * @param {string} userName - The name of the user.
 * @param {string} userMail - The email of the user.
 */
function pushUser(user, userInContacts, userName, userMail) {
  if (user == null || user == "null") {
    document.getElementById("userAccount").innerHTML = "";
  } else {
    userInContacts = backendData.contacts.find((contact) => contact.mail == user.userMail);
    userName = user.userName;
    const profil = getFirstChars(userName);
    document.getElementById("userAccount").innerHTML = renderUserAccountHtml(userName, userMail, profil);

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
}

/**
 * Displays the contact information for the current user.
 * Renders the contact list, removes the "d_none" class from the contact information areas,
 * populates the contact information area with user information,
 * and adjusts the UI for mobile devices if necessary.
 * @param {string} userName - The name of the current user.
 * @param {string} userMail - The email of the current user.
 * @param {string} profil - The profile abbreviation of the current user.
 */
function showMeInformation(userName, userMail, profil) {
  renderletters();
  document.getElementById("contactInformation").classList.remove("d_none");
  document.getElementById("contactInformationMobile").classList.remove("d_none");
  let contactInformation = document.getElementById("contactInformation");
  contactInformation.innerHTML = "";
  contactInformation.innerHTML = renderContactInformationHtml(userName, userMail, profil);
  if (window.innerWidth < 801) {
      document.getElementById("closeArrow").classList.remove("d_none");
      document.getElementById("addContactMobile").classList.add("d_none");
  }
}

/**
 * Displays a success message indicating that the contact operation was successful.
 * Animates the success message to appear and disappear after a delay.
 * @returns {Promise<void>} - A Promise that resolves when the success message animation completes.
 */
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

/**
 * Closes the mobile contact information overlay.
 * Adds the "d_none" class to hide the contact information and edit contact elements,
 * and removes the "d_none" class from the add contact element.
 */
function closeContactInfoMobile() {
  document.getElementById("contactInformationMobile").classList.add("d_none");
  document.getElementById("editContactMobile").classList.add("d_none");
  document.getElementById("addContactMobile").classList.remove("d_none");
}

/**
 * Initiates the mobile edit contact functionality.
 * Hides the edit contact button and displays the edit contact form.
 */
function editFunctionMobile() {
  document.getElementById("editContactMobile").classList.add("d_none");
  document.getElementById("editMobileView").classList.remove("d_none");
}
