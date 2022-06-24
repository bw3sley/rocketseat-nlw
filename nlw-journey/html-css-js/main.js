const formatter = (date) => {
    return {
        day: {
            number: dayjs(date).format("DD"),
            week: {
                short: dayjs(date).format("ddd"),
                long: dayjs(date).format("dddd")
            }
        },

        month: dayjs(date).format("MMMM"),
        hour: dayjs(date).format("HH:mm")
    }
}

const activity = {
    name: "Almoço",
    date: new Date("2024-07-08 10:00"),
    isFinished: true
}

let activities = [activity];

function createActivityItem(activity) {
    let input = `
        <input 
            type="checkbox" 
            onchange="finishActivity(event)"
            value="${activity.date}"
    `;

    if (activity.isFinished) {
        input += "checked";
    }

    input += ">";

    const formatted = formatter(activity.date);

    return `
        <div class="card-bg">
            ${input}

            <div>
                <img src="./assets/circle-check.svg" class="active" alt="" />

                <img src="./assets/circle-uncheck.svg" class="inactive" alt="" />

                <span>${activity.name}</span>
            </div>

            <time class="short" datetime="${activity.date}">
                ${formatted.day.week.short}.
                ${formatted.day.number} <br>
                ${formatted.hour}
            </time>

            <time class="full" datetime="${activity.date}">
                ${formatted.day.week.long}, 
                dia ${formatted.day.number}
                de ${formatted.month}
                 às ${formatted.hour}h 
            </time>
        </div>
    `;
}

function updateActivitiesList() {
    const section = document.querySelector("section");
    section.innerHTML = "";

    if (activities.length == 0) {
        return section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
    }

    for (let activity of activities) {
        section.innerHTML += createActivityItem(activity);
    }
}

updateActivitiesList();

function saveActivity(event) {
    event.preventDefault();

    const data = new FormData(event.target);
  
    const name = data.get('activity'), day = data.get('day'), hour = data.get('hour');
    const date = `${day} ${hour}`;
  
    const newActivity = {
        name,
        date,
        isFinished: false
    }
  
    const doesActivityExist = activities.find((activity) => activity.date == newActivity.date);
  
    if (doesActivityExist) {
      return alert('Dia/Hora não disponível');
    }
  
    activities = [newActivity, ...activities];

    updateActivitiesList();
}

function createDaysSelectOptions() {
    const days = ["2024-02-28", "2024-02-29", "2024-03-01", "2024-03-02", "2024-03-03"];
    
      let options = "";
    
      for(let day of days) {
        const formatted = formatter(day);
        const formattedDay = `${formatted.day.number} de ${formatted.month}`;
        
        options += `<option value="${day}">${formattedDay}</option>`;
      }
    
      document.querySelector(`select[name="day"]`).innerHTML = options;
}

createDaysSelectOptions();

function createHoursSelectOptions() {
    let options = "";

    for(let i = 6; i < 23; i++) {
      const hour = String(i).padStart(2, '0')
      
      options += `<option value="${hour}:00">${hour}:00</option>`;
      options += `<option value="${hour}:30">${hour}:30</option>`;
    }
  
    document.querySelector(`select[name="hour"]`).innerHTML = options;
}

createHoursSelectOptions();

function finishActivity(event) {
    const input = event.target;
    const dateInput = input.value;

    const activity = activities.find(activity => activity.date == dateInput);

    if (!activity) return

    activity.isFinished = !activity.isFinished;
}