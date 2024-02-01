let tasks = [];
let subTasks = [];
const prioSpans = document.querySelectorAll('.prio_category_span');
document.getElementById('clear_button').addEventListener('click', clear);
document.getElementById('date_input').min = new Date().toISOString().split("T")[0];

class Task {
    constructor(title, description, assignedTo, dueDate, prio, category, subtasks) {
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
    setActivePrio(1, 'medium');
}

function clear() {
    document.getElementById('title_input').value = '';
    document.getElementById('description_textarea').value = '';
    document.getElementById('date_input').value = '';
    document.getElementById('select_category').value = '';
    document.getElementById('subtask_content').innerHTML = '';
    subTasks = [];
}

function checkForm(event) {
    event.preventDefault();
    console.log('Form Checked!');
    getTaskData();
    console.log(tasks);
}

function getTaskData() {
    const title = document.getElementById('title_input').value;
    const description = document.getElementById('description_textarea').value;
    const assignedTo = null;
    const dueDate = document.getElementById('date_input').value;
    const prio = getPrio();
    const category = document.getElementById('select_category').value;
    const task = new Task(title, description, assignedTo, dueDate, prio, category, subTasks);
    tasks.push(task);
    clear();
}

function setActivePrio(index, prio) {
    removeActiveClass();
    prioSpans[index].classList.add(prio);
    document.getElementById(`prio_category_img${index}`).src = `./assets/img/add_task/${prio}_white.png`;
}

function removeActiveClass(index, prio) {
    prioSpans.forEach(prioSpan => {
        prioSpan.classList.remove('urgent');
        prioSpan.classList.remove('medium');
        prioSpan.classList.remove('low');
    });
    document.getElementById('prio_category_img0').src = './assets/img/add_task/urgent_color.png';
    document.getElementById('prio_category_img1').src = './assets/img/add_task/medium_color.png';
    document.getElementById('prio_category_img2').src = './assets/img/add_task/low_color.png';
}

function getPrio() {
    let value;
    for(let i = 0; i < prioSpans.length; i++) {
        for(let j = 0; j < prioSpans[i].classList.length; j++) {
            if(prioSpans[i].classList[j] == 'urgent' || prioSpans[i].classList[j] == 'medium' || prioSpans[i].classList[j] == 'low') {
                value = document.getElementById(`prio_headline${i}`).innerText.toLowerCase()
            } 
        }
    }
    return value;
}

function setSubTask() {
    const title = document.getElementById('input_subtask').value;
    if(title != '') {
        const task = new subTask(title, false);
        subTasks.push(task);
        document.getElementById('input_subtask').value = '';
        printSubTask(); 
    }
}

function printSubTask() {
    document.getElementById('subtask_content').innerHTML = '';
    subTasks.forEach(task => {
        document.getElementById('subtask_content').innerHTML += generateSubTask(task);
    });
}

function generateSubTask(task) {
    return /*html*/`
        <p><span><span>•</span>${task.title}</span></p>
    `;
}