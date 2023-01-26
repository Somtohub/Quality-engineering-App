/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([], function () {
	"use strict";

	var ExtensionHelper = function () {};

	function isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}

	function blkStsPush(obj, key1) {
		var aCustomParams = [];
		for (var i = 0; i < obj.results.length; i++) {
			aCustomParams.push({
				path: key1,
				operator: "EQ",
				value1: obj.results[i].ProcurementBlock,
				value2: null,
				sign: "I"
			});
		}
		return aCustomParams;
	}

	ExtensionHelper.prototype.getFilterFormat = function (dDate) {
		return dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString() + "-" + dDate.getDate().toString() +
			"T00:00:00.000";
	};

	ExtensionHelper.prototype.paramDefectDays = function (oNavigateParams, sSelectDay, sDefectCardType) {
		var that = this;
		var dToday = new Date();
		var iDate = dToday.getDate(),
			iYear = dToday.getFullYear(),
			iMonth = dToday.getMonth();
		var dEndDate = new Date(iYear, iMonth, iDate);
		var dStartDate = new Date(iYear, iMonth, iDate);
		if (sSelectDay === "0") {
			dStartDate = new Date(iYear, iMonth, iDate);
		} else if (sSelectDay === "1") {
			dStartDate = new Date(iYear, iMonth, iDate - 1);
		} else if (sSelectDay === "6") {
			dStartDate = new Date(iYear, iMonth, iDate - 6);
		} else if (sSelectDay === "29") {
			dStartDate = new Date(iYear, iMonth, iDate - 29);
		} else {
			dStartDate = new Date(iYear, iMonth, iDate - 29);
		}
		var aCustomSelectionVariant = [];
		var oCustomSelectionVariant = {
			path: "CreationDate",
			operator: "BT",
			value1: that.getFilterFormat(dStartDate),
			value2: that.getFilterFormat(dEndDate),
			sign: "I"
		};
		if (sSelectDay === "0") {
			oCustomSelectionVariant = {
				path: "CreationDate",
				operator: "EQ",
				value1: that.getFilterFormat(dStartDate),
				sign: "I"
			};
		}
		aCustomSelectionVariant.push(oCustomSelectionVariant);
		if (isEmpty(oNavigateParams)) {
			if (sDefectCardType === "InspectionLotOrigin") {
				var oInspLotOrigin = sap.ui.getCore().byId("mainView--ovpGlobalFilter-filterItemControl_BASIC-InspectionLotOrigin");
				if (oInspLotOrigin && oInspLotOrigin !== undefined) {
					var aInspLotOriginValues = oInspLotOrigin.getAggregation("items");
					var iInspLotOriginLen = aInspLotOriginValues.length;
					if (iInspLotOriginLen > 0) {
						for (var i = 0; i < iInspLotOriginLen; i++) {
							aCustomSelectionVariant.push({
								path: "InspectionLotOrigin",
								operator: "EQ",
								value1: aInspLotOriginValues[i].getProperty("key"),
								value2: null,
								sign: "I"
							});
						}
					}
				}
			}
		}
		return {
			selectionVariant: aCustomSelectionVariant,
			ignoreEmptyString: true
		};
	};

	ExtensionHelper.prototype.paramSpcLastSevenDays = function (oNavigateParams) {
		var that = this;
		var dToday = new Date();
		var iDate = dToday.getDate(),
			iYear = dToday.getFullYear(),
			iMonth = dToday.getMonth();
		var dEndDate = new Date(iYear, iMonth, iDate);
		var dStartDate = new Date(iYear, iMonth, iDate - 6);
		var aCustomSelectionVariant = [];
		var oCustomSelectionVariant = {
			path: "InspectionEndDate",
			operator: "BT",
			value1: that.getFilterFormat(dStartDate),
			value2: that.getFilterFormat(dEndDate),
			sign: "I"
		};
		aCustomSelectionVariant.push(oCustomSelectionVariant);
		return {
			selectionVariant: aCustomSelectionVariant,
			ignoreEmptyString: true
		};

	};

	ExtensionHelper.prototype.paramsQltyInfo = function (oNavigateParams, tabName, oBlkParams) {
		var that = this;
		var aCustomSelectionVariant = [];
		var dToday = new Date();
		var iDate = dToday.getDate(),
			iYear = dToday.getFullYear(),
			iMonth = dToday.getMonth();
		var dEndDate = new Date(iYear, iMonth, iDate);

		var oInSevenDays = new Date(iYear, iMonth, iDate + 6);
		var oInEightDays = new Date(iYear, iMonth, iDate + 7);
	//	var oInThirtyDays = new Date(iYear, iMonth, iDate + 29);
		var oInThirtyDays = new Date(iYear, iMonth, iDate + 30);
		var oPastDate = new Date(iYear, iMonth, iDate - 1);

		if (!isEmpty(oNavigateParams)) {
			if (oNavigateParams.QualityInfoRecordExcptnSpan === "1") {
				aCustomSelectionVariant.push({
					path: "QltyInProcmtReleaseValidTo",
					operator: "LE",
					value1: that.getFilterFormat(oPastDate),
					value2: null,
					sign: "I"
				});

			} else if (oNavigateParams.QualityInfoRecordExcptnSpan === "2") {
				aCustomSelectionVariant.push({
					path: "QltyInProcmtReleaseValidTo",
					operator: "BT",
					value1: that.getFilterFormat(dEndDate),
					value2: that.getFilterFormat(oInSevenDays),
					sign: "I"
				});
			} else if (oNavigateParams.QualityInfoRecordExcptnSpan === "3") {
				aCustomSelectionVariant.push({
					path: "QltyInProcmtReleaseValidTo",
					operator: "BT",
					value1: that.getFilterFormat(oInEightDays),
					value2: that.getFilterFormat(oInThirtyDays),
					sign: "I"
				});
			} else if (oNavigateParams.QltyInfoRecdBlkSts === "1") {
				aCustomSelectionVariant = blkStsPush(oBlkParams, "SupplierProcurementBlock");
			} else if (oNavigateParams.QltyInfoRecdBlkSts === "2") {
				aCustomSelectionVariant = blkStsPush(oBlkParams, "ProcurementBlock");
			}

		} else {
			if (tabName === "card4ViewSwitch2") {
				aCustomSelectionVariant.push({
					path: "QltyInfoRecdBlkSts",
					operator: "EQ",
					value1: "1",
					value2: null,
					sign: "I"
				});
				aCustomSelectionVariant.push({
					path: "QltyInfoRecdBlkSts",
					operator: "EQ",
					value1: "2",
					value2: null,
					sign: "I"
				});
			} else if (tabName === "card4ViewSwitch1") {
				aCustomSelectionVariant.push({
					path: "QltyInProcmtReleaseValidTo",
					operator: "LE",
					value1: that.getFilterFormat(oInThirtyDays),
					value2: null,
					sign: "I"
				});
			}
		}
		aCustomSelectionVariant.push({
			path: "IsDeleted",
			operator: "EQ",
			value1: "false",
			value2: null,
			sign: "I"
		});
		return {
			selectionVariant: aCustomSelectionVariant,
			ignoreEmptyString: true
		};
	};

	ExtensionHelper.prototype.paramsQltyTskProcsr = function (oNavigateParams) {
		var aCustomSelectionVariant = [];
		if (!isEmpty(oNavigateParams)) {
			if (oNavigateParams.QltyTskAssgdSts === "0") {
				aCustomSelectionVariant.push({
					path: "QltyTskProcsrIsAssgd",
					operator: "EQ",
					value1: "1",
					value2: null,
					sign: "I"
				});
				aCustomSelectionVariant.push({
					path: "QualityTaskLifecycleStatus",
					operator: "EQ",
					value1: "00",
					value2: null,
					sign: "I"
				});
			} else if (oNavigateParams.QltyTskAssgdSts === "1") {
				aCustomSelectionVariant.push({
					path: "QltyTskProcsrIsAssgd",
					operator: "EQ",
					value1: "1",
					value2: null,
					sign: "I"
				});
				aCustomSelectionVariant.push({
					path: "QualityTaskLifecycleStatus",
					operator: "EQ",
					value1: "10",
					value2: null,
					sign: "I"
				});
			} else if (oNavigateParams.QltyTskAssgdSts === "2") {
				aCustomSelectionVariant.push({
					path: "QltyTskProcsrIsAssgd",
					operator: "EQ",
					value1: "2",
					value2: null,
					sign: "I"
				});
				aCustomSelectionVariant.push({
					path: "QualityTaskLifecycleStatus",
					operator: "EQ",
					value1: "00",
					value2: null,
					sign: "I"
				});
			} else if (oNavigateParams.QltyTskAssgdSts === "3") {
				aCustomSelectionVariant.push({
					path: "QltyTskProcsrIsAssgd",
					operator: "EQ",
					value1: "2",
					value2: null,
					sign: "I"
				});
				aCustomSelectionVariant.push({
					path: "QualityTaskLifecycleStatus",
					operator: "EQ",
					value1: "10",
					value2: null,
					sign: "I"
				});
			}

		} else {
			aCustomSelectionVariant.push({
				path: "QualityTaskLifecycleStatus",
				operator: "EQ",
				value1: "00",
				value2: null,
				sign: "I"
			});
			aCustomSelectionVariant.push({
				path: "QualityTaskLifecycleStatus",
				operator: "EQ",
				value1: "10",
				value2: null,
				sign: "I"
			});
		}
		return {
			selectionVariant: aCustomSelectionVariant,
			ignoreEmptyString: true
		};
	};

	ExtensionHelper.prototype.paramsQltyTsk = function (oNavigateParams, tabName) {
		var that = this;
		var aCustomSelectionVariant = [];
		var dToday = new Date();
		var iDate = dToday.getDate(),
			iYear = dToday.getFullYear(),
			iMonth = dToday.getMonth();
		var dEndDate = new Date(iYear, iMonth, iDate);

		var oInSevenDays = new Date(iYear, iMonth, iDate + 6);
		var oInEightDays = new Date(iYear, iMonth, iDate + 7);
		var oInThirtyDays = new Date(iYear, iMonth, iDate + 29);
		var oPastDate = new Date(iYear, iMonth, iDate - 1);
		var oNoPlndEnd = new Date(1900, 0, 0, 0, 0, 0, 0);

		if (!isEmpty(oNavigateParams)) {
			if (oNavigateParams.QltyPlndEndDteSts === "0") {
				aCustomSelectionVariant.push({
					path: "NotifTaskPlannedEndDate",
					operator: "LE",
					value1: that.getFilterFormat(oNoPlndEnd),
					value2: null,
					sign: "I"
				});

			} else if (oNavigateParams.QltyPlndEndDteSts === "1") {
				aCustomSelectionVariant.push({
					path: "NotifTaskPlannedEndDate",
					operator: "BT",
					value1: that.getFilterFormat(oNoPlndEnd),
					value2: that.getFilterFormat(oPastDate),
					sign: "I"
				});
			} else if (oNavigateParams.QltyPlndEndDteSts === "2") {
				aCustomSelectionVariant.push({
					path: "NotifTaskPlannedEndDate",
					operator: "BT",
					value1: that.getFilterFormat(dEndDate),
					value2: that.getFilterFormat(oInSevenDays),
					sign: "I"
				});
			} else if (oNavigateParams.QltyPlndEndDteSts === "3") {
				aCustomSelectionVariant.push({
					path: "NotifTaskPlannedEndDate",
					operator: "BT",
					value1: that.getFilterFormat(oInEightDays),
					value2: that.getFilterFormat(oInThirtyDays),
					sign: "I"
				});
			}
		} else {
			if (tabName === "PlannedEndDate") {
				aCustomSelectionVariant.push({
					path: "NotifTaskPlannedEndDate",
					operator: "LE",
					value1: that.getFilterFormat(oInThirtyDays),
					value2: null,
					sign: "I"
				});
			}
		}

		aCustomSelectionVariant.push({
			path: "QualityTaskLifecycleStatus",
			operator: "EQ",
			value1: "00",
			value2: null,
			sign: "I"
		});
		aCustomSelectionVariant.push({
			path: "QualityTaskLifecycleStatus",
			operator: "EQ",
			value1: "10",
			value2: null,
			sign: "I"
		});
		return {
			selectionVariant: aCustomSelectionVariant,
			ignoreEmptyString: true
		};
	};

	return ExtensionHelper;

});