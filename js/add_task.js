let tasks = [];
let subTasks = [];
let contacts = ['Florian', 'Daniel', 'Roman', 'Frederic', 'Albert', 'Gustav'];
let checkedContacts = [];
let assignRdy = false;
const prioSpans = document.querySelectorAll(".prio_category_span");
document.getElementById("clear_button").addEventListener("click", clear);
document.getElementById("date_input").min = new Date()
  .toISOString()
  .split("T")[0];

class Task {
  constructor(
    title,
    description,
    assignedTo,
    dueDate,
    prio,
    category,
    subtasks
  ) {
    this.title = title;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.prio = prio;
    this.category = category;
    this.subtasks = subtasks;
  }
}

class subTask {
  constructor(title, check) {
    this.title = title;
    this.check = check;
  }
}

function init() {
  includeHTML();
  setActivePrio(1, "medium");
}

function clear() {
  document.getElementById("title_input").value = "";
  document.getElementById("description_textarea").value = "";
  document.getElementById("date_input").value = "";
  document.getElementById("select_category").value = "";
  document.getElementById("input_subtask").value = "";
  document.getElementById("subtask_content").innerHTML = "";
  subTasks = [];
}

function stopEvent(event) {
  event.stopPropagation();
}

function checkForm(event) {
  event.preventDefault();
  console.log("Form Checked!");
  getTaskData();
  console.log(tasks);
}

function getTaskData() {
  const title = document.getElementById("title_input").value;
  const description = document.getElementById("description_textarea").value;
  const assignedTo = checkedContacts;
  const dueDate = document.getElementById("date_input").value;
  const prio = getPrio();
  const category = document.getElementById("select_category").value;
  const task = new Task(
    title,
    description,
    assignedTo,
    dueDate,
    prio,
    category,
    subTasks
  );
  tasks.push(task);
  clear();
}

function setActivePrio(index, prio) {
  removeActiveClass();
  prioSpans[index].classList.add(prio);
  document.getElementById(
    `prio_category_img${index}`
  ).src = `./assets/img/add_task/${prio}_white.png`;
}

function removeActiveClass(index, prio) {
  prioSpans.forEach((prioSpan) => {
    prioSpan.classList.remove("urgent");
    prioSpan.classList.remove("medium");
    prioSpan.classList.remove("low");
  });
  document.getElementById("prio_category_img0").src =
    "./assets/img/add_task/urgent_color.png";
  document.getElementById("prio_category_img1").src =
    "./assets/img/add_task/medium_color.png";
  document.getElementById("prio_category_img2").src =
    "./assets/img/add_task/low_color.png";
}

function getPrio() {
  let value;
  for (let i = 0; i < prioSpans.length; i++) {
    for (let j = 0; j < prioSpans[i].classList.length; j++) {
      if (
        prioSpans[i].classList[j] == "urgent" ||
        prioSpans[i].classList[j] == "medium" ||
        prioSpans[i].classList[j] == "low"
      ) {
        value = document
          .getElementById(`prio_headline${i}`)
          .innerText.toLowerCase();
      }
    }
  }
  return value;
}

function setSubTask() {
  const title = document.getElementById("input_subtask").value;
  if (title != "") {
    const task = new subTask(title, false);
    subTasks.push(task);
    document.getElementById("input_subtask").value = "";
    printSubTask();
  }
}

function printSubTask() {
  document.getElementById("subtask_content").innerHTML = "";
  subTasks.forEach((task, index) => {
    renderSubTaskContent(task, index);
  });
}

function renderSubTaskContent(task, index) {
  document.getElementById("subtask_content").innerHTML += generateSubTask(
    task,
    index
  );
}

function deleteSubTask(index) {
  subTasks.splice(index, 1);
  printSubTask();
}

function editSubTask(index) {
  const task = subTasks[index];
  document.getElementById(`subtask_paragraph${index}`).innerHTML =
    generateSubTaskEdit(task, index);
  let paragraph = document.getElementById(`subtask_paragraph${index}`);
  paragraph.contentEditable = true;
  paragraph.focus();
  showSubTaskIcon(index);
}

function saveSubTask(index) {
    subTasks[index].title = document.getElementById(`subtask_information_span${index}`).innerText;
    printSubTask();
}

function showSubTaskIcon(index) {
  document.getElementById(`subtask_icon_container${index}`).innerHTML =
    generateSubTaskIconEdit(index);
}

function renderInputAssigned() {
  document.getElementById('assigned_container').innerHTML = generateInputAssigned();
  renderAssignedContent();
  document.getElementById('assigned_input').focus();
}

function renderAssignedContent() {
  document.getElementById('input_assigned_content').innerHTML = '';
  contacts.forEach((contact, index) => {
    document.getElementById('input_assigned_content').innerHTML += generateContact(contact, index);
    setContactValue(contact, index);
  });
  setTimeout(() => {
    assignRdy = true;
  }, 500);
}

function setContactValue(contact, index) {
  document.getElementById(`contact${index}`).value = contact;
}

function closeDropdown() {
  if(assignRdy) {
    getCheckedContacts();
    document.getElementById('assigned_container').innerHTML = generateAssignSelection();
    assignRdy = false;
  }
}

function getCheckedContacts() {
  const contactList = document.querySelectorAll('.contact');
  for(let i = 0; i < contactList.length; i++) {
    if(contactList[i].checked) checkedContacts.push(contactList[i].value);
  }
}

function searchContact() {
  const filteredContacts = [];
  const inputValue = document.getElementById('assigned_input').value.toLocaleLowerCase();
  document.getElementById('input_assigned_content').innerHTML = '';
  contacts.forEach(contact => {
    if(contact.toLocaleLowerCase().includes(inputValue)) filteredContacts.push(contact); 
  });
  filteredContacts.forEach((contact, index) => {
    document.getElementById('input_assigned_content').innerHTML += generateContact(contact, index);
  });
}

function generateAssignSelection() {
  return /*html*/`
    <select name="" id="select_contact" placeholder="test" class="select" onclick="renderInputAssigned()">
        <option value="" disabled selected>Select contacts to assign</option>
    </select>
  `;
}

function generateInputAssigned() {
  return /*html*/`
    <div class="assign_input_container">
      <input type="text" class="input" id="assigned_input" onkeyup="searchContact()">
      <span><img src="./assets/img/add_task/arrow_drop_up.png" alt="close dropdown"></span>
    </div>
    <div id="input_assigned_content">
    </div>
  `;
}

function generateContact(contact, index) {
  return /*html*/`
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
