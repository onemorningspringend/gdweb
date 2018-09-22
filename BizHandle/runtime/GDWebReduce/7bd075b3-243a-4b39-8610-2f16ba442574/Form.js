window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/9/21 16:28:54]
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
CreateDateTime :[2018/9/21 16:28:54]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWEB_GDJSZC','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '64f70c26-7ad1-4d91-b55f-0ebcb969ac97',
				defaultInstance:'DM_GDWEB_GDJSZC_CardInstance',
				primaryKey: 'GDJSZC_ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'GDJSZC':false
				},
				workInstanceInfo: {tableName:'GDJSZC', fieldName:'GDJSZC_LCSL'},


				instances: {
						'DM_GDWEB_GDJSZC_CardInstance': {
								view: '1',
								dataSourceName:'DM_GDWEB_GDJSZC_CardInstance',
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



schema['64f70c26-7ad1-4d91-b55f-0ebcb969ac97']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDJSZC_ID","defaultValue":"","name":"GDJSZC_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_DWBH","defaultValue":"","name":"GDJSZC_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_KJQJ","defaultValue":"","name":"GDJSZC_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH","defaultValue":"","name":"GDJSZC_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_DWBH","defaultValue":"","name":"GDJSZC_ZCBH_GDZCCZ_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_ZCBH","defaultValue":"","name":"GDJSZC_ZCBH_GDZCCZ_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_BMSR","defaultValue":0,"name":"GDJSZC_ZCBH_GDZCCZ_BMSR","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_BMRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDJSZC_ZCBH_GDZCCZ_BMRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_QLFY","defaultValue":0,"name":"GDJSZC_ZCBH_GDZCCZ_QLFY","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_QLRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDJSZC_ZCBH_GDZCCZ_QLRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDJSZC_QXBH","defaultValue":"","name":"GDJSZC_QXBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QXBH_GDJSYY_QXMC","defaultValue":"","name":"GDJSZC_QXBH_GDJSYY_QXMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZTBH","defaultValue":"","name":"GDJSZC_ZTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZTBH_GDZTZD_ZTMC","defaultValue":"","name":"GDJSZC_ZTBH_GDZTZD_ZTMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_SPFJ","defaultValue":null,"name":"GDJSZC_SPFJ","type":"Byte[]","unique":false},{"allowNull":false,"caption":"GDJSZC_JSRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDJSZC_JSRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDJSZC_JSSL","defaultValue":0,"name":"GDJSZC_JSSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_QLFY","defaultValue":0,"name":"GDJSZC_QLFY","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_BJSL","defaultValue":0,"name":"GDJSZC_BJSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSYZ","defaultValue":0,"name":"GDJSZC_JSYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSZJ","defaultValue":0,"name":"GDJSZC_JSZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSJZ","defaultValue":0,"name":"GDJSZC_JSJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSCZ","defaultValue":0,"name":"GDJSZC_JSCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSGZ","defaultValue":0,"name":"GDJSZC_JSGZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSDH","defaultValue":"","name":"GDJSZC_JSDH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JDR","defaultValue":"","name":"GDJSZC_JDR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_CWQR","defaultValue":"","name":"GDJSZC_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSPZ","defaultValue":"","name":"GDJSZC_JSPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QLPZ","defaultValue":"","name":"GDJSZC_QLPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_BMPZ","defaultValue":"","name":"GDJSZC_BMPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZY","defaultValue":"","name":"GDJSZC_ZY","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_BGXH","defaultValue":0,"name":"GDJSZC_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID","defaultValue":"","name":"GDJSZC_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_ZCMC","defaultValue":"","name":"GDJSZC_ZCID_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_LBBH","defaultValue":"","name":"GDJSZC_ZCID_GDZCZY_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_ZCSL","defaultValue":0,"name":"GDJSZC_ZCID_GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_JCZL","defaultValue":0,"name":"GDJSZC_ZCID_GDZCZY_JCZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_SBBH","defaultValue":"","name":"GDJSZC_ZCID_GDZCZY_SBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_BGXH","defaultValue":0,"name":"GDJSZC_ZCID_GDZCZY_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_JTCZ","defaultValue":"","name":"GDJSZC_ZCID_GDZCZY_JTCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_IFBF","defaultValue":"","name":"GDJSZC_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQYZ","defaultValue":0,"name":"GDJSZC_JSQYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQSL","defaultValue":0,"name":"GDJSZC_JSQSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQZJ","defaultValue":0,"name":"GDJSZC_JSQZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQGZ","defaultValue":0,"name":"GDJSZC_JSQGZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQJZZB","defaultValue":0,"name":"GDJSZC_JSQJZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"ISCHECKED","defaultValue":"false","name":"ISCHECKED","type":"Boolean","unique":false},{"allowNull":false,"caption":"GDJSZC_FLID","defaultValue":"","name":"GDJSZC_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_OPPER","defaultValue":"","name":"GDJSZC_OPPER","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZDR","defaultValue":"","name":"GDJSZC_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQCZ","defaultValue":0,"name":"GDJSZC_JSQCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_STATE","defaultValue":"","name":"GDJSZC_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_LCSL","defaultValue":"","name":"GDJSZC_LCSL","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_FSSCFLAG","defaultValue":"","name":"GDJSZC_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDJSZC_ID","tableName":"GDJSZC","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDJSZC_ID","defaultValue":"","name":"GDJSZC_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_DWBH","defaultValue":"","name":"GDJSZC_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_KJQJ","defaultValue":"","name":"GDJSZC_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH","defaultValue":"","name":"GDJSZC_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_DWBH","defaultValue":"","name":"GDJSZC_ZCBH_GDZCCZ_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_ZCBH","defaultValue":"","name":"GDJSZC_ZCBH_GDZCCZ_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_BMSR","defaultValue":0,"name":"GDJSZC_ZCBH_GDZCCZ_BMSR","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_BMRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDJSZC_ZCBH_GDZCCZ_BMRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_QLFY","defaultValue":0,"name":"GDJSZC_ZCBH_GDZCCZ_QLFY","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCCZ_QLRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDJSZC_ZCBH_GDZCCZ_QLRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDJSZC_QXBH","defaultValue":"","name":"GDJSZC_QXBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QXBH_GDJSYY_QXMC","defaultValue":"","name":"GDJSZC_QXBH_GDJSYY_QXMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZTBH","defaultValue":"","name":"GDJSZC_ZTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZTBH_GDZTZD_ZTMC","defaultValue":"","name":"GDJSZC_ZTBH_GDZTZD_ZTMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_SPFJ","defaultValue":null,"name":"GDJSZC_SPFJ","type":"Byte[]","unique":false},{"allowNull":false,"caption":"GDJSZC_JSRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDJSZC_JSRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDJSZC_JSSL","defaultValue":0,"name":"GDJSZC_JSSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_QLFY","defaultValue":0,"name":"GDJSZC_QLFY","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_BJSL","defaultValue":0,"name":"GDJSZC_BJSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSYZ","defaultValue":0,"name":"GDJSZC_JSYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSZJ","defaultValue":0,"name":"GDJSZC_JSZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSJZ","defaultValue":0,"name":"GDJSZC_JSJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSCZ","defaultValue":0,"name":"GDJSZC_JSCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSGZ","defaultValue":0,"name":"GDJSZC_JSGZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSDH","defaultValue":"","name":"GDJSZC_JSDH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JDR","defaultValue":"","name":"GDJSZC_JDR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_CWQR","defaultValue":"","name":"GDJSZC_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSPZ","defaultValue":"","name":"GDJSZC_JSPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QLPZ","defaultValue":"","name":"GDJSZC_QLPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_BMPZ","defaultValue":"","name":"GDJSZC_BMPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZY","defaultValue":"","name":"GDJSZC_ZY","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_BGXH","defaultValue":0,"name":"GDJSZC_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID","defaultValue":"","name":"GDJSZC_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_ZCMC","defaultValue":"","name":"GDJSZC_ZCID_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_LBBH","defaultValue":"","name":"GDJSZC_ZCID_GDZCZY_LBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_ZCSL","defaultValue":0,"name":"GDJSZC_ZCID_GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_JCZL","defaultValue":0,"name":"GDJSZC_ZCID_GDZCZY_JCZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_SBBH","defaultValue":"","name":"GDJSZC_ZCID_GDZCZY_SBBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_BGXH","defaultValue":0,"name":"GDJSZC_ZCID_GDZCZY_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID_GDZCZY_JTCZ","defaultValue":"","name":"GDJSZC_ZCID_GDZCZY_JTCZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_IFBF","defaultValue":"","name":"GDJSZC_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQYZ","defaultValue":0,"name":"GDJSZC_JSQYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQSL","defaultValue":0,"name":"GDJSZC_JSQSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQZJ","defaultValue":0,"name":"GDJSZC_JSQZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQGZ","defaultValue":0,"name":"GDJSZC_JSQGZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQJZZB","defaultValue":0,"name":"GDJSZC_JSQJZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"ISCHECKED","defaultValue":"false","name":"ISCHECKED","type":"Boolean","unique":false},{"allowNull":false,"caption":"GDJSZC_FLID","defaultValue":"","name":"GDJSZC_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_OPPER","defaultValue":"","name":"GDJSZC_OPPER","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZDR","defaultValue":"","name":"GDJSZC_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQCZ","defaultValue":0,"name":"GDJSZC_JSQCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_STATE","defaultValue":"","name":"GDJSZC_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_LCSL","defaultValue":"","name":"GDJSZC_LCSL","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_FSSCFLAG","defaultValue":"","name":"GDJSZC_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDJSZC_ID","tableName":"GDJSZC","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/9/21 16:28:54]
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
CreateDateTime :[2018/9/21 16:28:54]
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
						{ ID: 'SaveDraft', Name: '保存草稿', Description: '保存表单数据到草稿箱' },
						{ ID: 'SAC', Name: '保存并新增', Description: '' }
			],
			ControlGroups: [
						{
									ID: 'Edit', Name: '编辑',
									Controls: [
												{ ID: 'Layout1_Main', Name: 'Layout1_Main', Description: ''},
												{ ID: 'Layout1_North', Name: 'Layout1_North', Description: ''}
									]
						},
						{
									ID: 'ReadOnly', Name: '只读',
									Controls: [
												{ ID: 'Layout1_South', Name: 'Layout1_South', Description: ''}
									]
						},
						{
									ID: 'ZCBH', Name: '资产编号',
									Controls: [
												{ ID: 'XSmartDictLookupZCBH', Name: 'XSmartDictLookupZCBH', Description: ''}
									]
						}
			],
			States: [
						{
									ID: 'Start', Name: '初始',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadOnly'},
												{Condition: '', GroupCode: 'ReadOnly', Status: 'ReadOnly'}
									]						}
