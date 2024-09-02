const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const EMAIL = "admin@codesfortomorrow.com";
const PASSWORD = "Admin123!@#";

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (email === EMAIL && password === PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
};
