const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParses = require('body-parser');
const { log } = require('console');
const { getMaxListeners } = require('process');
const db = require('../db/connection');
const { reset } = require('nodemon');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

//for everthing in this file, we're already going to http://localhost:8080/login, anything else is in addition to this url

//get users
router.get("/", (req, res) => {
  const templateVars = { value: false };
  res.render("login.ejs", templateVars);
});

//get users/:id
router.get("/:id", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/users.ejs');
});

const getUserEmail = (email) => {
  return db.query(`
  SELECT *
  FROM USERS
  WHERE EMAIL = $1`, [email])
    .then(resp => (resp.rows[0]));
};

const login = function(email, password) {
  return getUserEmail(email)
    .then(user => {
      if (password !== user.password) {

        return null;
      }
      return user;
    });
};
//post /login
router.post("/", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({ error: 'user not found!' });
        return;
      }
      req.session.userID = user.id;
      let loggedIn = { name: user.name, email: user.email, id: user.id };
      console.log('creds:', loggedIn);
      res.redirect('/api/passwords');
    })
    .catch(err => res.send('error:', err.message));
});

// router.post('/logout', (req, res) => {
//   req.session.userID = null;
//   res.send({});
// });

module.exports = router;
