const UsersControllers = require("../controllers/usersController");
const passport = require("passport");

module.exports = (app, upload) => {
  // TRAER DATOS
  app.get("/api/users/getAll", UsersControllers.getAll);

  //TRAER DATOS DEL USUARIO POR ID
  app.get(
    "/api/users/findById/:id",
    passport.authenticate("jwt", { session: false }),
    UsersControllers.findById
  );

  app.get(
    "/api/users/findDeliveryMan",
    UsersControllers.findDeliveryMan
  );

  //INSERTAR DATOS
  app.post(
    "/api/users/create",
    upload.array("image", 1),
    UsersControllers.registerWithImage
  );

  app.post("/api/users/login", UsersControllers.login);

  app.post("/api/users/logout", UsersControllers.logout);

  //ACTUALIZAR DATOS DEL USUARIOS
  app.put(
    "/api/users/update",
    passport.authenticate("jwt", { session: false }),
    upload.array("image", 1),
    UsersControllers.update
  );
};
