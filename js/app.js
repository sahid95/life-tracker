// --- Firebase Config Setup ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

db.enablePersistence({ synchronizeTabs: true }).catch(err => {
  console.warn("Persistence note:", err.code);
});

// Global Application State
const appState = {
  user: null,
  tasks: [],
  waterIntake: 0,
  sleepHours: 0,
  studyHours: 0,
  prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false }
};

// Startup Setup
document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initNavigation();
  initAuthObserver();
  initTaskModule();
  initTrackers();
  renderMiniCalendar();
  registerServiceWorker();
});

// Update Date Time Clock
function initUI() {
  const dateElem = document.getElementById('current-datetime');

  function updateClock() {
    const now = new Date();
    dateElem.textContent = now.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }
  updateClock();
  setInterval(updateClock, 30000);
}

// Bottom Navigation Router
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.view-section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      sections.forEach(sec => sec.classList.remove('active'));
      const activeSection = document.getElementById(targetId);
      if (activeSection) activeSection.classList.add('active');
    });
  });
}

// Authenticate Session
function initAuthObserver() {
  auth.onAuthStateChanged(user => {
    if (user) {
      appState.user = user;
      loadUserData(user.uid);
    } else {
      auth.signInAnonymously().catch(err => console.error("Auth error:", err));
    }
  });
}

// Sync Firebase Data
function loadUserData(uid) {
  db.collection('users').doc(uid).collection('tasks').onSnapshot(snapshot => {
    appState.tasks = [];
    snapshot.forEach(doc => appState.tasks.push({ id: doc.id, ...doc.data() }));
    renderTasks();
    calculateDailyProgress();
  });

  db.collection('users').doc(uid).collection('trackers').doc('daily').onSnapshot(doc => {
    if (doc.exists) {
      const data = doc.data();
      appState.waterIntake = data.water || 0;
      appState.sleepHours = data.sleep || 0;
      appState.studyHours = data.study || 0;
      appState.prayers = data.prayers || appState.prayers;
      updateTrackerUI();
      calculateDailyProgress();
    }
  });
}

// Task Manager Logic
function initTaskModule() {
  const modal = document.getElementById('task-modal');
  const fab = document.getElementById('btn-fab-add');
  const closeBtn = document.getElementById('btn-close-modal');
  const form = document.getElementById('task-form');

  fab.addEventListener('click', () => modal.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const time = document.getElementById('task-time').value;
    const priority = document.getElementById('task-priority').value;

    if (!appState.user) return;

    db.collection('users').doc(appState.user.uid).collection('tasks').add({
      title, time, priority, completed: false, createdAt: new Date()
    }).then(() => {
      form.reset();
      modal.classList.add('hidden');
    });
  });
}

