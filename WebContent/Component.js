sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/m/BusyDialog"
], function( UIComponent, BusyDialog) {
    "use strict";

    return UIComponent.extend("suek_test.Component", {

        metadata : {
            manifest: "json"
        },

        init: function() {
            sap.ui.core.UIComponent.prototype.init.apply( this, arguments);
            this.oBusy = new BusyDialog();
            this.oBusy.setBusyIndicatorDelay(0);
            
            var i18nModel = this.getModel('i18n');
            // document.title = i18nModel.getResourceBundle().getText('APP_TITLE')

            this.getRouter().initialize();

        }
    });
});