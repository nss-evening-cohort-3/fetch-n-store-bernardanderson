"use strict";

app.controller("mainPage", function ($scope, $http) {

    $scope.inputURL = "httpstat.us/";

    $scope.httpPostRequest = function(sentPostData) {

        console.log(sentPostData);
        
        /* 
        $http({
            method: 'POST',
            url: '/api/Response',
            data: 'Some Data'
        }).then(function successCallback(response) {
            setResponseData(response);
        }, function errorCallback(response) {
            setResponseData(response);
        });
        */
    }


    $scope.httpGetRequest = function (sentQueryType, sentInputURL) {
        
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
            } 
        }
    }
});
