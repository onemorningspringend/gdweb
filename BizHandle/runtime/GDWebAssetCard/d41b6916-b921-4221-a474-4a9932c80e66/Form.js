window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/5/22 15:07:14]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWeb_Fictitious','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '726fdffb-6cfd-4a99-8953-86b82c4ce0ba',
				defaultInstance:'DM_GDWeb_Fictitious_CardInstance',
				primaryKey: 'ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'DM_GDWeb_Fictitious':false
				},


				instances: {
						'DM_GDWeb_Fictitious_CardInstance': {
								view: '1',
								dataSourceName:'DM_GDWeb_Fictitious_CardInstance',
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
				}
		}
}]);



schema['726fdffb-6cfd-4a99-8953-86b82c4ce0ba']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"ID","defaultValue":"","name":"ID","type":"String","unique":false}],"primaryKey":"ID","tableName":"DM_GDWeb_Fictitious","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"ID","defaultValue":"","name":"ID","type":"String","unique":false}],"primaryKey":"ID","tableName":"DM_GDWeb_Fictitious","foreignKey":null}]
};



/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/5/22 15:07:16]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWeb_AssetCard','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '5a477542-3f55-4f96-b5b8-39b85d4b0c44',
				defaultInstance:'DM_GDWeb_AssetCard_ListInstance',
				primaryKey: 'GDZCZY_ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: true,
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
						'DM_GDWeb_AssetCard_ListInstance': {
								view: '3',
								dataSourceName:'DM_GDWeb_AssetCard_ListInstance',
								defaultLoad: true,
								filter: '',
								sort: '#GDZCZY_ZCBH# ASC',
								pagination: {pageSize:40}
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



schema['5a477542-3f55-4f96-b5b8-39b85d4b0c44']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDZCZY_DWBH","defaultValue":"","name":"GDZCZY_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFBF","defaultValue":"","name":"GDZJJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFDR","defaultValue":"","name":"GDZJJL_IFDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFCZ","defaultValue":"","name":"GDZJJL_IFCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCBH","defaultValue":"","name":"GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCMC","defaultValue":"","name":"GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LBBH","defaultValue":"","name":"GDZCZY_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LBBHMC","defaultValue":"","name":"GDZCZY_LBBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJBH","defaultValue":"","name":"GDZCZY_ZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJBHMC","defaultValue":"","name":"GDZCZY_ZJBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCYZ","defaultValue":0,"name":"GDZCZY_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_RZRQ","defaultValue":"","name":"GDZCZY_RZRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCSL","defaultValue":0,"name":"GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBH","defaultValue":"","name":"GDZCZY_BMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBHMC","defaultValue":"","name":"GDZCZY_BMBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZTBH","defaultValue":"","name":"GDZCZY_ZTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZTBHMC","defaultValue":"","name":"GDZCZY_ZTBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LYBH","defaultValue":"","name":"GDZCZY_LYBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LYBHMC","defaultValue":"","name":"GDZCZY_LYBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YTBH","defaultValue":"","name":"GDZCZY_YTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YTBHMC","defaultValue":"","name":"GDZCZY_YTBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CFDD","defaultValue":"","name":"GDZCZY_CFDD","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CFDDMC","defaultValue":"","name":"GDZCZY_CFDDMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZDR","defaultValue":"","name":"GDZCZY_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CWQR","defaultValue":"","name":"GDZCZY_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BGXH","defaultValue":0,"name":"GDZCZY_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_SBBH","defaultValue":"","name":"GDZCZY_SBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ID","defaultValue":"","name":"GDZCZY_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCNM","defaultValue":"","name":"GDZCZY_ZCNM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_TMBH","defaultValue":"","name":"GDZCZY_TMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_KSQJ","defaultValue":"","name":"GDZCZY_KSQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZZQJ","defaultValue":"","name":"GDZCZY_ZZQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZRR","defaultValue":"","name":"GDZCZY_ZRR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZRRMC","defaultValue":"","name":"GDZCZY_ZRRMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYNX","defaultValue":0,"name":"GDZCZY_SYNX","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SYSJ","defaultValue":0,"name":"GDZCZY_SYSJ","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_RZZJ","defaultValue":0,"name":"GDZCZY_RZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_LJZJ","defaultValue":0,"name":"GDZCZY_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZL","defaultValue":0,"name":"GDZCZY_JCZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZ","defaultValue":0,"name":"GDZCZY_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JZZB","defaultValue":0,"name":"GDZCZY_JZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YZJL","defaultValue":0,"name":"GDZCZY_YZJL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YZJE","defaultValue":0,"name":"GDZCZY_YZJE","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_NZJL","defaultValue":0,"name":"GDZCZY_NZJL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_NZJE","defaultValue":0,"name":"GDZCZY_NZJE","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_ZGZL","defaultValue":0,"name":"GDZCZY_ZGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YGZL","defaultValue":0,"name":"GDZCZY_YGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJYF","defaultValue":0,"name":"GDZCZY_ZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_JLYF","defaultValue":0,"name":"GDZCZY_JLYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_JLZJ","defaultValue":0,"name":"GDZCZY_JLZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_GUIG","defaultValue":"","name":"GDZCZY_GUIG","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZYPZ","defaultValue":"","name":"GDZCZY_ZYPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_FPH","defaultValue":"","name":"GDZCZY_FPH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DDH","defaultValue":"","name":"GDZCZY_DDH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DYJT","defaultValue":"","name":"GDZCZY_DYJT","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYR","defaultValue":"","name":"GDZCZY_SYR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYRMC","defaultValue":"","name":"GDZCZY_SYRMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_JLDW","defaultValue":"","name":"GDZCZY_JLDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_JLDWMC","defaultValue":"","name":"GDZCZY_JLDWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYDW","defaultValue":"","name":"GDZCZY_SYDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYDWMC","defaultValue":"","name":"GDZCZY_SYDWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYBM","defaultValue":"","name":"GDZCZY_SYBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYBMMC","defaultValue":"","name":"GDZCZY_SYBMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YSBM","defaultValue":"","name":"GDZCZY_YSBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YSBMMC","defaultValue":"","name":"GDZCZY_YSBMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM01","defaultValue":"","name":"GDZCZY_XM01","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM02","defaultValue":"","name":"GDZCZY_XM02","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM03","defaultValue":"","name":"GDZCZY_XM03","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM04","defaultValue":"","name":"GDZCZY_XM04","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM05","defaultValue":"","name":"GDZCZY_XM05","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM06","defaultValue":"","name":"GDZCZY_XM06","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM07","defaultValue":"","name":"GDZCZY_XM07","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM08","defaultValue":"","name":"GDZCZY_XM08","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM09","defaultValue":"","name":"GDZCZY_XM09","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM10","defaultValue":"","name":"GDZCZY_XM10","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM11","defaultValue":"","name":"GDZCZY_XM11","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM12","defaultValue":"","name":"GDZCZY_XM12","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM13","defaultValue":"","name":"GDZCZY_XM13","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM14","defaultValue":"","name":"GDZCZY_XM14","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM15","defaultValue":"","name":"GDZCZY_XM15","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM16","defaultValue":"","name":"GDZCZY_XM16","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM17","defaultValue":"","name":"GDZCZY_XM17","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM18","defaultValue":"","name":"GDZCZY_XM18","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM19","defaultValue":"","name":"GDZCZY_XM19","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM20","defaultValue":"","name":"GDZCZY_XM20","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM21","defaultValue":"","name":"GDZCZY_XM21","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM22","defaultValue":"","name":"GDZCZY_XM22","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM23","defaultValue":"","name":"GDZCZY_XM23","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM24","defaultValue":"","name":"GDZCZY_XM24","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM25","defaultValue":"","name":"GDZCZY_XM25","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM26","defaultValue":"","name":"GDZCZY_XM26","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM27","defaultValue":"","name":"GDZCZY_XM27","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM28","defaultValue":"","name":"GDZCZY_XM28","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM29","defaultValue":"","name":"GDZCZY_XM29","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM30","defaultValue":"","name":"GDZCZY_XM30","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM31","defaultValue":"","name":"GDZCZY_XM31","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM32","defaultValue":"","name":"GDZCZY_XM32","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM33","defaultValue":"","name":"GDZCZY_XM33","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM34","defaultValue":"","name":"GDZCZY_XM34","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM35","defaultValue":"","name":"GDZCZY_XM35","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM36","defaultValue":"","name":"GDZCZY_XM36","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM37","defaultValue":"","name":"GDZCZY_XM37","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM38","defaultValue":"","name":"GDZCZY_XM38","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM39","defaultValue":"","name":"GDZCZY_XM39","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM40","defaultValue":"","name":"GDZCZY_XM40","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ01","defaultValue":0,"name":"GDZCZY_SJ01","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ02","defaultValue":0,"name":"GDZCZY_SJ02","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ03","defaultValue":0,"name":"GDZCZY_SJ03","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ04","defaultValue":0,"name":"GDZCZY_SJ04","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ05","defaultValue":0,"name":"GDZCZY_SJ05","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ06","defaultValue":0,"name":"GDZCZY_SJ06","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ07","defaultValue":0,"name":"GDZCZY_SJ07","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ08","defaultValue":0,"name":"GDZCZY_SJ08","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ09","defaultValue":0,"name":"GDZCZY_SJ09","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ10","defaultValue":0,"name":"GDZCZY_SJ10","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SFZC","defaultValue":"","name":"GDZCZY_SFZC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SHBH","defaultValue":"","name":"GDZCZY_SHBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BNRZZJ","defaultValue":0,"name":"GDZCZY_BNRZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JTCZ","defaultValue":"","name":"GDZCZY_JTCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_GRRQ","defaultValue":"","name":"GDZCZY_GRRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_QYRQ","defaultValue":"","name":"GDZCZY_QYRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YRZYF","defaultValue":0,"name":"GDZCZY_YRZYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_KMBH","defaultValue":"","name":"GDZCZY_KMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_KMBHMC","defaultValue":"","name":"GDZCZY_KMBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM01MC","defaultValue":"","name":"GDZCZY_XM01MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM02MC","defaultValue":"","name":"GDZCZY_XM02MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM03MC","defaultValue":"","name":"GDZCZY_XM03MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM04MC","defaultValue":"","name":"GDZCZY_XM04MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM05MC","defaultValue":"","name":"GDZCZY_XM05MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM06MC","defaultValue":"","name":"GDZCZY_XM06MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM07MC","defaultValue":"","name":"GDZCZY_XM07MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM08MC","defaultValue":"","name":"GDZCZY_XM08MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM09MC","defaultValue":"","name":"GDZCZY_XM09MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM10MC","defaultValue":"","name":"GDZCZY_XM10MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM11MC","defaultValue":"","name":"GDZCZY_XM11MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM12MC","defaultValue":"","name":"GDZCZY_XM12MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM13MC","defaultValue":"","name":"GDZCZY_XM13MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM14MC","defaultValue":"","name":"GDZCZY_XM14MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM15MC","defaultValue":"","name":"GDZCZY_XM15MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM16MC","defaultValue":"","name":"GDZCZY_XM16MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM17MC","defaultValue":"","name":"GDZCZY_XM17MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM18MC","defaultValue":"","name":"GDZCZY_XM18MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM19MC","defaultValue":"","name":"GDZCZY_XM19MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM20MC","defaultValue":"","name":"GDZCZY_XM20MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM21MC","defaultValue":"","name":"GDZCZY_XM21MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM22MC","defaultValue":"","name":"GDZCZY_XM22MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM23MC","defaultValue":"","name":"GDZCZY_XM23MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM24MC","defaultValue":"","name":"GDZCZY_XM24MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM25MC","defaultValue":"","name":"GDZCZY_XM25MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM26MC","defaultValue":"","name":"GDZCZY_XM26MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM27MC","defaultValue":"","name":"GDZCZY_XM27MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM28MC","defaultValue":"","name":"GDZCZY_XM28MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM29MC","defaultValue":"","name":"GDZCZY_XM29MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM30MC","defaultValue":"","name":"GDZCZY_XM30MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM31MC","defaultValue":"","name":"GDZCZY_XM31MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM32MC","defaultValue":"","name":"GDZCZY_XM32MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM33MC","defaultValue":"","name":"GDZCZY_XM33MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM34MC","defaultValue":"","name":"GDZCZY_XM34MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM35MC","defaultValue":"","name":"GDZCZY_XM35MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM36MC","defaultValue":"","name":"GDZCZY_XM36MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM37MC","defaultValue":"","name":"GDZCZY_XM37MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM38MC","defaultValue":"","name":"GDZCZY_XM38MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM39MC","defaultValue":"","name":"GDZCZY_XM39MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM40MC","defaultValue":"","name":"GDZCZY_XM40MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_STATE","defaultValue":"","name":"GDZCZY_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LCSL","defaultValue":"","name":"GDZCZY_LCSL","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_FSSCFLAG","defaultValue":"","name":"GDZCZY_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDZCZY_ID","tableName":"GDZCZY","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDZCZY_DWBH","defaultValue":"","name":"GDZCZY_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFBF","defaultValue":"","name":"GDZJJL_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFDR","defaultValue":"","name":"GDZJJL_IFDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZJJL_IFCZ","defaultValue":"","name":"GDZJJL_IFCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCBH","defaultValue":"","name":"GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCMC","defaultValue":"","name":"GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LBBH","defaultValue":"","name":"GDZCZY_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LBBHMC","defaultValue":"","name":"GDZCZY_LBBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJBH","defaultValue":"","name":"GDZCZY_ZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJBHMC","defaultValue":"","name":"GDZCZY_ZJBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCYZ","defaultValue":0,"name":"GDZCZY_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_RZRQ","defaultValue":"","name":"GDZCZY_RZRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCSL","defaultValue":0,"name":"GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBH","defaultValue":"","name":"GDZCZY_BMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BMBHMC","defaultValue":"","name":"GDZCZY_BMBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZTBH","defaultValue":"","name":"GDZCZY_ZTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZTBHMC","defaultValue":"","name":"GDZCZY_ZTBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LYBH","defaultValue":"","name":"GDZCZY_LYBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LYBHMC","defaultValue":"","name":"GDZCZY_LYBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YTBH","defaultValue":"","name":"GDZCZY_YTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YTBHMC","defaultValue":"","name":"GDZCZY_YTBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CFDD","defaultValue":"","name":"GDZCZY_CFDD","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CFDDMC","defaultValue":"","name":"GDZCZY_CFDDMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZDR","defaultValue":"","name":"GDZCZY_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_CWQR","defaultValue":"","name":"GDZCZY_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BGXH","defaultValue":0,"name":"GDZCZY_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_SBBH","defaultValue":"","name":"GDZCZY_SBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ID","defaultValue":"","name":"GDZCZY_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCNM","defaultValue":"","name":"GDZCZY_ZCNM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_TMBH","defaultValue":"","name":"GDZCZY_TMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_KSQJ","defaultValue":"","name":"GDZCZY_KSQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZZQJ","defaultValue":"","name":"GDZCZY_ZZQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZRR","defaultValue":"","name":"GDZCZY_ZRR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZRRMC","defaultValue":"","name":"GDZCZY_ZRRMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYNX","defaultValue":0,"name":"GDZCZY_SYNX","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SYSJ","defaultValue":0,"name":"GDZCZY_SYSJ","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_RZZJ","defaultValue":0,"name":"GDZCZY_RZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_LJZJ","defaultValue":0,"name":"GDZCZY_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZL","defaultValue":0,"name":"GDZCZY_JCZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZ","defaultValue":0,"name":"GDZCZY_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JZZB","defaultValue":0,"name":"GDZCZY_JZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YZJL","defaultValue":0,"name":"GDZCZY_YZJL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YZJE","defaultValue":0,"name":"GDZCZY_YZJE","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_NZJL","defaultValue":0,"name":"GDZCZY_NZJL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_NZJE","defaultValue":0,"name":"GDZCZY_NZJE","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_ZGZL","defaultValue":0,"name":"GDZCZY_ZGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_YGZL","defaultValue":0,"name":"GDZCZY_YGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_ZJYF","defaultValue":0,"name":"GDZCZY_ZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_JLYF","defaultValue":0,"name":"GDZCZY_JLYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_JLZJ","defaultValue":0,"name":"GDZCZY_JLZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_GUIG","defaultValue":"","name":"GDZCZY_GUIG","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZYPZ","defaultValue":"","name":"GDZCZY_ZYPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_FPH","defaultValue":"","name":"GDZCZY_FPH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DDH","defaultValue":"","name":"GDZCZY_DDH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DYJT","defaultValue":"","name":"GDZCZY_DYJT","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYR","defaultValue":"","name":"GDZCZY_SYR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYRMC","defaultValue":"","name":"GDZCZY_SYRMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_JLDW","defaultValue":"","name":"GDZCZY_JLDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_JLDWMC","defaultValue":"","name":"GDZCZY_JLDWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYDW","defaultValue":"","name":"GDZCZY_SYDW","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYDWMC","defaultValue":"","name":"GDZCZY_SYDWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYBM","defaultValue":"","name":"GDZCZY_SYBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SYBMMC","defaultValue":"","name":"GDZCZY_SYBMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YSBM","defaultValue":"","name":"GDZCZY_YSBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YSBMMC","defaultValue":"","name":"GDZCZY_YSBMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM01","defaultValue":"","name":"GDZCZY_XM01","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM02","defaultValue":"","name":"GDZCZY_XM02","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM03","defaultValue":"","name":"GDZCZY_XM03","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM04","defaultValue":"","name":"GDZCZY_XM04","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM05","defaultValue":"","name":"GDZCZY_XM05","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM06","defaultValue":"","name":"GDZCZY_XM06","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM07","defaultValue":"","name":"GDZCZY_XM07","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM08","defaultValue":"","name":"GDZCZY_XM08","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM09","defaultValue":"","name":"GDZCZY_XM09","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM10","defaultValue":"","name":"GDZCZY_XM10","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM11","defaultValue":"","name":"GDZCZY_XM11","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM12","defaultValue":"","name":"GDZCZY_XM12","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM13","defaultValue":"","name":"GDZCZY_XM13","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM14","defaultValue":"","name":"GDZCZY_XM14","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM15","defaultValue":"","name":"GDZCZY_XM15","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM16","defaultValue":"","name":"GDZCZY_XM16","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM17","defaultValue":"","name":"GDZCZY_XM17","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM18","defaultValue":"","name":"GDZCZY_XM18","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM19","defaultValue":"","name":"GDZCZY_XM19","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM20","defaultValue":"","name":"GDZCZY_XM20","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM21","defaultValue":"","name":"GDZCZY_XM21","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM22","defaultValue":"","name":"GDZCZY_XM22","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM23","defaultValue":"","name":"GDZCZY_XM23","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM24","defaultValue":"","name":"GDZCZY_XM24","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM25","defaultValue":"","name":"GDZCZY_XM25","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM26","defaultValue":"","name":"GDZCZY_XM26","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM27","defaultValue":"","name":"GDZCZY_XM27","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM28","defaultValue":"","name":"GDZCZY_XM28","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM29","defaultValue":"","name":"GDZCZY_XM29","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM30","defaultValue":"","name":"GDZCZY_XM30","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM31","defaultValue":"","name":"GDZCZY_XM31","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM32","defaultValue":"","name":"GDZCZY_XM32","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM33","defaultValue":"","name":"GDZCZY_XM33","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM34","defaultValue":"","name":"GDZCZY_XM34","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM35","defaultValue":"","name":"GDZCZY_XM35","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM36","defaultValue":"","name":"GDZCZY_XM36","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM37","defaultValue":"","name":"GDZCZY_XM37","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM38","defaultValue":"","name":"GDZCZY_XM38","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM39","defaultValue":"","name":"GDZCZY_XM39","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM40","defaultValue":"","name":"GDZCZY_XM40","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ01","defaultValue":0,"name":"GDZCZY_SJ01","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ02","defaultValue":0,"name":"GDZCZY_SJ02","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ03","defaultValue":0,"name":"GDZCZY_SJ03","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ04","defaultValue":0,"name":"GDZCZY_SJ04","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ05","defaultValue":0,"name":"GDZCZY_SJ05","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ06","defaultValue":0,"name":"GDZCZY_SJ06","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ07","defaultValue":0,"name":"GDZCZY_SJ07","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ08","defaultValue":0,"name":"GDZCZY_SJ08","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ09","defaultValue":0,"name":"GDZCZY_SJ09","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SJ10","defaultValue":0,"name":"GDZCZY_SJ10","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_SFZC","defaultValue":"","name":"GDZCZY_SFZC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_SHBH","defaultValue":"","name":"GDZCZY_SHBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_BNRZZJ","defaultValue":0,"name":"GDZCZY_BNRZZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JTCZ","defaultValue":"","name":"GDZCZY_JTCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_GRRQ","defaultValue":"","name":"GDZCZY_GRRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_QYRQ","defaultValue":"","name":"GDZCZY_QYRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_YRZYF","defaultValue":0,"name":"GDZCZY_YRZYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_KMBH","defaultValue":"","name":"GDZCZY_KMBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_KMBHMC","defaultValue":"","name":"GDZCZY_KMBHMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM01MC","defaultValue":"","name":"GDZCZY_XM01MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM02MC","defaultValue":"","name":"GDZCZY_XM02MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM03MC","defaultValue":"","name":"GDZCZY_XM03MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM04MC","defaultValue":"","name":"GDZCZY_XM04MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM05MC","defaultValue":"","name":"GDZCZY_XM05MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM06MC","defaultValue":"","name":"GDZCZY_XM06MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM07MC","defaultValue":"","name":"GDZCZY_XM07MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM08MC","defaultValue":"","name":"GDZCZY_XM08MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM09MC","defaultValue":"","name":"GDZCZY_XM09MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM10MC","defaultValue":"","name":"GDZCZY_XM10MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM11MC","defaultValue":"","name":"GDZCZY_XM11MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM12MC","defaultValue":"","name":"GDZCZY_XM12MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM13MC","defaultValue":"","name":"GDZCZY_XM13MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM14MC","defaultValue":"","name":"GDZCZY_XM14MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM15MC","defaultValue":"","name":"GDZCZY_XM15MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM16MC","defaultValue":"","name":"GDZCZY_XM16MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM17MC","defaultValue":"","name":"GDZCZY_XM17MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM18MC","defaultValue":"","name":"GDZCZY_XM18MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM19MC","defaultValue":"","name":"GDZCZY_XM19MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM20MC","defaultValue":"","name":"GDZCZY_XM20MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM21MC","defaultValue":"","name":"GDZCZY_XM21MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM22MC","defaultValue":"","name":"GDZCZY_XM22MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM23MC","defaultValue":"","name":"GDZCZY_XM23MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM24MC","defaultValue":"","name":"GDZCZY_XM24MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM25MC","defaultValue":"","name":"GDZCZY_XM25MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM26MC","defaultValue":"","name":"GDZCZY_XM26MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM27MC","defaultValue":"","name":"GDZCZY_XM27MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM28MC","defaultValue":"","name":"GDZCZY_XM28MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM29MC","defaultValue":"","name":"GDZCZY_XM29MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM30MC","defaultValue":"","name":"GDZCZY_XM30MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM31MC","defaultValue":"","name":"GDZCZY_XM31MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM32MC","defaultValue":"","name":"GDZCZY_XM32MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM33MC","defaultValue":"","name":"GDZCZY_XM33MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM34MC","defaultValue":"","name":"GDZCZY_XM34MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM35MC","defaultValue":"","name":"GDZCZY_XM35MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM36MC","defaultValue":"","name":"GDZCZY_XM36MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM37MC","defaultValue":"","name":"GDZCZY_XM37MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM38MC","defaultValue":"","name":"GDZCZY_XM38MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM39MC","defaultValue":"","name":"GDZCZY_XM39MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_XM40MC","defaultValue":"","name":"GDZCZY_XM40MC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_STATE","defaultValue":"","name":"GDZCZY_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_LCSL","defaultValue":"","name":"GDZCZY_LCSL","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_FSSCFLAG","defaultValue":"","name":"GDZCZY_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDZCZY_ID","tableName":"GDZCZY","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/5/22 15:07:15]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/



