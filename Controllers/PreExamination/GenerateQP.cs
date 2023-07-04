extern alias itextalias;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using PdfSharp.Pdf.IO;
using SelectPdf;
using SharpCompress.Common;
using SharpCompress.Writers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using TSPOLYCET.Models.Database;

namespace TSPOLYCET.Controllers.PreExamination
{
    public class GenerateQP
    {

        public class QpData
        {
            public Int64 slno { get; set; }

            public string CoordinatingCentre { get; set; }
            public string CentreCode { get; set; }
            public string ExaminationCentre { get; set; }
            public double QPStrength { get; set; }
            public double NoOfPackets { get; set; }
            public double BufferPackets { get; set; }
            public Int64 page_no { get; set; }
           

        }



        public string GetQpPdf(DataSet ds, string QPReportDir)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\QP";
            var qpData = DataTableHelper.ConvertDataTable<QpData>(ds?.Tables[0]);
            CreateIfMissing(dirPath);
            var dir_id = GenerateQPPdfs(qpData);
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\QP\" + dir_id;
            var files = Directory.GetFiles(dir);
            var pdf = Guid.NewGuid().ToString();
            MergePDFs(AppDomain.CurrentDomain.BaseDirectory + @"Reports\" + pdf + ".pdf", files);
            Directory.Delete(dir, true);
            return pdf;
        }



        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
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

       

        private string GenerateQPPdfs(List<QpData> qpData)
        {
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
                            margin-left: 10px;
                        }
                        table {  
                            font-family: Helvetica, Arial, sans-serif; /* Nicer font */
                            width: 100%; 
                            border-collapse: collapse;
                            border-spacing: 0; 
                        }

