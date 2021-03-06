var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var json = {};
    json.message = "ATOM API server is up and running."
    json.release = req.app.get('version');
    json.versions = [ 'v1' ];
    res.json(json);
});

module.exports = router;
