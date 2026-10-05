import { removeAllChildNodes } from "./taskProcessor.js";

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
                <p class="task-priority" data-priority="${task.itemId}">${task.priority}</p>
            `;
            taskDisplay.appendChild(taskItem);

            const taskPriority = document.querySelector(".task-priority");
            taskPriority.addEventListener("click", (e) => {
                const toggle = e.target;
                const taskId = toggle.dataset.priority;
                const index = tasks.findIndex(task => task.id === taskId);

                tasks.at(index).togglePriority();
                tasks.forEach((task) => {
                    removeAllChildNodes(taskDisplay);
                });
                display(tasks);
            });
        });
    };
};

export {display};