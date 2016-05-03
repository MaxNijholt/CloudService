var express = require('express');
var request = require('request-json');
var router = express.Router();


var api = {};
api.globalURL = "https://global.api.pvp.net";
api.allChamps = "/api/lol/static-data/euw/v1.2/champion?";
api.apiKey = "api_key=000e525c-65cf-4739-a963-2f18dec526cc";

var client = request.createClient(api.globalURL + api.allChamps + api.apiKey);

/*
 * GET champions.
 */
router.get('/', function(req, res) {
    client.get('', function(err, results, body) {
        if (err) return console.error(err);
        res.json(body.data);
    });
});

module.exports = router;
