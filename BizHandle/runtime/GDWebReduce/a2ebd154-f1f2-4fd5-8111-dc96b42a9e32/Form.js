window['schema'] = window['schema'] || {};

/*
GSP Mobile RunTime Models Script
Auto Created by GSP_ADP_Form_UIEnginer
CreateDateTime :[2017/12/12 18:13:12]
If you have any questions, Please contact ADP development team or Mail: zhushy@inspur.com !
*/


appModule.model('Instance_DM_GD_ReduceSingleTable','GSPModelExtend', ['$dataServiceProxy', function($dataServiceProxy){
		return {
				dataModelID: '4211874d-e299-46b3-8f56-9ee81dbc4d0c',
				defaultInstance:'DM_GD_ReduceSingleTable_ListInstance',
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


				instances: {
						'DM_GD_ReduceSingleTable_ListInstance': {
								view: '3',
								dataSourceName:'DM_GD_ReduceSingleTable_ListInstance',
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



schema['4211874d-e299-46b3-8f56-9ee81dbc4d0c']=
{
	"3":[{"columns":[{"allowNull":false,"caption":"GDJSZC_ID","defaultValue":"","name":"GDJSZC_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_DWBH","defaultValue":"","name":"GDJSZC_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_KJQJ","defaultValue":"","name":"GDJSZC_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH","defaultValue":"","name":"GDJSZC_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDJSZC_ZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QXBH","defaultValue":"","name":"GDJSZC_QXBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QXBH_GDJSYY_QXMC","defaultValue":"","name":"GDJSZC_QXBH_GDJSYY_QXMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZTBH","defaultValue":"","name":"GDJSZC_ZTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZTBH_GDZTZD_ZTMC","defaultValue":"","name":"GDJSZC_ZTBH_GDZTZD_ZTMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_SPFJ","defaultValue":null,"name":"GDJSZC_SPFJ","type":"Byte[]","unique":false},{"allowNull":false,"caption":"GDJSZC_JSRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDJSZC_JSRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDJSZC_JSSL","defaultValue":0,"name":"GDJSZC_JSSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_QLFY","defaultValue":0,"name":"GDJSZC_QLFY","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_BJSL","defaultValue":0,"name":"GDJSZC_BJSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSYZ","defaultValue":0,"name":"GDJSZC_JSYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSZJ","defaultValue":0,"name":"GDJSZC_JSZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSJZ","defaultValue":0,"name":"GDJSZC_JSJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSCZ","defaultValue":0,"name":"GDJSZC_JSCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSGZ","defaultValue":0,"name":"GDJSZC_JSGZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_CWQR","defaultValue":"","name":"GDJSZC_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSDH","defaultValue":"","name":"GDJSZC_JSDH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JDR","defaultValue":"","name":"GDJSZC_JDR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSPZ","defaultValue":"","name":"GDJSZC_JSPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QLPZ","defaultValue":"","name":"GDJSZC_QLPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_BMPZ","defaultValue":"","name":"GDJSZC_BMPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZY","defaultValue":"","name":"GDJSZC_ZY","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_BGXH","defaultValue":0,"name":"GDJSZC_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID","defaultValue":"","name":"GDJSZC_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_IFBF","defaultValue":"","name":"GDJSZC_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQYZ","defaultValue":0,"name":"GDJSZC_JSQYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQSL","defaultValue":0,"name":"GDJSZC_JSQSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQZJ","defaultValue":0,"name":"GDJSZC_JSQZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQGZ","defaultValue":0,"name":"GDJSZC_JSQGZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQJZZB","defaultValue":0,"name":"GDJSZC_JSQJZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"IsSelected","defaultValue":"false","name":"IsSelected","type":"Boolean","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQCZ","defaultValue":0,"name":"GDJSZC_JSQCZ","type":"Decimal","unique":false}],"primaryKey":"GDJSZC_ID","tableName":"GDJSZC","foreignKey":null}],
	"1":[{"columns":[{"allowNull":false,"caption":"GDJSZC_ID","defaultValue":"","name":"GDJSZC_ID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_DWBH","defaultValue":"","name":"GDJSZC_DWBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_KJQJ","defaultValue":"","name":"GDJSZC_KJQJ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH","defaultValue":"","name":"GDJSZC_ZCBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCBH_GDZCZY_ZCMC","defaultValue":"","name":"GDJSZC_ZCBH_GDZCZY_ZCMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QXBH","defaultValue":"","name":"GDJSZC_QXBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QXBH_GDJSYY_QXMC","defaultValue":"","name":"GDJSZC_QXBH_GDJSYY_QXMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZTBH","defaultValue":"","name":"GDJSZC_ZTBH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZTBH_GDZTZD_ZTMC","defaultValue":"","name":"GDJSZC_ZTBH_GDZTZD_ZTMC","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_SPFJ","defaultValue":null,"name":"GDJSZC_SPFJ","type":"Byte[]","unique":false},{"allowNull":false,"caption":"GDJSZC_JSRQ","defaultValue":"0001-01-01T00:00:00+08:00","name":"GDJSZC_JSRQ","type":"DateTime","unique":false},{"allowNull":false,"caption":"GDJSZC_JSSL","defaultValue":0,"name":"GDJSZC_JSSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_QLFY","defaultValue":0,"name":"GDJSZC_QLFY","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_BJSL","defaultValue":0,"name":"GDJSZC_BJSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSYZ","defaultValue":0,"name":"GDJSZC_JSYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSZJ","defaultValue":0,"name":"GDJSZC_JSZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSJZ","defaultValue":0,"name":"GDJSZC_JSJZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSCZ","defaultValue":0,"name":"GDJSZC_JSCZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSGZ","defaultValue":0,"name":"GDJSZC_JSGZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_CWQR","defaultValue":"","name":"GDJSZC_CWQR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSDH","defaultValue":"","name":"GDJSZC_JSDH","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JDR","defaultValue":"","name":"GDJSZC_JDR","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSPZ","defaultValue":"","name":"GDJSZC_JSPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_QLPZ","defaultValue":"","name":"GDJSZC_QLPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_BMPZ","defaultValue":"","name":"GDJSZC_BMPZ","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_ZY","defaultValue":"","name":"GDJSZC_ZY","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_BGXH","defaultValue":0,"name":"GDJSZC_BGXH","type":"Int64","unique":false},{"allowNull":false,"caption":"GDJSZC_ZCID","defaultValue":"","name":"GDJSZC_ZCID","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_IFBF","defaultValue":"","name":"GDJSZC_IFBF","type":"String","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQYZ","defaultValue":0,"name":"GDJSZC_JSQYZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQSL","defaultValue":0,"name":"GDJSZC_JSQSL","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQZJ","defaultValue":0,"name":"GDJSZC_JSQZJ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQGZ","defaultValue":0,"name":"GDJSZC_JSQGZ","type":"Decimal","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQJZZB","defaultValue":0,"name":"GDJSZC_JSQJZZB","type":"Decimal","unique":false},{"allowNull":false,"caption":"IsSelected","defaultValue":"false","name":"IsSelected","type":"Boolean","unique":false},{"allowNull":false,"caption":"GDJSZC_JSQCZ","defaultValue":0,"name":"GDJSZC_JSQCZ","type":"Decimal","unique":false}],"primaryKey":"GDJSZC_ID","tableName":"GDJSZC","foreignKey":null}]
};



/*
GSP Mobile RunTime Page_View Script
Auto Created by GSP_ADP_Form_UIEnginer
Release PageID :[Form1]
CreateDateTime :[2017/12/12 18:13:13]
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
				formLoad: {transit:'', params:[], methodInfo:{target:'ListController', methodName:'formLoad'} },
				check: {transit:'check', params:['','','',''], methodInfo:{target:'ListController', methodName:'check'} },
				remove: {transit:'remove', params:[], methodInfo:{target:'ListController', methodName:'remove'} },
				onSelectedChanged: {transit:'', params:[], methodInfo:{target:'ListController', methodName:'onSelectedChanged'} },
				loadDraftList: {transit:'', params:['','','','',''], methodInfo:{target:'DraftController', methodName:'loadDraftList'} },
				showDraftList: {transit:'', params:[''], methodInfo:{target:'DraftController', methodName:'showDraftList'} },
				serverFilter: {transit:'', params:[], methodInfo:{target:'ListBaseController', methodName:'serverFilter'} },
				BizHandlePub: {transit:'', params:[], methodInfo:{target:'GDWebBizHandlePub', methodName:'BizHandlePub'} },
				FrmRecoverLoad: {transit:'', params:[], methodInfo:{target:'GDWebRecoverController', methodName:'FrmRecoverLoad'} },
				Recover: {transit:'', params:[], methodInfo:{target:'GDWebRecoverController', methodName:'Recover'} },
				DelBak: {transit:'', params:[], methodInfo:{target:'GDWebRecoverController', methodName:'DelBak'} },
				Close: {transit:'', params:[], methodInfo:{target:'GDWebRecoverController', methodName:'Close'} }
			});

			$('#fcb0477b-f29e-4181-958a-d3535d285ca7').on('click', this.eventAgent(['DelBak'], this, true));
						$(document).bind('keydown','Alt+Ctrl+D',function(){ 

									$('#fcb0477b-f29e-4181-958a-d3535d285ca7').focus().click();
									return false;
									});
			$('#3eac493f-8335-4429-bf5e-3b4d460467c0').on('click', this.eventAgent(['Recover'], this, true));
						$(document).bind('keydown','Alt+S',function(){ 

									$('#3eac493f-8335-4429-bf5e-3b4d460467c0').focus().click();
									return false;
									});
			$('#d2136cdb-5297-4081-b42a-d237c3613e90').on('click', this.eventAgent(['Close'], this, true));
						$(document).bind('keydown','Alt+Ctrl+X',function(){ 

									$('#d2136cdb-5297-4081-b42a-d237c3613e90').focus().click();
									return false;
									});
			$('#XDataGrid1').on('onSelectDataChanged', this.eventAgent(['onSelectedChanged'], this, true));
$('#presetBar').buttongroup();

			this.stateMachine.init();
		},

				onInitialized: function () {
						this.context.setParam('defaultModel', 'Instance_DM_GD_ReduceSingleTable');
						this.context.setParam('formID', 'a2ebd154-f1f2-4fd5-8111-dc96b42a9e32');
						var self = this,
							initAction=this.context.getParam('initAction'),
							actionFn = initAction ? this.context.action(initAction) : null;
						function refreshData(arg){
								return self.transitInvoke([{target:'GDWebRecoverController',methodName:'FrmRecoverLoad',params:[arg]},]);
						}
						this.context.on('refreshData',function(event,arg){
								return refreshData(arg);
						});
						refreshData();
						appContext.on('initComplated',function(){
							$('#Form1').trigger('OnLoad');
						});
						if(actionFn){
							actionFn();
						}
				}
		}
}])





