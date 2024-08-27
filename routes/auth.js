const express=require('express');
const passport = require('../config/passport');
const router=express.Router();

router.get("/google",passport.authenticate
  ('google',{scope:['profile','email']}))


const mongoose=require('mongoose');
const User=mongoose.model('users')

router.get("/google/callback",passport.authenticate('google',{failureRedirect:'/',
  successRedirect:'/dashboard'
}))

router.get('/verify',(req,res,next)=>{
  if(req.user){
    console.log('Authenticated')
  }else{
    console.log('no authentication')
  }
  next()
})

router.get('/verify',(req,res)=>{
  if(req.user)
    res.send('verified')
  else
  res.send('not verified')
})


router.get('/',(req,res)=>{
  User.find().then(users=>{
    if(users)
    console.log(users)
  else
    console.log('no users')
  })
})


router.get('/logout',(req,res)=>{
  req.logout(err=>{
    if(err){
      return err;
    }
  });
  res.redirect('/')
})




module.exports=router

