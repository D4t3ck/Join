let tasks = [];
const prioSpans = document.querySelectorAll('.prio_category_span');

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
    const prio = null;
    const category = document.getElementById('select_category').value;
    const subtasks = null;
    const task = new Task(title, description, assignedTo, dueDate, prio, category, subtasks);
    tasks.push(task);
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