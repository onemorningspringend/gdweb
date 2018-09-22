gsp.module("gsp.app").controller("GDWebPublicFuncController", "ListBaseController",
	function () {

		return {
	    //组织智能帮助条件 左括号 字段 比较符 字段值 值类型 右括号 关系 
		ArrangeCondition:function (pLbracket, pField, pCompare, pFieldValue, pDataType, pRbracket, pRelation) {
var Cond="";
if(pDataType=="String")
{
 Cond='{"Lbracket":"'+pLbracket+'","Compare":" '+pCompare+'","Field":"'+pField+'","DataType":"'+pDataType+'","Value":"'+pFieldValue+'","Rbracket":" '+pRbracket+'","Relation":" '+pRelation+' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":0,"FieldCaption":"","InnerFormula":"","Owner":"","DisplayValue":"'+pFieldValue+'","Description":""}';
}
else if(pDataType=="Integer")
{
 Cond='{"Lbracket":"'+pLbracket+'","Compare":" '+pCompare+'","Field":"'+pField+'","DataType":"'+pDataType+'","Value":"'+pFieldValue+'","Rbracket":" '+pRbracket+'","Relation":" '+pRelation+' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":0,"FieldCaption":"","InnerFormula":"","Owner":"","DisplayValue":"'+pFieldValue+'","Description":""}';
}
else if(pDataType=="Express")
{
Cond='{"Lbracket":"'+pLbracket+'","Compare":" '+pCompare+'","Field":"'+pField+'","DataType":"'+pDataType+'","Value":"'+pFieldValue+'","Rbracket":" '+pRbracket+'","Relation":" '+pRelation+' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":1,"FieldCaption":"","InnerFormula":"","Owner":"","DisplayValue":"'+pFieldValue+'","Description":""}';
}
return Cond;
		},
        //调用服务端
        callWS: function (assName, clsName, funcName, args) {
				//数组化
				if (!(args instanceof Array)) {
					if (!args) { args = []; }
					else { args = [args]; }
				}
				var result = this.context.injector.get("$dataServiceProxy")
					.invokeMethod("Genersoft.FI.ZW.Web.ZWVoucherWebPubCore",
					"CallMethod", [assName, clsName, funcName, args]);
				result.then(
					function (result) {
						if (result && result.data && result.data.js)
							eval(result.data.js);
					}
				);
				return result;
			},
			initLS: function (assName, clsName) {
				assemblyName = assName;
				className = clsName;
			},

			

			//调用需要传state的方法
			callWSEx: function (assName, clsName, funcName, args, compCode, businessDate, indexOfState) {
				wvself = this;
				//ת��Ϊ˽ة
				if (!(args instanceof Array)) {
					if (!args) { args = []; }
					else { args = [args]; }
				}
				var result = this.context.injector.get("$dataServiceProxy")
					.invokeMethod("Genersoft.FI.ZW.Web.ZWVoucherWebPubCore",
					"CallMethodWithState", [assName, clsName, funcName, args, compCode, businessDate, indexOfState]);
				result.then(
					function (result) {
						if (result && result.data && result.data.js)
							eval(result.data.js);
					}
				);
				return result;
			},
			callWSExDSET: function (assName, clsName, funcName, dataset, compCode, businessDate) {
				wvself = this;
				//ת��Ϊ˽ة
				var result = this.context.injector.get("$dataServiceProxy")
					.invokeMethod("Genersoft.FI.ZW.Web.ZWVoucherWebPubCore",
					"CallMethodWithState", [assName, clsName, funcName, dataset, compCode, businessDate]);
				result.then(
					function (result) {
						if (result && result.data && result.data.js)
							eval(result.data.js);
					}
				);
				return result;
			}
			,
			//单位编号加8位业务日期，初始化财务Session
			InitFISession: function (dfd, dwbh, bizDate) {
				var wvself = this;
				var args = [dwbh, bizDate];
				return wvself.callWSEx('Genersoft.FI.ZW.Web', 'Genersoft.FI.ZW.Web.ZWVoucherWebPubCore', 'GetFISessionToClient', args, dwbh, bizDate, 0)//临时代码
					.then(
					function (result) {
						var FISession;
						if (typeof result.data == 'string')
							FISession = JSON.parse(result.data);
						else
							FISession = result.data;

						gsp.application.applicationContext.setParam('FISession', FISession);
						return dfd.resolve();
					});
				
			}
			,
			emptyMethod: function (result) {
				return result;
			},

			doEval: function (strToEval) {
				return eval(strToEval);
			},

			checkValue: function (toCheck, msgWhenFail) {
				if (!toCheck) {
					$.notify.info(msgWhenFail);
				}
				return !!toCheck;
			},


			reject: function (doReject) {
				if (arguments.length === 0 || !!doReject) {
					return $.Deferred().reject();
				}
			},
			smartHelp_Dwbh: function ()//单位帮助
			{
				return $('#' + ZW_VoucherConstants.CompanyHlp);
			}
			,
			lblTitle: function () {
				return $('#' + ZW_VoucherConstants.Label_VoucherType);
			}
			,
			Session: function () {
				return gsp.application.applicationContext.getParam('FISession');
			}
			,
			IsEditing: function () {
				var wvself = this;
				return wvself.context.getParam('isEditByCard');
			}
			,
    	    CurReadOnlyFlag:function(){
                if (this.VoucherHeaderRow() != null)
                    return wvself.VoucherHeaderRow()[ZW_VoucherConstants.XPATH_ZWPZK_ZDBZ].toString();
				return '';
			}
			,
			curAction: function (value) {
				var wvself = this;
				if (value) {
					wvself.context.setParam('curAction');
				}
				else {
					return wvself.context.getParam('curAction');
				}
			}
			,
			CurYear: function () {
				var wvself = this;
				var dataSource = wvself.cardInstance() && wvself.cardInstance().dataSource && wvself.cardInstance().dataSource.tables('ZWPZKOP') && wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem,
					dwbh;
				if (dataSource) {
					dwbh = wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem['ZWPZK_KJND']();
					if (dwbh)
						return dwbh;
				}
				dwbh = this.context.getParam('CurYear');
				if (dwbh)
					return dwbh;
				dwbh = this.context.getParam('PZYEAR');
				if (dwbh)
					return dwbh;
				if (wvself.Session())
					return gsp.application.applicationContext.getParam('FISession').gsKjnd;
				//临时
				return gsp.rtf.context.get('BizDate').substring(0, 4);
			},


			CurCompany: function () {
				var wvself = this;
				var dataSource = wvself.cardInstance() && wvself.cardInstance().dataSource && wvself.cardInstance().dataSource.tables('ZWPZKOP') && wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem,
					dwbh;
				if (dataSource) {
					dwbh = wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem['ZWPZK_DWBH']();
					if (dwbh)
						return dwbh;
				}
				dwbh = this.context.getParam('CurCompany');
				if (dwbh)
					return dwbh;
				dwbh = this.context.getParam('ORGANIZATIONID');
				if (dwbh)
					return dwbh;
				if (wvself.Session())
					return gsp.application.applicationContext.getParam('FISession').gsHsdw;
				//临时
				return wvself.context.getParam('dwbh');

			}
			,
			CurPeriod: function () {
				var wvself = this;
				var dataSource = wvself.cardInstance() && wvself.cardInstance().dataSource && wvself.cardInstance().dataSource.tables('ZWPZKOP') && wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem,
					kjqj;
				if (dataSource) {
					kjqj = wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem['ZWPZK_KJQJ']();
					if (kjqj)
						return kjqj;

					//                			 kjqj=this.context.getParam('CurPeriod');
					//                			if(kjqj)
					//                			return kjqj;
					//                			kjqj=this.context.getParam('PZPERIOD');
					//                			if(kjqj)
					//                			return kjqj;
					//                			if(wvself.Session())
					//                			return gsp.application.applicationContext.getParam('FISession').gsKjqj;
					//                			//临时
					//                			return gsp.rtf.context.get('BizDate').substring(5,7);

				}
				kjqj = this.context.getParam('CurPeriod');
				if (kjqj)
					return kjqj;
				kjqj = this.context.getParam('PZPERIOD');
				if (kjqj)
					return kjqj;
				if (wvself.Session())
					return gsp.application.applicationContext.getParam('FISession').gsKjqj;
				//临时
				return gsp.rtf.context.get('BizDate').substring(5, 7);

			}
			,

			CurDate: function () {
				var wvself = this;
				var dataSource = wvself.cardInstance() && wvself.cardInstance().dataSource && wvself.cardInstance().dataSource.tables('ZWPZKOP') && wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem,
					pzrq;
				if (dataSource) {

					pzrq = wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem['ZWPZK_PZRQ']();
					if (pzrq && pzrq.substring(0, 1) == '2') {
						
						return pzrq;
					}

					//                			 pzrq=this.context.getParam('CurDate');
					//                			if(pzrq&&pzrq.substring(0,1)=='2')
					//                			return pzrq;
					//                			pzrq=this.context.getParam('PZRQ');
					//                			if(pzrq&&pzrq.substring(0,1)=='2')
					//                			return pzrq;
					//                			if(wvself.Session())
					//                			pzrq= gsp.application.applicationContext.getParam('FISession').gsCurDate;
					//                			//临时
					//                			return gsp.rtf.context.get('BizDate');

				}
				pzrq = this.context.getParam('CurDate');
				if (pzrq && pzrq.substring(0, 1) == '2')
					return pzrq;
				pzrq = this.context.getParam('PZRQ');
				if (pzrq && pzrq.substring(0, 1) == '2')
					return pzrq;
				if (wvself.Session()) {
					pzrq = gsp.application.applicationContext.getParam('FISession').gsCurDate;
					return pzrq;
				}
				//临时
				return gsp.rtf.context.get('BizDate');

				if (!pzrq || pzrq.substring(0, 1) != '2')
					pzrq = gsp.rtf.context.get('BizDate');
				return pzrq;
			}
			,
			CurVoucherID:function(){
				var wvself=this;
				var headerRow=wvself.VoucherHeaderRow();
				if(headerRow){
					return headerRow[ZW_VoucherConstants.XPATH_ZWPZK_ID];
				}

			}
			,
			VoucherInterfaceEntryEditControl: function (value) {
				var wvself = this;
				if (value)
					wvself.context.setParam('VoucherInterfaceEntryEditControl', value);
				else
					return wvself.context.getParam('VoucherInterfaceEntryEditControl');
			}
			,
			IsAddNewVoucher: function (value) {
				var wvself = this;
				if (value)
					wvself.context.setParam('IsAddNewVoucher', value);
				else
					return wvself.context.getParam('IsAddNewVoucher');
			}
			,
			VoucherInterfaceIDList:function()
			{
				//参数中传递的是序列化的字符串，这在js中没法处理，所以需要传递JSON
				var wvself=this;
				var idListStr=wvself.context.getParam(ZW_VoucherConstants.KEY_tarDataIDList);
				if(!idListStr)
					return null;
				//还原=号
				idListStr=idListStr.replace(/%3d/g,'=');
				idListStr=idListStr.replace(/%3D/g,'=');
				//还原+号
				idListStr=idListStr.replace(/%2b/g,'+');
				idListStr=idListStr.replace(/%2B/g,'+');
				//还原/号
				idListStr=idListStr.replace(/%2f/g,'/');
				idListStr=idListStr.replace(/%2F/g,'/');
				idListStr=Base64.decode(idListStr);
				var idlist=JSON.parse(idListStr);
				return idlist;
			}
			,
			IsBase64Formatted:function(input)
			{
				if(!input){
					console.log('not base64');
					return false;
				}

				try{
					$.base64.decode(input);
					console.log('is base64');
					return true;
				}
				catch(e)
				{
					console.log('not base64');
					return false;
				}
			}
			,
			VoucherInterfaceSavedIDList:function()
			{
				var wvself=this;
				var saveList=wvself.context.getParam(ZW_VoucherConstants.KEY_savedList);
				console.log(saveList);
				if(!saveList)
					{
						var savedIDList=[];
						wvself.context.setParam(ZW_VoucherConstants.KEY_savedList,savedIDList);
					}
					
				if(wvself.IsBase64Formatted(wvself.context.getParam(ZW_VoucherConstants.KEY_savedList))){
					var tempList=$.base64.decode(wvself.context.getParam(ZW_VoucherConstants.KEY_savedList));
					console.log('tempList is '+tempList);
					if(tempList&&tempList.length>0)
						return tempList;
				}
				return wvself.context.getParam(ZW_VoucherConstants.KEY_savedList);
			}
			,
			//是否已选择单位
			ExistsDW:function()
			{
				var wvself=this;
				var dwmc=$('#'+ZW_VoucherConstants.CompanyHlp).adplookupbox('getValue'),
				dwbh=wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZK).defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZK_DWBH]();
				if(!dwmc||!dwbh)
						return false;
				return true;
			}
			,
			SLPrecision: function ()  //数量精度
			{
				var precision = 2;
				if (this.paramLists().ZW_SLDECN)
					precision = parseInt(this.paramLists().ZW_SLDECN);
				return precision;
			}
			,

			DJPrecision: function ()  //单价精度
			{

				var precision = 2;
				if (this.paramLists().ZW_DJDECN)
					precision = parseInt(this.paramLists().ZW_DJDECN);
				return precision;
			}
			,
			precision: function ()  //金额精度
			{
				var precision = 2;
				if (this.paramLists().ZW_JEDECN)
					precision = parseInt(this.paramLists().ZW_JEDECN);
				return precision;
			}
			,

			HLPrecision: function ()  //汇率精度
			{
				var wvself = this;
				return parseInt(wvself.context.getParam(ZW_VoucherConstants.KEY_ZW_HLDECN));
			}
			,

			WBPrecision: function ()  //外币精度
			{
				var wvself = this;
				return parseInt(wvself.context.getParam(ZW_VoucherConstants.KEY_ZW_WBDECN));
			}
			,

			DefaultCurrency: function ()//本位币
			{
				var defaultcurrency = this.context.getParam(ZW_VoucherConstants.KEY_DEFCURRENCY)
				return defaultcurrency;
			}
			,
			PIPeriods: function ()//取期间
			{
				var piperiods = this.context.getParam(ZW_VoucherConstants.KEY_PERIOD);
				return piperiods;
			}
			,
			paramLists: function () {
				var paramLists = this.context.getParam(ZW_VoucherConstants.KEY_PARAMLIST);
				return paramLists;
			}
			,
			NextNewVoucherDate: function (value) {
				if (value)
					this.context.setParam('NextNewVoucherDate', value);
				else
					return this.context.getParam('NextNewVoucherDate');
			}
			,
			AddItemToGrid: function () {

			}
			,
			ChangeImage: function (picBoxID, PicName) {
				var picBox = $('#' + picBoxID);
				picBox.attr('src', '../../image/' + PicName + '.gif');
			}
			,
			DwbhChange: function () {
				var wvself = this,
					mainRow = wvself.VoucherHeaderRow(),
					compID = mainRow[ZW_VoucherConstants.XPATH_ZWPZK_DWBH];

				if (compID == wvself.Session().gsHsdw) {
					if (wvself.IsEditing() == false) {
						//临时处理，状态机转换
					}
				}

				//功能冲突检查 2017年7月20日17:17:30 临时处理待完善 需FuncID

				if (wvself.Session().gsFSSC == '1') {
					wvself.DwbhChangeInit();
				}
				else if (wvself.Session().gsHslb == '2') {
					wvself.DwbhChangeInit();
				}

				//wvself.DwbhChangeInit();

			}
			,
			DwbhChangeInit: function () {
				var wvself = this,
					GSPStateClient = wvself.Session(),
					VoucherHeaderRow = wvself.VoucherHeaderRow();
				VoucherHeaderRow[ZW_VoucherConstants.XPATH_ZWPZK_DWBH] = GSPStateClient.gsHsdw;
				VoucherHeaderRow["ZWPZK_DWBH_LSBZDW_DWBH"] = GSPStateClient.gsHsdw;
				VoucherHeaderRow["ZWPZK_DWBH_LSBZDW_DWMC"] = GSPStateClient.gsHsdwmc;
				VoucherHeaderRow[ZW_VoucherConstants.XPATH_ZWPZK_KJND] = GSPStateClient.gsKjnd;
				VoucherHeaderRow[ZW_VoucherConstants.XPATH_ZWPZK_KJQJ] = GSPStateClient.gsKjqj;

				var isRelateQury = wvself.context.getParam('RELATEQRY');
				wvself.context.setParam('RELATEQRY', '1');
				var dfdpre = $.Deferred();
				wvself.PrefetchDataState(dfdpre, GSPStateClient).then(function () {
					wvself.context.setParam('RELATEQRY', isRelateQury);

					//界面数量，金额格式化
					wvself.SetViewFormat();
					wvself.context.setParam('IsEdit', '0');
					//计量单位标题
					if (wvself.paramLists().ZW_SLT1)
						$('#' + ZW_VoucherConstants.XTextBoxJLDW)[0].title = wvself.paramLists().ZW_SLT1;

					if (wvself.ISTZPZ() != '1') {
						if (!PIPeriods.PeriodIsOpend) {
							if (wvself.context.getParam('oldComp') && wvself.context.getParam('oldComp') != wvself.Session().gsHsdw) {
								$.messager.alert('提示', '单位' + wvself.Session().gsHsdw + ':当前期间未打开，不允许制单', 'warning');
								var oldComp = wvself.context.getParam('oldComp');
								var bizDate = gsp.rtf.context.get('BizDate');
								var DeferSession = $.Deferred();
								wvself.InitFISession(DeferSession, oldComp, bizDate).then(
									{
										function() {
											var state = wvself.Session();
											VoucherHeaderRow[ZW_VoucherConstants.XPATH_ZWPZK_DWBH] = state.gsHsdw;
											VoucherHeaderRow["ZWPZK_DWBH_LSBZDW_DWBH"] = state.gsHsdw;
											VoucherHeaderRow["ZWPZK_DWBH_LSBZDW_DWMC"] = state.gsHsdwmc;

											VoucherHeaderRow[ZW_VoucherConstants.XPATH_ZWPZK_KJND] = state.gsKjnd;
											VoucherHeaderRow[ZW_VoucherConstants.XPATH_ZWPZK_KJQJ] = state.gsKjqj;
											isRelateQury = mvself.context.getParam('RELATEQRY');

											wvself.context.setParam('RELATEQRY', '1');
											var dfdpre1 = $.Deferred();
											wvself.PrefetchDataState(dfdpre1, mvself.Session()).then(function () {
												wvself.context.setParam(RELATEQRY, isRelateQury);
												//界面数量，金额格式化
												wvself.SetViewFormat();
												wvself.context.setParam('IsEdit', '0');

												//计量单位的标题
												if (mvself.paramLists.ZW_SLT1)
													$('#' + ZW_VoucherConstants.XTextBoxJLDW)[0].title = wvself.paramLists().ZW_SLT1;

												$('#' + ZW_VoucherConstants.VoucherDate97B).focus();

												return;
											});
										}
									});

							}
							else {
								$.messager.alert('提示', '单位' + wvself.Session().gsHsdw + ':当前期间未打开，不允许制单', 'warning');
							}
						}
					}


				});
				$('#' + ZW_VoucherConstants.VoucherDate97B).focus();
				//增加 临时代码 待完善


			}
			,
			SetViewFormat: function () {
				//临时代码，待完善
				var wvself = this;
				var $FLGrid = $('#' + ZW_VoucherConstants.GridFL);
				//借方金额
				$FLGrid.datagrid('getColumnOption', 'ZWPZFL_JFJE').editor.options.precision = wvself.precision();
				//贷方金额
				$FLGrid.datagrid('getColumnOption', 'ZWPZFL_JFJE').editor.options.precision = wvself.precision();
				//借方合计

				//贷方合计

			}
			,
			//初始化凭证表头(新接口生成)
			InitVoucherHeaderPzjk:function()
			{
				var wvself=this;
				var row = wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZK).rows(0);
				var dwbh=wvself.CurCompany(),
				kjnd=wvself.CurYear(),
				period=wvself.CurPeriod(),
				date=wvself.CurDate(),
				lxbh=wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXBH);
				var args=[dwbh,kjnd,period,lxbh];
				wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetVoucherHeaderInfo', args, dwbh, date, 4).then(function(result){
					var headerInfo = result.data;
					var info = headerInfo.split('#');

					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_PZBH,info[0]);
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH,wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXBH));
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_LXMC,wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXMC));
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_PZZ,wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_PZZ));
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZKM,wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_XZKM));
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZXZ,wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_XZXZ));
					row.setValue("CreatedTime",'0001-01-01');

					//凭证状态
					var rows=wvself.DefaultItemTable();
					var len=rows.length;
					for(var i=0;i<len;i++){
						var FLID=rows[i][ZW_VoucherConstants.XPATH_ZWPZFL_ID];
						wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZFL).rows(i).setValue(ZW_VoucherConstants.XPATH_ZWPZFL_YHDZ,'0');
						wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZFL).rows(i).setValue('CreatedTime','0001-01-01');
						//处理辅助
						var assRow_len=wvself.DefaultAssTable.length;
						var assTable=wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZFL);
						for(var j=0;j<ass_len;j++){
							var assRowj=assTable.rows(j);
							if(assRowj.getValue(ZW_VoucherConstants.XPATH_ZWFZYS_FLID)==FLID){
								assRowj.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_YHDZ,'0');
								assRowj.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DWDZ,'0');
							}
						}
					}

					//设置凭证标题 

					//设置密级 暂不处理，临时代码，待完善

					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_SecretLevel,row.getValue(ZW_VoucherConstants.XPATH_ZWPZK_SecretLevel));
					//图片
					wvself.ChangeImage(ZW_VoucherConstants.PicBox1, 'Blank');
				});
			}
			,
			InitVoucherHeaderZF: function (isInit) {
				var wvself = this;
				var currentItem = this.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem;
				var voucherTypeCode = this.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH),//类型编号
					dwbh = this.CurCompany(),
					kjqj = this.CurPeriod(),
					year = this.CurYear(),
					date = this.CurDate();

				//临时代码
				if (!dwbh) dwbh = '0101';
				if (!kjqj) kjqj = '10';

				var paramList = wvself.paramLists();
				var args = [dwbh, year, kjqj, voucherTypeCode];
				this.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetVoucherHeaderInfo', args, dwbh, '20071031', 4).then(
					function (result) {
						var voucherCodeAndDate = result.data.split('#'),
							voucherCode = voucherCodeAndDate[0],
							pzDate = voucherCodeAndDate[1];

						if (pzDate && pzDate.length == 8)//20071031
							pzDate = pzDate.substring(0, 4) + '-' + pzDate.substring(4, 6) + '-' + pzDate.substring(6, 8);


						if (paramList['LS_LSBZDWCanAddVer'] == '1') {
							//var dwbh=this.CurCompany(),
							var args = ['0', dwbh, dwbh, pzDate];
							wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetBasicMCVersion', args, dwbh, '20071031', 4).then(
								function (result) {
									var arr = result.data.split(',');
									if (arr.length == 2) {
										//var row=wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem;
										currentItem.setValue('ZWPZK_DWBH_LSBZDW_DWMC', arr[1]);
										currentItem.setValue('ZWPZK_DWVersion', arr[0]);
									}
								});
						}

						else {
							currentItem.setValue('ZWPZK_DWVersion', 1);
						}

						if (paramList['ZW_DIALOGPZBH'] == '1' && paramList['ZW_AUTOFILLNUM'] == '1') {
							var pzz = wvself.context.getParam('ZWPZLX_PZZ');
							if (!pzz)
								pzz = '1';
							var args = [year, dwbh, kjqj, pzz];
							wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetBasicMCVersion', args, dwbh, '20071031', 4).then(
								function (result) {
									if (result.data)
										$.messager.alert('提示', '此凭证编号为补空号!', 'warning');
								});
						}
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_PZBH, voucherCode);

						//连续新增默认上一张的日期
						if (paramList['ZW_PZRQCONTINUOUS'] == '1' && wvself.NextNewVoucherDate(null))
							currentItem.setValue('ZWPZK_PZRQ', wvself.NextNewVoucherDate(null));

						else
							currentItem.setValue('ZWPZK_PZRQ', pzDate);

						//没有财务session，更新会计期间 临时代码
						var pzz = wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_PZZ);
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_KJQJ, kjqj);
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_KJND, year);
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH))

						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_KJZG, wvself.paramLists()['ZW_CWZG']);
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_ZDR, gsp.rtf.context.get('UserName'));

						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_LXMC, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_LXMC));

						//设置凭证类型
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_PZZ, pzz);
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZKM, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZKM));
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZXZ, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZXZ));
						currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_PZKID, adp.string.createGUID());


						var itemTable = wvself.DefaultItemTable();
						var assTable = wvself.DefaultItemTable();

						var pzkID = '';
						if (isInit) {
							pzkID = adp.string.createGUID();
							currentItem.setValue(ZW_VoucherConstants.XPATH_ZWPZK_ID, pzkID);
						}

						//凭证状态
						var rows = itemTable;
						var count = itemTable.length;
						//对账标志位清空
						for (var i = 0; i < count; i++) {
							rows[i][ZW_VoucherConstants.XPATH_ZWPZFL_YHDZ] = '0';
							var oldFLID = rows[i][ZW_VoucherConstants.XPATH_ZWPZFL_ID];
							var newFLID = '';
							if (isInit) {
								newFLID = adp.string.createGUID();
								rows[i][ZW_VoucherConstants.XPATH_ZWPZFL_ID] = newFLID;
								rows[i][ZW_VoucherConstants.XPATH_ZWPZFL_FLNM] = '';
								rows[i][ZW_VoucherConstants.XPATH_ZWPZK_ID] = pzkID;
							}
							rows[i]['CreatedTime'] = new Date('0001-01-01');
							var kmYEFX = rows[i][ZW_VoucherConstants.XPATH_ZWPZFL_KMBH_ZWKMZD_YEFX];
							var jdfx = rows[i][ZW_VoucherConstants.XPATH_ZWPZFL_JZFX];
							var kmbh = rows[i][ZW_VoucherConstants.XPATH_ZWPZFL_KMBH];

							//处理辅助
							var assRow = [], assRowFull = assTable;
							for (var j = 0; j < assTable.length; j++) {
								if (assRowFull[j][ZW_VoucherConstants.XPATH_ZWFZYS_FLID] == oldFLID)
									assRow.push(assRowFull[j]);
							}

							for (var k = 0; k < assRow.length; k++) {
								assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_YHDZ] = '0';
								assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_DWDZ] = '0';
								assRow[k]['CreatedTime'] = new Date('0001-01-01');

								//多版本数据
								if (wvself.paramLists()['LS_LSBMZDCanAddVer' == '1']) {
									var bmbh = assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_BMBH];
									if (bmbh) {
										var args = ['B' + wvself.paramLists().ZW_PZDISPBMQC, wvself.CurCompany(), bmbh, pzDate];
										this.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetBasicMCVersion', args, dwbh, wvself.CurDate(), 4).then(function (result) {
											var vsRetn = result.data;
											var arr = vsRetn.split(',');
											if (arr.Length == 2) {
												if (wvself.paramLists().ZW_PZDISPBMQC == '1')
													assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_BMBH_LSBMZD_BMQC] = arr[1];
												else
													assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_BMBH_LSBMZD_BMMC] = arr[1];
												assRow[k]['ZWFZYS_BMVersion'] = arr[0];
											}

										});
									}
								}
								else {
									assRow[k]['ZWFZYS_BMVersion'] = 1;
								}


							}


						}
					}
				);
			}
			,
			InitVoucherHeader: function (isInitID) {
				var wvself = this;
				var dwbh = wvself.CurCompany();
				wvself.InitVoucherHeaderL8(wvself, isInitID, dwbh);
			}
			,
			InitVoucherHeaderL8: function (wvself, isInitID, dwbh) {
				var row = wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZK).rows(0);
				var lxbh = wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXBH);
				var args = [wvself.CurCompany(), wvself.CurYear(), wvself.CurPeriod(), lxbh];
				var date = wvself.CurDate();
				if (date && date.length != 8)
					date = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
				wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetVoucherHeaderInfo', args, dwbh, date, 4).then(function (result) {
					var headerInfo = result.data;
					var info = headerInfo.split('#');
					wvself.InitVoucherHeaderL7(wvself, isInitID, info, row, dwbh);
				});

			}
			,
			InitVoucherHeaderL7: function (wvself, isInitID, info, row, dwbh) {
				var voucherDate = info[1];
				if (voucherDate && voucherDate.length == 8)//20071031
					voucherDate = voucherDate.substring(0, 4) + '-' + voucherDate.substring(4, 6) + '-' + voucherDate.substring(6, 8);
				if (wvself.paramLists()['LS_LSBZDWCanAddVer'] == '1') {
					var args = ['O', wvself.CurCompany(), wvself.CurCompany(), voucherDate];
					wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetBasicMCVersion', args, dwbh, voucherDate, 4).then(function (result) {
						var vsRetn = result.data;
						var arr = vsRetn.split(',');
						if (arr.Length == 2) {
							row.setValue('ZWPZK_DWBH_LSBZDW_DWMC', arr[1]);
							row.setValue('ZWPZK_DWVersion', arr[0]);
						}
						wvself.InitVoucherHeaderL6(wvself, voucherDate, row, isInitID, info, dwbh);
					});
				}
				else {
					row.setValue('ZWPZK_DWVersion', '1');
					wvself.InitVoucherHeaderL6(wvself, voucherDate, row, isInitID, info, dwbh);
				}
			}
			,
			InitVoucherHeaderL6: function (wvself, voucherDate, row, isInitID, info, dwbh) {
				//如果是补空号情况，给出提示
				if (wvself.paramLists()['ZW_DIALOGPZBH'] == '1' && wvself.paramLists()['ZW_AUTOFILLNUM'] == '1') {
					var curXML = '';
					var pzz = wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_PZZ);
					var args = [wvself.CurYear(), wvself.CurCompany(), wvself.CurPeriod(), pzz];
					wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetVoucherEmptyNum', args, dwbh, voucherDate, 4).then(function (result) {
						curXML = result.data;
						if (curXML) {
							var mgsInfo = '此凭证编号为补空号!';
							$.messager.alert('提示', mgsInfo);
						}
						wvself.InitVoucherHeaderL5(wvself, row, voucherDate, info, isInitID, dwbh);
					});
				}
				wvself.InitVoucherHeaderL5(wvself, row, voucherDate, info, isInitID, dwbh);
			}
			,
			InitVoucherHeaderL5: function (wvself, row, voucherDate, info, isInitID, dwbh) {
				//row[ZW_VoucherConstants.XPATH_ZWPZK_PZBH] = info[0];
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_PZBH, info[0]);

				//连续新增默认上一张日期
				if (wvself.paramLists().ZW_PZRQCONTINUOUS == '1' && wvself.NextNewVoucherDate(null))
					//row[ZW_VoucherConstants.XPATH_ZWPZK_PZRQ] = wvself.NextNewVoucherDate(null);
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_PZRQ, wvself.NextNewVoucherDate(null));

				else
					//row[ZW_VoucherConstants.XPATH_ZWPZK_PZRQ] = voucherDate;
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_PZRQ, voucherDate);


				var kjqj = wvself.CurPeriod(),
					year = wvself.CurYear();

				
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_KJQJ, kjqj);
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_KJND, year);
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH))

				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_KJZG, wvself.paramLists()['ZW_CWZG']);
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_ZDR, gsp.rtf.context.get('UserName'));

				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_LXMC, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXMC));

				//设置凭证类型
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_PZZ, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_PZZ));
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZKM, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_XZKM));
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZXZ, wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_XZXZ));
				row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_PZKID, adp.string.createGUID());

				var itemTable = wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZFL);
				var assTable = wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWFZYS);

				var pzkID = '';
				if (isInitID) {
					pzkID = adp.string.createGUID();
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_ID, pzkID);
				}

				rows = itemTable.peek();
				var count = rows.length;

				for (var i = 0; i < count; i++) {
					var rowsi = itemTable.rows(i);
					rowsi.setValue(ZW_VoucherConstants.XPATH_ZWPZFL_YHDZ, '0');
					var oldFLID = rowsi.getValue(ZW_VoucherConstants.XPATH_ZWPZFL_ID);
					var newFLID = '';
					if (isInitID) {
						newFLID = adp.string.createGUID();
						rowsi.setValue(ZW_VoucherConstants.XPATH_ZWPZFL_ID, newFLID);
						rowsi.setValue(ZW_VoucherConstants.XPATH_ZWPZFL_FLNM, '');
						rowsi.setValue(ZW_VoucherConstants.XPATH_ZWPZK_ID, pzkID);

					}

					rowsi.setValue('CreatedTime', new Date('0001-01-01'));

					var kmYEFX = rowsi.getValue(ZW_VoucherConstants.XPATH_ZWPZFL_KMBH_ZWKMZD_YEFX);
					var jdfx = rowsi.getValue(ZW_VoucherConstants.XPATH_ZWPZFL_JZFX);
					var kmbh = rowsi.getValue(ZW_VoucherConstants.XPATH_ZWPZFL_KMBH);

					//处理辅助
					var indexStore = [];
					var count = assTable.peek().length;
					for (var j = 0; j < count; j++) {
						var rowsj = arrTable.rows(j);
						if (rowsj.getValue(ZW_VoucherConstants.XPATH_ZWFZYS_FLID) == oldFLID) {
							rowsj.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_YHDZ, '0');
							rowsj.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DWDZ, '0');
							rowsj.setValue('CreatedTime', new Date('0001-01-01'));

							wvself.InitVoucherHeaderL4(wvself, isInitID, rowsj, newFLID, pzkID, voucherDate, kmYEFX, jdfx, row, dwbh);
						}
					}
				}

				wvself.InitVoucherHeaderL1(wvself, row, isInitID, dwbh);
			}
			,
			InitVoucherHeaderL4: function (wvself, isInitID, assRowk, newFLID, pzkID, voucherDate, kmYEFX, jdfx, row, dwbh) {
				if (wvself.paramLists()['LS_LSBMZDCanAddVer'] == '1') {
					var bmbh = assRowk.getValue(ZW_VoucherConstants.XPATH_ZWFZYS_BMBH);
					if (bmbh) {
						var args = ['B' + wvself.paramLists().ZW_PZDISPBMQC, wvself.CurCompany, bmbh, voucherDate];
						wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetBasicMCVersion', args, dwbh, voucherDate, 4).then(function (result) {
							var vsRetn = result.data;
							var arr = vsRetn.split(',');
							if (arr.Length == 2) {
								if (wvself.paramLists().ZW_PZDISPBMQC == '1')
									//assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_BMBH_LSBMZD_BMQC] = arr[1];
									assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_BMBH_LSBMZD_BMQC, arr[1]);
								else
									//assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_BMBH_LSBMZD_BMMC] = arr[1];
									assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_BMBH_LSBMZD_BMMC, arr[1]);


								//assRow[k]['ZWFZYS_BMVersion'] = arr[0];
								assRowk.setValue('ZWFZYS_BMVersion', arr[0]);
							}
							wvself.InitVoucherHeaderL3(wvself, isInitID, assRowk, newFLID, pzkID, voucherDate, kmYEFX, jdfx, row, dwbh);
						});
					}
				}
				else {
					//assRow[k]['ZWFZYS_BMVersion'] = 1;
					assRowk.setValue('ZWFZYS_BMVersion', '1');
					wvself.InitVoucherHeaderL3(wvself, isInitID, assRowk, newFLID, pzkID, voucherDate, kmYEFX, jdfx, row, dwbh);
				}

			}
			,
			InitVoucherHeaderL3: function (wvself, isInitID, assRowk, newFLID, pzkID, voucherDate, kmYEFX, jdfx, row, dwbh) {
				if (wvself.paramLists()['LS_LSWLDWCanAddVer'] == '1') {
					//var wldw=assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_WLDWBH];
					var wldw = assRowk.getValue(ZW_VoucherConstants.XPATH_ZWFZYS_WLDWBH);
					if (wldw) {
						var args = ['W', wvself.CurCompany(), wldw, voucherDate];
						wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetBasicMCVersion', args, dwbh, voucherDate, 4).then(function (result) {
							var vsRetn = result.data;
							var arr = vsRetn.split(',');
							if (arr.Length == 2) {
								//assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_WLDWBH_LSWLDW_DWMC] = arr[1];
								//assRow[k]['ZWFZYS_WLDWVersion'] = arr[0];

								assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WLDWBH_LSWLDW_DWMC, arr[1]);
								assRowk.setValue('ZWFZYS_WLDWVersion', arr[0]);
							}
							wvself.InitVoucherHeaderL2(wvself, isInitID, assRowk, newFLID, pzkID, voucherDate, kmYEFX, jdfx, row, dwbh);
						});
					}
				}
				else {
					//assRow[k]['ZWFZYS_WLDWVersion'] = 1;
					assRowk.setValue('ZWFZYS_WLDWVersion', '1');
					wvself.InitVoucherHeaderL2(wvself, isInitID, assRowk, newFLID, pzkID, voucherDate, kmYEFX, jdfx, row, dwbh);
				}

			}
			,
			InitVoucherHeaderL2: function (wvself, isInitID, assRowk, newFLID, pzkID, voucherDate, kmYEFX, jdfx, row, dwbh) {
				if (isInitID) {
					//                				assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_FLID] = newFLID;
					//                        assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_FLNM] = '';
					//                        assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_PZID] = pzkID;
					//                        assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_ID] = adp.string.createGUID();

					assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_FLID, newFLID);
					assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_FLNM, '');
					assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_PZID, pzkID);
					assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_ID, adp.string.createGUID());

				}
				//根据凭证日期修改业务日期
				if (this.paramLists()['ZW_PZRQLDYWRQ'] == '1') {
					//assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_YWRQ] = voucherDate;
					//assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_JSRQ] = voucherDate;

					assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_YWRQ, voucherDate);
					assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JSRQ, voucherDate);
				}

				//业务号自动生成
				if (wvself.paramLists().ZW_PZAUTOYWH == '1' && kmYEFX == jdfx)//业务号自动生成
				{
					if (wvself.isYWHVisible(assRowk) == true) {
						//assRow[k][ZW_VoucherConstants.XPATH_ZWFZYS_YWH] = wvself.CreateYWH(wvself,i + 1, k + 1, row);
						assRowk.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_YWH, wvself.CreateYWH(wvself, i + 1, k + 1, row));
					}
				}

			}

			,
			InitVoucherHeaderL1: function (wvself, row, isInitID, dwbh) {
				row["CreatedTime"] = +new Date('0001-01-01');
				wvself.lblTitle().val(row[ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_LXMC]);
				//机制 字样 表单界面暂未加 临时

				//设置密级---航天一院保密要求，需要屏蔽附件上传功能，此处暂时根据密级参数控制（显示密级则不显示附件）

				//row[ZW_VoucherConstants.XPATH_ZWPZK_SecretLevel] =row[ZW_VoucherConstants.XPATH_ZWPZK_SecretLevel];
				if (isInitID)
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_ID, '');
				//临时 处理图片 显示Blank.gif
				var PicName = 'Blank';
				wvself.ChangeImage(ZW_VoucherConstants.PicBox1, PicName);

				if (wvself.smartHelp_Dwbh()) {
					//临时代码 session不需要做单独的判断
					if (wvself.Session()) {
						var session = wvself.Session();
						if (session.gsFSSC == '1' || session.gsHslb == '3') {
							wvself.smartHelp_Dwbh().adplookupbox('show');
							//法人的处理 暂不加

						}
					}
					else {
						//临时代码，临时注释掉
						//wvself.smartHelp_Dwbh().adplookupbox('hide');
					}
				}

			}
			,
			isYWHVisible: function (assRow) {
				var zgbh = assRow.getValue(ZW_VoucherConstants.XPATH_ZWFZYS_ZGBH);
				var wlbh = assRo.getValue(ZW_VoucherConstants.XPATH_ZWFZYS_WLDWBH);
				if (zgbh || wlbh)
					return true;
				return false;
			}
			,
			isYWHVisible1: function (kmbh) {
				var wvself = this;


			}
			,
			CreateYWH: function (wvself, flNum, fzNum, headRow) {
				//年的后两位+月份(不足两位的补0)+凭证号(5位)+11/12/13流水号。
				var ywh = wvself.CurYear().substring(2, 4) + wvself.CurPeriod() + headRow.getValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_PZZ)
					+ headRow.getValue(ZW_VoucherConstants.XPATH_ZWPZK_PZBH) + wvself.ToString("0000", flNum) + wvself.ToString("0000", fzNum);
				return ywh;
			}
			,
			ChangeFZYWH: function (itemRow, flJDfx, kmYEFX) {
				var wvself = this;
				if (wvself.paramLists().ZW_PZAUTOYWH == '1') {
					var itemId = itemRow[ZW_VoucherConstants.XPATH_ZWPZFL_ID];
					var assRows = wvself.GetCurrentAssRow(itemId);
					if (assRows.length > 0) {
						if (isYWHVisible(itemRow[ZW_VoucherConstants.XPATH_ZWPZFL_KMBH]) == true) {
							if (kmYEFX == flJDfx) {
								//临时代码，待完善 ZW_BaseController.cs 2220行
							}
						}
					}
				}
			}
			,
			ToStringNum: function (zero, str) {
				var len = zero.length;
				var lenstr = str.length;
				var newstr = str;
				for (var i = 0; i < len - lenFL; i++)
					str = '0' + str;
				return str;
			}
			,
			//清除模板信息
			clearTemplateInfo: function () {
				var wvself = this;
				var TEMPLATEINFO = wvself.context.getParam('XPATH_TEMPLATEINFO');
				this.context.setParam(TEMPLATEINFO, '');
			}
			,
			//新增公共
			CreateBill: function () {
				var wvself = this;
				//wvself.context.invoke({target:'CardController',methodName:'create',params:[]});
				var isInsertVoucher = this.context.getParam('KEY_ISINSERTVOUCHER');
				wvself.context.setParam(isInsertVoucher, '0');
				//清除模板信息
				wvself.clearTemplateInfo();
				//初始化凭证头
				wvself.InitVoucherHeader(false);

			}
			,
			//预取数据
			PrefetchData: function (dfd, compCode, year, period) {
				var wvself = this;
				var isRelateQury = wvself.context.getParam('RELATEQRY');
				var formCounter = 1;
				if (formCounter > 1 || isRelateQury == '2')
					isRelateQury = '1';
				var PrefetchDataKey = wvself.context.getParam('PrefetchDataKey');
				var newKey = compCode + year + period;
				if (PrefetchDataKey == newKey)
					return dfd.resolve();
				var args = [VoucherModuleID, compCode, year, period, '0'];
				return this.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'PrefetchVoucherBaseData', args, compCode, '20071031', 5).then(
					function (result) {
						if (result.data) {
							var dict;
							if (typeof result.data == 'string')
								dict = JSON.parse(result.data);
							else
								dict = result.data;
							//var KEY_PARAMLIST=wvself.context.getParam('KEY_PARAMLIST');
							wvself.context.setParam(ZW_VoucherConstants.KEY_PARAMLIST, dict[0]);
							//var KEY_PERIOD=wvself.context.getParam('KEY_PERIOD');
							wvself.context.setParam(ZW_VoucherConstants.KEY_PERIOD, dict[1])
							//var KEY_STARTDATE=wvself.context.getParam('KEY_STARTDATE');
							wvself.context.setParam(ZW_VoucherConstants.KEY_STARTDATE, dict[1].StartDate);
							//var KEY_ENDDATE=wvself.context.getParam('KEY_ENDDATE');
							wvself.context.setParam(ZW_VoucherConstants.KEY_ENDDATE, dict[1].EndDate);
							//var KEY_QUARTER=wvself.context.getParam('KEY_QUARTER');
							wvself.context.setParam(ZW_VoucherConstants.KEY_QUARTER, dict[1].Quarter);
							//var KEY_COMBINLIMTTYPE=wvself.context.getParam('KEY_COMBINLIMTTYPE');
							wvself.context.setParam(ZW_VoucherConstants.KEY_COMBINLIMTTYPE, dict[2]);

							//var KEY_VOUCHERTYPEXML=wvself.context.getParam('KEY_VOUCHERTYPEXML');
							wvself.context.setParam(ZW_VoucherConstants.KEY_VOUCHERTYPEXML, dict[3]);

							//var KEY_ITOperationTypes=wvself.context.getParam('KEY_ITOperationTypes');
							wvself.context.setParam(ZW_VoucherConstants.KEY_ITOperationTypes, dict[4]);

							//var KEY_DEFCURRENCY=wvself.context.getParam('KEY_DEFCURRENCY');
							wvself.context.setParam(ZW_VoucherConstants.KEY_DEFCURRENCY, dict[5]);

							//var KEY_DEFACCOUNTBOOK=wvself.context.getParam('KEY_DEFACCOUNTBOOK');
							wvself.context.setParam(ZW_VoucherConstants.KEY_DEFACCOUNTBOOK, dict[6]);

							wvself.context.setParam('PrefetchDataKey', newKey);
							wvself.context.setParam('CurrencyFilter', '');
							wvself.context.setParam('MaxDWYear', dict[7]);
							dfd.resolve();
							return dfd;
						}
					});
				
			}
			,
			PrefetchDataState: function (dfd, state) {
				var wvself = this,
				dwbh=wvself.CurCompany(),
				year=wvself.CurYear(),
				period=wvself.CurPeriod();
				//临时代码
				if(!dwbh)
					dwbh='0101';
				
				return wvself.PrefetchData(dfd, dwbh, year, period);
			}
			,

			BindDataSource: function (dataSource) {
				var wvself = this;
				var ds = dataSource;


				//var varService = wvself.context.injector.get("$variableService");
				//var ds=JSON.parse(result);
				//varService.parse(ds, wvself.context);

				if (!wvself.cardInstance().schema && wvself.cardInstance().formID) {
					wvself.cardInstance().loadSchema(wvself.cardInstance().formID);
				}
				var datasource = wvself.cardInstance().dataSource = gsp.dataSource(ds, {
					name: wvself.cardInstance().dataSourceName,
					schema: wvself.cardInstance().schema
				});

				wvself.bindData(datasource);
			}
			,
			HandlePreciousBeforeBind:function(ds)
			{
				var wvself=this;
				if(!ds||ds.length<=0)
					return;
				//分录 借贷方金额
				var FLTable=ds.ZWPZFLOP;
				for(var i=0;i<FLTable.length;i++)
				{
					var row=FLTable[i];
					var jfje=row[ZW_VoucherConstants.XPATH_ZWPZFL_JFJE];
					var dfje=row[ZW_VoucherConstants.XPATH_ZWPZFL_DFJE];
					var precious=wvself.paramLists().ZW_JEDECN;
					if(!precious)
						precious=2;
					if(typeof precious=='string')
						precious=parseInt(precious);
					if(jfje)
					jfje=wvself.toDecimal(jfje,precious);
					if(dfje)
					dfje=wvself.toDecimal(dfje,precious);

					row[ZW_VoucherConstants.XPATH_ZWPZFL_JFJE]=jfje;
					row[ZW_VoucherConstants.XPATH_ZWPZFL_DFJE]=dfje;
					//jfje=wvself.toDecimal();
					//dfje=wvself.toDecimal();
				}
				//辅助 待补充完善 临时代码
			}
			,
			showVoucher: function (ds, ifCheckCert) {
				var wvself = this;
				if (!ds || ds.length <= 0)
					return;
				//清除模板信息
				wvself.clearTemplateInfo();

				//处理分录辅助精度
				

				//									wvself.context.view().transitInvoke
				//																			('Examine',
				//																			[
				//																				{
				//																				target : 'ZW_WebVoucherPub',
				//																				methodName : 'BindDataSource',
				//																				params : [ds]
				//																				}
				//																			]
				//																			);
				wvself.BindDataSource(ds);

				var row = wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem;

				var pzlx_lxbh = wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXBH),
					pzlx_lxmc = wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXMC),
					pzlx_pzz =  wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_PZZ),
					pzlx_xzkm =  wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_XZKM),
					pzlx_xzxz =  wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_XZXZ);

				
				if (wvself.ISTZPZ() == '1') {
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH, pzlx_lxbh);
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_LXMC, pzlx_lxmc);
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_PZZ, pzlx_pzz);
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZKM, pzlx_xzkm);
					row.setValue(ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZXZ, pzlx_xzxz);

				}
				else {
					wvself.context.setParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXBH, row[ZW_VoucherConstants.XPATH_ZWPZK_LXBH]());
					wvself.context.setParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXMC, row[ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_LXMC]());
					wvself.context.setParam(ZW_VoucherConstants.XPATH_ZWPZLX_PZZ, row[ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_PZZ]());
					wvself.context.setParam(ZW_VoucherConstants.XPATH_ZWPZLX_XZKM, row[ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZKM]());
					wvself.context.setParam(ZW_VoucherConstants.XPATH_ZWPZLX_XZXZ, row[ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_XZXZ]());

				}
				// //设置凭证标题
				// $('#' + ZW_VoucherConstants.Label_VoucherType).html(row[ZW_VoucherConstants.XPATH_ZWPZK_LXBH_ZWPZLX_LXMC]());

				var vsType = row[ZW_VoucherConstants.XPATH_ZWPZK_TYPE]();
				var lblJZ = $('#' + 'lblJZ');
				if (lblJZ) {
					if ((wvself.paramLists().ZW_NOTDISPJZ != '1') && (vsType == '6' || vsType == '7' || vsType == '8' || vsType == 'T'))
						lblJZ.hide();
					else
						lblJZ.show();

				}

				//单位和法人设置
				var smartHelp_Dwbh = $('#' + ZW_VoucherConstants.CompanyHlp);
				if (smartHelp_Dwbh && smartHelp_Dwbh.length > 0) {
					if (wvself.context.getParam('gsFSSC') == '1' || wvself.Session().gsHslb == '2') {
						smartHelp_Dwbh.show();
						var isRelateQury = wvself.context.getParam(RELATEQRY);
						if (isRelateQury == '1') {
							smartHelp_Dwbh.attr('readOnly', 'true');

						}
						if (wvself.Session().gsHslb == '3') {
							//法人，待完善 临时代码
						}
					}
					else {
						smartHelp_Dwbh.hide();
					}
				}
				var picName,
				zfflag=row.ZWPZK_ZFF();
				var isErec = row.ZWPZK_EREC();
				if (isErec == '1')//电子档案
					picName = 'EREC';


				var cancelFlag = row.ZWPZK_WZF();
				if (cancelFlag == '0') {
					picName = 'NoFull';
					if(zfflag=='1'){
						$('#'+ZW_VoucherConstants.PicBox2).css('display','inline');
					}
					else{
						$('#'+ZW_VoucherConstants.PicBox2).css('display','none');
					}
				}
				else {
					if(zfflag=='1'){
						$('#'+ZW_VoucherConstants.PicBox2).css('display','inline');
					}
					else{
						$('#'+ZW_VoucherConstants.PicBox2).css('display','none');
					}
					//if(row.getValue(ZW_VoucherConstants.XPATH_ZWPZK_ZFF)=='1')
					if (row.ZWPZK_JZF() == '1')
						picName = 'Tally';
					else {
						var auditFlag = row.ZWPZK_FHF();
						if (auditFlag == '1')
							picName = 'Audit';
						else {
							var vResult = row.ZWPZK_NFHYY();
							if (vResult) {
								picName = 'AuditNoPass';
								//浮动显示未通过原因待完善 临时代码
							}
							else if (row.ZWPZK_PZZT() == '2') {
								//批准未通过
								//浮动显示未通过原因待完善 临时代码
								picName = 'ConfirmNoPass';
							}
						}
					}

				}
				if (picName&&zfflag=='0')
					wvself.ChangeImage(ZW_VoucherConstants.PicBox1, picName);
				else
					wvself.ChangeImage(ZW_VoucherConstants.PicBox1, 'Blank');

				$('#'+ZW_VoucherConstants.VoucherCodeHlp).adpcombogrid("setValue","");
				$('#'+ZW_VoucherConstants.VoucherCodeHlp).adpcombogrid('textbox').val('');


				//setSecretEditionButton(); 待完善 临时代码


			}
			,
			GetVoucher: function (queryFlag, voucherNM, year, orgID, month, pzlx, filter) {
				var wvself = this;
				var VoucherJson;
				
					switch (queryFlag) {
						case "P":  //上一张
							{
								wvself.checkRight();
								var args = [year, orgID, month, pzlx + '^' + voucherNM + '^' + filter];
								return wvself.callWS('Genersoft.FI.ZW.ZW_VoucherCore', 'Genersoft.FI.ZW.ZW_VoucherCore.FIVoucherManager', 'QueryPriorDataSet', args).then(
									function (result) {
										if (result.data) {
											if(wvself.IsEditing())
												wvself.cancel();
											//wvself.BindDataSource(result.data);
											wvself.HandlePreciousBeforeBind(result.data);
											wvself.context.view().transitInvoke
												('Examine',
												[
													{
														target: 'ZW_WebVoucherPub',
														methodName: 'showVoucher',
														params: [result.data, false]
													}
												]
												);
										}
									}).fail(function(){
										wvself.cancelAction();
									});
								break;
							}
						case "N":  //下一张
							{

								wvself.checkRight();
								//製造異常
								//orgID='';
								var args = [year, orgID, month, pzlx + '^' + voucherNM + '^' + filter];
								return wvself.callWS('Genersoft.FI.ZW.ZW_VoucherCore', 'Genersoft.FI.ZW.ZW_VoucherCore.FIVoucherManager', 'QueryNextDataSet', args).then(
									function (result) {
										if (result.data) {
											if(wvself.IsEditing())
												wvself.cancel();
											//wvself.BindDataSource(result.data);
											wvself.HandlePreciousBeforeBind(result.data);
											wvself.context.view().transitInvoke
												('Examine',
												[
													{
														target: 'ZW_WebVoucherPub',
														methodName: 'showVoucher',
														params: [result.data, false]
													}
												]
												);
										}
											
									}).fail(function(){
										wvself.cancelAction();
									});
								break;
							}
						case "S":  //查看
							{
								var args = [year, orgID, voucherNM, '0'],
								compCode=wvself.CurCompany(),
								bizDate=wvself.CurDate();
								return wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetVoucherDSByPZNM', args, compCode, bizDate, 4).then(
									function (result) {
										if (result.data) {
											if(wvself.IsEditing())
												wvself.cancel();
											//wvself.BindDataSource(result.data);
											wvself.HandlePreciousBeforeBind(result.data);
											wvself.context.view().transitInvoke
												('Examine',
												[
													{
														target: 'ZW_WebVoucherPub',
														methodName: 'showVoucher',
														params: [result.data, false]
													}
												]
												);
										}
									});
								//break;
							}
					}

				

			}
			,
			checkRight: function () {
				var unit,
					wvself = this;
				if (wvself.DefaultMainTable()) {
					if (wvself.DefaultMainTable().length < 1)
						return;
					var curRow = wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZK).defaultView().currentItem;
					unit = curRow[ZW_VoucherConstants.XPATH_ZWPZK_DWBH]();
				}
				else
					return;
				if (unit == wvself.Session().gsHsdw)
					return;
				if (wvself.Session().gsHsxz == '0')
					return;
				wvself.cancelAction();
				$.messager.alert('提示', '当前凭证是其他单位的，您不能进行此操作！','warning');
				return $.Deferred().reject();
			}
			,
			QueryVoucherPre: function (queryFlag, voucherNM, orgID, year) {
				var wvself = this,
					curYear = wvself.CurYear(),
					curMonth = wvself.CurPeriod(),
					curOrgID = wvself.CurCompany(),
					pzlx = '';
				if (!year)
					year = curYear;

				if (wvself.IsEditing()) {

					var rows = $('#' + ZW_VoucherConstants.GridFL).datagrid('getRows');
					var noSave = true;
					for (var i = 0; i < rows.length&&noSave; i++) {
						var row = rows[i],
							jfje = row[ZW_VoucherConstants.XPATH_ZWPZFL_JFJE],
							dfje = row[ZW_VoucherConstants.XPATH_ZWPZFL_DFJE];
						if ((jfje && parseFloat(jfje) != 0) || (dfje && parseFloat(dfje) != 0)) {
							noSave = false;
							wvself.blockConfirm('提示', '当前凭证未保存，您是否继续？').then(function () {
								//wvself.cancel();
								//wvself.formHelper.endEditAllReview(wvself.view);
								wvself.QueryVoucher(queryFlag, voucherNM, orgID, year);
							});
						}
					}
					if (noSave == true) {
						//wvself.cancel();
						//wvself.formHelper.endEditAllReview(wvself.view);
						wvself.QueryVoucher(queryFlag, voucherNM, orgID, year);
					}
				}
				else {
					//wvself.formHelper.endEditAllReview(wvself.view);
					wvself.QueryVoucher(queryFlag, voucherNM, orgID, year);
				}
			}
			,
			QueryVoucherInterface:function(voucherid)
			{
				var ds,wvself=this;
				try{
					var saveIDList=wvself.VoucherInterfaceSavedIDList();
					var containVoucherID=false;
					if(saveIDList&&saveIDList.length>0){
						for(var i=0;i<saveIDList.length;i++)
							if(saveIDList[i]==voucherid)
								containVoucherID=true;
					}
					if(saveIDList&&containVoucherID){
						var args=[wvself.CurYear(),voucherID];
						var company=wvself.CurCompany();
						//临时代码，涉及1468-1470
						if(!company)
							company='0101';
						return wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetVoucherInterfaceDS', args,company, wvself.CurDate(), 2).then(function(result){
							wvself.HandlePreciousBeforeBind(result.data);
							ds=result.data;
							console.log(ds);
							if(ds.ZWPZKOP.length>0){
								var row=ds.ZWPZKOP[0],
								period=row[ZW_VoucherConstants.XPATH_ZWPZK_KJQJ],
								dwbh=row[ZW_VoucherConstants.XPATH_ZWPZK_DWBH],
								kjnd=row[ZW_VoucherConstants.XPATH_ZWPZK_KJND],
								pzrq=row[ZW_VoucherConstants.XPATH_ZWPZK_PZRQ];
								var dfd=$.Deferred();
								return wvself.PrefetchData(dfd,dwbh,kjnd,period).then(function(){
									return wvself.InitFISession($.Deferred(),dwbh,wvself.FormatDate8(pzrq)).then(function(){
											wvself.showVoucher(ds,true);
											var curvoucherID=wvself.cardInstance().dataSource.tables(0).defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZK_ID]();
											containVoucherID=false;
											if(saveList&&saveIDList.length>0){
												for(var i=0;i<saveIDList.length;i++)
													if(saveIDList[i]==curvoucherID)
														containVoucherID=true;
											}
											if(wvself.VoucherInterfaceIDList()&&containVoucherID){
												wvself.InitVoucherHeaderPzjk();
											}
									});
								});
							}
						});
					}
					else{
						var args=[voucherid];
						//临时代码，涉及1484-1487
						if(!company)
							company='0101';
						console.log('begin call GetVoucherDataSet');
						console.log(args);
						return wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetVoucherDataSet', args, company, wvself.CurDate(), 1).then(function(result){
							
							var ds=result.data;
							var row=ds.ZWPZKOP[0],
								period=row[ZW_VoucherConstants.XPATH_ZWPZK_KJQJ],
								dwbh=row[ZW_VoucherConstants.XPATH_ZWPZK_DWBH],
								kjnd=row[ZW_VoucherConstants.XPATH_ZWPZK_KJND],
								pzrq=row[ZW_VoucherConstants.XPATH_ZWPZK_PZRQ];
								var dfd=$.Deferred();
								return wvself.PrefetchData(dfd,dwbh,kjnd,period).then(function(){
									return wvself.InitFISession($.Deferred(),dwbh,wvself.FormatDate8(pzrq)).then(function(){
											wvself.HandlePreciousBeforeBind(ds);
											wvself.showVoucher(ds,true);
											var curvoucherID=wvself.cardInstance().dataSource.tables(0).defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZK_ID]();
											containVoucherID=false;
											if(saveIDList&&saveIDList.length>0){
												for(var i=0;i<saveIDList.length;i++)
													if(saveIDList[i]==curvoucherID)
														containVoucherID=true;
											}
											if(wvself.VoucherInterfaceIDList()&&containVoucherID){
												wvself.InitVoucherHeaderPzjk();
											}
									});
								});
						});
					}	
				}
				catch(e){

				}
			}
			,
			QueryVoucher: function (queryFlag, voucherNM, orgID, year) {
				var wvself = this,
					curYear = wvself.CurYear(),
					curMonth = wvself.CurPeriod(),
					curOrgID = wvself.CurCompany();
				var pzlx;

				if (wvself.DefaultMainTable() && wvself.DefaultMainTable().length > 0) {
					pzlx=wvself.cardInstance().dataSource.tables(0).defaultView().currentItem.ZWPZK_LXBH();
					if(!pzlx)
					pzlx = wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZLX_LXBH);

				}

				var filter = wvself.context.getParam('FILTER');
				if (filter) {
					curOrgID = wvself.context.getParam('ORGANIZATIONID');
					curYear = wvself.context.getParam('PZYEAR');
					curMonth = wvself.context.getParam('PZPERIOD');
				}

				if (wvself.paramLists()['SYS_SecretEdition'] == '1'
					|| wvself.paramLists()['ZW_INPUTSECRETLEVEL'] == '1') {
					if (filter)
						filter += ' and ';
					var userSecLevel = gsp.rtf.context.get('UserSecLevel');
					if (gsp.application.applicationContext.getParam('gsFISecLevel'))
						userSecLevel = gsp.application.applicationContext.getParam('gsFISecLevel');
					filter += ' SecretLevelNum' + userSecLevel;
				}

				if (wvself.context.getParam('RELATEQRY') != '1') {
					if (wvself.paramLists()['ZW_PZCX'] == '1') {
						if (filter)
							filter += ' and ';

						filter += " ZWPZK_ZDR='" + gsp.application.applicationContext.getParam('UserName') + "'";

					}
				}

				else//联查
				{
					var operType = wvself.context.getParam('OPERTYPE');
					if (operType != "FH" && operType != "JZ")//单张审核记账不控制
					{
						//联查时不允许查看别人凭证
						if (wvself.paramLists().ZW_PZLC != '1') {
							if (filter)
								filter += ' and ';
							filter += " ZWPZK_ZDR='" + gsp.rtf.context.get('UserName') + "'";
						}
					}
				}

				if (wvself.ISTZPZ() == '1') {
					if (filter)
						filter += ' and ';
					filter += "ZWPZK_LXBH='" + ZW_VoucherConstants.TZVoucherTypeCode + "'";

				}

				if (queryFlag == 'S') {
					curOrgID = orgID;
					curYear = year;
				}
				if (!filter)
					filter = ' 1=1 ';
				this.GetVoucher(queryFlag, voucherNM, curYear, curOrgID, curMonth, pzlx, filter);
			}
			,
			//上一张
			QueryPre: function (queryFlag, voucherNM, orgID, year) {
				var wvself=this,
				curMonth=wvself.CurPeriod(),
				pzlx=wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH);
				this.GetVoucher(queryFlag, voucherNM, year, orgID, curMonth, pzlx, '');
			}
			,
			//下一张
			QueryNext: function (queryFlag, voucherNM, orgID, year) {
				var wvself=this,
				curMonth=wvself.CurPeriod(),
				pzlx=wvself.context.getParam(ZW_VoucherConstants.XPATH_ZWPZK_LXBH);
				this.GetVoucher(queryFlag, voucherNM, year, orgID, curMonth, pzlx, '');
			}
			,
			//delete ass true is all/false is one
			deleteItemEx: function (bool)//true为删除所有数据列 false为只删除一行
			{
				var grid = $('#assGrid');
				var wvself = this;
				var deferred = $.Deferred();
				var rowsCount = grid.datagrid('getRows').length;
				while (rowsCount !== 0) {
					var row = grid.datagrid('getSelected');
					if (row) {
						var keyfield = grid.datagrid('options').idField;
						var rowIndex = grid.datagrid('getRowIndex', row[keyfield]);
						if (!row[keyfield]) {
							rowIndex = grid.datagrid('getRowIndex', row);
						}
						grid.datagrid('cancelEdit', rowIndex)
							.datagrid('deleteRow', rowIndex).trigger('removeRow', [{
								rowData: row
							}]);
						grid.editIndex = undefined;
						var rowsCount = grid.datagrid('getRows').length;
						var nextRowIndex = rowIndex;
						if (nextRowIndex > rowsCount - 1) {
							nextRowIndex = rowsCount - 1;
						}
						if (nextRowIndex > -1) {
							grid.datagrid('selectRow', nextRowIndex);
						}
						deferred.resolve();
					}
					if (!bool) {
						break;
					}
				}
			},

			OpenDialogVoucherType: function () {
				var wvself = this;
				var DialogID = '#' + ZW_VoucherConstants.VoucherTypeDialog;
				var $VoucherTypeDia = $(DialogID);
				if (!$VoucherTypeDia.data('dialog')) {
					var typeself = this;
					$VoucherTypeDia = $VoucherTypeDia.dialog({
						modal: true,
						width: 400,
						height: 400,
						onDestroy: function () {

						}
						,
						onClose: function () {
							//判断单位选择
							//var dwbh=wvself.context.getParam('TypeSelctComp');
							var dwbh = gsp.application.applicationContext.getParam('TypeSelctCompCode'),
							dwmc=gsp.application.applicationContext.getParam('TypeSelctCompName');
							if (dwbh) {
								//预取数据
								if (false)//凭证接口
								{

								}
								else {
									var bizDate = gsp.rtf.context.get('BizDate');
									var year = wvself.CurYear(),
										period = wvself.CurPeriod(),
										compCode = wvself.CurCompany();
									var deferPre = $.Deferred();
									wvself.PrefetchData(deferPre, compCode, year, period).then(function(){
											var action = wvself.context.getParam('TypeChooseAction');
											if (action == 'OK') {
												//var row=wvself.context.getParam('TypeSelectedRow');
												var row = gsp.application.applicationContext.getParam('TypeSelectedRow');
												wvself.context.invoke({
													target: 'ZW_WebVoucherEditController',
													methodName: 'CreateByVoucherType',
													params: ['','','',row]
												});
											}
									});
								}
								
							}
							//$VoucherTypeDia.dialog('destroy');
							$('.window-mask').remove();

						}
						,
						onLoad: function ()//加载事件
						{
							$('#' + ZW_VoucherConstants.VoucherTypeDWHlp).focus();
						}
					});
				}
				$VoucherTypeDia.dialog('show');
			},

			///
			GetHSGX: function (kmbh) {
				var wvself = this;//wvself改名
				if (!kmbh)
					return false;

				table = wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWPZK)
				var pzlx = table.defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZK_LXBH]();
				var DWBH = wvself.CurCompany();
				var KJND = wvself.CurYear();
				var KJQJ = wvself.CurPeriod();
				var PZRQ = wvself.CurDate();
				var args = [DWBH, KJND, KJQJ, PZRQ, kmbh, pzlx];
				if (!ZW_VoucherConstants.KMInfo[kmbh]) {
					return wvself.callWSEx('Genersoft.FI.ZW.ZW_VoucherLocalClient', 'Genersoft.FI.ZW.ZW_VoucherLocalClient.GSVoucherLocalClient', 'GetAssInfo', args, DWBH, PZRQ, 6)
						.then(
						function (result) {
							var fzstr = result.data.replace(/#/g, "");
							var fzobj = $.parseJSON(fzstr);
							ZW_VoucherConstants.KMInfo[kmbh] = fzobj.root.item;
							return $.Deferred().resolve();
						});
				}
				else {
					return $.Deferred().resolve();
				}

			},

			//刷新辅助
			RefreshAss: function (kmbh) {
				return wvself.GetHSGX(kmbh).then(function () {
					wvself.context.invoke({ target: "ZW_WebVoucherAssController", methodName: "loadFZHSDetail", params: [kmbh] });
					return $.Deferred().resolve();
				});
			},

			//处理合计行
			HandleFLSumRow: function () {
				$('#itemGrid').datagrid('statistics');
				var JFJESumStr = $("div#Layout2_Main table.datagrid-ftable td[field='ZWPZFL_JFJE'] div").text();
				var DFJESumStr = $("div#Layout2_Main table.datagrid-ftable td[field='ZWPZFL_DFJE'] div").text();
				var JFJESum = parseFloat(JFJESumStr);
				var DFJESum = parseFloat(DFJESumStr);
				var Diff = JFJESum - DFJESum;
				$("div#Layout2_Main table.datagrid-ftable td[field='ZWPZFL_JZFX'] div").text('差 :  ' + Diff);
				var ChineseMoney = adp.number.toChineseMoney(JFJESum);
				$("div#Layout2_Main table.datagrid-ftable td[field='ZWPZFL_KMBH_ZWKMZD_KMMC'] div").text(ChineseMoney);
				$("div#Layout2_Main table.datagrid-ftable td[field='ZWPZFL_KMBH_ZWKMZD_KMMC'] div").css('text-align', 'right');
			}
			,

			//记账方向
			DisPlayJZFX: function (wvself, index, changes) {
				if (changes) {
					if (changes.hasOwnProperty('ZWPZFL_JFJE')) {
						if (parseInt(changes.ZWPZFL_JFJE) !== 0) {
							wvself.cardInstance().dataSource.tables('ZWPZFLOP').rows(index).setValue('ZWPZFL_JZFX', '1');
							wvself.cardInstance().dataSource.tables('ZWPZFLOP').rows(index).setValue('ZWPZFL_JFJE', changes.ZWPZFL_JFJE);
						}
						if ($(FZRepeatID_).datagrid('getData').rows.length === 1) {//判断下方是否有一行辅助，如果有则将分录金额同步到辅助
							wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWFZYS).defaultView().currentItem.setValue('ZWFZYS_JE', changes.ZWPZFL_JFJE);
							wvself.AssCaculation("J");
						}
					}
					if (changes.hasOwnProperty('ZWPZFL_DFJE')) {
						if (parseInt(changes.ZWPZFL_DFJE) !== 0) {
							wvself.cardInstance().dataSource.tables('ZWPZFLOP').rows(index).setValue('ZWPZFL_JZFX', '2');
							wvself.cardInstance().dataSource.tables('ZWPZFLOP').rows(index).setValue('ZWPZFL_DFJE', changes.ZWPZFL_DFJE);
						}
						if ($(FZRepeatID_).datagrid('getData').rows.length === 1) {
							wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWFZYS).defaultView().currentItem.setValue('ZWFZYS_JE', changes.ZWPZFL_DFJE);
							wvself.AssCaculation("J");
						}
					}
					if ($(FZRepeatID_).datagrid('getColumnFields').length !== 0)//判断当前分录是否核算
					{
						wvself.cardInstance().dataSource.tables('ZWPZFLOP').rows(index).setValue(ZW_VoucherConstants.XPATH_ISHS, true);
					}
					else {
						wvself.cardInstance().dataSource.tables('ZWPZFLOP').rows(index).setValue(ZW_VoucherConstants.XPATH_ISHS, false);
					}
				}
			}
			,
			//新增时设置焦点
			CreateSetFocsu: function (attchID) {
				//分录第一行为当前行
				if (attchID && attchID.length > 0) {
					if (attchID[0] == '#')
						$(attchID).focus();
					else
						$('#' + attchID).focus();
				}

			},

			AssColumnSummary: function () //计算辅助分录的金额总和同步到凭证分录（计算表达式）
			{
				var wvself = this;
				var parentRow = wvself.cardInstance().dataSource.tables('ZWPZFLOP').rows(ZW_VoucherConstants.CurrentRow);
				var assRows = $(FZRepeatID_).datagrid('getRows')//获取当前的数据行
				var totalValue = 0, wbTotalValue = 0;
				if (parentRow == null)
					return;
				var itemID = parentRow.getValue(ZW_VoucherConstants.XPATH_ZWPZFL_ID);
				for (var i = 0; i < assRows.length; i++) {
					totalValue += parseFloat(assRows[i][ZW_VoucherConstants.XPATH_ZWFZYS_JE]);
					wbTotalValue += parseFloat(assRows[i][ZW_VoucherConstants.XPATH_ZWFZYS_WB]);
				}

				var jsFx = parentRow.getValue(ZW_VoucherConstants.XPATH_ZWPZFL_JZFX);
				if (!jsFx) {
					jsFx = "1";
					parentRow.setValue(ZW_VoucherConstants.XPATH_ZWPZFL_JZFX, "1");
				}
				switch (jsFx) {
					case "2":
						parentRow.setValue(ZW_VoucherConstants.XPATH_ZWPZFL_DFJE, totalValue.toFixed(wvself.precision()));
						break;
					case "1":
						parentRow.setValue(ZW_VoucherConstants.XPATH_ZWPZFL_JFJE, totalValue.toFixed(wvself.precision()));
						break;
				}
				//处理外币
				var hl = 0;
				if (assRows.length > 0) {
					//汇率类型 :1:直接汇率：=原币*汇率=折算币  2:简接汇率：=原币/汇率=拆算币
					var hllx = assRows[0][ZW_VoucherConstants.XPATH_ZWFZYS_HLLX];
					switch (hllx) {
						case "1":
							hl = (wbTotalValue == 0) ? 0 : totalValue / wbTotalValue;
							break;
						case "2":
							hl = (totalValue == 0) ? 0 : wbTotalValue / totalValue;
							break;
					}
				}
				//parentRow.setValue(ZW_VoucherConstants.XPATH_ZWPZFL_WB,wbTotalValue.toFixed(wvself.WBPrecision()));
				parentRow.setValue(ZW_VoucherConstants.XPATH_ZWPZFL_HL, (1).toFixed(wvself.HLPrecision()));

				// 合计行更新
				$('#itemGrid').datagrid('statistics');
			},

			//增加精度控制显示
			toDecimal: function (num, jd) {
				var f = parseFloat(num);
				if (isNaN(f)) {
					return false;
				}
				var fjd = Math.pow(10, jd);
				var f = Math.round(num * fjd) / fjd;
				var s = f.toString();
				var rs = s.indexOf('.');
				if (rs < 0) {
					rs = s.length;
					s += '.';
				}
				while (s.length <= rs + jd) {
					s += '0';
				}
				return s;
			}
			,

			DeepClone: function (obj) {
				// Handle the 3 simple types, and null or dataSouce
				if (null == obj || "object" != typeof obj) return obj;

				// Handle Date
				if (obj instanceof Date) {
					var copy = new Date();
					copy.setTime(obj.getTime());
					return copy;
				}

				// Handle Array
				if (obj instanceof Array) {
					var copy = [];
					for (var i = 0, len = obj.length; i < len; ++i) {
						copy[i] = this.DeepClone(obj[i]);
					}
					return copy;
				}

				// Handle Object
				if (obj instanceof Object) {
					var copy = {};
					for (var attr in obj) {
						if (obj.hasOwnProperty(attr)) copy[attr] = this.DeepClone(obj[attr]);
					}
					return copy;
				}

				throw new Error("Unable to copy obj! Its type isn't supported.");
			},
			//用在更新科目时候的新增辅助，如已有数据则清空，如没有数据则新增
			createAss: function (kmbh) {
				var wvself = this,
					fzGrid = $(FZRepeatID_),
					dataSource = wvself.cardInstance().dataSource;
				wvself.deleteItemEx(true);
				if (ZW_VoucherConstants.KMInfo[kmbh]['@existHs'] === 'True') {
					var defaultValues = dataSource.tables(ZW_VoucherConstants.TABLE_ZWFZYS).newRow().peek();
					dafaultValues = wvself.AddDefaultValue(defaultValues, kmbh);
					dataSource.tables(ZW_VoucherConstants.TABLE_ZWFZYS).defaultView().add(defaultValues);
					wvself.AssCaculation("J");
				}

			},

			GetCurrentAssRow: function (itemID) {
				var wvself = this;
				var assTable = wvself.DefaultAssTable();
				var len = assTable.length;
				var rows = [];
				for (var i = 0; i < len; i++) {
					var row = assTable[i];
					if (row[ZW_VoucherConstants.XPATH_ZWFZYS_FLID] == itemID)
						rows.push(row);
				}

				return rows;
			}
			,
			//该方法从数据源获取该行并用来赋值
			GetCurrentAssRowFromDataSouce: function(itemID){
				var wvself = this;
				var assTable = wvself.cardInstance().dataSource.tables('ZWFZYS');
				var len = assTable.peek().length;
				var rows = [];
				for (var i = 0; i < len; i++) {
					var row = assTable.rows(i);
					if (row.getValue(ZW_VoucherConstants.XPATH_ZWFZYS_FLID) === itemID)
						rows.push(row);
				}
				return rows;
			}
			,
			//手动添加默认值
			AddDefaultValue: function (row, kmbh)//true为完全初始化，false为只初始数量和金额
			{
				var wvself = this;
				var parentRow = wvself.cardInstance().dataSource.tables('ZWPZFLOP').rows(ZW_VoucherConstants.CurrentRow);
				var dataSource = wvself.cardInstance().dataSource;
				var JFJE = dataSource.tables('ZWPZFLOP').defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZFL_JFJE]();
				var DFJE = dataSource.tables('ZWPZFLOP').defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZFL_DFJE]();
				var JZFX = dataSource.tables('ZWPZFLOP').defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZFL_JZFX]();
				var ZY = dataSource.tables('ZWPZFLOP').defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZFL_ZY]();
				var PZID = dataSource.tables('ZWPZKOP').defaultView().currentItem[ZW_VoucherConstants.XPATH_ZWPZK_ID]();
				var PZRQ = wvself.CurDate();
				var KMBH = kmbh;
				var defaultNum = 0;



				var FZSL = row['ZWFZYS_SL'];
				var FZDJ = row['ZWFZYS_DJ'];
				var FZJE = row['ZWFZYS_JE'];//加对默认值的控制
				var FZWB = row['ZWFZYS_WB'];
				var FZHL = row['ZWFZYS_HL'];


				//var FZDJ = dataSource.tables(ZW_VoucherConstants.TABLE_ZWFZYS).defaultView().currentItem['ZWFZYS_DJ']();
				//var FZJE = parseFloat(SL)*parseFloat(DJ);//算一下金额

				//row['ZWFZYS_SL'] = wvself.toDecimal(FZSL,wvself.SLPrecision());
				//row[ZW_VoucherConstants.XPATH_ZWFZYS_SL] = ((wvself.paramLists().ZW_SLKZ === '1' && ZW_VoucherConstants.Asslist[KMBH]['HSSL'])?1:0).toFixed(wvself.SLPrecision());
				row[ZW_VoucherConstants.XPATH_ZWFZYS_KMBH] = KMBH;
				row[ZW_VoucherConstants.XPATH_ZWFZYS_DWBH] = wvself.CurCompany();
				row[ZW_VoucherConstants.XPATH_ZWFZYS_PZID] = PZID;
				row[ZW_VoucherConstants.XPATH_ZWFZYS_ID] = adp.string.createGUID();
				row[ZW_VoucherConstants.XPATH_ZWFZYS_YSBH] = "0001";//临时代码
				row[ZW_VoucherConstants.XPATH_ZWFZYS_DWDZ] = "0";
				row[ZW_VoucherConstants.XPATH_ZWFZYS_YHDZ] = "0";
				//row["CreatedTime"] = DateTime.MinValue;//C#
				//row[ZW_VoucherConstants.XPATH_ZWFZYS_HL] = "1";
				row[ZW_VoucherConstants.XPATH_ZWFZYS_HL] = defaultNum.toFixed(wvself.HLPrecision());
				row[ZW_VoucherConstants.XPATH_ZWFZYS_JSRQ] = wvself.FormatDate(PZRQ);//结算日期
				row[ZW_VoucherConstants.XPATH_ZWFZYS_YWRQ] = wvself.FormatDate(PZRQ);//业务日期
				row[ZW_VoucherConstants.XPATH_ZWFZYS_YT] = ZY;





				//row['ZWFZYS_JE'] = wvself.toDecimal(0,wvself.precision());
				//row['ZWFZYS_DJ'] = wvself.toDecimal(0,wvself.DJPrecision());
				//row['ZWFZYS_WB'] = wvself.toDecimal(0,wvself.WBPrecision());
				//row['ZWFZYS_HL'] = wvself.toDecimal(0,wvself.HLPrecision());
				//辅助信息处理
				var infoList = ZW_VoucherConstants.KMInfo[KMBH].value
				for (var i = 0; i < infoList.length; i++) {
					var curEle = infoList[i];
					var other = curEle['@other'];
					var refNode = curEle['@RefNode'];
					switch (refNode) {
						case "ZWFZYS_WBBH_LSWBZD_BZMC": //外币
							if (other) {
								row[ZW_VoucherConstants.XPATH_ZWFZYS_WBBH] = other;
								row[ZW_VoucherConstants.XPATH_ZWFZYS_WBBH_LSWBZD_BZMC] = curEle["@name"];
								if (curEle["@precision"])
									wvself.context.setParam(ZW_VoucherConstants.KEY_ZW_WBDECN, curEle["@precision"]);
							}
							else {
								row[ZW_VoucherConstants.XPATH_ZWFZYS_WBBH] = wvself.DefaultCurrency().CurrencyCode;
								row[ZW_VoucherConstants.XPATH_ZWFZYS_WBBH_LSWBZD_BZMC] = wvself.DefaultCurrency().CurrencyName;
								if (wvself.DefaultCurrency().CurrencyPrecision)
									wvself.context.setParam(ZW_VoucherConstants.KEY_ZW_WBDECN, wvself.DefaultCurrency().CurrencyPrecision);
							}


							//外币金额格式化,单一币种,不可编辑
							//calcEdit = (DevExpress.XtraEditors.Repository.RepositoryItemCalcEdit)this.AssGrid.Columns[ZW_VoucherConstants.XPATH_ZWFZYS_WB].ColumnEdit;
							//this.SetDisplayFormat(calcEdit, this.WBPrecision, true, true);
							$(FZRepeatID_).datagrid('getColumnOption', 'ZWFZYS_WB').editor.options.precision = wvself.WBPrecision();
							$(FZRepeatID_).datagrid('getColumnOption', ZW_VoucherConstants.XPATH_ZWFZYS_WBBH_LSWBZD_BZMC).readonly = (!other) ? false : true;
							break;
						case "ZWFZYS_HL":  //汇率
							if (!other)
								other = "1";
							row[ZW_VoucherConstants.XPATH_ZWFZYS_HLLX] = other;   //汇率类型
							//MessageBox.Show(other);
							var hlRate = wvself.DefaultCurrency().ExchangeRate;//取本位币汇率
							if (curEle["@rate"])
								hlRate = curEle["@rate"];
							row[ZW_VoucherConstants.XPATH_ZWFZYS_HL] = hlRate; //汇率

							if (curEle["@precision"])  //汇率精度
								wvself.context.setParam(ZW_VoucherConstants.KEY_ZW_HLDECN, curEle["@precision"]);
							else
								wvself.context.setParam(ZW_VoucherConstants.KEY_ZW_HLDECN, wvself.DefaultCurrency().ExchangeRatePrecision);
							$(FZRepeatID_).datagrid('getColumnOption', 'ZWFZYS_HL').editor.options.precision = wvself.HLPrecision();

							//汇率格式化
							//calcEdit = (DevExpress.XtraEditors.Repository.RepositoryItemCalcEdit)this.AssGrid.Columns[ZW_VoucherConstants.XPATH_ZWFZYS_HL].ColumnEdit;
							// this.SetDisplayFormat(calcEdit, this.HLPrecision, true, false);
							break;
						case "ZWFZYS_SL":  //数量
							if (wvself.paramLists().ZW_SLKZ == "1")
								row[ZW_VoucherConstants.XPATH_ZWFZYS_SL] = "1";
							break;




						/*case "ZWFZYS_YWH":
							/业务号
							if (paramLists.ZW_PZAUTOYWH == "1" && sameFX==true)//业务号自动生成
							{
								string maxYWH = Convert.ToString(this.DefaultAssTable.Compute("MAX(ZWFZYS_YWH)", ""));
								int flNum = 0;
								int fzNum = 0;
								if (maxYWH.Length > 8)
								{
									flNum = Convert.ToInt32(maxYWH.Substring(maxYWH.Length - 8, 4));
									//fzNum = Convert.ToInt32(maxYWH.Substring(maxYWH.Length - 4, 4));
								}
								row[ZW_VoucherConstants.XPATH_ZWFZYS_YWH] = CreateYWH(flNum + 1, fzNum + 1, VoucherHeaderRow);
							}
							break;*/
					}
					//设置外币精度
				}

				//row['ZWFZYS_WBBH'] = wvself.DefaultCurrency().CurrencyCode;//临时代码

				var itemMoney = parseFloat(parentRow.getValue(ZW_VoucherConstants.XPATH_ZWPZFL_JFJE)) + parseInt(parentRow.getValue(ZW_VoucherConstants.XPATH_ZWPZFL_DFJE))
				if (itemMoney != 0) {
					row[ZW_VoucherConstants.XPATH_ZWFZYS_JZFX] = JZFX;
					var curSL = parseInt(row[ZW_VoucherConstants.XPATH_ZWFZYS_SL]);
					row[ZW_VoucherConstants.XPATH_ZWFZYS_JE] = itemMoney;
					row[ZW_VoucherConstants.XPATH_ZWFZYS_DJ] = (curSL === 0) ? defaultNum : (itemMoney / curSL);
				}
				else {
					row['ZWFZYS_JE'] = defaultNum.toFixed(wvself.precision());
					row['ZWFZYS_WB'] = defaultNum.toFixed(wvself.WBPrecision());
				}
				//row['ZWFZYS_HL'] = defaultNum.toFixed(wvself.HLPrecision());
				row[ZW_VoucherConstants.XPATH_ZWFZYS_DJ] = parseFloat(row[ZW_VoucherConstants.XPATH_ZWFZYS_DJ]).toFixed(wvself.DJPrecision());
				row[ZW_VoucherConstants.XPATH_ZWFZYS_JE] = parseFloat(row[ZW_VoucherConstants.XPATH_ZWFZYS_JE]).toFixed(wvself.precision());
				row[ZW_VoucherConstants.XPATH_ZWFZYS_SL] = parseFloat(row[ZW_VoucherConstants.XPATH_ZWFZYS_SL]).toFixed(wvself.SLPrecision());
				row[ZW_VoucherConstants.XPATH_ZWFZYS_WB] = parseFloat(row[ZW_VoucherConstants.XPATH_ZWFZYS_WB]).toFixed(wvself.WBPrecision());
				row[ZW_VoucherConstants.XPATH_ZWFZYS_HL] = parseFloat(row[ZW_VoucherConstants.XPATH_ZWFZYS_HL]).toFixed(wvself.HLPrecision());

				return row;

			}
			,
			//格式化8位日期yyyy-MM-dd
			FormatDate: function (date) {
				var formatdate = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
				return formatdate;
			}
			,
			FormatDate8: function (date) {
				if (!date)
					return '';
				else if (typeof date == 'string' && date.length == 8 && date[0] == '2')
					return date;
				else {
					date = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
					return date;
				}
			}
			,
			FormatDate10:function(date)
			{
				if(!date)
					return date;
				else if(date.indexOf('-')>0&&date.length==10)
					return date;
				else if(date.length==8)
					return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
			}
			,
			changeDataSource: function () {
				var wvself = this;
				var source = wvself.cardInstance().dataSource;
			}
			,
			initFormWithSixFL: function (FLGrid) {
				var wvself = this;
				var dfd = $.Deferred();
				var actions = [];
				$('#'+ZW_VoucherConstants.PicBox2).css('display','none');
				actions.push(this.view.getActionObject('create'));
				actions.push(this.view.getActionObject('CreateBill1'));
				actions.push(this.view.getActionObject('addSixFLItem'));
				return this.view.stateMachine.invokeActionQueue(actions).then(function(){
					//wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().items(0).setValue(ZW_VoucherConstants.XPATH_ZWPZK_DWBH_LSBZDW_DWMC,'花生油');
					var company=wvself.CurCompany();
					if(company)
					{
						wvself.cardInstance().dataSource.tables('ZWPZKOP').defaultView().currentItem.setValue('ZWPZK_DWBH',company);
						//wvself.cardInstance().dataSource.tables(0).defaultView().items(0).setValue('ZWPZK_DWBH', company);
						
						//临时代码
						$('#'+ZW_VoucherConstants.CompanyHlp).adplookupbox('setValue','集团本部');
						ko.contextFor($('body')[0]).$data.tables(0).defaultView().items(0).setValue(ZW_VoucherConstants.XPATH_ZWPZK_DWBH_LSBZDW_DWMC, company);
						ko.contextFor($('body')[0]).$data.tables(0).defaultView().items(0).setValue(ZW_VoucherConstants.XPATH_ZWPZK_DWBH_LSBZDW_DWMC, '集团本部');
						//wvself.cardInstance().dataSource.tables(0).defaultView().items(0).setValue(ZW_VoucherConstants.XPATH_ZWPZK_DWBH_LSBZDW_DWMC, '集团本部')
					}
				})

				return wvself.context.view().transitInvoke
					('Create',
					[
						{
							target: 'CardController',
							methodName: 'create',
							params: []
						}
						,
						{
							target: 'ZW_WebVoucherPub',
							methodName: 'CreateBill',
							params: []
						},

						{
							target: 'ZW_WebVoucherPub',
							methodName: 'addSixFLItem',
							params: [$('#' + FLGrid)]
						}
					]
					).then(function(){
						alert('gg')
					});
				// dfd.resolve(); // 改变deferred对象的执行状态

				// return dfd;
			}
			,
			addSixFLItem: function (FLGrid) {

				var wvself = this;
				if(typeof FLGrid=='string')
					FLGrid=$('#'+FLGrid);
				var table = wvself.cardInstance().dataSource.tables('ZWPZFLOP');
				for (var i = 0; i < 6; i++) {
					var defaultValues = table.newRow().peek();
					table.defaultView().add(defaultValues);
					table.defaultView().currentItem.setValue('ZWPZFL_JFJE', 0);//临时代码，如果不做此处理则会导致JFJE为undefined，服务器获取不到这个列
					table.defaultView().currentItem.setValue('ZWPZFL_DFJE', 0);//临时代码
					table.defaultView().currentItem.setValue('ZWPZFL_DWBH', '0101');//临时代码
					table.defaultView().currentItem.setValue('ZWPZFL_FLBH', "100" + i);//临时代码
					table.defaultView().currentItem.setValue('ZWPZFL_FLNM', "100" + i);//临时代码
				}
				FLGrid.datagrid('selectRow', 0);
			}
			,
			NewAssDefaultValue: function (row, KMBH) {
				var wvself = this;
				var FZSL = (wvself.paramLists().ZW_SLKZ === '1' && ZW_VoucherConstants.Asslist[KMBH]['HSSL']) ? 1 : 0;
				var FZDJ = parseFloat(row['ZWFZYS_DJ']);
				var FZHL = parseFloat(row['ZWFZYS_HL'])
				var FZJE = FZDJ * FZSL;
				var fzGrid = $(FZRepeatID_);
				var SelectedIndex = fzGrid.datagrid('getRowIndex', fzGrid.datagrid('getSelected'));
				var lastYSBH = fzGrid.datagrid('getRows')[SelectedIndex][ZW_VoucherConstants.XPATH_ZWFZYS_YSBH];

				row['ZWFZYS_SL'] = FZSL.toFixed(wvself.SLPrecision());
				row['ZWFZYS_JE'] = FZJE.toFixed(wvself.precision());
				if (FZHL) {
					row['ZWFZYS_WB'] = (FZJE / FZHL).toFixed(wvself.WBPrecision());
				}

				var ysbh = '000' + (parseInt(lastYSBH) + 1);
				row[ZW_VoucherConstants.XPATH_ZWFZYS_YSBH] = ysbh.substring(ysbh.length - 4);
				return row;
			}
			,
			getCurrency: function (currencyID) {
				var wvself = this;
				var companyID = wvself.CurCompany();
				var curDate = wvself.CurDate();
				var year = wvself.CurYear();
				var period = wvself.CurPeriod();
				var args = [year, companyID, period, curDate, currencyID]

				if (!currencyID || (currencyID === (gsp.application.applicationContext.getParam('FISession').gsBwb).toString() && companyID === (gsp.application.applicationContext.getParam('FISession').gsHsdw).toString())) {
					currency = wvself.DefaultCurrency();
					return $.Deferred().resolve(currency);
				}
				else {
					var key = companyID + ',' + curDate + currencyID;
					if(ZW_VoucherConstants.currencyInfo[key]){
							return $.Deferred().resolve(ZW_VoucherConstants.currencyInfo[key]);
					}
					else{
					return wvself.callWSEx('Genersoft.FI.ZW.Web', 'Genersoft.FI.ZW.Web.ZWVoucherWebPubCore', 'GetCurrency', args, companyID, curDate, 5)
						.then(function (result) {
							//currency = this.client.GetCurrency(year, companyID, period, curDate, currencyID, this.Session);
							//currencyInfo.Add(key, currency);
							
							ZW_VoucherConstants.currencyInfo[key] = result.data;
							return $.Deferred().resolve(result.data);
							//}
						});
					}
				}
			}
			,
			setWBJD:function(){
				var wvself = this;
				var curItemID = $(FLRepeatID_).datagrid('getSelected')[ZW_VoucherConstants.XPATH_ZWPZFL_ID];
				var assRow = wvself.GetCurrentAssRowFromDataSouce(curItemID);
				if (assRow.length > 0){
					var row = assRow[0];

					var currencyID = row.getValue("ZWFZYS_WBBH").toString();
					return wvself.getCurrency(currencyID).then(function(currency){

						wvself.context.setParam(ZW_VoucherConstants.KEY_ZW_WBDECN, currency.CurrencyPrecision.toString());
						wvself.context.setParam(ZW_VoucherConstants.KEY_ZW_HLDECN, currency.ExchangeRatePrecision.toString());
						//辅助外币金额精度
						//DevExpress.XtraEditors.Repository.RepositoryItemCalcEdit calcEdit = (DevExpress.XtraEditors.Repository.RepositoryItemCalcEdit)this.AssGrid.Columns[ZW_VoucherConstants.XPATH_ZWFZYS_WB].ColumnEdit;
						//this.SetDisplayFormat(calcEdit, this.WBPrecision, true, true);

						//辅助汇率
						//calcEdit = (DevExpress.XtraEditors.Repository.RepositoryItemCalcEdit)this.AssGrid.Columns[ZW_VoucherConstants.XPATH_ZWFZYS_HL].ColumnEdit;
						//this.SetDisplayFormat(calcEdit, this.HLPrecision, true, false);

						//辅助外币合计精度
						//DevExpress.XtraGrid.GridColumnSummaryItem summaryEdit = (DevExpress.XtraGrid.GridColumnSummaryItem)this.AssGrid.Columns[ZW_VoucherConstants.XPATH_ZWFZYS_WB].SummaryItem;
						//this.SetSummaryFormat(summaryEdit, WBPrecision);
						//设置一下汇率类型
						for (var i = 0; i < assRow.length; i++){
							var hllx = assRow[i].getValue(ZW_VoucherConstants.XPATH_ZWFZYS_HLLX);
							if (hllx != "1" && hllx != "2")
								assRow[i].setValue(ZW_VoucherConstants.XPATH_ZWFZYS_HLLX, currency.ExchangeRateType);
						}
					});

					
				}
			},
            //凭证号是否为空
            VoucherIsNotEmpty: function (voucherID) {
                var returnValue = {};
                voucherID = '';
                var wvself = this;
                if (!wvself.DefaultMainTable() || wvself.DefaultMainTable().length === 0) {
                    returnValue['bool'] = false;
                    returnValue['voucherID'] = voucherID;
                    return returnValue;
                }

                var mainRow = wvself.VoucherHeaderRow();
                voucherID = mainRow[ZW_VoucherConstants.XPATH_ZWPZK_ID];
                if (!voucherID) {
                    returnValue['bool'] = false;
                    returnValue['voucherID'] = voucherID;
                    return returnValue;
                }
                returnValue['bool'] = true;
                returnValue['voucherID'] = voucherID;
                return returnValue;
			},
			AssCaculation: function (blurFlag) {
				var wvself = this;
				//var curAssIndex = $(FZRepeatID_).datagrid('getRowIndex',($(FZRepeatID_).datagrid('getSelected')));
				var curAss = wvself.cardInstance().dataSource.tables(ZW_VoucherConstants.TABLE_ZWFZYS).defaultView().currentItem; //this.DefaultAssTable.Rows[this.GetAssDataSourceIndex(assID)];
				if (curAss == null)
					return;
				var sl = parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_SL]());  //数量
				var dj = parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_DJ]());  //单价
				var je = parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE]());  //金额 
				var wb = parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_WB]());  //外币
				var hl = parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_HL]());  //汇率
				var hllx = curAss[ZW_VoucherConstants.XPATH_ZWFZYS_HLLX](); //1:直接汇率：=原币*汇率=折算币   2:简接汇率：=原币/汇率=拆算币
				//S:数量,D:单价,J:金额,W:外币,H:汇率
				var caculateVaue = 0;
				var djAutoFlag = wvself.paramLists()["ZW_DJAUTO"];//直接根据金额、数量计算单价，即使金额是负数，也计算出来负数的单价
				switch (blurFlag) {
					case "S":   //数量，计算金额
						if (sl != 0 && dj === parseFloat((je / sl).toFixed(wvself.DJPrecision())))
							break;
						if (sl === 0 && dj === 0)
							break;
						//如果金额为0，则计算金额------此处因为金额可能是自动计算的（输入一方后），不需要重新输入，所以优先计算单价2010-8-18
						if (je === 0) {
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_SL, parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_SL]).toFixed(wvself.SLPrecision()));
							caculateVaue = sl * dj;
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, caculateVaue.toFixed(wvself.precision()));//本位币
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, wvself.WBvalueCalcuate(parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE]), hl, wvself.WBPrecision(), hllx)); //外币金额
							break;
						}
						caculateVaue = (sl === 0) ? 0 : je / sl;

						if (caculateVaue >= 0 || djAutoFlag === "1")
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DJ, caculateVaue.toFixed(wvself.DJPrecision()));
						else {
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DJ, (-caculateVaue).toFixed(wvself.DJPrecision()));
							je = -je;
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, je.toFixed(wvself.precision())); //本位币
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, wvself.WBvalueCalcuate(je, hl, wvself.WBPrecision(), hllx)); //外币金额
						}
						break;
					case "D":
						if (sl != 0 && dj === parseFloat((je / sl).toFixed(wvself.DJPrecision())))
							break;
						if (sl == 0 && dj === 0)
							break;
						if (sl == 0) {
							caculateVaue = je / dj;
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_SL, caculateVaue.toFixed(wvself.SLPrecision()));
						}
						else {
							caculateVaue = sl * dj;
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, caculateVaue.toFixed(wvself.precision())); //本位币
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, wvself.WBvalueCalcuate(parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE]), hl, wvself.WBPrecision(), hllx)); //外币金额
						}
						break;
					case "J":  //金额,计算单价
						curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE]()).toFixed(wvself.precision()));

						caculateVaue = (sl === 0) ? 0 : je / sl;
						if (je != parseFloat((dj * sl).toFixed(wvself.precision()))) {
							if (sl === 0 && dj != 0) {
								caculateVaue = je / dj;
								curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_SL, caculateVaue.toFixed(wvself.SLPrecision()));
							}
							else {
								if (caculateVaue >= 0 || djAutoFlag === "1")
									curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DJ, caculateVaue.toFixed(wvself.DJPrecision())); //单价
								else {
									curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DJ, (-caculateVaue).toFixed(wvself.DJPrecision())); //单价
									curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_SL, (-sl).toFixed(wvself.SLPrecision()));
								}
							}
						}
						if (wb === 0 || (hllx != "1" && hllx != "2")) {
							if (wvself.paramLists()["ZW_BwbHlAllowZero"] === "1" && hl === 0)  //汇率允许为0，并且为0时，不处理
								break;
							//外币处理考虑前边分录的汇率都一致,不是本位币
							if (curAss[ZW_VoucherConstants.XPATH_ZWFZYS_WBBH]() != wvself.DefaultCurrency().CurrencyCode) {
								var rows = [];
								for (var j = 0; j < wvself.DefaultAssTable().length; j++) {
									if (wvself.DefaultAssTable()[j][ZW_VoucherConstants.XPATH_ZWFZYS_ID] != curAss[ZW_VoucherConstants.XPATH_ZWFZYS_ID]()) {
										rows.push(wvself.DefaultAssTable()[j]);
									}
								}
								//var rows = this.DefaultAssTable.Select(string.Format("ZWFZYS_ID<>'{0}'", curAss[ZW_VoucherConstants.XPATH_ZWFZYS_ID]), "ZWFZYS_WBBH,ZWFZYS_HL", DataViewRowState.CurrentRows);
								var count = rows.length;
								if (count > 0) {
									//外币、汇率都一致，并且外币与本辅助一致
									if (rows[0][ZW_VoucherConstants.XPATH_ZWFZYS_WBBH] === curAss[ZW_VoucherConstants.XPATH_ZWFZYS_WBBH]() &&
										rows[0][ZW_VoucherConstants.XPATH_ZWFZYS_WBBH] === rows[count - 1][ZW_VoucherConstants.XPATH_ZWFZYS_WBBH] &&
										rows[0][ZW_VoucherConstants.XPATH_ZWFZYS_HL] === rows[count - 1][ZW_VoucherConstants.XPATH_ZWFZYS_HL]) {
										//计算外币合计
										var wbfzhj = 0;
										var jehj = 0;
										var rows1 = [];
										for (var i = 0; i < count; i++) {
											for (var j = 0; j < wvself.DefaultItemTable().length; j++) {
												if (wvself.DefaultItemTable()[j][ZW_VoucherConstants.XPATH_ZWPZFL_ID] === rows[i][ZW_VoucherConstants.XPATH_ZWFZYS_FLID]) {
													rows1.push(wvself.DefaultItemTable()[j]);
												}
											}
											//var rows1 = this.DefaultItemTable.Select(string.Format("ZWPZFL_ID='{0}'", rows[i][ZW_VoucherConstants.XPATH_ZWFZYS_FLID]), string.Empty, DataViewRowState.CurrentRows);
											if (rows1[0][ZW_VoucherConstants.XPATH_ZWPZFL_JZFX] == "1") {
												wbfzhj -= parseFloat(rows[i][ZW_VoucherConstants.XPATH_ZWFZYS_WB]);
												jehj -= parseFloat(rows[i][ZW_VoucherConstants.XPATH_ZWFZYS_JE]);
											}
											else {
												wbfzhj += parseFloat(rows[i][ZW_VoucherConstants.XPATH_ZWFZYS_WB]);
												jehj += parseFloat(rows[i][ZW_VoucherConstants.XPATH_ZWFZYS_JE]);
											}
										}
										if (jehj === - je)
											wbfzhj = - wbfzhj;
										var fzhl = parseFloat(rows[0][ZW_VoucherConstants.XPATH_ZWFZYS_HL]);
										if (wbfzhj.toFixed(wvself.WBPrecision()) == wvself.WBvalueCalcuate(je, fzhl, wvself.WBPrecision(), hllx) || je.toFixed(wvself.precision()) == wvself.curValueCalcuate(wbfzhj, fzhl, wvself.precision(), hllx)) {
											curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, wbfzhj);
											curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_HL, fzhl);
											break;
										}
									}
								}
							}
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, wvself.WBvalueCalcuate(parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE]()), hl, wvself.WBPrecision(), hllx)); //外币金额
						}
						else {
							if (wb.toFixed(wvself.WBPrecision()) == wvself.WBvalueCalcuate(je, hl, wvself.WBPrecision(), hllx) || je.toFixed(wvself.precision()) == wvself.curValueCalcuate(wb, hl, wvself.precision(), hllx))
								break;
							//2011-4-18 增加参数汇率是否变化参数ZW_PZHLBB，是1，则计算时汇率不变
							if (wvself.paramLists()["ZW_PZHLBB"] == "1") {
								var zwYxwc = parseFloat(wvself.paramLists()["ZW_YXWC"]);
								if (zwYxwc == 0) {
									curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, wvself.WBvalueCalcuate(je, hl, wvself.WBPrecision(), hllx));
								}
								else {
									var balance = Math.abs(parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_WB]()) - parseFloat(wvself.WBvalueCalcuate(je, hl, wvself.WBPrecision(), hllx)));
									if (balance > zwYxwc)
										curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, wvself.WBvalueCalcuate(je, hl, wvself.WBPrecision(), hllx));
								}
							}
							else {

								var cacuHL = wvself.HlCalcuate(wb, je, wvself.HLPrecision(), hllx);
								if (cacuHL) {
									if (parseFloat(cacuHL) >= 0)
										curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_HL, cacuHL);
									else {
										curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_HL, (-parseFloat(cacuHL)).toFixed(wvself.WBPrecision()));
										curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, (-wb).toFixed(wvself.WBPrecision()));
									}
								}
							}
						}
						break;
					case "W": //外币: 根据外币计算本位币金额
						curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_WB, parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_WB]()).toFixed(wvself.WBPrecision()));
						if (je == 0 || (hllx != "1" && hllx != "2")) {
							if (wvself.paramLists()["ZW_BwbHlAllowZero"] == "1" && hl == 0)  //汇率允许为0，并且为0时，金额不变
								break;

							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, wvself.curValueCalcuate(wb, hl, wvself.precision(), hllx));

							je = parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE]());
							caculateVaue = (sl == 0) ? 0 : je / sl;
							if (caculateVaue >= 0 || djAutoFlag == "1")
								curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DJ, caculateVaue.toFixed(wvself.DJPrecision())); //单价
							else {
								curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DJ, (- caculateVaue).toFixed(wvself.DJPrecision())); //单价
								curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_SL, (- sl));
							}
						}
						else {
							if (wb == wvself.WBvalueCalcuate(je, hl, wvself.WBPrecision(), hllx) || je == wvself.curValueCalcuate(wb, hl, wvself.precision(), hllx))
								break;
							//2011-4-18 增加参数汇率是否变化参数ZW_PZHLBB，是1，则计算时汇率不变
							if (wvself.paramLists()["ZW_PZHLBB"] == "1") {
								// curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE] = this.curValueCalcuate(wb, hl, this.precision, hllx);
								var zwYxwc = parseFloat(wvself.paramLists()["ZW_YXWC"]);
								if (zwYxwc == 0) {
									curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, wvself.curValueCalcuate(wb, hl, wvself.precision(), hllx));
								}
								else {
									var balance = Math.abs(parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE]) - parseFloat(wvself.curValueCalcuate(wb, hl, wvself.precision(), hllx)));
									if (balance > zwYxwc)
										curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, wvself.curValueCalcuate(wb, hl, wvself.precision(), hllx));
								}
							}
							else {
								var Cacuhl = wvself.HlCalcuate(wb, je, wvself.HLPrecision(), hllx);
								if (Cacuhl) {
									if (parseFloat(Cacuhl) >= 0)
										curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_HL, Cacuhl);
									else {
										curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_HL, - parseFloat(Cacuhl));
										curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, -je);
									}
								}
							}
						}
						break;
					case "H": //汇率： 计算本位币金额
						if (hllx != "1" && hllx != "2") {
							if (wvself.paramLists()["ZW_BwbHlAllowZero"] != "1" || hl != 0) {
								curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_HL, 1);
								break;
							}
						}
						if (wb.toFixed(wvself.WBPrecision()) === wvself.WBvalueCalcuate(je, hl, wvself.WBPrecision(), hllx) || je.toFixed(wvself.precision()) == this.curValueCalcuate(wb, hl, wvself.precision(), hllx))
							break;
						if (hl < 0) {
							hl = -hl;
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_HL, hl);
						}
						// curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE] = this.curValueCalcuate(wb, hl, this.precision, hllx); //本位币
						if (wvself.paramLists()["ZW_PZHLBB"] === "1") {
							//curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE] = this.curValueCalcuate(wb, hl, this.precision, hllx);
							var zwYxwc = parseFloat(wvself.paramLists()["ZW_YXWC"]);
							if (zwYxwc == 0) {
								curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, wvself.curValueCalcuate(wb, hl, wvself.precision(), hllx));
							}
							else {
								var balance = Math.abs(parseFloat(curAss[ZW_VoucherConstants.XPATH_ZWFZYS_JE]()) - parseFloat(wvself.curValueCalcuate(wb, hl, wvself.precision, hllx)));
								if (balance > zwYxwc)
									curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, wvself.curValueCalcuate(wb, hl, wvself.precision, hllx));
							}
						}
						else {
							curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_JE, wvself.curValueCalcuate(wb, hl, wvself.precision(), hllx));
						}
						caculateVaue = (sl == 0) ? 0 : je / sl;
						curAss.setValue(ZW_VoucherConstants.XPATH_ZWFZYS_DJ, caculateVaue.toFixed(wvself.DJPrecision())); //本位币
						break;



				}
			}
			,
			//根据本位币计算外币
			WBvalueCalcuate: function (value, hl, precision, hllx) {
				var wvself = this;
				var curValue = value;
				switch (hllx) {
					case "1": //直接汇率：=原币*汇率=折算币
						curValue = (hl === 0) ? 0 : value / hl;
						break;
					case "2": //简接汇率：=原币/汇率=拆算币
						curValue = value * hl;
						break;
				}
				if (wvself.paramLists()["ZW_BwbHlAllowZero"] === "1" && hl === 0)
					curValue = 0;
				return curValue.toFixed(wvself.WBPrecision());
			}
			,
			//计算汇率
			HlCalcuate: function (wbValue, curValue, precision, hllx) {
				var wvself = this;
				var value = 0;
				if (wbValue != 0 && curValue != 0) {
					switch (hllx) {
						case "1": //直接汇率：=原币*汇率=折算币
							value = curValue / wbValue;
							break;
						case "2": //简接汇率：=原币/汇率=拆算币
							value = wbValue / curValue;
							break;
					}
				}
				if (value === 0)
					return '';
				else
					//return string.Format(this.GetMaskFormat(precision), value);
					return value.toFixed(wvself.HLPrecision());
			}
			,
			//根据外币计算本位币
			curValueCalcuate: function (wbValue, hl, precision, hllx) {
				var wvself = this;
				var value = 0;
				if (hllx != "1" && hllx != "2")
					value = wbValue;
				switch (hllx) {
					case "1": //直接汇率：=原币*汇率=折算币
						value = wbValue * hl;
						break;
					case "2": //简接汇率：=原币/汇率=拆算币
						value = (hl === 0) ? 0 : wbValue / hl;
						break;
				}
				if (wvself.paramLists()["ZW_BwbHlAllowZero"] == "1" && hl == 0)
					value = 0;
				return value.toFixed(wvself.precision());
				//return string.Format(this.GetMaskFormat(precision), value);
			}
			,
			CellValueChanged: function (changes) {
				var wvself = this;
				var blurFlag = '';
				if (changes[ZW_VoucherConstants.XPATH_ZWFZYS_JE])
					blurFlag = "J";
				else if (changes[ZW_VoucherConstants.XPATH_ZWFZYS_WB])
					blurFlag = "W";
				else if (changes[ZW_VoucherConstants.XPATH_ZWFZYS_SL])
					blurFlag = "S";
				else if (changes[ZW_VoucherConstants.XPATH_ZWFZYS_HL])
					blurFlag = "H";
				else if (changes[ZW_VoucherConstants.XPATH_ZWFZYS_DJ])
					blurFlag = "D";
				if (blurFlag)
					wvself.AssCaculation(blurFlag);
			}
			,
			EndEditAllTable:function(){
				this.gridHelper.endEditAllTable(this.view);
			}
		}
	});