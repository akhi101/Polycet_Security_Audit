define(['app'], function (app) {
    app.controller("AttendanceStatisticsController", function ($scope, $state, $uibModal, $localStorage, AdminService, SystemUserService) {
        var authData = $localStorage.authorizationData;
        if ((authData == undefined) || (authData != undefined && authData.UserTypeName != 'Administrator')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = authData.UserName;
            $scope.SessionID = $localStorage.SessionID;
            $scope.Session = $localStorage.authorizationData.Session;

            const $ctrl = this;

            $ctrl.$onInit = () => {
                $scope.loading = true;
                $scope.getAttendanceStatistics();
            }

            
        }

        $scope.getAttendanceStatistics = function () {
            $scope.loading = true;
            var DataType = 3;
            var getattstats = AdminService.GetAttendanceStatistics(DataType, $scope.UserName, $scope.Session, '');
            getattstats.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                var Alloted = 0;
                var Present = 0;
                var Absent = 0;
                var Malpractice = 0;
                var SGCount = 0;
                if (res.Table.length > 0) {
                    $scope.AttendanceStatisticsData = res.Table;
                    for (var i = 0; i < res.Table.length; i++) {
                        if (res.Table[i].Alloted != null)
                            Alloted = Alloted + res.Table[i].Alloted;
                        if (res.Table[i].Present != null)
                            Present = Present + res.Table[i].Present;
                        if (res.Table[i].Absent != null)
                            Absent = Absent + res.Table[i].Absent;
                        if (res.Table[i].Malpractice != null)
                            Malpractice = Malpractice + res.Table[i].Malpractice;
                        if (res.Table[i].SGCount != null)
                            SGCount = SGCount + res.Table[i].SGCount;
                    }
                    $scope.Alloted = Alloted;
                    $scope.Present = Present;
                    $scope.Absent = Absent;
                    $scope.Malpractice = Malpractice;
                    $scope.SGCount = SGCount;
                    $scope.loading = false;
                }
                else {
                    $scope.AttendanceStatisticsData = [];
                    $scope.loading = false;
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }




        $scope.GoBack = function () {
            $state.go('Dashboard')
        }


        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            var DataType = 3;
            var exceldownload = AdminService.GetPrinterNRExcel(DataType, $scope.UserName, $scope.Session, '');
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

        //$scope.releaseAttendance = function (ExaminationCentreID) {
        //    var att = AdminService.SetExamAttendance(ExaminationCentreID, $scope.UserName);
        //    att.then(function (res) {
        //        var response = JSON.parse(res);
        //        if (response[0].StatusCode == '200') {
        //            alert(response[0].StatusDescription);
        //            $scope.AttendanceStatisticsData = [];
        //            $scope.getAttendanceStatistics();
        //        } else if (response[0].StatusCode == '400') {
        //            alert(response[0].StatusDescription)
        //        } 
        //    }, function (err) {
        //        $scope.loading = false;
        //        alert("Error while loading");
        //    });
        //}

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

