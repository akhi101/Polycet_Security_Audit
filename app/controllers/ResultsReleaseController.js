define(['app'], function (app) {
    app.controller("ResultsReleaseController", function ($scope,$localStorage, $state,AdminService) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
           $state.go('index.WebsiteLogin');
        } else {
            $scope.SessionId = $localStorage.SessionId;
            $scope.UserName = authData.UserName;
        }

     //   $scope.ReleaseResults = function () {
           // alert("Polycet 2023 Results Released")

       
      //  setTimeout(, 10000);
       

            var getResults = AdminService.ReleaseResults($scope.UserName);
        getResults.then(function (response) {
                console.log(response)
            try {
                var res = JSON.parse(response)
            }
            catch (err) { }
            if (res.Table[0].ResponseCode == '200') {

               // $state.go('index.GetRankCard')

            } else if (res.Table[0].ResponseCode == '400') {
             //   $state.go('index')
               // alert(res.Table[0].ResponseDescription);
              //  $state.go('index.GetRankCard')

            }
        },
            function (error) {
                alert("error while getting Results")
                //var err = JSON.parse(error);
            });
        setTimeout(() => {
            $state.go('index.GetRankCard')
        }, 7000);
       // }


    })
})