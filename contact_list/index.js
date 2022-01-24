//we need to require express as other files 
const express=require('express');
const PORT=8000;
const path=require('path');

//fire db here above where express is called 
const db=require('./config/mongoose');
const Contact=require('./models/contact');

//we call express as a function in order to have all its basic functionalities use the name app
const app=express();
//we have to tell express that ejs will be the engeine
app.set('view engine','ejs');   //setting view-engine
app.set('views',path.join(__dirname,'views')); //will search only in view folder  (setting view path) 

//taking data urlencoded act as middleware which recieves the data and parses it
app.use(express.urlencoded());
//calling the folder 
app.use(express.static('assests'));

app.listen(PORT,function(err) {
  if(err)
  console.log("There is an error while loading the serever",err);
   console.log("The server is running on the port",PORT);   //THis will not keep on loading the page as node.js i.e advantage of express
});

//creating contact list with use of an iterator
var contactList=[
 {
   name:'Pragati',
   phone:'111111111'
 },
 {
   name:'Coding',
   phone:'000000000'
 },
 {
   name:'Ninjas',
   phone:'123456789'
 }
]
//framework good at handling depenedencies on its own
app.get('/',function(req,res) {
   //res.send("Hi welcome to express!");
  // res.send('<h1>Welcome to express</h1>');
 // console.log(__dirname);
  /* return res.render('home',
    {
    title:"Learning Web",
      contact_list:contactList
    });  */
    Contact.find({},function(err,contacts) {    //we are using find method to find in contactList .Since we passed empt brackets means no filters
    //we can often use find({"name:prago"},function(err,conacts) {  ....})
if(err) {
  console.log('error in finding contacts from db');
  return;
}
 return res.render('home',
    {
    title:"Learning Web",
      contact_list:contacts
    });
    }); 
});

app.get('/practice',function(req,res) {
  return res.render('practice',{title:"Practice Page"});
});

app.post('/add-contact',function(req,res) {
//  return res.redirect('/practice');
//console.log(req.body);
//console.log(req.body.name);
// console.log(req.body.phone); 
//but this data is temporary and it will get vanish when we refresh the page 
  // ow we will make permanent change in the database :: contactList.push(req.body);
  Contact.create({
    name:req.body.name,
    phone:req.body.phone
  },function(err,newContact) {
    if(err) { console.log('error in creating an object'); return; }
       console.log('******',newContact); 
       return res.redirect('back');
  });
 //return res.redirect('back'); //to come back again on home page we can use like('/') or('back')
}); 

//whatever data we will take from browser we need to convert that or parse that data

//creating middlewares :they act as an intermediate between req and res or controller we can create our own middlewares
 /* app.use(function(req,res,next) {
  console.log("middleware 1");
  next();
});   //next tells where to move next if no other middleware then it automatically calls main function
 
 app.use(function(req,res,next) {
console.log("middleware 2");
 });   */


 
 app.get('/delete-contact/',function(req,res) {
   // will only give phone-number: console.log(req.params);
   //both name and phone are given by : 
 /*  console.log(req.query)
    let phone=req.query.phone;
  let contactIndex=contactList.findIndex(contact=> contact.phone==phone);
  if(contactIndex!=-1) {
    contactList.splice(contactIndex,1);
    return res.redirect('back');
  }   */
  // rather then deleting according to phone number we will delete with help of id bcoz it is unique for each list element
  let id=req.query.id; 
  Contact.findByIdAndDelete(id,function(err) {
     if(err) {
       console.log('Error in deleting an object from database');
       return;
     }
     return res.redirect('back');
  });
 });

 