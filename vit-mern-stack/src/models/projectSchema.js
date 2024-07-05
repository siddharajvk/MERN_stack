// mongoose.js
const mongoose = require('mongoose');

// Define the project schema
const projectSchema = new mongoose.Schema({
  projectID: {
    type: Number,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Hackathon', 'Capstone', 'Research', 'Personal'],
    required: true
  },
  projectDomain: {
    type: String,
    required: true
  },
  teammates: {
    type: [
      {
        teammateID: {
          type: String,
        },
        name:{
          type: String,
        },
        role: {
          type: String,
          default: null
        }
      }
    ],
    default: []
  },
  requirements: {
    type:[{
      labeltag:{
        type: String,
      },
      labeldescription:{
        type: String,
      }
    }
    ],
    default: []
  },
  creatorID:{
    type: String,
  }

});

// Create models using the project schema
const OngoingProject = mongoose.models.OngoingProject || mongoose.model('OngoingProject', projectSchema);
const CompletedProject = mongoose.models.CompletedProject || mongoose.model('CompletedProject', projectSchema);

module.exports = { OngoingProject, CompletedProject }; // Export both models
