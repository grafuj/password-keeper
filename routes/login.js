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



//get /login/
router.get("/", (req, res) => {
  const templateVars = { value: false };
  res.render("login.ejs", templateVars);
});

//get /login/login/:id
router.get("/:id", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/users.ejs'); //password page, which ever would that be

});

//'juelzlum@gmail.com', 'password'
const getUserEmail = (email) => {
  return db.query(`
  SELECT *
  FROM USERS
  WHERE EMAIL = $1`, [email])
  .then(resp => (resp.rows[0]));
};

getUserEmail('juelzlum@gmail.com')

// const getUserPassword = (password) => {
//   return db.query(`
//   SELECT *
//   FROM USERS
//   WHERE PASSWORD =$1`, [password]).then(resp => console.log(resp.rows))
// };
// getUserPassword('password')



const login = function(email, password) {
  return getUserEmail(email)
  .then(user => {
    if(password !== user.password) {

      return null
    }
    return user
  })
}
// login('juelzlum@gmail.com, password')

// /login/login

router.post("/", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: 'user not found!'});
        return;
      }
      req.session.userID = user.id;
     res.send({ user: { name: user.name, email: user.email, id: user.id } });
    })
    .catch(err => res.send('error:', err.message));
});




module.exports = router;
