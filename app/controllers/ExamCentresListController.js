define(['app'], function (app) {
    app.controller("ExamCentresListController", function ($scope, $uibModal, PreExaminationService, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        //$scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.UserTypeName = authData.UserTypeName;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $scope.UserName = authData.UserName;

        $ctrl.$onInit = () => {
            $scope.getExaminationCentresList();
        }

        $scope.GoBack = function () {
            if ($scope.UserTypeName == 'Administrator') {
                $state.go('Dashboard.MarkAttendance')
            }
            else if ($scope.UserTypeName == 'CoordinatingCentre' || $scope.UserTypeName == 'ExaminationCentre') {
                $state.go('Dashboard')
            }
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });





        if ($scope.UserTypeName=='ExaminationCentre') {
            $scope.CoordinatingCentreCode = tmp.CentreCode;
        }
        else if ($scope.UserTypeName == 'CoordinatingCentre') {
            $scope.CoordinatingCentreCode = authData.UserName;
        }
        else if ($scope.UserTypeName == 'Administrator') {
            $scope.CoordinatingCentreCode = tmp.CentreCode;
        }



        $scope.getExaminationCentresList = function () {
            $scope.loading = true;
            $scope.nodata = false;
            if ($scope.UserTypeName == 'CoordinatingCentre') {
                var DataType = 10;
            }
            else if ($scope.UserTypeName == 'ExaminationCentre') {
                var DataType = 7;

            }
            else if ($scope.UserTypeName == 'Administrator') {
                var DataType = 10;

            }
            var dcexaminationCentresReportDataNew = AdminService.GetExaminationCentres(DataType, $scope.UserName, $scope.CoordinatingCentreCode);
            dcexaminationCentresReportDataNew.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.ExamCentresData = response;
                    $scope.loading = false;
                    $scope.nodata = false;
                    //console.log(response.Table)
                    $scope.CoordinatorID = response[0];

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.ExamCentresData = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.openDetails = function (data) {
            $localStorage.ExaminationCentreID = data.ExaminationCentreID
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
