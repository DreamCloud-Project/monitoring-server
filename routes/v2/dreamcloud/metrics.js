var express = require('express');
var http = require('http');
var async = require('async');
var router = express.Router();

/**
 * @api {post} /metrics 2. Update multiple metrics at once (bulk query)
 * @apiVersion 2.0.0
 * @apiName PostBulkMetrics
 * @apiGroup Metrics
 *
 * @apiParam
 * @apiParam (body) {String} WorkflowID identifier of a workflow
 * @apiParam (body) {String} ExperimentID identifier of an experiment
 * @apiParam (body) {String} [TaskID] identifier of a task, equals '_all' if not set
 * @apiParam (body) {String} [type] type of the metric, e.g. power, temperature, and so on
 * @apiParam (body) {String} [host] hostname of the system
 * @apiParam (body) {String} timestamp timestamp, when the metric is collected
 * @apiParam (body) {String} metric value of the metric
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://mf.excess-project.eu:3030/v2/dreamcloud/mf/metrics
 *
 * @apiParamExample {json} Request-Example:
 *     [
 *       {
 *         "WorkflowID": "ms2",
 *         "ExperimentID": "AVUWnydqGMPeuCn4l-cj",
 *         "TaskID": "t2.1",
 *         "@timestamp": "2016-02-15T12:43:48.749",
 *         "type": "power",
 *         "host": "node01.excess-project.eu",
 *         "GPU1:power": "168.519"
 *       }, {
 *         "WorkflowID": "ms2",
 *         "ExperimentID":"AVNXMXcvGMPeuCn4bMe0",
 *         "TaskID": "t2.2",
 *         "@timestamp": "2016-02-15T12:46:48.524",
 *         "type": "power",
 *         "host": "node01.excess-project.eu",
 *         "GPU0:power": "152.427"
 *       }
 *     ]
 *
 * @apiSuccess {String} href links to all updated profiled metrics
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       "http://mf.excess-project.eu:3030/v2/mf/profiles/ms2_t2.1/AVUWnydqGMPeuCn4l-cj",
 *       "http://mf.excess-project.eu:3030/v2/mf/profiles/ms2_t2.2/AVNXMXcvGMPeuCn4bMe0"
 *     ]
 *
 * @apiError DatabaseError Elasticsearch specific error message.
 */
router.post('/', function(req, res, next) {
    var data = req.body,
      mf_server = req.app.get('mf_server'),
      client = req.app.get('elastic'),
      bulk_data = [];

    var tmp = {};
    tmp.index = {};
    for (i = 0; i != data.length; ++i) {
        var action = JSON.parse(JSON.stringify(tmp));
        var index = data[i].WorkflowID;
        if (data[i].TaskID) {
          index = index + '_' + data[i].TaskID;
        } else {
          index = index + '_all';
        }
        action.index._index = index.toLowerCase();
        action.index._type = data[i].ExperimentID;
        delete data[i].WorkflowID;
        delete data[i].ExperimentID;
        bulk_data.push(action);
        bulk_data.push(data[i]);
    }

    client.bulk({
        body: bulk_data
    },function(error, response) {
        if (error !== 'undefined') {
            var json = [];
            for (var i in response.items) {
                json.push(mf_server +
                  '/dreamcloud/mf/profiles/' +
                  response.items[i].create._index.replace('_all', '/all') +
                  '/' + response.items[i].create._type);
            }
            res.json(json);
        } else {
            res.json(error);
        }
    });
});

/**
 * @api {post} /metrics/:workflowID/:experimentID 1. Update a single metric
 * @apiVersion 2.0.0
 * @apiName PostMetric
 * @apiGroup Metrics
 *
 * @apiParam {String} workflowID identifier of a workflow
 * @apiParam {String} experimentID identifier of an experiment
 * @apiParam {String} [taskID] identifier for a given task; equals '_all' if not set
 *
 * @apiParam (body) {String} [type] type of the metric, e.g. power
 * @apiParam (body) {String} [host] hostname of the system
 * @apiParam (body) {String} timestamp timestamp, when the metric is collected
 * @apiParam (body) {String} metric value of the metric
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://mf.excess-project.eu:3030/v2/dreamcloud/mf/metrics/ms2/AVNXMXcvGMPeuCn4bMe0?task=t2.1
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "type": "power",
 *       "host": "fe.excess-project.eu",
 *       "@timestamp": "2016-02-15T12:42:22.000",
 *       "GPU0:power": "152.427"
 *     }
 *
 * @apiSuccess {Object} metricID identifier of the sent metric
 * @apiSuccess {String} metricID.href link to the experiment with updated metrics
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "AVXt3coOz5chEwIt8_Ma": {
 *         "href": "http://mf.excess-project.eu:3030/v2/mf/profiles/hpcfapix/vector_scal01/AVNXMXcvGMPeuCn4bMe0"
 *       }
 *     }
 *
 * @apiError DatabaseError Elasticsearch specific error message.
 */
