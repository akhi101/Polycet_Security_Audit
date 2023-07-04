define(['app'], function (app) {
    app.service("MasterSettingsService", function (DataAccessService) {

        //this.AddModule = function (ModuleName, ModuleRouteName, ModuleCardColourID, UserName) {
        //    var paramObj = {
        //        "ModuleName": ModuleName, "ModuleRouteName": ModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "UserName": UserName
        //    };
        //    var promise = DataAccessService.postData('api/MasterSettingsService/AddModule', paramObj);
        //    return promise;
        //}

        //this.GetAllModules = function () {

        //    var promise = DataAccessService.getDataWithPara('MasterPage/GetAllModules');
        //    return promise;
        //}

        this.GetModuleColours = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetModuleColours');
            return promise;
        }

        this.GetUserModules = function (UserTypeID) {
            var paramObject = {
                "UserTypeID": UserTypeID
            };
            return DataAccessService.getDataWithPara('MasterPage/GetUserModules', paramObject);
        }

        this.GetAllModules = function (DataType) {
            var paramObject = {
                "DataType": DataType
            };
            return DataAccessService.getDataWithPara('MasterPage/GetAllModules', paramObject);
        }

        this.GetActiveModules = function (DataType) {
            var paramObject = {
                "DataType": DataType
            };
            return DataAccessService.getDataWithPara('MasterPage/GetActiveModules', paramObject);
        }

        this.GetAllSubModules = function () {
            var promise = DataAccessService.getDataWithPara('MasterPage/GetAllSubModules');
            return promise;
        }

        this.AddModule = function (paramObject) {

            return DataAccessService.postData('MasterPage/AddModule', paramObject);
        };


        this.GetEditModules = function (ModuleID) {
            var paramObject = { "ModuleID": ModuleID };
            return DataAccessService.getDataWithPara('MasterPage/GetEditModules', paramObject);
        };

        this.GetEditUserModules = function (UserModuleID) {
            var paramObject = { "UserModuleID": UserModuleID };
            return DataAccessService.getDataWithPara('MasterPage/GetEditUserModules', paramObject);
        };


        this.UpdateModules = function (paramObject) {

            return DataAccessService.postData('MasterPage/UpdateModules', paramObject);
        };

        this.UpdateUserModules = function (paramObject) {

            return DataAccessService.postData('MasterPage/UpdateUserModules', paramObject);
        };



        //this.AddModule = function (ModuleName, ModuleRouteName, ModuleCardColourID, UserName) {
        //    var paramObj = {
        //        "ModuleName": ModuleName, "ModuleRouteName": ModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "UserName": UserName
        //    };
        //    var promise = DataAccessService.postData('MasterPage/AddModule', paramObj);
        //    return promise;
        //}
        this.AddUserModule = function (paramObject) {
            return DataAccessService.postData('MasterPage/AddUserModule', paramObject);

        }

        this.GetSubModules = function (ModuleID) {
            var paramObject = {
                "ModuleID": ModuleID
            };
            return DataAccessService.getDataWithPara('MasterPage/GetSubModules', paramObject);
        }

        this.GetEditSubModules = function (SubModuleID) {
            var paramObject = { "SubModuleID": SubModuleID };
            return DataAccessService.getDataWithPara('MasterPage/GetEditSubModules', paramObject);
        };

        this.GetEditUserSubModules = function (UserSubModuleID) {
            var paramObject = { "UserSubModuleID": UserSubModuleID };
            return DataAccessService.getDataWithPara('MasterPage/GetEditUserSubModules', paramObject);
        };


        this.AddSubModules = function (paramObject) {
            return DataAccessService.postData('MasterPage/AddSubModules', paramObject);
        }


        this.UpdateSubModules = function (paramObject) {

            return DataAccessService.postData('MasterPage/UpdateSubModules', paramObject);
        };

        this.UpdateUserSubModules = function (paramObject) {

            return DataAccessService.postData('MasterPage/UpdateUserSubModules', paramObject);
        };


        this.GetUserSubModules = function (UserTypeID, ModuleID) {
            var paramObject = {
                "UserTypeID": UserTypeID, "ModuleID": ModuleID
            };
            return DataAccessService.getDataWithPara('MasterPage/GetUserSubModules', paramObject);
        }

        this.AddUserSubModules = function (paramObject) {
            return DataAccessService.postData('MasterPage/AddUserSubModules', paramObject);
        }
      
    });
});