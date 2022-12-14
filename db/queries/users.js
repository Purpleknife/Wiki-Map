const db = require('../connection');

/**
 *
 * @param {*} userId to search for
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
      return data.rows[0];
    })
    .catch(error => console.log(error.message));
};
exports.getUsersById = getUsersById;

/**
 *
 * @param {string} username to search for
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
 * @param {string} email to search for
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

/**
 *
 * @param {*} user_id to search maps for
 * @returns Promise<[{}]> array of objects found in db
 */
const getUserMaps = (user_id, limit) => {

  const queryParams = [user_id];

  const queryString = `
  SELECT DISTINCT maps.*, users.username, contributions.user_id as con_user_id
  FROM contributions
  JOIN maps ON contributions.map_id = maps.id
  JOIN users ON contributions.user_id = users.id
  WHERE contributions.user_id = $1;
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.log(error.message));

};
exports.getUserMaps = getUserMaps;

/**
 *
 * @param {*} user_id to search favorite_maps for
 * @returns Promise<[{}]> array of objects with all users favorited maps
 */
const getUserFavs = (user_id, limit) => {

  const queryParams = [user_id];
  const queryString = `
  SELECT DISTINCT maps.*, users.username
  FROM maps
  JOIN favorite_maps ON maps.id = favorite_maps.map_id
  JOIN users ON maps.user_id = users.id
  WHERE favorite_maps.user_id = $1
  AND removed_at IS NULL
  LIMIT ${limit || 99};
  `;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.log(error.message));

};
exports.getUserFavs = getUserFavs;
