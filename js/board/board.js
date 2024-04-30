let boardData;
let boardPrioSpans;
let tasks = [];
let currentDraggedId;
let currentIndex;
let currentEditTask;
let currentSubtasks;
let currentTask;

function initBoard() {
  getBoardData();
}

window.addEventListener("resize", changeAddTaskButton);

function changeAddTaskButton() {
  if (window.innerWidth <= 1000) {
    setChangeButtonSite();
  } else setShowAddTask();
}

/**
 * This function sets event listeners on specific elements to trigger a function called "changeButtonSite" when those elements are clicked, allowing users to change the site according to the clicked element.
 */
function setChangeButtonSite() {
  document
    .getElementById("board_add_task_button")
    .addEventListener("click", changeButtonSite);
  document
    .getElementById("category_headline_img0")
    .addEventListener("click", changeButtonSite);
  document
    .getElementById("category_headline_img1")
    .addEventListener("click", changeButtonSite);
  document
    .getElementById("category_headline_img2")
    .addEventListener("click", changeButtonSite);
  document
    .getElementById("category_headline_img3")
    .addEventListener("click", changeButtonSite);
}

function setShowAddTask() {
  document
    .getElementById("board_add_task_button")
    .addEventListener("click", showAddTask);
}

function changeButtonSite() {
  changeCurrentPage("add_task");
}

/**
 * This function asynchronously retrieves board data from storage, fetches additional data needed for rendering tasks, assigns tasks to a variable, sets IDs for elements, renders tasks on the board, sets priority spans, activates a medium priority, and updates the add task button, facilitating the display and management of tasks on the board.
 */
async function getBoardData() {
  const response = await getItem("users");
  await getData();
  boardData = JSON.parse(response);
  tasks = boardData.tasks;
  setId();
  renderTasks(tasks);
  renderAddTask("toDo");
  getPrioSpans();
  setActivePrio(1, "medium");
  changeAddTaskButton();
}

/**
 * This function renders tasks within a specific board category by calling functions to display an add task form, set priority spans, activate a medium priority, add a function to clear inputs, set minimum dates for input fields, and show the add task form, ensuring smooth task management within the designated category.
 * @param {boardCategory} functionPara - Parameter for Board Category
 */
function renderTaskInBoardCategory(functionPara) {
  renderAddTask(functionPara);
  getPrioSpans();
  setActivePrio(1, "medium");
  addClearFunction();
  addDateMin("date_input");
  showAddTask();
}

/**
 * This function renders tasks by first rendering the categories, then filtering and displaying tasks for each category ("toDo", "inProgress", "awaitFeedback", and "done") from the provided task list, organizing tasks based on their current status for better visual representation.
 * @param {Array} taskList - List of Tasks
 */
function renderTasks(taskList) {
  renderCategory();
  filterTasks("toDo", taskList);
  filterTasks("inProgress", taskList);
  filterTasks("awaitFeedback", taskList);
  filterTasks("done", taskList);
}

function setId() {
  tasks.forEach((task, index) => {
    task.id = index;
  });
}

function renderCategory() {
  document.getElementById("category_section").innerHTML = generateCategorys();
}

/**
 * This function filters tasks based on their category board ID and renders the filtered tasks within the corresponding section of the board.
 * If there are no tasks in the filtered list, it displays an empty card for that section to maintain the layout consistency.
 * @param {id} id - Id from task
 * @param {Array} taskArr - Array of Tasks
 */
function filterTasks(id, taskArr) {
  const taskList = taskArr.filter((todo) => todo.categoryBoard == `${id}`);
  if (taskList.length != 0) {
    renderList(taskList, id);
  } else {
    document.getElementById(`${id}`).innerHTML = generateEmpyCard();
  }
}

/**
 *
 * @param {Array} list - Array from Tasks
 * @param {Number} id  - Id from current Task
 */
function renderList(list, id) {
  list.forEach((task, index) => {
    const checkSubTasks = task.subtasks.filter(
      (subTask) => subTask.check == true
    );
    document.getElementById(`${id}`).innerHTML += generateCard(
      task,
      index,
      checkSubTasks.length
    );
    printCardBackgroundCategory(task, index);
    printCardPrio(task, index);
    printProfiles(task, index);
  });
}

function printProfiles(task, index) {
  task.assignedTo.forEach((contact, i) => {
    const name = getProfileName(contact);
    document.getElementById(
      `card_profile_img_container_${task.categoryBoard}${index}`
    ).innerHTML += generateCardContactProfile(
      name,
      i,
      task.categoryBoard,
      index
    );
    setCardProfileBg(
      contact,
      i,
      task.categoryBoard,
      "card_profile_span_",
      index
    );
  });
}

function getProfileName(contact) {
  const names = contact.split(" ");
  let name;
  if (names.length == 1) {
    name = names[0].charAt(0);
  } else name = names[0].charAt(0) + names[names.length - 1].charAt(0);
  return name;
}

