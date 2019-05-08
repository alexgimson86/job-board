var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema( 
  {
    message: {
      // Full name * every collection will have an according title entry for versatile listing functionality
      type: String,
      required: true,
      trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    }
  }
);

module.exports = MessageSchema;