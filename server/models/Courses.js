var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema( 
  {
    title: {
      // Course title * every collection will have an according title entry for versatile listing functionality
      type: String,
      required: true,
      trim: true
    },
    courseDesc: {
      type: String,
      required: true
    },
    skills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skills'
    }
  }
)

module.exports = CourseSchema;