define(['app'], function (app) {
    app.service("PreExaminationService", function (DataAccessService) {

        this.RequestLog = function (marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, challan, amount, schemeId, json) {
            var paramObject = { "marchantid": marchantid, "subMarchantid": subMarchantid, "addInfo1": addInfo1, "addInfo3": addInfo3, "addInfo4": addInfo4, "addInfo5": addInfo5, "addInfo6": addInfo6, "addInfo7": addInfo7, "challan": challan, "amount": amount, "schemeId": schemeId, "json": json };

            return DataAccessService.postData('api/PreExamination/RequestLog', paramObject);
        },

        this.getSomeValue = function (url, ChallanNumber) {
        var paramObject = { "url": url, "ChallanNumber": ChallanNumber };
            console.log(paramObject)
        return DataAccessService.postData('api/BillDesk/getSomeValue', paramObject);
        }

        this.getSSCDetails = function (object) {
            var promise = DataAccessService.postData('api/PreExamination/GetSSCDetails', object);
            return promise;
        };

        this.getSSCImageDetails = function (object) {
            var promise = DataAccessService.postData('api/PreExamination/GetSSCImageDetails', object);
            return promise;
        };



        this.getSSCNewDetails = function (object) {
            var promise = DataAccessService.postData('api/PreExamination/GetSSCNewDetails', object);
            return promise;
        };

        this.getSSCNewImageDetails = function (object) {
            var promise = DataAccessService.postData('api/PreExamination/GetSSCNewImageDetails', object);
            return promise;
        };


        this.TempGetSSCDetails = function (TENTH_HT_NO, TENTH_YEAR, STREAMS) {
            var paramObject = { "TENTH_HT_NO": TENTH_HT_NO, "TENTH_YEAR": TENTH_YEAR, "STREAMS": STREAMS };
            return DataAccessService.postData('api/PreExamination/TempGetSSCDetails', paramObject);
        };


        this.GetPhotoAttendance = function (ExaminationCentreID,CentreCode,UserName,SessionId,Captcha) {
            var paramObj = {
                "ExaminationCentreID": ExaminationCentreID, "CentreCode": CentreCode, "UserName": UserName, "SessionId": SessionId, "Captcha": Captcha
            };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetPhotoAttendance', paramObj);
            return promise;
        }

        this.GetQPReportPdf = function (DataType, UserName, CoordinatingCentreCode) {
            var paramObj = {
                "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode
            };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetQPReportPdf', paramObj);
            return promise;
        }

        this.GetAttendanceList = function (ExaminationCentreID,UserName) {
            var paramObj = {
                "ExaminationCentreID": ExaminationCentreID, "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/PreExamination/GetAttendanceList', paramObj);
            return promise;
        };


        this.SetAttendanceList = function (Json, ExaminationCentreID, UserName) {
            var paramObject = {
                "Json": Json, "ExaminationCentreID": ExaminationCentreID, "UserName": UserName
            };
            return DataAccessService.postData('api/PreExamination/SetAttendanceList', paramObject);
        };

        this.GetAttendanceStatus = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetAttendanceStatus');
        };

        

        this.GetCaptchaString10 = function () {
            return DataAccessService.getDataAll('api/PreExamination/GetCaptchaString10');
        };

        this.OpenAttendanceReport = function (ExaminationCentreID) {
            var param = { "ExaminationCentreID": ExaminationCentreID }
            console.log(param)
            return DataAccessService.postData('api/PreExamination/OpenAttendanceReport', param);
        };

        this.SetSubmitAttendanceList = function (Json, ExaminationCentreID, UserName) {
            var paramObject = {
                "Json": Json, "ExaminationCentreID": ExaminationCentreID, "UserName": UserName
            };
            return DataAccessService.postData('api/PreExamination/SetSubmitAttendanceList', paramObject);
        };

        this.MarkAttendanceReport = function (ExaminationCentreID) {
            var paramObject = { "ExaminationCentreID": ExaminationCentreID };
            return DataAccessService.getDataWithPara('api/PreExamination/MarkAttendanceReport', paramObject);
        };

    });
});