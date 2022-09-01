/**
 * This file adds maps to the user profile.
 * It has access to the database through async await functions at the top.
 */

$(() => {

  const userId = document.querySelector('.user-id').value;

  async function fetchFavs() {
    let data = await (await fetch(`/api/maps/${userId}/favs`)).json();
    return data;
  }

  async function fetchCons() {
    let data = await (await fetch(`/api/maps/${userId}/cons`)).json();
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

  const generateHtml = (type, map) => { // Generates html template for the map and map interactions
    let htmlText = '';

    if (type === 'fav') {
      htmlText = `
        <div id="${type + map.id}" style="height: 200px"></div>
        <br/>
        <p class="card-text"><b>Map:</b> ${map.title}<br><b>City:</b> ${map.city}<br><b>Created By:</b> ${map.username}</p>
        <div>
          <form method="GET" action="/maps/${map.id}/">
            <button type="submit" id="view-icon" class="btn btn-sm btn-outline-secondary">View <i class="fa-solid fa-magnifying-glass"></i></button>
          </form> &nbsp;
          <form method="POST" action="/maps/${map.id}?_method=DELETE">
            <button type="submit" id="remove-icon" class="btn btn-sm btn-outline-secondary">Remove <i class="fa-solid fa-trash-can"></i></button>
          </form>
        </div>
        <br/>`;
    };

    if (type === 'con') {
      htmlText = `
      <div id="${type + map.id}" style="height: 200px"></div>
      <br/>
      <p class="card-text"><b>Map:</b> ${map.title}<br><b>City:</b> ${map.city}<br><b>Created By:</b> ${map.username}</p>
      <div>
        <form method="GET" action="/maps/${map.id}/">
          <button type="submit" id="view-icon" class="btn btn-sm btn-outline-secondary">View <i class="fa-solid fa-magnifying-glass"></i></button>
        </form> &nbsp;
        <form method="POST" action="/maps/${map.id}">
          <button type="submit" id="heart-icon" class="btn btn-sm btn-outline-secondary">Favorite <i class="fa-solid fa-heart"></i></button>
        </form> &nbsp;
      </div>
      <br/>`;
    }

    return htmlText;
  }

  const generatePins = (map, pins) => { // Grabs all the pins for a map from the database and renders them

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


  //To make Favorites, Contributions and Create new Map, show up when the buttons are clicked:

  const $favDiv = $('#fav-card');
  const $contriDiv = $('#contri-card');
  const $createDiv = $('#create-card');

  const $favButton = $('#fav-button');
  const $contriButton = $('#contri-button');
  const $createButton = $('#create-button');

  $favDiv.hide();
  $contriDiv.hide();

  $favButton.on('click', function() { //When you click on "Favorites" button in Profile.

    $('#fav-card').show();
    $createDiv.hide();
    $contriDiv.hide();

    // Async function that returns a promise from the db with the users fav maps
    fetchFavs()
    .then(maps => {

      $('#fav-maps-container').empty();

      maps.requestedMap.forEach(map => {

        const mapHtml = generateHtml('fav', map);

        $('#fav-maps-container').prepend(mapHtml);

        const mapRef = generateMap('fav', map);

        fetchPinsForMap(map.id)
          .then(pins => {
            generatePins(mapRef, pins.requestedPins);
          })
          .catch(err => console.log(err.message));
      });
    })
    .catch(error => console.log(error.message));
  });

  $contriButton.on('click', function() {  //When you click on "Contributions" button in Profile.
    $('#contri-card').show();
    $favDiv.hide();
    $createDiv.hide();

    // Async function that returns a promise from the db with the users contributed maps
    fetchCons()
    .then(maps => {

      $('#con-maps-container').empty();

      maps.requestedMap.forEach(map => {

        const mapHtml = generateHtml('con', map);
        $('#con-maps-container').prepend(mapHtml);
        const mapRef = generateMap('con', map);

        fetchPinsForMap(map.id)
          .then(pins => {
            generatePins(mapRef, pins.requestedPins);
          })
          .catch(err => console.log(err.message));
      });
    })
    .catch(error => console.log(error.message));
  });

  $createButton.on('click', function() {  //When you click on "Create new Map" button in Profile.
    $('#create-card').show();
    $favDiv.hide();
    $contriDiv.hide();
  });

});
