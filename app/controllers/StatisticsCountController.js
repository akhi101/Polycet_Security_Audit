define(['app'], function (app) {
    app.controller("StatisticsCountController", function ($scope, $state, $localStorage, AdminService, SystemUserService) {
        var authData = $localStorage.authorizationData;
        if ((authData == undefined) || (authData != undefined && authData.UserTypeName != 'Administrator')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = authData.UserName;
            $scope.Session = $localStorage.authorizationData.Session
            $scope.SessionID = $localStorage.SessionID;
            $scope.UserID = authData.UserID;
            const $ctrl = this;

            $ctrl.$onInit = () => {
                $scope.getStatistics();
            }
        }



        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        $scope.getStatistics = function () {
            var getstatistics = AdminService.GetStatisticsCount($scope.Session,$scope.UserName,null);
            getstatistics.then(function (resp) {
                console.log(resp)
                //try {
                //    var res = JSON.parse(resp);
                //}
                //catch (err) { }
                var Registered = 0;
                var FeePaid = 0;
                var ApplicationFilled = 0;
                var HallTicketGenerated = 0;

                if (resp.Table.length > 0 || resp.Table1.length > 0) {
                    $scope.ConsolidatedDataTable = resp.Table;
                    $scope.DatewiseReportDataTable = resp.Table1;
                    for (var i = 0; i < resp.Table1.length; i++) {
                        if (resp.Table1[i].Registered != null)
                            Registered = Registered + resp.Table1[i].Registered;
                        if (resp.Table1[i].FeePaid != null)
                            FeePaid = FeePaid + resp.Table1[i].FeePaid;
                        if (resp.Table1[i].ApplicationFilled != null)
                            ApplicationFilled = ApplicationFilled + resp.Table1[i].ApplicationFilled;
                        if (resp.Table1[i].HallTicketGenerated != null)
                            HallTicketGenerated = HallTicketGenerated + resp.Table1[i].HallTicketGenerated;                   
                    }
                    $scope.Registered = Registered;
                    $scope.FeePaid = FeePaid;
                    $scope.ApplicationFilled = ApplicationFilled;
                    $scope.HallTicketGenerated = HallTicketGenerated;
                }

                else {
                    $scope.StatisticsDataTable = [];
                    $scope.DatewiseReportDataTable = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.DownloadtoExcel = function (DataType) {
            $scope.loading = true;
            var exceldownload = AdminService.GetStudentStatisticsExcel(DataType, $scope.UserName, $scope.Session,null);
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

