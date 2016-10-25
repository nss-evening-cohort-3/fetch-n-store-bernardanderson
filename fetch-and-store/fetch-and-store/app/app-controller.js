"use strict";

app.controller("mainPage", function ($scope, $http) {

    $scope.inputURL = "httpstat.us/";
    $scope.databaseData = null;

    $scope.httpDisplayDatabase = function() {

        $http.get("/api/Responses").then(function(response) {
            console.log(response.data);
            $scope.databaseData = response.data;
        });

        /*
        let databaseObject = {
            StatusCode: sentPostData.statusCode,
            URL: sentPostData.inputURL,
            ResponseTime: sentPostData.responseTime,
            RequestTime: sentPostData.requestStartTime,
            HTTPMethod: sentPostData.queryType
        }
        */
    }




    $scope.httpPostRequest = function(sentPostData) {

        console.log(sentPostData);

        let databaseObject = {
            StatusCode: sentPostData.statusCode,
            URL: sentPostData.inputURL,
            ResponseTime: sentPostData.responseTime,
            RequestTime: sentPostData.requestStartTime,
            HTTPMethod: sentPostData.queryType
        }

        $http({
            method: 'POST',
            url: '/api/Responses',
            data: databaseObject
        }).then(function successCallback(response) {
            console.log("Successful Post");
        }, function errorCallback(response) {
            console.log("Post not Successful");
        });
    }

    $scope.httpGetRequest = function (sentQueryType, sentProtocol, sentInputURL) {
        
        // Current time before http request
        let queryStart = Date.now();

        // Sets the query report data 
        let setResponseData = function (sentResponse) {
            $scope.queryData = {
                inputURL: sentResponse.config.url,
                requestStartTime: queryStart,
                responseTime: Date.now() - queryStart, // Finds the difference between query received and query start
                queryType: sentResponse.config.method,
                statusCode: sentResponse.status,
                queryData: sentResponse.data,
                responseSent: true
            };
        };

        if (sentInputURL !== '') {
            if (sentQueryType === 'get' || sentQueryType === 'head') {
                $http({
                    method: sentQueryType,
                    url: `${sentProtocol}${sentInputURL}`
                }).then(function successCallback(response) {
                    setResponseData(response);
                }, function errorCallback(response) {
                    setResponseData(response);
                });
            } 
        }
    }
});
