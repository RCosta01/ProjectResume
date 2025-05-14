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
            this._pdpStyleId = "pdp-css";

            if (!document.getElementById(this._pdpStyleId)) {
                const link = document.createElement("link");
                link.id = this._pdpStyleId;
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = sap.ui.require.toUrl("projects/css/pdp.css");
                document.head.appendChild(link);
            }
            this._setTeamModel();
            this._setTeamPDPs()
            this._setSmallerModels();
            this._setPersonalPDPs();
            this._setInitiatives();
            this._setTeamPDPModels();
            this._startFilterBar();
            this._teamPDPData = [];
            this._i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this._opened = [];

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("pdpHomepage").attachMatched(function (oEvent) {
                sap.ui.getCore().applyTheme("sap_horizon");
            }, this);
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteHomepage")
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

        _setInitiatives: function () {
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

        _setTeamPDPModels: function () {

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

        onFinishPersPDPUpdate: function () {
            this.byId("pdp-PersPDP").setBusy(false);
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
            MessageBox.confirm(i18n.getText("pdp.exportConfirm"), {
                actions: [i18n.getText("pdp.buttonConfirmText"), MessageBox.Action.CANCEL],
                emphasizedAction: i18n.getText("pdp.buttonConfirmText"),
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

        _startFilterBar: function () {
            var i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var bar = this.getView().byId("pdp-filterBar");
            bar.addEventDelegate({
                "onAfterRendering": function (oEvent) {
                    var oButton = oEvent.srcControl._getSearchButton().setVisible(false);
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
            var item = oEvent.getSource().getBindingContext("TeamPDP").getProperty();
            var cname = item.Nome
            var pId = item.pId;
            var uId = item.NColab;
            var data = {
                pId: pId,
                uId: uId,
                pdps: item,
                cname: cname
            }
            var oJsonModel = new JSONModel(data);
            this.getOwnerComponent().setModel(oJsonModel, "routingInfo");
            const teamsData = this.getView().getModel("teamsModel").getData()
            const found = teamsData.find((item) => item.key === uId)
            if (found) {
                this.getOwnerComponent().getRouter().navTo("pdpMgrPlanPage");
                return;
            }
            this.getOwnerComponent().getRouter().navTo("pdpVOPlanPage");
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
                        MessageBox.error(i18n.getText("pdp.missingFields"))
                        this.byId("pdp-page").setBusy(false);
                        return;
                    }
                    this._flag = 0;
                    for (var i = 0; i < selIni.length; i++) {
                        for (let j = 0; j < users.length; j++) {
                            const libData = this.getView().getModel("libraryObjectives").getData()
                            const found = libData.find((item) => item.cust_objLibraryId === selIni[i].getKey())
                            const data = {
                                ncolab: users[j].split(" ")[0],
                                pId: users[j].split(" ")[1],
                                cust_objectiveName: found.cust_objName,
                                cust_objectiveDesc: found.cust_objDesc,
                                cust_initiativeType: found.cust_initiativeType,
                                cust_createdByManager: true,
                                cust_objLibraryId: found.cust_objLibraryId,
                                cust_objectiveRealDate: date,
                                cust_objectiveObs: obs,
                                cust_objectiveStatus: 1
                            }
                            const modelData = this.getOwnerComponent().getModel('objTab').getData();
                            modelData.push(data)
                            this.getOwnerComponent().getModel('objTab').setData(modelData)
                        }
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
                        MessageBox.error(i18n.getText("pdp.missingFields"))
                        this.byId("pdp-page").setBusy(false);
                        return;
                    }
                    var model = this.getView().getModel();
                    var pdpModel = this.getView().getModel("TeamPDP").oData.data;
                    for (let j = 0; j < users.length; j++) {
                        const data = {
                            ncolab: users[j].split(" ")[0],
                            pId: users[j].split(" ")[1],
                            cust_objectiveName: name,
                            cust_objectiveDesc: desc,
                            cust_initiativeType: formTyp,
                            cust_createdByManager: true,
                            cust_objLibraryId: '',
                            cust_objectiveRealDate: date,
                            cust_objectiveObs: obs,
                            cust_objectiveStatus: 1
                        }
                        const modelData = this.getOwnerComponent().getModel('objTab').getData();
                        modelData.push(data)
                        this.getOwnerComponent().getModel('objTab').setData(modelData)
                    }
                    break;
            }

            var i18n = that.getOwnerComponent().getModel("i18n").getResourceBundle();
            MessageBox.success(i18n.getText("pdp.addMassObjSuccess"));
            that.byId("pdp-page").setBusy(false);
            this._massObj.close();
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
            this._pPopover.getAggregation("content")[0].getAggregation("content")[0].setText(i18n.getText("pdp.helpTextTeam"))
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
            this._pPopover.getAggregation("content")[0].getAggregation("content")[0].setText(i18n.getText("pdp.helpActionsTeam"))
            this._pPopover.openBy(oButton);
        },

        onClosePopover: function () {
            this._pPopover.close()
        }
    });
});