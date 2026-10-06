import { removeAllChildNodes } from "./taskProcessor.js";
import { togglePriority } from "./createTodo.js";
import { saveTodoList } from "./storage.js";

const display = function (tasks) {
    const taskDisplay = document.querySelector(".task-display");

    if (tasks !== undefined) {
        tasks.forEach((task) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-list");
    
            taskItem.innerHTML = `
                <h3 class="title">${task.title}</h3>
                <p class="task-description">${task.description}</p>
                <p class="due-date">Due: ${task.dueDate}</p>
                <p class="task-priority" data-task-id="${task.itemId}">${task.priority}</p>
                <button type="button" class="task-remove-btn" data-task-id="${task.itemId}">-</button>
            `;

            taskDisplay.appendChild(taskItem);
            
            const taskPriority = taskItem.querySelector(".task-priority");
            taskPriority.addEventListener("click", (e) => {
                const toggle = e.currentTarget;
                const taskId = toggle.dataset.taskId;
                const index = tasks.findIndex(task => task.itemId === taskId);

                togglePriority(tasks.at(index));
                saveTodoList(tasks);
                removeAllChildNodes(taskDisplay);
                display(tasks);
            });

            const taskRemoveBtn = taskItem.querySelector(".task-remove-btn");
            taskRemoveBtn.addEventListener("click", (e) => {
                const button = e.currentTarget;
                const taskId = button.dataset.taskId;
                const index = tasks.findIndex(task => task.itemId === taskId);

                tasks.splice(index, 1);
                saveTodoList(tasks);
                removeAllChildNodes(taskDisplay);
                display(tasks);
            });
        });
    }
};

export {display};