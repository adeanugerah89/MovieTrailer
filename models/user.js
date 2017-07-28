
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String
});

var Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;