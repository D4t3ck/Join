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
    }
];

function initBoard() {
    renderTasks();
}

function renderTasks() {
    tasks.forEach(task => {
        document.getElementById('toDo').innerHTML = generateCard(task);
    });
}

function generateCard(task) {
    return /*html*/`
        <div class="card">
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