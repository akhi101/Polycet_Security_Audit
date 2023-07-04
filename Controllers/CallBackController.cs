using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;
using TSPOLYCET.Models.Security;
using System.Configuration;
using System.Net.Http;
using System.Net;

namespace TSPOLYCET.Controllers
{
    public class CallBackController : Controller
    {
        [ActionName("Index")]
        public ActionResult Index(responseData obj)
        {
            AdminServiceController AdminServiceController = new AdminServiceController();
            var res = AdminServiceController.Page_Load(obj.Data, obj.Skey);
            byte[] bytes = Encoding.UTF8.GetBytes(res);
            string base64 = Convert.ToBase64String(bytes);
            Console.WriteLine(base64);
            return Redirect(string.Format("https://localhost:44355/#!/index/TwalletResponse/" + base64));
            // return RedirectToRoute("https://polycet.sbtet.telangana.gov.in/#!/index/PaymentResponse/"+res);
            // return txtdata;
            // return RedirectPermanent("~/"+ res);
        }

    }

 
   
    public class responseData
    {
        public string Data { get; set; }
        public string Skey { get; set; }


    }

}
