define(['app'], function (app) {
    app.controller("HallticketController", function ($scope, $crypto, AdminService, SystemUserService, AppSettings, $http, $localStorage, $state) {

        var RegistrationId = 3297;
        var RegistrationNumber = "231003297";
       // $scope.HallticketGenerated = true;

        var getdetails = AdminService.GetHallticketByRegistrationId(RegistrationId, RegistrationNumber);
        getdetails.then(function (resp) {
            try {
                var res = JSON.parse(resp);
                if (res.Table[0].StatusCode == 200) {
                    $scope.CentreCode = res.Table1[0].CentreCode
                    $scope.CentreName = res.Table1[0].CentreName
                    $scope.ExamDate = res.Table1[0].ExamDate
                    $scope.HallticketNumber = res.Table1[0].HallticketNumber
                    $scope.PolycetYear = res.Table1[0].PolycetYear
                    $scope.AadharNumber = res.Table2[0].AadharNumber
                    $scope.CasteCategoryName = res.Table2[0].CasteCategoryName
                    $scope.RegistrationNumber = res.Table2[0].RegistrationNumber
                    $scope.StudentAddress = res.Table2[0].StudentAddress
                    $scope.StudentName = res.Table2[0].StudentName
                    $scope.FatherName = res.Table2[0].FatherName
                    $scope.TenthHallticketNumber = res.Table2[0].TenthHallticketNumber
                    $scope.AadharNumber = res.Table2[0].AadharNumber
                    $scope.ChallanNumber = res.Table3[0].ChallanNumber
                    $scope.RegistrationAmount = res.Table3[0].RegistrationAmount
                    $scope.txndate = res.Table3[0].txndate
                    $scope.StudentPhoto = res.Table4[0].StudentPhoto
                    $scope.StudentSignature = res.Table4[0].StudentSignature
                   
                } if (res.Table[0].StatusCode == 400) {
                    alert(res.Table[0].StatusDescription)
                }
            }
            catch (err) { }

            if (res.Table.length > 0) {
              console.log(res)


            }
            else {
                $scope.DistrictsData5 = [];
            }

        },
            function (error) {
                //alert("data is not loaded");
                //    var err = JSON.parse(error);
            });

    })
})