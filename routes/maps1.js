/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { render } = require('sass');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');

// $(() => {
//   generateMaps();
// });

// const generateMaps = function(obj) {
//   const map = L.map('mapid').setView([obj.latitude, obj.longitude], 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '© OpenStreetMap'
//   }).addTo(map);

//   const marker = L.marker([obj.latitude, obj.longitude]).addTo(map);
//   //marker.bindPopup(`${obj.title}`).openPopup();

// }

router.get('/:id', (req, res) => {
  if (!req.session.user_id) {
    return res.redirect('/');
  }


  mapQueries.getMapById(req.params.id)
  .then(requestedMap => {

      const user = {
        id: req.session['user_id'],
        username: req.session['username']
      }
      const templateVars = {
        user,
        requestedMap
      };
      console.log(templateVars);
      res.render('maps', templateVars);
      //generateMaps(requestedMap);
      return;
    })
    .catch(error => console.log(error.message));
});



// router.get('/:id', (req, res) => {

//   userQueries.getUsersById(req.params.id)
//     .then(user => {
//       req.session.user_id = user.id;
//       req.session.username = user.username;

//       if (req.session.user_id) { //If logged in, redirect.
//         return res.redirect('/');
//       }
//     })
//     .catch(e => res.send(e));
// });

module.exports = router;
