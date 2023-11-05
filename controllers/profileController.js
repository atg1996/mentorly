const User = require('../models/userModel');
const validator = require('validator');
const bcrypt = require("bcryptjs");

const validFieldOptions = [
    "Software Engineer",
    "Web Developer",
    "Data Scientist",
    "Graphic Designer",
    "Nurse",
    "Accountant",
    "Marketing Manager",
    "Architect",
    "Teacher",
    "Lawyer",
    "Electrician",
    "Mechanical Engineer",
    "Pharmacist",
    "Chef",
    "Journalist",
    "King of Gondor"
];

const editPersonalInfo = async (req, res) => {
    // Extract the user ID from the token
    const userId = req.userId;

    let {
        username,
        password,
        email,
        name,
        surname,
        position,
        field,
        description,
        education,
        experience,
        about,
    } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Email validation
        if (email) {
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'Email is already in use' });
            }
        }

        // Password validation
        if (password) {
            if (!/^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/.test(password)) {
                return res.status(400).json({
                    message:
                        'Password must be 6 to 20 characters long, alphanumeric, and contain at least one special character',
                });
            }
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }


        if (username && username !== user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(409).json({ message: 'Username is already in use' });
            }
        }


        if(field) {
            if (!validFieldOptions.includes(field)) {
                return res.status(400).json({ message: 'Invalid field value' });
            }
        }

        // Update the user's information
        if (username) user.username = username;
        if (password) user.password = password;
        if (email) user.email = email;
        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (position) user.position = position;
        if (field) user.field = field;
        if (description) user.description = description;
        if (education) user.education = education;
        if (experience) user.experience = experience;
        if (about) user.about = about;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    editPersonalInfo,
};

