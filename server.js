/*
    SERVIDOR GENERICO NODE.JS
    const express require la dependecia
    const app ejecute el express
    const http require la dependencia http
    const server crear el server
*/
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');


/*
INICIALIZAR FIREBASE
*/

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage:multer.memoryStorage()
})
/*
*RUTAS
*/

const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes')
const orders = require('./routes/ordersRoutes')
const { credential } = require('firebase-admin');


const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.disable('x-powered-by');
app.set('port',port);


/*
*LLAMANDO LAS RUTAS
*/
users(app,upload);
categories(app);
products(app,upload);
address(app)
orders(app)


server.listen(3000,'10.15.2.61' || 'localhost' ,function(){
    console.log('Aplicacion de NodeJs' + process.pid + 'Iniciado....' + port)

});


//ERROR HANDLER

app.use((err, req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app:app,
    server:server
}


// 200 - es que la respuesta exitosa
// 404 - significa que no existe la ruta
// 505 - significa que hay un error de codigo en el servidor





