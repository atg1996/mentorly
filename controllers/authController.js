const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const {validFieldOptions} = require('../staticData/fields')


const signUpUser = async(req, res) => {

    const { username,
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

        if (username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(409).json({ message: 'Username is already in use' });
            }
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'Email is already in use' });
            }
        }

        if (password === undefined || password === null || password === '') {
            return res.status(400).json({
                message: 'Password is required',
            });
        }

        // Password validation
        if (!/^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/.test(password)) {
            return res.status(400).json({
                message: 'Password must be 6 to 20 characters long, alphanumeric, and contain at least one special character',
            });
        }


        if (!validFieldOptions.includes(field)) {
            return res.status(400).json({ message: 'Invalid field value' });
        }


        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new User({ username,
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

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signUpUser,
    loginUser,
}
