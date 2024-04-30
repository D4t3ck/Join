/**
 * This function populates the popup card with editable fields for modifying a task's details.
 * It retrieves the current task's assigned contacts, generates HTML content for the editable popup card, sets up priority spans for editing, checks the current priority, adds minimum date restrictions for editing due dates, sets the category for editing, populates the description field with the current task's description, displays subtasks for editing, and renders checked contacts for editing purposes.
 */
function renderPopUpCardEdit() {
  checkedContacts = currentTask.assignedTo;
  document.getElementById("card_popup_content").innerHTML =
    generatePopUpCardEdit(currentTask);
  getPrioSpansEdit();
  checkPrio(currentTask.prio);
  addDateMin("date_input_edit");
  setCategoryEdit(currentTask);
  setDescriptionEditValue(currentTask);
  renderSubtasksEdit(currentTask);
  renderCheckedContactsForEdit();
}

function getPrioSpansEdit() {
  boardPrioSpans = document.querySelectorAll(".edit_category");
}

function setActivePrioEdit(index, prio) {
  removeActiveClassEdit();
  boardPrioSpans[index].classList.add(prio);
  document.getElementById(
    `prio_category_img${index}_edit`
  ).src = `./assets/img/add_task/${prio}_white.png`;
}

function removeActiveClassEdit() {
  boardPrioSpans.forEach((prioSpan) => {
    prioSpan.classList.remove("urgent");
    prioSpan.classList.remove("medium");
    prioSpan.classList.remove("low");
  });
  document.getElementById("prio_category_img0_edit").src =
    "./assets/img/add_task/urgent_color.png";
  document.getElementById("prio_category_img1_edit").src =
    "./assets/img/add_task/medium_color.png";
  document.getElementById("prio_category_img2_edit").src =
    "./assets/img/add_task/low_color.png";
}

function renderSubtasksEdit(task) {
  const subTaskContent = document.getElementById("subtask_content_edit");
  subTaskContent.innerHTML = "";
  currentSubtasks = task.subtasks;
  currentSubtasks.forEach((subTask, index) => {
    subTaskContent.innerHTML += generateSubTaskForEditPopUp(
      subTask,
      index,
      task.id
    );
  });
}

/**
 * This function enables the editing of a subtask within an edit popup card by retrieving the current task based on its ID, generating HTML content for editing the subtask within the popup, setting the content as editable, focusing on it for user interaction, and displaying options for editing the subtask.
 * @param {Number} index - Current Index from Subtask 
 * @param {Number} id - Current Id from Task 
 */
function editSubTaskForEditPopUp(index, id) {
  currentEditTask = tasks.find((task) => task.id == id);
  document.getElementById(`subtask_paragraph${index}_edit`).innerHTML =
    generateSubTaskEditForEditPopUp(currentEditTask.subtasks[index], index);
  let paragraph = document.getElementById(`subtask_paragraph${index}_edit`);
  paragraph.contentEditable = true;
  paragraph.focus();
  showSubTaskIconForEditPopUp(index, currentEditTask);
}

function showSubTaskIconForEditPopUp(index, task) {
  document.getElementById(`subtask_icon_container${index}_edit`).innerHTML =
    generateSubTaskIconEditForEditPopUp(index, task);
}

function deleteSubTaskForEdit(index, id) {
  currentEditTask = tasks.find((task) => task.id == id);
  currentEditTask.subtasks.splice(index, 1);
  renderSubtasksEdit(currentEditTask);
}

function setDescriptionEditValue(task) {
  const textarea = document.getElementById("description_textarea_edit");
  textarea.value = task.description;
}

function setCategoryEdit(task) {
  const selectCategory = document.getElementById("select_category_edit");
  selectCategory.disabled = true;
  if (task.category == "User Story") {
    selectCategory.selectedIndex = 1;
  } else selectCategory.selectedIndex = 2;
}

function saveSubTaskForEdit(index) {
  currentSubtasks[index].title = document.getElementById(
    `subtask_information_span${index}_edit`
  ).innerText;
  printSubTaskForEdit();
}

function printSubTaskForEdit() {
  document.getElementById("subtask_content_edit").innerHTML = "";
  currentSubtasks.forEach((task, index) => {
    renderSubTaskContentForEdit(task, index);
  });
}

