"use strict";
require("dotenv").config();
module.exports = {
    PORT: process.env.PORT || 3000,
    POSTGRESS_URI: process.env.POSTGRESS_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};
