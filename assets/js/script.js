
// assign form element to object
var formEl = document.querySelector("#task-form");
//assign ul element to object
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    //prevent browser from refreshing and clearing new task submitted
    event.preventDefault();

    //create new li element
    var listItemEl = document.createElement("li");
    //assign css to element
    listItemEl.className = "task-item";
    // add what shows up in the list
    listItemEl.textContent = "This is a new task!";
    // place new li last in the tasksToDoEl ul
    tasksToDoEl.appendChild(listItemEl);
}

// when button is clicked, add new li element
formEl.addEventListener ("submit", createTaskHandler);