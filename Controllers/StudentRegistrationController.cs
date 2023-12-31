﻿using Newtonsoft.Json;
using TSPOLYCET.Controllers.Common;
using TSPOLYCET.Models;
using TSPOLYCET.Models.Database;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using RestSharp;
using System.Configuration;
using System.Net.Http.Headers;
using Org.BouncyCastle.Ocsp;

namespace TSPOLYCET.Controllers
{

    public class StudentRegistrationController : ApiController
    {
        internal readonly object Tables;

        [HttpPost, ActionName("SendMobileOTP")]
        public async Task<HttpResponseMessage> SendMobileOTP([FromBody] SendSmsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CandidateMobile", data.CandidateMobile);
                param[1] = new SqlParameter("@CandidateName", data.CandidateName);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_RegistrationMobileOTP", param);
                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {
                    var com = new CommunicationController();
                    var msg = dt.Tables[1].Rows[0]["MobileOTP"].ToString() + " is your otp for validating your Mobile no on " + data.CandidateMobile.ToString().Substring(0, 2) + "xxxxx" + data.CandidateMobile.ToString().Substring(6, 4) + ", SBTET TS";
                    var test = await com.SendSms(data.CandidateMobile.ToString(), msg, "1007161770830309481");

                    HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt.Tables[0].DataTableToList<HttpResponse>());
                    return HttpResponse;
                }
                else
                {

                    HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt.Tables[0].DataTableToList<HttpResponse>());
                    return HttpResponse;
                }

            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_RegistrationMobileOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }

        [HttpPost, ActionName("VerifyMobileOtp")]
        public HttpResponseMessage VerifyMobileOtp([FromBody] VerifySmsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CandidateMobile", data.CandidateMobile);
                param[1] = new SqlParameter("@CandidateName", data.CandidateName);
                param[2] = new SqlParameter("@MobileOTP", data.MobileOTP);
                DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_RegistrationMobileOTP", param);
                List<HttpResponse> Resp = dt.DataTableToList<HttpResponse>();
                HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, Resp);
                return HttpResponse;

            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Verify_RegistrationMobileOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }

        [HttpPost, ActionName("VerifyCaste")]
        public HttpResponseMessage VerifyCaste([FromBody] VerifyCasteInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AadharNumber", data.AadharNumber);
                param[1] = new SqlParameter("@CasteCertificateNumber", data.CasteCertificateNumber);
                param[2] = new SqlParameter("@CasteCategoryID", data.CasteCategoryID);
                DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("TempSP_Verify_CasteCertificate", param);
                List<HttpResponse> Resp = dt.DataTableToList<HttpResponse>();
                HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, Resp);
                return HttpResponse;

            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("TempSP_Verify_CasteCertificate", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }


        //[HttpPost, ActionName("StdRegistration")]
        //public async Task<HttpResponseMessage> StdRegistration([FromBody] StdDetails data)
        //{
        //    var dbHandler = new PolycetdbHandler();
        //    try
        //    {
        //        var test = string.Empty;
        //        var param = new SqlParameter[4];
        //        param[0] = new SqlParameter("@StudentName", data.StudentName);
        //        param[1] = new SqlParameter("@RegistrationMobile", data.RegistrationMobile);
        //        param[2] = new SqlParameter("@RegistrationEmail", data.RegistrationEmail);
        //        param[3] = new SqlParameter("@RegistrationPassword", data.RegistrationPassword);
        //        DataSet dt = dbHandler.ReturnDataWithStoredProcedure("SP_Temp_Set_Registration", param);
        //        if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
        //        {
        //            var com = new CommunicationController();
        //            //var msg = "KIQRZA is your otp for validating your Mobile no on" + data.RegistrationMobile.ToString().Substring(0, 2) + "xxxxx" + data.RegistrationMobile.ToString().Substring(6, 4) + ", SBTET TS";
        //            //var tmp = await com.SendSms(data.RegistrationMobile.ToString(), msg, "1007161770830309481");
        //            var msg = "Polycet6789124561 is Your provisional registration No for POLYCET 2023 and 123456 password. Login and complete Application, SBTET TS";
        //            var tmp = await com.SendSms(data.RegistrationMobile.ToString(), msg, "1007166857328053980");
        //        }


        //        if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200" && data.RegistrationEmail != "")
        //        {

        //            var msgbdy = new MailRequest()
        //            {
        //                From = "sbtet-helpdesk@telangana.gov.in",
        //                To = data.RegistrationEmail.ToString(),
        //                Subject = "test mail",
        //                Message = "Your have provisionally registered for POLYCET-2023.Your provisional Registration Number is " + dt.Tables[1].Rows[0]["ApplicationNumber"].ToString() + "RegistrationPassword",
        //                attachmentdata = "Attachment"
        //            };
        //            var com = new CommunicationController();
        //            test = await com.SendMail(msgbdy);
        //        }




        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
        //        return response;



        //    }

        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("SP_Temp_Set_Registration", 0, ex.Message);
        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
        //        return response;
        //    }

        //}

        [HttpPost, ActionName("StdRegistration")]
        public async Task<HttpResponseMessage> StdRegistration([FromBody] StdDetails data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                //var marchantid = "TSSBTET"; // test
                //var subMarchantid = "TSDOFP";
                var marchantid = "TSPOLYCET"; // test
                var subMarchantid = "";
                string dt1 = "";
                string encriptedpassword = "";
               
                    var res = data.RegistrationPassword.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                    var crypt = new HbCrypt(res[1]);
                    var passencrypt = new HbCrypt();

                    //long CellNo = Convert.ToInt64(crypt.AesDecrypt(res[1]));
                    string password = crypt.AesDecrypt(res[0]);
                    string decryptpassword = passencrypt.AesDecrypt(password);
                    encriptedpassword = passencrypt.Encrypt(decryptpassword);
              

                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@StudentName", data.StudentName);
                param[1] = new SqlParameter("@RegistrationMobile", data.RegistrationMobile);
                param[2] = new SqlParameter("@CasteCategoryID", data.CasteCategoryID);
                param[3] = new SqlParameter("@AadharNumber", data.AadharNumber);
                param[4] = new SqlParameter("@CasteCertificateNumber", data.CasteCertificateNumber);
                param[5] = new SqlParameter("@CasteVerified", data.CasteVerified);
                param[6] = new SqlParameter("@RegistrationEmail", data.RegistrationEmail);
                param[7] = new SqlParameter("@RegistrationPassword", encriptedpassword);
                param[8] = new SqlParameter("@DataType", data.DataType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_Registration", param);
                string Password = "";
                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "201")
                {
                    string RegistrationPassword = Convert.ToString(dt.Tables[1].Rows[0]["RegistrationPassword"]);
                    var passcrypt = new HbCrypt();
                    Password = passcrypt.Decrypt(RegistrationPassword);
                    string RegistrationNumber = dt.Tables[1].Rows[0]["RegistrationNumber"].ToString();
                   
                    string RegistrationMobile = dt.Tables[1].Rows[0]["RegistrationMobile"].ToString();
                     
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var temptateid = "1007166857328053980";
                    var msg = RegistrationNumber + " is Your provisional registration No for POLYCET 2023 and " + Password + " password. Login and complete Application, SBTET TS";
                    CommunicationController com = new CommunicationController();
                    com.SendSms(RegistrationMobile, msg, temptateid);
                    dt.Tables[1].Rows[0]["RegistrationPassword"] = Password;


                    //string urlParameters = "?mobile=" + RegistrationMobile + "&message=" + msg + "&templateid=1007166857328053980";
                    //HttpClient client = new HttpClient();
                    //client.BaseAddress = new Uri(url);
                    //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    //HttpResponseMessage res = client.GetAsync(urlParameters).Result;
                    response = Request.CreateResponse(HttpStatusCode.OK, dt);
                   
                }
                else if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {
                    int RegistrationID = (int)Convert.ToInt64(dt.Tables[1].Rows[0]["RegistrationID"]);
                    string RegistrationNumber = dt.Tables[1].Rows[0]["RegistrationNumber"].ToString();
                    string Captcha = dt.Tables[1].Rows[0]["Captcha"].ToString();

                   dt1 = FeePaymentRequestLog(RegistrationID, marchantid, subMarchantid =null, RegistrationNumber,Captcha=null);
                    response = Request.CreateResponse(HttpStatusCode.OK, dt1);
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, dt);
                }

                
                return response;
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr(" SP_Set_Registration", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("FeePaymentRequestLog")]
        public string FeePaymentRequestLog(int RegistrationID,string MerchantID, string UserName, string SessionId, string Captcha ,string SubMerchantID = null, string AdditionalInfo1 = null, string AdditionalInfo2 = null, string AdditionalInfo3 = null, string AdditionalInfo4 = null, string AdditionalInfo5 = null, string AdditionalInfo6 = null, string AdditionalInfo7 = null)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param1= new SqlParameter[3];
                param1[0] = new SqlParameter("@SessionId",SessionId);
                param1[1] = new SqlParameter("@UserName", UserName);
                param1[2] = new SqlParameter("@Captcha", Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param1);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    var param = new SqlParameter[10];
                    param[0] = new SqlParameter("@RegistrationID", RegistrationID);
                    param[1] = new SqlParameter("@MerchantID", MerchantID);
                    param[2] = new SqlParameter("@SubMerchantID", SubMerchantID);
                    param[3] = new SqlParameter("@AdditionalInfo1", AdditionalInfo1);
                    param[4] = new SqlParameter("@AdditionalInfo2", AdditionalInfo2);
                    param[5] = new SqlParameter("@AdditionalInfo3", AdditionalInfo3);
                    param[6] = new SqlParameter("@AdditionalInfo4", AdditionalInfo4);
                    param[7] = new SqlParameter("@AdditionalInfo5", AdditionalInfo5);
                    param[8] = new SqlParameter("@AdditionalInfo6", AdditionalInfo6);
                    param[9] = new SqlParameter("@AdditionalInfo7", AdditionalInfo7);
                    var ds = dbHandler.ReturnDataWithStoredProcedure("SP_Set_FeePaymentRequestLog", param);
                    return JsonConvert.SerializeObject(ds); ;
                }
                else
                {
                    return JsonConvert.SerializeObject(dt); ;
                }
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Set_FeePaymentRequestLog", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("AdminFeePaymentRequestLog")]
        public string AdminFeePaymentRequestLog(int RegistrationID, string MerchantID, string SubMerchantID = null, string AdditionalInfo1 = null, string AdditionalInfo2 = null, string AdditionalInfo3 = null, string AdditionalInfo4 = null, string AdditionalInfo5 = null, string AdditionalInfo6 = null, string AdditionalInfo7 = null)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);
                param[1] = new SqlParameter("@MerchantID", MerchantID);
                param[2] = new SqlParameter("@SubMerchantID", SubMerchantID);
                param[3] = new SqlParameter("@AdditionalInfo1", AdditionalInfo1);
                param[4] = new SqlParameter("@AdditionalInfo2", AdditionalInfo2);
                param[5] = new SqlParameter("@AdditionalInfo3", AdditionalInfo3);
                param[6] = new SqlParameter("@AdditionalInfo4", AdditionalInfo4);
                param[7] = new SqlParameter("@AdditionalInfo5", AdditionalInfo5);
                param[8] = new SqlParameter("@AdditionalInfo6", AdditionalInfo6);
                param[9] = new SqlParameter("@AdditionalInfo7", AdditionalInfo7);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_AdminFeePaymentRequestLog", param);
                return JsonConvert.SerializeObject(dt); ;
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Set_AdminFeePaymentRequestLog", 0, ex.Message);
                return ex.Message;
            }
        }




        [HttpGet, ActionName("GetChallanData")]
        public string GetChallanData(string chalanaNo)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

             
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ChallanNumber", chalanaNo);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_ChallanaDataForFeePayment", param);
                return JsonConvert.SerializeObject(dt); ;
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Set_FeePaymentRequestLog", 0, ex.Message);
                return ex.Message;
            }
        }


        //[HttpGet, ActionName("GetCategories")]
        //public string GetCategories()
        //{
        //    var dbHandler = new PolycetdbHandler();
        //    try
        //    {
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_CasteCategories";
        //        var res = dbHandler.ReturnDataSet(StrQuery);
        //        return JsonConvert.SerializeObject(res);
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Get_CasteCategories", 0, ex.Message);
        //        throw ex;
        //    }
        //}

        [HttpGet, ActionName("GetCategories")]
        public string GetCategories(string UserName, string SessionId, string Captcha)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", SessionId);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@Captcha", Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    var ds = dbHandler.ReturnDataSet("SP_Get_CasteCategories");
                    return JsonConvert.SerializeObject(ds);
                }
                else
                {
                    return JsonConvert.SerializeObject(dt);

                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //[HttpGet, ActionName("GetRegions")]
        //public string GetRegions()
        //{
        //    var dbHandler = new PolycetdbHandler();
        //    try
        //    {
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_Regions";
        //        var res = dbHandler.ReturnDataSet(StrQuery);
        //        return JsonConvert.SerializeObject(res);
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Get_Regions", 0, ex.Message);
        //        throw ex;
        //    }
        //}


        [HttpGet, ActionName("GetRegions")]
        public string GetRegions(string UserName, string SessionId, string Captcha)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", SessionId);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@Captcha", Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    var ds = dbHandler.ReturnDataSet("SP_Get_Regions");
                    return JsonConvert.SerializeObject(ds);
                }
                else
                {
                    return JsonConvert.SerializeObject(dt);

                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //[HttpGet, ActionName("GetMinorities")]
        //public string GetMinorities()
        //{
        //    var dbHandler = new PolycetdbHandler();
        //    try
        //    {
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_Minorities";
        //        var res = dbHandler.ReturnDataSet(StrQuery);
        //        return JsonConvert.SerializeObject(res);
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Get_Minorities", 0, ex.Message);
        //        throw ex;
        //    }
        //}


        [HttpGet, ActionName("GetMinorities")]
        public string GetMinorities(string UserName, string SessionId, string Captcha)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", SessionId);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@Captcha", Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    var ds = dbHandler.ReturnDataSet("SP_Get_Minorities");
                    return JsonConvert.SerializeObject(ds);
                }
                else
                {
                    return JsonConvert.SerializeObject(dt);

                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }




    }
}

