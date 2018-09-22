window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/6/6 8:40:56]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWeb_GDBGJLVM','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: 'd3eba3f5-605b-44c6-82fd-d46b0d765a20',
				defaultInstance:'DM_GDWeb_GDBGJLVM_ListInstance',
				primaryKey: 'GDBGJL_DWBHBGDHZCBH',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: true,
				enableDefaultLines: {
						'VW_GDBGJL':false
				},


				instances: {
						'DM_GDWeb_GDBGJLVM_ListInstance': {
								view: '3',
								dataSourceName:'DM_GDWeb_GDBGJLVM_ListInstance',
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



schema['d3eba3f5-605b-44c6-82fd-d46b0d765a20']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDBGJL_DWBHBGDHZCBH","defaultValue":"","name":"GDBGJL_DWBHBGDHZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DWBH","defaultValue":"","name":"GDBGJL_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCBH","defaultValue":"","name":"GDBGJL_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGDH","defaultValue":"","name":"GDBGJL_BGDH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX","defaultValue":"","name":"GDBGJL_BGLX","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX_GDBGLX_MC","defaultValue":"","name":"GDBGJL_BGLX_GDBGLX_MC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDBGJL_BGRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DESC","defaultValue":"","name":"GDBGJL_DESC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGR","defaultValue":"","name":"GDBGJL_BGR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_SHR","defaultValue":"","name":"GDBGJL_SHR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FZR","defaultValue":"","name":"GDBGJL_FZR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_CWQR","defaultValue":"","name":"GDBGJL_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXH","defaultValue":0,"name":"GDBGJL_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID","defaultValue":"","name":"GDBGJL_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCBH","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCMC","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_IFBF","defaultValue":"","name":"GDBGJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FLID","defaultValue":"","name":"GDBGJL_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_OPPER","defaultValue":"","name":"GDBGJL_OPPER","type":"String","unique":false}],"primaryKey":"GDBGJL_DWBHBGDHZCBH","tableName":"VW_GDBGJL","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDBGJL_DWBHBGDHZCBH","defaultValue":"","name":"GDBGJL_DWBHBGDHZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DWBH","defaultValue":"","name":"GDBGJL_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCBH","defaultValue":"","name":"GDBGJL_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGDH","defaultValue":"","name":"GDBGJL_BGDH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX","defaultValue":"","name":"GDBGJL_BGLX","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX_GDBGLX_MC","defaultValue":"","name":"GDBGJL_BGLX_GDBGLX_MC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDBGJL_BGRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DESC","defaultValue":"","name":"GDBGJL_DESC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGR","defaultValue":"","name":"GDBGJL_BGR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_SHR","defaultValue":"","name":"GDBGJL_SHR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FZR","defaultValue":"","name":"GDBGJL_FZR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_CWQR","defaultValue":"","name":"GDBGJL_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXH","defaultValue":0,"name":"GDBGJL_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID","defaultValue":"","name":"GDBGJL_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCBH","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCMC","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_IFBF","defaultValue":"","name":"GDBGJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FLID","defaultValue":"","name":"GDBGJL_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_OPPER","defaultValue":"","name":"GDBGJL_OPPER","type":"String","unique":false}],"primaryKey":"GDBGJL_DWBHBGDHZCBH","tableName":"VW_GDBGJL","foreignKey":null}]
};



/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/6/6 8:40:59]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GD_GDBGJLVW','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: 'fa25080c-abb9-4bc1-ab96-c470a6e65d34',
				defaultInstance:'DM_GD_GDBGJLVW_ListInstance',
				primaryKey: 'GDBGJL_DWBHBGDHZCBH',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'VW_GDBGJL':false
				},


				instances: {
						'DM_GD_GDBGJLVW_ListInstance': {
								view: '3',
								dataSourceName:'DM_GD_GDBGJLVW_ListInstance',
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



schema['fa25080c-abb9-4bc1-ab96-c470a6e65d34']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDBGJL_DWBHBGDHZCBH","defaultValue":"","name":"GDBGJL_DWBHBGDHZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DWBH","defaultValue":"","name":"GDBGJL_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCBH","defaultValue":"","name":"GDBGJL_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGDH","defaultValue":"","name":"GDBGJL_BGDH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX","defaultValue":"","name":"GDBGJL_BGLX","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX_GDBGLX_MC","defaultValue":"","name":"GDBGJL_BGLX_GDBGLX_MC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDBGJL_BGRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDBGJL_DESC","defaultValue":"","name":"GDBGJL_DESC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGR","defaultValue":"","name":"GDBGJL_BGR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_SHR","defaultValue":"","name":"GDBGJL_SHR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FZR","defaultValue":"","name":"GDBGJL_FZR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_CWQR","defaultValue":"","name":"GDBGJL_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXH","defaultValue":0,"name":"GDBGJL_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID","defaultValue":"","name":"GDBGJL_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCBH","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCMC","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"ISCHECKED","defaultValue":"false","name":"ISCHECKED","type":"Boolean","unique":false},{"allowNull":false,"caption":"GDBGJL_IFBF","defaultValue":"","name":"GDBGJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FLID","defaultValue":"","name":"GDBGJL_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_OPPER","defaultValue":"","name":"GDBGJL_OPPER","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FSSCFLAG","defaultValue":"","name":"GDBGJL_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDBGJL_DWBHBGDHZCBH","tableName":"VW_GDBGJL","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDBGJL_DWBHBGDHZCBH","defaultValue":"","name":"GDBGJL_DWBHBGDHZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DWBH","defaultValue":"","name":"GDBGJL_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCBH","defaultValue":"","name":"GDBGJL_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGDH","defaultValue":"","name":"GDBGJL_BGDH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX","defaultValue":"","name":"GDBGJL_BGLX","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX_GDBGLX_MC","defaultValue":"","name":"GDBGJL_BGLX_GDBGLX_MC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDBGJL_BGRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDBGJL_DESC","defaultValue":"","name":"GDBGJL_DESC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGR","defaultValue":"","name":"GDBGJL_BGR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_SHR","defaultValue":"","name":"GDBGJL_SHR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FZR","defaultValue":"","name":"GDBGJL_FZR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_CWQR","defaultValue":"","name":"GDBGJL_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXH","defaultValue":0,"name":"GDBGJL_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID","defaultValue":"","name":"GDBGJL_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCBH","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCMC","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"ISCHECKED","defaultValue":"false","name":"ISCHECKED","type":"Boolean","unique":false},{"allowNull":false,"caption":"GDBGJL_IFBF","defaultValue":"","name":"GDBGJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FLID","defaultValue":"","name":"GDBGJL_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_OPPER","defaultValue":"","name":"GDBGJL_OPPER","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FSSCFLAG","defaultValue":"","name":"GDBGJL_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDBGJL_DWBHBGDHZCBH","tableName":"VW_GDBGJL","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/6/6 8:40:58]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/



appModule.view('IFrame1',['$stateMachine', '$context', function($stateMachine, appContext){
		return {
				render: function () {
				},

				initWidgets: function () {
						$.parser.parse($('#IFrame1'));
				},


				onInitializing: function () {
				},

		afterWidgetsInit: function () {
var self = this;
this.stateMachine = $stateMachine({
context: this.context,
preventAutoInit:true,
viewId:"IFrame1",
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

			$('#88421bad-3ea7-406d-a7e3-1839cff078d3').on('click', this.eventAgent(['check'], this, true));
						$(document).bind('keydown','Alt+Ctrl+V',function(){ 

									$('#88421bad-3ea7-406d-a7e3-1839cff078d3').focus().click();
									return false;
									});
			$('#7f041105-9d1e-4b89-8867-842c213f4b0e').on('click', this.eventAgent(['edit'], this, true));
						$(document).bind('keydown','Alt+Ctrl+E',function(){ 

									$('#7f041105-9d1e-4b89-8867-842c213f4b0e').focus().click();
									return false;
									});
			$('#a5260258-d40d-4097-ae65-f1060712338f').on('click', this.eventAgent(['remove'], this, true));
						$(document).bind('keydown','Alt+Ctrl+D',function(){ 

									$('#a5260258-d40d-4097-ae65-f1060712338f').focus().click();
									return false;
									});
			$('#b319445d-6321-44e9-a28c-c9f63ba45f51').on('click', this.eventAgent(['close'], this, true));
						$(document).bind('keydown','Alt+Ctrl+X',function(){ 

									$('#b319445d-6321-44e9-a28c-c9f63ba45f51').focus().click();
									return false;
									});
			$('#XDataGrid_Main').on('onSelectDataChanged', this.eventAgent(['onSelectedChanged'], this, true));
$('#presetBar').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWeb_GDBGJLVM');
						this.context.setParam('formID', '4b89ae57-75ed-4e60-893e-6656ff719a96');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'ListController',methodName:'load',params:['','',arg]},{target:'DraftController',methodName:'loadDraftList',params:['','','','','',arg]},]);
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

						if(actionFn){
							actionFn();
						}
				}
		}
}])




