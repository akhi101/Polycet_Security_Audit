define(['app'], function (app) {
    app.controller("AttendanceSheetController", function ($scope, $uibModal, $localStorage, $state, AppSettings, SystemUserService, AdminService, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserTypeName = authData.UserTypeName;
        $scope.UserName = authData.UserName;
        var tmp1 = $localStorage.TempData1;
        var tmp2 = $localStorage.TempData2;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getAttendanceList();
            $scope.getAttendanceStatus()
        }

        $scope.GoBack = function () {
            if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
                $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
                $state.go('Dashboard.DCWiseExamCentresAttendance')
            }
            else if ($scope.UserTypeName == 'CoordinatingCentre') {
                $state.go('Dashboard.DCWiseExamCentresAttendance')
            }
            else if ($scope.UserTypeName == 'ExaminationCentre') {
                $state.go('Dashboard.ExamCentreAttendance')
            }
        }

        if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
            $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
            $scope.ExaminationCentreID = tmp1.ExaminationCentreID
        }
        else if ($scope.UserTypeName == 'CoordinatingCentre' ) {
            $scope.ExaminationCentreID = tmp1.ExaminationCentreID
        }
        else if ($scope.UserTypeName == 'ExaminationCentre') {
            $scope.ExaminationCentreID = tmp2.ExaminationCentreID
        }

        //$scope.Attendance = 'true';
        //alert($localStorage.ExamCenterCode)

        $scope.OpenPopup = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/AbsentListPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
            $scope.AbsentList = []
            for (var i = 0, l = $scope.AttendanceData.length; i < l; i++) {
                if ($scope.AttendanceData[i].Attendance == 2 || $scope.AttendanceData[i].Attendance == 3 || 
                    $scope.AttendanceData[i].Attendance == 4) {
                    var obj = {
                        AttendanceID: $scope.AttendanceData[i]['AttendanceID'],
                        HallticketNumber: $scope.AttendanceData[i]['HallticketNumber'],
                        Attendance: $scope.AttendanceData[i]['Attendance'],
                        OMRNumber: $scope.AttendanceData[i]['OMRNumber']
                    }
                    if (obj.HallticketNumber == $scope.AttendanceLists[i]['AttendanceID']) {
                        obj.Attendance = $scope.AttendanceLists[i]['HallticketNumber'];
                        obj.AttendanceID = $scope.AttendanceLists[i]['Attendance'];
                        obj.OMRNumber = $scope.AttendanceLists[i]['Attendance'];
                        obj.AttendanceID = $scope.AttendanceLists[i]['OMRNumber'];
                        obj.OMRNumber = $scope.AttendanceLists[i]['HallticketNumber'];
                        arrayForUse.push($scope.AttendanceLists[i]['Attendance']);
                    } else {
                        $scope.AbsentList.push(obj)
                    }

                }

            }

        }


        $scope.closeModal = function () {
            //$scope.noteChallan = false;
            $scope.modalInstance.close();
        }
        $scope.ViewReport = function () {
            var viewreport = PreExaminationService.MarkAttendanceReport($scope.ExaminationCentreID);
            viewreport.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res[0].StatusCode == '200') {
                    $scope.OpenReport();
                } else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription)

                }
            },
                function (error) {
                    alert("error while Verifying Dates")
                    //var err = JSON.parse(error);

                });
        }
        $scope.OpenReport = function () {
            $scope.btnLoading = true;
            var getExamCentersTypes = PreExaminationService.OpenAttendanceReport($scope.ExaminationCentreID);
            getExamCentersTypes.then(function (res) {
                $scope.btnLoading = false;
                window.open(res[0].PdfUrl, '_blank');

            },
                function (error) {
                    $scope.btnLoading = false;
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.nodata = true;
                    alert("error while loading data");
                    var err = JSON.parse(error);
                });
        }



        $scope.SaveData = function () {
            //for (let i = 1; i <= $scope.AttendanceLists.length; i++) {
            //    if (($scope.AttendanceLists[i].OMRNumber == "" && $scope.AttendanceLists[i].Attendance == '1') || ($scope.AttendanceLists[i].OMRNumber == "" && $scope.AttendanceLists[i].Attendance == '2') || ($scope.AttendanceLists[i].OMRNumber == "" &&  $scope.AttendanceLists[i].Attendance == '4')) {
            //        alert("Please Enter OMR Number for " + $scope.AttendanceLists[i].HallticketNumber)
            //        return;
            //    }
            //}
            $scope.btnLoading1 = true;
            var getExamCentersTypes = PreExaminationService.SetAttendanceList($scope.AttendanceLists, $scope.ExaminationCentreID, authData.UserName);
            getExamCentersTypes.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response[0].StatusCode  == '200') {
                    $scope.btnLoading1 = false;
                    $scope.nodata = false;
                    $scope.Data = true;
                    alert(response[0].StatusDescription)
                    $scope.getAttendanceList();
                    $scope.modalInstance.close();
                }
                else if (response[0].StatusCode  == '400') {
                    $scope.btnLoading1 = false;
                    $scope.nodata = false;
                    $scope.Data = true;
                    alert(response[0].StatusDescription);
                    $scope.getAttendanceList();
                    $scope.modalInstance.close();
                    //$scope.AttendanceList = []
                    //$scope.AttendanceList = res.Table;

                    //$scope.AttendanceList.forEach(object => {

                    //    object.data = 1;
                    //});
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.nodata = true;
                    alert("error while loading data");
                    var err = JSON.parse(error);
                });
        }

        $scope.SubmitData = function () {
            //for (let i = 1; i <= $scope.AttendanceLists.length; i++) {
            //    if (($scope.AttendanceLists[i].OMRNumber == "" && $scope.AttendanceLists[i].Attendance == '1') || ($scope.AttendanceLists[i].OMRNumber == "" && $scope.AttendanceLists[i].Attendance == '2') || ($scope.AttendanceLists[i].OMRNumber == "" && $scope.AttendanceLists[i].Attendance == '4')) {
            //        alert("Please Enter OMR Number for " + $scope.AttendanceLists[i].HallticketNumber)
            //        return;
            //    }
            //}
            $scope.btnLoading2 = true;
            var getExamCentersTypes = PreExaminationService.SetSubmitAttendanceList($scope.AttendanceLists, $scope.ExaminationCentreID, authData.UserName);
            getExamCentersTypes.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response[0].StatusCode == '200') {
                    $scope.btnLoading2 = false;
                    $scope.nodata = false;
                    $scope.Data = true;
                    alert(response[0].StatusDescription)
                    $scope.getAttendanceList();
                    $scope.modalInstance.close();
                }
                else if (response[0].StatusCode == '400') {
                    $scope.btnLoading2 = false;
                    $scope.nodata = false;
                    $scope.Data = true;
                    alert(response[0].StatusDescription);
                    $scope.getAttendanceList();
                    $scope.modalInstance.close();
                    //$scope.AttendanceList = []
                    //$scope.AttendanceList = res.Table;

                    //$scope.AttendanceList.forEach(object => {

                    //    object.data = 1;
                    //});
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.nodata = true;
                    alert("error while loading data");
                    var err = JSON.parse(error);
                });
        }

        $scope.getAttendanceList = function () {
            $scope.loading = true;
            $scope.nodata = false;
            $scope.Data = false;
            var getExamCentersTypes = PreExaminationService.GetAttendanceList($scope.ExaminationCentreID, authData.UserName);
            getExamCentersTypes.then(function (res) {
                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.Data = true;
                    $scope.AttendanceLists = res.Table;
                    $scope.AttendanceStatus = res.Table[0].AttendanceStatusName;
                    var arrayForUse = [];
                    for (var i = 0, l = $scope.AttendanceLists.length; i < l; i++) {
                        var obj = {
                            AttendanceID: $scope.AttendanceLists[i]['AttendanceID'],
                            HallticketNumber: $scope.AttendanceLists[i]['HallticketNumber'],
                            Attendance: $scope.AttendanceLists[i]['Attendance'],
                            OMRNumber: $scope.AttendanceLists[i]['OMRNumber']
                        }
                        arrayForUse.push(obj);
                    }
                    $scope.AttendanceData = arrayForUse
                }
                else if (res.Table.length <= 0) {
                    $scope.nodata = true;
                    $scope.loading = false;
                }
                    else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.Data = false;
                }


                //$scope.AttendanceList = []


            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.nodata = true;
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });
        }

        $scope.getAttendanceStatus = function () {
            var getAttendance = PreExaminationService.GetAttendanceStatus();
            getAttendance.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.AttendenceData1 = res.Table;
                //$scope.AttendanceValues = [{ "Name": "Present", "Value": "1" }, { "Name": "Absent", "Value": "0" }, { "Name": "Malpractice", "Value": "2" }]
            },
                function (error) {
                    alert("error while loading Caste Category");
                    //var err = JSON.parse(error);

                });
        }

        $scope.RadioChange = function (data, ind) {
            var Marks = []
            Marks.push($scope.AttendanceData);
            console.log(markslist)
            var markslist = Marks[0]
            if (markslist.length > 0) {
                markslist.map((obj) => {
                    if (obj.HallticketNumber == data.HallticketNumber) {
                        obj.Attendance = data.Attendance;
                        obj.AttendanceID = data.AttendanceID;
                        obj.OMRNumber = data.OMRNumber;
                        tempId.push(data.HallticketNumber);
                    }
                    if (obj.HallticketNumber != data.HallticketNumber && !tempId.includes(data.HallticketNumber)) {
                        var marksdata = $scope.addData(data.HallticketNumber, data.Attendance, data.AttendanceID, data.OMRNumber);
                        tempId.push(data.HallticketNumber);
                        markslist.push(marksdata);

                    }
                });

            } else if (markslist.length == 0) {
                var marksdata = $scope.addData(data.HallticketNumber, data.Attendance, data.AttendanceID, data.OMRNumber);
                markslist.push(marksdata);

            }
            console.log(markslist)
            $scope.AttendanceData = markslist
        }


        var tempId = [];


        $scope.addData = function (HallticketNumber, Attendance, AttendanceID, OMRNumber) {
            return {
                HallticketNumber: HallticketNumber,
                Attendance: Attendance,
                AttendanceID: AttendanceID,
                OMRNumber: OMRNumber
            };
        }

        $scope.OpenPopup1 = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/AbsentListSubmitPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
            $scope.AbsentList = []
            for (var i = 0, l = $scope.AttendanceData.length; i < l; i++) {
                if ($scope.AttendanceData[i].Attendance == 2 || $scope.AttendanceData[i].Attendance == 3 ||
                    $scope.AttendanceData[i].Attendance == 4) {
                    var obj = {
                        AttendanceID: $scope.AttendanceData[i]['AttendanceID'],
                        HallticketNumber: $scope.AttendanceData[i]['HallticketNumber'],
                        Attendance: $scope.AttendanceData[i]['Attendance'],
                        OMRNumber: $scope.AttendanceData[i]['OMRNumber']
                    }
                    if (obj.HallticketNumber == $scope.AttendanceLists[i]['AttendanceID']) {
                        obj.Attendance = $scope.AttendanceLists[i]['HallticketNumber'];
                        obj.AttendanceID = $scope.AttendanceLists[i]['Attendance'];
                        obj.OMRNumber = $scope.AttendanceLists[i]['Attendance'];
                        obj.AttendanceID = $scope.AttendanceLists[i]['OMRNumber'];
                        obj.OMRNumber = $scope.AttendanceLists[i]['HallticketNumber'];
                        arrayForUse.push($scope.AttendanceLists[i]['Attendance']);
                    } else {
                        $scope.AbsentList.push(obj)
                    }

                }

            }

        }


        $scope.closeModal = function () {
            //$scope.noteChallan = false;
            $scope.modalInstance.close();
        }

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