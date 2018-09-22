window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/8/14 9:40:37]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWEB_FSSCDWXZ','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '76165de7-98dd-492c-83a5-b2104e6efb28',
				defaultInstance:'DM_GDWEB_FSSCDWXZ_CardInstance',
				primaryKey: 'ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: true,
				enableDefaultLines: {
						'DM_GDWEB_FSSCDWXZ':false
				},


				instances: {
						'DM_GDWEB_FSSCDWXZ_CardInstance': {
								view: '1',
								dataSourceName:'DM_GDWEB_FSSCDWXZ_CardInstance',
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



schema['76165de7-98dd-492c-83a5-b2104e6efb28']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"ID","defaultValue":"","name":"ID","type":"String","unique":false},{"allowNull":false,"caption":"XZDW","defaultValue":"","name":"XZDW","type":"String","unique":false},{"allowNull":false,"caption":"YWDate","defaultValue":"","name":"YWDate","type":"String","unique":false}],"primaryKey":"ID","tableName":"DM_GDWEB_FSSCDWXZ","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"ID","defaultValue":"","name":"ID","type":"String","unique":false},{"allowNull":false,"caption":"XZDW","defaultValue":"","name":"XZDW","type":"String","unique":false},{"allowNull":false,"caption":"YWDate","defaultValue":"","name":"YWDate","type":"String","unique":false}],"primaryKey":"ID","tableName":"DM_GDWEB_FSSCDWXZ","foreignKey":null}]
};



/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/8/14 9:40:39]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWEB_GDBGJL','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: 'f3c4f14e-667d-40bf-9cab-b5f62a37f152',
				defaultInstance:'DM_GDWEB_GDBGJL_CardInstance',
				primaryKey: 'GDBGJL_ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'GDBGJL':false
				},
				workInstanceInfo: {tableName:'GDBGJL', fieldName:'GDBGJL_LCSL'},


				instances: {
						'DM_GDWEB_GDBGJL_CardInstance': {
								view: '1',
								dataSourceName:'DM_GDWEB_GDBGJL_CardInstance',
								defaultLoad: true						},
						'DM_GDWEB_GDBGJL_ListInstance': {
								view: '3',
								dataSourceName:'DM_GDWEB_GDBGJL_ListInstance',
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
				},

				GetObjectsXmlWithExtend: function(dataModelID    , filter, queryType  , policy, otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectsXmlWithExtend', [{'dataModelID    ': dataModelID    , 'filter': filter, 'queryType  ': queryType  , 'policy': policy, 'otherExtend': otherExtend}]);
				},

				GetObjectXmlWithExtend: function(dataModelID , objectID  , queryType  , otherExtend){
					return $dataServiceProxy.invokeMethod(this.dataUri, 'GetObjectXmlWithExtend', [{'dataModelID ': dataModelID , 'objectID  ': objectID  , 'queryType  ': queryType  , 'otherExtend': otherExtend}]);
				}
		}
}]);



