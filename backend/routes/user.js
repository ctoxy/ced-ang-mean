/*permet d'utiliser express pour le serveur*/
const express = require("express");

/*using express router in the backend*/
const router = express.Router();
/* appel du model mongoose */
const User = require("../models/user");
/* route post pour le signup */
router.post("/signup" , (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  })
});

module.exports = router
