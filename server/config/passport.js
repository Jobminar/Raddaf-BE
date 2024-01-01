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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle Google authentication
      // You can save the user to the database or perform other actions
      return done(null, profile);
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "1176444809982061",
      clientSecret: "fb76085186b82436043ebe7a52266856",
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "picture"], // Adjust fields as needed
    },
    (accessToken, refreshToken, profile, done) => {
      // Connect to your database and perform actions (e.g., find or create user)
      MongoClient.connect(
        process.env.MONGODB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
          if (err) throw err;

          const db = client.db("Raddaf");

          // Find or create user
          db.collection("users").findOneAndUpdate(
            { id: profile.id },
            {
              $setOnInsert: {
                /* Fields to set when creating a new user */
              },
            },
            { upsert: true, returnDocument: "after" }, // Create a new user if not found
            (err, user) => {
              if (err) throw err;
              client.close();
              return done(null, user.value); // Pass the user object to Passport
            }
          );
        }
      );
    }
  )
);

export default passport;
