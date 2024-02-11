async function initSummary() {
    let response = await getItem('users');
    let responseAsJson = JSON.parse(response);
    let tasks = responseAsJson.tasks;


    let tasksNumber = document.getElementById('summary_tasks_number');
    tasksNumber.innerHTML = `${tasks.length}`;

    let todos = tasks.filter(checkTodos);

    

    let todoNumber = document.getElementById('summary_todo_number');
    todoNumber.innerHTML = `${todos.length}`;

    let dones = tasks.filter(checkDone);
    let doneNumber = document.getElementById('summary_done_number');
    doneNumber.innerHTML = `${dones.length}`;

    let progress = tasks.filter(checkProgress);
    let progressNumber = document.getElementById('summary_progress_number');
    progressNumber.innerHTML = `${progress.length}`;

    let feedback = tasks.filter(checkFeedback);
    let feedbackNumber = document.getElementById('summary_feedback_number');
    feedbackNumber.innerHTML = `${feedback.length}`;

    let urgent = tasks.filter(checkUrgent);
    let urgentNumber = document.getElementById('summary_urgent_number');
    urgentNumber.innerHTML = `${urgent.length}`;

    console.log(dones)
    getUserName();
}

function checkTodos(todo) {
    return todo.categoryBoard == "toDo"
}

function checkDone(todo) {
    return todo.categoryBoard == "done"
}

function checkProgress(todo) {
    return todo.categoryBoard == "inProgress"
}

function checkFeedback(todo) {
    return todo.categoryBoard == "awaitFeedback"
}

function checkUrgent(todo) {
    return todo.prio == "urgent"
}

function goToBoard() {
    window.location.href = './board.html'; 
}


function getUserName() {
const urlParams = new URLSearchParams(window.location.search);
let userName = urlParams.get('name');

let userNameDiv = document.getElementById('user_name_greeting');
if(userName == null ) {
    userName = '';
    let greetingText = document.getElementById('greeting');

    let formatedGreeting = greetingText.innerText.replace(',','');
    greetingText.innerHTML = formatedGreeting;

}
userNameDiv.innerHTML = `${userName}`;

}