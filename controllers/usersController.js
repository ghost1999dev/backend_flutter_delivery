const User = require("../models/user");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const Rol = require("../models/rol");
const storage = require("../utils/cloud_storage");
const { update, findById } = require("../models/user");

//METODO PARA OBTENER TODOS LOS USUARIOS
module.exports = {
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      console.log(`Usuarios: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener los usuarios",
      });
    }
  },

  async findById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await User.findByUserId(id);
      console.log(`Usuario: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener el usuario por id",
      });
    }
  },

  async findDeliveryMan(req, res, next) {
    try {
   
      const data = await User.findDeliveryMen();
      console.log(`Repartidores: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener los repartidores",
      });
    }
  },

  //METODO PARA REGISTRAR UN USUARIO
  async register(req, res, next) {
    try {
      const user = req.body;
      const data = await User.create(user);
      await Rol.create(data.id, 1);
      return res.status(201).json({
        success: true,
        message: "El registro de los usuarios se guardo correctamente",
        data: data.id,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Hubo un error en el registro de los usuarios",
        error: error,
      });
    }
  },

  //REGISTRAR CON UNA IMAGEN
  async registerWithImage(req, res, next) {
    try {
      const user = JSON.parse(req.body.user);
      console.log(`DATOS ENVIADOS DEL USUARIO: ${user}`);
      const files = req.files;
      if (files.length > 0) {
        const pathImage = `image_${Date.now()}`;
        const url = await storage(files[0], pathImage);

        if (url != undefined && url != null) {
          user.image = url;
        }
        //NOMBRE DEL ARCHIVO QUE SE VA ALMACENAR
      }
      const data = await User.create(user);
      await Rol.create(data.id, 1);
      return res.status(201).json({
        success: true,
        message: "El registro de los usuarios se guardo correctamente",
        data: data.id,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Hubo un error en el registro de los usuarios",
        error: error,
      });
    }
  },

  //METODO PARA AUTENTICAR EL LOGIN

  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const myUser = await User.findByEmail(email);

      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: "El email no fue encontrado",
        });
      }

      if (User.isPasswordMatched(password, myUser.password)) {
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKey,
          {
            //CUANDO SE CREA EL TOKEN
            //QUE EXPIRE DENTRO DE UNA HORA
            //expiresIn:(60*2)
          }
        );
        const data = {
          id: myUser.id,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
          roles: myUser.roles,
        };
        await User.updateToken(myUser.id, `JWT ${token}`);
        console.log(`Usuario enviado ${data}`);

        return res.status(201).json({
          success: true,
          data: data,
          message: "El usuario ha sido autenticado",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "La contraseña es incorrecta",
        });
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al momento de hacer login",
        error: error,
      });
    }
  },

  async logout(req, res, next) {
    try {
      const id = req.body.id;
      await User.updateToken(id, null);

      return res.status(201).json({
        success: true,
        message: "La sesion del usuario se ha cerrado correctamente",
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(500).json({
        success: false,
        message: "Error al momento de cerrar sesion",
      });
    }
  },

  //METODO PARA ACTUALIZAR UN USUARIO

  async update(req, res, next) {
    try {
      const user = JSON.parse(req.body.user);
      console.log(`DATOS ENVIADOS DEL USUARIO: ${JSON.stringify(user)}`);
      const files = req.files;
      if (files.length > 0) {
        const pathImage = `image_${Date.now()}`;
        const url = await storage(files[0], pathImage);

        if (url != undefined && url != null) {
          user.image = url;
        }
        //NOMBRE DEL ARCHIVO QUE SE VA ALMACENAR
      }
      await User.update(user);
      // await Rol.create(data.id,1);
      return res.status(201).json({
        success: true,
        message: "Los datos del usuario se actualizaron correctamente",
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Hubo un error en la actualizacion de los usuarios",
        error: error,
      });
    }
  },
};
