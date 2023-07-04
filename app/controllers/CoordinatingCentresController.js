define(['app'], function (app) {
    app.controller("CoordinatingCentresController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;

        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.ActiveButton = true;
            $scope.GetDistricts();
            $scope.GetCoordinatingCentres();
        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });

        $scope.DownloadtoExcel = function () {
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

        //var getstates = AdminService.GetStates();
        //getstates.then(function (response) {
        //    try {
        //        var res = JSON.parse(response);
        //    }
        //    catch (err) { }
        //    $scope.StatesData = res.Table;
        //    $scope.StateID = $scope.StatesData[0].StateID;

        //},
        //    function (error) {
        //        alert("error while loading States");
        //        //var err = JSON.parse(error);

        //    });


        $scope.GetDistricts = function () {
            //var DataType = 1;//Only Telengana dists
            //var StateID = 1;
            var getdistrict = AdminService.GetDistricts();
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

        $scope.getCoordinatingAddressDistricts = function () {
            if ($scope.DistrictArray.length > 0) {
                $scope.districtarr = $scope.DistrictArray;
            }
            var getmandals = AdminService.GetCoordinatingAddressDistricts(JSON.stringify($scope.districtarr));
            getmandals.then(function (response) {
              
                if (response.length > 0) {
                    
                   $scope.AddressDistrictsData = response;
 
                }
                else {
                    $scope.AddressDistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getCoordinatingAddressMandals = function () {
            if ($scope.DistrictID == null || $scope.DistrictID == "" || $scope.DistrictID == undefined ){
                $scope.AddressMandalsData = []
                return;
            }
            if ($scope.mandalarr.length > 0) {
            //    $scope.mandalarr = $scope.MandalArray;
            }
            var getmandals = AdminService.GetCoordinatingAddressMandals($scope.DistrictID,JSON.stringify($scope.mandalarr));
            getmandals.then(function (response) {

                if (response.length > 0) {

                    $scope.AddressMandalsData = response;

                    console.log($scope.AddressMandalsData)
                }
                else {
                    $scope.AddressMandalsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }



        $scope.editCoordinatingDistricts = function (CoordinatingCentreID) {
            var getdistrict = AdminService.GetEditDistricts(CoordinatingCentreID);
            $scope.CoordinatingCentreID = CoordinatingCentreID;
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.EditDistrictsData = res.Table;
                }
                else {
                    $scope.EditDistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.editCoordinatingMandals = function (EditData2) {
            $scope.DistrictID = $scope.EditData2[0].DistrictID;
            var getmandal = AdminService.GetEditMandals($scope.DistrictID, $scope.CoordinatingCentreID);
            getmandal.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.EditMandalsData = res.Table;
                }
                else {
                    $scope.EditMandalsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }


        $scope.getCentreMandals = function (DistrictID) {
            //alert(DistrictID)
            var array = []
            array.push({ "DistrictID": DistrictID })
            var getmandal = AdminService.GetCentreMandals(JSON.stringify(array));
            getmandal.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.AllMandalsData = res.Table;
                }
                else {
                    $scope.AllMandalsData = [];
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
        $scope.pushData = function (DistrictID) {
            return {
                "DistrictID": DistrictID

            };
        }

        $scope.pushData1 = function (MandalID) {
            return {
                "MandalID": MandalID

            };
        }

        $scope.pushData2 = function (DistrictID) {
            return {
                "DistrictID": DistrictID

            };
        }

        //$scope.mandalarr = [];
        //var tempId1 = [];
        //$scope.optionToggledmandal = function (selected, MandalID) {
        //    //$scope.isAllSelectedmandals = $scope.MandalsData.every(function (itm) { return itm.selected; })

        //    //angular.forEach($scope.MandalsData, function (value, key) {
        //    //    if (value.selected === true) {
        //    //        $scope.mandalarr.push({ "MandalID": value.MandalID })
        //    //    }
        //    //});
        //    //console.log(selected)
        //    if ($scope.mandalarr.length == '0') {
        //        if (selected == true) {
        //            var marksdata = $scope.pushData1(MandalID);
        //            $scope.mandalarr.push(marksdata);
        //            tempId1.push(MandalID);

        //        }
        //    } else if ($scope.mandalarr.length > 0) {
        //        $scope.mandalarr.map((obj) => {
        //            if (selected == true) {

        //                if (obj.MandalID == MandalID) {
        //                    //  if (selected == true) {
        //                    return;
        //                }
        //                else if (obj.MandalID != MandalID && !tempId1.includes(MandalID)) {
        //                    var StudentFedd = $scope.pushData1(MandalID);
        //                    tempId1.push(MandalID);
        //                    $scope.mandalarr.push(StudentFedd);

        //                }


        //            }
        //            else {

        //                for (let i = 0; i < $scope.mandalarr.length; i++) {
        //                    if ($scope.mandalarr[i].MandalID == MandalID) {
        //                        // delete $scope.mandalarr[i];
        //                        $scope.mandalarr.splice(i, 1);
        //                        tempId1.splice(i, 1)
        //                        //console.log($scope.mandalarr[i])
        //                    }
        //                }
        //                //console.log($scope.mandalarr)


        //            }
        //        });
        //    }
        //    //console.log($scope.mandalarr)
        //}

        var tempId = [];

        $scope.districtarr = [];
        $scope.optionToggleddistrict = function (selected, DistrictID) {
            //console.log(selected)
            if ($scope.districtarr.length == '0') {
                if (selected == true) {
                    var marksdata = $scope.pushData(DistrictID);
                    $scope.districtarr.push(marksdata);
                    tempId.push(DistrictID);
                    $scope.getMandalsforCoordinatingCentres();
                    $scope.getCoordinatingAddressDistricts();
                //    $scope.GetCoordinatingCentres();
                }
            } else if ($scope.districtarr.length > 0) {
                $scope.districtarr.map((obj) => {
                    if (selected == true) {

                        if (obj.DistrictID == DistrictID) {
                            //  if (selected == true) {
                            $scope.getMandalsforCoordinatingCentres();
                            $scope.getCoordinatingAddressDistricts();
                            //$scope.GetCoordinatingCentres();

                        }
                        else if (obj.DistrictID != DistrictID && !tempId.includes(DistrictID)) {
                            var StudentFedd = $scope.pushData(DistrictID);
                            tempId.push(DistrictID);
                            $scope.districtarr.push(StudentFedd);
                            $scope.getMandalsforCoordinatingCentres();
                            $scope.getCoordinatingAddressDistricts();

                        }


                    }
                    else {

                        for (let i = 0; i < $scope.districtarr.length; i++) {
                            if ($scope.districtarr[i].DistrictID == DistrictID) {
                                // delete $scope.districtarr[i];
                                $scope.districtarr.splice(i, 1);
                                tempId.splice(i, 1)
                                //console.log($scope.districtarr[i])
                            }
                        }
                        //console.log($scope.districtarr)
                        //console.log($scope.mandalarr)
                        $scope.getMandalsforCoordinatingCentres();
                        $scope.getCoordinatingAddressDistricts();


                    }
                });

            }
            //console.log($scope.mandalarr)
        }

        var tempId2 = [];

        $scope.districtarr1 = [];
        $scope.optionEditToggleddistrict = function (selected, DistrictID) {
            //console.log(selected)
            if ($scope.DistrictArray.length == '0') {
                if (selected == true) {
                    var marksdata = $scope.pushData2(DistrictID);
                    $scope.DistrictArray.push(marksdata);
                    tempId2.push(DistrictID);
                    $scope.getMandalsforCoordinatingCentres();
                    $scope.GetCoordinatingCentres();
                }
            } else if ($scope.DistrictArray.length > 0) {
                $scope.DistrictArray.map((obj) => {
                    if (selected == true) {

                        if (obj.DistrictID == DistrictID) {
                            //  if (selected == true) {
                            $scope.getMandalsforCoordinatingCentres();
                            $scope.GetCoordinatingCentres();

                        }
                        else if (obj.DistrictID != DistrictID && !tempId2.includes(DistrictID)) {
                            var StudentFedd = $scope.pushData(DistrictID);
                            tempId2.push(DistrictID);
                            $scope.DistrictArray.push(StudentFedd);
                            $scope.getMandalsforCoordinatingCentres();
                        }


                    }
                    else {

                        for (let i = 0; i < $scope.DistrictArray.length; i++) {
                            if ($scope.DistrictArray[i].DistrictID == DistrictID) {
                                // delete $scope.districtarr[i];
                                $scope.DistrictArray.splice(i, 1);
                                tempId2.splice(i, 1)
                                //console.log($scope.districtarr[i])
                            }
                        }
                        //console.log($scope.districtarr)
                        //console.log($scope.mandalarr)
                        $scope.getMandalsforCoordinatingCentres();

                    }
                });

            }
            //$scope.districtarr = $scope.DistrictArray;
            // console.log($scope.districtarr)
        }

        //$scope.optionToggleddistrict = function () {
        //    $scope.isAllSelecteddistricts = $scope.DistrictsData.every(function (itm) { return itm.selected; })
        //    $scope.districtarr = [];
        //    angular.forEach($scope.DistrictsData, function (value, key) {
        //        if (value.selected == true) {
        //            $scope.districtarr.push({ "DistrictID": value.DistrictID })

        //        }
        //    });
        //    $scope.getMandalsforCoordinatingCentres();
        //}



        $scope.Cancel = function () {

            $scope.DistrictsData = [];
            $scope.GetDistricts();
            $scope.MandalsData = [];
            $scope.isAllSelecteddistricts = null;
            $scope.isAllSelectedmandals = null;
            $scope.CoordinatingCentreName = null;
            $scope.HouseNo = null;
            $scope.StreetNo = null;
            $scope.Locality = null;
            $scope.Landmark = null;
            $scope.Village = null;
            $scope.AddressDistrictsData = [];
            $scope.AllMandalsData = [];
            $scope.PinCode = null;
            $scope.CoordinatorName = null;
            $scope.CoordinatorMobile = null;
            $scope.CoordinatorEmail = null;
            $scope.CoordinatorsDataNew = [];

        }



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
            $scope.getCoordinatingAddressDistricts();
            $scope.getCoordinatingAddressMandals();
        }

        $scope.optionToggledmandal = function () {
            $scope.isAllSelectedmandals = $scope.MandalsData.every(function (itm) { return itm.selected; })
            $scope.mandalarr = [];
            angular.forEach($scope.MandalsData, function (value, key) {
                if (value.selected == true) {
                    $scope.mandalarr.push({ "MandalID": value.MandalID })
                   
                }        
            });
            $scope.getCoordinatingAddressDistricts();
            $scope.getCoordinatingAddressMandals();
            //console.log($scope.mandalarr)
        }

        $scope.toggleEditAllmandal = function () {
            var toggleStatus = $scope.isAllSelectedmandals;
            angular.forEach($scope.EditedMandals, function (itm) { itm.selected = toggleStatus; });
            $scope.MandalArray = [];
            angular.forEach($scope.EditedMandals, function (value, key) {
                if (value.selected === true) {
                    $scope.MandalArray.push({ "MandalID": value.MandalID })
                }
            });
        }

        $scope.optionToggledEditmandal = function () {
            $scope.isAllSelectedmandals = $scope.EditedMandals.every(function (itm) { return itm.selected; })
            $scope.MandalArray = [];
            angular.forEach($scope.EditedMandals, function (value, key) {
                if (value.selected == true) {
                    $scope.MandalArray.push({ "MandalID": value.MandalID })

                }
            });
            console.log($scope.MandalArray)
        }



        $scope.mandalarr = []
        $scope.DistrictArray = []

        $scope.getMandalsforCoordinatingCentres = function () {
            if ($scope.DistrictArray.length > 0) {
                $scope.districtarr = $scope.DistrictArray;
            }
            var getmandals = AdminService.GetCoordinatingCentreMandals(JSON.stringify($scope.districtarr));
            getmandals.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }


                console.log($scope.MandalArray)
                if (response.length > 0) {
                    if ($scope.mandalarr.length == 0) {
                        $scope.MandalsData = response;

                    } else if ($scope.MandalArray) {
                        $scope.MandalsData = response;
                        return;
                    }

                    var arr = []
                    var data = []
                    for (var j = 0; j < response.length; j++) {
                        arr = response[j]
                        for (var i = 0; i < $scope.mandalarr.length; i++) {

                            if ($scope.mandalarr[i].MandalID == response[j].MandalID) {
                                arr.selected = true;

                            } else {

                            }

                        }
                        data.push(arr)
                    }
                    $scope.MandalsData = data;
                    console.log($scope.MandalArray)
                    //var arr1 = []
                    //var data1 = []
                    //for (var j = 0; j < response.length; j++) {
                    //    arr1 = response[j]
                    //    for (var i = 0; i < $scope.MandalArray.length; i++) {

                    //        if ($scope.MandalArray[i].MandalID == response[j].MandalID) {
                    //            arr1.selected = true;

                    //        } else {

                    //        }

                    //    }
                    //    data1.push(arr1)
                    //}

                    //console.log($scope.MandalArray)
                    //console.log(data1)
                    //$scope.EditedMandals =[]
                    //var data2 = [];
                    //var data3 = [];
                    //for (var i = 0; i < data1.length; i++) {
                    //    var data2 = data1[i]
                    //    for (var j = 0; j < $scope.MandalArray.length; j++) {

                    //        if (data1[i].MandalID == $scope.MandalArray[j].MandalID) {
                    //            console.log(data1[i].MandalID)
                    //            data2.selected = true
                    //        }

                    //    }
                    //    data3.push(data2)
                    //}
                    //data4= []
                    //for (var j = 0; j < $scope.EditMandalData.length; j++) {
                    //    data4 = $scope.EditMandalData[j]
                    //    console.log(data4)
                    //    for (var i = 0; i < data3.length; i++) {
                    //        //if (data3[i].MandalID != $scope.EditMandalData[j].MandalID) {

                    //            data4.selected = true;
                    //            console.log(data4)

                    //        //}

                    //    }
                    //    $scope.EditedMandals.push(data4)
                    //}
                    //$scope.EditedMandals.push(data3)
                    ////$scope.EditedMandals.push($scope.MandalArray)
                    //console.log($scope.EditedMandals)


                    ////$scope.EditedMandals =


                }
                else {
                    $scope.MandalsData = [];
                    $scope.EditedMandals = [];
                }
                //console.log($scope.MandalsData)
                //console.log($scope.mandalarr)
                //console.log($scope.districtarr)
            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.FilterMandals = function () {
            var data = []

            angular.forEach($scope.mandalarr, function (value, key) {
                angular.forEach($scope.MandalsData, function (value1, key) {
                    if (value1.MandalID === value.MandalID) {
                        data.push({ "MandalID": value.MandalID })
                    }
                })
            });
            $scope.mandalarr = data;
            //console.log($scope.mandalarr)
        }



        $scope.Submit = function () {

            if ($scope.districtarr == null || $scope.districtarr == undefined || $scope.districtarr == "") {
                alert("Please Select District");
                return;
            }

            if ($scope.mandalarr == null || $scope.mandalarr == undefined || $scope.mandalarr == "") {
                alert("Please Select Mandal");
                return;
            }
            if ($scope.CoordinatingCentreName == null || $scope.CoordinatingCentreName == undefined || $scope.CoordinatingCentreName == "") {
                alert("Please Enter Coordinating Centre Name");
                return;
            }
            //if ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == "") {
            //    alert("Please Enter House Number");
            //    return;
            //}
            //if ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == "") {
            //    alert("Please Enter Street Number");
            //    return;
            //}
            //if ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == "") {
            //    alert("Please Enter Locality");
            //    return;
            //}

            //if ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == "") {
            //    alert("Please Enter Landmark");
            //    return;
            //}

            //if ($scope.Village == null || $scope.Village == undefined || $scope.Village == "") {
            //    alert("Please Enter Village");
            //    return;
            //}


            if ($scope.DistrictID == null || $scope.DistrictID == undefined || $scope.DistrictID == "") {
                alert("Please Select District");
                return;
            }
            if ($scope.Mandal == null || $scope.Mandal == undefined || $scope.Mandal == "") {
                alert("Please Select Mandal");

                return;
            }
            if ($scope.PinCode == null || $scope.PinCode == undefined || $scope.PinCode == "") {
                alert("Please Enter PinCode");
                return;
            }

            if ($scope.QPRoute == null || $scope.QPRoute == undefined || $scope.QPRoute == "") {
                alert("Please Enter QP Route Number");
                return;
            }

            if ($scope.RouteSequence == null || $scope.RouteSequence == undefined || $scope.RouteSequence == "") {
                alert("Please Enter Route Sequence");
                return;
            }
            if ($scope.CoordinatorName == null || $scope.CoordinatorName == undefined || $scope.CoordinatorName == "") {
                alert("Please Enter Coordinator Name");
                return;
            }
            if ($scope.CoordinatorMobile == null || $scope.CoordinatorMobile == undefined || $scope.CoordinatorMobile == "") {
                alert("Please Enter Coordinator Mobile");
                return;
            }
            //if ($scope.CoordinatorEmail == null || $scope.CoordinatorEmail == undefined || $scope.CoordinatorEmail == "") {
            //    alert("Please Enter CoordinatorEmail");
            //    return;
            //}
            $scope.FilterMandals();
            let HouseNo = ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == '') ? '' : $scope.HouseNo;
            let StreetNo = ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == '') ? '' : $scope.StreetNo;
            let Locality = ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == '') ? '' : $scope.Locality;
            let Landmark = ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == '') ? '' : $scope.Landmark;
            let Village = ($scope.Village == null || $scope.Village == undefined || $scope.Village == '') ? '' : $scope.Village;
            let CoordinatorEmail = ($scope.CoordinatorEmail == null || $scope.CoordinatorEmail == undefined || $scope.CoordinatorEmail == '') ? '' : $scope.CoordinatorEmail;
            var paramObj = {
                "StateID": 1,
                "DistrictID": JSON.stringify($scope.districtarr),
                "MandalID": JSON.stringify($scope.mandalarr),
                "CentreName": $scope.CoordinatingCentreName,
                "HouseNumber": HouseNo,
                "StreetName": StreetNo,
                "Locality": Locality,
                "Landmark": Landmark,
                "Village": Village,
                "AddressDistrictId": $scope.DistrictID,
                "AddressMandalId": $scope.Mandal,
                "Pincode": $scope.PinCode,
                "CoordinatorName": $scope.CoordinatorName,
                "CoordinatorMobile": $scope.CoordinatorMobile,
                "CoordinatorEmail": CoordinatorEmail,
                "RouteNumber": $scope.QPRoute,
                "RouteSequence": $scope.RouteSequence,
                "UserName": authData.UserName
            }
            $scope.loading = true;
            $scope.CoordinatorsDataNew = [];

            var addcoordinatecentres = AdminService.AddCoordinatingCentres(paramObj);
            addcoordinatecentres.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //let VerRes = response[0];

                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    $scope.CoordinatingCentreID = res[0].CoordinatingCentreID;
                    $scope.CentreCode = res[0].CentreCode;
                    $scope.UserPassword = res[0].UserPassword;

                    $scope.AddCoordinatingCentreUser();



                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);



                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }

        $scope.AddCoordinatingCentreUser = function () {
            var UserEncriptedPassword = $crypto.encrypt($crypto.encrypt($scope.UserPassword, 'HBSBP9214EDU00TS'), $scope.RegistrationEKey) + '$$@@$$' + $scope.RegistrationEKey;
            var paramObj = {
                "CoordinatingCentreID": $scope.CoordinatingCentreID,
                "CentreCode": $scope.CentreCode,
                "UserPassword": $scope.UserPassword,
                "UserEncryptedPassword": UserEncriptedPassword,
                "UserName": authData.UserName
            }
            var addcoordinatecentreusers = AdminService.AddCoordinatingCentreUser(paramObj);
            addcoordinatecentreusers.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //let VerRes = response[0];
                if (res.ResponseCode == '200') {
                    $scope.loading = false;
                    alert('Coordinating Centre Added Successfully');
                    //$scope.SendSmstoCoordinator()
                    //alert("SBTET POLYCET Portal Login Credentials," + res.UserName + res.UserPassword," Secretary, SBTET TS.");
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.GetCoordinatingCentres();
                    alert("Login Credentials sent to the Coordinator Mobile Number.");
                    $scope.DistrictsData = [];
                    $scope.GetDistricts();
                    $scope.MandalsData = [];
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.districtarr = [];
                    $scope.mandalarr = [];
                    $scope.CoordinatingCentreName = null;
                    $scope.HouseNo = null;
                    $scope.StreetNo = null;
                    $scope.Locality = null;
                    $scope.Landmark = null;
                    $scope.Village = null;
                    $scope.AddressDistrictsData = [];
                    $scope.AllMandalsData = [];
                    $scope.PinCode = null;
                    $scope.QPRoute = null;
                    $scope.RouteSequence = null;
                    $scope.CoordinatorName = null;
                    $scope.CoordinatorMobile = null;
                    $scope.CoordinatorEmail = null;
                    //$scope.CoordinatorsDataNew = [];



                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.GetCoordinatingCentres();
                    //$scope.DistrictsData = [];
                    //$scope.GetDistricts();
                    //$scope.MandalsData = [];
                    //$scope.isAllSelecteddistricts = null;
                    //$scope.isAllSelectedmandals = null;
                    //$scope.districtarr = [];
                    //$scope.mandalarr = [];
                    //$scope.CoordinatingCentreName = null;
                    //$scope.HouseNo = null;
                    //$scope.StreetNo = null;
                    //$scope.Locality = null;
                    //$scope.Landmark = null;
                    //$scope.Village = null;
                    //$scope.AllMandalsData = [];
                    //$scope.PinCode = null;
                    //$scope.CoordinatorName = null;
                    //$scope.CoordinatorMobile = null;
                    //$scope.CoordinatorEmail = null;
                    //$scope.CoordinatorsDataNew = [];


                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }

        


        $scope.GetCoordinatingCentres = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 1;
            //$scope.DataType=1
            var distcoordinators = AdminService.GetCoordinatingCenters(DataType);
            distcoordinators.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.CoordinatorsDataNew = response.Table;
                    $scope.loading = false;
                    $scope.nodata = false;
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

        $scope.Edit = function (CoordinatingCentreID) {
            var distcoordinators = AdminService.GetEditCoordinatingCentreDetails(CoordinatingCentreID);
            distcoordinators.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    $scope.EditDistrictData = response.Table;
                    $scope.EditMandalData = response.Table1;
                    $scope.EditData2 = response.Table2;
                    $scope.editCoordinatingDistricts($scope.EditData2[0].CoordinatingCentreID)
                    $scope.editCoordinatingMandals($scope.EditData2[0].DistrictID,$scope.EditData2[0].CoordinatingCentreID)

                    //$scope.EditedDistricts = []
                    //$scope.DistrictArray =[]
                    //var arr = []
                    //if ($scope.DistrictsData.length > 0) {


                    //    for (var j = 0; j < $scope.DistrictsData.length; j++) {
                    //        arr = $scope.DistrictsData[j]
                    //        for (var i = 0; i < $scope.EditDistrictData.length; i++) {
                    //            if ($scope.EditDistrictData[i].DistrictID == $scope.DistrictsData[j].DistrictID) {
                    //                arr.selected = true;
                    //                $scope.DistrictArray.push({ "DistrictID": $scope.DistrictsData[j].DistrictID })
                    //            } else {
                    //                //console.log("false")
                    //            }

                    //        }
                    //        $scope.EditedDistricts.push(arr)
                    //    }
                    //   console.log($scope.EditedDistricts)
                    //    console.log($scope.DistrictArray)
                    //}
                    //else {
                    //    $scope.EditDistrictData = [];
                    //}

                    //$scope.EditedMandals = []
                    //var arr1 = []
                    //var arr2 = []
                    //$scope.MandalArray =[]
                    //if ($scope.EditMandalData.length > 0) {
                    //    for (var j = 0; j < $scope.MandalsData.length; j++) {
                    //        arr1 = $scope.MandalsData[j]

                    //        //
                    //        $scope.EditedMandals.push(arr1)


                    //        }

                    //for (var i = 0; i < $scope.EditMandalData.length; i++) {
                    //    arr2 = $scope.EditMandalData[i]
                    //    //if ($scope.EditMandalData[i].MandalID == $scope.MandalsData[j].MandalID) {
                    //    arr2.selected = true;
                    //    $scope.EditedMandals.push(arr2)
                    //    $scope.MandalArray.push({ "MandalID": $scope.EditMandalData[i].MandalID })
                    //    //console.log(arr2)
                    //    }
                    //    console.log($scope.MandalArray)
                }
                else {
                    $scope.EditMandalData = [];
                }


            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditCoordinatingCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                //windowClass: 'modal-fit-att',
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }


        $scope.View = function (CoordinatingCentreID) {
            var distcoordinators = AdminService.GetEditCoordinatingCentreDetails(CoordinatingCentreID);
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
                templateUrl: "/app/views/Popups/ViewCoordinatingCentresPopup.html",
                //size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                //windowClass: 'modal-fit-att',
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.Deletion = function (CoordinatingCentreID) {
            var distcoordinators = AdminService.GetEditCoordinatingCentreDetails(CoordinatingCentreID);
            distcoordinators.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.DeleteData = response.Table;
                    $scope.DeleteData1 = response.Table1;
                    $scope.DeleteData2 = response.Table2;
                }
                else {
                    $scope.CoordinatorsDataNew = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance1 = $uibModal.open({
                templateUrl: "/app/views/Popups/DeleteCoordinatingCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal1 = function () {
                $scope.modalInstance1.close();
            }
        }

        $scope.DeleteDetails = function (test) {


            test = { 'DistrictName': $scope.DistrictName, 'MandalName': $scope.MandalName, 'CentreCode': $scope.CentreCode, 'CentreName': $scope.CentreName }
            $scope.modalInstance2 = $uibModal.open(
                {
                    templateUrl: "/app/views/Popups/ConfirmDeleteCoordinatingCentrePopup.html",
                    size: 'small',
                    scope: $scope,
                    backdrop: 'static',
                    windowClass: 'modal-fit-att',
                    resolve: {
                        test: function () {
                            return test;
                        }

                    }
                }

            );
            $scope.closeModal2 = function () {
                $scope.modalInstance2.close();
            }
        }


        $scope.Delete = function (data2) {
            $scope.loading = true;
            $scope.CoordinatorsDataNew = [];
            var paramObj = {
                "DataType": 2,
                "CoordinatingCentreID": data2[0].CoordinatingCentreID,
                //"DistrictID": DistrictID,
                //"MandalID": MandalID,
                "CentreName": data2[0].CentreName,
                "HouseNumber": data2[0].HouseNumber,
                "StreetName": data2[0].StreetName,
                "Locality": data2[0].Locality,
                "Landmark": data2[0].Landmark,
                "Village": data2[0].Village,
                "AddressDistrictId": data2[0].DistrictID,
                "AddressMandalId": data2[0].MandalID,
                "Pincode": data2[0].Pincode,
                "CoordinatorName": data2[0].CoordinatorName,
                "CoordinatorMobile": data2[0].CoordinatorMobile,
                "CoordinatorEmail": data2[0].CoordinatorEmail,
                "RouteNumber": data2[0].RouteNumber,
                "RouteSequence": data2[0].RouteSequence,
                "Active": data2[0].Active,
                "UserName": authData.UserName,
            }

            var deletedistcoordinators = AdminService.DeleteCoordinatingCentres(paramObj);
            deletedistcoordinators.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.GetCoordinatingCentres();
                    $scope.modalInstance1.close();
                    $scope.modalInstance2.close();
                    $scope.DistrictsData = [];
                    $scope.GetDistricts();
                    $scope.MandalsData = [];
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.districtarr = [];
                    $scope.mandalarr = [];
                    $scope.CoordinatingCentreName = null;
                    $scope.HouseNo = null;
                    $scope.StreetNo = null;
                    $scope.Locality = null;
                    $scope.Landmark = null;
                    $scope.Village = null;
                    $scope.AllMandalsData = [];
                    $scope.PinCode = null;
                    $scope.QPRoute = null;
                    $scope.RouteSequence = null;
                    $scope.CoordinatorName = null;
                    $scope.CoordinatorMobile = null;
                    $scope.CoordinatorEmail = null;
                    //$scope.CoordinatorsDataNew = [];


                } else if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.GetCoordinatingCentres();
                    $scope.DistrictsData = [];
                    $scope.GetDistricts();
                    $scope.MandalsData = [];
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.districtarr = [];
                    $scope.mandalarr = [];
                    $scope.CoordinatingCentreName = null;
                    $scope.HouseNo = null;
                    $scope.StreetNo = null;
                    $scope.Locality = null;
                    $scope.Landmark = null;
                    $scope.Village = null;
                    $scope.AllMandalsData = [];
                    $scope.PinCode = null;
                    $scope.QPRoute = null;
                    $scope.RouteSequence = null;
                    $scope.CoordinatorName = null;
                    $scope.CoordinatorMobile = null;
                    $scope.CoordinatorEmail = null;
                    //$scope.CoordinatorsDataNew = [];

                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

        $scope.UpdateDetails = function (data2) {
            //if ($scope.districtarr == null || $scope.districtarr == undefined || $scope.districtarr == "") {
            //    alert("Please Select District");
            //    return;
            //}

            //if ($scope.mandalarr == null || $scope.mandalarr == undefined || $scope.mandalarr == "") {
            //    alert("Please Select Mandal");
            //    return;
            //}
            if (data2[0].CentreName == null || data2[0].CentreName == undefined || data2[0].CentreName == "") {
                alert("Please Enter Coordinating Centre Name");
                return;
            }
            //if (data2[0].HouseNumber == null || data2[0].HouseNumber == undefined || data2[0].HouseNumber == "") {
            //    alert("Please Enter House Number");
            //    return;
            //}
            //if (data2[0].StreetName == null || data2[0].StreetName == undefined || data2[0].StreetName == "") {
            //    alert("Please Enter Street Number/Name");
            //    return;
            //}
            //if (data2[0].Locality == null || data2[0].Locality == undefined || data2[0].Locality == "") {
            //    alert("Please Enter Locality");
            //    return;
            //}

            //if (data2[0].Landmark == null || data2[0].Landmark == undefined || data2[0].Landmark == "") {
            //    alert("Please Enter Landmark");
            //    return;
            //}

            //if (data2[0].Village == null || data2[0].Village == undefined || data2[0].Village == "") {
            //    alert("Please Enter Village");
            //    return;
            //}


            if (data2[0].DistrictName == null || data2[0].DistrictName == undefined || data2[0].DistrictName == "") {
                alert("Please Select District");
                return;
            }
            if (data2[0].MandalName == null || data2[0].MandalName == undefined || data2[0].MandalName == "") {
                alert("Please Select Mandal");

                return;
            }
            if (data2[0].Pincode == null || data2[0].Pincode == undefined || data2[0].Pincode == "") {
                alert("Please Enter PinCode");
                return;
            }
            if (data2[0].RouteNumber == null || data2[0].RouteNumber == undefined || data2[0].RouteNumber == "") {
                alert("Please Enter QP Route Number");
                return;
            }
            if (data2[0].RouteSequence == null || data2[0].RouteSequence == undefined || data2[0].RouteSequence == "") {
                alert("Please Enter Route Sequence");
                return;
            }
            if (data2[0].CoordinatorName == null || data2[0].CoordinatorName == undefined || data2[0].CoordinatorName == "") {
                alert("Please Enter Coordinator Name");
                return;
            }
            if (data2[0].CoordinatorMobile == null || data2[0].CoordinatorMobile == undefined || data2[0].CoordinatorMobile == "") {
                alert("Please Enter Coordinator Mobile");
                return;
            }
            //if (data2[0].CoordinatorEmail == null || data2[0].CoordinatorEmail == undefined || data2[0].CoordinatorEmail == "") {
            //    alert("Please Enter CoordinatorEmail");
            //    return;
            //}

            let HouseNumber = (data2[0].HouseNumber == null || data2[0].HouseNumber == undefined || data2[0].HouseNumber == '') ? '' : data2[0].HouseNumber;
            let StreetName = (data2[0].StreetName == null || data2[0].StreetName == undefined || data2[0].StreetName == '') ? '' : data2[0].StreetName;
            let Locality = (data2[0].Locality == null || data2[0].Locality == undefined || data2[0].Locality == '') ? '' : data2[0].Locality;
            let Landmark = (data2[0].Landmark == null || data2[0].Landmark == undefined || data2[0].Landmark == '') ? '' : data2[0].Landmark;
            let Village = (data2[0].Village == null || data2[0].Village == undefined || data2[0].Village == '') ? '' : data2[0].Village;
            let CoordinatorEmail = (data2[0].CoordinatorEmail == null || data2[0].CoordinatorEmail == undefined || data2[0].CoordinatorEmail == '') ? '' : data2[0].CoordinatorEmail;
            var paramObj = {
                "DataType": 1,
                "CoordinatingCentreID": data2[0].CoordinatingCentreID,
                //"DistrictID": DistrictID,
                //"MandalID": MandalID,
                "CentreName": data2[0].CentreName,
                "HouseNumber": HouseNumber,
                "StreetName": StreetName,
                "Locality": Locality,
                "Landmark": Landmark,
                "Village": Village,
                "AddressDistrictId": data2[0].DistrictID,
                "AddressMandalId": data2[0].MandalID,
                "Pincode": data2[0].Pincode,
                "CoordinatorName": data2[0].CoordinatorName,
                "CoordinatorMobile": data2[0].CoordinatorMobile,
                "CoordinatorEmail": CoordinatorEmail,
                "Active": data2[0].Active,
                "RouteNumber": data2[0].RouteNumber,
                "RouteSequence": data2[0].RouteSequence,
                "UserName": authData.UserName,
            }
            $scope.loading = true;
            $scope.CoordinatorsDataNew = [];

            var updatedistcoordinators = AdminService.UpdateCoordinatingCentres(paramObj);
            updatedistcoordinators.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.GetCoordinatingCentres();
                    $scope.modalInstance.close();
                    $scope.DistrictsData = [];
                    $scope.GetDistricts();
                    $scope.MandalsData = [];
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.CoordinatingCentreName = null;
                    $scope.HouseNo = null;
                    $scope.StreetNo = null;
                    $scope.Locality = null;
                    $scope.Landmark = null;
                    $scope.Village = null;
                    $scope.AllMandalsData = [];
                    $scope.AddressDistrictsData = [];
                    $scope.PinCode = null;
                    $scope.QPRoute = null;
                    $scope.RouteSequence = null;
                    $scope.CoordinatorName = null;
                    $scope.CoordinatorMobile = null;
                    $scope.CoordinatorEmail = null;
                    //$scope.CoordinatorsDataNew = [];


                } else if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.GetCoordinatingCentres();
                    //$scope.DistrictsData = [];
                    //$scope.GetDistricts();
                    //$scope.MandalsData = [];
                    //$scope.isAllSelecteddistricts = null;
                    //$scope.isAllSelectedmandals = null;
                    //$scope.CoordinatingCentreName = null;
                    //$scope.HouseNo = null;
                    //$scope.StreetNo = null;
                    //$scope.Locality = null;
                    //$scope.Landmark = null;
                    //$scope.Village = null;
                    //$scope.AllMandalsData = [];
                    //$scope.PinCode = null;
                    //$scope.CoordinatorName = null;
                    //$scope.CoordinatorMobile = null;
                    //$scope.CoordinatorEmail = null;
                    //$scope.CoordinatorsDataNew = [];

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