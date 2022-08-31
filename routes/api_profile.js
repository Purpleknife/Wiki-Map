const express = require('express');
const { render } = require('sass');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');
const pinQueries = require('../db/queries/pins');

// GET /api/profile/id/favs
router.get('/:id/favs', (req, res) => { //Setup routes for /maps.

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
