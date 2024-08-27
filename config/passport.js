const passport=require('passport');
const { clientId, clientSecret } = require('./key');
const { default: mongoose } = require('mongoose');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
require('../models/User')
const User=mongoose.model('users')

passport.use(new GoogleStrategy({
  clientID:clientId,
  clientSecret:clientSecret,
  callbackURL:'/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
  // save data to db
 
  let image=profile.photos[0].value
  image=image.replace('s96','s500')

  const newUser={
   firstName:profile.name.givenName,
   lastName:profile.name.familyName,
   email:profile.emails[0].value,
   googleID:profile.id,
   image:image
  }


  User.findOne({googleID:profile.id})
  .then(user=>{
    if(user)
        done(null,user)
    
    else{
    new User(newUser).save()
    .then(user=>{
       done(null,user)
   
    })}
  })

}))

passport.serializeUser((user,done)=>{
  done(null,user.id)
})
passport.deserializeUser((id,done)=>{
 User.findById(id).then(user=>done(null,user))
})

module.exports=passport;
 