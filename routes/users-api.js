/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

//GET users
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.render('users' , {users});

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//GET user/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  client.query('SELECT * FROM user  WHERE id = $1', [id])
    .then((response) => {
      res.json(response.rows[0]);
    });
});

module.exports = router;
