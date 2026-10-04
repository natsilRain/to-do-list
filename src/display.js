const display = function (tasks) {
    const taskDisplay = document.querySelector(".task-display");

    tasks.forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-list");

        taskItem.innerHTML = `
            <h3 class="title">${task.title}</h3>
            <p class="task-description">${task.description}</p>
            <p class="due-date">Due: ${task.dueDate}</p>
            <p class="task-priority" data-priority-btn="${task.itemId}">${task.priority}</p>
        `;
        taskDisplay.appendChild(taskItem);
    });
};

export {display};