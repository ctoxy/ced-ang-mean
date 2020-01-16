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
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

/*REQUETE GET FOR POST attention sous mongo _id soit map soit modif du model cote front*/
app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });

});

/*REQUETE delete FOR POST via le parametre dynamique id*/
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Posts was deleted!"
      });
    })
});

/*export du module app*/
module.exports = app;
