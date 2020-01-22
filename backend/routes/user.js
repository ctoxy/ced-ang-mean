/*permet d'utiliser express pour le serveur*/
const express = require("express");
/*permet d'utiliser bcryp pour hascher les password*/
const bcrypt = require("bcrypt");

/*using express router in the backend*/
const router = express.Router();
/* appel du model mongoose */
const User = require("../models/user");
/* route post pour le signup */
router.post("/signup", (req, res, next) => {
  bcrypt.hast(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: "User created",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

module.exports = router;
