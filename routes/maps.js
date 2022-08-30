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


router.get('/:id', (req, res) => { //Setup routes for /maps.
  if (!req.session.user_id) { //If not logged in, redirect to home page.
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
      return;
    })
    .catch(error => console.log(error.message));
});



module.exports = router;
