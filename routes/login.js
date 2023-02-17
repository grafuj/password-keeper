const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const db = require('../db/connection');
const userQueries = require('../db/queries/users');


const app = express();


//get users
router.get("/", (req, res) => {
  const templateVars = { value: false };
  res.render("login", templateVars);
});

router.get("/login/:id", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/users'); //password page, which ever would that be

});

const login = function(email, password) {
  return userQueries.getUserByEmail(email)
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

module.exports = router;
