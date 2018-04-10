console.log('This is rainbows.js')

const months =[
  {month:1,days:31},
  {month:2,days:29},
  {month:3,days:31},
  {month:4,days:30},
  {month:5,days:31},
  {month:6,days:30},
  {month:7,days:31},
  {month:8,days:31},
  {month:9,days:30},
  {month:10,days:31},
  {month:11,days:30},
  {month:12,days:31},
]
const daysOftheWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
];

window.onload = function(){
  let currentData = new Date();
  let currentMonth = currentData.getMonth();
  let currentDay = currentData.getUTCDate();
  console.log(currentDay)
  let currentDaysAtMonth = months.filter(el=>el.month == currentMonth)[0]

   let element = document.getElementById('calendar-pole');
   for(let i=0; i<currentDaysAtMonth.days; i++){
     let newDiv = document.createElement("div");
     let info = document.createElement("p");
     info.innerHTML = i>6 ? i+1 : daysOftheWeek[i] + "," +parseInt(i+1,10);
     let typeDay = (i== currentDay-1) ? "calendar-day-today" : "calendar-day";
     newDiv.classList.add(typeDay);
     newDiv.id = i+1;
     newDiv.appendChild(info);
     element.appendChild(newDiv)
   }
};
