const express = require('express');
const app = express();

// root route
app.get('/', function(req,res){
  res.send("Hello, World!");
});

// route for /myroute
app.get('/myroute', function(req,res){
  res.send("You're at /myroute!");
});

// route with a subfolder
app.get('/myroute/mysubroute', function(req,res){
  res.send("You're at my /myroute/mysubroute")
});

// route with parameters
app.get('/myroute/:id/:search', function(req,res){

  // parameters accessed with req.params, using the
  // names defined with :name in the route definition
  // (see above)
  res.send("You set the id to: " + req.params.id +
  	       "<br \> You set the search to: " +
  	       req.params.search);
})

// route where we read query parameters
app.get('/newroute', function(req,res) {

  // check out the console log... you'll see a JSON object with keys/values
  // as you put in different URL parameters... so something like:
  // http://localhost:8081/newroute?key1=value1&key2=value2
  // should produce the console output: { key1: 'value1', key2: 'value2' }
  console.log(req.query);

  // send back the value of key1
  res.send("New route: " + req.query.key1);

})

// use the res.json method to send back JSON data
app.get('/jsonroute', function(req,res) {

  // define a JSON object
  var someJSONObject =
    {"somekey" : "somevalue",
     "someotherkey" : [1,2,3],
      "newkey" : 5};

  // use res.json to send it as the response... notice in the network tab on
  // Chrome Dev Tools that the response header (Content-Type) is actually
  // set to JSON data now!
  res.json(someJSONObject);

});

// Send back a static file
// Use a regular expression to detect "any other route"
// Define the route last such that other routes would
// be detected and handled as such first.
app.get(/^(.+)$/, function(req,res){
  console.log("static file request: " + req.params[0]);
  res.sendFile(__dirname + req.params[0]);
});

var server = app.listen(8081, function()
{
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s/%s",
  	          host,port);
});
