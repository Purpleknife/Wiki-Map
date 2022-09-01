/**
 * This file adds maps to the home page (index.ejs).
 * It has access to the database through async await functions at the top.
 */

 $(() => {

  //Variable fetched from index.ejs:
  const user_id = document.querySelector('.user-id').value;

  async function fetchMaps() {
    let data = await (await fetch(`/api/maps/all`)).json();
    return data;
  }

  async function fetchPinsForMap(map_id) {
    let data = await (await fetch(`/api/maps/${map_id}/pins`)).json();
    return data;
  }

  const generateMap = (type, map) => { //Generates a Leaflet map.

    map = L.map(`${type + map.id}`).setView([map.latitude, map.longitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    return map;

  };

  const generateHtml = (type, map) => {

    let optionalText = ``;
    if (user_id) {
      optionalText = `
        <form method="POST" action="/maps/${map.id}">
        <button type="submit" id="heart-icon" class="btn btn-sm btn-outline-secondary mb-3">Favorite <i class="fa-solid fa-heart"></i></button>
        </form>`;
    }



    let htmlText = `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <div id="${type + map.id}" style="height: 200px"></div>
        <br/>
        <p class="card-text"><b>Map:</b> ${map.title}<br><b>City:</b> ${map.city}<br><b>Created By:</b> ${map.username}</p>
        <div>

          <form method="GET" action="/maps/${map.id}/">
            <button type="submit" id="view-icon" class="btn btn-sm btn-outline-secondary mb-3">View <i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
          ${optionalText}

        </div>
        <br/>
      </div>
    </div>`;

    return htmlText

  }

  const generatePins = (map, pins) => { //Generates pins in home page.

    pins.forEach(pin => {

      let formText = `
      <button id='pin${pin.id}' class="btn btn-sm">Edit</button>
      <form method="POST" action='/api/maps/${pin.id}/delete?_method=DELETE'>
        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
      </form>`;

      const marker = L.marker([pin.latitude, pin.longitude]).addTo(map);
      const savedMarker = marker.bindPopup(`
      Title: ${pin.title}<br>
      Description: ${pin.description}<br>
      Image: <img src='${pin.image}' alt='No Image' style='height: 100px; width: 100px;' /><br>
      ${formText}
      `);
      savedMarker.on('popupopen', () => {
        $(`#pin${pin.id}`).on('click', () => {
          editPin(savedMarker, pin);
        });
      });
    });
  };

  const loadAllMaps = () => {
    fetchMaps()
    .then(maps => {

      maps.requestedMaps.forEach(map => {

        const mapHtml = generateHtml('map', map);

        $('#map-container').prepend(mapHtml);

        const mapRef = generateMap('map', map);

        fetchPinsForMap(map.id)
          .then(pins => {

            generatePins(mapRef, pins.requestedPins);

          })
      });
    })
    .catch(error => console.log(error.message));
  };
  loadAllMaps();

});


//For drop down menu in search bar:

const select = document.getElementById('select');
const list = document.getElementById('list');
const selectText = document.getElementById('selectText');
const inputField = document.getElementById('inputField');
const options = document.getElementsByClassName('options');

select.onclick = function() {
  list.classList.toggle('open');
}

for (option of options) {
  option.onclick = function() {
    selectText.innerHTML = this.innerHTML;
    inputField.placeholder = `Search in ${selectText.innerHTML}...`;
  }
}


