﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

using TSPOLYCET.Models.Database;


namespace TSPOLYCET.Controllers
{
    public class PaymentGatewayController :Controller
    {

        public async Task<System.Web.Mvc.ActionResult> BulkBillResponse([FromBody] string msg)
        {
            string redirect = string.Empty;
            string retMsg = string.Empty;
            string addtninfo2 = "NA";
            var PolycetdbHandler =new PolycetdbHandler();
            try
            {
                string decimal_placestxnamt = "";
                string pins = "";
                string strCheckSumValue = "";
                string _paymentResp = msg;
                string[] arrResponse = _paymentResp.Split('|');
                int index = _paymentResp.LastIndexOf("|");
                string key = "S4MMGxHObplwYF04FOAUbOhPIk56JNV0";
                string checksumkeyr = _paymentResp.Substring(0, index);
                string Checksumvalue = GetHMACSHA256(checksumkeyr, key);
                Checksumvalue = Checksumvalue.ToUpper();
                string _ChecksumvalueReceived = arrResponse[25];
                //var bildeskresp = ConfigurationManager.AppSettings["BillDeskResFile"].ToString();
                //string restime = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".");
                ////TODO: add Log to Mongo DB
                //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
                //{
                //    writer.WriteLine("---BillDesk Response entered---time" + restime);
                //    for (int i = 0; i < arrResponse.Length; i++)
                //        writer.WriteLine(arrResponse[i] + "   :" + i);
                //    writer.WriteLine(_ChecksumvalueReceived);
                //}
                string amt = arrResponse[4];
                string merchantId = arrResponse[0].ToString();
                //hdnMerchantId.Value = merchantId;
                string subscriberid = arrResponse[1].ToString();
                //txtsubscriberid.Text = subscriberid;
                string txnrefno = arrResponse[2].ToString();
                //txtbankrefno.Text = txnrefno;
                string bankrefno = arrResponse[3].ToString();
                string txnamt = arrResponse[4].ToString();
                //txtamount.Text = txnamt;
                string bankid = arrResponse[5].ToString();
                string bankmerid = arrResponse[6].ToString();//Not Imp
                string tcntype = arrResponse[7].ToString();//Not Imp
                string currencyname = arrResponse[8].ToString();
                string temcode = arrResponse[9].ToString();//Not Imp
                string securitytype = arrResponse[10].ToString();//Not Imp
                string securityid = arrResponse[11].ToString();//Not Imp
                string securitypass = arrResponse[12].ToString();//Not Imp
                string txndate = arrResponse[13].ToString();
                string authstatus = arrResponse[14].ToString();
                string settlementtype = arrResponse[15].ToString();//Not Imp
                string addtninfo1 = arrResponse[16].ToString();
                //collegecode.Text = addtninfo1;
                addtninfo2 = arrResponse[17].ToString();
                string addtninfo3 = arrResponse[18].ToString();//Not Imp
                                                               //branchcode.Text = addtninfo3;
                string addtninfo4 = arrResponse[19].ToString();//Not Imp
                                                               // scheme.Text = addtninfo4;
                string addtninfo5 = arrResponse[20].ToString();//Not Imp
                                                               // semester.Text = addtninfo5;
                string addtninfo6 = arrResponse[21].ToString();//Not Imp
                                                               // examtype.Text = addtninfo6;
                string addtninfo7 = arrResponse[22].ToString();//Not Imp
                string errorstatus = arrResponse[23].ToString();
                string errordesc = arrResponse[24].ToString();
                string checksum = arrResponse[25].ToString();



                string message = merchantId + "|" + subscriberid + "|" + txnrefno + "|" + bankrefno + "|" + txnamt + "|" + bankid + "|" + bankmerid + "|" + tcntype + "|" + currencyname + "|" + temcode + "|" + securitytype + "|" + securityid + "|" + securitypass + "|" + txndate + "|" + authstatus + "|" +
                  settlementtype + "|" + addtninfo1 + "|" + addtninfo2 + "|" + addtninfo3 + "|" + addtninfo4 + "|" + addtninfo5 + "|" + addtninfo6 + "|" + addtninfo7 + "|" + errorstatus + "|" + errordesc; //+"|S4MMGxHObplwYF04FOAUbOhPIk56JNV0";


                strCheckSumValue = CheckSumResponse(message);
                //TODO: add Log to Mongo DB
                //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
                //{
                //    writer.WriteLine("Check Sum SBTET:" + strCheckSumValue + "\n" + "Checksum from billdesk:" + checksum);
                //}
                var db = new PolycetdbHandler();
                if (checksum.Equals(strCheckSumValue))
                {
              
                    var param = new SqlParameter[26];
                    param[0] = new SqlParameter("@merchantId", merchantId);
                    param[1] = new SqlParameter("@subscriberid", subscriberid);
                    param[2] = new SqlParameter("@txnrefno", txnrefno);
                    param[3] = new SqlParameter("@bankrefno", bankrefno);
                    param[4] = new SqlParameter("@txnamt", txnamt);
                    param[5] = new SqlParameter("@bankid", bankid);
                    param[6] = new SqlParameter("@bankmerid", bankmerid);
                    param[7] = new SqlParameter("@tcntype", tcntype);
                    param[8] = new SqlParameter("@currencyname", currencyname);
                    param[9] = new SqlParameter("@temcode", temcode);
                    param[10] = new SqlParameter("@securitytype", securitytype);
                    param[11] = new SqlParameter("@securityid", securityid);
                    param[12] = new SqlParameter("@securitypass", securitypass);
                    param[13] = new SqlParameter("@txndate", txndate);
                    param[14] = new SqlParameter("@authstatus", authstatus);
                    param[15] = new SqlParameter("@settlementtype", settlementtype);
                    param[16] = new SqlParameter("@addtninfo1", addtninfo1);
                    param[17] = new SqlParameter("@addtninfo2", addtninfo2);
                    param[18] = new SqlParameter("@addtninfo3", addtninfo3);
                    param[19] = new SqlParameter("@addtninfo4", addtninfo4);
                    param[20] = new SqlParameter("@addtninfo5", addtninfo5);
                    param[21] = new SqlParameter("@addtninfo6", addtninfo6);
                    param[22] = new SqlParameter("@addtninfo7", addtninfo7);
                    param[23] = new SqlParameter("@errorstatus", errorstatus);
                    param[24] = new SqlParameter("@errordesc", errordesc);
                    param[25] = new SqlParameter("@checksum", checksum);
                    var dt = db.ReturnDataWithStoredProcedure("USP_SFP_SET_BrowserResponce", param);
                }

                if (authstatus == "0300")
                {
                    retMsg = "{\"txnrefno\":\"" + txnrefno + "\",\"Refno\" : \"" + subscriberid + "\",\"statusdesc\" : \"" + errordesc + "\",\"bankrefno\": \"" + bankrefno + "\",\"statuscode\": \"" + authstatus + "\"}";
                    //retMsg = msg;
                     redirect = ConfigurationManager.AppSettings["PaymentGateRouteRedirect"].ToString();

                    return Redirect(redirect + "/" + Base64Encode(retMsg));
                }
                else
                {
                    //retMsg = msg;
                    retMsg = "{\"txnrefno\":\"" + txnrefno + "\",\"Refno\" : \"" + subscriberid + "\",\"statusdesc\" : \"" + errordesc + "\",\"bankrefno\": \"" + bankrefno + "\",\"statuscode\": \"" + authstatus + "\"}";
                    redirect = ConfigurationManager.AppSettings["PaymentGateRouteRedirect"].ToString();

                    return Redirect(redirect + "/" + Base64Encode(retMsg));
                }
                //if (addtninfo2 == "STUSERVICES")
                //{
                //    redirect = ConfigurationManager.AppSettings["CertificateFeePaymentGateRouteRedirect"].ToString();
                //    return Redirect(redirect + "/" + Base64Encode(retMsg));
                //}
                //else if (addtninfo2 == "TSTWSH")
                //{
                //    redirect = ConfigurationManager.AppSettings["TwshCertificateFeePaymentRouteRedirect"].ToString();

                //    return  Redirect(redirect + "/" + Base64Encode(retMsg));
                //}
                //else
                //{
                //    redirect = ConfigurationManager.AppSettings["PaymentGateRouteRedirect"].ToString();
                //    return  Redirect(redirect + "/" + Base64Encode(retMsg));
                //}
            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("USP_SFP_SET_BrowserResponce", 0, ex.Message);

                if (addtninfo2 == "STUSERVICES")
                {
                    redirect = ConfigurationManager.AppSettings["CertificateFeePaymentGateRouteRedirect"].ToString();
                    retMsg = "{\"txnrefno\":\"\",\"Refno\":\"\",\"statusdesc\": \"Internal Server Error\"}";
                    return  Redirect(redirect + "/" + Base64Encode(retMsg));
                }
                else if (addtninfo2 == "TSTWSH")
                {
                    redirect = ConfigurationManager.AppSettings["TwshCertificateFeePaymentRouteRedirect"].ToString();
                    retMsg = "{\"txnrefno\":\"\",\"Refno\":\"\",\"statusdesc\": \"Internal Server Error\"}";
                    return  Redirect(redirect + "/" + Base64Encode(retMsg));
                }
                else
                {
                    redirect = ConfigurationManager.AppSettings["PaymentGateRouteRedirect"].ToString();
                    retMsg = "{\"txnrefno\":\"\",\"Refno\":\"\",\"statusdesc\": \"Internal Server Error\"}";
                    return  Redirect(redirect + "/" + Base64Encode(retMsg));
                }

            }
        }

