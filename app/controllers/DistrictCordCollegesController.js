define(['app'], function (app) {
    app.controller("DistrictCordCollegesController", function ($scope,$state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var getstates = AdminService.GetStates();
        getstates.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.StatesData = res.Table;

        },
            function (error) {
                alert("error while loading States");
                //var err = JSON.parse(error);

            });

        $scope.GoBack = function () {
            $state.go('Dashboard.CoordinatingDashboard')
        }

        $scope.GetDistricts = function (StateID) {

            var getdistrict = AdminService.GetDistricts(StateID);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData = res.Table;
                }
                else {
                    $scope.DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                //    var err = JSON.parse(error);
                });
        }

        $scope.GetDistrictsData = function (data) {
            var getdistrict = AdminService.GetDistricts(data);
            getdistrict.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.DistrictsData = res;
                }
                else {
                    $scope.DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.GetDistCoordinatingCenters = function (DistrictID) {
            $scope.DistrictID = DistrictID;
            $scope.loading = true;
            $scope.nodata = false;
            var getcentres = AdminService.GetDistCoordinatingCenters(DistrictID);
            getcentres.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.loading = true;
                    $scope.DistCordCentresTable = res;
                    $scope.loading = false;
                }
                else {
                    $scope.nodata = true;
                    $scope.loading = false;
                    $scope.DistCordCentresTable = [];
                    $scope.nodata = true;
                    $scope.loading = falsea

                }

            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }


        $scope.Submit = function (CollegeCode, CollegeName, CollegeAddress, State, District) {

            if ($scope.State == null || $scope.State == undefined || $scope.State == "") {
                alert("Please Select State");
                return;
            }

            if ($scope.District == null || $scope.District == undefined || $scope.District == "") {
                alert("Please Select District");
                return;
            }

            if ($scope.CollegeCode == null || $scope.CollegeCode == undefined || $scope.CollegeCode == "") {
                alert("Please Enter Centre Code");
                return;
            }
            if ($scope.CollegeName == null || $scope.CollegeName == undefined || $scope.CollegeName == "") {
                alert("Please Enter Centre Name");
                return;
            }
            if ($scope.CollegeAddress == null || $scope.CollegeAddress == undefined || $scope.CollegeAddress == "") {
                alert("Please Enter Centre Address");
                return;
            }
          
            $scope.loading = true;
            $scope.DistCordCentresTable = [];
            var adddistcoorcentre = AdminService.AddDistCoordinatingCentre(CollegeCode, CollegeName, CollegeAddress, State, District, $scope.UserName);
            adddistcoorcentre.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.GetDistCoordinatingCenters($scope.DistrictID);
                    $scope.modalInstance.close();
                    $scope.DistrictsData = [];
                    $scope.State = null;
                    $scope.District = null;
                    $scope.CollegeCode = null;
                    $scope.CollegeName = null;
                    $scope.CollegeAddress = null;



                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;                   
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.GetDistCoordinatingCenters($scope.DistrictID);
                    $scope.DistrictsData = [];
                    $scope.State = null;
                    $scope.District = null;
                    $scope.CollegeCode = null;
                    $scope.CollegeName = null;
                    $scope.CollegeAddress = null;


                }

                else {
                    alert("Not Added")


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }



        $scope.View = function (CentreID) {
            var getviewcentres = AdminService.GetEditDetails(CentreID);
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
                templateUrl: "/app/views/Popups/ViewDistCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.Edit = function (CentreID) {
            var geteditcentres = AdminService.GetEditDetails(CentreID);
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
                templateUrl: "/app/views/Popups/EditDistCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }
        /*var data = {};*/

        $scope.UpdateDetails = function (data) {
            var paramObj = {
                "CentreID": data.CentreID,
                "CentreCode": data.CentreCode,
                "CentreName": data.CentreName,
                "CentreAddress": data.CentreAddress,
                "StateID": data.StateID,
                "DistrictID": data.DistrictID,
                "Active": data.Active,
                "UserName": authData.UserName
            }
            if (data.CentreCode == null || data.CentreCode == undefined || data.CentreCode == "") {
                alert("Please Select Centre Code");
                return;
            }

            if (data.CentreName == null || data.CentreName == undefined || data.CentreName == "") {
                alert("Please Select Centre Name");
                return;
            }

            if (data.CentreAddress == null || data.CentreAddress == undefined || data.CentreAddress == "") {
                alert("Please Enter Centre Address");
                return;
            }
            $scope.DistCordCentresTable = [];

            var updatedistcoorcentre = AdminService.UpdateDistCoorCentres(paramObj);
            updatedistcoorcentre.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //let VerRes = response[0];
              
                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert('District Coordinating Centre Updated Successfully');
                    $scope.loading = false;
                    $scope.GetDistCoordinatingCenters($scope.DistrictID);
                    $scope.DistrictsData = [];                 
                    $scope.modalInstance.close();
                    $scope.State = null;
                    $scope.District = null;
                    $scope.CollegeCode = null;
                    $scope.CollegeName = null;
                    $scope.CollegeAddress = null;
                    //$state.go('Dashboard.DistrictCordColleges');
                    



                } else if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.GetDistCoordinatingCenters($scope.DistrictID);
                     $scope.State = null;
                    $scope.District = null;
                    $scope.CollegeCode = null;
                    $scope.CollegeName = null;
                    $scope.CollegeAddress = null;
                    //$state.go('Dashboard.DistrictCordColleges');


                }

                //else {
                //    alert("Otp Verification Failed")
                 

                //}
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

