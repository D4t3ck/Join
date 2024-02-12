let boardData;
let tasks = [];

let currentDraggedId;
let currentIndex;

function initBoard() {
  getBoardData();
}

async function getBoardData() {
  const response = await getItem("users");
  boardData = JSON.parse(response);
  tasks = boardData.tasks;
  setId();
  renderTasks(tasks);
  renderAddTask();
}

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

function filterTasks(id, taskArr) {
  const taskList = taskArr.filter((todo) => todo.categoryBoard == `${id}`);
  if (taskList.length != 0) {
    renderList(taskList, id);
  } else {
    document.getElementById(`${id}`).innerHTML = generateEmpyCard();
  }
}

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
  });
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

function renderAddTask() {
  document.getElementById("add_task_popup_content").innerHTML =
    generateAddTask();
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

function renderPopUpCard(taskId) {
  const currentTask = tasks.find((todo) => todo.id == `${taskId}`);
  const currentFormatDate = formatDate(currentTask.dueDate);
  const prio =
    currentTask.prio.charAt(0).toUpperCase() + currentTask.prio.slice(1);
  document.getElementById("card_popup").style.display = "flex";
  document.getElementById("card_popup_content").innerHTML = generatePopUpCard(
    currentTask,
    currentFormatDate,
    prio
  );
  renderPrio(currentTask.prio);
  printBackgroundCategory(currentTask.category);
  renderPopUpSubtasks(currentTask);
  renderAssignedContacts(currentTask);
}

function renderPopUpCardEdit(taskId) {
  const currentTask = tasks.find(task => task.id == taskId);
  document.getElementById("card_popup_content").innerHTML = generatePopUpCardEdit(currentTask);
  getPrioSpans();
  // setActivePrioEdit(1, "medium");
  addDateMin('date_input_edit');
  setCategoryEdit(currentTask);
  setDescriptionEditValue(currentTask);
  renderSubtasksEdit(currentTask);
}

function setActivePrioEdit(index, prio) {
  removeActiveClass();
  prioSpans[index].classList.add(prio);
  document.getElementById(
    `prio_category_img${index}_edit`
  ).src = `./assets/img/add_task/${prio}_white.png`;
}

function renderSubtasksEdit(task) {
  const subTaskContent = document.getElementById('subtask_content_edit');
  task.subtasks.forEach((subTask, index) => {
    subTaskContent.innerHTML += generateSubTask(subTask, index);
  });
}

function setDescriptionEditValue(task) {
  const textarea = document.getElementById('description_textarea_edit');
  textarea.value = task.description;
}

function setCategoryEdit(task) {
  const selectCategory = document.getElementById('select_category_edit');
  selectCategory.disabled = true;
  if(task.category == 'User Story') {
    selectCategory.selectedIndex = 1;
  } else selectCategory.selectedIndex = 2;
}

function renderAssignedContacts(task) {
  task.assignedTo.forEach(contact => {
    document.getElementById('popup_assigned_to').innerHTML += generateAssignContact(contact);
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
    checkBox.checked = false;
    currentSubtask[0].check = false;
  } else {
    checkBox.checked = true;
    currentSubtask[0].check = true;
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

function printCardBackgroundCategory(task, index) {
  if (task.category == "Technical Task") {
    document.getElementById(
      `card_category_${task.categoryBoard}${index}`
    ).style.backgroundColor = "#1FD7C1";
  } else {
    document.getElementById(
      `card_category_${task.categoryBoard}${index}`
    ).style.backgroundColor = "#0038FF";
  }
}

function printBackgroundCategory(category) {
  if (category == "Technical Task") {
    document.getElementById("popup_category_headline").style.backgroundColor =
      "#1FD7C1";
  }
}

function deleteTask(id) {
  tasks.splice(id, 1);
  setItem('users', boardData);
  closePopUpCard();
}

function searchTask() {
  const inputValue = document.getElementById('search_task_input').value.toLowerCase();
  if(inputValue != '') {
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(inputValue));
    renderTasks(filteredTasks);
  } else renderTasks(tasks);
}
