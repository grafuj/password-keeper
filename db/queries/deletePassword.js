const db = require('../connection');

const delPassword = function(id) {
  return db.query(`
  DELETE FROM passwords
  WHERE id = $1`, [id])
  .then(res => {
    return res.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = { delPassword };
