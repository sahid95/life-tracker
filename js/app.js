// js/app.js (আপডেট করা কোড)
document.addEventListener('DOMContentLoaded', () => {
  // Theme Switching
  const themeBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // View Switcher Router
  const views = {
    dashboard: renderDashboard,
    task: renderTaskScreen,
    habit: renderHabitScreen,
    prayer: renderPrayerScreen,
    settings: renderSettingsScreen
  };

  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      document.getElementById('page-title').textContent = target.charAt(0).toUpperCase() + target.slice(1);
      
      if (views[target]) views[target]();
    });
  });

  // ডিফল্ট ড্যাশবোর্ড রেন্ডার
  renderDashboard();
});

function renderDashboard() {
  const tasks = Storage.getTasks();
  const completedTasks = tasks.filter(t => t.completed).length;
  
  document.getElementById('app-content').innerHTML = `
    <div class="card dashboard-card">
      <h2>👋 আজকের সারসংক্ষেপ</h2>
      <p style="margin-top: 10px; color: var(--text-secondary);">টাস্ক সম্পন্ন: <strong>${completedTasks}/${tasks.length}</strong></p>
    </div>
  `;
}

function renderSettingsScreen() {
  document.getElementById('app-content').innerHTML = `
    <div class="card">
      <h2>⚙️ Settings</h2>
      <p style="margin-top:10px;">এখান থেকে ডাটা ব্যাকআপ ও থিম কাস্টমাইজ করতে পারবেন।</p>
    </div>
  `;
                          }