function renderSubTaskContentForEdit(task, index) {
  document.getElementById("subtask_content_edit").innerHTML +=
    generateSubTaskForEditPopUp(task, index, currentTask.id);
}

function getPrioEdit() {
  let value;
  for (let i = 0; i < boardPrioSpans.length; i++) {
    for (let j = 0; j < boardPrioSpans[i].classList.length; j++) {
      if (
        boardPrioSpans[i].classList[j] == "urgent" ||
        boardPrioSpans[i].classList[j] == "medium" ||
        boardPrioSpans[i].classList[j] == "low"
      ) {
        value = document
          .getElementById(`prio_headline${i}_edit`)
          .innerText.toLowerCase();
      }
    }
  }
  return value;
}

function renderInputAssignedForEdit() {
  document.getElementById("select_contact").onclick = "";
  document.getElementById("assigned_container_edit").innerHTML =
    generateInputAssignedForEdit();
  renderAssignedContentForEdit();
  document.getElementById("assigned_input_edit").focus();
}

/**
 * This function closes the dropdown menu for editing assigned contacts by updating the list of checked contacts, setting the assigned contacts for the current task, clearing and updating the dropdown menu content, and rendering the checked contacts for editing purposes.
 */
function closeDropdownForEdit() {
  if (assignRdy) {
    getCheckedContacts();
    currentTask.assignedTo = checkedContacts;
    const content = document.getElementById("assigned_container_edit");
    content.innerHTML = "";
    content.innerHTML = generateAssignSelectionForEdit();
    assignRdy = false;
    renderCheckedContactsForEdit();
  }
}

function setSubTaskForEdit() {
  const inputValue = document.getElementById("input_subtask_edit").value;
  document.getElementById("input_subtask_edit").value = "";
  if (inputValue.length != 0) {
    const task = new subTask(inputValue, false);
    currentSubtasks.push(task);
    printSubTaskForEdit();
  }
}

function renderAssignedContentForEdit() {
  const content = document.getElementById("input_assigned_content_edit");
  content.innerHTML = "";
  data.contacts.forEach((contact, index) => {
    content.innerHTML += generateContact(contact.name, index);
    setContactValue(contact.name, index);
  });
  checkActiveContacts();
  setTimeout(() => {
    assignRdy = true;
  }, 500);
}

/**
 * This function filters contacts for editing based on a user-inputted search term, updating the displayed contact list within the edit popup to show only the contacts whose names contain the search term in a case-insensitive manner.
 * It then sets the contact values and checks whether any of the filtered contacts are already checked, ensuring smooth contact selection during editing.
 */
function searchContactForEdit() {
  const filteredContacts = [];
  const inputValue = document
    .getElementById("assigned_input_edit")
    .value.toLocaleLowerCase();
  document.getElementById("input_assigned_content_edit").innerHTML = "";
  data.contacts.forEach((contact) => {
    if (contact.name.toLocaleLowerCase().includes(inputValue))
      filteredContacts.push(contact.name);
  });
  filteredContacts.forEach((contact, index) => {
    document.getElementById("input_assigned_content_edit").innerHTML +=
      generateContact(contact, index);
    setContactValue(contact, index);
    checkContactChecked();
  });
}

function renderCheckedContactsForEdit() {
  checkedContacts.forEach((checkedContact, index) => {
    const findContact = data.contacts.find(
      (contact) => contact.name == checkedContact
    );
    if (findContact) {
      const profileName = getProfileChar(checkedContact);
      document.getElementById("assigned_contact_profiles_edit").innerHTML +=
        generateContactProfile(profileName, index);
      document.getElementById(`profile_span${index}`).style.backgroundColor =
        findContact.color;
    }
  });
}

/**
 * This function saves the edits made to a task in a popup card by updating the task's title, description, due date, priority, and assigned contacts based on the input values provided by the user.
 * It then saves the updated task data to storage and refreshes the popup card to display the edited information.
 * @param {Number} id - Current Id from Task
 */
function editPopUpSave(id) {
  const task = tasks.find((task) => task.id == id);
  task.title = document.getElementById("title_input_edit").value;
  task.description = document.getElementById("description_textarea_edit").value;
  task.dueDate = document.getElementById("date_input_edit").value;
  task.prio = getPrioEdit();
  task.assignedTo = checkedContacts;
  setItem("users", boardData);
  renderPopUpCard(id);
}
