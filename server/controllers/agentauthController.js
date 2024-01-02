// agentAuthController.js
import passport from "passport";
import bcryptjs from "bcryptjs";
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

export const signUpAgent = async (req, res) => {
  try {
    const {
      Username,
      email,
      password,
      Fullname,
      title,
      language,
      verified,
      agentId,
    } = req.body;

    // Check if the email or username already exists in any authentication provider
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

    // Continue with local signup (email/password)
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    const newAgent = new Agent({
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

    // Provide success message
    res.status(200).json({ message: "Signup successful. Please log in." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Other agent authentication controllers here...

export const checkSession = async (req, res) => {
  // Same as the checkSession function in authController.js
  // Adjust as needed for agent-specific logic
};

export const logout = (req, res) => {
  // Same as the logout function in authController.js
  // Adjust as needed for agent-specific logic
};
