window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/9/18 10:23:16]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWeb_DevaluePrepare','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '30724502-be5b-472a-a8c4-8e482b5ae470',
				defaultInstance:'DM_GDWeb_DevaluePrepare_CardInstance',
				primaryKey: 'GDJZQD_ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'GDJZQD':false
				},


				instances: {
						'DM_GDWeb_DevaluePrepare_CardInstance': {
								view: '1',
								dataSourceName:'DM_GDWeb_DevaluePrepare_CardInstance',
								defaultLoad: true						}
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
				},

				GetObjectsXmlWithExtend: function(dataModelID    , filter, queryType  , policy, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsXmlWithExtend', [{'dataModelID    ': dataModelID    , 'filter': filter, 'queryType  ': queryType  , 'policy': policy, 'otherExtend': otherExtend}]);
				},

				GetObjectXmlWithExtend: function(dataModelID , objectID  , queryType  , otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectXmlWithExtend', [{'dataModelID ': dataModelID , 'objectID  ': objectID  , 'queryType  ': queryType  , 'otherExtend': otherExtend}]);
				}
		}
}]);



schema['30724502-be5b-472a-a8c4-8e482b5ae470']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDJZQD_ID","defaultValue":"","name":"GDJZQD_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_KJQJ","defaultValue":"","name":"GDJZQD_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_DWBH","defaultValue":"","name":"GDJZQD_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_ZCBH","defaultValue":"","name":"GDJZQD_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_ZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDJZQD_ZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_JZ","defaultValue":0,"name":"GDJZQD_JZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_SJ","defaultValue":0,"name":"GDJZQD_SJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_SZ","defaultValue":0,"name":"GDJZQD_SZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_JZZB","defaultValue":0,"name":"GDJZQD_JZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_ZDR","defaultValue":"","name":"GDJZQD_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_SHR","defaultValue":"","name":"GDJZQD_SHR","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_SHRQ","defaultValue":"","name":"GDJZQD_SHRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_BZ","defaultValue":"","name":"GDJZQD_BZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_ZCSL","defaultValue":0,"name":"GDJZQD_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_ZCYZ","defaultValue":0,"name":"GDJZQD_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_LJZJ","defaultValue":0,"name":"GDJZQD_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_YTJZ","defaultValue":0,"name":"GDJZQD_YTJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_LJJZ","defaultValue":0,"name":"GDJZQD_LJJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_JCZ","defaultValue":0,"name":"GDJZQD_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_JTCZ","defaultValue":0,"name":"GDJZQD_JTCZ","type":"Decimal","unique":false}],"primaryKey":"GDJZQD_ID","tableName":"GDJZQD","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDJZQD_ID","defaultValue":"","name":"GDJZQD_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_KJQJ","defaultValue":"","name":"GDJZQD_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_DWBH","defaultValue":"","name":"GDJZQD_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_ZCBH","defaultValue":"","name":"GDJZQD_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_ZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDJZQD_ZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_JZ","defaultValue":0,"name":"GDJZQD_JZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_SJ","defaultValue":0,"name":"GDJZQD_SJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_SZ","defaultValue":0,"name":"GDJZQD_SZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_JZZB","defaultValue":0,"name":"GDJZQD_JZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_ZDR","defaultValue":"","name":"GDJZQD_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_SHR","defaultValue":"","name":"GDJZQD_SHR","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_SHRQ","defaultValue":"","name":"GDJZQD_SHRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_BZ","defaultValue":"","name":"GDJZQD_BZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJZQD_ZCSL","defaultValue":0,"name":"GDJZQD_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_ZCYZ","defaultValue":0,"name":"GDJZQD_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_LJZJ","defaultValue":0,"name":"GDJZQD_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_YTJZ","defaultValue":0,"name":"GDJZQD_YTJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_LJJZ","defaultValue":0,"name":"GDJZQD_LJJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_JCZ","defaultValue":0,"name":"GDJZQD_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJZQD_JTCZ","defaultValue":0,"name":"GDJZQD_JTCZ","type":"Decimal","unique":false}],"primaryKey":"GDJZQD_ID","tableName":"GDJZQD","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/9/18 10:23:16]
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
						{ ID: 'Cancel', Name: '取消录入', Description: '取消录入的数据' },
						{ ID: 'Create', Name: '新增数据', Description: '开始增加单据' },
						{ ID: 'Delete', Name: '删除数据', Description: '删除数据' },
						{ ID: 'Edit', Name: '内部修改', Description: '内部修改或者调整数据' },
						{ ID: 'Examine', Name: '查看', Description: '查看' },
						{ ID: 'Modify', Name: '开始编辑', Description: '开始编辑单据' },
						{ ID: 'Save', Name: '保存数据', Description: '保存当前增加或者编辑的数据' },
						{ ID: 'Upload', Name: '上传', Description: '' },
						{ ID: 'SaveDraft', Name: '保存草稿', Description: '保存表单数据到草稿箱' }
			],
			ControlGroups: [
						{
									ID: 'Edit', Name: '编辑',
									Controls: [
												{ ID: 'Layout1_North', Name: 'Layout1_North', Description: ''},
												{ ID: 'Layout1_Main', Name: 'Layout1_Main', Description: ''}
									]
						}
			],
			States: [
						{
									ID: 'Start', Name: '初始',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadAndWrite'}
									]						}
