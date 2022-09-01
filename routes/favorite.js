const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps');

router.post('/:id', (req, res) => { //Setup route for favorite button: to add a fav to user's favorites.

  if (!req.session.user_id) {
    return res.send('You cannot add favorite maps until you sign in.');
  }

  const userId = req.session.user_id;
  const mapId = req.params.id;

  mapQueries.addFavMap({...req.body, user_id: userId, map_id: mapId })
    .then(favMap => {
      return res.redirect('/profile');
    })
    .catch(error => console.log(error.message));
});

router.delete('/:id', (req, res) => { //Setup route to delete a favorite map.

  if (!req.session.user_id) {
    return res.send('You cannot remove favorite maps until you sign in.');
  }

  const userId = req.session.user_id;
  const mapId = req.params.id;

  mapQueries.deleteFavMap({ user_id: userId, map_id: mapId })
    .then(favMap => {
      return res.redirect('/profile');
    })
    .catch(error => console.log(error.message));
});

module.exports = router;
