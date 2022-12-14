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
  if (!req.session.user_id) {
    return res.redirect('/');
  }

  const templateVars = {};

  userQueries.getUsersById(req.session.user_id)
    .then(user => {
      templateVars.user = user;
      userQueries.getUserMaps(user.id, 99)
        .then(userMaps => {
          templateVars.userMaps = userMaps;
          userQueries.getUserFavs(user.id, 99)
            .then(userFavs => {
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

      const map_id = map.id;
      mapQueries.addContribution({map_id, user_id: userId})
        .then(addedContribution => console.log(addedContribution))

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




router.post('/register/new', (req, res) => { //Setup route for Register button without a form page.

  const usernameList = ['Ryan', 'Nikita', 'Jason', 'Michael', 'Pam'];
  const randomNum = Math.floor(Math.random() * usernameList.length);
  const randomUsername = usernameList[randomNum];

  const user = req.body;

  user.username = randomUsername;
  user.city = 'Calgary';
  user.province = 'Alberta';
  user.password = 'happykitty';
  user.email = `${user.username}@gmail.com`;

  userQueries.addUser(user)
  .then(registeredUser => {

    req.session.user_id = registeredUser.id;

    if (req.session.user_id) { //If logged in, redirect and login.
      return res.redirect(`/login/${registeredUser.id}`);
    }
  })
  .catch(e => res.send(e));
});


router.post('/', (req, res) => { //Setup route for /logout.
  req.session = null;
  return res.redirect('/');
});


module.exports = router;
