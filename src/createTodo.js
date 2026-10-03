const createTodo = function (title, description, dueDate, priority)  {
    const itemId = crypto.randomUUID();

    return {
        itemId,
        title,
        description,
        dueDate,
        priority
    };
};

export {createTodo};