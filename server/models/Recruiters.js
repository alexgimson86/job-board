var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecruiterSchema = new Schema(
  {
    title: {
      // Full name * every collection will have an according title entry for versatile listing functionality
      type: String,
      required: true,
      trim: true
    },
    companyName: {
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
    jobsPosted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jobs'
    },    
    url: {
      type: String,
      required: true
    }
  }
);

module.exports = RecruiterSchema;