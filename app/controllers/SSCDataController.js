define(['app'], function (app) {
    app.controller("SSCDataController", function ($scope, $localStorage, SystemUserService, StudentRegistrationService, AdminService, AppSettings, $state, $uibModal, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        $scope.SessionID = authData.SessionID;
        $scope.UserID = authData.UserID;
        $scope.UserName = authData.UserName;
        const $ctrl = this;
        $ctrl.$onInit = () => {

        }




        if (authData == undefined) {
            $state.go('index.Login');

        }
        else {



        }

        $scope.GoBack = function () {
            $state.go('Dashboard')
        }
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
                            //$scope.DOB_DATE = moment(resdata.DateOfBirth)
                            //$scope.DOB_DATE = resdata.DateOfBirth
                            $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;
                            $scope.Calender = true;



                        } else {
                            $scope.SSCVerified = false;
                            $scope.loading = false;
                            $scope.SSCBUTTONCLICK = false;
                            alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                            $scope.Calender = false;
                            $scope.GETSSCDETAILSBUTTON = false;
                            $scope.SELECTEDQUALIFIEDEXAM = false;
                            $scope.ENTEREDSSCHALLTICKET = false;
                            $scope.ENTEREDYEAR = false;
                            $scope.ENTEREDSSCTYPE = false;


                        }

                    } else {
                        $scope.SSCVerified = false;
                        $scope.loading = false;
                        $scope.SSCBUTTONCLICK = false;
                        alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                        $scope.Calender = false;
                        $scope.GETSSCDETAILSBUTTON = false;
                        $scope.SELECTEDQUALIFIEDEXAM = false;
                        $scope.ENTEREDSSCHALLTICKET = false;
                        $scope.ENTEREDYEAR = false;
                        $scope.ENTEREDSSCTYPE = false;



                    }


                }, function (err) {
                    $scope.SSCVerified = false;
                    $scope.loading = false;
                    $scope.SSCBUTTONCLICK = false;
                    alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                    $scope.Calender = false;
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
                                $scope.StudentPhoto1 = true;
                            }
                            else if ($scope.StudentPhoto == "" || $scope.StudentPhoto == null || $scope.StudentPhoto == undefined) {
                                $scope.StudentPhoto1 = false;
                            }

                            if ($scope.StudentSign != "" || $scope.StudentSign != null || $scope.StudentSign != undefined) {
                                $scope.StudentSign1 = true;
                            }
                            else if ($scope.StudentSign == "" || $scope.StudentSign == null || $scope.StudentSign == undefined) {
                                $scope.StudentSign1 = false;
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
                            //$scope.DOB_DATE = moment(resdata.DateOfBirth)
                            //$scope.DOB_DATE = resdata.DateOfBirth
                            $scope.CandidateNameDOBfound = $scope.DOB_DATE != "" ? true : false;
                            $scope.Calender = true;



                        } else {
                            $scope.SSCVerified = false;
                            $scope.loading = false;
                            $scope.SSCBUTTONCLICK = false;
                            alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                            $scope.Calender = false;
                            $scope.GETSSCDETAILSBUTTON = false;
                            $scope.SELECTEDQUALIFIEDEXAM = false;
                            $scope.ENTEREDSSCHALLTICKET = false;
                            $scope.ENTEREDYEAR = false;
                            $scope.ENTEREDSSCTYPE = false;


                        }

                    } else {
                        $scope.SSCVerified = false;
                        $scope.loading = false;
                        $scope.SSCBUTTONCLICK = false;
                        alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                        $scope.Calender = false;
                        $scope.GETSSCDETAILSBUTTON = false;
                        $scope.SELECTEDQUALIFIEDEXAM = false;
                        $scope.ENTEREDSSCHALLTICKET = false;
                        $scope.ENTEREDYEAR = false;
                        $scope.ENTEREDSSCTYPE = false;



                    }


                }, function (err) {
                    $scope.SSCVerified = false;
                    $scope.loading = false;
                    $scope.SSCBUTTONCLICK = false;
                    alert("Details not found Please Check the Hall Ticket Number and Year or Wait for the SSC Board releases the Data");
                    $scope.Calender = false;
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
                                $scope.StudentPhoto1 = true;
                            }
                            else if ($scope.StudentPhoto == "" || $scope.StudentPhoto == null || $scope.StudentPhoto == undefined) {
                                $scope.StudentPhoto1 = false;
                            }

                            if ($scope.StudentSign != "" || $scope.StudentSign != null || $scope.StudentSign != undefined) {
                                $scope.StudentSign1 = true;
                            }
                            else if ($scope.StudentSign == "" || $scope.StudentSign == null || $scope.StudentSign == undefined) {
                                $scope.StudentSign1 = false;
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
            $scope.sscHallticket = null;
            $scope.passedoutYear = null;
            $scope.sscType = null;
            $scope.ENTEREDYEAR = false;
            $scope.ENTEREDSSCTYPE = false;
            $scope.SELECTEDQUALIFIEDEXAM = false;
            $scope.GETSSCDETAILSBUTTON = false;
            $scope.CNAME = null;
            $scope.FNAME = null;
            $scope.MNAME = null;
            $scope.DOB_DATE = '';
            $scope.Gender = null;
            $scope.StudentPhoto = false;
            $scope.StudentSign = false;
            $scope.CandidateNamefound = false;
            $scope.FatherNameFound = false;
            $scope.MotherNamefound = false;
            $scope.CandidateNameDOBfound = false;
            $scope.Genderfound = false;
        }


      
        $scope.SiteViews = 0;

        var GetWebSiteVisiterCount = AdminService.GetWebSiteVisiterCount();
        GetWebSiteVisiterCount.then(function (response) {
            var res = JSON.parse(response)
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