"use strict";

app.controller("mainPage", function ($scope, $http) {

    $scope.inputURL = "httpstat.us/";
    $scope.databaseData = null;

    $scope.httpDisplayDatabase = function(sentDatabaseBtnLabel) {

        if (sentDatabaseBtnLabel) {
            $http.get("/api/Responses").then(function(response) {
                $scope.databaseData = response.data;
            });
        } else {
            $scope.databaseData = null;
        }
    }

    $scope.httpPostRequest = function(sentPostData) {

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
            $('#post-result-report').text("**POST Successful**");
        }, function errorCallback(response) {
            $('#post-result-report').text("**Unsuccessful POST Attempt**");
        });
    }

    $scope.httpGetRequest = function (sentQueryType, sentProtocol, sentInputURL) {
        
        // Current time before http request
        let queryStart = {
            inMilliSec: Date.now(),
            readable: new Date().toUTCString()
        };

        // Sets the query report data 
        let setResponseData = function (sentResponse) {
            $scope.queryData = {
                inputURL: sentResponse.config.url,
                requestStartTime: queryStart.readable,
                responseTime: Date.now() - queryStart.inMilliSec, // Finds the difference between query received and query start
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
