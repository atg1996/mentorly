const mongoose = require('mongoose');

// Define a custom validation function to check for empty strings
const noEmptyStrings = (value) => {
    return value.trim().length > 0;
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Username cannot be an empty string',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Password cannot be an empty string',
        },
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Name cannot be an empty string',
        },
    },
    surname: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Surname cannot be an empty string',
        },
    },
    isMentor: {
        type: Boolean,
        required: true,
    },
    position: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Position cannot be an empty string',
        },
    },
    field: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Field cannot be an empty string',
        },
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Description cannot be an empty string',
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Email cannot be an empty string',
        },
    },
    education: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Education cannot be an empty string',
        },
    },
    experience: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'Experience cannot be an empty string',
        },
    },
    about: {
        type: String,
        required: true,
        validate: {
            validator: noEmptyStrings,
            message: 'About cannot be an empty string',
        },
    },
    registrationDate: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
