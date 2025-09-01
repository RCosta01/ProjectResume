sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Link"
], function (
    Control,
    Link
) {
    "use strict";

    return Control.extend("projects.controller.TimelineItem", {
        metadata: {
            properties: {
                title: { type: "string" },
                subtitle: { type: "string" },
                description: { type: "string" },
                date: { type: "string" },
                cssClass: { type: "string", defaultValue: "" },
                demo: { type: "string", defaultValue: "" },
            },
            events: {
                linkPress: {}
            }
        },

        renderer: {
            apiVersion: 2,
            render: function (oRm, oControl) {

                oRm.openStart("div");
                oRm.class("project-content");
                if (oControl.getCssClass()) {
                    oRm.class(oControl.getCssClass());
                }
                oRm.openEnd();

                if (oControl.getTitle()) {
                    oRm.openStart("h2");
                    oRm.openEnd();
                    oRm.text(oControl.getTitle());
                    oRm.close("h2");
                }

                if (oControl.getSubtitle()) {
                    oRm.openStart("h2");
                    oRm.openEnd();
                    oRm.text(oControl.getSubtitle());
                    oRm.close("h2");
                }

                if(oControl.getDemo()){
                    const oLink = new Link({
                        text: 'Demo',
                        press: function() {
                            oControl.fireLinkPress();
                        }
                    }).addStyleClass("timelineLinkAsH2")
                    oRm.renderControl(oLink);
                }

                if (oControl.getDescription()) {
                    oRm.openStart("p");
                    oRm.openEnd();
                    oRm.text(oControl.getDescription());
                    oRm.close("p");
                }

                oRm.close("div"); // content
            }
        }
    });
});