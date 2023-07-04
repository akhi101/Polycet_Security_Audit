define(['app'], function (app) {
    app.service("AdminService", function (DataAccessService) {
        this.GetCurrentPolycetYear = function () {
            return DataAccessService.getDataAll('api/AdminService/GetCurrentPolycetYear');
        };

        this.GetStates = function () {
            return DataAccessService.getDataAll('api/AdminService/GetStates');
        };

        this.GetExamCentreCategories = function () {
            return DataAccessService.getDataAll('api/AdminService/GetExamCentreCategories');
        };

        this.GetWebSiteVisiterCount = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetWebSiteVisiterCount');
            return promise;
        }

        this.GetExamCentreType = function () {
            return DataAccessService.getDataAll('api/AdminService/GetExamCentreType');
        };

        //this.VerifyRegistrationDates = function () {
        //    return DataAccessService.getDataAll('api/AdminService/VerifyRegistrationDates');
        //};

        //this.VerifyExamCentresRegistrationDates = function () {
        //    return DataAccessService.getDataAll('api/AdminService/VerifyExamCentresRegistrationDates');
        //};

        //this.VerifyNRDownloadDates = function () {
        //    return DataAccessService.getDataAll('api/AdminService/VerifyNRDownloadDates');
        //};
        this.VerifyRegistrationDates = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/VerifyDates', paramObject);
        };

        this.VerifyExaminationDates = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/VerifyDates', paramObject);
        };

        this.VerifyExaminationCentresDates = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/VerifyDates', paramObject);
        };

        this.VerifyNRDownloadDates = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/VerifyDates', paramObject);
        };

        this.VerifyOMRDates = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };            return DataAccessService.getDataWithPara('api/AdminService/VerifyDates', paramObject);
        };

        this.VerifyResultsDates = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/VerifyDates', paramObject);
        };

        this.VerifyHtDates = function (DataType,UserName,SessionId,Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/VerifyDates', paramObject);
        };

        this.GetCaptchaString10 = function () {
            return DataAccessService.getDataAll('api/AdminService/GetCaptchaString10');
        };

        //this.GetStatisticsCount = function () {
        //    return DataAccessService.getDataAll('api/AdminService/GetStatisticsCount');
        //};


        this.GetStatisticsCount = function (SessionId, UserName, Captcha) {
            var paramObj = {
                "SessionId": SessionId, "UserName": UserName, "Captcha": Captcha
            };
            var promise = DataAccessService.postData('api/AdminService/GetStatisticsCount', paramObj);
            return promise;
        };

        //this.GetRecentNews = function () {
        //    return DataAccessService.getDataAll('api/AdminService/GetRecentNews');
        //};

        this.GetDashboardStatus = function (RegistrationID) {
            var paramObject = { "RegistrationID": RegistrationID };
            return DataAccessService.getDataWithPara('api/AdminService/GetDashboardStatus', paramObject);
        };
        this.GetStudentFeeData = function (RegistrationID, UserName, SessionId ,Captcha) {
            var paramObject = {
                "RegistrationID": RegistrationID,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
};
            return DataAccessService.getDataWithPara('api/AdminService/GetStudentFeeData', paramObject);
        };

        this.GetStudentApplicationData = function (RegistrationID) {
            var paramObject = { "RegistrationID": RegistrationID };
            return DataAccessService.getDataWithPara('api/AdminService/GetStudentApplicationData', paramObject);
        };
        this.GetAllRecentNews = function (DataType) {
            var paramObject = { "DataType": DataType };
            return DataAccessService.getDataWithPara('api/AdminService/GetAllRecentNews', paramObject);
        };

        this.GetActiveRecentNews = function (DataType) {
            var paramObject = { "DataType": DataType };
            return DataAccessService.getDataWithPara('api/AdminService/GetActiveRecentNews', paramObject);
        };

        this.GetHallticketByRegistrationId = function (RegistrationID, RegistrationNumber, DataType) {
            var paramObject = { "RegistrationID": RegistrationID, "RegistrationNumber": RegistrationNumber, "DataType": DataType };
            return DataAccessService.getDataWithPara('api/AdminService/GetHallticketByRegistrationId', paramObject);
        };

        this.GetHallticket = function (DataType, UserName) {
            var paramObject = { "DataType": DataType, "UserName": UserName };
            return DataAccessService.getDataWithPara('api/AdminService/GetHallticket', paramObject);
        };

        this.AddRegistrationDates = function (DataType, PolycetYearID, RegistrationDatesID, StartDate, EndDateWithoutLateFee, EndDateWithLateFee, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "RegistrationDatesID": RegistrationDatesID,
                "StartDate": StartDate,
                "EndDateWithoutLateFee": EndDateWithoutLateFee,
                "EndDateWithLateFee": EndDateWithLateFee,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateRegistrationDates', paramObj);
            return promise;
        }

        this.GetRegistrationDates = function (DataType, PolycetYearID, RegistrationDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "RegistrationDatesID": RegistrationDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetRegistrationDates', paramObject);
        };

        this.EditRegistrationDates = function (DataType, PolycetYearID, RegistrationDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "RegistrationDatesID": RegistrationDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetRegistrationDates', paramObject);
        };


        this.ViewRegistrationDates = function (DataType, PolycetYearID, RegistrationDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "RegistrationDatesID": RegistrationDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetRegistrationDates', paramObject);
        };



        this.UpdateRegistrationDates = function (DataType, PolycetYearID, RegistrationDatesID, StartDate, EndDateWithoutLateFee, EndDateWithLateFee, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "RegistrationDatesID": RegistrationDatesID,
                "StartDate": StartDate,
                "EndDateWithoutLateFee": EndDateWithoutLateFee,
                "EndDateWithLateFee": EndDateWithLateFee,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateRegistrationDates', paramObj);
            return promise;
        }


        this.AddExamCentresDates = function (DataType, PolycetYearID, ExamCentresRegistrationDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "ExamCentresRegistrationDatesID": ExamCentresRegistrationDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateExamCentresDates', paramObj);
            return promise;
        }

        this.GetExamCentresDates = function (DataType, PolycetYearID, ExamCentresRegistrationDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ExamCentresRegistrationDatesID": ExamCentresRegistrationDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetExamCentresDates', paramObject);
        };

        this.EditExamCentresDates = function (DataType, PolycetYearID, ExamCentresRegistrationDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ExamCentresRegistrationDatesID": ExamCentresRegistrationDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetExamCentresDates', paramObject);
        };


        this.ViewExamCentresDates = function (DataType, PolycetYearID, ExamCentresRegistrationDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ExamCentresRegistrationDatesID": ExamCentresRegistrationDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetExamCentresDates', paramObject);
        };



        this.UpdateExamCentresRegistrationDates = function (DataType, PolycetYearID, ExamCentresRegistrationDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "ExamCentresRegistrationDatesID": ExamCentresRegistrationDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateExamCentresDates', paramObj);
            return promise;
        }

        this.AddViewOMRDates = function (DataType, PolycetYearID, ViewOMRDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "ViewOMRDatesID": ViewOMRDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateViewOMRDates', paramObj);
            return promise;
        }

        this.GetViewOMRDates = function (DataType, PolycetYearID, ViewOMRDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ViewOMRDatesID": ViewOMRDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetViewOMRDates', paramObject);
        };

        this.EditOMRDates = function (DataType, PolycetYearID, ViewOMRDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ViewOMRDatesID": ViewOMRDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetViewOMRDates', paramObject);
        };


        this.ViewOMRDate = function (DataType, PolycetYearID, ViewOMRDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ViewOMRDatesID": ViewOMRDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetViewOMRDates', paramObject);
        };



        this.UpdateViewOMRDates = function (DataType, PolycetYearID, ViewOMRDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "ViewOMRDatesID": ViewOMRDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateViewOMRDates', paramObj);
            return promise;
        }


        this.AddResultsDates = function (DataType, PolycetYearID, ResultsDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "ResultsDatesID": ResultsDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateResultsDates', paramObj);
            return promise;
        }

        this.GetResultsDates = function (DataType, PolycetYearID, ResultsDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ResultsDatesID": ResultsDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetResultsDates', paramObject);
        };

        this.EditResultsDates = function (DataType, PolycetYearID, ResultsDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ResultsDatesID": ResultsDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetResultsDates', paramObject);
        };


        this.ViewResultsDates = function (DataType, PolycetYearID, ResultsDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ResultsDatesID": ResultsDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetResultsDates', paramObject);
        };



        this.UpdateResultsDates = function (DataType, PolycetYearID, ResultsDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "ResultsDatesID": ResultsDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateResultsDates', paramObj);
            return promise;
        }

        this.AddNRDownloadDates = function (DataType, PolycetYearID, NRDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "NRDatesID": NRDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateNRDownloadDates', paramObj);
            return promise;
        }

        this.GetNRDownloadDates = function (DataType, PolycetYearID, NRDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "NRDatesID": NRDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetNRDownloadDates', paramObject);
        };

        this.EditNRDates = function (DataType, PolycetYearID, NRDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "NRDatesID": NRDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetNRDownloadDates', paramObject);
        };


        this.ViewNRDates = function (DataType, PolycetYearID, NRDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "NRDatesID": NRDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetNRDownloadDates', paramObject);
        };



        this.UpdateNRDownloadDates = function (DataType, PolycetYearID, NRDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "NRDatesID": NRDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateNRDownloadDates', paramObj);
            return promise;
        }

        this.AddExaminationDates = function (DataType, PolycetYearID, ExaminationDateID, ExaminationDate, ExaminationDay, StartHH,
            StartMM, StartAMPM, EndHH, EndMM, EndAMPM, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "ExaminationDateID": ExaminationDateID,
                "ExaminationDate": ExaminationDate,
                "ExaminationDay": ExaminationDay,
                "StartHH": StartHH,
                "StartMM": StartMM,
                "StartAMPM": StartAMPM,
                "EndHH": EndHH,
                "EndMM": EndMM,
                "EndAMPM": EndAMPM,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateExaminationDates', paramObj);
            return promise;
        }

        this.GetExaminationDates = function (DataType, PolycetYearID, ExaminationDateID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ExaminationDateID": ExaminationDateID };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationDates', paramObject);
        };

        this.EditExaminationDates = function (DataType, PolycetYearID, ExaminationDateID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ExaminationDateID": ExaminationDateID };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationDates', paramObject);
        };


        this.ViewExaminationDates = function (DataType, PolycetYearID, ExaminationDateID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "ExaminationDateID": ExaminationDateID };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationDates', paramObject);
        };



        this.UpdateExaminationDates = function (DataType, PolycetYearID, ExaminationDateID, ExaminationDate, ExaminationDay, StartHH,
            StartMM, StartAMPM, EndHH, EndMM, EndAMPM, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "ExaminationDateID": ExaminationDateID,
                "ExaminationDate": ExaminationDate,
                "ExaminationDay": ExaminationDay,
                "StartHH": StartHH,
                "StartMM": StartMM,
                "StartAMPM": StartAMPM,
                "EndHH": EndHH,
                "EndMM": EndMM,
                "EndAMPM": EndAMPM,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateExaminationDates', paramObj);
            return promise;
        }

        this.AddHtDates = function (DataType, PolycetYearID, HtDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "HtDatesID": HtDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateHtDates', paramObj);
            return promise;
        }

        this.GetHtDates = function (DataType, PolycetYearID, HtDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "HtDatesID": HtDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetHtDates', paramObject);
        };

        this.EditHtDates = function (DataType, PolycetYearID, HtDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "HtDatesID": HtDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetHtDates', paramObject);
        };


        this.ViewHtDates = function (DataType, PolycetYearID, HtDatesID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "HtDatesID": HtDatesID };
            return DataAccessService.getDataWithPara('api/AdminService/GetHtDates', paramObject);
        };



        this.UpdateHtDates = function (DataType, PolycetYearID, HtDatesID, StartDate, EndDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "PolycetYearID": PolycetYearID,
                "HtDatesID": HtDatesID,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateHtDates', paramObj);
            return promise;
        }

        this.AddRecentNews = function (DataType, RecentNewsID, RecentNewsText, FromDate, ToDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "RecentNewsID": RecentNewsID,
                "RecentNewsText": RecentNewsText,
                "FromDate": FromDate,
                "ToDate": ToDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateRecentNews', paramObj);
            return promise;
        }

        this.UpdateRecentNews = function (DataType, RecentNewsID, RecentNewsText, FromDate, ToDate, Active, UserName) {
            var paramObj = {
                "DataType": DataType,
                "RecentNewsID": RecentNewsID,
                "RecentNewsText": RecentNewsText,
                "FromDate": FromDate,
                "ToDate": ToDate,
                "Active": Active,
                "UserName": UserName
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/AddorUpdateRecentNews', paramObj);
            return promise;
        }

        this.GetEditRecentNews = function (DataType, RecentNewsID) {
            var paramObject = { "DataType": DataType, "RecentNewsID": RecentNewsID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditorViewRecentNews', paramObject);
        };

        this.GetViewRecentNews = function (DataType, RecentNewsID) {
            var paramObject = { "DataType": DataType, "RecentNewsID": RecentNewsID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditorViewRecentNews', paramObject);
        };

        //this.UpdateRecentNews = function (paramObject) {

        //    return DataAccessService.postData('api/AdminService/AddUpdateRecentNews', paramObject);
        //};

        //this.GetUserTypes = function () {
        //    var promise = DataAccessService.getDataWithPara('api/AdminService/GetUserTypes');
        //    return promise;
        //}



        this.GetCaptchaString = function (SessionId) {
            var paramObject = { "SessionId": SessionId };
            return DataAccessService.getDataWithPara('api/AdminService/GetCaptchaString', paramObject);
        };


        this.ValidateCaptcha = function (SessionId, Captcha) {
            var paramObject = { "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.postData('api/AdminService/ValidateCaptcha', paramObject);
        };




        //this.GetDistricts = function (DataType, StateID) {
        //    var paramObject = { "DataType": DataType, "StateID": StateID };
        //    return DataAccessService.getDataWithPara('api/AdminService/GetDistricts', paramObject);
        //};

        this.GetDistricts = function () {
            return DataAccessService.postData('api/AdminService/GetDistricts');
        };

        this.GetEditDistricts = function (CoordinatingCentreID) {
            var paramObject = { "CoordinatingCentreID": CoordinatingCentreID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditDistricts', paramObject);
        };

        this.GetEditExaminationDistricts = function (ExaminationCentreID) {
            var paramObject = { "ExaminationCentreID": ExaminationCentreID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditExaminationDistricts', paramObject);
        };


        this.GetEditMandals = function (DistrictID, CoordinatingCentreID) {
            var paramObject = { "DistrictID": DistrictID, "CoordinatingCentreID": CoordinatingCentreID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditMandals', paramObject);
        };

        this.GetEditExamCentreMandals = function (DistrictID, ExaminationCentreID) {
            var paramObject = { "DistrictID": DistrictID, "ExaminationCentreID": ExaminationCentreID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditExamCentreMandals', paramObject);
        };

        this.GetExaminationDistricts = function (UserName) {
            var paramObject = { "UserName": UserName };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationDistricts', paramObject);
        };

        this.GetCentreMandals = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.postData('api/AdminService/GetCentreMandals', paramObject);
        };

        this.GetExamCentreMandals = function (DistrictID, UserName) {
            var paramObj = {
                "DistrictID": DistrictID, "UserName": UserName
            };
            var promise = DataAccessService.postData('api/AdminService/GetExamCentreMandals', paramObj);
            return promise;
        };

        this.GetCoordinatingCentreMandals = function (DistrictID) {
            var paramObj = {
                "DistrictID": DistrictID
            };
            var promise = DataAccessService.postData('api/AdminService/GetCoordinatingCentreMandals', paramObj);
            return promise;
        };

        this.GetCoordinatingAddressDistricts = function (DistrictID) {
            var paramObj = {
                "DistrictID": DistrictID
            };
            var promise = DataAccessService.postData('api/AdminService/GetCoordinatingAddressDistricts', paramObj);
            return promise;
        };

        this.GetCoordinatingAddressMandals = function (DistrictID, MandalID) {
            var paramObj = {
                "DistrictID": DistrictID, "MandalID": MandalID
            };
            var promise = DataAccessService.postData('api/AdminService/GetCoordinatingAddressMandals', paramObj);
            return promise;
        };

        this.GetCoordinatingCentres = function (DistrictID) {
            var paramObj = {
                "DistrictID": DistrictID
            };
            var promise = DataAccessService.postData('api/AdminService/GetCoordinatingCentres', paramObj);
            return promise;
        };

        this.GetEditCoordinatingCentreDetails = function (CoordinatingCentreID) {
            var paramObj = {
                "CoordinatingCentreID": CoordinatingCentreID
            };
            var promise = DataAccessService.postData('api/AdminService/GetEditCoordinatingCentreDetails', paramObj);
            return promise;
        };

        this.GetExaminationCentres = function (DataType, UserName, CoordinatingCentreCode, SessionId, Captcha) {
            var paramObj = {
                "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode, "SessionId": SessionId, "Captcha": Captcha
            };
            var promise = DataAccessService.postData('api/AdminService/GetExaminationCentres', paramObj);
            return promise;
        };

        this.GetExaminationCentresNRDownload = function (DataType, UserName, CoordinatingCentreCode, SessionId, Captcha) {
            var paramObj = {
                "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode, "SessionId": SessionId, "Captcha": Captcha
            };
            var promise = DataAccessService.postData('api/AdminService/GetExaminationCentres', paramObj);
            return promise;
        };

        this.GetExaminationCentresNRExcel = function (DataType, UserName, CoordinatingCentreCode) {
            var paramObj = {
                "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode
            };
            var promise = DataAccessService.postData('api/AdminService/GetExaminationCentres', paramObj);
            return promise;
        };

        this.GetEditExaminationCentreDetails = function (ExaminationCentreID) {
            var paramObj = {
                "ExaminationCentreID": ExaminationCentreID
            };
            var promise = DataAccessService.postData('api/AdminService/GetEditExaminationCentreDetails', paramObj);
            return promise;
        };

        this.GetCoordinatingCenters = function (DataType) {
            var paramObject = { "DataType": DataType };
            return DataAccessService.postData('api/AdminService/GetCoordinatingCenters', paramObject);
        };

        this.GetExaminationCentresReport = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.postData('api/AdminService/GetCoordinatingCenters', paramObject);
        };


        this.GetMobileAppReport = function (DataType, UserName, CoordinatingCentreCode, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.postData('api/AdminService/GetExaminationCentres', paramObject);
        };

        this.GetMobileAppReportExcel = function (DataType, UserName, CoordinatingCentreCode, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationCentresExcel', paramObject);
        };

        this.GetStuAllotedRepExamCentreWise = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.getDataWithPara('api/AdminService/GetCoordinatingCentresExcel', paramObject);
        };

        this.GetExaminationCentresNRReport = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.postData('api/AdminService/GetNrData', paramObject);
        };

        this.GetDCExaminationCentresReport = function (DataType, UserName, CoordinatingCentreCode, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, CoordinatingCentreCode, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.postData('api/AdminService/GetExaminationCentres', paramObject);
        };

        this.GetDCExamCentresAllotedExcel = function (DataType, UserName, CoordinatingCentreCode, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationCentresExcel', paramObject);
        };

        this.GetExaminationCentresExcel = function (DataType, UserName, CoordinatingCentreCode) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationCentresExcel', paramObject);
        };

        this.GetExaminationCentresAllocationExcel = function (DataType, UserName, CoordinatingCentreCode, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationCentresExcel', paramObject);
        };



        this.GetQPReportExcel = function (DataType, UserName, CoordinatingCentreCode, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType, "UserName": UserName, "CoordinatingCentreCode": CoordinatingCentreCode, "SessionId": SessionId, "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/GetExaminationCentresExcel', paramObject);
        };

        this.GetCoordinatingCentresExcel = function (DataType) {
            var paramObject = { "DataType": DataType };
            return DataAccessService.getDataWithPara('api/AdminService/GetCoordinatingCentresExcel', paramObject);
        };
        //this.GetCoordinatingCenters = function () {
        //    return DataAccessService.postData('api/AdminService/GetCoordinatingCenters');
        //};

        this.AddCoordinatingCentreUser = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddCoordinatingCentreUser', paramObject);
        };

        //this.GetDistrictCoordinators = function (DistrictID) {
        //    var paramObject = { "DistrictID": DistrictID };
        //    return DataAccessService.postData('api/AdminService/GetDistrictCoordinators', paramObject);
        //};

        this.AddDistCoordinatingCentre = function (CentreCode, CentreName, CentreAddress, StateID, DistrictID, UserName) {
            var paramObject = {
                "CentreCode": CentreCode,
                "CentreName": CentreName,
                "CentreAddress": CentreAddress,
                "StateID": StateID,
                "DistrictID": DistrictID,
                //"Active": Active,
                "UserName": UserName
            };
            return DataAccessService.getDataWithPara('api/AdminService/AddDistCoordinatingCentre', paramObject);
        };

        this.GetEditDetails = function (CentreID) {
            var paramObject = { "CentreID": CentreID };
            return DataAccessService.getDataWithPara('api/AdminService/GetEditDetails', paramObject);
        };

        //this.UpdateDistCoorCentres = function (CentreID, CentreCode, CentreName, CentreAddress, StateID, DistrictID, Active, UserName) {
        //    var paramObject = {
        //        "CentreID": CentreID, "CentreCode": CentreCode,
        //        "CentreName": CentreName, "CentreAddress": CentreAddress,
        //        "StateID": StateID, "DistrictID": DistrictID,
        //        "Active": Active, "UserName": UserName
        //    };
        //    return DataAccessService.postData('api/AdminService/UpdateDistCoorCentres', paramObject);
        //};

        this.UpdateDistCoorCentres = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateDistCoorCentres', paramObject);
        };

        this.AddCoordinatingCentres = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddCoordinatingCentres', paramObject);
        };

        this.UpdateCoordinatingCentres = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateorDeleteCoordinatingCentres', paramObject);
        };

        this.DeleteCoordinatingCentres = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateorDeleteCoordinatingCentres', paramObject);
        };

        this.AddExaminationCentres = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddExaminationCentres', paramObject);
        };

        this.UpdateExaminationCentres = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateorDeleteExaminationCentres', paramObject);
        };

        this.DeleteExaminationCentres = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateorDeleteExaminationCentres', paramObject);
        };


        this.getNotification = function (DataType, NotificationID) {
            var paramObject = {
                "DataType": DataType,
                "NotificationID": NotificationID
            };

            var promise = DataAccessService.postData('api/AdminService/GetorEditNotifications', paramObject);
            return promise;
        }

        this.editNotification = function (DataType, NotificationID) {
            var paramObject = {
                "DataType": DataType,
                "NotificationID": NotificationID
            };

            var promise = DataAccessService.postData('api/AdminService/GetorEditNotifications', paramObject);
            return promise;
        }


        this.AddNotification = function (DataType, NotificationID, ExcelData, NotificationFileName, NotificationText, NotificationDate, Active, UserName) {
            var paramObject = {
                "DataType": DataType,
                "NotificationID": NotificationID,
                "NotificationText": NotificationText,
                "NotificationFilePath": ExcelData,
                "NotificationFileName": NotificationFileName,
                "NotificationDate": NotificationDate,
                "Active": Active,
                "UserName": UserName
            };

            var promise = DataAccessService.postData('api/PreExamination/AddorUpdateNotification', paramObject);
            return promise;
        }

        this.EditNotification = function (DataType, NotificationID) {
            var paramObject = { "DataType": DataType, "NotificationID": NotificationID };
            return DataAccessService.getDataWithPara('api/PreExamination/GetorEditNotification', paramObject);
        };

        this.UpdateNotification = function (DataType, NotificationID, ExcelData, NotificationFileName, NotificationText, NotificationDate, Active, UserName) {
            var paramObject = {
                "DataType": DataType,
                "NotificationID": NotificationID,
                "NotificationText": NotificationText,
                "NotificationFilePath": ExcelData,
                "NotificationFileName": NotificationFileName,
                "NotificationDate": NotificationDate,
                "Active": Active,
                "UserName": UserName
            };

            var promise = DataAccessService.postData('api/PreExamination/AddorUpdateNotification', paramObject);
            return promise;
        }




        this.AddPolycetYear = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddorUpdatePolycetYear', paramObject);
        };



        this.GetPolycetYears = function (DataType, PolycetYearID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID };
            return DataAccessService.getDataWithPara('api/AdminService/GetPolycetYears', paramObject);
        };

        this.EditPolycetYear = function (DataType, PolycetYearID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID };
            return DataAccessService.getDataWithPara('api/AdminService/GetPolycetYears', paramObject);
        };

        this.ViewPolycetYear = function (DataType, PolycetYearID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID };
            return DataAccessService.getDataWithPara('api/AdminService/GetPolycetYears', paramObject);
        };

        this.UpdatePolycetYear = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddorUpdatePolycetYear', paramObject);
        };

        this.GetCasteDetails = function (applicationNo, userid) {
            var paramObject = { "applicationNo": applicationNo, "userid": userid };
            console.log(paramObject)
            return DataAccessService.postData('api/AdminService/GetCasteDetails', paramObject);
        };


        this.AddFeeAmounts = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddorUpdateFeeAmounts', paramObject);
        };

        this.GetFeeAmounts = function (DataType, PolycetYearID, FeeAmountID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "FeeAmountID": FeeAmountID };
            return DataAccessService.getDataWithPara('api/AdminService/GetFeeAmounts', paramObject);
        };


        this.EditFeeAmounts = function (DataType, PolycetYearID, FeeAmountID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "FeeAmountID": FeeAmountID };
            return DataAccessService.getDataWithPara('api/AdminService/GetFeeAmounts', paramObject);
        };

        this.ViewFeeAmounts = function (DataType, PolycetYearID, FeeAmountID) {
            var paramObject = { "DataType": DataType, "PolycetYearID": PolycetYearID, "FeeAmountID": FeeAmountID };
            return DataAccessService.getDataWithPara('api/AdminService/GetFeeAmounts', paramObject);
        };

        this.UpdateFeeAmounts = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddorUpdateFeeAmounts', paramObject);
        };



        this.AddUserTypes = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddorUpdateUserTypes', paramObject);
        };

        //this.GetUserTypes = function () {
        //    return DataAccessService.getDataAll('api/AdminService/GetUserTypes');
        //};
        this.GetUserTypes = function (DataType) {
            var paramObj = {
                "DataType": DataType
            };
            var promise = DataAccessService.postData('api/AdminService/GetorActiveUserTypes', paramObj);
            return promise;
        };

        this.GetActiveUserTypes = function (DataType) {
            var paramObj = {
                "DataType": DataType
            };
            var promise = DataAccessService.postData('api/AdminService/GetorActiveUserTypes', paramObj);
            return promise;
        };

        this.EditUserTypes = function (UserTypeID) {
            var paramObj = {
                "UserTypeID": UserTypeID
            };
            var promise = DataAccessService.postData('api/AdminService/EditorViewUserTypes', paramObj);
            return promise;
        };

        this.ViewUserTypes = function (UserTypeID) {
            var paramObj = {
                "UserTypeID": UserTypeID
            };
            var promise = DataAccessService.postData('api/AdminService/EditorViewUserTypes', paramObj);
            return promise;
        };



        this.UpdateUserTypes = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddorUpdateUserTypes', paramObject);
        };

        this.GetUsers = function (UserTypeID) {
            var paramObject = { "UserTypeID": UserTypeID };
            return DataAccessService.postData('api/AdminService/GetUsers', paramObject);
        };

        this.EditUsers = function (UserID) {
            var paramObject = { "UserID": UserID };
            return DataAccessService.postData('api/AdminService/GetEditorViewUsers', paramObject);
        };

        this.ViewUsers = function (UserID) {
            var paramObject = { "UserID": UserID };
            return DataAccessService.postData('api/AdminService/GetEditorViewUsers', paramObject);
        };
        this.AddUser = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddUser', paramObject);
        };

        this.EditUser = function (DataType, UserTypeID, UserID) {
            var paramObject = { "DataType": DataType, "UserTypeID": UserTypeID, "UserID": UserID };
            return DataAccessService.postData('api/AdminService/GetorEditorViewUsers', paramObject);
        };

        this.ViewUser = function (DataType, UserTypeID, UserID) {
            var paramObject = { "DataType": DataType, "UserTypeID": UserTypeID, "UserID": UserID };
            return DataAccessService.postData('api/AdminService/GetorEditorViewUsers', paramObject);
        };

        this.UpdateUser = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateUserDetails', paramObject);
        };

        this.GetQualifiedExams = function () {
            return DataAccessService.postData('api/AdminService/GetQualifiedExams');
        };

        this.GetTenthYears = function () {
            return DataAccessService.postData('api/AdminService/GetTenthYears');
        };

        this.GetDistrictsbyState = function (DataType, StateID) {
            var paramObject = { "DataType": DataType, "StateID": StateID };
            return DataAccessService.getDataWithPara('api/AdminService/GetDistrictsbyState', paramObject);
        };

        this.GetMandalsbyDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.getDataWithPara('api/AdminService/GetMandalsbyDistrict', paramObject);
        };

        this.GetPreference1Mandals = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.getDataWithPara('api/AdminService/GetPreference1Mandals', paramObject);
        };

        this.GetPreference2Mandals = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.getDataWithPara('api/AdminService/GetPreference2Mandals', paramObject);
        };

        this.GetPreference3Mandals = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            return DataAccessService.getDataWithPara('api/AdminService/GetPreference3Mandals', paramObject);
        };

        this.GetTelanganaDistricts = function (DataType, StateID) {
            var paramObject = { "DataType": DataType, "StateID": StateID };
            return DataAccessService.getDataWithPara('api/AdminService/GetDistrictsbyState', paramObject);
        };

        this.GetPreference1Districts = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetPreference1Districts');
            return promise;
        }


        this.GetPreference2Districts = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetPreference2Districts');
            return promise;
        }

        this.GetPreference3Districts = function () {
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetPreference3Districts');
            return promise;
        }



        this.AddStudentDetails = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddStudentDetails', paramObject);
        };

        this.GetStudentDetails = function (RegistrationID) {
            var paramObj = {
                "RegistrationID": RegistrationID
            };
            var promise = DataAccessService.postData('api/AdminService/GetStudentDetails', paramObj);
            return promise;
        };

        this.SetApplicationSubmit = function (RegistrationID) {
            var paramObj = {
                "RegistrationID": RegistrationID
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/SetApplicationSubmit', paramObj);
            return promise;
        };

        this.AddStudentPersonalDetails = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddStudentPersonalDetails', paramObject);
        };

        this.AddStudentCommunicationDetails = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddStudentCommunicationDetails', paramObject);
        };

        this.AddStudentCategoryDetails = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddStudentCategoryDetails', paramObject);
        };

        this.UpdateFeeCasteDetails = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateFeeCasteDetails', paramObject);
        };

        this.AddStudentSpecialCategoryDetails = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddStudentSpecialCategoryDetails', paramObject);
        };

        this.AddStudentStudyDetails = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddStudentStudyDetails', paramObject);
        };

        this.AddStudentPhotoSignatureDetails = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddStudentPhotoSignatureDetails', paramObject);
        };

        this.GetFeePaymentReportsExcel = function (FromDate, ToDate) {
            var paramObject = { "FromDate": FromDate, "ToDate": ToDate };
            return DataAccessService.getDataWithPara('api/AdminService/GetFeePaymentReportsExcel', paramObject);
        };

        this.GetPolycetEWSVerification = function (applicationNo, userid) {
            var paramObject = { "applicationNo": applicationNo, "userid": userid };
            console.log(paramObject)
            return DataAccessService.postData('api/AdminService/GetPolycetEWSVerification', paramObject);
        };

        this.AddStudentPreferences = function (paramObj) {

            return DataAccessService.postData('api/AdminService/AddStudentPreferences', paramObj);
        };


        this.EditDCExamCentreAllocation = function (ExaminationCentreID, UserName, SessionId, Captcha) {
            var paramObj = {
                "ExaminationCentreID": ExaminationCentreID,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            var promise = DataAccessService.postData('api/AdminService/EditDCExamCentreAllocation', paramObj);
            return promise;
        };

        this.UpdateDCExamCentreAllocation = function (paramObject) {

            return DataAccessService.postData('api/AdminService/UpdateDCExamCentreAllocation', paramObject);
        };

        this.GetViewstdDetails = function (UserName, DataType) {
            var paramObj = {
                "UserName": UserName, "DataType": DataType
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetViewstdDetails', paramObj);
            return promise;
        };

        this.SetStdHtLog = function (paramObject) {

            return DataAccessService.postData('api/AdminService/SetStdHtLog', paramObject);
        };

        this.GetStudentStatisticsExcel = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = { "DataType": DataType, "UserName": UserName, "SessionId": SessionId, "Captcha": Captcha };
            return DataAccessService.getDataWithPara('api/AdminService/GetStudentStatisticsExcel', paramObject);
        };

        this.GetStudentTransferData = function (HallticketNumber) {
            var paramObject = { "HallticketNumber": HallticketNumber };
            return DataAccessService.getDataWithPara('api/AdminService/GetStudentTransferData', paramObject);
        };



        this.SetStudentCentreTransfer = function (paramObject) {

            return DataAccessService.postData('api/AdminService/SetStudentCentreTransfer', paramObject);
        };

        this.GetPaymentDetails = function (DataType, RegistrationMobileNumber, ChallanNumber, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "RegistrationMobileNumber": RegistrationMobileNumber,
                "ChallanNumber": ChallanNumber,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/GetPaymentDetails', paramObject);
        };

        this.GetPaymentDetailsExcel = function (DataType, RegistrationMobileNumber, ChallanNumber,UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "RegistrationMobileNumber": RegistrationMobileNumber,
                "ChallanNumber": ChallanNumber,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/GetPaymentDetailsExcel', paramObject);
        };

        this.GetPrinterNRData = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/AdminService/GetPrinterNRData', paramObject);
        };

        this.GetPrinterNRExcel = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
   
        return DataAccessService.getDataWithPara('api/AdminService/GetPrinterNRExcel', paramObject);
    };


        this.GetAttendanceStatistics = function (DataType, UserName, SessionId, Captcha) {
            var paramObject = {
                "DataType": DataType,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
};
            return DataAccessService.getDataWithPara('api/AdminService/GetAttendanceStatistics', paramObject);
        };

        this.GetPaymentReciept = function (ChallanNumber) {
            var paramObject = { "ChallanNumber": ChallanNumber };
            return DataAccessService.postData('api/AdminService/GetPaymentReciept', paramObject);
        };

        this.GetPaymentReciept1 = function (ChallanNumber) {
            var paramObject = { "ChallanNumber": ChallanNumber };
            return DataAccessService.postData('api/AdminService/GetPaymentReciept', paramObject);
        };

        this.GetStudentHtData = function (HallticketNumber) {
            var paramObject = { "HallticketNumber": HallticketNumber };
            return DataAccessService.getDataWithPara('api/AdminService/GetStudentTransferData', paramObject);
        };

        this.DeleteHallTicketData = function (HallticketNo,Remarks,UserName) {
            var paramObject = { "HallticketNo": HallticketNo, "Remarks": Remarks, "UserName": UserName };
            return DataAccessService.getDataWithPara('api/AdminService/DeleteHallTicketData', paramObject);
        };

        this.GetExaminationCentreUserSMS = function (ExaminationCentreID, CentreCode,UserName) {
            var paramObject = { "ExaminationCentreID": ExaminationCentreID, "CentreCode": CentreCode, "UserName": UserName};
            return DataAccessService.postData('api/AdminService/GetExaminationCentreUserSMS', paramObject);
        };

        this.AddExaminationCentreUser = function (paramObject) {

            return DataAccessService.postData('api/AdminService/AddExaminationCentreUser', paramObject);
        };

        this.GetDeletedHallTicketsExcel = function (DataType) {
            var paramObject = { "DataType": DataType };
            return DataAccessService.getDataWithPara('api/AdminService/GetDeletedHallTicketsExcel', paramObject);
        };


        this.GetNRExcelDownload = function (ExaminationCentreID,CentreCode,UserName,SessionId,Captcha) {
            var paramObj = {
                "ExaminationCentreID": ExaminationCentreID, "CentreCode": CentreCode, "UserName": UserName, "SessionId": SessionId, "Captcha": Captcha
            };
            var promise = DataAccessService.getDataWithPara('api/AdminService/GetNRExcelDownload', paramObj);
            return promise;
        };

        this.UploadOMRNumberExcel = function (DataType,json) {
            var paramObj = {
                "DataType": DataType,"json": json
            }
            console.log(paramObj)
            var promise = DataAccessService.postData('api/AdminService/UploadOMRNumberExcel', paramObj);
            return promise;
        }

        this.UploadSGExcel = function (DataType, json) {
            var paramObj = {
                "DataType": DataType, "json": json
            }
            console.log(paramObj)
            var promise = DataAccessService.postData('api/AdminService/UploadSGExcel', paramObj);
            return promise;
        }

        this.SetExamAttendance = function (ExaminationCentreID,UserName) {
            var paramObject = { "ExaminationCentreID": ExaminationCentreID, "UserName": UserName };
            return DataAccessService.getDataWithPara('api/AdminService/SetExamAttendance', paramObject);
        };

    })
})