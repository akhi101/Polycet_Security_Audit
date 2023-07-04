define(['app'], function (app) {
    app.controller("AdmExamCentresNRDownloadController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if ((authData == undefined) || (authData != undefined && authData.UserTypeName != 'Administrator')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = authData.UserName;
            var UserTypeID = parseInt(authData.UserTypeID);
            $scope.SessionID = $localStorage.SessionID;
            $scope.UserID = authData.UserID;
            $scope.UserTypeName = authData.UserTypeName;
            $scope.Session = $localStorage.authorizationData.Session
            var tmp = $localStorage.TempData;

            const $ctrl = this;
            $ctrl.$onInit = () => {
                $scope.ActiveButton = true;
                $scope.getExaminationCentresNRReport();
            }
        }

        $scope.GoBack = function () {
            $state.go('Dashboard.NRDownload')
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });

        

        $scope.ShowDCExamCentresTable = function (CentreCode) {
            let DataType = 4;
            var VerifyDate = AdminService.VerifyNRDownloadDates(DataType);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)
                }
                catch { err };
                if (res[0].ResponseCode == '200') {

                    $state.go('Dashboard.DCWiseExamCentresNRDownload');

                } else {
                    alert('Examination Centres Registration Dates Are Not Found')
                    $state.go('Dashboard.NRExcel')

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })

            $localStorage.TempData = {
                CentreCode: CentreCode,
            };

            //    $state.go('Dashboard.ExaminationCentres');
        }

        $scope.getExaminationCentresNRReport = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 3;
            //$scope.DataType=1
            var examinationCentresNRReport = AdminService.GetExaminationCentresNRReport(DataType,$scope.UserName, $scope.Session, null);
            examinationCentresNRReport.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.ExaminationCentresNRReportData = response;
                    $scope.loading = false;
                    $scope.nodata = false;
                    //console.log(response.Table)
                    $scope.CoordinatorID = response[0];

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.ExaminationCentresNRReportData = [];

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