import data from './data.js'

const details = document.getElementById('details')

const queryString = location.search;
const params = new URLSearchParams(queryString);
const eventID = params.get('_id');
const event = data.events.find(event => event._id == eventID);

console.log(details)

function eventDetail(event, details){
   
    let div = document.createElement('div')
    div.className = "box";
    div.innerHTML=  `
    <div class="title-container">
            <div class="title" style="font-size: 30px;">${event.name.toUpperCase()}</div>
            <div class="description">
            <p style="font-size: 20px; font-weight: bold; padding: 1%">${event.category.toUpperCase()}</p>
            <p style="font-size: 20px;">${event.description}</p>
            <p style="font-style: oblique; padding: 1%">${event.date} at the ${event.place}</p>
            <p style="font-weight: bold; color: #000;">PRICE: $${event.price}</p>
            </div>
          </div>
          <img class="image" src="${event.image}" alt="Image">
        </div>
         `
         details.appendChild(div)


}

eventDetail(event, details)