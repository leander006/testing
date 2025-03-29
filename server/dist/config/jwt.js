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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const JWT = require("passport-jwt");
const { JWT_SECRET } = require("./server-config");
const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
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
module.exports = { passportAuth };
