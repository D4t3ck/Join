/**
 * This function removes a task from the task list based on its ID, updates the IDs of remaining tasks, saves the updated task list to storage, and closes the popup card associated with the deleted task.
 * @param {Number} id - Current index from Task
 */
function deleteTask(id) {
  tasks.splice(id, 1);
  setId();
  setItem("users", boardData);
  closePopUpCard();
}

/**
 * This function retrieves a search term inputted by the user, then filters the task list based on whether the task title or category matches the search term in a case-insensitive manner. If the search term is empty, it renders all tasks.
 * Finally, it displays the filtered tasks on the board, reflecting the user's search query.
 * @param {String} id - HTML id
 */
function searchTask(id) {
  const inputValue = document.getElementById(id).value.toLowerCase();
  if (inputValue != "") {
    const filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(inputValue) ||
        task.category.toLowerCase().includes(inputValue)
    );
    renderTasks(filteredTasks);
  } else renderTasks(tasks);
}

function checkActiveContacts() {
  data.contacts.forEach((contact, index) => {
    currentTask.assignedTo.forEach((assignedContact) => {
      if (assignedContact == contact.name) {
        document.getElementById(`contact${index}`).checked = true;
      }
    });
  });
}

function showSettingPopUp(event, taskId, index, categoryBoard) {
  event.stopPropagation();
  document.getElementById(
    `popup_container_${categoryBoard}${index}`
  ).innerHTML = generateSettingsPopUp(taskId, index);
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

/**
 * This function displays a popup card containing detailed information about a specific task identified by its ID.
 * It retrieves the task data, formats its due date, priority, and other details, then generates HTML content for the popup card. Additionally, it renders priority indicators, sets the background category color, and displays subtasks and assigned contacts associated with the task.
 * @param {Number} taskId - current Task Id
 */
function renderPopUpCard(taskId) {
  currentTask = tasks.find((todo) => todo.id == `${taskId}`);
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
