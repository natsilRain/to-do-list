import { removeAllChildNodes, getActiveTasks, saveCurrentState } from "./taskProcessor.js";
import { togglePriority } from "./createTodo.js";

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

                const activeTasks = getActiveTasks();
                const index = activeTasks.findIndex(task => task.itemId === taskId);

                if (index !== -1) {
                    togglePriority(activeTasks.at(index));
                    saveCurrentState();
                    removeAllChildNodes(taskDisplay);
                    display(activeTasks);
                }
            });

            const taskRemoveBtn = taskItem.querySelector(".task-remove-btn");
            taskRemoveBtn.addEventListener("click", (e) => {
                const button = e.currentTarget;
                const taskId = button.dataset.taskId;

                const activeTasks = getActiveTasks();
                const index = activeTasks.findIndex(task => task.itemId === taskId);

                if (index !== -1) {
                    activeTasks.splice(index, 1);
                    saveCurrentState();
                    removeAllChildNodes(taskDisplay);
                    display(activeTasks);
                }
            });
        });
    }
};

export { display };