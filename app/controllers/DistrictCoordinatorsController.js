define(['app'], function (app) {
    app.controller("DistrictCoordinatorsController", function ($scope, $uibModal, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;


        $scope.GoBack = function () {
            $state.go('Dashboard.CoordinatingDashboard')
        }

        var getstates = AdminService.GetStates();
        getstates.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.StatesData = res.Table;
            $scope.StateID = $scope.StatesData[0].StateID;

        },
            function (error) {
                alert("error while loading States");
                //var err = JSON.parse(error);

            });


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




        var districtexpand = false;
        $scope.showdistrictCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesdistrict");
            if (!districtexpand) {
                checkboxes.style.display = "inline-grid";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                districtexpand = true;
            } else {
                checkboxes.style.display = "none";
                districtexpand = false;
            }
        }

        $scope.closedistrictCheckbox = function () {
            alert()
            var checkboxes = document.getElementById("checkboxesdistrict");
            if (!districtexpand) {
                checkboxes.style.display = "inline-grid";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                districtexpand = true;
            } else {
                checkboxes.style.display = "none";
                districtexpand = false;
            }
        }

        $scope.toggleAlldistrict = function () {
            var toggleStatus = $scope.isAllSelecteddistricts;
            angular.forEach($scope.DistrictsData, function (itm) { itm.selected = toggleStatus; });
            $scope.districtarr = [];
            angular.forEach($scope.DistrictsData, function (value, key) {
                if (value.selected === true) {
                    $scope.districtarr.push({ "DistrictID": value.DistrictID })
                }
            });
        }

        $scope.optionToggleddistrict = function () {
            $scope.isAllSelecteddistricts = $scope.DistrictsData.every(function (itm) { return itm.selected; })
            $scope.districtarr = [];
            angular.forEach($scope.DistrictsData, function (value, key) {
                if (value.selected == true) {
                    $scope.districtarr.push({ "DistrictID": value.DistrictID })

                }
            });
        }

        $scope.getMandals = function () {
            if ($scope.State == null || $scope.State == undefined || $scope.State == "") {
                alert("Please Select State Name");
                return;
            }
            //if ($scope.District == null || $scope.District == undefined || $scope.District == "") {
            //    alert("Please District");
            //    return;
            //}
            $scope.loading = true;
            $scope.statedisable = true;
            $scope.districtdisable = true;
            $scope.buttondisable = true;
            //DistrictID: JSON.stringify($scope.districtarr),
            $scope.GetMandals(JSON.stringify($scope.districtarr));
            $scope.GetCoordinatingCentres(JSON.stringify($scope.districtarr));
            $scope.GetDistCoordinators(JSON.stringify($scope.districtarr));
            $scope.loading = false;


        }

        $scope.Cancel = function () {
            $scope.statedisable = false;
            $scope.districtdisable = false;
            $scope.buttondisable = false;
            $scope.State = null;
            $scope.CentresData = [];
            $scope.DistrictsData = [];
            $scope.MandalsData = [];
            $scope.CoordinatorsDataNew = [];
            $scope.isAllSelecteddistricts = null;
            $scope.isAllSelectedmandals = null;
            $scope.CoordinatorName = null;
            $scope.CoordinatorEmail = null;
            $scope.CoordinatorMobile = null;
            $scope.CoordinatingCentre = null;

        }



        //$scope.OptionToggledEditDistrict = function () {
        //    $scope.isAllSelectedEditdistricts = $scope.EditData.every(function (itm) { return itm.selected; })
        //    $scope.districtarr = [];
        //    angular.forEach($scope.EditData, function (value, key) {
        //        if (value.selected === true) {
        //            $scope.districtarr.push({ "DistrictID": value.DistrictID })
        //            //console.log($scope.districtarr)

        //            //$scope.GetMandals();
        //            //$scope.GetCoordinatingCentres();
        //            //$scope.GetDistCoordinators();





        //        }
        //    });
        //}




        var mandalexpand = false;
        $scope.showmandalCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesmandal");
            if (!mandalexpand) {
                checkboxes.style.display = "inline-grid";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                mandalexpand = true;
            } else {
                checkboxes.style.display = "none";
                mandalexpand = false;
            }
        }

        $scope.closemandalCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesmandal");
            if (!districtexpand) {
                checkboxes.style.display = "inline-grid";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                mandalexpand = true;
            } else {
                checkboxes.style.display = "none";
                mandalexpand = false;
            }
        }

        $scope.toggleAllmandal = function () {
            var toggleStatus = $scope.isAllSelectedmandals;
            angular.forEach($scope.MandalsData, function (itm) { itm.selected = toggleStatus; });
            $scope.mandalarr = [];
            angular.forEach($scope.MandalsData, function (value, key) {
                if (value.selected === true) {
                    $scope.mandalarr.push({ "MandalID": value.MandalID })
                }
            });
        }

        $scope.optionToggledmandal = function () {
            $scope.isAllSelectedmandals = $scope.MandalsData.every(function (itm) { return itm.selected; })
            $scope.mandalarr = [];
            angular.forEach($scope.MandalsData, function (value, key) {
                if (value.selected == true) {
                    $scope.mandalarr.push({ "MandalID": value.MandalID })

                }
            });
        }


        //$scope.optionToggledEditmandal = function () {
        //    $scope.isAllSelectedEditmandals = $scope.EditData1.every(function (itm) { return itm.selected; })
        //    $scope.mandalarr = [];
        //    angular.forEach($scope.EditData1, function (value, key) {
        //        if (value.selected === true) {
        //            $scope.mandalarr.push({ "MandalID": value.MandalID })
        //        }
        //    });
        //}

        $scope.GetMandals = function () {

            var getmandals = AdminService.GetMandals(JSON.stringify($scope.districtarr));
            getmandals.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }

                if (response.length > 0) {
                    $scope.MandalsData = response;
                }
                else {
                    $scope.MandalsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.GetCoordinatingCentres = function () {

            var getcentres = AdminService.GetCoordinatingCentres(JSON.stringify($scope.districtarr));
            getcentres.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                if (response.length > 0) {
                    $scope.CentresData = response;
                }
                else {
                    $scope.CentresData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.Submit = function () {
            var paramObj = {
                "CoordinatorName": $scope.CoordinatorName,
                "CoordinatorMobile": $scope.CoordinatorMobile,
                "CoordinatorEmail": $scope.CoordinatorEmail,
                "CentreID": $scope.CoordinatingCentre,
                "StateID": $scope.State,
                "DistrictID": JSON.stringify($scope.districtarr),
                "MandalID": JSON.stringify($scope.mandalarr),
                "UserName": authData.UserName
            }
            $scope.loading = true;
            $scope.CoordinatorsDataNew = [];
            var adddistcoordinator = AdminService.AddDistrictCoordinators(paramObj);
            adddistcoordinator.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //let VerRes = response[0];

                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert('District Coordinator Added Successfully');
                    $scope.loading = false;
                    $scope.GetDistCoordinators();
                    $scope.modalInstance.close();
                    $scope.statedisable = false;
                    $scope.districtdisable = false;
                    $scope.buttondisable = false;
                    $scope.State = null;
                    $scope.CentresData = [];
                    $scope.DistrictsData = [];
                    $scope.MandalsData = [];
                    //$scope.CoordinatorsDataNew = [];
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.CoordinatorName = null;
                    $scope.CoordinatorEmail = null;
                    $scope.CoordinatorMobile = null;
                    $scope.CoordinatingCentre = null;
                    //$scope.GetDistCoordinatingCenters($scope.DistrictID);


                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.GetDistCoordinators();
                    $scope.statedisable = false;
                    $scope.districtdisable = false;
                    $scope.buttondisable = false;
                    $scope.State = null;
                    $scope.CentresData = [];
                    $scope.DistrictsData = [];
                    $scope.MandalsData = [];
                    //$scope.CoordinatorsDataNew = [];
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.CoordinatorName = null;
                    $scope.CoordinatorEmail = null;
                    $scope.CoordinatorMobile = null;
                    $scope.CoordinatingCentre = null;
                    //$scope.GetDistCoordinatingCenters($scope.DistrictID);


                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }

        $scope.GetDistCoordinators = function () {
            $scope.loading = true;
            var distcoordinators = AdminService.GetDistrictCoordinators(JSON.stringify($scope.districtarr));
            distcoordinators.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.CoordinatorsDataNew = response.Table;
                    $scope.loading = false;
                    //console.log(response.Table)
                    $scope.CoordinatorID = response.Table[0];
                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.CoordinatorsDataNew = [];
                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        //$scope.Edit = function (CoordinatorID) {
        //    var distcoordinators = AdminService.GetEditDistCoordinatorDetails(CoordinatorID);
        //    distcoordinators.then(function (response) {
        //        try {
        //            var res = JSON.parse(response);
        //            //var res1 = JSON.parse(response);
        //            //var res2 = JSON.parse(response);
        //            //console.log(res);
        //            $scope.EditData = response.Table;
        //            //var arr =[]
        //            //for (var i = 0; i < $scope.EditData.length; i++) {
        //            //    var obj = $scope.EditData[i]
        //            //    obj.selected = true;
        //            //    arr.push(obj);
        //            //    //console.log(obj)

        //            //}
        //            ////console.log(arr)
        //            //$scope.EditData = arr;

        //            $scope.EditData1 = response.Table1;
        //            var arr1 = []
        //            for (var i = 0; i < $scope.EditData1.length; i++) {
        //                var obj1 = $scope.EditData1[i]
        //                obj1.selected = true;
        //                arr1.push(obj1);
        //                console.log(obj)

        //            }
        //            $scope.EditData2 = response.Table2;
        //            //for (var i = 0; i < $scope.EditData2.length; i++) {
        //            //    var obj1 = $scope.EditData2[i]
        //            //    obj1.selected = true;
        //            //    arr1.push(obj1);
        //            //    console.log(obj)

        //            //}
        //            console.log(EditData2)

        //            //$scope.OptionToggledEditDistrict();
        //            //$scope.StateName = EditData2.StateName;
        //            //$scope.StateID = EditData.StateID;
        //            //$scope.StateName = res[0].StateName;
        //            //$scope.CentreID = res[0].CentreID;
        //            //$scope.StateID = res[0].StateID;
        //            //$scope.DistrictID = res[0].DistrictID;
        //            //$scope.DistrictName = res[0].DistrictName;
        //            //$scope.CentreCode = res[0].CentreCode;
        //            //$scope.CentreName = res[0].CentreName;
        //            //$scope.CentreAddress = res[0].CentreAddress;
        //            //$scope.Active = res[0].Active;

        //        } catch (err) {
        //        }

        //    },
        //        function (error) {
        //            //alert("data is not loaded");
        //            //    var err = JSON.parse(error);
        //        });



        //    $scope.modalInstance = $uibModal.open({
        //        templateUrl: "/app/views/Popups/EditDistCoordinatorsPopup.html",
        //        size: 'xlg',
        //        scope: $scope,
        //        windowClass: 'modal-fit-att',
        //    });
        //    $scope.closeModal = function () {
        //        $scope.modalInstance.close();
        //    }
        //}

        $scope.Edit = function (CoordinatorID) {
            var distcoordinators = AdminService.GetEditDistCoordinatorDetails(CoordinatorID);
            distcoordinators.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.EditData = response.Table;
                    $scope.EditData1 = response.Table1;
                    $scope.EditData2 = response.Table2;
                }
                else {
                    $scope.CoordinatorsDataNew = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditDistCoordinatorsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

    
        $scope.View = function (CoordinatorID) {
            var distcoordinators = AdminService.GetEditDistCoordinatorDetails(CoordinatorID);
            distcoordinators.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.ViewData = response.Table;
                    $scope.ViewData1 = response.Table1;
                    $scope.ViewData2 = response.Table2;
                }
                else {
                    $scope.CoordinatorsDataNew = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewDistCoordinatorsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.UpdateDetails = function (data2) {
            var paramObj = {
                "CoordinatorID": data2[0].CoordinatorID,
                "CoordinatorName": data2[0].CoordinatorName,
                "CoordinatorMobile": data2[0].CoordinatorMobile,
                "CoordinatorEmail": data2[0].CoordinatorEmail,
                //"CentreID": data2.CentreID,
                //"StateID": data2.StateID,
                //"DistrictID": JSON.stringify($scope.districtarr),
                //"MandalID": JSON.stringify($scope.mandalarr),
                "Active": data2[0].Active,
                "UserName": authData.UserName
            }
            $scope.loading = true;
            $scope.CoordinatorsDataNew = [];

            var updatedistcoordinators = AdminService.UpdateDistCoordinators(paramObj);
            updatedistcoordinators.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.GetDistCoordinators();
                    $scope.modalInstance.close();
                    $scope.statedisable = false;
                    $scope.districtdisable = false;
                    $scope.buttondisable = false;
                    $scope.State = null;
                    $scope.CentresData = [];
                    $scope.DistrictsData = [];
                    $scope.MandalsData = [];
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.CoordinatorName = null;
                    $scope.CoordinatorEmail = null;
                    $scope.CoordinatorMobile = null;
                    $scope.CoordinatingCentre = null;


                } else if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.GetDistCoordinators();
                    $scope.statedisable = false;
                    $scope.districtdisable = false;
                    $scope.buttondisable = false;
                    $scope.State = null;
                    $scope.CentresData = [];
                    $scope.DistrictsData = [];
                    $scope.MandalsData = [];
                    //$scope.CoordinatorsDataNew = [];
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.CoordinatorName = null;
                    $scope.CoordinatorEmail = null;
                    $scope.CoordinatorMobile = null;
                    $scope.CoordinatingCentre = null;
                    //$scope.GetDistCoordinatingCenters($scope.DistrictID);


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

