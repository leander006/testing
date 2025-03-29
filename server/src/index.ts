import express from 'express';

export const app = express();
import userRoute from './routes/user-route';
import postRoute from './routes/post-route';
const passport = require("passport");
const { passportAuth } = require("./config/jwt");
const session = require("cookie-session");
const cors = require("cors");
app.use(express.json());
const {
    JWT_SECRET
  } = require("./config/server-config");

app.use(
    cors({
      origin: [URL, "http://localhost:3000"],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
  
  app.use(
    session({
      secret: `${JWT_SECRET}`,
      resave: false,
      saveUninitialized: true,
    })
  );
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

