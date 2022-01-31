const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 x 60 millisecondes multiplié par 1000 pour convertir en secondes
  max: 3, // le nombre d'essais de connexion accordé aux utilisateurs
});


module.exports = {limiter}

