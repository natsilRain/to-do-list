import { createTask, togglePriority } from "./createTodo.js";
import { display } from "./display.js";
import { saveTodoList } from "./storage.js";

let tasks = JSON.parse(localStorage.getItem("todoList")) || [];

const addNewTask = function (title, description, dueDate, priority) {
    const newTask = new createTask(title, description, dueDate, priority);

    tasks.push(newTask);
};

const removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};

const processNewTask = function () {
    const newTaskTitle = document.querySelector(".todo-title");
    const newTaskDescription = document.querySelector(".todo-desc");
    const newTaskDate = document.querySelector(".todo-date");
    const newTaskPriority = document.querySelector(`input[name="priority"]:checked`);

    const title = newTaskTitle.value;
    const description = newTaskDescription.value;
    const date = newTaskDate.value;
    const priority = newTaskPriority.value;

    addNewTask(title, description, date, priority);
};

const newTaskDialog = document.querySelector(".new-task-dialog");
const newTaskBtn = document.querySelector(".new-task-ok-btn");

const newTaskProcessor = function () {
    newTaskBtn.addEventListener("click", (e) => {
        const taskTitle = document.querySelector(".todo-title");
        const validityState = taskTitle.validity;

        if (validityState.valueMissing) {
            taskTitle.setCustomValidity("Add a title to your todo!");
            taskTitle.reportValidity();
            return;
        }

        processNewTask();
    
        if (tasks !== undefined) {
            const taskDisplay = document.querySelector(".task-display");
            removeAllChildNodes(taskDisplay);
        };
        
        saveTodoList(tasks);
        display(tasks);
    
        newTaskDialog.close();
    
        document.querySelector(".new-task-form").reset();
    });
};

export {tasks, removeAllChildNodes, newTaskProcessor};