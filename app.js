require('dotenv').config();

//application
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;;

//router
const authenticationRouter = require('./routers/authRouter');
const userListRouter = require('./routers/userListRouter');
const userProfileRouter = require('./routers/userProfileRouter')

//db connection
const connectDB = require('./db/connect');

//middleware
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('trust proxy', 1);
app.use(cors());
app.use(helmet());
app.use(xss());

app.use('/api/v1/auth', authenticationRouter);
app.use('/api/v1/profile', userProfileRouter);
app.use('/api/v1/users', userListRouter);


app.get('/', (req, res) => {
    res.send('this route returns 200');
});


const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
