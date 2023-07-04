define(['app'], function (app) {
    app.controller("GetOMRController", function ($scope, $uibModal, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {

        //var authData = $localStorage.authorizationData;
        //if (authData == undefined) {
        //    $state.go('index.OfficialsLogin')
        //}

        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.DataType = "2"
        }

        $scope.GoBack = function () {
            $state.go('index')
        }

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



        $scope.ValidateCaptcha1 = function (MobileNumber) {
            $scope.MobileNumber = MobileNumber;
            if ($scope.MobileNumber == "" || $scope.MobileNumber == undefined || $scope.MobileNumber == null) {
                alert("Enter Registration Number/Mobile Number");
                $scope.loginbutton = false;
                return;
            }

            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
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
                    $scope.viewOmr1($scope.MobileNumber);
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

        $scope.ValidateCaptcha2 = function (HallTicketNumber) {
            $scope.HallTicketNumber = HallTicketNumber;
            if ($scope.HallTicketNumber == "" || $scope.HallTicketNumber == undefined || $scope.HallTicketNumber == null) {
                alert("Enter HallTicket Number");
                $scope.loginbutton = false;
                return;
            }
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
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
                    $scope.viewOmr2($scope.HallTicketNumber);
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
        $scope.viewOmr1 = function () {
            $scope.Loading = true;
            var DataType = 1;
            var getomr = AdminService.ViewOmrDetails(DataType,$scope.MobileNumber);
            getomr.then(function (res) {
                console.log(res.barcode)
                var res = JSON.parse(res);
                if (res[0].ResponseCode == '200') {
                    $scope.Loading = false;
                    $scope.Data = true;
                    $scope.nodata = false;
                    var barcode = res[0].Barcode
                    var url = window.location.origin + '/omrsheets/' + barcode + '.jpg';
                    $scope.Barcode = url.replace(/\s/g, '');;;
                    $scope.gotopage1($scope.MobileNumber);
                } else {
                    $scope.Loading = false;
                    $scope.Data = false;
                    $scope.nodata = true;
                    alert("No Data Found")
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.nodata = true;
                    alert("error while loading data");
                    var err = JSON.parse(error);
                });
        }


        $scope.viewOmr2 = function () {
            $scope.Loading = true;
            var DataType = 2;
            var getomr = AdminService.ViewOmrDetails(DataType,$scope.HallTicketNumber);
            getomr.then(function (res) {
                console.log(res.barcode)
                var res = JSON.parse(res);
                if (res[0].ResponseCode == '200') {
                    $scope.Loading = false;
                    $scope.Data = true;
                    $scope.nodata = false;
                    var barcode = res[0].Barcode
                    var url = window.location.origin + '/omrsheets/' + barcode + '.jpg';
                    $scope.Barcode = url.replace(/\s/g, '');
                    $scope.gotopage2($scope.HallTicketNumber)
                } else {
                    $scope.Loading = false;
                    $scope.Data = false;
                    $scope.nodata = true;
                    alert("No Data Found")
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.nodata = true;
                    alert("error while loading data");
                    var err = JSON.parse(error);
                });
        }

        $scope.gotopage1 = function () {
            $localStorage.TempData = {
                UserTypeName: $scope.UserTypeName,
                UserTypeID: $scope.UserTypeID,
                UserName: $scope.UserName,
                Barcode: $scope.Barcode
            };

            $state.go('index.ViewOMR');

        }

        $scope.gotopage2 = function () {
            $localStorage.TempData = {
                UserTypeName: $scope.UserTypeName,
                UserTypeID: $scope.UserTypeID,
                UserName: $scope.UserName,
                Barcode: $scope.Barcode
            };

            $state.go('index.ViewOMR');

        }


        $scope.SiteViews = 0;

        var GetWebSiteVisiterCount = AdminService.GetWebSiteVisiterCount();
        GetWebSiteVisiterCount.then(function (response) {
            var res = JSON.parse(response)
            $scope.SiteViews = res.Table[0].WebsiteVisitedCount;
        },
            function (error) {

                var err = JSON.parse(error);
            });






    })
})