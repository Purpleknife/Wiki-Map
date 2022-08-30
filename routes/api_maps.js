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

// GET /api/maps/id
router.get('/:id', (req, res) => { //Setup routes for /maps.
  if (!req.session.user_id) { //If not logged in, redirect to home page.
    // return res.redirect('/');
  }

  mapId = req.params.id;
  mapQueries.getMapById(mapId)
  .then(requestedMap => {

      pinQueries.getPinsForMapById(mapId)
        .then(pins => {

          const response = {
            requestedMap,
            pins
          };

          return res.json(response);
        })
    })
    .catch(error => console.log(error.message));
});

// POST /api/maps/id/pins

module.exports = router;
