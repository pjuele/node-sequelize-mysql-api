// Before any requires, make sure we have our ENV vars (for all sub-modules to see):
const { logger, log, sep } = require("./helpers/logging");
const EV_ENV_INIT = "🤖 API";

sep();
log(`NODE_ENV is '${process.env.NODE_ENV}'.`, EV_ENV_INIT);

// If we are not in 'production' environment, we need to get environment vars from dotenv:
if (process.env.NODE_ENV !== "production") {
  // logger.info('Assuming DEV env. - Using dotenv!');
  log("Assuming DEV env. - Using dotenv!", EV_ENV_INIT);
  require("dotenv").config();
}

//_____________________________________________________
// Main require section (after ENV vars):
const express = require("express"); // TODO *** these generic ones from node_modules can go up top!
const helmet = require("helmet");
// var bodyParser = require('body-parser');

const userRouter = require("./routes/UserRouter.js");

//_____________________________________________________
// Initialise Express App and middlewares:
var app = express(); // only really needed if the server has a web front-end. Else socket.io is enough!
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Default and router-managed routes:
app.get("/", (req, res) => {
  res.json({ message: "This is not here." });
});
// User API:
app.use("/user", userRouter);

// Error handler middleware:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Fire up the HTTP server:
var server = app.listen(process.env.SERVER_PORT, () => {
  sep();
  log(`listening @ port ${process.env.SERVER_PORT} 📡`, EV_ENV_INIT);
  sep();
}); // start the web server AND
// pull http server out of the express app object so io can use it
// If there was no server web front-end (just socket listening)
// we could just initialise the socket.io object passing in the
// port and options instead of server object and options!
