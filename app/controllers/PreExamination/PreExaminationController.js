define(['app'], function (app) {
    app.controller("PreExaminationController", function ($scope, $http, $localStorage, AdminService, $state, AppSettings, SystemUserService) {
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
            var ModuleID = parseInt($localStorage.selectedModule.ModuleID);
            var getPreExamsubmod = SystemUserService.GetUserSubModules(UserTypeID, ModuleID);
            getPreExamsubmod.then(function (Usersdata) {
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
                    }
                    $scope.PreExamModules = modulesList;
                } else {
                    $scope.PreExamModules = [];
                }
            }, function (err) {
                console.log(err);
            });
        }

        

        $scope.OpenSubModule = function (Module) {
            $state.go("Dashboard.PreExaminationDashbaord." + Module.ModuleRouteName);
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
            $state.go('Dashboard.PreExamination.ChangePassword');
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



