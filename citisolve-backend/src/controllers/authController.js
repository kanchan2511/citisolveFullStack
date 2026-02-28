import User from "../models/User.js"
import jwt from "jsonwebtoken"

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );
};

//Register
export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({
            name,
            email,
            password,
            role: "citizen",
        });
        const token = generateToken(user);
        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMe = async (req,res) => {
    res.json(req.user);
}
