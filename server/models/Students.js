var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema(
  {
    title: {
      // Full name * every collection will have an according title entry for versatile listing functionality
      type: String,
      //required: true,
      trim: true
    },
    username: {
      type: String,
      trim: true
    },
    firstName: {
      type: String,
      // required: true,
      trim: true
    },
    lastName: {
      type: String,
      // required: true,
      trim: true
    },
    email: {
      type: String,
      // required: true,
      trim: true
    },
    phone: {
      type: String,
      // required: true,
      trim: true
    },
    address: {
      street: {
        type: String,
        // required: true,
        trim: true
      },
      city: {
        type: String,
        // required: true,
        trim: true
      },
      state: {
        type: String,
        // required: true,
        trim: true
      },
      zip: {
        type: String,
        // required: true,
        trim: true
      },
      country: {
        type: String,
        // required: true,
        trim: true
      }
    },
    password: {
      type: String,
      // required: true
      //HASH
    },
    imageUrl: {
      type: String,
    },
    savedJobs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jobs'
    }],
    resumes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resumes'
    }],
    isPrivate: {
      type: Boolean
      // required: true
    }
  }
  
);



module.exports = StudentSchema;