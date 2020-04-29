let route = require('express').Router();
let chalk = require('chalk');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');

let bcrypt = require('bcryptjs');
let User = require('../model/user');
let { registervalidation,loginvalidation } = require('../routes/validation');

mongoose.connect('mongodb://localhost/authantication')
    .then(() => {
        console.log(chalk.bgGreenBright.black("connected to mongoose"));
    })
    .catch(() => {
        console.log(chalk.bgRedBright.black("cant not connect to mongoose"));
    });



route.post('/register', async (req, res) => {
  //validation
    let { error } = registervalidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message); 
    }
    
    //hash password
    let salt = await bcrypt.genSalt(10);
     
    let hashpassword = await bcrypt.hash(req.body.password, salt);


    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
    });

    try {
        let saveduser = await user.save();

        res.status(200).send({ user:user._id });

    }
    catch (err) {
        res.status(400).send(err);
    }


});

route.post('/login',async (req,res)=>{
    let { error } = loginvalidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message); 
    }

    let user1 =  await User.findOne({  email: req.body.email });
    if(!user1){
         return res.status(400).send("incorrect email or password please try again");
    }
      //check password:-
      let validpass = await bcrypt.compare(req.body.password , user1.password)
      if(!validpass){
         return res.status(400).send("please enter correct password to login");
      }

      res.send("successfully loggedin");
});




module.exports = route;
