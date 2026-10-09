import { createTask, togglePriority } from "./createTodo.js";
import { display } from "./display.js";
// import { saveTodoList } from "./storage.js";
import { saveMasterLists, loadMasterLists, saveActiveListName, loadActiveListName } from "./storage.js";

let allLists = loadMasterLists();
let currentListName = loadActiveListName();

// let tasks = JSON.parse(localStorage.getItem("todoList")) || [];
// let allLists = JSON.parse(localStorage.getItem("todoLists")) || { Default: [] };
// let currentListName = localStorage.getItem("activeListName") || "Default";

const getActiveTasks = () => allLists[currentListName] || [];

const saveCurrentState = () => {
    saveMasterLists(allLists);
};

const addNewTask = function (title, description, dueDate, priority) {
    const newTask = new createTask(title, description, dueDate, priority);

    if (!allLists[currentListName]) {
        allLists[currentListName] = [];
    }

    allLists[currentListName].push(newTask);

    // tasks.push(newTask);
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
    
        const taskDisplay = document.querySelector(".task-display");
        removeAllChildNodes(taskDisplay);
        
        // saveTodoList(tasks);
        // localStorage.setItem("todoLists", JSON.stringify(allLists));
        saveCurrentState();

        // display(tasks);
        display(getActiveTasks());
    
        newTaskDialog.close();
        document.querySelector(".new-task-form").reset();
    });
};

const updateActiveList = function (name) {
    currentListName = name;
    saveActiveListName(name);
};

const createNewListKey = function (name) {
    if (!allLists[name]) {
        allLists[name] = [];
        saveCurrentState();
    }
};

export { removeAllChildNodes, newTaskProcessor, getActiveTasks, updateActiveList, createNewListKey, saveCurrentState };