schema['f3c4f14e-667d-40bf-9cab-b5f62a37f152']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDBGJL_ID","defaultValue":"","name":"GDBGJL_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DWBH","defaultValue":"","name":"GDBGJL_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGDH","defaultValue":"","name":"GDBGJL_BGDH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX","defaultValue":"","name":"GDBGJL_BGLX","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX_GDBGLX_LBBH","defaultValue":"","name":"GDBGJL_BGLX_GDBGLX_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX_GDBGLX_MC","defaultValue":"","name":"GDBGJL_BGLX_GDBGLX_MC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDBGJL_BGRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXM","defaultValue":"","name":"GDBGJL_BGXM","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_YZ","defaultValue":"","name":"GDBGJL_YZ","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BZ","defaultValue":"","name":"GDBGJL_BZ","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DESC","defaultValue":"","name":"GDBGJL_DESC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_PZBH","defaultValue":"","name":"GDBGJL_PZBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGR","defaultValue":"","name":"GDBGJL_BGR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_SHR","defaultValue":"","name":"GDBGJL_SHR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FZR","defaultValue":"","name":"GDBGJL_FZR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_CWQR","defaultValue":"","name":"GDBGJL_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXH","defaultValue":0,"name":"GDBGJL_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDBGJL_IFBF","defaultValue":"","name":"GDBGJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID","defaultValue":"","name":"GDBGJL_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCBH","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCMC","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BDZ","defaultValue":"","name":"GDBGJL_BDZ","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXMMC","defaultValue":"","name":"GDBGJL_BGXMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_YZMC","defaultValue":"","name":"GDBGJL_YZMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BZMC","defaultValue":"","name":"GDBGJL_BZMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCBH","defaultValue":"","name":"GDBGJL_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_XMLX","defaultValue":"","name":"GDXMZD_XMLX","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_IFDZ","defaultValue":"","name":"GDXMZD_IFDZ","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_IFCZ","defaultValue":"","name":"GDXMZD_IFCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_CZZD","defaultValue":"","name":"GDXMZD_CZZD","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_LENG","defaultValue":"","name":"GDXMZD_LENG","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BJZT","defaultValue":"","name":"GDBGJL_BJZT","type":"String","unique":false},{"allowNull":false,"caption":"GDBGXM_KZFS","defaultValue":"","name":"GDBGXM_KZFS","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FLID","defaultValue":"","name":"GDBGJL_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_OPPER","defaultValue":"","name":"GDBGJL_OPPER","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_CSYZJ","defaultValue":"false","name":"GDBGJL_CSYZJ","type":"Boolean","unique":false},{"allowNull":false,"caption":"CreatedTime","defaultValue":"0001-01-01T00:00:00+08:00","name":"CreatedTime","type":"DateTime","unique":false},{"allowNull":false,"caption":"LastModifiedTime","defaultValue":"0001-01-01T00:00:00+08:00","name":"LastModifiedTime","type":"DateTime","unique":false},{"allowNull":false,"caption":"LastModifier","defaultValue":"","name":"LastModifier","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FSSCFLAG","defaultValue":"","name":"GDBGJL_FSSCFLAG","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_STATE","defaultValue":"","name":"GDBGJL_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_LCSL","defaultValue":"","name":"GDBGJL_LCSL","type":"String","unique":false}],"primaryKey":"GDBGJL_ID","tableName":"GDBGJL","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDBGJL_ID","defaultValue":"","name":"GDBGJL_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DWBH","defaultValue":"","name":"GDBGJL_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGDH","defaultValue":"","name":"GDBGJL_BGDH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX","defaultValue":"","name":"GDBGJL_BGLX","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX_GDBGLX_LBBH","defaultValue":"","name":"GDBGJL_BGLX_GDBGLX_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGLX_GDBGLX_MC","defaultValue":"","name":"GDBGJL_BGLX_GDBGLX_MC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDBGJL_BGRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXM","defaultValue":"","name":"GDBGJL_BGXM","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_YZ","defaultValue":"","name":"GDBGJL_YZ","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BZ","defaultValue":"","name":"GDBGJL_BZ","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_DESC","defaultValue":"","name":"GDBGJL_DESC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_PZBH","defaultValue":"","name":"GDBGJL_PZBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGR","defaultValue":"","name":"GDBGJL_BGR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_SHR","defaultValue":"","name":"GDBGJL_SHR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FZR","defaultValue":"","name":"GDBGJL_FZR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_CWQR","defaultValue":"","name":"GDBGJL_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXH","defaultValue":0,"name":"GDBGJL_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDBGJL_IFBF","defaultValue":"","name":"GDBGJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID","defaultValue":"","name":"GDBGJL_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCBH","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCID_GDZCZY_ZCMC","defaultValue":"","name":"GDBGJL_ZCID_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BDZ","defaultValue":"","name":"GDBGJL_BDZ","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BGXMMC","defaultValue":"","name":"GDBGJL_BGXMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_YZMC","defaultValue":"","name":"GDBGJL_YZMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BZMC","defaultValue":"","name":"GDBGJL_BZMC","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_ZCBH","defaultValue":"","name":"GDBGJL_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_XMLX","defaultValue":"","name":"GDXMZD_XMLX","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_IFDZ","defaultValue":"","name":"GDXMZD_IFDZ","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_IFCZ","defaultValue":"","name":"GDXMZD_IFCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_CZZD","defaultValue":"","name":"GDXMZD_CZZD","type":"String","unique":false},{"allowNull":false,"caption":"GDXMZD_LENG","defaultValue":"","name":"GDXMZD_LENG","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_BJZT","defaultValue":"","name":"GDBGJL_BJZT","type":"String","unique":false},{"allowNull":false,"caption":"GDBGXM_KZFS","defaultValue":"","name":"GDBGXM_KZFS","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FLID","defaultValue":"","name":"GDBGJL_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_OPPER","defaultValue":"","name":"GDBGJL_OPPER","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_CSYZJ","defaultValue":"false","name":"GDBGJL_CSYZJ","type":"Boolean","unique":false},{"allowNull":false,"caption":"CreatedTime","defaultValue":"0001-01-01T00:00:00+08:00","name":"CreatedTime","type":"DateTime","unique":false},{"allowNull":false,"caption":"LastModifiedTime","defaultValue":"0001-01-01T00:00:00+08:00","name":"LastModifiedTime","type":"DateTime","unique":false},{"allowNull":false,"caption":"LastModifier","defaultValue":"","name":"LastModifier","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_FSSCFLAG","defaultValue":"","name":"GDBGJL_FSSCFLAG","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_STATE","defaultValue":"","name":"GDBGJL_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDBGJL_LCSL","defaultValue":"","name":"GDBGJL_LCSL","type":"String","unique":false}],"primaryKey":"GDBGJL_ID","tableName":"GDBGJL","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/8/14 9:40:37]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/



