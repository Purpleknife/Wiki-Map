const db = require('../connection');

const getUsersById = (userId) => {

  const queryParams = [userId];
  const queryString = `
  SELECT *
  FROM users
  WHERE users.id = $1;
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      console.log(data.rows);
      // return data.rows;
    })
    .catch(error => console.log(error.message));
};
module.exports = { getUsersById };
getUsersById(1);
