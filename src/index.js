import "./styles.css";
import { loadMasterLists, loadActiveListName } from "./storage.js";
import { newTaskProcessor, getActiveTasks, updateActiveList, removeAllChildNodes } from "./taskProcessor.js";
import { newListProcessor, createListBtn } from "./listProcessor.js";
import { display } from "./display.js";
import { listSwitcher } from "./listSwitcher.js";

const toDoBrain = (function () {
    newTaskProcessor();
    newListProcessor();
    listSwitcher();

    const allLists = loadMasterLists();
    const activeListName = loadActiveListName();

    Object.keys(allLists).forEach((listName) => {
        if (listName !== "Default List") {
            createListBtn(listName);
        }
    });

    const allButtons = document.querySelectorAll(".list-btn");
    allButtons.forEach((btn) => {
        if (btn.textContent === activeListName) {
            btn.classList.add("active");
        }
    });

    updateActiveList(activeListName);
    const taskDisplay = document.querySelector(".task-display");
    removeAllChildNodes(taskDisplay);

    display(getActiveTasks());
})();