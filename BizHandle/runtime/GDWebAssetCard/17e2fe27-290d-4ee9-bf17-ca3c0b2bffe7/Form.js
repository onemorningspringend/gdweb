window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/5/2 9:34:56]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GD_GDZCBJ','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '269d71a9-e650-4b4d-8f9d-283412559220',
				defaultInstance:'DM_GD_GDZCBJ_ListInstance',
				primaryKey: 'GDZCBJ_ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'GDZCBJ':false
				},


				instances: {
						'DM_GD_GDZCBJ_ListInstance': {
								view: '3',
								dataSourceName:'DM_GD_GDZCBJ_ListInstance',
								defaultLoad: true,
								filter: '',
								sort: ''
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



schema['269d71a9-e650-4b4d-8f9d-283412559220']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDZCBJ_ID","defaultValue":"","name":"GDZCBJ_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_DWBH","defaultValue":"","name":"GDZCBJ_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_ZCBH","defaultValue":"","name":"GDZCBJ_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_BJBH","defaultValue":"","name":"GDZCBJ_BJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_BJMC","defaultValue":"","name":"GDZCBJ_BJMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_JLDW","defaultValue":"","name":"GDZCBJ_JLDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_BJSL","defaultValue":0,"name":"GDZCBJ_BJSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCBJ_BJJZ","defaultValue":0,"name":"GDZCBJ_BJJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCBJ_SCCJ","defaultValue":"","name":"GDZCBJ_SCCJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_GGXH","defaultValue":"","name":"GDZCBJ_GGXH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_BZ","defaultValue":"","name":"GDZCBJ_BZ","type":"String","unique":false},{"allowNull":false,"caption":"Creator","defaultValue":"","name":"Creator","type":"String","unique":false},{"allowNull":false,"caption":"CreatedTime","defaultValue":"0001-01-01T00:00:00+08:00","name":"CreatedTime","type":"DateTime","unique":false},{"allowNull":false,"caption":"LastModifier","defaultValue":"","name":"LastModifier","type":"String","unique":false},{"allowNull":false,"caption":"LastModifiedTime","defaultValue":"0001-01-01T00:00:00+08:00","name":"LastModifiedTime","type":"DateTime","unique":false}],"primaryKey":"GDZCBJ_ID","tableName":"GDZCBJ","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDZCBJ_ID","defaultValue":"","name":"GDZCBJ_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_DWBH","defaultValue":"","name":"GDZCBJ_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_ZCBH","defaultValue":"","name":"GDZCBJ_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_BJBH","defaultValue":"","name":"GDZCBJ_BJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_BJMC","defaultValue":"","name":"GDZCBJ_BJMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_JLDW","defaultValue":"","name":"GDZCBJ_JLDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_BJSL","defaultValue":0,"name":"GDZCBJ_BJSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCBJ_BJJZ","defaultValue":0,"name":"GDZCBJ_BJJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCBJ_SCCJ","defaultValue":"","name":"GDZCBJ_SCCJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_GGXH","defaultValue":"","name":"GDZCBJ_GGXH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCBJ_BZ","defaultValue":"","name":"GDZCBJ_BZ","type":"String","unique":false},{"allowNull":false,"caption":"Creator","defaultValue":"","name":"Creator","type":"String","unique":false},{"allowNull":false,"caption":"CreatedTime","defaultValue":"0001-01-01T00:00:00+08:00","name":"CreatedTime","type":"DateTime","unique":false},{"allowNull":false,"caption":"LastModifier","defaultValue":"","name":"LastModifier","type":"String","unique":false},{"allowNull":false,"caption":"LastModifiedTime","defaultValue":"0001-01-01T00:00:00+08:00","name":"LastModifiedTime","type":"DateTime","unique":false}],"primaryKey":"GDZCBJ_ID","tableName":"GDZCBJ","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/5/2 9:34:57]
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
						{ ID: 'Create', Name: '新增数据', Description: '树状态字典的增加同级或单据上新增动作' },
						{ ID: 'Cancel', Name: '取消录入', Description: '取消录入动作' },
						{ ID: 'View', Name: '查看', Description: '查看动作' },
						{ ID: 'Modify', Name: '开始编辑', Description: '修改动作' },
						{ ID: 'Save', Name: '保存数据', Description: '保存动作' },
						{ ID: 'Delete', Name: '删除数据', Description: '删除数据' },
						{ ID: 'Scheme', Name: '视图方案', Description: '视图方案' }
			],
			ControlGroups: [
						{
									ID: 'ControlGroup1', Name: 'ControlGroup1',
									Controls: [
												{ ID: 'XDataGrid1', Name: 'XDataGrid1', Description: ''}
									]
						}
			],
			States: [
						{
									ID: 'Start', Name: '初始',
									ControlStatus: [
												{Condition: '', GroupCode: 'ControlGroup1', Status: 'ReadOnly'}
									]						}
,
						{
									ID: 'Modifying', Name: '修改',
									ControlStatus: [
												{Condition: '', GroupCode: 'ControlGroup1', Status: 'ReadAndWrite'}
									]						}
,
						{
									ID: 'Adding', Name: '新增',
									ControlStatus: [
												{Condition: '', GroupCode: 'ControlGroup1', Status: 'ReadAndWrite'}
									]						}
,
						{
									ID: 'End', Name: '结束',
									ControlStatus: [
												{Condition: '', GroupCode: 'ControlGroup1', Status: 'ReadOnly'}
									]						}

			],
			Transits: [
						{ CurrentState: 'Start', Condition: '', Action: 'View', Nextstatus: 'Start' },
						{ CurrentState: 'Start', Condition: '', Action: 'Modify', Nextstatus: 'Modifying' },
						{ CurrentState: 'Start', Condition: '', Action: 'Delete', Nextstatus: 'Start' },
						{ CurrentState: 'Start', Condition: '', Action: 'Scheme', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Save', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Delete', Nextstatus: 'Modifying' },
						{ CurrentState: 'Start', Condition: '', Action: 'Create', Nextstatus: 'Adding' },
						{ CurrentState: 'Adding', Condition: '', Action: 'Create', Nextstatus: 'Adding' },
						{ CurrentState: 'Adding', Condition: '', Action: 'Save', Nextstatus: 'Start' },
						{ CurrentState: 'Adding', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Adding', Condition: '', Action: 'Delete', Nextstatus: 'Adding' }
]});
			this.setActionCollection({
				add: {transit:'Create', params:[], methodInfo:{target:'MultiEditListController', methodName:'add'} },
				removeSelected: {transit:'Delete', params:[], methodInfo:{target:'MultiEditListController', methodName:'removeSelected'} },
				edit: {transit:'Modify', params:[], methodInfo:{target:'MultiEditListController', methodName:'edit'} },
				save: {transit:'Save', params:[], methodInfo:{target:'MultiEditListController', methodName:'save'} },
				cancel: {transit:'Cancel', params:[], methodInfo:{target:'MultiEditListController', methodName:'cancel'} },
				formLoad: {transit:'', params:[], methodInfo:{target:'MultiEditListController', methodName:'formLoad'} },
				load: {transit:'', params:['',''], methodInfo:{target:'MultiEditListController', methodName:'load'} },
				close: {transit:'', params:[], methodInfo:{target:'MultiEditListController', methodName:'close'} },
				serverFilter: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'serverFilter'} },
				EquipmentFormload: {transit:'', params:[], methodInfo:{target:'GDAssetEquipmentController', methodName:'EquipmentFormload'} },
				UpdateAddData: {transit:'', params:[], methodInfo:{target:'GDAssetEquipmentController', methodName:'UpdateAddData'} },
				SaveEquip: {transit:'', params:[], methodInfo:{target:'GDAssetEquipmentController', methodName:'SaveEquip'} },
				formLoad1: {transit:'', params:[], methodInfo:{target:'GDAssetEquipmentController', methodName:'formLoad'} }
			});

			$('#ca977f40-036a-4525-abc7-aade401b53f8').on('click', this.eventAgent(['add','UpdateAddData'], this, true));
			$('#8c0624ce-b9b5-427c-81e1-1f0dd42f6324').on('click', this.eventAgent(['edit'], this, true));
			$('#e8b59066-afdd-4707-8e1c-f0da8f8743b2').on('click', this.eventAgent(['cancel'], this, true));
			$('#3daf10f5-c7d3-4f34-b2ef-ea748aa5ae4d').on('click', this.eventAgent(['removeSelected'], this, true));
			$('#34a8f13f-14e0-4747-b943-7ffd6d2ed6f6').on('click', this.eventAgent(['SaveEquip'], this, true));
			$('#d311f2d7-def1-472c-8620-1c3f507dc941').on('click', this.eventAgent(['close'], this, true));
$('#presetBar').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GD_GDZCBJ');
						this.context.setParam('formID', '17e2fe27-290d-4ee9-bf17-ca3c0b2bffe7');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'GDAssetEquipmentController',methodName:'formLoad',params:[arg]},]);
						}
						this.context.on('refreshData',function(event,arg){
								return refreshData(arg);
						});
						var invokeResult = refreshData();
if(invokeResult && invokeResult['then']){
    invokeResult.then(function(){
        return self.transitInvoke([ {target: 'ListBaseController', methodName: 'serverFilter', params: []}, {target: 'GDAssetEquipmentController', methodName: 'EquipmentFormload', params: []}]);
    });
}
else{
    self.transitInvoke([ {target: 'ListBaseController', methodName: 'serverFilter', params: []}, {target: 'GDAssetEquipmentController', methodName: 'EquipmentFormload', params: []}]);
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





