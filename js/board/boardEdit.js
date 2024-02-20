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