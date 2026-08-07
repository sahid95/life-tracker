function renderHabitScreen() {
  const habits = Storage.get(DB_KEYS.HABITS, [
    { id: '1', title: 'সকালে ব্যায়াম করা', streak: 3, doneToday: false },
    { id: '2', title: 'বই পড়া (২০ মিনিট)', streak: 5, doneToday: true }
  ]);

  const container = document.getElementById('app-content');
  container.innerHTML = `
    <div class="card">
      <h2>🔄 Daily Habits</h2>
      <div style="margin-top: 1rem;">
        ${habits.map(h => `
          <div class="task-item">
            <div>
              <strong>${h.title}</strong>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">🔥 Streak: ${h.streak} days</div>
            </div>
            <button class="btn-primary" style="background: ${h.doneToday ? '#10b981' : 'var(--accent)'};" onclick="toggleHabit('${h.id}')">
              ${h.doneToday ? 'Done' : 'Check-in'}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function toggleHabit(id) {
  let habits = Storage.get(DB_KEYS.HABITS, []);
  habits = habits.map(h => {
    if (h.id === id) {
      const doneToday = !h.doneToday;
      return { ...h, doneToday, streak: doneToday ? h.streak + 1 : h.streak - 1 };
    }
    return h;
  });
  Storage.set(DB_KEYS.HABITS, habits);
  renderHabitScreen();
    }
                
