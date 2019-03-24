const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();
//load all event listener

function loadEventListeners() {
	// DOM load Event
	document.addEventListener('DOMContentLoaded',getTasks);
    //Add task Event
	form.addEventListener('submit',addTask);
	//Remove task Event
	taskList.addEventListener('click',removeTask);
	//clear task Event
	clearBtn.addEventListener('click',clearTask);
	//filter task event
	filter.addEventListener('keyup',filterTask);
}


function getTasks() {

	let tasks;
	if(localStorage.getItem('tasks') === 'null'){
		tasks = [];
	}
	else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

    tasks.forEach((task) => {
    	//create li element
    const createLi = document.createElement('li');
    //add Class
    createLi.className = 'collection-item';
    //create text node and append to li
    createLi.appendChild(document.createTextNode(task));
    
    //create new link element
    const link = document.createElement('a')
    //Add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    createLi.appendChild(link)
    taskList.appendChild(createLi);

    })
}


function addTask(e) {
    if(taskInput.value === '')
    {
    	alert('Add a task');
    	
   } else {
    //create li element
    const createLi = document.createElement('li');
    //add Class
    createLi.className = 'collection-item';
    //create text node and append to li
    createLi.appendChild(document.createTextNode(taskInput.value));
    
    //create new link element
    const link = document.createElement('a')
    //Add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    createLi.appendChild(link)
    taskList.appendChild(createLi);
    
    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

     //clear input
    taskInput.value = '';
}
	e.preventDefault();

}


//Store Task 

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') ===null){
    	tasks = []
    } else {
    	tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are you Sure?'))
		{
		e.target.parentElement.parentElement.remove();
		//remove from LS
		removeTaskFromLocalStorage(e.target.parentElement.parentElement)
		}
	}
}


//remove from Ls
function removeTaskFromLocalStorage(taskItem) {
	 let tasks;
    if(localStorage.getItem('tasks') ===null){
    	tasks = []
    } else {
    	tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task,index) => {
     if(taskItem.textContent === task) {
     	tasks.splice(index,1);
     }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//clear tasks
function clearTask(e) {

	// taskList.innerHTML = ''
	
	//faster
	    while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}

	clearTaskFromLocalStorage();
}

// Clear Tasks from LS 
function clearTaskFromLocalStorage(){
	localStorage.clear();
}



// filter Task 

function filterTask(e) {
	 const text = e.target.value.toLowerCase();
	 
	 document.querySelectorAll('.collection-item').forEach((task) => {
	 	const item = task.firstChild.textContent;
	 	if(item.toLowerCase().indexOf(text) != -1){
	 		task.style.display = 'block'
	 	}
	 	else {
	 		task.style.display = 'none';
	 	}
	 })
}






