/*permet d'utiliser express pour le serveur*/
const express = require('express');
/*permet de recuperer le contenu des requetes http via node et express*/
const bodyParser = require("body-parser");
/*Appel middleware mongoose*/
const mongoose = require('mongoose');
/*Appel des routes posts*/
const postsRoutes = require("./routes/posts");

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

/*Cross Origin Ressource Sharing CORS to allow request between client and server on diffirent port*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
/*export du module app*/
module.exports = app;
