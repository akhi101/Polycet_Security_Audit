define(['app'], function (app) {
    app.controller("FeeAmountsController", function ($scope, $state, $uibModal, $localStorage, AdminService) {
        var authData = $localStorage.authorizationData;
        if (!authData) {
            $state.go('index.OfficialsLogin')
        }
        $scope.UserName = authData.UserName;
        var getcurrpolycetyear = AdminService.GetCurrentPolycetYear();
        getcurrpolycetyear.then(function (response) {
            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            $scope.CurrentPolycetYearData = res.Table;

        },
            function (error) {
                alert("error while loading States");
                //var err = JSON.parse(error);

            });

        $scope.GoBack = function () {
            $state.go('Dashboard.Settings')
        }

        $scope.GetFeeAmount = function (PolycetYearID) {

            var DataType = 1;
            var FeeAmountID = 0;//Default Value(Optional)
            var getfeeamount = AdminService.GetFeeAmounts(DataType, PolycetYearID, FeeAmountID);
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



  
        
        $scope.Submit = function (PolycetYearID, SCSTFee, OthersFee,LateFee,test) {
            $scope.FeeDiable = true;
            $scope.PolycetYearID = PolycetYearID;
            $scope.SCSTFee = SCSTFee;
            $scope.OthersFee = OthersFee;
            $scope.LateFee = LateFee;
            if ($scope.PolycetYearID == null || $scope.PolycetYearID == undefined || $scope.PolycetYearID == "") {
                alert("Please Select Polycet Year");
                return;
            }

            if ($scope.SCSTFee == null || $scope.SCSTFee == undefined || $scope.SCSTFee == "") {
            alert("Please Enter SC/ST Fee");
            return;
            }

            if ($scope.OthersFee == null || $scope.OthersFee == undefined || $scope.OthersFee == "") {
                alert("Please Enter Others Fee");
                return;
            }

            if ($scope.LateFee == null || $scope.LateFee == undefined || $scope.LateFee == "") {
                alert("Please Enter Late Fee");
                return;
            }

            test = { 'PolycetYearID': $scope.PolycetYearID, 'SCSTFee': $scope.SCSTFee, 'OthersFee': $scope.OthersFee, 'LateFee': $scope.LateFee }
            $scope.modalInstance = $uibModal.open(
                {
                    templateUrl: "/app/views/Popups/ConfirmAmountPopup.html",
                    size: 'small',
                    scope: $scope,
                    backdrop: 'static',
                    windowClass: 'modal-fit-att',
                    resolve: {
                        test: function () {
                            return test;
                        }

                        }
                    }
                
            );
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        

        $scope.AddFeeAmount = function (PolycetYearID, SCSTFee, OthersFee, LateFee) {
            var paramObj = {
                "DataType": 1,
                "PolycetYearID": PolycetYearID,
                "FeeAmountID": 0,//default value(Optional)
                "SCSTFee": SCSTFee,
                "OthersFee": OthersFee,
                "LateFee": LateFee,
                "Active": 0,//default value(Optional)
                "UserName": authData.UserName
            }
            var addfeeamounts = AdminService.AddFeeAmounts(paramObj);
            addfeeamounts.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.modalInstance.close();
                    $scope.GetFeeAmount(PolycetYearID);




                } else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.modalInstance.close();
                    $scope.GetFeeAmount(PolycetYearID);



                }

 
            },

                function (error) {

                    var err = JSON.parse(error);
                })


        }

        $scope.Edit = function (FeeAmountID) {
            var DataType = 2;
            var PolycetYearID = 0;//Default Value(Optional)
            var geteditfee = AdminService.EditFeeAmounts(DataType,PolycetYearID,FeeAmountID);
            geteditfee.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.EditData = res.Table[0];

                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load FeeAmounts')
            });

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditFeeAmountPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.View = function (FeeAmountID) {
            var DataType = 2;
            var PolycetYearID = 1;//Default Value(Optional)
            var getviewfee = AdminService.ViewFeeAmounts(DataType, PolycetYearID, FeeAmountID);
            getviewfee.then(function (response) {

                try {
                    var res = JSON.parse(response);
                    $scope.ViewData = res.Table[0];


                } catch (err) {
                }
            }, function (error) {
                alert('Unable to load Fee Amounts')
            });


            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/ViewFeeAmountsPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


     


    
       

        $scope.Update = function (data) {
            var paramObj = {
                "DataType": 2,
                "PolycetYearID": 0,//default value(Optional)
                "FeeAmountID": data.FeeAmountID,
                "SCSTFee": data.SCSTFee,
                "OthersFee": data.OthersFee,
                "LateFee": data.LateFee,
                "Active": data.Active,
                "UserName": authData.UserName
            }
            var updatefeeamount = AdminService.UpdateFeeAmounts(paramObj);
            updatefeeamount.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetFeeAmount($scope.PolycetYearID);
                    $scope.modalInstance.close();

                } else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetFeeAmount($scope.PolycetYearID);
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

