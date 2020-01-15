/*permet d'utiliser express pour le serveur*/
const express = require('express');
/*permet de recuperer le contenu des requetes http via node et express*/
const bodyParser = require("body-parser");
/*Appel middleware mongoose*/
const mongoose = require('mongoose');
/*Appel du model de Mongoose Post*/
const Post = require('./models/post');
/*creation de l application sous express*/
const app = express();


/*connection a mongoose*/
mongoose.connect("mongodb+srv://cedric:KjteQRi0@angular-qxjse.mongodb.net/test?retryWrites=true&w=majority")
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

/*REQUETE POST FOR POST*/
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

/*REQUETE GET FOR POST*/
app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});
/*export du module app*/
module.exports = app;
