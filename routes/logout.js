const express = require('express');
const router = express.Router();

//POST logout
router.post('/', (req, res) => {
  req.session = null;
  res.redirect('/login');
  // res.send('testing logout2')
});

module.exports = router;
