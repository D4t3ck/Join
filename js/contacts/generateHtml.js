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

function generateEditContactHTML(name, mail, phone, j, profil) {
  return /*html*/ `
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
