define(['app'], function (app) {
    app.controller("ExamCentresLoginCredsController", function ($scope, AdminService, $http, $localStorage, $state, AppSettings, SystemUserService) {
        var authData = $localStorage.authorizationData;
        $scope.authToken = $localStorage.authToken;
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.UserName = authData.UserName;
        $scope.UserTypeName = authData.UserTypeName;

        const $ctrl = this;
        $ctrl.$onInit = () => {
        }
        
        if ($scope.UserTypeName == 'Administrator' || $scope.UserTypeName == 'SystemAnalyst' ||
            $scope.UserTypeName == 'BoardOfficials' || $scope.UserTypeName == 'Secretary' ||
            $scope.UserTypeName == 'DSPreExams' || $scope.UserTypeName == 'Aspreexams') {
            $state.go('Dashboard.AdmExaminationCentresReport')
        }
        else if ($scope.UserTypeName == 'CoordinatingCentre') {
            $state.go('Dashboard.DCExaminationCentresReport');
        }
        //else if ($scope.UserTypeName == 'ExaminationCentre') {
        //    $state.go('Dashboard.ExamCentreAttendance');
        //}
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



