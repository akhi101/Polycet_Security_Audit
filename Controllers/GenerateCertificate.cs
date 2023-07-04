using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using SelectPdf;
using TSPOLYCET.BLL;
using TSPOLYCET.Models.Database;
using PdfSharp.Pdf.IO;
using System.Configuration;
using System.Threading.Tasks;
using TSPOLYCET.Models;

namespace TSPOLYCET.Controllers
{
    public class GenerateCertificate
    {

        public class InterimData
        {

            public string AbsentCount { get; set; }
            public string ExaminationCentreName { get; set; }
            public string CentreCode { get; set; }
            public string ExamDate { get; set; }
            public string ExamTime { get; set; }
            public string AllotedCount { get; set; }
            public string PresentCount { get; set; }
            public string HallTicketNo { get; set; }
            public string ExamAttendance { get; set; }
            public string MalpracticeCount { get; set; }
            public string SGCount { get; set; }




            public string InterimCertificateNo { get; set; }
            public string Pin { get; set; }
            public int SchemeId { get; set; }
            public string Name { get; set; }
            public string FatherName { get; set; }
            public string CollegeCode { get; set; }
            public string CollegeName { get; set; }
            public string CollegeAddress { get; set; }
            public string BranchCode { get; set; }
            public string BranchName { get; set; }
            public string MonthYear { get; set; }
            public string TotalMarksInFigure { get; set; }
            public string TotalMarksInWords { get; set; }
            public string PercentageOfMarks { get; set; }
            public string CourseDuration { get; set; }
            public string PassedClass { get; set; }
            public string TotalCreditsEarned { get; set; }
            public string Scheme { get; set; }
            public string Class { get; set; }
            public string CGPA { get; set; }
            public Boolean Is3Backlog { get; set; }
        }

        public class TwshData
        {
            public string RegNo { get; set; }
            public string Name { get; set; }
            public string TwshCertificateNo { get; set; }
            public string FatherName { get; set; }
            public string Course { get; set; }
            public string division { get; set; }
            public string Remarks { get; set; }
            public string paper1 { get; set; }
            public string paper2 { get; set; }
            public string MonthYear { get; set; }
            public string ApplicationNumber { get; set; }
            public string Gender { get; set; }


        }

        public class AbsentiesCount
        {
            public string AbsentHallTicketNo { get; set; }

        }
        public class PresentiesCount
        {
            public string PresentHallTicketNo { get; set; }

        }
        public class MalpracticeCount
        {
            public string MalpracticeHallTicketNo { get; set; }

        }

        public class SGCount
        {
            public string SGOMRNumber { get; set; }

        }

        public class MigrationData
        {
            public string HallTicketNo { get; set; }
            public string Name { get; set; }
            public string FatherName { get; set; }
            public string DateofBirth { get; set; }
            public string ExamDate { get; set; }
            public string MPC_RANK { get; set; }
            public string MBIPC_RANK { get; set; }
            public string MATHS { get; set; }
            public string PHYSICS { get; set; }
            public string CHEMISTRY { get; set; }
            public string BIOLOGY { get; set; }

        }

        public class BonafideData
        {
            public string ApplicationNumber { get; set; }
            public string Pin { get; set; }
            public string Name { get; set; }
            public string FatherName { get; set; }
            public string BranchName { get; set; }
            public string AcademicYear { get; set; }
            public string conduct { get; set; }
            public Boolean IsGovClg { get; set; }
            public string College_Name { get; set; }
            public string Clg_Address { get; set; }
            public int ServiceType { get; set; }

        }

        public class TCData
        {
            public string TransferCertificateNo { get; set; }
            public string AdmissionNo { get; set; }
            public string Pin { get; set; }
            public string Name { get; set; }
            public string FatherName { get; set; }
            public string MotherName { get; set; }
            public DateTime DateOfBIrth { get; set; }
            public string LeftClass { get; set; }
            public string Nationality { get; set; }
            public string Religion { get; set; }
            public string Caste { get; set; }
            public DateTime LogDate { get; set; }
            public string ReasonForTc { get; set; }
            public string IdMark1 { get; set; }
            public string IdMark2 { get; set; }
            public string Conduct { get; set; }
            public string Promoted { get; set; }
            public string CollegeDuesPaid { get; set; }
            public DateTime LeftDate { get; set; }
            public DateTime admittedDate { get; set; }
            public string CollegeName { get; set; }
            public string CollegeAddress { get; set; }
            public string StudentRemarks { get; set; }
            public string Station { get; set; }
            public Boolean IsGovClg { get; set; }


        }