appModule.view('IFrameDWXZ',['$stateMachine', '$context', function($stateMachine, appContext){
		return {
				render: function () {
				},

				initWidgets: function () {
						$.parser.parse($('#IFrameDWXZ'));
				},


				onInitializing: function () {
				},

				afterWidgetsInit: function () {
						$('#YWDate').on('blur',this.proxy('DateChange',function () {
								this.transitInvoke([ {target: 'GDFsscDWXZController', methodName: 'DateChange', params: []}])
						},this));


						$('#YWDate').on('change',this.proxy('DateChange',function () {
								this.transitInvoke([ {target: 'GDFsscDWXZController', methodName: 'DateChange', params: []}])
						},this));


						$('#SimpleButton1').on('click',this.proxy('OK',function () {
								this.transitInvoke([ {target: 'GDFsscDWXZController', methodName: 'OK', params: []}])
						},this));



},
				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWEB_FSSCDWXZ');
						this.context.setParam('formID', '10929059-8366-427f-baf3-abafba4079ed');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						self.transitInvoke([ {target: 'CardController', methodName: 'create', params: []}, {target: 'GDFsscDWXZController', methodName: 'DWXZFormload', params: []}]);
$('#SmartDWXZ').adplookupbox({ 
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




/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/8/14 9:40:39]
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
						{ ID: 'Create', Name: '新增', Description: '' },
						{ ID: 'Edit', Name: '编辑', Description: '' },
						{ ID: 'Cancel', Name: '取消', Description: '' },
						{ ID: 'Normal', Name: '常规操作', Description: '' }
			],
			ControlGroups: [
						{
									ID: '编辑时只读', Name: '编辑时只读',
									Controls: [
												{ ID: 'XSmartDictLookup_ChangeType', Name: 'XSmartDictLookup_ChangeType', Description: ''},
												{ ID: 'My97Datebox_ChangeDate', Name: 'My97Datebox_ChangeDate', Description: ''}
									]
						},
						{
									ID: '全部控件', Name: '全部控件',
									Controls: [
												{ ID: 'Layout1_Main', Name: 'Layout1_Main', Description: ''},
												{ ID: 'Layout1_North', Name: 'Layout1_North', Description: ''},
												{ ID: 'Layout1_West', Name: 'Layout1_West', Description: ''}
									]
						}
			],
			States: [
						{
									ID: 'Start', Name: '初始',
									ControlStatus: [
												{Condition: '', GroupCode: '全部控件', Status: 'ReadOnly'}
									]						}
,
						{
									ID: 'Edit', Name: '编辑',
									ControlStatus: [
												{Condition: '', GroupCode: '全部控件', Status: 'ReadAndWrite'},
												{Condition: '!!$("#XSmartDictLookup_ChangeType").adplookupbox("textbox").val()', GroupCode: '编辑时只读', Status: 'ReadOnly'}
									]						}
,
						{
									ID: 'Create', Name: '新增',
									ControlStatus: [
												{Condition: '', GroupCode: '全部控件', Status: 'ReadAndWrite'}
									]						}
,
						{
									ID: 'End', Name: '结束',
									ControlStatus: [
												{Condition: '', GroupCode: '全部控件', Status: 'ReadOnly'}
									]						}

			],
			Transits: [
						{ CurrentState: 'Start', Condition: '', Action: 'Create', Nextstatus: 'Create' },
						{ CurrentState: 'Start', Condition: '', Action: 'Edit', Nextstatus: 'Edit' },
						{ CurrentState: 'Create', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Edit', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Create', Condition: '', Action: 'Normal', Nextstatus: 'Create' },
						{ CurrentState: 'Edit', Condition: '', Action: 'Normal', Nextstatus: 'Edit' }
]});
			this.setActionCollection({
				close: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'close'} },
				create: {transit:'', params:[], methodInfo:{target:'CardController', methodName:'create'} },
				cancel: {transit:'', params:[], methodInfo:{target:'CardController', methodName:'cancel'} },
				BizHandlePub: {transit:'', params:[], methodInfo:{target:'GDWebBizHandlePub', methodName:'BizHandlePub'} },
				edit: {transit:'', params:[], methodInfo:{target:'CardController', methodName:'edit'} },
				Frm_Load: {transit:'', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'Frm_Load'} },
				SelectRow: {transit:'', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'SelectRow'} },
				ChangeCreate: {transit:'Create', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'ChangeCreate'} },
				AddAsset: {transit:'Normal', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'AddAsset'} },
				RemoveAsset: {transit:'Normal', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'RemoveAsset'} },
				ChangeEdit: {transit:'Edit', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'ChangeEdit'} },
				ChangeCancel: {transit:'Cancel', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'ChangeCancel'} },
				ChangeSave: {transit:'Cancel', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'ChangeSave'} },
				BindExitFunc: {transit:'', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'BindExitFunc'} },
				DescLostFocus: {transit:'', params:[], methodInfo:{target:'GDWebChangeCardController', methodName:'DescLostFocus'} }
			});

			$('#79b28837-79cf-448c-963b-0371d4e40170').on('click', this.eventAgent(['ChangeCreate'], this, true));
			$('#1cfb1bd1-0762-4bcb-a031-a81db663dea0').on('click', this.eventAgent(['ChangeEdit'], this, true));
			$('#1ddaf608-1abb-49d5-ac24-0210d99b02c3').on('click', this.eventAgent(['ChangeCancel'], this, true));
			$('#a1d5ea1f-59c7-4a44-b0e5-a0a22c15e0cc').on('click', this.eventAgent(['ChangeSave'], this, true));
			$('#40ee2b54-92fa-437b-af3c-f39036a6bfbf').on('click', this.eventAgent(['AddAsset'], this, true));
			$('#26ec356b-4167-48c9-8390-e3fddf1a5c44').on('click', this.eventAgent(['RemoveAsset'], this, true));
			$('#3bb1d53f-4cdb-4c64-aa85-900f83f38ac3').on('click', this.eventAgent(['close'], this, true));
			$('#XDataGrid_ChangeAsset').on('onSelectDataChanged', this.eventAgent(['SelectRow'], this, true));
