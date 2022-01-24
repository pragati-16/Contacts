const mongoose=require('mongoose');  //creating mongoose variable or requiring the library

mongoose.connect('mongodb://localhost/contacts_list_db'); //to establish the connection in order to make mongoose interact with database

const db=mongoose.connection;
//error 
db.on('error',console.error.bind(console,'error connecting to db'));  //checking whether connection is established or not

//up and running the print message 
db.once('open',function() {
    console.log('Successfuly connected to the database');
}); 

