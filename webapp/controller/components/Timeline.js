sap.ui.define([
  "sap/ui/core/Control",
  "sap/ui/Device"
], function (
  Control,
  Device
) {
  "use strict";

  const link = document.createElement("link");
  link.id = "timeline-css";
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = sap.ui.require.toUrl("projects/css/Timeline.css");
  document.head.appendChild(link);

  return Control.extend("projects.controller.components.Timeline", {
    metadata: {
      defaultAggregation: "items",
      aggregations: {
        items: { type: "projects.controller.components.TimelineItem", multiple: true, bindable: "bindable" }
      }
      /*properties: {
        data: { type: "object", bindable: "bindable" }
      } */
    },

    /*renderer: {
      apiVersion: 2,
      render: function (oRm, oControl) {
        const aData = oControl.getData() || [];
        if (aData.length > 0) {
          function parseDate(str) {
            var parts = str.split(".");
            return new Date(parts[2], parts[1] - 1, parts[0]);
          }
          aData.sort(function (a, b) {
            return parseDate(b.startDate) - parseDate(a.startDate);
          });
          aData.sort()
        }
        let dists = [0]
        for (let i = 1; i < aData.length; i++) {
          const oldDate = aData[i - 1].startDate;
          const newDate = aData[i].startDate;
          const oldDateDate = new Date(oldDate.split('.')[2], oldDate.split('.')[1] - 1)
          const newDateDate = new Date(newDate.split('.')[2], newDate.split('.')[1] - 1)
          const dateDiff = (oldDateDate.getTime() - newDateDate.getTime()) / 1000 / 60 / 60 / 24;
          let pixelDiff = Math.round(dateDiff / 30) * 10 // 5px per month
          if(pixelDiff > 50) pixelDiff = 50;
          dists.push(pixelDiff)
        }

        oRm.openStart("div", oControl);
        oRm.class("timeline");
        oRm.openEnd();
        if (aData.length > 0) {
          aData.forEach((item, i) => {
            oRm.openStart("div");
            oRm.class("project");
            if(i !== dists.length + 1) oRm.style("margin-bottom", dists[i + 1] + "px");
            oRm.openEnd();

            oRm.openStart("div");
            oRm.class("project-content");
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
    }, */
    renderer: {
      apiVersion: 2,
      render: function (oRm, oControl) {
        oRm.openStart("div", oControl);
        oRm.class("timeline");
        oRm.openEnd();

        const aData = oControl.getItems();
        let dists = [0]
        for (let i = 1; i < aData.length; i++) {
          const oldDate = aData[i - 1].getProperty('date');
          const newDate = aData[i].getProperty('date');
          const oldDateDate = new Date(oldDate.split('-')[0], oldDate.split('-')[1] - 1)
          const newDateDate = new Date(newDate.split('-')[0], newDate.split('-')[1] - 1)
          const dateDiff = (oldDateDate.getTime() - newDateDate.getTime()) / 1000 / 60 / 60 / 24;
          let pixelDiff = Math.round(dateDiff / 30) * 10 // 5px per month
          if (pixelDiff > 50) pixelDiff = 50;
          dists.push(pixelDiff)
        }

        oControl.getItems().forEach((oItem, i) => {

          oRm.openStart("div", oControl);
          oRm.class("project");
          if(i !== dists.length + 1) oRm.style("margin-bottom", dists[i + 1] + "px");
          oRm.openEnd();

          oRm.renderControl(oItem);

          oRm.close("div"); // container
        });

        oRm.close("div"); // timeline
      }
    }
  });
});