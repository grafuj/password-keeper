const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParses = require('body-parser');
const { Pool } = require('pg');


const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

const pool = new Pool({
  host:'localhost',
  user:'vagrant',
  password:'123',
  name:'midterm'
})

pool.connect()

router.get("/", (req, res) => {
  const templateVars = { value: false };
  res.render("login.ejs", templateVars);
});

router.get("/login/:id", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/users.ejs'); //password page, which ever would that be

});
const getUserEmail = (email) => {
  return pool.query(`
  SELECT *
  FROM USERS
  WHERE EMAIL = $1`, [email].then(resp.rows[0]));
};

const getUserPassword = (password) => {
  return pool.query(`
  SELECT *
  FROM USERS
  WHERE PASSWORD =$1`, [password].then(resp.rows[0]));
};

const login = (email, password) => {
  if (database.getUserEmail(email) && getUserPassword(password)) {
    return user_id;
  }

};

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userID = user.id;
      res.send({ user: { name: user.name, email: user.email, id: user.id } });
    })
    .catch(e => res.send(e));
});




module.exports = router;
