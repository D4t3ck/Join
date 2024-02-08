let contacts = [
    {
        "name": "Anton Mayer",
        "mail": "antom@test.de",
        "phone": "+49 1111 1111 1111"
    },
    {
        "name": "Ben Bayer",
        "mail": "BenBayer@test.de",
        "phone": "+49 1121 1111 1111"
    },
    {
        "name": "Claus Cayer",
        "mail": "ClausCayer@test.de",
        "phone": "+49 1131 1111 1111"
    },
    {
        "name": "Hanton Mayer",
        "mail": "fantom@test.de",
        "phone": "+49 1111 1111 1111"
    },
]

let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Ü','Ä','Ö'];
// let letters = [];

function initContact() {
    init();
    renderletters();
}




function renderletters() {
    let contactArea = document.getElementById('contactScroll');
    contactArea.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        for (let j = 0; j < contacts.length; j++) {
            const element = contacts[j];
            const name = element['name'];
            const mail = element['mail'];
            const phone = element['phone']
            const firstletter = element['name'].charAt(0).toUpperCase();
            if (letter == firstletter) {
                contactArea.innerHTML += 
                /*html*/`              
                <div class="contacts_scroll_abc">
                    <div id="letterbox${i}"></div>
                </div>
                <div class="contact_scrolls_card_small" onclick="showContactInformation('${name}', '${mail}', '${phone}')" id="contact_card${j}">
                    <img
                        class="contact_scrolls_card_small_img"
                        src="./assets/img/contacts/ProfilebadgeAM.png"
                        alt=""
                    />
                    <div class="contact_scrolls_card_small_contact">
                        <span class="contact_scrolls_card_small_name">${name}</span>
                        <span class="contact_scrolls_card_small_onclick_email">${mail}</span>
                    </div>
                </div>`; 
            }
        } 
        let letterbox = document.getElementById(`letterbox${i}`)
        if (letterbox) {
            letterbox.innerHTML += `
            <span class="contacts_scroll_abc_text">${letter}</span>
            <div class="contact_scrolls_stroke">
            <img src="./assets/img/contacts/strokeGray.png" alt="" />
            </div>
            `;
        }
    }  
}

function addContact() {
    let name = document.getElementById('inputName').value;
    let number = document.getElementById('inputPhone').value;
    let email = document.getElementById('inputEmail').value;
    let contact = {
            "name": name,
            "mail": email,
            "phone": number,
    }
    contacts.push(contact);
    clearInputField();
    initContact();
}

function clearInputField() {
    document.getElementById('inputName').value =  '';
    document.getElementById('inputPhone').value = '';
    document.getElementById('inputEmail').value = '';
}

function openOverlayAddContact() {
    document.getElementById('addContactOverlay').classList.remove('d_none')
}

function closeOverlayAddContact() {
    document.getElementById('addContactOverlay').classList.add('d_none')
}

function showContactInformation(name, mail, phone) {
    document.getElementById('contactInformation').classList.remove('d_none')

    let contactInformation = document.getElementById('contactInformation');

    contactInformation.innerHTML = 
   /*html*/` 
   <section class="contacts_bigcard_container">
    <div class="contacts_bigcard_contact_area">
      <img
        class="contacts_bigcard_img"
        src="./assets/img/contacts/ProfilebadgeAM.png"
        alt=""
      />
      <div class="contacts_bigcard_name_area">
        <span class="contacts_bigcard_name">${name}</span>
        <div class="contacts_bigcard_edit">
          <div class="edit_area">
            <img
              class="edit_area_img"
              src="./assets/img/contacts/edit.png"
              alt=""
            />
            <span class="edit_text">Edit</span>
          </div>
          <div class="edit_area">
            <img
              class="edit_area_img"
              src="./assets/img/contacts/delete.png"
              alt=""
            />
            <span class="edit_text">Delete</span>
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
      <span class="contacts_bigcard_Information_email"
        >${mail}</span
      >
      <span class="contacts_bigcard_Information_email_phone_span"
        >Phone</span
      >
      <span class="contacts_bigcard_Information_phone"
        >${phone}</span
      >
    </div>
  </section>
`;
}