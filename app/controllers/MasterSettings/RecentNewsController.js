define(['app'], function (app) {
    app.controller("RecentNewsController", function ($scope, $state, $localStorage, $uibModal,  AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;

      
       
        const $ctrl = this
        $ctrl.$onInit = () => {

            $scope.getallRecentNews();
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }


            today = yyyy + '-' + mm + '-' + dd;

            $scope.today = today;
        }
       
        $scope.loading = false;


        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }
        //var usertypes = AdminService.GetUserTypes();
        //usertypes.then(function (response) {
        //    if (response.Table.length > 0) {
        //        $scope.UserTypes = response.Table;

        //    } else {
        //        $scope.StudentType = [];
        //        alert("No Data Found");
        //    }
        //},
        //    function (error) {
        //        alert("error while loading Data");
        //        console.log(error);
        //    });



        $scope.getallRecentNews = function () {

            //$scope.loading = true;

            $scope.DataType = 1;
            var GetRecentNews = AdminService.GetAllRecentNews($scope.DataType);
            GetRecentNews.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res.Table.length>0) {
                    $scope.loading = false;
                    $scope.RecentNewsTable = res.Table;
                    //$scope.result = true;
                    $scope.NoData = false;
                    //$scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    //$scope.result = false;
                    $scope.NoData = true;
                    alert("No Data Found");
                    //$scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

       




        $scope.AddRecentNews = function () {
            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert('Please select StartDate');
                return;
            }
            if ($scope.EndDate == null || $scope.EndDate == undefined || $scope.EndDate == "") {
                alert('Please select EndDate');
                return;
            }
            if ($scope.RecentNews == null || $scope.RecentNews == undefined || $scope.RecentNews == "") {
                alert('Please enter RecentNews');
                return;
            }
            $scope.loading = true;
            var DataType = 1;
            var RecentNewsID = 0;//defaultvalue(Optional)
            var Active = true;//defaultvalue(Optional)
            var addrecentnews = AdminService.AddRecentNews(DataType, RecentNewsID, $scope.RecentNews, moment($scope.StartDate).format("YYYY-MM-DD"),
                moment($scope.EndDate).format("YYYY-MM-DD"), Active, authData.UserName);
            addrecentnews.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponceCode == '200') {
                    alert(res[0].ResponceDescription);
                    $scope.getallRecentNews();

                } else if (res.ResponceCode == '400') {
                    alert(res.ResponceDescription);
                    $scope.getallRecentNews();
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.Edit = function (RecentNewsID) {
            var DataType = 3;
            var geteditcentres = AdminService.GetEditRecentNews(DataType,RecentNewsID);
            geteditcentres.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];
                    

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Centres')
            });

            test = { 'RecentNewsText': $scope.RecentNews,'FromDate': $scope.StartDate, 'ToDate': $scope.EndDate}
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditRecentNewsPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
                resolve: {
                    test: function () {
                        return test;
                    }

                }
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.View = function (DataType, RecentNewsID) {
            var DataType = 3;
            var getviewrecentnews = AdminService.GetViewRecentNews(DataType,RecentNewsID);
            getviewrecentnews.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Centres')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewRecentNewsPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.Update = function (newdata) {
            //var StartDate = moment(newdata.StartDate).format("YYYY-MM-DD");
            //var endDate = moment(newdata.EndDate).format("YYYY-MM-DD");
            //var paramObj = {
            //    "DataType": 2,
            //    "RecentNewsID": newdata.RecentNewsID,
            //    "RecentNewsText": newdata.RecentNewsText,
            //    "FromDate": StartDate,
            //    "ToDate": endDate,
            //    "Active": newdata.Active,
            //    "UserName": authData.UserName,
            //}
            var DataType = 2;
            var updaterecentnews = AdminService.UpdateRecentNews(DataType, newdata.RecentNewsID, newdata.RecentNewsText, moment(newdata.FromDate).format("YYYY-MM-DD"),
                moment(newdata.ToDate).format("YYYY-MM-DD"), newdata.Active, authData.UserName);
            updaterecentnews.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                console.log(response)
                if (res[0].ResponceCode == '200') {
                    alert('Recent News Updated Successfully');
                    $scope.getallRecentNews();
                    $scope.modalInstance.close();
                    $state.go('Dashboard.Settings.RecentNews')

                } else if (res[0].ResponceCode == '400') {
                    alert(res[0].ResponceDescription);
                    $scope.getallRecentNews();
                    $scope.modalInstance.close();

                }
            },
                function (error) {

                    var err = JSON.parse(error);
                })         
        }


        //$scope.getAllRecentNews = function () {

        //    $scope.modalInstance = $uibModal.open({
        //        templateUrl: "/app/views//AllRecentNewsPopup.html",
        //        size: 'lg',
        //        scope: $scope,
        //        windowClass: 'modal-fit',
        //        backdrop: 'static',
        //        keyboard: false
        //    });

        //    var GetAllRecentNews = AdminService.GetAllRecentNews();
        //    GetAllRecentNews.then(function (response) {
        //        if (response.Table.length) {
        //            $scope.GetAllRecentNews = response.Table;

        //        } else {
        //            $scope.loading = false;
        //            $scope.NoData = true;
        //            alert("No Data Found");

        //        }
        //    },
        //        function (error) {

        //            alert("error while loading Data");
        //            console.log(error);
        //        });
        //    $scope.closeModal = function () {
        //        $scope.modalInstance.close();
        //    };


        //}


        var expanded = false;

        $scope.showcheckboxes = function () {
            var checkboxes = document.getelementbyid("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.SetEndDate = function (StartDate) {

            if (StartDate !== null && StartDate !== undefined) {
                var d = StartDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                // d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var Start_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            //var date = new Date(Start_date);
            var indiaTime = new Date(StartDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);

            $scope.tomorrow = indiaTime.toLocaleString();
            //var time = indiaTime.toLocaleTimeString();
            //console.log(time);


            //var tomorrow = new Date($scope.tomorrow);
            //tomorrow.setDate(tomorrow.getDate() );

            var dates = new Date(indiaTime.toLocaleString());
            //var time = new Date(tomorrow.toLocaleTimeString())
            //console.log(time)
            month = '' + (dates.getMonth() + 1);
            day = '' + dates.getDate();
            year = dates.getFullYear();


            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            $scope.endDisable = false;
            $scope.enD = [year, month, day].join('-');

            document.getElementById("datetimepicker2").setAttribute("min", $scope.enD);

        };

        $scope.closecheckbox = function () {
            var checkboxes = document.getelementbyid("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.toggleall = function () {
            var togglestatus = $scope.isallselected;
            angular.foreach($scope.usertypes, function (itm) { itm.selected = togglestatus; });
            $scope.arr = [];
            angular.foreach($scope.usertypes, function (value, key) {
                if (value.selected === true) {

                    $scope.arr.push({ "id": value.id })
                }

            });

        }

        $scope.optiontoggled = function (mid1list) {
            $scope.isallselected = $scope.usertypes.every(function (itm) { return itm.selected; })
            $scope.arr = [];
            angular.foreach($scope.usertypes, function (value, key) {
                if (value.selected === true) {

                    $scope.arr.push({ "id": value.id })
                }
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