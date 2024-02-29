const AddressController = require("../controllers/addressController");
const passport = require("passport");

module.exports = (app) => {
  app.post("/api/address/create", AddressController.create);
  app.get("/api/address/findByUser/:id_user", AddressController.findByUser);
};
