const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    name:{
        type: 'string',
    },
    role:{
        type:Number,
        required:true
    },
    userID:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
    },
    school:{
        type:String,
    },
    branch:{
        type:String,
    },
    degree:{
        type:String,
    },
    completedProjects:{
        type:[Number]
    },
    ongoingProjects:{
        type:[Number]
    },
    skills:{
        type:[String]
    },
    
});

const UserProfile=mongoose.models.UserProfile || mongoose.model('UserProfile',userProfileSchema);

module.exports = UserProfile;