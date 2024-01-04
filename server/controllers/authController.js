import passport from "passport";
import argon2 from "argon2";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//changes done in bcryptjs
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = "1h"; // Set the expiration time for the token

  const token = jwt.sign({ userId }, secret, { expiresIn });
  return token;
};
// Modify your user schema to include the new fields

// Modify your signup function to get the new fields from the request body
export const signUp = async (req, res) => {
  try {
    const { profileImage, Username, email, password, title, fullname } =
      req.body;

    // Check if the email already exists in any authentication provider field
    const existingUser = await User.findOne({
      email,
    });

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

    // Convert base64 image to Buffer
    let imageBuffer;
    if (profileImage && profileImage.startsWith("data:image")) {
      imageBuffer = Buffer.from(profileImage.split(",")[1], "base64");
    }

    // Continue with local signup (email/password)
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    const newUser = new User({
      profileImage,
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
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bcryptjs.compareSync(password, user.password)) {
      // Generate a JWT token
      const token = generateToken(user._id);

      // Send the token to the client along with other user data
      res.status(200).json({
        message: "Login successful.",
        user: {
          id: user._id,
          profileImage: user.profileImage,
          email: user.email,
          Username: user.username,
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

// authController.js

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

export const googleAuthCallback = (req, res) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Google authentication failed." });
    }

    // If authentication is successful, pass the user and profile info to the client
    res.status(200).json({
      message: "Google authentication successful.",
      user: { ...user, password: undefined },
    });
  })(req, res);
};

export const facebookAuthCallback = (req, res) => {
  passport.authenticate("facebook", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Facebook authentication failed." });
    }

    // If authentication is successful, pass the user and profile info to the client
    res.status(200).json({
      message: "Facebook authentication successful.",
      user: { ...user, password: undefined },
    });
  })(req, res);
};
