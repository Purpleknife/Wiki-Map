const express = require('express');
const { render } = require('sass');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const mapQueries = require('../db/queries/maps');
const pinQueries = require('../db/queries/pins');


// GET /api/maps/all
router.get('/all', (req, res) => {
  mapQueries.getAllMaps(req.query)
  .then(requestedMaps => {

    const response = {
      requestedMaps
    };

    return res.json(response);
    })
    .catch(error => console.log(error.message));
});

// GET /api/maps/id/pins
router.get('/:id/pins', (req, res) => {

  mapId = req.params.id;
  pinQueries.getPinsForMapById(mapId)
  .then(requestedPins => {
    const response = {
      requestedPins
    };

    return res.json(response);
    })
    .catch(error => console.log(error.message));
});

// GET /api/maps/id/favs
router.get('/:id/favs', (req, res) => {

  userId = req.params.id;
  userQueries.getUserFavs(userId)
  .then(requestedMap => {
    const response = {
      requestedMap
    };

    return res.json(response);
    })
    .catch(error => console.log(error.message));
});

// GET /api/maps/id/cons
router.get('/:id/cons', (req, res) => {

  userId = req.params.id;
  userQueries.getUserMaps(userId)
  .then(requestedMap => {
    const response = {
      requestedMap
    };

    return res.json(response);
    })
    .catch(error => console.log(error.message));
});

// GET /api/maps/id
router.get('/:id', (req, res) => {

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
router.post('/:id/pins', (req, res) => {

  const map_id = req.params.id;
  const user_id = req.session.user_id;

  userQueries.getUserMaps(user_id)
    .then(cons => {
      let hasContributed = false;

      cons.forEach(con => {
        if (con.id == map_id && con.con_user_id == user_id) {
          hasContributed = true;
        }
      });

      if (!hasContributed){
        mapQueries.addContribution({map_id, user_id})
          .then(addedContribution => console.log('check', addedContribution))
      }
    })
    .catch(err => console.log(err));

  const { title, description, image, latitude, longitude } = req.body;
  const pin = {
    map_id,
    title,
    description,
    image,
    latitude,
    longitude
  };

  pinQueries.addPin(pin)
    .then(data => {
      res.redirect(`/maps/${data.map_id}`);
    })
    .catch(error => console.log(error.message));
});

// PUT /api/maps/id/update
router.put('/:id/update', (req, res) => {

  const pinId = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const options = { title, description, image };

  console.log('Editting a pin', options);

  pinQueries.updatePins(pinId, options)
  .then(data => {

    const user_id = req.session.user_id;
    const map_id = data.map_id;

    userQueries.getUserMaps(user_id)
    .then(cons => {
      let hasContributed = false;

      cons.forEach(con => {
        if (con.id == map_id && con.con_user_id == user_id) {
          hasContributed = true;
        }
      });

      if (!hasContributed){
        mapQueries.addContribution({map_id, user_id})
          .then(addedContribution => console.log('check', addedContribution))
      }
    })

    res.redirect(`/maps/${data.map_id}`);
  })
  .catch(error => console.log(error.message));

});

// DELETE /api/maps/id/delete
router.delete('/:id/delete', (req, res) => {

  pinId = req.params.id;
  pinQueries.deletePin(pinId)
    .then(data => {

      const user_id = req.session.user_id;
      const map_id = data.map_id;

      userQueries.getUserMaps(user_id)
      .then(cons => {
        let hasContributed = false;

        cons.forEach(con => {
          if (con.id == map_id && con.con_user_id == user_id) {
            hasContributed = true;
          }
        });

        if (!hasContributed){
          mapQueries.addContribution({map_id, user_id})
            .then(addedContribution => console.log('check', addedContribution))
        }
      })

      res.redirect(`/maps/${data.map_id}`);
    })
    .catch(error => console.log(error.message))

});

module.exports = router;
