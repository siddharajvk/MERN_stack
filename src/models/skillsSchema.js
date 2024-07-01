const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skillName:{
        type:String,
        required:true,
        unique:true
    },
    faculties:{
        type:[String],
        default:null,
    },
    students:{
        type:[String],
        default:null,
    }
    
});

const Skill=mongoose.models.Skill || mongoose.model('Skill',skillSchema);

module.exports = Skill;