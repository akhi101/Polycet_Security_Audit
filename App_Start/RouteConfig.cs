using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TSPOLYCET
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            ///////////////////-----Twallet Routing------//////////
            routes.MapRoute(
             name: "CallBack",
             url: "callback",
             defaults: new { controller = "CallBack", action = "Index", id = UrlParameter.Optional }
         );
            ///////////////////-----Twallet Routing------//////////
            routes.MapRoute(
                name: "Index",
                url: "{controller}/{action}/{id}",
                defaults: new {id = UrlParameter.Optional}
            );
        }
    }
}