appModule.view('IFrameChooseAsset',['$stateMachine', '$context', function($stateMachine, appContext){
		return {
				render: function () {
				},

				initWidgets: function () {
						$.parser.parse($('#IFrameChooseAsset'));
				},


				onInitializing: function () {
				},

				afterWidgetsInit: function () {
var self = this;
this.stateMachine = $stateMachine({
context: this.context,
preventAutoInit:true,
viewId:"IFrameChooseAsset",
beginTransit: function(transitAction) {
		self.stateMachine.current().SuspendAction(transitAction);
},
endTransit: function(transitAction) {
		self.stateMachine.current().ResumeAction(transitAction);
},
			 Actions: [
						{ ID: 'SaveCreate', Name: '保存并新增', Description: '保存后执行新增动作' },
						{ ID: 'Cancel', Name: '取消录入', Description: '取消录入动作' },
						{ ID: 'Create', Name: '新增数据', Description: '树状态字典的增加同级或单据上新增动作' },
						{ ID: 'CreateSub', Name: '新增下级数据', Description: '树状态字典的增加下级动作' },
						{ ID: 'Delete', Name: '删除数据', Description: '删除数据' },
						{ ID: 'InUpt', Name: '内部修改', Description: '新增行或删除行动作' },
						{ ID: 'Modify', Name: '开始编辑', Description: '修改动作' },
						{ ID: 'Save', Name: '保存数据', Description: '保存动作' },
						{ ID: 'SaveCreate_compatible', Name: '保存并新增', Description: '保存后执行新增动作（兼容历史版本）' },
						{ ID: 'View', Name: '查看', Description: '查看动作' }
			],
			States: [
						{
									ID: 'Start', Name: '初始'
						}
,
						{
									ID: 'Creating', Name: '新增'
						}
,
						{
									ID: 'CreatingSub', Name: '新增下级'
						}
,
						{
									ID: 'Modifying', Name: '修改'
						}
,
						{
									ID: 'End', Name: '结束'
						}

			],
			Transits: [
						{ CurrentState: 'Creating', Condition: '', Action: 'SaveCreate', Nextstatus: 'Creating' },
						{ CurrentState: 'Creating', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Creating', Condition: '', Action: 'InUpt', Nextstatus: 'Creating' },
						{ CurrentState: 'Creating', Condition: '', Action: 'Save', Nextstatus: 'Creating' },
						{ CurrentState: 'Creating', Condition: '', Action: 'SaveCreate_compatible', Nextstatus: 'Creating' },
						{ CurrentState: 'Start', Condition: '', Action: 'Create', Nextstatus: 'Creating' },
						{ CurrentState: 'Start', Condition: '', Action: 'CreateSub', Nextstatus: 'CreatingSub' },
						{ CurrentState: 'Start', Condition: '', Action: 'Delete', Nextstatus: 'Start' },
						{ CurrentState: 'Start', Condition: '', Action: 'Modify', Nextstatus: 'Modifying' },
						{ CurrentState: 'Start', Condition: '', Action: 'View', Nextstatus: 'Start' },
						{ CurrentState: 'CreatingSub', Condition: '', Action: 'SaveCreate_compatible', Nextstatus: 'CreatingSub' },
						{ CurrentState: 'CreatingSub', Condition: '', Action: 'SaveCreate', Nextstatus: 'CreatingSub' },
						{ CurrentState: 'CreatingSub', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'CreatingSub', Condition: '', Action: 'InUpt', Nextstatus: 'CreatingSub' },
						{ CurrentState: 'CreatingSub', Condition: '', Action: 'Save', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'SaveCreate_compatible', Nextstatus: 'Creating' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'InUpt', Nextstatus: 'Modifying' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'Save', Nextstatus: 'Start' },
						{ CurrentState: 'Modifying', Condition: '', Action: 'SaveCreate', Nextstatus: 'Creating' }
]});
						$('#9296bf7f-ee38-4888-87ca-3a706f112d23').on('click',this.proxy('OK',function () {
								this.transitInvoke([ {target: 'GDCopyChooseAssetController', methodName: 'OK', params: []}])
						},this));


						$('#94a9846c-c840-4dc7-bc93-4b8570e50326').on('click',this.proxy('Cancel',function () {
								this.transitInvoke([ {target: 'GDCopyChooseAssetController', methodName: 'Cancel', params: []}])
						},this));


$('#presetBar').buttongroup();

						this.stateMachine.init();

},
				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWeb_Fictitious');
						this.context.setParam('formID', '30fa0c07-570d-4b41-af44-d81b2f77f5b9');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						self.transitInvoke([ {target: 'GDCopyChooseAssetController', methodName: 'ChooseAssetFormload', params: []}]);
$('#XSmartDictLookup1').adplookupbox({ 
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
CreateDateTime :[2018/5/22 15:07:16]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


						 var Dict_XSelector1GDZCZY_CWQR = [{label: '是', value: '1'},{label: '否', value: '0'}];
						 var Dict_XSelector1 = [{label: '全部', value: '2'},{label: '未确认', value: '0'},{label: '已确认', value: '1'}];

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
				add: {transit:'add', params:['新增资产卡片','/cwbase/web/FI/GD/BizHandle/runtime/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?','ZCKPADD','{"actionName":"create"}'], methodInfo:{target:'ListController', methodName:'add'} },
				edit: {transit:'edit', params:['编辑资产卡片','/cwbase/web/FI/GD/BizHandle/runtime/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?dataId={data:DM_GDWeb_AssetCard_ListInstance.GDZCZY.GDZCZY_ID}','ZCKPEDIT{data:DM_GDWeb_AssetCard_ListInstance.GDZCZY.GDZCZY_ZCBH}','{"actionName":"edit"}'], methodInfo:{target:'ListController', methodName:'edit'} },
				load: {transit:'', params:['',''], methodInfo:{target:'ListController', methodName:'load'} },
				close: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'close'} },
				formLoad: {transit:'', params:[], methodInfo:{target:'ListController', methodName:'formLoad'} },
				check: {transit:'check', params:['查看资产卡片','/cwbase/web/FI/GD/BizHandle/runtime/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?dataId={data:DM_GDWeb_AssetCard_ListInstance.GDZCZY.GDZCZY_ID}','ZCKPCK{data:DM_GDWeb_AssetCard_ListInstance.GDZCZY.GDZCZY_ZCBH}',''], methodInfo:{target:'ListController', methodName:'check'} },
				remove: {transit:'remove', params:[], methodInfo:{target:'ListController', methodName:'remove'} },
				onSelectedChanged: {transit:'', params:[], methodInfo:{target:'ListController', methodName:'onSelectedChanged'} },
				loadDraftList: {transit:'', params:['','','','',''], methodInfo:{target:'DraftController', methodName:'loadDraftList'} },
				showDraftList: {transit:'', params:[''], methodInfo:{target:'DraftController', methodName:'showDraftList'} },
				serverFilter: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'serverFilter'} },
				Formload: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'Formload'} },
				AddAssetCard: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'AddAssetCard'} },
				EditAssetCard: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'EditAssetCard'} },
				RemoveAssetCard: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'RemoveAssetCard'} },
				RefreshData: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'load'} },
				DownLoadModel: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'DownLoadModel'} },
				QueryAssetCard: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'QueryAssetCard'} },
				AccessoryEquipment: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'AccessoryEquipment'} },
				AccessoryFile: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'AccessoryFile'} },
				CopyAssetCard: {transit:'', params:[], methodInfo:{target:'GDAssetAddList', methodName:'CopyAssetCard'} }
			});

			$('#143e00b9-dd15-483d-99b9-0dc6230f5401').on('click', this.eventAgent(['QueryAssetCard'], this, true));
			$('#a8267538-24f3-4244-8db3-e818bb959171').on('click', this.eventAgent(['AddAssetCard'], this, true));
			$('#cae41ca4-ab84-4a4b-9876-2e766620a44a').on('click', this.eventAgent(['EditAssetCard'], this, true));
			$('#ea18bd13-84fe-4d40-9923-91f601e17cc7').on('click', this.eventAgent(['RemoveAssetCard'], this, true));
			$('#c82cc6b8-5d9f-433b-bcfe-12e4afa5ff08').on('click', this.eventAgent(['AccessoryEquipment'], this, true));
			$('#14d58020-af3c-472a-aa04-14585358e30d').on('click', this.eventAgent(['AccessoryFile'], this, true));
			$('#44f2cbbe-6014-4885-b83b-7e1326b2f66b').on('click', this.eventAgent(['close'], this, true));
$('#presetBar').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWeb_AssetCard');
						this.context.setParam('formID', 'd41b6916-b921-4221-a474-4a9932c80e66');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'GDAssetAddList',methodName:'load',params:[arg]},{target:'DraftController',methodName:'loadDraftList',params:['','','','','',arg]},]);
						}
						this.context.on('refreshData',function(event,arg){
								return refreshData(arg);
						});
						self.transitInvoke([ {target: 'ListBaseController', methodName: 'serverFilter', params: []}, {target: 'GDAssetAddList', methodName: 'Formload', params: []}]);
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

						if(actionFn){
							actionFn();
						}
				}
		}
}])





