sap.ui.define([],
	function () {
		"use strict";

		var Formatter = {
			education: function (sEdu) {
				var oBundle = this.getView().getModel( 'i18n' ).getResourceBundle();
				var sValue = "";
				switch (sEdu) {
					case "B":
						sValue = oBundle.getText( 'EDUCATION_BASE' );
						break;
					case "ADD":
						sValue = oBundle.getText( 'EDUCATION_ADDITIONAL' );
						break;
					default:
						break;
				}
				return sValue;
			}
		};

		return Formatter;
},true);