function setCardProfileBg(contact, i, categoryBoard, id, index) {
  const currentContact = boardData.contacts.find(
    (boardContact) => boardContact.name == contact
  );
  if (currentContact) {
    document.getElementById(
      `${id}${categoryBoard}${index}${i}`
    ).style.backgroundColor = currentContact.color;
  }
}

function printCardPrio(task, index) {
  const prioImg = document.getElementById(
    `card_prio_${task.categoryBoard}${index}`
  );
  const prio = task.prio;
  if (prio == "urgent") {
    prioImg.src = "./assets/img/add_task/urgent_color.png";
  } else if (prio == "medium") {
    prioImg.src = "./assets/img/add_task/medium_color.png";
  } else if (prio == "low") {
    prioImg.src = "./assets/img/add_task/low_color.png";
  }
}

function startDragging(id, element) {
  currentDraggedId = id;
  element.classList.add("drag_transform");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag_hover");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag_hover");
}

function moveTo(category) {
  tasks.forEach((task, index) => {
    if (task.id == currentDraggedId) {
      currentIndex = index;
    }
  });
  tasks[currentIndex].categoryBoard = category;
  setItem("users", boardData);
  renderTasks(tasks);
}

function showAddTask() {
  document.getElementById("add_task_popup").style.display = "flex";
}

function closeAddTask() {
  document.getElementById("add_task_popup").style.display = "none";
}

function renderAddTask(functionPara) {
  document.getElementById("add_task_popup_content").innerHTML =
    generateAddTask(functionPara);
}

function setAddTasksInTasks() {
  setTimeout(() => {
    tasks.push(tasksInAddTask[0]);
    tasksInAddTask = [];
    initBoard();
    initAddTask();
    closeAddTask();
  }, 1250);
}

function checkPrio(prio) {
  if (prio == "urgent") {
    setActivePrioEdit(0, "urgent");
  } else if (prio == "medium") {
    setActivePrioEdit(1, "medium");
  } else if (prio == "low") {
    setActivePrioEdit(2, "low");
  }
}

function renderAssignedContacts(task) {
  task.assignedTo.forEach((contact, index) => {
    document.getElementById("popup_assigned_to").innerHTML +=
      generateAssignContact(contact, index);
    const name = getProfileName(contact);
    document.getElementById(
      `card_profile_fullpopup_container${index}`
    ).innerHTML = generateCardContactProfile(name, index, "popup");
    setCardProfileBg(contact, index, "popup", "card_profile_span_");
  });
}

function renderPopUpSubtasks(task) {
  const subTaskContainer = document.getElementById("popup_subtask_container");
  task.subtasks.forEach((subTask, index) => {
    subTaskContainer.innerHTML += generatePopUpSubtasks(subTask, index, task);
  });
  checkPopUpCheckbox(task.subtasks);
}

function setPopUpCheck(id, index, title) {
  const checkBox = document.getElementById(`popup_checkbox${index}`);
  const currentTask = tasks.filter((task) => task.id == id);
  const currentSubtask = currentTask[0].subtasks.filter(
    (task) => task.title == title
  );
  if (checkBox.checked == true) {
    currentSubtask[0].check = true;
  } else {
    currentSubtask[0].check = false;
  }
  setItem("users", boardData);
}

function checkPopUpCheckbox(subTasks) {
  subTasks.forEach((subTask, index) => {
    const checkbox = document.getElementById(`popup_checkbox${index}`);
    if (subTask.check == true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
}

function closePopUpCard() {
  document.getElementById("card_popup").style.display = "none";
  renderTasks(tasks);
}

function formatDate(date) {
  const dateData = date.split("-");
  return `${dateData[2]}/${dateData[1]}/${dateData[0]}`;
}

function renderPrio(prio) {
  const prioImg = document.getElementById("popup_prio_img");
  const prioContainer = document.getElementById("popup_prio_container");
  if (prio == "urgent") {
    prioImg.src = "./assets/img/add_task/urgent_white.png";
    prioContainer.classList.add("urgent");
  } else if (prio == "medium") {
    prioImg.src = "./assets/img/add_task/medium_white.png";
    prioContainer.classList.add("medium");
  } else if (prio == "low") {
    prioImg.src = "./assets/img/add_task/low_white.png";
    prioContainer.classList.add("low");
  }
}

function printBackgroundCategory(category) {
  if (category == "Technical Task") {
    document.getElementById("popup_category_headline").style.backgroundColor =
      "#1FD7C1";
  }
}

/**
 * This function moves a task to a different category within the board by updating its category board property based on the provided category.
 * It then saves the updated task data to storage and refreshes the display to reflect the changes in the task's position on the board. Additionally, it disables the onclick event for the task's settings container to prevent multiple move actions.
 * @param {Number} id - Current id from Task
 * @param {String} category - Board Category
 * @param {Number} index - Current index from card_settings_container
 */
function popUpMoveTo(id, category, index) {
  document.getElementById(`card_settings_container${index}`).onclick = "";
  const task = boardData.tasks.find((boardTask) => boardTask.id == id);
  task.categoryBoard = category;
  setItem("users", boardData);
  renderTasks(tasks);
}
