function generateAssignSelection() {
    return /*html*/ `
      <select name="" id="select_contact" placeholder="test" class="select" onclick="renderInputAssigned()">
          <option value="" disabled selected>Select contacts to assign</option>
      </select>
    `;
  }
  
  function generateInputAssigned() {
    return /*html*/ `
      <div class="assign_input_container" onclick="stopEvent(event)">
        <input type="text" class="input" id="assigned_input" onkeyup="searchContact()">
        <span><img src="./assets/img/add_task/arrow_drop_up.png" alt="close dropdown"></span>
      </div>
      <div id="input_assigned_content">
      </div>
    `;
  }
  
  function generateContact(contact, index) {
    return /*html*/ `
      <div>
        <input type="checkbox" id="contact${index}" class="contact">
        <label for="contact${index}"> ${contact}</label>
      </div>
    `;
  }
  
  function generateSubTask(task, index) {
    return /*html*/ `
          <p id="subtask_paragraph${index}">
          <span id="subtask_information_span${index}">
              <span>•</span>
              <span>${task.title}</span>
          </span>
              <span class="subtask_hover_icons" id="subtask_icon_container${index}">
                  <img src="./assets/img/add_task/pen.png" alt="Edit subtask" class="subtask_icon icon" id="edit_subtask_img${index}" onclick="editSubTask(${index})">
                  <img src="./assets/img/add_task/trash.png" alt="delete icon" class="subtask_icon icon" id="delete_subtask_img${index}" onclick="deleteSubTask(${index})">
              </span>
          </p>
      `;
  }
  
  function generateSubTaskEdit(task, index) {
    return /*html*/ `
          <span id="subtask_information_span${index}">
              <span id="subtask_title${index}">${task.title}</span>
          </span>
          <span class="subtask_hover_icons" id="subtask_icon_container${index}">
              <img src="./assets/img/add_task/pen.png" alt="Edit subtask" class="subtask_icon icon" id="edit_subtask_img${index}" onclick="editSubTask(${index})">
              <img src="./assets/img/add_task/trash.png" alt="delete icon" class="subtask_icon icon" id="delete_subtask_img${index}" onclick="deleteSubTask(${index})">
          </span>
      `;
  }
  
  function generateSubTaskIconEdit(index) {
    return /*html*/ `
          <img src="./assets/img/add_task/trash.png" alt="delete subtask" class="edit_icon icon" id="edit_subtask_img${index}" onclick="deleteSubTask(${index})">
          <img src="./assets/img/add_task/done.png" alt="delete icon" class="edit_icon icon" id="delete_subtask_img${index}" onclick="saveSubTask(${index})">
      `;
  }
  
  function generateContactProfile(profileName, index) {
    return /*html*/ `
      <span class="profile_span" id="profile_span${index}">${profileName}</span>
    `;
  }