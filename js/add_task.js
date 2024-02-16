let data;
let tasksInAddTask;
let subTasks = [];
let contacts = ["Florian", "Daniel", "Roman", "Frederic", "Albert", "Gustav"];
let checkedContacts = [];
let assignRdy = false;
let prioSpans;

class Task {
  constructor(
    title,
    description,
    assignedTo,
    dueDate,
    prio,
    category,
    subtasks,
    categoryBoard,
    id
  ) {
    this.title = title;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.prio = prio;
    this.category = category;
    this.subtasks = subtasks;
    (this.categoryBoard = categoryBoard), (this.id = id);
  }
}

class subTask {
  constructor(title, check) {
    this.title = title;
    this.check = check;
  }
}

async function initAddTask() {
  includeHTML();
  await getData();
  getPrioSpans();
  setActivePrio(1, "medium");
  addClearFunction();
  addDateMin("date_input");
}

async function getData() {
  const response = await getItem("users");
  data = JSON.parse(response);
  tasksInAddTask = data.tasks;
}

function getPrioSpans() {
  prioSpans = document.querySelectorAll(".prio_category_span");
}

function addClearFunction() {
  document.getElementById("clear_button").addEventListener("click", clear);
}

function addDateMin(id) {
  document.getElementById(`${id}`).min = new Date().toISOString().split("T")[0];
}

function clear() {
  document.getElementById("title_input").value = "";
  document.getElementById("description_textarea").value = "";
  document.getElementById("date_input").value = "";
  document.getElementById("select_category").value = "";
  document.getElementById("input_subtask").value = "";
  document.getElementById("subtask_content").innerHTML = "";
  subTasks = [];
  checkedContacts = [];
  renderCheckedContacts();
}

function stopEvent(event) {
  event.stopPropagation();
}

function checkForm(event, renderFunctionPara) {
  event.preventDefault();
  getTaskData(renderFunctionPara);
  showCreateTaskPopup();
  setTimeout(() => {
    closeCreateTaskPopup();
  }, 1250);
}

function checkFormFullPage(event) {
  event.preventDefault();
  getTaskData('toDo');
  showCreateTaskPopup();
  setTimeout(() => {
    closeCreateTaskPopup();
    changePage();
  }, 1250);
}

function getTaskData(categoryBoard) {
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
    subTasks,
    categoryBoard,
    null
  );
  tasksInAddTask.push(task);
  setItem("users", data);
  clear();
}

function changePage() {
  window.location.href = "./board.html";
}

function setActivePrio(index, prio) {
  removeActiveClass();
  prioSpans[index].classList.add(prio);
  document.getElementById(
    `prio_category_img${index}`
  ).src = `./assets/img/add_task/${prio}_white.png`;
}

function removeActiveClass() {
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
  subTasks[index].title = document.getElementById(
    `subtask_information_span${index}`
  ).innerText;
  printSubTask();
}

function showSubTaskIcon(index) {
  document.getElementById(`subtask_icon_container${index}`).innerHTML =
    generateSubTaskIconEdit(index);
}

function renderInputAssigned() {
  document.getElementById("assigned_container").innerHTML =
    generateInputAssigned();
  renderAssignedContent();
  document.getElementById("assigned_input").focus();
}

function renderAssignedContent() {
  const content = document.getElementById("input_assigned_content");
  content.innerHTML = "";
  data.contacts.forEach((contact, index) => {
    content.innerHTML +=
      generateContact(contact.name, index);
    setContactValue(contact.name, index);
  });
  checkContactChecked();
  setTimeout(() => {
    assignRdy = true;
  }, 500);
}

function checkContactChecked() {
  let filteredContacts;
  data.contacts.forEach((contact, index) => {
    filteredContacts = checkedContacts.find(checkContact => checkContact == contact.name);
    if(filteredContacts) {
      document.getElementById(`contact${index}`).checked = true;  
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

function renderCheckedContacts() {
  document.getElementById('assigned_contact_profiles').innerHTML = '';
  checkedContacts.forEach((checkedContact, index) => {
    const findContact = data.contacts.find(contact => contact.name == checkedContact);
    const profileName = getProfileChar(checkedContact);
    document.getElementById('assigned_contact_profiles').innerHTML += generateContactProfile(profileName, index);
    document.getElementById(`profile_span${index}`).style.backgroundColor = findContact.color;
  });
}

function getProfileChar(checkedContact) {
  const names = checkedContact.split(' ');
  let profileName;
  if(names.length == 1) {
    profileName = profileName = names[0].charAt(0);
  } else {
    profileName = names[0].charAt(0) + names[names.length - 1].charAt(0)
  }
  return profileName;
}

function getCheckedContacts() {
  const contactList = document.querySelectorAll(".contact");
  checkedContacts = [];
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].checked) checkedContacts.push(contactList[i].value);
  }
}

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
  });
}

function showCreateTaskPopup() {
  document.getElementById("create_popup").style.display = "flex";
}

function closeCreateTaskPopup() {
  document.getElementById("create_popup").style.display = "none";
}

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
  return /*html*/`
    <span class="profile_span" id="profile_span${index}">${profileName}</span>
  `;
}