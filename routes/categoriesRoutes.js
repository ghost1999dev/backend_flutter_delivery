const CategoriesController = require("../controllers/categoriesController");
const passport = require("passport");

module.exports = (app) => {
  /*
    RUTAS PARA TRAER DATOS GET
    */
  app.get(
    "/api/categories/getAll",
    passport.authenticate("jwt", { session: false }),
    CategoriesController.getAll
  );

  /*
   *RUTAS POST
   */

  app.post(
    "/api/categories/create",
    passport.authenticate("jwt", { session: false }),
    CategoriesController.create
  );
};
