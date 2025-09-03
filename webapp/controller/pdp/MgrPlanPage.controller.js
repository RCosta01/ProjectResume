sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    "../../model/formatter/pdp",
    "sap/ui/core/routing/History",
    'sap/ui/core/SeparatorItem',
    'sap/m/ColumnListItem',
    'sap/m/Input',
    'sap/m/DatePicker',
    'sap/base/util/deepExtend',
    'sap/m/Select',
    'sap/ui/core/Item',
    'sap/m/Button',
    "sap/m/GroupHeaderListItem",
    'sap/m/Token',
    'sap/m/Text',
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, formatter, History, SeparatorItem, ColumnListItem, Input, DatePicker, deepExtend, Select, Item, Button, GroupHeaderListItem, Token, Text, MessageBox) {
        "use strict";

        return Controller.extend("projects.controller.pdp.MgrPlanPage", {
            formatter: formatter,
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                this.oTable = this.getView().byId("objTable");
                this.oReadOnlyTemplate = this.getView().byId("objTable").getBindingInfo("items").template;
                var that = this;
                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                this._i18n = i18n;
                jQuery.sap.includeStyleSheet(
                    sap.ui.require.toUrl("projects/css/pdp.css")
                );
                this.oEditableTemplate = new ColumnListItem({
                    cells: [
                        new Input({
                            value: "{objTab>cust_objectiveName}",
                            editable: { path: 'objTab>cust_objLibraryId', formatter: formatter.editableEdit }
                        }), new Input({
                            value: "{objTab>cust_objectiveDesc}",
                            editable: { path: 'objTab>cust_objLibraryId', formatter: formatter.editableEdit }
                        }), new Select({
                            items: {
                                path: "initiativeList>/",
                                template: new Item({
                                    key: "{initiativeList>externalCode}",
                                    text: "{initiativeList>description}"
                                }),
                            },
                            editable: { path: 'objTab>cust_objLibraryId', formatter: formatter.editableEdit },
                            selectedKey: "{objTab>cust_initiativeType}"
                        }), new Text({
                            text: { parts: [{ path: 'objTab>cust_createdByManager' }, { path: 'i18n>creatorMgrTextMgr' }, { path: 'i18n>creatorMgrTextEmp' }], formatter: formatter.formatCreator },
                        }), new Text({
                            text: { parts: [{ path: 'objTab>cust_objLibraryId' }, { path: 'i18n>creatorMgrTextNew' }, { path: 'i18n>creatorMgrTextLib' }], formatter: formatter.formatIniType },
                        }),
                        new DatePicker({
                            id: "editDatePicker",
                            value: { path: 'objTab>cust_objectiveRealDate', formatter: formatter.formatDate },
                            valueFormat: "dd/MM/yyyy",
                            displayFormat: "long"
                        }), new Input({
                            value: "{objTab>cust_objectiveObs}"
                        }), new Select({
                            items: {
                                path: "objStatusList>/",
                                template: new sap.ui.core.Item({
                                    key: "{objStatusList>externalCode}",
                                    text: "{objStatusList>description}"
                                })
                            },
                            selectedKey: "{objTab>cust_objectiveStatus}"
                        }), new Button({
                            press: [this.onDelete, this],
                            icon: "sap-icon://sys-cancel",
                            tooltip: i18n.getText("removeObjText")
                        })
                    ]
                });
                oRouter.getRoute("RouteMgrPlanPage").attachMatched(this._matchedObject, this);
            },


            _matchedObject: function (oEvent) {
                var data = {
                    data: "sap-icon://person-placeholder"
                };
                this.getView().setModel(new JSONModel(data), "picDetails")
                this.setObjectivesModel(data[0].data);
                this.setCurrentPlanModel(that.getOwnerComponent().getModel("routingInfo").getData().status);
                this.setMobilityPlanModel(data[1].data);
                this.setPlanDetails(that.getOwnerComponent().getModel("routingInfo").getData().cname)
                this.setPrevPlan(that.getOwnerComponent().getModel("routingInfo").getData().pdps);
            },

            setObjectivesModel(oData) {
                var that = this;
                var data = [
                    {
                        "cust_objectiveName": "Formação Excel",
                        "cust_objectiveDesc": "Realizar Formação E-Learning sobre Excel",
                        "cust_createdByManager": true,
                        "cust_objLibraryId": 123,
                        "cust_objectiveRealDate": new Date('2025', '09', '03'),
                        "cust_objectiveObs": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in.",
                        "cust_objectiveStatus": '1'
                    }
                ]
                var oJsonModel = new JSONModel(oData.results);
                that.getView().setModel(oJsonModel, "objTab");
                var items = that.getView().byId("objTable").getItems();
                items.forEach(function (item, i) {
                    if (item.cust_objectiveStatus === "4") {
                        item.addStyleClass("cross");
                    }
                });
                that.setCustomCss();
            },

            setCurrentPlanModel(oData) {
                switch (oData) {
                    case '1':
                        var data = {
                            status: '1',
                            editDate: new Date('2025', '07', '01'),
                            strongPoints: '',
                            improvements: '',
                            cust_empCreationDate: new Date('2025', '07', '01')
                        }
                        break;
                    case '2':
                        var data = {
                            status: '2',
                            editDate: new Date('2025', '07', '01'),
                            strongPoints: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus urna quis dui laoreet cursus. Cras sed turpis quis ipsum mollis gravida ac in dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam sollicitudin mi quis lorem facilisis gravida. Proin at quam volutpat, malesuada est eu, tincidunt lacus. Cras congue quam sed fringilla viverra. Fusce.',
                            improvements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod velit, nec porta magna. Duis ornare felis nec condimentum.',
                            cust_empCreationDate: new Date('2025', '07', '01')
                        }
                    case '3':
                        var data = {
                            status: '3',
                            editDate: new Date('2025', '07', '01'),
                            strongPoints: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus urna quis dui laoreet cursus. Cras sed turpis quis ipsum mollis gravida ac in dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam sollicitudin mi quis lorem facilisis gravida. Proin at quam volutpat, malesuada est eu, tincidunt lacus. Cras congue quam sed fringilla viverra. Fusce.',
                            improvements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod velit, nec porta magna. Duis ornare felis nec condimentum.',
                            cust_empCreationDate: new Date('2025', '07', '01')
                        }
                    default:
                        var data = {}
                        break;
                }
                var oJsonModel = new JSONModel(data);
                this.getView().setModel(oJsonModel, "currentPlan");
                //   that.onGetPrevPlan();
            },

            setPlanDetails(oData2) {
                var that = this;
                var names = oData2.split(' ');
                var oData = this.getOwnerComponent().getModel("pdpConfigData").getData().find(item => item.cust_pdpId === this._pId);
                names = names[0] + " " + names[names.length - 1];
                var oJsonModel = new JSONModel({
                    uName: names,
                    pName: oData.cust_pdpName,
                    cust_pdpMaxObj: oData.cust_pdpMaxObj,
                    cust_pdpMinObj: oData.cust_pdpMinObj
                });
                that.getView().setModel(oJsonModel, "details")
                if (that.getOwnerComponent().getModel("device").oData.system.phone) {
                    that.byId("addLibButtonMobile").bindProperty(
                        "visible",
                        {
                            path: 'currentPlan>/status',
                            formatter: that.formatter.formatVisibilityButtons
                        })
                    that.byId("addCustButtonMobile").bindProperty(
                        "visible",
                        {
                            path: 'currentPlan>/status',
                            formatter: that.formatter.formatVisibilityButtons
                        })
                }
                else {
                    that.byId("addLibButton").bindProperty(
                        "visible",
                        {
                            path: 'currentPlan>/status',
                            formatter: that.formatter.formatVisibilityButtons
                        })
                    that.byId("addCustButton").bindProperty(
                        "visible",
                        {
                            path: 'currentPlan>/status',
                            formatter: that.formatter.formatVisibilityButtons
                        })
                }
            },

            setMobilityPlanModel(oData) {
                var that = this;
                if (oData.results.length > 0) {
                    var oJsonModel = new JSONModel(oData.results[0]);
                    that.getView().setModel(oJsonModel, "mobilityTab");
                    if (oData.results[0].cust_mobAnswer === null) {
                        var state = {
                            noAnswerViewState: true,
                            answerViewState: false,
                            answerEditState: false,
                        }
                    }
                    else {
                        var state = {
                            noAnswerViewState: false,
                            answerViewState: true,
                            answerEditState: false,
                        }
                    }
                }
                else {
                    var state = {
                        noAnswerViewState: true,
                        answerViewState: false,
                        answerEditState: false,
                    }
                }
                that.setMobilityModel(state);
            },

            setMobilityModel(state) {
                var oModel = new JSONModel(state);
                this.getView().setModel(oModel, "mobilityModel");
            },

            setCustomCss: function () {
                var items = this.getView().byId("objTable").getBinding("items").oList;
                var rows = this.getView().byId("objTable").getItems();
                for (var i = 0; i < items.length; i++) {
                    if (items[i].cust_objectiveStatus === "4") {
                        rows[i].addStyleClass("greyBackground");
                        for (var j = 0; j < rows[i].getAggregation("cells").length; j++) {
                            rows[i].getAggregation("cells")[j].addStyleClass("cross");
                        }
                    }
                    else {
                        rows[i].removeStyleClass("greyBackground");
                        for (var j = 0; j < rows[i].getAggregation("cells").length; j++) {
                            rows[i].getAggregation("cells")[j].removeStyleClass("cross");
                        }
                    }
                }
            },

            setPhoto: function (oData) {
                var data = {
                    data: "data:" + oData.mimeType + ";base64," + oData.photo
                };
                var oJsonModel = new JSONModel(data);
                this.getView().setModel(oJsonModel, "picDetails");
            },

            rebindTable: function (oTemplate) {
                this.oTable.bindItems({
                    path: "objTab>/",
                    template: oTemplate,
                    templateShareable: true
                });
                if (oTemplate === this.oReadOnlyTemplate) {
                    this.setCustomCss();
                }
            },

            onEdit: function () {
                this.aObjectives = deepExtend([], this.getView().getModel("objTab").oData);
                this.cPlan = deepExtend([], this.getView().getModel("currentPlan").oData);
                if (this.getOwnerComponent().getModel("device").oData.system.phone) {
                    this.byId("importOldButtonMobile").setVisible(false);
                    this.byId("addLibButtonMobile").setVisible(false);
                    this.byId("addCustButtonMobile").setVisible(false);
                }
                else {
                    this.byId("importOldButton").setVisible(false);
                    this.byId("addLibButton").setVisible(false);
                    this.byId("addCustButton").setVisible(false);
                }
                this.byId("objTabHelp").setVisible(false);
                this.byId("objTabEditHelp").setVisible(true);
                this.byId("submitButton").setVisible(false);
                this.byId("editButton").setVisible(false);
                this.byId("saveButton").setVisible(true);
                this.byId("cancelButton").setVisible(true);
                this.byId("textArImp").setVisible(true);
                this.byId("textImp").setVisible(false);
                this.byId("textArStrP").setVisible(true);
                this.byId("textStrP").setVisible(false);
                this.rebindTable(this.oEditableTemplate);
            },

            onCancel: function () {
                if (this.getOwnerComponent().getModel("device").oData.system.phone) {
                    if (this._oPId !== undefined) {
                        this.byId("importOldButtonMobile").setVisible(true);
                    }
                    this.byId("addLibButtonMobile").setVisible(true);
                    this.byId("addCustButtonMobile").setVisible(true);
                }
                else {
                    if (this._oPId !== undefined) {
                        this.byId("importOldButton").setVisible(true);
                    }
                    this.byId("addLibButton").setVisible(true);
                    this.byId("addCustButton").setVisible(true);
                }
                this.byId("objTabHelp").setVisible(true);
                this.byId("objTabEditHelp").setVisible(false);
                if (this.getView().getModel("currentPlan").oData.status === "1") {
                    this.byId("submitButton").setVisible(true);
                }
                this.byId("editButton").setVisible(true);
                this.byId("cancelButton").setVisible(false);
                this.byId("saveButton").setVisible(false);
                this.byId("textArImp").setVisible(false);
                this.byId("textImp").setVisible(true);
                this.byId("textArStrP").setVisible(false);
                this.byId("textStrP").setVisible(true);
                this.getView().getModel().resetChanges({ groupId: "group1" });
                this.getView().getModel().mDeferredRequests = {};
                this.getView().getModel("objTab").setData(this.aObjectives);
                this.getView().getModel("currentPlan").setData(this.cPlan);
                this.rebindTable(this.oReadOnlyTemplate);
            },

            onSave: async function () {
                var cPlan = this.getView().getModel("currentPlan").oData;
                var model = this.getView().getModel();
                var that = this;
                var count = 0;
                for (var i = 0; i < this.getView().getModel("objTab").oData.length; i++) {
                    if (this.getView().getModel("objTab").oData[i].cust_objectiveStatus !== '4') {
                        count++;
                    }
                }
                if (count > this.getView().getModel("details").oData.cust_pdpMaxObj) {
                    MessageBox.error(this._i18n.getText("extraInitiatives", [this.getView().getModel("details").oData.cust_pdpMaxObj]))
                    return;
                }
                if (cPlan.status === '3' && count < this.getView().getModel("details").oData.cust_pdpMinObj) { // verificar se no estado 3 há menos de 3 iniciativas
                    MessageBox.error(this._i18n.getText("notEnoughInitiativesSave", [this.getView().getModel("details").oData.cust_pdpMinObj]), {
                        onClose: function () {
                            that.onCancel();
                        }
                    })
                    return;
                }
                this.byId("mgrPlan").setBusy(true);
                if (this.getOwnerComponent().getModel("device").oData.system.phone) {
                    if (this._oPId !== undefined && cPlan.status === 1) {
                        this.byId("importOldButtonMobile").setVisible(true);
                    }
                    this.byId("addLibButtonMobile").setVisible(true);
                    this.byId("addCustButtonMobile").setVisible(true);
                }
                else {
                    if (this._oPId !== undefined && cPlan.status === 1) {
                        this.byId("importOldButton").setVisible(true);
                    }
                    this.byId("addLibButton").setVisible(true);
                    this.byId("addCustButton").setVisible(true);
                }
                this.byId("editButton").setVisible(true);
                var modelData = deepExtend([], this.getView().getModel("objTab").oData);
                for (var i = 0; i < modelData.length; i++) {
                    for (var j = 0; j < this.aObjectives.length; j++) {
                        if (modelData[i].cust_objectiveId === this.aObjectives[j].cust_objectiveId) {
                            if (modelData[i].cust_objectiveObs !== this.aObjectives[j].cust_objectiveObs
                                || modelData[i].cust_initiativeType !== this.aObjectives[j].cust_initiativeType
                                || modelData[i].cust_objectiveDesc !== this.aObjectives[j].cust_objectiveDesc
                                || modelData[i].cust_objectiveName !== this.aObjectives[j].cust_objectiveName
                                || modelData[i].cust_objectiveStatus !== this.aObjectives[j].cust_objectiveStatus
                                || this.aObjectives[j].cust_objectiveRealDate.getDate() !== this.byId("objTable").getItems()[i].getAggregation("cells")[5].getDateValue().getDate()
                                || this.aObjectives[j].cust_objectiveRealDate.getMonth() !== this.byId("objTable").getItems()[i].getAggregation("cells")[5].getDateValue().getMonth()
                                || this.aObjectives[j].cust_objectiveRealDate.getFullYear() !== this.byId("objTable").getItems()[i].getAggregation("cells")[5].getDateValue().getFullYear()) {
                                //JR var path = "/cust_pdpObjectives(cust_pdpEmployees_cust_empId='" + modelData[i].cust_pdpEmployees_cust_empId + "',cust_objectiveId='" + modelData[i].cust_objectiveId + "',cust_pdpConfig_cust_pdpId='" + modelData[i].cust_pdpConfig_cust_pdpId + "')";
                                var path = "/cust_pdpObjectives(cust_objectiveId='" + modelData[i].cust_objectiveId + "')";
                                var odata = {
                                    cust_pdpEmployees_cust_empId: modelData[i].cust_pdpEmployees_cust_empId,
                                    cust_objectiveStatus: modelData[i].cust_objectiveStatus,
                                    cust_initiativeType: modelData[i].cust_initiativeType,
                                    cust_objectiveObs: modelData[i].cust_objectiveObs,
                                    cust_objectiveRealDate: new Date(this.byId("objTable").getItems()[i].getAggregation("cells")[5].getDateValue()),
                                    cust_objectiveDesc: modelData[i].cust_objectiveDesc,
                                    cust_objectiveName: modelData[i].cust_objectiveName
                                }
                                this.getView().getModel("objTab").oData[i].cust_objectiveRealDate = new Date(this.byId("objTable").getItems()[i].getAggregation("cells")[5].getDateValue());
                                model.update(path, odata, {
                                    groupId: "group1",
                                    urlParameters: {
                                        "operation": "updateTeamPDPObjCritical"
                                    }
                                });
                            }
                            break;
                        }
                    }
                }
                if (cPlan.improvements !== this.cPlan.improvements || cPlan.strongPoints !== this.cPlan.strongPoints) {
                    var empPath = "/cust_pdpEmployees(cust_empId='" + this._uId + "',cust_pdpConfig_cust_pdpId='" + this._pId + "')";
                    var data = {
                        cust_empId: this._uId,
                        cust_empStrengths: this.getView().getModel("currentPlan").oData.strongPoints,
                        cust_empImprovements: this.getView().getModel("currentPlan").oData.improvements
                    };
                    model.update(empPath, data, {
                        urlParameters: {
                            "operation": "updateMgrPlanPhaseCritical"
                        },
                        groupId: "group1"
                    });
                }
                if (cPlan.status === "3" && model.hasPendingChanges({ groupId: "group1" })) {
                    var dataNotif = {
                        cust_empChangedDate: new Date()
                    };
                    var path = "/cust_pdpNotif('" + this._uId + this._pId + "')";
                    model.update(path, dataNotif, {
                        urlParameters: {
                            "operation": "updateMgrPlanPhaseCritical"
                        },
                        groupId: "group1"
                    });
                }
                this.getView().getModel().submitChanges({
                    groupId: "group1",
                    success: function () {
                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                        MessageBox.success(i18n.getText("iniEditSuccess"));
                        that.byId("mgrPlan").setBusy(false);
                    },
                    error: function (response) {
                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                        MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                        that.byId("mgrPlan").setBusy(false);
                    }
                });

                this.byId("objTabHelp").setVisible(true);
                this.byId("objTabEditHelp").setVisible(false);
                this.getView().getModel("objTab").refresh();
                if (cPlan.status === "1") {
                    this.byId("submitButton").setVisible(true);
                }
                this.byId("cancelButton").setVisible(false);
                this.byId("saveButton").setVisible(false);
                this.byId("textArImp").setVisible(false);
                this.byId("textImp").setVisible(true);
                this.byId("textArStrP").setVisible(false);
                this.byId("textStrP").setVisible(true);
                this.rebindTable(this.oReadOnlyTemplate);
            },

            onNavBack: function () {
                if (this.getView().byId("objTable").getBindingInfo("items").template === this.oEditableTemplate) {
                    this.onCancel();
                }
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    this.byId("mgrPlan").setBusy(true);
                    oRouter.navTo("Routehomepage", true);
                }
            },

            onNewLibObj: function () {
                this._flag = 0;
                this._fragmentId = "libObj";
                if (!this._libObj) {
                    this._libObj = sap.ui.xmlfragment("mgr.fragment.ColabLibObj", this);
                    this.getView().addDependent(this._libObj);
                }
                this._libObj.setModel(this.getView().getModel());
                this._libObj.setModel(this.getView().getModel("initiativeList"), "initiativeList");
                sap.ui.getCore().byId("idDatePickerColabLib").setValue();
                sap.ui.getCore().byId("multiInputColab").removeAllTokens();
                sap.ui.getCore().byId("ColabLibObs").setValue();
                this._libObj.open();
            },

            onExitLibObj: function () {
                this._libObj.close();
            },

            onCreateLibObj: function () {
                var that = this;
                var flag = 0;
                var model = this.getView().getModel();
                var obj = sap.ui.getCore().byId("multiInputColab").getTokens();
                var date = sap.ui.getCore().byId("idDatePickerColabLib").getDateValue();
                if (obj.length === 0 || date === null) {
                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                    MessageBox.error(i18n.getText("missingFields"));
                    this.byId("mgrPlan").setBusy(false);
                    return;
                }
                this.byId("mgrPlan").setBusy(true);
                var that = this;
                var count = 0;
                for (var j = 0; j < this.getView().getModel("objTab").oData.length; j++) {
                    if (this.getView().getModel("objTab").oData[j].cust_objectiveStatus !== "4") {
                        count++;
                    }
                }
                if (parseInt(this.getView().getModel("details").oData.cust_pdpMaxObj) >= count + obj.length) {
                    if (this._flag === 0) {
                        this._flag = 1;
                        for (var i = 0; i < obj.length; i++) {
                            // var path = "/cust_pdpLibrary('" + obj[i].getProperty("key") + "')";
                            var modData = this.getView().getModel("objTab").oData;
                            for (var j = 0; j < modData.length; j++) {
                                if (modData[j].cust_objLibraryId === obj[i].getProperty("key")) {
                                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                    MessageBox.error(i18n.getText("repeatedObj"));
                                    return;
                                }
                            }
                            model.read("/cust_pdpLibrary", {
                                urlParameters: {
                                    "$filter": "cust_objLibraryId eq '" + obj[i].getProperty("key") + "'",
                                    "operation": "getPDPLibrary"
                                },
                                success: function (oData) {
                                    var data = {
                                        cust_pdpEmployees_cust_empId: that._uId,
                                        cust_pdpConfig_cust_pdpId: that._pId,
                                        cust_objectiveName: oData.results[0].cust_objName,
                                        cust_objectiveDesc: oData.results[0].cust_objDesc,
                                        cust_objectiveObs: sap.ui.getCore().byId("ColabLibObs").getValue(),
                                        cust_objectiveStatus: '1',
                                        cust_initiativeType: oData.results[0].cust_initiativeType,
                                        cust_objectiveType: '1',
                                        cust_objectiveRealDate: date,
                                        cust_createdByManager: true,
                                        cust_objLibraryId: oData.results[0].cust_objLibraryId
                                    }
                                    model.create("/cust_pdpObjectives", data, {
                                        urlParameters: {
                                            "operation": "createMgrLibObjCritical"
                                        },
                                        success(oData2) {
                                            var data = {
                                                cust_empId: that._uId,
                                                cust_pdpConfig_cust_pdpId: that._pId,
                                                cust_empChangedDate: new Date()
                                            }
                                            var path = "/cust_pdpEmployees(cust_empId='" + that._uId + "',cust_pdpConfig_cust_pdpId='" + that._pId + "')"
                                            model.update(path, data, {
                                                urlParameters: {
                                                    "operation": "updateMgrPlanPhaseCritical"
                                                },
                                                groupId: "group1"
                                            })
                                            model.submitChanges({
                                                groupId: "group1"
                                            })
                                            that.getView().getModel("objTab").oData.push(oData2);
                                            that.getView().getModel("objTab").refresh();
                                            that.setCustomCss();
                                            if (flag === 0) {
                                                flag = 1;
                                                that.byId("mgrPlan").setBusy(false);
                                                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                                MessageBox.success(i18n.getText("initiativeLoaded"));
                                            }
                                        },
                                        error: function (response) {
                                            var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                            MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                            that.byId("mgrPlan").setBusy(false);
                                        }
                                    });
                                },
                                error: function (response) {
                                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                    MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                    that.byId("mgrPlan").setBusy(false);
                                }
                            })
                        }
                        that._libObj.close();
                    }
                }
                else {
                    this.byId("mgrPlan").setBusy(false);
                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                    MessageBox.error(i18n.getText("extraInitiatives", [this.getView().getModel("details").oData.cust_pdpMaxObj]))
                }
            },

            onLogout: function () {
                window.location.href = "./do/logout";
            },

            getGroupHeader: function (oGroup) {
                return new SeparatorItem({
                    text: oGroup.key
                });
            },

            onPressSubmit: function () {
                var that = this;
                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                MessageBox.confirm(i18n.getText("planSendConfirm"), {
                    actions: [i18n.getText("buttonConfirmText"), MessageBox.Action.CANCEL],
                    emphasizedAction: i18n.getText("buttonConfirmText"),
                    styleClass: "mySubmitButton2",
                    onClose: function (sAction) {
                        if (sAction === this.actions[0]) {
                            var count = 0;
                            for (var i = 0; i < that.getView().getModel("objTab").oData.length; i++) {
                                if (that.getView().getModel("objTab").oData[i].cust_objectiveStatus !== 4) {
                                    count++;
                                }
                            }
                            if (count >= that.getView().getModel("details").oData.cust_pdpMinObj) {
                                that.byId("mgrPlan").setBusy(true);
                                var filters = [];
                                filters.push(new Filter("cust_empId", "EQ", that._uId));
                                filters.push(new Filter("cust_pdpConfig_cust_pdpId", "EQ", that._pId));
                                var model = that.getView().getModel();
                                var teamModel = that.getView().getModel("TeamPDP").oData.data;
                                if (that.getView().getModel("currentPlan").oData.status === "1") {
                                    var data = {
                                        cust_empId: that._uId,
                                        cust_pdpConfig_cust_pdpId: that._pId,
                                        cust_empStatus: "2",
                                        cust_empEditDate: new Date()
                                    };
                                    var dataNotif = {
                                        externalCode: that._uId + that._pId,
                                        cust_empId: that._uId,
                                        cust_empStatus: "2",
                                        cust_pdpConfig_cust_pdpId: that._pId,
                                        cust_empEditDate: new Date(),
                                    }
                                    model.create("/cust_pdpNotif", dataNotif, {
                                        //groupId: "group1",
                                        urlParameters: {
                                            "operation": "createMgrPlanPhaseCritical"
                                        },
                                        error: function (response) {
                                            var path = "/cust_pdpNotif('" + dataNotif.externalCode + "')";
                                            model.update(path, dataNotif, {
                                                urlParameters: {
                                                    "operation": "updatePersPlanPhase"
                                                }
                                            });
                                        }
                                    })
                                    var path = "/cust_pdpEmployees(cust_empId='" + that._uId + "',cust_pdpConfig_cust_pdpId='" + that._pId + "')"
                                    model.update(path, data, {
                                        groupId: "group1",
                                        urlParameters: {
                                            "operation": "updateMgrPlanPhaseCritical"
                                        }
                                    })
                                    that.getView().getModel("currentPlan").oData.status = "2";
                                    that.getView().getModel("currentPlan").oData.cust_empEditDate = new Date();
                                    that.getView().byId("objHeaderPlan").getBinding("number").refresh();
                                    for (var i = 0; i < teamModel.length; i++) {
                                        if (teamModel[i].pId === that._pId && teamModel[i].NColab === that._uId) {
                                            that.getView().getModel("TeamPDP").oData.data[i].Status = "2";
                                        }
                                    }
                                }
                                that.getView().getModel("TeamPDP").refresh();
                                that.getView().getModel("currentPlan").refresh();
                                that.setCustomCss();
                                model.submitChanges({
                                    groupId: "group1",
                                    success: function () {
                                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                        MessageBox.success(i18n.getText("planSubmitSuccess"));
                                        that.byId("mgrPlan").setBusy(false);
                                    },
                                    error: function (response) {
                                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                        MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                        that.byId("mgrPlan").setBusy(false);
                                    }
                                });
                            }
                            else {
                                MessageBox.error(that._i18n.getText("notEnoughInitiatives", [that.getView().getModel("details").oData.cust_pdpMinObj]))
                            }
                        }
                    }
                });
            },

            onCreateCustom: function () {
                this._flag = 0;
                this._fragmentId = "custObj";
                if (!this._custObj) {
                    this._custObj = sap.ui.xmlfragment("mgr.fragment.ColabCustObj", this);
                    this.getView().addDependent(this._custObj);
                }
                this._custObj.setModel(this.getView().getModel("initiativeList"), "initiativeList");
                sap.ui.getCore().byId("idDatePickerColabCust").setValue();
                sap.ui.getCore().byId("initTypSelCust").setSelectedKey();
                sap.ui.getCore().byId("idCustObjName").setValue();
                sap.ui.getCore().byId("idCustObjDesc").setValue();
                sap.ui.getCore().byId("idObsCustColab").setValue();
                this._custObj.open();
            },

            onExitCustObj: function () {
                this._custObj.close();
            },

            onCreateCustObj: function () {
                var that = this;
                var date = sap.ui.getCore().byId("idDatePickerColabCust").getDateValue();
                if (date === null || sap.ui.getCore().byId("idCustObjName").getValue() === '' || sap.ui.getCore().byId("idCustObjDesc").getValue() === '') {
                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                    MessageBox.error(i18n.getText("missingFields"));
                    this.byId("mgrPlan").setBusy(false);
                    return;
                }
                var count = 0;
                for (var j = 0; j < this.getView().getModel("objTab").oData.length; j++) {
                    if (this.getView().getModel("objTab").oData[j].cust_objectiveStatus !== "4") {
                        count++;
                    }
                }
                if (parseInt(this.getView().getModel("details").oData.cust_pdpMaxObj) >= count + 1) {
                    if (this._flag === 0) {
                        this._flag = 1;
                        var flag = 0;
                        var model = this.getView().getModel();
                        var iniTyp = sap.ui.getCore().byId("initTypSelCust").getSelectedKey();
                        this.byId("mgrPlan").setBusy(true);
                        var that = this;
                        var data = {
                            cust_pdpEmployees_cust_empId: this._uId,
                            cust_pdpConfig_cust_pdpId: this._pId,
                            cust_objectiveName: sap.ui.getCore().byId("idCustObjName").getValue(),
                            cust_objectiveDesc: sap.ui.getCore().byId("idCustObjDesc").getValue(),
                            cust_objectiveObs: sap.ui.getCore().byId("idObsCustColab").getValue(),
                            cust_objectiveStatus: '1',
                            cust_initiativeType: iniTyp,
                            cust_objectiveType: '2',
                            cust_objectiveRealDate: date,
                            cust_createdByManager: true
                        }
                        this._flag = 1;
                        model.create("/cust_pdpObjectives", data, {
                            urlParameters: {
                                "operation": "createMgrLibObjCritical"
                            },
                            success(oData) {
                                var data = {
                                    cust_empId: that._uId,
                                    cust_pdpConfig_cust_pdpId: that._pId,
                                    cust_empChangedDate: new Date()
                                }
                                var path = "/cust_pdpEmployees(cust_empId='" + that._uId + "',cust_pdpConfig_cust_pdpId='" + that._pId + "')"
                                model.update(path, data, {
                                    urlParameters: {
                                        "operation": "updateMgrPlanPhaseCritical"
                                    },
                                    groupId: "group1"
                                })
                                model.submitChanges({
                                    groupId: "group1"
                                })
                                that.getView().getModel("objTab").oData.push(oData);
                                that.getView().getModel("objTab").refresh();
                                that.setCustomCss();
                                if (flag === 0) {
                                    flag = 1;
                                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                    MessageBox.success(i18n.getText("iniSaveSuccess"));
                                    that.byId("mgrPlan").setBusy(false);
                                }
                            },
                            error: function (response) {
                                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                that.byId("mgrPlan").setBusy(false);
                            }
                        });
                        this._custObj.close();
                    }
                }
                else {
                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                    MessageBox.error(i18n.getText("extraInitiatives", [this.getView().getModel("details").oData.cust_pdpMaxObj]))
                    this.byId("mgrPlan").setBusy(false);
                }
            },

            onDelete: function (oEvent) {
                this.byId("mgrPlan").setBusy(true);
                var that = this;
                this._context = oEvent.getSource().oPropagatedProperties.oBindingContexts.objTab.sPath.split('/')[1];
                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                MessageBox.confirm(i18n.getText("iniDelConfirm"), {
                    actions: [i18n.getText("buttonConfirmYes"), i18n.getText("buttonConfirmNo")],
                    emphasizedAction: i18n.getText("buttonConfirmYes"),
                    styleClass: "mySubmitButton2",
                    onClose: function (sAction) {
                        if (sAction === this.actions[0]) {
                            var obj = deepExtend({}, that.getView().getModel("objTab").oData[that._context]);
                            //JR var path = "/cust_pdpObjectives(cust_pdpEmployees_cust_empId='" + obj.cust_pdpEmployees_cust_empId + "',cust_pdpConfig_cust_pdpId='" + obj.cust_pdpConfig_cust_pdpId + "',cust_objectiveId='" + obj.cust_objectiveId + "')";
                            var path = "/cust_pdpObjectives(cust_objectiveId='" + obj.cust_objectiveId + "')";
                            var model = that.getView().getModel("objTab").oData
                            for (var i = 0; i < model.length; i++) {
                                model[i].cust_objectiveRealDate = new Date(that.byId("objTable").getItems()[i].getAggregation("cells")[5].getDateValue())
                            }
                            model.splice(that._context, 1);
                            that.getView().getModel("objTab").refresh();
                            that.getView().getModel().remove(path, {
                                urlParameters: {
                                    "operation": "removeMgrObjCritical"
                                },
                                groupId: "group1"
                            });
                            that.byId("mgrPlan").setBusy(false);
                        }
                        else {
                            that.byId("mgrPlan").setBusy(false);
                        }
                    }
                });
            },

            onPullPlan: function () {
                var that = this;
                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                MessageBox.confirm(i18n.getText("planPullConfirm"), {
                    actions: [i18n.getText("buttonConfirmText"), MessageBox.Action.CANCEL],
                    emphasizedAction: i18n.getText("buttonConfirmText"),
                    styleClass: "mySubmitButton2",
                    onClose: function (sAction) {
                        if (sAction === this.actions[0]) {
                            that.byId("mgrPlan").setBusy(true);
                            var model = that.getView().getModel();
                            var data = {
                                cust_empId: that._uId,
                                cust_pdpConfig_cust_pdpId: that._pId,
                                cust_empStatus: "3",
                                cust_empFinalDate: new Date()
                            };
                            var dataNotif = {
                                cust_empFinalDate: new Date()
                            };
                            var path = "/cust_pdpNotif('" + that._uId + that._pId + "')";
                            model.update(path, dataNotif, {
                                groupId: "group1",
                                urlParameters: {
                                    "operation": "updateMgrPlanPhaseCritical"
                                }
                            })
                            path = "/cust_pdpEmployees(cust_empId='" + that._uId + "',cust_pdpConfig_cust_pdpId='" + that._pId + "')"
                            model.update(path, data, {
                                groupId: "group1",
                                urlParameters: {
                                    "operation": "updateMgrPlanPhaseCritical"
                                }
                            })
                            that.getView().getModel("currentPlan").oData.status = "3";
                            that.getView().getModel("currentPlan").oData.editDate = new Date();
                            that.getView().byId("objHeaderPlan").getBinding("number").refresh();
                            var teamModel = that.getView().getModel("TeamPDP").oData.data;
                            for (var i = 0; i < teamModel.length; i++) {
                                if (teamModel[i].pId === that._pId && teamModel[i].NColab === that._uId) {
                                    that.getView().getModel("TeamPDP").oData.data[i].Status = "3";
                                }
                            }
                            that.getView().getModel("TeamPDP").refresh();
                            that.getView().getModel("currentPlan").refresh();
                            that.setCustomCss();
                            model.submitChanges({
                                groupId: "group1",
                                success: function () {
                                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                    MessageBox.success(i18n.getText("planPullSuccess"));
                                    that.byId("mgrPlan").setBusy(false);
                                },
                                error: function (response) {
                                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                    MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                    that.byId("mgrPlan").setBusy(false);
                                }
                            });
                        }
                    }
                });
            },

            handleValueHelp: function () {
                var oView = this.getView();

                // create value help dialog
                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = sap.ui.xmlfragment("mgr.fragment.ValueHelp", this);
                    oView.addDependent(this._pValueHelpDialog);
                };
                var model = this.getView().getModel("objTab").oData;
                if (model.length > 0) {
                    var filters = [];
                    for (var i = 0; i < model.length; i++) {
                        if (model[i].cust_objLibraryId !== null && model[i].cust_objLibraryId !== undefined) {
                            filters.push(new Filter("cust_objLibraryId", "NE", model[i].cust_objLibraryId));
                        }
                    }
                    if (filters.length > 0) {
                        var filter = new Filter({
                            filters: filters,
                            and: true
                        });
                        sap.ui.getCore().byId("libObjSearch").getBinding("items").filter([filter]);
                        this._filters = [filter];
                    }
                    else {
                        sap.ui.getCore().byId("libObjSearch").getBinding("items").filter(filters);
                        this._filters = filters;
                    }
                }
                this._pValueHelpDialog.open();
            },

            getGroupHeader: function (oGroup) {
                var model = this.getView().getModel("initiativeList");
                for (var i = 0; i < model.getData().length; i++) {
                    if (model.getData()[i].externalCode === oGroup.key) {
                        var desc = model.getData()[i].description;
                    }
                }
                return new GroupHeaderListItem({
                    title: desc,
                    upperCase: false
                });
            },

            _handleValueHelpSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var filters = deepExtend([], this._filters);
                filters.push(new Filter("cust_objName",
                    sap.ui.model.FilterOperator.Contains,
                    sValue));
                var finFilters = [];
                finFilters.push(new Filter({
                    filters: filters,
                    and: true
                }));
                oEvent.getSource().getBinding("items").filter(filters);
            },

            _handleValueHelpClose: function (oEvent) {
                var aSelectedItems = oEvent.getParameter("selectedItems"),
                    oMultiInput = sap.ui.getCore().byId("multiInputColab");
                oMultiInput.removeAllTokens()
                oEvent.getSource()._aSelectedItems = []
                if (aSelectedItems && aSelectedItems.length > 0) {
                    aSelectedItems.forEach(function (oItem) {
                        oMultiInput.addToken(new Token({
                            text: oItem.getTitle(),
                            key: oItem.getAggregation("customData")[0].getKey()
                        }));
                    });
                }
            },

            setPrevPlan: function (oData) {
                this._oPId = '123';
                var data = {
                    oPId: '123'
                }
                var oJsonModel = new JSONModel(data);
                this.getView().setModel(oJsonModel, "oldPlan");
                this.byId("mgrPlan").setBusy(false);
                if (this.getOwnerComponent().getModel("device").oData.system.phone) {
                    this.byId("importOldButtonMobile").bindProperty(
                        "visible",
                        {
                            parts: [{ path: 'oldPlan>/oPId' }, { path: 'currentPlan>/status' }],
                            formatter: this.formatter.formatVisImpOld
                        });
                }
                else {
                    this.byId("importOldButton").bindProperty(
                        "visible",
                        {
                            parts: [{ path: 'oldPlan>/oPId' }, { path: 'currentPlan>/status' }],
                            formatter: this.formatter.formatVisImpOld
                        });
                }
                return;
            },

            onPressImportOld: function () {
                this._flag = 0;
                this._fragmentId = "impOld";
                if (!this._impOld) {
                    this._impOld = sap.ui.xmlfragment("mgr.fragment.ImportOld", this);
                    this.getView().addDependent(this._impOld);
                }
                this._impOld.setModel(this.getView().getModel());
                sap.ui.getCore().byId("idDatePickerOld").setValue();
                sap.ui.getCore().byId("multiInputOld").removeAllTokens();
                this._impOld.open();
            },

            onExitOld: function () {
                this._impOld.close();
            },

            handleValueHelpOld: function () {
                var oView = this.getView();
                var that = this;
                if (!this._pValueHelpDialogOld) {
                    this._pValueHelpDialogOld = sap.ui.xmlfragment("mgr.fragment.OldIni", this);
                    oView.addDependent(this._pValueHelpDialogOld);
                };
                if (this.getView().getModel("oldPlanObj") === undefined) {
                    var filter = "cust_pdpEmployees_cust_empId eq '" + this._uId + "' and cust_pdpConfig_cust_pdpId eq '" + this._oPId + "' and cust_objectiveStatus ne '3' and cust_objectiveStatus ne '4'";
                    this.getView().getModel().read("/cust_pdpObjectives", {
                        urlParameters: {
                            "$filter": filter,
                            "operation": "getTeamPDPObjCritical"
                        },
                        success: function (oData) {
                            var oJsonModel = new JSONModel(oData.results);
                            that.getView().setModel(oJsonModel, "oldPlanObj");
                            if (oData.results.length !== 0) {
                                var model = that.getView().getModel("objTab").oData;
                                var modelFilters = [];
                                for (var i = 0; i < model.length; i++) {
                                    if (model[i].cust_objLibraryId !== null) {
                                        modelFilters.push(new Filter("cust_objLibraryId", "NE", model[i].cust_objLibraryId));
                                    }
                                }
                                if (modelFilters.length > 0) {
                                    var idFilters = [];
                                    idFilters.push(new Filter({
                                        filters: modelFilters,
                                        and: true
                                    }));
                                    idFilters.push(new Filter("cust_objLibraryId", "EQ", null));
                                    var finFilters = [];
                                    finFilters.push(new Filter({
                                        filters: idFilters,
                                        and: false
                                    }));
                                }
                                else {
                                    finFilters = [];
                                }
                                that._filters = finFilters;
                                that._pValueHelpDialogOld.setModel(that.getView().getModel("oldPlanObj"), "oldPlanObj");
                                sap.ui.getCore().byId("selDialOld").getBinding("items").filter(finFilters);
                                that._pValueHelpDialogOld.open();
                            }
                            else {
                                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                MessageBox.error(i18n.getText("noOldObjectives"));
                            }
                        },
                        error: function (response) {
                            var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                            MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                            that.byId("empPlan").setBusy(false);
                        }
                    })
                }
                else {
                    if (this.getView().getModel("oldPlanObj").oData.length !== 0) {
                        var model = this.getView().getModel("objTab").oData;
                        var modelFilters = [];
                        for (var i = 0; i < model.length; i++) {
                            if (model[i].cust_objLibraryId !== null) {
                                modelFilters.push(new Filter("cust_objLibraryId", "NE", model[i].cust_objLibraryId));
                            }
                        }
                        if (modelFilters.length > 0) {
                            var idFilters = [];
                            idFilters.push(new Filter({
                                filters: modelFilters,
                                and: true
                            }));
                            idFilters.push(new Filter("cust_objLibraryId", "EQ", null));
                            var finFilters = [];
                            finFilters.push(new Filter({
                                filters: idFilters,
                                and: false
                            }));
                        }
                        else {
                            finFilters = [];
                        }
                        this._filters = finFilters;
                        sap.ui.getCore().byId("selDialOld").getBinding("items").filter(finFilters);
                        this._pValueHelpDialogOld.setModel(this.getView().getModel("oldPlanObj"), "oldPlanObj");
                        this._pValueHelpDialogOld.open();
                    }
                    else {
                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                        MessageBox.error(i18n.getText("noOldObjectives"));
                    }
                }
            },

            _handleValueHelpSearchOld: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var filters = deepExtend([], this._filters);
                filters.push(new Filter("cust_objectiveName",
                    sap.ui.model.FilterOperator.Contains,
                    sValue));
                var finFilters = [];
                finFilters.push(new Filter({
                    filters: filters,
                    and: true
                }));
                oEvent.getSource().getBinding("items").filter(filters);
            },

            _handleValueHelpCloseOld: function (oEvent) {
                var aSelectedItems = oEvent.getParameter("selectedItems"),
                    oMultiInput = sap.ui.getCore().byId("multiInputOld");
                oMultiInput.removeAllTokens()
                oEvent.getSource()._aSelectedItems = []
                if (aSelectedItems && aSelectedItems.length > 0) {
                    aSelectedItems.forEach(function (oItem) {
                        oMultiInput.addToken(new Token({
                            text: oItem.getTitle(),
                            key: oItem.getAggregation("customData")[0].getKey()
                        }));
                    });
                }
            },

            _valueHelpUpdateFinished: function () {
                sap.ui.getCore().byId("libObjSearch").setBusy(false);
            },

            _valueHelpUpdateFinishedOld: function () {
                sap.ui.getCore().byId("selDialOld").setBusy(false);
            },

            onConfirmOld: function () {
                this.byId("mgrPlan").setBusy(true);
                var flag = 0;
                var that = this;
                var mInput = sap.ui.getCore().byId("multiInputOld").getTokens();
                var rDate = sap.ui.getCore().byId("idDatePickerOld").getDateValue();
                var count = 0;
                for (var j = 0; j < this.getView().getModel("objTab").oData.length; j++) {
                    if (this.getView().getModel("objTab").oData[j].cust_objectiveStatus !== "4") {
                        count++;
                    }
                }
                if (parseInt(this.getView().getModel("details").oData.cust_pdpMaxObj) >= count + mInput.length) {
                    if (mInput.length === 0 || rDate === null) {
                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                        MessageBox.error(i18n.getText("missingFields"));
                        this.byId("mgrPlan").setBusy(false);
                        return;
                    }
                    if (this._flag === 0) {
                        this._flag = 1;
                        for (var i = 0; i < mInput.length; i++) {
                            var that = this;
                            var model = this.getView().getModel();
                            var key = mInput[i].getProperty("key");
                            var filter = "cust_pdpEmployees_cust_empId eq '" + this._uId + "' and cust_pdpConfig_cust_pdpId eq '" + this._oPId + "' and cust_objectiveId eq '" + key + "'"
                            model.read("/cust_pdpObjectives", {
                                urlParameters: {
                                    "$filter": filter,
                                    "operation": "getTeamPDPObjCritical"
                                },
                                success: function (oData) {
                                    var nIni = {
                                        cust_pdpEmployees_cust_empId: that._uId,
                                        cust_pdpConfig_cust_pdpId: that._pId,
                                        cust_objectiveType: oData.results[0].cust_objectiveType,
                                        cust_initiativeType: oData.results[0].cust_initiativeType,
                                        cust_objectiveName: oData.results[0].cust_objectiveName,
                                        cust_objectiveDesc: oData.results[0].cust_objectiveDesc,
                                        cust_objectiveObs: oData.results[0].cust_objectiveObs,
                                        cust_objectiveStatus: "1",
                                        cust_createdByManager: true,
                                        cust_objLibraryId: oData.results[0].cust_objLibraryId,
                                        cust_objectiveRealDate: rDate
                                    };
                                    model.create("/cust_pdpObjectives", nIni, {
                                        urlParameters: {
                                            "operation": "createMgrLibObjCritical"
                                        },
                                        success: function (oData2) {
                                            var data = {
                                                cust_empId: that._uId,
                                                cust_pdpConfig_cust_pdpId: that._pId,
                                                cust_empChangedDate: new Date()
                                            }
                                            var path = "/cust_pdpEmployees(cust_empId='" + that._uId + "',cust_pdpConfig_cust_pdpId='" + that._pId + "')"
                                            model.update(path, data, {
                                                urlParameters: {
                                                    "operation": "updateMgrPlanPhaseCritical"
                                                },
                                                groupId: "group1"
                                            })
                                            model.submitChanges({
                                                groupId: "group1"
                                            })
                                            that.getView().getModel("objTab").oData.push(oData2);
                                            that.getView().getModel("objTab").refresh();
                                            that.setCustomCss();
                                            if (flag === 0) {
                                                flag = 1;
                                                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                                MessageBox.success(i18n.getText("iniImportSuccess"));
                                                that.byId("mgrPlan").setBusy(false);
                                            }
                                        },
                                        error: function (response) {
                                            var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                            MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                            that.byId("mgrPlan").setBusy(false);
                                        }
                                    });
                                },
                                error: function (response) {
                                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                    MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                    that.byId("mgrPlan").setBusy(false);
                                }
                            })
                        }
                        this._impOld.close();
                    }
                }
                else {
                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                    MessageBox.error(i18n.getText("extraInitiatives", [this.getView().getModel("details").oData.cust_pdpMaxObj]))
                    this.byId("mgrPlan").setBusy(false);
                }
            },

            onMCBSelChange: function (oEvent) {
                if (oEvent.getParameter("selected") && this.byId("mobilityMCB").getSelectedKeys().length > 3)
                    this.byId("mobilityMCB").removeSelectedItem(oEvent.getParameter("changedItem"));
            },

            handleObjTabHelp: function (oEvent) {
                var oButton = oEvent.getSource();
                var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                // create popover
                if (!this._pPopover) {
                    this._pPopover = sap.ui.xmlfragment("mgr.fragment.PopoverTeamHelp", this);
                    this.getView().addDependent(this._pPopover);
                }
                this._pPopover.getAggregation("content")[0].getAggregation("content")[0].setText(i18n.getText("helpMgrTab"))
                this._pPopover.openBy(oButton);
            },

            handleObjTabEditHelp: function (oEvent) {
                var oButton = oEvent.getSource();
                var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                // create popover
                if (!this._pPopover) {
                    this._pPopover = sap.ui.xmlfragment("mgr.fragment.PopoverTeamHelp", this);
                    this.getView().addDependent(this._pPopover);
                }
                this._pPopover.getAggregation("content")[0].getAggregation("content")[0].setText(i18n.getText("helpMgrTabEdit"))
                this._pPopover.openBy(oButton);
            },

            onClosePopover: function () {
                this._pPopover.close()
            }
        });
    });