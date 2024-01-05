import argon2 from "argon2";
import Agent from "../models/Agent.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import User from "../models/User.js";
dotenv.config();

const generateToken = (agentId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = "1h"; // Set the expiration time for the token

  const token = jwt.sign({ agentId }, secret, { expiresIn });
  return token;
};
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const signUp = [
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { Username, email, password, title, fullname } = req.body;

      // Check if the email already exists in any authentication provider field
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          error: "Email already taken",
        });
      }

      // Ensure that password is provided
      if (!password) {
        return res.status(400).json({
          error: "Password is required",
        });
      }

      let profileImageBuffer;

      // Check if the file is a Buffer
      if (req.file && req.file.buffer) {
        profileImageBuffer = req.file.buffer.toString("base64");
      } else {
        // If it's not a Buffer, assume it's a base64 string
        profileImageBuffer = req.body.profileImage;
      }

      // Continue with local signup (email/password)
      const hashedPassword = await argon2.hash(password);

      const newUser = new User({
        profileImage: profileImageBuffer, // Use the converted Buffer or base64 string here
        Username,
        email,
        password: hashedPassword,
        title,
        fullname,
      });

      await newUser.save();

      // Provide success message
      res.status(200).json({ message: "Signup successful. Please log in." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await argon2.verify(user.password, password))) {
      // Generate a JWT token
      const token = generateToken(user._id);

      // Send the token to the client along with other user data
      res.status(200).json({
        message: "Login successful.",
        user: {
          id: user._id,
          profileImage: user.profileImage,
          Username: user.username,
          email: user.email,
          password: user.password,
          title: user.title,
          fullname: user.fullname,
        },
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials." });
    }
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
    const userId = decoded.userId;

    // Check if the user exists in the database
    const user = await User.findById(userId);

    if (user) {
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
