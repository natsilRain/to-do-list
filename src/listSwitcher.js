import { updateActiveList, removeAllChildNodes, getActiveTasks } from "./taskProcessor.js";
import { display } from "./display.js";

const listContainer = document.querySelector(".other-sidebar-btns");
const taskDisplay = document.querySelector(".task-display");

const listSwitcher = function () {
    listContainer.addEventListener("click", (e) => {
        const clickedButton = e.target.closest(".list-btn");
        if (!clickedButton) return;

        const listName = clickedButton.textContent;

        updateActiveList(listName);
        removeAllChildNodes(taskDisplay);

        display(getActiveTasks());

        document.querySelectorAll(".list-btn").forEach(btn => btn.classList.remove("active"));
        clickedButton.classList.add("active");
    });
};

export { listSwitcher };