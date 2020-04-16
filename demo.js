let express = require('express');
let chalk = require('chalk');
let bodyparser = require('body-parser');
let authanticationroute = require('./routes/auth'); 

let app = express();
app.use(express.json());
app.use('/api/user',authanticationroute);

let port = 3000;

app.listen(port,()=>{
   console.log(  chalk.bgBlue.black("up & running"));
});