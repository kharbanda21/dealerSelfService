sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Router) {
        "use strict";

        return Controller.extend("yamaha.oof.uiselfregister.controller.Start", {
            onInit: function () {
                
            },

            onPressSignIn: function () {
                var sUrl = "https://rsoi.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=50227c0a-e59c-4777-aebf-d135276119f6#Shell-home";
                sap.ui.require([ "sap/m/library" ], ({URLHelper}) => URLHelper.redirect(sUrl, false));
                // var oRouter = this.getOwnerComponent().getRouter();
                // oRouter.navTo("Routeregister");
            },

            onPressRegister: function () {
                // gigya.accounts.showScreenSet({screenSet:'Default-RegistrationLogin', startScreen:'gigya-register-screen'});
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Routeregister");
            }
        });
    });
