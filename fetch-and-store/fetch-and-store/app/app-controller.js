"use strict";

app.controller("mainPage", function ($scope, $http) {

    $scope.inputURL = "httpstat.us/";

    $scope.httpRequest = function (sentQueryType, sentInputURL) {
        
        // Current time before http request
        let queryStart = Date.now();

        // Sets the query report data 
        let setResponseData = function (sentResponse) {
            $scope.queryData = {
                inputURL: sentResponse.config.url,
                responseTime: Date.now() - queryStart, // Finds the difference between query received and query start
                queryType: sentResponse.config.method,
                statusCode: sentResponse.status,
                responseSent: true
            };
        };
        if (sentInputURL !== '') {
            if (sentQueryType === 'get' || sentQueryType === 'head') {
                $http({
                    method: sentQueryType,
                    url: `http://${sentInputURL}`
                }).then(function successCallback(response) {
                    setResponseData(response);
                }, function errorCallback(response) {
                    setResponseData(response);
                });
            } else if (sentQueryType === 'post') {
                $http({
                    method: sentQueryType,
                    url: `http://${sentInputURL}`,
                    data: ""
                }).then(function successCallback(response) {
                    setResponseData(response);
                }, function errorCallback(response) {
                    setResponseData(response);
                });
            }
        }
    }
});
