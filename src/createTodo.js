const createTask = function (title, description, dueDate, priority)  {
    const itemId = crypto.randomUUID();
    return {
        itemId,
        title,
        description,
        dueDate,
        priority,
        togglePriority
    };
};

const togglePriority = function (task) {
    if (task.priority === "urgent") {
        task.priority  = "important";
    } else if (task.priority  === "important") {
        task.priority  = "casual";
    } else {
        task.priority  = "urgent";
    }
};

export { createTask, togglePriority };