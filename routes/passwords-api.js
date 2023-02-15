/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/passwords');


//GET passwords
router.get('/', (req, res) => { // the /passwords is assumed, just like listed in server.js
  userQueries.getPasswords()
    .then(passwords => {
      // console.log("data:", passwords)
      res.render('passwords' , {passwords});

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
  client.query('SELECT * FROM passwords  WHERE id = $1', [id])
    .then((response) => {
      res.json(response.rows[0]);
    });
});



module.exports = router;
