$(() => {

  // globally available map variable
  let map;

  const generateMap = (lat, lon) => {
    map = L.map('mapid').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    map.on('click', onMapClick);

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`Map center`); //.openPopup() will start popup open
  };

  const generatePins = (pins) => {
    pins.forEach(pin => {
      const marker = L.marker([pin.latitude, pin.longitude]).addTo(map);
      const savedMarker = marker.bindPopup(`
      Title: ${pin.title}<br>
      Description: ${pin.description}<br>
      Image: <img src='${pin.image}' style='height: 100px; width: 100px;' /><br>
      <button id='pin${pin.id}' class="btn btn-sm">Edit</button>
      <form method="POST" action='/api/maps/${pin.id}/delete?_method=DELETE'>
        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
      </form>
      `);
      savedMarker.on('popupopen', () => {
        $(`#pin${pin.id}`).on('click', () => {
          editPin(savedMarker, pin);
        });
      });
    });
  };

  const editPin = (marker, pin) => {

    marker.bindPopup(`
    <form method='POST' action='/api/maps/${pin.id}/update?_method=PUT'>
      Title: <input type='text' name='title' value='${pin.title}'><br>
      Description: <input type='text' name='description' value='${pin.description}'><br>
      Image URL: <input type='text' name='image' value='${pin.image}'><br>
      <button class="btn btn-sm">Accept</button>
    </form>`
    );

  };

  const onMapClick = (e) => {
    let popup = L.popup();
    popup
      .setLatLng(e.latlng)
      .setContent(`
      Create Pin:</br>
      <form method='POST' action='/api/maps/${map_id}/pins'>
        Title: <input type='text' name='title'><br>
        Description: <input type='text' name='description'><br>
        Image URL: <input type='text' name='image'><br>
        <button class="btn btn-sm">Accept</button>
      </form>
      `)
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
