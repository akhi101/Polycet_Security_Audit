define(['app'], function (app) {
    app.controller("FeePaymentReportsController", function ($scope, $state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
     

        $scope.DownloadtoExcel = function () {
            var startDate = moment($scope.StartDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var date = new Date($scope.EndDate.toString());
            month = '' + (date.getMonth() + 1);
            day = '' + date.getDate();
            year = date.getFullYear();

            hrs = '23';
            min = '59';
            sec = '59';
            msec = '999';

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var dates = [year, month, day].join('-');
            var time = [hrs, min, sec].join(':');
            var millisec = [msec]
            $scope.EndDate = dates + ' ' + time + '.' + millisec;
            var EndDate = moment($scope.EndDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            $scope.loading = true;
            var exceldownload = AdminService.GetFeePaymentReportsExcel(startDate, EndDate);
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




        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        $scope.GetRegistrationDates = function (PolycetYearID) {
            var DataType = 1;
            var ExamCentresRegistrationDatesID = 0;//default value (optional)
            var getregdates = AdminService.GetExamCentresRegistrationDates(DataType, PolycetYearID, ExamCentresRegistrationDatesID);
            getregdates.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.RegistrationDatesData = res.Table;
                }
                else {
                    $scope.RegistrationDatesData = [];
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

