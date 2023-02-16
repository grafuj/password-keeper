const db = require('../connection');

const getPasswords = () => {
  return db.query('SELECT * FROM passwords;')
    .then(data => {
      console.log("from queries:", data.rows)
      return data.rows;
    });
};
const getPasswordsByUserId = (user_id) => {
  return db.query('SELECT * FROM passwords WHERE user_id = $1;', [user_id])
    .then(data => {
      console.log("from queries:", data.rows)
      return data.rows;
    });
};

module.exports = { getPasswords, getPasswordsByUserId };
