const express=require('express');
const mongoose = require('mongoose');
const session=require('express-session')
const ejs=require('ejs');
const exphbs=require('express-handlebars');
const path=require('path');
const bodyParser=require("body-parser");
const methodOverride=require('method-override');




const app=express();


//load key
const key=require('./config/key')

// load routes
const auth=require('./routes/auth')

// load users routes
const users=require('./routes/users')

// load index route
const index=require('./routes/index')

// load stories route
const stories=require('./routes/stories')

// load helpers
const helpers=require('./helpers/hbs');

//load passport
const passport=require('./config/passport');

// set view engine

app.engine('handlebars',exphbs.engine({
  helpers:helpers,
  defaultLayout:'main'
}))
app.set('view engine','handlebars');



// body-parser middleware

// Parse URL-encoded bodies  
app.use(bodyParser.urlencoded({ extended: true }));  
// Parse JSON bodies  
app.use(bodyParser.json());  


app.use(session({
  secret:"no-cat",
  resave:false,
  saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

try {
  
  mongoose.connect(key.mongoURI)
  .then(()=>{
    console.log('Mongoosedb connected successfully')
  }).catch(err=>{
    console.log('Error connecting to MongoDB: '+err)
  })
} catch (error) {
  console.log(error)
}


// set local veriables

app.use((req,res,next)=>{
  let newUser={};
  if(req.user){
     newUser={
      id:req.user.id,
      firstName:req.user.firstName, lastName:req.user.lastName}
  }else newUser=null;
  res.locals.user=newUser;
  next();
})

// Serve static files from the 'public' folder  
app.use(express.static(path.join(__dirname,'public')));

// methode-override middleware

app.use(methodOverride('_method'));

// routes middleware
app.use('/',index)
app.use('/auth',auth)
app.use('/users',users)
app.use('/stories',stories)




const port=process.env.PORT || 5000
app.listen(port,()=>{
   console.log('server started on localhost:'+port)
})
