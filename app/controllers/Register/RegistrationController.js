define(['app'], function (app) {
    app.controller("RegistrationController", function ($scope, $http, $crypto, $localStorage, $state, $uibModal, PaymentService, StudentRegistrationService, AdminService, SystemUserService, PreExaminationService) {
        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.verifyDates();
            $scope.getcurrentpolycetyear();
            $scope.EMAIL2 = true;

            $scope.sendotp = true;
            $scope.verifycastebutton = false;
            $scope.enterotp = false;
            $scope.PhoneNum = false;
            $scope.verifyotp = false;
            $scope.loading = false;
            $scope.aadharbox = false;
            $scope.ResendLink = false;
            $scope.phonenoupdated = false;
            $scope.OtpVerified = false;
            $scope.SessionCaptcha = sessionStorage.getItem('SessionCaptcha')

            // $scope.Pay()

            console.log($scope.SessionCaptcha)
            $scope.GetCaptchaData()
            var eKey = SystemUserService.GetEKey();
            eKey.then(function (res) {
                $scope.RegistrationEKey = res;
                sessionStorage.Ekey = res;

            });


            //var VerifyDate = AdminService.VerifyRegistrationDates();
            //VerifyDate.then(function (response) {
            //    if (response.Table[0].ResponseCode == '200') {
            //        //   $state.go('index');
            // } else if (response.Table[0].ResponseCode == '400') {
            //  $state.go('index')
            //   alert(response.Table[0].ResponseDescription)

            //    } else if (response.Table[0].ResponseCode == '400') {
            //        $state.go('index')
            //        alert(response.Table[0].ResponseDescription)
            //    }
            //},
            //    function (error) {
            //        alert("error while Verifying Dates")
            //        //var err = JSON.parse(error);

            //    });


        }

        var getcategory = StudentRegistrationService.GetCategories();
        getcategory.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.GetCasteData = res.Table;
            $scope.verifycastebutton = true;

        },
            function (error) {
                alert("error while loading Caste Category");
                //var err = JSON.parse(error);
            });

        $scope.verifyDates = function (DataType) {
            var DataType = 1
            var VerifyDate = AdminService.VerifyRegistrationDates(DataType);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {

                } else if (res[0].ResponseCode == '400') {
                    $state.go('index')
                    alert(res[0].ResponseDescription)
                }
            },
                function (error) {
                    alert("error while Verifying Dates")
                    //var err = JSON.parse(error);
                });
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
                $scope.getfeeamount($scope.PolycetYearID);

            },
                function (error) {
                    alert("error while loading States");
                    //var err = JSON.parse(error);
                });


        }
        $scope.getfeeamount = function () {

            var DataType = 1;
            var FeeAmountID = 0;//Default Value(Optional)
            var getfeeamount = AdminService.GetFeeAmounts(DataType, $scope.PolycetYearID, FeeAmountID);
            getfeeamount.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.FeeAmountsData = res.Table;
                }
                else {
                    $scope.FeeAmountsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.Compare = function (ConfirmPass) {
            if ($scope.CreatePass.includes(ConfirmPass)) {
            }
            else {
                alert('Password Mismatch');
            }
        }

        $scope.ValidateEmail = function () {
            if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test($scope.email)) {
                return (true)
            }
            alert("You have entered an invalid email address!")
            return;
        }

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

        $scope.Cancel = function () {
            $scope.StudentName = "";
            $scope.MobileNumber = "";
            $scope.OtpVerified = false;
            $scope.CasteCategoryName = null;
            $scope.Aadhaar = "";
            $scope.CasteNum = "";
            $scope.CasteVerified = false;
            $scope.email1 = "";
            $scope.email2 = "";
            $scope.CasteNum = "";
            $scope.CasteVerified = false;
            $scope.CreatePass = "";
            $scope.ConfirmPass = "";
            $scope.CaptchaText = "";
            $scope.PhoneNum = false;
            $scope.otpbutton = false;
            $scope.sendotp = true;
            $scope.enterotp = false;
            $scope.mobileotp = "";
            $scope.OtpVerified = false;
            $scope.verifyotp = false;
            $scope.ResendLink = false;

            $scope.CasteNotVerified = false;
            $scope.AADHARNO = false;
            $scope.CASTENUM = false;

            $scope.AADHAR = false;
            $scope.CASTENUMBER = false;
            $scope.CasteCategory = null;
            $scope.GETCASTEBUTTON = false;
            $scope.EMAIL2 = true;
            $scope.EMAIL1 = false;
            $scope.GetCaptchaData()
        }

        $scope.ValidateCaptcha = function (datatype) {
            $scope.DataType = datatype;
            if ($scope.StudentName == "" || $scope.StudentName == null || $scope.StudentName == undefined) {
                alert("Please Enter Name")
                return
            }
            if ($scope.MobileNumber == "" || $scope.MobileNumber == null || $scope.MobileNumber == undefined) {
                alert("Please Enter Mobile Number")
                return
            }

            if ($scope.OtpVerified == false) {
                alert("Please Verify Mobile Number")
                return
            }
            if ($scope.CasteCategoryName == "" || $scope.CasteCategoryName == null || $scope.CasteCategoryName == undefined) {
                alert("Please Select Category")
                return
            }


            if ($scope.CasteCategoryName == 'SC' || $scope.CasteCategoryName == 'ST') {
                $scope.email = $scope.email1
            }
            else {
                $scope.email = $scope.email2
            }
            if ($scope.CreatePass == "" || $scope.CreatePass == null || $scope.CreatePass == undefined) {
                alert("Please Enter Password")
                return
            }
            if ($scope.ConfirmPass == "" || $scope.ConfirmPass == null || $scope.ConfirmPass == undefined) {
                alert("Please Enter Confirm Password")
                return
            }
            $scope.ChangePassword();
            if ($scope.CaptchaText == "" || $scope.CaptchaText == null || $scope.CaptchaText == undefined) {
                alert("Please Enter Captcha")
                return
            }

            var captcha = AdminService.ValidateCaptcha($scope.SessionCaptcha, $scope.CaptchaText);
            captcha.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {

                    $scope.CaptchaText = "";
                    $scope.Submit()
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;

                } else {
                    alert(response[0].ResponceDescription)
                    $scope.CaptchaText = "";
                    $scope.GetCatcha = response[0].Captcha
                    var captcha = JSON.parse(response[0].Captcha)
                    $scope.CaptchaImage = captcha[0].Image;
                    return

                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }

        $scope.getCasteDetails = function () {
            $scope.loader3 = true;
            $scope.Userid = "MEESEVA";
            var captcha = AdminService.GetCasteDetails($scope.CasteNum, $scope.Userid);
            captcha.then(function (res) {
                console.log(res)
                if (res.errorcode == 200) {
                    $scope.loader3 = false;
                    $scope.verifycastebutton = false;
                    $scope.Data = res.caste_details

                    $scope.Aadhaar_Number = res.caste_details.aadhaar_number
                    $scope.Category_Name = res.caste_details.subtribe

                    let str = $scope.Aadhaar_Number;
                    var aadhaar = str[8] + str[9] + str[10] + str[11];
                    let str1 = $scope.Aadhaar;
                    var aadhaar1 = str1[8] + str1[9] + str1[10] + str1[11];

                    let str2 = $scope.Category_Name;
                    var castecategory = str2[0] + str2[1] + str2[2];

                    let str3 = $scope.CasteCategoryName;
                    var castecategory1 = str3[0] + str3[1] + str3[3];


                    if (aadhaar == aadhaar1 && castecategory == castecategory1) {
                        $scope.loader3 = false;
                        alert("Caste Verified Successfully")
                        $scope.AADHARNO = true;
                        $scope.CASTENUM = true;
                        $scope.CasteVerified = true;
                    } else {
                        $scope.loader3 = false;
                        alert("Aadhaar Number or Selected Category Not Matched with Caste Certificate")
                        $scope.AADHARNO = false;
                        $scope.CASTENUM = false;
                        $scope.verifycastebutton = true;
                        return;
                    }
                } else {
                    $scope.verifycastebutton = false;
                    $scope.CasteNotVerified = true;
                    $scope.loader3 = false;
                    alert("Caste Details Not Found, Continue to Fill Application")
                    $scope.AADHARNO = false;
                    $scope.CASTENUM = false;
                }

            }, function (error) {
                $scope.GetCatcha = ''
                alert('Unable to load Captcha')
            });
        }

        function parseXmlToJson(xml) {
            const json = {};
            for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>])>)((?:(?!<\1).))(?:<\/\1>)|<(\w)(?:\s*)*\/>/gm)) {
                const key = res[1] || res[3];
                const value = res[2] && parseXmlToJson(res[2]);

                json[key] = ((value && Object.keys(value).length) ? value : res[3]) || null;

            }
            $scope.Json = json
        }


        $scope.ResStatus = 0;
        $scope.SendSms = function () {
            $scope.otpbutton = true;
            if ($scope.StudentName == undefined || $scope.StudentName == "" || $scope.StudentName == null) {
                alert('Please enter Student name');
                $scope.otpbutton = false;
                return;
            }

            if ($scope.MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
                alert('please Enter Mobile number');
                $scope.otpbutton = false;
                return;
            }

            $scope.loader1 = true;
            $scope.sendotp = true;
            $scope.phonenoupdated = false;
            var SendSms = StudentRegistrationService.SendSms($scope.MobileNumber, $scope.StudentName)
            SendSms.then(function (response) {
                let res = response[0];
                if (res.StatusCode == '200') {
                    $scope.loader1 = false;
                    $scope.otpbutton = false;
                    $scope.ResStatus = res.StatusCode;
                    alert("Otp sent successfully.");
                    $scope.sendotp = false;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = true;
                    $scope.ResendLink = true;
                    $scope.verifyotp = true;
                }
                else if (res.StatusCode == '400') {
                    $scope.loader1 = false;
                    $scope.otpbutton = false;
                    $scope.ResStatus = res.StatusCode;
                    alert(res.StatusDescription);
                    $scope.sendotp = false;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = true;
                    $scope.ResendLink = true;
                    $scope.verifyotp = true;
                }
                else {
                    $scope.loader1 = false;
                    $scope.otpbutton = false;
                    alert("Otp Sending Failed")
                    $scope.sendotp = true;
                    $scope.phonenoupdated = false;
                    $scope.enterotp = false;
                    $scope.verifyotp = false;
                }

            }, function (err) {
                $scope.loader1 = false;
                $scope.otpbutton = false;
                $scope.sendotp = true;
                $scope.phonenoupdated = false;
                $scope.enterotp = false;
                $scope.verifyotp = false;
            });
        }


        var count = 0;
        $scope.ResendOtp = function () {
            if (count < 3) {
                $scope.ReSendSms();
                if ($scope.ResStatus == 200)
                    count++;

                else if ($scope.ResStatus == 400)
                    alert('Otp Sent Less than 30 seconds');
                else
                    $scope.ResendLink = false;

            }
        }

        $scope.ReSendSms = function () {
            var SendSms = StudentRegistrationService.SendSms($scope.MobileNumber, $scope.StudentName)
            SendSms.then(function (response) {
                let res = response[0];
                if (res.StatusCode == '200') {
                    $scope.loader1 = false;
                    $scope.ResStatus = res.StatusCode;
                    alert("Otp sent successfully.");
                }
                else if (res.StatusCode == '400') {
                    $scope.loader1 = false;
                    $scope.ResStatus = res.StatusCode;
                }
                else {
                    $scope.loader1 = false;
                    alert("Otp Sending Failed")
                }

            }, function (err) {
                $scope.loader1 = false;

            });
        }


        $scope.VerifyMobileOtp = function (MobileNumber, StudentName, mobileotp) {


            if (MobileNumber == undefined || $scope.MobileNumber == "" || $scope.MobileNumber == null) {
                alert('please Enter Correct Mobile number');
                return;
            }

            if ($scope.StudentName == undefined || $scope.StudentName == "" || $scope.StudentName == null) {
                alert('Please enter Student name');
                return;
            }

            if ($scope.mobileotp == undefined || $scope.mobileotp == "" || $scope.mobileotp == null) {
                alert('please Enter OTP.');
                return;
            }

            $scope.loader2 = true;
            var VerifyMobileOtp = StudentRegistrationService.VerifyMobileOtp(MobileNumber, StudentName, mobileotp)
            VerifyMobileOtp.then(function (response) {
                let VerRes = response[0];
                if (VerRes.StatusCode == '200') {
                    $scope.loader2 = false;
                    alert("Mobile Number Verified Successfully");
                    $scope.OtpVerified = true;
                    $scope.enterotp = false;
                    $scope.verifyotp = false;
                    $scope.phonenoupdated = true;
                    $scope.PhoneNum = true;
                }
                else if (VerRes.StatusCode == '400') {
                    $scope.loader2 = false;
                    alert(VerRes.StatusDescription);
                    $scope.OtpVerified = false;
                    $scope.phonenoupdated = false;
                    $scope.sendotp = false;
                }
                else {
                    $scope.loader2 = false;
                    alert("Otp Verification Failed")
                    $scope.OtpVerified = false;
                    $scope.phonenoupdated = false;
                    $scope.sendotp = false;

                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.verifyCaste = function (Aadhaar, CasteNum, CasteCategory) {




            if (CasteCategory == undefined || CasteCategory == "" || CasteCategory == null) {
                alert('please Select Category.');
                return;
            }

            var verifycaste = StudentRegistrationService.VerifyCaste(Aadhaar, CasteNum, CasteCategory)
            verifycaste.then(function (response) {
                let VerRes = response[0];
                if (VerRes.StatusCode == '200') {
                    alert("CasteCertificate Verified");
                    $scope.CasteVerified = true;
                    $scope.verifycastebutton = false;
                    $scope.casteupdated = true;
                }
                else if (VerRes.StatusCode == '400') {
                    alert(VerRes.StatusDescription);
                    $scope.CasteVerified = false;
                    $scope.verifycastebutton = true;
                    $scope.casteupdated = false;
                }
                else {
                    alert("Otp Verification Failed")
                    $scope.OtpVerified = false;
                    $scope.phonenoupdated = false;
                    $scope.sendotp = false;

                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.ChangeCaste = function (CasteCategory) {
            let obj = [];
            obj = { "CasteCategoryID": CasteCategory.CasteCategoryID, "CasteCategoryName": CasteCategory.CasteCategoryName }
            $scope.CasteCategoryID = CasteCategory.CasteCategoryID
            $scope.CasteCategoryName = CasteCategory.CasteCategoryName;
            if ($scope.CasteCategoryName == 'OC' || $scope.CasteCategoryName == 'BC_A' || $scope.CasteCategoryName == 'BC_B' ||
                $scope.CasteCategoryName == 'BC_C' || $scope.CasteCategoryName == 'BC_D' || $scope.CasteCategoryName == 'BC_E') {
                $('.login-Sidepanel').css('padding-bottom', '500px');
                $scope.AADHAR = false; // show text box
                $scope.CASTENUMBER = false; // show text box
                $scope.GETCASTEBUTTON = false;
                $scope.EMAIL2 = true;
                $scope.EMAIL1 = false;

                $scope.AADHARNO = false; // disable text box
                $scope.CASTENUM = false; // disable text box

            }

            else if ($scope.CasteCategoryName == 'SC' || $scope.CasteCategoryName == 'ST') {
                $('.login-Sidepanel').css('padding-bottom', '500px');
                $scope.AADHAR = true; // show text box
                $scope.CASTENUMBER = true; // show text box
                $scope.GETCASTEBUTTON = true;
                $scope.EMAIL1 = true;
                $scope.EMAIL2 = false;

                $scope.AADHARNO = false; // disable text box
                $scope.CASTENUM = false; // disable text box

                $scope.CasteNotVerified = false;

            } else {
                $('.login-Sidepanel').css('padding-bottom', '325px');
            }
            $scope.CasteVerified = false;
            $scope.verifycastebutton = true;
            $scope.casteupdated = false;
            $scope.Aadhaar = "";
            $scope.CasteNum = "";
        }

        $scope.ChangePassword = function () {
            if ($scope.CreatePass !== $scope.ConfirmPass) {
                alert("Password and Confirm Password Not Matched")
                return;
            }
        }
        $scope.CasteVerified = false
        $scope.Aadhaar = "";
        $scope.CasteNum = "";


 

            $scope.Submit = function () {
                if ($scope.DataType == 1) {
                    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*(?:yourUserId|yourAppName)).{8,}$/;
                    if (passwordRegex.test($scope.CreatePass)) {
                    } else {
                        alert('Password does not meet the requirements');
                        return;
                    }
                    $scope.registerbutton1 = true;
                    $scope.Loader1 = true;
                    $scope.Loader2 = false;
                }
                else if ($scope.DataType == 2) {
                    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*(?:yourUserId|yourAppName)).{8,}$/;
                    if (passwordRegex.test($scope.CreatePass)) {
                    } else {
                        alert('Password does not meet the requirements');
                        return;
                    }
                    $scope.registerbutton2 = true;
                    $scope.Loader2 = true;
                    $scope.Loader1 = false;
                }
                let aadhar = $scope.Aadhaar;
                let encodedAadhar = window.btoa(aadhar);
                var EncriptedPassword = $crypto.encrypt($crypto.encrypt($scope.CreatePass, 'HBSBP9214EDU00TS'), $scope.RegistrationEKey) + '$$@@$$' + $scope.RegistrationEKey;
                var submitstddetails = StudentRegistrationService.SubmitStdDetails($scope.StudentName, $scope.MobileNumber, $scope.CasteCategoryID, encodedAadhar, $scope.CasteNum, $scope.CasteVerified, $scope.email, EncriptedPassword, $scope.DataType);
                submitstddetails.then(function (res) {
                    try {
                        var res = JSON.parse(res)
                    }
                    catch (err) { }
                    if (res.Table[0].StatusCode == '200') {
                        $scope.Loader1 = false;
                        $scope.registerbutton1 = false;
                        $scope.registerbutton2 = false;
                        $scope.StudentVerData = res.Table1
                        $scope.challan = res.Table1[0].ChallanNumber;
                        $scope.Amount = res.Table1[0].RegistrationAmount;
                        $scope.StudentName = res.Table1[0].StudentName;
                        $scope.RegistrationMobile = res.Table1[0].RegistrationMobile;
                        $scope.RegistrationNumber = res.Table1[0].RegistrationNumber;

                        $scope.modalInstance = $uibModal.open({
                            templateUrl: "/app/views/Popups/FeePaymentPopup.html",
                            size: 'xlg',
                            scope: $scope,
                            backdrop: 'static',
                            windowClass: 'modal-fit-att',
                        });
                        $scope.closeModal = function () {
                            $scope.modalInstance.close();
                        }
                    } else if (res.Table[0].StatusCode == '201') {
                        $scope.Loader2 = false;
                        $scope.registerbutton2 = false;
                        $scope.registerbutton1 = false;

                        alert(res.Table1[0].RegistrationNumber + " is Your provisional registration No for POLYCET 2023. Login and complete Application, SBTET TS");
                        $scope.Cancel();
                    } else if (res.Table[0].StatusCode == '400') {
                        $scope.loader4 = false;
                        alert(res.Table[0].StatusDescription);
                        $scope.registerbutton1 = false;
                        $scope.registerbutton2 = false;
                        $scope.Loader1 = false;
                        $scope.Loader2 = false;
                    }
                    else {
                        alert("Error while loading Data");
                    }


                },
                    function (error) {

                        $scope.DetailsFound = false;
                        alert("Error while loading Data");
                        console.log(error);
                    });
            }

            $scope.Mode = function () {
                $scope.Pay()
                if ($scope.mode == 1) {

                    $scope.billdesktable = true;
                } else if ($scope.mode == 2) {

                    $scope.twallettable = true;

                }

            }

            $scope.Proceedtopay = function () {
                var marchantid = "TSPOLYCET"; // test
                var subMarchantid = "SBTET";
                var addInfo1 = "NA";
                var addInfo3 = "";
                var addInfo4 = "NA"//$scope.loadedScheme.Scheme;t
                var addInfo5 = "NA";//Semester;
                var addInfo6 = "NA"//PaymentType;
                var addInfo7 = "NA";
                //var amount = 450;
                $localStorage.PaymentGatewayResponse = {};
                redirecturl = {
                    redirecturl: "index.PaymentResponse"
                }
                $localStorage.PaymentGatewayResponse = redirecturl;

                var location = window.location.origin;

                var amount = 1
                //PreExaminationService.RequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, $scope.challan, amount, 0, "json");
                var proceedfinePayment = PreExaminationService.getSomeValue(location + "/PaymentGateway/BulkBillResponse", $scope.challan);
                proceedfinePayment.then(function (resp) {
                    if (resp != "" && resp != undefined) {
                        // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                        var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                        //var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD";
                        //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                        window.location.replace(req);
                    }
                }, function (err) {
                    $scope.noteChallan = false;
                    $scope.secondClick = true;
                    console.log(err);
                });
            }
            function makeid(length) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < length) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }
                return result;
            }

            function getHash(input) {
                var hash = 0, len = input.length;
                for (var i = 0; i < len; i++) {
                    hash = ((hash << 5) - hash) + input.charCodeAt(i);
                    hash |= 0; // to 32bit integer
                }
                return hash;
            }


            $scope.Pay = function () {

                //   $scope.challan = getHash(makeid(5))
                var marchantid = "TSPOLYCET"; // test
                var subMarchantid = "";
                var addInfo1 = "NA";
                var addInfo2 = "NA";
                var addInfo3 = $scope.RegistrationNumber;
                var addInfo4 = "NA"//$scope.loadedScheme.Scheme;t

                //var amount = 450;
                $localStorage.PaymentGatewayResponse = {};
                redirecturl = {
                    Callbackurl: "index.PaymentResponse"
                }
                $localStorage.PaymentGatewayResponse = redirecturl;
                //  $scope.challan = "1234567";
                var callback = 'https://localhost:44355/callback'
                var location = window.location.origin;
                var amount = 2

                $scope.challan = getHash(makeid(5))
                var marchantid = "TSPOLYCET"; // test
                var subMarchantid = "";
                var addInfo1 = "NA";
                var addInfo2 = "NA";
                var addInfo3 = "11222-ec-001";
                var addInfo4 = "NA"//$scope.loadedScheme.Scheme;t

                //var amount = 450;
                $localStorage.PaymentGatewayResponse = {};
                redirecturl = {
                    Callbackurl: "index.PaymentResponse"
                }
                $localStorage.PaymentGatewayResponse = redirecturl;
                //  $scope.challan = "1234567";
                var callback = 'https://polycet.sbtet.telangana.gov.in/#!/index'
                var location = window.location.origin;
                var amount = 2

                var resss = PaymentService.getCipherRequest(callback, subMarchantid, addInfo1, addInfo3, addInfo4, $scope.challan, amount);
                //var proceedfinePayment = PreExaminationService.getSomeValue(location + "/api/PaymentGateway/BulkBillResponse", $scope.challan);
                resss.then(function (resp) {

                    console.log(resp.ResponseCode)

                    $scope.myFormData = {
                        "Data": resp.encrypted_data,
                        "Skey": resp.skey_encryption
                    }
                    if (resp != "" && resp != undefined) {
                        // var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg="
                        // var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp   // live url
                        //var req = "https://uat.billdesk.com/pgidsk/PGIMerchantPayment?msg=KALYANTEST|429|NA|2|NA|NA|NA|INR|NA|R|kalyantest|NA|NA|F|8850062965|test-developer@candere.com|187|NA|NA|NA|NA|http://127.0.0.1/candere_repo/scheme/billdesk/response|9F4E06C08698DA6338428E2A36141826468E8E31C83F3B814F831AE6D6D27CFD";
                        //   var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // test url
                        // window.location.replace(req);
                        document.getElementById("encData").value = resp.encrypted_data;
                        document.getElementById("encSKey").value = resp.skey_encryption;

                        //$scope.Data = resp.encrypted_data
                        //$scope.Skey = resp.skey_encryption
                        //  $scope.UploadData(resp.encrypted_data, resp.skey_encryption)
                        // $("#btn_submit").click()
                    }
                }, function (err) {
                    $scope.noteChallan = false;
                    $scope.secondClick = true;
                    console.log(err);
                });
            }





            //$scope.UploadData = function (Data, Skey) {
            //    console.log(Data, Skey)
            //    var myFormData = new FormData();


            //    // myFormData.append('Skey', Skey);
            //    //myFormData.append('password', password);
            //    //myFormData.append('dob', dob);
            //    //myFormData.append('email', email);
            //    //  var uploadUrl = "https://staging.transactionanalysts.com:444/TPaymentGateway/RequestHandler.aspx"
            //    console.log($scope.myFormData)
            //    $http.post('https://staging.transactionanalysts.com:444/TPaymentGateway/RequestHandler.aspx', $scope.myFormData).then(function (response) {
            //        console.log(response)
            //        // etc
            //    });
            //    //$http({


            //    //    url: "https://staging.transactionanalysts.com:444/TPaymentGateway/RequestHandler.aspx",
            //    //    data: $scope.myFormData,
            //    //    method: 'POST',
            //    //    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }

            //    //}).success(function (data) {

            //    //    console.log("OK", data)

            //    //}).error(function (err) { "ERR", console.log(err) })
            //    // };

            //    // });
            //    //$http({
            //    //    url: "https://staging.transactionanalysts.com:444/TPaymentGateway/RequestHandler.aspx",
            //    //    method: "POST",
            //    //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //    //    data: $.param($scope.myFormData)
            //    //}).success(function (data, status, headers, config) {
            //    //    $scope.status = status;
            //    //}).error(function (data, status, headers, config) {
            //    //    $scope.status = status;
            //    //});
            //    //return $http({
            //    //    url: uploadUrl,
            //    //    method: 'POST',
            //    //    data: myFormData,
            //    //   // res: response,
            //    //    //assign content-type as undefined, the browser
            //    //    //will assign the correct boundary for us
            //    //    headers: {
            //    //        'Content-Type': undefined
            //    //        //'Access-Control-Allow-Origin', '*', 'Access-Control-Allow-Headers', 'X-Requested-With'
            //    //    },
            //    //    //prevents serializing payload.  don't do it.
            //    //    transformRequest: angular.identity
            //    //});
            //    //console.log(res)
            //    //$http.post(uploadUrl, myFormData, {
            //    //    transformRequest: angular.identity,
            //    //    headers: { 'Content-Type': undefined }
            //    //})
            //    //    .success(function (res) {
            //    //        console.log(res)
            //    //    })
            //    //    .error(function () {
            //    //    });

            //    let response = await fetch(uploadUrl, {
            //        method: 'POST',
            //        body: new FormData(nonseamless)
            //    });

            //    let result = await response.json();

            //    alert(result.message);
            //}

        

    });
});