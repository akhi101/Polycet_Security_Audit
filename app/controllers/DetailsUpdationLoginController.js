define(['app'], function (app) {
    app.controller("DetailsUpdationLoginController", function ($scope, $uibModal, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {

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

        //$scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')
        ////alert($scope.SessionCaptcha)

        //var captcha = AdminService.GetCaptchaString($scope.SessionCaptcha);
        //captcha.then(function (response) {
        //    try {
        //        var res = JSON.parse(response);
        //        $scope.GetCatcha = res[0].Text;
        //        $scope.CaptchaImage = res[0].Image;

        //    } catch (err) {
        //        $scope.GetCatcha = ''
        //    }
        //}, function (error) {
        //    $scope.GetCatcha = ''
        //    alert('Unable to load Captcha')
        //});




        $scope.getcurrentpolycetyear = function () {
            var getcurrpolycetyear = AdminService.GetCurrentPolycetYear();
            getcurrpolycetyear.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                $scope.PolycetYearID = res.Table[0].PolycetYearID;
                $scope.CurrentPolycetYearData = res.Table;
                //$scope.getfeeamount($scope.PolycetYearID);

            },
                function (error) {
                    alert("error while loading PolycetYear");
                    //var err = JSON.parse(error);

                });


        }

        sessionStorage.loggedIn = "no";
        $scope.Login = {
            MobileNumber: "",
        }

        $scope.MobileNumbermessage = "";
        $scope.message = "";

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

            if ($scope.MobileNumber == "" || $scope.MobileNumber == undefined || $scope.MobileNumber == null) {
                alert("Enter Registration Number/Mobile Number");
                $scope.loginbutton = false;
                return;
            }
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
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
                    $scope.Login()
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


        $scope.keyLogin = function ($event) {
            if ($event.keyCode == 13) {
                $scope.Submit();
            }
        }

        //$scope.LoadImg = false;
        $scope.LoginToken = "";
        $scope.LoginEKey = "";
        $scope.LoginSessionEkey = "";

        $scope.Submit = function () {
            if ($scope.MobileNumber == "" || $scope.MobileNumber == undefined || $scope.MobileNumber == null) {
                alert("Enter Registration Number/Mobile Number");
                $scope.loginbutton = false;
                return;
            }

            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
                $scope.CaptchaText = "";
                alert("Enter Captcha");
                $scope.loginbutton = false;
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
                    $scope.getviewdetails();
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

       

        $scope.getviewdetails = function () {
            var DataType = 1;
            var viewdetails = AdminService.GetViewstdDetails($scope.MobileNumber, DataType);
            viewdetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.ViewData = res.Table1;

                if ($scope.ViewData != "") {
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Popups/ViewDetailsUpdationPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        backdrop: 'static',
                        //windowClass: 'modal-fit-att',
                    });

                    $scope.closeModal = function () {
                        $scope.modalInstance.close();
                    }
                }
                else if ($scope.ViewData == ""){
                    alert('No Application Data Found');
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Popups/ViewDetailsUpdationPopup.html",
                        size: 'xlg',
                        scope: $scope,
                        backdrop: 'static',
                        //windowClass: 'modal-fit-att',
                    });

                    $scope.closeModal = function () {
                        $scope.modalInstance.close();
                    }
                }
            },
                function (error) {
                    alert("error while loading Data");
                    //var err = JSON.parse(error);

                });

            
        }



        $scope.Login = function () {
            if ($scope.MobileNumber == "" || $scope.MobileNumber == undefined || $scope.MobileNumber==null) {
                alert("Enter MobileNumber");
                $scope.loginbutton = false;
                return;
            }


            else {

                var DataType = 1;
                if ($scope.MobileNumber !== null) {
                    var data = $crypto.encrypt($scope.MobileNumber, $scope.LoginEKey) + "$$@@$$" + $crypto.encrypt(DataType.toString(), $scope.LoginEKey) + "$$@@$$" + $scope.LoginEKey + "$$@@$$" + $scope.LoginSessionEKey;
                    $http.post(AppSettings.WebApiUrl + 'api/SystemUser/GetAdminStudentLogin', data, {}).then(function (response) {

                        //$scope.LoadImg = true;
                        var UserRights = [];
                        sessionStorage.loggedIn = "yes";
                        $localStorage.authToken = response.data.token + "$$@@$$" + $scope.LoginEKey;
                        var status = response.data.data.UserAuth[0].ResponceCode;
                        if (status != "200") {
                            alert(response.data.data.UserAuth[0].RespoceDescription);

                            return;
                        } else {
                            $scope.loginbutton = true;
                            $localStorage.SessionID = $scope.LoginSessionEKey;
                            if (response.data.data.SystemUser[0].UserTypeID == 0) {
                                //try {
                                $localStorage.authorizationData = {
                                    token: $localStorage.authToken,
                                    SessionID: $scope.LoginSessionEkey,
                                    RegistrationID: response.data.data.SystemUser[0].RegistrationID,
                                    UserID: $scope.UserID,
                                    UserName: $scope.UserName,
                                    UserTypeID: $scope.UserTypeID,


                                };
                                $state.go('AdminStudentDashboard');
                            } else {
                                response.data = response.data.data.SystemUser[0];

                                $localStorage.authorizationData = {
                                    token: $localStorage.authToken,
                                    SessionID: $scope.LoginSessionEkey,
                                    RegistrationID: response.data.data.SystemUser[0].RegistrationID,
                                    UserID:$scope.UserID,
                                    UserName: $scope.UserName,
                                    UserTypeID: $scope.UserTypeID,




                                };

                                //} catch (err) {

                                //}
                                $state.go('AdminStudentDashboard');
                            }
                        }



                    });
                };
            }

        }
        $scope.ForgetPasswordChange = function () {
            $state.go('ForgetPassword');
        }


        $("#username").focus();
        $scope.ClearErrorText = function ($event) {
            $scope.MobileNumbermessage = "";
            $scope.message = "";
        };
        $scope.$on('onUnload', function (e) {
            delete $localStorage.authorizationData;
            sessionStorage.loggedIn = "no";
        });
        $scope.LoginbocLogin = function () {
            $state.go('Login');
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
            //$localStorage.TempData = {
            //    RegistrationId: RegistrationId,
            //};
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