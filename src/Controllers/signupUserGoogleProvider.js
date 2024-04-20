import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import User from "../Models/User-model.js";

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({
            email: profile.emails[0].value,
            googleId: profile.id,
            user: {
              name: profile.displayName,
              email: profile.emails[0].value,
              profileImage: profile.photos[0].value,
              provider: "google",
            },
          });
          user = await newUser.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});
export default passport;
