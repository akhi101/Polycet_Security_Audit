define(['app'], function (app) {
    app.controller("ForgotPageController", function ($scope, $state, AdminService, StudentRegistrationService, ForgotPasswordService, $crypto, $scope,$crypto) {
        const $ctrl = this;
            $ctrl.$onInit = () => {
                //$scope.sendotp = true;
                //$scope.enterotp = false;
                //$scope.PhoneNum = false;
                //$scope.verifyotp = false;
                //$scope.ResendLink = false;
                //$scope.phonenoupdated = false;
                //$scope.OtpVerified = false;
                $scope.getcurrentpolycetyear();
            }

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
                    alert("error while loading States");
                    //var err = JSON.parse(error);

                });


        }

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
            $scope.Smsbtndisable = true;
            $scope.loader = true;
            if (($scope.UserName == undefined) || $scope.UserName == "" || $scope.UserName==null) {
                alert("Please Enter User Name");
                $scope.Smsbtndisable = false;
                return;
            }

            if (($scope.MobileNumber == undefined) || ($scope.MobileNumber == "" || $scope.MobileNumber==null)) {
                alert("Please Enter Mobile Number");
                $scope.Smsbtndisable = false;
                return;
            }
            if (($scope.MobileNumber.length < 10) || ($scope.MobileNumber.length > 10)) {
                alert("Invalid Mobile Number");
                $scope.Smsbtndisable = false;
                return false;
            }
            //if ($scope.OtpVerified == false) {
            //    alert("Please Verify Mobile Number")
            //    $scope.Smsbtndisable = false;
            //    return
            //}
            if ($scope.CaptchaText == undefined || $scope.CaptchaText == "" || $scope.CaptchaText == null) {
                $scope.CaptchaText = "";
                alert("Please Enter Captcha");
                $scope.Smsbtndisable = false;
                return;
            };
            var captcha = AdminService.ValidateCaptcha($scope.SessionCaptcha, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    $scope.Smsbtndisable = false;
                    $scope.loader = true;
                    //alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    $scope.Submit();
                } else {
                    alert(response[0].ResponceDescription)
                    $scope.Smsbtndisable = false;
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


        //$scope.ResStatus = 0;
        //$scope.SendSms = function () {
        //    $scope.Smsbtndisable = true;
        //    if ($scope.UserName == undefined || $scope.UserName == "" || $scope.UserName == null) {
        //        alert('Please Enter User Name');
        //        $scope.Smsbtndisable = false;
        //        return;
        //    }

        //    if ($scope.MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
        //        alert('Please Enter Mobile Number');
        //        $scope.Smsbtndisable = false;
        //        return;
        //    }
        //    $scope.loading = true;
        //    $scope.PhoneNum = true;
        //    $scope.aadharbox = true;

        //    $scope.enterotp = true;
        //    $scope.verifyotp = true;
        //    $scope.sendotp = false;
        //    $scope.phonenoupdated = false;
        //    //var AadharNo = '123456789456'
        //    var SendSms = StudentRegistrationService.SendSms($scope.MobileNumber, $scope.UserName)
        //    SendSms.then(function (response) {
        //        let res = response[0];
        //        $scope.loading = false;
        //        if (res.StatusCode == '200') {
        //            $scope.ResStatus = res.StatusCode;
        //            alert("Otp sent successfully.");
        //            $scope.Smsbtndisable = false;
        //            $scope.sendotp = false;
        //            $scope.phonenoupdated = false;
        //            $scope.enterotp = true;
        //            $scope.ResendLink = true;
        //            $scope.verifyotp = true;
        //            $scope.loading = false;


        //        } else if (res.StatusCode == '400') {
        //            $scope.ResStatus = res.StatusCode;
        //            alert(res.StatusDescription);
        //            $scope.Smsbtndisable = false;
        //            $scope.sendotp = false;
        //            $scope.phonenoupdated = false;
        //            $scope.enterotp = true;
        //            $scope.ResendLink = true;
        //            $scope.verifyotp = true;
        //            $scope.loading = false;



        //        } else {
        //            alert("Otp Sending Failed")
        //            $scope.Smsbtndisable = false;
        //            $scope.sendotp = true;
        //            $scope.phonenoupdated = false;
        //            $scope.enterotp = false;
        //            $scope.verifyotp = false;
        //            $scope.loading = false;

        //        }

        //    }, function (err) {

        //        $scope.sendotp = true;
        //        $scope.Smsbtndisable = false;
        //        $scope.phonenoupdated = false;
        //        $scope.enterotp = false;
        //        $scope.verifyotp = false;
        //        $scope.loading = false;

        //    });



        //}

        //var count = 0;
        //$scope.ResendOtp = function () {
        //    if (count < 3) {


        //        $scope.SendSms();
        //        if ($scope.ResStatus == 200)
        //            count++;

        //        else if ($scope.ResStatus == 400)
        //            alert('Otp Sent Less than 30 Seconds');
        //        else
        //            $scope.ResendLink = false;
        //        /*alert('')*/

        //    }
        //}

        //$scope.VerifyMobileOtp = function (MobileNumber, UserName, mobileotp) {
        //    $scope.Smsbtndisable = true;
        //    if ($scope.UserName == undefined || $scope.UserName == "" || $scope.UserName == null) {
        //        alert('Please Enter User Name');
        //        $scope.Smsbtndisable = false;
        //        return;
        //    }

        //    if ($scope.MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
        //        alert('Please Enter Mobile Number');
        //        $scope.Smsbtndisable = false;
        //        return;
        //    }


        //    if ($scope.mobileotp == undefined || $scope.mobileotp == "" || $scope.mobileotp == null) {
        //        alert('please Enter OTP.');
        //        $scope.Smsbtndisable = false;
        //        return;
        //    }
        //    var VerifyMobileOtp = StudentRegistrationService.VerifyMobileOtp(MobileNumber, UserName, mobileotp)
        //    VerifyMobileOtp.then(function (response) {
        //        let VerRes = response[0];
        //        if (VerRes.StatusCode == '200') {
        //            alert("Mobile Number Verified Successfully");
        //            $scope.mobilenum = true;
        //            $scope.Smsbtndisable = false;
        //            $scope.OtpVerified = true;
        //            $scope.enterotp = false;
        //            $scope.verifyotp = false;
        //            $scope.phonenoupdated = true;



        //        } else if (VerRes.StatusCode == '400') {
        //            alert(VerRes.StatusDescription);
        //            $scope.Smsbtndisable = false;
        //            $scope.OtpVerified = false;
        //            $scope.phonenoupdated = false;
        //            $scope.sendotp = false;


        //        }

        //        else {
        //            alert("Otp Verification Failed")
        //            $scope.Smsbtndisable = false;
        //            $scope.OtpVerified = false;
        //            $scope.phonenoupdated = false;
        //            $scope.sendotp = false;

        //        }
        //    },

        //        function (error) {

        //            var err = JSON.parse(error);
        //        })
        //}


        $scope.Submit = function () {
            $scope.Smsbtndisable = true;

            $scope.loader = true;

            //if (($scope.UserName == undefined) || ($scope.UserName == "")) {
            //    alert("Enter Username");
            //    $scope.Smsbtndisable = false;
            //    return;
            //}

            //if (($scope.MobileNumber == undefined) || ($scope.MobileNumber == "")) {
            //    alert("Enter Mobile Number");
            //    $scope.Smsbtndisable = false;
            //    return;
            //}
            //if (($scope.MobileNumber.length < 10) || ($scope.MobileNumber.length > 10)) {
            //    alert("Invalid Mobile Number");
            //    $scope.Smsbtndisable = false;
            //    return false;
            //}
            //if ($scope.CaptchaText == undefined || $scope.CaptchaText == "") {
            //    $scope.CaptchaText = "";
            //    alert("Enter Captcha");
            //    return;
            //};

            var DataType = 1;
            let reqdata = $crypto.encrypt($scope.UserName, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt($scope.MobileNumber, sessionStorage.Ekey) + "$$@@$$" + $crypto.encrypt(DataType.toString(), sessionStorage.Ekey) + "$$@@$$" + sessionStorage.Ekey;
            var getPromise = ForgotPasswordService.GetForgotPassword(reqdata);
            getPromise.then(function (data) {
                try {
                    var res = JSON.parse(data);

                } catch (ex) {
                }
                if (res.status == "200") {
                    //$scope.ShowLoading = false;
                    $scope.loader = false;


                    var Message = "Dear Sir//Madam, Your Login Credentials: UserPassword= " + data[0].UserPassword + " SBTETTS";
                    //var Urlstring = "?User=sbtetts&Passwd=sbtet@1972&Sid=SBTETS&Mobilenumber=91" + data[0].CellNo + "&Message=" + Message + "&Mtype=N&DR`=Y";
                    //  var FinalURL= AppSettings.SMSApiUrl + Urlstring;

                    alert("Login Credentials sent to the Registered Mobile Number. Please Check.");
                    RedirectToListPage();
                } else {
                    alert(res.statusdesc);
                    $scope.Smsbtndisable = false;
                    $scope.loader = false;
                    //$scope.ShowLoading = false;
                    //$scope.RollEditDisable = false;
                }

            }, function (error) {
                $scope.Smsbtndisable = false;
                $scope.ShowLoading = false;
                $scope.RollEditDisable = false;
                try {
                    var res = JSON.parse(error);

                } catch (ex) {
                }
                alert(res.statusdesc);

            });
        }

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('index.OfficialsLogin');
        }

    })
})