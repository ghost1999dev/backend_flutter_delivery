const ProductsController = require("../controllers/productsController");

const passport = require("passport");

module.exports = (app, upload) => {
  //INSERTAR DATOS
  app.post(
    "/api/products/create",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 3),
    ProductsController.create
  );

  //TRAER PRODUCTOS POR CATEGORIAS

  app.get(
    "/api/products/findByCategory/:id_category",

    ProductsController.findByCategory
  );
};
