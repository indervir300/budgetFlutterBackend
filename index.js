const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
// const port = process.env.PORT;
const port = 3000;
const mongo = require('./mongoDB');

try {
    // Connection to MongoDB Database
    mongo();
} catch (error) {
    console.log(`Error establishing connection to MongoDB ${error}`);
}

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/register_user', require('./routes/register'));
app.use('/login_auth', require('./routes/login'));
app.use('/login_status', require('./routes/login_status'));
app.use('/getdata', require('./routes/get_data'));
app.use('/add_payment', require('./routes/add_payment'));
app.use('/getpayments', require('./routes/payments'));
app.use('/gettransactions', require('./routes/totalTransactions'));
app.use('/graphdata', require('./routes/graphData'));
app.use('/deleteaccount', require('./routes/deleteaccount'));

/*
app.listen(port, process.env.HOST_NAME, () => {
    console.log(`Server is running at http://${process.env.HOST_NAME}:${port}`)
}); */

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
});
