import { removeAllChildNodes, getActiveTasks, saveCurrentState, updateTaskDetails } from "./taskProcessor.js";
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
                <button type="button" class="task-edit-btn" data-task-id="${task.itemId}">Edit</button>
                <button type="button" class="task-remove-btn" data-task-id="${task.itemId}">-</button>
            `;

            taskDisplay.appendChild(taskItem);

            const taskEditBtn = taskItem.querySelector(".task-edit-btn");
            taskEditBtn.addEventListener("click", () => {
                const editDialog = document.getElementById("edit-task");

                const editTitleInput = editDialog.querySelector(".edit-todo-title");
                const editDescInput = editDialog.querySelector(".edit-todo-desc");
                const editDateInput = editDialog.querySelector(".edit-todo-date");

                editTitleInput.value = task.title;
                editDescInput.value = task.description;
                editDateInput.value = task.dueDate;

                const saveBtn = editDialog.querySelector(".edit-task-ok-btn");

                const handleSave = () => {
                    const updatedTitle = editTitleInput.value.trim();

                    if (!updatedTitle) {
                        editTitleInput.setCustomValidity("Add a title to your todo!");
                        editTitleInput.reportValidity();
                        return;
                    } else {
                        editTitleInput.setCustomValidity("");
                    }

                    updateTaskDetails(task.itemId, {
                        title: updatedTitle,
                        description: editDescInput.value,
                        dueDate: editDateInput.value,
                        priority: task.priority
                    });

                    removeAllChildNodes(taskDisplay);
                    display(getActiveTasks());

                    editDialog.close();
                    saveBtn.removeEventListener("click", handleSave);
                };

                saveBtn.addEventListener("click", handleSave);

                editDialog.showModal();
            });
            
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