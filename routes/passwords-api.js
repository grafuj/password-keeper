/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/passwords');
const generateRandomString = require('../routes/helper-functions')



//GET passwords
router.get('/', (req, res) => { // the /passwords is assumed, just like listed in server.js
  userQueries.getPasswordsByUserId(req.session.userID)
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
  db.query('SELECT * FROM passwords  WHERE id = $1', [id])
    .then((response) => {
      res.json(response.rows[0]);
    });
});

router.post('/', (req, res) => {
db.query(`
INSERT INTO passwords (user_id, username, url, email, password, category)
VALUES ($1, $2, $3, $4, $5, $6) returning *;
`, [req.session.userID, req.body.username, req.body.url, req.body.email, req.body.password, 'music'])
  .then(resp=>{
    res.json(resp.rows[0])
  })
})

module.exports = router;
