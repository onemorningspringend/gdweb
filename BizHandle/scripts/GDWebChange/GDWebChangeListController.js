gsp.module("gsp.app").controller("GDWebChangeListController", "ListController",
    function () {
        var MKID = "GD"; //模块ID
        var BIZOBJID = ""; //业务对象组ID
        var BIZOPID = ""; //业务对象ID
        var FUNCID = ""; //功能ID
        var FUNCNAME = ""; //功能名称
        var curCompanyCode = ""; //单位编号
        var curCompanyName = ""; //单位名称
        var curCompanyType = ""; //公司类别，是否法人单位
        var curYear = ""; //年度
        var curPeriod = ""; //期间
        var curDate = ""; //8位业务日期
        var authorityCondi = ""; //权限条件
        var curUserName = ""; //用户显示名称
        var curUserCode = ""; //用户名（登陆用户名）
        var ChangeListID = $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCBG); //datagrid数据列表ID
        var sfNjwc = ""; //是否年结完成
        var sfCswc = ""; //是否初始完成
        var currGDqj = ""; //固定会计期间
        var bgBak = false; //是否变更备份
        var isNojtlc = ""; //计提控制
        var authorityCondi = ""; //权限条件
        var bglxContJTBGOrder = ""; //计提和变更的顺序控制
        var jtBoforeBg = ""; //先计提后变更
        var bgZdgxCs = ""; //变更自动勾选重算月折旧额
        var curGDndqj = ""; //固定年度期间
        var sfJtzj = ""; //本月是否计提折旧
        var zdrSc = ""; //制单人删除
        var isReCalcCard = false; //重算月折旧额

        return {
            //界面加载方法
            Formload: function () {
                var wzself = this;
                curYear = gsp.rtf.context.get('BizDate').substring(0, 4); //获取当前年度
                curPeriod = gsp.rtf.context.get('BizDate').substring(5, 7); //获取当前期间
                curUserID = gsp.rtf.context.get('UserID'); //获取当前用户ID
                curUserName = gsp.rtf.context.get('UserName'); //获取用户名字
                curUserCode = gsp.rtf.context.get('UserCode'); //获取登陆用户名
                curDate = wzself.FormatDate8(gsp.rtf.context.get('BizDate'));
                FUNCID = gsp.rtf.query.get("funcid"); //获取功能ID
                if (FUNCID === "GDWEB105") {
                    FUNCNAME = "资产变更";
                } else if (FUNCID === "GDWEB118") {
                    FUNCNAME = "变更确认";
                }
                return wzself.GetFsscFilterCondi(curYear, curUserID, curUserName, curDate).then(function () {
                    if (!curCompanyCode) {
                        return wzself.GetFirstAuditMemberCommon(curYear, curUserID)//获取第一个符合的单位
                            .then(function () {
                                return wzself.GetGDParams(curYear, curCompanyCode, curDate); //获得公司参数
                            }).then(function () {
                                return wzself.CompanyCheck(curCompanyCode); //检查公司
                            });
                    } else {
                        return $.Deferred().resolve();
                    }
                }).then(function () {
                    wzself.SetUI(bgBak); //设置界面
                }).then(function () {
                    $.loaded();
                    window.parent.$.loaded();
                    return wzself.RefreshChangeList(curCompanyCode, curYear, curGDndqj, authorityCondi); //获取列表加载过滤条件
                });
            },
            //查看资产变更卡片方法
            ViewCard: function () {
                var wzself = this;
                if (!ChangeListID.datagrid('getSelected')) {
                    $.messager.alert('提示', '请选择要查看的数据！', 'warning');
                    return;
                } else if (ChangeListID.datagrid('getChecked').length > 1) {
                    $.messager.alert('提示', '请选择一行！', 'warning');
                    return;
                } else {
                    var ZCID = ChangeListID.datagrid('getSelected')['GDBGJL_BGDH'];
                }
                wzself.check('资产变更卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebChange/5fb7c53d-d8b6-4ef9-9506-f5647ebabcbb/Index.html?' + wzself.MakeURL("View"), ZCID, { "actionname": "Frm_Load" });
            },
            //新增资产变更卡片方法
            CreateCard: function () {
                var wzself = this;
                if (!wzself.CheckIfCanMaintainChange(false)) {
                    wzself.cancel();
                    return;
                }
                var ZCID = 'ChangeCreate';
                wzself.add('资产变更卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebChange/5fb7c53d-d8b6-4ef9-9506-f5647ebabcbb/Index.html?' + wzself.MakeURL('Create'), ZCID, { "actionname": "Frm_Load" });
            },
            //编辑资产变更卡片方法
            EditCard: function () {
                var wzself = this;
                if (!wzself.CheckIfCanMaintainChange(false)) {
                    wzself.cancel();
                    return;
                }
                if (!ChangeListID.datagrid('getSelected')) {
                    $.messager.alert('提示', '请选择要编辑的数据！', 'warning');
                    return;
                } else if (ChangeListID.datagrid('getChecked').length > 1) {
                    $.messager.alert('提示', '请选择一行！', 'warning');
                    return;
                } else {
                    var ZCID = 'ChangeEdit';
                }
                wzself.edit('资产变更卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebChange/5fb7c53d-d8b6-4ef9-9506-f5647ebabcbb/Index.html?' + wzself.MakeURL('Edit'), ZCID, { "actionname": "Frm_Load" });
            },
            //同步变更按钮事件
            SyncChangeData: function () {
                var wzself = this;
                var params = [curCompanyCode, curYear];
                return wzself.context.injector.get('$dataServiceProxy').invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "SyncChangeData", params).then(
                    function () {
                        $.notify.success("同步变更数据完成。");
                    }
                )
            },
            //取消同步按钮事件
            CancelSyncChangeData: function () {
                var wzself = this;
                var params = [curCompanyCode, curYear];
                return wzself.context.injector.get('$dataServiceProxy').invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CancelSyncChangeData", params).then(
                    function () {
                        $.notify.success("取消同步变更数据完成。");
                    }
                )
            },
            //删除按钮事件
            RemoveChange: function () {
                var wzself = this;
                if (!wzself.CheckIfCanMaintainChange(false)) {
                    wzself.cancel();
                    return;
                }
                if (ChangeListID.datagrid('getChecked').length <= 0) {
                    $.messager.alert('提示', "没有选择行！", 'warning');
                    wzself.cancel();
                    return;
                }

                return wzself.blockConfirm('提示', "确定要删除当前选中的变更记录吗？").then(
                    function () {
                        $.loading();
                        wzself.DeleteChange(zdrSc).then(
                            function () {
                                return wzself.RefreshChangeList(curCompanyCode, curYear, curGDndqj, authorityCondi).then(
                                    function () {
                                        $.loaded();
                                        var msg = "删除完成！";
                                        $.messager.alert("提示", msg, "warning");
                                    }
                                )
                            }
                        ).fail(
                            function (result) {
                                //删除后刷新界面
                                return wzself.RefreshChangeList(curCompanyCode, curYear, curGDndqj, authorityCondi).then(
                                    function () {
                                        $.loaded();
                                    }
                                )
                            }
                        )
                    }
                )
            },
            //恢复按钮事件
            RecoveryChange: function () {
                $('#IFrame1Dialog').dialog('show');
            },
            //财务确认按钮事件
            ConfigChange: function () {
                var wzself = this;
                return wzself.blockConfirm('提示', "确定对选择记录进行财务确认？").then(
                    function () {
                        return wzself.BatchConfig().then(
                            function (msg) {
                                $.loading();
                                return wzself.RefreshChangeList(curCompanyCode, curYear, curGDndqj, authorityCondi).then(
                                    function () {
                                        $.loaded();
                                        if (msg !== "" && msg !== null) {
                                            msg = "确认完成，下列资产不符合：<br>" + msg;
                                        } else {
                                            msg = "确认完成。"
                                        }
                                        $.messager.alert('提示', msg, 'warning');
                                    }
                                )
                            }
                        )
                    }
                )
            },
            //取消确认按钮事件
            UnConfigRecord: function () {
                var wzself = this;
                return wzself.blockConfirm('提示', "确定对选择记录进行取消确认？").then(
                    function () {
                        return wzself.BatchUnConfig().then(
                            function (msg) {
                                $.loading();
                                return wzself.RefreshChangeList(curCompanyCode, curYear, curGDndqj, authorityCondi).then(
                                    function () {
                                        $.loaded();
                                        if (msg !== "" && msg !== null) {
                                            msg = "取消确认完成，下列资产不符合：<br>" + msg;
                                        } else {
                                            msg = "取消确认完成。"
                                        }
                                        $.messager.alert('提示', msg, 'warning');
                                    }
                                )
                            }
                        )
                    }
                )
            },
            /**
             * 根据当前的参数构建需要传递的URL
             */
            MakeURL: function (state) {
                var wzself = this;
                var changeNetSalvageValueBase = $('#XRadioGroup_BGJCZ').find(":checked").val(); //变更净残值
                if (state === "Create") {
                    var BGDH = "";
                    var ZCBH = "";
                    var ZCID = "Create";
                } else {
                    var BGDH = ChangeListID.datagrid('getSelected')['GDBGJL_BGDH'];
                    var ZCBH = ChangeListID.datagrid('getSelected')['GDBGJL_ZCBH'];
                    var ZCID = ChangeListID.datagrid('getSelected')['GDBGJL_ZCID'];
                }
                var URL = "";
                URL = "&KJQJ=" + currGDqj //会计期间
                    +
                    "&YEAR=" + curYear //会计年度
                    +
                    "&DATE=" + curDate //当前日期
                    +
                    "&COMPANYCODE=" + curCompanyCode //公司编号
                    +
                    "&CHANGENETSALVAGEVALUEBASE=" + changeNetSalvageValueBase //变更净残值
                    +
                    "&OPTFLAG=" + state //当前状态
                    +
                    "&BGDH=" + BGDH //变更单号
                    +
                    "&ZCBH=" + ZCBH //资产编号
                    +
                    "&ZCID=" + ZCID //资产ID
                    +
                    "&INITIALACTIONID=" + state; //表单初始状态
                return URL;
            },
            /**
             * 检查是否合法
             */
            CheckIfCanMaintainChange: function (islegal) {
                var wzself = this;
                var dataSource = wzself.lis
                if (isNojtlc !== "1") {
                    if (bglxContJTBGOrder === "1") {
                        for (var i = 0; i < ChangeListID.datagrid('getChecked'); i++) {
                            var curChangeTypeClass = ChangeListID.datagrid('getChecked')[i]['GDBGJL_BGLX'];
                            if (curChangeTypeClass === "" || curChangeTypeClass === null) {
                                $.messager.alert('提示', "请先选则变更类型！", 'warning');
                                return false;
                            }
                            var params = [curYear, curChangeTypeClass];
                            wzself.context.injector.get('$dataServiceProxy').invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetChangeTypeInfo", params).then(
                                function (strBglb) {
                                    if (strBglb === "1") {
                                        if (sfJtzj === "1") {
                                            $.messager.alert('提示', "变更类别" + curChangeTypeClass + "已计提折旧不允许再维护变更业务！", 'warning');
                                        }
                                    } else {
                                        if (sfJtzj === "0") {
                                            //$.messager.alert('提示', "变更类别" + curChangeTypeClass + "请先计提折旧再维护变更业务！", 'warning');
                                        }
                                    }
                                }
                            )
                        }
                    } else {
                        if (jtBoforeBg === "1" && sfJtzj === "0") {
                            //$.messager.alert('提示', "请先计提折旧再维护变更业务!", 'warning');
                        } else if (jtBoforeBg === "0" && sfJtzj === "1") {
                            $.messager.alert('提示', "已计提折旧不允许再维护变更业务!", 'warning');
                            return false;
                        }
                    }
                }
                islegal = true;
                return islegal;
            },
            /**
             * 删除变更的判断
             */
            DeleteChange: function (zdrSc) {
                var wzself = this;
                var changeAssetDs = { GDBGZC: ChangeListID.datagrid('getChecked') };
                for (var i = 0; i < ChangeListID.datagrid('getChecked').length; i++) {
                    var zcbh = ChangeListID.datagrid('getChecked')[i]['GDBGJL_ZCBH'];
                    var bgdh = ChangeListID.datagrid('getChecked')[i]['GDBGJL_BGDH'];
                    var flid = ChangeListID.datagrid('getChecked')[i]['GDBGJL_FLID'];
                    var zdr = ChangeListID.datagrid('getChecked')[i]['GDBGJL_BGR'];
                    var bgxh = ChangeListID.datagrid('getChecked')[i]['GDBGJL_BGXH'].toString();
                    var zcid = ChangeListID.datagrid('getChecked')[i]['GDBGJL_ZCID'];
                    var cwqr = ChangeListID.datagrid('getChecked')[i]['GDBGJL_CWQR'];
                    var fsscflag = ChangeListID.datagrid('getChecked')[i]['GDBGJL_FSSCFLAG'];
                    if (fsscflag === "1") {
                        $.messager.alert('提示', "编号为【" + zcbh + "】记录是共享中心生成，不能删除！<br/>", 'warning');
                        return $.Deferred().reject();
                    }
                    if (flid !== null && flid !== "") {
                        $.messager.alert('提示', "编号为【" + zcbh + "】记录是实物申请的变更记录，不能删除！<br/>", 'warning');
                        $.Deferred().reject();
                    }
                    if ((zdr !== null && zdr !== "") && zdr !== curUserName && zdrSc === "1") {
                        $.messager.alert('提示', "编号为【" + zcbh + "】的记录不允许非变更人删除！<br/>", 'warning');
                        $.Deferred().reject();
                    }
                    changeAssetDs.GDBGZC[i]['GDBGJL_BGDH'] = bgdh;
                    changeAssetDs.GDBGZC[i]['GDBGJL_ZCBH'] = zcbh;
                    changeAssetDs.GDBGZC[i]['GDBGJL_BGXH'] = bgxh;
                    changeAssetDs.GDBGZC[i]['GDBGJL_ZCID'] = zcid;
                    changeAssetDs.GDBGZC[i]['GDBGJL_CWQR'] = cwqr;
                }
                var params = [curYear, curCompanyCode, changeAssetDs, currGDqj, curUserCode, curUserName];
                return wzself.context.injector.get('$dataServiceProxy').invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "RemoveChange", params);
            },
            /**
             *财务确认方法
             */
            BatchConfig: function () {
                var wzself = this;
                var changeNetSalvageValueBase = $('#XRadioGroup_BGJCZ').find(":checked").val(); //变更净残值
                if ($(GDWebBizHandleConstants.ControllerID_QRSCSXCheckBox).attr('checked') == "checked") { //保存是否重算  
                    isReCalcCard = true;
                }
                if (!wzself.CheckIfCanMaintainChange(false)) { //异步，必须用then，未参数
                    wzself.cancel();
                    return;
                }
                if (ChangeListID.datagrid('getChecked').length <= 0) {
                    $.messager.alert('提示', "没有选择行！", 'warning');
                    wzself.cancel();
                    return;
                }
                var row = ChangeListID.datagrid('getChecked');
                var datacount = ChangeListID.datagrid('getChecked').length;
                var finaldatacount = 0; //超过300条后最后一次调用传递的条数
                var circlecount = parseInt(datacount / 300 + 1); //累计循环调用服务端的次数
                var count = 0;
                var msg = "";
                var configbadge = 0; //角标
                if (circlecount > 1) { //总条数大于300条的处理
                    finaldatacount = datacount - 300 * (circlecount - 1);
                    for (var i = 0; i < circlecount - 1; i++) {
                        var changeBillStr = "";
                        count = 300;
                        for (var i = 0; i <= count; i++) {
                            var cwqr = row[i + 300 * configbadge]['GDBGJL_CWQR'];
                            if (cwqr === "1")
                                continue;
                            var zcbh = row[i + 300 * configbadge]['GDBGJL_ZCBH'];
                            var bgdh = row[i + 300 * configbadge]['GDBGJL_BGDH'];
                            changeBillStr += "," + bgdh + "~" + zcbh;
                        }
                        wzself.BatchConfigChange(changeNetSalvageValueBase, isReCalcCard, changeBillStr, count).then(
                            function (result) {
                                msg += result;
                            }
                        )
                        configbadge++;
                    }
                    var changeBillStr = "";
                    count = finaldatacount;
                    for (var i = 0; i < count; i++) {
                        var cwqr = row[i + 300 * (circlecount - 1)]['GDBGJL_CWQR'];
                        if (cwqr === "1")
                            continue;
                        var zcbh = row[i + 300 * (circlecount - 1)]['GDBGJL_ZCBH'];
                        var bgdh = row[i + 300 * (circlecount - 1)]['GDBGJL_BGDH'];
                        changeBillStr += "," + bgdh + "~" + zcbh;
                    }
                    wzself.BatchConfigChange(changeNetSalvageValueBase, isReCalcCard, changeBillStr, count).then(
                        function (result) {
                            msg += result;
                        }
                    )
                } else { //总条数不足300条的处理
                    var changeBillStr = "";
                    count = datacount;
                    for (var i = 0; i < count; i++) {
                        var cwqr = row[i]['GDBGJL_CWQR'];
                        if (cwqr === "1")
                            continue;
                        var zcbh = row[i]['GDBGJL_ZCBH'];
                        var bgdh = row[i]['GDBGJL_BGDH'];
                        changeBillStr += "," + bgdh + "~" + zcbh;
                    }
                    return wzself.BatchConfigChange(changeNetSalvageValueBase, isReCalcCard, changeBillStr, count).then(
                        function (result) {
                            msg += result;
                            return msg;
                        }
                    )
                }
            },
            /**
             * 调用服务端方法进行确认
             */
            BatchConfigChange: function (changeNetSalvageValueBase, isReCalcCard, changeBillStr, count) {
                var wzself = this;
                if (changeBillStr.length <= count || changeBillStr === "" || changeBillStr === null) {
                    $.messager.alert('提示', "请勾选未进行财务确认的资产！", 'warning');
                    return;
                }
                changeBillStr = changeBillStr.substring(1);
                //调用服务端方法
                var params = [curCompanyCode, curYear, currGDqj, changeNetSalvageValueBase, isReCalcCard, changeBillStr, curUserID, curUserName];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "BatchConfigChange", params).then(
                    function (result) {
                        var result = result.data;
                        return result;
                    }
                )
            },
            /**
             *取消财务确认方法
             */
            BatchUnConfig: function () {
                var wzself = this;
                if (!wzself.CheckIfCanMaintainChange(false)) { //异步，必须用then，未参数
                    wzself.cancel();
                    return;
                }
                if (ChangeListID.datagrid('getChecked').length <= 0) {
                    $.messager.alert('提示', "没有选择行！", 'warning');
                    wzself.cancel();
                    return;
                }
                var row = ChangeListID.datagrid('getChecked');
                var datacount = ChangeListID.datagrid('getChecked').length;
                var finaldatacount = 0; //超过1000条后最后一次调用传递的条数
                var circlecount = parseInt(datacount / 1000 + 1); //累计循环调用服务端的次数
                var count = 0;
                var msg = "";
                var unconfigbadge = 0;
                if (circlecount > 1) { //总条数大于1000条的处理
                    finaldatacount = datacount - 1000 * (circlecount - 1);
                    for (var i = 0; i < circlecount - 1; i++) {
                        var changeBillStr = "";
                        count = 1000;
                        for (var i = 0; i <= count; i++) {
                            var cwqr = row[i + 300 * unconfigbadge]['GDBGJL_CWQR'];
                            if (cwqr === "0")
                                continue;
                            var zcbh = row[i + 300 * unconfigbadge]['GDBGJL_ZCBH'];
                            var bgdh = row[i + 300 * unconfigbadge]['GDBGJL_BGDH'];
                            changeBillStr += "," + bgdh + "~" + zcbh;
                        }
                        wzself.BatchUnConfigChange(changeBillStr, count).then(
                            function (result) {
                                msg += result;
                            }
                        )
                        unconfigbadge++;
                    }
                    var changeBillStr = "";
                    count = finaldatacount;
                    for (var i = 0; i < count; i++) {
                        var cwqr = row[i + 300 * (circlecount - 1)]['GDBGJL_CWQR'];
                        if (cwqr === "0")
                            continue;
                        var zcbh = row[i + 300 * (circlecount - 1)]['GDBGJL_ZCBH'];
                        var bgdh = row[i + 300 * (circlecount - 1)]['GDBGJL_BGDH'];
                        changeBillStr += "," + bgdh + "~" + zcbh;
                    }
                    wzself.BatchUnConfigChange(changeBillStr, count).then(
                        function (result) {
                            msg += result;
                        }
                    )
                } else { //总条数不足1000条的处理
                    var changeBillStr = "";
                    count = datacount;
                    for (var i = 0; i < count; i++) {
                        var cwqr = row[i]['GDBGJL_CWQR'];
                        if (cwqr === "0")
                            continue;
                        var zcbh = row[i]['GDBGJL_ZCBH'];
                        var bgdh = row[i]['GDBGJL_BGDH'];
                        changeBillStr += "," + bgdh + "~" + zcbh;
                    }
                    return wzself.BatchUnConfigChange(changeBillStr, count).then(
                        function (result) {
                            msg += result;
                            return msg;
                        }
                    )
                }
            },
            /**
             * 调用服务端方法进行取消确认
             */
            BatchUnConfigChange: function (changeBillStr, count) {
                var wzself = this;
                if (changeBillStr.length <= count || changeBillStr === "" || changeBillStr === null) {
                    $.messager.alert('提示', "请勾选已进行财务确认的资产！", 'warning');
                    return;
                }
                changeBillStr = changeBillStr.substring(1);
                //调用服务端方法
                var params = [curCompanyCode, curYear, currGDqj, changeBillStr, curUserName];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "BatchUnConfigRecord", params).then(
                    function (result) {
                        var result = result.data;
                        return result;
                    }
                )
            },
            /**
             * 设置界面
             */
            SetUI: function (bgBak) {
                var wzself = this;
                if (FUNCID === "GDWEB105") {
                    $('#presetBar').buttongroup('hideButton', '56d8e76e-4ecd-492d-aa57-737b1648b6ae'); //财务确认按钮
                    $('#presetBar').buttongroup('hideButton', '2d6cfebb-2ba2-4d50-a9e0-d0e047044e77'); //取消确认按钮
                    $(GDWebBizHandleConstants.ControllerID_QRSCSXCheckBox).parent().hide(); //确认时勾选重算月折旧额
                } else if (FUNCID === "GDWEB118") {
                    $('#presetBar').buttongroup('hideButton', 'ebbcd2bd-72b2-4365-9c2d-c185a171bbf7'); //新增按钮
                } else {
                    if (isNojtlc === "1") {
                        $('#presetBar').buttongroup('hideButton', 'ebbcd2bd-72b2-4365-9c2d-c185a171bbf7'); //新增按钮
                    }
                }
                $('#Label2').text(curYear + '年' + currGDqj + '月'); //设置当前期间
                $("#Label2").css("text-align", "center"); //设置文本内容居中
                //设置恢复按钮
                if (!bgBak) {
                    $('#328382f7-4663-41a3-88cf-1333093cd9db').linkbutton('disable'); //恢复按钮
                } else {
                    $('#328382f7-4663-41a3-88cf-1333093cd9db').linkbutton('enable');
                }
                //设置同步变更和取消同步按钮
                if (bglxContJTBGOrder === "0" & jtBoforeBg === "0") {
                    $('#d284027b-26c9-464c-9c4d-4d86d07d12ae').linkbutton('disable'); //同步变更按钮
                    $('#e834d7fb-e6d9-4ebf-b6b7-e03ac74c9917').linkbutton('disable'); //取消同步按钮
                }
                if (bgZdgxCs === "1") {
                    $(GDWebBizHandleConstants.ControllerID_QRSCSXCheckBox).attr('checked', true);
                }
                //设置变更净残值radiogroup
                $('#XRadioGroup_BGJCZ_0').attr('checked', true); //默认勾选以净残值为准
            },
            /**
             * 获取第一个符合要求的单位
             */
            GetFirstAuditMemberCommon: function (curYear, curUserID) {
                var wzself = this;
                //调用服务端方法的参数
                var params = ["", "0", "1", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curCompanyName, FUNCID, curUserID, curYear, BIZOBJID, BIZOPID, MKID];
                var dataService = wzself.context.injector.get('$dataServiceProxy'); //服务端获取第一个符合要求的单位方法
                return dataService.invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFirstAuditMemberCommon", params).then(
                    function (result) {
                        if (result) {
                            curCompanyCode = result.data; //获取核算单位的编号
                            wzself.context.setParam('strCompanyCode', curCompanyCode);
                            curCompanyName = result.outParams; //获取核算单位的名字
                            //给当前核算单位符默认值
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG).adplookupbox('setValue', curCompanyCode);
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG).adplookupbox('setText', curCompanyName);
                        };
                    }, function () {
                        setTimeout(function () {
                            wzself.close();
                        }, 2000);
                    }
                )
            },
            /**
             * 获取公司参数
             */
            GetGDParams: function (curYear, curCompanyCode, curDate) {
                var wzself = this;
                var params = [curCompanyCode, curYear, curDate, "CHANGELIST"];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", params).then(
                    function (result) {
                        if (result) {
                            var dicParams = result.data;
                            GDWebBizHandleConstants.GDLSGSCS[curCompanyCode] = dicParams;
                            if (dicParams["GD_SFNJWC"])
                                sfNjwc = dicParams["GD_SFNJWC"];
                            if (dicParams["GD_SFCSWC"])
                                sfCswc = dicParams["GD_SFCSWC"];
                            if (dicParams["GD_KJQJ"])
                                currGDqj = dicParams["GD_KJQJ"];
                            if (dicParams.hasOwnProperty(["GD_BGBAK"]))
                                bgBak = (dicParams["GD_BGBAK"] === "1");
                            if (dicParams["GD_NOJTZJ"])
                                isNojtlc = dicParams["GD_NOJTZJ"];
                            if (dicParams["GD_Authority"])
                                authorityCondi = dicParams["GD_Authority"];
                            if (dicParams["GD_JT_BG_TYPE"])
                                bglxContJTBGOrder = dicParams["GD_JT_BG_TYPE"];
                            if (dicParams["GD_JT_BG"])
                                jtBoforeBg = dicParams["GD_JT_BG"];
                            if (dicParams["GD_BGZDGXCSYZJE"])
                                bgZdgxCs = dicParams["GD_BGZDGXCSYZJE"];
                            if (dicParams["GDndqj"])
                                curGDndqj = dicParams["GDndqj"];
                            if (dicParams["GD_SFJTZJ"])
                                sfJtzj = dicParams["GD_SFJTZJ"];
                            if (dicParams["GD_ZDRSC"])
                                zdrSc = dicParams["GD_ZDRSC"];
                        }
                    }).fail(function (result) {
                        $.messager.alert('提示', "获取单位信息失败。", 'warning');
                        return;
                    });;
            },
            /**
             * 检查公司
             */
            CompanyCheck: function (curCompanyCode) {
                var wzself = this;
                var checkresult = wzself.CheckForm();
                if (!checkresult) {
                    // if (!curCompanyCode) {
                    //     // curCompanyCode = '';
                    //     // curCompanyName = '';
                    // }
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG).adplookupbox('setValue', curCompanyCode);
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG).adplookupbox('setText', curCompanyName);
                    return wzself.GetGDParams(curYear, curCompanyCode, curDate).then(function () {
                        return $.Deferred().reject();
                    })
                }
                return $.Deferred().resolve();
            },
            /**
             * 对当前功能的检查
             */
            CheckForm: function () {
                if (sfNjwc === "2") {
                    $.messager.alert('提示', "本年度已经年结，不能进行变更业务！", 'warning');
                    return false;
                }
                if (sfNjwc === "3") {
                    $.messager.alert('提示', "上年度没有年结，不能进行变更业务！", 'warning');
                    return false;
                }
                if (sfCswc !== "1") {
                    $.messager.alert('提示', "系统初始化没有完成，不能进行变更业务！", 'warning');
                    return false;
                }
                return true;
            },
            /**
             * 获取并设置核算单位帮助条件以及帮助后事件（异步）
             */
            GetFsscFilterCondi: function (curYear, curUserID, curUserName, curDate) {
                var wzself = this;
                var helpParam = ["0", "0", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curYear, BIZOBJID, BIZOPID, MKID];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFsscAuditMemberSqlCondiRestFul", helpParam)
                    .then(function (result) {
                        //设置核算组织帮助
                        var companyHP = $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG);
                        var companyHelp = companyHP.adplookupbox('options').adp;
                        companyHelp.condition = "[" + wzself.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and " + result.data, "Express", " ", " ") + "]";
                        companyHP.on('OnDictEntryPicked', function (e, rowData, opts) {
                            var row = rowData[0] || rowData;
                            var newCompanyCode = row.LSBZDW_DWBH;
                            var newCompanyName = row.LSBZDW_DWMC;
                            if (!newCompanyCode) {
                                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG).adplookupbox('setValue', curCompanyCode);
                                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG).adplookupbox('setText', curCompanyName);
                                return;
                            } else if (newCompanyCode === curCompanyCode) { //与原单位相同 退出
                                return;
                            } else {
                                //冲突检查
                                return wzself.CheckFunCt(newCompanyCode, FUNCID, FUNCNAME, curYear, "1", curUserID, curUserName)
                                    .then(function (result) {
                                        if (result) {
                                            //有冲突的 把单位帮助的数据转回
                                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG).adplookupbox('setValue', curCompanyCode);
                                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCBG).adplookupbox('setText', curCompanyName);
                                            $.messager.alert('提示', result, 'warning');
                                            return;
                                        } else {
                                            //获取公司参数
                                            return wzself.GetGDParams(curYear, newCompanyCode, curDate).then(function () {
                                                //单位具体检查
                                                return wzself.CompanyCheck(newCompanyCode);
                                            }).then(function () {
                                                //更新成新单位
                                                curCompanyCode = newCompanyCode;
                                                curCompanyName = newCompanyName;
                                                //更新功能记录的单位
                                                var uptParam = [curUserID, FUNCID, newCompanyCode, curYear];
                                                wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "UptFuncConflict", uptParam);
                                                //刷新界面
                                                wzself.SetUI(bgBak);
                                                //刷新绑定数据
                                                return wzself.RefreshChangeList(curCompanyCode, curYear, curGDndqj, authorityCondi);
                                            });
                                        }
                                    });
                            }
                        });
                        companyHP.adplookupbox('textbox').off('keydown');
                    })
                    .fail(function (result) {
                        $.messager.alert('提示', "核算组织帮助条件获取失败。", 'warning');
                    });
            },
            /**
             * 获取过滤条件并刷新当前变更列表(异步)
             */
            RefreshChangeList: function (curCompanyCode, curYear, curGDndqj, authorityCondi) {
                var wzself = this;
                var condi = "[" + wzself.ArrangeCondition(" ", "GDBGJL_DWBH", " =", "'" + curCompanyCode + "' and GDBGJL_BGRQ like '" + curGDndqj + "%' and GDBGJL_IFBF='0' " +
                    " and exists(select 1 from GDZCZY" + curYear + " where GDZCZY_DWBH = '" + curCompanyCode + "' and GDZCZY_CWQR = '1' " + authorityCondi + ')', "Express", " ", " ") + "]";
                var order = "#GDBGJL_BGDH# asc ";
                return wzself.load(condi, order);
            },
            /**
             * 组织职能帮助条件
             */
            ArrangeCondition: function (pLbracket, pField, pCompare, pFieldValue, pDataType, pRbracket, pRelation) {
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
            /**
             * 日期格式化
             */
            FormatDate8: function (date) {
                if (!date) {
                    return '';
                } else if (typeof date == 'string' && date.length == 8 && date[0] == '2') {
                    return date;
                } else {
                    date = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
                    return date;
                }
            },
            /**
             * 冲突检查
             */
            CheckFunCt: function (companyCode, funcID, funcName, curYear, compFlag, userID, userName) {
                var wzself = this;
                //检查功能冲突：普通单位
                var conflictDs = "";
                var checkresult = "";
                var checkParam = [companyCode, funcID, curYear, compFlag, userID, conflictDs];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckFuncConfRefStr", checkParam)
                    .then(function (result) {
                        if (result) {
                            if (result.data === 'false') {
                                conflictDs = result.outParams;
                                var ds = JSON.parse(conflictDs);
                                var row = ds.CONFLICT[0];
                                checkresult = funcName + "与" + row.FUNCNAME + "功能冲突,用户[" + row.USERNAME + "]正在" + row.FUNCNAME + "。";
                                return checkresult;
                            } else {
                                return checkresult;
                            }
                        } else {
                            return $.Deferred().reject();
                        }
                    }).fail(function (result) {
                        $.messager.alert('提示', "功能冲突检查失败。", 'warning');
                    });
            },
        }
    }
);