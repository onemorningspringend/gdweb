window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/8/27 22:48:18]
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
CreateDateTime :[2018/8/27 22:48:20]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWeb_AssetCard','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '5a477542-3f55-4f96-b5b8-39b85d4b0c44',
				defaultInstance:'DM_GDWeb_AssetCard_CardInstance',
				primaryKey: 'GDZCZY_ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'GDZCZY':false
				},
				workInstanceInfo: {tableName:'GDZCZY', fieldName:'GDZCZY_LCSL'},


				instances: {
						'DM_GDWeb_AssetCard_CardInstance': {
								view: '1',
								dataSourceName:'DM_GDWeb_AssetCard_CardInstance',
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



schema['5a477542-3f55-4f96-b5b8-39b85d4b0c44']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDZCZY_DWBH","defaultValue":"","name":"GDZCZY_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFBF","defaultValue":"","name":"GDZJJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFDR","defaultValue":"","name":"GDZJJL_IFDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFCZ","defaultValue":"","name":"GDZJJL_IFCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCBH","defaultValue":"","name":"GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCMC","defaultValue":"","name":"GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LBBH","defaultValue":"","name":"GDZCZY_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LBBHMC","defaultValue":"","name":"GDZCZY_LBBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJBH","defaultValue":"","name":"GDZCZY_ZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJBHMC","defaultValue":"","name":"GDZCZY_ZJBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCYZ","defaultValue":0,"name":"GDZCZY_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_RZRQ","defaultValue":"","name":"GDZCZY_RZRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCSL","defaultValue":0,"name":"GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBH","defaultValue":"","name":"GDZCZY_BMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBHMC","defaultValue":"","name":"GDZCZY_BMBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZTBH","defaultValue":"","name":"GDZCZY_ZTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZTBHMC","defaultValue":"","name":"GDZCZY_ZTBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LYBH","defaultValue":"","name":"GDZCZY_LYBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LYBHMC","defaultValue":"","name":"GDZCZY_LYBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YTBH","defaultValue":"","name":"GDZCZY_YTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YTBHMC","defaultValue":"","name":"GDZCZY_YTBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CFDD","defaultValue":"","name":"GDZCZY_CFDD","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CFDDMC","defaultValue":"","name":"GDZCZY_CFDDMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZDR","defaultValue":"","name":"GDZCZY_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CWQR","defaultValue":"","name":"GDZCZY_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BGXH","defaultValue":0,"name":"GDZCZY_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_SBBH","defaultValue":"","name":"GDZCZY_SBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ID","defaultValue":"","name":"GDZCZY_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCNM","defaultValue":"","name":"GDZCZY_ZCNM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_TMBH","defaultValue":"","name":"GDZCZY_TMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_KSQJ","defaultValue":"","name":"GDZCZY_KSQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZZQJ","defaultValue":"","name":"GDZCZY_ZZQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZRR","defaultValue":"","name":"GDZCZY_ZRR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZRRMC","defaultValue":"","name":"GDZCZY_ZRRMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYNX","defaultValue":0,"name":"GDZCZY_SYNX","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SYSJ","defaultValue":0,"name":"GDZCZY_SYSJ","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_RZZJ","defaultValue":0,"name":"GDZCZY_RZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_LJZJ","defaultValue":0,"name":"GDZCZY_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZL","defaultValue":0,"name":"GDZCZY_JCZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZ","defaultValue":0,"name":"GDZCZY_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JZZB","defaultValue":0,"name":"GDZCZY_JZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YZJL","defaultValue":0,"name":"GDZCZY_YZJL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YZJE","defaultValue":0,"name":"GDZCZY_YZJE","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_NZJL","defaultValue":0,"name":"GDZCZY_NZJL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_NZJE","defaultValue":0,"name":"GDZCZY_NZJE","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_ZGZL","defaultValue":0,"name":"GDZCZY_ZGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YGZL","defaultValue":0,"name":"GDZCZY_YGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJYF","defaultValue":0,"name":"GDZCZY_ZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_JLYF","defaultValue":0,"name":"GDZCZY_JLYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_JLZJ","defaultValue":0,"name":"GDZCZY_JLZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_GUIG","defaultValue":"","name":"GDZCZY_GUIG","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZYPZ","defaultValue":"","name":"GDZCZY_ZYPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_FPH","defaultValue":"","name":"GDZCZY_FPH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DDH","defaultValue":"","name":"GDZCZY_DDH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DYJT","defaultValue":"","name":"GDZCZY_DYJT","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYR","defaultValue":"","name":"GDZCZY_SYR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYRMC","defaultValue":"","name":"GDZCZY_SYRMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_JLDW","defaultValue":"","name":"GDZCZY_JLDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_JLDWMC","defaultValue":"","name":"GDZCZY_JLDWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYDW","defaultValue":"","name":"GDZCZY_SYDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYDWMC","defaultValue":"","name":"GDZCZY_SYDWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYBM","defaultValue":"","name":"GDZCZY_SYBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYBMMC","defaultValue":"","name":"GDZCZY_SYBMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YSBM","defaultValue":"","name":"GDZCZY_YSBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YSBMMC","defaultValue":"","name":"GDZCZY_YSBMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM01","defaultValue":"","name":"GDZCZY_XM01","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM02","defaultValue":"","name":"GDZCZY_XM02","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM03","defaultValue":"","name":"GDZCZY_XM03","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM04","defaultValue":"","name":"GDZCZY_XM04","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM05","defaultValue":"","name":"GDZCZY_XM05","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM06","defaultValue":"","name":"GDZCZY_XM06","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM07","defaultValue":"","name":"GDZCZY_XM07","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM08","defaultValue":"","name":"GDZCZY_XM08","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM09","defaultValue":"","name":"GDZCZY_XM09","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM10","defaultValue":"","name":"GDZCZY_XM10","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM11","defaultValue":"","name":"GDZCZY_XM11","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM12","defaultValue":"","name":"GDZCZY_XM12","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM13","defaultValue":"","name":"GDZCZY_XM13","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM14","defaultValue":"","name":"GDZCZY_XM14","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM15","defaultValue":"","name":"GDZCZY_XM15","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM16","defaultValue":"","name":"GDZCZY_XM16","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM17","defaultValue":"","name":"GDZCZY_XM17","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM18","defaultValue":"","name":"GDZCZY_XM18","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM19","defaultValue":"","name":"GDZCZY_XM19","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM20","defaultValue":"","name":"GDZCZY_XM20","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM21","defaultValue":"","name":"GDZCZY_XM21","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM22","defaultValue":"","name":"GDZCZY_XM22","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM23","defaultValue":"","name":"GDZCZY_XM23","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM24","defaultValue":"","name":"GDZCZY_XM24","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM25","defaultValue":"","name":"GDZCZY_XM25","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM26","defaultValue":"","name":"GDZCZY_XM26","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM27","defaultValue":"","name":"GDZCZY_XM27","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM28","defaultValue":"","name":"GDZCZY_XM28","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM29","defaultValue":"","name":"GDZCZY_XM29","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM30","defaultValue":"","name":"GDZCZY_XM30","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM31","defaultValue":"","name":"GDZCZY_XM31","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM32","defaultValue":"","name":"GDZCZY_XM32","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM33","defaultValue":"","name":"GDZCZY_XM33","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM34","defaultValue":"","name":"GDZCZY_XM34","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM35","defaultValue":"","name":"GDZCZY_XM35","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM36","defaultValue":"","name":"GDZCZY_XM36","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM37","defaultValue":"","name":"GDZCZY_XM37","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM38","defaultValue":"","name":"GDZCZY_XM38","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM39","defaultValue":"","name":"GDZCZY_XM39","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM40","defaultValue":"","name":"GDZCZY_XM40","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ01","defaultValue":0,"name":"GDZCZY_SJ01","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ02","defaultValue":0,"name":"GDZCZY_SJ02","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ03","defaultValue":0,"name":"GDZCZY_SJ03","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ04","defaultValue":0,"name":"GDZCZY_SJ04","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ05","defaultValue":0,"name":"GDZCZY_SJ05","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ06","defaultValue":0,"name":"GDZCZY_SJ06","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ07","defaultValue":0,"name":"GDZCZY_SJ07","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ08","defaultValue":0,"name":"GDZCZY_SJ08","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ09","defaultValue":0,"name":"GDZCZY_SJ09","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ10","defaultValue":0,"name":"GDZCZY_SJ10","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SFZC","defaultValue":"","name":"GDZCZY_SFZC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SHBH","defaultValue":"","name":"GDZCZY_SHBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BNRZZJ","defaultValue":0,"name":"GDZCZY_BNRZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JTCZ","defaultValue":"","name":"GDZCZY_JTCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_GRRQ","defaultValue":"","name":"GDZCZY_GRRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_QYRQ","defaultValue":"","name":"GDZCZY_QYRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YRZYF","defaultValue":0,"name":"GDZCZY_YRZYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_KMBH","defaultValue":"","name":"GDZCZY_KMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_KMBHMC","defaultValue":"","name":"GDZCZY_KMBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM01MC","defaultValue":"","name":"GDZCZY_XM01MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM02MC","defaultValue":"","name":"GDZCZY_XM02MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM03MC","defaultValue":"","name":"GDZCZY_XM03MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM04MC","defaultValue":"","name":"GDZCZY_XM04MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM05MC","defaultValue":"","name":"GDZCZY_XM05MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM06MC","defaultValue":"","name":"GDZCZY_XM06MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM07MC","defaultValue":"","name":"GDZCZY_XM07MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM08MC","defaultValue":"","name":"GDZCZY_XM08MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM09MC","defaultValue":"","name":"GDZCZY_XM09MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM10MC","defaultValue":"","name":"GDZCZY_XM10MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM11MC","defaultValue":"","name":"GDZCZY_XM11MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM12MC","defaultValue":"","name":"GDZCZY_XM12MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM13MC","defaultValue":"","name":"GDZCZY_XM13MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM14MC","defaultValue":"","name":"GDZCZY_XM14MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM15MC","defaultValue":"","name":"GDZCZY_XM15MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM16MC","defaultValue":"","name":"GDZCZY_XM16MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM17MC","defaultValue":"","name":"GDZCZY_XM17MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM18MC","defaultValue":"","name":"GDZCZY_XM18MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM19MC","defaultValue":"","name":"GDZCZY_XM19MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM20MC","defaultValue":"","name":"GDZCZY_XM20MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM21MC","defaultValue":"","name":"GDZCZY_XM21MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM22MC","defaultValue":"","name":"GDZCZY_XM22MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM23MC","defaultValue":"","name":"GDZCZY_XM23MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM24MC","defaultValue":"","name":"GDZCZY_XM24MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM25MC","defaultValue":"","name":"GDZCZY_XM25MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM26MC","defaultValue":"","name":"GDZCZY_XM26MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM27MC","defaultValue":"","name":"GDZCZY_XM27MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM28MC","defaultValue":"","name":"GDZCZY_XM28MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM29MC","defaultValue":"","name":"GDZCZY_XM29MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM30MC","defaultValue":"","name":"GDZCZY_XM30MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM31MC","defaultValue":"","name":"GDZCZY_XM31MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM32MC","defaultValue":"","name":"GDZCZY_XM32MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM33MC","defaultValue":"","name":"GDZCZY_XM33MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM34MC","defaultValue":"","name":"GDZCZY_XM34MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM35MC","defaultValue":"","name":"GDZCZY_XM35MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM36MC","defaultValue":"","name":"GDZCZY_XM36MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM37MC","defaultValue":"","name":"GDZCZY_XM37MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM38MC","defaultValue":"","name":"GDZCZY_XM38MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM39MC","defaultValue":"","name":"GDZCZY_XM39MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM40MC","defaultValue":"","name":"GDZCZY_XM40MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_STATE","defaultValue":"","name":"GDZCZY_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LCSL","defaultValue":"","name":"GDZCZY_LCSL","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_FSSCFLAG","defaultValue":"","name":"GDZCZY_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDZCZY_ID","tableName":"GDZCZY","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDZCZY_DWBH","defaultValue":"","name":"GDZCZY_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFBF","defaultValue":"","name":"GDZJJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFDR","defaultValue":"","name":"GDZJJL_IFDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFCZ","defaultValue":"","name":"GDZJJL_IFCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCBH","defaultValue":"","name":"GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCMC","defaultValue":"","name":"GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LBBH","defaultValue":"","name":"GDZCZY_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LBBHMC","defaultValue":"","name":"GDZCZY_LBBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJBH","defaultValue":"","name":"GDZCZY_ZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJBHMC","defaultValue":"","name":"GDZCZY_ZJBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCYZ","defaultValue":0,"name":"GDZCZY_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_RZRQ","defaultValue":"","name":"GDZCZY_RZRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCSL","defaultValue":0,"name":"GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBH","defaultValue":"","name":"GDZCZY_BMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBHMC","defaultValue":"","name":"GDZCZY_BMBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZTBH","defaultValue":"","name":"GDZCZY_ZTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZTBHMC","defaultValue":"","name":"GDZCZY_ZTBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LYBH","defaultValue":"","name":"GDZCZY_LYBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LYBHMC","defaultValue":"","name":"GDZCZY_LYBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YTBH","defaultValue":"","name":"GDZCZY_YTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YTBHMC","defaultValue":"","name":"GDZCZY_YTBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CFDD","defaultValue":"","name":"GDZCZY_CFDD","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CFDDMC","defaultValue":"","name":"GDZCZY_CFDDMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZDR","defaultValue":"","name":"GDZCZY_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CWQR","defaultValue":"","name":"GDZCZY_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BGXH","defaultValue":0,"name":"GDZCZY_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_SBBH","defaultValue":"","name":"GDZCZY_SBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ID","defaultValue":"","name":"GDZCZY_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCNM","defaultValue":"","name":"GDZCZY_ZCNM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_TMBH","defaultValue":"","name":"GDZCZY_TMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_KSQJ","defaultValue":"","name":"GDZCZY_KSQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZZQJ","defaultValue":"","name":"GDZCZY_ZZQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZRR","defaultValue":"","name":"GDZCZY_ZRR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZRRMC","defaultValue":"","name":"GDZCZY_ZRRMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYNX","defaultValue":0,"name":"GDZCZY_SYNX","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SYSJ","defaultValue":0,"name":"GDZCZY_SYSJ","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_RZZJ","defaultValue":0,"name":"GDZCZY_RZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_LJZJ","defaultValue":0,"name":"GDZCZY_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZL","defaultValue":0,"name":"GDZCZY_JCZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZ","defaultValue":0,"name":"GDZCZY_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JZZB","defaultValue":0,"name":"GDZCZY_JZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YZJL","defaultValue":0,"name":"GDZCZY_YZJL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YZJE","defaultValue":0,"name":"GDZCZY_YZJE","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_NZJL","defaultValue":0,"name":"GDZCZY_NZJL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_NZJE","defaultValue":0,"name":"GDZCZY_NZJE","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_ZGZL","defaultValue":0,"name":"GDZCZY_ZGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YGZL","defaultValue":0,"name":"GDZCZY_YGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJYF","defaultValue":0,"name":"GDZCZY_ZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_JLYF","defaultValue":0,"name":"GDZCZY_JLYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_JLZJ","defaultValue":0,"name":"GDZCZY_JLZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_GUIG","defaultValue":"","name":"GDZCZY_GUIG","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZYPZ","defaultValue":"","name":"GDZCZY_ZYPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_FPH","defaultValue":"","name":"GDZCZY_FPH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DDH","defaultValue":"","name":"GDZCZY_DDH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DYJT","defaultValue":"","name":"GDZCZY_DYJT","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYR","defaultValue":"","name":"GDZCZY_SYR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYRMC","defaultValue":"","name":"GDZCZY_SYRMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_JLDW","defaultValue":"","name":"GDZCZY_JLDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_JLDWMC","defaultValue":"","name":"GDZCZY_JLDWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYDW","defaultValue":"","name":"GDZCZY_SYDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYDWMC","defaultValue":"","name":"GDZCZY_SYDWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYBM","defaultValue":"","name":"GDZCZY_SYBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYBMMC","defaultValue":"","name":"GDZCZY_SYBMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YSBM","defaultValue":"","name":"GDZCZY_YSBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YSBMMC","defaultValue":"","name":"GDZCZY_YSBMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM01","defaultValue":"","name":"GDZCZY_XM01","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM02","defaultValue":"","name":"GDZCZY_XM02","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM03","defaultValue":"","name":"GDZCZY_XM03","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM04","defaultValue":"","name":"GDZCZY_XM04","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM05","defaultValue":"","name":"GDZCZY_XM05","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM06","defaultValue":"","name":"GDZCZY_XM06","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM07","defaultValue":"","name":"GDZCZY_XM07","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM08","defaultValue":"","name":"GDZCZY_XM08","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM09","defaultValue":"","name":"GDZCZY_XM09","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM10","defaultValue":"","name":"GDZCZY_XM10","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM11","defaultValue":"","name":"GDZCZY_XM11","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM12","defaultValue":"","name":"GDZCZY_XM12","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM13","defaultValue":"","name":"GDZCZY_XM13","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM14","defaultValue":"","name":"GDZCZY_XM14","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM15","defaultValue":"","name":"GDZCZY_XM15","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM16","defaultValue":"","name":"GDZCZY_XM16","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM17","defaultValue":"","name":"GDZCZY_XM17","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM18","defaultValue":"","name":"GDZCZY_XM18","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM19","defaultValue":"","name":"GDZCZY_XM19","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM20","defaultValue":"","name":"GDZCZY_XM20","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM21","defaultValue":"","name":"GDZCZY_XM21","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM22","defaultValue":"","name":"GDZCZY_XM22","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM23","defaultValue":"","name":"GDZCZY_XM23","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM24","defaultValue":"","name":"GDZCZY_XM24","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM25","defaultValue":"","name":"GDZCZY_XM25","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM26","defaultValue":"","name":"GDZCZY_XM26","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM27","defaultValue":"","name":"GDZCZY_XM27","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM28","defaultValue":"","name":"GDZCZY_XM28","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM29","defaultValue":"","name":"GDZCZY_XM29","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM30","defaultValue":"","name":"GDZCZY_XM30","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM31","defaultValue":"","name":"GDZCZY_XM31","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM32","defaultValue":"","name":"GDZCZY_XM32","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM33","defaultValue":"","name":"GDZCZY_XM33","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM34","defaultValue":"","name":"GDZCZY_XM34","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM35","defaultValue":"","name":"GDZCZY_XM35","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM36","defaultValue":"","name":"GDZCZY_XM36","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM37","defaultValue":"","name":"GDZCZY_XM37","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM38","defaultValue":"","name":"GDZCZY_XM38","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM39","defaultValue":"","name":"GDZCZY_XM39","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM40","defaultValue":"","name":"GDZCZY_XM40","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ01","defaultValue":0,"name":"GDZCZY_SJ01","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ02","defaultValue":0,"name":"GDZCZY_SJ02","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ03","defaultValue":0,"name":"GDZCZY_SJ03","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ04","defaultValue":0,"name":"GDZCZY_SJ04","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ05","defaultValue":0,"name":"GDZCZY_SJ05","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ06","defaultValue":0,"name":"GDZCZY_SJ06","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ07","defaultValue":0,"name":"GDZCZY_SJ07","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ08","defaultValue":0,"name":"GDZCZY_SJ08","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ09","defaultValue":0,"name":"GDZCZY_SJ09","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ10","defaultValue":0,"name":"GDZCZY_SJ10","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SFZC","defaultValue":"","name":"GDZCZY_SFZC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SHBH","defaultValue":"","name":"GDZCZY_SHBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BNRZZJ","defaultValue":0,"name":"GDZCZY_BNRZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JTCZ","defaultValue":"","name":"GDZCZY_JTCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_GRRQ","defaultValue":"","name":"GDZCZY_GRRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_QYRQ","defaultValue":"","name":"GDZCZY_QYRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YRZYF","defaultValue":0,"name":"GDZCZY_YRZYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_KMBH","defaultValue":"","name":"GDZCZY_KMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_KMBHMC","defaultValue":"","name":"GDZCZY_KMBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM01MC","defaultValue":"","name":"GDZCZY_XM01MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM02MC","defaultValue":"","name":"GDZCZY_XM02MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM03MC","defaultValue":"","name":"GDZCZY_XM03MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM04MC","defaultValue":"","name":"GDZCZY_XM04MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM05MC","defaultValue":"","name":"GDZCZY_XM05MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM06MC","defaultValue":"","name":"GDZCZY_XM06MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM07MC","defaultValue":"","name":"GDZCZY_XM07MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM08MC","defaultValue":"","name":"GDZCZY_XM08MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM09MC","defaultValue":"","name":"GDZCZY_XM09MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM10MC","defaultValue":"","name":"GDZCZY_XM10MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM11MC","defaultValue":"","name":"GDZCZY_XM11MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM12MC","defaultValue":"","name":"GDZCZY_XM12MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM13MC","defaultValue":"","name":"GDZCZY_XM13MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM14MC","defaultValue":"","name":"GDZCZY_XM14MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM15MC","defaultValue":"","name":"GDZCZY_XM15MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM16MC","defaultValue":"","name":"GDZCZY_XM16MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM17MC","defaultValue":"","name":"GDZCZY_XM17MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM18MC","defaultValue":"","name":"GDZCZY_XM18MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM19MC","defaultValue":"","name":"GDZCZY_XM19MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM20MC","defaultValue":"","name":"GDZCZY_XM20MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM21MC","defaultValue":"","name":"GDZCZY_XM21MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM22MC","defaultValue":"","name":"GDZCZY_XM22MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM23MC","defaultValue":"","name":"GDZCZY_XM23MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM24MC","defaultValue":"","name":"GDZCZY_XM24MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM25MC","defaultValue":"","name":"GDZCZY_XM25MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM26MC","defaultValue":"","name":"GDZCZY_XM26MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM27MC","defaultValue":"","name":"GDZCZY_XM27MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM28MC","defaultValue":"","name":"GDZCZY_XM28MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM29MC","defaultValue":"","name":"GDZCZY_XM29MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM30MC","defaultValue":"","name":"GDZCZY_XM30MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM31MC","defaultValue":"","name":"GDZCZY_XM31MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM32MC","defaultValue":"","name":"GDZCZY_XM32MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM33MC","defaultValue":"","name":"GDZCZY_XM33MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM34MC","defaultValue":"","name":"GDZCZY_XM34MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM35MC","defaultValue":"","name":"GDZCZY_XM35MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM36MC","defaultValue":"","name":"GDZCZY_XM36MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM37MC","defaultValue":"","name":"GDZCZY_XM37MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM38MC","defaultValue":"","name":"GDZCZY_XM38MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM39MC","defaultValue":"","name":"GDZCZY_XM39MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM40MC","defaultValue":"","name":"GDZCZY_XM40MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_STATE","defaultValue":"","name":"GDZCZY_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LCSL","defaultValue":"","name":"GDZCZY_LCSL","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_FSSCFLAG","defaultValue":"","name":"GDZCZY_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDZCZY_ID","tableName":"GDZCZY","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/8/27 22:48:20]
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
CreateDateTime :[2018/8/27 22:48:22]
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
												{ ID: 'Layout1_Main', Name: 'Layout1_Main', Description: ''},
												{ ID: 'Layout1_North', Name: 'Layout1_North', Description: ''}
									]
						}
			],
			States: [
						{
									ID: 'Start', Name: '初始',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadOnly'}
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
				loadData: {transit:'', params:['{formState~psAssetID}'], methodInfo:{target:'CardController', methodName:'loadData'} },
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
				loadPreData: {transit:'', params:['{formState~psAssetID}'], methodInfo:{target:'CardController', methodName:'loadPreData'} },
				saveDraft: {transit:'SaveDraft', params:['',''], methodInfo:{target:'CardController', methodName:'saveDraft'} },
				CardFormload: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'CardFormload'} },
				ReloadForm: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'ReloadForm'} },
				MyCreate: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'MyCreate'} },
				GetNewAssetCode: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'GetNewAssetCode'} },
				MainSave: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'MainSave'} },
				closeForm: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'closeForm'} },
				AddCard: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'AddCard'} },
				EditCard: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'EditCard'} },
				CancelCard: {transit:'', params:[], methodInfo:{target:'GDWebAssetsCardController', methodName:'CancelCard'} }
			});

			$('#124a4252-6e74-4e31-9938-84fff9e5b81a').on('click', this.eventAgent(['AddCard'], this, true));
			$('#9e5fe46a-d77f-45e0-9f5d-ba3e2cf7251d').on('click', this.eventAgent(['EditCard'], this, true));
			$('#a15fa001-bd39-4f4d-8cae-7282bfb69529').on('click', this.eventAgent(['CancelCard'], this, true));
			$('#13c7b28e-32bf-4199-8e99-073999918325').on('click', this.eventAgent(['MainSave'], this, true));
			$('#cc8a5ae5-7d15-44d2-9cc9-8fedb433fb59').on('click', this.eventAgent(['closeForm'], this, true));
$('#presetBar').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWeb_AssetCard');
						this.context.setParam('formID', 'd560189e-4ef2-407b-97a8-69a4071cdbec');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'CardController',methodName:'loadPreData',params:['{formState~psAssetID}',arg]},]);
						}
						this.context.on('refreshData',function(event,arg){
								return refreshData(arg);
						});
						var invokeResult = refreshData();
if(invokeResult && invokeResult['then']){
    invokeResult.then(function(){
        return self.transitInvoke([ {target: 'CardController', methodName: 'formLoad', params: ['']}, {target: 'GDWebAssetsCardController', methodName: 'CardFormload', params: []}]);
    });
}
else{
    self.transitInvoke([ {target: 'CardController', methodName: 'formLoad', params: ['']}, {target: 'GDWebAssetsCardController', methodName: 'CardFormload', params: []}]);
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





