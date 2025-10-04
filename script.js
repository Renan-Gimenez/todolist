const form = document.getElementById("form");
const input = document.getElementById("input");
const todosList = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos")) || [];


if(todos) {
  todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
    const todoText = todo?.text ?? input.value;
  if(todoText) {
    const todoEl = document.createElement('li');
    if(todo?.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerHTML = `
      <div class="todo-container">
        <span class="todo-text"></span>
        <button class="remove-btn">×</button>
      </div>
    `;

    todoEl.querySelector('.todo-text').innerText = todoText;

    const removeBtn = todoEl.querySelector('.remove-btn');
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      todoEl.remove();
      updateList();
    });

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateList();
    });
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateList();
    });
    todosList.appendChild(todoEl);
    input.value = '';
    updateList();
  }
}

function updateList() {
  const todosEl = todosList.querySelectorAll('li');
  const todos = [];
  todosEl.forEach(todoEl => {
    todos.push({
      text: todoTextEl?.innerText ?? '',
      completed: todoEl.classList.contains('completed')
    })
  });
  localStorage.setItem('todos', JSON.stringify(todos))
}