const db = require("../config/config");
const OrderHasProduct = {};
OrderHasProduct.create = async (id_order, id_product, quantity) => {
  const sql = `
    INSERT INTO
         order_has_products(
            id_order,
            id_product,
            quantity,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5)
    `;

  try {
    const result = await db.none(sql, [
      id_order,
      id_product,
      quantity,
      new Date(),
      new Date(),
    ]);
    return result;
  } catch (error) {
    console.log("Ha ocurrido un error" + error.message);
  }
};

module.exports = OrderHasProduct;
