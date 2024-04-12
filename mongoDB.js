const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

async function mongoConnection() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error Connecting to MongoDB');
    })
}

module.exports = mongoConnection;
