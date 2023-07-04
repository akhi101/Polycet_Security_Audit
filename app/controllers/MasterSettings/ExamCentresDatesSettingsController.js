define(['app'], function (app) {
    app.controller("ExamCentresDatesSettingsController", function ($scope, $state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var getcurrpolycetyear = AdminService.GetCurrentPolycetYear();
        getcurrpolycetyear.then(function (response) {
            $scope.PolycetYearID = response.PolycetYearID;
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.CurrentPolycetYearData = res.Table;

        },
            function (error) {
                alert("error while loading States");
                //var err = JSON.parse(error);

            });




        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }

        $scope.GetRegistrationDates = function (PolycetYearID) {
            var DataType = 1;
            var ExamCentresRegistrationDatesID = 0;//default value (optional)
            var getregdates = AdminService.GetExamCentresRegistrationDates(DataType, PolycetYearID, ExamCentresRegistrationDatesID);
            getregdates.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.RegistrationDatesData = res.Table;
                }
                else {
                    $scope.RegistrationDatesData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }



        $scope.Submit = function () {

            if ($scope.PolycetYearID == null || $scope.PolycetYearID == undefined || $scope.PolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.RegStartDate == null || $scope.RegStartDate == undefined || $scope.RegStartDate == "") {
                alert('Please select Registration StartDate');
                return;
            }
            if ($scope.RegEndDate == null || $scope.RegEndDate == undefined || $scope.RegEndDate == "") {
                alert('Please select Registration EndDate');
                return;
            }
           
            //$scope.loading = true;
            var DataType = 1;
            var ExamCentresRegistrationDatesID = 0;//Optional
            var Active = true;//Optional
            var regstartDate = moment($scope.RegStartDate).format("YYYY-MM-DD");
            var regendDate = moment($scope.RegEndDate).format("YYYY-MM-DD");
           

            var adddates = AdminService.AddExamCentresRegistrationDates(DataType, $scope.PolycetYearID, ExamCentresRegistrationDatesID,
                regstartDate, regendDate,  Active, authData.UserName);
            adddates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetRegistrationDates(PolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetRegistrationDates($scope.PolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.View = function (ExamCentresRegistrationDatesID) {
            var DataType = 2;
            var PolycetYearID = 0;//default value(optional)
            var getviewcentres = AdminService.ViewExamCentresRegistrationDates(DataType, PolycetYearID, ExamCentresRegistrationDatesID);
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
                templateUrl: "/app/views/Popups/ViewExamCentresRegDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.Edit = function (ExamCentresRegistrationDatesID) {
            var DataType = 2;
            var PolycetYearID = 0;//default value(optional)
            var geteditdates = AdminService.EditExamCentresRegistrationDates(DataType, PolycetYearID, ExamCentresRegistrationDatesID);
            geteditdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    $scope.ExamCentresRegistrationDatesID = res.Table[0].ExamCentresRegistrationDatesID;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Registration Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditExamCentresRegistrationPopup.html",
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

        $scope.UpdateDetails = function (data) {

            var REGstartDate = moment(data.RegistrationStartDate).format("YYYY-MM-DD");
            var REGendDate = moment(data.RegistrationEndDate).format("YYYY-MM-DD");
            var DataType = 2;
            var PolycetYearID = 0;//Optional
            var updatedates = AdminService.UpdateExamCentresRegistrationDates(DataType, PolycetYearID, $scope.ExamCentresRegistrationDatesID, REGstartDate, REGendDate,data.Active, authData.UserName);
            updatedates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetRegistrationDates(PolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetRegistrationDates(PolycetYearID);


                }

                //else {
                //    alert("Otp Verification Failed")


                //}
            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }

        $scope.Logout = function () {
            sessionStorage.loggedIn = "no";
            //var GetUserLogout = SystemUserService.PostUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('index.OfficialsLogin');
        }
    })
})