// Render Task Lists
function renderTasks() {
  const dashList = document.getElementById('dashboard-task-list');
  const fullList = document.getElementById('full-task-list');
  const badge = document.getElementById('task-badge-count');

  dashList.innerHTML = '';
  fullList.innerHTML = '';

  const pending = appState.tasks.filter(t => !t.completed);
  badge.textContent = `${pending.length} Remaining`;

  if (appState.tasks.length === 0) {
    dashList.innerHTML = '<li class="empty-state">No tasks for today. Tap '+' to create one!</li>';
    fullList.innerHTML = '<li class="empty-state">No tasks added yet.</li>';
    return;
  }

  appState.tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <div class="task-info">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask('${task.id}', ${task.completed})" />
        <span>${task.title} ${task.time ? '(' + task.time + ')' : ''}</span>
      </div>
      <button class="icon-btn" onclick="deleteTask('${task.id}')">
        <span class="material-symbols-rounded" style="color:var(--danger)">delete</span>
      </button>
    `;
    fullList.appendChild(li);
    if (!task.completed) {
      dashList.appendChild(li.cloneNode(true));
    }
  });
}

window.toggleTask = function(id, status) {
  if (!appState.user) return;
  db.collection('users').doc(appState.user.uid).collection('tasks').doc(id).update({
    completed: !status
  });
};

window.deleteTask = function(id) {
  if (!appState.user) return;
  db.collection('users').doc(appState.user.uid).collection('tasks').doc(id).delete();
};

// Health & Study Tracker Handlers
function initTrackers() {
  document.getElementById('btn-add-water').addEventListener('click', () => {
    appState.waterIntake += 250;
    saveTrackers();
  });

  document.getElementById('btn-save-sleep').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('input-sleep-hours').value);
    if (!isNaN(val)) {
      appState.sleepHours = val;
      saveTrackers();
    }
  });

  document.getElementById('btn-save-study').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('input-study-hours').value);
    if (!isNaN(val)) {
      appState.studyHours = val;
      saveTrackers();
    }
  });

  const checkboxes = document.querySelectorAll('#prayer-checklist input');
  checkboxes.forEach(box => {
    box.addEventListener('change', (e) => {
      const prayer = e.target.getAttribute('data-prayer');
      appState.prayers[prayer] = e.target.checked;
      saveTrackers();
    });
  });

  // Browser Notification Trigger
  document.getElementById('btn-toggle-notif')?.addEventListener('click', () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') alert('Notifications Enabled!');
      });
    }
  });
}

function saveTrackers() {
  if (!appState.user) return;
  db.collection('users').doc(appState.user.uid).collection('trackers').doc('daily').set({
    water: appState.waterIntake,
    sleep: appState.sleepHours,
    study: appState.studyHours,
    prayers: appState.prayers
  }, { merge: true });
}

function updateTrackerUI() {
  document.getElementById('dash-water-val').textContent = `${(appState.waterIntake / 1000).toFixed(1)} / 2.0 L`;
  document.getElementById('tracker-water-text').textContent = `${appState.waterIntake} / 2000 ml`;

  document.getElementById('dash-sleep-val').textContent = `${appState.sleepHours.toFixed(1)} hrs`;
  document.getElementById('dash-study-val').textContent = `${appState.studyHours.toFixed(1)} hrs`;

  const completedPrayers = Object.values(appState.prayers).filter(Boolean).length;
  document.getElementById('dash-prayer-val').textContent = `${completedPrayers} / 5`;

  Object.keys(appState.prayers).forEach(p => {
    const elem = document.querySelector(`[data-prayer="${p}"]`);
    if (elem) elem.checked = appState.prayers[p];
  });
}

// Calculate Overall Progress Bar Percentage
function calculateDailyProgress() {
  let totalPoints = 0;
  let earnedPoints = 0;

  // Task score (30%)
  if (appState.tasks.length > 0) {
    totalPoints += 30;
    const doneTasks = appState.tasks.filter(t => t.completed).length;
    earnedPoints += (doneTasks / appState.tasks.length) * 30;
  }

  // Water score (20%)
  totalPoints += 20;
  earnedPoints += Math.min(1, appState.waterIntake / 2000) * 20;

  // Prayer score (25%)
  totalPoints += 25;
  const prayerCount = Object.values(appState.prayers).filter(Boolean).length;
  earnedPoints += (prayerCount / 5) * 25;

  // Sleep score (25%)
  totalPoints += 25;
  earnedPoints += Math.min(1, appState.sleepHours / 7) * 25;

  const percent = Math.round((earnedPoints / totalPoints) * 100) || 0;
  document.getElementById('overall-progress-bar').style.width = `${percent}%`;
  document.getElementById('progress-percent-text').textContent = `${percent}% Completed Today`;
}

// Render Mini Calendar Grid
function renderMiniCalendar() {
  const calGrid = document.getElementById('calendar-days');
  if (!calGrid) return;
  calGrid.innerHTML = '';

  const today = new Date().getDate();
  for (let i = 1; i <= 31; i++) {
    const div = document.createElement('div');
    div.className = `day-cell ${i === today ? 'active' : ''}`;
    div.textContent = i;
    calGrid.appendChild(div);
  }
}

// Service Worker for PWA
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(err => console.warn(err));
  }
  }
