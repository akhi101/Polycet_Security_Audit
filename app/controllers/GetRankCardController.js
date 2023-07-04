define(['app'], function (app) {
    app.controller("GetRankCardController", function ($scope, $uibModal, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {

        //var authData = $localStorage.authorizationData;
        //if (authData == undefined) {
        //    $state.go('index.OfficialsLogin')
        //}

        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.DataType = "2";
        }

        $scope.GoBack = function () {
            $state.go('index')
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



        $scope.ValidateCaptcha1 = function (MobileNumber) {
            $scope.MobileNumber = MobileNumber;
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
                    $scope.getrankcardbymobilenumber($scope.MobileNumber);
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

        $scope.ValidateCaptcha2 = function (HallTicketNumber) {
            $scope.HallTicketNumber = HallTicketNumber;
            if ($scope.HallTicketNumber == "" || $scope.HallTicketNumber == undefined || $scope.HallTicketNumber == null) {
                alert("Enter HallTicket Number");
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
                    $scope.getrankcardbyhtnumber($scope.HallTicketNumber);
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

     

    

        $scope.getrankcardbymobilenumber = function () {
            var getdetails = AdminService.GetRankCard($scope.DataType, $scope.MobileNumber);
            getdetails.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                    if (res.Table[0].StatusCode == 200) {
                        $scope.HallTicketNo = res.Table1[0].HallTicketNo
                        $scope.Name = res.Table1[0].Name
                        $scope.FatherName = res.Table1[0].FatherName
                        $scope.DateofBirth = res.Table1[0].DateofBirth
                        $scope.ExamDate = res.Table1[0].ExamDate
                        $scope.MPC_RANK = res.Table1[0].MPC_RANK
                        $scope.MBIPC_RANK = res.Table1[0].MBIPC_RANK
                        $scope.MATHS = res.Table1[0].MATHS
                        $scope.PHYSICS = res.Table1[0].PHYSICS
                        $scope.CHEMISTRY = res.Table1[0].CHEMISTRY
                        $scope.BIOLOGY = res.Table1[0].BIOLOGY
                        $scope.Remarks = res.Table1[0].Remarks
                        $scope.gotopage1();
                    }
                    else if (res.Table[0].StatusCode == 400) {
                        alert(res.Table[0].StatusDescription);
                        $state.go('index.GetRankCard');


                    }
                }
                catch (err) { }



            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }

        $scope.getrankcardbyhtnumber = function () {
            var getdetails = AdminService.GetRankCard($scope.DataType, $scope.HallTicketNumber);
            getdetails.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                    if (res.Table[0].StatusCode == 200) {
                        $scope.HallTicketNo = res.Table1[0].HallTicketNo
                        $scope.Name = res.Table1[0].Name
                        $scope.FatherName = res.Table1[0].FatherName
                        $scope.DateofBirth = res.Table1[0].DateofBirth
                        $scope.ExamDate = res.Table1[0].ExamDate
                        $scope.MPC_RANK = res.Table1[0].MPC_RANK
                        $scope.MBIPC_RANK = res.Table1[0].MBIPC_RANK
                        $scope.MATHS = res.Table1[0].MATHS
                        $scope.PHYSICS = res.Table1[0].PHYSICS
                        $scope.CHEMISTRY = res.Table1[0].CHEMISTRY
                        $scope.BIOLOGY = res.Table1[0].BIOLOGY
                        $scope.Remarks = res.Table1[0].Remarks
                        $scope.gotopage2($scope.HallTicketNo);
                    }
                    else if (res.Table[0].StatusCode == 400) {
                        alert(res.Table[0].StatusDescription);
                        $state.go('index.GetRankCard');


                    }
                }
                catch (err) { }



            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }



        $scope.gotopage1 = function () {
            $localStorage.TempData = {
                UserTypeName: $scope.UserTypeName,
                UserTypeID: $scope.UserTypeID,
                UserName: $scope.UserName,
                HallTicketNo : $scope.HallTicketNo,
                Name : $scope.Name,
                FatherName : $scope.FatherName,
                DateofBirth : $scope.DateofBirth,
                ExamDate : $scope.ExamDate,
                MPC_RANK : $scope.MPC_RANK,
                MBIPC_RANK : $scope.MBIPC_RANK,
                MATHS : $scope.MATHS,
                PHYSICS : $scope.PHYSICS,
                CHEMISTRY : $scope.CHEMISTRY,
                BIOLOGY: $scope.BIOLOGY,
                Remarks: $scope.Remarks
                
            };

            $state.go('index.RankCard');

        }

        $scope.gotopage2 = function () {
            $localStorage.TempData = {
                UserTypeName: $scope.UserTypeName,
                UserTypeID: $scope.UserTypeID,
                UserName: $scope.UserName,
                HallTicketNo: $scope.HallTicketNo,
                Name: $scope.Name,
                FatherName: $scope.FatherName,
                DateofBirth: $scope.DateofBirth,
                ExamDate: $scope.ExamDate,
                MPC_RANK: $scope.MPC_RANK,
                MBIPC_RANK: $scope.MBIPC_RANK,
                MATHS: $scope.MATHS,
                PHYSICS: $scope.PHYSICS,
                CHEMISTRY: $scope.CHEMISTRY,
                BIOLOGY: $scope.BIOLOGY,
                Remarks: $scope.Remarks
            };

            $state.go('index.RankCard');

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






    })
})