
$(document).ready(() => {
  const createMap = function(latitude, longitude, userID) {
    const map = L.map(`map${userID}`).setView([latitude, longitude], 13);
    console.log('abc');
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
      }).addTo(map);

      const marker = L.marker([latitude, longitude]).addTo(map);
  }

  // const createMapContri = function(latitude, longitude, userID) {
  //   const map = L.map(`map${userID}`).setView([latitude, longitude], 13);
  //   console.log('abc');
  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         maxZoom: 19,
  //         attribution: '© OpenStreetMap'
  //     }).addTo(map);

  //     const marker = L.marker([latitude, longitude]).addTo(map);
  // }

  const $favDiv = $('#fav-card');
  const $contriDiv = $('#contri-card');
  const $createDiv = $('#create-card');

  const $favButton = $('#fav-button');
  const $contriButton = $('#contri-button');
  const $createButton = $('#create-button');

  $favDiv.hide();
  $contriDiv.hide();
  //$createDiv.hide();

  $favButton.on('click', function() {

    $('#fav-card').css('display', 'block');
    $contriDiv.hide();
    $createDiv.hide();
    const favLat = document.querySelector('.fav-lat').value;
    const favLon = document.querySelector('.fav-lon').value;
    const favID = document.querySelector('.fav-id').value;
    // console.log(favLat);
    // console.log(favLon);
    createMap(favLat, favLon, favID);
  });

  $contriButton.on('click', function() {
    $('#contri-card').css('display', 'block');
    $favDiv.hide();
    $createDiv.hide();
    const contriLat = document.querySelector('.contri-lat').value;
    const contriLon = document.querySelector('.contri-lon').value;
    const contriID = document.querySelector('.contri-id').value;
    console.log(contriLat);
    console.log(contriLon);
    console.log(contriID);
    createMap(contriLat, contriLon, contriID);
  });

  $createButton.on('click', function() {
    $('#create-card').css('display', 'block');
    $favDiv.hide();
    $contriDiv.hide();

  });

});



const checkIfOnProfilePage = function() {
  if (document.URL.includes("profile")) {
    return true;
  }
  return false;
}





// $(document).ready(() => { //Call the callbacks when the document is fully loaded/ ready.
//   renderFavContainer();
//   showFavContainer();
// });

// const addFavContainer = function() {
//   const htmlStructure = `
//   <div class="column">
//       <div class="card">

//         <p id="maps-title">Favorites <i class="fa-solid fa-sort-down"></i></p>
//       <% for (let userFave of userFavs) { %>
//         <div class="card-body">
//           <script>
//             <%= console.log(userFave) %>
//             let lat = <%= userFave.latitude %>;
//             let lon = <%= userFave.longitude %>;
//           </script>
//         <div id= "mapid" style="height: 200px"></div>
//         <p class="card-text"><b>Map:</b> <%= userFave.title %><br><b>City:</b> <%= userFave.city %><br><b>Created By:</b> <%= userFave.username %></p>
//         <table>
//             <form method="GET" action="/maps/<%= userFave.id %>/">
//               <button type="submit" class="btn btn-sm btn-outline-secondary">View <i class="fa-solid fa-magnifying-glass"></i></button>
//             </form> &nbsp
//             <form method="GET" action="/maps">
//               <button type="submit" class="btn btn-sm btn-outline-secondary">Favorite <i class="fa-solid fa-heart"></i></button>
//             </form> &nbsp
//             <form method="POST" action="/maps">
//               <button type="submit" class="btn btn-sm btn-outline-secondary">Delete <i class="fa-solid fa-trash-can"></i></button>
//             </form>
//           </table>
//         </div>
//         <% } %>
//   `
//   return htmlStructure;
// };

// const renderFavContainer = function() {
//   const $favCard = addFavContainer();

//   $('#fav-button').on('click', function (e) {
//     e.preventDefault()
//     $('#maps-container').load($favCard)
//   })
// };

