define(['app'], function (app) {
    app.controller("DCWiseExamCentresAttendanceController", function ($scope, $uibModal, PreExaminationService, SystemUserService, $crypto, $state, $localStorage, AdminService) {
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
            $scope.getExaminationCentresNRDownload();
        }

        $scope.GoBack = function () {
            if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
                $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
                $state.go('Dashboard.MarkAttendance')
            }
            else if ($scope.UserTypeName == 'CoordinatingCentre') {
                $state.go('Dashboard')
            }
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });



        if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
            $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
            $scope.CoordinatingCentreCode = tmp.CentreCode;
        }
        else if ($scope.UserTypeName == 'CoordinatingCentre') {
            $scope.CoordinatingCentreCode = authData.UserName;
        }



        $scope.getExaminationCentresNRDownload = function () {
            $scope.loading = true;
            $scope.nodata = false;
            if ($scope.UserTypeName == 'CoordinatingCentre') {
                var DataType = 6;
            }
            else if ($scope.UserTypeName == 'ExaminationCentre') {
                var DataType = 7;

            }
            else if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
                $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
                var DataType = 10;

            }
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

        $scope.ShowAttendanceList = function (CentreCode, ExaminationCentreID) {
            $localStorage.TempData1 = {
                CentreCode: CentreCode,
                ExaminationCentreID: ExaminationCentreID
            };
            $state.go('Dashboard.AttendanceSheet')
        }

        $scope.releaseAttendance = function (ExaminationCentreID) {
            var att = AdminService.SetExamAttendance(ExaminationCentreID, $scope.UserName);
            att.then(function (res) {
                var response = JSON.parse(res);
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.ExamCentresNRData = [];
                    $scope.getExaminationCentresNRDownload();
                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription)
                }
            }, function (err) {
                $scope.loading = false;
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
