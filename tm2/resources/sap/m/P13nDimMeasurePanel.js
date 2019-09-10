/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ColumnListItem','./P13nPanel','./P13nDimMeasureItem','./SearchField','./Table','./library','sap/ui/core/Control','sap/ui/model/ChangeReason','sap/ui/model/json/JSONModel'],function(q,C,P,c,S,T,l,d,e,J){"use strict";var f=P.extend("sap.m.P13nDimMeasurePanel",{metadata:{library:"sap.m",properties:{chartTypeKey:{type:"string",defaultValue:""}},aggregations:{dimMeasureItems:{type:"sap.m.P13nDimMeasureItem",multiple:true,singularName:"dimMeasureItem",bindable:"bindable"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"},availableChartTypes:{type:"sap.ui.core.Item",multiple:true,singularName:"availableChartType"}},events:{changeDimMeasureItems:{},changeChartType:{}}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.addClass("sapMP13nColumnsPanel");r.writeClasses();r.write(">");var a=o.getAggregation("content");if(a){a.forEach(function(b){r.renderControl(b);});}r.write("</div>");}});f.prototype.init=function(){var t=this;this._iLiveChangeTimer=0;this._iSearchTimer=0;this._bIgnoreUpdateInternalModel=false;this._bUpdateInternalModel=true;this._bOnAfterRenderingFirstTimeExecuted=false;var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.oAvailableRoleTypes={Dimension:[{key:"category",text:r.getText('COLUMNSPANEL_CHARTROLE_CATEGORY')},{key:"series",text:r.getText('COLUMNSPANEL_CHARTROLE_SERIES')}],Measure:[{key:"axis1",text:r.getText('COLUMNSPANEL_CHARTROLE_AXIS1')},{key:"axis2",text:r.getText('COLUMNSPANEL_CHARTROLE_AXIS2')}]};var m=new J({availableChartTypes:[],selectedChartTypeKey:null,items:[],columnKeyOfMarkedItem:undefined,isMoveDownButtonEnabled:undefined,isMoveUpButtonEnabled:undefined,showOnlySelectedItems:undefined,countOfSelectedItems:0,countOfItems:0});m.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);m.setSizeLimit(1000);this.setModel(m,"$sapmP13nDimMeasurePanel");this.setType(sap.m.P13nPanelType.dimeasure);this.setTitle(r.getText("CHARTPANEL_TITLE"));this._createTable();this._createToolbar();this.setVerticalScrolling(false);var s=new sap.m.ScrollContainer({horizontal:false,vertical:true,content:[this._oTable],width:'100%',height:'100%'});this.addAggregation("content",s);this._fnHandleResize=function(){var b=false,i,a;if(t.getParent){var $=null,g,h;var p=t.getParent();var o=t._getToolbar();if(p){$=q("#"+p.getId()+"-cont");if($.children().length>0&&o.$().length>0){i=s.$()[0].clientHeight;g=$.children()[0].clientHeight;h=o?o.$()[0].clientHeight:0;a=g-h;if(i!==a){s.setHeight(a+'px');b=true;}}}}return b;};this._sContainerResizeListener=sap.ui.core.ResizeHandler.register(s,this._fnHandleResize);};f.prototype.onBeforeRendering=function(){this._updateInternalModel();if(!this._getInternalModel().getProperty("/columnKeyOfMarkedItem")){this._setColumnKeyOfMarkedItem(this._getColumnKeyByTableItem(this._getVisibleTableItems()[0]));}this._switchMarkedTableItemTo(this._getTableItemByColumnKey(this._getInternalModel().getProperty("/columnKeyOfMarkedItem")));this._updateControlLogic();};f.prototype.onAfterRendering=function(){var t=this;if(!this._bOnAfterRenderingFirstTimeExecuted){this._bOnAfterRenderingFirstTimeExecuted=true;window.clearTimeout(this._iLiveChangeTimer);this._iLiveChangeTimer=window.setTimeout(function(){t._fnHandleResize();t._getToolbar()._resetAndInvalidateToolbar();},0);}};f.prototype.getOkPayload=function(){this._updateInternalModel();this._getInternalModel().getProperty("/items").forEach(function(m){if(this._getDimMeasureItemByColumnKey(m.columnKey)){return;}if(!m.persistentSelected){return;}this.addAggregation("dimMeasureItems",new sap.m.P13nDimMeasureItem({columnKey:m.columnKey,visible:m.persistentSelected,index:m.persistentIndex===-1?undefined:m.persistentIndex,role:m.role}));},this);return{dimMeasureItems:this.getDimMeasureItems(),chartTypeKey:this.getChartTypeKey()};};f.prototype.exit=function(){sap.ui.core.ResizeHandler.deregister(this._sContainerResizeListener);this._sContainerResizeListener=null;this._getToolbar().destroy();this._oTable.destroy();this._oTable=null;if(this._getInternalModel()){this._getInternalModel().destroy();}window.clearTimeout(this._iLiveChangeTimer);window.clearTimeout(this._iSearchTimer);};f.prototype.addItem=function(i){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.addAggregation("items",i);return this;};f.prototype.insertItem=function(i,I){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.insertAggregation("items",i,I);return this;};f.prototype.removeItem=function(i){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}i=this.removeAggregation("items",i);return i;};f.prototype.removeAllItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}return this.removeAllAggregation("items");};f.prototype.destroyItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.destroyAggregation("items");return this;};f.prototype.addDimMeasureItem=function(D){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.addAggregation("dimMeasureItems",D);return this;};f.prototype.insertDimMeasureItem=function(D,i){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.insertAggregation("dimMeasureItems",D,i);return this;};f.prototype.updateDimMeasureItems=function(r){this.updateAggregation("dimMeasureItems");if(r===e.Change&&!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}};f.prototype.removeDimMeasureItem=function(D){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}return this.removeAggregation("dimMeasureItems",D);};f.prototype.removeAllDimMeasureItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}return this.removeAllAggregation("dimMeasureItems");};f.prototype.destroyDimMeasureItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.destroyAggregation("dimMeasureItems");return this;};f.prototype.setChartTypeKey=function(s){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.setProperty("chartTypeKey",s);return this;};f.prototype.addAvailableChartType=function(a){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.addAggregation("availableChartTypes",a);return this;};f.prototype.insertAvailableChartType=function(a,i){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.insertAggregation("availableChartTypes",a,i);return this;};f.prototype.removeAvailableChartType=function(a){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}return this.removeAggregation("availableChartTypes",a);};f.prototype.removeAllAvailableChartType=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}return this.removeAllAggregation("availableChartTypes");};f.prototype.destroyAvailableChartType=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.destroyAggregation("availableChartTypes");return this;};f.prototype.onBeforeNavigationFrom=function(){var s=this.getChartTypeKey();var D=[];var m=[];this.getDimMeasureItems().forEach(function(o){var M=this._getModelItemByColumnKey(o.getColumnKey());if(!M){return;}if(M.aggregationRole==="Dimension"){D.push(o);}else if(M.aggregationRole==="Measure"){m.push(o);}},this);D=D.filter(function(i){return i.getVisible();}).map(function(i){return{name:i.getColumnKey()};});m=m.filter(function(i){return i.getVisible();}).map(function(i){return{name:i.getColumnKey()};});sap.ui.getCore().loadLibrary("sap.chart");var r;try{r=sap.chart.api.getChartTypeLayout(s,D,m);}catch(E){return false;}return r.errors.length===0;};f.prototype._notifyChange=function(){var L=this.getChangeNotifier();if(L){L(this);}};f.prototype._scrollToSelectedItem=function(i){if(!i){return;}sap.ui.getCore().applyChanges();if(!!i.getDomRef()){i.focus();}};f.prototype._getInternalModel=function(){return this.getModel("$sapmP13nDimMeasurePanel");};f.prototype._createTable=function(){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTable=new T({mode:sap.m.ListMode.MultiSelect,rememberSelections:false,itemPress:q.proxy(this._onItemPressed,this),selectionChange:q.proxy(this._onSelectionChange,this),columns:[new sap.m.Column({header:new sap.m.Text({text:{parts:[{path:'/countOfSelectedItems'},{path:'/countOfItems'}],formatter:function(i,a){return r.getText('COLUMNSPANEL_SELECT_ALL_WITH_COUNTER',[i,a]);}}})}),new sap.m.Column({header:new sap.m.Text({text:r.getText('COLUMNSPANEL_COLUMN_TYPE')})}),new sap.m.Column({header:new sap.m.Text({text:r.getText('COLUMNSPANEL_COLUMN_ROLE')})})],items:{path:"/items",templateShareable:false,template:new sap.m.ColumnListItem({cells:[new sap.m.Text({text:"{text}"}),new sap.m.Text({text:{path:'',formatter:function(m){if(m.aggregationRole==="Dimension"){return r.getText('COLUMNSPANEL_TYPE_DIMENSION');}if(m.aggregationRole==="Measure"){return r.getText('COLUMNSPANEL_TYPE_MEASURE');}}}}),new sap.m.Select({selectedKey:"{role}",items:{path:'availableRoleTypes',factory:function(i,b){var a=b.getObject();return new sap.ui.core.Item({key:a.key,text:a.text});}},change:q.proxy(this._onRoleChange,this)})],visible:"{visible}",selected:"{persistentSelected}",tooltip:"{tooltip}",type:sap.m.ListType.Active})}});this._oTable.setModel(this._getInternalModel());};f.prototype._createToolbar=function(){var t=this;var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var i=new sap.ui.core.InvisibleText({text:r.getText('COLUMNSPANEL_CHARTTYPE')});var o=new sap.m.ComboBox({placeholder:i.getText(),selectedKey:{path:'/selectedChartTypeKey'},ariaLabelledBy:i,items:{path:'/availableChartTypes',templateShareable:false,template:new sap.ui.core.Item({key:"{key}",text:"{text}"})},selectionChange:q.proxy(this._onChartTypeChange,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:false,stayInOverflow:false})});var a=new sap.m.OverflowToolbar(this.getId()+"-toolbar",{design:sap.m.ToolbarDesign.Auto,content:[i,o,new sap.m.ToolbarSpacer(),new S(this.getId()+"-searchField",{liveChange:function(E){var v=E.getSource().getValue(),D=(v?300:0);window.clearTimeout(t._iSearchTimer);if(D){t._iSearchTimer=window.setTimeout(function(){t._onExecuteSearch();},D);}else{t._onExecuteSearch();}},search:q.proxy(this._onExecuteSearch,this),layoutData:new sap.m.OverflowToolbarLayoutData({minWidth:"12.5rem",maxWidth:"23.077rem",shrinkable:true,moveToOverflow:false,stayInOverflow:false})}),new sap.m.Button({text:{path:'/showOnlySelectedItems',formatter:function(s){return s?r.getText('COLUMNSPANEL_SHOW_ALL'):r.getText('COLUMNSPANEL_SHOW_SELECTED');}},tooltip:{path:'/showOnlySelectedItems',formatter:function(s){return s?r.getText('COLUMNSPANEL_SHOW_ALL'):r.getText('COLUMNSPANEL_SHOW_SELECTED');}},type:sap.m.ButtonType.Transparent,press:q.proxy(this._onSwitchButtonShowSelected,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:sap.m.OverflowToolbarPriority.High})}),new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI("collapse-group"),text:r.getText('COLUMNSPANEL_MOVE_TO_TOP'),tooltip:r.getText('COLUMNSPANEL_MOVE_TO_TOP'),type:sap.m.ButtonType.Transparent,enabled:{path:'/isMoveUpButtonEnabled'},press:q.proxy(this.onPressButtonMoveToTop,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:sap.m.OverflowToolbarPriority.Low,group:2})}),new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI("slim-arrow-up"),text:r.getText('COLUMNSPANEL_MOVE_UP'),tooltip:r.getText('COLUMNSPANEL_MOVE_UP'),type:sap.m.ButtonType.Transparent,enabled:{path:'/isMoveUpButtonEnabled'},press:q.proxy(this.onPressButtonMoveUp,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:sap.m.OverflowToolbarPriority.High,group:1})}),new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI("slim-arrow-down"),text:r.getText('COLUMNSPANEL_MOVE_DOWN'),tooltip:r.getText('COLUMNSPANEL_MOVE_DOWN'),type:sap.m.ButtonType.Transparent,enabled:{path:'/isMoveDownButtonEnabled'},press:q.proxy(this.onPressButtonMoveDown,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:sap.m.OverflowToolbarPriority.High,group:1})}),new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI("expand-group"),text:r.getText('COLUMNSPANEL_MOVE_TO_BOTTOM'),tooltip:r.getText('COLUMNSPANEL_MOVE_TO_BOTTOM'),type:sap.m.ButtonType.Transparent,enabled:{path:'/isMoveDownButtonEnabled'},press:q.proxy(this.onPressButtonMoveToBottom,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:sap.m.OverflowToolbarPriority.Low,group:2})})]});a.setModel(this._getInternalModel());this.addAggregation("content",a);};f.prototype.onPressButtonMoveToTop=function(){this._moveMarkedTableItem(this._getMarkedTableItem(),this._getVisibleTableItems()[0]);};f.prototype.onPressButtonMoveUp=function(){var v=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),v[v.indexOf(this._getMarkedTableItem())-1]);};f.prototype.onPressButtonMoveDown=function(){var v=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),v[v.indexOf(this._getMarkedTableItem())+1]);};f.prototype.onPressButtonMoveToBottom=function(){var v=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),v[v.length-1]);};f.prototype._onSwitchButtonShowSelected=function(){this._getInternalModel().setProperty("/showOnlySelectedItems",!this._getInternalModel().getProperty("/showOnlySelectedItems"));this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();this._scrollToSelectedItem(this._getMarkedTableItem());this._updateControlLogic();this._fnHandleResize();};f.prototype._onExecuteSearch=function(){this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();this._scrollToSelectedItem(this._getMarkedTableItem());this._updateControlLogic();};f.prototype._switchVisibilityOfUnselectedModelItems=function(){var s=this._isFilteredByShowSelected();var m=this._getInternalModel().getProperty("/items");m.forEach(function(M){if(M.persistentSelected){M.visible=true;return;}M.visible=!s;});this._getInternalModel().setProperty("/items",m);};f.prototype._getVisibleModelItems=function(){return this._getInternalModel().getProperty("/items").filter(function(m){return!!m.visible;});};f.prototype._getVisibleModelItems=function(){return this._getInternalModel().getProperty("/items").filter(function(m){return!!m.visible;});};f.prototype._moveMarkedTableItem=function(t,o){var m=this._getModelItemByColumnKey(this._getColumnKeyByTableItem(t));var M=this._getModelItemByColumnKey(this._getColumnKeyByTableItem(o));var i=this._getModelItemIndexByColumnKey(m.columnKey);var I=this._getModelItemIndexByColumnKey(M.columnKey);this._moveModelItems(i,I);this._scrollToSelectedItem(this._getMarkedTableItem());this._updateControlLogic();this._fireChangeDimMeasureItems();this._notifyChange();};f.prototype._moveModelItems=function(i,I){var m=this._getInternalModel().getProperty("/items");if(i<0||I<0||i>m.length-1||I>m.length-1){return false;}this._removeStyleOfMarkedTableItem();var M=m.splice(i,1);m.splice(I,0,M[0]);this._updateModelItemsPersistentIndex(m);this._updateCounts(m);this._getInternalModel().setProperty("/items",m);this._switchMarkedTableItemTo(this._getMarkedTableItem());return true;};f.prototype._getModelItemByColumnKey=function(s){var m=this._getInternalModel().getProperty("/items").filter(function(M){return M.columnKey===s;});return m[0];};f.prototype._updateCounts=function(m){var i=0;var a=0;m.forEach(function(M){i++;if(M.persistentSelected){a++;}});this._getInternalModel().setProperty("/countOfItems",i);this._getInternalModel().setProperty("/countOfSelectedItems",a);};f.prototype._sortModelItemsByPersistentIndex=function(m){m.sort(function(a,b){if(a.persistentSelected===true&&(b.persistentSelected===false||b.persistentSelected===undefined)){return-1;}else if((a.persistentSelected===false||a.persistentSelected===undefined)&&b.persistentSelected===true){return 1;}else if(a.persistentSelected===true&&b.persistentSelected===true){if(a.persistentIndex>-1&&a.persistentIndex<b.persistentIndex){return-1;}else if(b.persistentIndex>-1&&a.persistentIndex>b.persistentIndex){return 1;}else{return 0;}}else if((a.persistentSelected===false||a.persistentSelected===undefined)&&(b.persistentSelected===false||b.persistentSelected===undefined)){if(a.text<b.text){return-1;}else if(a.text>b.text){return 1;}else{return 0;}}});};f.prototype._getColumnKeyByTableItem=function(t){var i=this._oTable.indexOfItem(t);if(i<0){return null;}return this._oTable.getBinding("items").getContexts()[i].getObject().columnKey;};f.prototype._getModelItemIndexByColumnKey=function(s){var i=-1;this._getInternalModel().getData().items.some(function(m,I){if(m.columnKey===s){i=I;return true;}});return i;};f.prototype._getSelectedModelItems=function(){return this._getInternalModel().getProperty("/items").filter(function(m){return m.persistentSelected;});};f.prototype._getVisibleTableItems=function(){return this._oTable.getItems().filter(function(t){return t.getVisible();});};f.prototype._getTableItemByColumnKey=function(s){var a=this._oTable.getBinding("items").getContexts();var t=this._oTable.getItems().filter(function(o,i){return a[i].getObject().columnKey===s;});return t[0];};f.prototype._getToolbar=function(){return sap.ui.getCore().byId(this.getId()+"-toolbar")||null;};f.prototype._getSearchField=function(){return sap.ui.getCore().byId(this.getId()+"-searchField")||null;};f.prototype._getSearchText=function(){var s=this._getSearchField();return s?s.getValue():"";};f.prototype._isFilteredBySearchText=function(){return!!this._getSearchText().length;};f.prototype._isFilteredByShowSelected=function(){return this._getInternalModel().getData().showOnlySelectedItems;};f.prototype._updateControlLogic=function(){var i=this._isFilteredBySearchText();var s=this._isFilteredByShowSelected();var v=this._getVisibleTableItems();this._getInternalModel().setProperty("/isMoveUpButtonEnabled",v.indexOf(this._getMarkedTableItem())>0);this._getInternalModel().setProperty("/isMoveDownButtonEnabled",v.indexOf(this._getMarkedTableItem())>-1&&v.indexOf(this._getMarkedTableItem())<v.length-1);var t=sap.ui.getCore().byId(this._oTable.getId()+'-sa');if(t){t.setEnabled(!i&&!s);}};f.prototype._updateModelItemsPersistentIndex=function(m){var p=-1;m.forEach(function(M){M.persistentIndex=-1;if(M.persistentSelected){p++;M.persistentIndex=p;}});};f.prototype._fireChangeDimMeasureItems=function(){this._bIgnoreUpdateInternalModel=true;this.fireChangeDimMeasureItems({items:this._getInternalModel().getProperty("/items").map(function(m){return{columnKey:m.columnKey,visible:m.persistentSelected,index:m.persistentIndex===-1?undefined:m.persistentIndex,role:m.role};})});this._bIgnoreUpdateInternalModel=false;};f.prototype._fireChangeChartType=function(){this._bIgnoreUpdateInternalModel=true;this.fireChangeChartType({chartTypeKey:this._getInternalModel().getProperty("/selectedChartTypeKey")});this._bIgnoreUpdateInternalModel=false;};f.prototype._getDimMeasureItemByColumnKey=function(s){var D=this.getDimMeasureItems().filter(function(o){return o.getColumnKey()===s;});return D[0];};f.prototype._getMarkedTableItem=function(){return this._getTableItemByColumnKey(this._getInternalModel().getProperty("/columnKeyOfMarkedItem"));};f.prototype._setColumnKeyOfMarkedItem=function(s){this._getInternalModel().setProperty("/columnKeyOfMarkedItem",s);};f.prototype._onItemPressed=function(E){this._switchMarkedTableItemTo(E.getParameter('listItem'));this._updateControlLogic();};f.prototype._onChartTypeChange=function(E){this._fireChangeChartType();this._notifyChange();};f.prototype._onRoleChange=function(E){this._fireChangeDimMeasureItems();this._notifyChange();};f.prototype._onSelectionChange=function(E){if(!E.getParameter("selectAll")&&E.getParameter("listItems").length===1){this._switchMarkedTableItemTo(E.getParameter("listItem"));}this._selectTableItem();};f.prototype._selectTableItem=function(){this._updateControlLogic();var m=this._getInternalModel().getProperty("/items");this._updateModelItemsPersistentIndex(m);this._updateCounts(m);this._getInternalModel().setProperty("/items",m);this._fireChangeDimMeasureItems();this._notifyChange();};f.prototype._switchMarkedTableItemTo=function(t){this._removeStyleOfMarkedTableItem();var s=this._getColumnKeyByTableItem(t);if(s){this._setColumnKeyOfMarkedItem(s);t.addStyleClass("sapMP13nColumnsPanelItemSelected");}};f.prototype._removeStyleOfMarkedTableItem=function(){if(this._getMarkedTableItem()){this._getMarkedTableItem().removeStyleClass("sapMP13nColumnsPanelItemSelected");}};f.prototype._filterModelItemsBySearchText=function(){var s=this._getSearchText();s=s.replace(/(^\s+)|(\s+$)/g,'');s=s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');var r=new RegExp(s,'igm');if(!r){return;}this._getVisibleModelItems().forEach(function(m){m.visible=false;if(m.text&&m.text.match(r)){m.visible=true;}if(m.aggregationRole&&m.aggregationRole.match(r)){m.visible=true;}if(m.role&&m.role.match(r)){m.visible=true;}if(m.tooltip&&m.tooltip.match(r)){m.visible=true;}});this._getInternalModel().refresh();};f.prototype._updateInternalModel=function(){if(!this._bUpdateInternalModel){return;}this._bUpdateInternalModel=false;this._removeStyleOfMarkedTableItem();this._getInternalModel().setProperty("/items",this.getItems().map(function(i){return{columnKey:i.getColumnKey(),visible:true,text:i.getText(),tooltip:i.getTooltip(),aggregationRole:i.getAggregationRole(),availableRoleTypes:this.oAvailableRoleTypes[i.getAggregationRole()],role:i.getRole(),persistentIndex:-1,persistentSelected:undefined};},this));this._getInternalModel().setProperty("/selectedChartTypeKey",this.getChartTypeKey());this._getInternalModel().setProperty("/availableChartTypes",this.getAvailableChartTypes().map(function(a){return{key:a.getKey(),text:a.getText()};},this));this.getDimMeasureItems().forEach(function(D){var M=this._getModelItemByColumnKey(D.getColumnKey());if(!M){return;}if(D.getIndex()!==undefined){M.persistentIndex=D.getIndex();}if(D.getVisible()!==undefined){M.persistentSelected=D.getVisible();}if(D.getRole()!==undefined){M.role=D.getRole();}},this);this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();var m=this._getInternalModel().getProperty("/items");this._sortModelItemsByPersistentIndex(m);this._updateCounts(m);this._getInternalModel().setProperty("/items",m);this._switchMarkedTableItemTo(this._getMarkedTableItem());};return f;},true);