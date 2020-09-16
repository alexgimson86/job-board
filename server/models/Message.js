const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const MessageSchema = new Schema({
  from: {
    type: String,
    required: true,
    unique: false,
    dropDups: false,
  },
  to: {
      type: String,
      required: true
  },
  message: {
      type: String,
      required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
    
module.exports = MessageSchema;