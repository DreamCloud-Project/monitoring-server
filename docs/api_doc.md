# monitoring-server v1.0.0

RESTful services for the ATOM monitoring framework

- [Deployment_Plans](#deployment_plans)
	- [3. Return available deployment plans](#3.-return-available-deployment-plans)
	- [2. Return a given deployment plan](#2.-return-a-given-deployment-plan)
	- [1. Add a new deployment plan](#1.-add-a-new-deployment-plan)

- [Energy](#energy)
	- [1. Return energy data for the given experiment ID](#1.-return-energy-data-for-the-given-experiment-id)
	- [2. Return energy data filtered by task ID](#2.-return-energy-data-filtered-by-task-id)

- [Experiments](#experiments)
	- [1. Returns a list of all experiment IDs](#1.-returns-a-list-of-all-experiment-ids)
	- [2. Request a registered experiment with given experiment ID](#2.-request-a-registered-experiment-with-given-experiment-id)
	- [3. Create a new experiment with given workflow ID](#3.-create-a-new-experiment-with-given-workflow-id)

- [Metrics](#metrics)
	- [2. Update multiple metrics at once (bulk query)](#2.-update-multiple-metrics-at-once-(bulk-query))
	- [1. Update a single metric](#1.-update-a-single-metric)

- [Profiles](#profiles)
	- [3. Get profiles by workflow, task and experiment ID](#3.-get-profiles-by-workflow,-task-and-experiment-id)
	- [2. Get a list of experiments by workflow and task ID](#2.-get-a-list-of-experiments-by-workflow-and-task-id)
	- [1. Get a list of profiled tasks associated with the given workflow ID](#1.-get-a-list-of-profiled-tasks-associated-with-the-given-workflow-id)

- [Progress](#progress)
	- [1. Get progress information for a given experiment](#1.-get-progress-information-for-a-given-experiment)

- [Reports](#reports)
	- [1. Get experiment report](#1.-get-experiment-report)
	- [2. Get summary including statistics](#2.-get-summary-including-statistics)
	- [3. Get summary filtered by deployment ID](#3.-get-summary-filtered-by-deployment-id)

- [Resources](#resources)
	- [2. Get resource information for a given platform](#2.-get-resource-information-for-a-given-platform)
	- [1. Get a list of available resources by target platform](#1.-get-a-list-of-available-resources-by-target-platform)
	- [3. Add resource information for a given platform](#3.-add-resource-information-for-a-given-platform)

- [Runtime](#runtime)
	- [1. Get the runtime of a specific task](#1.-get-the-runtime-of-a-specific-task)
	- [2. Get runtime information of an entire experiment](#2.-get-runtime-information-of-an-entire-experiment)

- [Statistics](#statistics)
	- [1. Get statistics on a metric across all tasks](#1.-get-statistics-on-a-metric-across-all-tasks)
	- [2. Get statistics on a metric filtered by task ID](#2.-get-statistics-on-a-metric-filtered-by-task-id)

- [Status](#status)
	- [1. Get status report](#1.-get-status-report)
	- [1. Create/Update status report](#1.-create/update-status-report)

- [Workflows](#workflows)
	- [2. Get information about a specific workflow](#2.-get-information-about-a-specific-workflow)
	- [3. Request a list of registered workflows](#3.-request-a-list-of-registered-workflows)
	- [4. Register a new workflow and create a new experiment](#4.-register-a-new-workflow-and-create-a-new-experiment)
	- [1. Register a new workflow with a custom ID](#1.-register-a-new-workflow-with-a-custom-id)
	- [5. Register a new workflow and experiment using custom IDs](#5.-register-a-new-workflow-and-experiment-using-custom-ids)



# Deployment_Plans

## 3. Return available deployment plans



	GET /deployments/:workflowID/:taskID/:platformID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifier for a workflow, e.g. 'ms2'							|
| taskID			| String			|  identifier for a task, e.g. 't2.1'							|
| platformID			| String			|  identifier for a platform, e.g. 'excesscluster'							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/deployments/ms2/t2.1/excesscluster
```

### Success Response



```
HTTP/1.1 200 OK
{
  "cf8ba177b43e4a837c4c213f6a149ead4f1ec9ef2e976306a07711e88bf6c60c": {
     "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/deployments/ms2/t2.1/excesscluster/cf8ba177b43e4a837c4c213f6a149ead4f1ec9ef2e976306a07711e88bf6c60c"
  },
  "e57d089e2cc396f04d277aa35c399b4a5af5b56f65682b4f4952dd7f334a2c15": {
     "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/deployments/ms2/t2.1/excesscluster/e57d089e2cc396f04d277aa35c399b4a5af5b56f65682b4f4952dd7f334a2c15"
  },
  "d6d33f5097e23e55659aba9004dbeb257970926e3927a01c10ff431fe48555e9": {
     "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/deployments/ms2/t2.1/excesscluster/d6d33f5097e23e55659aba9004dbeb257970926e3927a01c10ff431fe48555e9"
  },
  "79f2e72501da8a8bcff9d6cd711b44a0fe8174a751e897c51ef7a7d110b925d8": {
     "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/deployments/ms2/t2.1/excesscluster/79f2e72501da8a8bcff9d6cd711b44a0fe8174a751e897c51ef7a7d110b925d8"
  },
  ..
}
```
### Error Response



```
HTTP/1.1 404 Not Found
{
  "error": "No deployment plans found for the given worklow, task, and platform."
}
```
## 2. Return a given deployment plan



	GET /deployments/:workflowID/:taskID/:platformID/:deploymentPlanID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifier for a workflow, e.g. 'ms2'							|
| taskID			| String			|  identifier for a task, e.g. 't2.1'							|
| platformID			| String			|  identifier for a platform, e.g. 'excesscluster'							|
| deploymentPlanID			| String			|  identifier for a deployment plan, e.g. 'cf8ba177b43e4a837c4c213f6a149ead4f1ec9ef2e976306a07711e88bf6c60c'							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/deployments/ms2/t2.1/excesscluster/cf8ba177b43e4a837c4c213f6a149ead4f1ec9ef2e976306a07711e88bf6c60c
```

### Success Response



```
HTTP/1.1 200 OK
{
  "estimatedTime": 0,
  "node": {
    "id": "node02",
    "cpus": [
      {
        "id": "cpu0",
        "cores": [
          {
            "id": "core0",
            "pwMode": 100
          },
          {
            "id": "core1",
            "pwMode": 100
          }
        ]
      }
    ]
  },
  "experiments": {
    "AVXQa1RU0GMPeuCn4_2S": 1
  }
}
```
### Error Response



```
HTTP/1.1 404 Not Found
{
  "error": "Deployment plan unavailable."
}
```
## 1. Add a new deployment plan



	PUT /deployments/:workflowID/:taskID/:platformID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifier for a workflow, e.g. 'ms2'							|
| taskID			| String			|  identifier for a task, e.g. 't2.1'							|
| platformID			| String			|  identifier for a platform, e.g. 'excesscluster'							|
| experimentID			| String			|  identifier of an experiment, e.g. 'AVX123A3asd_S'							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/deployments/ms2/t2.1/excesscluster/AVX123A3asd_S
```

### Success Response



```
HTTP/1.1 200 OK
{
  "deployment_id": "da117e8171ae58b935a02a9768c21ce96ffd5f6e"
  "predicted_time": 2017
  "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/deployments/ms2/t2.1/test_cluster/da117e8171ae58b935a02a9768c21ce96ffd5f6e"
 }
```
### Error Response



```
HTTP/1.1 500 Internal Server Error
{
  "error": "Could not store given deployment plan."
}
```
# Energy

## 1. Return energy data for the given experiment ID



	GET /energy/:workflowID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifier for a workflow, e.g. 'ms2'							|
| experimentID			| String			|  identifier for an experiment, e.g. 'AVQa1RU0GMPeuCn4_2S_'							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/energy/ms2/AVQa1RU0GMPeuCn4_2S_
```

### Success Response



```
HTTP/1.1 200 OK
{
   "T2.1": [
      {
         "@timestamp": "2016-04-15T18:51:07.4292211",
         "type": "pwm",
         "ATX12V_node01": 19,
         "CPU1_node01": 111,
         "CPU2_node01": 113,
         "GPU_node01": 15
      },
      {
         "@timestamp": "2016-04-15T18:51:07.4292611",
         "type": "pwm",
         "ATX12V_node01": 19,
         "CPU2_node01": 110,
         "CPU1_node01": 115,
         "GPU_node01": 15
      },
      {
         "@timestamp": "2016-04-15T18:51:07.4292111",
         "type": "pwm",
         "GPU_node01": 15,
         "CPU1_node01": 110,
         "ATX12V_node01": 19,
         "CPU2_node01": 113
      },
      ...
   ],
   "T2.2": [
      {
         "@timestamp": "2016-04-15T18:52:08.4293011",
         "type": "pwm",
         "CPU1_node01": 118,
         "GPU_node01": 15,
         "CPU2_node01": 112,
         "ATX12V_node01": 19
      },
      ...
   ]
}
```
### Error Response



```
HTTP/1.1 404 Not Found
{
  "error": "Given workflow ID does not exist."
}
```
## 2. Return energy data filtered by task ID



	GET /energy/:workflowID/:taskID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifier for a workflow, e.g. 'ms2'							|
| taskID			| String			|  identifier for a task, e.g. 't2.1'							|
| experimentID			| String			|  identifier for an experiment, e.g. 'AVX'							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/energy/ms2/t2.1/AVQa1RU0GMPeuCn4_2S_
```

### Success Response



```
HTTP/1.1 200 OK
{
   "t2.1": [
      {
         "@timestamp": "2016-04-15T18:51:07.4292211",
         "type": "pwm",
         "ATX12V_node01": 19,
         "CPU1_node01": 111,
         "CPU2_node01": 113,
         "GPU_node01": 15
      },
      {
         "@timestamp": "2016-04-15T18:51:07.4292611",
         "type": "pwm",
         "ATX12V_node01": 19,
         "CPU2_node01": 110,
         "CPU1_node01": 115,
         "GPU_node01": 15
      },
      {
         "@timestamp": "2016-04-15T18:51:07.4292111",
         "type": "pwm",
         "GPU_node01": 15,
         "CPU1_node01": 110,
         "ATX12V_node01": 19,
         "CPU2_node01": 113
      },
      ...
   ]
}
```
### Error Response



```
HTTP/1.1 404 Not Found
{
  "error": "Data unavailable."
}
```
# Experiments

## 1. Returns a list of all experiment IDs



	GET /experiments


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| details			| Boolean			| **optional** if set, more detailed information for each experiment is given							|
| workflows			| String			| **optional** filters results by the given workflow, e.g. 'ms2'							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/experiments
```

### Success Response



```
HTTP/1.1 200 OK
{
  "AVZ-ll9FGYwmTvCuSnjW": {
     "href": "http://mf.excess-project.eu:3030/v1/mf/experiments/AVZ-ll9FGYwmTvCuSnjW?workflow=ms2"
  },
  "AVZ-kZTjGYwmTvCuSnZV": {
     "href": "http://mf.excess-project.eu:3030/v1/mf/experiments/AVZ-kZTjGYwmTvCuSnZV?workflow=ms2"
  },
  "AVZ-j2hEGYwmTvCuSnVE": {
     "href": "http://mf.excess-project.eu:3030/v1/mf/experiments/AVZ-j2hEGYwmTvCuSnVE?workflow=ms2"
  },
  ...
}
```
## 2. Request a registered experiment with given experiment ID



	GET /experiments/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| experimentID			| String			|  identifier of an experiment							|
| workflow			| String			|  the name of the workflow the given experiment is associated with, e.g. 'ms2'							|
| extends			| Boolean			| **optional** returns detailed information about tasks, if present							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/experiments/AVZ-ll9FGYwmTvCuSnjW?workflow=ms2
```

### Success Response



```
HTTP/1.1 200 OK
{
   "wf_id": "MS2",
   "author": "Me",
   "optimization": "Time",
   "valueCurve": "[1000:100,2000:50,3000:10]",
   "tasks": [
      {
         "name": "T1",
         "exec": "/nas_home/hpcochep/DreamCloud/WFM/Apps/TestEmpty/T1.sh",
         "cores_nr": "1-40"
      },
      {
         "name": "T2.1",
         "exec": "/nas_home/hpcochep/DreamCloud/WFM/Apps/TestEmpty/T2.1.sh",
         "previous": "T1",
         "cores_nr": "1-40"
      },
      {
         "name": "T2.2",
         "exec": "/nas_home/hpcochep/DreamCloud/WFM/Apps/TestEmpty/T2.2.sh",
         "previous": "T1",
         "cores_nr": "1-40"
      },
      {
         "name": "T2.3",
         "exec": "/nas_home/hpcochep/DreamCloud/WFM/Apps/TestEmpty/T2.3.sh",
         "previous": "T1",
         "cores_nr": "1-40"
      },
      {
         "name": "T3",
         "exec": "/nas_home/hpcochep/DreamCloud/WFM/Apps/TestEmpty/T3.sh",
         "previous": "T2.1&&T2.2&&T2.3",
         "cores_nr": "1-40"
      }
   ],
   "application": "ms2",
   "task": "ms2",
   "user": "me",
   "@timestamp": "2016-08-12T13:49:59",
   "job_id": "AVZ-ll9FGYwmTvCuSnjW"
}
```
## 3. Create a new experiment with given workflow ID



	POST /experiments/:workflowID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifier for the workflow for which the experiment shall be created, e.g. 'ms2'							|
| application			| String			| **optional** application name, provided while registering a new experiment							|
| host			| String			| **optional** hostname of the system							|
| user			| String			| **optional** username, like who is registering the experiment							|
| timestamp			| String			|  timestamp, when the experiment is registered							|
| job_id			| String			| **optional** job identifier, provided while registering a new experiment							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/mf/experiments/ms2
```

### Success Response



```
HTTP/1.1 200 OK
{
  "AVXt3coOz5chEwIt8_Ma": {
    "href": "http://mf.excess-project.eu:3030/v1/mf/experiments/AVXt3coOz5chEwIt8_Ma?workflow=ms2"
  }
}
```
# Metrics

## 2. Update multiple metrics at once (bulk query)



	POST /metrics


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| 			| 			|  							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/metrics
```

### Success Response



```
HTTP/1.1 200 OK
[
  "http://mf.excess-project.eu:3030/v1/mf/profiles/ms2_t2.1/AVUWnydqGMPeuCn4l-cj",
  "http://mf.excess-project.eu:3030/v1/mf/profiles/ms2_t2.2/AVNXMXcvGMPeuCn4bMe0"
]
```
## 1. Update a single metric



	POST /metrics/:workflowID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifier of a workflow							|
| experimentID			| String			|  identifier of an experiment							|
| taskID			| String			| **optional** identifier for a given task; equals '_all' if not set							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/metrics/ms2/AVNXMXcvGMPeuCn4bMe0?task=t2.1
```

### Success Response



```
HTTP/1.1 200 OK
{
  "AVXt3coOz5chEwIt8_Ma": {
    "href": "http://mf.excess-project.eu:3030/v1/mf/profiles/hpcfapix/vector_scal01/AVNXMXcvGMPeuCn4bMe0"
  }
}
```
# Profiles

## 3. Get profiles by workflow, task and experiment ID



	GET /profiles/:workflowID/:taskID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| taskID			| String			|  identifier of a registered task							|
| experimentID			| String			|  identifier of an experiment							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.1/AVQ-MczMGMPeuCn4FHqi
```

### Success Response



```
HTTP/1.1 200 OK
[
   {
      "@timestamp": "2016-04-22T15:43:19.614",
      "host": "node02.excess-project.eu",
      "task": "t2.1",
      "type": "progress",
      "value": "68"
   },
   {
      "@timestamp": "2016-04-22T15:41:28.732",
      "host": "node02.excess-project.eu",
      "task": "t2.1",
      "type": "progress",
      "value": "2"
   },
   {
      "@timestamp": "2016-04-22T15:41:36.406",
      "host": "node02.excess-project.eu",
      "task": "t2.1",
      "type": "progress",
      "value": "6"
   },
   ...
]
```
### Error Response



```
HTTP/1.1 404 NotFound
{
  "error": "No results found."
}
```
## 2. Get a list of experiments by workflow and task ID



	GET /profiles/:workflowID/:taskID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| taskID			| String			|  identifier of a registered task							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.1
```

### Success Response



```
HTTP/1.1 200 OK
{
   "2016-06-17": {
      "AVVe9xN-LeaeU4rxxTaT": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.1/AVVe9xN-LeaeU4rxxTaT"
      },
      "AVVejDH1LeaeU4rxwuw-": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.1/AVVejDH1LeaeU4rxwuw-"
      },
      "AVVeiND0LeaeU4rxwtIV": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.1/AVVeiND0LeaeU4rxwtIV"
      },
      "AVVeQmcUenoRsEhyFlHu": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.1/AVVeQmcUenoRsEhyFlHu"
      },
      "AVVeQANeenoRsEhyFjlu": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.1/AVVeQANeenoRsEhyFjlu"
      },
      "AVVeX5NRenoRsEhyF4We": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.1/AVVeX5NRenoRsEhyF4We"
      }
   },
   "2016-04-14": {
      "AVQUiW67GMPeuCn47XpS": {
         "href": "http://mf.excess-project.eu:3030/v1/v1/dreamcloud/mf/profiles/ms2/t2.1/AVQUiW67GMPeuCn47XpS"
      }
   },
   ...
}
```
### Error Response



```
HTTP/1.1 500 Internal Sever Error
{
  "error": "no such index."
}
```
## 1. Get a list of profiled tasks associated with the given workflow ID



	GET /profiles/:workflowID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2
```

### Success Response



```
HTTP/1.1 200 OK
{
   "t2.5": {
      "AVYoZ31mLeaeU4rxUm0O": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.5/AVYoZ31mLeaeU4rxUm0O"
      },
      "AVVuCj1kLeaeU4rxxT4d": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.5/AVVuCj1kLeaeU4rxxT4d"
      }
   },
   "t2.4": {
      "AVQtI20EGMPeuCn4A_V3": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.4/AVQtI20EGMPeuCn4A_V3"
      },
      "AVQ-HJxhGMPeuCn4E_u6": {
         "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/profiles/ms2/t2.4/AVQ-HJxhGMPeuCn4E_u6"
      }
   },
   ...
}
```
### Error Response



```
HTTP/1.1 500 Internal Sever Error
{
  "error": "No results found."
}
```
# Progress

## 1. Get progress information for a given experiment



	GET /progress/:workflowID/:taskID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| taskID			| String			|  identifier of a registered task							|
| experimentID			| String			|  identifier of an experiment							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/progress/ms2/t2.1/AVQ-MczMGMPeuCn4FHqi
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/progress/ms2/t2.1/AVQ-MczMGMPeuCn4FHqi?latest
```

### Success Response



```
HTTP/1.1 200 OK
[
   {
      "@timestamp": "2016-04-22T15:41:20.409",
      "host": "node02.excess-project.eu",
      "task": "t2.1",
      "type": "progress",
      "value": "0"
   },
   {
      "@timestamp": "2016-04-22T15:41:28.732",
      "host": "node02.excess-project.eu",
      "task": "t2.1",
      "type": "progress",
      "value": "2"
   },
   {
      "@timestamp": "2016-04-22T15:41:36.406",
      "host": "node02.excess-project.eu",
      "task": "t2.1",
      "type": "progress",
      "value": "6"
   },

   ...

   {
      "@timestamp": "2016-04-22T15:44:13.668",
      "host": "node02.excess-project.eu",
      "task": "t2.1",
      "type": "progress",
      "value": "100"
   }
]
```
### Error Response



```
HTTP/1.1 404 NotFound
{
  "error": "No data found in the database."
}
```
# Reports

## 1. Get experiment report



	GET /report/:workflowID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| experimentID			| String			|  identifier of an experiment							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/report/ms2/AVQ-MczMGMPeuCn4FHqi
```

### Success Response



```
HTTP/1.1 200 OK
{
   "workflow": {
      "id": "ms2",
      "runtime": {
         "start": "2016-04-22T15:39:48.496",
         "end": "2016-04-22T16:10:34.883",
         "seconds": 1846.387
      },
      "energy": {
         "NODE01": {
            "avg_watt_consumption": 358.6157820189599,
            "total_energy_consumption": 662143.5179146413
         },
         "NODE02": {
            "avg_watt_consumption": 250.0514119089924,
            "total_energy_consumption": 461691.67628040875
         },
         "NODE03": {
            "avg_watt_consumption": 267.59218242524383,
            "total_energy_consumption": 494078.7269315987
         }
      }
   },
   "tasks": {
      "ms2_t2.4": {
         "host": "node02.excess-project.eu",
         "runtime": {
            "start": "2016-04-22T15:41:55.661",
            "end": "2016-04-22T15:46:29.116",
            "seconds": 273.455
         },
         "energy": {
            "NODE01": {
               "avg_watt_consumption": 363.7616224652014,
               "total_energy_consumption": 99472.43447122164
            },
            "NODE02": {
               "avg_watt_consumption": 445.1300451245421,
               "total_energy_consumption": 121723.03648953166
            },
            "NODE03": {
               "avg_watt_consumption": 336.11323218681315,
               "total_energy_consumption": 91911.84390764499
            }
         }
      },
      ...
   }
}
```
### Error Response



```
HTTP/1.1 404 NotFound
{
  "error": "No data found in the database."
}
```
## 2. Get summary including statistics



	GET /summary/:workflowID/:taskID/:platformID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| taskID			| String			|  identifier of a task							|
| platformID			| String			|  identifier for a given platform, e.g. 'excesscluster' or 'laptop'							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/summary/ms2/t2.1/excesscluster
```

### Success Response



```
HTTP/1.1 200 OK
[
   {
      "experiment_id": "AVZVoX2SGYwmTvCu75Mo",
      "workflow_id": "ms2",
      "task_id": "t2.1",
      "deployment_id": "79f2e72501da8a8bcff9d6cd711b44a0fe8174a751e897c51ef7a7d110b925d8",
      "runtime": {
         "start_time": "2016-08-04T14:59:38.755",
         "end_time": "2016-08-04T15:38:23.667",
         "actual_time": 2324.912,
         "predicted_time": 0
      },
      "energy": {
         "NODE01": {
            "avg_watt_consumption": 153.34391120137695,
            "total_energy_consumption": 356511.0992790157
         },
         "NODE02": {
            "avg_watt_consumption": 140.82331453872632,
            "total_energy_consumption": 327401.81385085924
         },
         "NODE03": {
            "avg_watt_consumption": 123.82224931497417,
            "total_energy_consumption": 287875.8332993752
         }
      },
      "metrics": {
         "PP0_ENERGY:PACKAGE1": {
            "count": 25,
            "min": 2.9063,
            "max": 71.1607,
            "avg": 45.523972,
            "sum": 1138.0993
         },
         "CPU0::PAPI_FP_INS": {
            "count": 24,
            "min": 869,
            "max": 565864880,
            "avg": 219248143.20833334,
            "sum": 5261955437
         },
         ...
   }
]
```
### Error Response



```
HTTP/1.1 404 NotFound
{
  "error": "No data found in the database."
}
```
## 3. Get summary filtered by deployment ID



	GET /summary/:workflowID/:taskID/:platformID/:deploymentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| taskID			| String			|  identifier of a task							|
| platformID			| String			|  identifier for a given platform, e.g. 'excesscluster' or 'laptop'							|
| deploymentID			| String			|  identifier (= hashvalue) of a given deployment plan							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/summary/ms2/t2.1/test_cluster/4e165a82309000fd5a6ab20c097b2e9f2ba5216d
```

### Success Response



```
HTTP/1.1 200 OK
[
   {
      "experiment_id": "AVRMbxnvGMPeuCn4HOiA",
      "workflow_id": "ms2",
      "task_id": "t2.1",
      "deployment_id": "4e165a82309000fd5a6ab20c097b2e9f2ba5216d",
      "runtime": {
         "start_time": "2016-04-25T10:02:07.103",
         "end_time": "2016-04-25T10:04:55.274",
         "actual_time": 168.171,
         "predicted_time": 2015
      },
      "energy":  [ .. ],
      "metrics": { .. }
   },
   {
      "experiment_id": "AVS_GvCNGMPeuCn4T-pC",
      "workflow_id": "ms2",
      "task_id": "t2.1",
      "deployment_id": "4e165a82309000fd5a6ab20c097b2e9f2ba5216d",
      "runtime": {
         "start_time": "2016-05-17T16:25:47.122",
         "end_time": "2016-05-17T16:26:22.296",
         "actual_time": 35.174,
         "predicted_time": 2015
      },
      "energy":  [ .. ],
      "metrics": { .. }
   }
]
```
### Error Response



```
HTTP/1.1 404 NotFound
{
  "error": "No data found in the database."
}
```
# Resources

## 2. Get resource information for a given platform



	GET /resources/:platformID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| platformID			| String			|  platform-specific identifier, e.g., 'excesscluster'							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/resources/excesscluster
```

### Success Response



```
{
   "nodes": [
      {
         "id": "node01",
         "cpus": [
            {
               "id": "cpu0",
               "cores": [
                  {
                     "id": "core0",
                     "pwMode": 0,
                     "status": "allocated",
                     "availTime": "null"
                  },
                  {
                     "id": "core1",
                     "pwMode": 0,
                     "status": "allocated",
                     "availTime": "null"
                  },
                  ...
               ]
            }
         ]
      }
   ]
}
```
### Error Response



```
HTTP/1.1 500 Internal Server Error
{
  "error": "Elasticsearch-specific error message."
}
```
## 1. Get a list of available resources by target platform



	GET /resources


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| none			| String			|  none parameters required							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/resources
```

### Success Response



```
HTTP/1.1 200 OK
{
   "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/resources"
}
```
### Error Response



```
HTTP/1.1 500 Internal Sever Error
{
  "error": "No results found."
}
```
## 3. Add resource information for a given platform



	PUT /resources/:platformID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| none			| String			|  no parameters required							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/resources/excesscluster
```

### Success Response



```
HTTP 200/OK
{
  "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/resources/excesscluster"

}
```
### Error Response



```
HTTP/1.1 500 Internal Server Error
{
  "error": "Elasticsearch-specific error message."
}
```
# Runtime

## 1. Get the runtime of a specific task



	GET /runtime/:workflowID/:taskID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| taskID			| String			|  identifier of a task							|
| experimentID			| String			|  Experiment identifer of an experiment							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/runtime/ms2/t2.1/AVZ-5cqVGYwmTvCuSqZC
```

### Success Response



```
HTTP/1.1 200 OK
{
   "start": "2016-08-12T15:20:40.631",
   "end": "2016-08-12T15:21:22.205",
   "runtime": 41.573999881744385,
   "host": "node02.excess-project.eu"
}
```
### Error Response



```
HTTP/1.1 500 Internal Server Error
{
  "error": "No results found."
}
```
## 2. Get runtime information of an entire experiment



	GET /runtime/:workflowID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| experimentID			| String			|  Experiment identifer of an experiment							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/runtime/ms2/AVZ-5cqVGYwmTvCuSqZC
```

### Success Response



```
HTTP/1.1 200 OK
{
   "workflow": "ms2",
   "tasks": [
      ...
      {
         "task": "T2.1",
         "data": {
            "start": "2016-08-12T15:20:40.631",
            "end": "2016-08-12T15:21:22.205",
            "runtime": 41.574
         }
      },
      {
         "task": "T2.2",
         "data": {
            "start": "2016-08-12T15:21:46.975",
            "end": "2016-08-12T15:22:25.983",
            "runtime": 39.008
         }
      },
      ...
   ],
   "start": "2016-08-12T15:17:46.731",
   "end": "2016-08-12T15:25:30.452",
   "total_runtime": 463.721
}
```
### Error Response



```
HTTP/1.1 500 Internal Server Error
{
  "error": "No results found."
}
```
# Statistics

## 1. Get statistics on a metric across all tasks



	GET /statistics/:workflowID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| metric			| String			|  name of a metric, e.g., metric=CPU0::PAPI_TOT_CYC							|
| host			| String			| **optional** hostname of the system, e.g., host=node01							|
| from			| String			| **optional** start time of the statistics, e.g., from=2016-05-10T17:35:57.610							|
| to			| String			| **optional** end time of the statistics, e.g., to=2016-05-10T17:35:57.610							|

### Examples



```
curl -i 'http://mf.excess-project.eu:3030/v1/mf/statistics/ms2?metric=CPU0::PAPI_TOT_CYC'
```

### Success Response



```
HTTP/1.1 200 OK
{
   "workflow": {
      "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/ms2"
   },
   "metric": "CPU0::PAPI_TOT_CYC",
   "statistics": {
      "count": 314,
      "min": 2188289,
      "max": 140712658075784,
      "avg": 27784198121927.688,
      "sum": 8724238210285294,
      "sum_of_squares": 1.2276032329935587e+30,
      "variance": 3.1376027710066886e+27,
      "std_deviation": 56014308627409.555,
      "std_deviation_bounds": {
         "upper": 139812815376746.8,
         "lower": -84244419132891.42
      }
   },
   "min": {
      "@timestamp": "2016-05-17T16:25:48.123",
      "host": "node01.excess-project.eu",
      "task": "t2.1",
      "type": "performance",
      "CPU0::PAPI_FP_INS": 869,
      "CPU0::PAPI_TOT_CYC": 2188289,
      "CPU1::PAPI_FP_INS": 891,
      "CPU1::PAPI_TOT_CYC": 1214959,
      "CPU2::PAPI_FP_INS": 8126,
      ...
   },
   "max": {
      ...
   }
}
```
### Error Response



```
HTTP/1.1 200 OK
{
  "error": "response is empty for the metric."
}
```
## 2. Get statistics on a metric filtered by task ID



	GET /statistics/:workflowID/:taskID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| taskID			| String			|  identifier of a task							|
| metric			| String			|  name of a metric, e.g., metric=CPU0::PAPI_TOT_CYC							|
| host			| String			| **optional** hostname of the system, e.g., host=node01							|
| from			| String			| **optional** start time of the statistics, e.g., from=2016-05-10T17:35:57.610							|
| to			| String			| **optional** end time of the statistics, e.g., to=2016-05-10T17:35:57.610							|

### Examples



```
curl -i 'http://mf.excess-project.eu:3030/v1/mf/statistics/ms2/t2.1?metric=CPU0::PAPI_TOT_CYC'
```

### Success Response



```
HTTP/1.1 200 OK
{
   "workflow": {
      "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/ms2"
   },
   "metric": "CPU0::PAPI_TOT_CYC",
   "statistics": {
      "count": 314,
      "min": 2188289,
      "max": 140712658075784,
      "avg": 27784198121927.688,
      "sum": 8724238210285294,
      "sum_of_squares": 1.2276032329935587e+30,
      "variance": 3.1376027710066886e+27,
      "std_deviation": 56014308627409.555,
      "std_deviation_bounds": {
         "upper": 139812815376746.8,
         "lower": -84244419132891.42
      }
   },
   "min": {
      "@timestamp": "2016-05-17T16:25:48.123",
      "host": "node01.excess-project.eu",
      "task": "t2.1",
      "type": "performance",
      "CPU0::PAPI_FP_INS": 869,
      "CPU0::PAPI_TOT_CYC": 2188289,
      "CPU1::PAPI_FP_INS": 891,
      "CPU1::PAPI_TOT_CYC": 1214959,
      "CPU2::PAPI_FP_INS": 8126,
      ...
   },
   "max": {
      ...
   }
}
```
### Error Response



```
HTTP/1.1 200 OK
{
  "error": "response is empty for the metric."
}
```
# Status

## 1. Get status report

Returns available data that was previously stored in the database. The body of the response is user-specific, and can represent any valid JSON document.

	GET /runtime/:workflowID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| experimentID			| String			|  Experiment identifer of an experiment							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/ms2/AVZ_VlqVGYwmTvCuTZLX
```

### Success Response



```
HTTP/1.1 200 OK
{
   "Status": "completed",
   "tasks": [
      {
         "name": "T1",
         "status": "completed",
         "startTime": "2016-08-12T17:20:01.844",
         "endTime": "2016-08-12T17:21:28.46",
         "nr_cores": 40,
         "progress": 100,
         "deploymentPlan": {
            "estimatedTime": 1111,
            "node": {
               "id": "node01",
               "cpus": [
                  {
                     "id": "cpu0",
                     "cores": [
                        {
                           "id": "core0",
                           "pwMode": 0
                        },
                        ...
                     ]
                  }
               ]
            }
         }
      },
      {
         "name": "t2.1",
         ...
      },
      ...
   ]
}
```
### Error Response



```
HTTP/1.1 404 NotFund
{
  "error": "No status report available."
}
```
## 1. Create/Update status report

Create or update a status report for the given workflow and experiment. The body of the request is user-specific, and can include any valid JSON document.

	PUT /runtime/:workflowID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  identifer of a workflow							|
| experimentID			| String			|  Experiment identifer of an experiment							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/status/ms2/AVZ_VlqVGYwmTvCuTZLX
```

### Success Response



```
HTTP/1.1 200 OK
{
  "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/ms2/AVZ_VlqVGYwmTvCuTZLX"
}
```
### Error Response



```
HTTP/1.1 500 InternalServerError
{
  "error": "Elasticsearch-specific error message"
}
```
# Workflows

## 2. Get information about a specific workflow



	GET /workflows/:workflowID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  Unique workflow identifier							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/ms2
```

### Success Response



```
HTTP/1.1 200 OK
{
  "wf_id": "ms2",
  "author": "Random Guy",
  "optimization": "Time",
  "tasks": [
    {
      "name": "T1",
      "exec": "/home/ubuntu/ms2/t1.sh",
      "cores_nr": "1-2"
    },
    {
      "name": "T2.1",
      "exec": "/home/ubuntu/ms2/t21.sh",
      "previous": "T1",
      "cores_nr": "1-2"
     }
  ]
}
```
### Error Response



```
HTTP/1.1 404 Not Found
{
  "error": "Workflow with the ID ':workflowID' not found."
}
```
## 3. Request a list of registered workflows



	GET /workflows


### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows
```

### Success Response



```
HTTP/1.1 200 OK
{
  "hpcdhopp": {
    "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/hpcdhopp"
  },
  "hpcdkhab": {
    "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/hpcdkhab"
  },
  "hpcfapix": {
    "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/hpcfapix"
  }
}
```
### Error Response



```
HTTP/1.1 404 Not Found
{
  "error": "No workflows found."
}
```
## 4. Register a new workflow and create a new experiment



	PUT /workflows


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| wf_id			| String			|  References a registered workflow by its ID							|
| author			| String			| **optional** Author name if provided while registering a new workflow							|
| optimization			| String			| **optional** Optimization criterium: time, energy, balanced							|
| tasks			| Array			| **optional** List of individual tasks the workflow is composed of							|
| tasks.name			| String			| **optional** ID of the given task (:taskID)							|
| tasks.exec			| String			| **optional** Executable for the given task							|
| tasks.cores_nr			| String			| **optional** Range of CPU cores used for executing the task on							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows
```

### Success Response



```
HTTP/1.1 200 OK
{
  "workflow": {
    "id":   "ms2",
    "href": "http://mf.excess-project.eu:3030/v1/workflows/ms2"
  },
  "experiment": {
    "id":   "AVXotMWFA9kSggr_MSq2",
    "href": "http://mf.excess-project.eu:3030/v1/experiments/AVXotMWFA9kSggr_MSq2?workflow=ms2"
  }
}
```
### Error Response



```
HTTP/1.1 500 Internal Server Error
{
  "error": "Resource could not be stored"
}
```


```
HTTP/1.1 400 Bad Request
{
  "error": "The parameter 'wf_id' to reference a workflow ID is missing."
}
```
## 1. Register a new workflow with a custom ID



	PUT /workflows/:workflowID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  Unique workflow identifier							|
| wf_id			| String			| **optional** References a registered workflow by its ID							|
| author			| String			| **optional** Author name if provided while registering a new workflow							|
| optimization			| String			| **optional** Optimization criterium: time, energy, balanced							|
| tasks			| Array			| **optional** List of individual tasks the workflow is composed of							|
| tasks.name			| String			| **optional** ID of the given task (:taskID)							|
| tasks.exec			| String			| **optional** Executable for the given task							|
| tasks.cores_nr			| String			| **optional** Range of CPU cores used for executing the task on							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/ms2
```

### Success Response



```
HTTP/1.1 200 OK
{
  "href": "http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/ms2",
}
```
### Error Response



```
HTTP/1.1 500 Internal Server Error
{
  "error": "Resource could not be stored"
}
```
## 5. Register a new workflow and experiment using custom IDs



	PUT /workflows/:workflowID/:experimentID


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| workflowID			| String			|  Unique workflow identifier							|
| experimentID			| String			|  Unique experiment identifier							|
| wf_id			| String			| **optional** References a registered workflow by its ID							|
| author			| String			| **optional** Author name if provided while registering a new workflow							|
| optimization			| String			| **optional** Optimization criterium: time, energy, balanced							|
| tasks			| Array			| **optional** List of individual tasks the workflow is composed of							|
| tasks.name			| String			| **optional** ID of the given task (:taskID)							|
| tasks.exec			| String			| **optional** Executable for the given task							|
| tasks.cores_nr			| String			| **optional** Range of CPU cores used for executing the task on							|

### Examples



```
curl -i http://mf.excess-project.eu:3030/v1/dreamcloud/mf/workflows/ms2/myUniqueID
```

### Success Response



```
HTTP/1.1 200 OK
{
  "workflow": {
    "id":   "ms2",
    "href": "http://mf.excess-project.eu:3030/v1/workflows/ms2"
  },
  "experiment": {
    "id":   "myUniqueID",
    "href": "http://mf.excess-project.eu:3030/v1/experiments/myUniqueID?workflow=ms2"
  }
}
```
### Error Response



```
HTTP/1.1 500 Internal Server Error
{
  "error": "Resource could not be stored"
}
```