$('#PresetedBar').buttongroup();

			this.stateMachine.init();
			this.extendAction('ChangeEdit', 'afterActionExtend', {target:'GDWebChangeCardController', methodName: 'BindExitFunc'});
			this.extendAction('ChangeCreate', 'afterActionExtend', {target:'GDWebChangeCardController', methodName: 'BindExitFunc'});
			this.extendAction('Frm_Load', 'afterActionExtend', {target:'GDWebChangeCardController', methodName: 'BindExitFunc'});
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWEB_GDBGJL');
						this.context.setParam('formID', '5fb7c53d-d8b6-4ef9-9506-f5647ebabcbb');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'GDWebChangeCardController',methodName:'Frm_Load',params:[arg]},]);
						}
						this.context.on('refreshData',function(event,arg){
								return refreshData(arg);
						});
						refreshData();
						appContext.on('initComplated',function(){
							$('#Form1').trigger('OnLoad');
						});
$('#XSmartDictLookup_ChangeType').adplookupbox({ 
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

$('#XSmartDictLookup_ChangePeople').adplookupbox({ 
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

$('#XSmartDictLookup_Reviewer').adplookupbox({ 
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

$('#XSmartDictLookup_Responsible').adplookupbox({ 
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

$('#XSmartDictLookup_AddAsset').adplookupbox({ 
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

$('#XSmartDictLookup_AddAssetFSSC').adplookupbox({ 
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





