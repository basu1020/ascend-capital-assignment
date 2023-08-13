const mongoose = require('mongoose');
require('dotenv').config()

const dbConnect = async () => {
    try {
        const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TasksApp"
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("Database connected successfully")
    }
    catch (error) {
        console.log(`error: ${error.message}`);
    }
}

module.exports = dbConnect;