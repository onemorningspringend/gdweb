window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2018/9/18 11:01:35]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GDWeb_AssetAllocateWeb','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: 'd7e53e60-cf7a-4b61-af79-4b5501f65ca3',
				defaultInstance:'DM_GDWeb_AssetAllocateWeb_ListInstance',
				primaryKey: 'GDZCDB_ID',
				dataUri: 'FormDataAccess.Web',
				isUseAccessoryMgr:0,
				enableFetchOptimization: false,
				enableExtendBizComponent: true,
				enableConflictControl: false,
				layerInfo: {},
				extend: {"EntityExtend":{},"DataObject":{}},
				createIdAtNew: false,
				enableDefaultLines: {
						'GDZCDB':false,
						'GDZCZY':false
				},
				workInstanceInfo: {tableName:'GDZCDB', fieldName:'GDZCDB_LCSL'},
				foreignKey:[["GDZCZY","GDZCZY_DWBH"]],
				relations:[
						{parentTable:"GDZCDB", parentColumn:"GDZCDB_DCDWBH", childTable:"GDZCZY", childColumn:"GDZCZY_DWBH"},
						{parentTable:"GDZCDB", parentColumn:"GDZCDB_ID", childTable:"GDZCZY", childColumn:"GDZCZY_ID"}
				],
				instances: {
						'DM_GDWeb_AssetAllocateWeb_ListInstance': {
								view: '3',
								dataSourceName:'DM_GDWeb_AssetAllocateWeb_ListInstance',
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



schema['d7e53e60-cf7a-4b61-af79-4b5501f65ca3']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDZCDB_ID","defaultValue":"","name":"GDZCDB_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DWBH","defaultValue":"","name":"GDZCDB_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DWBH_LSBZDW_DWMC","defaultValue":"","name":"GDZCDB_DWBH_LSBZDW_DWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_KJQJ","defaultValue":"","name":"GDZCDB_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DBRQ","defaultValue":"","name":"GDZCDB_DBRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCDWBH","defaultValue":"","name":"GDZCDB_DCDWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCDWBH_LSBZDW_DWMC","defaultValue":"","name":"GDZCDB_DCDWBH_LSBZDW_DWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRDWBH","defaultValue":"","name":"GDZCDB_DRDWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRDWBH_LSBZDW_DWMC","defaultValue":"","name":"GDZCDB_DRDWBH_LSBZDW_DWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCZCBH","defaultValue":"","name":"GDZCDB_DCZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDZCDB_DCZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZCBH","defaultValue":"","name":"GDZCDB_DRZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDZCDB_DRZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DBSL","defaultValue":0,"name":"GDZCDB_DBSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DBYZ","defaultValue":0,"name":"GDZCDB_DBYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DRYZ","defaultValue":0,"name":"GDZCDB_DRYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_LJZJ","defaultValue":0,"name":"GDZCDB_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLJZJ","defaultValue":0,"name":"GDZCDB_DRLJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DCJCZ","defaultValue":0,"name":"GDZCDB_DCJCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DRJCZ","defaultValue":0,"name":"GDZCDB_DRJCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_ZJYF","defaultValue":0,"name":"GDZCDB_ZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZJYF","defaultValue":0,"name":"GDZCDB_DRZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCDB_ZJBH","defaultValue":"","name":"GDZCDB_ZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ZJBH_GDZJFF_ZJMC","defaultValue":"","name":"GDZCDB_ZJBH_GDZJFF_ZJMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZJBH","defaultValue":"","name":"GDZCDB_DRZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZJBH_GDZJFF_ZJMC","defaultValue":"","name":"GDZCDB_DRZJBH_GDZJFF_ZJMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_SPBH","defaultValue":"","name":"GDZCDB_SPBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ZY","defaultValue":"","name":"GDZCDB_ZY","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DBFY","defaultValue":0,"name":"GDZCDB_DBFY","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DCGLQR","defaultValue":"","name":"GDZCDB_DCGLQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRGLQR","defaultValue":"","name":"GDZCDB_DRGLQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCJBR","defaultValue":"","name":"GDZCDB_DCJBR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRJBR","defaultValue":"","name":"GDZCDB_DRJBR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCCWQR","defaultValue":"","name":"GDZCDB_DCCWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRCWQR","defaultValue":"","name":"GDZCDB_DRCWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_WCF","defaultValue":"","name":"GDZCDB_WCF","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ZBJBR","defaultValue":"","name":"GDZCDB_ZBJBR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRBM","defaultValue":"","name":"GDZCDB_DRBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRBM_LSBMZD_BMMC","defaultValue":"","name":"GDZCDB_DRBM_LSBMZD_BMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ADDR","defaultValue":"","name":"GDZCDB_ADDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_LXR","defaultValue":"","name":"GDZCDB_LXR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_TEL","defaultValue":"","name":"GDZCDB_TEL","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_POST","defaultValue":"","name":"GDZCDB_POST","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRDD","defaultValue":"","name":"GDZCDB_DRDD","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_SPH","defaultValue":"","name":"GDZCDB_SPH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_FJ","defaultValue":"","name":"GDZCDB_FJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_BGXH","defaultValue":0,"name":"GDZCDB_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCDB_DBGZL","defaultValue":0,"name":"GDZCDB_DBGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DBJZZB","defaultValue":0,"name":"GDZCDB_DBJZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DCZCID","defaultValue":"","name":"GDZCDB_DCZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZCID","defaultValue":"","name":"GDZCDB_DRZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLB","defaultValue":"","name":"GDZCDB_DRLB","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLB_GDZCLB_LBMC","defaultValue":"","name":"GDZCDB_DRLB_GDZCLB_LBMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_FLID","defaultValue":"","name":"GDZCDB_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_OPPER","defaultValue":"","name":"GDZCDB_OPPER","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ZDR","defaultValue":"","name":"GDZCDB_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLY","defaultValue":"","name":"GDZCDB_DRLY","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLY_GDLYZD_LYMC","defaultValue":"","name":"GDZCDB_DRLY_GDLYZD_LYMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_CWQR","defaultValue":"","name":"GDZCDB_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_STATE","defaultValue":"","name":"GDZCDB_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_LCSL","defaultValue":"","name":"GDZCDB_LCSL","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_FSSCFLAG","defaultValue":"","name":"GDZCDB_FSSCFLAG","type":"String","unique":false}],"primaryKey":"GDZCDB_ID","tableName":"GDZCDB","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDZCDB_ID","defaultValue":"","name":"GDZCDB_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DWBH","defaultValue":"","name":"GDZCDB_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DWBH_LSBZDW_DWMC","defaultValue":"","name":"GDZCDB_DWBH_LSBZDW_DWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_KJQJ","defaultValue":"","name":"GDZCDB_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DBRQ","defaultValue":"","name":"GDZCDB_DBRQ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCDWBH","defaultValue":"","name":"GDZCDB_DCDWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCDWBH_LSBZDW_DWMC","defaultValue":"","name":"GDZCDB_DCDWBH_LSBZDW_DWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRDWBH","defaultValue":"","name":"GDZCDB_DRDWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRDWBH_LSBZDW_DWMC","defaultValue":"","name":"GDZCDB_DRDWBH_LSBZDW_DWMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCZCBH","defaultValue":"","name":"GDZCDB_DCZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDZCDB_DCZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZCBH","defaultValue":"","name":"GDZCDB_DRZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDZCDB_DRZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DBSL","defaultValue":0,"name":"GDZCDB_DBSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DBYZ","defaultValue":0,"name":"GDZCDB_DBYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DRYZ","defaultValue":0,"name":"GDZCDB_DRYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_LJZJ","defaultValue":0,"name":"GDZCDB_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLJZJ","defaultValue":0,"name":"GDZCDB_DRLJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DCJCZ","defaultValue":0,"name":"GDZCDB_DCJCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DRJCZ","defaultValue":0,"name":"GDZCDB_DRJCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_ZJYF","defaultValue":0,"name":"GDZCDB_ZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZJYF","defaultValue":0,"name":"GDZCDB_DRZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCDB_ZJBH","defaultValue":"","name":"GDZCDB_ZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ZJBH_GDZJFF_ZJMC","defaultValue":"","name":"GDZCDB_ZJBH_GDZJFF_ZJMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZJBH","defaultValue":"","name":"GDZCDB_DRZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZJBH_GDZJFF_ZJMC","defaultValue":"","name":"GDZCDB_DRZJBH_GDZJFF_ZJMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_SPBH","defaultValue":"","name":"GDZCDB_SPBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ZY","defaultValue":"","name":"GDZCDB_ZY","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DBFY","defaultValue":0,"name":"GDZCDB_DBFY","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DCGLQR","defaultValue":"","name":"GDZCDB_DCGLQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRGLQR","defaultValue":"","name":"GDZCDB_DRGLQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCJBR","defaultValue":"","name":"GDZCDB_DCJBR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRJBR","defaultValue":"","name":"GDZCDB_DRJBR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DCCWQR","defaultValue":"","name":"GDZCDB_DCCWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRCWQR","defaultValue":"","name":"GDZCDB_DRCWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_WCF","defaultValue":"","name":"GDZCDB_WCF","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ZBJBR","defaultValue":"","name":"GDZCDB_ZBJBR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRBM","defaultValue":"","name":"GDZCDB_DRBM","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRBM_LSBMZD_BMMC","defaultValue":"","name":"GDZCDB_DRBM_LSBMZD_BMMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ADDR","defaultValue":"","name":"GDZCDB_ADDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_LXR","defaultValue":"","name":"GDZCDB_LXR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_TEL","defaultValue":"","name":"GDZCDB_TEL","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_POST","defaultValue":"","name":"GDZCDB_POST","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRDD","defaultValue":"","name":"GDZCDB_DRDD","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_SPH","defaultValue":"","name":"GDZCDB_SPH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_FJ","defaultValue":"","name":"GDZCDB_FJ","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_BGXH","defaultValue":0,"name":"GDZCDB_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCDB_DBGZL","defaultValue":0,"name":"GDZCDB_DBGZL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DBJZZB","defaultValue":0,"name":"GDZCDB_DBJZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCDB_DCZCID","defaultValue":"","name":"GDZCDB_DCZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRZCID","defaultValue":"","name":"GDZCDB_DRZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLB","defaultValue":"","name":"GDZCDB_DRLB","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLB_GDZCLB_LBMC","defaultValue":"","name":"GDZCDB_DRLB_GDZCLB_LBMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_FLID","defaultValue":"","name":"GDZCDB_FLID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_OPPER","defaultValue":"","name":"GDZCDB_OPPER","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_ZDR","defaultValue":"","name":"GDZCDB_ZDR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLY","defaultValue":"","name":"GDZCDB_DRLY","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_DRLY_GDLYZD_LYMC","defaultValue":"","name":"GDZCDB_DRLY_GDLYZD_LYMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_CWQR","defaultValue":"","name":"GDZCDB_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_STATE","defaultValue":"","name":"GDZCDB_STATE","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_LCSL","defaultValue":"","name":"GDZCDB_LCSL","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_FSSCFLAG","defaultValue":"","name":"GDZCDB_FSSCFLAG","type":"String","unique":false},{"allowNull":false,"caption":"GDZCDB_Id_0","defaultValue":0,"name":"GDZCDB_Id_0","type":"Int32","unique":true}],"primaryKey":"GDZCDB_ID","tableName":"GDZCDB","foreignKey":null},{"columns":[{"allowNull":false,"caption":"GDZCZYList_Id","defaultValue":0,"name":"GDZCZYList_Id","type":"Int32","unique":true},{"allowNull":true,"caption":"GDZCDB_Id_0","defaultValue":0,"name":"GDZCDB_Id_0","type":"Int32","unique":false}],"primaryKey":null,"tableName":"GDZCZYList","foreignKey":null},{"columns":[{"allowNull":false,"caption":"GDZCZY_ID","defaultValue":"","name":"GDZCZY_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DWBH","defaultValue":"","name":"GDZCZY_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCBH","defaultValue":"","name":"GDZCZY_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCMC","defaultValue":"","name":"GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCSL","defaultValue":0,"name":"GDZCZY_ZCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DCSL","defaultValue":0,"name":"GDZCZY_DCSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_BGXH","defaultValue":0,"name":"GDZCZY_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_DBSL","defaultValue":0,"name":"GDZCZY_DBSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DCZJBH","defaultValue":"","name":"GDZCZY_DCZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DCZJBH_GDZJFF_ZJMC","defaultValue":"","name":"GDZCZY_DCZJBH_GDZJFF_ZJMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DRZJBH","defaultValue":"","name":"GDZCZY_DRZJBH","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DRZJBH_GDZJFF_ZJMC","defaultValue":"","name":"GDZCZY_DRZJBH_GDZJFF_ZJMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DCZJYF","defaultValue":0,"name":"GDZCZY_DCZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_DRZJYF","defaultValue":0,"name":"GDZCZY_DRZJYF","type":"Int64","unique":false},{"allowNull":false,"caption":"GDZCZY_DBYZ","defaultValue":0,"name":"GDZCZY_DBYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DRYZ","defaultValue":0,"name":"GDZCZY_DRYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DCLJZJ","defaultValue":0,"name":"GDZCZY_DCLJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DRLJZJ","defaultValue":0,"name":"GDZCZY_DRLJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DCJCZ","defaultValue":0,"name":"GDZCZY_DCJCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DRJCZ","defaultValue":0,"name":"GDZCZY_DRJCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DRLB","defaultValue":"","name":"GDZCZY_DRLB","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DRLB_GDZCLB_LBMC","defaultValue":"","name":"GDZCZY_DRLB_GDZCLB_LBMC","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_ZCYZ","defaultValue":0,"name":"GDZCZY_ZCYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_LJZJ","defaultValue":0,"name":"GDZCZY_LJZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_JCZ","defaultValue":0,"name":"GDZCZY_JCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDZCZY_DRLY","defaultValue":"","name":"GDZCZY_DRLY","type":"String","unique":false},{"allowNull":false,"caption":"GDZCZY_DRLY_GDLYZD_LYMC","defaultValue":"","name":"GDZCZY_DRLY_GDLYZD_LYMC","type":"String","unique":false},{"allowNull":true,"caption":"GDZCZYList_Id","defaultValue":0,"name":"GDZCZYList_Id","type":"Int32","unique":false}],"primaryKey":"GDZCZY_ID","tableName":"GDZCZY","foreignKey":"GDZCZY_DWBH"}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2018/9/18 11:01:35]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


						 var Dict_XSelector1GDZCDB_CWQR = [{label: '是', value: '1'},{label: '否', value: '0'}];
						 var Dict_XSelector1GDZCDB_DCCWQR = [{label: '是', value: '1'},{label: '否', value: '0'}];
						 var Dict_XSelector1GDZCDB_DRCWQR = [{label: '是', value: '1'},{label: '否', value: '0'}];

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
				Formload: {transit:'', params:[], methodInfo:{target:'GDWebAllocationController', methodName:'Formload'} },
				AllocateCreate: {transit:'', params:[], methodInfo:{target:'GDWebAllocationController', methodName:'AllocateCreate'} },
				AllocateEdit: {transit:'', params:[], methodInfo:{target:'GDWebAllocationController', methodName:'AllocateEdit'} },
				AllocateDelete: {transit:'', params:[], methodInfo:{target:'GDWebAllocationController', methodName:'AllocateDelete'} },
				HBConfirm: {transit:'', params:['1'], methodInfo:{target:'GDWebAllocationController', methodName:'HBConfirm'} },
				UNHBConfirm: {transit:'', params:['0'], methodInfo:{target:'GDWebAllocationController', methodName:'HBConfirm'} },
				printList: {transit:'', params:['',''], methodInfo:{target:'PrintController', methodName:'printList'} },
				printListWithFormatID1: {transit:'', params:['7238c1be-a009-43b2-a561-ec8cb942f023','',''], methodInfo:{target:'PrintController', methodName:'printListWithFormatID'} }
			});

			$('#a1e94e5a-48fe-4a7d-8924-afe04d934e73').on('click', this.eventAgent(['AllocateCreate'], this, true));
						$(document).bind('keydown','Alt+Ctrl+A',function(){ 

									$('#a1e94e5a-48fe-4a7d-8924-afe04d934e73').focus().click();
									return false;
									});
			$('#d03119c1-9197-4357-bed1-8d9e5e46e45c').on('click', this.eventAgent(['AllocateEdit'], this, true));
						$(document).bind('keydown','Alt+Ctrl+E',function(){ 

									$('#d03119c1-9197-4357-bed1-8d9e5e46e45c').focus().click();
									return false;
									});
			$('#d82d3c71-53be-4931-b762-90c366204fc6').on('click', this.eventAgent(['AllocateDelete'], this, true));
						$(document).bind('keydown','Alt+Ctrl+D',function(){ 

									$('#d82d3c71-53be-4931-b762-90c366204fc6').focus().click();
									return false;
									});
			$('#c5a2c0fd-28ef-4c77-a506-38ae4916e053').on('click', this.eventAgent(['close'], this, true));
						$(document).bind('keydown','Alt+Ctrl+X',function(){ 

									$('#c5a2c0fd-28ef-4c77-a506-38ae4916e053').focus().click();
									return false;
									});
			$('#2dad43f2-13b2-43bc-897a-7e3b071f0fec').on('click', this.eventAgent(['HBConfirm'], this, true));
						$(document).bind('keydown','Alt+Ctrl+Q',function(){ 

									$('#2dad43f2-13b2-43bc-897a-7e3b071f0fec').focus().click();
									return false;
									});
			$('#bc361917-9d91-4378-9cb4-007308330f96').on('click', this.eventAgent(['UNHBConfirm'], this, true));
						$(document).bind('keydown','Alt+Ctrl+U',function(){ 

									$('#bc361917-9d91-4378-9cb4-007308330f96').focus().click();
									return false;
									});
			$('#XDataGridDBList').on('onSelectDataChanged', this.eventAgent(['onSelectedChanged'], this, true));
$('#presetBar').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GDWeb_AssetAllocateWeb');
						this.context.setParam('formID', '8bee53ab-2992-44ed-9430-216b709bd2dd');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'GDWebAllocationController',methodName:'Formload',params:[arg]},]);
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

						if(actionFn){
							actionFn();
						}
				}
		}
}])





