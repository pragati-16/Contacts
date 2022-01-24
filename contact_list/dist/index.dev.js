"use strict";

//we need to require express as other files 
var express = require('express');

var PORT = 8000;

var path = require('path'); //we call express as a function in order to have all its basic functionalities use the name app


var app = express(); //we have to tell express that ejs will be the engeine

app.set('view engine', 'ejs'); //setting view-engine

app.set('views', path.join(__dirname, 'views')); //will search only in view folder  (setting view path) 
//taking data urlencoded act as middleware which recieves the data and parses it

app.use(express.urlencoded()); //calling the folder 

app.use(express["static"]('assests'));
app.listen(PORT, function (err) {
  if (err) console.log("There is an error while loading the serever", err);
  console.log("The server is running on the port", PORT); //THis will not keep on loading the page as node.js i.e advantage of express
}); //creating contact list with use of an iterator

var contactList = [{
  name: 'Pragati',
  phone: '111111111'
}, {
  name: 'Coding',
  phone: '000000000'
}, {
  name: 'Ninjas',
  phone: '123456789'
}]; //framework good at handling depenedencies on its own

app.get('/', function (req, res) {
  //res.send("Hi welcome to express!");
  // res.send('<h1>Welcome to express</h1>');
  console.log(__dirname);
  return res.render('home', {
    title: "Learning Web",
    contact_list: contactList
  });
});
app.get('/practice', function (req, res) {
  return res.render('practice', {
    title: "Practice Page"
  });
});
app.post('/add-contact', function (req, res) {
  //  return res.redirect('/practice');
  //console.log(req.body);
  //console.log(req.body.name);
  // console.log(req.body.phone); 
  //but this data is temporary and it will get vanish when we refresh the page 
  contactList.push(req.body);
  return res.redirect('back'); //to come back again on home page we can use like('/') or('back')
}); //whatever data we will take from browser we need to convert that or parse that data
//creating middlewares :they act as an intermediate between req and res or controller we can create our own middlewares

/* app.use(function(req,res,next) {
 console.log("middleware 1");
 next();
});   //next tells where to move next if no other middleware then it automatically calls main function

app.use(function(req,res,next) {
console.log("middleware 2");
});   */

app.get('/delete-contact/', function (req, res) {
  // will only give phone-number: console.log(req.params);
  //both name and phone are given by : 
  console.log(req.query);
  var phone = req.query.phone;
  var contactIndex = contactList.findIndex(function (contact) {
    return contact.phone == phone;
  });

  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1);
    return res.redirect('back');
  } else {
    return res.render('<h1>Oops! Nothing to delete</h1>');
  }
});
//# sourceMappingURL=index.dev.js.map
