// const saveTodoList = function (array) {
//     localStorage.setItem("todoList", JSON.stringify(array));
// }

// export { saveTodoList };

const saveMasterLists = function (allListsObject) {
    localStorage.setItem("todoListsCollection", JSON.stringify(allListsObject));
};

const loadMasterLists = function () {
    try {
        const data = localStorage.getItem("todoListsCollection");

        if (!data) {
            return { "Default List": [] };
        }

        return JSON.parse(data);
    } catch (error) {
        console.log("Error Occurred. Resetting Lists");
        return { "Default List": [] };
    }
};

const saveActiveListName = function (name) {
    localStorage.setItem("activeListName", name);
};

const loadActiveListName = function () {
    return localStorage.getItem("activeListName") || "Default List";
};

export { saveMasterLists, loadMasterLists, saveActiveListName, loadActiveListName };