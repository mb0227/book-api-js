const express =  require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const authConfig = require("../config/auth.config.js"); 

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = new User({ username: req.body.username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Login and get token
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
            
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            authConfig.secret,
            { expiresIn: authConfig.tokenExpiry }
        );

        res.json({ token });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
