/*permet de valider la protection des routes et verifier que le token est bien associé au route */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next ) => {
  try {
    const token = req.headers.authorisation
    .split(" ")[1]; /* espace aprés le token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…zU4fQ.6ed1dkdcsYsMEUf3uU5ub7RfJ31zRWtHJrd6Y_sQ7gU"*/
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (error) {
    res.status(401).json({message:" Auth Failed! your are not authentificated"});
  }

};
