sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("projects.controller.pdp.VOPlanPage", {
        onInit: function () {
            jQuery.sap.includeStyleSheet(
                sap.ui.require.toUrl("projects/css/pdp.css")
            );
        }
	});
});