define(['app'], function (app) {
    app.controller("QPReportsController", function ($scope, $uibModal, PreExaminationService,SystemUserService, $crypto, $state, $localStorage, AdminService) {
        var tmpData = $localStorage.authorizationData;
        //console.log(tmpData)
        $scope.Session = $localStorage.authorizationData.Session
        $scope.SessionID = $localStorage.SessionID;
        //$scope.CoordinatingCentreCode = tmp.CentreCode;

        if ((tmpData == undefined) || (tmpData != undefined && tmpData.UserTypeName != 'Administrator')) {
            $state.go('index.OfficialsLogin')
        }
        else {
            $scope.UserName = tmpData.UserName;

            const $ctrl = this;

            $ctrl.$onInit = () => {
                $scope.getQPReport();
            }
        }

            $scope.GoBack = function () {
                $state.go('Dashboard')
            }

        var eKey = SystemUserService.GetEKey();
        eKey.then(function (res) {
            $scope.RegistrationEKey = res;
            sessionStorage.Ekey = res;

        });
        $scope.getQPReport = function () {
            $scope.loading = true;
            $scope.nodata = false;
            var DataType = 12;
            var CoordinatingCentreCode = 0; //Optional
            var qpreport = AdminService.GetExaminationCentres(DataType, $scope.UserName, CoordinatingCentreCode,$scope.Session);
            qpreport.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.QPReportData = response;
                    $scope.loading = false;
                    $scope.nodata = false;
                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.QPReportData = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }


        $scope.DownloadtoExcel = function () {
            $scope.loading = true;
            var DataType = 12;
            //var UserName = 0;

            var exceldownload = AdminService.GetQPReportExcel(DataType, $scope.UserName,0,$scope.Session,'');
            exceldownload.then(function (res) {
                var response = JSON.parse(res);
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

        const download = (path, filename) => {
            // Create a new link
            const anchor = document.createElement('a');
            anchor.href = path;
            anchor.download = filename;

            // Append to the DOM
            document.body.appendChild(anchor);

            // Trigger `click` event
            anchor.click();

            // Remove element from DOM
            document.body.removeChild(anchor);
        };

        $scope.DownloadtoPdf = function () {
            $scope.loading = true;
            $scope.NoData = false;
            var DataType = 12;
            var CoordinatingCentreCode = 0; //Optional
            var getQPReport = PreExaminationService.GetQPReportPdf(DataType, $scope.UserName, CoordinatingCentreCode);
            getQPReport.then(function (res) {
                if (res == null) {
                    $scope.loading = false;
                    alert("No QP Report Present");
                }

                if (res.length > 0) {
                    if (res.length > 4) {
                        $scope.loading = false;
                        $scope.nodata = true;
                        //window.location.href + '/Reports/' + res + '.pdf';
                        window.location.href
                        //window.open(location,'_blank')
                        var url = window.location.origin + '/Reports/' + res + '.pdf';
                        console.log(url)
                        download(url, 'QP_Report' + '.pdf');
                        //window.open(url, '_blank'); 
                        $scope.nodata = false;

                    } else {
                        $scope.loading = false;
                        $scope.nodata = true;
                        alert("No QP Report Present");
                    }
                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    alert("No QP Report Present");
                }

            },

                function (error) {
                    $scope.loading = false;
                    $scope.nodata = true;
                    alert("No QP Report Present");
                    var err = JSON.parse(error);
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
            $state.go('Dashboard.ChangePassword');
        }

          $scope.logOut = function () {
                sessionStorage.loggedIn = "no";
                
              var GetUserLogout = SystemUserService.PostUserLogout(1, tmpData.UserName, $scope.SessionID,$scope.Session);
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