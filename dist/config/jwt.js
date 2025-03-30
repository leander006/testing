"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportAuth = void 0;
const db_1 = require("./db");
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const server_config_1 = require("./server-config");
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: server_config_1.JWT_SECRET,
};
const passportAuth = (passport) => __awaiter(void 0, void 0, void 0, function* () {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.prismaClient.user.findFirst({ where: { id: jwt_payload.id } });
        if (!user) {
            return done(null, false);
        }
        else {
            return done(null, user);
        }
    })));
});
exports.passportAuth = passportAuth;
