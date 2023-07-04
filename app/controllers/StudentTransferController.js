define(['app'], function (app) {
    app.controller("StudentTransferController", function ($scope, $uibModal, SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;

        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.getExaminationCentres();
        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }

        $scope.search = "";


        var DataType = 2
        var verifyexamDate = AdminService.VerifyExaminationDates(DataType);
        verifyexamDate.then(function (response) {
            try {
                var res = JSON.parse(response)

            }
            catch (err) { }
            if (res[0].ResponseCode == '200') {

            } else if (res[0].ResponseCode == '400') {
                alert('Dates are Not Found')
                $state.go('Dashboard');
            }
        },
            function (error) {
                alert("error while Verifying Dates")
                //var err = JSON.parse(error);

            });

        $scope.getStudentTransferData = function (HallTicketNumber) {
            $scope.HallTicketNumber = HallTicketNumber;
            if ($scope.HallTicketNumber == null || $scope.HallTicketNumber == undefined || $scope.HallTicketNumber == '') {
                alert('Please Enter Correct Hall Ticket Number');
                return;
            }
            var getdata = AdminService.GetStudentTransferData($scope.HallTicketNumber);
            getdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.StudentData = res.Table;
                    $scope.NoData = false;
                    $scope.Label = true;

                } else {
                    $scope.StudentData = [];
                    $scope.loading = false;
                    $scope.NoData = true;
                    $scope.Label = false;
                    alert("No Data Found");

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    $scope.Label = false;
                    alert("error while loading Data");
                    console.log(error);
                });
        }



        $scope.getExaminationCentres = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 11;
            var examcentres = AdminService.GetExaminationCentres(DataType,'','');
            examcentres.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.ExamCentresDataNew = response;
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

        $scope.SelectCentre = function (data) {
            $scope.SelectedCentre = data;
            $scope.SelectedTransferCentre = $scope.SelectedCentre.CentreCode + ' - ' + $scope.SelectedCentre.CentreName;
            if ($scope.StudentData[0].CentreName == $scope.SelectedTransferCentre) {
                alert('Alloted Centre and Transfer Centre Should not be Same');
                $scope.SelectedTransferCentre = '';
                return;
            }
        }

        $scope.Transfer = function () {
            if ($scope.SelectedTransferCentre == '' || $scope.SelectedTransferCentre == undefined || $scope.SelectedTransferCentre == null) {
                alert('Please Select Examination Centre From Table');
                return;
            }



            $scope.StudentName = $scope.StudentData[0].StudentName;
            $scope.HallTicketNumber = $scope.StudentData[0].HallticketNumber;
            $scope.FromCentre = $scope.StudentData[0].CentreName;
            $scope.ToCentre = $scope.SelectedTransferCentre;
            test = { 'StudentName': $scope.StudentName, 'HallTicketNumber': $scope.HallTicketNumber, 'FromCentre': $scope.FromCentre, 'ToCentre': $scope.SelectedTransferCentre }
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ConfirmTransferCentrePopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
                resolve: {
                    test: function () {
                        return test;
                    }

                }
            });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }


        $scope.ConfirmTransfer = function () {
            var paramObj = {
                "RegistrationID": $scope.StudentData[0].RegistrationID,
                "HallticketNumber": $scope.StudentData[0].HallticketNumber,
                "ExaminationCentreID": $scope.SelectedCentre.ExaminationCentreID,
                "UserName": authData.UserName
            }
            if ($scope.StudentData[0].CentreName == $scope.SelectedTransferCentre) {
                alert('Alloted Centre and Transfer Centre Should not be Same');
                return;
            }
            $scope.loading = true;
            var updatecentre = AdminService.SetStudentCentreTransfer(paramObj);
            updatecentre.then(function (response) {
                //try {
                //    var res = JSON.parse(response);
                //}
                //catch (err) { }
                //let VerRes = response[0];

                if (response[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(response[0].StatusDescription);
                    $scope.modalInstance.close();
                    $scope.getStudentTransferData($scope.StudentData[0].HallticketNumber);
                    $scope.getExaminationCentres();
                    $scope.Label = false;
                    $scope.SelectedTransferCentre = '';
                    $scope.search = '';

                } else if (response[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(response[0].StatusDescription);

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