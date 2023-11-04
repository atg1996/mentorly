const User = require('../models/userModel');


const getUsersWithPagination = async (req, res) => {
    try {

        const filters = {};

        if (req.query.name) {
            filters.name = req.query.name;
        }

        if (req.query.surname) {
            filters.surname = req.query.surname;
        }

        if (req.query.userType) {
            filters.userType = req.query.userType;
        }

        if (req.query.registrationDate) {
            filters.registrationDate = {
                $gte: new Date(req.query.registrationDate),
                $lt: new Date(req.query.registrationDate + 'T23:59:59.999Z'),
            };
        }


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;


        const query = User.find(filters).select('name surname position registrationDate');

        if (!Object.keys(filters).length) {
            query.skip(startIndex).limit(limit);
        }

        const users = await query.exec();

        const totalUsers = await User.countDocuments(filters);

        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            users,
            totalUsers,
            currentPage: page,
            totalPages,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUsersWithPagination,
};

