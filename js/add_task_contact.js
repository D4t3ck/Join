
function renderInputAssigned() {
    document.getElementById("assigned_container").innerHTML =
      generateInputAssigned();
    renderAssignedContent();
    document.getElementById("assigned_input").focus();
  }
  
  /**
   * This function refreshes the display of assigned contacts by clearing the existing content, then iterates through each contact in the data, generating HTML elements for each contact, setting their values, and checking their status.
   * After a short delay, it sets a flag to indicate readiness for further assignment.
   */
  function renderAssignedContent() {
    const content = document.getElementById("input_assigned_content");
    content.innerHTML = "";
    data.contacts.forEach((contact, index) => {
      content.innerHTML += generateContact(contact.name, index);
      setProfileImage(contact, index);
      setContactValue(contact.name, index);
    });
    checkContactChecked();
    setTimeout(() => {
      assignRdy = true;
    }, 500);
  }

  function setProfileImage(contact, index) {
    let profileName = getProfileChar(contact.name);
    let contactProfileImage = document.getElementById(`contact_profile_image${index}`);
    contactProfileImage.innerHTML = profileName;
    contactProfileImage.style.backgroundColor = contact.color;
  }
  
  /**
   * This function iterates through the list of contacts, checking if each contact is included in the list of checked contacts.
   * If a contact is found in the checked list, the corresponding checkbox in the user interface is marked as checked, ensuring visual feedback for the selected contacts.
   */
  function checkContactChecked() {
    let filteredContacts;
    const contactList = document.querySelectorAll(".contact");
    data.contacts.forEach((contact, index) => {
      filteredContacts = checkedContacts.find(
        (checkContact) => checkContact == contact.name
      );
      if (filteredContacts) {
        for(let i = 0; i < contactList.length; i++) {
          if(contactList[i].value == filteredContacts) {
            let contact = document.getElementById(contactList[i].id);
            if (contact) contact.checked = true;
          }
        }
      }
    });
  }
  
  function setContactValue(contact, index) {
    document.getElementById(`contact${index}`).value = contact;
  }
  
  function closeDropdown() {
    if (assignRdy) {
      getCheckedContacts();
      document.getElementById("assigned_container").innerHTML =
        generateAssignSelection();
      renderCheckedContacts();
      assignRdy = false;
    }
  }
  
  /** 
   * This function updates the display of checked contacts by clearing the existing content, then iterates through each checked contact, generating HTML elements for their profile pictures and names.
   * It sets the background color of each profile based on the corresponding contact's color.
   */
  function renderCheckedContacts() {
    document.getElementById("assigned_contact_profiles").innerHTML = "";
    checkedContacts.forEach((checkedContact, index) => {
      const findContact = data.contacts.find(
        (contact) => contact.name == checkedContact
      );
      const profileName = getProfileChar(checkedContact);
      document.getElementById("assigned_contact_profiles").innerHTML +=
        generateContactProfile(profileName, index);
      document.getElementById(`profile_span${index}`).style.backgroundColor =
        findContact.color;
    });
  }
  
  function getProfileChar(checkedContact) {
    const names = checkedContact.split(" ");
    let profileName;
    if (names.length == 1) {
      profileName = profileName = names[0].charAt(0);
    } else {
      profileName = names[0].charAt(0) + names[names.length - 1].charAt(0);
    }
    return profileName;
  }
  
  /**
   * This function retrieves the contacts that have been checked by the user, ensuring that an array for checked contacts exists.
   * It iterates through the list of contacts, adding those that are checked to the array and removing those that are unchecked, maintaining an up-to-date list of selected contacts.
   */
  function getCheckedContacts() {
    const contactList = document.querySelectorAll(".contact");
    if (!checkedContacts) {
      checkedContacts = [];
    }
    for (let i = 0; i < contactList.length; i++) {
      if (contactList[i].checked) {
        addSearchContact(contactList, i);
      } else {
        removeSearchContact(contactList, i);
      }
    }
  }
  
  function addSearchContact(contactList, i) {
    const findContact = checkedContacts.find(
      (contact) => contact == contactList[i].value
    );
    if (!findContact) {
      checkedContacts.push(contactList[i].value);
    }
  }
  
  function removeSearchContact(contactList, i) {
    const index = checkedContacts.indexOf(contactList[i].value);
    if (index > -1) {
      checkedContacts.splice(index, 1);
    }
  }
  
  /**
   * This function filters contacts based on a user-inputted search term, updating the displayed contact list to show only the contacts whose names contain the search term.
   * It then sets the contact values and checks whether any of the filtered contacts are already checked.
   */
  function searchContact() {
    const filteredContacts = [];
    const inputValue = document
      .getElementById("assigned_input")
      .value.toLocaleLowerCase();
    document.getElementById("input_assigned_content").innerHTML = "";
    data.contacts.forEach((contact) => {
      if (contact.name.toLocaleLowerCase().includes(inputValue))
        filteredContacts.push(contact.name);
    });
    filteredContacts.forEach((contact, index) => {
      document.getElementById("input_assigned_content").innerHTML +=
        generateContact(contact, index);
      setContactValue(contact, index);
      checkContactChecked();
    });
  }