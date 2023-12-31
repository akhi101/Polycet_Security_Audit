﻿//Html Tag - No-Special-Charter  noSpecialChar
define(['app'], function (app) {
	app.directive('noSpecialChar', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == null)
                        return ''
                    cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    //cleanInputValue = inputValue.replace(/\./g, '');
                    //if (cleanInputValue != inputValue) {
                    //    modelCtrl.$setViewValue(cleanInputValue);
                    //    modelCtrl.$render();
                    //}
                    return cleanInputValue;
                });
            }
        }
    });
});