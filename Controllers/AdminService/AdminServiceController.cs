using Newtonsoft.Json;
using TSPOLYCET.Models;
using TSPOLYCET.Models.Database;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RestSharp;
using System.Drawing;
using System.IO;
using System.Drawing.Imaging;

using System.Net.Http.Headers;

using System.Timers;

using System.Threading.Tasks;
using System.Configuration;

using TSPOLYCET.Controllers.Common;
using TSPOLYCET.Models;
using System.Web;

using System.Collections.Specialized;
using TSPOLYCET.Models.Security;
using System.Text;

using System.Linq;
using TSPOLYCET.Controllers.PreExamination;
using DocumentFormat.OpenXml.Drawing.Charts;

namespace TSPOLYCET.Controllers
{




    public class AdminServiceController : ApiController
    {
        public string RequestURI { get; private set; }

        //[HttpGet, ActionName("GetUserTypes")]
        //public HttpResponseMessage GetUserTypes()
        //{
        //    var dbHandler = new PolycetdbHandler();
        //    try
        //    {
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_UserTypes";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        PolycetdbHandler.SaveErorr("SP_Get_UserTypes", 0, ex.Message);
        //        throw ex;
        //    }
        //}

        //[HttpGet, ActionName("VerifyRegistrationDates")]
        //public HttpResponseMessage VerifyRegistrationDates()
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Verify_RegistrationDate";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        PolycetdbHandler.SaveErorr("SP_Verify_RegistrationDate", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        //[HttpGet, ActionName("VerifyExamCentresRegistrationDates")]
        //public HttpResponseMessage VerifyExamCentresRegistrationDates()
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Verify_ExamCentresRegistrationDates";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        PolycetdbHandler.SaveErorr("SP_Verify_ExamCentresRegistrationDates", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        //[HttpGet, ActionName("VerifyOMRDates")]
        //public string VerifyOMRDates(int DataType)
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@DataType", DataType);

        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_OMR_ResultsDates", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }
        //}

        //   protected void Page_Load(object sender, EventArgs e)
        [HttpPost, ActionName("Page_Load")]
        public string Page_Load(string Data, string Skey)
        {
            var dbHandler = new PolycetdbHandler();
            //if (!IsPostBack)
            //{
            //if (HttpContext.Current.Request.RequestType.Equals("GET"))
            //{

            //}
            //else if (HttpContext.Current.Request.RequestType.Equals("POST"))
            //{
            try
            {
                StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream, System.Text.Encoding.Default);
                string backstr = "WmZoPWq7EBOp68p8tvX8C+8A5p90hUBR4xenmWpK5g1NeVK44qv79N+0LRNHg6bZ7oevDdCHAJkFOl9fWJGx/a2IvVZwn890DQqzrxsMEAvoFZXQG6DeP1vAsp+Ni1iuWfvhnY1Is19bsTk6MQ5Fc4LBS6bTMguGPuEKaB7v1mUQcGee3unZVBiw2oZpD+g0Zxp2R9y26sHYhbvxncm/CpC30w+5YM85s6dSBVQNdUcMfvxovjZxVf6UeA/kofhnySbUZaobawEXIoeR5BkpDHfvnO9Gu0ZOy6eYHn4PNJvKXyiIE6gAEJ7lAkIHrAycbhELL1ZNyqNMZIYYRev/zQ==||||||||||||n1qMyq+oMuXW+eyZ7fxnXT3gUnbke6YL8v1bm/9kkr1MGHtIZ6s6KWljYv+TKKq2rtw4KijPqZvE6tGWkWYZ0jq1Mh3LzFCPJV/ChSNi1q6ij0gce6hOZD/KF9PqHCtOIdRu3kFoGI/2VM10WRSHHw1gUx4ticJVCe4sa1H87+8=";//HttpUtility.HtmlDecode(sr.ReadToEnd());
                NameValueCollection nvc;
                nvc = HttpContext.Current.Request.Form;
                Data = Data; //"Cr0fzDXdGcoVQoBHG0OPcfAdjo8ho9dmFHzfHsdeDUem9WqRmiz0JfRve3djgA1Tg/YKkjrCa8ondq5P2/hquMmHu3FWHuJOJL1QqNEsnRgRdpIWhxyEvk3WRNoPytB4";//nvc["Data"];
                Skey = Skey;//"D8rYvgRc8ZCFmUyHlAymw5g8FVbs8n1NnyrKbKa35yDcjWXGvvq8llnRUxQ/3LA9vAmCSLboxaVjnap0mKzOSzQJvdokByim2fLaGIp6rOV2m0sDNTZmrmte+5WRYYQGvrZJKyQRX2wylb+YaOs6ATxQskkypQIQJzBGi9Kg4EZGDFixOFVAR2efewjLn4Gq6QjElOA+84S+1Un/UPMuNVPfPCiS768Ru6NVutqEyelhzIab//EMFndZkYx8APVAMTahC1MUDS/Wt9k6YBrUQZwN8FGepjmhQ7Z5mlkMJsvCScCSmMD8ycaPjnosO4bjqP+4inkQgZqg5x4O55uWhQ==";//nvc["Skey"];
                //string private_certificate_Key = Decryption.Decrypt_usingpassword(ConfigurationManager.AppSettings["SBTET_Twallet_privatekey"].ToString());   // private key
                string private_certificate_Key = @"<RSAKeyValue><Modulus>sPdiyzKys5u9B5jqfkM//iF6hxJxnGyBpKlFgztU+95mtIysDjgOyPTfAj+PeKHGHY3PmrbikCwO0cZPQczVs3TcaDox8EPsA2R5bC7ZdyqLhdQO10oVMYBktgwcYUmd+r4LwwlNyhS/uA0WltGZ3FM3R54xQmpR7bGinIMRJ1M+5lQ/uEvEiYCfF9zlKAhrQ1TUYjCO8kntTvtf1h6ZDqGdsm1Yqv16Z03GqORCyN9icw5VHRjLe7BLWXc9UZSCID+v0wMBKvcYo0V6LZF3iVF8c+9600vvXu4OakGNlms0AdjyX0ZoBBNp0YLdBoUFF1BD/kZIGvzfwXPTwfcOMw==</Modulus><Exponent>AQAB</Exponent><P>64l6drID/CUs8Tu1It1COfadwOUWhGDetBL4v/PHJbWKhNLhQa2btDes6Kn+e/Bm1p+ubLOTyiSznPkRv9CMqbfcM7ercNwXv+H5Nua1da+WWKxA1trtrrmODQ/Rci/9kpnuHECeRwfBk+WIDVjZbMHkcWtX+eF9+7UjRxUuYD8=</P><Q>wFdAXsNeZnycGcuJgnL0VHRwb+7Bm8q0exFRfyrrhpFwvLP7nI4cqfG3aKq4HsRkbjsppi4EY6uJeA2o4C2aHqjnSNqIk2qenlvo+dKp/SAPFoBjipntL1VpLy9FMKk4Gr74NoXlByyBoXCbtXHzTVUqYZlJ0j0QZ2NfbuGJFQ0=</Q><DP>X5Ax7cKgN0dmCqItBe47loTm0IKiNiePdARWhJsF69jSUL22ww0LJX2JXATMycBqGR5EiLn7doKZlVDA0NBuodWFND6LAolp4WJv2MSWTx9koqmQzRuaX8/NQKNwWSH7geWOZEwba7pL4hO4taGc5bFtXE8vLKU+lkeR/p8rZ8U=</DP><DQ>mC1wVImmyteUeiQ7q+ZfweJOg4EX1bdPjH9rR34h0tqHpAWS8Y7Oxvbj8gAApPclrsFIdp66AlHZ9g54qsXpxpBETbP5kwksboaxkddHf2o6BceW+jZHHsgo7Jgt2g5IwYCOyjStvDtOZPi/eZOquGjFm2q4qYp+zA4nl4cB+pE=</DQ><InverseQ>DgbXG4EiC4YAxxbWal8bF6LeuSSvIDpBh7qvUFzEPULj3m2mH2GYrR1f2WxzWu0GFgyGn2e+gzlg2eFpByvmA1m0iakGlb+ZXvL0bl2wC9D8bom4wEGN49BI3eUuT+V4h3rJKMdSxFMFQNJRSGFzAyjNsTF9jclC8VcyQZ6nEjA=</InverseQ><D>PV2r7paoDUxmImpOdnZPjIqDeK9Wok2mLzlbl4RNlgGrT9SwHUYnKlxvsNHlqIlAsCLq6NWefywn/2prNYAYYuCVRbdYdd63yv1edbtRQdeJBmFgvBs+einxwoc0mC/1Dmw0m+9wADFtwh8XxDjux847jyQ2JLfFrU05/Fge7KmG+BwZExbnEnlAaPrXXLmzgXQNZ2EXGOVp0FgX5kMQmrL/p0O0kT0/6+A3BXfHnx7SnGPEV+njwv5yygIJ9FJKZTJme4TLgUNI37usTxTBOrmE6UILjApdXINUog+B0xbqmU95NHoDS2MBr/5slGT17SLEUG1PaVvO8q6aDE8DcQ==</D></RSAKeyValue>";
                string Decrypted_skey = Decryption.GetDecryptedText(Skey, private_certificate_Key);
                string Decrypted_data = Decryption.AES_Decryption(Data, Decrypted_skey, false);
                string strDecrypted_data = Encoding.Default.GetString(Convert.FromBase64String(Decrypted_data));

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@FullResponse", strDecrypted_data);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_TWalletResponce", param);
                // return JsonConvert.SerializeObject(dt); ;
                var RegistrationNumber = dt.Tables[0].Rows[0]["RegistrationNumber"].ToString();
                //txtdata.Text = strDecrypted_data;
                return strDecrypted_data + "|" + "RegistrationNumber" + "=" + RegistrationNumber;

            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                ex.InnerException.ToString();
                return "";
            }


