var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JobSchema = new Schema(
{
  title: {
    // Job title * every collection will have an according title entry for versatile listing functionality
    type: String,
    required: true,
    trim: true
  },
  // companyId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Employer'
  // },                            WILL PUT TO USE LATER
  jobDescription: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String]
  },
  timePosted: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  displayCompany: {
    type: Boolean
  },
  salary: {
    type: String,
    required: true
  },
  salaryPeriod: {
    type: String
  },
  recruiterUsername: {
    type: String,
    required: false
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students'
  }
});

module.exports = JobSchema;