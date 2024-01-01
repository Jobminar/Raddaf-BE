// passport.js
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import User from "../models/User.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Google Strategy
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID:
        "618877533476-788ma9nfau13uqhun74hlf3borotk660.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            // Add other profile information as needed
          });
          await user.save();
        }

        // Pass the user object to Passport
        return done(null, { ...profile._json, scopes: accessToken.scope });
      } catch (err) {
        console.error(err);
        return done(err, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "1176444809982061",
      clientSecret: "fb76085186b82436043ebe7a52266856",
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "email", "picture"], // Adjust fields as needed
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({
            facebookId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            // Add other profile information as needed
          });
          await user.save();
        }

        // Pass the user object to Passport
        return done(null, { ...profile._json, scopes: accessToken.scope });
      } catch (err) {
        console.error(err);
        return done(err, null);
      }
    }
  )
);

export default passport;
