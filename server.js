/*apple du serveur express*/
const app = require("./backend/app");
/*evite les erreurs de lancement du scripts packagejson*/
const debug = require("debug")("node-angular");
/*http natif de nodejs*/
const http = require("http");

/*fonction qui valide que le port recu est le bon*/
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
/*fonction qui trace le type d erreur pour le serveur */
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
/*fonction qui ecoute les requetes entrantes*/
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};
/*variable du port d écoute du serveur */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/* creation du serveur*/
const server = http.createServer(app);
server.on("error", onError);

server.on("listening", onListening);
/* port d ecoute du serveur*/
server.listen(port);
