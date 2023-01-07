const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/AuthModel");

let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    if (jwt_payload) {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        let tokenData = {
          _id: user._id,
          email: user.email,
          userName: user.userName,
        };
        return done(null, tokenData);
      } else {
        return done(null, false);
      }
    }
  })
);
