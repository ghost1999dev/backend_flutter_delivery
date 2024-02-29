const { json } = require("express");
const Order = require("../models/order");
const OrderHasProduct = require("../models/order_has_products");

module.exports = {
  async findByStatus(req, res, next) {
    try {
      const status = req.params.status;

      const data = await Order.findByStatus(status);
      console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(501).json({
        message: "Hubo un error al traer las ordenes por estados",
        error: error,
        success: false,
      });
    }
  },

  async findByDeliveryAndStatus(req, res, next) {
    try {
      const id_delivery = req.params.id_delivery;
      const status = req.params.status;

      const data = await Order.findByDeliveryAndStatus(id_delivery, status);
      console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(501).json({
        message: "Hubo un error al traer las ordenes por estados",
        error: error,
        success: false,
      });
    }
  },
  async create(req, res, next) {
    try {
      let order = req.body;
      order.status = "PAGADO";

      const data = await Order.create(order);
      for (const product of order.products) {
        await OrderHasProduct.create(data.id, product.id, product.quantity);
      }

      return res.status(200).json({
        success: true,
        message: "Orden creada correctamente",
        data: data,
      });
    } catch (error) {
      return res.status(501).json({
        message: "Ha ocurrido un error al crear una orden",
        error: error,
        success: false,
      });
    }
  },

  async updateToDispatched(req, res, next) {
    try {
      let order = req.body;
      order.status = "DESPACHADO";
      console.log(JSON.stringify(order));
      Order.update(order);
      return res.status(200).json({
        success: true,
        message: "Orden se actualizo correctamente",
      });
    } catch (error) {
      return res.status(501).json({
        message: "Ha ocurrido un error al actualizar la orden",
        error: error,
        success: false,
      });
    }
  },
  async updateToOnTheWay(req, res, next) {
    try {
      let order = req.body;
      order.status = "EN CAMINO";
      console.log(JSON.stringify(order));
      Order.update(order);
      return res.status(200).json({
        success: true,
        message: "Orden se actualizo correctamente",
      });
    } catch (error) {
      return res.status(501).json({
        message: "Ha ocurrido un error al actualizar la orden",
        error: error,
        success: false,
      });
    }
  },
  async updateToDelivery(req, res, next) {
    try {
      let order = req.body;
      order.status = "ENTREGADO";
      console.log(JSON.stringify(order));
      Order.update(order);
      return res.status(200).json({
        success: true,
        message: "La orden se actualizo correctamente",
      });
    } catch (error) {
      return res.status(501).json({
        message: "Ha ocurrido un error al actualizar la orden",
        error: error,
        success: false,
      });
    }
  },
};
