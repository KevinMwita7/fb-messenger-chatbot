const event = require("events").EventEmitter;
const express = require("express");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const compression = require("compression");
const cors = require("cors");
const { port } = require("./config");
const app = express();

// set the port app will listen on
app.set("port", port);

// register middlewares
app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(errorHandler());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("*", (req, res) => {
    res.status(200).send("Hello there");
});

app.listen(app.get("port"), () => console.log("App listening on port " + app.get("port")));