const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

import prisma from "lib/prisma";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email: any, password: any, cb: any) {
      console.log("err");
      //Assume there is a DB module pproviding a global UserModel
      return prisma.user
        .findFirst({ where: { email, password } })
        .then((user) => {
          console.log(user);
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }

          return cb(null, user, {
            message: "Logged In Successfully",
          });
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    function (jwtPayload: any, cb: any) {
      console.log("err1");
      //find the user in db if needed
      return prisma.user
        .findUnique({ where: { id: jwtPayload.id } })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
