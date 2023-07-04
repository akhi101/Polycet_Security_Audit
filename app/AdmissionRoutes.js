define([], function () {

    return {

        routes: {

            'index': {
                url: "/index",
                templateUrl: 'app/views/index.html',
                dependencies: ['controllers/IndexController', 'services/AdminService/AdminService']
            },


            'index.Registration': {
                url: "/Registration",
                templateUrl: 'app/views/Register/Registration.html',
                dependencies: ['controllers/Register/RegistrationController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService', 'services/BillDesk/paymentService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            },

            //'index.TeStRegistration': {
            //    url: "/Registration",
            //    templateUrl: 'app/views/TestRegistration.html',
            //    dependencies: ['controllers/TestRegistrationController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService', 'services/BillDesk/paymentService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            //},

            'index.PaymentResponse': {
                url: "/PaymentResponse/:data",
                templateUrl: 'app/views/PaymentResponse.html',
                dependencies: ['controllers/PaymentResponseController', 'services/BillDesk/paymentService']
            },


            'index.TwalletResponse': {
                url: "/TwalletResponse/:data",
                templateUrl: 'app/views/TwalletResponse.html',
                dependencies: ['controllers/TwalletResponseController', 'services/BillDesk/paymentService']
            },

            'index.PaymentReciept': {
                url: "/PaymentReciept",
                templateUrl: 'app/views/PaymentReciept.html',
                dependencies: ['controllers/PaymentRecieptController', 'services/AdminService/AdminService']
            },


            'index.Application': {
                url: "/Application",
                templateUrl: 'app/views/Application.html',
                dependencies: ['controllers/ApplicationController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService']
            },

            //'StudentDashboard.Application': {
            //    url: "/Application",
            //    templateUrl: 'app/views/Application.html',
            //    dependencies: ['controllers/ApplicationController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService', 'services/PreExamination/PreExaminationService']
            //},
            'callbacks': {
                url: "/callbacks",
                templateUrl: 'app/views/callbacks.html',
                dependencies: ['controllers/callbacksController']
            },

            'index.Login': {
                url: "/Login",
                templateUrl: 'app/views/Login.html',
                dependencies: ['controllers/LoginController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService',  'services/SystemAdministrator/SystemUserService']
            },

            'index.OfficialsLogin': {
                url: "/OfficialsLogin",
                templateUrl: 'app/views/OfficialsLogin.html',
                dependencies: ['controllers/OfficialsLoginController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService']
            },

            'index.GetHT': {
                url: "/GetHT",
                templateUrl: 'app/views/GetHt.html',
                dependencies: ['controllers/GetHtController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'HTDownload': {
                url: "/HTDownload",
                templateUrl: 'app/views/HTDownload.html',
                dependencies: ['controllers/HTDownloadController', 'services/AdminService/AdminService']
            },

            'DetailsUpdationLogin': {
                url: "/DetailsUpdationLogin",
                templateUrl: 'app/views/DetailsUpdationLogin.html',
                dependencies: ['controllers/DetailsUpdationLoginController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService']
            },

            //'index.TEstLOGin': {
            //    url: "/TEstLOGin",
            //    templateUrl: 'app/views/TEstLOGin.html',
            //    dependencies: ['controllers/TEstLOGinController', 'services/StudentRegistration/StudentRegistrationService', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            //},

            //'TestingStudentApplication': {
            //    url: "/TestingStudentApplication",
            //    templateUrl: 'app/views/TestingStudentApplication.html',
            //    dependencies: ['controllers/TestingStudentApplicationController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/StudentRegistration/StudentRegistrationService', 'services/PreExamination/PreExaminationService']
            //},


            'index.ForgotPage': {
                url: "/ForgotPage",
                templateUrl: 'app/views/ForgotPage.html',
                dependencies: ['controllers/ForgotPageController', 'services/StudentRegistration/StudentRegistrationService', 'services/ForgotPasswordService/ForgotPasswordService', 'services/SystemAdministrator/SystemUserService']
            },

            'index.StudentForgotPage': {
                url: "/StudentForgotPage",
                templateUrl: 'app/views/StudentForgotPage.html',
                dependencies: ['controllers/StudentForgotPageController', 'services/StudentRegistration/StudentRegistrationService', 'services/ForgotPasswordService/ForgotPasswordService', 'services/SystemAdministrator/SystemUserService']
            },

            'index.GetDeCryptPaSSPageS': {
                url: "/GetDeCryptPaSSPageS",
                templateUrl: 'app/views/GetDeCryptPaSSPageS.html',
                dependencies: ['controllers/GetDeCryptPaSSPageSController', 'services/StudentRegistration/StudentRegistrationService', 'services/ForgotPasswordService/ForgotPasswordService', 'services/SystemAdministrator/SystemUserService']
            },

            'index.GetDeCryptPaSSPageO': {
                url: "/GetDeCryptPaSSPageO",
                templateUrl: 'app/views/GetDeCryptPaSSPageO.html',
                dependencies: ['controllers/GetDeCryptPaSSPageOController', 'services/StudentRegistration/StudentRegistrationService', 'services/ForgotPasswordService/ForgotPasswordService', 'services/SystemAdministrator/SystemUserService']
            },

            'index.FeePaymentStatus': {
                url: "/FeePaymentStatus",
                templateUrl: 'app/views/FeePaymentStatus.html',
                dependencies: ['controllers/FeePaymentStatusController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard': {
                url: "/Dashboard",
                templateUrl: 'app/views/Dashboard.html',
                dependencies: ['controllers/DashboardController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService']
            },

            'StudentDashboard': {
                url: "/StudentDashboard",
                templateUrl: 'app/views/StudentDashboard.html',
                dependencies: ['controllers/StudentDashboardController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/StudentRegistration/StudentRegistrationService' , 'services/PreExamination/PreExaminationService']
            },


            'AdminStudentDashboard': {
                url: "/AdminStudentDashboard",
                templateUrl: 'app/views/AdminStudentDashboard.html',
                dependencies: ['controllers/AdminStudentDashboardController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/StudentRegistration/StudentRegistrationService', 'services/PreExamination/PreExaminationService']
            },

            'ViewStudentDashboard': {
                url: "/ViewStudentDashboard",
                templateUrl: 'app/views/ViewStudentDashboard.html',
                dependencies: ['controllers/ViewStudentDashboardController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/StudentRegistration/StudentRegistrationService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.StudentHtDashboard': {
                url: "/HallTicketDownload/StudentHtDashboard",
                templateUrl: 'app/views/StudentHtDashboard.html',
                dependencies: ['controllers/StudentHtDashboardController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/StudentRegistration/StudentRegistrationService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.GetSSCData': {
                url: "/GetSSCData",
                templateUrl: 'app/views/SSCData.html',
                dependencies: ['controllers/SSCDataController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/StudentRegistration/StudentRegistrationService', 'services/PreExamination/PreExaminationService']
            },


            'Dashboard.StudentDetailsUpdation': {
                url: "/StudentDetailsUpdation",
                templateUrl: 'app/views/DetailsUpdationLogin.html',
                dependencies: ['controllers/DetailsUpdationLoginController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.ViewStudentDetails': {
                url: "/ViewStudentDetails",
                templateUrl: 'app/views/ViewDetailsLogin.html',
                dependencies: ['controllers/ViewDetailsLoginController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.HallTicketDownload': {
                url: "/HallTicketDownload",
                templateUrl: 'app/views/StudentHallTicket.html',
                dependencies: ['controllers/StudentHallTicketController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.FeePaymentDetails': {
                url: "/FeePaymentDetails",
                templateUrl: 'app/views/FeePaymentDetails.html',
                dependencies: ['controllers/FeePaymentDetailsController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.StudentTransfer': {
                url: "/StudentTransfer",
                templateUrl: 'app/views/StudentTransfer.html',
                dependencies: ['controllers/StudentTransferController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.HallTicketDeletion': {
                url: "/HallTicketDeletion",
                templateUrl: 'app/views/HallTicketDeletion.html',
                dependencies: ['controllers/HallTicketDeletionController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'TestStudentDashboard': {
                url: "/TestStudentDashboard",
                templateUrl: 'app/views/TestStudentDashboard.html',
                dependencies: ['controllers/TestStudentDashboardController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/StudentRegistration/StudentRegistrationService', 'services/PreExamination/PreExaminationService']
            },


            'TestingWebService': {
                url: "/TestingWebService",
                templateUrl: 'app/views/TestingWebService.html',
                dependencies: ['controllers/TestingWebServiceController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/StudentRegistration/StudentRegistrationService', 'services/PreExamination/PreExaminationService']
            },

            'StudentDashboard.ChangePassword': {
                url: "/ChangePassword",
                templateUrl: 'app/views/StudentChangePassword.html',
                dependencies: ['controllers/StudentChangePasswordController', 'services/SystemAdministrator/ChangePasswordService', 'services/SystemAdministrator/SystemUserService']
            },

            'StudentDashboard.Hallticket': {
                url: "/Hallticket",
                templateUrl: 'app/views/Hallticket.html',
                dependencies: ['controllers/HallticketController', 'services/SystemAdministrator/ChangePasswordService', 'services/SystemAdministrator/SystemUserService']
            },
            

            //'TestStudentDashboard.StudentChangePassword': {
            //    url: "/StudentChangePassword",
            //    templateUrl: 'app/views/StudentChangePassword.html',
            //    dependencies: ['controllers/StudentChangePasswordController', 'services/SystemAdministrator/ChangePasswordService', 'services/SystemAdministrator/SystemUserService']
            //},


            'Dashboard.ChangePassword': {
                url: "/ChangePassword",
                templateUrl: 'app/views/ChangePassword.html',
                dependencies: ['controllers/ChangePasswordController', 'services/SystemAdministrator/ChangePasswordService', 'services/SystemAdministrator/SystemUserService']
            },


            'Dashboard.Settings.ChangePassword': {
                url: "/ChangePassword",
                templateUrl: 'app/views/ChangePassword.html',
                dependencies: ['controllers/ChangePasswordController', 'services/SystemAdministrator/ChangePasswordService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.CoordinatingCentres': {
                url: "/CoordinatingCentres",
                templateUrl: 'app/views/CoordinatingCentres.html',
                dependencies: ['controllers/CoordinatingCentresController', 'services/AdminService/AdminService','services/SystemAdministrator/SystemUserService']
            },



            'Dashboard.ExaminationCentres': {
                url: "/ExaminationCentres",
                templateUrl: 'app/views/ExaminationCenters.html',
                dependencies: ['controllers/ExaminationCentersController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },


            'Dashboard.PhotoAttendanceSheet': {
                url: "/AdmExamCentresNRDownload",
                templateUrl: 'app/views/AdmExamCentresNRDownload.html',
                dependencies: ['controllers/AdmExamCentresNRDownloadController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },
        
            'Dashboard.DCWiseExamCentresNRDownload': {
                url: "/DCWiseExamCentresNRDownload",
                templateUrl: 'app/views/DCWiseExamCentresNRDownload.html',
                dependencies: ['controllers/DCWiseExamCentresNRDownloadController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService','services/PreExamination/PreExaminationService']
            },

            'Dashboard.ExamCentreNRDownload': {
                url: "/ExamCentreNRDownload",
                templateUrl: 'app/views/ExamCentreNRDownload.html',
                dependencies: ['controllers/ExamCentreNRDownloadController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.NRExcel': {
                url: "/AdmExamCentresNRExcel",
                templateUrl: 'app/views/AdmExamCentresNRExcel.html',
                dependencies: ['controllers/AdmExamCentresNRExcelController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.DCWiseExamCentresNRExcel': {
                url: "/DCWiseExamCentresNRExcel",
                templateUrl: 'app/views/DCWiseExamCentresNRExcel.html',
                dependencies: ['controllers/DCWiseExamCentresNRExcelController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.ExamCentreNRExcel': {
                url: "/ExamCentreNRExcel",
                templateUrl: 'app/views/ExamCentreNRExcel.html',
                dependencies: ['controllers/ExamCentreNRExcelController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.MarkAttendance': {
                url: "/MarkAttendance",
                templateUrl: 'app/views/MarkAttendance.html',
                dependencies: ['controllers/MarkAttendanceController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService']
            },

            'Dashboard.AdmExamCentresAttendance': {
                url: "/AdmExamCentresAttendance",
                templateUrl: 'app/views/AdmExamCentresAttendance.html',
                dependencies: ['controllers/AdmExamCentresAttendanceController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.DCWiseExamCentresAttendance': {
                url: "/DCWiseExamCentresAttendance",
                templateUrl: 'app/views/DCWiseExamCentresAttendance.html',
                dependencies: ['controllers/DCWiseExamCentresAttendanceController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.ExamCentreAttendance': {
                url: "/ExamCentreAttendance",
                templateUrl: 'app/views/ExamCentreAttendance.html',
                dependencies: ['controllers/ExamCentreAttendanceController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.AttendanceSheet': {
                url: "/AttendanceSheet",
                templateUrl: 'app/views/AttendanceSheet.html',
                dependencies: ['controllers/AttendanceSheetController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            },


            //'Dashboard.ExamCentresList': {
            //    url: "/ExamCentresList",
            //    templateUrl: 'app/views/ExamCentresList.html',
            //    dependencies: ['controllers/ExamCentresListController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            //},


            //'Dashboard.AttendanceSheet': {
            //    url: "/ExamCentresList/AttendanceSheet",
            //    templateUrl: 'app/views/AttendanceSheet.html',
            //    dependencies: ['controllers/AttendanceSheetController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'services/PreExamination/PreExaminationService']
            //},

            'Dashboard.ExamCentresLoginCredentials': {
                url: "/ExamCentresLoginCredentials",
                templateUrl: 'app/views/ExamCentresLoginCreds.html',
                dependencies: ['controllers/ExamCentresLoginCredsController', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService']
            },

            'Dashboard.AdmExaminationCentresReport': {
                url: "/AdmExaminationCentresReport",
                templateUrl: 'app/views/AdmExaminationCentresReport.html',
                dependencies: ['controllers/AdmExaminationCentresReportController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.DCExaminationCentresReport': {
                url: "/DCExaminationCentresReport",
                templateUrl: 'app/views/DCExaminationCentresReport.html',
                dependencies: ['controllers/DCExaminationCentresReportController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.CentreLocatorAppDetails': {
                url: "/CentreLocatorAppDetails",
                templateUrl: 'app/views/CentreLocatorAppDetails.html',
                dependencies: ['controllers/CentreLocatorAppDetailsController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.DCCentreLocatorAppDetails': {
                url: "/DCCentreLocatorAppDetails",
                templateUrl: 'app/views/DCCentreLocatorApp.html',
                dependencies: ['controllers/DCCentreLocatorAppController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.AdminExaminationCentres': {
                url: "/AdminExaminationCentres",
                templateUrl: 'app/views/AdminExaminationCentres.html',
                dependencies: ['controllers/AdminExaminationCentresController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },


            'Dashboard.AdmExamCentresList': {
                url: "/AdmExamCentresList",
                templateUrl: 'app/views/AdmExamCentresList.html',
                dependencies: ['controllers/AdmExamCentresListController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.ExamCentresAllocation': {
                url: "/ExamCentresAllocation",
                templateUrl: 'app/views/ExamCentresAllocation.html',
                dependencies: ['controllers/ExamCentresAllocationController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.DCExamCentresAllocation': {
                url: "/DCExamCentresAllocation",
                templateUrl: 'app/views/DCExamCentresAllocation.html',
                dependencies: ['controllers/DCExamCentresAllocationController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.QPReports': {
                url: "/QPReports",
                templateUrl: 'app/views/QPReports.html',
                dependencies: ['controllers/QPReportsController', 'services/AdminService/AdminService', 'services/PreExamination/PreExaminationService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.FeePaymentReports': {
                url: "/FeePaymentReports",
                templateUrl: 'app/views/FeePaymentReports.html',
                dependencies: ['controllers/FeePaymentReportsController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },


            'Dashboard.Statistics': {
                url: "/Statistics",
                templateUrl: 'app/views/StatisticsCount.html',
                dependencies: ['controllers/StatisticsCountController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.Settings': {
                url: "/Settings",
                templateUrl: 'app/views/MasterSettings/MasterSettings.html',
                dependencies: ['controllers/MasterSettings/MasterSettingsController', 'services/SystemAdministrator/SystemUserService','services/AdminService/AdminService']
            },

            'Dashboard.NRDownload': {
                url: "/NRDownload",
                templateUrl: 'app/views/NRDownload.html',
                dependencies: ['controllers/NRDownloadController', 'services/SystemAdministrator/SystemUserService']
            },




            'Dashboard.Settings.RecentNews': {
                url: "/RecentNews",
                templateUrl: 'app/views/MasterSettings/RecentNews.html',
                dependencies: ['controllers/MasterSettings/RecentNewsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.Notifications': {
                url: "/Notifications",
                templateUrl: 'app/views/Notifications/Notifications.html',
                dependencies: ['controllers/Notifications/NotificationsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.ModulesSettings': {
                url: "/ModulesSettings",
                templateUrl: 'app/views/MasterSettings/ModulesSetting.html',
                dependencies: ['controllers/MasterSettings/ModulesSettingController', 'services/AdminService/AdminService', 'services/MasterSettings/MasterSettingsService']

            },


            'Dashboard.Settings.PolycetYears': {
                url: "/PolycetYears",
                templateUrl: 'app/views/MasterSettings/PolycetYears.html',
                dependencies: ['controllers/MasterSettings/PolycetYearsController', 'services/AdminService/AdminService']
            },


            'Dashboard.Settings.FeeAmounts': {
                url: "/FeeAmounts",
                templateUrl: 'app/views/MasterSettings/FeeAmounts.html',
                dependencies: ['controllers/MasterSettings/FeeAmountsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.DatesSettings': {
                url: "/DatesSettings",
                templateUrl: 'app/views/MasterSettings/DatesSettings.html',
                dependencies: ['controllers/MasterSettings/DatesSettingsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.RegistrationDates': {
                url: "/RegistrationDates",
                templateUrl: 'app/views/MasterSettings/RegistrationDatesSettings.html',
                dependencies: ['controllers/MasterSettings/RegistrationDatesSettingsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.ExaminationCentreDates': {
                url: "/ExaminationCentreDates",
                templateUrl: 'app/views/MasterSettings/ExamCentresDatesSettings.html',
                dependencies: ['controllers/MasterSettings/ExamCentresDatesSettingsController', 'services/AdminService/AdminService']
            },

            'Dashboard.Settings.Users': {
                url: "/Users",
                templateUrl: 'app/views/MasterSettings/Users.html',
                dependencies: ['controllers/MasterSettings/UsersController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.PreExamination': {
                url: "/PreExamination",
                templateUrl: 'app/views/PreExamination/PreExamination.html',
                dependencies: ['controllers/PreExamination/PreExaminationController', 'services/SystemAdministrator/SystemUserService']
            },

            'Dashboard.PrinterNR': {
                url: "/PrinterNR",
                templateUrl: 'app/views/PrinterNR.html',
                dependencies: ['controllers/PrinterNRController', 'services/PreExamination/PreExaminationService', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService']
            },

            'Dashboard.Registration': {
                url: "/Registration",
                templateUrl: 'app/views/Registration1.html',
                dependencies: ['controllers/Registration1Controller', 'services/StudentRegistration/StudentRegistrationService','services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService', 'services/BillDesk/paymentService', 'services/PreExamination/PreExaminationService']
            },

            'Dashboard.OMRNoExcelUpload': {
                url: "/OMRNoExcelUpload",
                templateUrl: 'app/views/OMRNoExcelUpload.html',
                dependencies: ['controllers/OMRNoExcelUploadController', 'services/AdminService/AdminService', 'services/SystemAdministrator/SystemUserService', 'directives/saFileUpload']
            },

            'Dashboard.AttendanceStatistics': {
                url: "/AttendanceStatistics",
                templateUrl: 'app/views/AttendanceStatistics.html',
                dependencies: ['controllers/AttendanceStatisticsController', 'services/PreExamination/PreExaminationService', 'services/SystemAdministrator/SystemUserService', 'services/AdminService/AdminService']
            },

            'Dashboard.Reports': {
                url: "/Reports",
                templateUrl: 'app/views/Reports.html',
                dependencies: ['controllers/ReportsController', 'services/AdminService/AdminService']
            },
         
        }
    }
});