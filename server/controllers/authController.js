import argon2 from "argon2";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = "1h"; // Set the expiration time for the token

  const token = jwt.sign({ userId }, secret, { expiresIn });
  return token;
};

export const signUp = async (req, res) => {
  try {
    const { profileImage, Username, email, password, title, fullname } =
      req.body;

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

    // Convert base64 image to Buffer
    let imageBuffer;
    if (profileImage && profileImage.startsWith("data:image")) {
      imageBuffer = Buffer.from(profileImage.split(",")[1], "base64");
    }

    // Continue with local signup (email/password)
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      profileImage: imageBuffer, // Use the converted Buffer here
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

    if (user && (await argon2.verify(user.password, password))) {
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

// Rest of the code remains unchanged
