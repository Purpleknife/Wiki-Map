/**
 * Loads the map on the main viewing page. Lots of potential helper functions in here with
 * crossover in profile and index scripts. Uses Ajax to grab data from db on page load.
 */

$(() => {

  // globally available map variable
  let map;

  //Variables fetched from maps.ejs:
  const map_id = document.querySelector('.map-id').value;
  const user_id = document.querySelector('.user-id').value;


  const generateMap = (lat, lon) => {
    map = L.map('mapid').setView([lat, lon], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    map.on('click', onMapClick);
  };

  const generatePins = (pins) => { //Generates pins in /maps.

    pins.forEach(pin => {

      let formText = `
      <br/>
      <div class="btn-group">
      <button id='pin${pin.id}' class="btn btn-sm">Edit</button> &nbsp; &nbsp;
      <form method="POST" action='/api/maps/${pin.id}/delete?_method=DELETE'>
        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
      </form>
      </div>`;

      if (!user_id) {
        formText = `<strong><i style="color: #ff0000">Please login or register to edit pins.</i></strong>`;
      }

      const fullText = `
      <strong style="color: rgb(29, 112, 189);">Title:</strong> <strong>${pin.title}</strong><br/>
      <br/>
      <strong style="color: rgb(29, 112, 189);">Description:</strong> ${pin.description}<br/>
      <br/>
      <strong style="color: rgb(29, 112, 189);">Image:</strong> <br/> <img src='${pin.image}' alt='No Image' style='height: 200px; width: 100%;' /><br/>
      ${formText}
      `;

      const marker = L.marker([pin.latitude, pin.longitude]).addTo(map);
      const savedMarker = marker.bindPopup(`
      <strong style="color: rgb(29, 112, 189);">Title:</strong> <strong>${pin.title}</strong><br/>
      <br/>
      <strong style="color: rgb(29, 112, 189);">Description:</strong> ${pin.description}<br/>
      <br/>
      <strong style="color: rgb(29, 112, 189);">Image:</strong> <br/> <img src='${pin.image}' alt='No Image' style='height: 200px; width: 100%;' /><br/>
      ${formText}
      `);
      savedMarker.on('popupopen', () => {
        $(`#pin${pin.id}`).on('click', () => {
          editPin(savedMarker, pin);
        });
      });
      savedMarker.on('popupclose', () => {
        setTimeout(() => {
          savedMarker.bindPopup(fullText);
        }, 500);
      });
    });
  };

  const editPin = (marker, pin) => { //To edit pins in /maps.

    if (!user_id) {
      return marker.bindPopup(`
        </br>
        <strong style="color: rgb(29, 112, 189);">Title:</strong> </br> <input type='text' name='title' value='${pin.title}'><br>
        </br>
        <strong style="color: rgb(29, 112, 189);">Description:</strong> </br> <input type='text' name='description' value='${pin.description}'><br>
        </br>
        <strong style="color: rgb(29, 112, 189);">Image URL:</strong> </br> <input type='text' name='image' value='${pin.image}'><br>
        </br>
        <strong><i style="color: #ff0000">Please login or register to edit maps.</i></strong>
      `);
    }

    marker.bindPopup(`
    </br>
    <form method='POST' action='/api/maps/${pin.id}/update?_method=PUT'>
      <strong style="color: rgb(29, 112, 189);">Title:</strong> </br> <input type='text' name='title' value='${pin.title}'><br>
      </br>
      <strong style="color: rgb(29, 112, 189);">Description:</strong> </br> <input type='text' name='description' value='${pin.description}'><br>
      </br>
      <strong style="color: rgb(29, 112, 189);">Image URL:</strong> </br> <input type='text' name='image' value='${pin.image}'><br>
      </br>
      <button class="btn btn-sm">Accept</button>
    </form>
    `);

  };

  const onMapClick = (e) => { //To create a pin whenever a point in the map is clicked.

    let popup = L.popup();
    let pinText = `
    <strong>Create Pin:</strong></br>
    </br>
    <form method='POST' action='/api/maps/${map_id}/pins'>
      <input type='hidden' name='latitude' value='${e.latlng.lat}'>
      <input type='hidden' name='longitude' value='${e.latlng.lng}'>
      <strong style="color: rgb(29, 112, 189);">Title:</strong> </br> <input type='text' name='title'><br>
      </br>
      <strong style="color: rgb(29, 112, 189);">Description:</strong> </br> <input type='text' name='description'><br>
      </br>
      <strong style="color: rgb(29, 112, 189);">Image URL:</strong> </br> <input type='text' name='image'><br>
      </br>
      <button class="btn btn-sm">Accept</button>
    </form>
    `;

    if (!user_id) {
      pinText = `<strong><i style="color: #ff0000">Please login or register to create pins.</i></strong>`
    }

    popup
      .setLatLng(e.latlng)
      .setContent(pinText)
      .openOn(map);
  };

  // Ajax function to grab data from database and trigger map rendering
  $.get('/api/maps/' + map_id).then((res) => {
    const lat = res.requestedMap.latitude;
    const lon = res.requestedMap.longitude;
    const pins = res.pins;

    generateMap(lat, lon);
    generatePins(pins);

  });

});
