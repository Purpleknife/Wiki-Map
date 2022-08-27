const db = require('../connection');

/**
 *
 * @param {*} userId
 * @returns Promise<{}> object with user info
 */
const getUsersById = (userId) => {

  const queryParams = [userId];
  const queryString = `
  SELECT *
  FROM users
  WHERE users.id = $1;
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.log(error.message));
};
exports.getUsersById = getUsersById;

/**
 *
 * @param {*} username to search for
 * @returns Promise<[{}]> object with user info
 */
const getUsersByUsername = (username) => {

  const queryParams = [username];
  const queryString = `
  SELECT *
  FROM users
  WHERE users.username = $1;
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.log(error.message));
};
exports.getUsersByUsername = getUsersByUsername;

/**
 *
 * @param {string} email
 * @returns Promise<[{}]> object with user info
 */
const getUsersByEmail = (email) => {

  const queryParams = [email];
  const queryString = `
  SELECT *
  FROM users
  WHERE users.email = $1;
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.log(error.message));
};
exports.getUsersByEmail = getUsersByEmail;
/**
 *
 * @param {{}} user object with required info (username, email, password, city, province)
 * @returns Promise<{}> object with added user info
 */
const addUser = (user) => {

  const {
    username,
    email,
    password,
    city,
    province
  } = user;

  const queryParams = [
    username,
    email,
    password,
    city,
    province
  ];

  const queryString = `
  INSERT INTO users (username, email, password, city, province)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.log(error.message));
};
exports.addUser = addUser;

const getUserMaps = (user_id) => {

  const queryParams = [user_id];
  const queryString = `
  SELECT *
  FROM maps
  WHERE user_id = $1;
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.log(error.message));

};
exports.getUserMaps = getUserMaps;


const getUserFavs = (user_id) => {

  const queryParams = [user_id];
  const queryString = `
  SELECT *
  FROM favorite_maps
  WHERE user_id = $1
  AND removed_at IS NULL;
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.log(error.message));

};
exports.getUserFavs = getUserFavs;
