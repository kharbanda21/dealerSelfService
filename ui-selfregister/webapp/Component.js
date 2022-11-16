sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "yamaha/oof/uiselfregister/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("yamaha.oof.uiselfregister.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // var jQueryScript = document.createElement('script');
			    // jQueryScript.setAttribute('src', 'https://cdns.gigya.com/js/gigya.js?apikey=3_mK2cmEzLkzhqe4MUrtPncxbv4wKsYAhsew0iVwhVUls3c_Jx_HLX434jAVpq5M_W');
			    // document.head.appendChild(jQueryScript);
            }
        });
    }
);