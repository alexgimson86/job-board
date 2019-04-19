const mongoose = require('mongoose');

const password = encodeURIComponent('accrocks@2019')

var url = `mongodb://personalprofileuser:${password}@ds223542.mlab.com:23542/personalprofiledb`;

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) throw err;
  console.log('now connected to MongoDB');
});

module.exports = mongoose