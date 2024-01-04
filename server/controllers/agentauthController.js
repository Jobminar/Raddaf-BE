// agentAuthController.js
import passport from "passport";
import argon2 from "argon2";
import Agent from "../models/Agent.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (agentId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = "1h"; // Set the expiration time for the token

  const token = jwt.sign({ agentId }, secret, { expiresIn });
  return token;
};
//signup controller and logic for agent_________________________________
export const signUpAgent = async (req, res) => {
  try {
    const {
      profileImage,
      Username,
      email,
      password,
      Fullname,
      title,
      language,
      verified,
      agentId,
    } = req.body;

    // Check for existing email or username
    const existingAgent = await Agent.findOne({
      $or: [
        { email },
        { Username },
        { googleId: email },
        { facebookId: email },
      ],
    });

    if (existingAgent) {
      return res.status(409).json({ error: "Email or username already taken" });
    }

    // Hash password with Argon2
    const hashedPassword = await argon2.hash(password); // Using default parameters

    // Create new agent
    const newAgent = new Agent({
      profileImage,
      Username,
      email,
      password: hashedPassword,
      Fullname,
      title,
      language,
      verified,
      agentId,
    });

    await newAgent.save();

    res.status(200).json({ message: "Signup successful. Please log in." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//login agent controller
export const loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the agent exists in the database
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password is correct
    const isPasswordValid = await bcryptjs.compare(password, agent.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the agent is verified
    if (!agent.verified) {
      return res.status(401).json({ error: "Agent not verified" });
    }

    // If all checks pass, generate a token and send success response with user data
    const token = generateToken(agent._id);
    const userData = {
      profileImage: agent.profileImage
        ? agent.profileImage.toString("base64")
        : null,
      Username: agent.Username,
      email: agent.email,
      Fullname: agent.Fullname,
      title: agent.title,
      language: agent.language,
      verified: agent.verified,
      agentId: agent.agentId,
    };
    res.status(200).json({ token, userData, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkSession = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Continue with session check
    const agentId = decoded.agentId;

    // Check if the user exists in the database
    const agent = await Agent.findById(agentId);

    if (agent) {
      // User exists, session is still valid
      return res.status(200).json({ message: "Session is still valid." });
    } else {
      // User not found, session is invalid
      return res.status(401).json({ error: "Invalid session" });
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const logout = (req, res) => {
  req.logout();

  // Clear the session and any associated session tokens
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "Logout successful." });
  });
};
