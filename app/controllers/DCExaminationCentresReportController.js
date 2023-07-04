define(['app'], function (app) {
    app.controller("DCExaminationCentresReportController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        //$scope.UserName = authData.UserName;
        $scope.UserTypeName = authData.UserTypeName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        var tmp1 = $localStorage.TempData1;

        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.ActiveButton = true;
            $scope.getDCExaminationCentresReport();
        }

        $scope.GoBack = function () {
            if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
                $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
                $state.go('Dashboard.AdmExaminationCentresReport')
            }
            else if ($scope.UserTypeName == 'CoordinatingCentre') {
                $state.go('Dashboard')
            }
        }


        if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
            $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
            $scope.UserName = authData.UserName;
            $scope.CoordinatingCentreCode = tmp1.CoordinatingCentreCode;
        }
        else if ($scope.UserTypeName =='CoordinatingCentre') {
            $scope.UserName = authData.UserName;
            $scope.CoordinatingCentreCode = authData.UserName;
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });

        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            var DataType = 5;
            //$scope.CoordinatingCentreCode = tmp1.CoordinatingCentreCode;
            var exceldownload = AdminService.GetExaminationCentresExcel(DataType, $scope.UserName, $scope.CoordinatingCentreCode);
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

        $scope.getDCExaminationCentresReport = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 5;
            var dcexaminationCentresReportDataNew = AdminService.GetDCExaminationCentresReport(DataType, $scope.UserName, $scope.CoordinatingCentreCode);
            dcexaminationCentresReportDataNew.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.DCExaminationCentresReportDataNew = response;
                    $scope.UserCreated = response[0].UserCreated
                    $scope.loading = false;
                    $scope.nodata = false;
                    //console.log(response.Table)
                    $scope.CoordinatorID = response[0];

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.DCExaminationCentresReportDataNew = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }


        $scope.GetSMS = function (ExaminationCentreID, CentreCode) {
           
            var getsms = AdminService.GetExaminationCentreUserSMS(ExaminationCentreID, CentreCode,$scope.UserName);
            getsms.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.ResponseCode == '200') {
                    alert("Login Credentials sent to the Chief Superintendent Mobile Number.");
                    //$scope.sendbutton = false;
                    //$scope.loader = false;
                }
                else if (res.ResponseCode == '201') {
                    //alert(res.ResponseDescription);
                    $scope.CentreCode = res.CentreCode;
                    $scope.UserPassword = res.UserPassword;
                    $scope.ExaminationCentreID = res.ExaminationCentreID;
                    $scope.AddExaminationCentreUser();

                }
                else {
                    alert("Maximum SMS Limit Reached for this Examination Centre User")
                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

        $scope.AddExaminationCentreUser = function () {
            var UserEncriptedPassword = $crypto.encrypt($crypto.encrypt($scope.UserPassword, 'HBSBP9214EDU00TS'), $scope.RegistrationEKey) + '$$@@$$' + $scope.RegistrationEKey;
            var paramObj = {
                "ExaminationCentreID": $scope.ExaminationCentreID,
                "CentreCode": $scope.CentreCode,
                "UserEncryptedPassword": UserEncriptedPassword,
                "UserName": authData.UserName
            }
            var addexamcentreuser = AdminService.AddExaminationCentreUser(paramObj);
            addexamcentreuser.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.ResponseCode == '200') {
                    $scope.CentreCode = res.UserName;
                    $scope.ExaminationCentreID = res.ExaminationCentreID;
                    //$scope.GetSMS($scope.CentreCode,$scope.ExaminationCentreID);
                    alert("Login Credentials sent to the Chief Superintendent Mobile Number.");

                }
                else if (res.ResponseCode == '201') {
                    $scope.CentreCode = res.UserName;
                    $scope.ExaminationCentreID = res.ExaminationCentreID;
                    //$scope.GetSMS($scope.CentreCode, $scope.ExaminationCentreID);

                }
                else if (res.ResponseCode == '400') {
                    $scope.loading = false;
                    //alert(response.Table[0].ResponseDescription);
                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })
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