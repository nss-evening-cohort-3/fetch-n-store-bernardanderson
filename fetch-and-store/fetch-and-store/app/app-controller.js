"use strict";

app.controller("mainPage", function ($scope) {

    $scope.updateQueryType = function (sentQueryType, sentInputURL) {
        console.log(`Query Type updated to: ${sentInputURL}`);
        $("#user-field").text(`You will ${sentQueryType} at ${sentInputURL}`);
    }

});
