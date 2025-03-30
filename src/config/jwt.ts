import { prismaClient } from "./db";
import JWT from "passport-jwt";
import { JWT_SECRET } from "./server-config";

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export const passportAuth = async (passport: { use: (arg0: any) => void; }) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload: { id: any; }, done: (arg0: null, arg1: boolean | { id: number; username: string; password: string; }) => any) => {
      const user = await prismaClient.user.findFirst({ where: { id: jwt_payload.id } });
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
  );
};
