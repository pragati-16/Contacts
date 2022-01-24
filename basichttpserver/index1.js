// creating our own server
// whenever we requests for a service to server then each link or service is associated with a particular port which uniquely identifies by default 80

const http=require('http');
const port=8000;
const fs=require('fs');

//sending response to the user on a particular request
 function requestHandler(req,res) {
     console.log(req.url); //this will show me the url on localhost:8000
     //rendering basic HTML 
       res.writeHead(200,{'content-type':'text-html'});                    
     // we use this less bcoz data can be very large so create separate html file res.end('<h1>Welcome to Node.js</h1>'); 
     //if we want to render multiple pages then we can make use of switch statements 
       let filePath;
       switch(req.url) {
           case '/':
           filePath='./index1.html'
           break;
           case '/profile':
           filePath='./profile.html'
           break;
           default:
            filePath='./404.html'
            break;
       }
     fs.readFile(filePath,function(err,data) {      //now filePath at place of pathof file 
           if(err) {
               console.log(err);
               return res.end('<h1>ERROR THERE!</h1>');
           }
           return res.end(data);
     });
 }
//creating server
const server=http.createServer(requestHandler);
//to check whether server has been setup or not
//port: to check whether post has been setup or not
server.listen(port,function(err) {
if(err) {
    console.log(err);
    return;
}
console.log("Server is  running on port number:",port); 
}); 
//in this case server keeps on loading *to crash a server use ctr+c* , *but we also need something to stop the server so fot that 
// we have to use requests and responses  (to avoid error on terminal :run as administrator) 