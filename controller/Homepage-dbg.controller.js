sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("projects.controller.Homepage", {

        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter()
            oRouter.getRoute("RouteHomepage").attachMatched(function (oEvent) {
                sap.ui.getCore().applyTheme("sap_fiori_3_dark");
            }, this);
        },

        onNav: function () {
            this.getOwnerComponent().getRouter().navTo('routePage1');
        },

        onNavPDP: function () {
            this.getOwnerComponent().getRouter().navTo('pdpHomepage');
        },
    });
});