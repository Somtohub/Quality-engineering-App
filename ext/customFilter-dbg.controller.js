/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["i2d/qm/qualityengineer/ovps1/ext/model/ExtensionHelper"], function (ExtensionHelper) {

	"use strict";

	return sap.ui.controller("i2d.qm.qualityengineer.ovps1.ext.customFilter", {
		onInit: function () {
			this._oDataModel = this.getOwnerComponent().getModel();
			// var that = this;
			// this._oDataModel.read("/C_QltyInProcmtBlkFuncVH", {
			// 	success: function (oResponse) {
			// 		that.oParams = oResponse;
			// 	},
			// 	error: function () {}
			// });
		},

		onCustomParams: function (sCustomParams) {
			if (sCustomParams === "paramInspLotDefectDays") {
				return this.paramInspLotDefectDays.bind(this);
			} else if (sCustomParams === "paramMaterialDefectDays") {
				return this.paramMaterialDefectDays.bind(this);
			} else if (sCustomParams === "paramDefCodeDefectDays") {
				return this.paramDefCodeDefectDays.bind(this);
			} else if (sCustomParams === "paramSpcLastSevenDays") {
				return this.paramSpcLastSevenDays.bind(this);
			} else if (sCustomParams === "paramsQltyInfo") {
				return this.paramsQltyInfo.bind(this);
			} else if (sCustomParams === "paramsQltyTsk") {
				return this.paramsQltyTsk.bind(this);
			} else if (sCustomParams === "paramsQltyTskProcsr") {
				return this.paramsQltyTskProcsr.bind(this);
			}
			return true;
		},

		paramSpcLastSevenDays: function (oNavigateParams) {
			var aCustomSelectionVariant = new ExtensionHelper().paramSpcLastSevenDays(oNavigateParams);
			return aCustomSelectionVariant;
		},

		paramInspLotDefectDays: function (oNavigateParams, oSelectionVariantParams) {
			return this.paramDefectDays(oNavigateParams, oSelectionVariantParams, "InspectionLotOrigin");
		},

		paramMaterialDefectDays: function (oNavigateParams, oSelectionVariantParams) {
			return this.paramDefectDays(oNavigateParams, oSelectionVariantParams, "Material");
		},

		paramDefCodeDefectDays: function (oNavigateParams, oSelectionVariantParams) {
			return this.paramDefectDays(oNavigateParams, oSelectionVariantParams, "DefectCode");
		},

		paramDefectDays: function (oNavigateParams, oSelectionVariantParams, sDefectCardType) {
			var aSelectOptions = oSelectionVariantParams.getSelectOption("CalculationDate");
			var sSelectDay = aSelectOptions[0].Low;
			var aCustomSelectionVariant = new ExtensionHelper().paramDefectDays(oNavigateParams, sSelectDay, sDefectCardType);
			return aCustomSelectionVariant;
		},

		paramsQltyInfo: function (oNavigateParams) {
			var that = this;
			var aCustomSelectionVariant;
			var tabName;
			var oCards = this.oCards;
			oCards.forEach(function (element) {
				if (element.id === "i2d.qm.qualityengineer.ovps1_card10") {
					tabName = element.settings.chartAnnotationPath;
				}
			});
			tabName = tabName.split("#");
			this._oDataModel.read("/C_QltyInProcmtBlkFuncVH", {
				success: function (oResponse) {
					that.oParams = oResponse;
					aCustomSelectionVariant = new ExtensionHelper().paramsQltyInfo(oNavigateParams, tabName[1], this.oParams);
					return aCustomSelectionVariant;
				},
				error: function () {
					return aCustomSelectionVariant;
				}
			});
		},

		paramsQltyTsk: function (oNavigateParams) {
			var tabName;
			var oCards = this.oCards;
			oCards.forEach(function (element) {
				if (element.id === "i2d.qm.qualityengineer.ovps1_card12") {
					tabName = element.settings.chartAnnotationPath;
				}
			});
			tabName = tabName.split("#");
			var aCustomSelectionVariant;
			aCustomSelectionVariant = new ExtensionHelper().paramsQltyTsk(oNavigateParams, tabName[1]);
			return aCustomSelectionVariant;
		},

		paramsQltyTskProcsr: function (oNavigateParams) {
			var aCustomSelectionVariant = new ExtensionHelper().paramsQltyTskProcsr(oNavigateParams);
			return aCustomSelectionVariant;
		}

	});

});