router.post('/:workflowID/:experimentID', function(req, res, next) {
    var workflowID = req.params.workflowID.toLowerCase(),
      experimentID = req.params.experimentID,
      mf_server = req.app.get('mf_server'),
      taskID = req.query.task.toLowerCase(),
      client = req.app.get('elastic'),
      index_missing = false;

    var index = workflowID;
    if (typeof taskID == 'undefined') {
        taskID = '_all';
    }

    index = workflowID + '_' + taskID;

    async.series([
        function(callback) {
            client.indices.exists({
                index: index
            }, function(error, response) {
                index_missing = !response;
                callback(null, '1=' + index_missing);
            });
        },
        function(callback) {
            var created = false;
            if (index_missing) {
                var headers = {
                    'Content-Type': 'application/json',
                    'Content-Length': bodyString.length
                };

                var options = {
                    host: 'localhost',
                    path: '/' + index,
                    port: 9200,
                    method: 'PUT',
                    headers: headers
                };

                var http_request = http.request(options, function(res) {
                    res.setEncoding('utf-8');
                    res.on('data', function(data) {
                        console.log('incoming: ' + data);
                    });
                    res.on('end', function() {
                        callback(null, '2=created');
                    });
                });

                http_request.on('error', function(e) {
                    callback(null, '2=not_created');
                });

                http_request.write(bodyString);
                http_request.end();
            } else {
                callback(null, '2=exists');
            }
        },
        function(callback) {
            /* work-around for plug-ins sending the old timestamp format */
            if (req.body.Timestamp) {
                req.body['@timestamp'] = req.body.Timestamp;
                delete req.body.Timestamp;
            }
            client.index({
                index: index,
                type: experimentID,
                body: req.body
            },function(error, response) {
                if (error !== 'undefined') {
                    var json = {};
                    json[response._id] = {};
                    json[response._id].href = mf_server + '/dreamcloud/mf/profiles/' + workflowID;
                    if (typeof taskID !== 'undefined') {
                        json[response._id].href += '/' + taskID;
                    }
                    json[response._id].href += '/' + experimentID;
                    res.json(json);
                } else {
                    res.json(error);
                }
                callback(null, '3');
            });
        }
    ],
    function(err, results){
        //console.log(results);
    });
});

var bodyString =
'{' +
   '"dynamic_templates": [' +
      '{' +
         '"string_fields": {' +
            '"mapping": {' +
               '"index": "analyzed",' +
               '"omit_norms": true,' +
               '"type": "string",' +
               '"fields": {' +
                  '"raw": {' +
                     '"index": "not_analyzed",' +
                     '"ignore_above": 256,' +
                     '"type": "string"' +
                  '}' +
               '}' +
            '},' +
            '"match": "*",' +
            '"match_mapping_type": "string"' +
         '}' +
      '}' +
   '],' +
   '"_all": {' +
      '"enabled": true' +
   '},' +
   '"properties": {' +
      '"@timestamp": {' +
         '"enabled" : true,' +
         '"type":"date",' +
         '"format": "date_hour_minute_second_millis",' +
         '"store": true,' +
         '"path": "@timestamp"' +
      '},' +
      '"host": {' +
         '"type": "string",' +
         '"norms": {' +
            '"enabled": false' +
         '},' +
         '"fields": {' +
            '"raw": {' +
               '"type": "string",' +
               '"index": "not_analyzed",' +
               '"ignore_above": 256' +
            '}' +
         '}' +
      '},' +
      '"name": {' +
         '"type": "string",' +
         '"norms": {' +
            '"enabled": false' +
         '},' +
         '"fields": {' +
            '"raw": {' +
               '"type": "string",' +
               '"index": "not_analyzed",' +
               '"ignore_above": 256' +
            '}' +
         '}' +
      '},' +
      '"value": {' +
         '"type": "long",' +
         '"norms": {' +
            '"enabled": false' +
         '},' +
         '"fields": {' +
            '"raw": {' +
               '"type": "long",' +
               '"index": "not_analyzed",' +
               '"ignore_above": 256' +
            '}' +
         '}' +
      '}' +
   '}' +
'}';

module.exports = router;
