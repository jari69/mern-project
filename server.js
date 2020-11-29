const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);

const app = express();
const User=require('./models/user');
const {auth} =require('./middlewares/auth');
// app use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});

app.get('/',function(req,res){
  res.status(200).send(`Welcome to login , sign-up api`);
});

const port = process.env.PORT || 5000;

// const Books = require('./models/books');
// const url = 'mongodb://localhost:27017/table';
// const connect = mongoose.connect(url);

// connect.then((db) => {
//   console.log("Connected correctly to server");
// }, (err) => { console.log(err); });

app.post('/book/create', (req, res, next) => {
  Books.create(req.body)
  .then((book) => {
      console.log('Dish Created ', dish);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(book);
  }, (err) => next(err))
  .catch((err) => next(err));
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// adding new user (sign-up route)
app.post('/api/register',function(req,res){
  // taking a user
 const newuser=new User(req.body);
 console.log(newuser); 
 if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
  
  User.findOne({email:newuser.email},function(err,user){
      if(user) return res.status(400).json({ auth : false, message :"email exists"});

      newuser.save((err,doc)=>{
          if(err) {console.log(err);
              return res.status(400).json({ success : false});}
          res.status(200).json({
              succes:true,
              user : doc
          });
      })
      .then((value)=>{
        console.log(value)
        res.redirect('/login');
      });
  });
});

// login user
app.post('/api/login', function(req,res){
  let token=req.cookies.auth;
  User.findByToken(token,(err,user)=>{
      if(err) return  res(err);
      if(user) return res.status(400).json({
          error :true,
          message:"You are already logged in"
      });
  
      else{
          User.findOne({'email':req.body.email},function(err,user){
              if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
      
              user.comparepassword(req.body.password,(err,isMatch)=>{
                  if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
      
              user.generateToken((err,user)=>{
                  if(err) return res.status(400).send(err);
                  res.cookie('auth',user.token).json({
                      isAuth : true,
                      id : user._id,
                      email : user.email
                  });
              });    
          });
        });
      }
  });
});

// get logged in user
app.get('/api/profile',auth,function(req,res){
  res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.firstname + req.user.lastname
      
  })
});

//logout user
app.get('/api/logout',auth,function(req,res){
  req.user.deleteToken(req.token,(err,user)=>{
      if(err) return res.status(400).send(err);
      res.sendStatus(200);
  });

}); 
app.listen(port, () => console.log(`Listening on port ${port}`));