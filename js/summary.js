/**
 * Initializes the summary page by fetching data from the server and updating various statistics.
 * The function also calls the `greetingAnimation`, `getUserName`, and `getCurrentUser` functions.
 */
async function initSummary() {
  let response = await getItem("users"); // pull data from server
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
  greetingAnimation()
  // Rufe die Funktion `updateUpcomingDeadline` auf und übergebe das `tasks` Array.
  updateUpcomingDeadline(tasks);
}

/**
 * Finds the next upcoming task and updates the HTML element with the upcoming task's deadline.
 * @param {Array} tasks - An array containing task objects.
 */
function updateUpcomingDeadline(tasks) {
  // Initialize a variable to store the next upcoming task.
  let upcomingTask = null;

  // Iterate through each task in the `tasks` array.
  for (let i = 0; i < tasks.length; i++) {
    // Get the due date of the current task.
    let dueDate = new Date(tasks[i].dueDate);

    // Compare the due date of the current task with the current date.
    if (dueDate > new Date()) {
      // If the due date of the current task is later than the current date
      // and `upcomingTask` has not been set yet, set the current task as the next upcoming task.
      if (!upcomingTask || dueDate < new Date(upcomingTask.dueDate)) {
        upcomingTask = tasks[i];
      }
    }
  }

  // Check if an upcoming task has been found.
  if (upcomingTask) {
    // If an upcoming task has been found, update the HTML element with ID 'upcoming_deadline'.
    let upcomingDeadlineElement = document.getElementById("upcoming_deadline");

    // Extract the month name from the date.
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

    // Extract the day from the date.
    let day = upcomingTask.dueDate.split("-")[2];

    // Set the formatted date as the content of the HTML element.
    upcomingDeadlineElement.innerHTML = `${monthName} ${day}, ${new Date(
      upcomingTask.dueDate
    ).getFullYear()}`;
  }
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
 * Updates the greeting message on the page based on the time of day and the username.
 * @param {string} greetingTextSelector - The selector of the element displaying the greeting message.
 * @param {string} userNameSelector - The selector of the element displaying the username.
 */
async function updateGreetings(greetingTextSelector, userNameSelector) {
  const response = await getItem("users");
  const responseAsJson = JSON.parse(response);
  const users = responseAsJson.users;

  const urlParams = new URLSearchParams(window.location.search);
  const userMail = urlParams.get("mail");
  const user = users.find((task) => task.userMail == userMail);

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const greetingText = document.getElementById(greetingTextSelector);
  let greetingMessage = "";

  if (currentHour < 12) {
    greetingMessage = "Good morning,";
  } else if (currentHour < 18) {
    greetingMessage = "Hello,";
  } else {
    greetingMessage = "Good evening,";
  }

  greetingText.innerHTML = greetingMessage;

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
 * Executes when the DOM content is fully loaded. It initializes the animation modal based on certain conditions.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Select the animation modal element
  const animationModal = document.querySelector(".animation_modal");

  // Get the width of the screen
  const screenWidth = window.innerWidth;

  // Get the referring page URL and convert it to lowercase
  const referringPage = document.referrer.toLowerCase();

  // Check if the referring page is "index.html" and screen width is less than or equal to 1350px
  if (referringPage.includes("index.html") && screenWidth <= 1350) {
    // Add the "show" class to display the animation modal
    animationModal.classList.add("show");

    // Set a timeout to remove the "show" class after 2 seconds
    setTimeout(function () {
      // Remove the "show" class to hide the animation modal
      animationModal.classList.remove("show");

      // Set another timeout to change the display property to "none" after the animation duration
      setTimeout(function () {
        animationModal.style.display = "none";
      }, 500); // Animation duration
    }, 2000); // Delay before hiding the modal
  } else {
    // If conditions are not met, hide the animation modal
    animationModal.style.display = "none";
  }
});
