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
       plan: {
        type: String,
        enum: ["free", "pro", "enterprise"],
        default: "free"
       },
       monthlyUsage: {
        type: Number,
        default: 0
       },
       privacy: {
        autoDeleteFiles: {
          type: Boolean,
          default: false
        }
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
