﻿define(['app'], function (app) {
    app.controller("TwalletResponseController", function ($scope, $http, $localStorage, $state, $stateParams, $interval, AppSettings, PaymentService) {
        $scope.success = false;
        $scope.LoadpaymentImg = true;
        //setTimeout(
        //    $scope.Detailsfound = false
        //    , 10000);
        var obj = {}
        $scope.paymentResponseFound = false;
        var paymentdetails = $stateParams.data;
        if (paymentdetails) {
            //var detail = JSON.parse(atob(paymentdetails));
            var detail = atob(paymentdetails);
            detail = detail.split("|").join('",');
            detail = detail.split("=").join(':"');
            detail = detail.split("?").join("");
            detail = detail.split("{").join("");
            detail = detail.split("}").join("");
            detail = detail.split("OrderId").join('"OrderId"');
            detail = detail.split("Amount").join('"Amount"');
            detail = detail.split("Description").join('"Description"');
            detail = detail.split("Statusdesc").join('"Statusdesc"');
            detail = detail.split("Status:").join('"Status":');

            detail = detail.split("RefUniqueid").join('"RefUniqueid"');
            detail = detail.split("RegistrationNumber").join('"RegistrationNumber"');
            
            var lement = "{" + detail + '"' + "}";
            //element.push(detail);
            console.log(lement)

            console.log(lement.Amount)
            //details = obj;
            detail = JSON.parse(lement);

            // "{OrderId:50597492,Amount:2,Description:$^$NA$^$11222-ec-001$^$NA$^$0.00,Status:Y,Statusdesc:Transaction successful,RefUniqueid:20231082114296603590}"
            console.log(detail)
            $scope.detail = detail
            //alert(detail.Statusdesc)
            $scope.transactionno = detail.bankrefno;
            $scope.OrderId = detail.OrderId;
            $scope.Status = detail.Status;
            $scope.Amount = detail.Amount;
            $scope.Statusdesc = detail.Statusdesc;
            $scope.RefUniqueid = detail.RefUniqueid;
            $scope.RegistrationNumber = detail.RegistrationNumber;
            $scope.LoadpaymentImg = false;
                        $scope.Detailsfound = true;
                        $scope.paymentResponseFound = true;
                        $scope.success = true;
        }
        if ($scope.Status == 'Y') {

            $scope.Detailsfound = true;
            var Sms = PaymentService.SendSuccessSMS(1, $scope.OrderId);
            Sms.then(function (res) {
                if (res.Table[0].StatusCode == '200') {
                    $scope.RegistrationNumber = res.Table1[0].RegistrationNumber;
                    $scope.LoadpaymentImg = false;
                    $scope.Detailsfound = true;
                    $scope.paymentResponseFound = true;
                    $scope.success = true;

                } else {

                    $scope.LoadpaymentImg = false;
                    $scope.Detailsfound = false;
                    $scope.success = false;
                    $scope.paymentResponseFound = true;
                    $scope.BacklogData = [];
                }


            }, function (err) {

            });
        }
        //    } else {
        //        $scope.LoadpaymentImg = false;
        //        $scope.Detailsfound = false;
        //        $scope.success = false;
        //        $scope.Status = "Transaction failed, if amount is deducted from your bank it is will be refunded with in 7 working days.";
        //        $scope.paymentResponseFound = true;
        //        $scope.BacklogData = [];
        //    }
        //}


        //if ($scope.Detailsfound == false) {



        //    var calls2s = function () {
        //        if (detail.Refno != null && detail.Refno != undefined && detail.Refno != "" && $scope.Detailsfound == false) {

        //            var s2sresponsedata = PaymentService.billDeskS2SResponse($scope.refno);
        //            s2sresponsedata.then(function (res) {

        //                $scope.pins = "";
        //                if (res.Table.length > 0) {
        //                    $scope.Paymentmode = res.Table[0].addtninfo6;
        //                    if (res.Table[0].addtninfo4 != 'NA') {
        //                        $scope.Sem = res.Table[0].addtninfo4;
        //                    }

        //                    if (res.Table[0].addtninfo3 != 'NA') {
        //                        $scope.certname = res.Table[0].addtninfo3;
        //                    }
        //                    if (res.Table[0].addtninfo7 != 'NA') {
        //                        $scope.applicatioNo = res.Table[0].addtninfo7;
        //                    }

        //                    $scope.date = res.Table[0].txndate;
        //                    $scope.transactionno = res.Table[0].bankrefno;
        //                    $scope.amount = (res.Table[0].txnamt * 1).toString();

        //                    $scope.Status = res.Table[0].errordesc;
        //                    var desc = res.Table[0].errordesc;
        //                    $scope.BacklogData = [];

        //                    if (res.Table[0].authstatus == '0300') {

        //                        $scope.pins = res.Table[0].addtninfo1;
        //                        $scope.Status = res.Table[0].errordesc;
        //                        var Sms = PaymentService.SendSuccessSMS(1, $scope.refno);
        //                        Sms.then(function (res) {
        //                            if (res.Table[0].StatusCode == '200') {
        //                                $scope.RegistrationNumber = res.Table1[0].RegistrationNumber;
        //                                $scope.LoadpaymentImg = false;
        //                                $scope.Detailsfound = true;
        //                                $scope.paymentResponseFound = true;
        //                                $scope.success = true;

        //                            } else {

        //                                $scope.LoadpaymentImg = false;
        //                                $scope.Detailsfound = false;
        //                                $scope.success = false;
        //                                $scope.paymentResponseFound = true;
        //                                $scope.BacklogData = [];
        //                            }


        //                        }, function (err) {

        //                        });
        //                        $scope.BacklogData = [];
        //                        if (res.Table[0].addtninfo5 == '8') {
        //                            $scope.SendSms(res.Table[0].addtninfo1, res.Table[0].addtninfo6, 'Genuineness Check', res.Table[0].addtninfo7)
        //                        }

        //                        var res = res.Table[0].addtninfo1.substring(0, 2);

        //                        $scope.cancel();
        //                        return;
        //                    } else {
        //                        $scope.Status = "Transaction Failed";
        //                        //if (desc.includes('-')) {
        //                        //    for (var i = 0; i < desc.length; i++)
        //                        //        if (desc.charAt(i) == '-') {
        //                        //            specialchar = i;
        //                        //            break;
        //                        //        }
        //                        //    desc = desc.substring(specialchar + 1, desc.length);
        //                        //}
        //                        //$scope.Status = desc;
        //                        $scope.LoadpaymentImg = false;
        //                        $scope.pins = "---";
        //                        $scope.success = false;



        //                        $scope.cancel();
        //                        return;
        //                    }

        //                } else {
        //                    $scope.LoadpaymentImg = false;
        //                    $scope.success = false;
        //                    $scope.paymentResponseFound = true;
        //                    $scope.Status = "Transaction failed, if amount is deducted from your bank it is will be refunded with in 7 working days.";
        //                    $scope.cancel();

        //                }
        //            }, function (error) {
        //                $scope.LoadpaymentImg = false;
        //                $scope.success = false;
        //                $scope.paymentResponseFound = true;
        //                $scope.Status = "Transaction failed, if amount is deducted from your bank it is will be refunded with in 7 working days.";
        //                $scope.cancel();
        //            });


        //        }

        //    }


        //    var promise = calls2s()// $interval(calls2s, 5000, 1);      //  $interval(function, interval, count);
        //    $scope.cancel = function () {
        //        $interval.cancel(promise);
        //    };
        //}
        $scope.SendSms = function (Pin, StudentPhoneNumber, CertificateName, ApplicationNo) {
            var sendSmss = PreExaminationService.sendGenuinenessSMS(Pin, StudentPhoneNumber, CertificateName, ApplicationNo)
            sendSmss.then(function (res) {

            }, function (error) {

            });
        }

        $scope.back = function () {
            //if ($localStorage.CertificateFeePaymentGatewayResponse.redirecturl != null && $localStorage.CertificateFeePaymentGatewayResponse.redirecturl != undefined) {
            //    $state.go($localStorage.PaymentGatewayResponse.redirecturl);

            //} else {
            $state.go('index');

            // }


        };
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

            window.print();


        };
    });
});