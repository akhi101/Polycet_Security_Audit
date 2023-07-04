define(['app'], function (app) {
    app.controller("AdminExaminationCentresController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        $scope.UserTypeName = authData.UserTypeName;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;


        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.ActiveButton = true;
            $scope.getExaminationCentresReport();
        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });

        //$scope.DownloadtoExcel = function () {
        //    $scope.loading = true;
        //    var DataType = 3;
        //    var UserName = 0;
        //    var exceldownload = AdminService.GetExaminationCentresExcel(DataType, UserName);
        //    exceldownload.then(function (res) {
        //        var response = JSON.parse(res);
        //        console.log(response)
        //        if (response[0].ResponceCode == '200') {
        //            $scope.loading = false;

        //            var location = response[0].file;
        //            window.location.href = location;
        //            $scope.Error1 = false;
        //            $scope.Noresult = false;
        //        } else if (response[0].ResponceCode == '400') {
        //            $scope.loading = false;
        //            $scope.Data = false;
        //            $scope.Noresult = false;
        //            $scope.Error1 = true;
        //            $scope.ErrMsg1 = response[0].ResponceDescription;
        //            alert($scope.ErrMsg1)
        //        } else {
        //            $scope.loading = false;
        //            $scope.Data = false
        //            alert("No Data Found");
        //            $scope.Noresult = true;
        //            $scope.Error1 = false;

        //        }
        //    }, function (err) {
        //        $scope.LoadImg = false;
        //        alert("Error while loading");
        //    });

        //}


        //$scope.verifyDates = function (DataType) {
        //    var DataType = 3
        //    var VerifyDate = AdminService.VerifyExaminationCentresDates(DataType);
        //    VerifyDate.then(function (response) {
        //        try {
        //            var res = JSON.parse(response)

        //        }
        //        catch (err) { }
        //        if (res[0].ResponseCode == '200') {
        //             $state.go('Dashboard.ExaminationCentres');
        //        } else if (res[0].ResponseCode == '400') {
        //            alert('Examination Centres Registration Dates Are Not Found')
        //            $state.go('Dashboard.AdminExaminationCentres')
        //        }
        //    },
        //        function (error) {
        //            alert("error while Verifying Dates")
        //            //var err = JSON.parse(error);

        //        });
        //}
        $scope.ShowDCExamCentresTable = function (CentreCode) {
            //$scope.verifyDates();
            //var VerifyDate = AdminService.VerifyExamCentresRegistrationDates();
            //VerifyDate.then(function (response) {
            //    if (response.Table[0].ResponseCode == '200') {

            //        $state.go('Dashboard.ExaminationCentres');

            //    } else {
            //        alert('Examination Centres Registration Dates Are Not Found')
            //        $state.go('Dashboard.AdminExaminationCentres')

            //    }

            //},
            //    function (error) {

            //        var err = JSON.parse(error);
            //    })
        
            $localStorage.TempData = {
                CentreCode: CentreCode,
                UserTypeName: $scope.UserTypeName,
                UserTypeID:$scope.UserTypeID
            };

            $state.go('Dashboard.ExaminationCentres');
        }

        $scope.getExaminationCentresReport = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 3;
            //$scope.DataType=1
            var examinationCentresReportDataNew = AdminService.GetExaminationCentresReport(DataType);
            examinationCentresReportDataNew.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.ExaminationCentresReportDataNew = response.Table;
                    $scope.loading = false;
                    $scope.nodata = false;
                    //console.log(response.Table)
                    $scope.CoordinatorID = response.Table[0];

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.ExaminationCentresReportDataNew = [];

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