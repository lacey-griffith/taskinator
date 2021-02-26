
//variable to keep count of tasks and apply unique id to each one
var taskIdCounter = 0;

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
    // prevent empty input from creating a list item
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    //clear the form for a new task
    formEl.reset();
    
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
    //add task id as custom attribute to new list items
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    //add taskInfoEl to listItemEl
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    // place new li and it's info last in the tasksToDoEl ul
    tasksToDoEl.appendChild(listItemEl);
    //increase task counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    //create new button element
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //create status dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices =["To Do", "In Progress", "Completed"];
        //for loop to create options lists for each new task
        for(var i = 0; i < statusChoices.length; i++) {
            //create option element
            var statusOptionEl = document.createElement("option");
            statusOptionEl.textContent = statusChoices[i];
            statusOptionEl.setAttribute("value", statusChoices[i]);
            //append to select
            statusSelectEl.appendChild(statusOptionEl);
        }
    return actionContainerEl;
};

// when button is clicked, add new li element
formEl.addEventListener ("submit", taskFormHandler);