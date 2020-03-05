const dotenv = require("dotenv");
const process = require("process");

dotenv.config();

module.exports = {
    port: process.env.PORT,
    environment: process.env.NODE_ENV
};