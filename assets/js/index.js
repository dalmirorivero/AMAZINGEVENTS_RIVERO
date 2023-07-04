// VARIABLES GLOBALES

let data = []
let categories = ""
let checkboxes = document.querySelectorAll('.checkfilter input[type="checkbox"]');

// ELEMENTOS DOM

const eventosjs = document.getElementById('eventosjs');
const fragment = document.createDocumentFragment();
const search = document.querySelector('input[type="search" i]');

// FETCH JSON DATA

async function index() {
  try {
    const response = await fetch("./assets/amazing.json");
    const json = await response.json();
    
    // IMPRESION DE CARDS
    cardEvents(json, eventosjs);
    // CREACION DE CATEGORIAS
    categories = arrayCategories(json);
    // GENERAMOS CHECKBOXES DINAMICAS
    checkboxFilter(categories, checkbox);
    checkboxes = document.querySelectorAll('.checkfilter input[type="checkbox"]');
    // EVENTO DEL FILTRO SEARCH
    search.addEventListener('input', () => {
      const filteredEvents = filterEvents(search.value, json.events);
      cardEvents({ events: filteredEvents }, eventosjs);
    });
    // LLAMADA A LA FUNCION DEL FILTRO POR CHECKBOXES
    CheckboxChange(json, eventosjs, checkboxes);
    // DECLARO LA FUNCION COMBINADA
    function applyFilters() {
      const searchValue = search.value.trim();
      const checkedCategories = Array.from(checkboxes)
        .filter(c => c.checked)
        .map(c => c.id);

      if (searchValue === "" && checkedCategories.length === 0) {
        cardEvents(json, eventosjs);
      } else {
        let filteredEvents = json.events;

        if (searchValue !== "") {
          filteredEvents = filterEvents(searchValue, filteredEvents);
        }

        if (checkedCategories.length !== 0) {
          filteredEvents = filteredEvents.filter(event => {
            return checkedCategories.includes(event.category.toLowerCase());
          });
        }

        if (filteredEvents.length === 0) {
          eventosjs.innerHTML = "<p>No matching events found.</p>";
        } else {
          cardEvents({ events: filteredEvents }, eventosjs);
        }
      }
    }
    // EVENTO DE LA FUNCION COMBINADA
    search.addEventListener('input', applyFilters);
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', applyFilters);
    });
  }
  catch (error) {
    console.log(error);
  }
}

index();

// FUNCION PARA CREAR CARDS DINAMICAS

function cardEvents(array, eventosjs) {
  eventosjs.innerHTML = ""
  array.events.forEach((event) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML +=
      `
      <img src="${event.image}" alt="product1" style="width: 250px; height: 150px;">
      <h1>${event.name}</h1>
      <p class="title">
        ${event.category}
      </p>
      <p>PRICE: $${event.price}</p>
      <p style="padding: 5px; font-weight: bold;"><a href="../pages/details.html?_id=${event._id}"class="button">MORE INFO</a></p>
    `
    fragment.appendChild(div)
  })

  eventosjs.appendChild(fragment);
}

// FUNCION PARA CREAR CATEGORIAS

const arrayCategories = (array) => {
  let categories = array.events.map(category => category.category)
  categories = categories.reduce((acumulador, elemento) => {
    if (!acumulador.includes(elemento)) {
      acumulador.push(elemento);
    }
    return acumulador
  }, [])
  return categories
}

// FUNCION PARA CREAR CHECKBOXES DINAMICAS

const checkboxFilter = (array, checkbox) => {
  let newForm = document.createElement('form');
  newForm.className = 'checkfilter';

  array.forEach(category => {
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.id = category.toLowerCase();
    input.name = 'category';

    let label = document.createElement('label');
    label.setAttribute('for', category.toLowerCase());
    label.innerText = category;

    newForm.appendChild(input);
    newForm.appendChild(label);
  });

  checkbox.appendChild(newForm);
};

// FUNCION PARA FILTRAR CARDS POR BUSQUEDA

function filterEvents(searchValue, events) {
  return events.filter(event =>
    event.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    event.description.toLowerCase().includes(searchValue.toLowerCase()) ||
    event.category.toLowerCase().includes(searchValue.toLowerCase())
  );
}

//  FUNCION PARA FILTRAR CARDS POR CHECKBOXES

function CheckboxChange(data, eventosjs, checkboxes) {
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkedCategories = Array.from(checkboxes)
        .filter(c => c.checked)
        .map(c => c.id);

      if (checkedCategories.length === 0) {
        cardEvents(data, eventosjs);
      } else {
        const filteredEvents = data.events.filter(event => {
          return checkedCategories.includes(event.category.toLowerCase());
        });

        cardEvents({ events: filteredEvents }, eventosjs);
      }
    });
  });
}






