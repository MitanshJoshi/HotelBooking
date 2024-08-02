const mongoose = require("mongoose")

const {Schema} = mongoose;

const placeSchema = new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    title:{
        type:String,
    },
    address:{
        type:String,
    },
    photos:{
        type:[String],
    },
    description:{
        type:String,
    },
    perks:{
        type:[String],
    },
    extrainfo:{
        type:String,
    },
    checkIn:{
        type:Number,
    },
    checkOut:{
        type:Number,
    },
    maxGuests:{
        type:Number,
    },
    price:{
        type:Number,
    }
})

const PlaceModel = mongoose.model("Place",placeSchema)

module.exports = PlaceModel;