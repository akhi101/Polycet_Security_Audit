define(['app'], function (app) {
    app.controller("GetHtController", function ($scope, $uibModal, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {

        //var authData = $localStorage.authorizationData;
        //if (authData == undefined) {
        //    $state.go('index.OfficialsLogin')
        //}

        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.DataType=''
        }

        $scope.GoBack = function () {
            $state.go('index')
        }


        $scope.gethtbymobilenumber = function (MobileNumber) {
            if ($scope.MobileNumber == '' || $scope.MobileNumber == null || $scope.MobileNumber == undefined) {
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

            $state.go('HTDownload');
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

            $state.go('HTDownload');

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




      

    })
})