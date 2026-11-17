# Life Tracker v2.1 Secure

মোবাইল-ফার্স্ট ব্যক্তিগত জীবন ব্যবস্থাপনা অ্যাপ।

## ফিচার
- Daily tasks & habits
- Honours, English and skill study sessions
- Five daily prayer checkboxes
- Sleep, water, exercise and mood log
- BDT income/expense tracker and budget
- 6 day day-shift + 6 day night-shift cycle
- Goals, career checklist and monthly report
- Encrypted backup/restore and finance CSV export
- PWA install + offline app shell

## GitHub Pages-এ প্রকাশ
1. আগে পুরোনো repository-র একটি backup নিন।
2. এই ZIP extract করুন।
3. GitHub repository-র root-এ `index.html`, `manifest.json`, `service-worker.js`, `icons/` upload করুন।
4. Settings > Pages-এ `main` branch এবং `/ (root)` নির্বাচন করুন।
5. প্রকাশিত URL Chrome-এ খুলে Add to Home Screen করুন।

## গুরুত্বপূর্ণ
- v2 ডেটা `life_tracker_v2_data` নামে আলাদা browser storage-এ রাখে; আগের app-এর localStorage key মুছে না।
- ডেটা এই ফোন/ব্রাউজারেই থাকে; স্বয়ংক্রিয় cloud sync নেই।
- নিয়মিত Settings থেকে Encrypted Backup নিন; Backup password ভুলবেন না।
- Notification অনুমতি দিলে অ্যাপ খোলা থাকা অবস্থায় নির্দিষ্ট reminder check করতে পারে। অ্যাপ বন্ধ থাকলে নির্ভরযোগ্য background push notification এই static version-এ নেই।
- শিফট ক্যালেন্ডারের প্রথম দিনের তারিখ আপনার প্রকৃত roster অনুযায়ী সেট করুন।
- Prayer tracker কেবল সম্পন্ন/অসম্পন্ন চিহ্নিত করে; নামাজের ওয়াক্তের সময় গণনা করে না।


## Privacy & Security (v2.1 Secure)
- App access is protected by a 6-digit PIN.
- App data is encrypted in browser storage using AES-GCM 256-bit encryption.
- PIN-derived encryption key uses PBKDF2-SHA-256 with a random salt and 310,000 iterations.
- Full backups are separately encrypted; use a strong backup password of at least 10 characters.
- Keep the backup password safe. There is no password reset or recovery service.
- Finance CSV exports are plain text and are NOT encrypted. Protect or delete them after use.
- Data remains on this browser/device unless you manually export a backup. Clearing browser data can erase the vault.
- This is client-side protection, not protection against a compromised/unlocked phone, malicious browser extensions, or someone who knows your PIN/password.
- The old plain JSON backup format is not accepted by the encrypted restore feature.


## Privacy protections
- The app does not request camera, microphone, geolocation, contacts, or Bluetooth permissions.
- The browser Permissions-Policy explicitly disables camera, microphone, geolocation, USB, Bluetooth, MIDI, and payment APIs.
- The only file picker is the user-initiated JSON backup restore control; it reads only the file the user selects.
- No analytics, advertising, or third-party tracking code is included.
- The service worker handles same-origin requests only and does not proxy/cache third-party requests.
- Personal tracker data is stored in this browser's local storage as encrypted data.

These protections reduce access but are not a guarantee against a compromised phone/browser, malicious browser extensions, or future changes to the published source.


## v2.2 Premium UI
- Day / Night / System theme
- বাংলা / English core navigation language preference
- Accent color, compact/comfortable density, adjustable font size
- Preferences are stored in the encrypted local app database

Note: English mode translates core navigation and selected headings; user-entered content and every form label may remain Bengali in this release.
