# Life Tracker v2.0

মোবাইল-ফার্স্ট ব্যক্তিগত জীবন ব্যবস্থাপনা অ্যাপ।

## ফিচার
- Daily tasks & habits
- Honours, English and skill study sessions
- Five daily prayer checkboxes
- Sleep, water, exercise and mood log
- BDT income/expense tracker and budget
- 6 day day-shift + 6 day night-shift cycle
- Goals, career checklist and monthly report
- JSON backup/restore and finance CSV export
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
- নিয়মিত Settings থেকে JSON backup নিন।
- Notification অনুমতি দিলে অ্যাপ খোলা থাকা অবস্থায় নির্দিষ্ট reminder check করতে পারে। অ্যাপ বন্ধ থাকলে নির্ভরযোগ্য background push notification এই static version-এ নেই।
- শিফট ক্যালেন্ডারের প্রথম দিনের তারিখ আপনার প্রকৃত roster অনুযায়ী সেট করুন।
- Prayer tracker কেবল সম্পন্ন/অসম্পন্ন চিহ্নিত করে; নামাজের ওয়াক্তের সময় গণনা করে না।
