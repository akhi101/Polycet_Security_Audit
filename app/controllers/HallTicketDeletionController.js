define(['app'], function (app) {
    app.controller("HallTicketDeletionController", function ($scope, $uibModal, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {

        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.UserTypeID = authData.UserTypeID;

        const $ctrl = this;

        $ctrl.$onInit = () => {

        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }


        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.LoginEKey = res;
            sessionStorage.Ekey = res;

        });

        var sessioneKey = SystemUserService.GetSessionEKey();
        sessioneKey.then(function (res) {
            $scope.LoginSessionEKey = res;
            sessionStorage.SessionEkey = res;

        });

        $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')


        var captcha = AdminService.GetCaptchaString($scope.SessionCaptcha);
        captcha.then(function (response) {
            try {
                var res = JSON.parse(response);
                $scope.GetCatcha = res[0].Text;
                $scope.CaptchaImage = res[0].Image;

            } catch (err) {
                $scope.GetCatcha = ''
            }
        }, function (error) {
            $scope.GetCatcha = ''
            alert('Unable to load Captcha')
        });

        $scope.GetCaptchaData = function () {
            var captcha = AdminService.GetCaptchaString($scope.SessionCaptcha);
            captcha.then(function (response) {
                try {
                    var res = JSON.parse(response);
                    $scope.GetCatcha = res[0].Text;
                    $scope.CaptchaImage = res[0].Image;

                } catch (err) {
                    $scope.GetCatcha = ''
                }
            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }



        $scope.ValidateCaptcha = function () {

            if ($scope.HallTicketNumber == null || $scope.HallTicketNumber == undefined || $scope.HallTicketNumber == '') {
                alert('Please Enter Correct HallTicket Number ');
                $scope.getbutton = false;
                return;
            }
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.getbutton = false;
                return;
            };
            var captcha = AdminService.ValidateCaptcha($scope.SessionCaptcha, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    //alert(response[0].ResponseDescription);
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.getStudentHtData($scope.HallTicketNumber)
                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }

        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            var DataType = 1;
            //var UserName = 0;
            var exceldownload = AdminService.GetDeletedHallTicketsExcel(DataType);
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

        $scope.getStudentHtData = function (HallTicketNumber) {
            $scope.HallTicketNumber = HallTicketNumber;
            $scope.getbutton = true;
            $scope.loader1 = true;
            if ($scope.HallTicketNumber == null || $scope.HallTicketNumber == undefined || $scope.HallTicketNumber == '') {
                alert('Please Enter Correct Hall Ticket Number');
                $scope.getbutton = false;
                return;
            }
            var getdata = AdminService.GetStudentHtData($scope.HallTicketNumber);
            getdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length > 0 && res.Table[0].StatusCode != '400') {
                    $scope.getbutton = false;
                    $scope.loader1 = false;
                    $scope.StudentData = res.Table;

                } else if (res.Table[0].StatusCode == '400') {
                    $scope.getbutton = false;
                    $scope.loader1 = false;
                    $scope.StudentData = [];
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

        $scope.Cancel = function () {
            $scope.HallTicketNumber = null;
            $scope.Captcha = null;
            $scope.StudentData = [];
        }

        $scope.DeleteDetails = function (test) {


            test = {
                'HallticketNumber': $scope.HallticketNumber,
                'StudentName': $scope.StudentName,
                'FatherName': $scope.FatherName,
                'CentreName': $scope.CentreName,
                'CasteCategoryName': $scope.CasteCategoryName,
                'RegistrationNumber': $scope.RegistrationNumber
            }
            $scope.modalInstance2 = $uibModal.open(
                {
                    templateUrl: "/app/views/Popups/ConfirmDeleteHallTicketPopup.html",
                    size: 'x-large',
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


        $scope.ConfirmDelete = function (data, Remarks) {
            $scope.Remarks = Remarks;
            if ($scope.Remarks == '' || $scope.Remarks == undefined || $scope.Remarks==null) {
                alert('Please Enter Remarks');
                return;
            }
            var HallTicketNumber = data[0].HallticketNumber
            var VerifyDate = AdminService.DeleteHallTicketData(HallTicketNumber, $scope.Remarks);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.modalInstance2.close();
                    $scope.HallTicketNumber = null;
                    $scope.Captcha = null;
                    $scope.StudentData = [];
                } else if (res[0].StatusCode == '400') {
                    $scope.modalInstance2.close();
                    alert(res[0].StatusDescription);
                    $scope.HallTicketNumber = null;
                    $scope.Captcha = null;
                    $scope.StudentData = [];
                }
            },
                function (error) {
                    alert("error while loading data")
                    //var err = JSON.parse(error);
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
            $state.go('Dashboard.Settings.ChangePassword');
        }


        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            var GetUserLogout = SystemUserService.PostUserLogout(2, $scope.UserName, $scope.LoginSessionEkey);
            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                //    userName: ""
            };
            $state.go('index.OfficialsLogin')
        }
    })
})