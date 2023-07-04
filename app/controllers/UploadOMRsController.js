define(['app'], function (app) {
    app.controller("UploadOMRsController", function ($scope, AdminService, $http, $localStorage, $state, AppSettings, SystemUserService) {
        var authData = $localStorage.authorizationData;
        $scope.authToken = $localStorage.authToken;
        $scope.AssessmentModules = [];
        var UserTypeID = parseInt(authData.UserTypeID);
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        $scope.UserName = authData.UserName;
        $scope.UserTypeName = authData.UserTypeName;
        const $ctrl = this;
        $ctrl.$onInit = () => {
        //    $scope.getOMRBarcodeData();
        }


        //$scope.selectImages = function () {
        //    $scope.selectedFolderPath = '';
        //    $http.post('/api/AdminService/GetOMRBarcodeData', { folderPath: $scope.selectedFolderPath })
        //        .then(function (response) {
        //            // Handle the response from the server if needed
        //            console.log(response.data);
        //        })
        //        .catch(function (error) {
        //            // Handle any errors that occur during the HTTP request
        //            console.log(error);
        //        });
  
        //}

        //$scope.getFolderPath = function () {
        //    var files = document.getElementById("folderInput").files;

        //    if (files.length > 0) {
        //        var filePaths = Array.from(files).map(function (file) {
        //            return file.webkitRelativePath || file.name;
        //            $scope.filePath = file.webkitRelativePath;
        //        });
        //     //   $scope.findCommonPath(filePaths);
        //     //var commonPath = findCommonPath(filePaths);
        //    //    console.log("Folder path: " + commonPath);
        //    }
        //}

        $scope.getFolderPath = function () {
            var fileInput = document.getElementById('folderInput');
            var files = folderInput.files;

            var filePaths = [];
            for (var i = 0; i < files.length; i++) {
                var path = files[i].name; // You can use files[i].path if you have access to the full path
                filePaths.push(path);
            }

            $scope.getOMRBarcodeData(filePaths);

        };

        $scope.getOMRBarcodeData = function (filePaths) {
            var getdata = AdminService.GetOMRBarcodeData(filePaths);
            getdata.then(function (response) {
                //try {
                //    var Res = JSON.parse(response);
                //}
                //catch (err) { }
                if (response.Table.length > 0) {
                    //$scope.loading = false;
                    //$scope.nodata = false;
                    $scope.BarcodeData = response.Table;

                }
                else {
                    //$scope.loading = false;
                    //$scope.nodata = true;
                    $scope.BarcodeData = [];

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.uploadOMRBarcode = function () {
            var paramObj = {
                "OMRBarcodeID": $scope.OMRBarcodeID,
                "Barcode": $scope.Barcode,
                "UserName": $scope.UserName,
            }

            var saveomrdata = AdminService.UploadOMRBarcode(paramObj);
            saveomrdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.Table[0].StatusCode == '200') {
                    alert(res.Table[0].StatusDescription);                  
                    $scope.getOMRBarcodeData();
                   
                } else if (res.Table[0].StatusCode == '400') {
                    alert(res.Table[0].StatusDescription);
                    $scope.getOMRBarcodeData();
                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })

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



