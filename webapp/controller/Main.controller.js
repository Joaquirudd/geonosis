sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Fragment, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("geonosis.table.report.controller.Main", {
        onInit: function () {
            const oFiltrosModel = this.getOwnerComponent().getModel("filtros");
            if (oFiltrosModel) {
                oFiltrosModel.setData({
                    nombre: "",
                    categoria: "",
                    estado: ""
                });
            }
        },

        onBeforeRendering: function(){
            console.error("Ocurrio un problema:");
        },

        onAfterRendering: function(){
            debugger
        },

        

        onSearch: function () {
            this._applyFilters();
        },


        onFilterChange: function () {
            this._applyFilters();
        },

        onAfterVariantLoad: function () {
            this._applyFilters();
        },


        _applyFilters: function () {
            const oFiltrosModel = this.getOwnerComponent().getModel("filtros");
            const oData = oFiltrosModel ? oFiltrosModel.getData() : {};

            const sNombre = oData.nombre;
            const sCategoria = oData.categoria;
            const sEstado = oData.estado;

            const aFilters = [];

            if (sNombre) {
                aFilters.push(new Filter("nombre", FilterOperator.Contains, sNombre));
            }

            if (sCategoria) {
                aFilters.push(new Filter("categoria", FilterOperator.Contains, sCategoria));
            }

            if (sEstado) {
                aFilters.push(new Filter("estado", FilterOperator.Contains, sEstado));
            }


            const oTable = this.byId("productTable");
            if (oTable) {
                const oBinding = oTable.getBinding("items");
                if (oBinding) {
                    oBinding.filter(aFilters);
                }
            }
        }

        /*
        _openFragment(){
            const oView = this.getView();

            if (!this._oVH) {
                Fragment.load({
                    id: oView.getId(),
                    name: "geonosis.table.report.view.fragments.ValueHelpProducts",
                    controller: this
                }).then(function (oDialog) {
                    this._oVH = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));

            } else {
                this._oVH.open();
            }
        },
        
        onExit(){
            if(this._oVH){
                Object.values(this._oVH.destroy()).forEach;
            }
        },
        
        onValueHelpSearch: function (oEvent) {
            let sQuery = oEvent.getParameter("value");

            const oTable = this.byId("productTable");
            const oBinding = oTable.getBinding("items");
            const aFilters = sQuery ?
                [new Filter({
                    path: "nombre",
                    operator: FilterOperator.Contains,
                    value1: sQuery
                })] : [];

            oBinding.filter(aFilters);
        }
        */
    });
});
