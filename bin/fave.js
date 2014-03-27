#!/usr/bin/env node
var config = require('../config.json');
var Twit = require('twit');
var argv = require('yargs').demand(1).argv;

var search_term = argv._[0];
var T = new Twit(config);
var stream = T.stream('statuses/filter', { track: search_term });

stream.on('tweet', function (tweet) {
  T.post('favorites/create', {id: tweet.id_str}, function(err, reply) {
    if (err) console.error(err);
    if (reply) console.log('Favorited tweet id: ' + tweet.id_str);
  });
});
