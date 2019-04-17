var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SkillSchema = new Schema(
  {
    title: {
      // Skill title * every collection will have an according title entry for versatile listing functionality
      type: String,
      required: true,
      trim: true
    },
    skillDesc: {
     type: String,
     required: true 
    }
  }
) 



module.exports = SkillSchema;