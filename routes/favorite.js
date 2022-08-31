const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');

router.post('/:id', (req, res) => { //Setup route for favorite button.
  console.log('req.body', req.body);
  const userId = req.session.user_id;
  const mapId = req.params.id;
  console.log('mapId', mapId);

  mapQueries.addFavMap({...req.body, user_id: userId, map_id: mapId })
    .then(favMap => {
      console.log('newFavMap', favMap)
      return res.redirect('/profile');
    })
    .catch(error => console.log(error.message));
});

module.exports = router;
