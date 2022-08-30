
  $(() => {

    //Setup the map that's gonna show up in maps, depending on the id of the map requested:
    const map = L.map('mapid').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([lat, lon]).addTo(map);
    //marker.bindPopup(`${obj.title}`).openPopup();



    const getAllPinsFromDb = function(obj) {
      const marker = L.marker([obj.latitude, obj.longitude]).addTo(map)
      marker.bindPopup(`
      <p>Title: ${obj.title}</p>
      <p>Description: ${obj.description}</p>
      <img src="${obj.image}"  class="img-pin">
      <p>Created by: ${obj.id}</p>
      <form method="POST" action='/maps/${obj.id}/delete'>
        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
      </form>
      `);
    };

    // $.get('/pins', function(output) {

    // })

  });


