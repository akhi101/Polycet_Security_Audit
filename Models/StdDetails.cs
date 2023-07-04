using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TSPOLYCET.Models
{
    public class StdDetails
    {
        public string StudentName { get; set; }
        public string RegistrationMobile { get; set; }
        public int CasteCategoryID { get; set; }
        public string AadharNumber { get; set; }
        public string CasteCertificateNumber { get; set; }
        public bool CasteVerified { get; set; }
        public string RegistrationEmail { get; set; }
        public string RegistrationPassword { get; set; }
        public string RegistrationAmount { get; set; }
        public int DataType { get; set; }
       public bool encrypted { get; set; }
    }
}