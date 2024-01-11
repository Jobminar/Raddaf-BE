import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import User from "../models/User.js";
import pico from "pico";

dotenv.config();

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = "1h"; // Set the expiration time for the token

  const token = jwt.sign({ userId }, secret, { expiresIn });
  return token;
};

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
});

export const signUp = [
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { profileImage, username, email, password, title, fullname } =
        req.body;

      // Check if the profileImage is missing
      if (!profileImage) {
        console.error("No profile image uploaded");
        return res.status(400).json({
          error: "Profile image is required",
        });
      }

      // Check if the username is missing
      if (!username) {
        console.error("No username provided");
        return res.status(400).json({
          error: "Username is required",
        });
      }

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
        // Use pico for image compression
        profileImageBuffer = await pico.compress(req.file.buffer);
      } else {
        // If it's not a Buffer, assume it's a base64 string
        profileImageBuffer = Buffer.from(profileImage, "base64");
      }

      // Continue with local signup (email/password)
      const hashedPassword = await argon2.hash(password);

      const newUser = new User({
        profileImage: profileImageBuffer, // Use the converted Buffer or base64 string here
        username,
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

export const updateProfile = [
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const userEmail = req.body.email; // Assuming you include the user's email in the request body

      const { profileImage, username, password, title, fullname } = req.body;

      // Find the user by email
      const user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user record with the new data
      user.profileImage = profileImage || user.profileImage;
      user.username = username || user.username;

      // Hash the new password with Argon2 if provided
      if (password) {
        const hashedPassword = await argon2.hash(password);
        user.password = hashedPassword;
      }

      user.title = title || user.title;
      user.fullname = fullname || user.fullname;

      // Save the updated user record
      await user.save();

      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];
//login controller
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
          username: user.username,
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
//user profile update
// authController.js
