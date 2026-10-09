import { createNewListKey, updateActiveList, removeAllChildNodes, getActiveTasks } from "./taskProcessor.js";
import { display } from "./display.js";

const createListBtn = function (listName) {
    const sidebarBtns = document.querySelector(".other-sidebar-btns");

    const listWrapper = document.createElement("div");
    listWrapper.classList.add("list-wrapper");
    listWrapper.setAttribute("data-list-name", listName);

    const listBtn = document.createElement("button");
    listBtn.type = "button";
    listBtn.classList.add("list-btn");
    listBtn.textContent = listName;
    
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.classList.add("list-remove-btn");
    removeBtn.textContent = "x";
    
    listWrapper.appendChild(listBtn);
    listWrapper.appendChild(removeBtn);
    sidebarBtns.appendChild(listWrapper);

    return listBtn;
};

const newListProcessor = function () {
    const newListDialog = document.querySelector(".new-list-dialog");
    const newListForm = document.querySelector(".new-list-form");
    const newListOkBtn = document.querySelector(".new-list-ok-btn");

    newListOkBtn.addEventListener("click", (e) => {
        const listName = document.querySelector(".list-name");
        const validityState = listName.validity;

        if (validityState.valueMissing) {
            listName.setCustomValidity("Type a name for your new list!");
            listName.reportValidity();
            return;
        }

        const newListName = listName.value;

        createNewListKey(newListName);

        const newBtn = createListBtn(newListName);

        updateActiveList(newListName);

        const taskDisplay = document.querySelector(".task-display");
        removeAllChildNodes(taskDisplay);
        display(getActiveTasks());

        document.querySelectorAll(".list-btn").forEach(btn => btn.classList.remove("active"));
        newBtn.classList.add("active");

        newListDialog.close();
        newListForm.reset();
    });
};

export { newListProcessor, createListBtn };