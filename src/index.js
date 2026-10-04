import "./styles.css";
import { createTask } from "./createTodo.js";
import { display } from "./display.js";

const toDoBrain = (function () {
    const tasks = [];

    const addNewTask = function (title, description, dueDate, priority) {
        const newTask = new createTask(title, description, dueDate, priority);
    
        tasks.push(newTask);
    }

    addNewTask("Testing Task", "bunch of words and stuff", "06/08/2026", "Urgent");
    addNewTask("Testing Task", "bunch of words and stuff", "06/08/2026", "Urgent");
    addNewTask("Testing Task", "bunch of words and stuff", "06/08/2026", "Urgent");
    addNewTask("Testing Task", "bunch of words and stuff", "06/08/2026", "Urgent");

    display(tasks);
})();