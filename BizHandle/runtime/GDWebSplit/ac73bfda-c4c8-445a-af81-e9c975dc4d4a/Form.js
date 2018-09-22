window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2017/12/19 18:12:57]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GD_AssetSplit','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '190901c8-cb72-41b0-9444-a9864858dff0',
				defaultInstance:'DM_GD_AssetSplit_ListInstance',
				primaryKey: 'GDCHZJL_ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'GDCHZJL':false
				},


				instances: {
						'DM_GD_AssetSplit_ListInstance': {
								view: '3',
								dataSourceName:'DM_GD_AssetSplit_ListInstance',
								defaultLoad: true,
								filter: '',
								sort: '',
								pagination: {pageSize:20}
						}
				},

				GetDataSourceSchema: function(context){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetDataSourceSchema', [{'context': context}]);
				},

				GetDataPosition: function(context){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetDataPosition', [{'context': context}]);
				},

				GetDefaultValueWithSchema: function(dataModelID, queryType, formID, userID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetDefaultValueWithSchema', [{'dataModelID': dataModelID, 'queryType': queryType, 'formID': formID, 'userID': userID}]);
				},

				GetBizFormID: function(baseFormID, firstLatitude, secondLatitude){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetBizFormID', [{'baseFormID': baseFormID, 'firstLatitude': firstLatitude, 'secondLatitude': secondLatitude}]);
				},

				RunProcGetData: function(procName, tableNames, parameters){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'RunProcGetData', [{'procName': procName, 'tableNames': tableNames, 'parameters': parameters}]);
				},

				RunProcGetDataByModel: function(procName, tableNames, parameters, dataModelID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'RunProcGetDataByModel', [{'procName': procName, 'tableNames': tableNames, 'parameters': parameters, 'dataModelID': dataModelID}]);
				},

				GetObjectsDataForComboBox: function(dataModelID, valueField, nameField, condition){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsDataForComboBox', [{'dataModelID': dataModelID, 'valueField': valueField, 'nameField': nameField, 'condition': condition}]);
				},

				GetDataForComboBox: function(dataModelID, valueField, nameField, condition, webQueryPolicy){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetDataForComboBox', [{'dataModelID': dataModelID, 'valueField': valueField, 'nameField': nameField, 'condition': condition, 'webQueryPolicy': webQueryPolicy}]);
				},

				GetObjectsDataWithElements: function(dataModelID, formID, filter, queryType, policy){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsDataWithElements', [{'dataModelID': dataModelID, 'formID': formID, 'filter': filter, 'queryType': queryType, 'policy': policy}]);
				},

				GetObjectsXmlByOtherParam: function(dataModelID, filter, queryType, policy, otherParam){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsXmlByOtherParam', [{'dataModelID': dataModelID, 'filter': filter, 'queryType': queryType, 'policy': policy, 'otherParam': otherParam}]);
				},

				GetStyleSolutionInfos: function(formID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetStyleSolutionInfos', [{'formID': formID}]);
				},

				GetStyleSolutionByID: function(id){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetStyleSolutionByID', [{'id': id}]);
				},

				GetModelElementInfos: function(dataModelID, bizObjectID, bizOpID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetModelElementInfos', [{'dataModelID': dataModelID, 'bizObjectID': bizObjectID, 'bizOpID': bizOpID}]);
				},

				RemoveStyleSolution: function(id, formID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'RemoveStyleSolution', [{'id': id, 'formID': formID}]);
				},

				SaveStyleSolution: function(solution, formID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveStyleSolution', [{'solution': solution, 'formID': formID}]);
				},

				SetDefaultStyleSolution: function(solutionID, formID, isDefault){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SetDefaultStyleSolution', [{'solutionID': solutionID, 'formID': formID, 'isDefault': isDefault}]);
				},

				GetFieldPermissions: function(bizObjectID, bizOpID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetFieldPermissions', [{'bizObjectID': bizObjectID, 'bizOpID': bizOpID}]);
				},

				GetActionPermissions: function(bizObjectID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetActionPermissions', [{'bizObjectID': bizObjectID}]);
				},

				GetMaxPath: function(dataModelID, filter){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetMaxPath', [{'dataModelID': dataModelID, 'filter': filter}]);
				},

				GetRowsCount: function(dataModelID, filter){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetRowsCount', [{'dataModelID': dataModelID, 'filter': filter}]);
				},

				UpdateFieldValue: function(dataModelID, dataID, fieldName, fieldValue){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'UpdateFieldValue', [{'dataModelID': dataModelID, 'dataID': dataID, 'fieldName': fieldName, 'fieldValue': fieldValue}]);
				},

				EditData: function(context, returnValue){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'EditData', [{'context': context, 'returnValue': returnValue}]);
				},

				AddDataLock: function(dataID, lockID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'AddDataLock', [{'dataID': dataID, 'lockID': lockID}]);
				},

				ReleaseDataLock: function(lockID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'ReleaseDataLock', [{'lockID': lockID}]);
				},

				RemoveObject: function(dataModelID, objectID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'RemoveObject', [{'dataModelID': dataModelID, 'objectID': objectID}]);
				},

				AddObject: function(dataModelID, dataXml){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'AddObject', [{'dataModelID': dataModelID, 'dataXml': dataXml}]);
				},

				AddObjectData: function(dataModelID, data){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'AddObjectData', [{'dataModelID': dataModelID, 'data': data}]);
				},

				SaveObject: function(dataModelID, dataXml){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObject', [{'dataModelID': dataModelID, 'dataXml': dataXml}]);
				},

				SaveObjectData: function(dataModelID, data){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjectData', [{'dataModelID': dataModelID, 'data': data}]);
				},

				SaveObjectDataWithoutReturn: function(dataModelID, data){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjectDataWithoutReturn', [{'dataModelID': dataModelID, 'data': data}]);
				},

				SaveObjects: function(dataModelID, dataXml){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjects', [{'dataModelID': dataModelID, 'dataXml': dataXml}]);
				},

				SaveObjectsData: function(dataModelID, data){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjectsData', [{'dataModelID': dataModelID, 'data': data}]);
				},

				SaveObjectsDataWithoutReturn: function(dataModelID, data){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjectsDataWithoutReturn', [{'dataModelID': dataModelID, 'data': data}]);
				},

				RemoveObjects: function(dataModelID, condition){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'RemoveObjects', [{'dataModelID': dataModelID, 'condition': condition}]);
				},

				RemoveObjectsByFilter: function(dataModelID, filter){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'RemoveObjectsByFilter', [{'dataModelID': dataModelID, 'filter': filter}]);
				},

				GetObjectsXml: function(dataModelID, filter, queryType, policy){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsXml', [{'dataModelID': dataModelID, 'filter': filter, 'queryType': queryType, 'policy': policy}]);
				},

				GetObjectsData: function(dataModelID, filter, queryType, policy){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsData', [{'dataModelID': dataModelID, 'filter': filter, 'queryType': queryType, 'policy': policy}]);
				},

				GetObjectXml: function(dataModelID, objectID, queryType){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectXml', [{'dataModelID': dataModelID, 'objectID': objectID, 'queryType': queryType}]);
				},

				GetObjectData: function(dataModelID, objectID, queryType){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectData', [{'dataModelID': dataModelID, 'objectID': objectID, 'queryType': queryType}]);
				},

				NewObjectWithDefault: function(dataModelID, formDefinitionID, userID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'NewObjectWithDefault', [{'dataModelID': dataModelID, 'formDefinitionID': formDefinitionID, 'userID': userID}]);
				},

				NewObjectDataWithDefault: function(dataModelID, formDefinitionID, userID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'NewObjectDataWithDefault', [{'dataModelID': dataModelID, 'formDefinitionID': formDefinitionID, 'userID': userID}]);
				},

				GetPathLength: function(dataModelID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetPathLength', [{'dataModelID': dataModelID}]);
				},

				GetElementLength: function(dataModelID, elementLabelID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetElementLength', [{'dataModelID': dataModelID, 'elementLabelID': elementLabelID}]);
				},

				GetBillCodeSetting: function(dataModelID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetBillCodeSetting', [{'dataModelID': dataModelID}]);
				},

				GetDataOpPermission: function(bizObjectID, bizOpID, dataModelID, dataID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetDataOpPermission', [{'bizObjectID': bizObjectID, 'bizOpID': bizOpID, 'dataModelID': dataModelID, 'dataID': dataID}]);
				},

				GetDataOpPermissionByAu: function(bizObjectID, auObjID, bizOpID, dataModelID, dataID){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetDataOpPermissionByAu', [{'bizObjectID': bizObjectID, 'auObjID': auObjID, 'bizOpID': bizOpID, 'dataModelID': dataModelID, 'dataID': dataID}]);
				},

				GetObjectsXmlByOtherParam3: function(dataModelID, filter, queryType, policy, otherParam, dataContext){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsXmlByOtherParam3', [{'dataModelID': dataModelID, 'filter': filter, 'queryType': queryType, 'policy': policy, 'otherParam': otherParam, 'dataContext': dataContext}]);
				},

				GetObjectDataWithExtend: function(dataModelID, objectID, queryType, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectDataWithExtend', [{'dataModelID': dataModelID, 'objectID': objectID, 'queryType': queryType, 'otherExtend': otherExtend}]);
				},

				RemoveObjectWithExtend: function(dataModelID, dataXml, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'RemoveObjectWithExtend', [{'dataModelID': dataModelID, 'dataXml': dataXml, 'otherExtend': otherExtend}]);
				},

				RemoveObjectsByFilterWithExtend: function(dataModelID, filter, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'RemoveObjectsByFilterWithExtend', [{'dataModelID': dataModelID, 'filter': filter, 'otherExtend': otherExtend}]);
				},

				AddObjectWithExtend: function(dataModelID, dataXml, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'AddObjectWithExtend', [{'dataModelID': dataModelID, 'dataXml': dataXml, 'otherExtend': otherExtend}]);
				},

				SaveObjectWithExtend: function(dataModelID, dataXml, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjectWithExtend', [{'dataModelID': dataModelID, 'dataXml': dataXml, 'otherExtend': otherExtend}]);
				},

				SaveObjectsWithExtend: function(dataModelID, dataXml, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjectsWithExtend', [{'dataModelID': dataModelID, 'dataXml': dataXml, 'otherExtend': otherExtend}]);
				},

				SaveObjectDataWithExtend: function(dataModelID, data, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjectDataWithExtend', [{'dataModelID': dataModelID, 'data': data, 'otherExtend': otherExtend}]);
				},

				SaveObjectsDataWithExtend: function(dataModelID, data, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'SaveObjectsDataWithExtend', [{'dataModelID': dataModelID, 'data': data, 'otherExtend': otherExtend}]);
				},

				GetObjectsDataWithExtend: function(dataModelID, filter, queryType, otherExtend, policy){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsDataWithExtend', [{'dataModelID': dataModelID, 'filter': filter, 'queryType': queryType, 'otherExtend': otherExtend, 'policy': policy}]);
				},

				GetObjectsDataWithElementsWithExtend: function(dataModelID, formID, filter, queryType, policy, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsDataWithElementsWithExtend', [{'dataModelID': dataModelID, 'formID': formID, 'filter': filter, 'queryType': queryType, 'policy': policy, 'otherExtend': otherExtend}]);
				},

				NewObjectWithDefaultWithExtend: function(dataModelID, formDefinitionID, userID, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'NewObjectWithDefaultWithExtend', [{'dataModelID': dataModelID, 'formDefinitionID': formDefinitionID, 'userID': userID, 'otherExtend': otherExtend}]);
				},

				NewObjectDataWithDefaultWithExtend: function(dataModelID   , formDefinitionID, userID, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'NewObjectDataWithDefaultWithExtend', [{'dataModelID   ': dataModelID   , 'formDefinitionID': formDefinitionID, 'userID': userID, 'otherExtend': otherExtend}]);
				}
		}
}]);



