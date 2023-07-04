using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Newtonsoft.Json;
using TSPOLYCET.Models.Database;

using RestSharp;
using System.Threading.Tasks;
using System.Configuration;
using System.Xml;
using System.IO;
using System.Web;
using System.Data;

using System.Collections.Generic;
using TSPOLYCET.Models;
using System.Timers;
using System.Drawing;
using System.Drawing.Imaging;
using DocumentFormat.OpenXml.Drawing.Charts;

namespace TSPOLYCET.Controllers.PreExamination
{
    public class PreExaminationController : ApiController
    {

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


        public class NotificationData
        {
            public int DataType { get; set; }
            public int NotificationID { get; set; }
            public string NotificationText { get; set; }
            public string NotificationFilePath { get; set; }
            public string NotificationFileName { get; set; }
            public DateTime NotificationDate { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }

        }


        [HttpGet, ActionName("GenerateNrData")]
        public string GenerateNrData(string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Set_PolycetNR", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    //  var ExamMonthYear = ds.Tables[1].Rows[0]["ExamMonthYear"].ToString();

                    var filename = "GenerateNrData" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(60000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("ADM_SET_2_1_GenerateNr", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetCaptchaString10")]
        public string GetCaptchaString10()
        {
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
               // dbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCaptchaString")]
        public string GetCaptchaString(string SessionId ,string UserName)
        {
            try
            {
                string strCaptchaString = "";
                int intZero = '0';
                int intNine = '9';
                int intA = 'A';
                int intZ = 'Z';
                int intCount = 0;
                int intRandomNumber = 0;
                //string strCaptchaString = "";

                Random random = new Random(System.DateTime.Now.Millisecond);

                while (intCount < 5)
                {
                    intRandomNumber = random.Next(intZero, intZ);
                    if (((intRandomNumber >= intZero) && (intRandomNumber <= intNine) || (intRandomNumber >= intA) && (intRandomNumber <= intZ)))
                    {
                        strCaptchaString = strCaptchaString + (char)intRandomNumber;
                        intCount = intCount + 1;
                    }
                }
              SetSessionId(SessionId, strCaptchaString, UserName);
                var skyblue = System.Drawing.ColorTranslator.FromHtml("#337ab7");
                string str = ConvertTextToImage(strCaptchaString, "sans-serif", 37, Color.White, skyblue, 210, 65).ToString();

                List<person> p = new List<person>();
                person p1 = new person();

                p1.Image = str;
                //p1.Text = strCaptchaString;
                p.Add(p1);

                return JsonConvert.SerializeObject(p);
            }
            catch (Exception ex)
            {
               // PolycetdbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
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


        [HttpGet, ActionName("SetSessionId")]
        public string SetSessionId(string SessionId, string Captcha, string UserName)
        {
            var PolycetdbHandler = new PolycetdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SessionId", SessionId);
                param[1] = new SqlParameter("@Captcha", Captcha); 
                param[2] = new SqlParameter("@UserName", UserName);
                var dt = PolycetdbHandler.ReturnDataWithStoredProcedure("USP_SET_CaptchaSessionLog", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_SET_CaptchaSessionLog", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("MarksPosting")]
        public string MarksPosting(string UserName)
        {
            try
            {

                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Set_MarksPosting", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("", 0, ex.Message);
                return ex.Message;
            }

        }

        public class Output
        {
            public string Data { get; set; }
            public string Captcha { get; set; }
            public string status { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
        }

        //[HttpGet, ActionName("getCaptchaStringData")]
        //public async Task<string> getCaptchaStringData(string SessionId, string UserName , string Captcha = null)
        //{
        //    List<Output> p = new List<Output>();
        //    Output p1 = new Output();
        //    var captcha = string.Empty;
        //    try
        //    {
        //        var dbHandler = new PolycetdbHandler();
        //        var param = new SqlParameter[3];
        //        param[0] = new SqlParameter("@SessionId", SessionId);
        //        param[1] = new SqlParameter("@UserName", UserName);
        //        param[2] = new SqlParameter("@Captcha", Captcha);
        //        var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CaptchaSessionLog", param);
        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
        //       // return dt;
        //        //  if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200") 
        //        //                {
        //        //                         //   captcha = GetCaptchaString(SessionId, UserName);
        //        //                            p1.ResponceCode = dt.Tables[0].Rows[0]["ResponseCode"].ToString();
        //        //                            p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponseDescription"].ToString(); ;
        //        //                            p1.Data = JsonConvert.SerializeObject(dt);
        //        //                           // p1.Captcha = captcha;
        //        //                            p.Add(p1);
        //        //                            return JsonConvert.SerializeObject(p);
        //        //                }
        //        //                else
        //        //                {
        //        //                 //   captcha = GetCaptchaString(SessionId,UserName);
        //        //                    p1.ResponceCode = "400";
        //        //                    p1.ResponceDescription = "";
        //        //                    p1.Captcha = captcha;
        //        //                    p.Add(p1);
        //        //                    return JsonConvert.SerializeObject(p);
        //        //}
        //    }
        //    catch (Exception ex)
        //    {

        //        PolycetdbHandler.SaveErorr("", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
        //    }
        //}



        [HttpGet, ActionName("RankGeneration")]
        public string RankGeneration(string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Set_RankGeneration", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    //var ExamMonthYear = ds.Tables[1].Rows[0]["ExamMonthYear"].ToString();
                    var filename = "Polycet " + '_' + "Rank_Generation" + ".xlsx";
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
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_WantingReports", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("WantingsReport")]
        public string WantingsReport(string UserName)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_WantingReports", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    //var ExamMonthYear = ds.Tables[1].Rows[0]["ExamMonthYear"].ToString();
                    var filename = "Polycet " + '_' + "Wantings" + ".xlsx";
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
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_WantingReports", 0, ex.Message);
                return ex.Message;
            }

        }

        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }


        public class person
        {
            public string file { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
            public string Image { get; set; }
            public string Text { get; set; }
        }

        [HttpPost, ActionName("UploadResultFileJson")]
        public string UploadResultFileJson([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@json", data["json"].ToString());
                param[1] = new SqlParameter("@UserName", data["UserName"]);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_UploadPolycetMarks", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("SP_Set_UploadPolycetMarks", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("AddorUpdateNotification")]
        public HttpResponseMessage AddorUpdateNotification([FromBody] NotificationData NotificationData)
        {
            try
            {
                var NotificationFilePath = string.Empty;
                if (NotificationData.DataType == 1)
                {
                    string relativePath = string.Empty;
                    var path = ConfigurationManager.AppSettings["circularPath"];
                    var NotificationName = NotificationData.NotificationFileName;
                    bool folder = Directory.Exists(path);
                    if (!folder)
                        Directory.CreateDirectory(path);
                    string NotificationPath = Path.Combine(path, NotificationName);

                    byte[] PrincipalimageBytes = Convert.FromBase64String(NotificationData.NotificationFilePath);
                    File.WriteAllBytes(NotificationPath, PrincipalimageBytes);
                    relativePath = NotificationPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    NotificationFilePath = relativePath;
                }
                else if (NotificationData.DataType == 2 && NotificationData.NotificationFilePath != "Empty")
                {
                    string relativePath = string.Empty;
                    var path = ConfigurationManager.AppSettings["circularPath"];
                    var NotificationName = NotificationData.NotificationFileName;
                    bool folder = Directory.Exists(path);
                    if (!folder)
                        Directory.CreateDirectory(path);
                    string NotificationPath = Path.Combine(path, NotificationName);

                    byte[] PrincipalimageBytes = Convert.FromBase64String(NotificationData.NotificationFilePath);
                    File.WriteAllBytes(NotificationPath, PrincipalimageBytes);
                    relativePath = NotificationPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    NotificationFilePath = relativePath;
                }
                else
                {
                    NotificationFilePath = NotificationData.NotificationFilePath;
                }
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataType", NotificationData.DataType);
                param[1] = new SqlParameter("@NotificationID", NotificationData.NotificationID);
                param[2] = new SqlParameter("@NotificationText", NotificationData.NotificationText);
                param[3] = new SqlParameter("@NotificationFilePath", NotificationFilePath);
                param[4] = new SqlParameter("@NotificationDate", NotificationData.NotificationDate);
                param[5] = new SqlParameter("@Active", NotificationData.Active);
                param[6] = new SqlParameter("@UserName", NotificationData.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Notification", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Add_Notification", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetorEditNotification")]
        public string GetorEditNotification(int DataType, int NotificationID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@NotificationID", NotificationID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Notifications", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("RequestLog")]
        public HttpResponseMessage RequestLog([FromBody] JsonObject request)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[12];
                param[0] = new SqlParameter("@marchantid", request["marchantid"]);
                param[1] = new SqlParameter("@subMarchantid", request["subMarchantid"]);
                param[2] = new SqlParameter("@addInfo1", request["addInfo1"]);
                param[3] = new SqlParameter("@addInfo3", request["addInfo3"]);
                param[4] = new SqlParameter("@addInfo4", request["addInfo4"]);
                param[5] = new SqlParameter("@addInfo5", request["addInfo5"]);
                param[6] = new SqlParameter("@addInfo6", request["addInfo6"]);
                param[7] = new SqlParameter("@addInfo7", request["addInfo7"]);
                param[8] = new SqlParameter("@challan", request["challan"]);
                param[9] = new SqlParameter("@amount", request["amount"]);
                param[10] = new SqlParameter("@schemeId", request["schemeId"]);
                param[11] = new SqlParameter("@json", request["json"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_RequestLog", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("USP_SFP_GET_PinListForFeePayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("FeeRequestLog")]
        public string FeeRequestLog(string marchantid, string subMarchantid, string addInfo1, string addInfo3, string addInfo4, string addInfo5, string addInfo6, string addInfo7, string challan, string amount, int schemeId = 0, string json = null)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[12];
                param[0] = new SqlParameter("@marchantid", marchantid);
                param[1] = new SqlParameter("@subMarchantid", subMarchantid);
                param[2] = new SqlParameter("@addInfo1", addInfo1);
                param[3] = new SqlParameter("@addInfo3", addInfo3);
                param[4] = new SqlParameter("@addInfo4", addInfo4);
                param[5] = new SqlParameter("@addInfo5", addInfo5);
                param[6] = new SqlParameter("@addInfo6", addInfo6);
                param[7] = new SqlParameter("@addInfo7", addInfo7);
                param[8] = new SqlParameter("@challan", challan);
                param[9] = new SqlParameter("@amount", amount);
                param[10] = new SqlParameter("@schemeId", schemeId);
                param[11] = new SqlParameter("@json", json);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_RequestLog", param);
                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return JsonConvert.SerializeObject(dt); ;
            }
            catch (Exception ex)
            {
                PolycetdbHandler.SaveErorr("USP_SFP_SET_RequestLog", 0, ex.Message);
                return ex.Message;
            }
        }

        public class SscDetails
        {
            public string RollNo { get; set; }
            public string Year { get; set; }
            public string Stream { get; set; }
            public string TENTH_HT_NO { get; set; }
            public string TENTH_YEAR { get; set; }
            public string STREAMS { get; set; }
        }

        [HttpPost, ActionName("TempGetSSCDetails")]
        public HttpResponseMessage TempGetSSCDetails([FromBody] SscDetails data)
        {
            var dbHandler = new PolycetdbHandler();

            try
            {

                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@TENTH_HT_NO", data.TENTH_HT_NO);
                param[1] = new SqlParameter("@TENTH_YEAR", data.TENTH_YEAR);
                param[2] = new SqlParameter("@STREAMS", data.STREAMS);
                var dt = dbHandler.ReturnDataWithStoredProcedure("TempSP_Get_SSCData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("TempSP_Get_SSCData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("GetSSCDetails")]
        public async Task<HttpResponseMessage> GetSSCDetails([FromBody] SscDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["SSC_API"].ToString();
            var urlwithparam = url + "?RollNo=" + ReqData.RollNo + "&year=" + ReqData.Year + "&stream=" + ReqData.Stream + "&channel=SBTT&password=S2T20";
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = new HttpResponseMessage();
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    XmlDocument PIDResponseXML = new XmlDocument();
                    PIDResponseXML.LoadXml(content);
                    if (PIDResponseXML.InnerXml.Length != 22)
                    {
                        var ROLLNO = string.Empty;
                        var NAME = string.Empty;
                        var FNAME = string.Empty;
                        var MNAME = string.Empty;
                        var DOB = string.Empty;
                        var SEX = string.Empty;
                        var RESULT = string.Empty;
                        try
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText;
                            //RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
                        }
                        catch (Exception ex)
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = "-";
                            RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
                        }

                        //if (RESULT != "")
                        //{
                        response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"200\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                        return response;
                        //}
                        //else
                        //{
                        //    response = Request.CreateResponse(HttpStatusCode.OK);
                        //    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                        //    return response;
                        //}
                    }
                    else
                    {
                        response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"No Data Found\" }"), System.Text.Encoding.UTF8, "application/json");
                        return response;
                    }

                }
                catch (Exception ex)
                {
                    var response = Request.CreateResponse(HttpStatusCode.NotFound);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return response;
                }

            }
        }



        [HttpPost, ActionName("GetSSCImageDetails")]
        public async Task<HttpResponseMessage> GetSSCImageDetails([FromBody] SscDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["SSC_ImageAPI"].ToString();
            var urlwithparam = url + "?RollNo=" + ReqData.RollNo + "&year=" + ReqData.Year + "&stream=" + ReqData.Stream + "&channel=SBTT&password=S2T20"; ;
            HttpResponseMessage response = new HttpResponseMessage();
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();

                    var PIDResponseXML = new XmlDocument();
                    PIDResponseXML.LoadXml(content);
                    var jsonData = JsonConvert.SerializeXmlNode(PIDResponseXML, Newtonsoft.Json.Formatting.None, true);
                    return Request.CreateResponse(HttpStatusCode.OK, jsonData);

                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
                }

            }
        }


        [HttpPost, ActionName("GetSSCNewDetails")]
        public async Task<HttpResponseMessage> GetSSCNewDetails([FromBody] SscDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["SSC_NewAPI"].ToString();
            var urlwithparam = url + "?RollNo=" + ReqData.RollNo + "&Year=" + ReqData.Year + "&Stream=" + ReqData.Stream + "&channel=SBTT&password=S2T20";
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = new HttpResponseMessage();
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    XmlDocument PIDResponseXML = new XmlDocument();
                    PIDResponseXML.LoadXml(content);
                    if (PIDResponseXML.InnerXml.Length != 22)
                    {
                        var ROLLNO = string.Empty;
                        var NAME = string.Empty;
                        var FNAME = string.Empty;
                        var MNAME = string.Empty;
                        var DOB = string.Empty;
                        var SEX = string.Empty;
                        try
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText;

                            response = Request.CreateResponse(HttpStatusCode.OK);
                            response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"200\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                            return response;
                        }
                        catch (Exception ex)
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = "-";

                            response = Request.CreateResponse(HttpStatusCode.OK);
                            response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                            return response;
                        }
                    }

                    else
                    {
                        response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"No Data Found\" }"), System.Text.Encoding.UTF8, "application/json");
                        return response;
                    }

                }
                catch (Exception ex)
                {
                    var response = Request.CreateResponse(HttpStatusCode.NotFound);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return response;
                }

            }
        }



