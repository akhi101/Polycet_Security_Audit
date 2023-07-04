using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace TSPOLYCET.Models
{
    public class SystemUser
    {


        public int UserTypeID { get; set; }

        public int UserID { get; set; }
        public string RegistrationID { get; set; }

        public string UserTypeName { get; set; }

        public string SessionId { get; set; }
    }

    public class UserAuth
    {
        public string ResponceCode { get; set; }
        public string RespoceDescription { get; set; }
    }

    public class ReCaptcha
    {
        public bool Success { get; set; }
        public float score { get; set; }

    }




}

