define(['app'], function (app) {
    app.controller("ApplicationController", function ($scope, $state, AdminService, StudentRegistrationService) {
        $scope.status = "active";

        $(".personal").addClass("active");
        var VerifyDate = AdminService.VerifyRegistrationDates();
        VerifyDate.then(function (response) {
            if (response.Table[0].ResponseCode == '200') {
                //   $state.go('index');

            } else if (response.Table[0].ResponseCode == '400') {
                $state.go('index')
                alert(response.Table[0].ResponseDescription)


            }
        },
            function (error) {
                alert("error while Verifying Dates")
                //var err = JSON.parse(error);

            });

    })
})