const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const User=mongoose.model('users')
// load stories route
require('../models/Story');
const Story=mongoose.model('stories')

const{isAuthenticated}=require("../helpers/auth")

router.get('/',(req,res)=>{
 
  User.findOne().then(users=>{
    if(users)
    console.log(users)
  else
    console.log('no users')
  })
})






module.exports=router;