,
						{
									ID: 'Edit', Name: '编辑',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadAndWrite'},
												{Condition: '', GroupCode: 'ReadOnly', Status: 'ReadOnly'},
												{Condition: '', GroupCode: 'ZCBH', Status: 'ReadOnly'}
									]						}
,
						{
									ID: 'Creat', Name: '新增',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadAndWrite'},
												{Condition: '', GroupCode: 'ReadOnly', Status: 'ReadOnly'},
												{Condition: '', GroupCode: 'ZCBH', Status: 'ReadAndWrite'}
									]						}
,
						{
									ID: 'End', Name: '结束',
									ControlStatus: [
												{Condition: '', GroupCode: 'Edit', Status: 'ReadOnly'},
												{Condition: '', GroupCode: 'ReadOnly', Status: 'ReadOnly'}
									]						}

			],
			Transits: [
						{ CurrentState: 'Start', Condition: '', Action: 'Modify', Nextstatus: 'Edit' },
						{ CurrentState: 'Edit', Condition: '', Action: 'Save', Nextstatus: 'Start' },
						{ CurrentState: 'Edit', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Start', Condition: '', Action: 'Create', Nextstatus: 'Creat' },
						{ CurrentState: 'Edit', Condition: '', Action: 'SAC', Nextstatus: 'Edit' },
						{ CurrentState: 'Edit', Condition: '', Action: 'Upload', Nextstatus: 'Edit' },
						{ CurrentState: 'Creat', Condition: '', Action: 'Cancel', Nextstatus: 'Start' },
						{ CurrentState: 'Creat', Condition: '', Action: 'Save', Nextstatus: 'Start' },
						{ CurrentState: 'Creat', Condition: '', Action: 'SAC', Nextstatus: 'Creat' }
]});
			this.setActionCollection({
				addItem: {transit:'Edit', params:['XDataGrid1'], methodInfo:{target:'CardController', methodName:'addItem'} },
				removeSelect: {transit:'Edit', params:['XDataGrid1'], methodInfo:{target:'CardController', methodName:'removeSelect'} },
				save: {transit:'Save', params:[], methodInfo:{target:'CardController', methodName:'save'} },
				edit: {transit:'Modify', params:[], methodInfo:{target:'CardController', methodName:'edit'} },
				cancel: {transit:'Cancel', params:[], methodInfo:{target:'CardController', methodName:'cancel'} },
				loadData: {transit:'', params:['{formState~dataId}'], methodInfo:{target:'CardController', methodName:'loadData'} },
				addItem1: {transit:'Edit', params:['XDataGrid2'], methodInfo:{target:'CardController', methodName:'addItem'} },
				removeSelect1: {transit:'Edit', params:['XDataGrid2'], methodInfo:{target:'CardController', methodName:'removeSelect'} },
				previous: {transit:'Examine', params:[], methodInfo:{target:'CardController', methodName:'previous'} },
				next: {transit:'Examine', params:[], methodInfo:{target:'CardController', methodName:'next'} },
				formLoaded: {transit:'', params:[''], methodInfo:{target:'CardController', methodName:'formLoad'} },
				printCard: {transit:'', params:[''], methodInfo:{target:'PrintController', methodName:'printCard'} },
				submitApproveBySingle: {transit:'', params:['','','','','',''], methodInfo:{target:'ApproveController', methodName:'submitApproveBySingle'} },
				cancelSubmitApproveBySingle: {transit:'', params:['','',''], methodInfo:{target:'ApproveController', methodName:'cancelSubmitApproveBySingle'} },
				viewApproveProcess: {transit:'', params:[''], methodInfo:{target:'ApproveController', methodName:'viewApproveProcess'} },
				remove: {transit:'Delete', params:[], methodInfo:{target:'CardController', methodName:'remove'} },
				loadPreData: {transit:'', params:[''], methodInfo:{target:'CardController', methodName:'loadPreData'} },
				saveDraft: {transit:'SaveDraft', params:['',''], methodInfo:{target:'CardController', methodName:'saveDraft'} },
				create: {transit:'Create', params:[], methodInfo:{target:'CardController', methodName:'create'} },
				loadDataByUrl: {transit:'', params:['ListID'], methodInfo:{target:'CardController', methodName:'loadDataByUrl'} },
				close: {transit:'', params:[], methodInfo:{target:'CardController', methodName:'close'} },
				BizHandlePub: {transit:'', params:[], methodInfo:{target:'GDWebBizHandlePub', methodName:'BizHandlePub'} },
				ReduceCardFormload: {transit:'', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'ReduceCardFormload'} },
				ReduceCardSave: {transit:'Save', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'ReduceCardSave'} },
				ReduceCardSAC: {transit:'SAC', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'ReduceCardSAC'} },
				ReduceCardCreate: {transit:'Create', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'ReduceCardCreate'} },
				ReduceCardEdit: {transit:'Modify', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'ReduceCardEdit'} },
				JsyzLostFocus: {transit:'', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'JsyzLostFocus'} },
				JsslLostFocus: {transit:'', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'JsslLostFocus'} },
				ReduceCardCancel: {transit:'Cancel', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'ReduceCardCancel'} },
				QueryAssetCard: {transit:'', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'QueryAssetCard'} },
				OpenAcce: {transit:'', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'OpenAcce'} },
				BindExitFunc: {transit:'', params:[], methodInfo:{target:'GDWebReduceCardController', methodName:'BindExitFunc'} }
			});

			$('#edf4f58a-7f34-4a62-8775-45c6892fa19e').on('click', this.eventAgent(['ReduceCardCreate'], this, true));
			$('#693ca883-f732-4825-afcd-c224c52d6ef3').on('click', this.eventAgent(['ReduceCardEdit'], this, true));
			$('#24d34841-0621-4d94-b4b9-c72315a18405').on('click', this.eventAgent(['ReduceCardCancel'], this, true));
			$('#54f1d2f9-7a4e-4a4a-a9c1-41c9963bd96b').on('click', this.eventAgent(['ReduceCardSAC'], this, true));
			$('#9903c63f-bdff-4307-a4aa-ce4ad3013698').on('click', this.eventAgent(['ReduceCardSave'], this, true));
			$('#a8883e94-b0c5-4e80-b524-1cce81add0a7').on('click', this.eventAgent(['close'], this, true));
			$('#XCalculatorJSSL').on('change', this.eventAgent(['JsslLostFocus'], this, true));
			$('#XCalculatorJSYZ').on('change', this.eventAgent(['JsyzLostFocus'], this, true));
$('#Bar1').buttongroup();

			this.stateMachine.init();
			this.extendAction('ReduceCardCreate', 'afterActionExtend', {target:'GDWebReduceCardController', methodName: 'BindExitFunc'});
			this.extendAction('ReduceCardEdit', 'afterActionExtend', {target:'GDWebReduceCardController', methodName: 'BindExitFunc'});
			this.extendAction('ReduceCardFormload', 'afterActionExtend', {target:'GDWebReduceCardController', methodName: 'BindExitFunc'});
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWEB_GDJSZC');
						this.context.setParam('formID', '7bd075b3-243a-4b39-8610-2f16ba442574');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'GDWebReduceCardController',methodName:'ReduceCardFormload',params:[arg]},]);
						}
						this.context.on('refreshData',function(event,arg){
								return refreshData(arg);
						});
						refreshData();
						appContext.on('initComplated',function(){
							$('#Form1').trigger('OnLoad');
						});
$('#XSmartDictLookupZCBH').adplookupbox({ 
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

$('#XSmartDictLookupJSYY').adplookupbox({ 
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

$('#XSmartDictLookupJSZT').adplookupbox({ 
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





