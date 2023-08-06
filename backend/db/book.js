const mongoose = require("mongoose")
const bookinfo= mongoose.Schema({
title:{
    type:String,
    require:[true,"title is required"]

},
author:{
    type:String,
    require:[true,"author is required"]

},
genre:{
    type:String,
    require:[true,"genre is required"]

},
description:{
    type:String,
    // require:false

},
bookurl:{
    type:String,
    require:[true,"book name require"]

},

},{timestamps: true,})
module.exports =mongoose.model("bookinfo",bookinfo)