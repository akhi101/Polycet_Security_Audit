define(['app'], function (app) {
    app.controller("DCCentreLocatorAppController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var tmpData = $localStorage.authorizationData;
        if ((tmpData == undefined) || (tmpData != undefined && tmpData.UserTypeName != 'CoordinatingCentre')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = tmpData.UserName;
            $scope.CoordinatingCentreCode = $scope.UserName;
            $scope.SessionID = $localStorage.SessionID;
            $scope.Session = $localStorage.authorizationData.Session
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


        $scope.getMobileAppReport = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 15;
            var examinationCentresReportDataNew = AdminService.GetMobileAppReport(DataType,$scope.UserName, $scope.CoordinatingCentreCode,$scope.Session,'');
            examinationCentresReportDataNew.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                //console.log(Res)
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.CenterLocationReportData = response;
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