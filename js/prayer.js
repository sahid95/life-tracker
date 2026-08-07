function renderPrayerScreen() {
  const todayKey = `prayer_${new Date().toISOString().split('T')[0]}`;
  const prayers = Storage.get(todayKey, {
    fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false
  });

  const prayerNames = {
    fajr: 'ফজর (Fajr)',
    dhuhr: 'যোহর (Dhuhr)',
    asr: 'আসর (Asr)',
    maghrib: 'মাগরিব (Maghrib)',
    isha: 'এশা (Isha)'
  };

  const completedCount = Object.values(prayers).filter(Boolean).length;
  const progressPercent = (completedCount / 5) * 100;

  document.getElementById('app-content').innerHTML = `
    <div class="card">
      <h2>🕌 Daily Prayer Tracker</h2>
      <div style="margin: 1rem 0; background: var(--border); height: 8px; border-radius: 4px; overflow: hidden;">
        <div style="background: #10b981; height: 100%; width: ${progressPercent}%; transition: width 0.3s;"></div>
      </div>
      <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
        আজকের অগ্রগতি: <strong>${completedCount}/5</strong>
      </p>

      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${Object.keys(prayerNames).map(key => `
          <label class="task-item" style="cursor: pointer; border: 1px solid var(--border); border-radius: 8px;">
            <span>${prayerNames[key]}</span>
            <input type="checkbox" ${prayers[key] ? 'checked' : ''} onchange="togglePrayer('${todayKey}', '${key}')" style="width: 18px; height: 18px;">
          </label>
        `).join('')}
      </div>
    </div>
  `;
}

function togglePrayer(storageKey, prayerKey) {
  const prayers = Storage.get(storageKey, { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false });
  prayers[prayerKey] = !prayers[prayerKey];
  Storage.set(storageKey, prayers);
  renderPrayerScreen();
          }

