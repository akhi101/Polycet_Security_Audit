define(['app'], function (app) {
    app.controller("FeePaymentDetailsController", function ($scope, $uibModal, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {
        var authData = $localStorage.authorizationData;
        if ((authData == undefined) || (authData != undefined && authData.UserTypeName != 'Administrator')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = authData.UserName;
            $scope.SessionID = $localStorage.SessionID;
            $scope.UserID = authData.UserID;
            $scope.UserTypeID = authData.UserTypeID;
            $scope.Session = $localStorage.authorizationData.Session
            const $ctrl = this;

            $ctrl.$onInit = () => {

            }
        }
        

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        $scope.GetDetails = function (MobileNumber) {
            $scope.MobileNumber = MobileNumber;
            var DataType = 1;
            var ChallanNumber = '';
            if ($scope.MobileNumber == null || $scope.MobileNumber == undefined || $scope.MobileNumber == '') {
                alert('Please Enter Correct Mobile Number / Registration Number');
                return;
            }
            $scope.loading = true;
            var getdata = AdminService.GetPaymentDetails(DataType, $scope.MobileNumber, ChallanNumber,$scope.UserName,$scope.Session,null);
            getdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.PaymentData = res.Table;
                    $scope.NoData = false;
                    $scope.ExcelButton = true;

                } else {
                    $scope.PaymentData = [];
                    $scope.loading = false;
                    $scope.NoData = true;
                    alert("No Data Found");
                    $scope.ExcelButton = false;

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            var exceldownload = AdminService.GetPaymentDetailsExcel(2,$scope.MobileNumber,'',$scope.UserName, $scope.Session,'');
            exceldownload.then(function (res) {
                var response = JSON.parse(res);
                if (response[0].ResponceCode == '200') {
                    $scope.loading = false;

                    var location = response[0].file;
                    window.location.href = location;
                    $scope.Error1 = false;
                    $scope.Noresult = false;
                } else if (response[0].ResponceCode == '400') {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error1 = true;
                    $scope.ErrMsg1 = response[0].ResponceDescription;
                    alert($scope.ErrMsg1)
                } else {
                    $scope.loading = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;
                    $scope.Error1 = false;

                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        }

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

            var GetUserLogout = SystemUserService.PostUserLogout(1, $scope.UserName, $scope.SessionID, $scope.Session);
            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('index.OfficialsLogin')
        }
    })
})