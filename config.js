const dotenv = require("dotenv");
const process = require("process");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    ENVIRONMENT: process.env.NODE_ENV,
    VERIFICATION_TOKEN: process.env.VERIFICATION_TOKEN
};