import "./styles.css";
import { createTask } from "./createTodo.js";
import { tasks, newTaskProcessor } from "./taskProcessor.js";
import { newListProcessor } from "./listProcessor.js";
import { display } from "./display.js";

const toDoBrain = (function () {

    newTaskProcessor();
    newListProcessor();

    display(tasks);
})();