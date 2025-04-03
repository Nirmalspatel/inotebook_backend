const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://nirmalspatel3003:a5vYXCItyQZv0E5z@nirmal.jdcrs.mongodb.net/"; // Use a specific database name like 'test'

const connectaTomongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
           useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = connectaTomongo;
