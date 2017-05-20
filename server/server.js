// MAIN SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure PORT
var port = process.env.PORT || 8080; // set our port

// configure mongoose
var mongoose   = require('mongoose');
var mongoBaseUrl = 'mongodb://localhost'; //this is default if you are running locally, if u still get an error, try 127.0.0.1 in the place of 'localhost'
var mongoPort = ':27017';  //modify the path to your needs. Dont change if you didnt change the default port of mongodb running.
var mongoPath = '/docs';  //modify the path to your needs.
var mongoFinalUrl = mongoBaseUrl + mongoPort + mongoPath;

mongoose.connect(mongoFinalUrl, function(err) {
    if (err) {
	console.log("Not connected to mongodb at " + mongoFinalUrl);
	throw err;
    }
}); 

const router = require('./app/routes/api');

// every request that comes in, will be added with the header and sent, every possible combination with *, so / anything will call this callback.
app.get('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); /*ALERT! : You need to change the 4200 port to whatever port you are running the client on, 
									* 	   if you are running the angular app at port 8080, 
									*	   then you need to set the Access-Control-Allow-Origin to http://localhost:8080*/
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    /*if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }*/
    next();
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
