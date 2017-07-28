var Customer = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var signUp = (req,res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);
  Customer.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hash
  },(err,result) => {
    if(err) res.send(err)
    res.send(result)
  })
}

var signIn = (req,res) => {
  Customer.findOne({username: req.body.password})
  .then(data => {
    console.log(data);
    if(bcrypt.compareSync(req.body.password, data.password)){
      var token = jwt.sign({username: data.username, email:data.email}, 'SECRET_KEY')
      res.send({
        msg : 'login sukses',
        token: token
      })
    }else {
      res.send('invalid username & password')
    }
  })
}

module.exports = {
  signUp,
  signIn
};