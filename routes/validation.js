let joi = require('joi');

let registervalidation = (data)=>{
    let schema = {
        name: joi.string().min(3).required(),
        email: joi.string().required().email(),
        password: joi.string().required().min(6)
    }
  return  joi.validate(data,schema);
   
}

let loginvalidation = (data)=>{
    let schema = {
        email: joi.string().required().email(),
        password: joi.string().required().min(6)
    }
  return  joi.validate(data,schema);
   
}

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;