        [HttpPost, ActionName("GetSSCNewImageDetails")]
        public async Task<HttpResponseMessage> GetSSCNewImageDetails([FromBody] SscDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["SSC_NewImageAPI"].ToString();
            var urlwithparam = url + "?RollNo=" + ReqData.RollNo + "&year=" + ReqData.Year + "&stream=" + ReqData.Stream + "&channel=SBTT&password=S2T20"; ;
            HttpResponseMessage response = new HttpResponseMessage();
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();

                    var PIDResponseXML = new XmlDocument();
                    PIDResponseXML.LoadXml(content);
                    var jsonData = JsonConvert.SerializeXmlNode(PIDResponseXML, Newtonsoft.Json.Formatting.None, true);
                    return Request.CreateResponse(HttpStatusCode.OK, jsonData);

                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
                }

            }
        }

        [HttpGet, ActionName("GetPhotoAttendance")]
        public string GetPhotoAttendance(int ExaminationCentreID,string CentreCode,string UserName,string SessionId,string Captcha=null)
        {
            var dbHandler = new PolycetdbHandler();
            string NRReportDir = @"Reports\NR\";
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
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PhotoAttendanceData", param1);
                    GenerateNR GenerateNR = new GenerateNR();
                    var pdf = GenerateNR.GetNrPdf(ds, NRReportDir);
                    //Directory.Delete(NRReportDir, true);

                    return pdf;
                }
                else
                {
                    return null;

                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet, ActionName("GetQPReportPdf")]
        public string GetQPReportPdf(int DataType, string UserName, string CoordinatingCentreCode)
        {
            string QPReportDir = @"Reports\QP\";
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@CoordinatingCentreCode", CoordinatingCentreCode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExaminationCentres", param);
                GenerateQP GenerateQP = new GenerateQP();
                var pdf = GenerateQP.GetQpPdf(ds, QPReportDir);

                return pdf;
            }
            catch (Exception ex)
            {
                return null;
            }
        }



        [HttpGet, ActionName("GetAttendanceList")]
        public HttpResponseMessage GetAttendanceList(int ExaminationCentreID, string UserName)
        {
            try
            {

                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);
                param[1] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamAttendance", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_ExamAttendance", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("SetAttendanceList")]
        public HttpResponseMessage SetAttendanceList([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Json", request["Json"].ToString());
                param[1] = new SqlParameter("@ExaminationCentreID", request["ExaminationCentreID"].ToString());
                param[2] = new SqlParameter("@UserName", request["UserName"].ToString());
                var res = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ExamAttendance", param);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Set_ExamAttendance", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAttendanceStatus")]
        public string GetAttendanceStatus()
        {
            var dbHandler = new PolycetdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_AttendanceStatus";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Get_AttendanceStatus", 0, ex.Message);
                throw ex;
            }
        }


        public class GetInterimRes
        {
            public string PdfUrl { get; set; }
            public string Pin { get; set; }
            public string ApplicationNumber { get; set; }
            public string RegistrationNo { get; internal set; }
        }

        [HttpPost, ActionName("OpenAttendanceReport")]
        public async Task<object> OpenAttendanceReport([FromBody] JsonObject request)
        {
            try
            {
                //var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));               
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                //for (int i = 0; i < js.Count; i++)
                //{
                //var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));                   
                param[0] = new SqlParameter("@ExaminationCentreID", request["ExaminationCentreID"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamAttendanceReport", param);  //USP_SS_GET_FeePaidInteriamCertificateDetails
                GenerateCertificate GenerateCertificate = new GenerateCertificate();
                //var HallTicketNo = ds.Tables[1].Rows[0]["HallTicketNo"].ToString();
                var pdfurl = GenerateCertificate.GetInterimCertificate(ds);
                respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = request["ExaminationCentreID"].ToString() });
                //}      

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }


        [HttpPost, ActionName("SetSubmitAttendanceList")]
        public HttpResponseMessage SetSubmitAttendanceList([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Json", request["Json"].ToString());
                param[1] = new SqlParameter("@ExaminationCentreID", request["ExaminationCentreID"].ToString());
                param[2] = new SqlParameter("@UserName", request["UserName"].ToString());
                var res = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_SubmitExamAttendance", param);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SP_Set_SubmitExamAttendance", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("MarkAttendanceReport")]
        public string MarkAttendanceReport(int ExaminationCentreID)
        {
            try
            {
                var dbHandler = new PolycetdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_ExamAttendanceStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}