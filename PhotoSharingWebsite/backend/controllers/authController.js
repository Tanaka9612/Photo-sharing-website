import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {

    try {

        const {
            username,
            email,
            password,
            password2
        } = req.body;

        // Check required fields
        if (!username || !email || !password || !password2) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check passwords
        if (password !== password2) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "A user with this email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
            
        });
        console.log("registereed")
    } catch (error) {

        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error during registration"
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // Find user
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Create token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        // Send response
        res.status(200).json({
            message: "Login successful",

            token,

            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                bio: user.bio,
                role: user.role
            }
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error during login"
        });
    }
};