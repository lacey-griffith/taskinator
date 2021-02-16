
// assign button element to object
var buttonEl = document.querySelector("#save-task");
//assign ul element to object
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    //create new li element
    var taskItemEl = document.createElement("li");
    //assign css to element
    taskItemEl.className = "task-item";
    // add what shows up in the list
    taskItemEl.textContent = "This is a new task!";
    // place new li last in the tasksToDoEl ul
    tasksToDoEl.appendChild(taskItemEl);
}

// when button is clicked, add new li element
buttonEl.addEventListener ("click", createTaskHandler);