const createTask = function (title, description, dueDate, priority)  {
    const itemId = crypto.randomUUID();

    const togglePriority = function () {
        if (this.priority === "urgent") {
            this.priority  = "important";
        } else if (this.priority  === "important") {
            this.priority  = "casual";
        } else {
            this.priority  = "urgent";
        }
    };

    return {
        itemId,
        title,
        description,
        dueDate,
        priority,
        togglePriority
    };
};

export {createTask};