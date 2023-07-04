define(['app'], function (app) {
    app.controller("RankCardController", function ($scope, $localStorage, AdminService, $state) {
        var tmp = $localStorage.TempData;
        $scope.UserID = tmp.UserID;
        $scope.UserName = tmp.UserName;
        $scope.HallTicketNo = tmp.HallTicketNo
        $scope.Name = tmp.Name
        $scope.FatherName = tmp.FatherName
        $scope.DateofBirth = tmp.DateofBirth
        $scope.ExamDate = tmp.ExamDate
        $scope.MPC_RANK = tmp.MPC_RANK
        $scope.MBIPC_RANK = tmp.MBIPC_RANK
        $scope.MATHS = tmp.MATHS
        $scope.PHYSICS = tmp.PHYSICS
        $scope.CHEMISTRY = tmp.CHEMISTRY
        $scope.BIOLOGY = tmp.BIOLOGY
        $scope.Remarks = tmp.Remarks
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.printbutton = true;

        }
        if (tmp.HallTicketNo == undefined) {
            $state.go('index')
        }
        else {

        }
        $scope.GoBack = function () {
            $state.go('index.GetRankCard')
        }
       

        $scope.PrintRankCard = function () {
            $scope.PrintRankCardLog();
            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "Application_Preview";



            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;

            //var domClone = divToPrint.cloneNode(true);
            //var $printSection = document.getElementById("printSection");
            //if ($printSection) {
            //    var $printSection = document.createElement("div");
            //    $printSection.id = "printSection";


            //    document.body.appendChild($printSection);

            //    var $ele1 = document.createElement("div");
            //    $ele1.className = "row";

            //    var $ele2 = document.createElement("div");
            //    $ele2.className = "col-lg-2 col-md-12";

            //    var $ele3 = document.createElement("div");
            //    $ele3.className = "col-lg-10 col-md-12";


            //    $ele1.appendChild($ele3);

            //    $printSection.appendChild($ele1);

            //    $printSection.appendChild($ele1);
            //    $printSection.appendChild($markstable);
            //}
            document.title = $scope.HallTicketNo;
            window.print();
            document.title = 'TS POLYCET';

        };

        $scope.PrintRankCardLog = function () {
            var paramObject = {
                "HallticketNo": $scope.HallTicketNo,
            }
            var downloadlog = AdminService.SetStdRankCardLog(paramObject);
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



    })
})