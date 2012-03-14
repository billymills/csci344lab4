var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');

//create redis client                                                                                                                                                                                                                       
var client = redis.createClient();

//if the 'awesome' key doesn't exist, create it        
//instead of waiting use callback function
//parameters specified by API error usually goes first
//all this is not necessary node will set awesome
/*
client.exists('awesome', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    } else if(!exists) {
        client.set('awesome', 0); //create the awesome key
    };
});
*/

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

t.stream(
    'statuses/filter',
    { track: ['awesome', 'cool', 'rad', 'gnarly', 'groovy'] },
    function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            //if awesome is in the tweet text, increment the counter 
            //need if for all other words           
            if(tweet.text.match(/awesome/)) {
                client.incr('awesome');
            }
            if(tweet.text.match(/cool/)) {
                client.incr('cool');
            }
             if(tweet.text.match(/rad/)) {
                client.incr('rad');
            }
             if(tweet.text.match(/gnarly/)) {
                client.incr('gnarly');
            }
             if(tweet.text.match(/groovy/)) {
                client.incr('groovy');
            }
        });
    }
);
