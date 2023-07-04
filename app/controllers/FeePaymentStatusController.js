define(['app'], function (app) {
    app.controller("FeePaymentStatusController", function ($scope, $uibModal, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {

        var authData = $localStorage.authorizationData;
        //if (authData == undefined) {
        //    $state.go('index.OfficialsLogin')
        //}
        //$scope.UserName = authData.UserName;
        //$scope.SessionID = $localStorage.SessionID;
        //$scope.UserID = authData.UserID;
        //$scope.UserTypeID = authData.UserTypeID;

        const $ctrl = this;

        $ctrl.$onInit = () => {

        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }


        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.LoginEKey = res;
            sessionStorage.Ekey = res;

        });

        var sessioneKey = SystemUserService.GetSessionEKey();
        sessioneKey.then(function (res) {
            $scope.LoginSessionEKey = res;
            sessionStorage.SessionEkey = res;

        });

        $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')


        var captcha = AdminService.GetCaptchaString($scope.SessionCaptcha);
        captcha.then(function (response) {
            try {
                var res = JSON.parse(response);
                $scope.GetCatcha = res[0].Text;
                $scope.CaptchaImage = res[0].Image;

            } catch (err) {
                $scope.GetCatcha = ''
            }
        }, function (error) {
            $scope.GetCatcha = ''
            alert('Unable to load Captcha')
        });

        $scope.GetCaptchaData = function () {
            var captcha = AdminService.GetCaptchaString($scope.SessionCaptcha);
            captcha.then(function (response) {
                try {
                    var res = JSON.parse(response);
                    $scope.GetCatcha = res[0].Text;
                    $scope.CaptchaImage = res[0].Image;

                } catch (err) {
                    $scope.GetCatcha = ''
                }
            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }



        $scope.ValidateCaptcha = function () {

            if ($scope.MobileNumber == null || $scope.MobileNumber == undefined || $scope.MobileNumber == '') {
                alert('Please Enter Correct Mobile Number / Registration Number');
                return;
            }
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.getbutton = false;
                return;
            };
            var captcha = AdminService.ValidateCaptcha($scope.SessionCaptcha, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponseDescription);
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.GetDetails()
                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }

        $scope.ValidateCaptcha1 = function () {

            if ($scope.ChallanNumber == null || $scope.ChallanNumber == undefined || $scope.ChallanNumber == '') {
                alert('Please Enter Correct Challan Number');
                return;
            }
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.getbutton = false;
                return;
            };
            var captcha = AdminService.ValidateCaptcha($scope.SessionCaptcha, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponseDescription);
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.GetDetailsbyChallan()
                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }


        $scope.GetDetails = function () {
            $scope.loading = true;
            var DataType = 1;
            var ChallanNumber = '';
            var getdata = AdminService.GetPaymentDetails(DataType, $scope.MobileNumber, ChallanNumber);
            getdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0 && res.Table[0].ResponceCode != '400') {
                    $scope.loading = false;
                    $scope.PaymentData = res.Table;
                    $scope.NoData = false;
                    $scope.ExcelButton = true;

                } else if (res.Table[0].ResponceCode == '400') {
                    $scope.loading = false;
                    $scope.NoData = true;
                    alert('No Data Found');

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        $scope.GetDetailsbyChallan = function () {
            $scope.loading = true;
            var DataType = 2;
            var MobileNumber = '';
            var getdata = AdminService.GetPaymentDetails(DataType, MobileNumber, $scope.ChallanNumber);
            getdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                console.log(res.Table)
                if (res.Table.length > 0 && res.Table[0].ResponceCode != '400') {
                    $scope.loading = false;
                    $scope.PaymentDatanew = res.Table;
                    $scope.NoData = false;
                    $scope.ExcelButton = true;

                } else if (res.Table[0].ResponceCode == '400') {
                    $scope.loading = false;
                    $scope.NoData = true;
                    alert('No Data Found');

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        $scope.getPaymentReciept = function (ChallanNumber) {
            $localStorage.TempData = {
                ChallanNumber: ChallanNumber,
            };

            $state.go('index.PaymentReciept');
        }

        //$scope.getPaymentReciept1 = function () {
        //    $localStorage.TempData1 = {
        //        ChallanNumber: $scope.ChallanNumber,
        //    };

        //    $state.go('index.PaymentReciept');
        //}

        $scope.SiteViews = 0;
        var GetWebSiteVisiterCount = AdminService.GetWebSiteVisiterCount();
        GetWebSiteVisiterCount.then(function (response) {
            try {
                var res = JSON.parse(response)
            }
            catch (err) {

            }

            $scope.SiteViews = res.Table[0].WebsiteVisitedCount;
        },
            function (error) {

                var err = JSON.parse(error);
            });

        $scope.ChangePassword = function () {
            $state.go('Dashboard.Settings.ChangePassword');
        }


        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            var GetUserLogout = SystemUserService.PostUserLogout(2, $scope.UserName, $scope.LoginSessionEkey);
            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                //    userName: ""
            };
            $state.go('index.OfficialsLogin')
        }
    })
})