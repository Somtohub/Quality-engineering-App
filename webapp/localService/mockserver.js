/*
 * Copyright (C) 2009-2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define(["sap/ui/core/util/MockServer","jquery.sap.xml"],function(M){"use strict";var m;var r="rootFolder/";var _="localService/";var a="localService/mockdata/";var b={"QM_QLTYENGINEER_OVP_ANNO_MDL":"QM_QLTYENGINEER_OVP_ANNO_MDL"};var c=function(n,u,S){var f=S?S:".xml";var l=b[n]?b[n]:u;return jQuery.sap.getModulePath(_+l,f);};var d=function(p){return function(x){var A=jQuery.sap.sjax({url:p,dataType:"xml"}).data;x.respondXML(200,{},jQuery.sap.serializeXML(A));return true;};};var e=function(A,D){var o=D[A],u=o.uri,l=c(A,u);new M({rootUri:u,requests:[{method:"GET",path:new RegExp(""),response:d(l)},{method:"GET",path:/\?sap-language=\w{2}/,response:d(l)}]}).start();};var s=function(){new M({rootUri:"/sap/es/ina/",requests:[{method:"GET",path:/GetServerInfo\?_=\d+/,response:function(x){x.respondXML(404,{});}}]}).start();};return{init:function(){var p=jQuery.sap.getModulePath(r);var u=jQuery.sap.getUriParameters(),j=jQuery.sap.getModulePath(a),f=p+"/manifest.json",E="C_QltyEngineerOVP",g=u.get("errorType"),i=g==="badRequest"?400:500,o=jQuery.sap.syncGetJSON(f).data,D=o["sap.app"].dataSources,h=D.QM_QLTYENGINEER_OVP_SRV,k=jQuery.sap.getModulePath(_+"metadata",".xml"),l=/.*\/$/.test(h.uri)?h.uri:h.uri+"/",A=h.settings.annotations;m=new M({rootUri:l});M.config({autoRespond:true,autoRespondAfter:(u.get("serverDelay")||1000)});m.simulate(k,{sMockdataBaseUrl:j,bGenerateMissingMockData:true});var R=m.getRequests(),n=function(q,t,v){v.response=function(x){x.respond(q,{"Content-Type":"text/plain;charset=utf-8"},t);};};if(u.get("metadataError")){R.forEach(function(q){if(q.path.toString().indexOf("$metadata")>-1){n(500,"metadata Error",q);}});}if(g){R.forEach(function(q){if(q.path.toString().indexOf(E)>-1){n(i,g,q);}});}m.start();jQuery.sap.log.info("Running the app with mock data");A.forEach(function(q){e(q,D);});s();},getMockServer:function(){return m;}};});
