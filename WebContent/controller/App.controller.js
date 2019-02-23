sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel"
], function (Controller, Device, JSONModel) {
    "use strict";
    return Controller.extend( "suek_test.controller.App", {
        onInit: function() {
            console.log( "Init from app ctrl" );
            var oApp = this.byId( "App" );
            // this.mSrv = this.getOwnerComponent().getModel( "srv");
        }

    } );
} );
