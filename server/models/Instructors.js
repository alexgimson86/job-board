var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InstructorSchema = new Schema( 
  {
    title: {
      // Full name * every collection will have an according title entry for versatile listing functionality
      type: String,
      required: true,
      trim: true
    },
    institution: {
      type: String,
      required: true,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
      //HASH
    },
    academicFields: {
      type: String,
      required: true,
      trim: true
    }
  }
);

module.exports = InstructorSchema;