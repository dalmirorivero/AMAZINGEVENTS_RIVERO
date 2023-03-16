// FETCH JSON DATA 

async function stats() {
  try {
    const response = await fetch("../assets/amazing.json");
    const data = await response.json();
    const events = data.events;
    // IMPRESION DEL RESULTADO: MAYOR ASISTENCIA
    const eventWithHighestAttendancePercentage = getEventWithHighestAttendancePercentage(events);
    document.getElementById("high").textContent = eventWithHighestAttendancePercentage.name;
    // IMPRESION DEL RESULTADO: MENOR ASISTENCIA
    const eventWithLowestAttendancePercentage = getEventWithLowestAttendancePercentage(events);
    document.getElementById("low").textContent = eventWithLowestAttendancePercentage.name;
    //IMPRESION DEL RESULTADO: MAYOR CAPACIDAD
    const eventWithLargerCapacity = getEventWithLargerCapacity(events);
    document.getElementById("larger").textContent = eventWithLargerCapacity.name;
    // DECLARAMOS VARIABLES DE EVENTOS PASADOS Y FUTUROS
    const pastEvents = events.filter(event => event.date <= data.currentDate);
    const upcomingEvents = events.filter(event => event.date >= data.currentDate);
    // DECLARAMOS VARIABLE
    const groupedPEvents = {};
    const groupedUEvents = {};
    // RECORREMOS LOS EVENTOS PASADOS Y LOS AGRUPAMOS POR CATEGORIAS
    pastEvents.forEach(event => {
      if (groupedPEvents[event.category]) {
        groupedPEvents[event.category].push(event);
      } else {
        groupedPEvents[event.category] = [event];
      }
    })
    // RECORREMOS LOS EVENTOS FUTUROS Y LOS AGRUPAMOS POR CATEGORIAS
    upcomingEvents.forEach(event => {
      if (groupedUEvents[event.category]) {
        groupedUEvents[event.category].push(event);
      } else {
        groupedUEvents[event.category] = [event];
      }
    })
    // CALCULAMOS GANANCIAS Y PORCENTAJE DE ASISTENCIA POR CATEGORIA
    Object.keys(groupedPEvents).forEach((category) => {
      const eventsP = groupedPEvents[category];

      let categoryRevenue = 0;
      let totalTicketsSold = 0;
      let totalTicketsAvailable = 0;

      eventsP.forEach(event => {
        categoryRevenue += event.assistance * event.price;
        totalTicketsSold += event.assistance;
        totalTicketsAvailable += event.capacity;
      });

      const attendancePercentage = (totalTicketsSold / totalTicketsAvailable) * 100;
      // MANIPULAMOS EL DOM PARA IMPRIMIR LOS RESULTADOS EN LA TABLA DEL HTML
      const categoryTable = document.querySelector("#category-table-past");

      const row = document.createElement("tr");
      const categoryCell = document.createElement("td");
      const revenueCell = document.createElement("td");
      const attendanceCell = document.createElement("td");

      categoryCell.textContent = category;
      revenueCell.textContent = `$${categoryRevenue.toFixed(0)}`;
      attendanceCell.textContent = `${attendancePercentage.toFixed(0)}%`;

      row.appendChild(categoryCell);
      row.appendChild(revenueCell);
      row.appendChild(attendanceCell);

      categoryTable.appendChild(row);

    });
    // CALCULAMOS GANANCIAS Y PORCENTAJE DE ASISTENCIA POR CATEGORIA
    Object.keys(groupedUEvents).forEach((category) => {
      const eventsU = groupedUEvents[category];

      let revenue = 0;
      let sold = 0;
      let avaible = 0;

      eventsU.forEach(event => {
        revenue += event.estimate * event.price;
        sold += event.estimate;
        avaible += event.capacity;
      });

      const upcomingStats = (sold / avaible) * 100;
      // MANIPULAMOS EL DOM PARA IMPRIMIR LOS RESULTADOS EN LA TABLA DEL HTML
      const upcomingTable = document.querySelector("#upcomingTable");

      const row = document.createElement("tr");
      const categoryCell = document.createElement("td");
      const revenueCell = document.createElement("td");
      const attendanceCell = document.createElement("td");

      categoryCell.textContent = category;
      revenueCell.textContent = `$${revenue.toFixed(0)}`;
      attendanceCell.textContent = `${upcomingStats.toFixed(0)}%`;

      row.appendChild(categoryCell);
      row.appendChild(revenueCell);
      row.appendChild(attendanceCell);

      upcomingTable.appendChild(row);
    })
  }
  catch (error) {
    console.log(error);
  }
};

stats();

// FUNCION PARA CALCULAR EL EVENTO CON MAYOR PORCENTAJE DE ASISTENCIA

function getEventWithHighestAttendancePercentage(events) {
  let maxPercentage = 0;
  let eventWithMaxAttendancePercentage = null;

  for (const event of events) {
    const percentage = (event.assistance / event.capacity) * 100;
    if (percentage > maxPercentage) {
      maxPercentage = percentage;
      eventWithMaxAttendancePercentage = event;
    }
  }
  return eventWithMaxAttendancePercentage;
}

// FUNCION PARA CALCULAR EL EVENTO CON MENOR PORCENTAJE DE ASISTENCIA

function getEventWithLowestAttendancePercentage(events) {
  let minPercentage = 100;
  let eventWithMinAttendancePercentage = null;

  for (const event of events) {
    const percentage = (event.assistance / event.capacity) * 100;
    if (percentage < minPercentage) {
      minPercentage = percentage;
      eventWithMinAttendancePercentage = event;
    }
  }
  return eventWithMinAttendancePercentage;
}

// FUNCION PARA CALCULAR EL EVENTO CON MAYOR CAPACIDAD

function getEventWithLargerCapacity(events) {
  let maxCapacity = 0;
  let eventWithMaxCapacity = null;

  for (const event of events) {
    if (event.capacity > maxCapacity) {
      maxCapacity = event.capacity;
      eventWithMaxCapacity = event;
    }
  }
  return eventWithMaxCapacity;
}



