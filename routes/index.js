var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const userModel = require("./users");
const postModel = require("./post");
const passport = require('passport');
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const upload = require("./multer")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',  function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/contact',  function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/Addrecepie', isLoggedIN, function(req, res, next) {
  res.render('Addrecepie', { title: 'Express' });
});
router.get('/profile', isLoggedIN, async function(req, res, next) {

  const user = 
  await userModel
  .findOne({username:req.session.passport.user})
  .populate("posts");
 res.render('profile',{user , nav:true});
});
router.get('/description/posts:_id', isLoggedIN , async function(req, res, next) {
  const user =  await userModel.findOne({username:req.session.passport.user})
  const posts = await postModel.find()
  .populate("user");
  res.render('description',{user ,posts});
});


router.get('/recepies', isLoggedIN , async function(req, res, next) {
  const user =  await userModel.findOne({username:req.session.passport.user})
  const posts = await postModel.find()
  .populate("user");
  res.render('recepies',{user ,posts});
});

router.post("/contact_submit", function (req, res, next) {
  const userData = new userModel({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  userData.save();
  res.redirect("/");
});
router.post('/createrecepie', isLoggedIN ,upload.single("postimage"), async function(req, res, next) {
  const user =  await userModel.findOne({username:req.session.passport.user});
    const post =  await postModel.create({
    user: user._id,
    title:req.body.title,
    description:req.body.description,
    image :req.file.filename,
  });

  user.posts.push(post._id);
   await user.save();
  res.redirect("/recepies");
});




router.post("/register", function(req,res,next){
const user = new userModel({
  username: req.body.username,
  email: req.body.email,
profileImage:String,
name:req.body.name,
})
userModel.register(user, req.body.password)
.then(function(){
  passport.authenticate("local")(req,res, function(){
res.redirect("/profile")
  })
})
});

router.post("/login" , passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect:"/"
}), function(req ,res ,next){

});

router.get("/logout", function(req , res,next ){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
function isLoggedIN(req,res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/')
  }
}
module.exports = router;
