// Get elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', getTasksFromStorage);

// Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', modifyTask);  // Handles both delete and complete

// Event listeners for filtering
document.getElementById('all-tasks').addEventListener('click', () => filterTasks('all'));
document.getElementById('completed-tasks').addEventListener('click', () => filterTasks('completed'));
document.getElementById('incomplete-tasks').addEventListener('click', () => filterTasks('incomplete'));

// Add task
function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        createTaskElement(taskText, false);  // Create task UI as incomplete
        saveTaskToStorage(taskText);  // Save to localStorage
        taskInput.value = '';  // Clear input
    }
}

// Create a new task element and append it to the task list
function createTaskElement(taskText, completed = false) {
    const li = document.createElement('li');
    if (completed) {
        li.innerHTML = `<span class="completed">${taskText}</span>`; // Strikethrough for completed tasks
    } else {
        li.innerHTML = `${taskText}
            <span>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">❌</button>
            </span>`;
    }
    taskList.appendChild(li); // Append the task item to the list
}

// Save task to localStorage
function saveTaskToStorage(taskText) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage and display them
function getTasksFromStorage() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => {
        if (!task.completed) {  // Only create incomplete tasks
            createTaskElement(task.text, false);
        }
    });
}

// Mark task as complete or delete it
function modifyTask(e) {
    if (e.target.classList.contains('complete-btn')) {
        const task = e.target.parentElement.parentElement;
        const taskText = task.innerText.replace('✔', '').replace('❌', '').trim(); // Get the task text

        // Update task in localStorage
        updateTaskInStorage(taskText, true);
        
        // Remove the original task from the list
        task.remove();

        // Create a new element for the completed task
        createTaskElement(taskText, true); // Add to completed section (invisible to "All")
    } else if (e.target.classList.contains('delete-btn')) {
        const task = e.target.parentElement.parentElement;
        const taskText = task.innerText.replace('✔', '').replace('❌', '').trim(); // Get the task text
        task.remove(); // Remove from DOM
        deleteTaskFromStorage(taskText); // Remove from localStorage
    }
}

// Update task status in localStorage
function updateTaskInStorage(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(task => {
        if (task.text === taskText) task.completed = completed;
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks
function filterTasks(status) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task => {
        const isCompleted = task.querySelector('span.completed') !== null; // Check if the task is completed
        if (status === 'all') {
            task.style.display ='flex'; // Hide completed tasks in "All"
        } else if (status === 'completed' && isCompleted) {
            task.style.display = 'flex'; // Show only completed tasks
        } else if (status === 'incomplete' && !isCompleted) {
            task.style.display = 'flex'; // Show only incomplete tasks
        } else {
            task.style.display = 'none'; // Hide tasks that don’t match
        }
    });
}
