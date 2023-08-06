const mongoose = require("mongoose")

const loginSchema = mongoose.Schema({
    mobile: {
        require: [true, "User Email required"],
        unique: [true, "that Email is taken. try another"],
        type: String

    },
    password: {
        require: [true, "Password  required"],
        type: String
    },
    name:{
        require: [true, "name  required"],
        type:String
    },
    email:{
        require: [true, "email  required"],
        type:String
    },
    country:{
        require: [true, "country  required"],
        type:String
    },
   
    verify: {
        require: [true, "verify  required"],
        type:Boolean
    },
    token:[],
    
  
})

module.exports = mongoose.model("Login_Details", loginSchema)