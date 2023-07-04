define(['app'], function (app) {
    app.service("StudentRegistrationService", function (DataAccessService) {

        this.SendSms = function (CandidateMobile,  CandidateName) {
            var paramObject = {
                "CandidateMobile": CandidateMobile,  "CandidateName": CandidateName
            };
            return DataAccessService.postData('api/StudentRegistration/SendMobileOTP', paramObject);
        };


        this.VerifyMobileOtp = function (CandidateMobile, CandidateName, MobileOTP) {
            var paramObject = {
                "CandidateMobile": CandidateMobile,  "CandidateName": CandidateName, "MobileOTP": MobileOTP
            };
            return DataAccessService.postData('api/StudentRegistration/VerifyMobileOtp', paramObject);
        };

        this.VerifyCaste = function (AadharNumber, CasteCertificateNumber, CasteCategoryID) {
            var paramObject = {
                "AadharNumber": AadharNumber, "CasteCertificateNumber": CasteCertificateNumber, "CasteCategoryID": CasteCategoryID
            };
            return DataAccessService.postData('api/StudentRegistration/VerifyCaste', paramObject);
        };


        this.SubmitStdDetails = function (StudentName, RegistrationMobile, CasteCategoryID, AadharNumber, CasteCertificateNumber, CasteVerified, RegistrationEmail, RegistrationPassword, DataType) {
            var paramObject = {
                "StudentName": StudentName, "RegistrationMobile": RegistrationMobile,
                "CasteCategoryID": CasteCategoryID, "AadharNumber": AadharNumber,
                "CasteCertificateNumber": CasteCertificateNumber, "CasteVerified": CasteVerified,
                "RegistrationEmail": RegistrationEmail, "RegistrationPassword": RegistrationPassword,
                "DataType": DataType

            };
            return DataAccessService.postData('api/StudentRegistration/StdRegistration', paramObject);
        };


        //this.SubmitStdDetails = function (StudentName, RegistrationMobile, RegistrationEmail, RegistrationPassword) {
        //    var paramObject = {
        //        "StudentName": StudentName, "RegistrationMobile": RegistrationMobile,
        //        "RegistrationEmail": RegistrationEmail, "RegistrationPassword": RegistrationPassword

        //    };
        //    return DataAccessService.postData('api/StudentRegistration/StdRegistration', paramObject);
        //};


        //this.GetCategories = function () {
        //    return DataAccessService.getDataAll('api/StudentRegistration/GetCategories');
        //};

        this.GetCategories = function (UserName, SessionId, Captcha) {
            var paramObject = {
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha };
            return DataAccessService.getDataWithPara('api/StudentRegistration/GetCategories', paramObject);
        };
        this.GetRegions = function (UserName, SessionId, Captcha) {
            var paramObject = {
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/StudentRegistration/GetRegions', paramObject);
        };


        this.GetMinorities = function (UserName, SessionId, Captcha) {
            var paramObject = {
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
            };
            return DataAccessService.getDataWithPara('api/StudentRegistration/GetMinorities', paramObject);
        };
        
        this.FeePaymentRequestLog = function (RegistrationID, MerchantID, SubMerchantID, AdditionalInfo1, UserName, SessionId, Captcha) {
            var paramObject = {
                "RegistrationID": RegistrationID,
                "MerchantID": MerchantID,
                "SubMerchantID": SubMerchantID,
                "AdditionalInfo1": AdditionalInfo1,
                "UserName": UserName,
                "SessionId": SessionId,
                "Captcha": Captcha
};
            return DataAccessService.getDataWithPara('api/StudentRegistration/FeePaymentRequestLog', paramObject);
        };

        this.AdminFeePaymentRequestLog = function (RegistrationID, MerchantID, SubMerchantID, AdditionalInfo1) {
            var paramObject = { "RegistrationID": RegistrationID, "MerchantID": MerchantID, "SubMerchantID": SubMerchantID, "AdditionalInfo1": AdditionalInfo1 };
            return DataAccessService.getDataWithPara('api/StudentRegistration/AdminFeePaymentRequestLog', paramObject);
        };

    });

});