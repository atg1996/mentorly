const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const signUpUser = async(req, res) => {

    const { login,
        password,
        email,
        name,
        surname,
        isMentor,
        position,
        field,
        description,
        education,
        experience,
        about
    } = req.body;


    try {

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }


        const existingUser = await User.findOne({ $or: [{ login }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new User({ login,
            password, name, surname, isMentor,
            position, field, description, email,
            education, experience, about });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async(req,res) => {

    const { login, password } = req.body;

    try {
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signUpUser,
    loginUser,
}
