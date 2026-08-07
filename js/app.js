/* ==========================================
   Life Tracker v1.0
   app.js - Part 1
========================================== */

// -----------------------------
// Variables
// -----------------------------

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const taskCount = document.getElementById("taskCount");
const doneCount = document.getElementById("doneCount");

let tasks = [];

// -----------------------------
// Greeting
// -----------------------------

function loadGreeting(){

const hour = new Date().getHours();

let greeting = "Good Evening 🌙";

if(hour < 12){

greeting = "Good Morning ☀️";

}

else if(hour < 18){

greeting = "Good Afternoon 🌤️";

}

document.getElementById("greeting").innerHTML = greeting;

}

// -----------------------------
// Today's Date
// -----------------------------

function loadDate(){

const today = new Date();

document.getElementById("todayDate").innerHTML =
today.toDateString();

}

// -----------------------------
// Load Tasks
// -----------------------------

function loadTasks(){

const saved = localStorage.getItem("lifeTasks");

if(saved){

tasks = JSON.parse(saved);

}

renderTasks();

}

// -----------------------------
// Save Tasks
// -----------------------------

function saveTasks(){

localStorage.setItem(
"lifeTasks",
JSON.stringify(tasks)
);

}

// -----------------------------
// Add Task
// -----------------------------

function addTask(){

const text = taskInput.value.trim();

if(text==""){

alert("Task লিখুন");

return;

}

tasks.push({

title:text,

done:false

});

taskInput.value="";

saveTasks();

renderTasks();

}

// -----------------------------
// Button Event
// -----------------------------

addTaskBtn.addEventListener(
"click",
addTask
);

// -----------------------------
// Enter Key
// -----------------------------

taskInput.addEventListener(

"keypress",

function(e){

if(e.key==="Enter"){

addTask();

}

}

);

// -----------------------------
// Start
// -----------------------------

loadGreeting();

loadDate();
/* ==========================================
   Part 2 - Render Tasks
========================================== */

function renderTasks() {

    taskList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {

        if (task.done) completed++;

        const li = document.createElement("li");

        if (task.done) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.title}</span>

            <div class="taskButtons">

                <button onclick="toggleTask(${index})">
                    ${task.done ? "↩️" : "✅"}
                </button>

                <button onclick="deleteTask(${index})">
                    🗑️
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateStats(completed);

}

/* ==========================================
   Complete Task
========================================== */

function toggleTask(index){

    tasks[index].done = !tasks[index].done;

    saveTasks();

    renderTasks();

}

/* ==========================================
   Delete Task
========================================== */

function deleteTask(index){

    if(confirm("এই Task মুছে ফেলতে চান?")){

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

    }

}

/* ==========================================
   Statistics
========================================== */

function updateStats(completed){

    taskCount.textContent = tasks.length;

    doneCount.textContent = completed;

    const percent =
        tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    progressFill.style.width = percent + "%";

    progressText.textContent = percent + "%";

}

/* ==========================================
   Daily Motivation Quotes
========================================== */

const quotes = [

"আজকের ছোট অগ্রগতি আগামীকালের বড় সফলতা।",

"শৃঙ্খলা প্রতিভার চেয়েও শক্তিশালী।",

"আজ যা করতে পারো, কাল পর্যন্ত অপেক্ষা করো না।",

"প্রতিদিন নিজেকে গতকালের চেয়ে একটু ভালো বানাও।",

"সফলতা একদিনে আসে না, প্রতিদিনের অভ্যাসে আসে।"

];

function loadQuote(){

    const random =
    Math.floor(Math.random() * quotes.length);

    document.getElementById("quote").textContent =
    quotes[random];

}

loadQuote();
/* ==========================================
   Part 3 - Water Tracker
========================================== */

let water = Number(localStorage.getItem("water")) || 0;

const waterCount = document.getElementById("waterCount");
const waterPlus = document.getElementById("waterPlus");
const waterMinus = document.getElementById("waterMinus");

function updateWater(){

    waterCount.textContent = water;

    localStorage.setItem("water", water);

}