schema['190901c8-cb72-41b0-9444-a9864858dff0']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDCHZJL_ID","defaultValue":"","name":"GDCHZJL_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_XH","defaultValue":"","name":"GDCHZJL_XH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_HZCBH","defaultValue":"","name":"GDCHZJL_HZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_DWBH","defaultValue":"","name":"GDCHZJL_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH","defaultValue":"","name":"GDCHZJL_YZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ZCNM","defaultValue":"","name":"GDCHZJL_YZCBH_GDZCZY_ZCNM","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDCHZJL_YZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBH","defaultValue":"","name":"GDZCZY_BMBH","type":"String","unique":false},{"allowNull":false,"caption":"LSBMZD_BMMC","defaultValue":"","name":"LSBMZD_BMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_LBBH","defaultValue":"","name":"GDCHZJL_YZCBH_GDZCZY_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ZCSL","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ZCYZ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_RZZJ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_RZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_LJZJ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_JCZ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_JZZB","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_JZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ID","defaultValue":"","name":"GDCHZJL_YZCBH_GDZCZY_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_BNRZZJ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_BNRZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_KJQJ","defaultValue":"","name":"GDCHZJL_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_CZRQ","defaultValue":"","name":"GDCHZJL_CZRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_CZBZ","defaultValue":"","name":"GDCHZJL_CZBZ","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_ZCID","defaultValue":"","name":"GDCHZJL_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_ZDR","defaultValue":"","name":"GDCHZJL_ZDR","type":"String","unique":false}],"primaryKey":"GDCHZJL_ID","tableName":"GDCHZJL","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDCHZJL_ID","defaultValue":"","name":"GDCHZJL_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_XH","defaultValue":"","name":"GDCHZJL_XH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_HZCBH","defaultValue":"","name":"GDCHZJL_HZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_DWBH","defaultValue":"","name":"GDCHZJL_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH","defaultValue":"","name":"GDCHZJL_YZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ZCNM","defaultValue":"","name":"GDCHZJL_YZCBH_GDZCZY_ZCNM","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDCHZJL_YZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBH","defaultValue":"","name":"GDZCZY_BMBH","type":"String","unique":false},{"allowNull":false,"caption":"LSBMZD_BMMC","defaultValue":"","name":"LSBMZD_BMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_LBBH","defaultValue":"","name":"GDCHZJL_YZCBH_GDZCZY_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ZCSL","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ZCYZ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_RZZJ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_RZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_LJZJ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_JCZ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_JZZB","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_JZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_ID","defaultValue":"","name":"GDCHZJL_YZCBH_GDZCZY_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_YZCBH_GDZCZY_BNRZZJ","defaultValue":0,"name":"GDCHZJL_YZCBH_GDZCZY_BNRZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDCHZJL_KJQJ","defaultValue":"","name":"GDCHZJL_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_CZRQ","defaultValue":"","name":"GDCHZJL_CZRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_CZBZ","defaultValue":"","name":"GDCHZJL_CZBZ","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_ZCID","defaultValue":"","name":"GDCHZJL_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDCHZJL_ZDR","defaultValue":"","name":"GDCHZJL_ZDR","type":"String","unique":false}],"primaryKey":"GDCHZJL_ID","tableName":"GDCHZJL","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2017/12/19 18:12:57]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/



