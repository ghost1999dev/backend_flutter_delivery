const Product = require("../models/product");
const storage = require("../utils/cloud_storage");
const asyncForeach = require("../utils/async_foreach");

module.exports = {
  //BUSCAR CATEGORIAS PRODUCTOS POR CATEGORIAS

  async findByCategory(req, res, next) {
    try {
      const id_category = req.params.id_category;
      const data = await Product.findByCategory(id_category);

      return res.status(200).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);

      return res.status(501).json({
        message: `Error al listar los productos ${error}`,
        success: false,
        error: error,
      });
    }
  },

  async create(req, res, next) {
    let product = JSON.parse(req.body.product);
    console.log(`Product ${JSON.stringify(product)}`);

    const files = req.files;
    let inserts = 0;

    if (files.length === 0) {
      return res.status(501).json({
        message: "Error al registrar el producto no tiene imagen",
        success: false,
      });
    } else {
      try {
        const data = await Product.create(product);
        product.id = data.id;
        const start = async () => {
          await asyncForeach(files, async (file) => {
            const pathImage = `image_${Date.now()}`;
            const url = await storage(file, pathImage);

            if (url !== undefined && url !== null) {
              if (inserts == 0) {
                product.image1 = url; //SE REGISTRA IMAGEN1
              } else if (inserts == 2) {
                product.image2 = url; //SE REGISTRA IMAGEN2
              } else if (inserts == 3) {
                product.image3 = url; //SE REGISTRA IMAGEN3
              }
            }

            await Product.update(product);
            inserts = inserts + 1;

            if (inserts == files.length) {
              return res.status(201).json({
                success: true,
                message: "El prodcuto se ha registrado correctamente",
              });
            }
          });
        };
        start();
      } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
          message: `Error al registrar el producto ${error}`,
          success: false,
          error: error,
        });
      }
    }
  },
};
