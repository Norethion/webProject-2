let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    tasks.push({ text: taskText, status: 'ongoing' });
    taskInput.value = '';
    displayTasks();
  }
  const clearButton = document.getElementById('clearButton');
  clearButton.classList.toggle('btn-danger', tasks.length > 0);
  updateTaskCount();
}

function displayTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = `
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input type="checkbox" onchange="toggleStatus(${index})" ${task.status === 'finished' ? 'checked' : ''}>
            </div>
          </div>
          <input type="text" class="form-control ${task.status === 'finished' ? 'finished' : ''}" value="${task.text}" readonly>
          <div class="input-group-append">
            <div class="btn-group">
              <div class="btn-group">
                <div class="btn-group dropleft">
                  <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    İşlemler
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" onclick="editTask(${index})"><i class="fas fa-edit"></i> Düzenle</a>
                    <a class="dropdown-item" href="#" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i> Sil</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    todoList.appendChild(taskElement);
  });
}

function toggleStatus(index) {
  tasks[index].status = tasks[index].status === 'ongoing' ? 'finished' : 'ongoing';
  displayTasks();
}

function editTask(index) {
  const editedTask = tasks[index].text;
  tasks.splice(index, 1);
  document.getElementById('taskInput').value = editedTask;
  displayTasks();
  updateTaskCount();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
  updateTaskCount();
}

function showAll() {
  updateTaskCount();
  displayTasks();
}

function showOngoing() {
  const ongoingTasks = tasks.filter(task => task.status === 'ongoing');
  const ongoingCountElement = document.getElementById('taskCount');
  ongoingCountElement.textContent = `Devam eden görev sayısı: ${ongoingTasks.length}`;
  displayFilteredTasks(ongoingTasks);
}

function showFinished() {
  const finishedTasks = tasks.filter(task => task.status === 'finished');
  const finishedCountElement = document.getElementById('taskCount');
  finishedCountElement.textContent = `Biten görev sayısı: ${finishedTasks.length}`;
  displayFilteredTasks(finishedTasks);
}

function displayFilteredTasks(filteredTasks) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = `
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input type="checkbox" onchange="toggleStatus(${index})" ${task.status === 'finished' ? 'checked' : ''}>
            </div>
          </div>
          <input type="text" class="form-control ${task.status === 'finished' ? 'finished' : ''}" value="${task.text}" readonly>
          <div class="input-group-append">
            <div class="btn-group">
              <div class="btn-group">
                <div class="btn-group dropleft">
                  <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    İşlemler
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" onclick="editTask(${index})"><i class="fas fa-edit"></i> Düzenle</a>
                    <a class="dropdown-item" href="#" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i> Sil</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    todoList.appendChild(taskElement);
  });
}

function updateTaskCount() {
  const taskCountElement = document.getElementById('taskCount');
  taskCountElement.textContent = `Toplam görev sayısı: ${tasks.length}`;
}
function clearAll() {
  tasks = [];
  const clearButton = document.getElementById('clearButton');
  clearButton.classList.toggle('btn-danger', tasks.length > 0);
  clearButton.classList.toggle('btn-secondary', tasks.length == 0);
  displayTasks();
  updateTaskCount();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
