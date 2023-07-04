define(['app'], function (app) {
    app.controller("PolycetYearsController", function ($scope, $state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;

        const $ctrl = this;


        $ctrl.$onInit = () => {
            $scope.getpolycetyears();

        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }




        
        $scope.getpolycetyears = function () {
            var DataType = 1;
            var PolycetYearID = 0;//default value(Optional)
            var getpolycetyrs = AdminService.GetPolycetYears(DataType,PolycetYearID);
            getpolycetyrs.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.PolycetYearsData = res.Table;
                    $scope.edit = true;


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Polycet Years')
            });
        }


     

       

        $scope.View = function (PolycetYearID) {
            var DataType = 2;
            var getviewcentres = AdminService.ViewPolycetYear(DataType,PolycetYearID);
            getviewcentres.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Centres')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewPolycetYearPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.Edit = function (PolycetYearID) {
            var DataType = 2;
            var geteditcentres = AdminService.EditPolycetYear(DataType,PolycetYearID);
            geteditcentres.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
              
                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Centres')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditPolycetYearPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }
        /*var data = {};*/

        $scope.Submit = function () {
            var paramObj = {
                "DataType": 1,
                "PolycetYearID": 0,//default value(optional)
                "PolycetYear": $scope.PolycetYear,
                "CurrentPolycetYear": $scope.CurrentPolycetYear,
                "Active": true,//default value(optional)
                "UserName": authData.UserName
            }
            var addyear = AdminService.AddPolycetYear(paramObj);
            addyear.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert('Polycet Year Added Successfully');
                    $scope.getpolycetyears();


                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getpolycetyears();


                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }


        $scope.UpdateDetails = function (data) {
            var paramObj = {
                "Datatype":2,
                "PolycetYearID": data.PolycetYearID,
                "PolycetYear": data.PolycetYear,
                "CurrentPolycetYear": data.CurrentPolycetYear,
                "Active": data.Active,
                "UserName": authData.UserName
            }
            var updatepolycetyear = AdminService.UpdatePolycetYear(paramObj);
            updatepolycetyear.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //let VerRes = response[0];

                if (res[0].ResponceCode == '200') {
                    alert('PolycetYear Updated Successfully');
                    $scope.getpolycetyears();
                    $scope.modalInstance.close();




                } else if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription);
                    $scope.getpolycetyears();
                    $scope.modalInstance.close();



                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })


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

