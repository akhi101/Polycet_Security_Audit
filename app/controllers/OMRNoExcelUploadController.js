define(['app'], function (app) {
    app.controller("OMRNoExcelUploadController", function ($scope, AdminService, $http, $localStorage, $rootScope, $state, $stateParams, $document, AppSettings, $timeout, Excel) {
        var authData = $localStorage.authorizationData;
        if (authData == undefined) {
            $state.go('index.OfficialsLogin')
        }
        //$scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        $scope.SessionID = $localStorage.SessionID;
        $scope.UserID = authData.UserID;
        var tmp = $localStorage.TempData;

        const $ctrl = this;
        $scope.UserName = authData.UserName;
        $scope.UserTypeName = authData.UserTypeName;
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


        $ctrl.$onInit = () => {

        }



        $scope.GetTable = false;

       

        // ************************ Drag and drop ***************** //
        let dropArea = document.getElementById("drop-area")

            // Prevent default drag behaviors
            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false)
                document.body.addEventListener(eventName, preventDefaults, false)
            })

            // Highlight drop area when item is dragged over it
            ;['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false)
            })

            ;['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false)
            })

        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false)

        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        function highlight(e) {
            dropArea.classList.add('highlight')
        }

        function unhighlight(e) {
            dropArea.classList.remove('active')
        }

        function handleDrop(e) {
            var dt = e.dataTransfer
            var files = dt.files

            handleFiles(files)
        }

        let uploadProgress = []
        let progressBar = document.getElementById('progress-bar')

        function initializeProgress(numFiles) {
            progressBar.value = 0
            uploadProgress = []

            for (let i = numFiles; i > 0; i--) {
                uploadProgress.push(0)
            }
        }

        function updateProgress(fileNumber, percent) {
            uploadProgress[fileNumber] = percent
            let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
            console.debug('update', fileNumber, percent, total)
            progressBar.value = total
        }

        function handleFiles(files) {
            files = [...files]
            initializeProgress(files.length)
            files.forEach(uploadFile)
            files.forEach(previewFile)
        }

        function previewFile(file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                let img = document.createElement('img')
                img.src = reader.result
                document.getElementById('gallery').appendChild(img)
            }
        }


        $scope.SampleData = [{
            "sbtet_code": "",
            "sbtet_branch_code": "",
            "Candidatename": "",
            "FatherName": "",
            "MotherName": "",
            "sex": "",
            "dob_date": "",
            "e_mail": "",
            "StudentContact": "",
            "SCHEME": "",
            "ActiveFlag": "",
            "AcademicYearId": "",
            "CategoryId": "",
            "TenthRollNo": "",
            "StudentRecided": "",
            "PolycetHallTicketNo": "",
            "ReligionId": "",
            "Region": "",
            "MinorityType": "",
            "PermanentAddress": "",
            "TempararyAddress": "",
            "HouseNo": "",
            "VillageorTown": "",
            "District": "",
            "Mandal": "",
            "IsPhysicallyHandicaped": "",
            "FatherAadhaarNo": "",
            "MotherAadhaarNo": "",
            "IsFatherGorthEmp": "",
            "Income": "",
            "IncomeStatusValidity": "",
            "IncomeCategory": "",
            "Occupation": "",
            "CasteNo": "",
            "CasteCertificateValidity": "",
            "Bank": "",
            "BankAccountNo": "",
            "IfscCode": "",
            "BankBranch": "",
            "mandal": "",
            "district": "",
        }]

        function uploadFile(file, i) {
            var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open('POST', url, true)
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

            // Update progress (can be used to show progress indicator)
            xhr.upload.addEventListener("progress", function (e) {
                updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
            })

            xhr.addEventListener('readystatechange', function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    updateProgress(i, 100) // <- Add this
                }
                else if (xhr.readyState == 4 && xhr.status != 200) {
                    // Error. Inform the user
                }
            })

            formData.append('upload_preset', 'ujpu6gyk')
            formData.append('file', file)
            xhr.send(formData)
        }

        $scope.FileContains = false;
        $scope.$watch('myFile', function (newFileObj) {
            if (newFileObj) {
                $scope.filename = newFileObj.name;
                $scope.FileContains = true;
            }
        });
        $scope.tabledata = [];
        // reading excel data
        $scope.tabledata = [];
        $scope.Exceldata = [];


        $scope.openOMRExcel = function () {
            $scope.reload = true;
            if ($scope.myFile != '') {
                $scope.reload = true;

                $scope.tabledata = []
                $scope.Exceldat = [];
                $scope.Exceldata = [];
                var reader = new FileReader();
                reader.readAsBinaryString($scope.myFile);
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary',
                    });
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object
                        var obj2 = []
                        $scope.XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify($scope.XL_row_object);
                        $scope.JsonObj = JSON.parse(json_object)


                        $scope.reload = false
                    });

                    if ($scope.XL_row_object.length > 0) {

                        var data = {};
                        $scope.Exceldata.push($scope.XL_row_object);


                        $scope.Exceldat = $scope.Exceldata[0]
                        var tempArray = ["HallticketNumber", "StudentName", "ExaminationCentreCode", "ExaminationCentreName",
                            "CoordinatingCentreCode", "CoordinatingCentreName", "PhotoPath", "SignaturePath", "OMRNumber","Barcode"];
                        var keysMached = false;
                        for (let q = 0; q < Object.keys($scope.Exceldat[0]).length; q++) {
                            if (tempArray.includes(Object.keys($scope.Exceldat[0])[q])) {
                                console.log("All Keys Matched");

                                keysMached = true;
                            } else {
                                console.log(Object.keys($scope.Exceldat[0])[q])
                                alert(Object.keys($scope.Exceldat[0])[q] + " Column Name Not Matched to the Required Excel");
                                $scope.tabledata = []
                                $scope.Exceldat = [];
                                $scope.Exceldata = [];
                                keysMached = false;
                                $scope.reload = false;
                                document.getElementById("myCheck").click();
                                break;
                                return;
                            }
                        };
                        if (keysMached == true) {
                            $scope.tabledata.push({ rows: $scope.XL_row_object, cols: Object.keys($scope.XL_row_object[0]) });
                            if ($scope.tabledata.length > 0) {
                                $scope.ShowTableData = true;
                                //$scope.reload = false
                            } else {

                                $scope.tabledata = []
                                $scope.Exceldat = [];
                                $scope.Exceldata = [];
                                $scope.ShowTableData = false;
                                $scope.reload = false
                            }
                        } else {
                            $scope.reload = false
                            $scope.tabledata = []
                            $scope.Exceldat = [];
                            $scope.Exceldata = [];
                            $scope.ShowTableData = false;
                        }
                        document.getElementById("myCheck").click();

                    } else {
                        $scope.tabledata = []
                        $scope.Exceldat = [];
                        $scope.Exceldata = [];
                        $scope.reload = false
                        document.getElementById("myCheck").click();
                    }

                    $scope.reload = false

                };

                reader.onerror = function (ex) {
                    $scope.tabledata = []
                    $scope.Exceldat = [];
                    $scope.Exceldata = [];
                    $scope.reload = false

                    $scope.reload = false
                };

            } else {
                alert('Please Upload Excel file');
                $scope.tabledata = []
                $scope.Exceldat = [];
                $scope.Exceldata = [];
                $scope.reload = false
                $scope.reload = false
                return;
            }


        }


        $scope.openSGExcel = function () {
            $scope.reload = true;
            if ($scope.myFile != '') {
                $scope.reload = true;

                $scope.tabledata = []
                $scope.Exceldat = [];
                $scope.Exceldata = [];
                var reader = new FileReader();
                reader.readAsBinaryString($scope.myFile);
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary',
                    });
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object
                        var obj2 = []
                        $scope.XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify($scope.XL_row_object);
                        $scope.JsonObj1 = JSON.parse(json_object)


                        $scope.reload = false
                    });

                    if ($scope.XL_row_object.length > 0) {

                        var data = {};
                        $scope.Exceldata.push($scope.XL_row_object);


                        $scope.Exceldat = $scope.Exceldata[0]
                        var tempArray = ["slno", "CentreName", "CentreCode", "omrno","barcodeno"];
                        var keysMached = false;
                        for (let q = 0; q < Object.keys($scope.Exceldat[0]).length; q++) {
                            if (tempArray.includes(Object.keys($scope.Exceldat[0])[q])) {
                                console.log("All Keys Matched");

                                keysMached = true;
                            } else {
                                console.log(Object.keys($scope.Exceldat[0])[q])
                                alert(Object.keys($scope.Exceldat[0])[q] + " Column Name Not Matched to the Required Excel");
                                $scope.tabledata = []
                                $scope.Exceldat = [];
                                $scope.Exceldata = [];
                                keysMached = false;
                                $scope.reload = false;
                                document.getElementById("myCheck").click();
                                break;
                                return;
                            }
                        };
                        if (keysMached == true) {
                            $scope.tabledata.push({ rows: $scope.XL_row_object, cols: Object.keys($scope.XL_row_object[0]) });
                            if ($scope.tabledata.length > 0) {
                                $scope.ShowTableData = true;
                                //$scope.reload = false
                            } else {

                                $scope.tabledata = []
                                $scope.Exceldat = [];
                                $scope.Exceldata = [];
                                $scope.ShowTableData = false;
                                $scope.reload = false
                            }
                        } else {
                            $scope.reload = false
                            $scope.tabledata = []
                            $scope.Exceldat = [];
                            $scope.Exceldata = [];
                            $scope.ShowTableData = false;
                        }
                        document.getElementById("myCheck").click();

                    } else {
                        $scope.tabledata = []
                        $scope.Exceldat = [];
                        $scope.Exceldata = [];
                        $scope.reload = false
                        document.getElementById("myCheck").click();
                    }

                    $scope.reload = false

                };

                reader.onerror = function (ex) {
                    $scope.tabledata = []
                    $scope.Exceldat = [];
                    $scope.Exceldata = [];
                    $scope.reload = false

                    $scope.reload = false
                };

            } else {
                alert('Please Upload Excel file');
                $scope.tabledata = []
                $scope.Exceldat = [];
                $scope.Exceldata = [];
                $scope.reload = false
                $scope.reload = false
                return;
            }


        }


        $scope.UploadOMRExcel = function () {
            var DataType = 1
            $scope.filteredArray1 = [];
            $scope.JsonObj.forEach(function (element) {
                //console.log(element)
                var obj = {
                    "HallticketNumber": element.HallticketNumber,
                    "StudentName": element.StudentName,
                    "ExaminationCentreCode": element.ExaminationCentreCode,
                    "ExaminationCentreName": element.ExaminationCentreName,
                    "CoordinatingCentreCode": element.CoordinatingCentreCode,
                    "CoordinatingCentreName": element.CoordinatingCentreName,
                    "PhotoPath": element.PhotoPath,
                    "SignaturePath": element.SignaturePath,
                    "OMRNumber": element.OMRNumber,
                    "Barcode": element.Barcode
                }
                $scope.filteredArray1.push(obj)
            });
            console.log($scope.filteredArray1)
            $scope.reload = true;
            var uploadJson = AdminService.UploadOMRNumberExcel(DataType, $scope.filteredArray1);
            uploadJson.then(function (res) {
                var data = JSON.parse(res);
                if (data[0].ResponceCode == '400') {
                    alert(data[0].ResponceDescription)
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';

                    var location = data[0].file;
                    window.location.href = location;

                } else if (data[0].ResponceCode == '200') {
                    alert(data[0].ResponceDescription)
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';
                }
                else {
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';
                    alert('Something Went Wrong')
                }
                //$scope.tabledata;
            }, function (error) {
                $scope.reload = false;
                $('#upldfile').val(null);
                $('#File').val(null);
                $scope.filename = '';
                $scope.myFile = '';
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.UploadSGExcel = function () {
            var DataType = 2
            $scope.filteredArray = [];
            $scope.JsonObj1.forEach(function (element) {
                //console.log(element)
                var obj = { "Slno": element.slno, "CentreName": element.CentreName, "CentreCode": element.CentreCode, "omrno": element.omrno, "barcodeno": element.barcodeno }
                $scope.filteredArray.push(obj)
            });
            console.log($scope.filteredArray)
            $scope.reload = true;
            var uploadJson = AdminService.UploadSGExcel(DataType, $scope.filteredArray);
            uploadJson.then(function (res) {
                var data = JSON.parse(res);
                if (data[0].ResponceCode == '400') {
                    alert(data[0].ResponceDescription)
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';

                    var location = data[0].file;
                    window.location.href = location;

                } else if (data[0].ResponceCode == '200') {
                    alert(data[0].ResponceDescription)
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';
                }
                else {
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';
                    alert('Something Went Wrong')
                }
                //$scope.tabledata;
            }, function (error) {
                $scope.reload = false;
                $('#upldfile').val(null);
                $('#File').val(null);
                $scope.filename = '';
                $scope.myFile = '';
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }


        //-----end-----
        
        $scope.init = function () {
            var i, j, column, cell;
            var records = [],
                record;
            var temp = $scope.XL_row_object;
            $scope.numRows = 10;
            $scope.numColumns = 20;


            for (i = 0; i < $scope.numRows; i++) {
                record = [];
                for (j = 0; j < $scope.numColumns; j++) {
                    cell = {
                        value: ''
                    }
                    record.push(cell);
                }
                records.push(record);
            }
            $scope.records = $scope.XL_row_object;

        }

        // $scope.init();

        var hideContextMenu = function () {
            $scope.isContextMenuVisible = false;
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        };
        $scope.numRows = 0;
        $scope.numColumns = 0;

        $scope.isContextMenuVisible = false;
        $scope.contextmenuRowIndex = -1;
        $scope.contextmenuColumnIndex = -1
        $scope.openContextMenu = function ($event, rowIndex, columnIndex) {
            $event.preventDefault();

            if ($event.button === 0) {
                $scope.isContextMenuVisible = false;
                return;
            }

            $scope.contextmenuRowIndex = rowIndex;
            $scope.contextmenuColumnIndex = columnIndex;
            $scope.contextMenuStyle = {
                top: $event.clientY + 'px',
                left: $event.clientX + 'px'
            };
            $scope.isContextMenuVisible = true;
        };
        $scope.addRow = function () {
            var i,
                record,
                cell,
                index = $scope.contextmenuRowIndex;

            record = [];
            for (i = 0; i < $scope.numColumns; i++) {
                cell = {
                    value: 'New Cell'
                }
                record.push(cell);
            }

            $scope.records.splice(index, 0, record);
            $scope.isContextMenuVisible = false;
            $scope.numRows = $scope.records.length;
        };
        $scope.removeRow = function () {
            var index = $scope.contextmenuRowIndex;
            $scope.records.splice(index, 1);
            $scope.isContextMenuVisible = false;
            $scope.numRows = $scope.records.length;
        };
        $scope.addColumn = function () {
            var i, record;
            for (i = 0; i < $scope.records.length; i++) {
                record = $scope.records[i];
                record.splice($scope.contextmenuColumnIndex, 0, {
                    value: 'New Col'
                });
            }

            $scope.numColumns = record.length;
        };
     






        

        $scope.Download = function () {

            var location = window.location.origin
            //console.log(location + '/Results/C18/C16C18SamapleFormate.xlsx');
            //window.location.replace('/Results/C18/C16C18SamapleFormate.xlsx');
            window.location.href = location + '/Results/Exam_Centers_Sample.xlsx';



        }
        $scope.removeColumn = function () {
            var i, record;
            for (i = 0; i < $scope.records.length; i++) {
                record = $scope.records[i];
                record.splice($scope.contextmenuColumnIndex, 1);
            }

            $scope.numColumns = record.length;
        };

        $document.bind('click', function ($evt) {
            var target = angular.element($evt.target).closest('table');
            if (target.length === 0)
                hideContextMenu();

        });




        //---- progress --------------

        var circles = $('.progress .circle');
        var currentCircle = circles.first();
        var previousCircle = $();

        (function () {
            currentCircle.addClass('active');
            previousCircle.removeClass('active').addClass('done');

            var bar = currentCircle.prev();
            bar.addClass('done');

            previousCircle = currentCircle;
            currentCircle = currentCircle.nextAll('.circle:first');

            if (previousCircle.length) {
                setTimeout(arguments.callee, 1000);
            }
        })();


    });
    app.directive('ngRightClick', function ($parse) {
        return function (scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function (event) {
                scope.$apply(function () {
                    event.preventDefault();
                    fn(scope, {
                        $event: event
                    });
                });
            });
        };

        $scope.validate = function () {
            $scope.getTable = true;
        }

    });


    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });

});

