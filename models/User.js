const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// create Schema

const userSchema=new Schema({
  googleID:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  image:{
    type:String
  }
})


// create collections

mongoose.model('users',userSchema)