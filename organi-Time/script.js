const projects = ["Proyecto A", "Proyecto B", "Proyecto C"];
const employees = ["Desarrollador 1", "Desarrollador 2", "Desarrollador 3"];

const matrixContainer = document.getElementById("responsibility-matrix");

function createMatrix() {
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  headerRow.innerHTML = "<th></th>";

  for (const employee of employees) {
    const th = document.createElement("th");
    th.textContent = employee;
    headerRow.appendChild(th);
  }

  table.appendChild(headerRow);

  for (const project of projects) {
    const row = document.createElement("tr");
    const projectCell = document.createElement("td");
    projectCell.textContent = project;
    row.appendChild(projectCell);

    for (const _ of employees) {
      const td = document.createElement("td");
      const selectEmployee = document.createElement("select");
      const selectStatus = document.createElement("select");

      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "-";
      selectEmployee.appendChild(emptyOption);

      for (const emp of employees) {
        const employeeOption = document.createElement("option");
        employeeOption.value = emp;
        employeeOption.textContent = emp;
        selectEmployee.appendChild(employeeOption);
      }

      const statusOptions = ["En Progreso", "Completado", "Pendiente"];

      for (const status of statusOptions) {
        const statusOption = document.createElement("option");
        statusOption.value = status;
        statusOption.textContent = status;
        selectStatus.appendChild(statusOption);
      }

      td.appendChild(selectEmployee);
      td.appendChild(selectStatus);
      row.appendChild(td);
    }

    table.appendChild(row);
  }

  matrixContainer.appendChild(table);
}

function loadDataFromLocalStorage() {
  const data = localStorage.getItem("responsibilityMatrixData");
  if (data) {
    const parsedData = JSON.parse(data);
    for (let i = 0; i < projects.length; i++) {
      const projectRow = matrixContainer.rows[i + 1];
      const projectData = parsedData[i];

      for (let j = 0; j < employees.length; j++) {
        const employeeCell = projectRow.cells[j + 1];
        const statusCell = projectRow.cells[j + employees.length + 1];

        const employeeSelect = employeeCell.querySelector("select");
        const statusSelect = statusCell.querySelector("select");

        employeeSelect.value = projectData.employee[j];
        statusSelect.value = projectData.status[j];
      }
    }
  }
}

function saveDataToLocalStorage() {
  const data = [];

  for (let i = 0; i < projects.length; i++) {
    const projectRow = matrixContainer.rows[i + 1];
    const projectData = {
      project: projectRow.cells[0].textContent,
      employee: [],
      status: [],
    };

    for (let j = 0; j < employees.length; j++) {
      const employeeCell = projectRow.cells[j + 1];
      const statusCell = projectRow.cells[j + employees.length + 1];

      const selectedEmployee = employeeCell.querySelector("select").value;
      const selectedStatus = statusCell.querySelector("select").value;

      projectData.employee.push(selectedEmployee);
      projectData.status.push(selectedStatus);
    }

    data.push(projectData);
  }

  localStorage.setItem("responsibilityMatrixData", JSON.stringify(data));
}

createMatrix();
loadDataFromLocalStorage();


// Agregar Desarrollador
document.getElementById("add-developer").addEventListener("click", () => {
    const newDeveloper = prompt("Ingrese el nombre del nuevo desarrollador:");
    if (newDeveloper) {
      employees.push(newDeveloper);
      updateMatrix();
    }
  });
  
  // Quitar Desarrollador
  document.getElementById("remove-developer").addEventListener("click", () => {
    const developerToRemove = prompt("Ingrese el nombre del desarrollador a quitar:");
    const indexToRemove = employees.indexOf(developerToRemove);
    if (indexToRemove !== -1) {
      employees.splice(indexToRemove, 1);
      updateMatrix();
    } else {
      alert("Desarrollador no encontrado.");
    }
  });
  
  // ...
  
  function updateMatrix() {
    // Limpiar la matriz actual
    matrixContainer.innerHTML = "";
  
    // Volver a crear la matriz con los nuevos datos
    createMatrix();
    loadDataFromLocalStorage();
  }
  
  // Agregar Nuevo Proyecto
document.getElementById("add-project").addEventListener("click", () => {
    const newProject = prompt("Ingrese el nombre del nuevo proyecto:");
    if (newProject) {
      projects.push(newProject);
      updateMatrix();
    }
  });

  function updateMatrix() {
    // Limpiar la matriz actual
    matrixContainer.innerHTML = "";
  
    // Actualizar proyectos y empleados en la interfaz
    updateProjectsInUI();
    updateEmployeesInUI();
  
    // Volver a crear la matriz con los nuevos datos
    createMatrix();
    loadDataFromLocalStorage();
  }
  
  function updateProjectsInUI() {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = ""; // Limpiar la lista actual
  
    for (const project of projects) {
      const li = document.createElement("li");
      li.textContent = project;
      projectsList.appendChild(li);
    }
  }
  
  function updateEmployeesInUI() {
    const employeesList = document.getElementById("employees-list");
    employeesList.innerHTML = ""; // Limpiar la lista actual
  
    for (const employee of employees) {
      const li = document.createElement("li");
      li.textContent = employee;
      employeesList.appendChild(li);
    }
  }


  // Eliminar Proyecto
document.getElementById("remove-project").addEventListener("click", () => {
    const projectToRemove = prompt("Ingrese el nombre del proyecto a quitar:");
    const indexToRemove = projects.indexOf(projectToRemove);
    if (indexToRemove !== -1) {
      projects.splice(indexToRemove, 1);
      updateMatrix();
    } else {
      alert("Proyecto no encontrado.");
    }
  });
  
  
  // Llama a las funciones de actualización al cargar la página
  updateProjectsInUI();
  updateEmployeesInUI();
  
 
  
