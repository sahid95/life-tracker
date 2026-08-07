function renderTaskScreen() {
  const container = document.getElementById('app-content');
  const tasks = Storage.getTasks();

  container.innerHTML = `
    <div class="card">
      <h2>✅ Task Manager</h2>
      <form id="add-task-form" class="task-form" style="margin-top: 1rem;">
        <input type="text" id="task-title" class="task-input" placeholder="নতুন টাস্ক লিখুন..." required />
        <button type="submit" class="btn-primary">যোগ করুন</button>
      </form>
      <ul class="task-list" id="task-list">
        ${tasks.map(task => `
          <li class="task-item ${task.completed ? 'completed' : ''}">
            <label style="display:flex; align-items:center; gap: 0.5rem; cursor:pointer;">
              <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus('${task.id}')">
              <span>${task.title}</span>
            </label>
            <button class="delete-btn" onclick="removeTask('${task.id}')">❌</button>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('task-title');
    if (input.value.trim()) {
      Storage.addTask({ title: input.value.trim() });
      renderTaskScreen();
    }
  });
}

function toggleTaskStatus(id) {
  Storage.toggleTask(id);
  renderTaskScreen();
}

function removeTask(id) {
  Storage.deleteTask(id);
  renderTaskScreen();
}

