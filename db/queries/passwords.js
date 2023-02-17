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
      return data.rows[0];
    });
};

const getPasswordsByUserId = (user_id) => {
  return db.query('SELECT * FROM passwords WHERE user_id = $1;', [user_id])
    .then(data => {
      console.log("from queries:", data.rows)
      return data.rows;
    });
};

const createPassword = (body) => {
  const { user_id, username, url, email, password, category } = body;
  return db.query(`INSERT INTO passwords (user_id, username, url, email, password, category)
  VALUES ($1, $2, $3, $4, $5, $6) returning *;`, [user_id, username, url, email, password, category])
    .then(data => {
      console.log("from queries:", data.rows)
      return data.rows[0];
    });
};

module.exports = { getPasswords, getPasswordById, getPasswordsByUserId, createPassword };
