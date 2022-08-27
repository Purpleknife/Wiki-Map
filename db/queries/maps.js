const db = require('../connection');

const getAllMaps = (options, limit = 10) => {



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
      return data.rows;
    })
    .catch(error => console.log(error.message));

};
exports.addMap = addMap;

const updateMap = (options) => {



};
exports.updateMap = updateMap;
