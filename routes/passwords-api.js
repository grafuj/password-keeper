/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
// const db = require('../db/connection');
const passwordQueries = require('../db/queries/passwords');
const userQueries = require('../db/queries/users');

//GET passwords
router.get('/', (req, res) => { // the /passwords is assumed, just like listed in server.js
  let userID = req.session.userID;
  // console.log('sesh:', req.session, Object.keys(req.session))
  Promise.all([
    passwordQueries.getPasswordsByUserId(userID),
    userQueries.getUserById(userID)
  ])
    .then(all => {
      // console.log("data:", passwords)
      res.render('passwords', { passwords: all[0], user: all[1].name });

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//GET password/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  // db.query('SELECT * FROM passwords  WHERE id = $1', [id])
  passwordQueries.getPasswordById(id)
    .then((password) => {
      res.json(password);
    });
});

router.post('/', (req, res) => {
  const passBody = {
    user_id: req.session.userID,
    username: req.body.username,
    url: req.body.url,
    email: req.body.email,
    password: req.body.password,
    category: req.body.category
  };

  passwordQueries.createPassword(passBody)
    .then(newPassword => {
      console.log('new pw:', newPassword);
      res.json(newPassword);
    });
});

module.exports = router;