,
						{
									ID: 'Modifying', Name: '修改',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadAndWrite'}
									]						}
,
						{
									ID: 'Adding', Name: '新增',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadAndWrite'}
									]						}
,
						{
									ID: 'End', Name: '结束',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadOnly'}
									]						}

			],
			Transits: [
						{ CurrentState: 'Start', Condition: '', Action: 'Modify', Nextstatus: 'Modifying' },
						{ CurrentState: 'Start', Condition: '', Action: 'Create', Nextstatus: 'Adding' },
						{ CurrentState: 'Start', Condition: '', Action: 'Examine', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Edit', Nextstatus: 'Modifying' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Save', Nextstatus: 'Start' },
						{ CurrentState: 'Start', Condition: '', Action: 'Delete', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Upload', Nextstatus: 'Modifying' },
						{ CurrentState: 'Adding', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Adding', Condition: '', Action: 'Edit', Nextstatus: 'Adding' },
						{ CurrentState: 'Adding', Condition: '', Action: 'Save', Nextstatus: 'Start' },
						{ CurrentState: 'Adding', Condition: '', Action: 'Upload', Nextstatus: 'Adding' },
						{ CurrentState: 'Adding', Condition: '', Action: 'SaveDraft', Nextstatus: 'Adding' }
]});
			this.setActionCollection({
				create: {transit:'Create', params:[], methodInfo:{target:'CardController', methodName:'create'} },
				addItem: {transit:'Edit', params:['XDataGrid1'], methodInfo:{target:'CardController', methodName:'addItem'} },
				removeSelect: {transit:'Edit', params:['XDataGrid1'], methodInfo:{target:'CardController', methodName:'removeSelect'} },
				save: {transit:'Save', params:[], methodInfo:{target:'CardController', methodName:'save'} },
				edit: {transit:'Modify', params:[], methodInfo:{target:'CardController', methodName:'edit'} },
				cancel: {transit:'Cancel', params:[], methodInfo:{target:'CardController', methodName:'cancel'} },
				loadData: {transit:'', params:[''], methodInfo:{target:'CardController', methodName:'loadData'} },
				addItem1: {transit:'Edit', params:['XDataGrid2'], methodInfo:{target:'CardController', methodName:'addItem'} },
				removeSelect1: {transit:'Edit', params:['XDataGrid2'], methodInfo:{target:'CardController', methodName:'removeSelect'} },
				previous: {transit:'Examine', params:[], methodInfo:{target:'CardController', methodName:'previous'} },
				next: {transit:'Examine', params:[], methodInfo:{target:'CardController', methodName:'next'} },
				formLoaded: {transit:'', params:[''], methodInfo:{target:'CardController', methodName:'formLoad'} },
				printCard: {transit:'', params:[''], methodInfo:{target:'PrintController', methodName:'printCard'} },
				submitApproveBySingle: {transit:'', params:['','','','','',''], methodInfo:{target:'ApproveController', methodName:'submitApproveBySingle'} },
				cancelSubmitApproveBySingle: {transit:'', params:['','',''], methodInfo:{target:'ApproveController', methodName:'cancelSubmitApproveBySingle'} },
				viewApproveProcess: {transit:'', params:[''], methodInfo:{target:'ApproveController', methodName:'viewApproveProcess'} },
				close: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'close'} },
				remove: {transit:'Delete', params:[], methodInfo:{target:'CardController', methodName:'remove'} },
				loadPreData: {transit:'', params:[''], methodInfo:{target:'CardController', methodName:'loadPreData'} },
				saveDraft: {transit:'SaveDraft', params:['',''], methodInfo:{target:'CardController', methodName:'saveDraft'} },
				Formload: {transit:'', params:[], methodInfo:{target:'GDWebDevaluePrepareListController', methodName:'Formload'} },
				SetDatagridColReadonly: {transit:'', params:[], methodInfo:{target:'GDWebDevaluePrepareListController', methodName:'SetDatagridColReadonly'} }
			});

			$('#2f5b9b62-7767-4e8e-b7bf-9e65ea39512e').on('click', this.eventAgent(['close'], this, true));
						$(document).bind('keydown','Alt+Ctrl+X',function(){ 

									$('#2f5b9b62-7767-4e8e-b7bf-9e65ea39512e').focus().click();
									return false;
									});
