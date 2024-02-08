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
        title: 'Pumpen gehen'
    }
];

let currentDraggedName;
let currentIndex;

function initBoard() {
    renderTasks();
    renderAddTask();
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
    tasks.forEach((task, index) => {
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

function showAddTask() {
    document.getElementById('add_task_popup').style.display = 'flex';
}

function closeAddTask() {
    document.getElementById('add_task_popup').style.display = 'none';
}

function renderAddTask() {
  document.getElementById('add_task_popup_content').innerHTML = generateAddTask();
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

function generateAddTask() {
  return /*html*/`
    <section class="header template" onclick="stopEvent(event)">
    <section class="add_task_content" onclick="closeDropdown()">

        <form onsubmit="checkForm(event); setAddTasksInTasks()">
            <div class="main_content">
                <h1 class="add_task_headline">Add Task</h1>
                <div class="form_content">
                    <div>
                        <label for="title_input">
                            <h2>Title<span class="required_char">*</span></h2>
                            <input required type="text" id="title_input" class="input" placeholder="Enter a title">
                        </label>
                        <label for="description_textarea">
                            <h2>Description</h2>
                            <textarea name="" id="description_textarea" cols="30" rows="4"
                                placeholder="Enter a Description" class="input"></textarea>
                        </label>
                        <label for="select_contact">
                            <h2>Assigned to</h2>
                            <div id="assigned_container" onclick="stopEvent(event)">
                                <select name="" id="select_contact" placeholder="test" class="select"
                                    onclick="renderInputAssigned()">
                                    <option value="" disabled selected>Select contacts to assign</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <div class="break_line"></div>
                    <div>
                        <label for="date_input">
                            <h2>Due date<span class="required_char">*</span></h2>
                            <input required type="text" placeholder="dd/mm/yyyy" id="date_input"
                                onfocus="(this.type='date')" class="input">
                        </label>
                        <label for="">
                            <h2>Prio</h2>
                            <div class="prio_category">
                                <span class="prio_category_span" onclick="setActivePrio(0, 'urgent')">
                                    <h2 id="prio_headline0">Urgent<span><img id="prio_category_img0"
                                                src="./assets/img/add_task/urgent_color.png"></span></h2>
                                </span>
                                <span class="prio_category_span" onclick="setActivePrio(1, 'medium')">
                                    <h2 id="prio_headline1">Medium<span><img id="prio_category_img1"
                                                src="./assets/img/add_task/medium_color.png"></span></h2>
                                </span>
                                <span class="prio_category_span" onclick="setActivePrio(2, 'low')">
                                    <h2 id="prio_headline2">Low<span><img id="prio_category_img2"
                                                src="./assets/img/add_task/low_color.png"></span></h2>
                                </span>
                            </div>
                        </label>
                        <label for="select_category">
                            <h2>Category<span class="required_char">*</span></h2>
                            <select name="" id="select_category" class="select" required>
                                <option value="" disabled selected>Select task category</option>
                                <option value="User Story">User Story</option>
                                <option value="Technical Task">Technical Task</option>
                            </select>
                        </label>
                        <label for="input_subtask">
                            <h2>Subtasks</h2>
                            <div class="subtask_input">
                                <input type="text" id="input_subtask" placeholder="Add new subtask" class="input">
                                <span onclick="setSubTask()"><button type="button">+</button></span>
                            </div>
                        </label>
                        <div id="subtask_content">

                        </div>
                    </div>
                </div>
                <section class="add_task_footer">
                    <div>
                        <p><span class="required_char">*</span>This field is required</p>
                    </div>
                    <div class="form_button_container">
                        <button class="form_button_clear" id="clear_button" onclick="clear()"><span>Clear</span> <img
                                src="./assets/img/add_task/clear.png" alt="clear button"></button>
                        <button class="form_button_create" type="submit"><span>Create Task</span> <img
                                src="./assets/img/add_task/check.png" alt="create task button"></button>
                    </div>
                </section>
                <div class="mobile_sidebar_container"></div>
            </div>
        </form>
        <div id="create_popup">
            <div class="create_card">
                <span>Task added to board</span>
                <img src="./assets/img/add_task/create_popup.png">
            </div>
        </div>
    </section>
</section>
  `;
}