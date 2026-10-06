const saveTodoList = function (array) {
    localStorage.setItem("todoList", JSON.stringify(array));
}

export {saveTodoList};