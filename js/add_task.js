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

/**
 * This function initializes the addition of a task by including HTML content, fetching data asynchronously, setting priority spans, activating a medium priority, and adding functions for clearing and setting minimum dates for input fields.
 */
async function initAddTask() {
  await getData();
  await includeHTML().then(() => {
    getPrioSpans();
    setActivePrio(1, "medium");
    addClearFunction();
    addDateMin("date_input");
  });
}

/**
 * This function gets user data from a storage source, converts the response to a usable format, and assigns the tasks associated with the users to a variable for further processing.
 */
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

/**
 * This function clears input fields and resets arrays used for subtasks and checked contacts, ensuring a clean slate for adding new tasks.
 */
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

/**
 * This function prevents the default form submission behavior, collects task data, displays a popup for creating tasks, and then automatically closes the popup after a short delay, contributing to a smoother user experience.
 * @param {Event} event - Event handler
 * @param {BoardCategory} renderFunctionPara - Parameter for getTaskData function
 */
function checkForm(event, renderFunctionPara) {
  event.preventDefault();
  getTaskData(renderFunctionPara);
  showCreateTaskPopup();
  setTimeout(() => {
    closeCreateTaskPopup();
  }, 1250);
}

/**
 * This function prevents the default form submission behavior, collects task data, displays a popup for creating tasks, then automatically closes the popup and changes the page after a short delay, facilitating a seamless transition for users.
 * @param {Event} event - Event handler
 */
function checkFormFullPage(event) {
  event.preventDefault();
  getTaskData("toDo");
  showCreateTaskPopup();
  setTimeout(() => {
    closeCreateTaskPopup();
    changePage();
  }, 1250);
}

/**
 * This function gathers task-related data from input fields, selected options, and arrays, creates a new Task object with the collected data, adds it to a list of tasks, saves the updated data to storage, and then clears the input fields for a fresh start.
 * @param {categoryBoard} categoryBoard - render task in the correct category 
 */
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

/**
 * Change window location to board.html.
 */
function changePage() {
  window.location.href = "./board.html";
}

/**
 * This function sets the priority level for a task by adding a specific class to the corresponding HTML element, updating the priority icon accordingly, and ensuring only one priority level is active at a time.
 * @param {index} index - Index for the three prios 
 * @param {*} prio - Parameter from current prio
 */
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

/**
 * This function iterates through priority elements, checking for specific classes representing priority levels, then retrieves the corresponding priority value from the associated headline, converting it to lowercase before returning it.
 * @returns {value}
 */
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

/**
 * This function creates a new subtask object using the input value from a form field, adds it to a list of subtasks, clears the input field, and then updates the display to show the newly added subtask.
 */
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

/**
 * This function removes a subtask from the list based on its index, updates the display to reflect the changes, effectively deleting the selected subtask.
 * @param {index} index - Current index from Subtask Array
 */
function deleteSubTask(index) {
  subTasks.splice(index, 1);
  printSubTask();
}

/**
 * This function retrieves the subtask at a specific index, replaces its content with an editable form, sets the content as editable, focuses on it for user interaction, and displays options for editing the subtask.
 * @param {index} index - Current index from Subtask Array 
 */
function editSubTask(index) {
  const task = subTasks[index];
  document.getElementById(`subtask_paragraph${index}`).innerHTML =
    generateSubTaskEdit(task, index);
  let paragraph = document.getElementById(`subtask_paragraph${index}`);
  paragraph.contentEditable = true;
  paragraph.focus();
  showSubTaskIcon(index);
}

/**
 * This function updates the title of a subtask with the modified content entered by the user, then refreshes the display to reflect the changes made to the subtask list.
 * @param {index} index - Current index from Subtask Array
 */
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

function showCreateTaskPopup() {
  document.getElementById("create_popup").style.display = "flex";
}

function closeCreateTaskPopup() {
  document.getElementById("create_popup").style.display = "none";
}
