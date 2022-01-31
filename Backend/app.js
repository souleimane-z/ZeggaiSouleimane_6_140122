/*
    Imports
*/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitize = require ('express-mongo-sanitize');
const sauceRoutes = require('./routes/Sauce');
const userRoutes = require('./routes/User');
const path = require('path');
const app = express();

/*
    DATABASE 
    Protect the connexion with an .env file where we find the information of identification to MongoDB Atlas
*/
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.MONGO_DB_LINK}?retryWrites=true&w=majority`, 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(helmet());      // Securize express apps by setting various HTTP headers


app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});


app.use(express.json());        // Parser


app.use(mongoSanitize());       // Protection against injection attacks


app.use('/images', express.static(path.join(__dirname, 'images')));     // Images management

// Routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


/*
    Exports
*/
module.exports = app;