document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const allButton = document.getElementById('all-button');
    const pendingButton = document.getElementById('pending-button');
    const completedButton = document.getElementById('completed-button');
    const deleteAllButton = document.getElementById('delete-all-button');

    let todos = [];

    function renderTodos(filter = 'all') {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            if (filter === 'all' || filter === todo.status) {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${todo.task}</td>
                    <td>${todo.date}</td>
                    <td>${todo.status}</td>
                    <td class="actions">
                        <button class="edit-button">Edit</button>
                        <button class="do-button">${todo.status === 'Pending' ? 'Do' : 'Undo'}</button>
                        <button class="delete-button">Delete</button>
                    </td>
                `;

                row.querySelector('.edit-button').addEventListener('click', () => editTask(index));
                row.querySelector('.do-button').addEventListener('click', () => toggleStatus(index));
                row.querySelector('.delete-button').addEventListener('click', () => deleteTask(index));

                todoList.appendChild(row);
            }
        });
    }

    function addTask() {
        const task = taskInput.value.trim();
        const date = dateInput.value;
        if (task && date) {
            todos.push({ task, date, status: 'Pending' });
            taskInput.value = '';
            dateInput.value = '';
            renderTodos();
        }
    }

    function editTask(index) {
        const newTask = prompt('Edit task:', todos[index].task);
        const newDate = prompt('Edit date:', todos[index].date);
        if (newTask && newDate) {
            todos[index].task = newTask;
            todos[index].date = newDate;
            renderTodos();
        }
    }

    function toggleStatus(index) {
        todos[index].status = todos[index].status === 'Pending' ? 'Completed' : 'Pending';
        renderTodos();
    }

    function deleteTask(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function deleteAllTasks() {
        todos = [];
        renderTodos();
    }

    addButton.addEventListener('click', addTask);
    allButton.addEventListener('click', () => renderTodos('all'));
    pendingButton.addEventListener('click', () => renderTodos('Pending'));
    completedButton.addEventListener('click', () => renderTodos('Completed'));
    deleteAllButton.addEventListener('click', deleteAllTasks);

    renderTodos();
});