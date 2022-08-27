const db = require('../connection');

/**
 *
 * @param {*} map_id to search pins with
 * @returns Promise(<[{}]>) array of objects
 */
const getPinsForMapById = (map_id) => {

  const queryParams = [map_id];
  const queryString = `
  SELECT *
  FROM pins
  WHERE map_id = $1;
  `;

  return db.query(queryString, queryParams)
  .then(data => {
    console.log(data.rows)
    return data.rows;
  })
  .catch(error => console.log(error.message));
}
exports.getPinsForMapById = getPinsForMapById;


const updatePins = (options) => {

  const { title, description, image, latitude, longitude, map_id } = options;

  const queryParams = [];
  const queryString = `

  `;

  return db.query(queryString, queryParams)
  .then(data => {
    return data.rows;
  })
  .catch(error => console.log(error.message));
}
exports.updatePins = updatePins;

const addPin = (pin) => {

  const { title, description, image, latitude, longitude, map_id } = pin;

  const queryParams = [title, description, image, latitude, longitude, map_id];
  const queryString = `
  INSERT INTO pins (title, description, image, latitude, longitude, map_id)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;

  db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
    })
    .catch(error => console.log(error.message));

}
exports.addPin = addPin;
