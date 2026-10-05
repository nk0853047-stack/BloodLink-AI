const mongoose=require('mongoose');module.exports=mongoose.model('Hospital',new mongoose.Schema({name:String,city:String,status:String,oNegativeUnits:Number,contact:String},{timestamps:true}));
