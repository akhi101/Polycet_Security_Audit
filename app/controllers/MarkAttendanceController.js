define(['app'], function (app) {
    app.controller("MarkAttendanceController", function ($scope, AdminService, $http, $localStorage, $state, AppSettings, SystemUserService) {
        var authData = $localStorage.authorizationData;
        $scope.authToken = $localStorage.authToken;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.UserName = authData.UserName;
        $scope.UserTypeName = authData.UserTypeName;

        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.verifyDates()
        }
        //$scope.verifyDates = function () {
        //    var DataType = 2
        //    var verifyexamDate = AdminService.VerifyExaminationDates(DataType);
        //    verifyexamDate.then(function (response) {
        //        try {
        //            var res = JSON.parse(response)

        //        }
        //        catch (err) { }
        //        if (res[0].ResponseCode == '200') {
        //            if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
        //                $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName == 'Aspreexams') {
        //                $state.go('Dashboard.AdmExamCentresAttendance')
        //            }
        //            else if ($scope.UserTypeName == 'CoordinatingCentre') {
        //                $state.go('Dashboard.DCWiseExamCentresAttendance');
        //            }
        //            else if ($scope.UserTypeName == 'ExaminationCentre') {
        //                $state.go('Dashboard.ExamCentreAttendance');
        //            }
        //        } else if (res[0].ResponseCode == '400') {
        //            alert('Dates are Not Found')
        //            $state.go('Dashboard');
        //        }
        //    },
        //        function (error) {
        //            alert("error while Verifying Dates")
        //            //var err = JSON.parse(error);

        //        });
        //}

        if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' || $scope.UserTypeName == 'DSPreExams' ||
            $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' || $scope.UserTypeName=='Aspreexams') {
                        $state.go('Dashboard.AdmExamCentresAttendance')
                    }
                    else if ($scope.UserTypeName == 'CoordinatingCentre') {
                        $state.go('Dashboard.DCWiseExamCentresAttendance');
                    }
                    else if ($scope.UserTypeName == 'ExaminationCentre') {
                        $state.go('Dashboard.ExamCentreAttendance');
                    }
        $scope.GoBack = function () {

            $state.go('Dashboard')
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



