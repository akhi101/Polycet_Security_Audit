define(['app'], function (app) {
    app.controller("ExamCentreAttendanceController", function ($scope, $uibModal, PreExaminationService, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.UserTypeName = authData.UserTypeName;
        $scope.CoordinatingCentreCode = authData.UserTypeName;
        const $ctrl = this;
        $scope.UserName = authData.UserName;

        $ctrl.$onInit = () => {
            $scope.getExaminationCentresNRDownload();
        }

        $scope.GoBack = function () {
 
            if ($scope.UserTypeName == 'ExaminationCentre') {
                $state.go('Dashboard')
            }
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });

        $scope.getExaminationCentresNRDownload = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 7;
            var dcexaminationCentresReportDataNew = AdminService.GetExaminationCentresNRDownload(DataType, $scope.UserName, $scope.CoordinatingCentreCode);
            dcexaminationCentresReportDataNew.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.ExamCentresNRData = response;
                    $scope.loading = false;
                    $scope.nodata = false;
                    //console.log(response.Table)
                    $scope.CoordinatorID = response[0];

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.ExamCentresNRData = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.ShowAttendanceList1 = function (CentreCode, ExaminationCentreID) {
            $localStorage.TempData2 = {
                CentreCode: CentreCode,
                ExaminationCentreID: ExaminationCentreID
            };
            $state.go('Dashboard.AttendanceSheet')
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
            var GetUserLogout = SystemUserService.PostUserLogout(1, authData.UserName, $scope.SessionID);
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