            //}
        }

        [HttpGet, ActionName("VerifyDates")]
        public string VerifyDates(int DataType,string UserName,string SessionId,string Captcha)
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

                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@DataType", DataType);

                    var ds = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_Dates", param1);
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

        [HttpGet, ActionName("DeleteHallTicketData")]
        public string DeleteHallTicketData(string HallticketNo, string Remarks, string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@HallticketNo", HallticketNo);
                param[1] = new SqlParameter("@Remarks", Remarks);
                param[2] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Delete_Hallticket", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        //[HttpGet, ActionName("VerifyNRDownloadDates")]
        //public HttpResponseMessage VerifyNRDownloadDates()
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Verify_Dates";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        PolycetdbHandler.SaveErorr("SP_Verify_Dates", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}


        [HttpGet, ActionName("GetWebSiteVisiterCount")]
        public string GetWebSiteVisiterCount()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                param[0] = new SqlParameter("@clientIpAddress", clientIpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_WebSiteVisiterCount", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_GET_WebSiteVisiterCount", 0, ex.Message);
                return JsonConvert.SerializeObject(ex.Message);
            }
        }


        [HttpGet, ActionName("GetAllRecentNews")]
        public string GetAllRecentNews(int DataType)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", DataType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_RecentNews", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetHallticketByRegistrationId")]
        public string GetHallticketByRegistrationId(int RegistrationID, string RegistrationNumber, int DataType)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", RegistrationNumber);
                param[2] = new SqlParameter("@DataType", DataType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_Hallticket", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetHallticket")]
        public string GetHallticket(int DataType, string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Hallticket", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetStudentFeeData")]
        public string GetStudentFeeData(int RegistrationID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentFeePaymentData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetDashboardStatus")]
        public string GetDashboardStatus(int RegistrationID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentDashBoardStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetStudentApplicationData")]
        public string GetStudentApplicationData(int RegistrationID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentApplicationData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetActiveRecentNews")]
        public string GetActiveRecentNews(int DataType)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", DataType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_RecentNews", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }





        [HttpGet, ActionName("GetRegistrationDates")]
        public string GetRegistrationDates(int DataType, int PolycetYearID, int RegistrationDatesID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@RegistrationDatesID", RegistrationDatesID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_RegistrationDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetExamCentresDates")]
        public string GetExamCentresDates(int DataType, int PolycetYearID, int ExamCentresRegistrationDatesID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@ExamCentresRegistrationDatesID", ExamCentresRegistrationDatesID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamCentresRegistrationDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetViewOMRDates")]
        public string GetViewOMRDates(int DataType, int PolycetYearID, int ViewOMRDatesID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@ViewOMRDatesID", ViewOMRDatesID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ViewOMRDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetResultsDates")]
        public string GetResultsDates(int DataType, int PolycetYearID, int ResultsDatesID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@ResultsDatesID", ResultsDatesID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ResultsDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetNRDownloadDates")]
        public string GetNRDownloadDates(int DataType, int PolycetYearID, int NRDatesID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@NRDatesID", NRDatesID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_NRDownloadDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetExaminationDates")]
        public string GetExaminationDates(int DataType, int PolycetYearID, int ExaminationDateID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@ExaminationDateID", ExaminationDateID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PolycetExaminationDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetHtDates")]
        public string GetHtDates(int DataType, int PolycetYearID, int HtDatesID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@HtDatesID", HtDatesID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_HtDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //[HttpGet, ActionName("GetEditRegistrationDates")]
        //public string GetEditRegistrationDates(int RegistrationDatesID)
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@RegistrationDatesID", RegistrationDatesID);

        //        var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_RegistrationDates", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }
        //}




        //[HttpGet, ActionName("AddRegistrationDates")]
        //public string AddRegistrationDates(int PolycetYearID, DateTime RegistrationStartDate, DateTime RegistrationEndDate, DateTime ApplicationStartDate, DateTime ApplicationEndDate,string UserName)
        //{
        //    var dbHandler = new PolycetdbHandler();

        //    try
        //    {
        //        var param = new SqlParameter[6];
        //        param[0] = new SqlParameter("@PolycetYearID", PolycetYearID);
        //        param[1] = new SqlParameter("@RegistrationStartDate", RegistrationStartDate);
        //        param[2] = new SqlParameter("@RegistrationEndDate", RegistrationEndDate);
        //        param[3] = new SqlParameter("@ApplicationStartDate", ApplicationStartDate);
        //        param[4] = new SqlParameter("@ApplicationEndDate", ApplicationEndDate);
        //        param[5] = new SqlParameter("@UserName", UserName);


        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_RegistrationDates", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Add_RegistrationDates", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}


        [HttpGet, ActionName("AddorUpdateRegistrationDates")]
        public string AddorUpdateRegistrationDates(int DataType, int PolycetYearID, int RegistrationDatesID, DateTime StartDate, DateTime EndDateWithoutLateFee, DateTime EndDateWithLateFee, bool Active, string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@RegistrationDatesID", RegistrationDatesID);
                param[3] = new SqlParameter("@StartDate", StartDate);
                param[4] = new SqlParameter("@EndDateWithoutLateFee", EndDateWithoutLateFee);
                param[5] = new SqlParameter("@EndDateWithLateFee", EndDateWithLateFee);
                param[6] = new SqlParameter("@Active", Active);
                param[7] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_RegistrationDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_RegistrationDates", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("AddorUpdateExamCentresDates")]
        public string AddorUpdateExamCentresDates(int DataType, int PolycetYearID, int ExamCentresRegistrationDatesID, DateTime StartDate, DateTime EndDate, bool Active, string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@ExamCentresRegistrationDatesID", ExamCentresRegistrationDatesID);
                param[3] = new SqlParameter("@StartDate", StartDate);
                param[4] = new SqlParameter("@EndDate", EndDate);
                param[5] = new SqlParameter("@Active", Active);
                param[6] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_ExamCentresRegistrationDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_ExamCentresRegistrationDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddorUpdateViewOMRDates")]
        public string AddorUpdateViewOMRDates(int DataType, int PolycetYearID, int ViewOMRDatesID, DateTime StartDate, DateTime EndDate, bool Active, string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@ViewOMRDatesID", ViewOMRDatesID);
                param[3] = new SqlParameter("@StartDate", StartDate);
                param[4] = new SqlParameter("@EndDate", EndDate);
                param[5] = new SqlParameter("@Active", Active);
                param[6] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_ViewOMRDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_ViewOMRDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddorUpdateResultsDates")]
        public string AddorUpdateResultsDates(int DataType, int PolycetYearID, int ResultsDatesID, DateTime StartDate, DateTime EndDate, bool Active, string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@ResultsDatesID", ResultsDatesID);
                param[3] = new SqlParameter("@StartDate", StartDate);
                param[4] = new SqlParameter("@EndDate", EndDate);
                param[5] = new SqlParameter("@Active", Active);
                param[6] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_ResultsDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_ResultsDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddorUpdateNRDownloadDates")]
        public string AddorUpdateNRDownloadDates(int DataType, int PolycetYearID, int NRDatesID, DateTime StartDate, DateTime EndDate, bool Active, string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@NRDatesID", NRDatesID);
                param[3] = new SqlParameter("@StartDate", StartDate);
                param[4] = new SqlParameter("@EndDate", EndDate);
                param[5] = new SqlParameter("@Active", Active);
                param[6] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_NRDownloadDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_NRDownloadDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddorUpdateExaminationDates")]
        public string AddorUpdateExaminationDates(int DataType, int PolycetYearID, int ExaminationDateID, DateTime ExaminationDate,
            string ExaminationDay, string StartHH,
            string StartMM, string StartAMPM, string EndHH, string EndMM,
            string EndAMPM, bool Active, string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@ExaminationDateID", ExaminationDateID);
                param[3] = new SqlParameter("@ExaminationDate", ExaminationDate);
                param[4] = new SqlParameter("@ExaminationDay", ExaminationDay);
                param[5] = new SqlParameter("@StartHH", StartHH);
                param[6] = new SqlParameter("@StartMM", StartMM);
                param[7] = new SqlParameter("@StartAMPM", StartAMPM);
                param[8] = new SqlParameter("@EndHH", EndHH);
                param[9] = new SqlParameter("@EndMM", EndMM);
                param[10] = new SqlParameter("@EndAMPM", EndAMPM);
                param[11] = new SqlParameter("@Active", Active);
                param[12] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_PolycetExaminationDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_PolycetExaminationDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddorUpdateHtDates")]
        public string AddorUpdateHtDates(int DataType, int PolycetYearID, int HtDatesID, DateTime StartDate, DateTime EndDate, bool Active, string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@HtDatesID", HtDatesID);
                param[3] = new SqlParameter("@StartDate", StartDate);
                param[4] = new SqlParameter("@EndDate", EndDate);
                param[5] = new SqlParameter("@Active", Active);
                param[6] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_HtDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_HtDates", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("AddorUpdateRecentNews")]
        public string AddorUpdateRecentNews(int DataType, int RecentNewsID, string RecentNewsText, DateTime FromDate, DateTime ToDate, bool Active, string UserName)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@RecentNewsID", RecentNewsID);
                param[2] = new SqlParameter("@RecentNewsText", RecentNewsText);
                param[3] = new SqlParameter("@FromDate", FromDate);
                param[4] = new SqlParameter("@ToDate", ToDate);
                param[5] = new SqlParameter("@Active", Active);
                param[6] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_RecentNews", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_RecentNews", 0, ex.Message);
                return ex.Message;
            }

        }




        [HttpGet, ActionName("GetEditorViewRecentNews")]
        public string GetEditorViewRecentNews(int DataType, int RecentNewsID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@RecentNewsID", RecentNewsID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_RecentNews", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }




        [HttpGet, ActionName("GetCurrentPolycetYear")]
        public string GetCurrentPolycetYear()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_CurrentPolycetYear";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CurrentPolycetYear", 0, ex.Message);
                throw ex;
            }
        }










        [HttpGet, ActionName("GetStates")]
        public string GetStates()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_States";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_States", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetCaptchaString10")]
        public string GetCaptchaString10()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {

                string strCaptchaString = "";
                //if (Captcha == null)
                //{

                int intZero = '0';
                int intNine = '9';
                int intA = 'A';
                int intZ = 'Z';
                int intCount = 0;
                int intRandomNumber = 0;
                //string strCaptchaString = "";

                Random random = new Random(System.DateTime.Now.Millisecond);

                while (intCount < 10)
                {
                    intRandomNumber = random.Next(intZero, intZ);
                    if (((intRandomNumber >= intZero) && (intRandomNumber <= intNine) || (intRandomNumber >= intA) && (intRandomNumber <= intZ)))
                    {
                        strCaptchaString = strCaptchaString + (char)intRandomNumber;
                        intCount = intCount + 1;
                    }
                }

                return strCaptchaString;

            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetCaptchaString")]
        public string GetCaptchaString(string SessionId)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string strCaptchaString = "";
                //int intZero = '0';
                //int intNine = '9';
                int intA = 'A';
                int intZ = 'Z';
                int intCount = 0;
                int intRandomNumber = 0;
                //string strCaptchaString = "";

                Random random = new Random(System.DateTime.Now.Millisecond);

                while (intCount < 5)
                {
                    intRandomNumber = random.Next(intA, intZ);
                    if ((intRandomNumber >= intA) && (intRandomNumber <= intZ))
                    {
                        strCaptchaString = strCaptchaString + (char)intRandomNumber;
                        intCount = intCount + 1;
                    }
                }
                SetSessionId(SessionId, strCaptchaString);
                var skyblue = System.Drawing.ColorTranslator.FromHtml("#1F497D");
                //var white = System.Drawing.ColorTranslator.FromHtml("linear-gradient(90deg, rgba(237,245,255,1) 0%, rgba(204,223,247,1) 100%)");
                string str = ConvertTextToImage(strCaptchaString, "sans-serif", 35, Color.White, skyblue, 250, 65).ToString();

                List<person> p = new List<person>();
                person p1 = new person();

                p1.Image = str;
                //p1.Text = strCaptchaString;
                p.Add(p1);

                return JsonConvert.SerializeObject(p);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetExamCentreType")]
        public string GetExamCentreType()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_ExaminationCentreTypes";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_ExaminationCentreTypes", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetExamCentreCategories")]
        public string GetExamCentreCategories()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_ExaminationCentreCategories";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_ExaminationCentreCategories", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetDistrictsbyState")]
        public string GetDistrictsbyState(int DataType, int StateID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@StateID", StateID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Districts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetPreference1Districts")]
        public HttpResponseMessage GetPreference1Districts()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_PreferenceDistricts";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_PreferenceDistricts", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetPreference2Districts")]
        public HttpResponseMessage GetPreference2Districts()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_PreferenceDistricts";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_PreferenceDistricts", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetPreference3Districts")]
        public HttpResponseMessage GetPreference3Districts()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_PreferenceDistricts";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_PreferenceDistricts", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetMandalsbyDistrict")]
        public string GetMandalsbyDistrict(int DistrictID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Mandals", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetPreference1Mandals")]
        public string GetPreference1Mandals(int DistrictID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PreferenceMandals", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetPreference2Mandals")]
        public string GetPreference2Mandals(int DistrictID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PreferenceMandals", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetPreference3Mandals")]
        public string GetPreference3Mandals(int DistrictID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PreferenceMandals", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("GetDistricts")]
        public string GetDistricts()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_CoordinatingDistricts";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CoordinatingDistricts", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetEditDistricts")]
        public string GetEditDistricts(int CoordinatingCentreID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CoordinatingCentreID", CoordinatingCentreID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_CoordinatingDistricts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEditMandals")]
        public string GetEditMandals(int DistrictID, int CoordinatingCentreID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DistrictID", DistrictID);
                param[1] = new SqlParameter("@CoordinatingCentreID", CoordinatingCentreID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_CoordinatingMandals", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEditExaminationDistricts")]
        public string GetEditExaminationDistricts(int ExaminationCentreID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_ExaminationCentreDistricts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEditExamCentreMandals")]
        public string GetEditExamCentreMandals(int DistrictID, int ExaminationCentreID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DistrictID", DistrictID);
                param[1] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_ExaminationCentreMandals", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetExaminationDistricts")]
        public string GetExaminationDistricts(string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExaminationCentreDistricts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetCentreMandals")]
        public string GetCentreMandals(JsonObject data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", data["DistrictID"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_MandalsForCoordinatingCentres", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEditCoordinatingMandals")]
        public string GetEditCoordinatingMandals(string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExaminationCentreDistricts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpPost, ActionName("GetCoordinatingCentreMandals")]
        public HttpResponseMessage GetCoordinatingCentreMandals([FromBody] MandalInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", data.DistrictID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_MandalsForCoordinatingCentres", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_MandalsForCoordinatingCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("GetCoordinatingAddressDistricts")]
        public HttpResponseMessage GetCoordinatingAddressDistricts([FromBody] MandalInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", data.DistrictID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_CoordinatingAddressDistricts", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CoordinatingAddressDistricts", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("GetCoordinatingAddressMandals")]
        public HttpResponseMessage GetCoordinatingAddressMandals([FromBody] MandalInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DistrictID", data.DistrictID);
                param[1] = new SqlParameter("@MandalID", data.MandalID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_CoordinatingAddressMandals", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CoordinatingAddressMandals", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("GetExamCentreMandals")]
        public HttpResponseMessage GetExamCentreMandals([FromBody] MandalInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DistrictID", data.DistrictID);
                param[1] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_MandalsForExaminationCentres", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_MandalsForExaminationCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        public class CentresInfo
        {
            public int DataType { get; set; }
            public string DistrictID { get; set; }
            public int CoordinatingCentreID { get; set; }
            public int RegistrationID { get; set; }
            public int ExaminationCentreID { get; set; }
            public string UserName { get; set; }
            public string HallticketNumber { get; set; }
            public string SessionId { get; set; }
            public string Captcha { get; set; }

        }

        [HttpPost, ActionName("GetCoordinatingCentres")]
        public HttpResponseMessage GetCoordinatingCentres([FromBody] CentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", data.DistrictID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_MultipleDistrictCoordinatingCentres", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_MultipleDistrictCoordinatingCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        public class ExamCentresInfo
        {
            public string Captcha { get; set; }
            public string SessionId { get; set; }
            public string UserEncryptedPassword { get; set; }
            public string CentreCode { get; set; }
            public int PolycetYearID { get; set; }
            public string ExamCentreCode { get; set; }
            public string HallTicketNumber { get; set; }
            public int DataType { get; set; }
            public int ExaminationCentreID { get; set; }
            public string Latitude { get; set; }
            public string Longitude { get; set; }
            public string CentrePhoto { get; set; }
            public string ExamCentreMobile { get; set; }
            public string UserName { get; set; }
            public int CoordinatingCentreID { get; set; }
            public string CoordinatingCentreCode { get; set; }
            public string RegistrationNumber { get; set; }

        }


        [HttpPost, ActionName("GetExaminationCentres")]
        public HttpResponseMessage GetExaminationCentres([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                // var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", data.SessionId);
                param[1] = new SqlParameter("@UserName", data.UserName);
                param[2] = new SqlParameter("@Captcha", data.Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {

                    var param1 = new SqlParameter[3];
                    param1[0] = new SqlParameter("@DataType", data.DataType);
                    param1[1] = new SqlParameter("@UserName", data.UserName);
                    param1[2] = new SqlParameter("@CoordinatingCentreCode", data.CoordinatingCentreCode);
                    var ds = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_ExaminationCentres", param1);
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ds);
                    return response;
                }
                else
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return response;
                }
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_ExaminationCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        //[HttpGet, ActionName("GetDistCoordinatingCenters")]
        //public string GetDistCoordinatingCenters(int DistrictID)
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@DistrictID", DistrictID);

        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_DistrictCoordinatingCentres", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }
        //}

        //[HttpPost, ActionName("GetCoordinatingCenters")]
        //public string GetCoordinatingCenters()
        //{
        //    var dbHandler = new PolycetdbHandler();
        //    try
        //    {
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_CoordinatingCentres";
        //        var res = dbHandler.ReturnDataSet(StrQuery);
        //        return JsonConvert.SerializeObject(res);
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Get_CoordinatingCentres", 0, ex.Message);
        //        throw ex;
        //    }
        //}

        //[HttpPost, ActionName("GetCoordinatingCenters")]
        //public HttpResponseMessage GetCoordinatingCenters([FromBody] CentresInfo data)
        //{
        //    var dbHandler = new PolycetdbHandler();

        //    try
        //    {

        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@DataType", data.DataType);
        //        var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_CoordinatingCentres", param);
        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Get_CoordinatingCentres", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
        //    }
        //}

        [HttpPost, ActionName("GetCoordinatingCenters")]
        public HttpResponseMessage GetCoordinatingCenters([FromBody] CentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", data.SessionId);
                param[1] = new SqlParameter("@UserName", data.UserName);
                param[2] = new SqlParameter("@Captcha", data.Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {

                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@DataType", data.DataType);
                    var ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_CoordinatingCentres", param1);
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ds);
                    return response;
                }
                else
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return response;
                }
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CoordinatingCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        //[HttpGet, ActionName("AddDistCoordinatingCentre")]
        //public string AddDistCoordinatingCentre(string CentreCode, string CentreName, string CentreAddress, int StateID, int DistrictID, string UserName)
        //{
        //    var dbHandler = new PolycetdbHandler();

        //    try
        //    {
        //        var param = new SqlParameter[6];
        //        param[0] = new SqlParameter("@CentreCode", CentreCode);
        //        param[1] = new SqlParameter("@CentreName", CentreName);
        //        param[2] = new SqlParameter("@CentreAddress", CentreAddress);
        //        param[3] = new SqlParameter("@StateID", StateID);
        //        param[4] = new SqlParameter("@DistrictID", DistrictID);
        //        //param[5] = new SqlParameter("@Active", Active);
        //        param[5] = new SqlParameter("@UserName", UserName);


        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_DistrictCoordinatingCentre", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Add_DistrictCoordinatingCentre", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}

        [HttpGet, ActionName("GetEditDetails")]
        public string GetEditDetails(int CentreID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CentreID", CentreID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_DistrictCoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetEditCoordinatingCentreDetails")]
        public HttpResponseMessage GetEditCoordinatingCentreDetails([FromBody] CentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CoordinatingCentreID", data.CoordinatingCentreID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_CoordinatingCentre", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Edit_CoordinatingCentre", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        public class UpdateCentresInfo
        {
            public int CentreID { get; set; }
            public string CentreCode { get; set; }
            public string CentreName { get; set; }
            public string CentreAddress { get; set; }
            public int StateID { get; set; }
            public int DistrictID { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }

        }

        [HttpPost, ActionName("UpdateDistCoorCentres")]
        public string UpdateDistCoorCentres([FromBody] UpdateCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@CentreID", data.CentreID);
                param[1] = new SqlParameter("@CentreCode", data.CentreCode);
                param[2] = new SqlParameter("@CentreName", data.CentreName);
                param[3] = new SqlParameter("@CentreAddress", data.CentreAddress);
                param[4] = new SqlParameter("@StateID", data.StateID);
                param[5] = new SqlParameter("@DistrictID", data.DistrictID);
                param[6] = new SqlParameter("@Active", data.Active);
                param[7] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_DistrictCoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_DistrictCoordinatingCentre", 0, ex.Message);
                return ex.Message;
            }
        }




        public class CoordinatorsInfo
        {
            public string RouteSequence { get; set; }
            public int RouteNumber { get; set; }
            public int DataType { get; set; }
            public string CoordinatorName { get; set; }
            public string CoordinatorMobile { get; set; }
            public string CoordinatorEmail { get; set; }
            public int CentreID { get; set; }
            public int StateID { get; set; }
            public bool Active { get; set; }
            public string DistrictID { get; set; }
            public string MandalID { get; set; }
            public string UserName { get; set; }
            public string CentreName { get; set; }
            public string Landmark { get; set; }
            public string HouseNumber { get; set; }
            public string StreetName { get; set; }
            public string Locality { get; set; }
            public int CoordinatingCentreID { get; set; }
            public string CentreCode { get; set; }
            public string UserPassword { get; set; }
            public string UserEncryptedPassword { get; set; }

            public string Village { get; set; }
            public int AddressDistrictId { get; set; }
            public int AddressMandalId { get; set; }
            public string Pincode { get; set; }

        }

        [HttpPost, ActionName("AddCoordinatingCentres")]
        public string AddCoordinatingCentres([FromBody] CoordinatorsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[18];
                param[0] = new SqlParameter("@StateID", data.StateID);
                param[1] = new SqlParameter("@DistrictID", data.DistrictID);
                param[2] = new SqlParameter("@MandalID", data.MandalID);
                param[3] = new SqlParameter("@CentreName", data.CentreName);
                param[4] = new SqlParameter("@HouseNumber", data.HouseNumber);
                param[5] = new SqlParameter("@StreetName", data.StreetName);
                param[6] = new SqlParameter("@Locality", data.Locality);
                param[7] = new SqlParameter("@Landmark", data.Landmark);
                param[8] = new SqlParameter("@Village", data.Village);
                param[9] = new SqlParameter("@AddressDistrictId", data.AddressDistrictId);
                param[10] = new SqlParameter("@AddressMandalId", data.AddressMandalId);
                param[11] = new SqlParameter("@Pincode", data.Pincode);
                param[12] = new SqlParameter("@CoordinatorName", data.CoordinatorName);
                param[13] = new SqlParameter("@CoordinatorMobile", data.CoordinatorMobile);
                param[14] = new SqlParameter("@CoordinatorEmail", data.CoordinatorEmail);
                param[15] = new SqlParameter("@RouteNumber", data.RouteNumber);
                param[16] = new SqlParameter("@RouteSequence", data.RouteSequence);
                param[17] = new SqlParameter("@UserName", data.UserName);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_CoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_CoordinatingCentre", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("UpdateorDeleteCoordinatingCentres")]
        public string UpdateorDeleteCoordinatingCentres([FromBody] CoordinatorsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[18];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@CoordinatingCentreID", data.CoordinatingCentreID);
                //param[2] = new SqlParameter("@DistrictID", data.DistrictID);
                //param[3] = new SqlParameter("@MandalID", data.MandalID);
                param[2] = new SqlParameter("@CentreName", data.CentreName);
                param[3] = new SqlParameter("@HouseNumber", data.HouseNumber);
                param[4] = new SqlParameter("@StreetName", data.StreetName);
                param[5] = new SqlParameter("@Locality", data.Locality);
                param[6] = new SqlParameter("@Landmark", data.Landmark);
                param[7] = new SqlParameter("@Village", data.Village);
                param[8] = new SqlParameter("@AddressDistrictId", data.AddressDistrictId);
                param[9] = new SqlParameter("@AddressMandalId", data.AddressMandalId);
                param[10] = new SqlParameter("@Pincode", data.Pincode);
                param[11] = new SqlParameter("@CoordinatorName", data.CoordinatorName);
                param[12] = new SqlParameter("@CoordinatorMobile", data.CoordinatorMobile);
                param[13] = new SqlParameter("@CoordinatorEmail", data.CoordinatorEmail);
                param[14] = new SqlParameter("@Active", data.Active);
                param[15] = new SqlParameter("@RouteNumber", data.RouteNumber);
                param[16] = new SqlParameter("@RouteSequence", data.RouteSequence);
                param[17] = new SqlParameter("@UserName", data.UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_Delete_CoordinatingCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_Delete_CoordinatingCentre", 0, ex.Message);
                return ex.Message;
            }
        }

        //[HttpPost, ActionName("AddCoordinatingCentreUser")]
        //public string AddCoordinatingCentreUser([FromBody] CoordinatorsInfo data)
        //{
        //    var dbHandler = new PolycetdbHandler();
        //    try
        //    {
        //        string UserEncryptedPassword = "";

        //        var res = data.UserEncryptedPassword.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
        //        var crypt = new HbCrypt(res[1]);
        //        var passencrypt = new HbCrypt();
        //        string password = crypt.AesDecrypt(res[0]);
        //        string decryptpassword = passencrypt.AesDecrypt(password);
        //        UserEncryptedPassword = passencrypt.Encrypt(decryptpassword);
        //        var param = new SqlParameter[5];
        //        param[0] = new SqlParameter("@CoordinatingCentreID", data.CoordinatingCentreID);
        //        param[1] = new SqlParameter("@CentreCode", data.CentreCode);
        //        param[2] = new SqlParameter("@UserPassword", data.UserPassword);
        //        param[3] = new SqlParameter("@UserEncryptedPassword", UserEncryptedPassword);           
        //        param[4] = new SqlParameter("@UserName", data.UserName);
        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_CoordinatingCentreUser", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Add_CoordinatingCentreUser", 0, ex.Message);
        //        return ex.Message;
        //    }
        //}



        [HttpPost, ActionName("AddCoordinatingCentreUser")]
        public async Task<HttpResponseMessage> AddCoordinatingCentreUser([FromBody] CoordinatorsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                string UserEncryptedPassword = "";

                var res = data.UserEncryptedPassword.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var passencrypt = new HbCrypt();
                string password = crypt.AesDecrypt(res[0]);
                string decryptpassword = passencrypt.AesDecrypt(password);
                UserEncryptedPassword = passencrypt.Encrypt(decryptpassword);
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@CoordinatingCentreID", data.CoordinatingCentreID);
                param[1] = new SqlParameter("@CentreCode", data.CentreCode);
                param[2] = new SqlParameter("@UserPassword", data.UserPassword);
                param[3] = new SqlParameter("@UserEncryptedPassword", UserEncryptedPassword);
                param[4] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Add_CoordinatingCentreUser", param);
                string Password = "";
                string retMsg = string.Empty;
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    string UserPassword = Convert.ToString(dt.Tables[0].Rows[0]["UserPassword"]);
                    var passcrypt = new HbCrypt();
                    Password = passcrypt.Decrypt(UserEncryptedPassword);
                    string UserName = dt.Tables[0].Rows[0]["UserName"].ToString();
                    string UserMobile = dt.Tables[0].Rows[0]["UserMobile"].ToString();

                    string UserEmail = dt.Tables[0].Rows[0]["UserEmail"].ToString();

                    string ResponseCode = dt.Tables[0].Rows[0]["ResponseCode"].ToString();

                    string ResponseDescription = dt.Tables[0].Rows[0]["ResponseDescription"].ToString();
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var temptateid = "1007167108475678150";
                    var msg = "SBTET POLYCET Portal Login Credentials, User Name =" + UserName + ", Password = " + Password + ", Secretary,SBTET TS.";
                    var Message = string.Format(msg, UserName.Replace("'", "''"), Password);
                    CommunicationController com = new CommunicationController();
                    com.SendSms(UserMobile, msg, temptateid);
                    retMsg = "{\"ResponseCode\":\"" + ResponseCode + "\",\"ResponseDescription\": \"" + ResponseDescription + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);



                }

                else
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, dt);
                }


                return response;
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr(" SP_Add_CoordinatingCentreUser", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        public class ExaminationCentresInfo
        {
            public bool OpenForAllotment { get; set; }
            public int DataType { get; set; }
            public int CentreTypeID { get; set; }
            public string CheifSuperitendentName { get; set; }
            public string CheifSuperitendentMobile { get; set; }
            public string CheifSuperitendentEmail { get; set; }
            public string AsstCheifSuperitendentName { get; set; }
            public string AsstCheifSuperitendentMobile { get; set; }
            public string AsstCheifSuperitendentEmail { get; set; }
            public int CentreID { get; set; }
            public int ExaminationCentreID { get; set; }
            public int StateID { get; set; }
            public bool Active { get; set; }
            public string DistrictID { get; set; }
            public string MandalID { get; set; }
            public string UserName { get; set; }
            public string CentreName { get; set; }
            public string Landmark { get; set; }
            public string HouseNumber { get; set; }
            public string StreetName { get; set; }
            public string Locality { get; set; }
            public int CentreCategoryID { get; set; }
            public bool UrduMedium { get; set; }
            public int CapacityOneperBench { get; set; }
            public int CapacityTwoperBench { get; set; }
            public int PriorityOrder { get; set; }
            public string CentreCode { get; set; }
            public string UserPassword { get; set; }
            public string UserEncryptedPassword { get; set; }

            public string Village { get; set; }
            public int AddressDistrictId { get; set; }
            public int AddressMandalId { get; set; }
            public string Pincode { get; set; }
            public string SuperitendentName { get; set; }
            public string SuperitendentMobile { get; set; }
            public string SuperitendentEmail { get; set; }
            public string AsstSuperitendentName { get; set; }
            public string AsstSuperitendentMobile { get; set; }
            public string AsstSuperitendentEmail { get; set; }
            public int ExamCentreCategoryId { get; set; }
            public int CentreCapacityOneperBench { get; set; }
            public int CentreCapacityTwoperBench { get; set; }
            public int StudentsperBench { get; set; }
            public int TotalCapacity { get; set; }
            public string CoordinatingCentreCode { get; set; }

        }

        [HttpPost, ActionName("AddExaminationCentres")]
        public string AddExaminationCentres([FromBody] ExaminationCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[22];
                //param[0] = new SqlParameter("@DistrictID", data.DistrictID);
                //param[1] = new SqlParameter("@MandalID", data.MandalID);
                param[0] = new SqlParameter("@CentreName", data.CentreName);
                param[1] = new SqlParameter("@CentreTypeID", data.CentreTypeID);
                param[2] = new SqlParameter("@HouseNumber", data.HouseNumber);
                param[3] = new SqlParameter("@StreetName", data.StreetName);
                param[4] = new SqlParameter("@Locality", data.Locality);
                param[5] = new SqlParameter("@Landmark", data.Landmark);
                param[6] = new SqlParameter("@Village", data.Village);
                param[7] = new SqlParameter("@AddressDistrictId", data.AddressDistrictId);
                param[8] = new SqlParameter("@AddressMandalId", data.AddressMandalId);
                param[9] = new SqlParameter("@Pincode", data.Pincode);
                param[10] = new SqlParameter("@CentreCategoryID", data.CentreCategoryID);
                param[11] = new SqlParameter("@UrduMedium", data.UrduMedium);
                param[12] = new SqlParameter("@StudentsperBench", data.StudentsperBench);
                param[13] = new SqlParameter("@TotalCapacity", data.TotalCapacity);
                //param[16] = new SqlParameter("@PriorityOrder", data.PriorityOrder);
                param[14] = new SqlParameter("@CheifSuperitendentName", data.CheifSuperitendentName);
                param[15] = new SqlParameter("@CheifSuperitendentMobile", data.CheifSuperitendentMobile);
                param[16] = new SqlParameter("@CheifSuperitendentEmail", data.CheifSuperitendentEmail);
                param[17] = new SqlParameter("@AsstCheifSuperitendentName", data.AsstCheifSuperitendentName);
                param[18] = new SqlParameter("@AsstCheifSuperitendentMobile", data.AsstCheifSuperitendentMobile);
                param[19] = new SqlParameter("@AsstCheifSuperitendentEmail", data.AsstCheifSuperitendentEmail);
                param[20] = new SqlParameter("@UserName", data.UserName);
                param[21] = new SqlParameter("@CoordinatingCentreCode", data.CoordinatingCentreCode);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_ExaminationCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_ExaminationCentre", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetEditExaminationCentreDetails")]
        public HttpResponseMessage GetEditExaminationCentreDetails([FromBody] ExaminationCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_ExaminationCentre", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Edit_ExaminationCentre", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("UpdateorDeleteExaminationCentres")]
        public string UpdateorDeleteExaminationCentres([FromBody] ExaminationCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[24];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                param[2] = new SqlParameter("@CentreName", data.CentreName);
                param[3] = new SqlParameter("@HouseNumber", data.HouseNumber);
                param[4] = new SqlParameter("@StreetName", data.StreetName);
                param[5] = new SqlParameter("@Locality", data.Locality);
                param[6] = new SqlParameter("@Landmark", data.Landmark);
                param[7] = new SqlParameter("@Village", data.Village);
                param[8] = new SqlParameter("@AddressDistrictId", data.AddressDistrictId);
                param[9] = new SqlParameter("@AddressMandalId", data.AddressMandalId);
                param[10] = new SqlParameter("@Pincode", data.Pincode);
                param[11] = new SqlParameter("@ExamCentreCategoryId", data.ExamCentreCategoryId);
                param[12] = new SqlParameter("@UrduMedium", data.UrduMedium);
                param[13] = new SqlParameter("@StudentsperBench", data.StudentsperBench);
                param[14] = new SqlParameter("@TotalCapacity", data.TotalCapacity); ;
                param[15] = new SqlParameter("@PriorityOrder", data.PriorityOrder);
                param[16] = new SqlParameter("@SuperitendentName", data.SuperitendentName);
                param[17] = new SqlParameter("@SuperitendentMobile", data.SuperitendentMobile);
                param[18] = new SqlParameter("@SuperitendentEmail", data.SuperitendentEmail);
                param[19] = new SqlParameter("@AsstSuperitendentName", data.AsstSuperitendentName);
                param[20] = new SqlParameter("@AsstSuperitendentMobile", data.AsstSuperitendentMobile);
                param[21] = new SqlParameter("@AsstSuperitendentEmail", data.AsstSuperitendentEmail);
                param[22] = new SqlParameter("@Active", data.@Active);
                param[23] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_Delete_ExaminationCentre", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_Delete_ExaminationCentre", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetSessionId")]
        public string SetSessionId(string SessionId, string Captcha)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {

                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@SessionId", SessionId);
                param[1] = new SqlParameter("@Captcha", Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_ExamsCaptchaSessionLog", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_SET_ExamsCaptchaSessionLog", 0, ex.Message);
                return ex.Message;
            }
        }


        public string ConvertTextToImage(string txt, string fontname, int fontsize, Color bgcolor, Color fcolor, int width, int Height)
        {
            Bitmap bmp = new Bitmap(width, Height);
            using (Graphics graphics = Graphics.FromImage(bmp))
            {

                Font font = new Font(fontname, fontsize);
                graphics.FillRectangle(new SolidBrush(bgcolor), 0, 0, bmp.Width, bmp.Height);
                graphics.DrawString(txt, font, new SolidBrush(fcolor), 0, 0);
                graphics.Flush();
                font.Dispose();
                graphics.Dispose();


            }
            Bitmap bImage = bmp;  // Your Bitmap Image
            System.IO.MemoryStream ms = new MemoryStream();
            bImage.Save(ms, ImageFormat.Jpeg);
            byte[] byteImage = ms.ToArray();
            var SigBase64 = Convert.ToBase64String(byteImage);
            return SigBase64;

        }



        [HttpPost, ActionName("ValidateCaptcha")]
        public string ValidateCaptcha(JsonObject data)
        {
            var dbHandler = new PolycetdbHandler();
            List<Output> p = new List<Output>();
            Output p1 = new Output();
            var captcha = string.Empty;
            try
            {


                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@SessionId", data["SessionId"]);
                param[1] = new SqlParameter("@Captcha", data["Captcha"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_ExamsCaptchaSessionLog", param);

                if (dt.Rows[0]["ResponseCode"].ToString() == "200")
                {
                    captcha = GetCaptchaString(data["SessionId"].ToString());
                    p1.ResponceCode = dt.Rows[0]["ResponseCode"].ToString();
                    p1.ResponceDescription = dt.Rows[0]["ResponseDescription"].ToString();
                    p1.Captcha = captcha;
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);

                }
                else
                {
                    captcha = GetCaptchaString(data["SessionId"].ToString());
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = dt.Rows[0]["ResponseDescription"].ToString();
                    p1.Captcha = captcha;
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }

            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_GET_ExamsCaptchaSessionLog", 0, ex.Message);
                captcha = GetCaptchaString(data["SessionId"].ToString());
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p1.Captcha = captcha;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
                //return ex.Message;
            }
        }
        internal class Output
        {
            public string ResponceCode { get; internal set; }
            public string ResponceDescription { get; internal set; }
            public string Captcha { get; internal set; }
        }


        //        [HttpPost, ActionName("GetCasteDetails")]
        //        public async Task<HttpResponseMessage> GetCasteDetails([FromBody] SscDetails ReqData)
        //        {

        //            var url = ConfigurationManager.AppSettings["MEESEVA_API"].ToString();
        //            var urlwithparam = url + "?Applno=" + ReqData.Applno + "&Aadhar_no=" + ReqData.Aadhar_no;
        //            using (HttpClient client = new HttpClient())
        //            {
        //                try
        //                {
        //                    HttpResponseMessage response = new HttpResponseMessage();
        //                    var resMsg = await client.GetAsync(urlwithparam);
        //                    var content = await resMsg.Content.ReadAsStringAsync();
        //                    XmlDocument PIDResponseXML = new XmlDocument();
        //                    PIDResponseXML.LoadXml(content);

        //                    if (PIDResponseXML.InnerXml.Length != 22)
        //{
        //                        XDocument d = XDocument.Parse(content);
        //                        d.Root.Descendants().Attributes().Where(x => x.IsNamespaceDeclaration).Remove();

        //                        foreach (var elem in d.Descendants())
        //                            elem.Name = elem.Name.LocalName;

        //                        var xmlDocument = new XmlDocument();
        //                        xmlDocument.Load(d.CreateReader());
        //                         var res =xmlDocument.InnerText.ToString();
        //                        //return xmlDocument;
        //                        try
        //                        {
        //                          //  var json = JsonConvert.SerializeXmlNode(PIDResponseXML, Formatting.None, true);
        //                            var jsonData = JsonConvert.SerializeXmlNode(PIDResponseXML, Newtonsoft.Json.Formatting.None, true);
        //                            return Request.CreateResponse(HttpStatusCode.OK, res);
        //                        }
        //                        catch (Exception ex)
        //                        {
        //                            var jsonData = JsonConvert.SerializeXmlNode(PIDResponseXML, Newtonsoft.Json.Formatting.None, true);
        //                            return Request.CreateResponse(HttpStatusCode.OK, jsonData);
        //                        }

        //                        //if (RESULT == "PASS")
        //                        //{
        //                        //    response = Request.CreateResponse(HttpStatusCode.OK);
        //                        //    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"200\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
        //                        //    return response;
        //                        //}
        //                        //else
        //                        //{
        //                        //    response = Request.CreateResponse(HttpStatusCode.OK);
        //                        //    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
        //                        //    return response;
        //                        //}
        //                    }
        //                    else
        //                    {
        //                        response = Request.CreateResponse(HttpStatusCode.OK);
        //                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"No Data Found\" }"), System.Text.Encoding.UTF8, "application/json");
        //                        return response;
        //                    }

        //                }
        //                catch (Exception ex)
        //                {
        //                    var response = Request.CreateResponse(HttpStatusCode.NotFound);
        //                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
        //                    return response;
        //                }

        //            }
        //        }

        public class SscDetails
        {
            public string Applno { get; set; }
            public string Aadhar_no { get; set; }
        }

        [HttpGet, ActionName("GetNotifications")]
        public string GetNotifications()
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Notifications";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_Notifications", 0, ex.Message);
                return ex.Message;
            }
        }

        //[HttpGet, ActionName("GetPolycetYears")]
        //public string GetPolycetYears()
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_PolycetYears";
        //        var res = dbHandler.ReturnDataSet(StrQuery);
        //        return JsonConvert.SerializeObject(res);
        //    }
        //    catch (Exception ex)
        //    {
        //        PolycetdbHandler.SaveErorr("SP_Get_PolycetYears", 0, ex.Message);
        //        return ex.Message;
        //    }
        //}

        [HttpGet, ActionName("GetPolycetYears")]
        public string GetPolycetYears(int DataType, int PolycetYearID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PolycetYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        public class PolycetYearData
        {
            public int DataType { get; set; }
            public int PolycetYearID { get; set; }

            public int PolycetYear { get; set; }
            public bool CurrentPolycetYear { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }

        }



        //[HttpGet, ActionName("GetEditPolycetYear")]
        //public string GetEditPolycetYear(int PolycetYearID)
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@PolycetYearID", PolycetYearID);

        //        var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_PolycetYears", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }
        //}



        [HttpPost, ActionName("AddorUpdatePolycetYear")]
        public string AddorUpdatePolycetYear([FromBody] PolycetYearData data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@PolycetYearID", data.PolycetYearID);
                param[2] = new SqlParameter("@PolycetYear", data.PolycetYear);
                param[3] = new SqlParameter("@CurrentPolycetYear", data.CurrentPolycetYear);
                param[4] = new SqlParameter("@Active", data.Active);
                param[5] = new SqlParameter("@UserName", data.UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_PolycetYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_PolycetYear", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetCasteDetails")]
        public async Task<HttpResponseMessage> GetCasteDetails([FromBody] CasteDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["MEESEVA_API"].ToString();
            //var urlwithparam = url + "?applicationNo=" + ReqData.applicationNo + "&userid=" + ReqData.userid;
            //using (HttpClient client = new HttpClient())

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.PostAsJsonAsync(RequestURI, ReqData).Result;
            return response;

        }



        public class CasteDetails
        {
            public string applicationNo { get; set; }
            public string userid { get; set; }
        }

        public class FeeAmountsInfo
        {
            public int DataType { get; set; }
            public int FeeAmountID { get; set; }
            public int PolycetYearID { get; set; }
            public string SCSTFee { get; set; }
            public string OthersFee { get; set; }

            public string LateFee { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("AddorUpdateFeeAmounts")]
        public string AddorUpdateFeeAmounts([FromBody] FeeAmountsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@PolycetYearID", data.PolycetYearID);
                param[2] = new SqlParameter("@FeeAmountID", data.FeeAmountID);
                param[3] = new SqlParameter("@SCSTFee", data.SCSTFee);
                param[4] = new SqlParameter("@OthersFee", data.OthersFee);
                param[5] = new SqlParameter("@LateFee", data.LateFee);
                param[6] = new SqlParameter("@Active", data.Active);
                param[7] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_FeeAmounts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Add_Update_FeeAmounts", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetFeeAmounts")]
        public string GetFeeAmounts(int DataType, int PolycetYearID, int FeeAmountID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@PolycetYearID", PolycetYearID);
                param[2] = new SqlParameter("@FeeAmountID", FeeAmountID);


                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_FeeAmounts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        public class UserTypesInfo
        {
            public string UserTypeName { get; set; }
            public string UserName { get; set; }
            public int UserTypeID { get; set; }
            public int DataType { get; set; }
            public bool Active { get; set; }
        }

        [HttpPost, ActionName("AddorUpdateUserTypes")]
        public string AddorUpdateUserTypes([FromBody] UserTypesInfo data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[2] = new SqlParameter("@UserTypeName", data.UserTypeName);
                param[3] = new SqlParameter("@Active", data.Active);
                param[4] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_UserTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Update_UserTypes", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("GetorActiveUserTypes")]
        public string GetorActiveUserTypes([FromBody] UserTypesInfo data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", data.DataType);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_UserTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_UserTypes", 0, ex.Message);
                return ex.Message;
            }

        }

        //[HttpGet, ActionName("GetUserTypes")]
        //public HttpResponseMessage GetUserTypes()
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_UserTypes";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        PolycetdbHandler.SaveErorr("SP_Get_UserTypes", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost, ActionName("EditorViewUserTypes")]
        public HttpResponseMessage EditorViewUserTypes([FromBody] UserTypesInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", data.UserTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_UserTypes", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Edit_UserTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }



        public class UsersInfo
        {
            public int DataType { get; set; }
            public int UserID { get; set; }
            public int UserTypeID { get; set; }
            public string NewUserName { get; set; }
            public string UserPassword { get; set; }
            public string NameofUser { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }
            public string UserName { get; set; }
            public bool Active { get; set; }



        }

        [HttpPost, ActionName("AddUser")]
        public string AddUser([FromBody] UsersInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string UserEncryptedPassword = "";

                var res = data.UserPassword.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var passencrypt = new HbCrypt();
                string password = crypt.AesDecrypt(res[0]);
                string decryptpassword = passencrypt.AesDecrypt(password);
                UserEncryptedPassword = passencrypt.Encrypt(decryptpassword);
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[1] = new SqlParameter("@NewUserName", data.NewUserName);
                param[2] = new SqlParameter("@UserPassword", UserEncryptedPassword);
                param[3] = new SqlParameter("@NameofUser", data.NameofUser);
                param[4] = new SqlParameter("@MobileNumber", data.MobileNumber);
                param[5] = new SqlParameter("@Email", data.Email);
                param[6] = new SqlParameter("@UserName", data.UserName);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_User", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_User", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpPost, ActionName("UpdateUserDetails")]
        public string UpdateUserDetails([FromBody] UsersInfo newdata)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {

                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@UserID", newdata.UserID);
                param[1] = new SqlParameter("@NewUserName", newdata.NewUserName);
                param[2] = new SqlParameter("@UserTypeID", newdata.UserTypeID);
                param[3] = new SqlParameter("@NameofUser", newdata.NameofUser);
                param[4] = new SqlParameter("@Email", newdata.Email);
                param[5] = new SqlParameter("@MobileNumber", newdata.MobileNumber);
                param[6] = new SqlParameter("@Active", newdata.Active);
                param[7] = new SqlParameter("@UserName", newdata.UserName);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_User", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_User", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetUsers")]
        public HttpResponseMessage GetUsers([FromBody] UsersInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", data.UserTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Users", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Users", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("GetEditorViewUsers")]
        public HttpResponseMessage GetEditorViewUsers([FromBody] UsersInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserID", data.UserID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Users", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Edit_Users", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }

        public class person1
        {
            public string ResponseCode { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
            public string file { get; set; }
            public string Barcode { get; set; }

        }

        [HttpGet, ActionName("GetCoordinatingCentresExcel")]
        public string GetCoordinatingCentresExcel(int DataType,string UserName,string SessionId,string Captcha)
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

                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@DataType", DataType);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_CoordinatingCentres", param1);
                    if (ds.Tables[0].Rows.Count > 0 && DataType == 2)

                    {
                        var filename = "Coordinating_Centres_Report" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }

                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 4)

                    {
                        var filename = "Student_AllotedReport_Districtwise" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }

                    else
                    {
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = "";
                        p1.ResponceCode = "400";
                        p1.ResponceDescription = "Data not Found";
                        p.Add(p1);
                        return JsonConvert.SerializeObject(p);
                    }

                }
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CoordinatingCentres", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetExaminationCentresExcel")]
        public string GetExaminationCentresExcel(int DataType, string UserName, string CoordinatingCentreCode,string SessionId,string Captcha)
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

                    var param1 = new SqlParameter[3];
                    param1[0] = new SqlParameter("@DataType", DataType);
                    param1[1] = new SqlParameter("@UserName", UserName);
                    param1[2] = new SqlParameter("@CoordinatingCentreCode", CoordinatingCentreCode);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExaminationCentres", param1);
                    
                    
                    if (ds.Tables[0].Rows.Count > 0 && DataType == 3)
                    {
                        var filename = "Examination_Centres_Report" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }

                    else if ((ds.Tables[0].Rows.Count > 0 && DataType == 2) || (ds.Tables[0].Rows.Count > 0 && DataType == 5))
                    {
                        var filename = "Report" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }

                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 8)
                    {
                        var filename = "Student_AllotedReport_ExamCentrewise" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }

                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 9)
                    {
                        var filename = "Alloted_Report" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }

                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 12)
                    {
                        var filename = "QP_Report" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }

                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 14)
                    {
                        var filename = "Center_Locator_Report" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }

                    return JsonConvert.SerializeObject(ds);

                   

                }
                else
                {
                    List<person1> p = new List<person1>();
                    person1 p1 = new person1();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }

            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_ExaminationCentres", 0, ex.Message);
                return ex.Message;
            }

        }

        private string GetWebAppRoot()
        {
            var env = ConfigurationManager.AppSettings["SMS_ENV"].ToString();
            string host = (HttpContext.Current.Request.Url.IsDefaultPort) ?
               HttpContext.Current.Request.Url.Host :
               HttpContext.Current.Request.Url.Authority;
            if (env == "PROD")
            {
                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + "/";
            }
            else if (env == "DEV")
            {

                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + HttpContext.Current.Request.ApplicationPath;
            }
            return host + "/";
        }



        [HttpGet, ActionName("GetFeePaymentReportsExcel")]
        public string GetFeePaymentReportsExcel(DateTime FromDate, DateTime ToDate)
        {

            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@FromDate", FromDate);
                param[1] = new SqlParameter("@ToDate", ToDate);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_FeePaymentReport", param);
                if (ds.Tables[0].Rows.Count > 0)

                {
                    var filename = "FeePayment_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(60000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person1> p = new List<person1>();
                    person1 p1 = new person1();
                    p1.file = file;
                    p1.ResponceCode = "200";
                    p1.ResponceDescription = "Data Found";
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person1> p = new List<person1>();
                    person1 p1 = new person1();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_FeePaymentReport", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("GetQualifiedExams")]
        public string GetQualifiedExams()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_QualifiedExams";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_QualifiedExams", 0, ex.Message);
                throw ex;
            }
        }


        [HttpPost, ActionName("GetTenthYears")]
        public string GetTenthYears()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_TenthYears";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_TenthYears", 0, ex.Message);
                throw ex;
            }
        }

        public class StudentDetailsInfo
        {

            public string HallicketNo { get; set; }
            public string HallticketNo { get; set; }
            public string UserName { get; set; }
            public int DataType { get; set; }
            public bool SscPhotoType { get; set; }

            public bool PhotoUpdate { get; set; }

            public bool SscSignType { get; set; }
            public bool SSCPhoto { get; set; }
            public bool SSCSign { get; set; }
            public bool SSCVerified { get; set; }
            public string DateOfBirthText { get; set; }
            public int RegistrationID { get; set; }
            public string RegistrationNumber { get; set; }
            public int QualifiedExamID { get; set; }
            public string TenthHallticketNumber { get; set; }
            public string TenthYear { get; set; }
            public string ExaminationType { get; set; }
            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MotherName { get; set; }
            public string DateofBirth { get; set; }
            public string Gender { get; set; }
            public string MobileNumber { get; set; }
            public string AlternateMobileNumber { get; set; }
            public string Email { get; set; }
            public string HouseNumber { get; set; }
            public string StreetName { get; set; }
            public string Locality { get; set; }
            public string Landmark { get; set; }
            public string Village { get; set; }
            public int StateID { get; set; }
            public int DistrictID { get; set; }
            public string DistrictName { get; set; }
            public int MandalID { get; set; }
            public string MandalName { get; set; }
            public int Pincode { get; set; }
            public int CasteCategoryID { get; set; }
            public string AadharNumber { get; set; }
            public string CasteCertificateNumber { get; set; }

            public bool CasteVerified { get; set; }
            public bool EWS { get; set; }
            public string EWSNumber { get; set; }
            public bool EWSVerified { get; set; }
            public int RegionID { get; set; }
            public int MinorityID { get; set; }
            public bool AssistanceinUrdu { get; set; }
            public bool PH { get; set; }
            public bool NCC { get; set; }
            public bool SportsAndGames { get; set; }
            public bool CAP { get; set; }
            public bool PMCares { get; set; }
            public bool AppearedForBiology { get; set; }
            public int PreferenceDistrictID1 { get; set; }
            public int PreferenceMandalID1 { get; set; }
            public int PreferenceDistrictID2 { get; set; }
            public int PreferenceMandalID2 { get; set; }
            public int PreferenceDistrictID3 { get; set; }
            public int PreferenceMandalID3 { get; set; }
            public string Class1Year { get; set; }
            public int Class1StateID { get; set; }
            public int Class1DistrictID { get; set; }
            public string Class1Place { get; set; }
            public string Class2Year { get; set; }
            public int Class2StateID { get; set; }
            public int Class2DistrictID { get; set; }
            public string Class2Place { get; set; }
            public string Class3Year { get; set; }
            public int Class3StateID { get; set; }
            public int Class3DistrictID { get; set; }
            public string Class3Place { get; set; }
            public string Class4Year { get; set; }
            public int Class4StateID { get; set; }
            public int Class4DistrictID { get; set; }
            public string Class4Place { get; set; }
            public string Class5Year { get; set; }
            public int Class5StateID { get; set; }
            public int Class5DistrictID { get; set; }
            public string Class5Place { get; set; }
            public string Class6Year { get; set; }
            public int Class6StateID { get; set; }
            public int Class6DistrictID { get; set; }
            public string Class6Place { get; set; }

            public string Class7Year { get; set; }
            public int Class7StateID { get; set; }
            public int Class7DistrictID { get; set; }
            public string Class7Place { get; set; }
            public string Class8Year { get; set; }
            public int Class8StateID { get; set; }
            public int Class8DistrictID { get; set; }
            public string Class8Place { get; set; }
            public string Class9Year { get; set; }
            public int Class9StateID { get; set; }
            public int Class9DistrictID { get; set; }
            public string Class9Place { get; set; }
            public string Class10Year { get; set; }
            public int Class10StateID { get; set; }
            public int Class10DistrictID { get; set; }
            public string Class10Place { get; set; }
            public string StudentPhoto { get; set; }
            public string StudentSignature { get; set; }




        }

        [HttpPost, ActionName("AddStudentDetails")]
        public string AddStudentDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\POLYCETSTATICFILES\";
                var path = string.Empty;
                string relativePath = string.Empty;
                var StudentPhotopath = string.Empty;
                var StudentSignaturepath = string.Empty;

                if (data.StudentPhoto != "")
                {
                    var StdPhoto = "StudentPhoto" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdPhoto);
                    byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentPhotopath = relativePath;
                }
                else
                {
                    StudentPhotopath = "";
                }

                if (data.StudentSignature != "")
                {
                    var StdSign = "StudentSign" + "_" + $"{Guid.NewGuid().ToString()}.jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSign);
                    byte[] Bytes = Convert.FromBase64String(data.StudentSignature);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    StudentSignaturepath = relativePath;
                }
                else
                {
                    StudentSignaturepath = "";
                }

                var param = new SqlParameter[89];

                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@QualifiedExamID", data.QualifiedExamID);
                param[3] = new SqlParameter("@TenthHallticketNumber", data.TenthHallticketNumber);
                param[4] = new SqlParameter("@TenthYear", data.TenthYear);
                param[5] = new SqlParameter("@ExaminationType", data.ExaminationType);
                param[6] = new SqlParameter("@StudentName", data.StudentName);
                param[7] = new SqlParameter("@FatherName", data.FatherName);
                param[8] = new SqlParameter("@MotherName", data.MotherName);
                param[9] = new SqlParameter("@DateofBirth", data.DateofBirth);
                param[10] = new SqlParameter("@Gender", data.Gender);
                param[11] = new SqlParameter("@MobileNumber", data.MobileNumber);
                param[12] = new SqlParameter("@AlternateMobileNumber", data.AlternateMobileNumber);
                param[13] = new SqlParameter("@Email", data.Email);
                param[14] = new SqlParameter("@HouseNumber", data.HouseNumber);
                param[15] = new SqlParameter("@StreetName", data.StreetName);
                param[16] = new SqlParameter("@Locality", data.Locality);
                param[17] = new SqlParameter("@Landmark", data.Landmark);
                param[18] = new SqlParameter("@Village", data.Village);
                param[19] = new SqlParameter("@StateID", data.StateID);
                param[20] = new SqlParameter("@DistrictID", data.DistrictID);
                param[21] = new SqlParameter("@DistrictName", data.DistrictName);
                param[22] = new SqlParameter("@MandalID", data.MandalID);
                param[23] = new SqlParameter("@MandalName", data.MandalName);
                param[24] = new SqlParameter("@Pincode", data.Pincode);
                param[25] = new SqlParameter("@CasteCategoryID", data.CasteCategoryID);
                param[26] = new SqlParameter("@AadharNumber", data.AadharNumber);
                param[27] = new SqlParameter("@CasteCertificateNumber", data.CasteCertificateNumber);
                param[28] = new SqlParameter("@CasteVerified", data.CasteVerified);
                param[29] = new SqlParameter("@EWS", data.EWS);
                param[30] = new SqlParameter("@EWSNumber", data.EWSNumber);
                param[31] = new SqlParameter("@EWSVerified", data.EWSVerified);
                param[32] = new SqlParameter("@RegionID", data.RegionID);
                param[33] = new SqlParameter("@MinorityID", data.MinorityID);
                param[34] = new SqlParameter("@AssistanceinUrdu", data.AssistanceinUrdu);
                param[35] = new SqlParameter("@PH", data.PH);
                param[36] = new SqlParameter("@NCC", data.NCC);
                param[37] = new SqlParameter("@SportsAndGames", data.SportsAndGames);
                param[38] = new SqlParameter("@CAP", data.CAP);
                param[39] = new SqlParameter("@PMCares", data.PMCares);
                param[40] = new SqlParameter("@AppearedForBiology", data.AppearedForBiology);
                param[41] = new SqlParameter("@PreferenceDistrictID1", data.PreferenceDistrictID1);
                param[42] = new SqlParameter("@PreferenceMandalID1", data.PreferenceMandalID1);
                param[43] = new SqlParameter("@PreferenceDistrictID2", data.PreferenceDistrictID2);
                param[44] = new SqlParameter("@PreferenceMandalID2", data.PreferenceMandalID2);
                param[45] = new SqlParameter("@PreferenceDistrictID3", data.PreferenceDistrictID3);
                param[46] = new SqlParameter("@PreferenceMandalID3", data.PreferenceMandalID3);
                param[47] = new SqlParameter("@Class1Year", data.Class1Year);
                param[48] = new SqlParameter("@Class1StateID", data.Class1StateID);
                param[49] = new SqlParameter("@Class1DistrictID", data.Class1DistrictID);
                param[50] = new SqlParameter("@Class1Place", data.Class1Place);
                param[51] = new SqlParameter("@Class2Year", data.Class2Year);
                param[52] = new SqlParameter("@Class2StateID", data.Class2StateID);
                param[53] = new SqlParameter("@Class2DistrictID", data.Class2DistrictID);
                param[54] = new SqlParameter("@Class2Place", data.Class2Place);
                param[55] = new SqlParameter("@Class3Year", data.Class3Year);
                param[56] = new SqlParameter("@Class3StateID", data.Class3StateID);
                param[57] = new SqlParameter("@Class3DistrictID", data.Class3DistrictID);
                param[58] = new SqlParameter("@Class3Place", data.Class3Place);
                param[59] = new SqlParameter("@Class4Year", data.Class4Year);
                param[60] = new SqlParameter("@Class4StateID", data.Class4StateID);
                param[61] = new SqlParameter("@Class4DistrictID", data.Class4DistrictID);
                param[62] = new SqlParameter("@Class4Place", data.Class4Place);
                param[63] = new SqlParameter("@Class5Year", data.Class5Year);
                param[64] = new SqlParameter("@Class5StateID", data.Class5StateID);
                param[65] = new SqlParameter("@Class5DistrictID", data.Class5DistrictID);
                param[66] = new SqlParameter("@Class5Place", data.Class5Place);
                param[67] = new SqlParameter("@Class6Year", data.Class6Year);
                param[68] = new SqlParameter("@Class6StateID", data.Class6StateID);
                param[69] = new SqlParameter("@Class6DistrictID", data.Class6DistrictID);
                param[70] = new SqlParameter("@Class6Place", data.Class6Place);
                param[71] = new SqlParameter("@Class7Year", data.Class7Year);
                param[72] = new SqlParameter("@Class7StateID", data.Class7StateID);
                param[73] = new SqlParameter("@Class7DistrictID", data.Class7DistrictID);
                param[74] = new SqlParameter("@Class7Place", data.Class7Place);
                param[75] = new SqlParameter("@Class8Year", data.Class8Year);
                param[76] = new SqlParameter("@Class8StateID", data.Class8StateID);
                param[77] = new SqlParameter("@Class8DistrictID", data.Class8DistrictID);
                param[78] = new SqlParameter("@Class8Place", data.Class8Place);
                param[79] = new SqlParameter("@Class9Year", data.Class9Year);
                param[80] = new SqlParameter("@Class9StateID", data.Class9StateID);
                param[81] = new SqlParameter("@Class9DistrictID", data.Class9DistrictID);
                param[82] = new SqlParameter("@Class9Place", data.Class9Place);
                param[83] = new SqlParameter("@Class10Year", data.Class10Year);
                param[84] = new SqlParameter("@Class10StateID", data.Class10StateID);
                param[85] = new SqlParameter("@Class10DistrictID", data.Class10DistrictID);
                param[86] = new SqlParameter("@Class10Place", data.Class10Place);
                param[87] = new SqlParameter("@StudentPhoto", StudentPhotopath);
                param[88] = new SqlParameter("@StudentSignature", StudentSignaturepath);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_StudentDetails", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpPost, ActionName("GetStudentDetails")]
        public HttpResponseMessage GetStudentDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentDetails", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_StudentDetails", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("SetApplicationSubmit")]
        public string SetApplicationSubmit(int RegistrationID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_StudentApplicationSubmit", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }




        [HttpPost, ActionName("AddStudentPersonalDetails")]
        public string AddStudentPersonalDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@QualifiedExamID", data.QualifiedExamID);
                param[3] = new SqlParameter("@TenthHallticketNumber", data.TenthHallticketNumber);
                param[4] = new SqlParameter("@TenthYear", data.TenthYear);
                param[5] = new SqlParameter("@ExaminationType", data.ExaminationType);
                param[6] = new SqlParameter("@StudentName", data.StudentName);
                param[7] = new SqlParameter("@FatherName", data.FatherName);
                param[8] = new SqlParameter("@MotherName", data.MotherName);
                param[9] = new SqlParameter("@DateofBirth", data.DateofBirth);
                param[10] = new SqlParameter("@Gender", data.Gender);
                param[11] = new SqlParameter("@SSCVerified", data.SSCVerified);
                param[12] = new SqlParameter("@DateOfBirthText", data.DateOfBirthText);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentPersonalDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_StudentPersonalDetails", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpPost, ActionName("AddStudentCommunicationDetails")]
        public string AddStudentCommunicationDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[16];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@MobileNumber", data.MobileNumber);
                param[3] = new SqlParameter("@AlternateMobileNumber", data.AlternateMobileNumber);
                param[4] = new SqlParameter("@Email", data.Email);
                param[5] = new SqlParameter("@HouseNumber", data.HouseNumber);
                param[6] = new SqlParameter("@StreetName", data.StreetName);
                param[7] = new SqlParameter("@Locality", data.Locality);
                param[8] = new SqlParameter("@Landmark", data.Landmark);
                param[9] = new SqlParameter("@Village", data.Village);
                param[10] = new SqlParameter("@StateID", data.StateID);
                param[11] = new SqlParameter("@DistrictID", data.DistrictID);
                param[12] = new SqlParameter("@DistrictName", data.DistrictName);
                param[13] = new SqlParameter("@MandalID", data.MandalID);
                param[14] = new SqlParameter("@MandalName", data.MandalName);
                param[15] = new SqlParameter("@Pincode", data.Pincode);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentCommunicationDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_StudentCommunicationDetails", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpPost, ActionName("AddStudentCategoryDetails")]
        public string AddStudentCategoryDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@CasteCategoryID", data.CasteCategoryID);
                param[3] = new SqlParameter("@AadharNumber", data.AadharNumber);
                param[4] = new SqlParameter("@CasteCertificateNumber", data.CasteCertificateNumber);
                param[5] = new SqlParameter("@CasteVerified", data.CasteVerified);
                param[6] = new SqlParameter("@EWS", data.EWS);
                param[7] = new SqlParameter("@EWSNumber", data.EWSNumber);
                param[8] = new SqlParameter("@EWSVerified", data.EWSVerified);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentCategoryDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_StudentCategoryDetails", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("UpdateFeeCasteDetails")]
        public string UpdateFeeCasteDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@AadharNumber", data.AadharNumber);
                param[3] = new SqlParameter("@CasteCertificateNumber", data.CasteCertificateNumber);
                param[4] = new SqlParameter("@CasteVerified", data.CasteVerified);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_CasteFeeDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_CasteFeeDetails", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpPost, ActionName("AddStudentSpecialCategoryDetails")]
        public string AddStudentSpecialCategoryDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[11];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@RegionID", data.RegionID);
                param[3] = new SqlParameter("@MinorityID", data.MinorityID);
                param[4] = new SqlParameter("@AssistanceinUrdu", data.AssistanceinUrdu);
                param[5] = new SqlParameter("@PH", data.PH);
                param[6] = new SqlParameter("@NCC", data.NCC);
                param[7] = new SqlParameter("@SportsAndGames", data.SportsAndGames);
                param[8] = new SqlParameter("@CAP", data.CAP);
                param[9] = new SqlParameter("@PMCares", data.PMCares);
                param[10] = new SqlParameter("@AppearedForBiology", data.AppearedForBiology);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentSpecialCategoryDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_StudentSpecialCategoryDetails", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddStudentStudyDetails")]
        public string AddStudentStudyDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[42];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@Class1Year", data.Class1Year);
                param[3] = new SqlParameter("@Class1StateID", data.Class1StateID);
                param[4] = new SqlParameter("@Class1DistrictID", data.Class1DistrictID);
                param[5] = new SqlParameter("@Class1Place", data.Class1Place);
                param[6] = new SqlParameter("@Class2Year", data.Class2Year);
                param[7] = new SqlParameter("@Class2StateID", data.Class2StateID);
                param[8] = new SqlParameter("@Class2DistrictID", data.Class2DistrictID);
                param[9] = new SqlParameter("@Class2Place", data.Class2Place);
                param[10] = new SqlParameter("@Class3Year", data.Class3Year);
                param[11] = new SqlParameter("@Class3StateID", data.Class3StateID);
                param[12] = new SqlParameter("@Class3DistrictID", data.Class3DistrictID);
                param[13] = new SqlParameter("@Class3Place", data.Class3Place);
                param[14] = new SqlParameter("@Class4Year", data.Class4Year);
                param[15] = new SqlParameter("@Class4StateID", data.Class4StateID);
                param[16] = new SqlParameter("@Class4DistrictID", data.Class4DistrictID);
                param[17] = new SqlParameter("@Class4Place", data.Class4Place);
                param[18] = new SqlParameter("@Class5Year", data.Class5Year);
                param[19] = new SqlParameter("@Class5StateID", data.Class5StateID);
                param[20] = new SqlParameter("@Class5DistrictID", data.Class5DistrictID);
                param[21] = new SqlParameter("@Class5Place", data.Class5Place);
                param[22] = new SqlParameter("@Class6Year", data.Class6Year);
                param[23] = new SqlParameter("@Class6StateID", data.Class6StateID);
                param[24] = new SqlParameter("@Class6DistrictID", data.Class6DistrictID);
                param[25] = new SqlParameter("@Class6Place", data.Class6Place);
                param[26] = new SqlParameter("@Class7Year", data.Class7Year);
                param[27] = new SqlParameter("@Class7StateID", data.Class7StateID);
                param[28] = new SqlParameter("@Class7DistrictID", data.Class7DistrictID);
                param[29] = new SqlParameter("@Class7Place", data.Class7Place);
                param[30] = new SqlParameter("@Class8Year", data.Class8Year);
                param[31] = new SqlParameter("@Class8StateID", data.Class8StateID);
                param[32] = new SqlParameter("@Class8DistrictID", data.Class8DistrictID);
                param[33] = new SqlParameter("@Class8Place", data.Class8Place);
                param[34] = new SqlParameter("@Class9Year", data.Class9Year);
                param[35] = new SqlParameter("@Class9StateID", data.Class9StateID);
                param[36] = new SqlParameter("@Class9DistrictID", data.Class9DistrictID);
                param[37] = new SqlParameter("@Class9Place", data.Class9Place);
                param[38] = new SqlParameter("@Class10Year", data.Class10Year);
                param[39] = new SqlParameter("@Class10StateID", data.Class10StateID);
                param[40] = new SqlParameter("@Class10DistrictID", data.Class10DistrictID);
                param[41] = new SqlParameter("@Class10Place", data.Class10Place);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentStudyDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_StudentStudyDetails", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpPost, ActionName("AddStudentPhotoSignatureDetails")]
        public string AddStudentPhotoSignatureDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                //var Photo_Url = ConfigurationManager.AppSettings["Student_Photos"].ToString();
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Photos\";
                var photo_url = dir + "Photo_" + data.RegistrationNumber + ".JPG";
                var StdPhoto = "Photo_" + data.RegistrationNumber + ".JPG";
                var photo_signature = dir + "Signature_" + data.RegistrationNumber + ".JPG";
                var StdSign = "Signature_" + data.RegistrationNumber + ".JPG";
                var path = string.Empty;
                string relativePath = string.Empty;
                var StudentPhotopath = string.Empty;
                var StudentSignaturepath = string.Empty;
                if (data.PhotoUpdate == true && data.SscPhotoType == false)
                {
                    photo_url = data.StudentPhoto;
                }
                else
                {
                    if (data.SSCPhoto == false && data.SscPhotoType == false)
                    {
                        if (data.StudentPhoto != "")
                        {
                            StdPhoto = "Photo_" + data.RegistrationNumber + ".JPG";
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            string imgPath = Path.Combine(path, StdPhoto);
                            byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                            File.WriteAllBytes(imgPath, Bytes);
                            relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_url = relativePath;
                        }
                        else
                        {
                            photo_url = "";
                        }
                    }
                    else
                   if (data.SSCPhoto == true || data.SscPhotoType == false)
                    {
                        using (WebClient client = new WebClient())
                        {
                            client.DownloadFile(new Uri(data.StudentPhoto), photo_url);
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            //string imgPath = Path.Combine(path, photo_url);
                            //byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                            //File.WriteAllBytes(imgPath, Bytes);
                            relativePath = dir.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_url = relativePath + StdPhoto;
                            // OR   
                        }
                    }
                    else
                    {
                        if (data.StudentPhoto != "")
                        {
                            StdPhoto = "Photo_" + data.RegistrationNumber + ".JPG";
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            string imgPath = Path.Combine(path, StdPhoto);
                            byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                            File.WriteAllBytes(imgPath, Bytes);
                            relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_url = relativePath;
                        }
                        else
                        {
                            photo_url = "";
                        }
                    }

                }
                if (data.PhotoUpdate == true && data.SscSignType == false)
                {
                    photo_signature = data.StudentSignature;
                }
                else
                {
                    if (data.SSCSign == false && data.SscSignType == false)
                    {
                        if (data.StudentSignature != "")
                        {
                            StdSign = "Signature_" + data.RegistrationNumber + ".JPG";
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            string imgPath = Path.Combine(path, StdSign);
                            byte[] Bytes = Convert.FromBase64String(data.StudentSignature);
                            File.WriteAllBytes(imgPath, Bytes);
                            relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_signature = relativePath;
                        }
                        else
                        {
                            photo_signature = "";
                        }

                    }
                    else if (data.SSCSign == true || data.SscSignType == false)
                    {
                        using (WebClient client = new WebClient())
                        {
                            client.DownloadFileAsync(new Uri(data.StudentSignature), photo_signature);
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            //string imgPath = Path.Combine(path, photo_signature);
                            //byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                            //File.WriteAllBytes(imgPath, Bytes);
                            relativePath = dir.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_signature = relativePath + StdSign;
                        }
                    }
                    else
                    {
                        if (data.StudentSignature != "")
                        {
                            StdSign = "Signature_" + data.RegistrationNumber + ".JPG";
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            string imgPath = Path.Combine(path, StdSign);
                            byte[] Bytes = Convert.FromBase64String(data.StudentSignature);
                            File.WriteAllBytes(imgPath, Bytes);
                            relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_signature = relativePath;
                        }
                        else
                        {
                            photo_signature = "";
                        }
                    }
                }
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@StudentPhoto", photo_url);
                param[3] = new SqlParameter("@StudentSignature", photo_signature);
                param[4] = new SqlParameter("@SSCPhoto", data.SSCPhoto);
                param[5] = new SqlParameter("@SSCSign", data.SSCSign);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Add_StudentPhotoSignature", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_StudentPhotoSignature", 0, ex.Message);
                return ex.Message;
            }
        }

        //[HttpGet, ActionName("GetStatisticsCount")]
        //public HttpResponseMessage GetStatisticsCount()
        //{
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_Statistics";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        PolycetdbHandler.SaveErorr("SP_Get_Statistics", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        //[HttpGet, ActionName("GetStatisticsCount")]
        //public HttpResponseMessage GetStatisticsCount(string SessionId, string UserName, string Captcha)
        //{
        //    var dbHandler = new PolycetdbHandler();

        //    try
        //    {
        //        var param = new SqlParameter[3];
        //        param[0] = new SqlParameter("@SessionId", SessionId);
        //        param[1] = new SqlParameter("@UserName", UserName);
        //        param[2] = new SqlParameter("@Captcha", Captcha);
        //        var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
        //        if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
        //        {
        //            var ds = dbHandler.ReturnDataSet("SP_Get_Statistics");
        //            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ds);
        //            return response;
        //        }
        //        else
        //            {
        //            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
        //            return response;
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Get_Statistics", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
        //    }

        //}

        [HttpPost, ActionName("GetStatisticsCount")]
        public HttpResponseMessage GetStatisticsCount([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", data.SessionId);
                param[1] = new SqlParameter("@UserName", data.UserName);
                param[2] = new SqlParameter("@Captcha", data.Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {

                    var ds = dbHandler.ReturnDataSet("SP_Get_Statistics");
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ds);
                    return response;
                }
                else
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return response;
                }
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Statistics", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("GetPolycetEWSVerification")]
        public async Task<HttpResponseMessage> GetPolycetEWSVerification([FromBody] EWSDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["EWS_API"].ToString();
            //var urlwithparam = url + "?applicationNo=" + ReqData.applicationNo + "&userid=" + ReqData.userid;
            //using (HttpClient client = new HttpClient())

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.PostAsJsonAsync(RequestURI, ReqData).Result;
            return response;

        }



        public class EWSDetails
        {
            public string applicationNo { get; set; }
            public string userid { get; set; }
        }


        [HttpPost, ActionName("AddStudentPreferences")]
        public string AddStudentPreferences([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@PreferenceDistrictID1", data.PreferenceDistrictID1);
                param[3] = new SqlParameter("@PreferenceMandalID1", data.PreferenceMandalID1);
                param[4] = new SqlParameter("@PreferenceDistrictID2", data.PreferenceDistrictID2);
                param[5] = new SqlParameter("@PreferenceMandalID2", data.PreferenceMandalID2);
                param[6] = new SqlParameter("@PreferenceDistrictID3", data.PreferenceDistrictID3);
                param[7] = new SqlParameter("@PreferenceMandalID3", data.PreferenceMandalID3);
                param[8] = new SqlParameter("@DataType", data.DataType);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentExamCentrePreferences", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_StudentExamCentrePreferences", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("EditDCExamCentreAllocation")]
        public HttpResponseMessage EditDCExamCentreAllocation([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", data.SessionId);
                param[1] = new SqlParameter("@UserName", data.UserName);
                param[2] = new SqlParameter("@Captcha", data.Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {

                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                    var ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_ExaminationCentre", param1);
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ds);
                    return response;
                }
                else
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return response;
                }
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Edit_ExaminationCentre", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("UpdateDCExamCentreAllocation")]
        public string UpdateDCExamCentreAllocation([FromBody] ExaminationCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                param[1] = new SqlParameter("@OpenForAllotment", data.OpenForAllotment);
                param[2] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_ExaminationCentreAllocation", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Update_ExaminationCentreAllocation", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetViewstdDetails")]
        public string GetViewstdDetails(string UserName, int DataType)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserName", UserName);
                param[1] = new SqlParameter("@DataType", DataType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_AdminStudentLogin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("SetStdHtLog")]
        public HttpResponseMessage SetStdHtLog([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@HallicketNo", data.HallicketNo);
                param[2] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_StudentHallticketLog", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Set_StudentHallticketLog", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }



        [HttpGet, ActionName("GetStudentStatisticsExcel")]
        public string GetStudentStatisticsExcel(int DataType,string UserName,string SessionId,string Captcha=null)
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
                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@DataType", DataType);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StatisticsData", param1);

                    if (ds.Tables[0].Rows.Count > 0 && DataType == 1)

                    {
                        var filename = "Registered" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);


                    }



                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 2)

                    {
                        var filename = "Fee_Paid" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }


                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 3)

                    {
                        var filename = "Fee_NotPaid" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }


                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 4)

                    {
                        var filename = "Applications_Submitted" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }


                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 5)

                    {
                        var filename = "Applications_NotSubmitted" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }


                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 6)

                    {
                        var filename = "Halltickets_Generated" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }


                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 7)

                    {
                        var filename = "Halltickets_NotGenerated" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    return JsonConvert.SerializeObject(ds);

                }
                else
                {
                   return JsonConvert.SerializeObject(dt);

                }
            }
            catch (Exception ex)
            {


                PolycetdbHandler.SaveErorr("SP_Get_StatisticsData", 0, ex.Message);
                return ex.Message;
            }
        }

        //[HttpGet, ActionName("GetStudentStatisticsExcel")]
        //public string GetStudentStatisticsExcel(int DataType)
        //{

        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@DataType", DataType);
        //        DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StatisticsData", param);
        //        if (ds.Tables[0].Rows.Count > 0 && DataType == 1)

        //        {
        //            var filename = "Registered" + ".xlsx";
        //            var eh = new ExcelHelper();
        //            var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            eh.ExportDataSet(ds, path + filename);
        //            Timer timer = new Timer(60000);
        //            timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
        //            timer.Start();
        //            var file = "/Downloads/" + filename;
        //            List<person1> p = new List<person1>();
        //            person1 p1 = new person1();
        //            p1.file = file;
        //            p1.ResponceCode = "200";
        //            p1.ResponceDescription = "Data Found";
        //            p.Add(p1);

        //            return JsonConvert.SerializeObject(p);
        //            //return ;

        //        }

        //        else if (ds.Tables[0].Rows.Count > 0 && DataType == 2)

        //        {
        //            var filename = "Fee_Paid" + ".xlsx";
        //            var eh = new ExcelHelper();
        //            var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            eh.ExportDataSet(ds, path + filename);
        //            Timer timer = new Timer(60000);
        //            timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
        //            timer.Start();
        //            var file = "/Downloads/" + filename;
        //            List<person1> p = new List<person1>();
        //            person1 p1 = new person1();
        //            p1.file = file;
        //            p1.ResponceCode = "200";
        //            p1.ResponceDescription = "Data Found";
        //            p.Add(p1);

        //            return JsonConvert.SerializeObject(p);
        //            //return ;

        //        }


        //        else if (ds.Tables[0].Rows.Count > 0 && DataType == 3)

        //        {
        //            var filename = "Fee_NotPaid" + ".xlsx";
        //            var eh = new ExcelHelper();
        //            var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            eh.ExportDataSet(ds, path + filename);
        //            Timer timer = new Timer(60000);
        //            timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
        //            timer.Start();
        //            var file = "/Downloads/" + filename;
        //            List<person1> p = new List<person1>();
        //            person1 p1 = new person1();
        //            p1.file = file;
        //            p1.ResponceCode = "200";
        //            p1.ResponceDescription = "Data Found";
        //            p.Add(p1);

        //            return JsonConvert.SerializeObject(p);
        //            //return ;

        //        }


        //        else if (ds.Tables[0].Rows.Count > 0 && DataType == 4)

        //        {
        //            var filename = "Applications_Submitted" + ".xlsx";
        //            var eh = new ExcelHelper();
        //            var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            eh.ExportDataSet(ds, path + filename);
        //            Timer timer = new Timer(60000);
        //            timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
        //            timer.Start();
        //            var file = "/Downloads/" + filename;
        //            List<person1> p = new List<person1>();
        //            person1 p1 = new person1();
        //            p1.file = file;
        //            p1.ResponceCode = "200";
        //            p1.ResponceDescription = "Data Found";
        //            p.Add(p1);

        //            return JsonConvert.SerializeObject(p);
        //            //return ;

        //        }


        //        else if (ds.Tables[0].Rows.Count > 0 && DataType == 5)

        //        {
        //            var filename = "Applications_NotSubmitted" + ".xlsx";
        //            var eh = new ExcelHelper();
        //            var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            eh.ExportDataSet(ds, path + filename);
        //            Timer timer = new Timer(60000);
        //            timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
        //            timer.Start();
        //            var file = "/Downloads/" + filename;
        //            List<person1> p = new List<person1>();
        //            person1 p1 = new person1();
        //            p1.file = file;
        //            p1.ResponceCode = "200";
        //            p1.ResponceDescription = "Data Found";
        //            p.Add(p1);

        //            return JsonConvert.SerializeObject(p);
        //            //return ;

        //        }


        //        else if (ds.Tables[0].Rows.Count > 0 && DataType == 6)

        //        {
        //            var filename = "Halltickets_Generated" + ".xlsx";
        //            var eh = new ExcelHelper();
        //            var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            eh.ExportDataSet(ds, path + filename);
        //            Timer timer = new Timer(60000);
        //            timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
        //            timer.Start();
        //            var file = "/Downloads/" + filename;
        //            List<person1> p = new List<person1>();
        //            person1 p1 = new person1();
        //            p1.file = file;
        //            p1.ResponceCode = "200";
        //            p1.ResponceDescription = "Data Found";
        //            p.Add(p1);

        //            return JsonConvert.SerializeObject(p);
        //            //return ;

        //        }


        //        else if (ds.Tables[0].Rows.Count > 0 && DataType == 7)

        //        {
        //            var filename = "Halltickets_NotGenerated" + ".xlsx";
        //            var eh = new ExcelHelper();
        //            var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            eh.ExportDataSet(ds, path + filename);
        //            Timer timer = new Timer(60000);
        //            timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
        //            timer.Start();
        //            var file = "/Downloads/" + filename;
        //            List<person1> p = new List<person1>();
        //            person1 p1 = new person1();
        //            p1.file = file;
        //            p1.ResponceCode = "200";
        //            p1.ResponceDescription = "Data Found";
        //            p.Add(p1);

        //            return JsonConvert.SerializeObject(p);
        //            //return ;

        //        }



        //        else
        //        {
        //            List<person1> p = new List<person1>();
        //            person1 p1 = new person1();
        //            p1.file = "";
        //            p1.ResponceCode = "400";
        //            p1.ResponceDescription = "Data not Found";
        //            p.Add(p1);
        //            return JsonConvert.SerializeObject(p);
        //        }
        //        //
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Get_StatisticsData", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}


        [HttpPost, ActionName("GetExamCentreMobileOTP")]
        public async Task<HttpResponseMessage> GetExamCentreMobileOTP([FromBody] SendSmsInfo data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamCentreMobile", data.ExamCentreMobile);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamCentreMobileOTP", param);
                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {
                    var com = new CommunicationController();
                    var msg = dt.Tables[1].Rows[0]["MobileOTP"].ToString() + " is your otp for validating your Mobile no on " + data.ExamCentreMobile.ToString().Substring(0, 2) + "xxxxx" + data.ExamCentreMobile.ToString().Substring(6, 4) + ", SBTET TS";
                    var test = await com.SendSms(data.ExamCentreMobile.ToString(), msg, "1007161770830309481");
                    HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return HttpResponse;
                }
                else if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "400")
                {
                    HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return HttpResponse;
                }
                else
                {
                    HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return HttpResponse;
                }
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_ExamCentreMobileOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }


        public class NotificationData
        {
            public int DataType { get; set; }
            public int NotificationID { get; set; }

        }


        [HttpPost, ActionName("GetorEditNotifications")]
        public string GetorEditNotifications([FromBody] NotificationData data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@NotificationID", data.NotificationID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Edit_Notifications", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_Edit_Notifications", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetStudentTransferData")]
        public string GetStudentTransferData(string HallticketNumber)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@HallticketNumber", HallticketNumber);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentTransferData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpPost, ActionName("SetStudentCentreTransfer")]
        public HttpResponseMessage SetStudentCentreTransfer([FromBody] CentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@HallticketNumber", data.HallticketNumber);
                param[2] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                param[3] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_StudentTransfer", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Set_StudentTransfer", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetPaymentDetails")]
        public string GetPaymentDetails(int DataType, string RegistrationMobileNumber, string ChallanNumber,string UserName,string SessionId,string Captcha=null)
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

                    var param1 = new SqlParameter[3];
                    param1[0] = new SqlParameter("@DataType", DataType);
                    param1[1] = new SqlParameter("@RegistrationMobileNumber", RegistrationMobileNumber);
                    param1[2] = new SqlParameter("@ChallanNumber", ChallanNumber);

                    var ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PaymentDetails", param1);
                    return JsonConvert.SerializeObject(ds);
                }
                else
                {
                    return JsonConvert.SerializeObject(dt);

                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetPaymentDetailsExcel")]
        public string GetPaymentDetailsExcel(int DataType, string RegistrationMobileNumber, string ChallanNumber, string UserName, string SessionId, string Captcha)
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

                    var param1 = new SqlParameter[3];
                    param1[0] = new SqlParameter("@DataType", DataType);
                    param1[1] = new SqlParameter("@RegistrationMobileNumber", RegistrationMobileNumber);
                    param1[2] = new SqlParameter("@ChallanNumber", ChallanNumber);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PaymentDetails", param1);
                    if (ds.Tables[0].Rows.Count > 0)

                    {
                        var filename = "Payment_Details_Report" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    else
                    {
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = "";
                        p1.ResponceCode = "400";
                        p1.ResponceDescription = "Data not Found";
                        p.Add(p1);
                        return JsonConvert.SerializeObject(p);
                    }
                    //
                }
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CoordinatingCentres", 0, ex.Message);
                return ex.Message;
            }

        }





        [HttpPost, ActionName("SetExaminationCentreCoordinates")]
        public HttpResponseMessage SetExaminationCentreCoordinates([FromBody] ExamCentresInfo data)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"MobileAppCentrePhotos\";
                var path = string.Empty;
                string relativePath = string.Empty;
                var CentrePhotopath = string.Empty;
                if (data.CentrePhoto != "")
                {
                    var CentrePhoto = data.CentreCode + ".PNG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, CentrePhoto);
                    byte[] Bytes = Convert.FromBase64String(data.CentrePhoto);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    CentrePhotopath = relativePath;
                }
                else
                {
                    CentrePhotopath = "";
                }

                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                param[1] = new SqlParameter("@CentreCode", data.CentreCode);
                param[2] = new SqlParameter("@Latitude", data.Latitude);
                param[3] = new SqlParameter("@Longitude", data.Longitude);
                param[4] = new SqlParameter("@CentrePhoto", CentrePhotopath);
                param[5] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_ExaminationCentreCoordinates", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Set_ExaminationCentreCoordinates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }

        [HttpPost, ActionName("GetExaminationCentreCoordinates")]
        public HttpResponseMessage GetExaminationCentreCoordinates([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamCentreMobile", data.ExamCentreMobile);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExaminationCentreCoordinates", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_ExaminationCentreCoordinates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetPrinterNRData")]
        public string GetPrinterNRData(int DataType,string UserName,string SessionId,string Captcha=null)
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
                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@DataType", DataType);

                    var ds = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_PrinterNR", param1);
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

        [HttpGet, ActionName("GetAttendanceStatistics")]
        public string GetAttendanceStatistics(int DataType, string UserName, string SessionId, string Captcha = null)
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

                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@DataType", DataType);

                    var ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PrinterNR", param1);
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




        [HttpGet, ActionName("GetPrinterNRExcel")]
        public string GetPrinterNRExcel(int DataType,string UserName,string SessionId,string Captcha)
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


                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@DataType", DataType);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PrinterNR", param1);
                    if (ds.Tables[0].Rows.Count > 0 && DataType == 1)

                    {
                        var filename = "Printer_NR_Report" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 3)

                    {
                        var filename = "Attendance_Statistics" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 4)

                    {
                        var filename = "Gender_Attendance" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 5)

                    {
                        var filename = "Report1" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 6)

                    {
                        var filename = "Report2" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    else if (ds.Tables[0].Rows.Count > 0 && DataType == 7)

                    {
                        var filename = "Report3" + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    else
                    {
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = "";
                        p1.ResponceCode = "400";
                        p1.ResponceDescription = "Data not Found";
                        p.Add(p1);
                        return JsonConvert.SerializeObject(p);
                    }

                }
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_PrinterNR", 0, ex.Message);
                return ex.Message;
            }

        }

        public class PaymentRecieptInfo
        {
            public string ChallanNumber { get; set; }
        }


        [HttpPost, ActionName("GetPaymentReciept")]
        public HttpResponseMessage GetPaymentReciept([FromBody] PaymentRecieptInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ChallanNumber", data.ChallanNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_FeePaymentReceipt", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_GET_FeePaymentReceipt", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("getCurrentPolycetYear")]
        public HttpResponseMessage getCurrentPolycetYear([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", data.DataType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_CurrentPolycetYr", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CurrentPolycetYr", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("GetMobileAppData")]
        public async Task<HttpResponseMessage> GetMobileAppData([FromBody] ExamCentresInfo data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PolycetYearID", data.PolycetYearID);
                param[1] = new SqlParameter("@DataType", data.DataType);
                param[2] = new SqlParameter("@ExamCentreCode", data.ExamCentreCode);
                param[3] = new SqlParameter("@HallTicketNumber", data.HallTicketNumber);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_MobileAppData", param);
                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return response;
                }
                else
                {
                    HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return HttpResponse;
                }
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_MobileAppData", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }



        [HttpPost, ActionName("GetExaminationCentreUserSMS")]
        public async Task<HttpResponseMessage> GetExaminationCentreUserSMS([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                string UserEncryptedPassword = "";
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                param[1] = new SqlParameter("@CentreCode", data.CentreCode);
                param[2] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExaminationCentreUserSMS", param);
                string Password = "";
                string retMsg = string.Empty;
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    string UserPassword = Convert.ToString(dt.Tables[0].Rows[0]["UserPassword"]);
                    var passcrypt = new HbCrypt();
                    Password = passcrypt.Decrypt(UserPassword);
                    string UserName = dt.Tables[0].Rows[0]["UserName"].ToString();
                    string UserMobile = dt.Tables[0].Rows[0]["UserMobile"].ToString();

                    string UserEmail = dt.Tables[0].Rows[0]["UserEmail"].ToString();

                    string ResponseCode = dt.Tables[0].Rows[0]["ResponseCode"].ToString();

                    string ResponseDescription = dt.Tables[0].Rows[0]["ResponseDescription"].ToString();
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var temptateid = "1007167108475678150";
                    var msg = "SBTET POLYCET Portal Login Credentials, User Name =" + UserName + ", Password = " + Password + ", Secretary,SBTET TS.";
                    var Message = string.Format(msg, UserName.Replace("'", "''"), Password);
                    CommunicationController com = new CommunicationController();
                    com.SendSms(UserMobile, msg, temptateid);
                    retMsg = "{\"ResponseCode\":\"" + ResponseCode + "\",\"ResponseDescription\": \"" + ResponseDescription + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }
                else if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "201")
                {
                    string UserPassword = Convert.ToString(dt.Tables[0].Rows[0]["UserPassword"]);
                    string CentreCode = dt.Tables[0].Rows[0]["CentreCode"].ToString();
                    string ResponseCode = dt.Tables[0].Rows[0]["ResponseCode"].ToString();

                    string ResponseDescription = dt.Tables[0].Rows[0]["ResponseDescription"].ToString();
                    string ExaminationCentreID = dt.Tables[0].Rows[0]["ExaminationCentreID"].ToString();
                    retMsg = "{\"ResponseCode\":\"" + ResponseCode + "\",\"ResponseDescription\": \"" + ResponseDescription + "\",\"UserPassword\": \"" + UserPassword + "\",\"CentreCode\": \"" + CentreCode + "\",\"ExaminationCentreID\": \"" + ExaminationCentreID + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }

                else if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "400")
                {
                    string ResponseCode = dt.Tables[0].Rows[0]["ResponseCode"].ToString();
                    string ResponseDescription = dt.Tables[0].Rows[0]["ResponseDescription"].ToString();
                    retMsg = "{\"ResponseCode\":\"" + ResponseCode + "\",\"ResponseDescription\": \"" + ResponseDescription + "\",\"UserPassword\": \"" + 0 + "\",\"CentreCode\": \"" + 0 + "\",\"ExaminationCentreID\": \"" + 0 + "\"}";
                    response = Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }

                else
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, dt);
                }
                return response;
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr(" SP_Get_ExaminationCentreUserSMS", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [HttpPost, ActionName("AddExaminationCentreUser")]
        public async Task<HttpResponseMessage> AddExaminationCentreUser([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string UserEncryptedPassword = "";
                var res = data.UserEncryptedPassword.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var passencrypt = new HbCrypt();
                string password = crypt.AesDecrypt(res[0]);
                string decryptpassword = passencrypt.AesDecrypt(password);
                UserEncryptedPassword = passencrypt.Encrypt(decryptpassword);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                param[1] = new SqlParameter("@CentreCode", data.CentreCode);
                param[2] = new SqlParameter("@UserEncryptedPassword", UserEncryptedPassword);
                param[3] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Add_ExaminationCentreUser", param);
                string Password = "";
                string retMsg = string.Empty;
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" || dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "201")
                {

                    string UserPassword = Convert.ToString(dt.Tables[0].Rows[0]["UserPassword"]);
                    var passcrypt = new HbCrypt();
                    Password = passcrypt.Decrypt(UserPassword);
                    string UserName = dt.Tables[0].Rows[0]["UserName"].ToString();
                    string UserMobile = dt.Tables[0].Rows[0]["UserMobile"].ToString();

                    string UserEmail = dt.Tables[0].Rows[0]["UserEmail"].ToString();

                    string ResponseCode = dt.Tables[0].Rows[0]["ResponseCode"].ToString();

                    string ResponseDescription = dt.Tables[0].Rows[0]["ResponseDescription"].ToString();
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var temptateid = "1007167108475678150";
                    var msg = "SBTET POLYCET Portal Login Credentials, User Name =" + UserName + ", Password = " + Password + ", Secretary,SBTET TS.";
                    var Message = string.Format(msg, UserName.Replace("'", "''"), Password);
                    CommunicationController com = new CommunicationController();
                    com.SendSms(UserMobile, msg, temptateid);
                    retMsg = "{\"ResponseCode\":\"" + ResponseCode + "\",\"ResponseDescription\": \"" + ResponseDescription + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }

                else
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, dt);
                }


                return response;
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr(" SP_Add_ExaminationCentreUser", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [HttpGet, ActionName("GetDeletedHallTicketsExcel")]
        public string GetDeletedHallTicketsExcel(int DataType)
        {

            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", DataType);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_HallticketDeletedData", param);
                if (ds.Tables[0].Rows.Count > 0)

                {
                    var filename = "Deleted_HallTickets_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(60000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person1> p = new List<person1>();
                    person1 p1 = new person1();
                    p1.file = file;
                    p1.ResponceCode = "200";
                    p1.ResponceDescription = "Data Found";
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person1> p = new List<person1>();
                    person1 p1 = new person1();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_HallticketDeletedData", 0, ex.Message);
                return ex.Message;
            }

        }

        //[HttpPost, ActionName("GetNrData")]
        //public HttpResponseMessage GetNrData([FromBody] CentresInfo data)
        //{
        //    var dbHandler = new PolycetdbHandler();

        //    try
        //    {

        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@DataType", data.DataType);
        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_CoordinatingCentres", param);
        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("SP_Get_CoordinatingCentres", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
        //    }
        //}


        [HttpPost, ActionName("GetNrData")]
        public HttpResponseMessage GetNrData([FromBody] CentresInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", data.SessionId);
                param[1] = new SqlParameter("@UserName", data.UserName);
                param[2] = new SqlParameter("@Captcha", data.Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {

                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@DataType", data.DataType);
                    var ds = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_CoordinatingCentres", param1);
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ds);
                    return response;
                }
                else
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return response;
                }
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_CoordinatingCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetNRExcelDownload")]
        public string GetNRExcelDownload(int ExaminationCentreID, string CentreCode,string UserName,string SessionId,string Captcha)
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

                    var param1 = new SqlParameter[1];
                    param1[0] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamCentreExcelNR", param1);
                    if (ds.Tables[0].Rows.Count > 0)

                    {
                        var filename = "NR_" + CentreCode + ".xlsx";
                        var eh = new ExcelHelper();
                        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                        bool folderExists = Directory.Exists(path);
                        if (!folderExists)
                            Directory.CreateDirectory(path);
                        eh.ExportDataSet(ds, path + filename);
                        Timer timer = new Timer(60000);
                        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                        timer.Start();
                        var file = "/Downloads/" + filename;
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = file;
                        p1.ResponceCode = "200";
                        p1.ResponceDescription = "Data Found";
                        p.Add(p1);

                        return JsonConvert.SerializeObject(p);
                        //return ;

                    }
                    else
                    {
                        List<person1> p = new List<person1>();
                        person1 p1 = new person1();
                        p1.file = "";
                        p1.ResponceCode = "400";
                        p1.ResponceDescription = "Data not Found";
                        p.Add(p1);
                        return JsonConvert.SerializeObject(p);
                    }
                    //
                }
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_ExamCentreExcelNR", 0, ex.Message);
                return ex.Message;
            }

        }

        public class person
        {
            public string file { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
            public string Image { get; internal set; }
        }

        [HttpPost, ActionName("UploadOMRNumberExcel")]
        public string UploadOMRNumberExcel([FromBody] JsonObject Data)
        {
            List<person> p = new List<person>();
            person p1 = new person();



            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", Data["DataType"].ToString());
                param[1] = new SqlParameter("@json", Data["json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_UploadOMRData", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "400")
                {
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(dt.Tables[1].Copy());
                    var filename = "DuplicatePolycetData" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(60000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    //return "{\"ResponceCode\":\"400\",\"ResponceDescription\" : \"" + "/Downloads/" + filename + "\"}";
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }
                else if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }
                else
                {
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }


                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Set_UploadOMRData", 0, ex.Message);
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }

        [HttpPost, ActionName("UploadSGExcel")]
        public string UploadSGExcel([FromBody] JsonObject Data)
        {
            List<person> p = new List<person>();
            person p1 = new person();



            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", Data["DataType"].ToString());
                param[1] = new SqlParameter("@json", Data["json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_UploadOMRData", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "400")
                {
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(dt.Tables[1].Copy());
                    var filename = "DuplicatePolycetData" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(60000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    //return "{\"ResponceCode\":\"400\",\"ResponceDescription\" : \"" + "/Downloads/" + filename + "\"}";
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }
                else if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }
                else
                {
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }


                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Set_UploadOMRData", 0, ex.Message);
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }

        [HttpGet, ActionName("SetExamAttendance")]
        public string SetExamAttendance(int ExaminationCentreID, string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);
                param[1] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ReleaseExamAttendance", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetOMRBarcodeData")]
        public async Task<string> GetOMRBarcodeData()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_UploadOMRBarcode";
                var res = dbHandler.ReturnDataSet(StrQuery);

                for (var i = 0; i <= res.Tables[0].Rows.Count; i++)
                {
                    var dir = "E:/TS/omr/";
                    //var dir = "filePaths";
                    var imgpath = dir + res.Tables[0].Rows[i]["Barcode"] + ".jpg";
                    byte[] Bytes = File.ReadAllBytes(imgpath);
                    var img = Convert.ToBase64String(Bytes);
                    var url = "https://polycet.sbtet.telangana.gov.in/api/AdminService/UploadOMRBarcode";
                    using (HttpClient client = new HttpClient())
                    {
                        try
                        {
                            var OMRBarcodeID = res.Tables[0].Rows[i]["OMRBarcodeID"].ToString();
                            var Barcode = res.Tables[0].Rows[i]["Barcode"].ToString();
                            var StdOMR = img;
                            var UserName = "";

                            //var parameters = new Dictionary<string, string> { { "OMRBarcodeID", OMRBarcodeID },
                            //    { "Barcode", Barcode},{"StdOMR", StdOMR },{"UserName", UserName } };
                            //parameters.Add("OMRBarcodeID", OMRBarcodeID);
                            //parameters.Add("Barcode", Barcode);
                            //parameters.Add("StdOMR", StdOMR);
                            //parameters.Add("UserName", UserName);
                            var options = new
                            {
                                OMRBarcodeID = OMRBarcodeID,
                                Barcode = Barcode,
                                StdOMR = StdOMR,
                                UserName = UserName
                            };

                            // Serialize our concrete class into a JSON String
                            var stringPayload = JsonConvert.SerializeObject(options);
                            var encodedContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");
                            //var encodedContent = new FormUrlEncodedContent(parameters);
                            var resMsg = await client.PostAsync(url, encodedContent);
                            var content = await resMsg.Content.ReadAsStringAsync();

                        }
                        catch (Exception ex)
                        {
                            PolycetdbHandler.SaveErorr("SP_Get_UploadOMRBarcode", 0, ex.Message);
                        }
                    }
                }
                return "success";

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_UploadOMRBarcode", 0, ex.Message);
                throw ex;
            }
        }

        public class OMRInfo
        {
            public string Barcode { get; set; }
            public int OMRBarcodeID { get; set; }
            public string StdOMR { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("UploadOMRBarcode")]
        public string UploadOMRBarcode([FromBody] OMRInfo data)
        {
            var dbHandler = new PolycetdbHandler();
            try
            {

                var dir = "E:/omrsheets";
                var omr_url = string.Empty;
                var StdOMR = string.Empty;
                var path = string.Empty;
                string relativePath = string.Empty;
                var StudentOMRpath = string.Empty;
                if (data.StdOMR != "")
                {
                    StdOMR = data.Barcode + ".jpg";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdOMR);
                    byte[] Bytes = Convert.FromBase64String(data.StdOMR);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    omr_url = relativePath;
                }
                else
                {
                    omr_url = "";
                }

                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@OMRBarcodeID", data.OMRBarcodeID);
                param[1] = new SqlParameter("@Barcode", data.Barcode);
                param[2] = new SqlParameter("@OMRPath", omr_url);
                param[3] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_UploadOMRBarcode", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Set_UploadOMRBarcode", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("ReleaseResults")]
        public string ReleaseResults(string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_ResultRelease", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetRankCard")]
        public string GetRankCard(int DataType, string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_RankcardDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        public class person2
        {
            public string ResponseCode { get; set; }
            public string Barcode { get; set; }

        }

        [HttpGet, ActionName("ViewOmrDetails")]
        public string ViewOmrDetails(int DataType, string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_OMR", param);
                string BARCODE = "";
                string ResponseCode = "";
                List<person2> p = new List<person2>();
                person2 p2 = new person2();
                if (dt.Tables[0].Rows.Count > 0)
                {
                    ResponseCode = "200";
                    BARCODE = dt.Tables[0].Rows[0]["BARCODE"].ToString();

                }
                else
                {
                    ResponseCode = "400";
                    BARCODE = "";
                }
                //var barcode = BARCODE;



                p2.Barcode = BARCODE.ToString();
                p2.ResponseCode = ResponseCode.ToString();
                p.Add(p2);

                return JsonConvert.SerializeObject(p);
                //return "{\"status\":\"200\",\"barcode\" : \"" + barcode + "\"}";

            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Get_OMR", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("SetStdRankCardLog")]
        public HttpResponseMessage SetStdRankCardLog([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@HallticketNo", data.HallticketNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_StudentRankCardLog", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Set_StudentRankCardLog", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


    }
}



