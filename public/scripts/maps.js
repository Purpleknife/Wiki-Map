(function($) {
  $(() => {

    const map = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([51.5, -0.09]).addTo(map);
    marker.bindPopup('London').openPopup();

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
})(jQuery);
