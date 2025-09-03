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
            //window.scrollTo(0, 0);
        },

        onNav: function () {
            this.getOwnerComponent().getRouter().navTo('routePage1');
        },

        onNavDemos: function(oEvent){
            const source = oEvent.getSource()
            const text = source.getText()
            switch (text) {
                case 'PDP':
                    this.onNavPDP()
                    break;
                default:
                    break;
            }
        },

        onNavPDP: function () {
            this.getOwnerComponent().getRouter().navTo('pdpHomepage');
        },

        onLinkpress: function (oEvent) {
            console.log('event Fired!')
            const demo = oEvent.getSource().getBindingContext("Timeline").getProperty('demo')
            switch (demo) {
                case 'PDP':
                    this.onNavPDP()
                    break;
                default:
                    break;
            }
        },

        onOpenGithub: function() {
            window.open("https://github.com/RCosta01", "_blank")
        },

        /**
         * @override
         * @returns {void|undefined}
         */
        onAfterRendering: function() {
            const demosItems = this.byId("demosGrid").getContent();
            if (demosItems.length === 0) {
                setTimeout(() => {
                    if (this.getView()) {
                        this.onAfterRendering();
                    }
                }, 100);
                return;
            }
            for(let i = 0; i < demosItems.length; i++){
                const button = demosItems[i].getItems()[0].getItems()[0];
                const styleClass = demosItems[i].getBindingContext("demos").getProperty("css");
                if(styleClass) button.addStyleClass(styleClass);
            }
        },

        navToExp: function() {
            const profHist = this.byId("professionalHistorySection")
            if(profHist) profHist.$()[0].scrollIntoView({ behavior: "smooth", block: "start" })
        },

        navToDemos: function() {
            const demos = this.byId("demosSection")
            if(demos) demos.$()[0].scrollIntoView({ behavior: "smooth", block: "start" })
        },

        navToProjects: function() {
            const projects = this.byId("projectsSection")
            if(projects) projects.$()[0].scrollIntoView({ behavior: "smooth", block: "start" })
        }
    });
});