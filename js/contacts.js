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
        "name": "Claus Cayer",
        "mail": "ClausCayer@test.de",
        "phone": "+49 1131 1111 1111"
    },
    {
        "name": "Claus Cayer",
        "mail": "ClausCayer@test.de",
        "phone": "+49 1131 1111 1111"
    },
]

let letters = [];

function initContact() {
    renderContacts();
    init();
}

function renderContacts(filter) {
    let contactArea = document.getElementById('contactScroll');
    contactArea.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];
        const name = element['name'];
        const mail = element['mail'];
        const firstletter = element['name'].charAt(0);
        console.log(firstletter)
        if (!filter || filter == firstletter) {
            
        contactArea.innerHTML += 
        
        `
        <div class="contacts_scroll_abc">
            <span class="contacts_scroll_abc_text">${firstletter}</span>
          </div>
        <div class="contact_scrolls_card_small">
        <img
          class="contact_scrolls_card_small_img"
          src="./assets/img/contacts/ProfilebadgeAM.png"
          alt=""
        />
        <div class="contact_scrolls_card_small_contact">
          <span class="contact_scrolls_card_small_name">${name}</span>
          <span class="contact_scrolls_card_small_onclick_email"
            >${mail}</span
          >
        </div>
      </div>`;
        }

        if (!letters.includes(firstletter)) {
            letters.push(firstletter)
        }
    }
}

function renderletters() {
    let letterbox = document.getElementById('letterbox')
    letterbox.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];

        letterbox.innerHTML += ``;
    }
}