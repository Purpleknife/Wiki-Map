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


const updatePins = (pin_id, options) => {

  // Can update title, description, image...
  let queryParams = [];
  let queryString = `
  UPDATE pins `;

  if (options.title) {
    queryParams.push(`${options.title}`);
    queryString +=
    `SET title = $${queryParams.length} `;
  }

  if (options.description) {
    queryParams.push(`${options.description}`);
    queryString += queryParams.length > 1 ?
    `, description = $${queryParams.length} ` :
    `SET description = $${queryParams.length} `;
  }

  if (options.image) {
    queryParams.push(`${options.image}`);
    queryString += queryParams.length > 1 ?
    `, image = $${queryParams.length} ` :
    `SET image = $${queryParams.length} `;
  }

  queryParams.push(pin_id);
  queryString += `
  WHERE pins.id = $${queryParams.length}
  RETURNING *;`;

  db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0];
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
