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
const pinQueries = require('../db/queries/pins');


router.get('/:id', (req, res) => { //Setup routes for /maps.

  mapId = req.params.id;
  mapQueries.getMapById(mapId)
  .then(requestedMap => {

      pinQueries.getPinsForMapById(mapId)
        .then(pins => {

          const user = {
            id: req.session['user_id'],
            username: req.session['username']
          };

          const templateVars = {
            user,
            requestedMap,
            pins
          };

          return res.render('maps', templateVars);
        })
    })
    .catch(error => console.log(error.message));
});

module.exports = router;
