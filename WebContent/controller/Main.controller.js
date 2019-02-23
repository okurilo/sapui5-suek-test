sap.ui.define( [
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "suek_test/util/Formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat"
], function( Controller, Device, Formatter, Filter, JSONModel, MessageToast, DateFormat ) {

    "use strict";

    return Controller.extend( "suek_test.controller.Main", {
        Formatter: Formatter,
        onInit: function() {
            console.log( "Init main" );
            var mData = this.getOwnerComponent().getModel( "mData" );

            this.oBusy = this.getOwnerComponent().oBusy;
            // var mData = new  sap.ui.model.json.JSONModel();
            // mData.loadData("json/data.json");
            this.getView().setModel( new JSONModel( {} ) );
            this.getView().setModel( new JSONModel( {
                bEditMode: false,
                sStep: "profile",
                sDocType: "pass"
            } ), "mView" );
            this.getView().setModel( mData, "mData" );

            // this.getView().byId("idIconTabBar")._getIconTabHeader().addEventDelegate({
            //     // ontap: function(evt) {
            //     //     evt.preventDefault();
            //     // },
            //     ontouchstart: function(evt) {
            //         evt.preventDefault();
            //         return false;
            //     },
            //     ontouchmove: function(evt) {
            //         evt.preventDefault();
            //         return false;
            //     },
            //     ontouchend: function(evt) {
            //         evt.preventDefault();
            //         return false;
            //     }
            // }, this);
            // Routing
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute( "main" ).attachMatched( this._onRouteMatched, this );
        },
        _onRouteMatched: function( oE ) {
            console.log( "Route matched" );
            this.oBusy.open();
            this.oBusy.close();
            //var oArguments = oE.getParameter("arguments");
            var oBundle = this.getView().getModel( 'i18n' ).getResourceBundle();

        },
        standartSelect: function( oE ) {
            oE.getSource().setValueState( "None" );
        },
        birthdayDatePicker:function (oE) {
            var sBirthday = oE.getSource().getProperty('dateValue')
            var oToday = new Date();
            var thisYear = 0;
            if (oToday.getMonth() < sBirthday.getMonth()) {
                thisYear = 1;
            } else if ((oToday.getMonth() == sBirthday.getMonth()) && oToday.getDate() < sBirthday.getDate()) {
                thisYear = 1;
            }
            var nAge = oToday.getFullYear() - sBirthday.getFullYear() - thisYear;
            this.getView().getModel( "mData" ).setProperty( "/profile/age", nAge );
        },
        handlePreviousStep: function() {
            var sStep = this.getView().getModel( "mView" ).getProperty( "/sStep" );
            switch ( sStep ) {
                case "doc":
                    this.getView().getModel( "mView" ).setProperty( "/sStep", "profile" );
                    break;
                case "education":
                    this.getView().getModel( "mView" ).setProperty( "/sStep", "doc" );
                    break;
                default:
                    break;
            }
        },
        handleNextStep: function( oE ) {
            var oBundle = this.getView().getModel( 'i18n' ).getResourceBundle();
            var sStep = this.getView().getModel( "mView" ).getProperty( "/sStep" );
            var aProfileInput = [ "idFirstInput", "idLastInput" ];
            var sDocType = this.getView().getModel("mView").getProperty("/sDocType");
            var aDocInput = sDocType === "pass"
                    ? [ "idPassSerInput", "idPassNumInput", "idPassDepartmentInput" ]
                    : [ "idPassSerInput", "idPassNumInput" ];
            var bError = false;
            switch ( sStep ) {
                case "profile":
                    aProfileInput.forEach( function( input ) {
                        var oInput = this.getView().byId( input );
                        if ( !oInput.getValue() ) {
                            oInput.setValueState( "Error" );
                            bError = true;
                            MessageToast.show( oBundle.getText( 'ERROR_NOT_FULL' ) );
                        }
                    }.bind( this ) );
                    if ( !bError ) this.getView().getModel( "mView" ).setProperty( "/sStep", "doc" );
                    break;
                case "doc":
                    aDocInput.forEach( function( input ) {
                        var oInput = this.getView().byId( input );
                        if ( !oInput.getValue() ) {
                            oInput.setValueState( "Error" );
                            bError = true;
                            MessageToast.show( oBundle.getText( 'ERROR_NOT_FULL' ) );
                        }
                    }.bind( this ) );
                    if ( !bError ) this.getView().getModel( "mView" ).setProperty( "/sStep", "education" );
                    break;
                case "3":

                    break;
                default:
                    break;
            }
        },
        handleSave: function() {
            console.log();
            var aEducation = this.getView().getModel("mData").getProperty("/edu");
            if (aEducation.length > 0) {
                var oNavCont = this.getView().byId( "growthNavCon" );
                var oTable = this.getView().byId( "table" );
                oNavCont.to( oTable );
            } else {
                var oBundle = this.getView().getModel( 'i18n' ).getResourceBundle();
                MessageToast.show( oBundle.getText( 'ERROR_NO_EDUCATION' ) );
            }
        },
        handleCancel: function() {
            console.log();
            var oNavCont = this.getView().byId( "growthNavCon" );
            var oProfile = this.getView().byId( "profile" );
            oNavCont.to( oProfile );
        },
        handleAddEducation: function (oE) {
            var aEducation = this.getView().getModel("mData").getProperty("/edu");
            var oEducation = {
                education: "B",
                nameEducation: "",
                profession: "",
                nameForm: "",
                qualification: "",
                numDiplom: "",
                dateEnd: "",
                thesis: ""
            };
            aEducation.unshift(oEducation);
            this.getView().getModel("mData").setProperty("/edu", aEducation);
        },
        handleDeleteEducation: function (oE) {
            var oContext = oE.getSource().getBindingContext("mData");
            var aPath = oContext.getPath().split("/");
            var sIndex = aPath[aPath.length - 1];

            var aEducation = this.getView().getModel("mData").getProperty("/edu");
            aEducation.splice(sIndex, 1);
            this.getView().getModel("mData").setProperty("/edu", aEducation);
        },
        handlePrint:function (oE) {
            var oBundle = this.getView().getModel( 'i18n' ).getResourceBundle();
            MessageToast.show(oBundle.getText('PRINT_LOADING'), {
                duration: 8000
            });
            setTimeout(function () {
                var filename = oBundle.getText('PRINT_FILENAME');
                var element = document.getElementById( this.getView().getId() + "--table" );//document.getElementById("__xmlview2--idDetailPage-cont");
                var elementClone = element.cloneNode( true);
                var elementParent = element.parent;

                html2pdf().from(elementClone.firstChild).set({
                    margin:       [0, 0, 0, 1],
                    filename:     filename + ".pdf",
                    image:        { type: "png", quality: 0.98 },
                    html2canvas:  { allowTaint: false, foreignObjectRendering: false, useCORS: false, imageTimeout: 0 },
                    jsPDF:        { unit: "in", format: "b4", orientation: "portrait" }
                }).save();
            }.bind(this), 1000);

        }

    } );

} );