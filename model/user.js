let mongoose = require('mongoose');

let userschema = new mongoose.Schema({
    name:{  type: String, required:true, min: 6},
    email: {  type:String, required: true},
    password: {  type: String, required:true},
    date:{ type:Date, default:Date.now() }
});

let User = mongoose.model('users',userschema);

module.exports = User;
