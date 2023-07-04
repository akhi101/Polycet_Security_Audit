define(['app'], function (app) {
    app.controller("StudentHallTicketController", function ($scope, $uibModal, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {

        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.UserTypeID = authData.UserTypeID;

        const $ctrl = this;

        $ctrl.$onInit = () => {
        //    $scope.DataType=1
        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }


        $scope.gethtbymobilenumber = function (MobileNumber) {
            if ($scope.MobileNumber == '' || $scope.MobileNumber == null || $scope.MobileNumber==undefined) {
                alert('Please Enter Correct Mobile Number / Registration Number');
                return;
            }
            var DataType = 1;
            $localStorage.TempData = {
                MobileNumber: MobileNumber,
                UserTypeName: $scope.UserTypeName,
                UserTypeID: $scope.UserTypeID,
                UserName: $scope.UserName,
                MobileDataType: DataType
            };

            $state.go('Dashboard.StudentHtDashboard');
        }

        $scope.gethtbyhtnumber = function (HallTicketNumber) {
            if ($scope.HallTicketNumber == '' || $scope.HallTicketNumber == null || $scope.HallTicketNumber == undefined) {
                alert('Please Enter Correct HallTicket Number');
                return;
            }
            var DataType = 2;
            $localStorage.TempData = {
                HallTicketNumber: HallTicketNumber,
                UserTypeName: $scope.UserTypeName,
                UserTypeID: $scope.UserTypeID,
                UserName: $scope.UserName,
                HtDataType: DataType
            };

            $state.go('Dashboard.StudentHtDashboard');

        }




        $scope.SiteViews = 0;

            var GetWebSiteVisiterCount = AdminService.GetWebSiteVisiterCount();
            GetWebSiteVisiterCount.then(function (response) {
                var res = JSON.parse(response)
                $scope.SiteViews = res.Table[0].WebsiteVisitedCount;
            },
                function (error) {

                    var err = JSON.parse(error);
                });
        



        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            var GetUserLogout = SystemUserService.PostUserLogout(2, $scope.UserName, $scope.LoginSessionEkey);
            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                //    userName: ""
            };
            $state.go('index.OfficialsLogin')
            }

    })
})