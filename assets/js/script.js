
// assign form element to object
var formEl = document.querySelector("#task-form");
//assign ul element to object
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    //prevent browser from refreshing and clearing new task submitted
    event.preventDefault();
    //allowing user input as task name to be listed 
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //have the user selected selector type appear below the task name
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //put info in as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    //send as argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function (taskDataObj) {
    //create new li element
    var listItemEl = document.createElement("li");
    //assign css to element
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    //add taskInfoEl to listItemEl
    listItemEl.appendChild(taskInfoEl);

    // place new li and it's info last in the tasksToDoEl ul
    tasksToDoEl.appendChild(listItemEl);
}


// when button is clicked, add new li element
formEl.addEventListener ("submit", taskFormHandler);