/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/6/6 8:40:59]
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
				serverFilter: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'serverFilter'} },
				Formload: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'Formload'} },
				SyncChangeData: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'SyncChangeData'} },
				CancelSyncChangeData: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'CancelSyncChangeData'} },
				RemoveChange: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'RemoveChange'} },
				RecoveryChange: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'RecoveryChange'} },
				ConfigChange: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'ConfigChange'} },
				UnConfigRecord: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'UnConfigRecord'} },
				ViewCard: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'ViewCard'} },
				CreateCard: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'CreateCard'} },
				EditCard: {transit:'', params:[], methodInfo:{target:'GDWebChangeListController', methodName:'EditCard'} }
			});

			$('#de14ae2e-3c01-4dd3-9bf1-0b225cd320cd').on('click', this.eventAgent(['ViewCard'], this, true));
			$('#ebbcd2bd-72b2-4365-9c2d-c185a171bbf7').on('click', this.eventAgent(['CreateCard'], this, true));
			$('#c6140eb5-7096-4d87-8938-fed57931d0de').on('click', this.eventAgent(['EditCard'], this, true));
			$('#56d8e76e-4ecd-492d-aa57-737b1648b6ae').on('click', this.eventAgent(['ConfigChange'], this, true));
			$('#2d6cfebb-2ba2-4d50-a9e0-d0e047044e77').on('click', this.eventAgent(['UnConfigRecord'], this, true));
			$('#23fc9598-5794-474a-815e-5cb6d88e60b9').on('click', this.eventAgent(['RemoveChange'], this, true));
			$('#328382f7-4663-41a3-88cf-1333093cd9db').on('click', this.eventAgent(['RecoveryChange'], this, true));
			$('#d284027b-26c9-464c-9c4d-4d86d07d12ae').on('click', this.eventAgent(['SyncChangeData'], this, true));
			$('#e834d7fb-e6d9-4ebf-b6b7-e03ac74c9917').on('click', this.eventAgent(['CancelSyncChangeData'], this, true));
			$('#3810505d-89fd-476f-b0b8-fb0faa90beeb').on('click', this.eventAgent(['close'], this, true));
			$('#XDataGrid_Main').on('onSelectDataChanged', this.eventAgent(['onSelectedChanged'], this, true));
$('#presetBar').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GD_GDBGJLVW');
						this.context.setParam('formID', 'd31c1128-b9eb-4aa0-ba5e-f62653be011a');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'GDWebChangeListController',methodName:'Formload',params:[arg]},]);
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
$('#XSmartDictLookup_Fssc').adplookupbox({ 
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





