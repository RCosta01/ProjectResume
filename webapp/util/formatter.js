sap.ui.define([], function () {
    "use strict";
    return {
        formatDate: function (date) {
            if (date !== null && date !== undefined) {
                return new Date(date).toLocaleDateString("en-UK");
            }
            else {
                return date;
            }
        },

        formatStatus: function (status) {
            if (status !== null && status !== "") {
                var model = this.getOwnerComponent().getModel("statusList");
                if(model){
                for (var i = 0; i < model.getData().length; i++) {
                    if (model.getData()[i].externalCode === status) {
                        return model.getData()[i].description;
                    }
                }
            }
            }
        },

        chefEdit: function (status) {
            if (status) return false; else return true;
        },

        editableEdit: function (status) {
            if (status === undefined || status === null) return true; else return false;
        },

        formatObjStatus: function (status) {
            if (status !== null && status !== "") {
                var model = this.getView().getModel("objStatusList");
                for (var i = 0; i < model.getData().length; i++) {
                    if (model.getData()[i].externalCode === status) {
                        return model.getData()[i].description;
                    }
                }
            }
            return status;
        },

        formatCreator: function (bool, chef, colab) {
            if (bool) return chef; else return colab;
        },

        formatIniType: function (status, novo, lib) {
            if (!status) return novo; else return lib;
        },

        formatObjType: function (status) {
            if (status !== null && status !== "") {
                var model = this.getView().getModel("initiativeList");
                for (var i = 0; i < model.getData().length; i++) {
                    if (model.getData()[i].externalCode === status) {
                        return model.getData()[i].description;
                    }
                }
            }
            return status;
        },

        formatObjStatusState: function (status) {
            switch (status) {
                case "1":
                    return "Error";
                case "2":
                    return "Warning";
                case "3":
                    return "Success";
                case "4":
                    return "None";
                default:
                    return status;
            }
        },

        formatVisibility: function (status) {
            switch (status) {
                case "1":
                    return false;
                case "2":
                    return true;
                case "3":
                    return false;
                default:
                    return false;
            }
        },

        formatVisibilityMgr: function (status) {
            switch (status) {
                case "1":
                    return true;
                case "2":
                    return false;
                case "3":
                    return true;
                default:
                    return false;
            }
        },

        formatMobVisibility: function (status) {
            return status === "3";
        },

        formatMobilityText: function (text1, noSelectedAreas) {
            if (text1 === undefined || text1 === null || text1 === "") {
                return noSelectedAreas;
            }
            else {
                return text1;
            }
        },

        formatMobilityVisEmp: function (status) {
            return status === "2";
        },

        formatMobilityAnswer: function (answer, yes, no) {
            if (answer) {
                return yes;
            }
            else {
                return no;
            }
        },

        formatVisibilityButtonsEmp: function (status) {
            switch (status) {
                case "1":
                    return false;
                case "2":
                    return true;
                case "3":
                    return false;
                default:
                    return false;
            }
        },

        formatObjStatClass: function (status) {
            switch (status) {
                case "4":
                    return "cross";
                default:
                    return "";
            }
        },

        formatVisibilityPull: function (editDate, status) {
            if (status === "1" || status === "3") {
                return false;
            }
            if (editDate === null || editDate === undefined) {
                return false;
            }
            var date = new Date();
            if (typeof editDate === "string") {
                var date2 = new Date(parseInt(editDate.split("(")[1].split(")")[0]));
            }
            else {
                var date2 = new Date(editDate);
            }
            var diff = Math.abs(date.getTime() - date2.getTime());
            var diffD = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (diffD >= 30) {
                return true;
            }
            return false;
        },

        formatExtraText: function (text, defaultText) {
            if (text === null || text === undefined || text === '') {
                return defaultText;
            }
            return text;
        },

        formatEmpTitle: function (status, libId) {
            if (libId === null || libId === undefined) {
                return !status;
            }
            else {
                return false;
            }
        },

        formatEmpBody: function (status) {
            return !status;
        },

        formatVisibilitySubmit: function (status) {
            switch (status) {
                case "1":
                    return true;
                default:
                    return false;
            }
        },

        formatVisImpOldMobile: function (oPId, status) {
            if (oPId === null || oPId === undefined) {
                return false;
            }
            switch (status) {
                case "1":
                    return true;
                case "2":
                    return false;
                case "3":
                    return false;
                default:
                    return false;
            }
        },

        formatVisibilityImpOldEmpMobile: function (oPId, status) {
            if (oPId === null || oPId === undefined) {
                return false;
            }
            switch (status) {
                case "1":
                    return false;
                case "2":
                    return false;
                case "3":
                    return false;
                default:
                    return false;
            }
        },

        formatVisibilityImpOldEmp: function (oPId, status) {
            if (oPId === null || oPId === undefined) {
                return false;
            }
            switch (status) {
                case "1":
                    return false;
                case "2":
                    return false;
                case "3":
                    return false;
                default:
                    return false;
            }
        },

        formatVisImpOld: function (oPId, status) {
            if (oPId === null || oPId === undefined) {
                return false;
            }
            switch (status) {
                case "1":
                    return true;
                case "2":
                    return false;
                case "3":
                    return false;
                default:
                    return false;
            }
        },

        formatVisibilityButtons: function (status) {
            switch (status) {
                case "1":
                    return true;
                case "2":
                    return false;
                case "3":
                    return true;
                default:
                    return false;
            }
        }
    };
});