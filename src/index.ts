import express from 'express';
import userRoute from './routes/user-route';
import postRoute from './routes/post-route';
import passport from "passport";
import { passportAuth } from "./config/jwt";
import session from "cookie-session";
import { JWT_SECRET } from "./config/server-config";

export const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use( session({ secret: `${JWT_SECRET}`}));

app.use(passport.initialize());
app.use(passport.session());
passportAuth(passport);

passport.serializeUser(function (user: any, cb: (arg0: null, arg1: any) => void) {
  cb(null, user);
});
passport.deserializeUser(function (obj: any, cb: (arg0: null, arg1: any) => void) {
  cb(null, obj);
});


app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

