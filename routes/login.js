const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParses = require('body-parser');
const bcrypt = require('bcrypt');
const { log } = require('console');
const { getMaxListeners } = require('process');
const db = require('../db/connection');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

console.log('Hello world');

// router.get("/", (req, res) => {
//   const templateVars = { value: false };
//   res.render("login.ejs", templateVars);
// });

// router.get("/login/:id", (req, res) => {
//   req.session.user_id = req.params.id;
//   res.redirect('/users.ejs'); //password page, which ever would that be

// });

//'juelzlum@gmail.com', 'password'
const getUserEmail = (email) => {
  return db.query(`
  SELECT *
  FROM USERS
  WHERE EMAIL = $1`, [email])
  .then(resp => console.log(resp.rows));
};

// const getUserPassword = (password) => {
//   return pool.query(`
//   SELECT *
//   FROM USERS
//   WHERE PASSWORD =$1`, [password].then(resp.rows[0]));
// };

const login = function(email, password) {
  return getUserEmail(email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
}

router.post("/", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userID = user.id;
     console.log({ user: { name: user.name, email: user.email, id: user.id } });
    })
    .catch(err => console.log('error:', err.message));
});




module.exports = router;
