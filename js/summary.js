async function initSummary() {
    let response = await getItem('users'); // pull data from server
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

    console.log(tasks)


   


    getUserName();
    getCurrentUser();
// Rufe die Funktion `updateUpcomingDeadline` auf und übergebe das `tasks` Array.
updateUpcomingDeadline(tasks);
   
}

// Finde die nächste fällige Aufgabe und aktualisiere das HTML-Element mit der fälligen Aufgabe.
function updateUpcomingDeadline(tasks) {
    // Initialisiere eine Variable, um die nächste fällige Aufgabe zu speichern.
    let upcomingTask = null;

    // Durchlaufe jede Aufgabe im Array `tasks`.
    for (let i = 0; i < tasks.length; i++) {
        // Hole das fällige Datum der aktuellen Aufgabe.
        let dueDate = new Date(tasks[i].dueDate);

        // Vergleiche das fällige Datum der aktuellen Aufgabe mit dem aktuellen Datum.
        if (dueDate > new Date()) {
            // Wenn das fällige Datum der aktuellen Aufgabe später als das aktuelle Datum ist
            // und `upcomingTask` noch nicht gesetzt wurde, setze die aktuelle Aufgabe als die nächste fällige Aufgabe.
            if (!upcomingTask || dueDate < new Date(upcomingTask.dueDate)) {
                upcomingTask = tasks[i];
            }
        }
    }

    // Überprüfe, ob eine fällige Aufgabe gefunden wurde.
    if (upcomingTask) {
        // Wenn eine fällige Aufgabe gefunden wurde, aktualisiere das HTML-Element mit der ID 'upcoming_deadline'.
        let upcomingDeadlineElement = document.getElementById('upcoming_deadline');
        
        // Extrahiere den Monatsnamen aus dem Datum.
        let monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
        let monthIndex = upcomingTask.dueDate.split("-")[1] - 1; // Monatsindex beginnt bei 0
        let monthName = monthNames[monthIndex];
        
        // Extrahiere den Tag aus dem Datum.
        let day = upcomingTask.dueDate.split("-")[2];
        
        // Setze das formatierte Datum als Inhalt des HTML-Elements.
        upcomingDeadlineElement.innerHTML = `${monthName} ${day}, ${new Date(upcomingTask.dueDate).getFullYear()}`;
    }
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
   changeCurrentPage("board");
}

async function getUserName() {
    let response = await getItem('users');
    let responseAsJson = JSON.parse(response);
    let users = responseAsJson.users;

    const urlParams = new URLSearchParams(window.location.search);
    let userMail = urlParams.get('mail');
    let user = users.find(task => task.userMail == userMail); 

    let currentTime = new Date();
    let currentHour = currentTime.getHours();

    let greetingText = document.getElementById('greeting');
    let greetingMessage = '';

    if (currentHour < 12) {
        greetingMessage = 'Good morning,';
    } else if (currentHour < 18) {
        greetingMessage = 'Hello,';
    } else {
        greetingMessage = 'Good evening,';
    }

    greetingText.innerHTML = greetingMessage;

    if(userMail == null || userMail == 'null' ) {
        userName = '';
       
        let formatedGreeting = greetingText.innerText.replace(',','');
        greetingText.innerHTML = formatedGreeting;
    } else {

    let userName = user.userName;
    let userNameDiv = document.getElementById('user_name_greeting'); 
    userNameDiv.innerHTML = `${userName}`;
    }
}

