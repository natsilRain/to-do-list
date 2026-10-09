import { updateActiveList, removeAllChildNodes, getActiveTasks, removeListKey } from "./taskProcessor.js";
import { display } from "./display.js";

const listContainer = document.querySelector(".other-sidebar-btns");
const taskDisplay = document.querySelector(".task-display");

const listSwitcher = function () {
    listContainer.addEventListener("click", (e) => {
        if (e.target.matches(".list-remove-btn")) {
            const wrapper = e.target.closest(".list-wrapper");
            const listName = wrapper.getAttribute("data-list-name");

            if (listName === "Default List") {
                alert("You cannot delete the Default List!");
                return;
            }

            removeListKey(listName);

            const isTargetActive = wrapper.querySelector(".list-btn").classList.contains("active");

            wrapper.remove();

            if (isTargetActive) {
                updateActiveList("Default List");
                removeAllChildNodes(taskDisplay);
                display(getActiveTasks());

                const defaultBtn = document.querySelector(".default-btn");
                defaultBtn.classList.add("active");
            }
        }

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