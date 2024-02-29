//FERNANDO BLANCO/////
const Category = require("../models/category");

module.exports = {
  //METODO TRAER TODAS LAS CATEGORIAS
  async getAll(req, res, next) {
    try {
      const data = await Category.getAll();
      console.log(`Categorias ${JSON.stringify(data)}`);
      return res.status(201).json(data);
    } catch (error) {
      console.error(`Error ${error}`);
      return res.status(501).json({
        message: "Hubo un error al tratar de obtener las categorias",
        error: error,
        succes: false,
      });
    }
  },

  //METODO VA A SERVIR PARA CREAR LA CATEGORIA

  async create(req, res, next) {
    try {
      const category = req.body;

      console.log(`Categorias ${category}`);

      const data = await Category.create(category);

      return res.status(201).json({
        message: "Se registro correctamente la categoria",
        succes: true,
        data: data.id,
      });
    } catch (error) {
      console.log(`Error no se pudo crear la categoria ${error}`);

      return res.status(501).json({
        message: "Error no se pudo crear la categoria",
        succes: false,
        error: error,
      });
    }
  },

  //METODOS PARA CREAR UNA CATEGORIA
};
