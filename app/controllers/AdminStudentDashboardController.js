define(['app'], function (app) {
    app.controller("AdminStudentDashboardController", function ($scope, $localStorage, SystemUserService, StudentRegistrationService, AdminService, AppSettings, $state, $uibModal, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        $scope.SessionID = authData.SessionID;
        $scope.RegistrationId = authData.RegistrationID;
        $scope.UserID = authData.UserID;
        $scope.UserName = authData.UserName;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.submitbutton = false;
            $scope.getFeeData();
            $scope.FeePayment = true;
            $scope.Tabs = true;
            $scope.PhoneNo = true;
            $scope.Class = true;
            $scope.CASTECATEGORYFOUND = false;
            $scope.CASTECERTNUMBERFOUND = false;
            $scope.EWSNUMBERFOUND = false;
            $scope.AADHARFOUND = false;
            $scope.SSCBUTTONCLICK = false;
            $scope.getStates();
            $scope.getPreference1Districts();
            $scope.getCasteCategory();
            $scope.getRegions();
            $scope.getMinorities();
            $scope.getQualifiedExams();
            $scope.ThirdCard = true;
            $scope.PreviewDisable = true;
            //$scope.StudentPhoto1 = false;
            //$scope.StudentSign1 = false;

            $scope.getTenthYears();
            $scope.getStudentApplicationData();
            $scope.getStudentDetails();

            $scope.RegionID = 1;
            $scope.Assistance_Urdu = "false";
            $scope.qualifiedExamID = 1;
            $scope.MinorityID = 1;
            $scope.State = 1;
            $scope.State1 = 1;
            $scope.State2 = 1;
            $scope.State3 = 1;
            $scope.State4 = 1;
            $scope.State5 = 1;
            $scope.State6 = 1;
            $scope.State7 = 1;
            $scope.State8 = 1;
            $scope.State9 = 1;
            $scope.State10 = 1;

            $scope.getAddressDistricts(1);
            $scope.getClass1Districts(1);
            $scope.getClass2Districts(1);
            $scope.getClass3Districts(1);
            $scope.getClass4Districts(1);
            $scope.getClass5Districts(1);
            $scope.getClass6Districts(1);
            $scope.getClass7Districts(1);
            $scope.getClass8Districts(1);
            $scope.getClass9Districts(1);
            $scope.getClass10Districts(1);




            $scope.Handicaped = "false";
            $scope.NCC = "false";
            $scope.Sports = "false";
            $scope.CAP = "false";
            $scope.PMCares = "false";
            $scope.AppearforBiology = "false";



        }




        if (authData == undefined) {
            $state.go('index.Login');

        }
        else {
        }
        $scope.getTenthYears = function () {
            var tenthyr = AdminService.GetTenthYears();
            tenthyr.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.TenthYearData = res.Table;
                }
                else {
                    $scope.TenthYearData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }

        $scope.getFeeData = function () {
            var feedata = AdminService.GetStudentFeeData($scope.RegistrationId);
            feedata.then(function (response) {

                var res = JSON.parse(response);
                $scope.StudentData = res.Table[0];
                $scope.RegistrationNumber = $scope.StudentData.RegistrationNumber
                $scope.CasteCategoryID = res.Table[0].CasteCategoryID
                $scope.CasteVerifyStatus = res.Table[0].CasteVerified
                //if ($scope.CasteCategoryID == 7 || $scope.CasteCategoryID == 8) {
                //    $scope.CasteVerifyStatus = true;
                //}
                $scope.getDashboardStatus($scope.RegistrationNumber);
            }, function (error) {

            });
        }


        $scope.getDashboardStatus = function (RegistrationNumber) {
            $scope.RegistrationNumber = RegistrationNumber;
            var getdashboardstatus = AdminService.GetDashboardStatus($scope.RegistrationId);
            getdashboardstatus.then(function (response) {

                var res = JSON.parse(response)
                $scope.FeePaymentStatus = res.Table[0].HeaderStatus
                $scope.PersonalStatus = res.Table1[0].HeaderStatus
                $scope.CommunicationStatus = res.Table2[0].HeaderStatus
                $scope.CategoryStatus = res.Table3[0].HeaderStatus
                $scope.SpecialCategoryStatus = res.Table4[0].HeaderStatus
                $scope.StudyStatus = res.Table5[0].HeaderStatus
                $scope.PhotoStatus = res.Table6[0].HeaderStatus
                $scope.PreviewStatus = res.Table7[0].HeaderStatus
                $scope.HtStatus = res.Table8[0].HeaderStatus
                $scope.HallticketGenerated = $scope.HtStatus
                
                if ($scope.PreviewStatus == 0) {
                    $scope.personaltab = true;
                    $scope.nextbutton = true;
                    $scope.communicationtab = true;
                    $scope.categorytab = true;
                    $scope.specialcategorytab = true;
                    $scope.studydetailstab = true;
                    $scope.photosigntab = true;
                    $scope.previewtab = true;
                    $scope.halltickettab = true;
                    $scope.submitbutton = true;
                    $scope.printbutton = false;
                    $scope.modifybutton = true;
                    $scope.submitlabel = true;
                    $scope.feetab = true;
                }
                else if ($scope.PreviewStatus == 1 && $scope.HallticketGenerated == 0) {
                    $scope.personaltab = true;
                    $scope.nextbutton = true;
                    $scope.communicationtab = true;
                    $scope.categorytab = true;
                    $scope.specialcategorytab = true;
                    $scope.studydetailstab = true;
                    $scope.photosigntab = true;
                    $scope.previewtab = true;
                    $scope.halltickettab = true;
                    $scope.printprebutton = true;
                    $scope.modifybutton = true;
                    $scope.submitlabel = true;
                    $scope.feetab = true;
                }
                else if ($scope.HallticketGenerated == '1') {
                    $scope.personaltab = true;
                    $scope.nextbutton = true;
                    $scope.communicationtab = true;
                    $scope.categorytab = true;
                    $scope.specialcategorytab = true;
                    $scope.studydetailstab = true;
                    $scope.photosigntab = true;
                    $scope.previewtab = true;
                    $scope.halltickettab = true;
                    $scope.printhtbutton = true;
                    $scope.printprebutton = true;
                    $scope.modifybutton = true;
                    $scope.submitlabel = true;
                    $scope.feetab = true;
                    $scope.getHallticket($scope.RegistrationNumber);

                }

            });
        }

        $scope.getHallticket = function (RegistrationNumber) {
            $scope.RegistrationNumber = RegistrationNumber;
            var Type = 9;
            if (Type == 9) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1 && $scope.PreviewStatus == 1 && $scope.FeePaymentStatus == 1) {
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "active";
                }
            }
            else if ($scope.FeePaymentStatus == 0) {
                alert("Please Pay the Registration Fee")
            }
            if ($scope.Assistance_Urdu == 'false') {
                var RegistrationID = $scope.RegistrationId;
                var DataType = 1

            } else if ($scope.Assistance_Urdu == 'true') {
                var RegistrationID = $scope.RegistrationId;
                var DataType = 2
            }
            var getdetails = AdminService.GetHallticketByRegistrationId(RegistrationID, $scope.RegistrationNumber, DataType);
            getdetails.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                    if (res.Table[0].StatusCode == 200) {
                        $scope.HallticketPolycetYear = res.Table1[0].PolycetYear
                        $scope.HallticketCentreCode = res.Table1[0].CentreCode
                        $scope.HallticketCentreName = res.Table1[0].CentreName
                        $scope.HallticketExamDate = res.Table1[0].ExamDate
                        $scope.HallticketHallticketNumber = res.Table1[0].HallticketNumber
                        $scope.HallticketPolycetYear = res.Table1[0].PolycetYear
                        $scope.HallticketAadharNumber = res.Table2[0].AadharNumber
                        $scope.HallticketCasteCategoryName = res.Table2[0].CasteCategoryName
                        $scope.HallticketRegistrationNumber = res.Table2[0].RegistrationNumber
                        $scope.HallticketStudentAddress = res.Table2[0].StudentAddress
                        $scope.HallticketStudentName = res.Table2[0].StudentName
                        $scope.HallticketFatherName = res.Table2[0].FatherName
                        $scope.HallticketTenthHallticketNumber = res.Table2[0].TenthHallticketNumber
                        $scope.HallticketAadharNumber = res.Table2[0].AadharNumber
                        $scope.HallticketmaskedAadhaar = $scope.HallticketAadharNumber.slice(0, 8).replace(/[0-9]/g, "X") + $scope.HallticketAadharNumber.slice(-4);
                        $scope.HallticketChallanNumber = res.Table3[0].ChallanNumber
                        $scope.HallticketRegistrationAmount = res.Table3[0].RegistrationAmount
                        $scope.Halltickettxndate = res.Table3[0].txndate
                        $scope.HallticketStudentPhoto = res.Table4[0].StudentPhoto
                        $scope.HallticketStudentSignature = res.Table4[0].StudentSignature

                        $scope.getDashboardStatus();
                     

                    } if (res.Table[0].StatusCode == 400) {
                        alert(res.Table[0].StatusDescription)
                        $scope.Preference1District = null;
                        $scope.Preference1MandalsData = [];
                        $scope.Preference2DistrictsData = [];
                        $scope.Preference2MandalsData = [];
                        $scope.Preference3DistrictsData = [];
                        $scope.Preference3MandalsData = [];
                    }
                }
                catch (err) { }

                if (res.Table.length > 0) {


                }
                else {
                    $scope.DistrictsData5 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }

        $scope.uploadStudentPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 50000 && fileSize >= 5000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhotoImg').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.StudentPhoto = base64Image;
                            $scope.StudentPhotoConvert = $scope.StudentPhoto.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 5000) {
                alert("file size should not be less than 5KB");
                $('#stdPhotoFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("file size should not be greater than 50KB");
                $('#stdPhotoFile').val('');
                return;
            } else {
                alert("file size should be between 5KB and 50KB");
                $('#stdPhotoFile').val('');
                return;
            }
        }




        $scope.toDataURL = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }


        $scope.uploadStudentSign = function () {
            var input = document.getElementById("stdSignFile");
            var fileSize = input.files[0].size;

            if (fileSize <= 30000 && fileSize >= 3000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdSignImg').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.StudentSign = base64Image;
                            $scope.StudentSignConvert = $scope.StudentSign.replace(/^data:image\/[a-z]+;base64,/, "");

                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            } else if (fileSize <= 5000) {
                alert("file size should not be less than 3KB");
                $('#stdSignFile').val('');
                return;
            } else if (fileSize >= 50000) {
                alert("file size should not be greater than 30KB");
                $('#stdSignFile').val('');
                return;
            } else {
                alert("file size should be between 3KB and 30KB");
                $('#stdSignFile').val('');
                return;
            }
        }


        $scope.class0 = "active";
        $scope.class1 = "";
        $scope.class2 = "";
        $scope.class3 = "";
        $scope.class4 = "";
        $scope.class5 = "";
        $scope.class6 = "";
        $scope.class7 = "";
        $scope.class8 = "";
        $scope.class9 = "";

        $scope.BackTab = function (Type) {
            if (Type == 0) {
                $scope.class0 = "active";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            }
            else if (Type == 1) {
                $scope.class0 = "";
                $scope.class1 = "active";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 2) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "active";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 3) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "active";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 4) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "active";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 5) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "active";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 6) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "active";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";
            } else if (Type == 7) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "active";
                $scope.class8 = "";
                $scope.class9 = "";
            }
            else if (Type == 8) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1) {
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "active";
                    $scope.class9 = "";
                } else {
                    alert("Please Fill All Details for Preview")
                }

            }
            else if (Type == 9) {
                if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus === 1 && $scope.PhotoStatus == 1 && $scope.PreviewStatus == 1 && $scope.FeePaymentStatus == 1) {
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "active";


                }
                else if ($scope.FeePaymentStatus == 0) {
                    alert("Please Pay the Registration Fee")
                }
                else {
                    alert('Please Submit the Application')
                }
            }

        }

        $scope.NextTab = function (Type) {
            if (Type == 0) {
                $scope.class0 = "";
                $scope.class1 = "active";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                $scope.class9 = "";

            } else if (Type == 'PersonalDetails') {

                $scope.savePersonalDetails();
            } else if (Type == 'CommunicationDetails') {

                $scope.saveCommunicationDetails();


            } else if (Type == 'CategoryDetails') {

                $scope.saveCategoryDetails();

            } else if (Type == 'SpecialCategoryDetails') {
                $scope.saveSpecialCategoryDetails();
            } else if (Type == 'StudyDetails') {
                $scope.saveStudyDetails();

            } else if (Type == 'PhotoSignatureDetails') {
                $scope.savePhotoSignatureDetails();

            } else if (Type == 7) {
                $scope.class0 = "";
                $scope.class1 = "";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "active";

            }

        }

        //$scope.DOB_DATE = moment().format('DD-MM-YYYY');
        //$scope.ChangeDob = function () {
        //    $scope.DOB_DATE = moment($scope.DOB_DATE).format("DD/MM/YYYY");
        //}

        $scope.checkDate = function (DOB_DATE) {
            var currentDate = new Date();
            if ($scope.PersonalDetails != undefined) {
                var birthdate = new Date(DOB_DATE);
                if (birthdate > currentDate) {
                    alert('Selected Date Should not be Future!')
                    $scope.DOB_DATE = $scope.PersonalDetails.DateofBirth;
                    return;
                } else {
                    $scope.DOB_DATE = moment(DOB_DATE).format("DD/MM/YYYY");
                }
            }
            else if ($scope.PersonalDetails == undefined) {
                var birthdate = new Date(DOB_DATE);
                if (birthdate > currentDate) {
                    alert('Selected Date Should not be Future!')
                    $scope.DOB_DATE = null;
                    return;
                } else {
                    $scope.DOB_DATE = moment(DOB_DATE).format("DD/MM/YYYY");
                }
            }

        };


        $scope.ChangeEwsCategory = function (EwsCertificate) {
            if (EwsCertificate == false) {
                $scope.EWSBUTTON = false;
                $scope.EWSCERTNUMBER = false;
                $scope.EWSNumber = "";
                $scope.EWSNotVerified = false;
                $scope.CasteNotVerified = false;
            }
            else {
                $scope.EWSBUTTON = true;
                $scope.EWSCERTNUMBER = true;
                $scope.EWSNumber = '';
            }
        }

        $scope.savePersonalDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.qualifiedExamID == null || $scope.qualifiedExamID == undefined || $scope.qualifiedExamID == "") {
                alert("Please Select Qualified Exam");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.sscHallticket == null || $scope.sscHallticket == undefined || $scope.sscHallticket == "") {
                alert("Please Enter Hallticket Number");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.passedoutYear == null || $scope.passedoutYear == undefined || $scope.passedoutYear == "") {
                alert("Please Enter Passedout Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.sscType == null || $scope.sscType == undefined || $scope.sscType == "") {
                alert("Please Select SSC Type");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.CNAME == null || $scope.CNAME == undefined || $scope.CNAME == "") {
                alert("Please Enter Student Name");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.FNAME == null || $scope.FNAME == undefined || $scope.FNAME == "") {
                alert("Please Enter Father Name");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == "") {
                alert("Please Enter Mother Name");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.DOB_DATE == null || $scope.DOB_DATE == undefined || $scope.DOB_DATE == "") {
                alert("Please Select DateofBirth");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.Gender == null || $scope.Gender == undefined || $scope.Gender == "") {
                alert("Please Select Gender");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.SSCVerified == true) {
                var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
                const regex = '^(?:(?:31(\-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\-)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$'
                if ($scope.DOB_DATE != null && $scope.DOB_DATE !== undefined) {
                    //var datechange = moment($scope.DOB_DATE).format("DD/MM/YYYY");
                    var datechange = $scope.DOB_DATE;
                    if (datechange == null || datechange == undefined || datechange == "" || datechange == "Invalid date") {
                        $scope.DOB_DATE = $scope.DOB_DATE;
                    }
                    //else {
                    //    var d = datechange.slice(0, 10).split('/');
                    //    var d = datechange.slice(0, 10).split('-');
                    //    if (d[2].length === 4) {
                    //        $scope.DOB_DATE = d[0] + "/" + d[1] + "/" + d[2];
                    //        //$scope.DOB_DATE = d[0] + "-" + d[1] + "-" + d[2];
                    //    }
                    //}
                    $scope.DOB_DATE = $scope.DOB_DATE;
                    $scope.DOB_TEXT = $scope.DOB_TEXT;
                    $scope.tabsbutton = false;
                }
            }
            else {
                var reg = "[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}";
                const regex = '^(?:(?:31(\-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\-)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$'
                if ($scope.DOB_DATE != null && $scope.DOB_DATE !== undefined) {
                    //var datechange = moment($scope.DOB_DATE).format("DD/MM/YYYY");
                    var datechange = $scope.DOB_DATE;
                    if (datechange == null || datechange == undefined || datechange == "" || datechange == "Invalid date") {
                        $scope.DOB_DATE = $scope.DOB_DATE;
                    } else {
                        var d = datechange.slice(0, 10).split('/');
                        if (d[2].length === 4) {
                            $scope.DOB_DATE = d[0] + "/" + d[1] + "/" + d[2];
                        }
                    }
                }
                $scope.DOB_TEXT = '';
                $scope.tabsbutton = false;
            }
            let SSCHallTicket = ($scope.sscHallticket == null || $scope.sscHallticket == undefined || $scope.sscHallticket == '') ? '' : $scope.sscHallticket;
            let PassedOutYear = ($scope.passedoutYear == null || $scope.passedoutYear == undefined || $scope.passedoutYear == '') ? '' : $scope.passedoutYear;
            let SscType = ($scope.sscType == null || $scope.sscType == undefined || $scope.sscType == '') ? '' : $scope.sscType;
            let StudentName = ($scope.CNAME == null || $scope.CNAME == undefined || $scope.CNAME == '') ? '' : $scope.CNAME;
            let FatherName = ($scope.FNAME == null || $scope.FNAME == undefined || $scope.FNAME == '') ? '' : $scope.FNAME;
            let MotherName = ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == '') ? '' : $scope.MNAME;
            let DateofBirth = ($scope.DOB_DATE == null || $scope.DOB_DATE == undefined || $scope.DOB_DATE == '') ? '' : $scope.DOB_DATE;
            let Gender = ($scope.Gender == null || $scope.Gender == undefined || $scope.Gender == '') ? '' : $scope.Gender;
            let isSSCVerified = ($scope.SSCVerified == null || $scope.SSCVerified == undefined || $scope.SSCVerified == '') ? false : true;
            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.UserName,
                "QualifiedExamID": $scope.qualifiedExamID,
                "TenthHallticketNumber": SSCHallTicket,
                "TenthYear": PassedOutYear,
                "ExaminationType": SscType,
                "StudentName": StudentName,
                "FatherName": FatherName,
                "MotherName": MotherName,
                "DateofBirth": DateofBirth,
                "Gender": Gender,
                "SSCVerified": isSSCVerified,
                "DateofBirthText": $scope.DOB_TEXT

            }
            $scope.tabsbutton = true;
            $scope.loader1 = true;
            var savepersonaldetails = AdminService.AddStudentPersonalDetails(paramObj);
            savepersonaldetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loader1 = false;
                    $scope.tabsbutton = false;
                    alert(res[0].StatusDescription);
                    $scope.getDashboardStatus();
                    $scope.getStudentDetails();
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "active";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    //$scope.loading = false;




                } else if (res[0].StatusCode == '400') {
                    $scope.loader1 = false;
                    $scope.tabsbutton = false;
                    $scope.getDashboardStatus()
                    alert(res[0].StatusDescription);
                    $scope.getStudentDetails();




                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.saveCommunicationDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.MobileNumber == null || $scope.MobileNumber == undefined || $scope.MobileNumber == "") {
                alert("Please Enter MobileNumber");
                $scope.tabsbutton = false;
                return;
            }
            //if ($scope.AltMobileNumber == null || $scope.AltMobileNumber == undefined || $scope.AltMobileNumber == "") {
            //    alert("Please Enter Alternate MobileNumber");
            //    return;
            //}
            if ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == "") {
                alert("Please Enter House Number / Building Name");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == "") {
                alert("Please Enter Street Number / Name");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.Village == null || $scope.Village == undefined || $scope.Village == "") {
                alert("Please Enter Village / Town / City");
                $scope.tabsbutton = false;
                return;
            }

            //if ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == "") {
            //    alert("Please Enter Landmark");
            //    return;
            //}

            //if ($scope.Pincode == null || $scope.Pincode == undefined || $scope.Pincode == "") {
            //    alert("Please Enter Pincode");
            //    return;
            //}
            if ($scope.State == null || $scope.State == undefined || $scope.State == "") {
                alert("Please Select State");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.State == 1) {
                if ($scope.District == null || $scope.District == undefined || $scope.District == "") {
                    alert("Please Select District");
                    $scope.tabsbutton = false;
                    return;
                }
                if ($scope.Mandal == null || $scope.Mandal == undefined || $scope.Mandal == "") {
                    alert("Please Select Mandal");
                    $scope.tabsbutton = false;
                    return;
                }
            }
            else if ($scope.State == 2 || $scope.State == 3) {
                if ($scope.DistrictName == null || $scope.DistrictName == undefined || $scope.DistrictName == "") {
                    alert("Please Enter District Name");
                    $scope.tabsbutton = false;
                    return;
                }
                if ($scope.MandalName == null || $scope.MandalName == undefined || $scope.MandalName == "") {
                    alert("Please Enter Mandal Name");
                    $scope.tabsbutton = false;
                    return;
                }
            }
            let MobileNumber = ($scope.MobileNumber == null || $scope.MobileNumber == undefined || $scope.MobileNumber == '') ? '' : $scope.MobileNumber;
            let AlternateMobile = ($scope.AltMobileNumber == null || $scope.AltMobileNumber == undefined || $scope.AltMobileNumber == '') ? '' : $scope.AltMobileNumber;
            let Email = ($scope.Email == null || $scope.Email == undefined || $scope.Email == '') ? '' : $scope.Email;
            let HouseNo = ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == '') ? '' : $scope.HouseNo;
            let StreetNo = ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == '') ? '' : $scope.StreetNo;
            let Locality = ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == '') ? '' : $scope.Locality;
            let Landmark = ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == '') ? '' : $scope.Landmark;
            let Village = ($scope.Village == null || $scope.Village == undefined || $scope.Village == '') ? '' : $scope.Village;
            let Districtname = ($scope.DistrictName == null || $scope.DistrictName == undefined || $scope.DistrictName == '') ? '' : $scope.DistrictName;
            let MandalName = ($scope.MandalName == null || $scope.MandalName == undefined || $scope.MandalName == '') ? '' : $scope.MandalName;
            let DistrictID = ($scope.District == null || $scope.District == undefined || $scope.District == '') ? '' : $scope.District;
            let MandalID = ($scope.Mandal == null || $scope.Mandal == undefined || $scope.Mandal == '') ? '' : $scope.Mandal;
            let Pincode = ($scope.Pincode == null || $scope.Pincode == undefined || $scope.Pincode == '') ? '' : $scope.Pincode;



            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.UserName,
                "MobileNumber": MobileNumber,
                "AlternateMobileNumber": AlternateMobile,
                "Email": Email,
                "HouseNumber": HouseNo,
                "StreetName": StreetNo,
                "Locality": Locality,
                "Landmark": Landmark,
                "Village": Village,
                "StateID": $scope.State,
                "DistrictID": DistrictID,
                "DistrictName": Districtname,
                "MandalID": MandalID,
                "MandalName": MandalName,
                "Pincode": Pincode,

            }
            $scope.tabsbutton = true;
            $scope.loader2 = true;
            var savecommunicationdetails = AdminService.AddStudentCommunicationDetails(paramObj);
            savecommunicationdetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.tabsbutton = false;
                    $scope.loader2 = false;
                    alert(res[0].StatusDescription);
                    $scope.getDashboardStatus()
                    $scope.getStudentDetails();
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "active";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    //$scope.loading = false;




                } else if (res[0].StatusCode == '400') {
                    $scope.tabsbutton = false;
                    $scope.loader2 = false;
                    $scope.getStudentDetails();
                    $scope.getDashboardStatus()
                    $scope.loading = false;
                    alert(res[0].StatusDescription);



                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }



        $scope.saveCategoryDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.CasteCategory == null || $scope.CasteCategory == undefined || $scope.CasteCategory == "") {
                alert("Please Select Category");
                $scope.tabsbutton = false;
                return;
            }

            //if ($scope.Aadhaar == null || $scope.Aadhaar == undefined || $scope.Aadhaar == "") {
            //    alert("Please Enter Aadhaar Number");
            //    return;
            //}

            //if ($scope.CasteCertificateNumber == null || $scope.CasteCertificateNumber == undefined || $scope.CasteCertificateNumber == "") {
            //    alert("Please Enter Caste Certificate Number");
            //    return;
            //}

            if ($scope.EwsCertificate == true && $scope.EWSVerified == false && $scope.EWSNotVerified == false) {
                alert("Please Verify EWS Status");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.CasteCategory != 1 && $scope.CasteVerified == false && $scope.CasteNotVerified == false) {
                alert("Please Verify Caste Status");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.CasteCategory == 1) {
                if ($scope.EwsCertificate != false && $scope.EwsCertificate != true) {
                    alert("Please Select EWS Category");
                    $scope.tabsbutton = false;
                    return;
                }
            }

            if ($scope.EwsCertificate == 1) {
                if ($scope.EWSNumber == null || $scope.EWSNumber == undefined || $scope.EWSNumber == "") {
                    alert("Please Enter EWS Number");
                    $scope.tabsbutton = false;
                    return;
                }
            }
            let Aadhaar = ($scope.Aadhaar == null || $scope.Aadhaar == undefined || $scope.Aadhaar == '') ? '' : $scope.Aadhaar;
            let CasteCategory = ($scope.CasteCategory == null || $scope.CasteCategory == undefined || $scope.CasteCategory == '') ? '' : $scope.CasteCategory;
            let CasteCertificateNumber = ($scope.CasteCertificateNumber == null || $scope.CasteCertificateNumber == undefined || $scope.CasteCertificateNumber == '') ? '' : $scope.CasteCertificateNumber;
            let CasteVerified = ($scope.CasteVerified == null || $scope.CasteVerified == undefined || $scope.CasteVerified == '') ? '' : $scope.CasteVerified;
            let EwsCertificate = ($scope.EwsCertificate == null || $scope.EwsCertificate == undefined || $scope.EwsCertificate == '') ? '' : $scope.EwsCertificate;
            let EWSNumber = ($scope.EWSNumber == null || $scope.EWSNumber == undefined || $scope.EWSNumber == '') ? '' : $scope.EWSNumber;
            let EWSVerified = ($scope.EWSVerified == null || $scope.EWSVerified == undefined || $scope.EWSVerified == '') ? '' : $scope.EWSVerified;

            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.UserName,
                "CasteCategoryID": CasteCategory,
                "AadharNumber": Aadhaar,
                "CasteCertificateNumber": CasteCertificateNumber,
                "CasteVerified": CasteVerified,
                "EWS": EwsCertificate,
                "EWSNumber": EWSNumber,
                "EWSVerified": EWSVerified,

            }
            $scope.tabsbutton = true;
            $scope.loader3 = true;
            var savecategorydetails = AdminService.AddStudentCategoryDetails(paramObj);
            savecategorydetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.tabsbutton = false;
                    $scope.loader3 = false;
                    alert(res[0].StatusDescription);

                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "active";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    //$scope.loading = false;
                    //$scope.getStudentFeeData();
                    var captcha = AdminService.GetStudentFeeData($scope.RegistrationId);
                    captcha.then(function (response) {

                        var res = JSON.parse(response);
                        $scope.StudentData = res.Table[0];
                        $scope.RegistrationNumber = res.Table[0].UserName
                        $scope.CasteCategoryID = res.Table[0].CasteCategoryID
                        $scope.CasteVerifyStatus = res.Table[0].CasteVerified
                        //if ($scope.CasteCategoryID == 7 || $scope.CasteCategoryID == 8) {
                        //    $scope.CasteVerifyStatus = true;
                        //}

                    }, function (error) {

                    });
                    $scope.getStudentDetails();
                    $scope.getDashboardStatus();


                } else if (res[0].StatusCode == '400') {
                    $scope.tabsbutton = false;
                    $scope.loader3 = false;
                    $scope.CasteNotVerified = false;
                    $scope.getDashboardStatus();
                    //$scope.getStudentFeeData();
                    var captcha = AdminService.GetStudentFeeData($scope.RegistrationId);
                    captcha.then(function (response) {

                        var res = JSON.parse(response);
                        $scope.StudentData = res.Table[0];
                        $scope.RegistrationNumber = res.Table[0].UserName
                        $scope.CasteCategoryID = res.Table[0].CasteCategoryID
                        $scope.CasteVerifyStatus = res.Table[0].CasteVerified
                        //if ($scope.CasteCategoryID == 7 || $scope.CasteCategoryID == 8) {
                        //    $scope.CasteVerifyStatus = true;
                        //}


                    }, function (error) {

                    });
                    alert(res[0].StatusDescription);

                    if ($scope.RegistrationCasteVerified == 1) {
                        $scope.CasteCategoryFound = true;
                        $scope.AadharFound = true;
                        $scope.CasteCertificateNumberFound = true;
                        $scope.CasteNotVerified = false;
                        $scope.CasteVerified = true;
                        $scope.CasteVerifyButton = false;
                    }
                    else {
                        $scope.CasteCategoryFound = false;
                        $scope.AadharFound = false;
                        $scope.CasteCertificateNumberFound = false;
                        $scope.CasteNotVerified = true;
                        $scope.CasteVerified = false;
                        $scope.CasteVerifyButton = true;
                    }

                    //$scope.getStudentDetails();




                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        


        $scope.saveSpecialCategoryDetails = function () {

            $scope.tabsbutton = true;
            if ($scope.RegionID == null || $scope.RegionID == undefined || $scope.RegionID == "") {
                alert("Please Select Region");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.MinorityID == null || $scope.MinorityID == undefined || $scope.MinorityID == "") {
                alert("Please Select Minority");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.Assistance_Urdu == null || $scope.Assistance_Urdu == undefined || $scope.Assistance_Urdu == "") {
                alert("Please Select Assistance in Urdu");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.Handicaped == null || $scope.Handicaped == undefined || $scope.Handicaped == "") {
                alert("Please Select Physically Handicaped");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.NCC == null || $scope.NCC == undefined || $scope.NCC == "") {
                alert("Please Select NCC");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.Sports == null || $scope.Sports == undefined || $scope.Sports == "") {
                alert("Please Select Sports");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.CAP == null || $scope.CAP == undefined || $scope.CAP == "") {
                alert("Please Select CAP");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.PMCares == null || $scope.PMCares == undefined || $scope.PMCares == "") {
                alert("Please Select PM Cares");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.AppearforBiology == null || $scope.AppearforBiology == undefined || $scope.AppearforBiology == "") {
                alert("Please Select Appear for Biology");
                $scope.tabsbutton = false;
                return;
            }

            let Region = ($scope.RegionID == null || $scope.RegionID == undefined || $scope.RegionID == '') ? '' : $scope.RegionID;
            let Minority = ($scope.MinorityID == null || $scope.MinorityID == undefined || $scope.MinorityID == '') ? '' : $scope.MinorityID;
            let Assistance_Urdu = ($scope.Assistance_Urdu == null || $scope.Assistance_Urdu == undefined || $scope.Assistance_Urdu == '') ? '' : $scope.Assistance_Urdu;
            let Handicaped = ($scope.Handicaped == null || $scope.Handicaped == undefined || $scope.Handicaped == '') ? '' : $scope.Handicaped;
            let NCC = ($scope.NCC == null || $scope.NCC == undefined || $scope.NCC == '') ? '' : $scope.NCC;
            let Sports = ($scope.Sports == null || $scope.Sports == undefined || $scope.Sports == '') ? '' : $scope.Sports;
            let CAP = ($scope.CAP == null || $scope.CAP == undefined || $scope.CAP == '') ? '' : $scope.CAP;
            let PMCares = ($scope.PMCares == null || $scope.PMCares == undefined || $scope.PMCares == '') ? '' : $scope.PMCares;
            let AppearforBiology = ($scope.AppearforBiology == null || $scope.AppearforBiology == undefined || $scope.AppearforBiology == '') ? '' : $scope.AppearforBiology;

            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.UserName,
                "RegionID": Region,
                "MinorityID": Minority,
                "AssistanceinUrdu": Assistance_Urdu,
                "PH": Handicaped,
                "NCC": NCC,
                "SportsAndGames": Sports,
                "CAP": CAP,
                "PMCares": PMCares,
                "AppearedForBiology": AppearforBiology,

            }
            $scope.tabsbutton = true;
            $scope.loader4 = true;
            var savespecialcategorydetails = AdminService.AddStudentSpecialCategoryDetails(paramObj);
            savespecialcategorydetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loader4 = false;
                    $scope.tabsbutton = false;
                    alert(res[0].StatusDescription);
                    $scope.getDashboardStatus()
                    $scope.getStudentDetails();
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "active";
                    $scope.class7 = "";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    //$scope.loading = false;




                } else if (res[0].StatusCode == '400') {
                    $scope.loader4 = false;
                    $scope.tabsbutton = false;
                    $scope.getDashboardStatus()
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.getStudentDetails();




                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.saveStudyDetails = function () {

            $scope.tabsbutton = true;
            if ($scope.YEAR1 == null || $scope.YEAR1 == undefined || $scope.YEAR1 == "") {
                alert("Please Enter Class1 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State1 == null || $scope.State1 == undefined || $scope.State1 == "") {
                alert("Please Select Class1 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District1 == null || $scope.District1 == undefined || $scope.District1 == "") {
                alert("Please Select Class1 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE1 == null || $scope.PLACE1 == undefined || $scope.PLACE1 == "") {
                alert("Please Enter Class1 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR2 == null || $scope.YEAR2 == undefined || $scope.YEAR2 == "") {
                alert("Please Enter Class2 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State2 == null || $scope.State2 == undefined || $scope.State2 == "") {
                alert("Please Select Class2 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District2 == null || $scope.District2 == undefined || $scope.District2 == "") {
                alert("Please Select Class2 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE2 == null || $scope.PLACE2 == undefined || $scope.PLACE2 == "") {
                alert("Please Enter Class2 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR3 == null || $scope.YEAR3 == undefined || $scope.YEAR3 == "") {
                alert("Please Enter Class3 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State3 == null || $scope.State3 == undefined || $scope.State3 == "") {
                alert("Please Select Class3 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District3 == null || $scope.District3 == undefined || $scope.District3 == "") {
                alert("Please Select Class3 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE3 == null || $scope.PLACE3 == undefined || $scope.PLACE3 == "") {
                alert("Please Enter Class3 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR4 == null || $scope.YEAR4 == undefined || $scope.YEAR4 == "") {
                alert("Please Enter Class4 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State4 == null || $scope.State4 == undefined || $scope.State4 == "") {
                alert("Please Select Class4 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District4 == null || $scope.District4 == undefined || $scope.District4 == "") {
                alert("Please Select Class4 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE4 == null || $scope.PLACE4 == undefined || $scope.PLACE4 == "") {
                alert("Please Enter Class4 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR5 == null || $scope.YEAR5 == undefined || $scope.YEAR5 == "") {
                alert("Please Enter Class5 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State5 == null || $scope.State5 == undefined || $scope.State5 == "") {
                alert("Please Select Class5 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District5 == null || $scope.District5 == undefined || $scope.District5 == "") {
                alert("Please Select Class5 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE5 == null || $scope.PLACE5 == undefined || $scope.PLACE5 == "") {
                alert("Please Enter Class5 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR6 == null || $scope.YEAR6 == undefined || $scope.YEAR6 == "") {
                alert("Please Enter Class6 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State6 == null || $scope.State6 == undefined || $scope.State6 == "") {
                alert("Please Select Class6 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District6 == null || $scope.District6 == undefined || $scope.District6 == "") {
                alert("Please Select Class6 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE6 == null || $scope.PLACE6 == undefined || $scope.PLACE6 == "") {
                alert("Please Enter Class6 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR7 == null || $scope.YEAR7 == undefined || $scope.YEAR7 == "") {
                alert("Please Enter Class7 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State7 == null || $scope.State7 == undefined || $scope.State7 == "") {
                alert("Please Select Class7 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District7 == null || $scope.District7 == undefined || $scope.District7 == "") {
                alert("Please Select Class7 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE7 == null || $scope.PLACE7 == undefined || $scope.PLACE7 == "") {
                alert("Please Enter Class7 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR8 == null || $scope.YEAR8 == undefined || $scope.YEAR8 == "") {
                alert("Please Enter Class8 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State8 == null || $scope.State8 == undefined || $scope.State8 == "") {
                alert("Please Select Class8 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District8 == null || $scope.District8 == undefined || $scope.District8 == "") {
                alert("Please Select Class8 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE8 == null || $scope.PLACE8 == undefined || $scope.PLACE8 == "") {
                alert("Please Enter Class8 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR9 == null || $scope.YEAR9 == undefined || $scope.YEAR9 == "") {
                alert("Please Enter Class9 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State9 == null || $scope.State9 == undefined || $scope.State9 == "") {
                alert("Please Select Class9 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District9 == null || $scope.District9 == undefined || $scope.District9 == "") {
                alert("Please Select Class9 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE9 == null || $scope.PLACE9 == undefined || $scope.PLACE9 == "") {
                alert("Please Enter Class9 Place");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.YEAR10 == null || $scope.YEAR10 == undefined || $scope.YEAR10 == "") {
                alert("Please Enter Class10 Passed Year");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.State10 == null || $scope.State10 == undefined || $scope.State10 == "") {
                alert("Please Select Class10 State");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.District10 == null || $scope.District10 == undefined || $scope.District10 == "") {
                alert("Please Select Class10 District");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.PLACE10 == null || $scope.PLACE10 == undefined || $scope.PLACE10 == "") {
                alert("Please Enter Class10 Place");
                $scope.tabsbutton = false;
                return;
            }

            let YEAR1 = ($scope.YEAR1 == null || $scope.YEAR1 == undefined || $scope.YEAR1 == '') ? '' : $scope.YEAR1;
            let State1 = ($scope.State1 == null || $scope.State1 == undefined || $scope.State1 == '') ? '' : $scope.State1;
            let District1 = ($scope.District1 == null || $scope.District1 == undefined || $scope.District1 == '') ? '' : $scope.District1;
            let PLACE1 = ($scope.PLACE1 == null || $scope.PLACE1 == undefined || $scope.PLACE1 == '') ? '' : $scope.PLACE1;
            let YEAR2 = ($scope.YEAR2 == null || $scope.YEAR2 == undefined || $scope.YEAR2 == '') ? '' : $scope.YEAR2;
            let State2 = ($scope.State2 == null || $scope.State2 == undefined || $scope.State2 == '') ? '' : $scope.State2;
            let District2 = ($scope.District2 == null || $scope.District2 == undefined || $scope.District2 == '') ? '' : $scope.District2;
            let PLACE2 = ($scope.PLACE2 == null || $scope.PLACE2 == undefined || $scope.PLACE2 == '') ? '' : $scope.PLACE2;
            let YEAR3 = ($scope.YEAR3 == null || $scope.YEAR3 == undefined || $scope.YEAR3 == '') ? '' : $scope.YEAR3;
            let State3 = ($scope.State3 == null || $scope.State3 == undefined || $scope.State3 == '') ? '' : $scope.State3;
            let District3 = ($scope.District3 == null || $scope.District3 == undefined || $scope.District3 == '') ? '' : $scope.District3;
            let PLACE3 = ($scope.PLACE3 == null || $scope.PLACE3 == undefined || $scope.PLACE3 == '') ? '' : $scope.PLACE3;
            let YEAR4 = ($scope.YEAR4 == null || $scope.YEAR4 == undefined || $scope.YEAR4 == '') ? '' : $scope.YEAR4;
            let State4 = ($scope.State4 == null || $scope.State4 == undefined || $scope.State4 == '') ? '' : $scope.State4;
            let District4 = ($scope.District4 == null || $scope.District4 == undefined || $scope.District4 == '') ? '' : $scope.District4;
            let PLACE4 = ($scope.PLACE4 == null || $scope.PLACE4 == undefined || $scope.PLACE4 == '') ? '' : $scope.PLACE4;
            let YEAR5 = ($scope.YEAR5 == null || $scope.YEAR5 == undefined || $scope.YEAR5 == '') ? '' : $scope.YEAR5;
            let State5 = ($scope.State5 == null || $scope.State5 == undefined || $scope.State5 == '') ? '' : $scope.State5;
            let District5 = ($scope.District5 == null || $scope.District5 == undefined || $scope.District5 == '') ? '' : $scope.District5;
            let PLACE5 = ($scope.PLACE5 == null || $scope.PLACE5 == undefined || $scope.PLACE5 == '') ? '' : $scope.PLACE5;
            let YEAR6 = ($scope.YEAR6 == null || $scope.YEAR6 == undefined || $scope.YEAR6 == '') ? '' : $scope.YEAR6;
            let State6 = ($scope.State6 == null || $scope.State6 == undefined || $scope.State6 == '') ? '' : $scope.State6;
            let District6 = ($scope.District6 == null || $scope.District6 == undefined || $scope.District6 == '') ? '' : $scope.District6;
            let PLACE6 = ($scope.PLACE6 == null || $scope.PLACE6 == undefined || $scope.PLACE6 == '') ? '' : $scope.PLACE6;
            let YEAR7 = ($scope.YEAR7 == null || $scope.YEAR7 == undefined || $scope.YEAR7 == '') ? '' : $scope.YEAR7;
            let State7 = ($scope.State7 == null || $scope.State7 == undefined || $scope.State7 == '') ? '' : $scope.State7;
            let District7 = ($scope.District7 == null || $scope.District7 == undefined || $scope.District7 == '') ? '' : $scope.District7;
            let PLACE7 = ($scope.PLACE7 == null || $scope.PLACE7 == undefined || $scope.PLACE7 == '') ? '' : $scope.PLACE7;
            let YEAR8 = ($scope.YEAR8 == null || $scope.YEAR8 == undefined || $scope.YEAR8 == '') ? '' : $scope.YEAR8;
            let State8 = ($scope.State8 == null || $scope.State8 == undefined || $scope.State8 == '') ? '' : $scope.State8;
            let District8 = ($scope.District8 == null || $scope.District8 == undefined || $scope.District8 == '') ? '' : $scope.District8;
            let PLACE8 = ($scope.PLACE8 == null || $scope.PLACE8 == undefined || $scope.PLACE8 == '') ? '' : $scope.PLACE8;
            let YEAR9 = ($scope.YEAR9 == null || $scope.YEAR9 == undefined || $scope.YEAR9 == '') ? '' : $scope.YEAR9;
            let State9 = ($scope.State9 == null || $scope.State9 == undefined || $scope.State9 == '') ? '' : $scope.State9;
            let District9 = ($scope.District9 == null || $scope.District9 == undefined || $scope.District9 == '') ? '' : $scope.District9;
            let PLACE9 = ($scope.PLACE9 == null || $scope.PLACE9 == undefined || $scope.PLACE9 == '') ? '' : $scope.PLACE9;
            let YEAR10 = ($scope.YEAR10 == null || $scope.YEAR10 == undefined || $scope.YEAR10 == '') ? '' : $scope.YEAR10;
            let State10 = ($scope.State10 == null || $scope.State10 == undefined || $scope.State10 == '') ? '' : $scope.State10;
            let District10 = ($scope.District10 == null || $scope.District10 == undefined || $scope.District10 == '') ? '' : $scope.District10;
            let PLACE10 = ($scope.PLACE10 == null || $scope.PLACE10 == undefined || $scope.PLACE10 == '') ? '' : $scope.PLACE10;

            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.UserName,
                "Class1Year": YEAR1,
                "Class1StateID": State1,
                "Class1DistrictID": District1,
                "Class1Place": PLACE1,
                "Class2Year": YEAR2,
                "Class2StateID": State2,
                "Class2DistrictID": District2,
                "Class2Place": PLACE2,
                "Class3Year": YEAR3,
                "Class3StateID": State3,
                "Class3DistrictID": District3,
                "Class3Place": PLACE3,
                "Class4Year": YEAR4,
                "Class4StateID": State4,
                "Class4DistrictID": District4,
                "Class4Place": PLACE4,
                "Class5Year": YEAR5,
                "Class5StateID": State5,
                "Class5DistrictID": District5,
                "Class5Place": PLACE5,
                "Class6Year": YEAR6,
                "Class6StateID": State6,
                "Class6DistrictID": District6,
                "Class6Place": PLACE6,
                "Class7Year": YEAR7,
                "Class7StateID": State7,
                "Class7DistrictID": District7,
                "Class7Place": PLACE7,
                "Class8Year": YEAR8,
                "Class8StateID": State8,
                "Class8DistrictID": District8,
                "Class8Place": PLACE8,
                "Class9Year": YEAR9,
                "Class9StateID": State9,
                "Class9DistrictID": District9,
                "Class9Place": PLACE9,
                "Class10Year": YEAR10,
                "Class10StateID": State10,
                "Class10DistrictID": District10,
                "Class10Place": PLACE10,

            }
            $scope.tabsbutton = true;
            $scope.loader6 = true;
            var savestudydetails = AdminService.AddStudentStudyDetails(paramObj);
            savestudydetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.tabsbutton = false;
                    $scope.loader6 = false;
                    alert(res[0].StatusDescription);
                    $scope.getDashboardStatus()
                    $scope.getStudentDetails();
                    $scope.class0 = "";
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "active";
                    $scope.class8 = "";
                    $scope.class9 = "";
                    //$scope.loading = false;




                } else if (res[0].StatusCode == '400') {
                    $scope.tabsbutton = false;
                    $scope.loader6 = false;
                    alert(res[0].StatusDescription);
                    $scope.getDashboardStatus()
                    $scope.loading = false;
                    $scope.getStudentDetails();



                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.savePhotoSignatureDetails = function () {
            $scope.tabsbutton = true;
            if ($scope.StudentPhoto == null || $scope.StudentPhoto == undefined || $scope.StudentPhoto == "") {
                alert("Please Select Student Photo");
                $scope.tabsbutton = false;
                return;
            }
            if ($scope.StudentSign == null || $scope.StudentSign == undefined || $scope.StudentSign == "") {
                alert("Please Select Student Signature");
                $scope.tabsbutton = false;
                return;
            }

            if ($scope.checkbox == null || $scope.checkbox == undefined || $scope.checkbox == "") {
                alert("Please Agree Terms and Conditions");
                $scope.tabsbutton = false;
                return;
            }

            $scope.CheckBox = true;

            if ($scope.PhotoUpdate == false) {

                if ($scope.StudentPhoto1 == true) {
                    $scope.StudentPhoto = $scope.StudentPhoto
                } else {
                    $scope.StudentPhoto = $scope.StudentPhotoConvert
                }
                if ($scope.StudentSign1 == true) {
                    $scope.StudentSign = $scope.StudentSign
                } else {

                    $scope.StudentSign = $scope.StudentSignConvert
                }
            } else {
                var photovalue = $("#stdPhotoFile").val();
                if (photovalue == null || photovalue == "" || photovalue == undefined) {
                    $scope.Addphoto = false
                    $scope.StudentPhoto = $scope.StudentPhoto
                } else {
                    $scope.Addphoto = true
                    $scope.StudentPhoto = $scope.StudentPhotoConvert
                }
                var SignValue = $("#stdSignFile").val();
                if (SignValue == null || SignValue == "" || SignValue == undefined) {
                    $scope.AddSign = false
                    $scope.StudentSign = $scope.StudentSign
                } else {
                    $scope.AddSign = true
                    $scope.StudentSign = $scope.StudentSignConvert
                }
            }

            var paramObj = {
                "RegistrationID": $scope.RegistrationId,
                "RegistrationNumber": $scope.UserName,
                "StudentPhoto": $scope.StudentPhoto,
                "StudentSignature": $scope.StudentSign,
                "SSCPhoto": $scope.StudentPhoto1,
                "SSCSign": $scope.StudentSign1,
                "SscPhotoType": $scope.Addphoto,
                "SscSignType": $scope.AddSign,
                "PhotoUpdate": $scope.PhotoUpdate
            }
            $scope.tabsbutton = true;
            $scope.loader7 = true;
            var savephotosigndetails = AdminService.AddStudentPhotoSignatureDetails(paramObj);
            savephotosigndetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table[0].StatusCode == '200') {
                    $scope.tabsbutton = false;
                    $scope.loader7 = false;
                    alert(res.Table[0].StatusDescription);
                    $scope.getDashboardStatus()
                    $scope.getStudentDetails();
                    if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus == 1) {
                        $scope.class0 = "";
                        $scope.class1 = "";
                        $scope.class2 = "";
                        $scope.class3 = "";
                        $scope.class4 = "";
                        $scope.class5 = "";
                        $scope.class6 = "";
                        $scope.class7 = "";
                        $scope.class8 = "active";
                    } else {
                        alert("Please Fill All Details for Preview")
                    }




                } else if (res.Table[0].StatusCode == '400') {
                    $scope.tabsbutton = false;
                    $scope.loader7 = false;
                    alert(res.Table[0].StatusDescription);
                    $scope.getDashboardStatus()
                    $scope.loading = false;
                    $scope.getStudentDetails();




                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.printReceipt = function () {

            var divName = "table-print";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "Pay_Reciept";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;

            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);

            }

            window.print();


        };


        $scope.PrintHallticket = function () {
            $scope.PrintHtLog();
            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "Application_Preview";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;

            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);
            }
            document.title = $scope.HallticketHallticketNumber;
            window.print();
            document.title = 'TS POLYCET';

        };



        $scope.printPreview = function () {

            var divName = "Preview";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "Application_Preview";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;

            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);

            }

            window.print();


        };

        $scope.PrintHtLog = function () {
            var paramObject = {
                "RegistrationID": $scope.RegistrationId,
                "HallicketNo": $scope.HallticketHallticketNumber,
                "UserName": $scope.RegistrationNumber

            }
            var downloadlog = AdminService.SetStdHtLog(paramObject);
            downloadlog.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;


                } else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);

                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }

        //var VerifyDate = AdminService.VerifyRegistrationDates();
        //VerifyDate.then(function (response) {
        //    if (response.Table[0].ResponseCode == '200') {
        //        //   $state.go('index');

        //    } else if (response.Table[0].ResponseCode == '400') {
        //        $state.go('index')
        //        alert(response.Table[0].ResponseDescription)


        //    }
        //},
        //    function (error) {
        //        alert("error while Verifying Dates")
        //        //var err = JSON.parse(error);

        //    });

        $scope.getCasteCategory = function () {
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
        }

        $scope.getRegions = function () {
            var getcategory = StudentRegistrationService.GetRegions();
            getcategory.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.GetRegionsData = res.Table;

            },
                function (error) {
                    alert("error while loading Regions");
                    //var err = JSON.parse(error);

                });
        }

        $scope.getMinorities = function () {
            var getcategory = StudentRegistrationService.GetMinorities();
            getcategory.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.GetMinoritiesData = res.Table;

            },
                function (error) {
                    alert("error while loading Regions");
                    //var err = JSON.parse(error);

                });
        }


        $scope.getStudentApplicationData = function () {
            var applicationstatus = AdminService.GetStudentApplicationData($scope.RegistrationId);
            applicationstatus.then(function (response) {
                try {
                    var res = JSON.parse(response)
                    //$scope.CNAME = res.Table[0].StudentName;
                    $scope.RegistrationMobile = res.Table[0].RegistrationMobile;
                    $scope.RegistrationEmail = res.Table[0].RegistrationEmail;
                    $scope.RegistrationAadhar = res.Table[0].AadharNumber;
                    //$scope.RegistrationFeeAadhar = res.Table[0].AadharNumber;
                    $scope.AADHARFOUND = $scope.Aadhaar != "" ? true : false;
                    $scope.RegistrationCasteNumber = res.Table[0].CasteCertificateNumber;
                    //$scope.RegistrationFeeCasteNumber = res.Table[0].CasteCertificateNumber;
                    $scope.CASTECERTNUMBERFOUND = $scope.CasteCertificateNumber != "" ? true : false;
                    $scope.RegistrationCasteCategory = res.Table[0].CasteCategoryID;
                    $scope.RegistrationCasteName = res.Table[0].CasteCategoryName;
                    //$scope.RegistrationFeeCasteID = res.Table[0].CasteCategoryID;
                    //$scope.RegistrationFeeCasteName = res.Table[0].CasteCategoryName;
                    $scope.CASTECATEGORYFOUND = $scope.CasteCategory != "" ? true : false;
                    $scope.RegistrationCasteVerified = res.Table[0].CasteVerified;
                    //$scope.RegistrationFeeCasteVerified = res.Table[0].CasteVerified;
                    //if (($scope.RegistrationFeeCasteID == 7 || $scope.RegistrationFeeCasteID == 8) && $scope.RegistrationFeeCasteVerified == 0 && $scope.FeePaymentStatus == 0) {
                    //    $scope.FeeCasteCard = true;
                    //}

                    //if ($scope.RegistrationFeeCasteVerified == 1) {
                    //    $scope.FeeAadharFound = true;
                    //    $scope.FeeCasteCertNumberFound = true;
                    //    $scope.FeeCasteVerified = true;
                    //    $scope.FeeCasteNotVerified = false;
                    //    $scope.VerifyFeeCasteButton = false;
                    //}


                    //if ($scope.RegistrationFeeCasteVerified == 0 && ($scope.RegistrationFeeCasteID == 7 || $scope.RegistrationFeeCasteID == 8)) {
                    //    $scope.FeeAadharFound = false;
                    //    $scope.FeeCasteCertNumberFound = false;
                    //    $scope.FeeCasteNotVerified = true;
                    //    $scope.VerifyFeeCasteButton = true;
                    //    $scope.FeeCasteCard = true;
                    //}


                }
                catch (err) { }
            }, function (error) {
                alert('Unable to load Status')
            });
        }

        //if (($scope.CasteCategory == 7 || $scope.CasteCategory == 8) && $scope.CasteVerified == 0 && $scope.FeePaymentStatus == 0) {
        //    $scope.CancelCasteButton = true;
        //     }

        $scope.getQualifiedExam = function (data) {
            //$scope.qualifiedExamID = data.QualifiedExamID;
            //$scope.qualifiedExamName = data.QualifiedExamName;
            if ($scope.qualifiedExamID == 1) {
                $scope.SSCBUTTONCLICK = false;
                $scope.ssclabel = true;
                $scope.CancelSSCButton = true;

            }
            else if ($scope.qualifiedExamID == 2 || $scope.qualifiedExamID == 3
                || $scope.qualifiedExamID == 4 || $scope.qualifiedExamID == 5
                || $scope.qualifiedExamID == 6 || $scope.qualifiedExamID == 7
                || $scope.qualifiedExamID == 8 || $scope.qualifiedExamID == 9
                || $scope.qualifiedExamID == 10) {
                $scope.CancelSSCButton = false;
                $scope.SSCBUTTONCLICK = true;
                $scope.ssclabel = false;
                $scope.DOB_TEXT = '';

            }
            else {
                $scope.SSCBUTTONCLICK = true;
                $scope.ssclabel = false;
                $scope.DOB_TEXT = '';

            }
         
        }


        $scope.getStates = function () {

            var getstates = AdminService.GetStates();
            getstates.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.StatesData = res.Table;

            },
                function (error) {
                    alert("error while loading States");
                    //var err = JSON.parse(error);

                });
        }



        $scope.getAddressDistricts = function () {

            $scope.DistrictName = '';
            $scope.MandalName = '';
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData = res.Table;
                }
                else {
                    $scope.DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }



        $scope.getClass1Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State1);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData1 = res.Table;



                }
                else {
                    $scope.DistrictsData1 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass2Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State2);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData2 = res.Table;


                }
                else {
                    $scope.DistrictsData2 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass3Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State3);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData3 = res.Table;


                }
                else {
                    $scope.DistrictsData3 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass4Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State4);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData4 = res.Table;


                }
                else {
                    $scope.DistrictsData4 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass5Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State5);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData5 = res.Table;


                }
                else {
                    $scope.DistrictsData5 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass6Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State6);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData6 = res.Table;


                }
                else {
                    $scope.DistrictsData6 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass7Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State7);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData7 = res.Table;


                }
                else {
                    $scope.DistrictsData7 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass8Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State8);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData8 = res.Table;


                }
                else {
                    $scope.DistrictsData8 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass9Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State9);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData9 = res.Table;


                }
                else {
                    $scope.DistrictsData9 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getClass10Districts = function () {
            var DataType = 2;//Get Districts by State ID
            var getdistrict = AdminService.GetDistrictsbyState(DataType, $scope.State10);
            getdistrict.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.DistrictsData10 = res.Table;


                }
                else {
                    $scope.DistrictsData10 = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }



        $scope.ChangeDistricts1 = function (Preference1District) {
            console.log(Preference1District)
            //$scope.TelanganaDistrict1 = data.DistrictID;
            //$scope.TelanganaDistrict1Name = data.DistrictName;
            let dist1obj = [];
            dist1obj = { "DistrictID": $scope.Preference1District.DistrictID, "DistrictName": $scope.Preference1District.DistrictName }
            var getmandal = AdminService.GetPreference1Mandals($scope.Preference1District.DistrictID);
            getmandal.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.Preference1Mandal = null;
                    $scope.Preference1MandalsData = res.Table;
                    $scope.Preference2DistrictsData = [];
                    $scope.Preference2District = null;
                    $scope.Preference2MandalsData = [];
                    $scope.Preference3DistrictsData = [];
                    $scope.Preference3MandalsData = [];
                    $scope.Preference2Mandal = null;
                    $scope.Preference3District = null;
                    $scope.Preference3Mandal = null;

                }
                else {
                    alert("data not found");
                    $scope.Preference1Mandal = null;
                    $scope.Preference2District = null;
                    $scope.Preference2Mandal = null;
                    $scope.TelanganaDistrict3 = null;
                    $scope.Preference3Mandal = null;
                    $scope.Preference1MandalsData = [];
                    $scope.Preference2DistrictsData = [];
                    $scope.Preference2MandalsData = [];
                    $scope.Preference3DistrictsData = [];
                    $scope.Preference3MandalsData = [];

                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });
        }


        $scope.ChangeDistricts2 = function (Preference2District) {
            let dist2obj = [];
            dist2obj = { "DistrictID": $scope.Preference2District.DistrictID, "DistrictName": $scope.Preference2District.DistrictName }
            var getmandal = AdminService.GetPreference2Mandals($scope.Preference2District.DistrictID);
            getmandal.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.Preference2Mandal = null;
                    $scope.Preference3District = null;
                    $scope.Preference3Mandal = null;
                    $scope.Preference2MandalsData = [];
                    $scope.Preference3DistrictsData = [];
                    $scope.Preference3MandalsData = [];
                    $scope.Preference2MandalsData = res.Table;
                    if ($scope.Preference1Mandal.MandalID != "" && $scope.Preference1Mandal.MandalID != null && $scope.Preference1Mandal.MandalID != undefined) {
                        $scope.Preference2MandalsData = $scope.Preference2MandalsData.filter((ele) => { return ele.MandalID != $scope.Preference1Mandal.MandalID })

                    }
                    else if ($scope.Preference2MandalsData == "" || $scope.Preference2MandalsData == undefined || $scope.Preference2MandalsData == null) {
                        alert("No Mandals Available");
                    }
                }
                else {
                    alert("data not found");
                    $scope.Preference2MandalsData = [];
                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });
        }


        $scope.ChangeDistricts3 = function (Preference3District) {
            let dist3obj = [];
            dist3obj = { "DistrictID": $scope.Preference3District.DistrictID, "DistrictName": $scope.Preference3District.DistrictName }
            var getmandal = AdminService.GetPreference3Mandals($scope.Preference3District.DistrictID);
            getmandal.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    //$scope.Preference3Mandal = null;
                    $scope.Preference3MandalsData = [];
                    $scope.Preference3MandalsData = res.Table;
                    if ($scope.Preference2Mandal.MandalID != "" && $scope.Preference2Mandal.MandalID != null && $scope.Preference2Mandal.MandalID != undefined) {
                        $scope.Preference3MandalsData = $scope.Preference3MandalsData.filter((ele) => { return ele.MandalID != $scope.Preference2Mandal.MandalID && ele.MandalID != $scope.Preference1Mandal.MandalID })
                    }
                    else if ($scope.Preference3MandalsData == "" || $scope.Preference3MandalsData == undefined || $scope.Preference3MandalsData == null) {
                        alert("No Mandals Found");
                    }
                }
                else {
                    alert("data not found");
                    $scope.Preference3MandalsData = [];
                }

            },
                function (error) {
                    //alert("data not found");
                    //    var err = JSON.parse(error);
                });
        }


        //$scope.Validate = function (array) {
        //    const unique = []
        //    //array.filter(a => { a.DistrictID===})
        //    array.filter(o => {

        //        if (unique.find(i => i.MandalID === o.MandalID)) {
        //            return true
        //        }

        //        unique.push(o)
        //        return false;
        //    })

        //}

        var array = [];

        $scope.ChangeMandals1 = function (Preference1Mandal, index) {
            let man1obj = [];
            man1obj = { "MandalID": $scope.Preference1Mandal.MandalID, "MandalName": $scope.Preference1Mandal.MandalName }
            $scope.Preference2District = null;
            $scope.Preference2DistrictsData = [];
            $scope.Preference2Mandal = null;
            $scope.Preference2MandalsData = [];
            $scope.Preference3District = null;
            $scope.Preference3DistrictsData = [];
            $scope.Preference3Mandal = null;
            $scope.Preference3MandalsData = [];
            $scope.getPreference2Districts()
            let obj = { id: index, MandalID: $scope.Preference1Mandal.MandalID }
            array.push(obj)
            //if ($scope.Validate) {
            //    alert('Duplicate Mandals Found try Selecting Different')
            //}
            //$scope.Preference1Mandal = Preference1Mandal;
            //$scope.Preference2MandalsData = $scope.Preference2MandalsData.filter((ele) => { return ele.MandalID != $scope.Preference1Mandal })


        }
        $scope.ChangeMandals2 = function (Preference2Mandal, index) {
            let man2obj = [];
            man2obj = { "MandalID": $scope.Preference2Mandal.MandalID, "MandalName": $scope.Preference2Mandal.MandalName }
            $scope.Preference3District = null;
            $scope.Preference3DistrictsData = [];
            $scope.Preference3Mandal = null;
            $scope.Preference3MandalsData = [];
            $scope.getPreference3Districts();
            //$scope.PreferenceMandal2ID = data.MandalID;
            //$scope.PreferenceMandal2Name = data.MandalName;
            let obj = { id: index, MandalID: $scope.Preference2Mandal.MandalID }
            array.push(obj)
            //$scope.Preference2Mandal = Preference2Mandal;
            //$scope.Preference3MandalsData = $scope.Preference3MandalsData.filter((ele) => { return ele.MandalID != $scope.Preference2Mandal && ele.MandalID != $scope.Preference1Mandal })

        }
        $scope.ChangeMandals3 = function (Preference3Mandal, index) {
            let man3obj = [];
            man3obj = { "MandalID": $scope.Preference3Mandal.MandalID, "MandalName": $scope.Preference3Mandal.MandalName }
            //$scope.PreferenceMandal3ID = data.MandalID;
            //$scope.PreferenceMandal3Name = data.MandalName;
            let obj = { id: index, MandalID: $scope.Preference3Mandal.MandalID }
            array.push(obj)
            $scope.Preference3Mandal = Preference3Mandal;
        }


        $scope.getAddressMandals = function () {

            var getmandal = AdminService.GetMandalsbyDistrict($scope.District);
            getmandal.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.MandalsData = res.Table;
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

        $scope.getmandalname = function (data) {
            //$scope.MandalName = data.MandalName;
            //$scope.Mandal = data.MandalID;
        }


        $scope.getPreference1Districts = function () {
            var getdistrict = AdminService.GetPreference1Districts();
            getdistrict.then(function (resp) {
                //try {
                //    var res = JSON.parse(resp);
                //}
                //catch (err) { }

                if (resp.Table.length > 0) {
                    $scope.Preference1DistrictsData = resp.Table;
                }
                else {
                    $scope.Preference1DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getPreference2Districts = function () {
            var getdistrict = AdminService.GetPreference2Districts();
            getdistrict.then(function (resp) {
                //try {
                //    var res = JSON.parse(resp);
                //}
                //catch (err) { }

                if (resp.Table.length > 0) {
                    $scope.Preference2DistrictsData = resp.Table;
                }
                else {
                    $scope.Preference2DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getPreference3Districts = function () {
            var getdistrict = AdminService.GetPreference3Districts();
            getdistrict.then(function (resp) {
                //try {
                //    var res = JSON.parse(resp);
                //}
                //catch (err) { }

                if (resp.Table.length > 0) {
                    $scope.Preference3DistrictsData = resp.Table;
                }
                else {
                    $scope.Preference3DistrictsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getQualifiedExams = function () {
            var qualifiedexam = AdminService.GetQualifiedExams();
            qualifiedexam.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.QualifiedExamsData = res.Table;
                }
                else {
                    $scope.QualifiedExamsData = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });


        }

        $scope.getMinorityName = function (data) {
            //$scope.MinorityID = data.MinorityID;
            //$scope.MinorityName = data.MinorityName;
        }

        $scope.getAsstinUrdu = function (Assistance_Urdu) {
            $scope.Assistance_Urdu = Assistance_Urdu
            if ($scope.Assistance_Urdu == 'true') {
                $scope.Assistance_Urdu = 'true';
            } else if ($scope.Assistance_Urdu == 'false') {
                $scope.Assistance_Urdu = 'false';
            }

        }

        $scope.EWSCertificateValues = [{ "Id": "Yes", "value": true }, { "Id": "No", "value": false }]

        $scope.getSSCDetails = function (sscHallticket, passedoutYear, sscType) {
            if (sscHallticket == '' || sscHallticket == null || sscHallticket == undefined) {
                alert("Please Enter Tenth Hallticket Number");
                return;
            }
            if (passedoutYear == '' || passedoutYear == null || passedoutYear == undefined) {
                alert("Please Enter Tenth Passed / Appearing Year");
                return;
            }

            if (sscType == '' || sscType == null || sscType == undefined) {
                alert("Please Enter Examination Stream");
                return;
            }

            $scope.loading = true;
            $scope.ENTEREDSSCHALLTICKET = true;
            $scope.ENTEREDYEAR = true;
            $scope.ENTEREDSSCTYPE = true;
            $scope.SELECTEDQUALIFIEDEXAM = true;
            $scope.GETSSCDETAILSBUTTON = true;
            var reqData = {
                RollNo: sscHallticket,
                Year: passedoutYear,
                Stream: sscType
            };

            if (passedoutYear == '2023') {
                var sscdetails = PreExaminationService.getSSCNewDetails(reqData);
                sscdetails.then(function (res) {
                    if (res) {

                        let resdata = JSON.parse(res)
                        if (resdata.Status == 200) {
                            $scope.loading = false;
                            $scope.SSCBUTTONCLICK = true;
                            $scope.CancelButton = true;
                            $scope.CNAME = resdata.Name;
                            $scope.SSCVerified = true;
                            $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                            $scope.FNAME = resdata.FatherName;
                            $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                            $scope.MNAME = resdata.MotherName;
                            $scope.MotherNamefound = $scope.MNAME != "" ? true : false;

                            $scope.Gender = resdata.Sex == "B" || resdata.Sex == "M" ? "M" : resdata.Sex == "G" || resdata.Sex == "F" ? "F" : "";
                            $scope.Genderfound = $scope.Gender != "" ? true : false;


                            $scope.DOB_DATE = resdata.DateOfBirth;
                            $scope.DOB_TEXT = resdata.DateOfBirth;
                            //$scope.DOB_DATE = moment(resdata.DateOfBirth)
                            //$scope.DOB_DATE = resdata.DateOfBirth
                            $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;



                        } else {
                            $scope.SSCVerified = false;
                            $scope.loading = false;
                            //$scope.SSCBUTTONCLICK = true;
                            alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                            $scope.GETSSCDETAILSBUTTON = false;
                            $scope.SELECTEDQUALIFIEDEXAM = false;
                            $scope.ENTEREDSSCHALLTICKET = false;
                            $scope.ENTEREDYEAR = false;
                            $scope.ENTEREDSSCTYPE = false;


                        }

                    } else {
                        $scope.SSCVerified = false;
                        $scope.loading = false;
                        //$scope.SSCBUTTONCLICK = true;
                        alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                        $scope.GETSSCDETAILSBUTTON = false;
                        $scope.SELECTEDQUALIFIEDEXAM = false;
                        $scope.ENTEREDSSCHALLTICKET = false;
                        $scope.ENTEREDYEAR = false;
                        $scope.ENTEREDSSCTYPE = false;



                    }


                }, function (err) {
                    $scope.SSCVerified = false;
                    $scope.loading = false;
                    //$scope.SSCBUTTONCLICK = true;
                    alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                    $scope.GETSSCDETAILSBUTTON = false;
                    $scope.SELECTEDQUALIFIEDEXAM = false;
                    $scope.ENTEREDSSCHALLTICKET = false;
                    $scope.ENTEREDYEAR = false;
                    $scope.ENTEREDSSCTYPE = false;
                })

                var sscimagedata = PreExaminationService.getSSCNewImageDetails(reqData);
                sscimagedata.then(function (res) {
                    if (res) {

                        let resdata = JSON.parse(res)
                        if (resdata.Table) {
                            $scope.CancelButton = true;
                            //let StudentPhoto = $scope.StudentPhoto == null || $scope.StudentPhoto == undefined || $scope.StudentPhoto == '' ? true : false;
                            //let StudentSign = $scope.StudentSign == null || $scope.StudentSign == undefined || $scope.StudentSign == '' ? true : false;
                            $scope.StudentPhoto = resdata.Table.PHOTO;
                            $scope.StudentPhotoFound = $scope.StudentPhoto != "" ? true : false;
                            $scope.StudentSign = resdata.Table.SIGN;
                            $scope.StudentSignFound = $scope.StudentSign != "" ? true : false;

                            if ($scope.StudentPhoto != "" || $scope.StudentPhoto != null || $scope.StudentPhoto != undefined) {
                                //    $scope.StudentPhoto1 = true;
                            }
                            else if ($scope.StudentPhoto == "" || $scope.StudentPhoto == null || $scope.StudentPhoto == undefined) {
                                //    $scope.StudentPhoto1 = false;
                            }

                            if ($scope.StudentSign != "" || $scope.StudentSign != null || $scope.StudentSign != undefined) {
                                //    $scope.StudentSign1 = true;
                            }
                            else if ($scope.StudentSign == "" || $scope.StudentSign == null || $scope.StudentSign == undefined) {
                                //    $scope.StudentSign1 = false;
                            }


                        } else {
                            $scope.loading = false;
                            alert("Photo and Sign not found, Continue to fill Application");



                        }

                    } else {
                        $scope.loading = false;
                        alert("Photo and Sign not found, Continue to fill Application");

                    }


                }, function (err) {
                    $scope.loading = false;
                    alert("Photo and Sign not found, Continue to fill Application");

                })
            }
            else {
                var sscdetails = PreExaminationService.getSSCDetails(reqData);
                sscdetails.then(function (res) {
                    if (res) {

                        let resdata = JSON.parse(res)
                        if (resdata.Status == 200) {
                            $scope.loading = false;
                            $scope.SSCBUTTONCLICK = true;
                            $scope.CancelButton = true;
                            $scope.CNAME = resdata.Name;
                            $scope.SSCVerified = true;
                            $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                            $scope.FNAME = resdata.FatherName;
                            $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                            $scope.MNAME = resdata.MotherName;
                            $scope.MotherNamefound = $scope.MNAME != "" ? true : false;

                            $scope.Gender = resdata.Sex == "B" || resdata.Sex == "M" ? "M" : resdata.Sex == "G" || resdata.Sex == "F" ? "F" : "";
                            $scope.Genderfound = $scope.Gender != "" ? true : false;


                            $scope.DOB_DATE = resdata.DateOfBirth;
                            $scope.DOB_TEXT = resdata.DateOfBirth;
                            //$scope.DOB_DATE = moment(resdata.DateOfBirth)
                            //$scope.DOB_DATE = resdata.DateOfBirth
                            $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;



                        } else {
                            $scope.SSCVerified = false;
                            $scope.loading = false;
                            //$scope.SSCBUTTONCLICK = true;
                            alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                            $scope.GETSSCDETAILSBUTTON = false;
                            $scope.SELECTEDQUALIFIEDEXAM = false;
                            $scope.ENTEREDSSCHALLTICKET = false;
                            $scope.ENTEREDYEAR = false;
                            $scope.ENTEREDSSCTYPE = false;


                        }

                    } else {
                        $scope.SSCVerified = false;
                        $scope.loading = false;
                        //$scope.SSCBUTTONCLICK = true;
                        alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                        $scope.GETSSCDETAILSBUTTON = false;
                        $scope.SELECTEDQUALIFIEDEXAM = false;
                        $scope.ENTEREDSSCHALLTICKET = false;
                        $scope.ENTEREDYEAR = false;
                        $scope.ENTEREDSSCTYPE = false;



                    }


                }, function (err) {
                    $scope.SSCVerified = false;
                    $scope.loading = false;
                    //$scope.SSCBUTTONCLICK = true;
                    alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                    $scope.GETSSCDETAILSBUTTON = false;
                    $scope.SELECTEDQUALIFIEDEXAM = false;
                    $scope.ENTEREDSSCHALLTICKET = false;
                    $scope.ENTEREDYEAR = false;
                    $scope.ENTEREDSSCTYPE = false;
                })

                var sscimagedata = PreExaminationService.getSSCImageDetails(reqData);
                sscimagedata.then(function (res) {
                    if (res) {

                        let resdata = JSON.parse(res)
                        if (resdata.Table) {
                            $scope.CancelButton = true;
                            //let StudentPhoto = $scope.StudentPhoto == null || $scope.StudentPhoto == undefined || $scope.StudentPhoto == '' ? true : false;
                            //let StudentSign = $scope.StudentSign == null || $scope.StudentSign == undefined || $scope.StudentSign == '' ? true : false;
                            $scope.StudentPhoto = resdata.Table.PHOTO;
                            $scope.StudentPhotoFound = $scope.StudentPhoto != "" ? true : false;
                            $scope.StudentSign = resdata.Table.SIGN;
                            $scope.StudentSignFound = $scope.StudentSign != "" ? true : false;

                            if ($scope.StudentPhoto != "" || $scope.StudentPhoto != null || $scope.StudentPhoto != undefined) {
                                //    $scope.StudentPhoto1 = true;
                            }
                            else if ($scope.StudentPhoto == "" || $scope.StudentPhoto == null || $scope.StudentPhoto == undefined) {
                                //    $scope.StudentPhoto1 = false;
                            }

                            if ($scope.StudentSign != "" || $scope.StudentSign != null || $scope.StudentSign != undefined) {
                                //    $scope.StudentSign1 = true;
                            }
                            else if ($scope.StudentSign == "" || $scope.StudentSign == null || $scope.StudentSign == undefined) {
                                //    $scope.StudentSign1 = false;
                            }


                        } else {
                            $scope.loading = false;
                            alert("Photo and Sign not found, Continue to fill Application");



                        }

                    } else {
                        $scope.loading = false;
                        alert("Photo and Sign not found, Continue to fill Application");

                    }


                }, function (err) {
                    $scope.loading = false;
                    alert("Photo and Sign not found, Continue to fill Application");

                })
            }

        }

        $scope.CancelSSC = function () {
            $scope.SSCBUTTONCLICK = false;
            $scope.ENTEREDSSCHALLTICKET = false;
            $scope.ENTEREDYEAR = false;
            $scope.ENTEREDSSCTYPE = false;
            $scope.SELECTEDQUALIFIEDEXAM = false;
            $scope.GETSSCDETAILSBUTTON = false;
            $scope.CNAME = null;
            $scope.FNAME = null;
            $scope.MNAME = null;
            $scope.DOB_DATE = '';
            $scope.Gender = null;
            $scope.StudentPhoto = "";
            //$scope.StudentPhoto1 = null;
            $scope.StudentSign = false;
            //$scope.StudentSign1 = null;
            $scope.CandidateNamefound = false;
            $scope.FatherNameFound = false;
            $scope.MotherNamefound = false;
            $scope.CandidateNameDOBfound = false;
            $scope.Genderfound = false;
        }

        $scope.CancelCasteDetails = function () {
            if ($scope.CasteCategory == 1 && $scope.EwsCertificate == true) {
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.EwsCertificateFound = false;
                $scope.EwsNumberFound = false;
                $scope.EWSVerified = false;
                $scope.EWSNotVerified = false;
                $scope.EWSBUTTON = true;
            }
            else if (($scope.CasteCategory == 2 || $scope.CasteCategory == 3 || $scope.CasteCategory == 4 || $scope.CasteCategory == 5 || $scope.CasteCategory == 6 || $scope.CasteCategory == 7 || $scope.CasteCategory == 8) && $scope.CasteVerified == true) {
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.CasteCertificateNumberFound = false;
                $scope.CasteVerified = false;
                $scope.CasteNotVerified = false;
                $scope.CasteVerifyButton = true;
            }

        }




        $scope.GetCasteDetails = function () {
            //$scope.CasteNum = "EWS022100145491";
            //$scope.Aadhaar = "206866388949";
            //$scope.CasteNum = "CND022222366793";
            if ($scope.Aadhaar == "" || $scope.Aadhaar == null || $scope.Aadhaar == undefined) {
                alert("Please Enter Correct Aadhar Number")
                return
            }

            if ($scope.CasteCertificateNumber == "" || $scope.CasteCertificateNumber == null || $scope.CasteCertificateNumber == undefined) {
                alert("Please Enter Caste Certificate Number")
                return
            }
            $scope.loader1 = true;
            $scope.Userid = "MEESEVA";
            var captcha = AdminService.GetCasteDetails($scope.CasteCertificateNumber, $scope.Userid);
            captcha.then(function (res) {
                if (res.errorcode == 200) {
                    $scope.loader1 = false;
                    $scope.Data = res.caste_details

                    $scope.Aadhaar_Number = res.caste_details.aadhaar_number
                    $scope.Category_Name = res.caste_details.subtribe

                    let str = $scope.Aadhaar_Number;
                    var aadhaar = str[8] + str[9] + str[10] + str[11];
                    let str1 = $scope.Aadhaar;
                    var aadhaar1 = str1[8] + str1[9] + str1[10] + str1[11];

                    let str2 = $scope.Category_Name;
                    var castecategory = str2[0] + str2[1] + str2[2];
                    if ($scope.ChangedCategory == null || $scope.ChangedCategory == "" || $scope.ChangedCategory == undefined) {
                        $scope.ChangedCategory = $scope.RegistrationCasteName;
                    }
                    let str3 = $scope.ChangedCategory;
                    var castecategory1 = str3[0] + str3[1] + str3[3];
                    if (aadhaar == aadhaar1 && castecategory == castecategory1) {
                        alert("Caste Verified Successfully")
                        $scope.CasteVerified = true;
                        $scope.CasteNotVerified = false;
                        $scope.CasteCategoryFound = $scope.CasteCategory != "" ? true : false;
                        $scope.AadharFound = $scope.Aadhaar != "" ? true : false;
                        $scope.CasteCertificateNumberFound = $scope.CasteCertificateNumber != "" ? true : false;
                        $scope.CasteVerifyButton = false;
                    }

                    else {
                        alert("Aadhaar Number or Selected Category Not Matched with Caste Certificate");
                        $scope.loader1 = false;
                        $scope.CasteNotVerified = true;
                        $scope.CasteVerified = false;
                        $scope.CasteCategoryFound = false;
                        $scope.AadharFound = false;
                        $scope.CasteCertificateNumberFound = false;
                        $scope.CasteVerifyButton = true;
                    }
                }

                else {
                    $scope.loader1 = false;
                    alert("Caste Details Not Found, Continue to Fill Application")
                    $scope.CasteNotVerified = true;
                    $scope.CasteVerified = false;
                    $scope.CasteCategoryFound = false;
                    $scope.AadharFound = false;
                    $scope.CasteCertificateNumberFound = false;
                    $scope.CasteVerifyButton = true;
                }

                //var jsonOutput = xml2json(res);

                //if (response[0].ResponceCode == '200') {
                //    //alert(response[0].ResponceDescription)
                //    //$scope.CaptchaText = "";
                //    //$scope.GetCatcha = response[0].Captcha
                //    //var captcha = JSON.parse(response[0].Captcha)
                //    //$scope.CaptchaImage = captcha[0].Image;
                //} else {
                //    alert(response[0].ResponceDescription)
                //    $scope.CaptchaText = "";
                //    $scope.GetCatcha = response[0].Captcha
                //    var captcha = JSON.parse(response[0].Captcha)
                //    $scope.CaptchaImage = captcha[0].Image;
                //}

            }, function (error) {
                alert('Unable to load Data')
                $scope.loader1 = false;
                $scope.CasteNotVerified = true;
                $scope.CasteVerified = false;
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.CasteCertificateNumberFound = false;
                $scope.CasteVerifyButton = true;
            });
        }


        //$scope.GetFeeCasteDetails = function () {
        //    //$scope.CasteNum = "EWS022100145491";
        //    //$scope.Aadhaar = "206866388949";
        //    //$scope.CasteNum = "CND022222366793";
        //    //if ($scope.FeeAadhaar == "" || $scope.FeeAadhaar == null || $scope.FeeAadhaar == undefined) {
        //    //    alert("Please Enter Aadhar Number")
        //    //    return
        //    //}

        //    //if ($scope.FeeCasteCertNumber == "" || $scope.FeeCasteCertNumber == null || $scope.FeeCasteCertNumber == undefined) {
        //    //    alert("Please Enter Caste Certificate Number")
        //    //    return
        //    //}
        //    $scope.loader1 = true;
        //    $scope.Userid = "MEESEVA";
        //    var captcha = AdminService.GetCasteDetails($scope.RegistrationFeeCasteNumber, $scope.Userid);
        //    captcha.then(function (res) {
        //        if (res.errorcode == 200) {
        //            $scope.loader1 = false;
        //            $scope.Data = res.caste_details

        //            $scope.FeeAadhaar_Number = res.caste_details.aadhaar_number
        //            $scope.FeeCategory_Name = res.caste_details.subtribe

        //            let str = $scope.FeeAadhaar_Number;
        //            var aadhaar = str[8] + str[9] + str[10] + str[11];
        //            let str1 = $scope.RegistrationFeeAadhar;
        //            var aadhaar1 = str1[8] + str1[9] + str1[10] + str1[11];

        //            let str2 = $scope.FeeCategory_Name;
        //            var castecategory = str2[0] + str2[1] + str2[2];
        //            let str3 = $scope.RegistrationFeeCasteName;
        //            var castecategory1 = str3[0] + str3[1] + str3[3];
        //            if (aadhaar == aadhaar1 && castecategory == castecategory1) {
        //                alert("Caste Verified Successfully")
        //                $scope.RegistrationFeeCasteVerified = true;
        //                $scope.FeeCasteNotVerified = false;
        //                $scope.FeeCasteCategoryFound = true;
        //                $scope.FeeAadharFound =  true;
        //                $scope.FeeCasteCertNumberFound = true;
        //                $scope.updateFeeCasteDetails();
        //            }

        //            else {
        //                alert("Aadhaar Number or Selected Category Not Matched with Caste Certificate");
        //                $scope.loader1 = false;
        //                $scope.FeeCasteVerified = false;
        //                $scope.updateFeeCasteDetails();
        //                /*return;*/
        //            }
        //        }

        //        else {
        //            $scope.loader1 = false;
        //            $scope.FeeCasteNotVerified = true;
        //            $scope.FeeCasteVerified = false;
        //            $scope.FeeAadharFound = true;
        //            $scope.FeeCasteCertNumberFound = true;
        //            alert("Caste Details Not Found, Continue to Fill Application")
        //            $scope.updateFeeCasteDetails();

        //        }

        //    }, function (error) {
        //        $scope.GetCatcha = ''
        //        alert('Unable to load Captcha')
        //        $scope.loader1 = false;
        //    });
        //}



        $scope.ChangeCaste = function (CasteCategory) {

            if (CasteCategory == 1) {
                $scope.CasteVerified = false;
                $scope.CasteNotVerified = false;
                $scope.CasteVerifyButton = false;
                $scope.Aadhaar = "";
                $scope.CasteCertificateNumber = "";
                $scope.EWSNumber = '';
                $scope.EwsCertificate = null;
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.EwsCertificateFound = false;
                $scope.EwsNumberFound = false;
                $scope.CasteCertificateNumberFound = false;
                $scope.CasteCertificateNumber = '';
            }

            if (CasteCategory == 2 || CasteCategory == 3 || CasteCategory == 4 || CasteCategory == 5 ||
                CasteCategory == 6 || CasteCategory == 7 || CasteCategory == 8) {
                $scope.CasteVerified = false;
                $scope.CasteNotVerified = false;
                $scope.EWSNotVerified = false;
                $scope.EWSVerified = false;
                $scope.CasteVerifyButton = true;
                $scope.Aadhaar = "";
                $scope.CasteCertificateNumber = "";
                $scope.EWSNumber = '';
                $scope.EWSCERTNUMBER = false;
                $scope.EwsCertificate = null;
                $scope.CasteCategoryFound = false;
                $scope.AadharFound = false;
                $scope.EWSBUTTON = false
                $scope.EwsCertificateFound = false;
                $scope.EwsNumberFound = false;
                $scope.CasteCertificateNumberFound = false;
                $scope.CasteCertificateNumber = '';
            }


            $scope.CasteCategory = CasteCategory;

            if ($scope.CasteCategory == 1) {
                $scope.ChangedCategory = 'OC'
            }
            if ($scope.CasteCategory == 2) {
                $scope.ChangedCategory = 'BC_A'
            }
            if ($scope.CasteCategory == 3) {
                $scope.ChangedCategory = 'BC_B'
            }
            if ($scope.CasteCategory == 4) {
                $scope.ChangedCategory = 'BC_C'
            }
            if ($scope.CasteCategory == 5) {
                $scope.ChangedCategory = 'BC_D'
            }
            if ($scope.CasteCategory == 6) {
                $scope.ChangedCategory = 'BC_E'
            }
            if ($scope.CasteCategory == 7) {
                $scope.ChangedCategory = 'SC'
            }
            if ($scope.CasteCategory == 8) {
                $scope.ChangedCategory = 'ST'
            }

        }



        $scope.VerifyEWS = function () {
            //$scope.CasteNum = "EWS022100145491";
            //$scope.Aadhaar = "206866388949";
            //$scope.CasteNum = "CND022222366793";
            if ($scope.EwsCertificate == "" || $scope.EwsCertificate == null || $scope.EwsCertificate == undefined) {
                alert("Please Select EWS Category")
                return
            }

            if ($scope.EWSNumber == "" || $scope.EWSNumber == null || $scope.EWSNumber == undefined) {
                alert("Please Enter EWS Number")
                return
            }
            $scope.loader2 = true;
            $scope.userid = "MEESEVA";
            var ewsdetails = AdminService.GetPolycetEWSVerification($scope.EWSNumber, $scope.userid);
            ewsdetails.then(function (res) {
                if (res.errorcode == 200) {
                    $scope.loader2 = false;
                    $scope.Data = res.EwsDetails
                    $scope.Status = res.EwsDetails.status;
                    alert("EWS Verified Successfully")
                    $scope.EWSVerified = true;
                    $scope.EWSBUTTON = false;
                    $scope.CancelCasteButton = true;
                    $scope.CasteCategoryFound = $scope.CasteCategory != "" ? true : false;
                    $scope.AadharFound = $scope.Aadhaar != "" ? true : false;
                    $scope.CasteCertificateNumberFound = $scope.CasteCertificateNumber != "" ? true : false;
                    $scope.EwsCertificateFound = $scope.EwsCertificate != "" ? true : false;
                    $scope.EwsNumberFound = $scope.EWSNumber != "" ? true : false;

                } else {
                    $scope.loader2 = false;
                    alert("EWS Details Not Found,Continue to Fill Application")
                    $scope.EWSNotVerified = true;
                    $scope.EwsCertificate = false;
                    $scope.EWSVerified = false;
                    $scope.EWSBUTTON = false;
                    //$scope.CancelCasteButton = true;
                    $scope.CasteCategoryFound = true;
                    $scope.AadharFound = true;
                    $scope.CasteCertificateNumberFound = true;
                    $scope.EwsCertificateFound = true;
                    $scope.EwsNumberFound = true;
                    $scope.EWSBUTTON = false;

                }

                //var jsonOutput = xml2json(res);

                //if (response[0].ResponceCode == '200') {
                //    //alert(response[0].ResponceDescription)
                //    //$scope.CaptchaText = "";
                //    //$scope.GetCatcha = response[0].Captcha
                //    //var captcha = JSON.parse(response[0].Captcha)
                //    //$scope.CaptchaImage = captcha[0].Image;
                //} else {
                //    alert(response[0].ResponceDescription)
                //    $scope.CaptchaText = "";
                //    $scope.GetCatcha = response[0].Captcha
                //    var captcha = JSON.parse(response[0].Captcha)
                //    $scope.CaptchaImage = captcha[0].Image;
                //}

            }, function (error) {
                alert('Unable to load Captcha')
                $scope.EWSVerified = false;
                $scope.EWSNotVerified = true;
                $scope.EWSBUTTON = false;
                //$scope.CancelCasteButton = false;
                $scope.loader2 = false;
            });
        }


        $scope.getRegionName = function (data) {
            //$scope.RegionName = data.RegionName;
            //$scope.RegionID = data.RegionID;
        }


        //$scope.getSSCDetails = function (sscHallticket, passedoutYear, sscType) {
        //$scope.sscdetails = true;
        //$scope.getbutton = true;

        //    //if (QualifiedExamID == '' || QualifiedExamID == null || QualifiedExamID == undefined) {
        //    //    alert("QualifiedExam can't be Empty");
        //    //    return;
        //    //}

        //    if (sscHallticket == '' || sscHallticket == null || sscHallticket == undefined) {
        //        alert("SSC HallTicket number can't be Empty");
        //        return;
        //    }
        //    if (passedoutYear == '' || passedoutYear == null || passedoutYear == undefined) {
        //        alert("SSC passedout year can't be Empty");
        //        return;
        //    }

        //    if (sscType == '' || sscType == null || sscType == undefined) {
        //        alert("Stream can't be Empty");
        //        return;
        //    }

        //    $scope.loading = true;
        //    var reqData = {
        //        RollNo: sscHallticket,
        //        Year: passedoutYear,
        //        Stream: sscType
        //    };

        //    var sscdetails = PreExaminationService.GetSSCDetails(reqData);
        //    sscdetails.then(function (NewResponse) {
        //        if (NewResponse) {

        //            let resdata = JSON.parse(NewResponse)
        //            if (resdata.Status == 200) {
        //                $scope.loading = false;

        //                $scope.CNAME = resdata.Name;
        //                $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
        //                $scope.FNAME = resdata.FatherName;
        //                $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
        //                $scope.MNAME = resdata.MotherName;
        //                $scope.MotherNamefound = $scope.MNAME != "" ? true : false;

        //                $scope.SEX = resdata.Sex == "B" || resdata.Sex == "M" ? "M" : resdata.Sex == "G" || resdata.Sex == "F" ? "F" : "";
        //                $scope.Genderfound = $scope.SEX != "" ? true : false;
        //                let date1 = resdata.DateOfBirth;
        //                let ch = date1.split('');
        //                var datelength = ch.length;

        //            } else {
        //                $scope.loading = false;
        //                alert("Details not found, Continue to fillApplication");


        //            }

        //        } else {
        //            $scope.loading = false;
        //            alert("Details not found, Continue to fillApplication");


        //        }


        //    }, function (err) {
        //        $scope.loading = false;
        //        alert("Details not found, Continue to fillApplication");
        //    })


        //}

        $scope.ChangePassword = function () {
            $state.go('StudentDashboard.ChangePassword');
        }

        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;

            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                //    userName: ""
            };
            $state.go('index')
        }

        $scope.PayFee = function () {
            var marchantid = "TSPOLYCET"; // test
            var subMarchantid = " ";

            //var EncriptedPassword = $crypto.encrypt($crypto.encrypt($scope.CreatePass, 'HBSBP9214EDU00TS'), $scope.RegistrationEKey) + '$$@@$$' + $scope.RegistrationEKey;
            var submitstddetails = StudentRegistrationService.AdminFeePaymentRequestLog($scope.StudentData.RegistrationID, marchantid, subMarchantid, $scope.StudentData.RegistrationNumber);
            submitstddetails.then(function (res) {
                try {
                    var res = JSON.parse(res)
                }
                catch (err) { }
                if (res.Table[0].StatusCode == '200') {
                    $scope.StudentVerData = res.Table1
                    $scope.challan = res.Table1[0].ChallanNumber;
                    $scope.Amount = res.Table1[0].RegistrationAmount;
                    $scope.StudentName = res.Table1[0].StudentName;
                    $scope.RegistrationMobile = res.Table1[0].RegistrationMobile;

                    //$scope.DetailsFound = true;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: "/app/views/Popups/FeePaymentPopup.html",
                        size: 'xlg',
                        animation: true,
                        scope: $scope,
                        backdrop: 'static',
                        //windowClass: 'modal-fit-att',
                    });
                    $scope.closeModal = function () {
                        $scope.modalInstance.close();
                    }
                }
                //else if (res.Table[0].StatusCode == '201') {

                //    alert(res.Table1[0].RegistrationNumber + " is Your provisional registration No for POLYCET 2023 and " + res.Table1[0].RegistrationPassword + " password. Login and complete Application, SBTET TS");

                //}
                else if (res.Table[0].StatusCode == '400') {
                    alert(res.Table[0].StatusDescription);
                }
                else {
                    //$scope.DetailsFound = false;
                    //  $scope.DetainedDetailsFoundWithData = res.Table[0].ResponceDescription
                    alert("Error while loading Data");
                }


            },
                function (error) {

                    $scope.DetailsFound = false;
                    alert("Error while loading Data");
                    console.log(error);
                });
        }


        $scope.Proceedtopay = function () {
            var marchantid = "TSPOLYCET"; // test
            //  var subMarchantid = "TSDOFP";
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

        $scope.fillApplication = function (Temp) {
            if (Temp == 'StudentDashboard.Application' && $scope.FeeStatus == 0) {
                alert('Please Pay Fee First')
            }
        }

        $scope.Preview = function () {
            $scope.PreviewDisable = false;
            $scope.array = []
            if ($scope.YEAR1 != null && $scope.YEAR1 != undefined && $scope.YEAR1 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR1, District: $scope.District1, Place: $scope.PLACE1, Class: "Class 1" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR2 != null && $scope.YEAR2 != undefined && $scope.YEAR2 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR2, District: $scope.District2, Place: $scope.PLACE2, Class: "Class 2" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR3 != null && $scope.YEAR3 != undefined && $scope.YEAR3 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR3, District: $scope.District3, Place: $scope.PLACE3, Class: "Class 3" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR4 != null && $scope.YEAR4 != undefined && $scope.YEAR4 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR4, District: $scope.District4, Place: $scope.PLACE4, Class: "Class 4" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR5 != null && $scope.YEAR5 != undefined && $scope.YEAR5 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR5, District: $scope.District5, Place: $scope.PLACE5, Class: "Class 5" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR6 != null && $scope.YEAR6 != undefined && $scope.YEAR6 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR6, District: $scope.District6, Place: $scope.PLACE6, Class: "Class 6" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR7 != null && $scope.YEAR7 != undefined && $scope.YEAR7 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR7, District: $scope.District7, Place: $scope.PLACE7, Class: "Class 7" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR8 != null && $scope.YEAR8 != undefined && $scope.YEAR8 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR8, District: $scope.District8, Place: $scope.PLACE8, Class: "Class 8" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR9 != null && $scope.YEAR9 != undefined && $scope.YEAR9 != "") {
                var obj = {}
                var obj = { Year: $scope.YEAR9, District: $scope.District9, Place: $scope.PLACE9, Class: "Class 9" }
                $scope.array.push(obj)
            }
            if ($scope.YEAR10 != null && $scope.YEAR10 != undefined && $scope.YEAR10 != "") {
                var obj = { Year: $scope.YEAR10, District: $scope.District10, Place: $scope.PLACE10, Class: "Class 10" }
                $scope.array.push(obj)
            }

            //console.log($scope.array)
            //try {
            //    $scope.QualifiedExamData = JSON.parse($scope.QualifiedExam);
            //} catch (err) { }


            //$scope.ThirdCard = true;
        }


        //$scope.Save = function () {
        //    $scope.Preview();
        //    var Type = 7;
        //    if (Type == 7) {
        //        $scope.class1 = "";
        //        $scope.class2 = "";
        //        $scope.class3 = "";
        //        $scope.class4 = "";
        //        $scope.class5 = "";
        //        $scope.class6 = "";
        //        $scope.class7 = "";
        //        $scope.class8 = "active";
        //        //    $scope.NextTab(Type);
        //    }


        //    //if ($scope.qualifiedExamID == null || $scope.qualifiedExamID == undefined || $scope.qualifiedExamID == "") {
        //    //    alert("Please Select Qualified Exam");
        //    //    return;
        //    //}
        //    //if ($scope.sscHallticket == null || $scope.sscHallticket == undefined || $scope.sscHallticket == "") {
        //    //    alert("Please Enter Hallticket Number");
        //    //    return;
        //    //}
        //    //if ($scope.passedoutYear == null || $scope.passedoutYear == undefined || $scope.passedoutYear == "") {
        //    //    alert("Please Enter Passedout Year");
        //    //    return;
        //    //}
        //    //if ($scope.sscType == null || $scope.sscType == undefined || $scope.sscType == "") {
        //    //    alert("Please Select SSC Type");
        //    //    return;
        //    //}

        //    //if ($scope.CNAME == null || $scope.CNAME == undefined || $scope.CNAME == "") {
        //    //    alert("Please Enter Student Name");
        //    //    return;
        //    //}

        //    //if ($scope.FNAME == null || $scope.FNAME == undefined || $scope.FNAME == "") {
        //    //    alert("Please Enter Father Name");
        //    //    return;
        //    //}

        //    //if ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == "") {
        //    //    alert("Please Select Mother Name");
        //    //    return;
        //    //}
        //    //if ($scope.DOB_DATE == null || $scope.DOB_DATE == undefined || $scope.DOB_DATE == "") {
        //    //    alert("Please Select DateofBirth");
        //    //    return;
        //    //}
        //    //if ($scope.Gender == null || $scope.Gender == undefined || $scope.Gender == "") {
        //    //    alert("Please Select Gender");
        //    //    return;
        //    //}
        //    //if ($scope.MobileNumber == null || $scope.MobileNumber == undefined || $scope.MobileNumber == "") {
        //    //    alert("Please Enter MobileNumber");
        //    //    return;
        //    //}
        //    //if ($scope.AltMobileNumber == null || $scope.AltMobileNumber == undefined || $scope.AltMobileNumber == "") {
        //    //    alert("Please Enter Alternate MobileNumber");
        //    //    return;
        //    //}
        //    //if ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == "") {
        //    //    alert("Please Enter House Number / Building Name");
        //    //    return;
        //    //}
        //    //if ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == "") {
        //    //    alert("Please Enter Street Number / Name");
        //    //    return;
        //    //}
        //    //if ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == "") {
        //    //    alert("Please Enter Locality");
        //    //    return;
        //    //}

        //    //if ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == "") {
        //    //    alert("Please Enter Landmark");
        //    //    return;
        //    //}

        //    //if ($scope.Pincode == null || $scope.Pincode == undefined || $scope.Pincode == "") {
        //    //    alert("Please Enter Pincode");
        //    //    return;
        //    //}
        //    //if ($scope.StateId == null || $scope.StateId == undefined || $scope.StateId == "") {
        //    //    alert("Please Select State");
        //    //    return;
        //    //}
        //    //if ($scope.District == null || $scope.District == undefined || $scope.District == "") {
        //    //    alert("Please Select District");
        //    //    return;
        //    //}
        //    //if ($scope.Mandal == null || $scope.Mandal == undefined || $scope.Mandal == "") {
        //    //    alert("Please Select Mandal");
        //    //    return;
        //    //}
        //    //if ($scope.CasteCategory == null || $scope.CasteCategory == undefined || $scope.CasteCategory == "") {
        //    //    alert("Please Select Caste Category");
        //    //    return;
        //    //}
        //    //if ($scope.Region == null || $scope.Region == undefined || $scope.Region == "") {
        //    //    alert("Please Select Region");
        //    //    return;
        //    //}
        //    //if ($scope.Minority == null || $scope.Minority == undefined || $scope.Minority == "") {
        //    //    alert("Please Select Minority");
        //    //    return;
        //    //}
        //    //if ($scope.Assistance_Urdu == null || $scope.Assistance_Urdu == undefined || $scope.Assistance_Urdu == "") {
        //    //    alert("Please Select Assistance in Urdu");
        //    //    return;
        //    //}
        //    //if ($scope.Handicaped == null || $scope.Handicaped == undefined || $scope.Handicaped == "") {
        //    //    alert("Please Select Physically Handicaped");
        //    //    return;
        //    //}
        //    //if ($scope.NCC == null || $scope.NCC == undefined || $scope.NCC == "") {
        //    //    alert("Please Select NCC");
        //    //    return;
        //    //}
        //    //if ($scope.Sports == null || $scope.Sports == undefined || $scope.Sports == "") {
        //    //    alert("Please Select Sports");
        //    //    return;
        //    //}
        //    //if ($scope.CAP == null || $scope.CAP == undefined || $scope.CAP == "") {
        //    //    alert("Please Select CAP");
        //    //    return;
        //    //}
        //    //if ($scope.PMCares == null || $scope.PMCares == undefined || $scope.PMCares == "") {
        //    //    alert("Please Select PM Cares");
        //    //    return;
        //    //}
        //    //if ($scope.AppearforBiology == null || $scope.AppearforBiology == undefined || $scope.AppearforBiology == "") {
        //    //    alert("Please Select Appear for Biology");
        //    //    return;
        //    //}
        //    //if ($scope.TelanganaDistrict1 == null || $scope.TelanganaDistrict1 == undefined || $scope.TelanganaDistrict1 == "") {
        //    //    alert("Please Select Preference 1 District");
        //    //    return;
        //    //}
        //    //if ($scope.PreferenceMandal1 == null || $scope.PreferenceMandal1 == undefined || $scope.PreferenceMandal1 == "") {
        //    //    alert("Please Select Preference 1 Mandal");
        //    //    return;
        //    //}
        //    //if ($scope.TelanganaDistrict2 == null || $scope.TelanganaDistrict2 == undefined || $scope.TelanganaDistrict2 == "") {
        //    //    alert("Please Select Preference 2 District");
        //    //    return;
        //    //}
        //    //if ($scope.PreferenceMandal2 == null || $scope.PreferenceMandal2 == undefined || $scope.PreferenceMandal2 == "") {
        //    //    alert("Please Select Preference 2 Mandal");
        //    //    return;
        //    //}
        //    //if ($scope.TelanganaDistrict3 == null || $scope.TelanganaDistrict3 == undefined || $scope.TelanganaDistrict3 == "") {
        //    //    alert("Please Select Preference 3 District");
        //    //    return;
        //    //}
        //    //if ($scope.PreferenceMandal3 == null || $scope.PreferenceMandal3 == undefined || $scope.PreferenceMandal3 == "") {
        //    //    alert("Please Select Preference 3 Mandal");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR1 == null || $scope.YEAR1 == undefined || $scope.YEAR1 == "") {
        //    //    alert("Please Enter Class1 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State1 == null || $scope.State1 == undefined || $scope.State1 == "") {
        //    //    alert("Please Select Class1 State");
        //    //    return;
        //    //}
        //    //if ($scope.District1 == null || $scope.District1 == undefined || $scope.District1 == "") {
        //    //    alert("Please Select Class1 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE1 == null || $scope.PLACE1 == undefined || $scope.PLACE1 == "") {
        //    //    alert("Please Select Class1 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR2 == null || $scope.YEAR2 == undefined || $scope.YEAR2 == "") {
        //    //    alert("Please Enter Class2 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State2 == null || $scope.State2 == undefined || $scope.State2 == "") {
        //    //    alert("Please Select Class2 State");
        //    //    return;
        //    //}
        //    //if ($scope.District2 == null || $scope.District2 == undefined || $scope.District2 == "") {
        //    //    alert("Please Select Class2 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE2 == null || $scope.PLACE2 == undefined || $scope.PLACE2 == "") {
        //    //    alert("Please Select Class2 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR3 == null || $scope.YEAR3 == undefined || $scope.YEAR3 == "") {
        //    //    alert("Please Enter Class3 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State3 == null || $scope.State3 == undefined || $scope.State3 == "") {
        //    //    alert("Please Select Class3 State");
        //    //    return;
        //    //}
        //    //if ($scope.District3 == null || $scope.District3 == undefined || $scope.District3 == "") {
        //    //    alert("Please Select Class3 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE3 == null || $scope.PLACE3 == undefined || $scope.PLACE3 == "") {
        //    //    alert("Please Select Class3 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR4 == null || $scope.YEAR4 == undefined || $scope.YEAR4 == "") {
        //    //    alert("Please Enter Class4 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State4 == null || $scope.State4 == undefined || $scope.State4 == "") {
        //    //    alert("Please Select Class4 State");
        //    //    return;
        //    //}
        //    //if ($scope.District4 == null || $scope.District4 == undefined || $scope.District4 == "") {
        //    //    alert("Please Select Class4 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE4 == null || $scope.PLACE4 == undefined || $scope.PLACE4 == "") {
        //    //    alert("Please Select Class4 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR5 == null || $scope.YEAR5 == undefined || $scope.YEAR5 == "") {
        //    //    alert("Please Enter Class5 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State5 == null || $scope.State5 == undefined || $scope.State5 == "") {
        //    //    alert("Please Select Class5 State");
        //    //    return;
        //    //}
        //    //if ($scope.District5 == null || $scope.District5 == undefined || $scope.District5 == "") {
        //    //    alert("Please Select Class5 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE5 == null || $scope.PLACE5 == undefined || $scope.PLACE5 == "") {
        //    //    alert("Please Select Class5 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR6 == null || $scope.YEAR6 == undefined || $scope.YEAR6 == "") {
        //    //    alert("Please Enter Class6 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State6 == null || $scope.State6 == undefined || $scope.State6 == "") {
        //    //    alert("Please Select Class6 State");
        //    //    return;
        //    //}
        //    //if ($scope.District6 == null || $scope.District6 == undefined || $scope.District6 == "") {
        //    //    alert("Please Select Class6 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE6 == null || $scope.PLACE6 == undefined || $scope.PLACE6 == "") {
        //    //    alert("Please Select Class6 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR7 == null || $scope.YEAR7 == undefined || $scope.YEAR7 == "") {
        //    //    alert("Please Enter Class7 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State7 == null || $scope.State7 == undefined || $scope.State7 == "") {
        //    //    alert("Please Select Class7 State");
        //    //    return;
        //    //}
        //    //if ($scope.District7 == null || $scope.District7 == undefined || $scope.District7 == "") {
        //    //    alert("Please Select Class7 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE7 == null || $scope.PLACE7 == undefined || $scope.PLACE7 == "") {
        //    //    alert("Please Select Class7 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR8 == null || $scope.YEAR8 == undefined || $scope.YEAR8 == "") {
        //    //    alert("Please Enter Class8 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State8 == null || $scope.State8 == undefined || $scope.State8 == "") {
        //    //    alert("Please Select Class8 State");
        //    //    return;
        //    //}
        //    //if ($scope.District8 == null || $scope.District8 == undefined || $scope.District8 == "") {
        //    //    alert("Please Select Class8 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE8 == null || $scope.PLACE8 == undefined || $scope.PLACE8 == "") {
        //    //    alert("Please Select Class8 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR9 == null || $scope.YEAR9 == undefined || $scope.YEAR9 == "") {
        //    //    alert("Please Enter Class9 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State9 == null || $scope.State9 == undefined || $scope.State9 == "") {
        //    //    alert("Please Select Class9 State");
        //    //    return;
        //    //}
        //    //if ($scope.District9 == null || $scope.District9 == undefined || $scope.District9 == "") {
        //    //    alert("Please Select Class9 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE9 == null || $scope.PLACE9 == undefined || $scope.PLACE9 == "") {
        //    //    alert("Please Select Class9 Place");
        //    //    return;
        //    //}
        //    //if ($scope.YEAR10 == null || $scope.YEAR10 == undefined || $scope.YEAR10 == "") {
        //    //    alert("Please Enter Class10 Passed Year");
        //    //    return;
        //    //}
        //    //if ($scope.State10 == null || $scope.State10 == undefined || $scope.State10 == "") {
        //    //    alert("Please Select Class10 State");
        //    //    return;
        //    //}
        //    //if ($scope.District10 == null || $scope.District10 == undefined || $scope.District10 == "") {
        //    //    alert("Please Select Class10 District");
        //    //    return;
        //    //}

        //    //if ($scope.PLACE10 == null || $scope.PLACE10 == undefined || $scope.PLACE10 == "") {
        //    //    alert("Please Select Class10 Place");
        //    //    return;
        //    //}
        //    //if ($scope.StudentPhotoConvert == null || $scope.StudentPhotoConvert == undefined || $scope.StudentPhotoConvert == "") {
        //    //    alert("Please Select Class10 Place");
        //    //    return;
        //    //}
        //    //if ($scope.StudentSignConvert == null || $scope.StudentSignConvert == undefined || $scope.StudentSignConvert == "") {
        //    //    alert("Please Select Class10 Place");
        //    //    return;
        //    //}

        //    let DistrictID = ($scope.District == null || $scope.District == undefined || $scope.District == '') ? '' : $scope.District;
        //    let MandalID = ($scope.Mandal == null || $scope.Mandal == undefined || $scope.Mandal == '') ? '' : $scope.Mandal;
        //    let Districtname = ($scope.DistrictName == null || $scope.DistrictName == undefined || $scope.DistrictName == '') ? '' : $scope.DistrictName;
        //    let SSCHallTicket = ($scope.sscHallticket == null || $scope.sscHallticket == undefined || $scope.sscHallticket == '') ? '' : $scope.sscHallticket;
        //    let PassedOutYear = ($scope.passedoutYear == null || $scope.passedoutYear == undefined || $scope.passedoutYear == '') ? '' : $scope.passedoutYear;
        //    let SscType = ($scope.sscType == null || $scope.sscType == undefined || $scope.sscType == '') ? '' : $scope.sscType;
        //    let StudentName = ($scope.CNAME == null || $scope.CNAME == undefined || $scope.CNAME == '') ? '' : $scope.CNAME;
        //    let FatherName = ($scope.FNAME == null || $scope.FNAME == undefined || $scope.FNAME == '') ? '' : $scope.FNAME;
        //    let MotherName = ($scope.MNAME == null || $scope.MNAME == undefined || $scope.MNAME == '') ? '' : $scope.MNAME;
        //    let DateofBirth = ($scope.DOB_DATE == null || $scope.DOB_DATE == undefined || $scope.DOB_DATE == '') ? '' : $scope.DOB_DATE;
        //    let Gender = ($scope.Gender == null || $scope.Gender == undefined || $scope.Gender == '') ? '' : $scope.Gender;
        //    let MobileNumber = ($scope.MobileNumber == null || $scope.MobileNumber == undefined || $scope.MobileNumber == '') ? '' : $scope.MobileNumber;
        //    let AlternateMobile = ($scope.AltMobileNumber == null || $scope.AltMobileNumber == undefined || $scope.AltMobileNumber == '') ? '' : $scope.AltMobileNumber;
        //    let Email = ($scope.Email == null || $scope.Email == undefined || $scope.Email == '') ? '' : $scope.Email;
        //    let HouseNo = ($scope.HouseNo == null || $scope.HouseNo == undefined || $scope.HouseNo == '') ? '' : $scope.HouseNo;
        //    let StreetNo = ($scope.StreetNo == null || $scope.StreetNo == undefined || $scope.StreetNo == '') ? '' : $scope.StreetNo;
        //    let Locality = ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == '') ? '' : $scope.Locality;
        //    let Landmark = ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == '') ? '' : $scope.Landmark;
        //    let Village = ($scope.Village == null || $scope.Village == undefined || $scope.Village == '') ? '' : $scope.Village;
        //    let MandalName = ($scope.MandalName == null || $scope.MandalName == undefined || $scope.MandalName == '') ? '' : $scope.MandalName;
        //    let Pincode = ($scope.Pincode == null || $scope.Pincode == undefined || $scope.Pincode == '') ? '' : $scope.Pincode;
        //    let CasteCategory = ($scope.CasteCategory == null || $scope.CasteCategory == undefined || $scope.CasteCategory == '') ? '' : $scope.CasteCategory;
        //    let CasteCertificateNumber = ($scope.CasteCertificateNumber == null || $scope.CasteCertificateNumber == undefined || $scope.CasteCertificateNumber == '') ? '' : $scope.CasteCertificateNumber;
        //    let CasteVerified = ($scope.CasteVerified == null || $scope.CasteVerified == undefined || $scope.CasteVerified == '') ? '' : $scope.CasteVerified;
        //    let EwsCertificate = ($scope.EwsCertificate == null || $scope.EwsCertificate == undefined || $scope.EwsCertificate == '') ? '' : $scope.EwsCertificate;
        //    let EWSNumber = ($scope.EWSNumber == null || $scope.EWSNumber == undefined || $scope.EWSNumber == '') ? '' : $scope.EWSNumber;
        //    let EWSVerified = ($scope.EWSVerified == null || $scope.EWSVerified == undefined || $scope.EWSVerified == '') ? '' : $scope.EWSVerified;
        //    let Region = ($scope.RegionID == null || $scope.RegionID == undefined || $scope.RegionID == '') ? '' : $scope.RegionID;
        //    let Minority = ($scope.MinorityID == null || $scope.MinorityID == undefined || $scope.MinorityID == '') ? '' : $scope.MinorityID;
        //    let Assistance_Urdu = ($scope.Assistance_Urdu == null || $scope.Assistance_Urdu == undefined || $scope.Assistance_Urdu == '') ? '' : $scope.Assistance_Urdu;
        //    let Handicaped = ($scope.Handicaped == null || $scope.Handicaped == undefined || $scope.Handicaped == '') ? '' : $scope.Handicaped;
        //    let NCC = ($scope.NCC == null || $scope.NCC == undefined || $scope.NCC == '') ? '' : $scope.NCC;
        //    let Aadhar = ($scope.Aadhar == null || $scope.Aadhar == undefined || $scope.Aadhar == '') ? '' : $scope.Aadhar;
        //    let Sports = ($scope.Sports == null || $scope.Sports == undefined || $scope.Sports == '') ? '' : $scope.Sports;
        //    let CAP = ($scope.CAP == null || $scope.CAP == undefined || $scope.CAP == '') ? '' : $scope.CAP;
        //    let PMCares = ($scope.PMCares == null || $scope.PMCares == undefined || $scope.PMCares == '') ? '' : $scope.PMCares;
        //    let AppearforBiology = ($scope.AppearforBiology == null || $scope.AppearforBiology == undefined || $scope.AppearforBiology == '') ? '' : $scope.AppearforBiology;
        //    let TelanganaDistrict1 = ($scope.TelanganaDistrict1 == null || $scope.TelanganaDistrict1 == undefined || $scope.TelanganaDistrict1 == '') ? '' : $scope.TelanganaDistrict1;
        //    let PreferenceMandal1 = ($scope.PreferenceMandal1ID == null || $scope.PreferenceMandal1ID == undefined || $scope.PreferenceMandal1ID == '') ? '' : $scope.PreferenceMandal1ID;
        //    let TelanganaDistrict2 = ($scope.TelanganaDistrict2 == null || $scope.TelanganaDistrict2 == undefined || $scope.TelanganaDistrict2 == '') ? '' : $scope.TelanganaDistrict2;
        //    let PreferenceMandal2 = ($scope.PreferenceMandal2ID == null || $scope.PreferenceMandal2ID == undefined || $scope.PreferenceMandal2ID == '') ? '' : $scope.PreferenceMandal2ID;
        //    let TelanganaDistrict3 = ($scope.TelanganaDistrict3 == null || $scope.TelanganaDistrict3 == undefined || $scope.TelanganaDistrict3 == '') ? '' : $scope.TelanganaDistrict3;
        //    let PreferenceMandal3 = ($scope.PreferenceMandal3ID == null || $scope.PreferenceMandal3ID == undefined || $scope.PreferenceMandal3ID == '') ? '' : $scope.PreferenceMandal3ID;
        //    let YEAR1 = ($scope.YEAR1 == null || $scope.YEAR1 == undefined || $scope.YEAR1 == '') ? '' : $scope.YEAR1;
        //    let State1 = ($scope.State1 == null || $scope.State1 == undefined || $scope.State1 == '') ? '' : $scope.State1;
        //    let District1 = ($scope.District1 == null || $scope.District1 == undefined || $scope.District1 == '') ? '' : $scope.District1;
        //    let PLACE1 = ($scope.PLACE1 == null || $scope.PLACE1 == undefined || $scope.PLACE1 == '') ? '' : $scope.PLACE1;
        //    let YEAR2 = ($scope.YEAR2 == null || $scope.YEAR2 == undefined || $scope.YEAR2 == '') ? '' : $scope.YEAR2;
        //    let State2 = ($scope.State2 == null || $scope.State2 == undefined || $scope.State2 == '') ? '' : $scope.State2;
        //    let District2 = ($scope.District2 == null || $scope.District2 == undefined || $scope.District2 == '') ? '' : $scope.District2;
        //    let PLACE2 = ($scope.PLACE2 == null || $scope.PLACE2 == undefined || $scope.PLACE2 == '') ? '' : $scope.PLACE2;
        //    let YEAR3 = ($scope.YEAR3 == null || $scope.YEAR3 == undefined || $scope.YEAR3 == '') ? '' : $scope.YEAR3;
        //    let State3 = ($scope.State3 == null || $scope.State3 == undefined || $scope.State3 == '') ? '' : $scope.State3;
        //    let District3 = ($scope.District3 == null || $scope.District3 == undefined || $scope.District3 == '') ? '' : $scope.District3;
        //    let PLACE3 = ($scope.PLACE3 == null || $scope.PLACE3 == undefined || $scope.PLACE3 == '') ? '' : $scope.PLACE3;
        //    let YEAR4 = ($scope.YEAR4 == null || $scope.YEAR4 == undefined || $scope.YEAR4 == '') ? '' : $scope.YEAR4;
        //    let State4 = ($scope.State4 == null || $scope.State4 == undefined || $scope.State4 == '') ? '' : $scope.State4;
        //    let District4 = ($scope.District4 == null || $scope.District4 == undefined || $scope.District4 == '') ? '' : $scope.District4;
        //    let PLACE4 = ($scope.PLACE4 == null || $scope.PLACE4 == undefined || $scope.PLACE4 == '') ? '' : $scope.PLACE4;
        //    let YEAR5 = ($scope.YEAR5 == null || $scope.YEAR5 == undefined || $scope.YEAR5 == '') ? '' : $scope.YEAR5;
        //    let State5 = ($scope.State5 == null || $scope.State5 == undefined || $scope.State5 == '') ? '' : $scope.State5;
        //    let District5 = ($scope.District5 == null || $scope.District5 == undefined || $scope.District5 == '') ? '' : $scope.District5;
        //    let PLACE5 = ($scope.PLACE5 == null || $scope.PLACE5 == undefined || $scope.PLACE5 == '') ? '' : $scope.PLACE5;
        //    let YEAR6 = ($scope.YEAR6 == null || $scope.YEAR6 == undefined || $scope.YEAR6 == '') ? '' : $scope.YEAR6;
        //    let State6 = ($scope.State6 == null || $scope.State6 == undefined || $scope.State6 == '') ? '' : $scope.State6;
        //    let District6 = ($scope.District6 == null || $scope.District6 == undefined || $scope.District6 == '') ? '' : $scope.District6;
        //    let PLACE6 = ($scope.PLACE6 == null || $scope.PLACE6 == undefined || $scope.PLACE6 == '') ? '' : $scope.PLACE6;
        //    let YEAR7 = ($scope.YEAR7 == null || $scope.YEAR7 == undefined || $scope.YEAR7 == '') ? '' : $scope.YEAR7;
        //    let State7 = ($scope.State7 == null || $scope.State7 == undefined || $scope.State7 == '') ? '' : $scope.State7;
        //    let District7 = ($scope.District7 == null || $scope.District7 == undefined || $scope.District7 == '') ? '' : $scope.District7;
        //    let PLACE7 = ($scope.PLACE7 == null || $scope.PLACE7 == undefined || $scope.PLACE7 == '') ? '' : $scope.PLACE7;
        //    let YEAR8 = ($scope.YEAR8 == null || $scope.YEAR8 == undefined || $scope.YEAR8 == '') ? '' : $scope.YEAR8;
        //    let State8 = ($scope.State8 == null || $scope.State8 == undefined || $scope.State8 == '') ? '' : $scope.State8;
        //    let District8 = ($scope.District8 == null || $scope.District8 == undefined || $scope.District8 == '') ? '' : $scope.District8;
        //    let PLACE8 = ($scope.PLACE8 == null || $scope.PLACE8 == undefined || $scope.PLACE8 == '') ? '' : $scope.PLACE8;
        //    let YEAR9 = ($scope.YEAR9 == null || $scope.YEAR9 == undefined || $scope.YEAR9 == '') ? '' : $scope.YEAR9;
        //    let State9 = ($scope.State9 == null || $scope.State9 == undefined || $scope.State9 == '') ? '' : $scope.State9;
        //    let District9 = ($scope.District9 == null || $scope.District9 == undefined || $scope.District9 == '') ? '' : $scope.District9;
        //    let PLACE9 = ($scope.PLACE9 == null || $scope.PLACE9 == undefined || $scope.PLACE9 == '') ? '' : $scope.PLACE9;
        //    let YEAR10 = ($scope.YEAR10 == null || $scope.YEAR10 == undefined || $scope.YEAR10 == '') ? '' : $scope.YEAR10;
        //    let State10 = ($scope.State10 == null || $scope.State10 == undefined || $scope.State10 == '') ? '' : $scope.State10;
        //    let District10 = ($scope.District10 == null || $scope.District10 == undefined || $scope.District10 == '') ? '' : $scope.District10;
        //    let PLACE10 = ($scope.PLACE10 == null || $scope.PLACE10 == undefined || $scope.PLACE10 == '') ? '' : $scope.PLACE10;

        //    var paramObj = {

        //        "RegistrationID": $scope.RegistrationId,
        //        "RegistrationNumber": $scope.RegistrationNumber,
        //        "QualifiedExamID": $scope.qualifiedExamID,
        //        "TenthHallticketNumber": SSCHallTicket,
        //        "TenthYear": PassedOutYear,
        //        "ExaminationType": SscType,
        //        "StudentName": StudentName,
        //        "FatherName": FatherName,
        //        "MotherName": MotherName,
        //        "DateofBirth": DateofBirth,
        //        "Gender": Gender,
        //        "MobileNumber": MobileNumber,
        //        "AlternateMobileNumber": AlternateMobile,
        //        "Email": Email,
        //        "HouseNumber": HouseNo,
        //        "StreetName": StreetNo,
        //        "Locality": Locality,
        //        "Landmark": Landmark,
        //        "Village": Village,
        //        "StateID": $scope.StateId,
        //        "DistrictID": DistrictID,
        //        "DistrictName": Districtname,
        //        "MandalID": MandalID,
        //        "MandalName": MandalName,
        //        "Pincode": Pincode,
        //        "CasteCategoryID": CasteCategory,
        //        "AadharNumber": Aadhar,
        //        "CasteCertificateNumber": CasteCertificateNumber,
        //        "CasteVerified": CasteVerified,
        //        "EWS": EwsCertificate,
        //        "EWSNumber": EWSNumber,
        //        "EWSVerified": EWSVerified,
        //        "RegionID": Region,
        //        "MinorityID": Minority,
        //        "AssistanceinUrdu": Assistance_Urdu,
        //        "PH": Handicaped,
        //        "NCC": NCC,
        //        "SportsAndGames": Sports,
        //        "CAP": CAP,
        //        "PMCares": PMCares,
        //        "AppearedForBiology": AppearforBiology,
        //        "PreferenceDistrictID1": TelanganaDistrict1,
        //        "PreferenceMandalID1": PreferenceMandal1,
        //        "PreferenceDistrictID2": TelanganaDistrict2,
        //        "PreferenceMandalID2": PreferenceMandal2,
        //        "PreferenceDistrictID3": TelanganaDistrict3,
        //        "PreferenceMandalID3": PreferenceMandal3,
        //        "Class1Year": YEAR1,
        //        "Class1StateID": State1,
        //        "Class1DistrictID": District1,
        //        "Class1Place": PLACE1,
        //        "Class2Year": YEAR2,
        //        "Class2StateID": State2,
        //        "Class2DistrictID": District2,
        //        "Class2Place": PLACE2,
        //        "Class3Year": YEAR3,
        //        "Class3StateID": State3,
        //        "Class3DistrictID": District3,
        //        "Class3Place": PLACE3,
        //        "Class4Year": YEAR4,
        //        "Class4StateID": State4,
        //        "Class4DistrictID": District4,
        //        "Class4Place": PLACE4,
        //        "Class5Year": YEAR5,
        //        "Class5StateID": State5,
        //        "Class5DistrictID": District5,
        //        "Class5Place": PLACE5,
        //        "Class6Year": YEAR6,
        //        "Class6StateID": State6,
        //        "Class6DistrictID": District6,
        //        "Class6Place": PLACE6,
        //        "Class7Year": YEAR7,
        //        "Class7StateID": State7,
        //        "Class7DistrictID": District7,
        //        "Class7Place": PLACE7,
        //        "Class8Year": YEAR8,
        //        "Class8StateID": State8,
        //        "Class8DistrictID": District8,
        //        "Class8Place": PLACE8,
        //        "Class9Year": YEAR9,
        //        "Class9StateID": State9,
        //        "Class9DistrictID": District9,
        //        "Class9Place": PLACE9,
        //        "Class10Year": YEAR10,
        //        "Class10StateID": State10,
        //        "Class10DistrictID": District10,
        //        "Class10Place": PLACE10,
        //        "StudentPhoto": ($scope.StudentPhotoConvert == undefined || $scope.StudentPhotoConvert == null) ? '' : $scope.StudentPhotoConvert,
        //        "StudentSignature": ($scope.StudentSignConvert == undefined || $scope.StudentSignConvert == null) ? '' : $scope.StudentSignConvert,

        //    }

        //    //$scope.loading = true;
        //    var addstudentdetails = AdminService.AddStudentDetails(paramObj);
        //    addstudentdetails.then(function (response) {
        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        console.log(response)
        //        if (res[0].StatusCode == '200') {
        //            //$scope.loading = false;
        //            alert('Student Details Added Successfully');
        //            $scope.PreviewDisable = true;
        //            //$scope.loading = false;
        //            //$scope.nodata = false;
        //            //$scope.getExaminationCentres($scope.UserName);
        //            //$scope.ExaminationCentreName = null;
        //            //$scope.ExaminationCentreType = null;
        //            //$scope.MandalsData = [];
        //            //$scope.ExaminationCentreName = null;
        //            //$scope.ExaminationCentreType = null;
        //            //$scope.HouseNo = null;
        //            //$scope.Village = null;
        //            //$scope.Landmark = null;
        //            //$scope.Locality = null;
        //            //$scope.StreetNo = null;
        //            //$scope.PinCode = null;
        //            //$scope.AllMandalsData = [];
        //            //$scope.ExamDistrictsData = [];
        //            //$scope.districtarr = [];
        //            //$scope.mandalarr = [];
        //            //$scope.getDistricts();
        //            //$scope.isAllSelecteddistricts = null;
        //            //$scope.isAllSelectedmandals = null;
        //            ////$scope.ExaminationCentreCategory = null;
        //            ////$scope.UrduMedium = null;
        //            //$scope.StudentsperBench = null;
        //            //$scope.TotalCapacity = null
        //            ////$scope.CentreCapacityOneperBench = null;
        //            ////$scope.CentreCapacityTwoperBench = null;
        //            //$scope.PriorityOrder = null;
        //            //$scope.SuperitendentName = null
        //            //$scope.SuperitendentEmail = null;
        //            //$scope.SuperitendentMobile = null;
        //            //$scope.AsstSuperitendentName = null
        //            //$scope.AsstMobile = null;
        //            //$scope.AsstEmail = null;





        //        } else if (res[0].StatusCode == '400') {
        //           // $scope.PreviewDisable = false;
        //            $scope.loading = false;
        //            alert(res[0].StatusDescription);




        //        }


        //    },

        //        function (error) {
        //           // $scope.PreviewDisable = false;
        //            var err = JSON.parse(error);
        //        })


        //}

        $scope.getPersonalDetails = function () {
            if ($scope.SSCVerified == 'true') {

            }
        }



        $scope.getStudentDetails = function () {
            //$scope.loading = true;
            $scope.nodata = false;
            var getstddetails = AdminService.GetStudentDetails($scope.RegistrationId);
            getstddetails.then(function (res) {

                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }
                if (res.Table.length > 0) {
                    $scope.PersonalDetails = res.Table[0];
                    $scope.RegistrationNumber = $scope.PersonalDetails.RegistrationNumber
                    $scope.qualifiedExamID = $scope.PersonalDetails.QualifiedExamID
                    $scope.qualifiedExamName = $scope.PersonalDetails.QualifiedExamName
                    $scope.passedoutYear = $scope.PersonalDetails.TenthYear
                    $scope.sscHallticket = $scope.PersonalDetails.TenthHallticketNumber
                    $scope.CNAME = $scope.PersonalDetails.StudentName
                    $scope.MNAME = $scope.PersonalDetails.MotherName
                    $scope.Gender = $scope.PersonalDetails.Gender
                    $scope.FNAME = $scope.PersonalDetails.FatherName
                    $scope.sscType = $scope.PersonalDetails.ExaminationType
                    $scope.DOB_DATE = $scope.PersonalDetails.DateofBirth
                    $scope.DOB_TEXT = $scope.PersonalDetails.DateofBirthText
                    $scope.SSCVerified = $scope.PersonalDetails.SSCVerified



                    if ($scope.qualifiedExamID == 1) {
                        $scope.ssclabel = true;
                    }
                }




                if ($scope.SSCVerified == true && $scope.qualifiedExamID == 1) {
                    $scope.SSCBUTTONCLICK = true;
                    $scope.ENTEREDSSCHALLTICKET = true;
                    $scope.ENTEREDYEAR = true;
                    $scope.ENTEREDSSCTYPE = true;
                    $scope.SELECTEDQUALIFIEDEXAM = true;
                    $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                    $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                    $scope.MotherNamefound = $scope.MNAME != "" ? true : false;
                    $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;
                    $scope.Genderfound = $scope.Gender != "" ? true : false;
                    $scope.GETSSCDETAILSBUTTON = true;
                    $scope.CancelSSCButton = true;



                }

                if ($scope.SSCVerified == false) {
                    $scope.SSCBUTTONCLICK = true;

                }

                if (res.Table.length <= 0) {
                    if ($scope.qualifiedExamID == 1) {
                        $scope.ssclabel = true;
                    }
                    else {
                        $scope.ssclabel = false;
                    }
                    $scope.DOB_DATE = null;
                }

                if ($scope.SSCVerified == true && $scope.qualifiedExamID == 1) {
                    $scope.SSCBUTTONCLICK = true;
                    $scope.ENTEREDSSCHALLTICKET = true;
                    $scope.ENTEREDYEAR = true;
                    $scope.ENTEREDSSCTYPE = true;
                    $scope.SELECTEDQUALIFIEDEXAM = true;
                    $scope.CandidateNamefound = $scope.CNAME != "" ? true : false;
                    $scope.FatherNameFound = $scope.FNAME != "" ? true : false;
                    $scope.MotherNamefound = $scope.MNAME != "" ? true : false;
                    $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;
                    $scope.Genderfound = $scope.Gender != "" ? true : false;
                    $scope.GETSSCDETAILSBUTTON = true;
                    $scope.CancelSSCButton = true;



                }

                if (($scope.qualifiedExamID == 2 || $scope.qualifiedExamID == 3 || $scope.qualifiedExamID == 4
                    || $scope.qualifiedExamID == 5 || $scope.qualifiedExamID == 6 || $scope.qualifiedExamID == 7
                    || $scope.qualifiedExamID == 8 || $scope.qualifiedExamID == 9 || $scope.qualifiedExamID == 10
                ) && $scope.SSCVerified == false) {
                    $scope.SSCBUTTONCLICK = true;
                    $scope.CancelSSCButton = false;
                }

                if (res.Table1.length <= 0) {
                    $scope.Email = $scope.RegistrationEmail;
                    $scope.MobileNumber = $scope.RegistrationMobile;

                }

                if (res.Table1.length > 0) {
                    var CommunicationDetails = res.Table1[0];
                    $scope.CommunicationDetails = res.Table1[0];
                    $scope.PrevData = res.Table1[0];
                    $scope.MobileNumber = CommunicationDetails.MobileNumber
                    $scope.AltMobileNumber = CommunicationDetails.AlternateMobileNumber

                    $scope.HouseNo = CommunicationDetails.HouseNumber
                    $scope.Landmark = CommunicationDetails.Landmark
                    $scope.Locality = CommunicationDetails.Locality

                    $scope.StateName = CommunicationDetails.StateName

                    $scope.State = CommunicationDetails.StateID
                    // $scope.AltMobileNumber = CommunicationDetails.MobileNumber
                    $scope.Pincode = CommunicationDetails.Pincode
                    $scope.State = $scope.CommunicationDetails.StateID
                    $scope.StreetNo = CommunicationDetails.StreetName
                    $scope.Village = CommunicationDetails.Village
                    $scope.Email = CommunicationDetails.Email

                    //if ($scope.State == 1) {
                    //    $scope.District = CommunicationDetails.District;
                    //    $scope.Mandal = CommunicationDetails.Mandal;
                    //}
                    //else {
                    //    $scope.DistrictName = CommunicationDetails.DistrictName;
                    //    $scope.MandalName = CommunicationDetails.MandalName;

                    //}


                    $scope.PreviewDistrictName = $scope.PreviewDistrictName;
                    $scope.PreviewMandalName = $scope.MandalName;

                    $scope.District = $scope.CommunicationDetails.DistrictID

                    $scope.Mandal = $scope.CommunicationDetails.MandalID
                    /* $scope.getmandalname()*/

                    $scope.getAddressDistricts($scope.CommunicationDetails.StateID)
                    $scope.getAddressMandals($scope.CommunicationDetails.DistrictID)
                    $scope.DistrictName = $scope.CommunicationDetails.DistrictName
                    $scope.MandalName = $scope.CommunicationDetails.MandalName

                }

                var CategoryDetails = res.Table2[0];
                if (res.Table2.length > 0) {

                    if (CategoryDetails.CasteCategoryID == 1) {
                        if (CategoryDetails.EWSVerified == false) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber
                            $scope.EWSCERTNUMBER = CategoryDetails.EWSNumber != "" ? true : false;
                            $scope.EwsCertificate = CategoryDetails.EWS
                            $scope.EWSNumber = CategoryDetails.EWSNumber
                            $scope.EWSVerified = false;
                            $scope.EWSNotVerified = true;
                            $scope.EWSBUTTON = true;
                        }
                        else if (CategoryDetails.EWSVerified == true) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber
                            $scope.EwsCertificate = CategoryDetails.EWS
                            $scope.EWSCERTNUMBER = true;
                            $scope.EWSNumber = CategoryDetails.EWSNumber
                            $scope.EWSVerified = CategoryDetails.EWSVerified
                            $scope.CasteCategoryFound = true;
                            $scope.AadharFound = CategoryDetails.AadharNumber != "" ? true : false;
                            $scope.EwsCertificateFound = true;
                            $scope.EwsNumberFound = true;

                        }
                        if (CategoryDetails.EWS == false) {
                            $scope.EWSBUTTON = false;
                            $scope.EWSNotVerified = false;
                        }

                    }
                    else if (CategoryDetails.CasteCategoryID == 2 || CategoryDetails.CasteCategoryID == 3 || CategoryDetails.CasteCategoryID == 4 ||
                        CategoryDetails.CasteCategoryID == 5 || CategoryDetails.CasteCategoryID == 6) {
                        if (CategoryDetails.CasteVerified == false) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID;
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber;
                            $scope.CasteCertificateNumber = CategoryDetails.CasteCertificateNumber;
                            $scope.CasteCategoryFound = false;
                            $scope.AadharFound = false;
                            $scope.CasteCertificateNumberFound = false;
                            $scope.CasteNotVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = true;
                        }
                        else if (CategoryDetails.CasteVerified == true) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID;
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber;
                            $scope.CasteCertificateNumber = CategoryDetails.CasteCertificateNumber;
                            $scope.CasteCategoryFound = true;
                            $scope.AadharFound = true;
                            $scope.CasteCertificateNumberFound = true;
                            $scope.CasteNotVerified = false;
                            $scope.CasteVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = false;

                        }
                    }
                    else if (CategoryDetails.CasteCategoryID == 7 || CategoryDetails.CasteCategoryID == 8) {
                        if (CategoryDetails.CasteVerified == false) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID;
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber;
                            $scope.CasteCertificateNumber = CategoryDetails.CasteCertificateNumber;
                            $scope.CasteVerified = CategoryDetails.CasteVerified;
                            $scope.CasteCategoryFound = false;
                            $scope.AadharFound = false;
                            $scope.CasteCertificateNumberFound = false;
                            $scope.CasteNotVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = true;
                        }


                        else if (CategoryDetails.CasteVerified == true) {
                            $scope.CasteCategory = CategoryDetails.CasteCategoryID;
                            $scope.CasteCategoryName = CategoryDetails.CasteCategoryName
                            $scope.Aadhaar = CategoryDetails.AadharNumber;
                            $scope.CasteCertificateNumber = CategoryDetails.CasteCertificateNumber;
                            $scope.CasteCategoryFound = true;
                            $scope.AadharFound = true;
                            $scope.CasteCertificateNumberFound = true;
                            $scope.CasteNotVerified = false;
                            $scope.CasteVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = false;

                        }

                    }
                    if (($scope.CasteCategory == 1 && $scope.EWSVerified == true) || (($scope.CasteCategory == 2 || $scope.CasteCategory == 3 || $scope.CasteCategory == 4 ||
                        $scope.CasteCategory == 5 || $scope.CasteCategory == 6) && $scope.CasteVerified == true)) {
                        $scope.CancelCasteButton = true;
                    }

                    else if (($scope.CasteCategory == 7 || $scope.CasteCategory == 8) && $scope.CasteVerified == true && $scope.FeePaymentStatus == 1) {
                        $scope.CancelCasteButton = false;
                    }
                    else if (($scope.CasteCategory == 7 || $scope.CasteCategory == 8) && $scope.CasteVerified == true && $scope.FeePaymentStatus == 0) {
                        $scope.CancelCasteButton = true;
                    }
                    else {
                        $scope.CancelCasteButton = false;
                    }
                }
                else if (res.Table2.length <= 0) {
                    if ($scope.RegistrationCasteCategory == 1) {
                        if ($scope.EWSVerified == undefined || $scope.EWSVerified == null || $scope.EWSVerified == "") {
                            $scope.CasteCategory = $scope.RegistrationCasteCategory;
                            $scope.CasteCategoryName = $scope.RegistrationCasteName;
                            $scope.Aadhaar = "";
                            $scope.EwsCertificate = null;
                            $scope.EWSCertificateValues = $scope.EWSCertificateValues
                            $scope.CancelCasteButton = false;
                            //$scope.FeeAadhaar = $scope.RegistrationFeeAadhar;
                            //$scope.FeeCasteCertNumber = $scope.RegistrationFeeCasteNumber;
                        }
                        else {
                            $scope.CancelCasteButton = false;
                            $scope.CasteCategory = $scope.RegistrationCasteCategory;
                            $scope.CasteCategoryName = $scope.RegistrationCasteName;
                            $scope.Aadhaar = $scope.RegistrationAadhar;
                            //$scope.FeeAadhaar = $scope.RegistrationFeeAadhar;
                            //$scope.FeeCasteCertNumber = $scope.RegistrationFeeCasteNumber;
                            $scope.CasteVerified = $scope.RegistrationCasteVerified;
                        }

                    }
                    else if ($scope.RegistrationCasteCategory == 2 || $scope.RegistrationCasteCategory == 3 || $scope.RegistrationCasteCategory == 4 ||
                        $scope.RegistrationCasteCategory == 5 || $scope.RegistrationCasteCategory == 6) {
                        if ($scope.RegistrationCasteVerified == false) {
                            $scope.CasteCategory = $scope.RegistrationCasteCategory;
                            $scope.CasteCategoryName = $scope.RegistrationCasteName;
                            $scope.CasteCertificateNumber = $scope.RegistrationCasteNumber;
                            $scope.Aadhaar = $scope.RegistrationAadhar;
                            $scope.CasteCategoryFound = false;
                            $scope.AadharFound = false;
                            $scope.CasteCertificateNumberFound = false;
                            $scope.CasteNotVerified = false;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = true;
                        }
                        else if ($scope.RegistrationCasteVerified == true) {
                            $scope.CasteCategory = $scope.RegistrationCasteCategory;
                            $scope.CasteCategoryName = $scope.RegistrationCasteName
                            $scope.CasteCertificateNumber = $scope.RegistrationCasteNumber;
                            $scope.Aadhaar = $scope.RegistrationAadhar;
                            $scope.CasteCategoryFound = true;
                            $scope.AadharFound = true;
                            $scope.CasteCertificateNumberFound = true;
                            $scope.CasteNotVerified = false;
                            $scope.CasteVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = false;

                        }
                    }
                    else if ($scope.RegistrationCasteCategory == 7 || $scope.RegistrationCasteCategory == 8) {
                        if ($scope.RegistrationCasteVerified == false) {
                            $scope.CasteCategory = $scope.RegistrationCasteCategory;
                            $scope.CasteCategoryName = $scope.RegistrationCasteName
                            $scope.CasteCertificateNumber = $scope.RegistrationCasteNumber;
                            $scope.Aadhaar = $scope.RegistrationAadhar;
                            $scope.CasteCategoryFound = false;
                            $scope.AadharFound = false;
                            $scope.CasteCertificateNumberFound = false;
                            $scope.CasteNotVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = true;
                        }
                        else if ($scope.RegistrationCasteVerified == true) {
                            $scope.CasteCategory = $scope.RegistrationCasteCategory;
                            $scope.CasteCategoryName = $scope.RegistrationCasteName;
                            $scope.CasteCertificateNumber = $scope.RegistrationCasteNumber;
                            $scope.Aadhaar = $scope.RegistrationAadhar;
                            $scope.CasteCategoryFound = true;
                            $scope.AadharFound = true;
                            $scope.CasteCertificateNumberFound = true;
                            $scope.CasteNotVerified = false;
                            $scope.CasteVerified = true;
                            $scope.CancelCasteButton = false;
                            $scope.CasteVerifyButton = false;

                        }

                    }

                }


                if (res.Table3.length > 0) {
                    var SpecialCategoryDetails = res.Table3[0];

                    $scope.AppearforBiology = SpecialCategoryDetails.AppearedForBiology
                    $scope.Assistance_Urdu = SpecialCategoryDetails.AssistanceinUrdu
                    $scope.CAP = SpecialCategoryDetails.CAP
                    $scope.MinorityID = SpecialCategoryDetails.MinorityID
                    $scope.RegionName = SpecialCategoryDetails.RegionName
                    $scope.MinorityName = SpecialCategoryDetails.MinorityName
                    $scope.NCC = SpecialCategoryDetails.NCC
                    $scope.Handicaped = SpecialCategoryDetails.PH
                    $scope.PMCares = SpecialCategoryDetails.PMCares
                    $scope.RegionID = SpecialCategoryDetails.RegionID
                    $scope.Sports = SpecialCategoryDetails.SportsAndGames

                    $scope.PreviewAssistance_Urdu = $scope.Assistance_Urdu;
                    $scope.PreviewCAP = $scope.CAP;
                    $scope.PreviewAppearforBiology = $scope.AppearforBiology;
                    $scope.PreviewNCC = $scope.NCC;
                    $scope.PreviewPMCares = $scope.PMCares;
                    $scope.PreviewHandicaped = $scope.Handicaped;
                    $scope.PreviewSports = $scope.Sports;

                    if ($scope.Assistance_Urdu == true) {
                        $scope.Assistance_Urdu = 'true'

                    }
                    if ($scope.Assistance_Urdu == false) {
                        $scope.Assistance_Urdu = 'false'
                    }
                    if ($scope.CAP == true) {
                        $scope.CAP = 'true'

                    }
                    if ($scope.CAP == false) {
                        $scope.CAP = 'false'
                    }
                    if ($scope.AppearforBiology == true) {
                        $scope.AppearforBiology = 'true'

                    }
                    if ($scope.AppearforBiology == false) {
                        $scope.AppearforBiology = 'false'
                    }
                    if ($scope.NCC == true) {
                        $scope.NCC = 'true'

                    }
                    if ($scope.NCC == false) {
                        $scope.NCC = 'false'
                    }
                    if ($scope.Handicaped == true) {
                        $scope.Handicaped = 'true'

                    }
                    if ($scope.Handicaped == false) {
                        $scope.Handicaped = 'false'
                    }
                    if ($scope.PMCares == true) {
                        $scope.PMCares = 'true'

                    }
                    if ($scope.PMCares == false) {
                        $scope.PMCares = 'false'
                    }
                    if ($scope.Sports == true) {
                        $scope.Sports = 'true'

                    }
                    if ($scope.Sports == false) {
                        $scope.Sports = 'false'
                    }


                }



                if (res.Table4.length > 0) {
                    var StudyDetails = res.Table4[0];
                    $scope.YEAR1 = StudyDetails.Class1Year
                    $scope.State1 = StudyDetails.Class1StateID
                    $scope.PLACE1 = StudyDetails.Class1Place



                    $scope.District1 = StudyDetails.Class1DistrictID
                    $scope.DistrictName1 = StudyDetails.Class1DistrictName
                    $scope.DistrictName2 = StudyDetails.Class2DistrictName
                    $scope.DistrictName3 = StudyDetails.Class3DistrictName
                    $scope.DistrictName4 = StudyDetails.Class4DistrictName
                    $scope.DistrictName5 = StudyDetails.Class5DistrictName
                    $scope.DistrictName6 = StudyDetails.Class6DistrictName
                    $scope.DistrictName7 = StudyDetails.Class7DistrictName
                    $scope.DistrictName8 = StudyDetails.Class8DistrictName
                    $scope.DistrictName9 = StudyDetails.Class9DistrictName
                    $scope.DistrictName10 = StudyDetails.Class10DistrictName

                    $scope.getClass1Districts()
                    $scope.YEAR2 = StudyDetails.Class2Year
                    $scope.State2 = StudyDetails.Class2StateID
                    $scope.PLACE2 = StudyDetails.Class2Place
                    $scope.District2 = StudyDetails.Class2DistrictID
                    $scope.getClass2Districts()
                    $scope.YEAR3 = StudyDetails.Class3Year
                    $scope.State3 = StudyDetails.Class3StateID
                    $scope.PLACE3 = StudyDetails.Class3Place
                    $scope.District3 = StudyDetails.Class3DistrictID
                    $scope.getClass3Districts()
                    $scope.YEAR4 = StudyDetails.Class4Year
                    $scope.State4 = StudyDetails.Class4StateID
                    $scope.PLACE4 = StudyDetails.Class4Place
                    $scope.District4 = StudyDetails.Class4DistrictID
                    $scope.getClass4Districts()
                    $scope.YEAR5 = StudyDetails.Class5Year
                    $scope.State5 = StudyDetails.Class5StateID
                    $scope.PLACE5 = StudyDetails.Class5Place
                    $scope.District5 = StudyDetails.Class5DistrictID
                    $scope.getClass5Districts()
                    $scope.YEAR6 = StudyDetails.Class6Year
                    $scope.State6 = StudyDetails.Class6StateID
                    $scope.PLACE6 = StudyDetails.Class6Place
                    $scope.District6 = StudyDetails.Class6DistrictID
                    $scope.getClass6Districts()
                    $scope.YEAR7 = StudyDetails.Class7Year
                    $scope.State7 = StudyDetails.Class7StateID
                    $scope.PLACE7 = StudyDetails.Class7Place
                    $scope.District7 = StudyDetails.Class7DistrictID
                    $scope.getClass7Districts()
                    $scope.YEAR8 = StudyDetails.Class8Year
                    $scope.State8 = StudyDetails.Class8StateID
                    $scope.PLACE8 = StudyDetails.Class8Place
                    $scope.District8 = StudyDetails.Class8DistrictID
                    $scope.getClass8Districts()
                    $scope.YEAR9 = StudyDetails.Class9Year
                    $scope.State9 = StudyDetails.Class9StateID
                    $scope.PLACE9 = StudyDetails.Class9Place
                    $scope.District9 = StudyDetails.Class9DistrictID
                    $scope.getClass9Districts()
                    $scope.YEAR10 = StudyDetails.Class10Year
                    $scope.State10 = StudyDetails.Class10StateID
                    $scope.PLACE10 = StudyDetails.Class10Place
                    $scope.District10 = StudyDetails.Class10DistrictID
                    $scope.getClass10Districts()



                }


                if (res.Table5.length > 0) {
                    $scope.PhotoUpdate = true
                    $scope.StudentPhoto = res.Table5[0].StudentPhoto;
                    if ($scope.StudentPhoto == "" || $scope.StudentPhoto == undefined || $scope.StudentPhoto == null) {
                        $scope.Addphoto = true
                    } else {
                        $scope.Addphoto = false
                    }

                    $scope.StudentSign = res.Table5[0].StudentSignature;
                    if ($scope.StudentSign == "" || $scope.StudentSign == undefined || $scope.StudentSign == null) {
                        $scope.AddSign = true
                    } else {
                        $scope.AddSign = false
                    }
                    if (res.Table5[0].SSCPhoto == true) {
                        //    $scope.StudentPhoto1 = true
                    } else {
                        //    $scope.StudentPhoto1 = false
                    }
                    if (res.Table5[0].SSCSign == true) {
                        //    $scope.StudentSign1 = true
                    } else {
                        //    $scope.StudentSign1 = false
                    }
                } if (res.Table6.length > 0) {

                    $scope.HallticketGenerated = res.Table6[0].HallticketGenerated;


                } else {
                    $scope.PhotoUpdate = false;
                    //$scope.loading = false;
                    //$scope.nodata = true;
                    $scope.StudentDetailsData = [];

                    //$scope.loading = false;
                    //$scope.nodata = true;

                }
                $scope.Preview();

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }

        $scope.GetDistrictName = function (index) {

            var value = 'DistrictName' + index;
            //console.log($scope[value])
            return ($scope[value]);
        }



        $scope.Modify = function (Type) {
            if (Type == 0) {
                $scope.class1 = "active";
                $scope.class2 = "";
                $scope.class3 = "";
                $scope.class4 = "";
                $scope.class5 = "";
                $scope.class6 = "";
                $scope.class7 = "";
                $scope.class8 = "";
                //    $scope.NextTab(Type);
            }
            $scope.PreviewDisable = true;

        }

        $scope.Submit = function () {
            if ($scope.StudentPhoto == "" || $scope.StudentPhoto == null || $scope.StudentPhoto == undefined ||
                $scope.StudentPhoto == "" || $scope.StudentPhoto == null || $scope.StudentPhoto == undefined) {
                alert('Please Check and Save Photo and Signature')
                return;
            }

            else if ($scope.qualifiedExamID == 1 && $scope.SSCVerified == 0) {
                alert('SSC-TS Students should get details from SSC Board in Personal Details Tab and then Submit the Application')
                return;
            }

            else {

                $scope.modalInstance = $uibModal.open({
                    templateUrl: "/app/views/Popups/StudentApplicationSubmitPopup.html",
                    size: 'small',
                    scope: $scope,
                    backdrop: 'static',
                    //windowClass: 'modal-fit-att',
                    backdrop: false,
                });

            }

            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.ConfirmSubmit = function () {
            $scope.tabsbutton = true;
            var submitapplication = AdminService.SetApplicationSubmit($scope.RegistrationId);
            submitapplication.then(function (response) {
                try {
                    var res = JSON.parse(response)
                }
                catch (err) { }
                if (res[0].StatusCode == '200') {
                    $scope.loader8 = false;
                    $scope.tabsbutton = false;
                    alert(res[0].StatusDescription);
                    $scope.modalInstance.close();
                    $scope.submitbutton = false;
                    $scope.getDashboardStatus();
                    if ($scope.PersonalStatus == 1 && $scope.CommunicationStatus == 1 && $scope.CategoryStatus == 1 && $scope.SpecialCategoryStatus == 1 && $scope.StudyStatus == 1 && $scope.PhotoStatus == 1
                        && $scope.FeePaymentStatus==1) {
                        $scope.class0 = "";
                        $scope.class1 = "";
                        $scope.class2 = "";
                        $scope.class3 = "";
                        $scope.class4 = "";
                        $scope.class5 = "";
                        $scope.class6 = "";
                        $scope.class7 = "";
                        $scope.class8 = "";
                        $scope.class9 = "active";
                    } else {
                        alert("Please Pay Registration Fee")
                        $scope.class0 = "active";
                        $scope.class1 = "";
                        $scope.class2 = "";
                        $scope.class3 = "";
                        $scope.class4 = "";
                        $scope.class5 = "";
                        $scope.class6 = "";
                        $scope.class7 = "";
                        $scope.class8 = "";
                        $scope.class9 = "";
                    }
                    //$state.go('index.Registration');


                } else if (res[0].StatusCode == '400') {
                    //$state.go('index')
                    $scope.loader8 = false;
                    $scope.tabsbutton = false;
                    alert(res[0].StatusDescription)


                }
            },
                function (error) {
                    //alert("error while Verifying Dates")
                    //var err = JSON.parse(error);

                });
        }

        $scope.ApplicationStatus = function () {
            if ($scope.StatusCode == '201') {
                $scope.getStudentDetails();

            }

            else if ($scope.StatusCode == '200') {
                alert('Application Submitted');
                return;
                var Type = 8;
                if (Type == 8) {
                    $scope.class1 = "";
                    $scope.class2 = "";
                    $scope.class3 = "";
                    $scope.class4 = "";
                    $scope.class5 = "";
                    $scope.class6 = "";
                    $scope.class7 = "";
                    $scope.class8 = "active";
                    //    $scope.NextTab(Type);
                }
                $scope.PreviewDisable = false;
            }
        }



        $scope.SavePreferences = function () {
            if ($scope.Assistance_Urdu == 'false') {
                if ($scope.Preference1District == null || $scope.Preference1District == undefined || $scope.Preference1District == "") {
                    alert("Please Select 1st Preference District");
                    return;
                }

                if ($scope.Preference1Mandal == null || $scope.Preference1Mandal == undefined || $scope.Preference1Mandal == "") {
                    alert("Please Select 1st Preference Mandal");
                    return;
                }

                if ($scope.Preference2District == null || $scope.Preference2District == undefined || $scope.Preference2District == "") {
                    alert("Please Select 2nd Preference District");
                    return;
                }

                if ($scope.Preference2Mandal == null || $scope.Preference2Mandal == undefined || $scope.Preference2Mandal == "") {
                    alert("Please Select 2nd Preference Mandal");
                    return;
                }

                if ($scope.Preference3District == null || $scope.Preference3District == undefined || $scope.Preference3District == "") {
                    alert("Please Select 3rd Preference District");
                    return;
                }

                if ($scope.Preference3Mandal == null || $scope.Preference3Mandal == undefined || $scope.Preference3Mandal == "") {
                    alert("Please Select 3rd Preference Mandal");
                    return;
                }

                test = {
                    'Preference1District': $scope.Preference1District.DistrictName, 'Preference1Mandal': $scope.Preference1Mandal.MandalName, 'Preference2District': $scope.Preference2District.DistrictName,
                    'Preference2Mandal': $scope.Preference2Mandal.MandalName, 'Preference3District': $scope.Preference3District.DistrictName, 'PreferenceMandal3': $scope.Preference3Mandal.MandalName
                }

                $scope.modalInstance = $uibModal.open(
                    {
                        templateUrl: "/app/views/Popups/ConfirmStdPreferencesPopup.html",
                        size: 'small',
                        scope: $scope,
                        windowClass: 'modal-fit-att',
                        backdrop: 'static',
                        resolve: {
                            test: function () {
                                return test;
                            }

                        }
                    }

                );
            } if ($scope.Assistance_Urdu == 'true') {
                $scope.AddPreferences()
            }
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.AddPreferences = function () {
            $scope.tabsbutton = true;
            if ($scope.Assistance_Urdu == 'false') {
                var paramObj = {
                    "RegistrationID": $scope.RegistrationId,
                    "RegistrationNumber": $scope.StudentData.RegistrationNumber,
                    "PreferenceDistrictID1": $scope.Preference1District.DistrictID,
                    "PreferenceMandalID1": $scope.Preference1Mandal.MandalID,
                    "PreferenceDistrictID2": $scope.Preference2District.DistrictID,
                    "PreferenceMandalID2": $scope.Preference2Mandal.MandalID,
                    "PreferenceDistrictID3": $scope.Preference3District.DistrictID,
                    "PreferenceMandalID3": $scope.Preference3Mandal.MandalID,
                    "DataType": 1,
                }
            } else if ($scope.Assistance_Urdu == 'true') {
                var paramObj = {
                    "RegistrationID": $scope.RegistrationId,
                    "RegistrationNumber": $scope.RegistrationNumber,
                    "PreferenceDistrictID1": 0,
                    "PreferenceMandalID1": 0,
                    "PreferenceDistrictID2": 0,
                    "PreferenceMandalID2": 0,
                    "PreferenceDistrictID3": 0,
                    "PreferenceMandalID3": 0,
                    "DataType": 2,
                }
            }
            $scope.tabsbutton = true;
            $scope.loader9 = true;
            var addexamcentrepreferences = AdminService.AddStudentPreferences(paramObj);
            addexamcentrepreferences.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].StatusCode == '200') {
                    $scope.tabsbutton = false;
                    $scope.loader9 = false;
                    //alert(res[0].StatusDescription)
                    $scope.getHallticket($scope.StudentData.RegistrationNumber);
                    $scope.getStudentDetails();
                    $scope.getDashboardStatus()
                    $scope.modalInstance.close();

                } else if (res[0].StatusCode == '400') {
                    $scope.tabsbutton = false;
                    $scope.loader9 = false;
                    alert(res[0].StatusDescription);
                    //$scope.GetHallticket()
                    $scope.getStudentDetails();
                    $scope.modalInstance.close();
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
            //$localStorage.TempData = {
            //    RegistrationId: RegistrationId,
            //};
            $state.go('StudentDashboard.StudentChangePassword');
        }


        $scope.logOut = function () {
            //sessionStorage.loggedIn = "no";
            var GetUserLogout = SystemUserService.PostUserLogout(2, $scope.UserName, $scope.SessionID);
            //delete $localStorage.authorizationData;
            //delete $localStorage.authToken;
            //delete $scope.SessionID;
            //$scope.authentication = {
            //    isAuth: false,
            //    UserId: 0,
            //    //    userName: ""
            //};
            $state.go('Dashboard.StudentDetailsUpdation')
        }



    })
})