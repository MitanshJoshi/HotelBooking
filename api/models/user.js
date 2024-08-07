const mongoose = require("mongoose")

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    }
})

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;