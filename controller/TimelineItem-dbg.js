sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Link",
    "sap/ui/Device"
], function (
    Control,
    Link,
    Device
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

                oRm.openStart("div", oControl);
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
        },

        /**
         * @override
         * @param {jQuery.Event} oEvent <p>onAfterRendering event object</p>
         * @returns {void|undefined}
         */
        onAfterRendering: function(oEvent) {
            const domRef = this.getDomRef();
            if(!domRef) return;
            const threshold = Device.system.phone ? 0.4 : 0.6;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        domRef.classList.add("projectVisible");
                    } else {
                        domRef.classList.remove("projectVisible");
                    }
                })
            }, { threshold: threshold })
            observer.observe(domRef);
        }
    });
});