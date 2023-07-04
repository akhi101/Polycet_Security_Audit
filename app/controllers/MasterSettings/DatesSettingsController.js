define(['app'], function (app) {
    app.controller("DatesSettingsController", function ($scope, $state, $uibModal ,$localStorage, AdminService, SystemUserService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.gethours();
            $scope.getminutes();
            $scope.Day = false;
        }

        var getcurrpolycetyear = AdminService.GetCurrentPolycetYear();
        getcurrpolycetyear.then(function (response) {
            $scope.RegPolycetYearID = response.PolycetYearID;
            $scope.ExamPolycetYearID = response.PolycetYearID;
            $scope.OMRPolycetYearID = response.PolycetYearID;
            $scope.ResultsPolycetYearID = response.PolycetYearID;
            $scope.NRPolycetYearID = response.PolycetYearID;
            $scope.ExaminationPolycetYearID = response.PolycetYearID;
            $scope.HtPolycetYearID = response.PolycetYearID;
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
            $state.go('Dashboard')
        }

        $scope.getRegistrationDates = function (RegPolycetYearID) {
            var DataType = 1;
            var RegistrationDatesID = 0;//default value (optional)
            var getregdates = AdminService.GetRegistrationDates(DataType, RegPolycetYearID, RegistrationDatesID);
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



        $scope.addRegistrationDates = function () {

            if ($scope.RegPolycetYearID == null || $scope.RegPolycetYearID == undefined || $scope.RegPolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert('Please select  Start Date');
                return;
            }
            if ($scope.EndDatewithoutLateFee == null || $scope.EndDatewithoutLateFee == undefined || $scope.EndDatewithoutLateFee == "") {
                alert('Please select EndDate without LateFee');
                return;
            }
            if ($scope.EndDatewithLateFee == null || $scope.EndDatewithLateFee == undefined || $scope.EndDatewithLateFee == "") {
                alert('Please select EndDate with LateFee');
                return;
            }

            //$scope.loading = true;
            var DataType = 1;
            var RegistrationDatesID = 0;//Optional
            var Active = true;//Optional
            var startDate = moment($scope.StartDate).format("YYYY-MM-DD");
            var endDatewithoutLateFee = moment($scope.EndDatewithoutLateFee).format("YYYY-MM-DD");
            var endDatewithLateFee = moment($scope.endDatewithLateFee).format("YYYY-MM-DD");

            var adddates = AdminService.AddRegistrationDates(DataType, $scope.RegPolycetYearID, RegistrationDatesID,
                startDate, endDatewithoutLateFee, endDatewithLateFee, Active, authData.UserName);
            adddates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getRegistrationDates($scope.RegPolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getRegistrationDates($scope.RegPolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.ViewRegDates = function (RegistrationDatesID) {
            var DataType = 2;
            var RegPolycetYearID = 0;//default value(optional)
            var getviewcentres = AdminService.ViewRegistrationDates(DataType, RegPolycetYearID, RegistrationDatesID);
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
                templateUrl: "/app/views/Popups/ViewRegDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.EditRegDates = function (RegistrationDatesID) {
            var DataType = 2;
            var RegPolycetYearID = 0;//default value(optional)
            var geteditdates = AdminService.EditRegistrationDates(DataType, RegPolycetYearID, RegistrationDatesID);
            geteditdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    $scope.RegistrationDatesID = res.Table[0].RegistrationDatesID;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Registration Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditRegDatesPopup.html",
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

        $scope.UpdateRegDates = function (data) {

            var startDate = moment(data.StartDate).format("YYYY-MM-DD");
            var endDatewithoutLateFee = moment(data.EndDateWithoutLateFee).format("YYYY-MM-DD");
            var endDatewithLateFee = moment(data.EndDateWithLateFee).format("YYYY-MM-DD");
            var DataType = 2;
            var PolycetYearID = 0;//Optional
            var updatedates = AdminService.UpdateRegistrationDates(DataType, PolycetYearID, $scope.RegistrationDatesID, startDate, endDatewithoutLateFee, endDatewithLateFee, data.Active, authData.UserName);
            updatedates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getRegistrationDates($scope.RegPolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getRegistrationDates($scope.RegPolycetYearID);


                }

                //else {
                //    alert("Otp Verification Failed")


                //}
            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }

        $scope.getExamCentresDates = function (ExamPolycetYearID) {
            var DataType = 1;
            var ExamCentresRegistrationDatesID = 0;//default value (optional)
            var getregdates = AdminService.GetExamCentresDates(DataType, ExamPolycetYearID, ExamCentresRegistrationDatesID);
            getregdates.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.ExamCentresDatesData = res.Table;
                }
                else {
                    $scope.ExamCentresDatesData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.addExamCentresDates = function () {

            if ($scope.ExamPolycetYearID == null || $scope.ExamPolycetYearID == undefined || $scope.ExamPolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.ExamCentresStartDate == null || $scope.ExamCentresStartDate == undefined || $scope.ExamCentresStartDate == "") {
                alert('Please select Exam Centres StartDate');
                return;
            }
            if ($scope.ExamCentresEndDate == null || $scope.ExamCentresEndDate == undefined || $scope.ExamCentresEndDate == "") {
                alert('Please select Exam Centres EndDate');
                return;
            }

            //$scope.loading = true;
            var DataType = 1;
            var ExamCentresRegistrationDatesID = 0;//Optional
            var Active = true;//Optional
            var ExamCentresStartDate = moment($scope.ExamCentresStartDate).format("YYYY-MM-DD");
            var ExamCentresEndDate = moment($scope.ExamCentresEndDate).format("YYYY-MM-DD");


            var addexamcentredates = AdminService.AddExamCentresDates(DataType, $scope.ExamPolycetYearID, ExamCentresRegistrationDatesID,
                ExamCentresStartDate, ExamCentresEndDate, Active, authData.UserName);
            addexamcentredates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getExamCentresDates($scope.ExamPolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getExamCentresDates($scope.ExamPolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.ViewExamCentDates = function (ExamCentresRegistrationDatesID) {
            var DataType = 2;
            var ExamPolycetYearID = 0;//default value(optional)
            var getviewcentres = AdminService.ViewExamCentresDates(DataType, ExamPolycetYearID, ExamCentresRegistrationDatesID);
            getviewcentres.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Examination Centres Dates')
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


        $scope.EditExamCentDates = function (ExamCentresRegistrationDatesID) {
            var DataType = 2;
            var ExamPolycetYearID = 0;//default value(optional)
            var geteditdates = AdminService.EditExamCentresDates(DataType, ExamPolycetYearID, ExamCentresRegistrationDatesID);
            geteditdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    $scope.ExamCentresDatesID = res.Table[0].ExamCentresRegistrationDatesID;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Examination Centres Dates')
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

        $scope.UpdateExamCentreDetails = function (data) {

            var startDate = moment(data.StartDate).format("YYYY-MM-DD");
            var endDate = moment(data.EndDate).format("YYYY-MM-DD");
            var DataType = 2;
            var ExamPolycetYearID = 0;//Optional
            var updatedates = AdminService.UpdateExamCentresRegistrationDates(DataType, ExamPolycetYearID, $scope.ExamCentresDatesID, startDate, endDate, data.Active, authData.UserName);
            updatedates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getExamCentresDates($scope.ExamPolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getExamCentresDates($scope.ExamPolycetYearID);


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }



        $scope.getViewOMRDates = function (OMRPolycetYearID) {
            var DataType = 1;
            var ViewOMRDatesID = 0;//default value (optional)
            var getregdates = AdminService.GetViewOMRDates(DataType, OMRPolycetYearID, ViewOMRDatesID);
            getregdates.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.ViewOMRDatesData = res.Table;
                }
                else {
                    $scope.ViewOMRDatesData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.addViewOMRDates = function () {

            if ($scope.OMRPolycetYearID == null || $scope.OMRPolycetYearID == undefined || $scope.OMRPolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.OMRStartDate == null || $scope.OMRStartDate == undefined || $scope.OMRStartDate == "") {
                alert('Please select View OMR StartDate');
                return;
            }
            if ($scope.OMREndDate == null || $scope.OMREndDate == undefined || $scope.OMREndDate == "") {
                alert('Please select View OMR EndDate');
                return;
            }

            //$scope.loading = true;
            var DataType = 1;
            var ViewOMRDatesID = 0;//Optional
            var Active = true;//Optional
            var OMRStartDate = moment($scope.OMRStartDate).format("YYYY-MM-DD");
            var OMREndDate = moment($scope.OMREndDate).format("YYYY-MM-DD");


            var addviewomrdates = AdminService.AddViewOMRDates(DataType, $scope.OMRPolycetYearID, ViewOMRDatesID,
                OMRStartDate, OMREndDate, Active, authData.UserName);
            addviewomrdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getViewOMRDates($scope.OMRPolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getViewOMRDates($scope.OMRPolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.ViewOMRDates = function (ViewOMRDatesID) {
            var DataType = 2;
            var OMRPolycetYearID = 0;//default value(optional)
            var getviewcentres = AdminService.ViewOMRDate(DataType, OMRPolycetYearID, ViewOMRDatesID);
            getviewcentres.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load View OMR Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewOMRDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.EditOMRDates = function (ViewOMRDatesID) {
            var DataType = 2;
            var OMRPolycetYearID = 0;//default value(optional)
            var geteditomrdates = AdminService.EditOMRDates(DataType, OMRPolycetYearID, ViewOMRDatesID);
            geteditomrdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    $scope.ViewOMRDatesID = res.Table[0].ViewOMRDatesID;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load View OMR Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditOMRDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.UpdateOMRDatesDetails = function (data) {

            var startDate = moment(data.StartDate).format("YYYY-MM-DD");
            var endDate = moment(data.EndDate).format("YYYY-MM-DD");
            var DataType = 2;
            var OMRPolycetYearID = 0;//Optional
            var updatedates = AdminService.UpdateViewOMRDates(DataType, OMRPolycetYearID, $scope.ViewOMRDatesID, startDate, endDate, data.Active, authData.UserName);
            updatedates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getViewOMRDates($scope.OMRPolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getViewOMRDates($scope.OMRPolycetYearID);


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }


        $scope.getResultsDates = function (ResultsPolycetYearID) {
            var DataType = 1;
            var ResultsDatesID = 0;//default value (optional)
            var getresultsdates = AdminService.GetResultsDates(DataType, ResultsPolycetYearID, ResultsDatesID);
            getresultsdates.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.ResultsDatesData = res.Table;
                }
                else {
                    $scope.ResultsDatesData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.addResultsDates = function () {

            if ($scope.ResultsPolycetYearID == null || $scope.ResultsPolycetYearID == undefined || $scope.ResultsPolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.ResultsStartDate == null || $scope.ResultsStartDate == undefined || $scope.ResultsStartDate == "") {
                alert('Please select Results StartDate');
                return;
            }
            if ($scope.ResultsEndDate == null || $scope.ResultsEndDate == undefined || $scope.ResultsEndDate == "") {
                alert('Please select Results EndDate');
                return;
            }

            //$scope.loading = true;
            var DataType = 1;
            var ResultsDatesID = 0;//Optional
            var Active = true;//Optional
            var ResultsStartDate = moment($scope.ResultsStartDate).format("YYYY-MM-DD");
            var ResultsEndDate = moment($scope.ResultsEndDate).format("YYYY-MM-DD");


            var addresultsdates = AdminService.AddResultsDates(DataType, $scope.ResultsPolycetYearID, ResultsDatesID,
                ResultsStartDate, ResultsEndDate, Active, authData.UserName);
            addresultsdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getResultsDates($scope.ResultsPolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getResultsDates($scope.ResultsPolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.ViewResultsDates = function (ResultsDatesID) {
            var DataType = 2;
            var ResultsPolycetYearID = 0;//default value(optional)
            var viewresultsdates = AdminService.ViewResultsDates(DataType, ResultsPolycetYearID, ResultsDatesID);
            viewresultsdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Results Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewResultsDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.EditResultsDates = function (ResultsDatesID) {
            var DataType = 2;
            var ResultsPolycetYearID = 0;//default value(optional)
            var geteditomrdates = AdminService.EditResultsDates(DataType, ResultsPolycetYearID, ResultsDatesID);
            geteditomrdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    $scope.ResultsDatesID = res.Table[0].ResultsDatesID;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Results Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditResultsDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.UpdateResultDatesDetails = function (data) {

            var startDate = moment(data.StartDate).format("YYYY-MM-DD");
            var endDate = moment(data.EndDate).format("YYYY-MM-DD");
            var DataType = 2;
            var ResultsPolycetYearID = 0;//Optional
            var updateresultdates = AdminService.UpdateResultsDates(DataType, ResultsPolycetYearID, $scope.ResultsDatesID, startDate, endDate, data.Active, authData.UserName);
            updateresultdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getResultsDates($scope.ResultsPolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getResultsDates($scope.ResultsPolycetYearID);


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

        $scope.getNRDownloadDates = function (NRPolycetYearID) {
            var DataType = 1;
            var NRDatesID = 0;//default value (optional)
            var getnrdates = AdminService.GetNRDownloadDates(DataType, NRPolycetYearID, NRDatesID);
            getnrdates.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.NRDownloadDatesData = res.Table;
                }
                else {
                    $scope.NRDownloadDatesData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.addNRDownloadDates = function () {

            if ($scope.NRPolycetYearID == null || $scope.NRPolycetYearID == undefined || $scope.NRPolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.NRStartDate == null || $scope.NRStartDate == undefined || $scope.NRStartDate == "") {
                alert('Please select NR Download StartDate');
                return;
            }
            if ($scope.NREndDate == null || $scope.NREndDate == undefined || $scope.NREndDate == "") {
                alert('Please select NR Download EndDate');
                return;
            }

            //$scope.loading = true;
            var DataType = 1;
            var NRDatesID = 0;//Optional
            var Active = true;//Optional
            var NRStartDate = moment($scope.NRStartDate).format("YYYY-MM-DD");
            var NREndDate = moment($scope.NREndDate).format("YYYY-MM-DD");


            var addnrdates = AdminService.AddNRDownloadDates(DataType, $scope.NRPolycetYearID, NRDatesID,
                NRStartDate, NREndDate, Active, authData.UserName);
            addnrdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getNRDownloadDates($scope.NRPolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getNRDownloadDates($scope.NRPolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.ViewNRDates = function (NRDatesID) {
            var DataType = 2;
            var NRPolycetYearID = 0;//default value(optional)
            var viewnrdates = AdminService.ViewNRDates(DataType, NRPolycetYearID, NRDatesID);
            viewnrdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Results Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewNRDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.EditNRDates = function (NRDatesID) {
            var DataType = 2;
            var NRPolycetYearID = 0;//default value(optional)
            var geteditnrdates = AdminService.EditNRDates(DataType, NRPolycetYearID, NRDatesID);
            geteditnrdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    $scope.NRDatesID = res.Table[0].NRDatesID;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load NR Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditNRDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.UpdateNRDatesDetails = function (data) {

            var startDate = moment(data.StartDate).format("YYYY-MM-DD");
            var endDate = moment(data.EndDate).format("YYYY-MM-DD");
            var DataType = 2;
            var NRPolycetYearID = 0;//Optional
            var updatenrdates = AdminService.UpdateNRDownloadDates(DataType, NRPolycetYearID, $scope.NRDatesID, startDate, endDate, data.Active, authData.UserName);
            updatenrdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getNRDownloadDates($scope.NRPolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getNRDownloadDates($scope.NRPolycetYearID);


                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.SetStartDate = function () {

            document.getElementById("datetimepicker1").setAttribute("min", today);

        };

        $scope.updateDay = function (ExaminationDate) {
            $scope.ExaminationDate = ExaminationDate;
            var date = new Date($scope.ExaminationDate);
            var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $scope.ExaminationDay = daysOfWeek[date.getDay()];
            $scope.Day = true;
        };

        $scope.EditupdateDay = function () {
            $scope.EditData.ExaminationDate = $scope.EditData.ExaminationDate;
            var date = new Date($scope.EditData.ExaminationDate);
            var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $scope.EditData.ExaminationDay = daysOfWeek[date.getDay()];
        };

        $scope.gethours = function () {
            $scope.hoursarr = [];
            for (var i = 0; i < 13; i++)
                if (i < 10) {
                    $scope.hoursarr.push({ "Harr": ("0" + i).toString() });
                } else {
                    $scope.hoursarr.push({ "Harr": i.toString() });
                }
        }

        $scope.getminutes = function () {
            $scope.mintuesarr = [];
            for (var i = 0; i < 60; i++)
                if (i < 10) {
                    $scope.mintuesarr.push({ "Marr": ("0" + i).toString() });
                } else {
                    $scope.mintuesarr.push({ "Marr": i.toString() });
                }
        }

        $scope.getExaminationDates = function (ExaminationPolycetYearID) {
            var DataType = 1;
            var ExaminationDateID = 0;//default value (optional)
            var getexamdates = AdminService.GetExaminationDates(DataType, ExaminationPolycetYearID, ExaminationDateID);
            getexamdates.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.ExamDatesData = res.Table;
                }
                else {
                    $scope.ExamDatesData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.addExaminationDates = function () {

            if ($scope.ExaminationPolycetYearID == null || $scope.ExaminationPolycetYearID == undefined || $scope.ExaminationPolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.ExaminationDate == null || $scope.ExaminationDate == undefined || $scope.ExaminationDate == "") {
                alert('Please select Examination Date');
                return;
            }
            if ($scope.StartHH == null || $scope.StartHH == undefined || $scope.StartHH == "") {
                alert('Please select Examination Start Hour');
                return;
            }
            if ($scope.StartMM == null || $scope.StartMM == undefined || $scope.StartMM == "") {
                alert('Please select Examination Start Minutes');
                return;
            }
            if ($scope.StartAMPM == null || $scope.StartAMPM == undefined || $scope.StartAMPM == "") {
                alert('Please select Examination AM / PM / NOON');
                return;
            }
            if ($scope.EndHH == null || $scope.EndHH == undefined || $scope.EndHH == "") {
                alert('Please select Examination End Hour');
                return;
            }
            if ($scope.EndMM == null || $scope.EndMM == undefined || $scope.EndMM == "") {
                alert('Please select Examination End Minutes');
                return;
            }
            if ($scope.EndAMPM == null || $scope.EndAMPM == undefined || $scope.EndAMPM == "") {
                alert('Please select Examination End AM / PM / NOON');
                return;
            }

            //$scope.loading = true;
            var DataType = 1;
            var ExaminationDateID = 0;//Optional
            var Active = true;//Optional
            var ExaminationDate = moment($scope.ExaminationDate).format("YYYY-MM-DD");
            var ExaminationDay = $scope.ExaminationDay;
            var StartHH = $scope.StartHH;
            var StartMM = $scope.StartMM;
            var StartAMPM = $scope.StartAMPM;
            var EndHH = $scope.EndHH;
            var EndMM = $scope.EndMM;
            var EndAMPM = $scope.EndAMPM;
            var addexamdates = AdminService.AddExaminationDates(DataType, $scope.ExaminationPolycetYearID, ExaminationDateID,
                ExaminationDate, ExaminationDay,StartHH,StartMM,StartAMPM,EndHH,EndMM,EndAMPM,Active, authData.UserName);
            addexamdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getExaminationDates($scope.ExaminationPolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getExaminationDates($scope.ExaminationPolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.ViewExaminationDates = function (ExaminationDateID) {
            var DataType = 1;
            var ExaminationPolycetYearID = 0;//default value(optional)
            var viewexamdates = AdminService.ViewExaminationDates(DataType, ExaminationPolycetYearID, ExaminationDateID);
            viewexamdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Examination Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewExaminationDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.EditExaminationDates = function (ExaminationDateID) {
            var DataType = 2;
            var ExaminationPolycetYearID = 0;//default value(optional)
            var geteditexamdates = AdminService.EditExaminationDates(DataType, ExaminationPolycetYearID, ExaminationDateID);
            geteditexamdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    $scope.StartHH = $scope.EditData.StartHH;
                    $scope.ExaminationDateID = res.Table[0].ExaminationDateID;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Examination Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditExaminationDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.UpdateExamDatesDetails = function (data) {

            var ExaminationDate = moment(data.ExaminationDate).format("YYYY-MM-DD");
            var ExaminationDay = data.ExaminationDay;
            var StartHH = data.StartHH;
            var StartMM = data.StartMM;
            var StartAMPM = data.StartAMPM;
            var EndHH = data.EndHH;
            var EndMM = data.EndMM;
            var EndAMPM = data.EndAMPM;
            var DataType = 2;
            var ExaminationPolycetYearID = 0;//Optional
            var updatexamdates = AdminService.UpdateExaminationDates(DataType, ExaminationPolycetYearID, $scope.ExaminationDateID,
                ExaminationDate,ExaminationDay, StartHH, StartMM, StartAMPM,
                EndHH, EndMM, EndAMPM,data.Active, authData.UserName);
            updatexamdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getExaminationDates($scope.ExaminationPolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getExaminationDates($scope.ExaminationPolycetYearID);
                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }

        $scope.getHtDates = function (HtPolycetYearID) {
            var DataType = 1;
            var HtDatesID = 0;//default value (optional)
            var getexamdates = AdminService.GetHtDates(DataType, HtPolycetYearID, HtDatesID);
            getexamdates.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.HtDatesData = res.Table;
                }
                else {
                    $scope.HtDatesData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.addHtDates = function () {

            if ($scope.HtPolycetYearID == null || $scope.HtPolycetYearID == undefined || $scope.HtPolycetYearID == "") {
                alert('Please select PolycetYear');
                return;
            }
            if ($scope.HtStartDate == null || $scope.HtStartDate == undefined || $scope.HtStartDate == "") {
                alert('Please select Ht StartDate');
                return;
            }
            if ($scope.HtEndDate == null || $scope.HtEndDate == undefined || $scope.HtEndDate == "") {
                alert('Please select Ht EndDate');
                return;
            }

            //$scope.loading = true;
            var DataType = 1;
            var HtDatesID = 0;//Optional
            var Active = true;//Optional
            var HtStartDate = moment($scope.HtStartDate).format("YYYY-MM-DD");
            var HtEndDate = moment($scope.HtEndDate).format("YYYY-MM-DD");


            var addhtdates = AdminService.AddHtDates(DataType, $scope.HtPolycetYearID, HtDatesID,
                HtStartDate, HtEndDate, Active, authData.UserName);
            addhtdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getHtDates($scope.HtPolycetYearID);

                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getHtDates($scope.HtPolycetYearID);
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.ViewNRDates = function (HtDatesID) {
            var DataType = 2;
            var HtPolycetYearID = 0;//default value(optional)
            var viewhtdates = AdminService.ViewNRDates(DataType, HtPolycetYearID, HtDatesID);
            viewhtdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Ht Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewHtDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.EditHtDates = function (HtDatesID) {
            var DataType = 2;
            var HtPolycetYearID = 0;//default value(optional)
            var geteditnrdates = AdminService.EditHtDates(DataType, HtPolycetYearID, HtDatesID);
            geteditnrdates.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    $scope.HtDatesID = res.Table[0].HtDatesID;

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Ht Dates')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditHtDatesPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.UpdateHtDatesDetails = function (data) {

            var startDate = moment(data.StartDate).format("YYYY-MM-DD");
            var endDate = moment(data.EndDate).format("YYYY-MM-DD");
            var DataType = 2;
            var HtPolycetYearID = 0;//Optional
            var updatehtdates = AdminService.UpdateHtDates(DataType, HtPolycetYearID, $scope.HtDatesID, startDate, endDate, data.Active, authData.UserName);
            updatehtdates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getHtDates($scope.HtPolycetYearID);
                    $scope.modalInstance.close();




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getHtDates($scope.HtPolycetYearID);


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

