//资产附属设备界面
gsp.module('gsp.app').controller('GDAssetEquipmentController', 'MultiEditListController', function() {
    //appModule.controller('GDAssetEquipmentController', 'ListBaseController', function() {
    //#region 参数
    var curCompanyCode = ""; //单位编号
    var curCompanyName = ""; //单位名称
    var curDate = ""; //8位日期
    var curYear = ""; //年度
    var curPeriod = ""; //期间
    var assetCode = ""; //资产编号
    var assetZcyz = 0; //资产原值
    var iiJeDecn = 2; //金额精度
    var iiSlDecn = 0; //数量精度
    //#endregion 
    return {
        //#region 界面加载
        //空方法 专用于其他界面调用
        EmptyFormload: function() {},
        //界面加载（表单加载后）
        EquipmentFormload: function() {
            debugger;
            //获取上个界面传递的参数
            var params = parseUrlParams(window.location);
            curCompanyCode = decodeURI(params.psCompany, "UTF-8");
            curCompanyName = decodeURI(params.psCompanyName, "UTF-8");
            assetCode = decodeURI(params.psAssCode, "UTF-8");
            assetZcyz = params.psAssZcyz;
            curYear = params.psYear;
            curPeriod = params.psPeriod;
            curDate = params.psDate;
            iiJeDecn = params.psJeDecn;
            iiSlDecn = params.psSlDecn;
            //设置界面数值精度
            this.EquipmentSetColumnDecn('#XDataGrid2', 'GDZCBJ_BJSL', iiSlDecn);
            this.EquipmentSetColumnDecn('#XDataGrid2', 'GDZCBJ_BJJZ', iiJeDecn);
            this.EquipmentSetColumnSummationDecn('#XDataGrid2', 'GDZCBJ_BJSL', iiSlDecn);
            this.EquipmentSetColumnSummationDecn('#XDataGrid2', 'GDZCBJ_BJJZ', iiJeDecn);
            //刷新绑定数据
            //this.EquipmentRefreshData(curCompanyCode, assetCode);
        },
        //设置列精度
        EquipmentSetColumnDecn: function(gridID, xmbh, xmDecn) {
            if ($(gridID).datagrid('getColumnOption', xmbh) && $(gridID).datagrid('getColumnOption', xmbh).formatter) {
                $(gridID).datagrid('getColumnOption', xmbh).formatter = function(v, d, i) {
                    if (d.footRow && !v) {
                        return v;
                    }
                    if (v != undefined && v != null)
                        return gc.accounting.formatMoney(v, '', xmDecn, '') + '';
                    else
                        return v;
                };
            }
        },
        //设置列合计精度
        EquipmentSetColumnSummationDecn: function(gridID, xmbh, xmDecn) {
            if ($(gridID).datagrid('getColumnOption', xmbh).footerOptions) {
                $(gridID).datagrid('getColumnOption', xmbh).footerOptions.formatter = function(v, d, i) {
                    if (d && d.footRow && !v) {
                        return v;
                    }
                    if (v)
                        return gc.accounting.formatMoney(v, '', xmDecn, '') + '';
                    else
                        return v;
                };
            }
        },
        //刷新绑定数据
        EquipmentRefreshData: function(companyCode, assetCode) {
            var condi = "[" + this.ArrangeCondition(" ", "GDZCBJ_DWBH", " =", "'" + curCompanyCode + "' and GDZCBJ_ZCBH='" + assetCode + "'", "Express", " ", " ") + "]";
            var order = "#GDZCBJ_BJBH# asc ";
            debugger;
            this.load(condi, order);
        },

        /**
         * 加载表单
         * @memberof gsp.app.ListBaseController
         * @return {Deferred} 表单加载的异步事件
         * @memberof gsp.app.ListBaseController
         */
        formLoad: function() {
            //获取上个界面传递的参数
            var params = parseUrlParams(window.location);
            curCompanyCode = params.psCompany;
            assetCode = params.psAssCode;
            var filterCondition = "[" + this.ArrangeCondition(" ", "GDZCBJ_DWBH", " =", "'" + curCompanyCode + "' and GDZCBJ_ZCBH='" + assetCode + "'", "Express", " ", " ") + "]";
            var orderBy = "#GDZCBJ_BJBH# asc ";

            //刷新绑定数据
            debugger;
            var defaultModel = this.defaultModel(),
                instanceKeys = this.dataSourceHelper.getLoadInstance(defaultModel),
                dataUri = {};
            var varService = this.context.injector.get("$variableService");
            dataUri.filterCondition = varService.parse(filterCondition, this.context);
            dataUri.orderBy = varService.parse(orderBy, this.context);

            $.loading();
            return this.loadInstance(instanceKeys, dataUri).always(function() {
                $.loaded();
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
        //日期格式化
        FormatDate8: function(date) {
            if (!date) {
                return '';
            } else if (typeof date == 'string' && date.length == 8 && date[0] == '2') {
                return date;
            } else {
                date = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
                return date;
            }
        },
        //#endregion

        //#region 按钮事件
        //更新新增数据
        UpdateAddData: function() {
            this.listInstance().dataSource.tables('GDZCBJ').defaultView().currentItem.row().setValue('GDZCBJ_DWBH', curCompanyCode);
            this.listInstance().dataSource.tables('GDZCBJ').defaultView().currentItem.row().setValue('GDZCBJ_ZCBH', assetCode);
            debugger;
            //赋部件编号
            var newCode = '0000';

            var dt = this.listInstance().dataSource.tables(0).defaultView();
            var rowCount = this.listInstance().dataSource.tables(0).rowCount();
            for (var i = 0; i < rowCount; i++) {
                var tempCode = dt.items(i).GDZCBJ_BJBH();
                if (newCode < tempCode)
                    newCode = tempCode;
            }
            //var dt = this.listInstance().dataSource.peek().GDZCBJ;
            // for (var i = 0; i < dt.length; i++) {
            //     var row = dt[i];
            //     if (newCode < row.GDZCBJ_BJBH)
            //         newCode = row.GDZCBJ_BJBH;
            // }

            try {
                newCode = String(Number(newCode) + 1);
                while (newCode.length < 4) {
                    newCode = '0' + newCode;
                }
            } catch (e) {
                newCode = '0001';
            }
            this.listInstance().dataSource.tables('GDZCBJ').defaultView().currentItem.row().setValue('GDZCBJ_BJBH', newCode);
        },
        //保存
        SaveEquip: function() {
            //将刚修改的提交下
            $('#XDataGrid2').datagrid('acceptChanges');
            this.gridHelper.endEditing(this.view, $('#XDataGrid2'));

            //检查
            var allZcyz = 0;
            var allCode = ',';
            var dt = this.listInstance().dataSource.tables(0).defaultView();
            var rowCount = this.listInstance().dataSource.tables(0).rowCount();
            debugger;
            for (var i = 0; i < rowCount; i++) {
                var bjbh = dt.items(i).GDZCBJ_BJBH();
                var bjmc = dt.items(i).GDZCBJ_BJMC();
                var bjsl = Number(dt.items(i).GDZCBJ_BJSL());
                var bjjz = Number(dt.items(i).GDZCBJ_BJJZ());

                if (bjbh == '' || $.trim(bjbh) == '') {
                    $.notify.error("部件编号不允许为空。");
                    return false;
                }
                if (allCode.indexOf(',' + bjbh + ',') >= 0) {
                    $.notify.error('部件编号【' + bjbh + '】重复，请检查。');
                    return false;
                }
                if (bjmc == '' || $.trim(bjmc) == '') {
                    $.notify.error("部件名称不允许为空。");
                    return false;
                }
                if (bjsl <= 0) {
                    $.notify.error("数量须大于0。");
                    return false;
                }
                allCode += bjbh + ',';
                allZcyz += bjjz;
            }

            if (allZcyz > assetZcyz) {
                $.notify.error("附属设备价值之和不允许大于资产原值。");
                return false;
            }
            this.save();
        },
        //#endregion
    };
});