define(['app'], function (app) {
    app.controller("DCWiseExamCentresNRExcelController", function ($scope, $uibModal, PreExaminationService, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if ((authData == undefined) || (authData != undefined && authData.UserTypeName != 'Administrator' && authData.UserTypeName != 'CoordinatingCentre')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            //$scope.UserName = authData.UserName;
            $scope.UserTypeID = authData.UserTypeID;
            $scope.SessionID = $localStorage.SessionID;
            $scope.UserID = authData.UserID;
            $scope.UserTypeName = authData.UserTypeName;
            $scope.Session = $localStorage.authorizationData.Session
            var tmp = $localStorage.TempData;

            $scope.UserName = authData.UserName;
            const $ctrl = this;
            $scope.UserName = authData.UserName;
            if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
                $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
                $scope.CoordinatingCentreCode = tmp.CentreCode;
            }
            else if ($scope.UserTypeName == 'CoordinatingCentre') {
                $scope.CoordinatingCentreCode = authData.UserName;
            }
            $ctrl.$onInit = () => {
                $scope.getExaminationCentresNRDownload();
            }

        }


        $scope.GoBack = function () {
            if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
                $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
                $state.go('Dashboard.NRExcel')
            }
            else if ($scope.UserTypeName == 'CoordinatingCentre') {
                $state.go('Dashboard.NRExcel')
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
            var dcexaminationCentresReportDataNew = AdminService.GetExaminationCentresNRDownload(DataType, $scope.UserName, $scope.CoordinatingCentreCode, $scope.Session,'');
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

        $scope.DownloadtoExcel = function (ExaminationCentreID,CentreCode) {
            $scope.loading = true;
            var exceldownload = AdminService.GetNRExcelDownload(ExaminationCentreID, CentreCode,$scope.UserName,$scope.Session,'');
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
