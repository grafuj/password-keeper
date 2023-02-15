const db = require('../connection');

const getPasswords = () => {
  return db.query('SELECT * FROM passwords;')
    .then(data => {
      console.log("from queries:", data.rows)
      return data.rows;
    });
};
const getPasswordById = (id) => {
  return db.query('SELECT * FROM passwords WHERE id = $1;', [id])
    .then(data => {
      console.log("from queries:", data.rows)
      return data.rows;
    });
};

module.exports = { getPasswords };

