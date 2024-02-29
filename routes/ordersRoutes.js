const OrderController = require("../controllers/ordersController");
const passport = require("passport");

module.exports = (app) => {
  app.get("/api/orders/findByStatus/:status", OrderController.findByStatus);
  app.get(
    "/api/orders/findByDeliveryAndStatus/:id_delivery/:status",
    OrderController.findByDeliveryAndStatus
  );
  app.post("/api/orders/create", OrderController.create);
  app.put("/api/orders/updateToDispatched", OrderController.updateToDispatched);
  app.put("/api/orders/updateToOnTheWay", OrderController.updateToOnTheWay);
  app.put("/api/orders/updateToDelivery", OrderController.updateToDelivery);
};
