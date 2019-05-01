var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecruiterSchema = new Schema(
  {
    title: {
      // Full name * every collection will have an according title entry for versatile listing functionality
      type: String,
      required: false,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: false,
      trim: true
    },
    firstName: {
      type: String,
      required: false,
      trim: true
    },
    lastName: {
      type: String,
      required: false,
      trim: true
    },
    email: {
      type: String,
      required: false,
      trim: true
    },
    password: {
      type: String,
      required: false
      //HASH
    },
    jobsPosted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jobs'
    },    
    url: {
      type: String,
      required: false
    }
  }
);

module.exports = RecruiterSchema;