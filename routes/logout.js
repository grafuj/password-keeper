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

//GET logout
router.get('/', (req, res) => {
  req.session.userID = null;
  res.redirect('/login');
});

module.exports = router;
