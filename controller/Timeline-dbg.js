sap.ui.define([
  "sap/ui/core/Control",
  "sap/ui/Device"
], function (
  Control,
  Device
) {
  "use strict";

  return Control.extend("projects.controller.Timeline", {
    metadata: {
      properties: {
        data: { type: "object", bindable: "bindable" }
      }
    },

    renderer: {
      apiVersion: 2,
      render: function (oRm, oControl) {
        const aData = oControl.getData() || [];
        if (!sap.ui.Device.system.phone) {
          let maxSize = 50;
          const minDist = 30;
          const maxDist = 300;
          const minVerticalDist = 240;
          let oldDistRight = 300;
          let oldDistLeft = 300;
          const dists = [0];
          for (let i = 1; i < aData.length; i++) {
            const oldDate = aData[i - 1].startDate;
            const newDate = aData[i].startDate;
            const oldDateDate = new Date(oldDate.split('.')[2], oldDate.split('.')[1] - 1)
            const newDateDate = new Date(newDate.split('.')[2], newDate.split('.')[1] - 1)
            const dateDiff = (newDateDate.getTime() - oldDateDate.getTime()) / 1000 / 60 / 60 / 24;
            let pixelDiff = dateDiff * 2;
            if (pixelDiff < minDist) {
              pixelDiff = minDist
            }
            if (pixelDiff > maxDist) {
              pixelDiff = maxDist
            }
            if (i % 2 === 0) {
              if (oldDistLeft + pixelDiff < minVerticalDist) {
                pixelDiff = minVerticalDist - oldDistLeft;
              }
              oldDistRight = pixelDiff
            } else {
              if (oldDistRight + pixelDiff < minVerticalDist) {
                pixelDiff = minVerticalDist - oldDistRight;
              }
              oldDistLeft = pixelDiff
            }
            maxSize = maxSize + pixelDiff;
            dists.push(dists[i - 1] + pixelDiff)
          }

          oRm.openStart("div", oControl);
          oRm.class("timeline");
          oRm.style("position", "relative");
          oRm.style("min-height", maxSize + 150 + "px");
          oRm.openEnd();
        } else {
          oRm.openStart("div", oControl);
          oRm.class("timeline");
          oRm.openEnd();
        }
        if (aData) {
          aData.forEach((item, i) => {
            const side = i % 2 === 0 ? "left" : "right"; // alternate sides

            oRm.openStart("div");
            oRm.class("container");
            oRm.class(side);
            if (!sap.ui.Device.system.phone) {
              oRm.style("position", "absolute");
              oRm.style("top", dists[i] + "px");
            }
            oRm.openEnd();

            oRm.openStart("div");
            oRm.class("content");
            oRm.openEnd();

            oRm.openStart("h2");
            oRm.openEnd();
            oRm.text(item.date || "");
            oRm.close("h2");

            oRm.openStart("h2");
            oRm.openEnd();
            oRm.text(item.title || "");
            oRm.close("h2");

            oRm.openStart("p");
            oRm.openEnd();
            oRm.text(item.description || "");
            oRm.close("p");

            oRm.close("div"); // content
            oRm.close("div"); // container
          });

          oRm.close("div"); // timeline
        }
      }
    }
  });
});