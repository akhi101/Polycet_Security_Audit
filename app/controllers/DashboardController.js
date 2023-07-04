define(['app'], function (app) {
    app.controller("DashboardController", function ($scope, $localStorage, SystemUserService, AdminService, AppSettings, $state) {
        var authData = $localStorage.authorizationData;
        console.log(authData)
        if (authData == undefined) {
            $state.go('index.OfficialsLogin');
           
        }
        else {
            $scope.UserTypeName = authData.UserTypeName;
         
            $scope.SessionID = $localStorage.SessionID;
            //alert($scope.SessionID)
            $scope.RegistrationId = authData.UserID;
            $scope.UserTypeID = authData.UserTypeID;
            $scope.UserName = authData.UserName;
            var tmp = $localStorage.TempData;
            $scope.Session = $localStorage.authorizationData.Session

            var UserTypeID = parseInt($scope.UserTypeID);
            var UserRightsdata = SystemUserService.GetUserModules(UserTypeID);
            UserRightsdata.then(function (Usersdata) {
                UserRights = Usersdata;
                var modulesList = [];
                var moduleroutename = "";
                if (Usersdata.length > 0) {
                    for (var i = 0; i < Usersdata.length; i++) {
                        //  if (moduleroutename != Usersdata[i].ModuleRouteName) {
                        var obj = {};
                        obj.SysModName = Usersdata[i].ModuleName;
                        obj.SysModID = Usersdata[i].ModuleID;
                        obj.ModuleRouteName = Usersdata[i].ModuleRouteName;
                        obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                        modulesList.push(obj);
                        //    moduleroutename = UsersRightsdata[i].ModuleRouteName;
                        //   }
                    }
                    $scope.modulesList = modulesList;
                } else {
                    $scope.modulesList = [];
                }



                AppSettings.UserRights = UserRights;


            }, function (error) {
                $scope.modulesList = [];
            });


            $scope.OpenModule = function (Module) {
                if (Module.ModuleRouteName == 'Dashboard.StudentDetailsUpdation') {
                    $state.go('DetailsUpdationLogin');
                }
                //else if (Module.ModuleRouteName == 'MarkAttendance') {
                //    var DataType = 2
                //    var verifyexamDate = AdminService.VerifyExaminationDates(DataType);
                //    verifyexamDate.then(function (response) {
                //        try {
                //            var res = JSON.parse(response)

                //        }
                //        catch (err) { }
                //        if (res[0].ResponseCode == '200') {
                //            $state.go('Dashboard.MarkAttendance')
                //        } else if (res[0].ResponseCode == '400') {
                //            alert('Dates are Not Found')
                //            $state.go('Dashboard');
                //        }
                //    },
                //        function (error) {
                //            alert("error while Verifying Dates")
                //            //var err = JSON.parse(error);

                //        });
                //}
                else {
                    $localStorage.selectedModule = {
                        ModuleID: Module.SysModID,
                        ModuleRouteName: Module.ModuleRouteName
                    }
                    $state.go("Dashboard." + Module.ModuleRouteName);
                }
            }

            //    if (Module.ModuleRouteName == 'ExaminationCentres') {
            //        var VerifyDate = AdminService.VerifyExamCentresRegistrationDates();
            //        VerifyDate.then(function (response) {
            //            if (response.Table[0].ResponseCode == '200') {

            //                $state.go("Dashboard." + Module.ModuleRouteName);

            //            } else {
            //                alert('Examination Centres Registration Dates Are Not Found')
            //                $state.go('Dashboard')

            //            }

            //        },
            //            function (error) {

            //                var err = JSON.parse(error);
            //            })
            //    }
            //    else {
            //        $localStorage.selectedModule = {
            //            ModuleID: Module.SysModID,
            //            ModuleRouteName: Module.ModuleRouteName,
            //            UserName: authData.UserName
            //        }
            //        $state.go("Dashboard." + Module.ModuleRouteName);
            //    }

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
                $state.go('Dashboard.Settings.ChangePassword');
            }


            $scope.logOut = function () {
                sessionStorage.loggedIn = "no";
                
                var GetUserLogout = SystemUserService.PostUserLogout(1, authData.UserName, $scope.SessionID,$scope.Session);
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

        }
    })
})