        public class studentintrmMarks
        {
            public string AbsentCount { get; set; }
            public string ExamCenter { get; set; }
            public string ExamDate { get; set; }
            public string ExamTime { get; set; }
            public string AllotedCount { get; set; }
            public string PresentCount { get; set; }
            public string HallTicketNo { get; set; }
            public string ExamAttendance { get; set; }
            public string MalpracticeCountCount { get; set; }


            public int Id { get; set; }
            public string Examination { get; set; }
            public string MaxMarks { get; set; }
            public string MaxSecured { get; set; }
            public string InFigures { get; set; }
            public string Per { get; set; }
            public string InWords { get; set; }

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

        private static T[][] SliceArray<T>(T[] source, int maxResultElements)
        {
            int numberOfArrays = source.Length / maxResultElements;
            if (maxResultElements * numberOfArrays < source.Length)
                numberOfArrays++;
            T[][] target = new T[numberOfArrays][];
            for (int index = 0; index < numberOfArrays; index++)
            {
                int elementsInThisArray = Math.Min(maxResultElements, source.Length - index * maxResultElements);
                target[index] = new T[elementsInThisArray];
                Array.Copy(source, index * maxResultElements, target[index], 0, elementsInThisArray);
            }
            return target;
        }

        public static void MergePDFs(string targetPath, params string[] pdfs)
        {
            using (PdfSharp.Pdf.PdfDocument targetDoc = new PdfSharp.Pdf.PdfDocument())
            {
                foreach (string pdf in pdfs)
                {
                    using (var pdfDoc = PdfReader.Open(pdf, PdfDocumentOpenMode.Import))
                    {
                        for (int i = 0; i < pdfDoc.PageCount; i++)
                        {
                            targetDoc.AddPage(pdfDoc.Pages[i]);
                        }
                    }
                }
                targetDoc.Save(targetPath);
            }
        }

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }

