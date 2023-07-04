define(['app'], function (app) {
    app.controller("PrinterNRDownloadController", function ($scope, $state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var getcurrpolycetyear = AdminService.GetCurrentPolycetYear();
        getcurrpolycetyear.then(function (response) {
            $scope.PolycetYearID = response.PolycetYearID;
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.CurrentPolycetYearData = res.Table;

        },
            function (error) {
                alert("error while loading States");
                //var err = JSON.parse(error);

            });




        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }

        $scope.downloadPrinterNr = function () {
            $scope.loading = true;
            var DataType = 2;
            var exceldownload = AdminService.GetCoordinatingCentresExcel(DataType);
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

        $scope.PrinterNrDownloadExcelReport = function () {
            $scope.loading = true;
            var DataType = 2;
            var exceldownload = AdminService.GetCoordinatingCentresExcel(DataType);
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


        $scope.Logout = function () {
            sessionStorage.loggedIn = "no";
            //var GetUserLogout = SystemUserService.PostUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('index.OfficialsLogin');
        }
    })
})

