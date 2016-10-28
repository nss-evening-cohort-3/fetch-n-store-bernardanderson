"use strict";

// app.controller("mainPage", ['$scope', '$http', function ($scope, $http) { }]); // This is used in minifying 
app.controller("mainPage", function ($scope, $http) {

    $scope.inputURL = "httpstat.us/";
    $scope.databaseData = {
        data: [],
        hideTable: true
    };

    $scope.httpDisplayDatabase = function(sentDatabaseBtnLabel) {

        if (sentDatabaseBtnLabel) {
            $http.get("/api/Responses").then(function(response) {
                $scope.databaseData.data = response.data;
                $scope.databaseData.hideTable = false;
            });
        } else {
            $scope.databaseData.hideTable = true;
        }
    }

    $scope.httpDeleteRequestFromDatabase = function (sentResponseID) {

        let deleteSingleDatabaseItemInView = function (sentResponseID) {
            let indexToDelete = $scope.databaseData.data.indexOf(sentResponseID);
            $scope.databaseData.data.splice(indexToDelete, 1);
        }

        $http({
            method: 'DELETE',
            url: `/api/Responses/${sentResponseID}`,
        }).then(function successCallback(response) {
            deleteSingleDatabaseItemInView(sentResponseID);
        }, function errorCallback(response) {
            alert(`${sentResponseID} NOT deleted!`);
        });
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
            $scope.databaseData.data.push(response.data);
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
                    $('#post-result-report').text("**GET Request Successful**");
                }, function errorCallback(response) {
                    if (response.status === -1) {
                        $scope.queryData = {
                            responseSent: false
                        };
                        $('#post-result-report').text("**ERROR in GET Request**");
                    } else {
                        $('#post-result-report').text("**GET Request Successful**");
                        setResponseData(response);
                    }
                });
            } 
        }
    }
});
