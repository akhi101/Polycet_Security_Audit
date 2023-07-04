define(['app'], function (app) {
    app.controller("UsersController", function ($scope, $localStorage, $crypto ,SystemUserService,$state, AdminService, $uibModal) {
        var authData = $localStorage.authorizationData;
        $scope.authToken = $localStorage.authToken;
        $scope.AssessmentModules = [];
        $scope.UserTypeID = parseInt(authData.UserTypeID);


        const $ctrl = this
        $ctrl.$onInit = () => {
            $scope.getUserTypes();
            $scope.getActiveUserTypes();
        }

        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }

        $scope.tab1 = function () {
            $scope.UserTypeName = null;
        }
        $scope.tab2 = function () {
            $scope.UserType = null;
            $scope.ModuleName = null;
            $scope.ModuleID = null;
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.UserEKey = res;
            sessionStorage.Ekey = res;

        });

          $scope.clearDefaults = function () {

            $scope.UserTypeName = null;


            //$scope.UserType = null;
            $scope.NewUserName = null;
            $scope.CreatePass = null;
            $scope.ConfirmPass = null;
            $scope.NameofUser = null;
            $scope.MobileNumber = null;
            $scope.Email = null;


        }

        $scope.getUserTypes = function () {
            var DataType = 1;
            var getusertype = AdminService.GetUserTypes(DataType);
            getusertype.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.UserTypesDataTable = res;

                }
                else {
                    $scope.UserTypesDataTable = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }

        $scope.getActiveUserTypes = function () {
            var DataType = 2;
            var getusertype = AdminService.GetActiveUserTypes(DataType);
            getusertype.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.UserTypesActiveData = res;

                }
                else {
                    $scope.UserTypesActiveData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }


        $scope.addUserTypes = function () {
            if ($scope.UserTypeName == null || $scope.UserTypeName == undefined || $scope.UserTypeName == "") {
                alert('Please Enter UserTypeName');
                return;
                }
            $scope.loading = true;
            var paramObject = {
                "DataType": 1,
                "UserTypeID": 0,
                "UserTypeName": $scope.UserTypeName,
                "Active": true,
                "UserName": authData.UserName
            }
            $scope.UserTypesDataTable = [];
            $scope.usertypeName = true;
            var SetUserTypes = AdminService.AddUserTypes(paramObject);
            SetUserTypes.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    $scope.UserTypeID = res[0].UserTypeID;
                    alert(res[0].ResponseDescription);
                    $scope.getUserTypes();
                    $scope.getActiveUserTypes();
                    $scope.clearDefaults();
                    $scope.loading = false;
                    $scope.usertypeName = false;


                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getUserTypes();
                    $scope.getActiveUserTypes();
                    $scope.loading = false;
                    $scope.usertypeName = false;


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.Edit = function (UserTypeID) {
            var editusertypes = AdminService.EditUserTypes(UserTypeID);
            editusertypes.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.EditData = response.Table;
                }
                else {
                    $scope.EditData = [];
                }


            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditUserTypesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
                backdrop: false,
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }


       

        $scope.View = function (UserTypeID) {
            var viewusertypes = AdminService.ViewUserTypes(UserTypeID);
            viewusertypes.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.ViewData = response.Table;
                }
                else {
                    $scope.ViewData = [];
                }


            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewUserTypesPopup.html",
                //size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.updateUserTypes = function (data) {
            //$scope.loading = true;
            var paramObject = {
                "DataType": 2,
                "UserTypeID": data[0].UserTypeID,
                "UserTypeName": data[0].UserTypeName,
                "Active": data[0].Active,
                "UserName": authData.UserName
            }
            var SetUserTypes = AdminService.UpdateUserTypes(paramObject);
            SetUserTypes.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getUserTypes();
                    $scope.getActiveUserTypes();
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    $scope.clearDefaults();



                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getUserTypes();
                    $scope.getActiveUserTypes();
                    $scope.modalInstance.close();

                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.getUsers = function () {
            $scope.loading = true;
            
            //if ($scope.UserType == null || $scope.UserType == undefined || $scope.UserType == "") {
            //    return;

            //}
          
            var getusers = AdminService.GetUsers($scope.UserType);
            getusers.then(function (response) {

                //try {
                //    var res = JSON.parse(response);
                //}

                //catch (err){}
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.UserData = response.Table;
                    $scope.nodata = false;
                } else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.UserData = []
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });


        }


        $scope.CheckPassword = function () {
            if ($scope.CreatePass !== $scope.ConfirmPass) {
                alert("Password and Confirm Password Not Matched")
                return;
            }
        }

        $scope.addUser = function () {
            //$scope.loading = true;
            var EncriptedPassword = $crypto.encrypt($crypto.encrypt($scope.CreatePass, 'HBSBP9214EDU00TS'), $scope.UserEKey) + '$$@@$$' + $scope.UserEKey;
            var paramObject = {
                "UserTypeID": $scope.UserType,
                "NewUserName": $scope.NewUserName,
                "UserPassword": EncriptedPassword,
                "NameofUser": $scope.NameofUser,
                "MobileNumber": $scope.MobileNumber,
                "Email": $scope.Email,
                "UserName": authData.UserName
            }
            var SetUsers = AdminService.AddUser(paramObject);
            SetUsers.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    $scope.UserTypeID = res[0].UserTypeID;
                    alert(res[0].ResponseDescription);
                    $scope.getUsers();
                    $scope.clearDefaults();



                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getUsers();
                    $scope.loading = false;


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.editUserDetails = function (UserID) {
          
            var edituser = AdminService.EditUsers(UserID);
            edituser.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.EditData = response.Table;
                    $scope.getUserTypes($scope.EditData[0].UserTypeID);
                }
                else {
                    $scope.EditData = [];
                }


            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditUserPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }


        $scope.viewUser = function (UserID) {

            var viewuser = AdminService.ViewUsers(UserID);
            viewuser.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.ViewData = response.Table;
                }
                else {
                    $scope.ViewData = [];
                }


            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewUserPopup.html",
                //size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                //windowClass: 'modal-fit-att',
            });

        }



       

        $scope.updateUser = function (data) {
            //$scope.loading = true;
            var paramObject = {
                "UserID": data[0].UserID,
                "NewUserName": data[0].UserName,
                "UserTypeID": data[0].UserTypeID,
                "NameofUser": data[0].FirstName,
                "Email": data[0].UserEmail,
                "MobileNumber": data[0].UserMobile,
                "Active": data[0].Active,
                "UserName": authData.UserName
            }
            var updateuser = AdminService.UpdateUser(paramObject);
            updateuser.then(function (newRes) {
                try {
                    var res = JSON.parse(newRes);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    $scope.getUsers();
                    $scope.clearDefaults();
                    $scope.loading = false;


                } else if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.modalInstance.close();
                    $scope.getUsers();
                    $scope.loading = false;
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