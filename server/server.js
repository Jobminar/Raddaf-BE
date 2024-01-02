// index.js (main file)
import jwt from "jsonwebtoken";
import expressSession from "express-session";
import express from "express";
import mongoose from "mongoose";
import { json } from "express";
import cors from "cors";
import { urlencoded } from "express";
import passport from "passport";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import agentAuthRoutes from "./routes/agentauthRoutes.js";
import session from "express-session";
import Agent from "./models/Agent.js";

// Load environment variables early
dotenv.config();

// Check for MongoDB URL
if (!process.env.MONGODB_URL) {
  console.error(
    "MongoDB URL is not defined. Check your environment variables."
  );
  process.exit(1);
}

// Create the Express app
const app = express();

// Set view engine, middleware, and routes
app.set("view engine", "ejs");
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 15, // Expire session after 15 minutes
    },
  })
);

// Middleware to check session expiration
app.use((req, res, next) => {
  if (req.session && req.session.cookie && req.session.cookie.expires) {
    const now = new Date();
    if (now > req.session.cookie.expires) {
      // Session has expired
      return res.status(401).json({ error: "Session expired" });
    }
  }
  next();
});

app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport for both users and agents
passport.initialize();
passport.session();

// Passport serialization and deserialization for users
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Passport serialization and deserialization for agents
passport.serializeUser((agent, done) => {
  done(null, agent.id);
});

passport.deserializeUser((id, done) => {
  Agent.findById(id, (err, agent) => {
    done(err, agent);
  });
});

// Use authentication routes for users
app.use("/auth", authRoutes);

// Use authentication routes for agents
app.use("/agent-auth", agentAuthRoutes);

// Connect to MongoDB efficiently changed url to string
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

connectToMongo();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(`http://localhost:${PORT}`);
