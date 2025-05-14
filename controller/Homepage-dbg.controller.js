sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("projects.controller.Homepage", {

        onTest: function(){
            var teste = 1;
        },

        onNav: function() {
            this.getOwnerComponent().getRouter().navTo('routePage1');
        }
    });
});