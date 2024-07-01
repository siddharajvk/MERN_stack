const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    projectID: {
        type: String,
    },
    applierID: {
        type: String,
    },
    creatorID: {
        type: String,
    },
    role: {
        type: String,
    },
    coverLetter: {
        type: String,
    },
    applicationID: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
            return new mongoose.Types.ObjectId();
        },
    }
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

module.exports = Application;

// In this line of code, the mongoose.models.Application is checking if a model named Application already exists in the 
// Mongoose models registry. If it does exist, it assigns that existing model to the variable Application. If it doesn't exist, 
// it creates a new model named Application using mongoose.model('Application', applicationSchema).
