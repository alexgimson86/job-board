var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrganizationSchema = new Schema(
  {
    title: {
      // Organization name * every collection will have an according title entry for versatile listing functionality
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true
    },
    companyDesc: { 
      //What does the company do
      type: String,
      required: true
    },
    employmentDesc: {
      //Company culture | How is it to work here
      type: String,
      required: true
    },
    industry: {
      //What industries do we operate in
      //This may need to be a collection 
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    recruiters: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruiters'
    },
    location: {

    }
  }
)

module.exports = OrganizationSchema;