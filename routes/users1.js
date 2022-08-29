const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const mapQueries = require('../db/queries/maps');
const pinQueries = require('../db/queries/pins');

router.get('/profile', (req, res) => {
  const templateVars = {};

  userQueries.getUsersById(req.session.user_id)
    .then(user => {
      templateVars.user = user;
      mapQueries.getMapByUserId(user.id)
        .then(userMaps => {
          templateVars.userMaps = userMaps;
          console.log(userMaps);
        });
      return res.render('profile', templateVars)
    })


    .catch(e => res.send(e));

});

router.get('/:id', (req, res) => {

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


router.post('/', (req, res) => {
  req.session = null;
  return res.redirect('/');
});

module.exports = router;
