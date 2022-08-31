$(() => {

  // globally available map variable
  let map;
  const map_id = document.querySelector('.map-id').value;
  const user_id = document.querySelector('.user-id').value;

  const generateMap = (lat, lon) => {
    map = L.map('mapid').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    map.on('click', onMapClick);
  };

  const generatePins = (pins) => {

    pins.forEach(pin => {

      let formText = `
      <button id='pin${pin.id}' class="btn btn-sm">Edit</button>
      <form method="POST" action='/api/maps/${pin.id}/delete?_method=DELETE'>
        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
      </form>`;

      if (!user_id) {
        formText = `<i style="color: #ff0000">Please login or register to edit pins.</i>`;
      }

      const marker = L.marker([pin.latitude, pin.longitude]).addTo(map);
      const savedMarker = marker.bindPopup(`
      Title: ${pin.title}<br>
      Description: ${pin.description}<br>
      Image: <img src='${pin.image}' style='height: 100px; width: 100px;' /><br>
      ${formText}
      `);
      savedMarker.on('popupopen', () => {
        $(`#pin${pin.id}`).on('click', () => {
          editPin(savedMarker, pin);
        });
      });
    });
  };

  const editPin = (marker, pin) => {

    if (!user_id) {
      return marker.bindPopup(`
        Title: <input type='text' name='title' value='${pin.title}'><br>
        Description: <input type='text' name='description' value='${pin.description}'><br>
        Image URL: <input type='text' name='image' value='${pin.image}'><br>
        <i style="color: #ff0000">Please login or register to edit maps.</i>
      `);
    }

    marker.bindPopup(`
    <form method='POST' action='/api/maps/${pin.id}/update?_method=PUT'>
      Title: <input type='text' name='title' value='${pin.title}'><br>
      Description: <input type='text' name='description' value='${pin.description}'><br>
      Image URL: <input type='text' name='image' value='${pin.image}'><br>
      <button class="btn btn-sm">Accept</button>
    </form>
    `);

  };

  const onMapClick = (e) => {

    let popup = L.popup();
    let pinText = `
    Create Pin:</br>
    <form method='POST' action='/api/maps/${map_id}/pins'>
      <input type='hidden' name='latitude' value='${e.latlng.lat}'>
      <input type='hidden' name='longitude' value='${e.latlng.lng}'>
      Title: <input type='text' name='title'><br>
      Description: <input type='text' name='description'><br>
      Image URL: <input type='text' name='image'><br>
      <button class="btn btn-sm">Accept</button>
    </form>
    `;

    if (!user_id) {
      pinText = `Please login to create pins.`
    }

    popup
      .setLatLng(e.latlng)
      .setContent(pinText)
      .openOn(map);
  }

  $.get('/api/maps/' + map_id).then((res) => {
    const lat = res.requestedMap.latitude;
    const lon = res.requestedMap.longitude;
    const pins = res.pins;

    generateMap(lat, lon);
    generatePins(pins);
  })

});
