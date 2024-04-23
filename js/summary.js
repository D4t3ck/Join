/**
 * Initializes the summary page by fetching data from the server and updating various statistics.
 * The function also calls the `greetingAnimation`, `getUserName`, and `getCurrentUser` functions.
 */
async function initSummary() {
  let response = await getItem("users");
  let responseAsJson = JSON.parse(response);
  let tasks = responseAsJson.tasks;

  let tasksNumber = document.getElementById("summary_tasks_number");
  tasksNumber.innerHTML = `${tasks.length}`;

  let todos = tasks.filter(checkTodos);
  let todoNumber = document.getElementById("summary_todo_number");
  todoNumber.innerHTML = `${todos.length}`;

  let dones = tasks.filter(checkDone);
  let doneNumber = document.getElementById("summary_done_number");
  doneNumber.innerHTML = `${dones.length}`;

  let progress = tasks.filter(checkProgress);
  let progressNumber = document.getElementById("summary_progress_number");
  progressNumber.innerHTML = `${progress.length}`;

  let feedback = tasks.filter(checkFeedback);
  let feedbackNumber = document.getElementById("summary_feedback_number");
  feedbackNumber.innerHTML = `${feedback.length}`;

  let urgent = tasks.filter(checkUrgent);
  let urgentNumber = document.getElementById("summary_urgent_number");
  urgentNumber.innerHTML = `${urgent.length}`;

  getUserName();
  getCurrentUser();
  greetingAnimation();
  updateUpcomingDeadline(tasks);
}

/**
 * Finds the next upcoming task and updates the HTML element with the upcoming task's deadline.
 * @param {Array} tasks - An array containing task objects.
 */
function updateUpcomingDeadline(tasks) {
  let upcomingTask = null;
  for (let i = 0; i < tasks.length; i++) {
    let dueDate = new Date(tasks[i].dueDate).getTime();
    const currentDate = new Date().getTime();
    if (dueDate >= currentDate) {
      if (!upcomingTask || dueDate < new Date(upcomingTask.dueDate)) {
        upcomingTask = tasks[i];
      }
    }
  }

  upcomingTask ? isUpComingTask(upcomingTask) : isNotUpComingTask();
}

function isUpComingTask(upcomingTask) {
  let upcomingDeadlineElement = document.getElementById("upcoming_deadline");
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthIndex = parseInt(upcomingTask.dueDate.split("-")[1]) - 1; // Month index starts from 0
  let monthName = monthNames[monthIndex];
  let day = upcomingTask.dueDate.split("-")[2];

  upcomingDeadlineElement.innerHTML = `<span>${monthName} ${day}, ${new Date(
    upcomingTask.dueDate
  ).getFullYear()}</span>`;
}

function isNotUpComingTask() {
  document.getElementById("upcoming_deadline").innerHTML = "No current tasks";
}

/**
 * Checks if the todo's category board is "toDo".
 * @param {Object} todo - The todo object to be checked.
 * @returns {boolean} - True if the category board is "toDo", otherwise false.
 */
function checkTodos(todo) {
  return todo.categoryBoard === "toDo";
}

/**
 * Checks if the todo's category board is "done".
 * @param {Object} todo - The todo object to be checked.
 * @returns {boolean} - True if the category board is "done", otherwise false.
 */
function checkDone(todo) {
  return todo.categoryBoard === "done";
}

/**
 * Checks if the todo's category board is "inProgress".
 * @param {Object} todo - The todo object to be checked.
 * @returns {boolean} - True if the category board is "inProgress", otherwise false.
 */
function checkProgress(todo) {
  return todo.categoryBoard === "inProgress";
}

/**
 * Checks if the todo's category board is "awaitFeedback".
 * @param {Object} todo - The todo object to be checked.
 * @returns {boolean} - True if the category board is "awaitFeedback", otherwise false.
 */
function checkFeedback(todo) {
  return todo.categoryBoard === "awaitFeedback";
}

/**
 * Checks if the todo's priority is "urgent".
 * @param {Object} todo - The todo object to be checked.
 * @returns {boolean} - True if the priority is "urgent", otherwise false.
 */
function checkUrgent(todo) {
  return todo.prio === "urgent";
}

/**
 * Changes the current page to the board page.
 */
function goToBoard() {
  changeCurrentPage("board");
}

/**
 * Calls the updateGreetings function to display the username in the greeting message on the page.
 */
async function getUserName() {
  await updateGreetings("greeting", "user_name_greeting");
}

/**
 * Updates the greeting message in the modal window based on the time of day and the username.
 */
async function greetingAnimation() {
  await updateGreetings("modal_greeting", "modal_user_name_greeting");
}

/**
 * Update the greetings displayed on the webpage based on user information.
 * @async
 * @param {string} greetingTextSelector - The CSS selector for the element containing the greeting text.
 * @param {string} userNameSelector - The CSS selector for the element where the user's name will be displayed.
 * @returns {Promise<void>} - A Promise that resolves once the greetings are updated.
 */
async function updateGreetings(greetingTextSelector, userNameSelector) {
  const response = await getItem("users");
  const responseAsJson = JSON.parse(response);
  const users = responseAsJson.users;

  const urlParams = new URLSearchParams(window.location.search);
  const userMail = urlParams.get("mail");
  const user = users.find((task) => task.userMail == userMail);
  const greetingText = document.getElementById(greetingTextSelector);

  greetingText.innerHTML = greetingMessage();

  if (userMail == null || userMail == "null") {
    userName = "";

    const formatedGreeting = greetingText.innerText.replace(",", "");
    greetingText.innerHTML = formatedGreeting;
  } else {
    const userName = user.userName;
    const userNameDiv = document.getElementById(userNameSelector);
    userNameDiv.innerHTML = `${userName}`;
  }
}

/**
 * Generates a greeting message based on the current time of day.
 * @returns {string} - The generated greeting message.
 */
function greetingMessage() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greetingMessage = "";

  if (currentHour < 12) {
    greetingMessage = "Good morning,";
  } else if (currentHour < 18) {
    greetingMessage = "Hello,";
  } else {
    greetingMessage = "Good evening,";
  }
  return greetingMessage;
}

/**
 * Executes when the DOM content is fully loaded. It initializes the animation modal based on certain conditions.
 */
document.addEventListener("DOMContentLoaded", function () {
  const animationModal = document.querySelector(".animation_modal");
  const screenWidth = window.innerWidth;
  const referringPage = document.referrer.toLowerCase();

  if (referringPage.includes("index.html") && screenWidth <= 1350) {
    animationModal.classList.add("show");

    setTimeout(function () {
      animationModal.classList.remove("show");

      setTimeout(function () {
        animationModal.style.display = "none";
      }, 500);
    }, 2000);
  } else {
    animationModal.style.display = "none";
  }
});
