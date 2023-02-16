const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParses = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

<<<<<<< HEAD
const pool = new Pool({
  host:'localhost',
  user:'vagrant',
  password:'123',
  name:'midterm'
})

pool.connect()

=======
//for everthing in this file, we're already going to http://localhost:8080/login, anything else is in addition to this url
>>>>>>> e9963286c77b6abbc34d5e8f849c75a165ae7b5d

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
  return pool.query(`
  SELECT *
  FROM USERS
  WHERE EMAIL = $1`, [email])
<<<<<<< HEAD
  .then(resp => console.log(resp.rows));
=======
    .then(resp => (resp.rows[0]));
>>>>>>> e9963286c77b6abbc34d5e8f849c75a165ae7b5d
};


// const getUserPassword = (password) => {
//   return pool.query(`
//   SELECT *
//   FROM USERS
//   WHERE PASSWORD =$1`, [password].then(resp.rows[0]));
// };

const login = function(email, password) {
  return getUserEmail(email)
<<<<<<< HEAD
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
}
=======
    .then(user => {
      if (password !== user.password) {

        return null;
      }
      return user;
    });
};
//post /login
>>>>>>> e9963286c77b6abbc34d5e8f849c75a165ae7b5d
router.post("/", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
<<<<<<< HEAD
        res.send({ error: "error" });
        return;
      }
      req.session.userID = user.id;
     console.log({ user: { name: user.name, email: user.email, id: user.id } });
=======
        res.send({ error: 'user not found!' });
        return;
      }
      req.session.userID = user.id;
      let loggedIn = { name: user.name, email: user.email, id: user.id };
      console.log('creds:', loggedIn);
      res.redirect('/api/passwords');
>>>>>>> e9963286c77b6abbc34d5e8f849c75a165ae7b5d
    })
    .catch(err => console.log(err.message));
});

// router.post('/logout', (req, res) => {
//   req.session.userID = null;
//   res.send({});
// });

module.exports = router;
