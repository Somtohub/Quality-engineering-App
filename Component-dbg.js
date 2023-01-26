/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function() {
	"use strict";
	/*global sap, jQuery */

	/**
	 * @fileOverview Application component to display information on entities from the GWSAMPLE_BASIC
	 *   OData service.
	 * @version @version@
	 */
	jQuery.sap.declare("i2d.qm.qualityengineer.ovps1.Component");

	jQuery.sap.require("sap.ovp.app.Component");
	//Comment to re-trigger build
	sap.ovp.app.Component.extend("i2d.qm.qualityengineer.ovps1.Component", {
		metadata: {
			manifest: "json"
		}
	});
}());