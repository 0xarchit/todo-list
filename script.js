let todoList = [];

function renderTodoList() {
  const todoListHTML = todoList.map((todo, index) => {
    return `
      <li class="todo-item" data-index="${index}">
        <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
        <button class="delete-btn">
          <i class="fas fa-trash-alt"></i>
        </button>
      </li>
    `;
  }).join('');

  document.getElementById('todo-list').innerHTML = todoListHTML;
}

function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value.trim();

  if (todoText) {
    todoList.push({ text: todoText, completed: false });
    todoInput.value = '';
    renderTodoList();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('add-todo-btn').addEventListener('click', addTodo);
  document.getElementById('todo-input').addEventListener('keypress', handleKeyPress);
  document.getElementById('todo-list').addEventListener('click', handleTodoListClick);
  renderTodoList();
});

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

function handleTodoListClick(event) {
  const target = event.target.closest('.delete-btn, .checkbox');
  if (target.classList.contains('delete-btn')) {
    deleteTodo(target);
  } else if (target.classList.contains('checkbox')) {
    toggleCompleted(target);
  }
}

function deleteTodo(deleteButton) {
  const todoItem = deleteButton.closest('.todo-item');
  const todoIndex = parseInt(todoItem.getAttribute('data-index'));
  todoList.splice(todoIndex, 1);
  renderTodoList();
}

function toggleCompleted(checkbox) {
  const todoIndex = checkbox.closest('.todo-item').getAttribute('data-index');
  todoList[todoIndex].completed = !todoList[todoIndex].completed;
  renderTodoList();
}