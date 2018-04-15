const daysNames = [
  "Понедельник",
  "Вторнник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
];

const events = [
  {
    id: 0,
    date: "9.4.2018",
    description: "Напиться",
    users: ["Дима Молодцов"]
  },
  {
    id: 1,
    date: "19.4.2018",
    description: "ДР!",
    users: ["Дима Молодцов"]
  }
];

window.onload = function() {
  let currentMonth = 3;
  let currentYear = 2018;

  showCalendar(currentMonth, currentYear, events);
  let nextButton = document.getElementById("toNextMonth");
  let prevButton = document.getElementById("toPrevMonth");
  nextButton.onclick = toNextMonth;
  prevButton.onclick = toPrevMonth;

  function toPrevMonth() {
    if (currentMonth == 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
    } else {
      currentMonth = currentMonth - 1;
    }
    showCalendar(Math.abs(currentMonth), currentYear, events);
  }

  function toNextMonth() {
    if (currentMonth == 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    } else {
      currentMonth = currentMonth + 1;
    }
    showCalendar(currentMonth, currentYear, events);
  }
};

function showCalendar(showedMonth, showedYear, events) {
  let lastDay = calendar(showedMonth, showedYear).last_date;
  let first_wday = calendar(showedMonth, showedYear).first_wday;
  let lastDayPrevMonth =
    calendar(showedMonth - 1, showedYear).last_date - first_wday + 1;
  let d = new Date();
  let today = d.getUTCDate();

  let element = document.getElementById("calendar-pole");
  let monthName = document.getElementById("month-name");
  monthName.innerHTML =
    calendar(showedMonth, showedYear).monthName + " " + showedYear;
  element.innerHTML = "";

  let eventsAtMonth = events.filter(
    el =>
      el.date.split(".")[2] == showedYear &&
      el.date.split(".")[1] == showedMonth + 1
  );

  for (let i = 0; i < lastDay + first_wday; i++) {
    let newDiv = document.createElement("div");
    let date = document.createElement("p");
    let info = document.createElement("p");
    let users = document.createElement("p");
    let now = new Date();

    date.innerHTML =
      i < first_wday
        ? (i < 7 && daysNames[i]) + ", " + parseInt(lastDayPrevMonth + i, 10)
        : (i < 7 && daysNames[i] + ", ") + (i - first_wday + 1);

    let typeDay = "calendar-day";
    for (let j = 0; j < eventsAtMonth.length; j++) {
      if (
        i ==
        parseInt(eventsAtMonth[j].date.split(".")[0], 10) + first_wday - 1
      ) {
        info.innerHTML = eventsAtMonth[j].description;
        users.innerHTML = eventsAtMonth[j].users;
        typeDay = "calendar-day-event";
      }
    }

    if (
      now.getUTCDate() + first_wday - 1 === i &&
      now.getUTCMonth() === showedMonth &&
      now.getFullYear() === showedYear
    ) {
      typeDay = "calendar-day-today";
    }

    newDiv.classList.add(typeDay);
    newDiv.id = i + 1;
    date.id = "date";
    info.id = "description";
    users.id = "users";
    newDiv.appendChild(date);
    newDiv.appendChild(info);
    newDiv.appendChild(users);
    element.appendChild(newDiv);
  }
}

function calendar(month, year) {
  let first_day = new Date(year, month, 1);
  let first_wday = first_day.getUTCDay();
  let oneHour = 1000 * 60 * 60;
  let oneDay = oneHour * 24;
  let nextMonth = new Date(year, month + 1, 1);
  let last_date = Math.ceil(
    (nextMonth.getTime() - first_day.getTime() - oneHour) / oneDay
  );
  let n = new Array(
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  );

  return {
    first_wday: first_wday,
    last_date: last_date,
    monthName: n[month % 12]
  };
}
