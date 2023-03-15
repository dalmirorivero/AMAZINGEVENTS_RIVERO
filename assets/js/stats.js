let data = []


fetch("../assets/amazing.json")
  .then(response => response.json())
  .then(data => {
    const events = data.events;

    const eventWithHighestAttendancePercentage = getEventWithHighestAttendancePercentage(events);
    document.getElementById("high").textContent = eventWithHighestAttendancePercentage.name;
    console.log(eventWithHighestAttendancePercentage.name);

    const eventWithLowestAttendancePercentage = getEventWithLowestAttendancePercentage(events);
    document.getElementById("low").textContent = eventWithLowestAttendancePercentage.name;
    console.log(eventWithLowestAttendancePercentage);

    const eventWithLargerCapacity = getEventWithLargerCapacity(events);
    document.getElementById("larger").textContent = eventWithLargerCapacity.name;
    console.log(eventWithLargerCapacity);

    
  });


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


  