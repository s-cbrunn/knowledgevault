/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','./DatePicker','./library'],function(q,D,a,l){"use strict";var b=a.extend("sap.m.DateRangeSelection",{metadata:{library:"sap.m",properties:{delimiter:{type:"string",group:"Misc",defaultValue:'-'},secondDateValue:{type:"object",group:"Data",defaultValue:null},from:{type:"object",group:"Misc",defaultValue:null,deprecated:true},to:{type:"object",group:"Misc",defaultValue:null,deprecated:true}}}});b.prototype.init=function(){a.prototype.init.apply(this,arguments);this._bIntervalSelection=true;};b.prototype.onkeypress=function(E){if(!E.charCode||E.metaKey||E.ctrlKey){return;}var F=e.call(this);var s=d.call(this);var A=F.sAllowedCharacters+s+" ";var C=String.fromCharCode(E.charCode);if(C&&F.sAllowedCharacters&&A.indexOf(C)<0){E.preventDefault();}};b.prototype._getPlaceholder=function(){var p=this.getPlaceholder();if(!p){p=this.getDisplayFormat();if(!p){p="medium";}if(this._checkStyle(p)){var L=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var o=sap.ui.core.LocaleData.getInstance(L);p=o.getDatePattern(p);}var s=d.call(this);if(s&&s!==""){p=p+" "+s+" "+p;}}return p;};b.prototype.setValue=function(v){if(v!==this.getValue()){this._lastValue=v;}else{return this;}this.setProperty("value",v,true);this._bValid=true;var i=[undefined,undefined];if(v){i=this._parseValue(v);this._oWantedDate=i[0];this._oWantedSecondDate=i[1];i=c.call(this,i[0],i[1]);if(!i[0]){this._bValid=false;q.sap.log.warning("Value can not be converted to a valid dates",this);}}if(this._bValid){this.setProperty("dateValue",i[0],true);this.setProperty("secondDateValue",i[1],true);this._oWantedDate=undefined;this._oWantedSecondDate=undefined;}if(this.getDomRef()){var o=this._formatValue(i[0],i[1]);if(this._$input.val()!==o){this._$input.val(o);this._setLabelVisibility();this._curpos=this._$input.cursorPos();}}return this;};b.prototype.setValueFormat=function(v){this.setProperty("valueFormat",v,true);q.sap.log.warning("Property valueFormat is not supported in sap.m.DateRangeSelection control.",this);return this;};b.prototype.setDisplayFormat=function(s){this.setProperty("displayFormat",s,true);var o=this._formatValue(this.getDateValue(),this.getSecondDateValue());this.setProperty("value",o,true);if(this.getDomRef()&&(this._$input.val()!==o)){this._$input.val(o);this._curpos=this._$input.cursorPos();}return this;};b.prototype.setFrom=function(F){this.setDateValue(F);return this;};b.prototype.getFrom=function(){return this.getDateValue();};b.prototype.setTo=function(t){this.setSecondDateValue(t);return this;};b.prototype.getTo=function(){return this.getSecondDateValue();};b.prototype.setDateValue=function(o){if(o&&!(o instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}if(q.sap.equal(this.getDateValue(),o)){return this;}if(o&&(o.getTime()<this._oMinDate.getTime()||o.getTime()>this._oMaxDate.getTime())){this._bValid=false;this._oWantedDate=o;o=undefined;}else{this._bValid=true;this.setProperty("dateValue",o,true);this._oWantedDate=undefined;}var s=this.getSecondDateValue();var v=this._formatValue(o,s);if(v!==this.getValue()){this._lastValue=v;}this.setProperty("value",v,true);if(this.getDomRef()){var O=this._formatValue(o,s);if(this._$input.val()!==O){this._$input.val(O);this._setLabelVisibility();this._curpos=this._$input.cursorPos();}}return this;};b.prototype.setSecondDateValue=function(s){if(s&&!(s instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}if(q.sap.equal(this.getSecondDateValue(),s)){return this;}if(s&&(s.getTime()<this._oMinDate.getTime()||s.getTime()>this._oMaxDate.getTime())){this._bValid=false;this._oWantedSecondDate=s;s=undefined;}else{this._bValid=true;this.setProperty("secondDateValue",s,true);this._oWantedSecondDate=undefined;}var o=this.getDateValue();var v=this._formatValue(o,s);if(v!==this.getValue()){this._lastValue=v;}this.setProperty("value",v,true);if(this.getDomRef()){var O=this._formatValue(o,s);if(this._$input.val()!==O){this._$input.val(O);this._setLabelVisibility();this._curpos=this._$input.cursorPos();}}return this;};b.prototype.setMinDate=function(o){a.prototype.setMinDate.apply(this,arguments);if(o){var s=this.getSecondDateValue();if(s&&s.getTime()<this._oMinDate.getTime()){q.sap.log.warning("SecondDateValue not in valid date -> changed to minDate",this);this.setSecondDateValue(new Date(this._oMinDate.getTime()));}}return this;};b.prototype.setMaxDate=function(o){a.prototype.setMaxDate.apply(this,arguments);if(o){var s=this.getSecondDateValue();if(s&&s.getTime()>this._oMaxDate.getTime()){q.sap.log.warning("SecondDateValue not in valid date -> changed to maxDate",this);this.setSecondDateValue(new Date(this._oMaxDate.getTime()));}}return this;};b.prototype._checkMinMaxDate=function(){a.prototype._checkMinMaxDate.apply(this,arguments);if(this._oWantedSecondDate&&this._oWantedSecondDate.getTime()>=this._oMinDate.getTime()&&this._oWantedSecondDate.getTime()<=this._oMaxDate.getTime()){this.setSecondDateValue(this._oWantedSecondDate);}};b.prototype._parseValue=function(v){var F;var i=[];var o,j;var s=d.call(this);v=v.trim();if(s&&v){v=h(v,[s," "]);i=v.split(s);if(i.length===2){if(i[0].slice(i[0].length-1,i[0].length)==" "){i[0]=i[0].slice(0,i[0].length-1);}if(i[1].slice(0,1)==" "){i[1]=i[1].slice(1);}}else{i=v.split(" "+s+" ");}if(v.indexOf(s)===-1){var k=v.split(" ");if(k.length===2){i=k;}}}if(v&&i.length<=2){F=e.call(this);if((!s||s==="")||i.length===1){o=F.parse(v);}else if(i.length===2){o=F.parse(i[0]);j=F.parse(i[1]);if(!o||!j){o=undefined;j=undefined;}}}return[o,j];};b.prototype._formatValue=function(o,s){var v="";var i=d.call(this);if(o){var F;F=e.call(this);if(i&&i!==""&&s){v=F.format(o)+" "+i+" "+F.format(s);}else{v=F.format(o);}}return v;};b.prototype.onChange=function(){if(!this.getEditable()||!this.getEnabled()){return;}var v=this._$input.val();var i=[undefined,undefined];this._oWantedDate=undefined;this._oWantedSecondDate=undefined;this._bValid=true;if(v!=""){i=this._parseValue(v);i=c.call(this,i[0],i[1]);if(i[0]){v=this._formatValue(i[0],i[1]);}else{this._bValid=false;}}if(v!==this._lastValue){if(this.getDomRef()&&(this._$input.val()!==v)){this._$input.val(v);this._curpos=this._$input.cursorPos();}this._lastValue=v;this.setProperty("value",v,true);if(this._bValid){this.setProperty("dateValue",i[0],true);this.setProperty("secondDateValue",i[1],true);}this._setLabelVisibility();if(this._oPopup&&this._oPopup.isOpen()){var s=this.getDateValue();if(s){if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!==s.getTime()){this._oDateRange.setStartDate(new Date(s.getTime()));this._oCalendar.focusDate(s);}}else{if(this._oDateRange.getStartDate()){this._oDateRange.setStartDate(undefined);}}var E=this.getSecondDateValue();if(E){if(!this._oDateRange.getEndDate()||this._oDateRange.getEndDate().getTime()!==E.getTime()){this._oDateRange.setEndDate(new Date(E.getTime()));this._oCalendar.focusDate(E);}}else{if(this._oDateRange.getEndDate()){this._oDateRange.setEndDate(undefined);}}}_.call(this,this._bValid);}};b.prototype._getInputValue=function(v){v=(typeof v=="undefined")?this._$input.val():v.toString();var i=this._parseValue(v);v=this._formatValue(i[0],i[1]);return v;};b.prototype.updateDomValue=function(v){this._bCheckDomValue=true;v=(typeof v=="undefined")?this._$input.val():v.toString();this._curpos=this._$input.cursorPos();var i=this._parseValue(v);v=this._formatValue(i[0],i[1]);if(this.isActive()&&(this._$input.val()!==v)){this._$input.val(v);this._$input.cursorPos(this._curpos);}this._setLabelVisibility();return this;};b.prototype.onsappageup=function(){};b.prototype.onsappageupmodifiers=function(){};b.prototype.onsappagedown=function(){};b.prototype.onsappagedownmodifiers=function(){};b.prototype._fillDateRange=function(){a.prototype._fillDateRange.apply(this,arguments);var E=this.getSecondDateValue();if(E){if(!this._oDateRange.getEndDate()||this._oDateRange.getEndDate().getTime()!==E.getTime()){this._oDateRange.setEndDate(new Date(E.getTime()));}}else{if(this._oDateRange.getEndDate()){this._oDateRange.setEndDate(undefined);}}};b.prototype._selectDate=function(E){var s=this._oCalendar.getSelectedDates();if(s.length>0){var o=s[0].getStartDate();var i=s[0].getEndDate();if(o&&i){var j=this.getDateValue();var k=this.getSecondDateValue();var v;if(!q.sap.equal(o,j)||!q.sap.equal(i,k)){if(q.sap.equal(i,k)){this.setDateValue(o);}else{this.setProperty("dateValue",o,true);this.setSecondDateValue(i);}v=this.getValue();_.call(this,true);if((D.system.desktop||!D.support.touch)&&!q.sap.simulateMobileOnDesktop){this._curpos=v.length;this._$input.cursorPos(this._curpos);}}else if(!this._bValid){v=this._formatValue(o,i);if(v!=this._$input.val()){this._bValid=true;if(this.getDomRef()){this._$input.val(v);}_.call(this,true);}}this._oPopup.close();}}};b.prototype.getAccessibilityInfo=function(){var r=this.getRenderer();var i=a.prototype.getAccessibilityInfo.apply(this,arguments);var v=this.getValue()||"";if(this._bValid){var o=this.getDateValue();if(o){v=this._formatValue(o,this.getSecondDateValue());}}i.description=[v,r.getLabelledByAnnouncement(this),r.getDescribedByAnnouncement(this)].join(" ").trim();return i;};function _(v){this.fireChangeEvent(this.getValue(),{from:this.getDateValue(),to:this.getSecondDateValue(),valid:v});}function c(o,s){if(o&&s&&o.getTime()>s.getTime()){var t=o;o=s;s=t;}if((o&&(o.getTime()<this._oMinDate.getTime()||o.getTime()>this._oMaxDate.getTime()))||(s&&(s.getTime()<this._oMinDate.getTime()||s.getTime()>this._oMaxDate.getTime()))){return[undefined,undefined];}else{return[o,s];}}function d(){var s=this.getDelimiter();if(!s){if(!this._sLocaleDelimiter){var L=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var o=sap.ui.core.LocaleData.getInstance(L);var p=o.getIntervalPattern();var i=p.indexOf("{0}")+3;var I=p.indexOf("{1}");s=p.slice(i,I);if(s.length>1){if(s.slice(0,1)==" "){s=s.slice(1);}if(s.slice(s.length-1,s.length)==" "){s=s.slice(0,s.length-1);}}this._sLocaleDelimiter=s;}else{s=this._sLocaleDelimiter;}}return s;}function e(){var p=(this.getDisplayFormat()||"medium");var F;var C=this.getDisplayFormatType();if(p==this._sUsedDisplayPattern&&C==this._sUsedDisplayCalendarType){F=this._oDisplayFormat;}else{if(this._checkStyle(p)){F=sap.ui.core.format.DateFormat.getInstance({style:p,strictParsing:true,calendarType:C});}else{F=sap.ui.core.format.DateFormat.getInstance({pattern:p,strictParsing:true,calendarType:C});}this._sUsedDisplayPattern=p;this._sUsedDisplayCalendarType=C;this._oDisplayFormat=F;}return F;}function f(v,E){return v&&E&&v.lastIndexOf(E)===v.length-E.length;}function g(v,s){return v&&s&&v.indexOf(s)===0;}function h(v,p){var i=0,t=p;if(!t){t=[" "];}while(i<t.length){if(f(v,t[i])){v=v.substring(0,v.length-t[i].length);i=0;continue;}i++;}i=0;while(i<t.length){if(g(v,t[i])){v=v.substring(t[i].length);i=0;continue;}i++;}return v;}return b;},true);