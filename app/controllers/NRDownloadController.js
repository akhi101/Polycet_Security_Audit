define(['app'], function (app) {
    app.controller("NRDownloadController", function ($scope, AdminService,$http, $localStorage, $state, AppSettings, SystemUserService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin');

        }
        else if ($localStorage.selectedModule == undefined) {
            $state.go('index.OfficialsLogin');
        }
        else {
            $scope.authToken = $localStorage.authToken;
            $scope.AssessmentModules = [];
            var UserTypeID = parseInt(authData.UserTypeID);
            $scope.SessionID = $localStorage.SessionID;
            $scope.UserID = authData.UserID;
            $scope.UserName = authData.UserName;
            $scope.UserTypeName = authData.UserTypeName;
            var ModuleID = parseInt($localStorage.selectedModule.ModuleID);
            var getAdmissionsubmod = SystemUserService.GetUserSubModules(UserTypeID, ModuleID);
            getAdmissionsubmod.then(function (Usersdata) {
                var modulesList = [];
                var moduleroutename = "";
                if (Usersdata.length > 0) {
                    for (var i = 0; i < Usersdata.length; i++) {
                        // if (moduleroutename != Usersdata[i].SubModuleRouteName) {
                        var obj = {};
                        obj.SysModName = Usersdata[i].SubModuleName;
                        obj.SysModID = Usersdata[i].ModuleID;
                        obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                        obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                        modulesList.push(obj);
                        //   moduleroutename = UsersRightsdata[i].SubModuleRouteName;
                        //  }
                        $scope.ModuleRouteName = obj.ModuleRouteName;
                    }
                    $scope.PreExamModules = modulesList;
                } else {
                    $scope.PreExamModules = [];
                }
            }, function (err) {
                console.log(err);
            });
        }
        $scope.verifyDates = function (Module) {
            let DataType=4
            var VerifyDate = AdminService.VerifyNRDownloadDates(DataType);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    if (($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
                        $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') && Module.ModuleRouteName == 'PhotoAttendanceSheet') {
                        $state.go('Dashboard.PhotoAttendanceSheet')
                    }
                    else if (($scope.UserTypeName == 'CoordinatingCentre') &&  Module.ModuleRouteName == 'PhotoAttendanceSheet') {
                        $state.go('Dashboard.DCWiseExamCentresNRDownload');
                    }
                    else if (($scope.UserTypeName == 'ExaminationCentre') && Module.ModuleRouteName == 'PhotoAttendanceSheet') {
                        $state.go('Dashboard.ExamCentreNRDownload');
                    }

                    else if (($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
                        $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') && Module.ModuleRouteName == 'NRExcel') {
                        $state.go('Dashboard.NRExcel')
                    }
                    else if (($scope.UserTypeName == 'CoordinatingCentre') && Module.ModuleRouteName == 'NRExcel') {
                        $state.go('Dashboard.DCWiseExamCentresNRExcel');
                    }
                    else if (($scope.UserTypeName == 'ExaminationCentre') && Module.ModuleRouteName == 'NRExcel') {
                        $state.go('Dashboard.ExamCentreNRExcel');
                    }

                    //else if ($scope.ModuleRouteName != 'PhotoAttendanceSheet') {
                    //    $state.go("Dashboard." + Module.ModuleRouteName);
                    //}

                } else if (res[0].ResponseCode == '400') {
                    alert('Dates are Not Found')
                }
            },
                function (error) {
                    alert("error while Verifying Dates")
                    //var err = JSON.parse(error);

                });
        }
  
        $scope.OpenSubModule = function (Module) {
            //if ($scope.UserTypeName == 'Administrator' && Module.ModuleRouteName =='PhotoAttendanceSheet') {
            //    $state.go('Dashboard.PhotoAttendanceSheet')
            //}
            //else if ($scope.UserTypeName == 'CoordinatingCentre' || $scope.UserTypeName == 'ExaminationCentre') {
            //    $state.go('Dashboard.ExaminationCentresNRDownload');
            //}
            //else if (Module.ModuleRouteName != 'PhotoAttendanceSheet') {
            //    $state.go("Dashboard.AssessmentDashbaord." + Module.ModuleRouteName);
            //}
            $scope.verifyDates(Module);
        }
      

        $scope.GoBack = function () {

            $state.go('Dashboard')
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
            $state.go('Dashboard.Settings.ChangePassword');
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