appModule.view('Form1',['$stateMachine', '$context', function($stateMachine, appContext){
		return {
				render: function () {
				},

				initWidgets: function () {
						$.parser.parse();
				},


				onInitializing: function () {
				},

		afterWidgetsInit: function () {
var self = this;
this.stateMachine = $stateMachine({
context: this.context,
preventAutoInit:true,
viewId:"Form1",
beginTransit: function(transitAction) {
		self.stateMachine.current().SuspendAction(transitAction);
},
endTransit: function(transitAction) {
		self.stateMachine.current().ResumeAction(transitAction);
},
			 Actions: [
						{ ID: 'add', Name: '新增', Description: '新增数据' },
						{ ID: 'edit', Name: '编辑', Description: '编辑数据' },
						{ ID: 'check', Name: '查看', Description: '查看数据' },
						{ ID: 'remove', Name: '删除', Description: '删除数据' }
			],
			States: [
						{
									ID: 'Start', Name: '初始'
						}
,
						{
									ID: 'End', Name: '结束'
						}

			],
			Transits: [
						{ CurrentState: 'Start', Condition: '', Action: 'add', Nextstatus: 'Start' },
						{ CurrentState: 'Start', Condition: '', Action: 'edit', Nextstatus: 'Start' },
						{ CurrentState: 'Start', Condition: '', Action: 'check', Nextstatus: 'Start' },
						{ CurrentState: 'Start', Condition: '', Action: 'remove', Nextstatus: 'Start' }
]});
			this.setActionCollection({
				add: {transit:'add', params:['','','',''], methodInfo:{target:'ListController', methodName:'add'} },
				edit: {transit:'edit', params:['','','',''], methodInfo:{target:'ListController', methodName:'edit'} },
				load: {transit:'', params:['',''], methodInfo:{target:'ListController', methodName:'load'} },
				close: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'close'} },
				formLoad: {transit:'', params:[], methodInfo:{target:'ListController', methodName:'formLoad'} },
				check: {transit:'check', params:['','','',''], methodInfo:{target:'ListController', methodName:'check'} },
				remove: {transit:'remove', params:[], methodInfo:{target:'ListController', methodName:'remove'} },
				onSelectedChanged: {transit:'', params:[], methodInfo:{target:'ListController', methodName:'onSelectedChanged'} },
				loadDraftList: {transit:'', params:['','','','',''], methodInfo:{target:'DraftController', methodName:'loadDraftList'} },
				showDraftList: {transit:'', params:[''], methodInfo:{target:'DraftController', methodName:'showDraftList'} },
				serverFilter: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'serverFilter'} }
			});

			$('#aed083c0-156d-407b-b056-7ce471759e8d').on('click', this.eventAgent(['close'], this, true));
						$(document).bind('keydown','Ctrl+X',function(){ 

									$('#aed083c0-156d-407b-b056-7ce471759e8d').focus().click();
									return false;
									});
			$('#XDataGrid1').on('onSelectDataChanged', this.eventAgent(['onSelectedChanged'], this, true));
$('#presetBar').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GD_AssetSplit');
						this.context.setParam('formID', 'ac73bfda-c4c8-445a-af81-e9c975dc4d4a');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'DraftController',methodName:'loadDraftList',params:['','','','','',arg]},]);
						}
						this.context.on('refreshData',function(event,arg){
								return refreshData(arg);
						});
						var invokeResult = refreshData();
if(invokeResult && invokeResult['then']){
    invokeResult.then(function(){
        return self.transitInvoke([ {target: 'ListBaseController', methodName: 'serverFilter', params: []}]);
    });
}
else{
    self.transitInvoke([ {target: 'ListBaseController', methodName: 'serverFilter', params: []}]);
}

						appContext.on('initComplated',function(){
							$('#Form1').trigger('OnLoad');
						});
						if(actionFn){
							actionFn();
						}
				}
		}
}])





