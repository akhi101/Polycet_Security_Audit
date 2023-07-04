define(['app'], function (app) {
    app.controller("DCExamCentresAllocationController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if ((authData == undefined) || (authData != undefined && authData.UserTypeName != 'Administrator' && authData.UserTypeName != 'CoordinatingCentre')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = authData.UserName;
            $scope.UserTypeID = authData.UserTypeID;
            $scope.SessionID = $localStorage.SessionID;
            $scope.Session = $localStorage.authorizationData.Session
            $scope.UserID = authData.UserID;
            var tmp = $localStorage.TempData;
            $scope.UserTypeName = authData.UserTypeName;

            if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' ||
                $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'DSPreExams'
                || $scope.UserTypeName == 'Aspreexams') {
                $scope.CoordinatingCentreCode = tmp.CentreCode;
                $scope.adminbackbutton = true;
            }
            else if ($scope.UserTypeName == 'CoordinatingCentre') {
                $scope.CoordinatingCentreCode = authData.UserName;
                $scope.dcbackbutton = true;
            }

            const $ctrl = this;
            $ctrl.$onInit = () => {
                $scope.ActiveButton = true;
                $scope.getDCExaminationCentresReport();
            }
        }

 


        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        $scope.GoBack1 = function () {
            $state.go('Dashboard.ExamCentresAllocation')
        }
        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });

        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            var DataType = 9;
            var exceldownload = AdminService.GetDCExamCentresAllotedExcel(DataType, $scope.UserName, $scope.CoordinatingCentreCode, $scope.Session,'');
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

        $scope.getDCExaminationCentresReport = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 6;
            var dcexaminationCentresReportDataNew = AdminService.GetDCExaminationCentresReport(DataType, $scope.UserName, $scope.CoordinatingCentreCode,$scope.Session,'');
            dcexaminationCentresReportDataNew.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.DCExaminationCentresReportDataNew = response;
                    $scope.loading = false;
                    $scope.nodata = false;
                    //console.log(response.Table)
                    $scope.CoordinatorID = response[0];

                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.DCExaminationCentresReportDataNew = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.Edit = function (ExaminationCentreID) {
            var distcoordinators = AdminService.EditDCExamCentreAllocation(ExaminationCentreID, $scope.UserName, $scope.Session, '');
            distcoordinators.then(function (response) {
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
                templateUrl: "/app/views/Popups/EditDCExamCentreAllocationPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                //windowClass: 'modal-fit-att',
            });

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }

        $scope.UpdateDetails = function (data) {
            if (data[0].Alloted == 0) {


                var paramObj = {
                    "ExaminationCentreID": data[0].ExaminationCentreID,
                    "OpenForAllotment": data[0].OpenForAllotment,
                    "UserName": authData.UserName,
                }
                $scope.loading = true;
                var updatedetails = AdminService.UpdateDCExamCentreAllocation(paramObj);
                updatedetails.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    }
                    catch (err) { }

                    if (res[0].StatusCode == '200') {
                        $scope.loading = false;
                        alert(res[0].StatusDescription);
                        $scope.getDCExaminationCentresReport();
                        $scope.modalInstance.close();



                    } else if (res[0].StatusCode == '400') {
                        $scope.loading = false;
                        alert(res[0].StatusDescription);
                        $scope.getDCExaminationCentresReport();

                    }
                },

                    function (error) {

                        var err = JSON.parse(error);
                    })
            }
            else {
                alert('The status of examination centre allocation cannot be changed.')
            }
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

            var GetUserLogout = SystemUserService.PostUserLogout(1, $scope.UserName, $scope.SessionID, $scope.Session);
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