        public string GetInterimCertificate(DataSet IntrmData)
        {

            List<InterimData> InterimData = IntrmData.Tables[0].DataTableToList<InterimData>().ToList(); ;
            //List<AbsentiesCount> AbsentiesCount = IntrmData.Tables[1].DataTableToList<InterimData>().ToList(); ;
            //List<MalpracticeCount> MalpracticeCount = IntrmData.Tables[2].DataTableToList<InterimData>().ToList(); ;
            var AbsentiesCount = DataTableHelper.ConvertDataTable<AbsentiesCount>(IntrmData?.Tables[3]).ToArray();
            var PresentiesCount = DataTableHelper.ConvertDataTable<PresentiesCount>(IntrmData?.Tables[1]).ToArray();
            var MalpracticeCount = DataTableHelper.ConvertDataTable<MalpracticeCount>(IntrmData?.Tables[4]).ToArray();
            var SGCount = DataTableHelper.ConvertDataTable<SGCount>(IntrmData?.Tables[2]).ToArray();
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\UnsignedCert\";
            CreateIfMissing(dir);
            string html = @"<html>"
                   + "<head>"
                   + $"<title></title>"
                   + $@"<link href = '{AppDomain.CurrentDomain.BaseDirectory}\contents\css\bootstrap.min.css' rel = 'stylesheet'  type = 'text/css' />"
                   + @"<style type='text/css'>
                         html{
                            min-width: 1024px;
                            max-width: 1024px;
                            width: 1024px;
                        }
                        body {
                            min-width: 1024px;
                            max-width: 1024px;
                            width: 1024px;
                            m0argin-left: 10px;
                        }
                        table {  
                            font-family: Helvetica, Arial, sans-serif; /* Nicer font */
                            width: 100%; 
                            //border-collapse: collapse;
                            border-spacing: 0; 
                        }

                        td, th, tr { border: 1px solid #000; height: 30px; } /* Make cells a bit taller */

                        th {  
                            font-weight: bold; /* Make sure they're bold */
                        }

                        td {  
                            text-align: center; /* Center our text */
                        }

                      .logoImg {
                                height: 70px !important;
                                width: 70px !important;
                            }

                    .myHr {
                                border-top: 1px solid #000;
                            }

                            .header-top-section {
                                display: none;
                            }

                            .border_btm {
                              
                                text-transform: uppercase;
                            }

                            .text-uppercase {
                                text-transform: uppercase;
                            }

                            p {
                                text-indent: 50px;
padding :6px
                            }

                            .qr_css {
                                height: 90px;
                            }

                            .marginData {
                                margin: 0px 20px;
                            }

                            .footer_section {
                                display: none;
                            }

                            .footer_section {
                                display: none;
                            }

                            .print_btn {
                                display: none;
                            }

                            .spacer {
                                display: none;
                            }

                            .text-intend {
                                text-indent: 50px;
                                line-height: 2.0;
                                text-align: justify;
                                text-justify: inter-word;
                            }

                            .Line {
                                line-height: normal;
                            }
                             .sm-spacer{
                                     height:20px;
                                 }

                            .a {
                                margin: 25px;
                            }

                            canvas.sa-canvas {
                                border: none;
                            }

                            .interim-spacer {
                                display: none;
                            }

                            .myImg {
                                width: 70% !important;
                                padding:120px;
                                margin-left: auto !important;
                                margin-right: auto !important;
                                display: block!important;
                                opacity:0.3;
                            }

                            .myData {
                                position: absolute;
                            }
                        .table > thead > tr > th {
							vertical-align: middle !important;
							border: 1px solid #000000 !important;
                            border: 1px solid #000000 !important;
						}

                            .container img {
                                vertical-align: middle;
                            }

                            .container .content {
                                position: absolute!important;
                                top: 0!important;
                                background: rgb(0, 0, 0)!important;
                                background: rgba(255, 255, 255, 0.36)!important;
                                color: #130404!important;
                                width: 100%!important;
                                padding: 20px!important;
                            }
                               .container{
                                position: relative;
                                max-width: 800px;
                                margin: 0 auto;
                            }
                                .table td, .table th {
                                background-color: transparent!important;
                            }
                            .myrow{
                                position:relative!important;
                            }

                            .qr_css {
                                height: 90px;
                            }
                            .image{
                                 background: url(../../../contents/img/big-logo.png) repeat;
                               /*  height: 500px;  You must set a specified height */
                                  background-position: center; /* Center the image */
                                  background-repeat: no-repeat; /* Do not repeat the image */
                                  /* Resize the background image to cover the entire container */
                                  position:relative;
                            }
                           .myImg {
                              width: 60%;
                             padding:120px;
                            margin-left: auto;
                            margin-right: auto;
                            display: block;
                            opacity:0.3;
                            z-index:1000;
                        }
                           .myData{
                               position:absolute;
                           }
                    .container{
                            position: relative;
                            max-width: 800px;
                            margin: 0 auto;
                        }

                    .container img {
                        vertical-align: middle;
                    }

                    .container .content {
                       position: absolute;
                       bottom: 0;
                       background: rgb(0, 0, 0);
                       background: rgba(233, 235, 239, 0.36);
                       color: #130404;
                       width: 100%;
                       padding: 20px;
                    }
                      .less_pad{
padding:1px!important;
}
.pull-right{
float:right;
}
div{
font-size:13px!important;
}
                        </style> "
                   + "</head><body>";

            string sbString = html;


            #region PageHeader
            var page = $@" <div class='container'>
                            <div class='row'>
                                 <div class='col-md-2 logo'>
                                    <div class='logo-image' style='padding:6px!important;'>
                                        <img src = '{AppDomain.CurrentDomain.BaseDirectory}/contents/img/sbtet-logo.png' class='img-responsive logoImg pull-left' />
                                    </div>
                                </div>

                                <div class='col-md-10 title'>
                                    <h4 class='text-center hall_head' ><b>State Board of Technical Education & Training, Telangana</b></h4>
                                    <h4 class='text-center'>
                                       <b>POLYCET – 2023 Consolidated Attendance</b>
                                    </h4>
                                  
                                </div>
                               
                            </div>
                    </div>";



            #endregion

            #region PageContent
            page += $@"  <div class='container'>
                    <hr class='myHr' />
                    <div class='marginData'>
                        <div class='row'>

                            <div class='col-md-12'>
                                <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'>EXAMINATION CENTRE CODE </b>: {InterimData[0].CentreCode ?? "-"} .</div>                               
                            </div>
                            <div class='col-md-12'>
                                <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'>EXAMINATION CENTRE </b>: {InterimData[0].ExaminationCentreName ?? "-"}.</div>                               
                            </div>
                            <div class='col-md-12'>
                                <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'>NUMBER OF THE CANDIDATES ALLOTED TO THE CENTRE </b>: {InterimData[0].AllotedCount ?? "-"}.</div>                               
                            </div>
                            <div class='col-md-12'>
                                <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'>TOTAL NUMBER OF CANDIDATES PRESENT </b>: {InterimData[0].PresentCount ?? "-"}.</div>                               
                            </div>
                            <div class='col-md-12'>
                            <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'></b>";
                            if (PresentiesCount.Length > 0)
                            {
                                for (var i = 0; i < PresentiesCount.Length; i++)
                                {
                                    page += $@"{PresentiesCount[i].PresentHallTicketNo ?? "-"}, ";
                                }
                            }
                            else
                            {
                                page += $@" -";
                            }
                            page += $@"</div>                               
                            </div>
                            <div class='col-md-12'>
                                <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'>TOTAL NUMBER OF SG's Issued </b>: {InterimData[0].SGCount ?? "-"}.</div>                               
                            </div>
                            <div class='col-md-12'>
                            <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'></b>";
                            if (SGCount.Length > 0)
                            {
                                for (var i = 0; i < SGCount.Length; i++)
                                {
                                    page += $@"{SGCount[i].SGOMRNumber ?? "-"}, ";
                                }
                            }
                            else
                            {
                                page += $@" -";
                            }
                            page += $@"</div>                               
                            </div>
                            
                            <div class='col-md-12'>
                                <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'>TOTAL NUMBER OF ABSENTEES </b>: {InterimData[0].AbsentCount ?? "-"}.</div>                               
                            </div>
                            <div class='col-md-12'>
                            <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'></b>";
                            if (AbsentiesCount.Length > 0)
                            {
                                for (var i = 0; i < AbsentiesCount.Length; i++)
                                {
                                    page += $@"{AbsentiesCount[i].AbsentHallTicketNo ?? "-"}, ";
                                }
                            }
                            else
                            {
                                page += $@" -";
                            }
                            page += $@"</div>                               
                            </div>

                            <div class='col-md-12'>
                                <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'>TOTAL NUMBER OF MALPRACTICE CASES </b>: {InterimData[0].MalpracticeCount ?? "-"}.</div>                               
                            </div>
                            <div class='col-md-12'>
                            <div style='line-height: 2.0;font-size:14px!important;'><b class='border_btm'></b>";
                            if (MalpracticeCount.Length > 0)
                            {
                                for (var j = 0; j < MalpracticeCount.Length; j++)
                                {
                                    page += $@"{MalpracticeCount[j].MalpracticeHallTicketNo ?? "-"},";
                                }
                            }
                            else
                            {
                                page += $@" -";
                            }
                            page += $@"</div>                               
                            </div>

                          
 
                        </div>
             
                       
                    </div>
                </div>
             <div class='container'>
            <br />";


            page += $@" <div class='sm-spacer'></div>
					   <div class='sm-spacer'></div>
					 <div class='row'>
						<div class='col-md-12'>
							
                            <div style='line-height: 2.0;font-size:14px!important;'><b>Date :  {DateTime.Now.ToString("dd-MM-yyyy")}</b></div>
						</div> 
<div class='col-md-12'>
							<div class='pull-right'style='font-size:15px!important' >
                        SIGNATURE OF THE CHIEF SUPERINTENDENT WITH OFFICE SEAL
										
</div> 
						</div> 


					</div>";
            page += $@"</div>             
            </div>";
            #endregion

            sbString += page;
            sbString += " </body></html>";

            var converter = new HtmlToPdf();
            converter.Options.ExternalLinksEnabled = true;
            converter.Options.DisplayHeader = true;
            converter.Options.DrawBackground = false;
            converter.Options.JavaScriptEnabled = false;
            converter.Options.WebPageWidth = 1024;
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;

            var doc = converter.ConvertHtmlString(sbString);
            var path = dir + "AttendanceReport_" + InterimData[0].CentreCode + ".pdf";
            doc.Save(path);
            doc.Close();
            string relativePath = path.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
            return relativePath;
        }


    }
}
