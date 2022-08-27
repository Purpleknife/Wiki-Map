const db = require('../connection');

const getUsersById = (userId) => {

  const queryParams = [userId];
  const queryString = `
  SELECT *
  FROM users
  WHERE users.id = $1;
  `;



  // return db.query('SELECT * FROM users;')
  //   .then(data => {
  //     return data.rows;
  //   });
};

module.exports = { getUsers };
