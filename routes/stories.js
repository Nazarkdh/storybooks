const express=require('express');
const mongoose=require('mongoose')
const { isAuthenticated } = require('../helpers/auth');
const router=express.Router();
require('../models/Story');
const Story=mongoose.model('stories');
const {editIcon}=require('../helpers/hbs');

// load stories
router.get('/',(req,res)=>{
  Story.find({status:'public'})
  .populate('user')
  .then(stories=>{
    if(stories){
        const filteredStories=stories.map(story=>{
          return {
            id:story._id,
            title:story.title,
            body: story.body,
            userName:story.user.firstName,
            userLastname:story.user.lastName,
            userImage:story.user.image,
            userID:story.user._id,
            date:story.date
          }
        });
        res.render('stories/index',{stories:filteredStories});
       

    }
    else
    console.log('no story found')
  })
})

// load my stories
router.get('/my',(req,res)=>{
  Story.find({user:req.user.id})
  .populate('user')
  .then(stories=>{
    if(stories){
        const filteredStories=stories.map(story=>{
          return {
            id:story._id,
            title:story.title,
            body: story.body,
            userName:story.user.firstName,
            userLastname:story.user.lastName,
            userImage:story.user.image,
            userID:story.user._id,
            date:story.date
          }
        });
        res.render('stories/index',{stories:filteredStories});
       

    }
    else
    console.log('no story found')
  })
});

// load add story
router.get('/add',isAuthenticated,(req,res)=>{
  res.render('stories/add');
})
// load edit story
router.get('/edit',isAuthenticated,(req,res)=>{
  res.render('stories/edit');
})


// process add story

router.post('/',isAuthenticated,(req,res)=>{
    let allowComments=false;
    if(req.body.allowComments)
      allowComments=true;
    
    
    const {title,status,body}=req.body;
   
    new Story({title,status,allowComments:allowComments,body,user:req.user.id}).save()
    .then(story=>{
      if(story)
        console.log('story saved successbfully')
      else
      console.log('story not saved')
    })

    res.redirect('/stories/mystories')
});

// show/id route
router.get('/show/:id',(req,res)=>{
  const id=req.params.id;
  Story.findOne({_id:id}).
  populate('user').
  populate('comments.commentUser').
  then(story=>{

    const {id,title,body,allowComments,user,date,comments}=story;
    retrivedComments=comments.map(comment=>{
      const {commentBody,commentUser,commentDate}=comment;
      const {firstName,lastName,image}=commentUser
      return {commentBody,
        commentUser:{firstName,lastName,image},
        commentDate
      }
    })

    const story2={id,title,body,allowComments,date,firstName:user.firstName,lastName:user.lastName,image:user.image,userID:user.id,comments:retrivedComments};

    res.render('stories/show',{story:story2});
    

  }).catch(err=>console.log(err))
});


// show edit route 

router.get('/edit/:id',isAuthenticated,(req,res)=>{
  Story.findOne({_id:req.params.id}).
  then(story=>{
    const {id,title,body,allowComments,status,date}=story;
    if(helpers.editIcon(story.user,req.user.id)){
    res.render('stories/edit',{story:{id,title,body,allowComments,status,date}});}
  else
    res.redirect('/')
   
  }).catch(err=>console.log(err));
});


// process edit story

router.put('/:id',isAuthenticated,(req,res)=>{
  Story.findOne({_id:req.params.id}).
  then(story=>{
    let allowComments=false;
    if(req.body.allowComments)
      allowComments=true;
    const {title,status,body}=req.body;
    story.title=title;
    story.status=status;
    story.allowComments=allowComments;
    story.body=body;

    story.save().
    then(story=>{
      res.redirect('/dashboard')
    })
  })
});

router.delete('/:id',isAuthenticated,(req,res)=>{
  Story.deleteOne({_id:req.params.id}).
  then(dat=>{
    console.log('deleted:'+dat[0])
    res.redirect('/dashboard')
  }).catch(err=>console.log(err));
});


// process adding comment

router.post('/comment/:id',(req,res)=>{
  Story.findOne({_id:req.params.id}).
  then(story=>{

  const newComment={
    commentBody:req.body.commentBody,
    commentUser:req.user.id
  }
    story.comments.unshift(newComment);
    story.save().
    then(story=>{
     res.redirect('stories/show/'+story.id);
    })
  })
});

// load stories of specific user
router.get('/user/:id',(req,res)=>{
  Story.find({user:req.params.id,status:'public'})
  .populate('user')
  .then(stories=>{
    if(stories){
        const filteredStories=stories.map(story=>{
          return {
            id:story._id,
            title:story.title,
            body: story.body,
            userName:story.user.firstName,
            userLastname:story.user.lastName,
            userImage:story.user.image,
            userID:story.user._id,
            date:story.date
          }
        });
        res.render('stories/index',{stories:filteredStories});
       

    }
    else
    console.log('no story found')
  })
});



module.exports=router;