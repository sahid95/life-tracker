const DB_KEYS = {
  TASKS: 'lt_tasks',
  HABITS: 'lt_habits',
  PRAYERS: 'lt_prayers',
  WATER: 'lt_water',
  SETTINGS: 'lt_settings'
};

const Storage = {
  get(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getTasks() { return this.get(DB_KEYS.TASKS, []); },
  
  addTask(task) {
    const tasks = this.getTasks();
    const newTask = {
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
      ...task
    };
    tasks.push(newTask);
    this.set(DB_KEYS.TASKS, tasks);
    return newTask;
  },

  toggleTask(id) {
    const tasks = this.getTasks().map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.set(DB_KEYS.TASKS, tasks);
  },

  deleteTask(id) {
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.set(DB_KEYS.TASKS, tasks);
  }
};
  
