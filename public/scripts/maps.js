$(() => {

  // globally available map variable
  let map;
  let popup = L.popup();

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
      marker.bindPopup(pin.title);
    });
  };

  const onMapClick = (e) => {
    popup
    .setLatLng(e.latlng)
    .setContent(`Add pin here?`)
    .openOn(map);
  }

  $.get('/api/maps/' + map_id).then((res) => {
    const lat = res.requestedMap.latitude;
    const lon = res.requestedMap.longitude;
    const pins = res.pins;

    generateMap(lat, lon);
    generatePins(pins);
  })





  //Setup the map that's gonna show up in maps, depending on the id of the map requested:



  const getAllPinsFromDb = function(map_id) {



    // const marker = L.marker([obj.latitude, obj.longitude]).addTo(map)
    // marker.bindPopup(`
    // <p>Title: ${obj.title}</p>
    // <p>Description: ${obj.description}</p>
    // <img src="${obj.image}"  class="img-pin">
    // <p>Created by: ${obj.id}</p>
    // <form method="POST" action='/maps/${obj.id}/delete'>
    //   <button type="submit" class="btn btn-danger btn-sm">Delete</button>
    // </form>
    // `);
  };

});


