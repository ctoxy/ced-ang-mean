/*permet d'utiliser express pour le serveur*/
const express = require("express");
/*permet d'utiliser bcryp pour hascher les password*/
const bcrypt = require("bcryptjs");
/*permet d'utiliser jsonwebtoken pour la creation du jeton pour l utilisation de la session*/
const jwt = require("jsonwebtoken");

/*using express router in the backend*/
const router = express.Router();
/* appel du model mongoose */
const User = require("../models/user");
/* route post pour le signup */
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User created",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
              message: 'Invalid authentification credentials!'
          });
        });
    });
});

/* route post qui compare l email et le password d'un utilisateur pour verifier si il est connecté ou pas */
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      /*user not exist in the database*/
      if (!user) {
        return res.status(401).json({
          message:'auth failed'
        });
      }
      fetchedUser = user;
      /*apres avoir verifier l'email existe on compare le has du password si il est identique */
      return bcrypt.compare(req.body.password, user.password);
    })
    /*user exist but password not good*/
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message:'auth failed'
        });
      }
      /*user exist and good password donc creatin du token*/
      /*creation par le serveur du jeton et clé de hashage a changer*/
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
         'secret_this_should_be_longer',
         { expiresIn:'1h'}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      })

    })
    .catch(err => {
      return res.status(401).json({
        message:'Invalid authentification credentials!'
      });
    })
});

module.exports = router;
