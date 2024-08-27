const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
require('../models/Story')
const Story=mongoose.model('stories')

const {isAuthenticated,isNotGuest}=require('../helpers/auth');

//  / route

router.get('/',isNotGuest,(req,res)=>{
  res.render('index/welcome')
});


// dashboard route

router.get("/dashboard",isAuthenticated,(req,res)=>{
  Story.find({user:req.user.id}).
  then(stories=>{
    stories=stories.map(story=>{
      const {title,status,date,id }=story
      return {title,status,date,id} ;
    })

    
    res.render('index/dashboard',{stories})
  })
})

// about route

router.get("/about",(req,res)=>{
  res.render('index/about')
})



module.exports=router;