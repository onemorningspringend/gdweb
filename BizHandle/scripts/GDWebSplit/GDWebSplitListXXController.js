gsp.module("gsp.app").controller("GDWebSplitListXXController", "CardController",
    function() {
        var curYear = '';
        var curYearPeriod = ''; //年+月
        var curPeriod = ''; //当前会计期间
        var menuID = "GD105";
        var curCompanyCode = '';
        var curDate = '';
        var changeNetSalvageValueBase = '';
        var ifJtzj = '';
        var jtywFlag = '';
        var isNojtlc = '';
        var bgZdgxCs = "0"; //变更时自动勾选重算月折旧额
        var isReCalcCard = false;
        var currJeDecn = 2;
        var currSlDecn = 2;
        var currBlDecn = 2;
        var currZjlDecn = 2;
        var showAssetCount = 0;
        var dicParams = {};
        var URLparams = {};
        var changeOrderNO = '';
        var authorityWhere = ''; //固定资产权限
        var SLCHFBZ = false;
        var JECHFBZ = false;

        return {
            /**
             * 资产拆分详细界面加载
             */
            FormLoad: function() {
                var wzself = this;
                URLparams = parseUrlParams(window.location);
            },
            /**
             * 资产帮助前事件
             */
            Zcbh_DictEntryPicking: function() {
                var wzself = this;
                var bgjscon = "";
                if (jtBoforeBg === "1") {
                    bgjscon = " and GDZCZY_ID not in (select GDBGJL_ZCID from GDBGJL" + curYear + " where GDBGJL_DWBH = '" + curCompanyCode +
                        "' and SUBSTRING(GDBGJL_BGRQ,5,2) = '" + curKjqj + "' and GDBGJL_CWQR = '1')";
                } else {
                    bgjscon = "";
                }
                var adp = $(GDWebBizHandleConstants.ControllerID_SmartHelpforZcbh).adplookupbox('options').adp;
                adp.helpID = "f59078ec-85da-4d44-b785-869b86ef1076";
                adp.mapFields = "GDZCZY_ZCBH";
                adp.condition = "[" + wzself.ArrangeCondition("", "GDZCZY_DWBH", "=", "'" + curCompanyCode + "' and (GDZCZY.GDZCZY_ZZQJ=' '" +
                    " or GDZCZY.GDZCZY_ZZQJ IS NULL ) and exists(select 1 from GDZCZY" + curYear + " A where (A.GDZCZY_KSQJ<='" + curYear +
                    "' {DAE~JoinSymbol} '" + curKjqj + "') AND A.GDZCZY_CWQR='1' and NOT exists(select 1 from GDJSZC" + curYear + " where GDJSZC_DWBH='" +
                    curCompanyCode + "' and GDJSZC_ZCBH=A.GDZCZY_ZCBH and GDJSZC_KJQJ='" + curKjqj + "') and (A.GDZCZY_ZZQJ=' ' or A.GDZCZY_ZZQJ IS NULL )" +
                    " AND A.GDZCZY_DWBH='" + curCompanyCode + "' and A.GDZCZY_ID = GDZCZY.GDZCZY_ID) " + authorityWhere + bgjscon) + "]";
            },
            /**
             * 资产编号帮助后事件
             */
            Zcbh_DictEntryPicked: function() {
                $(GDWebBizHandleConstants.ControllerID_SmartHelpforZcbh).on('OnDictEntryPicked', function(option, dataRow) {
                    var Zcbh = dataRow[0].GDZCZY_ZCBH;
                    wzself.context.setParam('Zcbh', Zcbh); //设置折旧编号全局变量
                    $(GDWebBizHandleConstants.ControllerID_TextboxZCMC).val(dataRow[0].GDZCZY_ZCMC); //资产名称
                    $(GDWebBizHandleConstants.ControllerID_CalculatorZCSL).numberbox('setValue', dataRow[0].GDZCZY_ZCSL); //资产数量
                    $(GDWebBizHandleConstants.ControllerID_CalculatorZCYZ).numberbox('setValue', dataRow[0].GDZCZY_ZCYZ); //资产原值
                    $(GDWebBizHandleConstants.ControllerID_CalculatorLJZJ).numberbox('setValue', dataRow[0].GDZCZY_LJZJ); //累计折旧
                    //设置各个控件的精度
                    $(GDWebBizHandleConstants.ControllerID_CalculatorZCSL).numberbox('options').precision = slDecn; //资产数量
                    $(GDWebBizHandleConstants.ControllerID_CalculatorZCYZ).numberbox('options').precision = jeDecn; //资产原值
                    $(GDWebBizHandleConstants.ControllerID_CalculatorLJZJ).numberbox('options').precision = jeDecn; //累计折旧

                    //判断是否做过减值准备
                    var DSJZ = wzself.GetJZZC(Zcbh);
                    if (DSJZ.data.Table.length >= 1) {
                        $.messager.alert('提示', "选择的拆分资产'" + Zcbh + "'做过减值，请重新选择。", 'warning');
                    }
                });
            },
            /**
             * 拆分比例焦点丢失事件
             */
            CfblLostFocus: function() {
                var vsTemp = $(GDWebBizHandleConstants.ControllerID_TextboxCFBL).text('options')[0].value;
                if (vsTemp === "" || vsTemp === null || vsTemp.length === 1) {
                    $.messager.alert('提示', "请按照示例正确输入资产拆分比例。", 'warning');
                    return;
                }
                var strScale = vsTemp.split(":");
                for (var i = 0; i < strScale.length; i++) {
                    if (strScale[i] === "") {
                        $.messager.alert('提示', "输入的拆分比例格式不正确，请重新输入。", 'warning');
                        return;
                    }
                    var tmpDec = 0;
                    try {
                        tmpDec = parseFloat(strScale[i]);
                    } catch {
                        $.messager.alert('提示', "输入的拆分比例格式不正确，请重新输入。", 'warning');
                        return;
                    }
                    if (tmpDec <= 0) {
                        $.messager.alert('提示', "拆分比例不能输入小于等于0的值。", 'warning');
                        return;
                    }
                }
            },
            /**
             * 获取减值准备
             */
            GetJZZC: function(Zcbh) {
                var wzself = this;
                var params = [curYear, curCompanyCode, curKjqj, Zcbh];
                var dataService = wzself.context.injector.get('$dataServiceProxy');
                return dataService.invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetJZZC", params).then(
                    function(result) {
                        var DS = result.data;
                        return DS;
                    }
                )
            },
            /**
             * 显示拆分后资产
             */
            GetDividedDetails: function() {
                var wzself = this;
                var params = [curYear, curCompanyCode, curKjqj, Zcbh];
                var dataService = wzself.context.injector.get('$dataServiceProxy');
                return dataService.invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDividedDetails", params).then(
                    function(result) {
                        var DS = result.data;
                        return DS;
                    }
                )
            },
            /** 
             * 获取最大内码 
             */
            Get_MaxZcnm: function() {
                var wzself = this;
                var params = [curYear];
                var dataService = wzself.context.injector.get('$dataServiceProxy');
                return dataService.invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "Get_MaxZcnm", params).then(
                    function(result) {
                        var MaxZcnm = result.data;
                        return MaxZcnm;
                    }
                )
            },
            /**
             *查询资产在用表是否存在
             */
            QueryGDZC: function() {
                var wzself = this;
                var params = [curYear, curCompanyCode, Zcbh];
                var dataService = wzself.context.injector.get('$dataServiceProxy');
                return dataService.invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "QueryGDZC", params).then(
                    function(result) {
                        var DS = result.data;
                        return DS;
                    }
                )
            },
            /**
             * 数量拆分按钮事件
             */
            btnDivideByAmount: function() {
                if (JECHFBZ === true) {
                    $.messager.alert('提示', "已经进行金额拆分，不能再进行数量拆分。", 'warning');
                    return;
                }
                SLCHFBZ = false;
                if ($(GDWebBizHandleConstants.ControllerID_SmartHelpforZcbh).adplookupbox('getValue') === "") {
                    $.messager.alert('提示', "请选择要拆分的资产。", 'warning');
                    return;
                }
                Zcbh = wzself.context.getParam('Zcbh');
                var rs1 = wzself.QueryGDZC(curYear, curCompanyCode, Zcbh);
                var dt = rs1.Table[0];

                var k = parseInt(dt.GDZCZY_ZCSL);
                if (k === 1) {
                    $.messager.alert('提示', "资产数量为1，不允许进行数量拆分", 'warning');
                    return;
                }
                //拆分比例焦点丢失事件
                //未完成
                //未完善
                if (Scale === "") {
                    return;
                }
                var strScale = Scale.split(":");
                //检查用户输入的资产数量是否合法
                var fZczs = 0;
                for (var i = 0; i < strScale.length; i++) {
                    fZczs += parseInt(strScale[i]);
                }
                if (fZczs !== Zcsl) {
                    $.messager.alert('提示', "输入的资产数量和资产本身包含的资产数量不相等。", 'warning');
                    return;
                }

                //先获取一次拆分后的资产，如果拆分后未做减少，则一起显示出来
                var rs2 = wzself.GetDividedDetails(curYear, curCompanyCode, curKjqj, Zcbh);
                var dt2 = rs2.Table[0];
                var fZcsl = 0;
                var fScale = 0;

                //根据比例拆分资产
                var fZcyz = 0,
                    fRzzj = 0,
                    fBnRzzj = 0,
                    fLjzj = 0,
                    fJzzb = 0,
                    fJcz = 0;
                var strZcnm = Get_MaxZcnm(curYear);
                for (var i = 0; i < strScale.length; i++) {
                    strZcnm = (parseInt(strZcnm) + 1).toString("0:000000000000"); //这个地方有问题
                    fZcsl = parseFloat(strScale[i]);
                    fScale = fZcsl / fZczs;
                    //最后一条拆分资产取全部余额
                    if (i === strScale.length - 1) {
                        dt2.GDCHZJL_YZCBH_GDZCZY_ZCYZ = parseFloat(parseFloat(dt.GDZCZY_ZCYZ) - fZcyz);
                        dt2.GDCHZJL_YZCBH_GDZCZY_RZZJ = parseFloat(parseFloat(dt.GDZCZY_RZZJ) - fRzzj);
                        dt2.GDCHZJL_YZCBH_GDZCZY_BNRZZJ = parseFloat(parseFloat(dt.GDZCZY_BNRZZJ) - fBnRzzj);
                        dt2.GDCHZJL_YZCBH_GDZCZY_LJZJ = parseFloat(parseFloat(dt.GDZCZY_LJZJ) - fLjzj);
                        dt2.GDCHZJL_YZCBH_GDZCZY_JCZ = parseFloat(parseFloat(dt.GDZCZY_JCZ) - fJcz);
                        dt2.GDCHZJL_YZCBH_GDZCZY_JZZB = parseFloat(parseFloat(dt.GDZCZY_JZZB) - fJzzb);
                        dt2.GDCHZJL_ZDR = curUserName;
                    } else {
                        dt2.GDCHZJL_YZCBH_GDZCZY_ZCYZ = (parseFloat(dt.GDZCZY_ZCYZ) * parseFloat(fScale)).toFixed(JEDECN);
                        dt2.GDCHZJL_YZCBH_GDZCZY_RZZJ = (parseFloat(dt.GDZCZY_RZZJ) * parseFloat(fScale)).toFixed(JEDECN);
                        dt2.GDCHZJL_YZCBH_GDZCZY_BNRZZJ = (parseFloat(dt.GDZCZY_BNRZZJ) * parseFloat(fScale)).toFixed(JEDECN);
                        dt2.GDCHZJL_YZCBH_GDZCZY_LJZJ = (parseFloat(dt.GDZCZY_LJZJ) * parseFloat(fScale)).toFixed(JEDECN);
                        dt2.GDCHZJL_YZCBH_GDZCZY_JCZ = (parseFloat(dt.GDZCZY_JCZ) * parseFloat(fScale)).toFixed(JEDECN);
                        dt2.GDCHZJL_YZCBH_GDZCZY_JZZB = (parseFloat(dt.GDZCZY_JZZB) * parseFloat(fScale)).toFixed(JEDECN);
                        dt2.GDCHZJL_ZDR = curUserName;
                    }
                    dt2.F_SCALE = fScale;
                    dt2.GDCHZJL_YZCBH_GDZCZY_ZCNM = strZcnm;
                    dt2.GDZCZY_ID = dt.GDZCZY_ID;
                    dt2.GDZCZY_DWBH = dt.GDZCZY_DWBH;
                    dt2.GDCHZJL_YZCBH = dt.GDZCZY_ZCBH + "_" + (i + 1).toString();
                    dt2.GDZCZY_TMBH = dt.GDZCZY_TMBH;
                    dt2.GDCHZJL_YZCBH_GDZCZY_ZCMC = dt.GDZCZY_ZCMC;
                    dt2.GDZCZY_KSQJ = KJND + KJQJ;
                    dt2.GDZCZY_ZZQJ = " ";
                    dt2.GDZCZY_BMBH = dt.GDZCZY_BMBH;
                    dt2.LSBMZD_BMMC = dt.LSBMZD_BMMC;
                    dt2.GDZCZY_ZRR = dt.GDZCZY_ZRR;
                    dt2.GDZCZY_LBBH = dt.GDZCZY_LBBH;
                    dt2.GDZCZY_SWLB = dt.GDZCZY_SWLB;
                    dt2.GDZCZY_ZJBH = dt.GDZCZY_ZJBH;
                    dt2.GDZCZY_ZTBH = dt.GDZCZY_ZTBH;
                    dt2.GDZCZY_LYBH = dt.GDZCZY_LYBH;
                    dt2.GDZCZY_YTBH = dt.GDZCZY_YTBH;
                    dr2.GDZCZY_RZRQ = dr.GDZCZY_RZRQ;
                    dr2.GDZCZY_QYRQ = dr.GDZCZY_QYRQ;
                    dr2.GDCHZJL_YZCBH_GDZCZY_ZCSL = fZcsl;
                    dr2.GDZCZY_SYNX = dr.GDZCZY_SYNX;
                    dr2.GDZCZY_JCZL = dr.GDZCZY_JCZL;
                    dr2.GDZCZY_YZJL = dr.GDZCZY_YZJL;
                    dr2.GDZCZY_YZJE = (parseFloat(dr.GDZCZY_YZJE) * parseFloat(fScale)).toFixed(JEDECN);
                    dr2.GDZCZY_NZJL = dr.GDZCZY_NZJL;
                    dr2.GDZCZY_NZJE = (parseFloat(dr.GDZCZY_NZJE) * parseFloat(fScale)).toFixed(JEDECN);
                    dr2.GDZCZY_ZGZL = (parseFloat(parseInt(dr.GDZCZY_ZGZL) * fScale)).ToString(".00");
                    dr2.GDZCZY_YGZL = (parseFloat(parseInt(dr.GDZCZY_YGZL) * fScale)).ToString(".00");
                    dr2.GDZCZY_ZJJT = dr.GDZCZY_ZJJT;
                    dr2.GDZCZY_JTWB = dr.GDZCZY_JTWB;
                    dr2.GDZCZY_ZJYF = dr.GDZCZY_ZJYF;
                    dr2.GDZCZY_JLYF = dr.GDZCZY_JLYF;
                    dr2.GDZCZY_JLZJ = (parseFloat(dr.GDZCZY_JLZJ) * parseFloat(fScale)).toFixed(JEDECN);
                    dr2.GDZCZY_SYSJ = dr.GDZCZY_SYSJ;
                    dr2.GDZCZY_JSBZ = dr.GDZCZY_JSBZ;
                    dr2.GDZCZY_JSRQ = dr.GDZCZY_JSRQ;
                    dr2.GDZCZY_JSSM = dr.GDZCZY_JSSM;
                    dr2.GDZCZY_DBBZ = dr.GDZCZY_DBBZ;
                    dr2.GDZCZY_DCSL = dr.GDZCZY_DCSL;
                    dr2.GDZCZY_CWQR = dr.GDZCZY_CWQR;
                    dr2.GDZCZY_QRR = dr.GDZCZY_QRR;
                    dr2.GDZCZY_QRRQ = KJND + KJQJ;
                    dr2.GDZCZY_RKDH = dr.GDZCZY_RKDH;
                    dr2.GDZCZY_YSZCBH = dr.GDZCZY_YSZCBH;
                    dr2.GDZCZY_YSBM = dr.GDZCZY_YSBM;
                    dr2.GDZCZY_CKDH = dr.GDZCZY_CKDH;
                    dr2.GDZCZY_GUIG = dr.GDZCZY_GUIG;
                    dr2.GDZCZY_SYR = dr.GDZCZY_SYR;
                    dr2.GDZCZY_ZYPZ = dr.GDZCZY_ZYPZ;
                    dr2.GDZCZY_JLDW = dr.GDZCZY_JLDW;
                    dr2.GDZCZY_CFDD = dr.GDZCZY_CFDD;
                    dr2.GDZCZY_SBBH = dr.GDZCZY_SBBH;
                    dr2.GDZCZY_SYDW = dr.GDZCZY_SYDW;
                    dr2.GDZCZY_SYBM = dr.GDZCZY_SYBM;
                    dr2.GDZCZY_FPH = dr.GDZCZY_FPH;
                    dr2.GDZCZY_DDH = dr.GDZCZY_DDH;
                    dr2.GDZCZY_FKJLH = dr.GDZCZY_FKJLH;
                    dr2.GDZCZY_XLH = dr.GDZCZY_XLH;
                    dr2.GDZCZY_XM01 = dr.GDZCZY_XM01;
                    dr2.GDZCZY_XM02 = dr.GDZCZY_XM02;
                    dr2.GDZCZY_XM03 = dr.GDZCZY_XM03;
                    dr2.GDZCZY_XM04 = dr.GDZCZY_XM04;
                    dr2.GDZCZY_XM05 = dr.GDZCZY_XM05;
                    dr2.GDZCZY_XM06 = dr.GDZCZY_XM06;
                    dr2.GDZCZY_XM07 = dr.GDZCZY_XM07;
                    dr2.GDZCZY_XM08 = dr.GDZCZY_XM08;
                    dr2.GDZCZY_XM09 = dr.GDZCZY_XM09;
                    dr2.GDZCZY_XM10 = dr.GDZCZY_XM10;
                    dr2.GDZCZY_XM11 = dr.GDZCZY_XM11;
                    dr2.GDZCZY_XM12 = dr.GDZCZY_XM12;
                    dr2.GDZCZY_XM13 = dr.GDZCZY_XM13;
                    dr2.GDZCZY_XM14 = dr.GDZCZY_XM14;
                    dr2.GDZCZY_XM15 = dr.GDZCZY_XM15;
                    dr2.GDZCZY_XM16 = dr.GDZCZY_XM16;
                    dr2.GDZCZY_XM17 = dr.GDZCZY_XM17;
                    dr2.GDZCZY_XM18 = dr.GDZCZY_XM18;
                    dr2.GDZCZY_XM19 = dr.GDZCZY_XM19;
                    dr2.GDZCZY_XM20 = dr.GDZCZY_XM20;
                    dr2.GDZCZY_XM21 = dr.GDZCZY_XM21;
                    dr2.GDZCZY_XM22 = dr.GDZCZY_XM22;
                    dr2.GDZCZY_XM23 = dr.GDZCZY_XM23;
                    dr2.GDZCZY_XM24 = dr.GDZCZY_XM24;
                    dr2.GDZCZY_XM25 = dr.GDZCZY_XM25;
                    dr2.GDZCZY_XM26 = dr.GDZCZY_XM26;
                    dr2.GDZCZY_XM27 = dr.GDZCZY_XM27;
                    dr2.GDZCZY_XM28 = dr.GDZCZY_XM28;
                    dr2.GDZCZY_XM29 = dr.GDZCZY_XM29;
                    dr2.GDZCZY_XM30 = dr.GDZCZY_XM30;
                    dr2.GDZCZY_XM31 = dr.GDZCZY_XM31;
                    dr2.GDZCZY_XM32 = dr.GDZCZY_XM32;
                    dr2.GDZCZY_XM33 = dr.GDZCZY_XM33;
                    dr2.GDZCZY_XM34 = dr.GDZCZY_XM34;
                    dr2.GDZCZY_XM35 = dr.GDZCZY_XM35;
                    dr2.GDZCZY_XM36 = dr.GDZCZY_XM36;
                    dr2.GDZCZY_XM37 = dr.GDZCZY_XM37;
                    dr2.GDZCZY_XM38 = dr.GDZCZY_XM38;
                    dr2.GDZCZY_XM39 = dr.GDZCZY_XM39;
                    dr2.GDZCZY_XM40 = dr.GDZCZY_XM40;
                    dr2.GDZCZY_SJ01 = dr.GDZCZY_SJ01;
                    dr2.GDZCZY_SJ02 = dr.GDZCZY_SJ02;
                    dr2.GDZCZY_SJ03 = dr.GDZCZY_SJ03;
                    dr2.GDZCZY_SJ04 = dr.GDZCZY_SJ04;
                    dr2.GDZCZY_SJ05 = dr.GDZCZY_SJ05;
                    dr2.GDZCZY_SJ06 = dr.GDZCZY_SJ06;
                    dr2.GDZCZY_SJ07 = dr.GDZCZY_SJ07;
                    dr2.GDZCZY_SJ08 = dr.GDZCZY_SJ08;
                    dr2.GDZCZY_SJ09 = dr.GDZCZY_SJ09;
                    dr2.GDZCZY_SJ10 = dr.GDZCZY_SJ10;
                    dr2.GDZCZY_CGR = dr.GDZCZY_CGR;
                    dr2.GDZCZY_NBCG = dr.GDZCZY_NBCG;
                    dr2.GDZCZY_FKBZ = dr.GDZCZY_FKBZ;
                    dr2.GDZCZY_YSRQ = dr.GDZCZY_YSRQ;
                    dr2.GDZCZY_CGBM = dr.GDZCZY_CGBM;
                    dr2.GDZCZY_GYS = dr.GDZCZY_GYS;
                    dr2.gdzczy_czbz = dr.gdzczy_czbz;
                    dr2.GDZCZY_GRRQ = dr.GDZCZY_GRRQ;
                    dr2.GDZCZY_JTWBZT = dr.GDZCZY_JTWBZT;
                    dr2.GDZCZY_KMBH = dr.GDZCZY_KMBH;
                }
            },
            /**
             * 金额拆分按钮事件
             */
            btnDivideByMoney: function() {

            },
            /**
             * 保存按钮事件
             */
            btnSave: function() {

            },
            /**
             * 组织职能帮助条件
             */
            ArrangeCondition: function(pLbracket, pField, pCompare, pFieldValue, pDataType, pRbracket, pRelation) {
                var Cond = "";
                if (pDataType == "String") {
                    Cond = '{"Lbracket":"' + pLbracket + '","Compare":" ' + pCompare + '","Field":"' + pField + '","DataType":"' + pDataType + '","Value":"' + pFieldValue + '","Rbracket":" ' + pRbracket + '","Relation":" ' + pRelation + ' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":0,"FieldCaptio' + 'n":"","InnerFormula":"","Owner":"","DisplayValue":"' + pFieldValue + '","Description":""}';
                } else
                if (pDataType == "Integer") {
                    Cond = '{"Lbracket":"' + pLbracket + '","Compare":" ' + pCompare + '","Field":"' + pField + '","DataType":"' + pDataType + '","Value":"' + pFieldValue + '","Rbracket":" ' + pRbracket + '","Relation":" ' + pRelation + ' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":0,"FieldCaptio' + 'n":"","InnerFormula":"","Owner":"","DisplayValue":"' + pFieldValue + '","Description":""}';
                } else
                if (pDataType == "Express") {
                    Cond = '{"Lbracket":"' + pLbracket + '","Compare":" ' + pCompare + '","Field":"' + pField + '","DataType":"' + pDataType + '","Value":"' + pFieldValue + '","Rbracket":" ' + pRbracket + '","Relation":" ' + pRelation + ' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":1,"FieldCaptio' + 'n":"","InnerFormula":"","Owner":"","DisplayValue":"' + pFieldValue + '","Description":""}';
                }
                return Cond;
            },
        }
    }
)