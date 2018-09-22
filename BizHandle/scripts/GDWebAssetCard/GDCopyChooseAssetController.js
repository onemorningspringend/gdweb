//复制选择卡片界面
gsp.module('gsp.app').controller('GDCopyChooseAssetController', 'ListBaseController', function() {
    //#region 参数
    var curCompanyCode = ""; //单位编号
    var curYear = ""; //年度
    var curPeriod = ""; //期间
    var authorityCondi = ""; //权限条件

    var copyAssetID = ''; // 复制的资产ID
    var copyFssbFlag = 'N'; // 是否复制附属设备
    var copyFjFlag = 'N'; // 是否复制附件
    var assetType = ''; //资产类别
    var self;
    //#endregion 
    return {
        //#region 界面加载
        //空方法 专用于其他界面调用
        EmptyFormload: function() {
            // curCompanyCode = decodeURI(psCurCompanyCode, "UTF-8");
            // curYear = psCurYear;
            // curPeriod = psCurPeriod;
            // authorityCondi = decodeURI(psAuthorityCondi, "UTF-8");
        },
        //界面加载（表单加载后）
        ChooseAssetFormload: function() {
            self = this;
            debugger;
            //赋值给核算单位智能帮助
            $('#XSmartDictLookup1').adplookupbox('setValue', '');
            $('#XSmartDictLookup1').adplookupbox('setText', '');
            copyAssetID = '';
            assetType = '';

            curCompanyCode = this.context.getParam('curCompanyCode');
            curYear = this.context.getParam('curYear');
            curPeriod = this.context.getParam('curPeriod');
            authorityCondi = this.context.getParam('authorityCondi');

            var compHelp = $('#XSmartDictLookup1');
            //设置帮助前事件
            compHelp.on('OnDictEntryPicking', function(e) {
                var assetHelp = $('#XSmartDictLookup1').adplookupbox('options').adp;
                assetHelp.condition = "[" + self.ArrangeCondition(" ", "GDZCZY_DWBH", " =", "'" + curCompanyCode + "' and (GDZCZY_ZZQJ=' ' or GDZCZY_ZZQJ is null) " + authorityCondi, "Express", " ", " ") + "]"; //左括号 字段 比较符 字段值 值类型 右括号 关系
            });
            //设置帮助后事件
            compHelp.on('OnDictEntryPicked', function(e, rowData, opts) {
                copyAssetID = rowData[0].GDZCZY_ID;
                assetType = rowData[0].GDZCZY_LBBH;
            });
        },
        //#endregion

        //#region 公共方法
        //组织智能帮助条件 左括号 字段 比较符 字段值 值类型 右括号 关系
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
        //#endregion

        //#region 按钮事件
        //确定
        OK: function() {
            debugger;
            if (copyAssetID == '') {
                $.notify.error("请选择要复制的资产。");
                return;
            } else {
                if ($('#XCheckBox1').attr('checked') == 'checked')
                    copyFssbFlag = 'Y'; //选中
                else
                    copyFssbFlag = 'N'; //未选中
                if ($('#XCheckBox2').attr('checked') == 'checked')
                    copyFjFlag = 'Y'; //选中
                else
                    copyFjFlag = 'N'; //未选中
                gsp.application.applicationContext.setParam('copyAssetID', copyAssetID);
                gsp.application.applicationContext.setParam('copyFssbFlag', copyFssbFlag);
                gsp.application.applicationContext.setParam('copyFjFlag', copyFjFlag);
                gsp.application.applicationContext.setParam('assetType', assetType);
                gsp.application.applicationContext.setParam('formAction', 'OK');
                $('#IFrameChooseAssetDialog').dialog('close');
            }
        },
        //取消
        Cancel: function() {
            debugger;
            gsp.application.applicationContext.setParam('formAction', 'CANCEL');
            $('#IFrameChooseAssetDialog').dialog('close');
        },
        //#endregion
    };
});