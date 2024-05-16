const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')

let tasks = [];

if(localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach((task) => renderTask(task));
}

chackEmptyList();

form.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
  
    const taskText = taskInput.value;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }; 
    tasks.push(newTask);

    saveToLocaleStorage();

   renderTask(newTask);
  
  taskInput.value = '';
  taskInput.focus();
  
  if(tasksList.children.length > 1) {
      emptyList.classList.add('none');
  }
  chackEmptyList();
}

tasksList.addEventListener('click', deleteTask);

function deleteTask(e) {
    if(e.target.dataset.action === 'delete') {
        const parentNode = e.target.closest('li');

        const id = Number(parentNode.id);

      const index = tasks.findIndex( (tasks) => tasks.id === id);

        tasks.splice(index, 1);

        saveToLocaleStorage();

        parentNode.remove();
    }

    if(tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
    chackEmptyList();
}

tasksList.addEventListener('click', doneTask);

function doneTask(e) {
   if(e.target.dataset.action === 'done') {
    const parentNode = e.target.closest('.list-group-item');
    
    const id = Number(parentNode.id);

    const task = tasks.find((task) => task.id === id);

    task.done = !task.done;

    saveToLocaleStorage();

    const taskTitle = parentNode.querySelector('span');
    console.log(taskTitle);
    taskTitle.classList.toggle('task-title--done');
   }
}

function chackEmptyList() {
    if(tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`;
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if(tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;

    }
}

function saveToLocaleStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {

    const cssClass = task.done ? "task-title task-title--done" : "task-title"

    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
  </li>`
  
  tasksList.insertAdjacentHTML('beforeend', taskHTML);

}