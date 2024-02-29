const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Keys = require('./keys');

module.exports = function(passport) {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id, (err, user) => {
          if (err) {
              return done(err, false);
          } 
          if (user) {
              return done(null, user);
          }
          else {
              return done(null, false);
          } 
        })
    }))

}
/*const decodeToken = (token) => {
  return jwt.verify(token, keys.secretOrKey);
};

const authenticateToken = (req, res) => {
  // Por si no tiene los headers o el de authorization, returna
  if (!req.headers || !req.headers.authorization) return;
  // FullToken is "JWT sdADADASdasdADADAdadADSAsd"
  const fullToken = req.headers.authorization;
  // Token is "sdADADASdasdADADAdadADSAsd"
  const token = fullToken.split(" ")[1];
  // Decodifica el token y da la data
  const user = decodeToken(token);
  // Verifica si el usuario existe
  User.findById(user.id, (err, data) => {
    if (err) {
      return done(err, false);
    }

    if (data) {
      return null, data;
    } else {
      return done(null, false);
    }
  });
};

module.exports = authenticateToken;*/
