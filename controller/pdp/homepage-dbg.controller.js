sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    "projects/util/formatter",
    'sap/ui/core/SeparatorItem',
    "sap/m/GroupHeaderListItem",
    'sap/m/Token',
    'sap/ui/model/FilterOperator',
    'sap/base/util/deepExtend',
    "sap/m/MessageBox",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    'sap/ui/core/Fragment'
], function (
    Controller, JSONModel, Filter, formatter, SeparatorItem, GroupHeaderListItem, Token, FilterOperator, deepExtend, MessageBox, exportLibrary, Spreadsheet, Fragment
) {
    "use strict";
    const EdmType = exportLibrary.EdmType;

    return Controller.extend("projects.controller.pdp.homepage", {
        formatter: formatter,
        onInit: function () {
            jQuery.sap.includeStyleSheet(
                sap.ui.require.toUrl("projects/css/pdp.css")
            );
            sap.ui.getCore().applyTheme("sap_horizon");
            this._setTeamModel();
            this._setTeamPDPs()
            this._setSmallerModels();
            this._setPersonalPDPs();
            this._setInitiatives();
            this._setTeamPDPModels();
            this._teamPDPData = [];
            this._i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this._opened = [];

            //this.startFilterBar();
            var oRouter = this.getOwnerComponent().getRouter();
        },

        _setTeamModel: function () {
            const data = [
                {
                    "text": "100234 - Olivia Bennett",
                    "key": "100234",
                    "department": "Human Resources",
                    nodes: [
                        {
                            "text": "100239 - Liam Carter",
                            "key": "100239",
                            "department": "Human Resources",
                        }, {
                            "text": "100240 - Emma Rodriguez",
                            "key": "100240",
                            "department": "Human Resources",
                        }
                    ]
                }, {
                    "text": "100235 - Noah Kim",
                    "key": "100235",
                    "department": "Finance & Accounting"
                }, {
                    "text": "100236 - Ava Thompson",
                    "key": "100236",
                    "department": "Finance & Accounting"
                }, {
                    "text": "100237 - Elijah Singh",
                    "key": "100237",
                    "department": "Finance & Accounting"
                }, {
                    "text": "100238 - Sophia Nguyen",
                    "key": "100238",
                    "department": "Research and Development",
                    nodes: [
                        {
                            "text": "100241 - James Patel",
                            "key": "100241",
                            "department": "Research and Development"
                        }, {
                            "text": "100242 - Isabella Rivera",
                            "key": "100242",
                            "department": "Research and Development"
                        }, {
                            "text": "100243 - Lucas Martin",
                            "key": "100243",
                            "department": "Research and Development"
                        }, {
                            "text": "100244 - Mia Schroeder",
                            "key": "100244",
                            "department": "Research and Development"
                        }, {
                            "text": "100245 - Ethan O'Connell",
                            "key": "100245",
                            "department": "Research and Development"
                        }
                    ]
                }
            ]
            this.getView().setModel(new JSONModel(data), "teamsModel")
            setTimeout(() => {
                this.onPressSelectAll();
            }, 500)
        },

        _setTeamPDPs: function () {
            const data = [
                {
                    'Titulo': 'PDP 2025',
                    'Nome': 'Olivia Bennett',
                    'DatadeInicio': new Date('2025', '0', '01'),
                    'EndDate': new Date('2025', '11', '31'),
                    'Status': '1',
                    'NColab': '100234',
                    'pId': 'pdp2025'
                }, {
                    'Titulo': 'PDP 2024',
                    'Nome': 'Olivia Bennett',
                    'DatadeInicio': new Date('2024', '0', '01'),
                    'EndDate': new Date('2024', '11', '31'),
                    'Status': '3',
                    'NColab': '100234',
                    'pId': 'pdp2024'
                }, {
                    'Titulo': 'PDP 2025',
                    'Nome': 'Noah Kim',
                    'DatadeInicio': new Date('2025', '0', '01'),
                    'EndDate': new Date('2025', '11', '31'),
                    'Status': '2',
                    'NColab': '100235',
                    'pId': 'pdp2025'
                }, {
                    'Titulo': 'PDP 2025',
                    'Nome': 'Ava Thompson',
                    'DatadeInicio': new Date('2025', '0', '01'),
                    'EndDate': new Date('2025', '11', '31'),
                    'Status': '3',
                    'NColab': '100236',
                    'pId': 'pdp2025'
                }, {
                    'Titulo': 'PDP 2025',
                    'Nome': 'Elijah Singh',
                    'DatadeInicio': new Date('2025', '0', '01'),
                    'EndDate': new Date('2025', '11', '31'),
                    'Status': '3',
                    'NColab': '100237',
                    'pId': 'pdp2025'
                }, {
                    'Titulo': 'PDP 2025',
                    'Nome': 'Sophia Nguyen',
                    'DatadeInicio': new Date('2025', '0', '01'),
                    'EndDate': new Date('2025', '11', '31'),
                    'Status': '3',
                    'NColab': '100238',
                    'pId': 'pdp2025'
                }, {
                    'Titulo': 'PDP 2025',
                    'Nome': 'Liam Carter',
                    'DatadeInicio': new Date('2025', '0', '01'),
                    'EndDate': new Date('2025', '11', '31'),
                    'Status': '3',
                    'NColab': '100239',
                    'pId': 'pdp2025'
                }
            ]
            this.getView().setModel(new JSONModel(data), "TeamPDP")
        },

        _setPersonalPDPs: function () {
            const data = [
                {
                    'Titulo': 'PDP 2025',
                    'Nome': 'Brandon Murray',
                    'DatadeInicio': new Date('2025', '0', '01'),
                    'EndDate': new Date('2025', '11', '31'),
                    'Status': '2',
                    'NColab': '100210',
                    'pId': 'pdp2025'
                }, {
                    'Titulo': 'PDP 2024',
                    'Nome': 'Brandon Murray',
                    'DatadeInicio': new Date('2024', '0', '01'),
                    'EndDate': new Date('2024', '11', '31'),
                    'Status': '3',
                    'NColab': '100210',
                    'pId': 'pdp2024'
                }
            ]

            this.getView().setModel(new JSONModel(data), "PersonalPDP")
        },

        _setInitiatives: function() {
            const libraryObjectives = [
                {
                    cust_objLibraryId: '896166',
                    cust_objName: 'Gestão',
                    cust_initiativeType: '1',
                    cust_objDesc: 'GESTÃO E LIDERANÇA',
                    mdfSystemStatus: 'A',
                    externalName: 'Gestão'
                }, {
                    cust_objLibraryId: '896167',
                    cust_objName: 'Liderança',
                    cust_initiativeType: '1',
                    cust_objDesc: 'GESTÃO E LIDERANÇA',
                    mdfSystemStatus: 'A',
                    externalName: 'Liderança'
                }, {
                    cust_objLibraryId: '896168',
                    cust_objName: 'Dados',
                    cust_initiativeType: '1',
                    cust_objDesc: 'TÉCNICA E DIGITAL',
                    mdfSystemStatus: 'A',
                    externalName: 'Dados'
                }, {
                    cust_objLibraryId: '896175',
                    cust_objName: 'Cloud',
                    cust_initiativeType: '1',
                    cust_objDesc: 'TECNOLOGIA',
                    mdfSystemStatus: 'A',
                    externalName: 'Cloud'
                }
            ]

            this.getView().setModel(new JSONModel(libraryObjectives), 'libraryObjectives')

            const iniTypes = [
                {
                    externalCode: '1',
                    description: 'Campus'
                }, {
                    externalCode: '2',
                    description: 'Auto-desenvolvimento'
                }, {
                    externalCode: '3',
                    description: 'Projeto'
                }, {
                    externalCode: '4',
                    description: 'Outras Formações'
                }
            ]
            this.getView().setModel(new JSONModel(iniTypes), 'initiativeList')
        },

        _setTeamPDPModels: function() {

            const objTab = [
                {
                    ncolab: '100234',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Projeto PRR / AMI / Testbed 5G',
                    cust_objectiveDesc: 'Participação em projetos transversais ao nível da direção, permitindo ter contactos com outras realidades e conhecimentos, podendo transportar e capitalizar os mesmos para a equipa',
                    cust_initiativeType: '2',
                    cust_createdByManager: true,
                    cust_objLibraryId: '',
                    cust_objectiveRealDate: new Date('2025', '11', '31'),
                    cust_objectiveObs: '',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100234',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Ferramentas',
                    cust_objectiveDesc: 'TRANSVERSAL',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '26'),
                    cust_objectiveObs: 'Formação em PowerBI, como meio de poder melhor gerir e controlar os projetos à sua responsabilidade e poder melhorar tb o reporting de atividade, de forma mais eficaz, e com menor esforço.',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100234',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Liderança',
                    cust_objectiveDesc: 'GESTÃO E LIDERANÇA',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '27'),
                    cust_objectiveObs: 'Liderar a Transformação Digital | Melhorar as softskills de gestão de equipa; Melhorar gestão da relação com stakeholders',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100235',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Ferramentas',
                    cust_objectiveDesc: 'TRANSVERSAL',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '26'),
                    cust_objectiveObs: 'Formação em PowerBI, como meio de poder melhor gerir e controlar os projetos à sua responsabilidade e poder melhorar tb o reporting de atividade, de forma mais eficaz, e com menor esforço.',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100235',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Liderança',
                    cust_objectiveDesc: 'GESTÃO E LIDERANÇA',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '27'),
                    cust_objectiveObs: 'Liderar a Transformação Digital | Melhorar as softskills de gestão de equipa; Melhorar gestão da relação com stakeholders',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100235',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Transformação Digital',
                    cust_objectiveDesc: 'TÉCNICA E DIGITAL',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '27'),
                    cust_objectiveObs: 'Automação Awareness | Oportunidades de melhoria ao nível da estruturação de informação de gestão de projetos, bem como automação de tarefas de menor valor',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100236',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Projeto PRR / AMI / Testbed 5G',
                    cust_objectiveDesc: 'Participação em projetos transversais ao nível da direção, permitindo ter contactos com outras realidades e conhecimentos, podendo transportar e capitalizar os mesmos para a equipa',
                    cust_initiativeType: '2',
                    cust_createdByManager: true,
                    cust_objLibraryId: '',
                    cust_objectiveRealDate: new Date('2025', '11', '31'),
                    cust_objectiveObs: '',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100236',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Ferramentas',
                    cust_objectiveDesc: 'TRANSVERSAL',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '26'),
                    cust_objectiveObs: 'Formação em PowerBI, como meio de poder melhor gerir e controlar os projetos à sua responsabilidade e poder melhorar tb o reporting de atividade, de forma mais eficaz, e com menor esforço.',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100236',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Liderança',
                    cust_objectiveDesc: 'GESTÃO E LIDERANÇA',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '27'),
                    cust_objectiveObs: 'Liderar a Transformação Digital | Melhorar as softskills de gestão de equipa; Melhorar gestão da relação com stakeholders',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100239',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Projeto PRR / AMI / Testbed 5G',
                    cust_objectiveDesc: 'Participação em projetos transversais ao nível da direção, permitindo ter contactos com outras realidades e conhecimentos, podendo transportar e capitalizar os mesmos para a equipa',
                    cust_initiativeType: '2',
                    cust_createdByManager: true,
                    cust_objLibraryId: '',
                    cust_objectiveRealDate: new Date('2025', '11', '31'),
                    cust_objectiveObs: '',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100239',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Ferramentas',
                    cust_objectiveDesc: 'TRANSVERSAL',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '26'),
                    cust_objectiveObs: 'Formação em PowerBI, como meio de poder melhor gerir e controlar os projetos à sua responsabilidade e poder melhorar tb o reporting de atividade, de forma mais eficaz, e com menor esforço.',
                    cust_objectiveStatus: 1
                }, {
                    ncolab: '100239',
                    pId: 'pdp2025',
                    cust_objectiveName: 'Liderança',
                    cust_objectiveDesc: 'GESTÃO E LIDERANÇA',
                    cust_initiativeType: '1',
                    cust_createdByManager: true,
                    cust_objLibraryId: '123',
                    cust_objectiveRealDate: new Date('2025', '11', '27'),
                    cust_objectiveObs: 'Liderar a Transformação Digital | Melhorar as softskills de gestão de equipa; Melhorar gestão da relação com stakeholders',
                    cust_objectiveStatus: 1
                }
            ]
            this.getOwnerComponent().setModel(new JSONModel(objTab), 'objTab')
        },

        _setSmallerModels: function () {
            const statusList = [
                {
                    externalCode: '1',
                    description: 'Inicial'
                }, {
                    externalCode: '2',
                    description: 'Revisão'
                }, {
                    externalCode: '3',
                    description: 'Final'
                }
            ]
            this.getOwnerComponent().setModel(new JSONModel(statusList), "statusList")

            const pdpConfigData = [
                {
                    cust_pdpId: 'pdp2025',
                    cust_pdpName: 'PDP 2025'
                }, {
                    cust_pdpId: 'pdp2024',
                    cust_pdpName: 'PDP 2024'
                }
            ]
            this.getOwnerComponent().setModel(new JSONModel(pdpConfigData), "pdpConfigData")
        },

        getDataIntoModels: function (userId) {
            this._uId = userId;
            var that = this;
            var model = this.getView().getModel();

            var entity = "/User(\'" + userId + "\')";
            model.read(entity, {
                urlParameters: {
                    "$select": "userId,empId,custom04",
                    "operation": "getSFUser"
                },
                groupId: "group1"
            });
            model.read("/cust_pdpConfig", {
                urlParameters: {
                    "$orderby": "cust_pdpInitialDate desc",
                    "operation": "getPersPDPConfig"
                },
                groupId: "group1"
            });

            model.submitChanges({
                groupId: "group1",
                success: function (response) {
                    var data = response.__batchResponses;
                    that.setUserInfo(data[0].data);
                    that.setPDPModel(data[1].data);
                    that.updateTree(that._uId);
                }
            })
        },

        setPDPModel: function (oData) {
            var oJsonModel = new JSONModel(oData.results);
            this.getOwnerComponent().setModel(oJsonModel, "pdpConfigData");
        },

        setUserInfo: function (oData) {
            var oUser = {
                userId: oData.userId,
                empId: oData.empId,
                cname: oData.custom04
            };

            var oModel = new JSONModel(oUser);
            this.getOwnerComponent().setModel(oModel, "userInfo");
        },

        onFinishPersPDPUpdate: function () {
            this.byId("pdp-PersPDP").setBusy(false);
        },

        setPersonalPDP: function (oData) {
            var that = this;
            var filters = "cust_empId eq '" + this._uId + "'"
            this.getView().getModel().read("/cust_pdpEmployees", {
                urlParameters: {
                    "$filter": filters,
                    "operation": "getPersPDP"
                },
                success: function (oData2) {
                    var oJsonModel = new JSONModel({
                        data: []
                    });
                    that._personalPDP = [];
                    for (var i = 0; i < oData2.results.length; i++) {
                        that._personalPDP.push(oData2.results[i]);
                        var pdp = {
                            "Titulo": "",
                            "DatadeInicio": "",
                            "EndDate": "",
                            "Status": oData2.results[i].cust_empStatus,
                            "pId": ""
                        };
                        for (var j = 0; j < oData.length; j++) {
                            if (oData2.results[i].cust_pdpConfig_cust_pdpId === oData[j].cust_pdpId) {
                                pdp.Titulo = oData[j].cust_pdpName;
                                pdp.DatadeInicio = oData[j].cust_pdpInitialDate;
                                pdp.EndDate = oData[j].cust_pdpEndDate;
                                pdp.pId = oData[j].cust_pdpId;
                                oJsonModel.oData.data.push(pdp);
                                break;
                            }
                        }
                    }
                    that.getOwnerComponent().setModel(oJsonModel, "PersonalPDP");
                }
            });
        },

        onLogout: function () {
            window.location.href = "./do/logout";
        },

        createColumnConfig: function () {
            var aCols = [];

            aCols.push({
                label: 'Nome do Plano',
                property: 'pdpTitle',
                type: EdmType.String
            });

            aCols.push({
                label: 'Nome do Colaborador',
                type: EdmType.String,
                property: 'empName'
            });

            aCols.push({
                label: 'Status do Plano',
                property: 'planStat',
                type: EdmType.String
            });

            aCols.push({
                label: 'Título da Iniciativa',
                property: 'iniTitle',
                type: EdmType.String
            });

            aCols.push({
                label: 'Status da Iniciativa',
                property: 'iniStatus',
                type: EdmType.String
            });

            aCols.push({
                label: 'Data de realização',
                property: 'realDate',
                type: EdmType.Date
            });

            aCols.push({
                label: 'Tipo de Iniciativa',
                property: 'iniType',
                type: EdmType.String
            })

            aCols.push({
                label: 'Criador',
                property: 'createdByMgr',
                type: EdmType.Boolean,
                trueValue: 'Chefia',
                falseValue: 'Colaborador'
            });

            return aCols;
        },

        onExport: function () {
            this.byId("pdp-page").setBusy(true);
            var that = this;
            var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
            MessageBox.confirm(i18n.getText("exportConfirm"), {
                actions: [i18n.getText("buttonConfirmText"), MessageBox.Action.CANCEL],
                emphasizedAction: i18n.getText("buttonConfirmText"),
                styleClass: "mySubmitButton2",
                onClose: function (sAction) {
                    if (sAction === this.actions[0]) {
                        var model = that.getView().getModel();
                        var data = that.getView().getModel("TeamPDP").oData.data;
                        for (var i = 0; i < data.length; i++) {
                            var filter = "cust_pdpEmployees_cust_empId eq '" + data[i].NColab + "' and cust_pdpConfig_cust_pdpId eq '" + data[i].pId + "'";
                            model.read("/cust_pdpObjectives", {
                                urlParameters: {
                                    "$filter": filter,
                                    "operation": "getMassObjectives"
                                },
                                groupId: "group1"
                            });
                        }
                        model.submitChanges({
                            groupId: "group1",
                            success: function (response) {
                                var dataArr = [];
                                var oData = response.__batchResponses;
                                for (var i = 0; i < data.length; i++) {
                                    for (var j = 0; j < oData[i].data.results.length; j++) {
                                        var template = {
                                            "pdpTitle": data[i].Titulo,
                                            "empName": data[i].Nome,
                                            "planStat": data[i].Status,
                                            "iniTitle": oData[i].data.results[j].cust_objectiveName,
                                            "iniStatus": "",
                                            "realDate": oData[i].data.results[j].cust_objectiveRealDate,
                                            "iniType": "",
                                            "createdByMgr": oData[i].data.results[j].cust_createdByManager
                                        }
                                        var modelData = that.getView().getModel("objStatusList");
                                        for (var k = 0; k < modelData.getData().length; k++) {
                                            if (modelData.getData()[k].externalCode === oData[i].data.results[j].cust_objectiveStatus) {
                                                template.iniStatus = modelData.getData()[k].description;
                                            }
                                        }
                                        var modelData2 = that.getView().getModel("initiativeList");
                                        for (var k = 0; k < modelData2.getData().length; k++) {
                                            if (modelData2.getData()[k].externalCode === oData[i].data.results[j].cust_initiativeType) {
                                                template.iniType = modelData2.getData()[k].description;
                                            }
                                        }
                                        var modelData3 = that.getView().getModel("statusList");
                                        for (var k = 0; k < modelData3.getData().length; k++) {
                                            if (modelData3.getData()[k].externalCode === data[i].Status) {
                                                template.planStat = modelData3.getData()[k].description;
                                            }
                                        }
                                        dataArr.push(template);
                                    }
                                }
                                var oJsonModel = new JSONModel(dataArr);
                                var aCols = that.createColumnConfig();
                                var oSettings = {
                                    workbook: {
                                        columns: aCols,
                                        hierarchyLevel: 'Level'
                                    },
                                    dataSource: oJsonModel.getProperty("/"),
                                    fileName: 'DirectReportExport.xlsx',
                                    worker: false
                                };
                                var oSheet = new Spreadsheet(oSettings);
                                that.byId("pdp-page").setBusy(false);
                                oSheet.build().finally(function () {
                                    oSheet.destroy();
                                });
                            }
                        })
                    }
                    else {
                        that.byId("pdp-page").setBusy(false);
                    }
                }
            });
        },

        onPressSelectAll: function () {
            if (this.byId("pdp-myTeam").getSelectedItems().length === this.byId("pdp-myTeam").getItems().length) {
                this.byId("pdp-myTeam").removeSelections();
            }
            else {
                this.byId("pdp-myTeam").selectAll();
            }
            this.onSelectEmployee();
        },

        onSelectEmployee: function () {
            var items = this.getView().byId("pdp-filterBar").getFilterGroupItems();
            items[0].getControl().setSelectedKey();
            items[1].getControl().setSelectedKey();
            items[2].getControl().setValue();
            var selPer = this.getView().byId("pdp-myTeam").getSelectedItems();
            var filters = [];
            filters.push(new Filter("NColab", "EQ", "a"));
            for (var i = 0; i < selPer.length; i++) {
                filters.push(new Filter("NColab", "EQ", selPer[i].getBindingContext('teamsModel').getProperty("key")));
            }
            this.getView().byId("pdp-chefiaTable").getBinding("items").filter(filters);
        },

        startFilterBar: function () {
            var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var bar = this.getView().byId("pdp-filterBar");
            bar.addEventDelegate({
                "onAfterRendering": function (oEvent) {
                    var oButton = oEvent.srcControl._oSearchButton;
                    //oButton.setText(i18n.getText("filterButtonText"));
                    oButton.setVisible(false);
                }
            });
        },

        onFilterTable: function () {
            var items = this.getView().byId("pdp-filterBar").getFilterGroupItems();
            var timespan = items[2].getControl().getValue();
            var filters = [];
            filters.push(new Filter("NColab", "EQ", "a"));
            var selPer = this.getView().byId("pdp-myTeam").getSelectedItems();
            for (var i = 0; i < selPer.length; i++) {
                filters.push(new Filter("NColab", "EQ", selPer[i].getBindingContext('teamsModel').getProperty("key")));
            }
            if (timespan !== "") {
                var sSplt = timespan.split(' ')[0].split('/');
                var eSplt = timespan.split(' ')[2].split('/');
                var sDate = new Date(sSplt[2], sSplt[1] - 1, sSplt[0]);
                var eDate = new Date(eSplt[2], eSplt[1] - 1, eSplt[0]);
                filters.push(new Filter({
                    filters: [
                        new Filter("DatadeInicio", "LE", eDate),
                        new Filter("EndDate", "GE", sDate)
                    ],
                    and: true
                }));
            }

            if (items[1].getControl().getValue() !== "") {
                filters.push(new Filter("Status", "EQ", items[1].getControl().getSelectedKey()));
            }

            if (items[0].getControl().getValue() !== "") {
                filters.push(new Filter("pId", "EQ", items[0].getControl().getSelectedKey()));
            }
            this.getView().byId("pdp-chefiaTable").getBinding("items").filter(filters);
        },

        onToggleOpenState: function (oEvent) {
            var oItemContext = oEvent.getParameter("itemContext");
            var iItemIndex = oEvent.getParameter("itemIndex");
            var bExpanded = oEvent.getParameter("expanded");
            if (bExpanded) {
                var sPath = oItemContext.getPath();
                for (var i = 0; i < this._opened.length; i++) {
                    if (sPath === this._opened[i]) {
                        return;
                    }
                }
                this._opened.push(sPath);
                this.byId("pdp-myTeam").getAggregation("items")[iItemIndex].setBusy(true);
                this.fetchNewTree(sPath, iItemIndex);
            }
        },

        fetchNewTree: function (sPath, iItemIndex) {
            var that = this;
            var path = sPath + "/directReports"
            this.getView().getModel().read(path, {
                urlParameters: {
                    "$select": 'userId',
                    "operation": "getUserVO"
                },
                success: function (oData) {
                    if (oData.results.length === 0) {
                        that.byId("pdp-myTeam").getAggregation("items")[iItemIndex].setBusy(false);
                    }
                    var idList = [];
                    for (var i = 0; i < oData.results.length; i++) {
                        idList.push(oData.results[i].userId);
                    }
                    that.addToModel(idList);
                },
                error: function (response) {
                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                    MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                    that.byId("pdp-page").setBusy(false);
                }
            })
        },

        //addToModelRefresh recebe items da árvore, addToModel recebe uma lista de user ids
        addToModel: function (items) {
            var that = this;
            var model = this.getView().getModel();

            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    var filters = "cust_empId eq '" + items[i] + "'"
                    model.read("/cust_pdpEmployees", {
                        urlParameters: {
                            "$filter": filters,
                            "operation": "getEmployeesToModel"
                        },
                        groupId: "group1"
                    });
                }
                model.submitChanges({
                    groupId: "group1",
                    success: function (response) {
                        var data = response.__batchResponses;
                        var pdps = that.getOwnerComponent().getModel("pdpConfigData").oData
                        //iterar users diferentes
                        for (var j = 0; j < data.length; j++) {
                            var emp = data[j].data.results;
                            that._teamPDPData.push(emp);
                            //iterar pdps associados a cada user
                            for (var k = 0; k < emp.length; k++) {
                                var token = 0;
                                if (that._directReports !== undefined) {
                                    if (!that._directReports.includes(emp[k].cust_empId) && emp[k].cust_empStatus !== "3") {
                                        token = 1;
                                    }
                                }
                                if (token === 0) {
                                    var pdp = {
                                        "Titulo": "",
                                        "Nome": "",
                                        "pId": "",
                                        "NColab": "",
                                        "DatadeInicio": "",
                                        "EndDate": "",
                                        "Status": "",
                                        "cust_pdpMaxObj": "",
                                        "cust_pdpMinObj": ""
                                    }
                                    for (var i = 0; i < pdps.length; i++) {
                                        //verificar se este pdpConfig é o correto
                                        if (pdps[i].cust_pdpId === emp[k].cust_pdpConfig_cust_pdpId) {
                                            pdp.Titulo = pdps[i].cust_pdpName;
                                            pdp.Nome = emp[k].cust_empName;
                                            pdp.pId = pdps[i].cust_pdpId;
                                            pdp.NColab = emp[k].cust_empId;
                                            pdp.DatadeInicio = pdps[i].cust_pdpInitialDate;
                                            pdp.EndDate = pdps[i].cust_pdpEndDate;
                                            pdp.Status = emp[k].cust_empStatus;
                                            pdp.cust_pdpMaxObj = pdps[i].cust_pdpMaxObj;
                                            pdp.cust_pdpMinObj = pdps[i].cust_pdpMinObj;
                                            var model = that.getView().getModel("TeamPDP");
                                            var modData = model.getData();
                                            modData.data.push(pdp);
                                            model.setData(modData);
                                            that.getOwnerComponent().setModel(model, "TeamPDP");
                                            break; //break para não iterar sobre o resto dos pdpConfigs
                                        }
                                    }
                                }
                            }
                        }
                        that.byId("pdp-chefiaTable").setBusy(false);
                    },
                    error: function (response) {
                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                        MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                        that.byId("pdp-page").setBusy(false);
                    }
                })
            }
        },

        onNavEmpPlan: function (oEvent) {
            var item = oEvent.getSource().getBindingContext("PersonalPDP").getPath().split('/')[2];
            var model = this.getView().getModel("PersonalPDP").getData().data[item];
            var sPDP = this._personalPDP.find(item => item.cust_pdpConfig_cust_pdpId === model.pId);
            var pdpConfig = this.getOwnerComponent().getModel("pdpConfigData").getData().find(item => item.cust_pdpId === model.pId);
            var data = {
                pId: model.pId,
                sPDP: sPDP,
                pdpConfig: pdpConfig
            };
            var oJsonModel = new JSONModel(data);
            this.getOwnerComponent().setModel(oJsonModel, "routingInfo")
            this.getOwnerComponent().getRouter().navTo("RouteEmpPlanPage");
        },

        onOpenPlan: function (oEvent) {
            var item = oEvent.getSource().getBindingContext("TeamPDP").getPath().split('/')[2];
            var model = this.getView().getModel("TeamPDP").getData().data[item];
            for (var i = 0; i < this._teamPDPData.length; i++) {
                if (this._teamPDPData[i].length > 0) {
                    if (this._teamPDPData[i][0].cust_empId === model.NColab) {
                        var pdps = this._teamPDPData[i];
                        break;
                    }
                }
            }
            // var pdps = this._teamPDPData.find(item => item[0].cust_empId === model.NColab);
            var sPdp = pdps.find(token => token.cust_pdpConfig_cust_pdpId === model.pId);
            var cname = model.Nome
            var pId = model.pId;
            var uId = model.NColab;
            var data = {
                pId: pId,
                uId: uId,
                pdps: pdps,
                sPdp: sPdp,
                cname: cname
            }
            var oJsonModel = new JSONModel(data);
            this.getOwnerComponent().setModel(oJsonModel, "routingInfo");
            for (var i = 0; i < this._directReports.length; i++) {
                if (this._directReports[i] === uId) {
                    this.getOwnerComponent().getRouter().navTo("RouteMgrPlanPage", {
                        uId: window.encodeURIComponent(uId),
                        pId: window.encodeURIComponent(pId)
                    });
                    return;
                }
            }
            this.getOwnerComponent().getRouter().navTo("RouteViewOnlyPlanPage");
        },

        onStartPicklist: function (picklistName, modelName) {
            var that = this;
            for (var i = 0; i < picklistName.length; i++) {
                var entity = "/PickListV2";
                var sFilter = "id eq '" + picklistName[i] + "'";
                this.getOwnerComponent().getModel().read(entity, {
                    groupId: "group1",
                    urlParameters: {
                        "$filter": sFilter,
                        "$expand": "values",
                        "operation": "getPicklist"
                    }
                });
            }
            this.getOwnerComponent().getModel().submitChanges({
                groupId: "group1",
                success: function (oData) {
                    var data = oData.__batchResponses
                    for (var j = 0; j < data.length; j++) {
                        var records = [];
                        var sLabel = "label_" + sap.ui.getCore().getConfiguration().getLanguage();
                        sLabel = sLabel.replace('-', '_');
                        if (data[j].data.results[0].values.results[0][sLabel] === null || data[j].data.results[0].values.results[0][sLabel] === undefined) {
                            sLabel = "label_defaultValue";
                        }
                        for (var k = 0; k < data[j].data.results[0].values.results.length; k++) {
                            var obj = {
                                optionId: data[j].data.results[0].values.results[k].optionId,
                                externalCode: data[j].data.results[0].values.results[k].externalCode,
                                description: data[j].data.results[0].values.results[k][sLabel]
                            };
                            records.push(obj);
                        }
                        var oJModel = new JSONModel(records);
                        oJModel.setSizeLimit(records.length);
                        that.getOwnerComponent().setModel(oJModel, modelName[j]);
                    }
                }
            });

        },

        onOpenMassObj: function () {
            this._fragmentId = "massObj";
            if (!this._massObj) {
                this._massObj = sap.ui.xmlfragment("projects.fragment.pdp.MassCreateObj", this);
                this.getView().addDependent(this._massObj);
            }
            this._massObj.setModel(this.getView().getModel("TeamPDP"), "TeamPDP");
            this._massObj.setModel(this.getView().getModel("initiativeList"), "initiativeList");
            var date = new Date();
            var filters = [];
            filters.push(new Filter({
                filters: [
                    new Filter("DatadeInicio", "LE", date),
                    new Filter("EndDate", "GE", date),
                    new Filter({
                        filters: [
                            new Filter("Status", "EQ", "1"),
                            new Filter("Status", "EQ", "3")
                        ],
                        and: false
                    })
                ],
                and: true
            }));
            sap.ui.getCore().byId("pdp-libObjColab").setSelectedItems();
            sap.ui.getCore().byId("pdp-idMassObjCustColabs").setSelectedItems();
            sap.ui.getCore().byId("pdp-multiInput").removeAllTokens();
            sap.ui.getCore().byId("pdp-libObjColab").setSelectedKeys();
            sap.ui.getCore().byId("pdp-idDatePickerAssign").setDateValue();
            sap.ui.getCore().byId("pdp-idMassLibObs").setValue();
            sap.ui.getCore().byId("pdp-chooseObjButton").setSelectedKey("lib")
            sap.ui.getCore().byId("pdp-idInputCObj").setValue();
            sap.ui.getCore().byId("pdp-idTextAreaCObj").setValue();
            sap.ui.getCore().byId("pdp-idMassObjCustColabs").setSelectedKeys();
            sap.ui.getCore().byId("pdp-idMassObjSelCust").setSelectedKey();
            sap.ui.getCore().byId("pdp-idDatePickerCustObjMass").setDateValue();
            sap.ui.getCore().byId("pdp-idObservCustObjMass").setValue();
            sap.ui.getCore().byId("pdp-libObjColab").getBinding("items").filter(filters);
            sap.ui.getCore().byId("pdp-idMassObjCustColabs").getBinding("items").filter(filters);
            sap.ui.getCore().byId("pdp-addObjectivesCust").setVisible(false);
            sap.ui.getCore().byId("pdp-addObjectivesLib").setVisible(true);
            this._massObj.open();
        },

        onChangeObj: function (oEvent) {
            var key = oEvent.getSource().getSelectedKey();
            if (key === "lib") {
                sap.ui.getCore().byId("pdp-addObjectivesCust").setVisible(false);
                sap.ui.getCore().byId("pdp-addObjectivesLib").setVisible(true);
            }
            else {
                sap.ui.getCore().byId("pdp-addObjectivesLib").setVisible(false);
                sap.ui.getCore().byId("pdp-addObjectivesCust").setVisible(true);
            }
        },

        onExitMassObj: function () {
            this._massObj.close();
        },

        onCreateMassObj: function () {
            this._flag = 0;
            this.byId("pdp-page").setBusy(true);
            var iniTyp = sap.ui.getCore().byId("pdp-chooseObjButton").getSelectedKey();
            var that = this;
            switch (iniTyp) {
                case "lib":
                    var selIni = sap.ui.getCore().byId("pdp-multiInput").getTokens();
                    var users = sap.ui.getCore().byId("pdp-libObjColab").getSelectedKeys();
                    var date = sap.ui.getCore().byId("pdp-idDatePickerAssign").getDateValue();
                    var obs = sap.ui.getCore().byId("pdp-idMassLibObs").getValue();
                    if (selIni.length === 0 || users.length === 0 || date === null) {
                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                        MessageBox.error(i18n.getText("missingFields"))
                        this.byId("pdp-page").setBusy(false);
                        return;
                    }
                    this._flag = 0;
                    for (var i = 0; i < selIni.length; i++) {
                        const teste = 1;
                    }
                    break;
                case "new":
                    var name = sap.ui.getCore().byId("pdp-idInputCObj").getValue();
                    var desc = sap.ui.getCore().byId("pdp-idTextAreaCObj").getValue();
                    var users = sap.ui.getCore().byId("pdp-idMassObjCustColabs").getSelectedKeys();
                    var formTyp = sap.ui.getCore().byId("pdp-idMassObjSelCust").getSelectedKey();
                    var date = sap.ui.getCore().byId("pdp-idDatePickerCustObjMass").getDateValue();
                    var obs = sap.ui.getCore().byId("pdp-idObservCustObjMass").getValue();
                    if (name === "" || desc === "" || users.length === 0 || date === null) {
                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                        MessageBox.error(i18n.getText("missingFields"))
                        this.byId("pdp-page").setBusy(false);
                        return;
                    }
                    var model = this.getView().getModel();
                    var pdpModel = this.getView().getModel("TeamPDP").oData.data;
                    for (var j = 0; j < users.length; j++) {
                        var finalModel = [];
                        var keyDetails = users[j].split(' ');
                        for (var k = 0; k < pdpModel.length; k++) {
                            if (pdpModel[k].pId === keyDetails[1] && pdpModel[k].NColab === keyDetails[0]) {
                                finalModel.push(pdpModel[k]);
                            }
                        }
                        this.createMassCustObj(keyDetails, model, finalModel, name, desc, obs, formTyp, date);
                    }
                    break;
            }
            this._massObj.close();
        },

        createMassCustObj: function (keyDetails, model, pdpModel, name, desc, obs, formTyp, date) {
            var that = this;
            var filters = "cust_pdpEmployees_cust_empId eq '" + keyDetails[0] + "' and cust_pdpConfig_cust_pdpId eq '" + keyDetails[1] + "' and cust_objectiveStatus ne '4'"
            model.read("/cust_pdpObjectives", { //get para verificar o número de iniciativas neste momento
                urlParameters: {
                    "$filter": filters,
                    "operation": "getMassObjectives"
                },
                success: function (oData) {
                    for (var i = 0; i < pdpModel.length; i++) {
                        if (parseInt(pdpModel[i].cust_pdpMaxObj) >= oData.results.length + 1) {
                            var data = {
                                cust_pdpEmployees_cust_empId: keyDetails[0],
                                cust_pdpConfig_cust_pdpId: keyDetails[1],
                                cust_objectiveName: name,
                                cust_objectiveDesc: desc,
                                cust_objectiveObs: obs,
                                cust_objectiveStatus: '1',
                                cust_initiativeType: formTyp,
                                cust_objectiveType: '1',
                                cust_objectiveRealDate: date,
                                cust_createdByManager: true
                            }
                            that.getView().getModel().create("/cust_pdpObjectives", data, {
                                urlParameters: {
                                    "operation": "createMassCustObjCritical"
                                },
                                success: function () {
                                    if (that.byId("pdp-page").isBusy()) {
                                        that.byId("pdp-page").setBusy(false);
                                        var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                        MessageBox.success(i18n.getText("addMassObjSuccess"));
                                        return;
                                    }
                                },
                                error: function (response) {
                                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                    MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                    that.byId("pdp-page").setBusy(false);
                                }
                            });
                        }
                        else {
                            var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                            MessageBox.error(i18n.getText("addMassObjFail"))
                            that.byId("pdp-page").setBusy(false);
                        }
                    }
                },
                error: function (response) {
                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                    MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                    that.byId("pdp-page").setBusy(false);
                }
            })
        },

        createMassLibObj: function (oData, keyDetails, obs, date, len) {
            var that = this;
            var pdpFilters = "cust_pdpEmployees_cust_empId eq '" + keyDetails[0] + "' and cust_pdpConfig_cust_pdpId eq '" + keyDetails[1] + "'";
            that.getView().getModel().read("/cust_pdpObjectives", {
                urlParameters: {
                    "$filter": pdpFilters,
                    "operation": "getMassObjectives"
                },
                success: function (oData2) {
                    var filters = [];
                    filters.push(new Filter("cust_pdpId", "EQ", keyDetails[1]));
                    var filters = "cust_pdpId eq '" + keyDetails[1] + "'"
                    that.getView().getModel().read("/cust_pdpConfig", {
                        urlParameters: {
                            "$filter": filters,
                            "operation": "getPersPDPConfig"
                        },
                        success: function (oData3) {
                            if (parseInt(oData3.results[0].cust_pdpMaxObj) >= (oData2.results.length + len)) {
                                var flag = 0;
                                for (var k = 0; k < oData2.results.length; k++) {
                                    if (oData2.results[k].cust_objLibraryId === oData.cust_objLibraryId) {
                                        flag = 1;
                                    }
                                }
                                if (flag === 0) {
                                    var data = {
                                        cust_pdpEmployees_cust_empId: keyDetails[0],
                                        cust_pdpConfig_cust_pdpId: keyDetails[1],
                                        cust_objectiveName: oData.cust_objName,
                                        cust_objectiveDesc: oData.cust_objDesc,
                                        cust_objectiveObs: obs,
                                        cust_objectiveStatus: '1',
                                        cust_initiativeType: oData.cust_initiativeType,
                                        cust_objectiveType: '1',
                                        cust_objectiveRealDate: date,
                                        cust_createdByManager: true,
                                        cust_objLibraryId: oData.cust_objLibraryId
                                    }
                                    that.getView().getModel().create("/cust_pdpObjectives", data, {
                                        urlParameters: {
                                            "operation": "createMassCustObjCritical"
                                        },
                                        success: function () {
                                            if (that.byId("pdp-page").isBusy()) {
                                                that.byId("pdp-page").setBusy(false);
                                                var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                                MessageBox.success(i18n.getText("addMassObjSuccess"));
                                                return;
                                            }
                                        },
                                        error: function (response) {
                                            var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                                            MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                                            that.byId("pdp-page").setBusy(false);
                                        }
                                    });
                                }
                                else {
                                    that.byId("pdp-page").setBusy(false);
                                }
                            }
                            else {
                                that.byId("pdp-page").setBusy(false);
                            }
                        },
                        error: function (response) {
                            var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                            MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                            that.byId("pdp-page").setBusy(false);
                        }
                    })
                },
                error: function (response) {
                    var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
                    MessageBox.error(response.message + i18n.getText("statusCode") + response.statusCode + " " + response.responseText);
                    that.byId("pdp-page").setBusy(false);
                }
            })
        },

        _valueHelpUpdateFinished: function () {
            sap.ui.getCore().byId("pdp-libObjSearchMass").setBusy(false);
        },

        handleValueHelp: function () {
            var oView = this.getView();

            // create value help dialog
            if (!this._pValueHelpDialog) {
                this._pValueHelpDialog = sap.ui.xmlfragment("projects.fragment.pdp.ValueHelpMass", this);
                oView.addDependent(this._pValueHelpDialog);
            };
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
            var oFilter = new Filter(
                "cust_objName",
                sap.ui.model.FilterOperator.Contains,
                sValue
            );
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        _handleValueHelpClose: function (oEvent) {
            var aSelectedItems = oEvent.getParameter("selectedItems"),
                oMultiInput = sap.ui.getCore().byId("pdp-multiInput");
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

        handleTeamHelp: function (oEvent) {
            var oButton = oEvent.getSource();
            var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // create popover
            if (!this._pPopover) {
                this._pPopover = sap.ui.xmlfragment("projects.fragment.pdp.PopoverTeamHelp", this);
                this.getView().addDependent(this._pPopover);
            }
            this._pPopover.getAggregation("content")[0].getAggregation("content")[0].setText(i18n.getText("helpTextTeam"))
            this._pPopover.openBy(oButton);
        },

        handleActionsHelp: function (oEvent) {
            var oButton = oEvent.getSource();
            var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // create popover
            if (!this._pPopover) {
                this._pPopover = sap.ui.xmlfragment("projects.fragment.pdp.PopoverTeamHelp", this);
                this.getView().addDependent(this._pPopover);
            }
            this._pPopover.getAggregation("content")[0].getAggregation("content")[0].setText(i18n.getText("helpActionsTeam"))
            this._pPopover.openBy(oButton);
        },

        onClosePopover: function () {
            this._pPopover.close()
        }
    });
});