define(['app'], function (app) {
    app.controller("PaymentRecieptController", function ($scope, AdminService, $state, $http, $localStorage) {
        var tmp = $localStorage.TempData;
        var tmp1 = $localStorage.TempData1;

        $scope.ChallanNumber = tmp.ChallanNumber
        //$scope.ChallanNumber1 = tmp1.ChallanNumber1
        const $ctrl = this;

        $ctrl.$onInit = () => {

            if ($localStorage.TempData != '') {
                $scope.getPaymentReciept($scope.ChallanNumber);
            }
            else if ($localStorage.TempData1 != '') {
                $scope.getPaymentReciept1($scope.ChallanNumber);

            }
        }


        $scope.back = function () {
            $state.go('index.FeePaymentStatus')
        }

        $scope.getPaymentReciept = function (ChallanNumber) {
            $scope.loading = true;
            $scope.nodata = false;
            var getreciept = AdminService.GetPaymentReciept(ChallanNumber);
            getreciept.then(function (response) {
               
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.PaymentData = response[0];
                    $scope.refno = $scope.PaymentData.subscriberid
                    $scope.name = $scope.PaymentData.CandidateName
                    $scope.RegistrationNumber = $scope.PaymentData.addtninfo1
                    $scope.transactionno = $scope.PaymentData.txnrefno
                    $scope.Status = $scope.PaymentData.errordesc
                    $scope.txnamt = $scope.PaymentData.txnamt
                    $scope.date = $scope.PaymentData.txndate
                    $scope.authstatus = $scope.PaymentData.authstatus
                    $scope.loading = false;
                    $scope.nodata = false;

                    if ($scope.authstatus=='0300') {
                        $scope.success = true;
                    }
                    else {
                        $scope.success = false;

                    }
                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.PaymentData = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.getPaymentReciept1 = function (ChallanNumber) {
            $scope.loading = true;
            $scope.nodata = false;
            var getreciept = AdminService.GetPaymentReciept1(ChallanNumber);
            getreciept.then(function (response) {

                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.nodata = false;
                    $scope.PaymentData = response[0];
                    $scope.refno = $scope.PaymentData.subscriberid
                    $scope.name = $scope.PaymentData.CandidateName
                    $scope.RegistrationNumber = $scope.PaymentData.addtninfo1
                    $scope.transactionno = $scope.PaymentData.txnrefno
                    $scope.Status = $scope.PaymentData.errordesc
                    $scope.txnamt = $scope.PaymentData.txnamt
                    $scope.date = $scope.PaymentData.txndate
                    $scope.authstatus = $scope.PaymentData.authstatus
                    $scope.loading = false;
                    $scope.nodata = false;
                    if ($scope.authstatus == '0300') {
                        $scope.success = true;
                    }
                    else {
                        $scope.success = false;

                    }
                }
                else {
                    $scope.loading = false;
                    $scope.nodata = true;
                    $scope.PaymentData = [];

                    $scope.loading = false;
                    $scope.nodata = true;

                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });
        }

        $scope.printMarksEntered = function () {

            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "Pay_Reciept";



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

            document.title = $scope.refno;
            window.print();
            document.title = 'TS POLYCET';

        };
    });
});