let tasks = [
    {
        categoryBoard: 'toDo',
        assignedTo: [
            'Florian',
            'Roman'
        ],
        category: "User Story",
        description: 'Die Milch nicht vergessen!',
        dueDate: '2024-02-08',
        prio: 'medium',
        subtasks: [
            {
                title: 'Brot kaufen',
                check: false
            },
            {
                title: 'Tanken fahren',
                check: false
            }
        ],
        title: 'Einkaufen gehen'
    },
    {
        categoryBoard: 'toDo',
        assignedTo: [
            'Kevin',
            'Roman'
        ],
        category: "User Story",
        description: 'Vorher aufwärmen',
        dueDate: '2024-02-08',
        prio: 'medium',
        subtasks: [
            {
                title: 'Creativ vorher nehmen',
                check: false
            },
            {
                title: 'Aufwärmen',
                check: false
            }
        ],
        title: 'Pumpem gehen'
    }
];

let currentDraggedName;
let currentIndex;

function initBoard() {
    renderTasks();
}

function renderTasks() {
    renderCategory();
    filterTasks('toDo');
    filterTasks('inProgress');
    filterTasks('awaitFeedback');
    filterTasks('done');
}

function renderCategory() {
    document.getElementById('category_section').innerHTML = generateCategorys();
}

function filterTasks(id) {
    const taskList = tasks.filter(todo => todo.categoryBoard == `${id}`);
    if(taskList.length != 0) {
        renderList(taskList, id);
    }
}

function renderList(list, id) {
    list.forEach((task, index) => {
        document.getElementById(`${id}`).innerHTML += generateCard(task);
    });
}

function startDragging(name) {
    currentDraggedName = name;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    const filtedTaskIndex = tasks.find((task, index) => {
        if(task.title == currentDraggedName) {
            currentIndex = index;
        }
    });
    tasks[currentIndex].categoryBoard = category;
    renderTasks();
}

function generateCard(task) {
    return /*html*/`
        <div class="card" draggable="true" ondragstart="startDragging('${task.title}')">
          <section class="card_headline">
            <span>${task.category}</span>
          </section>
          <section>
            <h2>${task.title}</h2>
          </section>
          <section class="card_description">${task.description}</section>
          <section class="card_subtasks">
            <progress id="subtask_progress" value="1" max="${task.subtasks.length}"></progress>
            <label for="subtask_progress">1/2 Subtasks</label>
          </section>
          <section>
            <div>
            </div>
            <div>
              <img src="./assets/img/add_task/medium_color.png">
            </div>
          </section>
        </div>
    `;
}

function generateCategorys() {
    return /*html*/`
        <div class="category">
          <div class="category_headline">
            <b>To do</b> <img src="./assets/img/board/plus.png" alt="create Task">
          </div>
          <div class="category_content" id="toDo" ondrop="moveTo('toDo')" ondragover="allowDrop(event)">
            
          </div>
        </div>
        <div class="category">
          <div class="category_headline">
            <b>In progress</b><img src="./assets/img/board/plus.png" alt="create Task">
          </div>
          <div class="category_content" id="inProgress" ondrop="moveTo('inProgress')" ondragover="allowDrop(event)">
            
          </div>
        </div>
        <div class="category">
          <div class="category_headline">
            <b>Await feedback</b> <img src="./assets/img/board/plus.png" alt="create Task">
          </div>
          <div class="category_content" id="awaitFeedback" ondrop="moveTo('awaitFeedback')" ondragover="allowDrop(event)">
          </div>
        </div>
        <div class="category">
          <div class="category_headline">
            <b>Done</b> <img src="./assets/img/board/plus.png" alt="create Task">
          </div>
          <div class="category_content" id="done" ondrop="moveTo('done')" ondragover="allowDrop(event)">
          </div>
        </div>
    `;
}