"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const passport_1 = __importDefault(require("passport"));
const authenticate = (req, res, next) => {
    passport_1.default.authenticate("jwt", (error, user, data) => {
        if (error)
            next(error);
        if (!user) {
            return res.status(404).json({
                message: "Unauthorized access no token",
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.authenticate = authenticate;
