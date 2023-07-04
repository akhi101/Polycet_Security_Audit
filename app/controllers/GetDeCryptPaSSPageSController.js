define(['app'], function (app) {
    app.controller("GetDeCryptPaSSPageSController", function ($scope,SystemUserService,$state, AdminService, StudentRegistrationService, ForgotPasswordService, $crypto, $scope, $crypto) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
         
        }

        var sessioneKey = SystemUserService.GetSessionEKey();
        sessioneKey.then(function (res) {
            $scope.LoginSessionEKey = res;
            sessionStorage.SessionEkey = res;

        });
        $scope.UserTypeID = 2;

       
            $scope.Submit = function () {

               
              
                    var DataType = 4;
                    var reqdata = $crypto.encrypt("ADMIN", $scope.LoginSessionEKey) + "$$@@$$" + $crypto.encrypt($scope.MobileNumber, $scope.LoginSessionEKey) + "$$@@$$" + $crypto.encrypt(DataType.toString(), $scope.LoginSessionEKey) + "$$@@$$" + $scope.LoginSessionEKey;
                    var getPromise = ForgotPasswordService.GetForgotPassword(reqdata);
                    getPromise.then(function (data) {

                        $scope.Password = data;
                        alert($scope.Password);
                        $scope.UserName = null;



                    });
                }
            

          
        
        })
})