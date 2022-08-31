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
      <form method="DELETE" action='/api/maps/${pin.id}/delete'>
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

    console.log('Marker', marker);
    console.log('Saved pin', pin);
    marker.bindPopup(`
    <form method='PUT' action='/api/maps/${pin.id}/update'>
      Title: <input type='text' name='pinTitle' value='${pin.title}'><br>
      Description: <input type='text' name='pinDescription' value='${pin.description}'><br>
      Image URL: <input type='text' name='pinUrl'  value='${pin.image}'><br>
      <button class="btn btn-sm">Accept</button>
    </form>`
    );

  };

  const onMapClick = (e) => {
    let popup = L.popup();
    popup
      .setLatLng(e.latlng)
      .setContent(`
      Add pin here?</br>
      <form onsubmit='createPin()'>
        <button type='submit'>Create</button>
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
