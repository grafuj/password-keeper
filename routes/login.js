const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParses = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const db = require('../db/connection');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


//get users
router.get("/", (req, res) => {
  const templateVars = { value: false };
  res.render("login.ejs", templateVars);
});

router.get("/login/:id", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/users.ejs'); //password page, which ever would that be

});

//'juelzlum@gmail.com', '123'
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
