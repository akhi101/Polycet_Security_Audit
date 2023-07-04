define(['app'], function (app) {
    app.controller("IndexController", function ($scope, $state, AdminService) {

        const $ctrl = this
        $ctrl.$onInit = () => {
            $scope.activerecentNews();
            $scope.websiteCounts()
        }

       // var Temp = 'index.Registration';

        $scope.OpenModule = function (Temp) {
            if (Temp == 'index.Registration' || Temp == 'index.Application') {
                //var VerifyDate = AdminService.VerifyRegistrationDates();
                //VerifyDate.then(function (response) {
                //    if (response.Table[0].ResponseCode == '200') {
                //        $state.go('index.Registration');

                //    } else if (response.Table[0].ResponseCode=='400') {
                //        alert(response.Table[0].ResponseDescription)
                //        $state.go('index')

                //    }

                //},
                //    function (error) {

                //        //    var err = JSON.parse(error);
                //    })
                $scope.verifyDates();
            }
        }

        $scope.verifyDates = function (DataType) {
            var DataType = 1
            var VerifyDate = AdminService.VerifyRegistrationDates(DataType);
            VerifyDate.then(function (response) {
                try {
                    var res = JSON.parse(response)

                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    $state.go('index.Registration');
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

        //$scope.SiteViews = 0;
        //$scope.websiteCounts = function () {

        //    var GetWebSiteVisiterCount = AdminService.GetWebSiteVisiterCount();
        //    GetWebSiteVisiterCount.then(function (res) {
        //        var response = JSON.parse(res)
              
        //        $scope.SiteViews = response.Table[0].WebsiteVisitedCount;
        //        console.log($scope.SiteViews)
        //    },
        //        function (error) {

        //            var err = JSON.parse(error);
        //        });
        //}

        $scope.SiteViews = 0;
        $scope.websiteCounts = function () {

            var GetWebSiteVisiterCount = AdminService.GetWebSiteVisiterCount();
            GetWebSiteVisiterCount.then(function (response) {
                var res = JSON.parse(response)
                $scope.SiteViews = res.Table[0].WebsiteVisitedCount;
            },
                function (error) {

                    var err = JSON.parse(error);
                });
        }

        //var captcha = AdminService.GetCaptchaString10();
        //captcha.then(function (res) {
        //    try {
        //        var newcapt = res;
        //        sessionStorage.clear();
        //        alert(newcapt)
        //        sessionStorage.setItem('SessionCaptcha', newcapt);
        //    } catch (err) {
        //        $scope.GetCatcha = ''
        //    }
        //}, function (error) {
        //    $scope.GetCatcha = ''
        //    alert('Unable to load Captcha')
        //});
        var DataType = 2;
        var NotificationID = 0;
        var getcircular = AdminService.getNotification(DataType,NotificationID);
        getcircular.then(function (res) {
            var response = JSON.parse(res)
            if (response.length > 0) {
                $scope.Circulars = response;
            } else {
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            }
        },
            function (error) {

                console.log(error);
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            });


        $scope.activerecentNews = function () {
            $scope.DataType = 2;
            var GetRecentNews = AdminService.GetActiveRecentNews($scope.DataType);
            GetRecentNews.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                $scope.LatestRecentNews = res.Table;
            },
                function (error) {
                    alert("error while loading Recent News");
                    var err = JSON.parse(error);
                });
        }

     

       


         

        


        //$scope.OpenLogin = function () {
        //    $state.go('index.OfficialsLogin')
        //}

    });
});


