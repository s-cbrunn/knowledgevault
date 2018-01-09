/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../_AnnotationHelperBasics','sap/ui/base/BindingParser','sap/ui/base/ManagedObject','sap/ui/core/format/DateFormat','sap/ui/model/odata/ODataUtils'],function(q,B,a,M,D,O){'use strict';var A="sap.ui.model.odata.v4.AnnotationHelper",p=[A],P=A+"/getExpression",E,r=/^\{@i18n>[^\\\{\}:]+\}$/,o={And:"&&",Eq:"===",Ge:">=",Gt:">",Le:"<=",Lt:"<",Ne:"!==",Not:"!",Or:"||"},s=false,t={"Edm.Boolean":"boolean","Edm.Byte":"number","Edm.Date":"Date","Edm.DateTimeOffset":"DateTimeOffset","Edm.Decimal":"Decimal","Edm.Double":"number","Edm.Guid":"string","Edm.Int16":"number","Edm.Int32":"number","Edm.Int64":"Decimal","Edm.SByte":"number","Edm.Single":"number","Edm.String":"string","Edm.TimeOfDay":"TimeOfDay"},T={Bool:"Edm.Boolean",Float:"Edm.Double",Date:"Edm.Date",DateTimeOffset:"Edm.DateTimeOffset",Decimal:"Edm.Decimal",Guid:"Edm.Guid",Int:"Edm.Int64",Int32:"Edm.Int32",String:"Edm.String",TimeOfDay:"Edm.TimeOfDay"},m={"boolean":false,"Date":false,"DateTimeOffset":true,"Decimal":true,"number":false,"string":false,"TimeOfDay":false};function b(c,d){B.error(c,d,A);}E={adjustOperands:function(c,d){if(c.result!=="constant"&&c.category==="number"&&d.result==="constant"&&d.type==="Edm.Int64"){d.category="number";}if(c.result!=="constant"&&c.category==="Decimal"&&d.result==="constant"&&d.type==="Edm.Int32"){d.category="Decimal";d.type=c.type;}},apply:function(c,d){var f=B.descend(c,"$Function","string");switch(f.value){case"odata.concat":return E.concat(d);case"odata.fillUriTemplate":return E.fillUriTemplate(d);case"odata.uriEncode":return E.uriEncode(d);default:b(f,"unknown function: "+f.value);}},concat:function(c){var e=c.asExpression,d=[],R,f=[];B.expectType(c,"array");c.value.forEach(function(u,i){R=E.parameter(c,i);e=e||R.result==="expression";f.push(R);});f.forEach(function(R){if(e){E.wrapExpression(R);}if(R.type!=='edm:Null'){d.push(B.resultToString(R,e));}});R=e?{result:"expression",value:d.join("+")}:{result:"composite",value:d.join("")};R.type="Edm.String";return R;},conditional:function(c){var C=E.parameter(c,0,"Edm.Boolean"),d=E.parameter(c,1),e=E.parameter(c,2),f=d.type;if(d.type==="edm:Null"){f=e.type;}else if(e.type!=="edm:Null"&&d.type!==e.type){b(c,"Expected same type for second and third parameter, types are '"+d.type+"' and '"+e.type+"'");}return{result:"expression",type:f,value:B.resultToString(E.wrapExpression(C),true)+"?"+B.resultToString(E.wrapExpression(d),true)+":"+B.resultToString(E.wrapExpression(e),true)};},constant:function(c,e){var v=c.value;if(e==="String"){if(r.test(v)){return{ignoreTypeInPath:true,result:"binding",type:"Edm.String",value:v.slice(1,-1)};}}return{result:"constant",type:T[e],value:v};},expression:function(c){var R=c.value,S=c,d;if(R===null){d="Null";}else if(typeof R==="boolean"){d="Bool";}else if(typeof R==="number"){d=isFinite(R)&&Math.floor(R)===R?"Int32":"Float";}else if(typeof R==="string"){d="String";}else{B.expectType(c,"object");["$And","$Apply","$Date","$DateTimeOffset","$Decimal","$Float","$Eq","$Ge","$Gt","$Guid","$If","$Int","$Le","$Lt","$Ne","$Not","$Null","$Or","$Path","$PropertyPath","$TimeOfDay"].forEach(function(e){if(R.hasOwnProperty(e)){d=e.slice(1);S=B.descend(c,e);}});}switch(d){case"Apply":return E.apply(c,S);case"If":return E.conditional(S);case"Path":case"PropertyPath":return E.path(S);case"Date":case"DateTimeOffset":case"Decimal":case"Guid":case"Int":case"String":case"TimeOfDay":B.expectType(S,"string");case"Bool":case"Float":case"Int32":return E.constant(S,d);case"And":case"Eq":case"Ge":case"Gt":case"Le":case"Lt":case"Ne":case"Or":return E.operator(S,d);case"Not":return E.not(S);case"Null":return{result:"constant",type:"edm:Null",value:null};default:b(c,"Unsupported OData expression");}},formatOperand:function(c,i,R,w){if(R.result==="constant"){switch(R.category){case"boolean":case"number":return String(R.value);}}if(w){E.wrapExpression(R);}return B.resultToString(R,true);},getExpression:function(c){var R;if(c.value===undefined){return undefined;}q.sap.measure.average(P,"",p);if(!s&&M.bindingParser===a.simpleParser){q.sap.log.warning("Complex binding syntax not active",null,A);s=true;}try{R=E.expression(c);q.sap.measure.end(P);return B.resultToString(R,false);}catch(e){q.sap.measure.end(P);if(e instanceof SyntaxError){return"Unsupported: "+a.complexParser.escape(B.toErrorString(c.value));}throw e;}},fillUriTemplate:function(c){var i,n,d=[],e="",f,g=c.value,R,h=E.parameter(c,0,"Edm.String");d.push('odata.fillUriTemplate(',B.resultToString(h,true),',{');for(i=1;i<g.length;i+=1){f=B.descend(c,i,"object");n=B.property(f,"$Name","string");R=E.expression(B.descend(f,"$LabeledElement",true));d.push(e,B.toJSON(n),":",B.resultToString(R,true));e=",";}d.push("})");return{result:"expression",type:"Edm.String",value:d.join("")};},not:function(c){var d;c.asExpression=true;d=E.expression(c);return{result:"expression",type:"Edm.Boolean",value:"!"+B.resultToString(E.wrapExpression(d),true)};},operator:function(c,d){var e=d==="And"||d==="Or"?"Edm.Boolean":undefined,n,f=E.parameter(c,0,e),g=E.parameter(c,1,e),S="",v,V;if(f.type!=="edm:Null"&&g.type!=="edm:Null"){f.category=t[f.type];g.category=t[g.type];E.adjustOperands(f,g);E.adjustOperands(g,f);if(f.category!==g.category){b(c,"Expected two comparable parameters but instead saw "+f.type+" and "+g.type);}switch(f.category){case"Decimal":S=",'Decimal'";break;case"DateTimeOffset":S=",'DateTime'";break;}n=m[f.category];}v=E.formatOperand(c,0,f,!n);V=E.formatOperand(c,1,g,!n);return{result:"expression",type:"Edm.Boolean",value:n?"odata.compare("+v+","+V+S+")"+o[d]+"0":v+o[d]+V};},parameter:function(c,i,e){var d=B.descend(c,i,true),R=E.expression(d);if(e&&e!==R.type){b(d,"Expected "+e+" but instead saw "+R.type);}return R;},path:function(c){B.expectType(c,"string");return{result:"binding",type:c.model.getProperty(c.path+"/$Type"),value:c.value};},uriEncode:function(c){var R=E.parameter(c,0);return{result:"expression",type:"Edm.String",value:R.type==="Edm.String"?'odata.uriEncode('+B.resultToString(R,true)+","+B.toJSON(R.type)+")":'String('+B.resultToString(R,true)+")"};},wrapExpression:function(R){if(R.result==="expression"){R.value="("+R.value+")";}return R;}};return E;},false);