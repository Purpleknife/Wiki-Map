const db = require('../connection');

const getMapById = (map_id) => {

  const queryParams = [map_id];
  const queryString = `
  SELECT *
  FROM maps
  WHERE maps.id = $1;
  `;

  db.query(queryString, queryParams)
    .then(data => {
      console.log(data.rows)
      return data.rows;
    })
    .catch(error => console.log(error.message));

};
exports.getMapById = getMapById;

const getAllMaps = (options, limit = 10) => {

  // can search by title, city, province, user

  let queryParams = [];
  let queryString = `
  SELECT *
  FROM maps
  `;

  if (options.user_id) {
    queryParams.push(options.user_id);
    queryString += `WHERE user_id = $${queryParams.length} `;
  }

  if (options.title) {
    queryParams.push(`%${options.title}%`);
    queryString += queryParams.length > 1 ?
    `AND title LIKE $${queryParams.length} ` :
    `WHERE title LIKE $${queryParams.length} `;
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += queryParams.length > 1 ?
    `AND city LIKE $${queryParams.length} ` :
    `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.province) {
    queryParams.push(`%${options.province}%`);
    queryString += queryParams.length > 1 ?
    `AND province LIKE $${queryParams.length} ` :
    `WHERE province LIKE $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `LIMIT $${queryParams.length};`;

  console.log(queryString, queryParams);

  return db.query(queryString, queryParams)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch(error => console.log(error.message));

};
exports.getAllMaps = getAllMaps;

/**
 *
 * @param {*} map
 */
const addMap = (map) => {

  const { user_id, title, latitude, longitude, city, province } = map;

  const queryParams = [user_id, title, latitude, longitude, city, province];
  const queryString = `
  INSERT INTO maps (user_id, title, latitude, longitude, city, province)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;

  db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.log(error.message));

};
exports.addMap = addMap;

const updateMap = (options) => {

  queryString = `
  ALTER TABLE maps

  `;

};
exports.updateMap = updateMap;

/**
 *
 * @param {{}} map object of user_id and map_id
 */
const addFavMap = (map) => {

  const { user_id, map_id } = map;

  const queryParams = [user_id, map_id];
  const queryString = `
  INSERT INTO favorite_maps (created_at, user_id, map_id)
  VALUES (Now(), $1, $2)
  RETURNING *;
  `;

  db.query(queryString, queryParams)
    .then(data => {
      console.log(data.rows[0])
      return data.rows[0];
    })
    .catch(error => console.log(error.message));

};
exports.addFavMap = addFavMap;

const deleteFavMap = (map) => {

  const { user_id, map_id } = map;

  const queryParams = [user_id, map_id];
  const queryString = `
  UPDATE favorite_maps
  SET removed_at = Now()
  WHERE user_id = $1 AND map_id = $2;
  `;

  db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(error => console.log(error.message));

};
exports.deleteFavMap = deleteFavMap;
