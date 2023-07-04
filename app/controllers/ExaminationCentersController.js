define(['app'], function (app) {
    app.controller("ExaminationCentersController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        //$scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $scope.UserName = authData.UserName;
        $scope.UserTypeName = authData.UserTypeName;


   

        $ctrl.$onInit = () => {
            $scope.getDistricts();
            //$scope.getAdmDistricts();
            $scope.GetExamCentreType();
            $scope.GetExamCategories();
            $scope.getExaminationCentres();
            $scope.UrduMedium = "false";
        }

        if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' ||
            $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'DSPreExams' ||
            $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
            $scope.CoordinatingCentreCode = tmp.CentreCode;
            $scope.adminbackbutton = true;
        }
        else if ($scope.UserTypeName == 'CoordinatingCentre') {
            $scope.CoordinatingCentreCode = authData.UserName;
            $scope.dcbackbutton = true;
        }

        if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' ||
            $scope.UserTypeName == 'BoardOfficials') {
            $scope.ShowEdit = true;
        }
        else if ($scope.UserTypeName == 'DSPreExams' ||
            $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams' ||
            $scope.UserTypeName == 'CoordinatingCentre') {
            $scope.HideEdit = true;
        }

        if ($scope.UserTypeName == 'CoordinatingCentre') {
            $scope.Card = true;
        }
        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        $scope.GoBack1 = function () {
            $state.go('Dashboard.AdminExaminationCentres')
        }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });




        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            var DataType = 2;
            var exceldownload = AdminService.GetExaminationCentresExcel(DataType, $scope.UserName, $scope.CoordinatingCentreCode);
            exceldownload.then(function (res) {
                var response = JSON.parse(res);
                console.log(response)
                if (response[0].ResponceCode == '200') {
                    $scope.loading = false;
                    var location = response[0].file;
                    window.location.href = location;
                } else if (response[0].ResponceCode == '400') {
                    $scope.loading = false;
                    $scope.ErrMsg1 = response[0].ResponceDescription;
                } else {
                    $scope.loading = false;
                    alert("No Data Found");

                }
            }, function (err) {
                $scope.loading = false;
                alert("Error while loading");
            });

        }


        $scope.GetExamCentreType = function () {
            var getexamcentretype = AdminService.GetExamCentreType();
            getexamcentretype.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.ExamCentreTypeData = res.Table;

            },
                function (error) {
                    alert("error while loading States");
                    //var err = JSON.parse(error);

                });
        }

        $scope.GetExamCategories = function () {
            var getexamcentrecategories = AdminService.GetExamCentreCategories();
            getexamcentrecategories.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.CentresCategoryData = res.Table;
                $scope.ExaminationCentreCategoryID = 1
            },
                function (error) {
                    alert("error while loading States");
                    //var err = JSON.parse(error);

                });
        }

   
        $scope.getDistricts = function () {
            var getdistricts = AdminService.GetExaminationDistricts($scope.CoordinatingCentreCode);
            getdistricts.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.ExamDistrictsData = res.Table;
                }
                else {
                    $scope.ExamDistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.gEtMandals = function (DistrictID) {
            var array = []
            array.push({ "DistrictID": DistrictID })
            $scope.DistrictID = DistrictID;
            var getmandal = AdminService.GetExamCentreMandals(JSON.stringify(array), $scope.CoordinatingCentreCode);
            getmandal.then(function (resp) {
                //try {
                //    var res = JSON.parse(resp);
                //}
                //catch (err) { }

                if (resp.length > 0) {
                    $scope.NewMandalsData = resp;
                }
                else {
                    $scope.NewMandalsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }


        //$scope.getAdmDistricts = function () {
        //    var getdistricts = AdminService.GetExaminationDistricts(tmp.CentreCode);
        //    getdistricts.then(function (resp) {
        //        try {
        //            var res = JSON.parse(resp);
        //        }
        //        catch (err) { }

        //        if (res.Table.length > 0) {
        //            $scope.AdmExamDistrictsData = res.Table;
        //        }
        //        else {
        //            $scope.AdmExamDistrictsData = [];
        //        }

        //    },
        //        function (error) {
        //            //alert("data is not loaded");
        //            //    var err = JSON.parse(error);
        //        });
        //}

        //$scope.gEtAdmMandals = function (DistrictID) {
        //    var array = []
        //    array.push({ "DistrictID": DistrictID })
        //    $scope.DistrictID = DistrictID;
        //    var getmandal = AdminService.GetExamCentreMandals(JSON.stringify(array), tmp.CentreCode);
        //    getmandal.then(function (resp) {
        //        //try {
        //        //    var res = JSON.parse(resp);
        //        //}
        //        //catch (err) { }

        //        if (resp.length > 0) {
        //            $scope.AdmNewMandalsData = resp;
        //        }
        //        else {
        //            $scope.AdmNewMandalsData1 = [];
        //        }

        //    },
        //        function (error) {
        //            //alert("data is not loaded");
        //            //    var err = JSON.parse(error);
        //        });
        //}


        $scope.editExaminationDistricts = function (ExaminationCentreID) {
            var getexamdistrict = AdminService.GetEditExaminationDistricts(ExaminationCentreID);
            getexamdistrict.then(function (resp) {
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
            angular.forEach($scope.ExamDistrictsData, function (itm) { itm.selected = toggleStatus; });
            $scope.districtarr = [];
            angular.forEach($scope.ExamDistrictsData, function (value, key) {
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


        var tempId = [];

        $scope.districtarr = [];
        $scope.optionToggleddistrict = function (selected, DistrictID) {
            //console.log(selected)
            if ($scope.districtarr.length == '0') {
                if (selected == true) {
                    var marksdata = $scope.pushData(DistrictID);
                    $scope.districtarr.push(marksdata);
                    tempId.push(DistrictID);
                    $scope.GetMandals();
                    //$scope.getExaminationCentres();
                }
            } else if ($scope.districtarr.length > 0) {
                $scope.districtarr.map((obj) => {
                    if (selected == true) {

                        if (obj.DistrictID == DistrictID) {
                            //  if (selected == true) {
                            $scope.GetMandals();
                            //$scope.getExaminationCentres();


                        }
                        else if (obj.DistrictID != DistrictID && !tempId.includes(DistrictID)) {
                            var StudentFedd = $scope.pushData(DistrictID);
                            tempId.push(DistrictID);
                            $scope.districtarr.push(StudentFedd);
                            $scope.GetMandals();
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
                        $scope.GetMandals();

                    }
                });

            }
            //console.log($scope.mandalarr)
        }


        //$scope.getMandals = function () {
        //    if ($scope.State == null || $scope.State == undefined || $scope.State == "") {
        //        alert("Please Select State Name");
        //        return;
        //    }
        //    if ($scope.districtarr == null || $scope.districtarr == undefined || $scope.districtarr == "") {
        //        alert("Please Select District");
        //        return;
        //    }
        //    $scope.loading = true;
        //    $scope.statedisable = true;
        //    $scope.districtdisable = true;
        //    $scope.buttondisable = true;
        //    //DistrictID: JSON.stringify($scope.districtarr),
        //    $scope.GetMandals(JSON.stringify($scope.districtarr));
        //    //$scope.GetExaminationCentres(JSON.stringify($scope.districtarr));
        //    $scope.getExaminationCentres(JSON.stringify($scope.districtarr));
        //    $scope.loading = false;


        //}

        $scope.Cancel = function () {

            $scope.MandalsData = [];
            $scope.ExaminationCentreName = null;
            $scope.ExaminationCentreType = null;
            $scope.HouseNo = null;
            $scope.Village = null;
            $scope.Landmark = null;
            $scope.Locality = null;
            $scope.StreetNo = null;
            $scope.PinCode = null;
            $scope.AllMandalsData = [];
            $scope.ExamDistrictsData = [];
            $scope.districtarr = [];
            $scope.mandalarr = [];
            $scope.getDistricts();
            $scope.isAllSelecteddistricts = null;
            $scope.isAllSelectedmandals = null;
            $scope.ExaminationCentreCategory = null;
            $scope.StudentsperBench = null;
            $scope.TotalCapacity = null;
            $scope.PriorityOrder = null;
            $scope.SuperitendentName = null
            $scope.SuperitendentEmail = null;
            $scope.SuperitendentMobile = null;
            $scope.AsstSuperitendentName = null
            $scope.AsstMobile = null;
            $scope.AsstEmail = null;

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
        }

        $scope.optionToggledmandal = function () {
            $scope.isAllSelectedmandals = $scope.MandalsData.every(function (itm) { return itm.selected; })
            $scope.mandalarr = [];
            angular.forEach($scope.MandalsData, function (value, key) {
                if (value.selected == true) {
                    $scope.mandalarr.push({ "MandalID": value.MandalID })

                }
            });
            //console.log($scope.mandalarr)
        }
        $scope.mandalarr = []



        //$scope.GetAllMandals = function (DistrictID) {
        //    var array = []
        //    array.push({ "DistrictID": DistrictID })
        //    var getmandals = AdminService.GetExamCentreMandals(JSON.stringify(array), authData.UserName);
        //    getmandals.then(function (response) {
        //        $scope.AllMandals = response


        //    },
        //        function (error) {
        //            //alert("data is not loaded");
        //            //    var err = JSON.parse(error);
        //        });
        //}


        $scope.editExamCentreMandals = function (DistrictID) {
            var getexammandal = AdminService.GetEditExamCentreMandals(DistrictID, $scope.ExaminationCentreID);
            getexammandal.then(function (resp) {
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


        $scope.GetMandals = function () {

            var getmandals = AdminService.GetExamCentreMandals(JSON.stringify($scope.districtarr), authData.UserName);
            getmandals.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }


                //console.log($scope.mandalarr)
                if (response.length > 0) {
                    if ($scope.mandalarr.length == 0) {
                        $scope.MandalsData = response;
                        return;
                    }
                    //console.log($scope.mandalarr)
                    //console.log(response)
                    //   $scope.MandalsData = [];
                    var arr = []
                    var data = []

                    //console.log(data)
                    for (var j = 0; j < response.length; j++) {
                        arr = response[j]
                        //console.log("for1")
                        for (var i = 0; i < $scope.mandalarr.length; i++) {
                            //console.log("for2")

                            if ($scope.mandalarr[i].MandalID == response[j].MandalID) {

                                arr.selected = true;
                                //console.log("true")

                            } else {
                                //console.log("false")
                            }

                        }
                        data.push(arr)
                    }

                    $scope.MandalsData = data;

                    var arr1 = []

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
        }



        $scope.Submit = function (Mandal) {

            //$scope.Mandal = Mandal;
            //if ($scope.districtarr == null || $scope.districtarr == undefined || $scope.districtarr == "") {
            //    alert("Please Select District");
            //    return;
            //}

            //if ($scope.mandalarr == null || $scope.mandalarr == undefined || $scope.mandalarr == "") {
            //    alert("Please Select Mandal");
            //    return;
            //}
            if ($scope.ExaminationCentreName == null || $scope.ExaminationCentreName == undefined || $scope.ExaminationCentreName == "") {
                alert("Please Enter Examination Centre Name");
                return;
            }
            if ($scope.ExaminationCentreType == null || $scope.ExaminationCentreType == undefined || $scope.ExaminationCentreType == "") {
                alert("Please Select Examination Centre Type");
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

            if ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == "") {
                alert("Please Enter Landmark");
                return;
            }

            if ($scope.Village == null || $scope.Village == undefined || $scope.Village == "") {
                alert("Please Enter Village");
                return;
            }

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
            if ($scope.ExaminationCentreCategoryID == null || $scope.ExaminationCentreCategoryID == undefined || $scope.ExaminationCentreCategoryID == "") {
                alert("Please Select Examination Centre Category");
                return;
            }
            if ($scope.UrduMedium == null || $scope.UrduMedium == undefined || $scope.UrduMedium == "") {
                alert("Please Select Urdu Medium");
                return;
            }
            //if ($scope.CentreCapacityOneperBench == null || $scope.CentreCapacityOneperBench == undefined || $scope.CentreCapacityOneperBench == "") {
            //    alert("Please Enter Centre Capacity OneperBench");
            //    return;
            //}
            if ($scope.StudentsperBench == null || $scope.StudentsperBench == undefined || $scope.StudentsperBench == "") {
                alert("Please Select Students per Bench");
                return;
            }
            if ($scope.TotalCapacity == null || $scope.TotalCapacity == undefined || $scope.TotalCapacity == "") {
                alert("Please Enter Total Capacity");
                return;
            }
            //if ($scope.CentreCapacityTwoperBench == null || $scope.CentreCapacityTwoperBench == undefined || $scope.CentreCapacityTwoperBench == "") {
            //    alert("Please Enter Centre Capacity TwoperBench");
            //    return;
            //}
            if ($scope.ExaminationCentreCategoryID == null || $scope.ExaminationCentreCategoryID == undefined || $scope.ExaminationCentreCategoryID == "") {
                alert("Please Select Examination Centre Category");
                return;
            }
            //if ($scope.PriorityOrder == null || $scope.PriorityOrder == undefined || $scope.PriorityOrder == "") {
            //    alert("Please Enter Priority Order");
            //    return;
            //}
            if ($scope.SuperitendentName == null || $scope.SuperitendentName == undefined || $scope.SuperitendentName == "") {
                alert("Please Enter Superitendent Name");
                return;
            }
            if ($scope.SuperitendentMobile == null || $scope.SuperitendentMobile == undefined || $scope.SuperitendentMobile == "") {
                alert("Please Enter Superitendent Mobile");
                return;
            }
            if ($scope.SuperitendentEmail == null || $scope.SuperitendentEmail == undefined || $scope.SuperitendentEmail == "") {
                alert("Please Enter Superitendent Email");
                return;
            }
            if ($scope.AsstSuperitendentName == null || $scope.AsstSuperitendentName == undefined || $scope.AsstSuperitendentName == "") {
                alert("Please Enter Assistant Superitendent Name");
                return;
            }
            if ($scope.AsstMobile == null || $scope.AsstMobile == undefined || $scope.AsstMobile == "") {
                alert("Please Enter Assistant Superitendent Mobile");
                return;
            }
            if ($scope.AsstEmail == null || $scope.AsstEmail == undefined || $scope.AsstEmail == "") {
                alert("Please Enter Assistant Superitendent Email");
                return;
            }
            let HouseNo = ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == '') ? '' : $scope.HouseNo;
            let StreetNo = ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == '') ? '' : $scope.StreetNo;
            let Locality = ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == '') ? '' : $scope.Locality;
            $scope.FilterMandals();
            var paramObj = {
                //"DistrictID": JSON.stringify($scope.districtarr),
                //"MandalID": JSON.stringify($scope.mandalarr),
                "CentreName": $scope.ExaminationCentreName,
                "CentreTypeID": $scope.ExaminationCentreType,
                "HouseNumber": HouseNo,
                "StreetName": StreetNo,
                "Locality": Locality,
                "Landmark": $scope.Landmark,
                "Village": $scope.Village,
                "AddressDistrictId": $scope.DistrictID,
                "AddressMandalId": $scope.Mandal,
                "Pincode": $scope.PinCode,
                "CentreCategoryID": $scope.ExaminationCentreCategoryID,
                "UrduMedium": $scope.UrduMedium,
                "StudentsperBench": $scope.StudentsperBench,
                "TotalCapacity": $scope.TotalCapacity,
                //"PriorityOrder": $scope.PriorityOrder,
                "CheifSuperitendentName": $scope.SuperitendentName,
                "CheifSuperitendentMobile": $scope.SuperitendentMobile,
                "CheifSuperitendentEmail": $scope.SuperitendentEmail,
                "AsstCheifSuperitendentName": $scope.AsstSuperitendentName,
                "AsstCheifSuperitendentMobile": $scope.AsstMobile,
                "AsstCheifSuperitendentEmail": $scope.AsstEmail,
                "UserName": authData.UserName,
                "CoordinatingCentreCode": $scope.CoordinatingCentreCode
            }
            $scope.loading = true;
            $scope.ExamCentresDataNew = [];

            var addexaminationcentres = AdminService.AddExaminationCentres(paramObj);
            addexaminationcentres.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert('Examination Centre Added Successfully');
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.getExaminationCentres($scope.UserName);
                    $scope.ExaminationCentreName = null;
                    $scope.ExaminationCentreType = null;
                    $scope.MandalsData = [];
                    $scope.ExaminationCentreName = null;
                    $scope.ExaminationCentreType = null;
                    $scope.HouseNo = null;
                    $scope.Village = null;
                    $scope.Landmark = null;
                    $scope.Locality = null;
                    $scope.StreetNo = null;
                    $scope.PinCode = null;
                    $scope.AllMandalsData = [];
                    $scope.ExamDistrictsData = [];
                    $scope.districtarr = [];
                    $scope.mandalarr = [];
                    $scope.getDistricts();
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    //$scope.ExaminationCentreCategory = null;
                    //$scope.UrduMedium = null;
                    $scope.StudentsperBench = null;
                    $scope.TotalCapacity=null
                    //$scope.CentreCapacityOneperBench = null;
                    //$scope.CentreCapacityTwoperBench = null;
                    $scope.PriorityOrder = null;
                    $scope.SuperitendentName = null
                    $scope.SuperitendentEmail = null;
                    $scope.SuperitendentMobile = null;
                    $scope.AsstSuperitendentName = null
                    $scope.AsstMobile = null;
                    $scope.AsstEmail = null;





                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getExaminationCentres($scope.UserName);
                    //$scope.State = null;
                    //$scope.MandalsData = [];
                    //$scope.ExaminationCentreName = null;
                    //$scope.ExaminationCentreType = null;
                    //$scope.MandalsData = [];
                    //$scope.ExaminationCentreName = null;
                    //$scope.ExaminationCentreType = null;
                    //$scope.HouseNo = null;
                    //$scope.Village = null;
                    //$scope.Landmark = null;
                    //$scope.Locality = null;
                    //$scope.StreetNo = null;
                    //$scope.PinCode = null;
                    //$scope.AllMandalsData = [];
                    //$scope.ExamDistrictsData = [];
                    //$scope.districtarr = [];
                    //$scope.mandalarr = [];
                    //$scope.getDistricts();
                    //$scope.isAllSelecteddistricts = null;
                    //$scope.isAllSelectedmandals = null;
                    //$scope.ExaminationCentreCategory = null;
                    //$scope.UrduMedium = null;
                    //$scope.CentreCapacityOneperBench = null;
                    //$scope.CentreCapacityTwoperBench = null;
                    //$scope.PriorityOrder = null;
                    //$scope.SuperitendentName = null
                    //$scope.SuperitendentEmail = null;
                    //$scope.SuperitendentMobile = null;
                    //$scope.AsstSuperitendentName = null
                    //$scope.AsstMobile = null;
                    //$scope.AsstEmail = null;



                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }


        $scope.getExaminationCentres = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 1;
            var examcentres = AdminService.GetExaminationCentres(DataType, $scope.UserName, $scope.CoordinatingCentreCode);
            examcentres.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.ExamCentresDataNew = response;
                    $scope.Alloted = $scope.ExamCentresDataNew.Alloted
                    $scope.loading = false;
                    $scope.nodata = false;
                    //console.log(response.Table)
                    //$scope.CoordinatorID = response.Table[0];

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.ExamCentresDataNew = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }



        $scope.Values = [{ "Id": 1 }, { "Id": 2 }, { "Id": 3 }]

        $scope.Edit = function (ExaminationCentreID) {
            let DataType=3
            var VerifyDate = AdminService.VerifyExaminationCentresDates(DataType);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    $scope.CENTRENAME = false;
                    $scope.CENTRETYPE = false;
                    $scope.HNO = false;
                    $scope.STREETNO = false;
                    $scope.LOCALITY = false;
                    $scope.LANDMARK = false;
                    $scope.VILLAGE = false;
                    $scope.ADDDISTRICT = false;
                    $scope.ADDMANDAL = false;
                    $scope.PINCODE = false;
                    $scope.CATEGORY = false;
                    $scope.URDU = false;
                    $scope.STDPERBENCH = false;
                    $scope.TOTALCAPACITY = false;
                    $scope.PRIORITY = false;
                    $scope.SUPERNAME = false;
                    $scope.SUPERMOBILE = false;
                    $scope.SUPERMAIL = false;
                    $scope.ASSTSUPERNAME = false;
                    $scope.ASSTSUPERMOBILE = false;
                    $scope.ASSTESUPERMAIL = false;
                    $scope.ACTIVE = false;

                } else if (res[0].ResponseCode == '400' && ($scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'BoardOfficials')) {
                    $scope.CENTRENAME = true;
                    $scope.CENTRETYPE = true;
                    $scope.HNO = true;
                    $scope.STREETNO = true;
                    $scope.LOCALITY = true;
                    $scope.LANDMARK = true;
                    $scope.VILLAGE = true;
                    $scope.ADDDISTRICT = true;
                    $scope.ADDMANDAL = true;
                    $scope.PINCODE = true;
                    $scope.CATEGORY = true;
                    $scope.URDU = true;
                    $scope.STDPERBENCH = true;
                    $scope.TOTALCAPACITY = false;
                    $scope.PRIORITY = true;
                    $scope.SUPERNAME = false;
                    $scope.SUPERMOBILE = false;
                    $scope.SUPERMAIL = false;
                    $scope.ASSTSUPERNAME = false;
                    $scope.ASSTSUPERMOBILE = false;
                    $scope.ASSTESUPERMAIL = false;
                    $scope.ACTIVE = true;


                }
                else {
                    $scope.CENTRENAME = true;
                    $scope.CENTRETYPE = true;
                    $scope.HNO = true;
                    $scope.STREETNO = true;
                    $scope.LOCALITY = true;
                    $scope.LANDMARK = true;
                    $scope.VILLAGE = true;
                    $scope.ADDDISTRICT = true;
                    $scope.ADDMANDAL = true;
                    $scope.PINCODE = true;
                    $scope.CATEGORY = true;
                    $scope.URDU = true;
                    $scope.STDPERBENCH = true;
                    $scope.TOTALCAPACITY = false;
                    $scope.PRIORITY = true;
                    $scope.SUPERNAME = true;
                    $scope.SUPERMOBILE = true;
                    $scope.SUPERMAIL = true;
                    $scope.ASSTSUPERNAME = true;
                    $scope.ASSTSUPERMOBILE = true;
                    $scope.ASSTESUPERMAIL = true;
                    $scope.ACTIVE = true;
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })




            var distcoordinators = AdminService.GetEditExaminationCentreDetails(ExaminationCentreID);
            distcoordinators.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                $scope.ExaminationCentreID = ExaminationCentreID;
                if (response.Table.length > 0) {
                    $scope.EditData = response.Table;
                    //$scope.EditData1 = response.Table1;
                    //$scope.EditData2 = response.Table2;
                    $scope.StudentsperBench = $scope.EditData[0].StudentsperBench;
                    $scope.TotalCapacity = $scope.EditData[0].TotalCapacity
                    $scope.Alloted = $scope.EditData[0].Alloted
                    $scope.editExaminationDistricts($scope.EditData[0].ExaminationCentreID)
                    $scope.editExamCentreMandals($scope.EditData[0].DistrictID, $scope.EditData[0].ExaminationCentreID)

                }
                else {
                    $scope.ExaminationCentresDataNew = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditExaminationCentresPopup.html",
                size: 'xlg',
                backdrop: 'static',
                scope: $scope,
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.View = function (ExaminationCentreID) {
            var distcoordinators = AdminService.GetEditExaminationCentreDetails(ExaminationCentreID);
            distcoordinators.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.ViewData = response.Table;
                    //$scope.ViewData1 = response.Table1;
                    //$scope.ViewData2 = response.Table2;
                    $scope.UrduMedium = $scope.ViewData[0].UrduMedium;
                    if ($scope.UrduMedium == true) {
                        $scope.ViewData[0].UrduMedium = "Yes";
                    } else if ($scope.UrduMedium == false) {
                        $scope.ViewData[0].UrduMedium = "No";
                    }
                    //else if ($scope.UrduMedium == false) {
                    //    $scope.UrduMedium == "No"
                    //}
                }
                else {
                    $scope.ExaminationCentresDataNew = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewExaminationCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.Deletion = function (ExaminationCentreID) {
            let DataType=3
            var VerifyDate = AdminService.VerifyExaminationCentresDates(DataType);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                        if (res[0].ResponseCode == '200') {

                            var distcoordinators = AdminService.GetEditExaminationCentreDetails(ExaminationCentreID);
                            distcoordinators.then(function (response) {
                                if (response.Table.length > 0) {
                                    $scope.DeleteData = response.Table;
                                    //$scope.DeleteData1 = response.Table1;
                                    //$scope.DeleteData2 = response.Table2;

                                    $scope.modalInstance1 = $uibModal.open({
                                        templateUrl: "/app/views/Popups/DeleteExaminationCentresPopup.html",
                                        size: 'xlg',
                                        scope: $scope,
                                        backdrop: 'static',
                                        windowClass: 'modal-fit-att',
                                    });
                                    $scope.closeModal1 = function () {
                                        $scope.modalInstance1.close();
                                    }
                                    if ($scope.UrduMedium == true) {
                                        $scope.DeleteData[0].UrduMedium = "Yes";
                                    } else if ($scope.UrduMedium == false) {
                                        $scope.DeleteData[0].UrduMedium = "No";
                                    }

                                }
                           
                                else {

                                }

                    },
                        function (error) {

                            var err = JSON.parse(error);
                        })
                          }

                        else if (res[0].ResponseCode == '400') {
                            alert('Examination Centres Dates Are Not Found')

                        }
            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });



        }

        $scope.DeleteDetails = function (test) {


            test = { 'DistrictName': $scope.DistrictName, 'MandalName': $scope.MandalName, 'CentreCode': $scope.CentreCode, 'CentreName': $scope.CentreName }
            $scope.modalInstance2 = $uibModal.open(
                {
                    templateUrl: "/app/views/Popups/ConfirmDeleteExaminationCentrePopup.html",
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


        $scope.Delete = function (data) {
            $scope.loading = true;
            $scope.ExaminationCentresDataNew = [];
            var paramObj = {
                "DataType": 2,
                "ExaminationCentreID": data[0].ExaminationCentreID,
                //"DistrictID": DistrictID,
                //"MandalID": MandalID,
                "CentreName": data[0].CentreName,
                "HouseNumber": data[0].HouseNumber,
                "StreetName": data[0].StreetName,
                "Locality": data[0].Locality,
                "Landmark": data[0].Landmark,
                "Village": data[0].Village,
                "AddressDistrictId": data[0].DistrictID,
                "AddressMandalId": data[0].MandalID,
                "Pincode": data[0].Pincode,
                "ExamCentreCategoryId": data[0].ExamCentreCategoryID,
                "UrduMedium": data[0].UrduMedium,
                "CentreCapacityOneperBench": data[0].CapacityOneperBench,
                "CentreCapacityTwoperBench": data[0].CapacityTwoperBench,
                "PriorityOrder": data[0].PriorityOrder,
                "SuperitendentName": data[0].CheifSuperitendentName,
                "SuperitendentMobile": data[0].CheifSuperitendentMobile,
                "SuperitendentEmail": data[0].CheifSuperitendentEmail,
                "AsstSuperitendentName": data[0].AsstCheifSuperitendentName,
                "AsstSuperitendentMobile": data[0].AsstCheifSuperitendentMobile,
                "AsstSuperitendentEmail": data[0].AsstCheifSuperitendentEmail,
                "Active": data[0].Active,
                "UserName": authData.UserName,
            }

            var deleteexamcentres = AdminService.DeleteExaminationCentres(paramObj);
            deleteexamcentres.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.getExaminationCentres(JSON.stringify($scope.districtarr));
                    $scope.modalInstance1.close();
                    $scope.modalInstance2.close();
                    $scope.MandalsData = [];
                    $scope.ExaminationCentreName = null;
                    $scope.ExaminationCentreType = null;
                    $scope.HouseNo = null;
                    $scope.Village = null;
                    $scope.Landmark = null;
                    $scope.Locality = null;
                    $scope.StreetNo = null;
                    $scope.PinCode = null;
                    $scope.AllMandalsData = [];
                    $scope.ExamDistrictsData = [];
                    $scope.districtarr = [];
                    $scope.mandalarr = [];
                    $scope.getDistricts();
                    $scope.isAllSelecteddistricts = null;
                    $scope.isAllSelectedmandals = null;
                    $scope.ExaminationCentreCategory = null;
                    $scope.StudentsperBench = null;
                    $scope.TotalCapacity = null;
                    $scope.PriorityOrder = null;
                    $scope.SuperitendentName = null
                    $scope.SuperitendentEmail = null;
                    $scope.SuperitendentMobile = null;
                    $scope.AsstSuperitendentName = null
                    $scope.AsstMobile = null;
                    $scope.AsstEmail = null;


                } else if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;
                    $scope.getExaminationCentres(JSON.stringify($scope.districtarr));
                    //$scope.MandalsData = [];
                    //$scope.ExaminationCentreName = null;
                    //$scope.ExaminationCentreType = null;
                    //$scope.HouseNo = null;
                    //$scope.Village = null;
                    //$scope.Landmark = null;
                    //$scope.Locality = null;
                    //$scope.StreetNo = null;
                    //$scope.PinCode = null;
                    //$scope.AllMandalsData = [];
                    //$scope.ExamDistrictsData = [];
                    //$scope.districtarr = [];
                    //$scope.mandalarr = [];
                    //$scope.getDistricts();
                    //$scope.isAllSelecteddistricts = null;
                    //$scope.isAllSelectedmandals = null;
                    //$scope.ExaminationCentreCategory = null;
                    //$scope.UrduMedium = null;
                    //$scope.CentreCapacityOneperBench = null;
                    //$scope.CentreCapacityTwoperBench = null;
                    //$scope.PriorityOrder = null;
                    //$scope.SuperitendentName = null
                    //$scope.SuperitendentEmail = null;
                    //$scope.SuperitendentMobile = null;
                    //$scope.AsstSuperitendentName = null
                    //$scope.AsstMobile = null;
                    //$scope.AsstEmail = null;

                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

        $scope.UpdateDetails = function (data) {
            let DataType = 3
            var VerifyDate = AdminService.VerifyExaminationCentresDates(DataType);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    //if ($scope.districtarr == null || $scope.districtarr == undefined || $scope.districtarr == "") {
                    //    alert("Please Select District");
                    //    return;
                    //}

                    //if ($scope.mandalarr == null || $scope.mandalarr == undefined || $scope.mandalarr == "") {
                    //    alert("Please Select Mandal");
                    //    return;
                    //}
                    if (data[0].CentreName == null || data[0].CentreName == undefined || data[0].CentreName == "") {
                        alert("Please Enter Examination Centre Name");
                        return;
                    }
                    if (data[0].ExaminationCentreTypeName == null || data[0].ExaminationCentreTypeName == undefined || data[0].ExaminationCentreTypeName == "") {
                        alert("Please Enter Examination Centre Type");
                        return;
                    }
                    //if (data[0].HouseNumber == null || data[0].HouseNumber == undefined || data[0].HouseNumber == "") {
                    //    alert("Please Enter House Number");
                    //    return;
                    //}
                    //if (data[0].StreetName == null || data[0].StreetName == undefined || data[0].StreetName == "") {
                    //    alert("Please Enter Street Number/ Name");
                    //    return;
                    //}
                    //if (data[0].Locality == null || data[0].Locality == undefined || data[0].Locality == "") {
                    //    alert("Please Enter Locality");
                    //    return;
                    //}

                    if (data[0].Landmark == null || data[0].Landmark == undefined || data[0].Landmark == "") {
                        alert("Please Enter Landmark");
                        return;
                    }

                    if (data[0].Village == null || data[0].Village == undefined || data[0].Village == "") {
                        alert("Please Enter Village");
                        return;
                    }

                    if (data[0].DistrictName == null || data[0].DistrictName == undefined || data[0].DistrictName == "") {
                        alert("Please Select District");
                        return;
                    }
                    if (data[0].MandalName == null || data[0].MandalName == undefined || data[0].MandalName == "") {
                        alert("Please Select Mandal");
                        return;
                    }
                    if (data[0].Pincode == null || data[0].Pincode == undefined || data[0].Pincode == "") {
                        alert("Please Enter PinCode");
                        return;
                    }
                    if (data[0].ExaminationCentreCategoryName == null || data[0].ExaminationCentreCategoryName == undefined || data[0].ExaminationCentreCategoryName == "") {
                        alert("Please Select Examination Centre Category");
                        return;
                    }
                    //if (data[0].UrduMedium == null || data[0].UrduMedium == undefined || data[0].UrduMedium == "") {
                    //    alert("Please Select Urdu Medium");
                    //    return;
                    //}
                    if (data[0].StudentsperBench == null || data[0].StudentsperBench == undefined || data[0].StudentsperBench == "") {
                        alert("Please Select Students per Bench");
                        return;
                    }
                    if (data[0].TotalCapacity == null || data[0].TotalCapacity == undefined || data[0].TotalCapacity == "") {
                        alert("Please Enter Total Capacity");
                        return;
                    }
                    if (data[0].PriorityOrder == null || data[0].PriorityOrder == undefined || data[0].PriorityOrder == "") {
                        alert("Please Enter Priority Order");
                        return;
                    }


                    if (data[0].CheifSuperitendentName == null || data[0].CheifSuperitendentName == undefined || data[0].CheifSuperitendentName == "") {
                        alert("Please Enter Superitendent Name");
                        return;
                    }
                    if (data[0].CheifSuperitendentMobile == null || data[0].CheifSuperitendentMobile == undefined || data[0].CheifSuperitendentMobile == "") {
                        alert("Please Enter Superitendent Mobile");
                        return;
                    }
                    if (data[0].CheifSuperitendentEmail == null || data[0].CheifSuperitendentEmail == undefined || data[0].CheifSuperitendentEmail == "") {
                        alert("Please Enter Superitendent Email");
                        return;
                    }
                    if (data[0].AsstCheifSuperitendentName == null || data[0].AsstCheifSuperitendentName == undefined || data[0].AsstCheifSuperitendentName == "") {
                        alert("Please Enter Assistant Superitendent Name");
                        return;
                    }
                    if (data[0].AsstCheifSuperitendentMobile == null || data[0].AsstCheifSuperitendentMobile == undefined || data[0].AsstCheifSuperitendentMobile == "") {
                        alert("Please Enter Assistant Superitendent Mobile");
                        return;
                    }
                    if (data[0].AsstCheifSuperitendentEmail == null || data[0].AsstCheifSuperitendentEmail == undefined || data[0].AsstCheifSuperitendentEmail == "") {
                        alert("Please Enter Assistant Superitendent Email");
                        return;
                    }


                    let HouseNumber = (data[0].HouseNumber == null || data[0].HouseNumber == undefined || data[0].HouseNumber == '') ? '' : data[0].HouseNumber
                    let StreetName = (data[0].StreetName == null || data[0].StreetName == undefined || data[0].StreetName == '') ? '' : data[0].StreetName;
                    let Locality = (data[0].Locality == null || data[0].Locality == undefined || data[0].Locality == '') ? '' : data[0].Locality;
                    var paramObj = {
                        "DataType": 1,
                        "ExaminationCentreID": data[0].ExaminationCentreID,
                        //"DistrictID": DistrictID,
                        //"MandalID": MandalID,
                        "CentreName": data[0].CentreName,
                        "HouseNumber": HouseNumber,
                        "StreetName": StreetName,
                        "Locality": Locality,
                        "Landmark": data[0].Landmark,
                        "Village": data[0].Village,
                        "AddressDistrictId": data[0].DistrictID,
                        "AddressMandalId": data[0].MandalID,
                        "Pincode": data[0].Pincode,
                        "ExamCentreCategoryId": data[0].ExaminationCentreCategoryID,
                        "UrduMedium": data[0].UrduMedium,
                        "StudentsperBench": data[0].StudentsperBench,
                        "TotalCapacity": data[0].TotalCapacity,
                        "PriorityOrder": data[0].PriorityOrder,
                        "SuperitendentName": data[0].CheifSuperitendentName,
                        "SuperitendentMobile": data[0].CheifSuperitendentMobile,
                        "SuperitendentEmail": data[0].CheifSuperitendentEmail,
                        "AsstSuperitendentName": data[0].AsstCheifSuperitendentName,
                        "AsstSuperitendentMobile": data[0].AsstCheifSuperitendentMobile,
                        "AsstSuperitendentEmail": data[0].AsstCheifSuperitendentEmail,
                        "Active": data[0].Active,
                        "UserName": authData.UserName,
                    }
                    $scope.loading = true;
                    $scope.ExaminationCentresDataNew = [];

                    var updateexamcentres = AdminService.UpdateExaminationCentres(paramObj);
                    updateexamcentres.then(function (response) {
                        try {
                            var res = JSON.parse(response);
                        }
                        catch (err) { }

                        if (res[0].StatusCode == '200') {
                            $scope.loading = false;
                            alert(res[0].StatusDescription);
                            $scope.loading = false;
                            $scope.getExaminationCentres(JSON.stringify($scope.districtarr));
                            $scope.modalInstance.close();
                            $scope.MandalsData = [];
                            $scope.ExaminationCentreName = null;
                            $scope.ExaminationCentreType = null;
                            $scope.HouseNo = null;
                            $scope.Village = null;
                            $scope.Landmark = null;
                            $scope.Locality = null;
                            $scope.StreetNo = null;
                            $scope.PinCode = null;
                            $scope.AllMandalsData = [];
                            $scope.ExamDistrictsData = [];
                            $scope.districtarr = [];
                            $scope.mandalarr = [];
                            $scope.getDistricts();
                            $scope.isAllSelecteddistricts = null;
                            $scope.isAllSelectedmandals = null;
                            //$scope.ExaminationCentreCategory = null;
                            /*$scope.UrduMedium = null;*/
                            $scope.StudentsperBench = null;
                            $scope.TotalCapacity = null;
                            $scope.PriorityOrder = null;
                            $scope.SuperitendentName = null
                            $scope.SuperitendentEmail = null;
                            $scope.SuperitendentMobile = null;
                            $scope.AsstSuperitendentName = null
                            $scope.AsstMobile = null;
                            $scope.AsstEmail = null;


                        } else if (res[0].StatusCode == '400') {
                            $scope.loading = false;
                            alert(res[0].StatusDescription);
                            $scope.loading = false;
                            $scope.getExaminationCentres(JSON.stringify($scope.districtarr));
                            //$scope.MandalsData = [];
                            //$scope.ExaminationCentreName = null;
                            //$scope.ExaminationCentreType = null;
                            //$scope.HouseNo = null;
                            //$scope.Village = null;
                            //$scope.Landmark = null;
                            //$scope.Locality = null;
                            //$scope.StreetNo = null;
                            //$scope.PinCode = null;
                            //$scope.AllMandalsData = [];
                            //$scope.ExamDistrictsData = [];
                            //$scope.districtarr = [];
                            //$scope.mandalarr = [];
                            //$scope.getDistricts();
                            //$scope.isAllSelecteddistricts = null;
                            //$scope.isAllSelectedmandals = null;
                            //$scope.ExaminationCentreCategory = null;
                            //$scope.UrduMedium = null;
                            //$scope.CentreCapacityOneperBench = null;
                            //$scope.CentreCapacityTwoperBench = null;
                            //$scope.PriorityOrder = null;
                            //$scope.SuperitendentName = null
                            //$scope.SuperitendentEmail = null;
                            //$scope.SuperitendentMobile = null;
                            //$scope.AsstSuperitendentName = null
                            //$scope.AsstMobile = null;
                            //$scope.AsstEmail = null;

                        }


                    },

                        function (error) {

                            var err = JSON.parse(error);
                        })
                }

                else if (res[0].ResponseCode == '400') {
                    if ((data[0].TotalCapacity < $scope.TotalCapacity) && ($scope.UserTypeName == 'CoordinatingCentre' || $scope.UserTypeName == 'Secretary' ||
                        $scope.UserTypeName == 'Aspreexams' )) {
                        alert("Please Enter Capacity Greater than Earlier Capacity");
                    }
                    else if ((data[0].TotalCapacity < $scope.Alloted) &&
                        ($scope.UserTypeName == 'Administrator' ||
                        $scope.UserTypeName == 'BoardOfficials' ||
                        $scope.UserTypeName == 'DSPreExams' ||
                        $scope.UserTypeName == 'SystemAnalyst' ))
                    {
                        alert("Please Enter Capacity Greater than Alloted");                        
                    }
                    else {
                        //if (data[0].CentreName == null || data[0].CentreName == undefined || data[0].CentreName == "") {
                        //    alert("Please Enter Examination Centre Name");
                        //    return;
                        //}
                        //if (data[0].ExaminationCentreTypeName == null || data[0].ExaminationCentreTypeName == undefined || data[0].ExaminationCentreTypeName == "") {
                        //    alert("Please Enter Examination Centre Type");
                        //    return;
                        //}
                        //if (data[0].HouseNumber == null || data[0].HouseNumber == undefined || data[0].HouseNumber == "") {
                        //    alert("Please Enter House Number");
                        //    return;
                        //}
                        //if (data[0].StreetName == null || data[0].StreetName == undefined || data[0].StreetName == "") {
                        //    alert("Please Enter Street Number/ Name");
                        //    return;
                        //}
                        //if (data[0].Locality == null || data[0].Locality == undefined || data[0].Locality == "") {
                        //    alert("Please Enter Locality");
                        //    return;
                        //}

                        //if (data[0].Landmark == null || data[0].Landmark == undefined || data[0].Landmark == "") {
                        //    alert("Please Enter Landmark");
                        //    return;
                        //}

                        //if (data[0].Village == null || data[0].Village == undefined || data[0].Village == "") {
                        //    alert("Please Enter Village");
                        //    return;
                        //}

                        //if (data[0].DistrictName == null || data[0].DistrictName == undefined || data[0].DistrictName == "") {
                        //    alert("Please Select District");
                        //    return;
                        //}
                        //if (data[0].MandalName == null || data[0].MandalName == undefined || data[0].MandalName == "") {
                        //    alert("Please Select Mandal");
                        //    return;
                        //}
                        //if (data[0].Pincode == null || data[0].Pincode == undefined || data[0].Pincode == "") {
                        //    alert("Please Enter PinCode");
                        //    return;
                        //}
                        //if (data[0].ExaminationCentreCategoryName == null || data[0].ExaminationCentreCategoryName == undefined || data[0].ExaminationCentreCategoryName == "") {
                        //    alert("Please Select Examination Centre Category");
                        //    return;
                        //}
                        ////if (data[0].UrduMedium == null || data[0].UrduMedium == undefined || data[0].UrduMedium == "") {
                        ////    alert("Please Select Urdu Medium");
                        ////    return;
                        ////}
                        //if (data[0].StudentsperBench == null || data[0].StudentsperBench == undefined || data[0].StudentsperBench == "") {
                        //    alert("Please Select Students per Bench");
                        //    return;
                        //}
                        if (data[0].TotalCapacity == null || data[0].TotalCapacity == undefined || data[0].TotalCapacity == "") {
                            alert("Please Enter Total Capacity");
                            return;
                        }
                        //if (data[0].PriorityOrder == null || data[0].PriorityOrder == undefined || data[0].PriorityOrder == "") {
                        //    alert("Please Enter Priority Order");
                        //    return;
                        //}


                        //if (data[0].CheifSuperitendentName == null || data[0].CheifSuperitendentName == undefined || data[0].CheifSuperitendentName == "") {
                        //    alert("Please Enter Superitendent Name");
                        //    return;
                        //}
                        //if (data[0].CheifSuperitendentMobile == null || data[0].CheifSuperitendentMobile == undefined || data[0].CheifSuperitendentMobile == "") {
                        //    alert("Please Enter Superitendent Mobile");
                        //    return;
                        //}
                        //if (data[0].CheifSuperitendentEmail == null || data[0].CheifSuperitendentEmail == undefined || data[0].CheifSuperitendentEmail == "") {
                        //    alert("Please Enter Superitendent Email");
                        //    return;
                        //}
                        //if (data[0].AsstCheifSuperitendentName == null || data[0].AsstCheifSuperitendentName == undefined || data[0].AsstCheifSuperitendentName == "") {
                        //    alert("Please Enter Assistant Superitendent Name");
                        //    return;
                        //}
                        //if (data[0].AsstCheifSuperitendentMobile == null || data[0].AsstCheifSuperitendentMobile == undefined || data[0].AsstCheifSuperitendentMobile == "") {
                        //    alert("Please Enter Assistant Superitendent Mobile");
                        //    return;
                        //}
                        //if (data[0].AsstCheifSuperitendentEmail == null || data[0].AsstCheifSuperitendentEmail == undefined || data[0].AsstCheifSuperitendentEmail == "") {
                        //    alert("Please Enter Assistant Superitendent Email");
                        //    return;
                        //}


                        let HouseNumber = (data[0].HouseNumber == null || data[0].HouseNumber == undefined || data[0].HouseNumber == '') ? '' : data[0].HouseNumber
                        let StreetName = (data[0].StreetName == null || data[0].StreetName == undefined || data[0].StreetName == '') ? '' : data[0].StreetName;
                        let Locality = (data[0].Locality == null || data[0].Locality == undefined || data[0].Locality == '') ? '' : data[0].Locality;
                        var paramObj = {
                            "DataType": 1,
                            "ExaminationCentreID": data[0].ExaminationCentreID,
                            //"DistrictID": DistrictID,
                            //"MandalID": MandalID,
                            "CentreName": data[0].CentreName,
                            "HouseNumber": HouseNumber,
                            "StreetName": StreetName,
                            "Locality": Locality,
                            "Landmark": data[0].Landmark,
                            "Village": data[0].Village,
                            "AddressDistrictId": data[0].DistrictID,
                            "AddressMandalId": data[0].MandalID,
                            "Pincode": data[0].Pincode,
                            "ExamCentreCategoryId": data[0].ExaminationCentreCategoryID,
                            "UrduMedium": data[0].UrduMedium,
                            "StudentsperBench": data[0].StudentsperBench,
                            "TotalCapacity": data[0].TotalCapacity,
                            "PriorityOrder": data[0].PriorityOrder,
                            "SuperitendentName": data[0].CheifSuperitendentName,
                            "SuperitendentMobile": data[0].CheifSuperitendentMobile,
                            "SuperitendentEmail": data[0].CheifSuperitendentEmail,
                            "AsstSuperitendentName": data[0].AsstCheifSuperitendentName,
                            "AsstSuperitendentMobile": data[0].AsstCheifSuperitendentMobile,
                            "AsstSuperitendentEmail": data[0].AsstCheifSuperitendentEmail,
                            "Active": data[0].Active,
                            "UserName": authData.UserName,
                        }
                        $scope.loading = true;
                        $scope.ExaminationCentresDataNew = [];

                        var updateexamcentres = AdminService.UpdateExaminationCentres(paramObj);
                        updateexamcentres.then(function (response) {
                            try {
                                var res = JSON.parse(response);
                            }
                            catch (err) { }

                            if (res[0].StatusCode == '200') {
                                $scope.loading = false;
                                alert(res[0].StatusDescription);
                                $scope.loading = false;
                                $scope.getExaminationCentres(JSON.stringify($scope.districtarr));
                                $scope.modalInstance.close();
                                $scope.MandalsData = [];
                                $scope.ExaminationCentreName = null;
                                $scope.ExaminationCentreType = null;
                                $scope.HouseNo = null;
                                $scope.Village = null;
                                $scope.Landmark = null;
                                $scope.Locality = null;
                                $scope.StreetNo = null;
                                $scope.PinCode = null;
                                $scope.AllMandalsData = [];
                                $scope.ExamDistrictsData = [];
                                $scope.districtarr = [];
                                $scope.mandalarr = [];
                                $scope.getDistricts();
                                $scope.isAllSelecteddistricts = null;
                                $scope.isAllSelectedmandals = null;
                                //$scope.ExaminationCentreCategory = null;
                                /*$scope.UrduMedium = null;*/
                                $scope.StudentsperBench = null;
                                $scope.TotalCapacity = null;
                                $scope.PriorityOrder = null;
                                $scope.SuperitendentName = null
                                $scope.SuperitendentEmail = null;
                                $scope.SuperitendentMobile = null;
                                $scope.AsstSuperitendentName = null
                                $scope.AsstMobile = null;
                                $scope.AsstEmail = null;


                            } else if (res[0].StatusCode == '400') {
                                $scope.loading = false;
                                alert(res[0].StatusDescription);
                                $scope.loading = false;
                                $scope.getExaminationCentres(JSON.stringify($scope.districtarr));
                                //$scope.MandalsData = [];
                                //$scope.ExaminationCentreName = null;
                                //$scope.ExaminationCentreType = null;
                                //$scope.HouseNo = null;
                                //$scope.Village = null;
                                //$scope.Landmark = null;
                                //$scope.Locality = null;
                                //$scope.StreetNo = null;
                                //$scope.PinCode = null;
                                //$scope.AllMandalsData = [];
                                //$scope.ExamDistrictsData = [];
                                //$scope.districtarr = [];
                                //$scope.mandalarr = [];
                                //$scope.getDistricts();
                                //$scope.isAllSelecteddistricts = null;
                                //$scope.isAllSelectedmandals = null;
                                //$scope.ExaminationCentreCategory = null;
                                //$scope.UrduMedium = null;
                                //$scope.CentreCapacityOneperBench = null;
                                //$scope.CentreCapacityTwoperBench = null;
                                //$scope.PriorityOrder = null;
                                //$scope.SuperitendentName = null
                                //$scope.SuperitendentEmail = null;
                                //$scope.SuperitendentMobile = null;
                                //$scope.AsstSuperitendentName = null
                                //$scope.AsstMobile = null;
                                //$scope.AsstEmail = null;

                            }


                        },

                            function (error) {

                                var err = JSON.parse(error);
                            })
                    }
                }
            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

         
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
