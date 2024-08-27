
module.exports={
  isAuthenticated:function(req,res,next){
    if(req.isAuthenticated())
      next()
    else
    res.redirect('/')
  },
  isNotGuest:function(req,res,next){
    if(req.isAuthenticated())
      res.redirect("/dashboard")
    else
    next()
  }

}