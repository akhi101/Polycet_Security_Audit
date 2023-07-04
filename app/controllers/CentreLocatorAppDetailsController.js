define(['app'], function (app) {
    app.controller("CentreLocatorAppDetailsController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var tmpData = $localStorage.authorizationData;

        //$scope.CoordinatingCentreCode = tmp.CentreCode;

        if ((tmpData == undefined) || (tmpData != undefined && tmpData.UserTypeName != 'Administrator')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = tmpData.UserName;
            $scope.SessionID = $localStorage.SessionID;
            $scope.Session = $localStorage.authorizationData.Session;
        //var UserTypeID = parseInt(authData.UserTypeID);
        //$scope.SessionID = $localStorage.SessionID;
        //$scope.UserID = authData.UserID;
        //var tmp = $localStorage.TempData;

            const $ctrl = this;

            $ctrl.$onInit = () => {
                $scope.getMobileAppReport();
            }


        }
            $scope.GoBack = function () {
                $state.go('Dashboard')
            }



        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });

        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            var DataType = 14;
            //var UserName = 0;
            var exceldownload = AdminService.GetMobileAppReportExcel(DataType, $scope.UserName, 0, $scope.Session, '');
            exceldownload.then(function (res) {
                var response = JSON.parse(res);
                console.log(response)
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

      

        $scope.getMobileAppReport = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 13;
            var examinationCentresReportDataNew = AdminService.GetMobileAppReport(DataType, $scope.UserName, 0, $scope.Session, '');
            examinationCentresReportDataNew.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                console.log(response)
                //console.log(Res)
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.CenterLocationReportData = response;
                    $scope.CentrePhoto = response.CentrePhoto
                    $scope.loading = false;
                    $scope.nodata = false;

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.CenterLocationReportData = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
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
            $state.go('Dashboard.ChangePassword');
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