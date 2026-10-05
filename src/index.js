import "./styles.css";
import { createTask } from "./createTodo.js";
import { tasks, newTaskProcessor } from "./taskProcessor.js";
import { display } from "./display.js";

const toDoBrain = (function () {

    newTaskProcessor();

    display(tasks);
})();