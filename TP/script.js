
let activities = [];
let developers = [];

function addActivity() {
    const activityName = prompt("Ingrese el nombre de la nueva actividad:");
    if (activityName) {
        activities.push({ name: activityName, state: "Pendiente" });
        updateActivityList();
        createMatrix();
    }
}

function addDeveloper() {
    const developerName = prompt("Ingrese el nombre del nuevo desarrollador:");
    if (developerName) {
        developers.push(developerName);
        updateDeveloperList();
        createMatrix();
    }
}

function removeActivity(activityIndex) {
    activities.splice(activityIndex, 1);
    updateActivityList();
    createMatrix();
}

function removeDeveloper(developerIndex) {
    developers.splice(developerIndex, 1);
    updateDeveloperList();
    createMatrix();
}

function changeActivityState(activityIndex) {
    const activity = activities[activityIndex];
    const states = ["Pendiente", "En Proceso", "Finalizado"];
    const currentStateIndex = states.indexOf(activity.state);
    const newStateIndex = (currentStateIndex + 1) % states.length;
    activity.state = states[newStateIndex];
    updateActivityList();
    createMatrix();
}

function updateActivityList() {
    const activityList = document.getElementById("activity-list");
    activityList.innerHTML = "";
    for (const activity of activities) {
        const li = document.createElement("li");
        li.textContent = activity.name + " - Estado: ";
        
        const stateDescription = document.createElement("span");
        stateDescription.classList.add("state-description", `state-${activity.state.toLowerCase()}`);
        li.appendChild(stateDescription);

        const stateText = document.createElement("span");
        stateText.textContent = activity.state;
        li.appendChild(stateText);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Quitar";
        removeButton.onclick = function() {
            removeActivity(activities.indexOf(activity));
        };

        const stateButton = document.createElement("button");
        stateButton.textContent = "Cambiar Estado";
        stateButton.onclick = function() {
            changeActivityState(activities.indexOf(activity));
        };

        li.appendChild(removeButton);
        li.appendChild(stateButton);
        activityList.appendChild(li);
    }
}

function updateDeveloperList() {
    const developerList = document.getElementById("developer-list");
    developerList.innerHTML = "";
    for (const developer of developers) {
        const li = document.createElement("li");
        li.textContent = developer;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Quitar";
        removeButton.onclick = function() {
            removeDeveloper(developers.indexOf(developer));
        };
        li.appendChild(removeButton);
        developerList.appendChild(li);
    }
}

function createMatrix() {
    const matrixContainer = document.getElementById("responsibility-matrix");
    matrixContainer.innerHTML = "";

    const table = document.createElement("table");

    // Encabezado
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Desarrolladores</th><th>Actividades</th>";
    table.appendChild(headerRow);

    // Filas
    for (const developer of developers) {
        const developerRow = document.createElement("tr");

        const developerCell = document.createElement("td");
        developerCell.textContent = developer;
        developerRow.appendChild(developerCell);

        const activityCell = document.createElement("td");
        const selectActivity = document.createElement("select");
        selectActivity.id = `activity-select-${developers.indexOf(developer)}`;
        
        for (const activity of activities) {
            const option = document.createElement("option");
            option.value = activity.name;
            option.textContent = activity.name;
            selectActivity.appendChild(option);
        }

        activityCell.appendChild(selectActivity);
        developerRow.appendChild(activityCell);

        table.appendChild(developerRow);
    }

    matrixContainer.appendChild(table);
}

updateActivityList();
updateDeveloperList();
createMatrix();

