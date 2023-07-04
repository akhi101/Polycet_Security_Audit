using TSPOLYCET.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TSPOLYCET.BLL;
using Newtonsoft.Json;
using TSPOLYCET.Controllers.Common;
using System.Web.Http;

namespace TSPOLYCET.Controllers
{
    public class SystemEntityRightsController : BaseController
    {
        public string GetUserModules(int UserTypeID)
        {
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            IEnumerable<SystemModules> SystemGroups = SystemUserBLL.GetUserModules(UserTypeID);
            return JsonConvert.SerializeObject(SystemGroups);
        }

        public string GetUserSubModules(int UserTypeID, int ModuleID)
        {
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            IEnumerable<SystemSubModules> SystemGroups = SystemUserBLL.GetUserSubModules(UserTypeID, ModuleID);
            return JsonConvert.SerializeObject(SystemGroups);
        }

    }
}
