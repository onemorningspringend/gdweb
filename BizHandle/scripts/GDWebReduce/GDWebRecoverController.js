gsp.module("gsp.app").controller("GDWebRecoverController", "ListController", ['BizHandlePub', function (Pub) {
    var curPeriod = "";
    var curYear = "";
    var curCompanyCode = "";
    var JEDecn = 2;
    var SLDecn = 2;
    var zclbContJtJsOrder = "";
    var Jtzj = '';
    var curdate = "";

    return {
        /**
         * 界面加载
         */
        FrmRecoverLoad: function () {
            var listself = this;
            listself.SetProperValueByPass();
            listself.SetJeJecnDisplay();
            $.loading();
            return listself.RefreshZcList()
                .then(function () {
                    $.loaded();
                });
        },
        /**
        * 刷新资产列表（异步）
        */
        RefreshZcList: function () {
            var listself = this;
            var dwbh = curCompanyCode;
            var kjnd = curYear;
            var kjqj = curPeriod;
            var sql = '';
            //资产类别控制计提减少业务顺序
            if (zclbContJtJsOrder === "1") {
                if (Jtzj === "1")
                    sql = " and exists (select 1 from GDZCZY" + kjnd + " where GDZCZY_ID = GDJSZC_ZCID and GDZCZY_LBBH in (select GDZCLB_LBBH from GDZCLB" + kjnd + " where GDZCLB_JTBEFOREJS = '1')) ";
                else
                    sql = " and exists (select 1 from GDZCZY" + kjnd + " where GDZCZY_ID = GDJSZC_ZCID and GDZCZY_LBBH in (select GDZCLB_LBBH from GDZCLB" + kjnd + " where GDZCLB_JTBEFOREJS = '0')) ";
            }
            var filter = "[" + Pub.ArrangeCondition("", "GDJSZC_KJQJ", " = ", "'" + kjqj + "'" + sql, "Express", " ", " ") + "]";
            var order = "#GDJSZC_ZCBH# asc ";
            return listself.load(filter, order);
        },
        /**
         * 设置属性值
         */
        SetProperValueByPass: function () {
            var listself = this;
            curPeriod = gsp.application.applicationContext.getParam("KJQJ");
            curCompanyCode = gsp.application.applicationContext.getParam("COMPANYCODE");
            curYear = gsp.application.applicationContext.getParam("YEAR");
            curdate = gsp.application.applicationContext.getParam("DATE");
            JEDecn = gsp.application.applicationContext.getParam("JEDECN");
            SLDecn = gsp.application.applicationContext.getParam("SLDECN");
            JsDefZc = gsp.application.applicationContext.getParam("JSDEFZC");
            zclbContJtJsOrder = gsp.application.applicationContext.getParam("ZCLBCONTJTJSORDER");
            Jtzj = gsp.application.applicationContext.getParam("JTZJ");
            // var param = parseUrlParams(window.location);//从URL解析出的参数
            // curCompanyCode = param["COMPANYCODE"];
            // curPeriod = param["KJQJ"];
            // curYear = param["YEAR"];
            // curdate = param["DATE"];
            // JEDecn = param["JEDECN"] * 1;
            // SLDecn = param["SLDECN"] * 1;
            // JsDefZc = param["JSDEFZC"];
            // zclbContJtJsOrder = param["ZCLBCONTJTJSORDER"];
            // Jtzj = param["JTZJ"];
        },
        /**
         * 设置精度显示
         */
        SetJeJecnDisplay: function () {
            var listself = this;
            Pub.SetColumnDecn("XDataGrid1", GDWebBizHandleConstants.XPATH_GDJSZC_JSSL, SLDecn);
            Pub.SetColumnDecn("XDataGrid1", GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ, JEDecn);
            Pub.SetColumnDecn("XDataGrid1", GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ, JEDecn);
            Pub.SetColumnDecn("XDataGrid1", GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ, JEDecn);
            Pub.SetColumnDecn("XDataGrid1", GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ, JEDecn);
            Pub.SetColumnDecn("XDataGrid1", GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ, JEDecn);
        },
        /**
         * 恢复
         */
        Recover: function () {
            var listself = this;
            var ds = listself.GetSelectedZc(true);
            if (!ds || ds.length === 0) {
                return;
            }
            if (ds.length >= 1000) {
                $.messager.alert("提示", "您选择的数据量过大，可能会造成系统超时，请分批次操作。", "warning");
                return;
            }
            var isExists = listself.CheckIsHadNotCheckBySameCode(ds);
            if (isExists) {
                return listself.blockConfirm('提示', "同一资产如果没有完全选择，恢复后产生的数据可能对该资产剩余的数据产生影响，可能造成该资产剩余的数据无法恢复。<br>您确定恢复选择的备份记录么？")
                    .then(function () {
                        return listself.GDOperator(ds);
                    });
            } else {
                return listself.GDOperator(ds);
            }
        },
        /**
         * 获得选择的数据
         * @param  {bool} isCheckOldData - 是否检查旧数据
         */
        GetSelectedZc: function (isCheckOldData) {
            var listself = this;
            var dataTable = listself.listInstance().dataSource.tables(0);
            //没有数据的情况
            if (dataTable.peek().length === 0) {
                $.messager.alert("提示", "列表中不存在资产！", "warning");
                return false;
            }
            var row = {};
            var listOldData = [];
            var dt = $("#XDataGrid1").datagrid("getChecked");
            for (var i = 0; i < dt.length; i++) {
                row = dt[i];
                if (row[GDWebBizHandleConstants.XPATH_GDJSZC_JSQSL] * 1 === 0) {
                    listOldData.push(row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH]);
                }
            }
            if (isCheckOldData && listOldData.length > 0) {
                var totalData = string.Empty;
                for (var j = 0; j < listOldData.length; j++) {
                    totalData += listOldData[j] + ",";
                }
                totalData = totalData.substring(0, totalData.length - 1);
                $.messager.alert("提示", "资产：" + totalData + "是旧系统的资产减少数据，无法恢复。", "warning");
                return false;
            }
            if (dt.length === 0) {
                $.messager.alert("提示", "请选择资产！", "warning");
            }
            return dt;
        },
        /**
         * 获取是否存在未选择的同一资产
         * @param  {object}  ds - 需要检查的数据
         */
        CheckIsHadNotCheckBySameCode: function (ds) {
            var listself = this;
            var isExists = false;
            var row = {};
            var zcbh = "";
            var uncheckRow = listself.GetUnchecked($("#XDataGrid1"), "GDJSZC_ID");
            for (var i = 0; i < ds.length; i++) {
                var checkRow = ds[i];
                zcbh = checkRow[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
                for (var j = 0; j < uncheckRow.length; j++) {
                    row = uncheckRow[j];
                    if (zcbh === row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH]) {
                        isExists = true;
                        break;
                    }
                }
                if (isExists)
                    break;
            }
            return isExists;
        },
        /**
         * 获得某个datagrid未选择的条目并返回数组
         * @param  {object}  datagrid - datagrid的ID $
         * @param  {string}  primarykey - datagrid的主键
         */
        GetUnchecked: function (datagrid, primarykey) {
            var checkRow = datagrid.datagrid("getChecked");
            var allRow = datagrid.datagrid("getRows");
            var uncheckRow = [];
            var exists = false;
            for (var i = 0; i < allRow.length; i++) {
                for (var j = 0; j < checkRow.length; j++) {
                    if (allRow[i][primarykey] === checkRow[j][primarykey]) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    uncheckRow.push(allRow[i]);
                }
                exists = false;
            }
            return uncheckRow;
        },
        /**
         * 删除备份
         */
        DelBak: function () {
            var listself = this;
            var ds = $("#XDataGrid1").datagrid("getChecked");
            return listself.blockConfirm('提示', "您确定删除选择的备份记录么？删除后，该资产相关的备份数据受影响，可能导致无法恢复。")
                .then(function () {
                    $.loading();
                    var params = [ds, curCompanyCode, curdate];
                    return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "DelReduceBakBill", params);
                }).then(function () {
                    return listself.RefreshZcList();
                }).then(function () {
                    $.loaded();
                });
        },
        /**
         * 关闭窗口
         */
        Close: function () {
            $("#IFrameRecoverDialog").dialog("close");
        }
    }
}]);