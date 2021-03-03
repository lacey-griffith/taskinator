

//empty array to hold task data objects
var tasks = [];

//variables to move tasks from three status columns
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

//access the main element holding the sections with task lists
var pageContentEl = document.querySelector("#page-content");

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
    
    //determining if the li item has a data task id, if a new task it will be false. 
    //if editing a task it will be true bc its been created, given an id and now being edited
    var isEdit = formEl.hasAttribute("data-task-id");

    //if has data attribue (data id) call function to complete the edit
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attritube (data id) so create object (task) as normal new task and pass to creatTask function
    else {
    //put info in as object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        }    
        
        //send as argument to createTaskEl
        createTaskEl(taskDataObj);
    }
}

var createTaskEl = function(taskDataObj) {
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

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    // place new li and it's info last in the tasksToDoEl ul
    tasksToDoEl.appendChild(listItemEl);
    //increase task counter for next unique id
    taskIdCounter++;

    
    //save data locally
    saveTasks()
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
}
var taskButtonHandler = function(event) {

    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (event.target.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    //delete button was clicked
    else if (event.target.matches(".delete-btn")) {
        //get elements task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function(taskId) {
    alert("deleting task #" + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //new array to hold updated list of tasks
    var updatedTaskArr = [];
    
    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        //if tasks[i].id doesn't match the value of taskId, keep that task and push to new array (leaving out deleted tasks[i].id's!
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks()
};

var editTask = function(taskId) {
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var completeEditTask = function(taskName, taskType, taskId) {
    //find matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task updated successfully!");

    //reset the form
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    //loop through tasks array and task object with new content
    for(var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    saveTasks()
};

var taskStatusChangeHandler = function(event) {
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get currently selected options value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find parent task item element based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    //update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks()
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
    //get task items from local storage
    tasks = localStorage.getItem("tasks")
        if (!tasks || tasks === null) {
            return false;
        }
    //convert tasks from string back to array of objects
    tasks = JSON.parse(tasks);

    //loop through a tasks array to create task elements on the page from it
    for (var i = 0; i < tasks.length; i++) {
        tasks.id = taskIdCounter
        console.log(tasks[i].id);

        //create list items from tasks list item array
        listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        listItemEl.setAttribute("data-task-id", tasks[i].id);

        //create task info from task list items array
        taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
        
        //append task info to task item
        listItemEl.appendChild(taskInfoEl)

        taskActionsEl = createTaskActions(tasks[i].id)
        listItemEl.appendChild(taskActionsEl);

            if (tasks[i].status === "to do") {
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 0
                tasksToDoEl.appendChild(listItemEl);
            }
            else if (tasks[i].status === "in progress") {
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 1
                tasksInProgressEl.appendChild(listItemEl);
            }
            else if (tasks[i].status === "completed") {
                listItemEl.querySelector("select[name='status-change']").selectedIndex = 2
                tasksCompletedEl.appendChild(listItemEl);
            }
        taskIdCounter++
        console.log(listItemEl);
    }
};

// when button is clicked, add new li element
formEl.addEventListener ("submit", taskFormHandler);
//event listener for adding button actions to main element
pageContentEl.addEventListener("click", taskButtonHandler);
//event listener to change status of task (to do, in progress or completed)
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks()