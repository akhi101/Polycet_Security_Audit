define(['app'], function (app) {
    app.controller("ViewOMRController", function ($scope, $localStorage, AdminService, $state) {
        var tmp = $localStorage.TempData;
        $scope.UserID = tmp.UserID;
        $scope.UserName = tmp.UserName;
        $scope.MobileNumber = tmp.MobileNumber;
        $scope.HallTicketNumber = tmp.HallTicketNumber;
        $scope.MobileDataType = tmp.MobileDataType
        $scope.HtDataType = tmp.HtDataType
        $scope.Barcode = tmp.Barcode;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.getHallticket();
            $scope.printbutton = true;

        }

        if ($scope.MobileDataType == 1) {
            $scope.DataType = 1
            $scope.Number = tmp.MobileNumber
        }
        else if ($scope.HtDataType == 2) {
            $scope.DataType = 2
            $scope.Number = tmp.HallTicketNumber
        }


        $scope.GoBack = function () {
            $state.go('index.GetOMR')
        }

        $scope.PrintHallticket = function () {
            $scope.PrintHtLog();
            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "Application_Preview";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;

            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);
            }
            document.title = $scope.HallticketHallticketNumber;
            window.print();
            document.title = 'TS POLYCET';

        };

        $scope.PrintHtLog = function () {
            var paramObject = {
                "RegistrationID": $scope.RegistrationId,
                "HallicketNo": $scope.HallticketHallticketNumber,
                "UserName": $scope.RegistrationNumber

            }
            var downloadlog = AdminService.SetStdHtLog(paramObject);
            downloadlog.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.loading = false;


                } else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);

                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }




        $scope.getHallticket = function () {
            var getdetails = AdminService.GetHallticket($scope.DataType, $scope.Number);
            getdetails.then(function (resp) {
                try {
                    var res = JSON.parse(resp);
                    if (res.Table[0].StatusCode == 200) {
                        $scope.HallticketPolycetYear = res.Table1[0].PolycetYear
                        $scope.HallticketCentreCode = res.Table1[0].CentreCode
                        $scope.HallticketCentreName = res.Table1[0].CentreName
                        $scope.HallticketExamDate = res.Table1[0].ExamDate
                        $scope.HallticketHallticketNumber = res.Table1[0].HallticketNumber
                        $scope.RegistrationNumber = res.Table1[0].RegistrationNumber
                        $scope.HallticketPolycetYear = res.Table1[0].PolycetYear
                        $scope.HallticketAadharNumber = res.Table2[0].AadharNumber
                        $scope.HallticketCasteCategoryName = res.Table2[0].CasteCategoryName
                        $scope.HallticketRegistrationNumber = res.Table2[0].RegistrationNumber
                        $scope.HallticketStudentAddress = res.Table2[0].StudentAddress
                        $scope.HallticketStudentName = res.Table2[0].StudentName
                        $scope.HallticketFatherName = res.Table2[0].FatherName
                        $scope.HallticketTenthHallticketNumber = res.Table2[0].TenthHallticketNumber
                        $scope.HallticketAadharNumber = res.Table2[0].AadharNumber
                        $scope.HallticketmaskedAadhaar = $scope.HallticketAadharNumber.slice(0, 8).replace(/[0-9]/g, "X") + $scope.HallticketAadharNumber.slice(-4);
                        $scope.HallticketChallanNumber = res.Table3[0].ChallanNumber
                        $scope.HallticketRegistrationAmount = res.Table3[0].RegistrationAmount
                        $scope.Halltickettxndate = res.Table3[0].txndate
                        $scope.HallticketStudentPhoto = res.Table4[0].StudentPhoto
                        $scope.HallticketStudentSignature = res.Table4[0].StudentSignature

                    } if (res.Table[0].StatusCode == 400) {
                        alert(res.Table[0].StatusDescription)
                        $state.go('index.GetHT');

                    }
                }
                catch (err) { }



            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }





    })
})