        [System.Web.Http.HttpGet]
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



        [System.Web.Http.HttpPost]
        public  async  Task<string> Server2Server([FromBody]  string msg)
        {
            TextWriter writer = null;
            string _paymentResp = msg.Trim().Trim('\n');

            try
            {

                using (var req = Request.InputStream) //HttpContext.Current.Request.InputStream
                {
                    req.Seek(0, SeekOrigin.Begin);
                    using (var reader = new StreamReader(req))
                    {
                        var reqData = await reader.ReadToEndAsync();
                        //  LogUtility.SaveS2SLog(reqData, DateTime.Now);
                    }
                }
                string strCheckSumValue = "";
                //_paymentResp = msg;
                string[] arrResponse = _paymentResp.Split('|');
                int index = _paymentResp.LastIndexOf("|");
                string key = "S4MMGxHObplwYF04FOAUbOhPIk56JNV0";
                string checksumkeyr = _paymentResp.Substring(0, index);
                string Checksumvalue = GetHMACSHA256(checksumkeyr, key);
                //Checksumvalue = Checksumvalue.ToUpper();
                string _ChecksumvalueReceived = arrResponse[25];
                //TODO: add Log to Mongo DB

                string amt = arrResponse[4];
                string merchantId = arrResponse[0];
                //hdnMerchantId.Value = merchantId;
                string subscriberid = arrResponse[1];
                //txtsubscriberid.Text = subscriberid;
                string txnrefno = arrResponse[2];
                //txtbankrefno.Text = txnrefno;
                string bankrefno = arrResponse[3];
                string txnamt = arrResponse[4];
                //txtamount.Text = txnamt;
                string bankid = arrResponse[5];
                string bankmerid = arrResponse[6];//Not Imp
                string tcntype = arrResponse[7];//Not Imp
                string currencyname = arrResponse[8];
                string temcode = arrResponse[9];//Not Imp
                string securitytype = arrResponse[10];//Not Imp
                string securityid = arrResponse[11];//Not Imp
                string securitypass = arrResponse[12];//Not Imp
                string txndate = arrResponse[13];
                string authstatus = arrResponse[14];
                string settlementtype = arrResponse[15];//Not Imp
                string addtninfo1 = arrResponse[16];
                //collegecode.Text = addtninfo1;
                string addtninfo2 = arrResponse[17];
                string addtninfo3 = arrResponse[18];//Not Imp
                                                    //branchcode.Text = addtninfo3;
                string addtninfo4 = arrResponse[19];//Not Imp
                                                    // scheme.Text = addtninfo4;
                string addtninfo5 = arrResponse[20];//Not Imp
                                                    // semester.Text = addtninfo5;
                string addtninfo6 = arrResponse[21];//Not Imp
                                                    // examtype.Text = addtninfo6;
                string addtninfo7 = arrResponse[22];//Not Imp
                string errorstatus = arrResponse[23];
                string errordesc = arrResponse[24];
                string checksum = arrResponse[25];


                string message = merchantId + "|" + subscriberid + "|" + txnrefno + "|" + bankrefno + "|" + txnamt + "|" + bankid + "|" + bankmerid + "|" + tcntype + "|" + currencyname + "|" + temcode + "|" + securitytype + "|" + securityid + "|" + securitypass + "|" + txndate + "|" + authstatus + "|" +
                  settlementtype + "|" + addtninfo1 + "|" + addtninfo2 + "|" + addtninfo3 + "|" + addtninfo4 + "|" + addtninfo5 + "|" + addtninfo6 + "|" + addtninfo7 + "|" + errorstatus + "|" + errordesc; //+"|S4MMGxHObplwYF04FOAUbOhPIk56JNV0";

                //    string message = "TSPOLYCET|PCT223000067|YHD416409501562|BRN397816|1.00|HD4|NA|10|INR|NA|NA|NA|NA|12-01-2023 15:20:04|0300|NA|REF2|TWSH|SSC|2020|REF6|REF7|REF8|NA|Success";

                strCheckSumValue = CheckSumResponse(message);

                //TODO: add Log to Mongo DB




                /*
                 * inserting log of s2s0
                 * if checkSum is equal then inserting all the data in s2sLog with type = 1
                 * else checkSum is not equal then inseting data in s2sLog with type = 2
                 * 
                 */
                strCheckSumValue = strCheckSumValue.ToLower();
                checksum = checksum.ToLower();
                if (checksum.Equals(strCheckSumValue))
                {
                    var db = new PolycetdbHandler();
                    var param = new SqlParameter[28];
                    param[0] = new SqlParameter("@FullResponse", _paymentResp);
                    param[1] = new SqlParameter("@ResponceType", 1);
                    param[2] = new SqlParameter("@merchantId", merchantId);
                    param[3] = new SqlParameter("@subscriberid", subscriberid);
                    param[4] = new SqlParameter("@txnrefno", txnrefno);
                    param[5] = new SqlParameter("@bankrefno", bankrefno);
                    param[6] = new SqlParameter("@txnamt", txnamt);
                    param[7] = new SqlParameter("@bankid", bankid);
                    param[8] = new SqlParameter("@bankmerid", bankmerid);
                    param[9] = new SqlParameter("@tcntype", tcntype);
                    param[10] = new SqlParameter("@currencyname", currencyname);
                    param[11] = new SqlParameter("@temcode", temcode);
                    param[12] = new SqlParameter("@securitytype", securitytype);
                    param[13] = new SqlParameter("@securityid", securityid);
                    param[14] = new SqlParameter("@securitypass", securitypass);
                    param[15] = new SqlParameter("@txndate", txndate);
                    param[16] = new SqlParameter("@authstatus", authstatus);
                    param[17] = new SqlParameter("@settlementtype", settlementtype);
                    param[18] = new SqlParameter("@addtninfo1", addtninfo1);
                    param[19] = new SqlParameter("@addtninfo2", addtninfo2);
                    param[20] = new SqlParameter("@addtninfo3", addtninfo3);
                    param[21] = new SqlParameter("@addtninfo4", addtninfo4);
                    param[22] = new SqlParameter("@addtninfo5", addtninfo5);
                    param[23] = new SqlParameter("@addtninfo6", addtninfo6);
                    param[24] = new SqlParameter("@addtninfo7", addtninfo7);
                    param[25] = new SqlParameter("@errorstatus", errorstatus);
                    param[26] = new SqlParameter("@errordesc", errordesc);
                    param[27] = new SqlParameter("@checksum", checksum);
                    var dt = db.ReturnDataWithStoredProcedure("Usp_SFP_SET_S2SLog", param);
                    //return JsonConvert.SerializeObject(dt);
                    if (dt.Tables[0].Rows.Count > 0)
                    {
                        merchantId = dt.Tables[0].Rows[0]["merchantId"].ToString();
                        string UniqueTxnNo = dt.Tables[0].Rows[0]["UniqueTxnNo"].ToString();
                        string TxnReferenceNo = dt.Tables[0].Rows[0]["TxnReferenceNo"].ToString();
                        string ReceiptNo = dt.Tables[0].Rows[0]["ReceiptNo"].ToString();
                        string TxnAmount = dt.Tables[0].Rows[0]["TxnAmount"].ToString();
                        string StatusUpdateDate = dt.Tables[0].Rows[0]["StatusUpdateDate"].ToString();
                        string ConsumerNumber = dt.Tables[0].Rows[0]["ConsumerNumber"].ToString();
                        string Statuscode = dt.Tables[0].Rows[0]["Statuscode"].ToString();
                        //string CheckSum = dt.Tables[0].Rows[0]["CheckSum"].ToString();
                        string data = merchantId + '|' + UniqueTxnNo + '|' + TxnReferenceNo + '|' + ReceiptNo + '|' + TxnAmount + '|' + StatusUpdateDate + '|' + ConsumerNumber + '|' + Statuscode;
                        string strCheckSumValue1 = "";
                        //_paymentResp = msg;
                        string[] arrResponse1 = data.Split('|');
                        int index1 = data.LastIndexOf("|");
                        string key1 = "S4MMGxHObplwYF04FOAUbOhPIk56JNV0";
                        string checksumkeyr1 = data.Substring(0, index1);
                        string Checksumvalue1 = GetHMACSHA256(checksumkeyr1, key1);
                        string _ChecksumvalueReceived1 = arrResponse1[7];
                        var param1 = new SqlParameter[9];
                        param1[0] = new SqlParameter("@MerchantID", merchantId);
                        param1[1] = new SqlParameter("@UniqueTxnNo", UniqueTxnNo);
                        param1[2] = new SqlParameter("@TxnReferenceNo", TxnReferenceNo);
                        param1[3] = new SqlParameter("@ReceiptNo", ReceiptNo);
                        param1[4] = new SqlParameter("@TxnAmount", TxnAmount);
                        param1[5] = new SqlParameter("@StatusUpdateDate", StatusUpdateDate);
                        param1[6] = new SqlParameter("@ConsumerNumber", ConsumerNumber);
                        param1[7] = new SqlParameter("@Statuscode", Statuscode);
                        param1[8] = new SqlParameter("@CheckSum", Checksumvalue1);
                        var dt1 = db.ReturnDataWithStoredProcedure("Usp_SFP_SET_S2SLog_BMS", param1);
                        //string merchantId1 = dt1.Tables[0].Rows[0]["merchantId"].ToString();
                        //string UniqueTxnNo1 = dt1.Tables[0].Rows[0]["UniqueTxnNo"].ToString();
                        //string TxnReferenceNo1 = dt1.Tables[0].Rows[0]["TxnReferenceNo"].ToString();
                        //string ReceiptNo1 = dt1.Tables[0].Rows[0]["ReceiptNo"].ToString();
                        //string TxnAmount1 = dt1.Tables[0].Rows[0]["TxnAmount"].ToString();
                        //string StatusUpdateDate1 = dt1.Tables[0].Rows[0]["StatusUpdateDate"].ToString();
                        //string ConsumerNumber1 = dt1.Tables[0].Rows[0]["ConsumerNumber"].ToString();
                        //string Statuscode1 = dt1.Tables[0].Rows[0]["Statuscode"].ToString();
                        //string CheckSum = dt1.Tables[0].Rows[0]["CheckSum"].ToString();
                        string val = merchantId + '|' + UniqueTxnNo + '|' + TxnReferenceNo + '|' + ReceiptNo + '|' + TxnAmount + '|' + StatusUpdateDate + '|' + ConsumerNumber + '|' + Statuscode + '|' + Checksumvalue1;
                        return val;
                    }
                }
                else if (!checksum.Equals(strCheckSumValue))
                {

                    var db1 = new PolycetdbHandler();
                    var para = new SqlParameter[2];
                    para[0] = new SqlParameter("@FullResponse", _paymentResp);
                    para[1] = new SqlParameter("@ResponceType", 2);
                    db1.ReturnDataWithStoredProcedureTable("Usp_SFP_SET_S2SLog", para);
                    return "Data Not Matched";
                }
            }
            catch (Exception ex)
            {
                var dbHandler = new PolycetdbHandler();
                PolycetdbHandler.SaveErorr("Usp_SFP_SET_S2SLog", 0, ex.Message);
                var db1 = new PolycetdbHandler();
                var para = new SqlParameter[2];
                para[0] = new SqlParameter("@FullResponse", _paymentResp);
                para[1] = new SqlParameter("@ResponceType", 2);
                db1.ReturnDataWithStoredProcedureTable("Usp_SFP_SET_S2SLog", para);
                return JsonConvert.SerializeObject(ex.Message);
            }
            return "Not yet added in DB";
        }


      
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        private string CheckSumResponse(string msg)
        {

            string data = msg;
            string hash = String.Empty;
            hash = GetHMACSHA256(data, "S4MMGxHObplwYF04FOAUbOhPIk56JNV0");
            return hash.ToUpper();
        }

        private string GetHMACSHA256(string text, string key)
        {
            UTF8Encoding encoder = new UTF8Encoding();
            byte[] hashValue;
            byte[] keybyt = encoder.GetBytes(key);
            byte[] message = encoder.GetBytes(text);
            HMACSHA256 hashString = new HMACSHA256(keybyt);
            string hex = "";
            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;
        }

    }
}