                        td, th { border: 1px solid #CCC; height: 40px; } /* Make cells a bit taller */

                        th {  
                            font-weight: bold; /* Make sure they're bold */
                        }

                        td {  
                            text-align: center; /* Center our text */
                        }
.brd_btm{
border-bottom:0px;
}
.sm-spacer{
height:70px;
}
.rnd_brd{

border:1px solid #000;
padding :15px 25px 15px 25px;;

}

                        </style> "
                    + "</head><body>";

            string sbString = html;

            var distinctBarcodes = qpData.GroupBy(x => x.page_no)
                                      .Select(grp => grp.First())
                                      .OrderBy(x => x.page_no)
                                      .ThenBy(x => x.page_no)
                                      .ThenBy(x => x.page_no)
                                      .ThenBy(x => x.page_no)
                                      .ToList();
            var dir_id = Guid.NewGuid().ToString();
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\QP\" + dir_id;
            var ppbDir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\QP\PreProcessedBarcodePdf\";
            var studentPhotoDir = ConfigurationManager.AppSettings["Student_Photos"].ToString();
            //var studentPhotoDir = ConfigurationManager.AppSettings["StudentPhotosFolder"].ToString();
            //var studentSignDir = ConfigurationManager.AppSettings["StudentSignaturesFolder"].ToString();
            CreateIfMissing(dir);
            CreateIfMissing(ppbDir);
            int pn = 1;
            foreach (var bc in distinctBarcodes)
            {
                if (File.Exists(ppbDir + $"{bc.CentreCode}_{bc.page_no}.pdf"))
                {
                    File.Copy((ppbDir + $"{bc.CentreCode}_{bc.page_no}.pdf"), (dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf"));
                }
                else
                {
                    #region PageHeader
                    var page = $@"<br /><br /><div class='col-sm-12 col-md-12 col-lg-12'>
                                <h3 class='text-center head_print'><b>State Board of Technical Education & Training, Telangana</b></h3>
                                
                                <h5 class='text-center'><b>COORDINATING CENTRE WISE/CENTRE WISE STRENGTH AND REQUIRED NO. OF QP PACKETS</b></h5>
                            </div>
                            </div>";
                    #endregion
                    #region PageContent
                    page += @"<br />";
                    page += @"<div class='col-md-12'>
<table>
                            <tr>
                                <td id='tbl_head1'><b>Sl.No</b></td>
                                <td id='tbl_head1'><b>Coordinating<br> CentreName</b></td> 
                                <td  id='tbl_head1'><b>Centre Code<br> </b></td>
                                <td  id='tbl_head1'><b>Centre Name</b></td>
                                <td  id='tbl_head1'><b>QP Strength</b></td>
                                <td  id='tbl_head1'><b>No Of Packets</b></td>
                                <td  id='tbl_head1'><b>Buffer Packets</b></td>                              
							</tr>";

                    var students = qpData.Where(x => x.page_no == bc.page_no).ToArray();

                    for (var i = 0; i < 8 && i < students.Length; i++)
                    {
                        page += $@"<tr><td rowspan='2'> {students[i].slno} </td>
                                <td >{students[i].CoordinatingCentre} </td>
                                <td >{students[i].CentreCode} </td>
                                <td td rowspan='2'>{students[i].ExaminationCentre}</td>
                                <td >{students[i].QPStrength}</td>
                                <td   rowspan='2'>{students[i].NoOfPackets}</td>
                                <td   rowspan='2'>{students[i].BufferPackets}</td>
                             
								</tr>
                            ";
                    }
                    page += "</table>";
                    if (students.Length > 8)
                    {
                        page += @"<table>
                            <tr>
                                <td id='tbl_head1'><b>Sl.No</b></td>
                                <td id='tbl_head1'><b>Hall Ticket<br> Number</b></td> 
 <td  id='tbl_head1'><b>Name of the Candidate</b></td> 
                                <td  id='tbl_head1'><b>Father`s Name BOOKLET CODE </b></td>
                                <td  id='tbl_head1'><b>Sex</b></td>
                                <td  id='tbl_head2' class='myead2' width='60'><b>Photo</b></td>
                                
								<td  id='tbl_head2' class='myead2'><b> Signature</b></td>
							</tr>
							<tr>								
                                <td id='tbl_head1'><b> Signature </b></td> 
                            </tr>";
                       
                        page += "</table>";
                    }
                    page += "</td></tr></table>" +
                    "<div class='sm-spacer'></div></div>" +
                    "";
                    #endregion
                    #region PageFooter
                    page += $@"
                            <div class='col-md-12'>
                                <div class='col-md-4'>
                                    <div class='head_text'>Hall No: </div>
                                                      
                                </div>
                                <div class='col-md-4'>
                                    <div class='head_text'>Name & Signature of the Invigilator1  </div>
                                                         
                                </div>
  <div class='col-md-4'>
                                    <div class='head_text'> Name & signature of the Invigilator2</div>
                                                         
                                </div>
                            </div>
 <br />
 <div class='col-md-12'>
                                <div class='col-md-10'>
                                    <div class='head_text' style='margin-top:5px;'><b>{DateTime.Now.ToString("dd-MM-yyyy hh:mm:ss tt")}</b> </div>
                                                      
                                </div>
                                <div class='col-md-2'>
                                    <div class='head_text' style='margin-top:5px;'><b>Page No :{bc.page_no} </b> </div>
                                                         
                                </div>
  
                            </div>
                            
                         
                            </div><div style='page-break-after:always'>&nbsp;<br /></div>";
                    #endregion

                    sbString += page;
                    sbString += "</body></html>";

                    var converter = new HtmlToPdf();
                    converter.Options.ExternalLinksEnabled = true;
                    converter.Options.DrawBackground = false;
                    converter.Options.JavaScriptEnabled = false;
                    converter.Options.WebPageWidth = 1024;
                    converter.Options.PdfPageSize = PdfPageSize.A4;
                    converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;

                    var doc = converter.ConvertHtmlString(sbString);
                    doc.Save(dir + $"\\{pn.ToString().PadLeft(3, '0')}.pdf");
                    doc.Close();

                    sbString = html;
                    File.Copy(dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf", (ppbDir + $"{bc.CentreCode}_{bc.page_no}.pdf"), true);
                }

            }
            return dir_id;
        }

       
    }

}