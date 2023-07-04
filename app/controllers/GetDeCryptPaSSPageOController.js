define(['app'], function (app) {
    app.controller("GetDeCryptPaSSPageOController", function ($scope, SystemUserService, $state, AdminService, StudentRegistrationService, ForgotPasswordService, $crypto, $scope, $crypto) {
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }

        var sessioneKey = SystemUserService.GetSessionEKey();
        sessioneKey.then(function (res) {
            $scope.LoginSessionEKey = res;
            sessionStorage.SessionEkey = res;

        });
        $scope.UserTypeID = 1;


        $scope.Submit = function () {

            var DataType = 3;
       
                var reqdata = $crypto.encrypt($scope.UserName, $scope.LoginSessionEKey) + "$$@@$$" + $crypto.encrypt("9182848605", $scope.LoginSessionEKey) + "$$@@$$" + $crypto.encrypt(DataType.toString(), $scope.LoginSessionEKey) + "$$@@$$" + $scope.LoginSessionEKey;
                var getPromise = ForgotPasswordService.GetForgotPassword(reqdata);
                getPromise.then(function (data) {
               
                    $scope.Password = data;
                    alert($scope.Password);
                    $scope.UserName = null;



                });
            }
        



    })
})