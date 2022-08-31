const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const mapQueries = require('../db/queries/maps');

const locations = {
  calgary: {
    latitude: 51.051984,
    longitude: -114.069512
  },
  vancouver: {
    latitude: 49.256621,
    longitude: -123.139937
  },
  toronto: {
    latitude: 43.661784,
    longitude: -79.500180
  }
}

router.get('/profile', (req, res) => { //Setup route for user profile.
  const templateVars = {};

  userQueries.getUsersById(req.session.user_id)
    .then(user => {
      templateVars.user = user;
      userQueries.getUserMaps(user.id, 2)
        .then(userMaps => {
          templateVars.userMaps = userMaps;
          userQueries.getUserFavs(user.id, 2)
            .then(userFavs => {
              console.log('userFavs', userFavs);
              templateVars.userFavs = userFavs;
              return res.render('profile', templateVars)
            });
        });
    })
    .catch(e => res.send(e));
});


router.post('/profile', (req, res) => { //Setup route for map creation in user profile.

  let latitude;
  let longitude;

  if (req.body.city === 'Calgary') {
    latitude = locations.calgary['latitude'];
    longitude = locations.calgary['longitude'];
  }
  if (req.body.city === 'Vancouver') {
    latitude = locations.vancouver['latitude'];
    longitude = locations.vancouver['longitude'];
  }
  if (req.body.city === 'Toronto') {
    latitude = locations.toronto['latitude'];
    longitude = locations.toronto['longitude'];
  }

  const userId = req.session.user_id;
  mapQueries.addMap({...req.body, user_id: userId, latitude, longitude})
    .then(map => {
      res.redirect(`/maps/${map.id}`);
    })
    .catch(error => console.log(error.message));
});


router.get('/:id', (req, res) => { //Setup route for login without a form page.

  userQueries.getUsersById(req.params.id)
    .then(user => {
      req.session.user_id = user.id;
      req.session.username = user.username;

      if (req.session.user_id) { //If logged in, redirect.
        return res.redirect('/');
      }
    })
    .catch(e => res.send(e));
});


router.post('/', (req, res) => { //Setup route for /logout.
  req.session = null;
  return res.redirect('/');
});

module.exports = router;
