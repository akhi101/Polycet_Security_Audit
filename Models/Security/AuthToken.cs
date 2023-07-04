using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TSPOLYCET.Models.Security
{
    public class AuthToken
    {
        
        public int UserTypeID { get; set; }

        public int UserID { get; set; }

        public string RegistrationID { get; set; }

        public string UserTypeName { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Session { get; internal set; }
    }
}