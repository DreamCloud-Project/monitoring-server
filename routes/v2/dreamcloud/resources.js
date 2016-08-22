var express = require('express');
var dateFormat = require('dateformat');
var secure_router = express.Router(),
    open_router = express.Router();

/**
 * @api {get} /resources 1. Get a list of available resources by target platform
 * @apiVersion 2.0.0
 * @apiName GetResources
 * @apiGroup Resources
 *
 * @apiParam {String} none none parameters required
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://mf.excess-project.eu:3030/v2/dreamcloud/mf/resources
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *        "alexlaptop": {
 *           "href": "http://mf.excess-project.eu:3030/v2/dreamcloud/mf/resources/alexlaptop"
 *        },
 *        "amitlaptop": {
 *           "href": "http://mf.excess-project.eu:3030/v2/dreamcloud/mf/resources/amitlaptop"
 *        },
 *        "excesscluster": {
 *           "href": "http://mf.excess-project.eu:3030/v2/dreamcloud/mf/resources/excesscluster"
 *        }
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "href": "http://mf.excess-project.eu:3030/v2/dreamcloud/mf/resources"
 *     }
 *
 * @apiError InternalSeverError No results found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Sever Error
 *     {
 *       "error": "No results found."
 *     }
 */
open_router.get('/', function(req, res, next) {
    var client = req.app.get('elastic'),
        mf_server = req.app.get('mf_server'),
        details = req.query.expand,
        size = 1000,
        json = {};

    client.search({
        index: 'mf',
        type: 'resources',
        searchType: 'count'
    }, function(error, response) {
        if (error) {
            res.status(500);
            return next(error);
        }
        if (response.hits !== undefined) {
            size = response.hits.total;
        }

        client.search({
            index: 'mf',
            type: 'resources',
            size: size
        }, function(error, response) {
            if (error) {
                res.status(500);
                return next(error);
            }
            if (response.hits !== undefined) {
                var results = response.hits.hits;
                if (is_defined(details)) {
                    json = get_details(results);
                } else {
                    json = get_resource(mf_server, results);
                }
            }
            res.json(json);
        });
    });
});

function is_defined(variable) {
    return (typeof variable !== 'undefined');
}

function get_details(results) {
    var keys = Object.keys(results),
      item = {},
      response = {};
    keys.forEach(function(key) {
        item = results[key]._source;
        response[results[key]._id] = item;
    });
    return response;
}

function get_resource(mf_server, results) {
    var keys = Object.keys(results),
      platform = '',
      response = {};
    keys.forEach(function(key) {
        platform = results[key]._id;
        var json = {};
        json.href = mf_server + '/dreamcloud/mf/resources/' + platform;
        response[platform] = json;
    });
    return response;
}

/**
 * @api {get} /resources/:platformID 2. Get resource information for a given platform
 * @apiVersion 2.0.0
 * @apiName GetResource
 * @apiGroup Resources
 *
 * @apiParam {String} platformID platform-specific identifier, e.g., 'excesscluster'
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://mf.excess-project.eu:3030/v2/dreamcloud/mf/resources/excesscluster
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *        "nodes": [
 *           {
 *              "id": "node01",
 *              "cpus": [
 *                 {
 *                    "id": "cpu0",
 *                    "cores": [
 *                       {
 *                          "id": "core0",
 *                          "pwMode": 0,
 *                          "status": "allocated",
 *                          "availTime": "null"
 *                       },
 *                       {
 *                          "id": "core1",
 *                          "pwMode": 0,
 *                          "status": "allocated",
 *                          "availTime": "null"
 *                       },
 *                       ...
 *                    ]
 *                 }
 *              ]
 *           }
 *        ]
 *     }
 *
 * @apiError InternalServerError Likely to be caused by an error while inserting data into the database.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Elasticsearch-specific error message."
 *     }
 */
open_router.get('/:id', function(req, res, next) {
    var client = req.app.get('elastic'),
      id = req.params.id.toLowerCase(),
      json = {};

    client.get({
        index: 'mf',
        type: 'resources',
        id: id
    }, function(error, response) {
        if (error) {
            res.status(500);
            return next(error);
        }

        json = response._source;
        res.json(json);
    });
});

/**
 * @api {put} /resources/:platformID 3. Add resource information for a given platform
 * @apiVersion 2.0.0
 * @apiName PutResource
 * @apiGroup Resources
 *
 * @apiParam {String} none no parameters required
 * @apiParam (body) {Object} nodes object aggregating some platform-specific information
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://mf.excess-project.eu:3030/v2/dreamcloud/mf/resources/excesscluster
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "nodes": [
 *           {
 *              "id": "node01",
 *              "cpus": [
 *                 {
 *                    "id": "cpu0",
 *                    "cores": [
 *                       {
 *                          "id": "core0",
 *                          "pwMode": 0,
 *                          "status": "allocated",
 *                          "availTime": "null"
 *                       },
 *                       {
 *                          "id": "core1",
 *                          "pwMode": 0,
 *                          "status": "allocated",
 *                          "availTime": "null"
 *                       },
 *                       ...
 *                    ]
 *                 }
 *              ]
 *           }
 *        ]
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP 200/OK
 *     {
 *       "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/resources/excesscluster"
 *
 *     }
 *
 * @apiError InternalServerError Likely to be caused by an error while inserting data into the database.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Elasticsearch-specific error message."
 *     }
 */
secure_router.put('/:id', function(req, res, next) {
    var mf_server = req.app.get('mf_server'),
      id = req.params.id.toLowerCase(),
      client = req.app.get('elastic');

    var now = new Date();
    now = dateFormat(now, "yyyy-mm-dd'T'HH:MM:ss");
    req.body['@timestamp'] = now;

    client.index({
        index: 'mf',
        type: 'resources',
        id: id,
        body: req.body
    },function(error, response) {
        if (error) {
            res.status(500);
            return next(error);
        }

        var json = {};
        json.href = mf_server + '/dreamcloud/mf/resources/' + id;
        res.json(json);
    });
});

module.exports = {
    protected: secure_router,
    unprotected: open_router
};
