const {Schema,model} = require('mongoose');
const userSchema = new Schema({
    name :{  
        type: String,
        required: true
       },
       email:{
        type: String,
        required: true,
        unique :true
       },
       password:{
        type: String,
        required: false
       },
       profilePic:{
        type: String,
       },
       history:[{
        command:String,
        date:Date
       }]
    },
 {timestamps : true})
const userModel = model("User",userSchema)
module.exports = userModel