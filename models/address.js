const db = require("../config/config");

const Address = {};
/**
 *
 * @param {*} address
 * @returns
 * ? CREAR UNA DIRECCION
 */
Address.create = (address) => {
  const sql = `
        INSERT INTO
            address(
                id_user,
                address,
                neighborhood,
                lat,
                lng,
                created_at,
                updated_at
            )
        VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id_user
    `;

  return db.oneOrNone(sql, [
    address.id_user,
    address.address,
    address.neighborhood,
    address.lat,
    address.lng,
    new Date(),
    new Date(),
  ]);
};

/**
 * TRAER TODAS LAS DIRECCIONES POR USUARIO
 */

Address.findByUser = (id_user) => {
  const sql = `
        SELECT
            id,
            id_user,
            address,
            neighborhood,
            lat,
            lng
        FROM
            address
        WHERE 
            id_user = $1
    `;
  return db.manyOrNone(sql, id_user);
};

module.exports = Address;
