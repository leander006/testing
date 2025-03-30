"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTGRESS_URI = exports.PORT = exports.JWT_SECRET = void 0;
require("dotenv").config();
exports.JWT_SECRET = process.env.JWT_SECRET || "secret";
exports.PORT = process.env.PORT;
exports.POSTGRESS_URI = process.env.POSTGRESS_URI;
