"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const post_route_1 = __importDefault(require("./routes/post-route"));
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("./config/jwt");
const cookie_session_1 = __importDefault(require("cookie-session"));
const server_config_1 = require("./config/server-config");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_session_1.default)({ secret: `${server_config_1.JWT_SECRET}` }));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
(0, jwt_1.passportAuth)(passport_1.default);
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
exports.app.use("/api/user", user_route_1.default);
exports.app.use("/api/post", post_route_1.default);
