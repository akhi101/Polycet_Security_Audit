define(['app'], function (app) {
    app.controller("StudentChangePasswordController", function ($scope, $state, $filter, $localStorage, $stateParams, $crypto, AppSettings, ChangePasswordService, SystemUserService) {

        var authData = $localStorage.authorizationData;
        //var tmp = $localStorage.TempData;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.UserName = authData.UserName;

        AppSettings.UserName = authData.UserName;
        AppSettings.LoggedUserId = tmp.RegistrationId;




        $scope.ChangePassword = {};
        $scope.shownewpassword = false;
        $scope.CheckOldPassword = function () {
            if (($scope.OldPassword == undefined) || ($scope.OldPassword == "")) {
                alert("Enter Old Password");
                return false;
            }
            let reqdata = $crypto.encrypt($scope.OldPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(AppSettings.LoggedUserId.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = ChangePasswordService.GetCheckOldPassword(reqdata);
            getPromise.then(function (data) {
                if (data == 0) {
                    alert("Invalid Old Password");
                    return;
                } else {
                    $scope.shownewpassword = true;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.SaveChangePassword = function () {
            if (($scope.OldPassword == undefined) || ($scope.OldPassword == "")) {
                alert("Enter Old Password");
                return;
            }

            if (($scope.NewPassword == undefined) || ($scope.NewPassword == "")) {
                alert("Enter New Password");
                return;
            }
            if (($scope.ConfirmPassword == undefined) || ($scope.ConfirmPassword == "")) {
                alert("Enter Confirm Password");
                return;
            }
            if ($scope.NewPassword != $scope.ConfirmPassword) {
                alert("New Password and Confirm Password did not match.");
                return;
            }
            var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*(?:yourUserId|yourAppName)).{8,}$/;
            if (passwordRegex.test($scope.NewPassword)) {
            } else {
                alert('Password does not meet the requirements');
                return;
            }
            if (passwordRegex.test($scope.ConfirmPassword)) {
            } else {
                alert('Password does not meet the requirements');
                return;
            }
            var DataType = 2;
            let reqdata = $crypto.encrypt($scope.NewPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt($scope.OldPassword, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(AppSettings.LoggedUserId.toString(), sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(DataType.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = ChangePasswordService.GetChangePassword(reqdata);
            getPromise.then(function (data) {
                if (data.ResponceCode == "200") {
                    alert(data.ResponceDescription);
                    RedirectToListPage();
                } else {
                    alert(data.ResponceDescription);
                    $scope.OldPassword = "";
                    $scope.NewPassword = "";
                    $scope.ConfirmPassword = "";
                }

            }, function (error) {
                alert(error);
            });
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('index.Login');
        }

        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            var GetUserLogout = SystemUserService.PostUserLogout(1, authData.UserName, $scope.SessionID);
            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('index.Login')
        }
    });
});

