const createListBtn = function (listName) {
    const listBtn = document.createElement("button");
    listBtn.classList.add(".list-btn");
    listBtn.textContent = listName;
    
    const sidebarBtns = document.querySelector(".other-sidebar-btns");
    sidebarBtns.appendChild(listBtn);

    // add event listener to call stored items from local storage and display them
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
        createListBtn(newListName);

        newListDialog.close();
        newListForm.reset();
    });
};

export { newListProcessor };