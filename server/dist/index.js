"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const user_route_1 = __importDefault(require("./routes/user-route"));
const post_route_1 = __importDefault(require("./routes/post-route"));
const passport = require("passport");
const { passportAuth } = require("./config/jwt");
const session = require("cookie-session");
const cors = require("cors");
exports.app.use(express_1.default.json());
const { JWT_SECRET } = require("./config/server-config");
exports.app.use(cors({
    origin: [URL, "http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));
exports.app.use(session({
    secret: `${JWT_SECRET}`,
    resave: false,
    saveUninitialized: true,
}));
exports.app.use(passport.initialize());
exports.app.use(passport.session());
passportAuth(passport);
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
exports.app.use("/api/user", user_route_1.default);
exports.app.use("/api/post", post_route_1.default);