if(waterPlus){

waterPlus.addEventListener("click",()=>{

    water++;

    updateWater();

});

}

if(waterMinus){

waterMinus.addEventListener("click",()=>{

    if(water>0){

        water--;

        updateWater();

    }

});

}

updateWater();


/* ==========================================
   Study Notes
========================================== */

const studyNote = document.getElementById("studyNote");

if(studyNote){

studyNote.value =
localStorage.getItem("studyNote") || "";

studyNote.addEventListener("input",()=>{

localStorage.setItem(

"studyNote",

studyNote.value

);

});

}


/* ==========================================
   Personal Notes
========================================== */

const noteBox = document.getElementById("noteBox");

if(noteBox){

noteBox.value =
localStorage.getItem("notes") || "";

noteBox.addEventListener("input",()=>{

localStorage.setItem(

"notes",

noteBox.value

);

});

}


/* ==========================================
   Sleep Time
========================================== */

const sleepTime =
document.getElementById("sleepTime");

if(sleepTime){

sleepTime.value =
localStorage.getItem("sleepTime") || "";

sleepTime.addEventListener("change",()=>{

localStorage.setItem(

"sleepTime",

sleepTime.value

);

});

}


/* ==========================================
   Prayer Tracker
========================================== */

const prayers =
document.querySelectorAll(".checkList input");

prayers.forEach((item,index)=>{

const key="prayer_"+index;

item.checked =
localStorage.getItem(key)==="true";

item.addEventListener("change",()=>{

localStorage.setItem(

key,

item.checked

);

});

});


/* ==========================================
   Floating Button
========================================== */

const floating =
document.getElementById("floatingAdd");

if(floating){

floating.addEventListener("click",()=>{

taskInput.focus();

});

}


/* ==========================================
   Reset Daily Water
========================================== */

function resetDailyWater(){

const today=new Date().toDateString();

const last=
localStorage.getItem("waterDate");

if(last!==today){

water=0;

updateWater();

localStorage.setItem("waterDate",today);

}

}

resetDailyWater();

loadTasks();
/* ==========================================
   Part 4 - Dashboard & Daily Progress
========================================== */

// Habit Counter
function updateHabitCount() {

    let habits = 0;

    document.querySelectorAll(".checkList input").forEach(item => {
        if (item.checked) habits++;
    });

    const habitCount = document.getElementById("habitCount");

    if (habitCount) {
        habitCount.textContent = habits;
    }

}

document.querySelectorAll(".checkList input").forEach(item => {

    item.addEventListener("change", () => {

        updateHabitCount();

        updateDashboard();

    });

});

updateHabitCount();


// Dashboard Progress

function updateDashboard(){

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(t => t.done).length;

    const prayers =
        document.querySelectorAll(".checkList input:checked").length;

    const waterScore =
        Math.min(water,8);

    let score =
        completedTasks +
        prayers +
        waterScore;

    let max =
        Math.max(totalTasks,1)+5+8;

    let percent =
        Math.round((score/max)*100);

    if(percent>100) percent=100;

    progressFill.style.width =
        percent+"%";

    progressText.textContent =
        percent+"%";

}

updateDashboard();


// Floating Button

const fab =
document.getElementById("floatingAdd");

if(fab){

fab.addEventListener("click",()=>{

taskInput.focus();

taskInput.scrollIntoView({

behavior:"smooth"

});

});

}


// Keyboard Shortcut

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

taskInput.value="";

}

});


// Welcome Message

function welcome(){

const hour=new Date().getHours();

let msg="আজকের দিনটি সুন্দর হোক ❤️";

if(hour<12){

msg="🌅 শুভ সকাল";

}

else if(hour<18){

msg="☀️ শুভ অপরাহ্ন";

}

else{

msg="🌙 শুভ সন্ধ্যা";

}

console.log(msg);

}

welcome();


// Console Logo

console.log("%c🌿 Life Tracker Started",
"color:#22c55e;font-size:20px;font-weight:bold;");
