/*permet d'utiliser express pour le serveur*/
const express = require('express');
/*permet de recuperer le contenu des requetes http via node et express*/
const bodyParser = require("body-parser");
/*Appel middleware mongoose*/
const mongoose = require('mongoose');
/*Appel de la route d'accés a api posts / user*/
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
/* permet la construction de chemin static pour les images */
const path = require("path");
/*creation de l application sous express*/
const app = express();


/*connection a mongoose NOM DE LA COLLECTION DBcedmean a la fin*/
mongoose.connect("mongodb+srv://cedric:KjteQRi0@angular-qxjse.mongodb.net/DBcedmean?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to Database success');

  })
  .catch(() => {
    console.log('connection fail!!!');

  });
/*utilisation de body parser pour parser l information json issue des requetes http*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

/*Cross Origin Ressource Sharing CORS to allow request between client and server on diffirent port*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

/* on renseigne la route associé pour ne pas retranscrire dans la routes/posts.js */
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
/*export du module app*/
module.exports = app;