$('#Bar1').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWeb_DevaluePrepare');
						this.context.setParam('formID', 'd5f643ba-a887-4d09-b793-4e9732b2b718');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'GDWebDevaluePrepareListController',methodName:'Formload',params:[arg]},]);
						}
						this.context.on('refreshData',function(event,arg){
								return refreshData(arg);
						});
						refreshData();
						appContext.on('initComplated',function(){
							$('#Form1').trigger('OnLoad');
						});
$('#XSmartDictLookup_Hsdw').adplookupbox({ 
	adp:{
		OnDictEntryPicking:function(adp){
			if(!adp.oldCondition){
				adp.oldCondition = adp.condition;
			}
			if(!adp.oldNavcondition){
				adp.oldNavcondition = adp.navcondition;
			}
			adp.condition = self.context.parseParamExpression(adp.oldCondition);
			adp.navcondition = self.context.parseParamExpression(adp.oldNavcondition);
			return $(this).triggerHandler('OnDictEntryPicking',[adp]);
		},
		OnDictEntryPicked:function(rowdata,opts){
			$(this).trigger('OnDictEntryPicked',[rowdata,opts]);
		}
	}
});

$('#XSmartDictLookup_Jzlb').adplookupbox({ 
	adp:{
		OnDictEntryPicking:function(adp){
			if(!adp.oldCondition){
				adp.oldCondition = adp.condition;
			}
			if(!adp.oldNavcondition){
				adp.oldNavcondition = adp.navcondition;
			}
			adp.condition = self.context.parseParamExpression(adp.oldCondition);
			adp.navcondition = self.context.parseParamExpression(adp.oldNavcondition);
			return $(this).triggerHandler('OnDictEntryPicking',[adp]);
		},
		OnDictEntryPicked:function(rowdata,opts){
			$(this).trigger('OnDictEntryPicked',[rowdata,opts]);
		}
	}
});

						if(actionFn){
							actionFn();
						}
				}
		}
}])





