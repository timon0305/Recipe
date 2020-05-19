require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require('./Router/user.router');

app.use('/api/users', userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running at`, process.env.APP_PORT)
});