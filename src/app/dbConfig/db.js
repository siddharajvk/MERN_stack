const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // MongoDB connection URI
        const uri ='mongodb+srv://ayushwaghe23:gzwE5NaXLkBopSLJ@cluster0.snwvfae.mongodb.net/mern?retryWrites=true&w=majority';

        // Options for MongoDB connection
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        // Connect to MongoDB
        await mongoose.connect(uri, options);

        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with error code 1 if connection fails
    }
};

module.exports = { connectDB, isConnected };


