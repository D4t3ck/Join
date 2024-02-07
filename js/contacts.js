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
    {
        "name": "Anton Mayer",
        "mail": "antom@test.de",
        "phone": "+49 1111 1111 1111"
    },
]

let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
// let letters = [];

function initContact() {
    init();
    renderletters();
}




function renderletters() {
    let contactArea = document.getElementById('contactScroll');
    contactArea.innerHTML = '';
    // letterbox.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
  
        for (let j = 0; j < contacts.length; j++) {
            const element = contacts[j];
            const name = element['name'];
            const mail = element['mail'];
            const firstletter = element['name'].charAt(0);
            // console.log(firstletter)
           
            if (letter == firstletter) {
                contactArea.innerHTML += 
                /*html*/`              
                <div class="contacts_scroll_abc">
                   
                        <div id="letterbox${i}"></div>
                    
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

function test() {
    let name = 'florian';
    let number = 123;
    let email = 'blabla@tests.com'
    let contact = {
            "name": name,
            "mail": email,
            "phone": number,
    }
    
    contacts.push(contact);
    // console.log(contact)
}