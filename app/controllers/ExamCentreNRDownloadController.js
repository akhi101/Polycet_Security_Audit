define(['app'], function (app) {
    app.controller("ExamCentreNRDownloadController", function ($scope, $uibModal, PreExaminationService, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if ((authData == undefined) || (authData != undefined && authData.UserTypeName != 'ExaminationCentre')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = authData.UserName;
            $scope.UserTypeID = authData.UserTypeID;
            $scope.SessionID = $localStorage.SessionID;
            $scope.UserID = authData.UserID;
            $scope.UserTypeName = authData.UserTypeName;
            $scope.CoordinatingCentreCode = authData.UserName;
            const $ctrl = this;
            $scope.UserName = authData.UserName;
            $scope.SessionID = $localStorage.SessionID;
            $scope.Session = $localStorage.authorizationData.Session

            $ctrl.$onInit = () => {
                $scope.getExaminationCentresNRDownload();
            }
        }

        $scope.GoBack = function () {
            if ($scope.UserTypeName == 'Administrator') {
                $state.go('Dashboard.PhotoAttendanceSheet')
            }
            else if ($scope.UserTypeName == 'ExaminationCentre') {
                $state.go('Dashboard.NRDownload')
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

        const download = (path, filename) => {
            // Create a new link
            const anchor = document.createElement('a');
            anchor.href = path;
            anchor.download = filename;

            // Append to the DOM
            document.body.appendChild(anchor);

            // Trigger `click` event
            anchor.click();

            // Remove element from DOM
            document.body.removeChild(anchor);
        };

        $scope.getPhotoAttendanceData = function (ExaminationCentreID, CentreCode) {
            $scope.loading = true;
            $scope.NoData = false;
            $scope.CentreCode = CentreCode;
            var getExamCenters = PreExaminationService.GetPhotoAttendance(ExaminationCentreID, $scope.CentreCode, $scope.UserName, $scope.Session,'');
            getExamCenters.then(function (res) {
                if (res == null) {
                    $scope.loading = false;
                    alert("No NR Report Present");
                }

                if (res.length > 0) {
                    if (res.length > 4) {
                        $scope.loading = false;
                        $scope.nodata = true;
                        //window.location.href + '/Reports/' + res + '.pdf';
                        window.location.href
                        //window.open(location,'_blank')
                        var url = window.location.origin + '/Reports/' + res + '.pdf';
                        console.log(url)
                        download(url, 'NR_' + $scope.CentreCode + '.pdf');
                        //window.open(url, '_blank'); 
                        $scope.nodata = false;

                    } else {
                        $scope.loading = false;
                        $scope.nodata = true;
                        alert("No NR Report Present");
                    }
                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    alert("No NR Report Present");
                }

            },

                function (error) {
                    $scope.loading = false;
                    $scope.nodata = true;
                    alert("No NR Report Present");
                    var err = JSON.parse(error);
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
