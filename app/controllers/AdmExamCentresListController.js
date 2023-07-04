define(['app'], function (app) {
    app.controller("AdmExamCentresListController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        var tmp = $localStorage.TempData;


        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.ActiveButton = true;
            $scope.getCoordinatingCentersList();
        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });



        $scope.ShowDCExamCentresTable = function (CentreCode) {
            let DataType = 2;
            var VerifyDate = AdminService.VerifyExaminationCentresDates(DataType);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)
                }
                catch (err) {

                }
                if (res[0].ResponseCode == '200') {

                    $state.go('Dashboard.ExamCentresList');

                } else {
                    alert('Examination Dates Are Not Found')
                    $state.go('Dashboard.MarkAttendance')

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

        $scope.getCoordinatingCentersList = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 3;
            //$scope.DataType=1
            var examinationCentresNRReport = AdminService.GetCoordinatingCenters(DataType);
            examinationCentresNRReport.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.ExaminationCentresData = response.Table;
                    $scope.loading = false;
                    $scope.nodata = false;
                    //console.log(response.Table)
                    $scope.CoordinatorID = response.Table[0];

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.ExaminationCentresData = [];

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