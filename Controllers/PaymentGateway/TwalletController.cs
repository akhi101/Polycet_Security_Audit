using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using TSPOLYCET.Models.Database;
using TSPOLYCET.Models.Security;

namespace TSPOLYCET.Controllers.PaymentGateway
{
    public class TwalletController : ApiController
    {
        private StudentRegistrationController com;
        #region GetMethod
        [HttpGet, ActionName("getCipherRequest")]
        public HttpResponseMessage getCipherRequest(string Callbackurl, string addInfo1, string addInfo2, string addInfo3, string addInfo4, string chalanaNo, string amount)
        {
            var challan = chalanaNo;
            var dbHandler = new PolycetdbHandler();
   
            try
            {
               
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ChallanNumber", challan);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_ChallanaDataForFeePayment", param);
                string marchantid = dt.Tables[1].Rows[0]["MerchantID"].ToString();
                string subMarchantid = dt.Tables[1].Rows[0]["SubMerchantID"].ToString();
                 addInfo1 = dt.Tables[1].Rows[0]["AdditionalInfo1"].ToString();
                 addInfo3 = dt.Tables[1].Rows[0]["AdditionalInfo3"].ToString();
                 addInfo4 = dt.Tables[1].Rows[0]["AdditionalInfo4"].ToString();
                string addInfo5 = dt.Tables[1].Rows[0]["AdditionalInfo5"].ToString();
                string addInfo6 = dt.Tables[1].Rows[0]["AdditionalInfo6"].ToString();
                string addInfo7 = dt.Tables[1].Rows[0]["AdditionalInfo7"].ToString();
                 chalanaNo = dt.Tables[1].Rows[0]["ChallanNumber"].ToString();
                 amount = dt.Tables[1].Rows[0]["RegistrationAmount"].ToString();
                var agencycode = ConfigurationManager.AppSettings["agencycode"];
               var agencyName = ConfigurationManager.AppSettings["agencyName"].ToString();
                TSPOLYCET.Models.Security.TwalletCrypt CheckSum = new TSPOLYCET.Models.Security.TwalletCrypt();
                var hash = CheckSum.RequestCipher(Callbackurl, agencycode, agencyName, addInfo1, addInfo2, addInfo3, addInfo4, chalanaNo, amount);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, hash);
                return response;
            }
            catch (Exception ex)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }

        }

      

        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            //if (!IsPostBack)
            //{
                //if (HttpContext.Current.Request.RequestType.Equals("GET"))
                //{

                //}
                //else if (HttpContext.Current.Request.RequestType.Equals("POST"))
                //{
                    StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream, System.Text.Encoding.Default);
                    string backstr = "WmZoPWq7EBOp68p8tvX8C+8A5p90hUBR4xenmWpK5g1NeVK44qv79N+0LRNHg6bZ7oevDdCHAJkFOl9fWJGx/a2IvVZwn890DQqzrxsMEAvoFZXQG6DeP1vAsp+Ni1iuWfvhnY1Is19bsTk6MQ5Fc4LBS6bTMguGPuEKaB7v1mUQcGee3unZVBiw2oZpD+g0Zxp2R9y26sHYhbvxncm/CpC30w+5YM85s6dSBVQNdUcMfvxovjZxVf6UeA/kofhnySbUZaobawEXIoeR5BkpDHfvnO9Gu0ZOy6eYHn4PNJvKXyiIE6gAEJ7lAkIHrAycbhELL1ZNyqNMZIYYRev/zQ==||||||||||||n1qMyq+oMuXW+eyZ7fxnXT3gUnbke6YL8v1bm/9kkr1MGHtIZ6s6KWljYv+TKKq2rtw4KijPqZvE6tGWkWYZ0jq1Mh3LzFCPJV/ChSNi1q6ij0gce6hOZD/KF9PqHCtOIdRu3kFoGI/2VM10WRSHHw1gUx4ticJVCe4sa1H87+8=";//HttpUtility.HtmlDecode(sr.ReadToEnd());
                    NameValueCollection nvc;
                    nvc = HttpContext.Current.Request.Form;
                    string Data = "Cr0fzDXdGcoVQoBHG0OPcfAdjo8ho9dmFHzfHsdeDUem9WqRmiz0JfRve3djgA1Tg/YKkjrCa8ondq5P2/hquMmHu3FWHuJOJL1QqNEsnRgRdpIWhxyEvk3WRNoPytB4";//nvc["Data"];
                    string Skey = "D8rYvgRc8ZCFmUyHlAymw5g8FVbs8n1NnyrKbKa35yDcjWXGvvq8llnRUxQ/3LA9vAmCSLboxaVjnap0mKzOSzQJvdokByim2fLaGIp6rOV2m0sDNTZmrmte+5WRYYQGvrZJKyQRX2wylb+YaOs6ATxQskkypQIQJzBGi9Kg4EZGDFixOFVAR2efewjLn4Gq6QjElOA+84S+1Un/UPMuNVPfPCiS768Ru6NVutqEyelhzIab//EMFndZkYx8APVAMTahC1MUDS/Wt9k6YBrUQZwN8FGepjmhQ7Z5mlkMJsvCScCSmMD8ycaPjnosO4bjqP+4inkQgZqg5x4O55uWhQ==";//nvc["Skey"];
                    string private_certificate_Key = Decryption.Decrypt_usingpassword(ConfigurationManager.AppSettings["GHMC_privatekey"].ToString());   // private key
                    string Decrypted_skey = Decryption.GetDecryptedText(Skey, private_certificate_Key);
                    string Decrypted_data = Decryption.AES_Decryption(Data, Decrypted_skey, false);
                    string strDecrypted_data = Encoding.Default.GetString(Convert.FromBase64String(Decrypted_data));
                    
                   //txtdata.Text = strDecrypted_data;
                   // return strDecrypted_data;
                //}
            }
        }
}
