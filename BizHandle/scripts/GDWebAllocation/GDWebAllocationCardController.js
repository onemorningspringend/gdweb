gsp.module("gsp.app").controller("GDWebAllocationCardController", "CardController",
    function() {
        var MKID = "GD"; //模块ID
        var BIZOBJID = ""; //业务对象组ID
        var BIZOPID = ""; //业务对象ID
        var FUNCID = ""; //功能ID
        var FUNCNAME = ""; //功能名称
        var curCompanyCode = ""; //单位编号
        var curCompanyName = ""; //单位名称
        var curCompanyType = ""; //公司类别，是否法人单位
        var curYear = ""; //年度
        var curDate = ""; //8位业务日期
        var authorityCondi = ""; //权限条件
        var curUserName = ""; //用户显示名称
        var curUserCode = ""; //用户名（登陆用户名）
        var sfNjwc = ""; //是否年结完成
        var sfCswc = ""; //是否初始完成
        var currGDqj = ""; //固定会计期间
        var bgBak = false; //是否变更备份
        var isNojtlc = ""; //计提控制
        var authorityCondi = ""; //权限条件
        var currGDqj = ""; //固定资产期间
        var curGDndqj = ""; //固定年度期间
        var sfJtzj = ""; //本月是否计提折旧
        var zdrSc = ""; //制单人删除
        var jedecn = 2; //金额精度，默认为2
        var sldecn = 0; //数量精度，默认为0
        var OperationFlag = ''; //操作标志位
        var gshsxz = ""; //公司核算性质
        var dwGslb = ""; //公司类别是否法人单位
        var DCDW = ""; //调出单位
        var DRDW = ""; //调入单位
        var isADD = "0"; //是否是新增状态 1:新增 0：其他状态
        var CancelFlag = false;
        var fsscflag = '0'; //共享中心flag 判断是否由共享中心进入
        var aftersaveresult = {};

        return {
            //界面加载方法
            AllocateCardFormload: function() {
                var wzself = this;
                var DWXZDialog = $('#IFrameDWXZDialog');
                var param = parseUrlParams(window.location);
                fsscflag = param["FSSCFLAG"] || '0';
                if (fsscflag === "1" && param["OPTFLAG"] == "Create") {
                    if (!DWXZDialog.data('dialog')) {
                        DWXZDialog = DWXZDialog.dialog({
                            modal: true,
                            width: 350,
                            height: 185,
                            onOpen: function() {},
                            onClose: function() {
                                curCompanyCode = gsp.application.applicationContext.getParam('CURCOMPANYCODE');
                                curDate = gsp.application.applicationContext.getParam('CURDATE');
                                curYear = curDate.substring(0, 4);
                                return wzself.AllocateCardFormloadNormal();
                            }
                        })
                    }
                    DWXZDialog.dialog('show');
                } else {
                    return wzself.AllocateCardFormloadNormal();
                }
            },
            /**
             * 界面加载方法
             */
            AllocateCardFormloadNormal: function() {
                var wzself = this;
                loading = true;
                $.loading();
                var param = parseUrlParams(window.location);

                if (fsscflag === "1" && param["OPTFLAG"] == "Create") {
                    param["YEAR"] = curYear;
                    param["COMPANYCODE"] = curCompanyCode;
                    param["DATE"] = curDate;
                }
                if (!param["YEAR"]) {
                    param["YEAR"] = param["DATE"].substring(0, 4);
                }
                curCompanyCode = param["COMPANYCODE"];
                curYear = param["YEAR"];
                curDate = param["DATE"];
                return wzself.GetGDParams(curYear, curCompanyCode, curDate).then(function() {
                    wzself.SetUiDisplay(param["OPTFLAG"]); //设置界面
                    wzself.BindExportUnitHelp(); //绑定调出单位过滤条件
                    wzself.BindImportUnitHelp(); //绑定调入单位过滤条件
                    wzself.ExportAssetDicEntryPicking(); //调出资产帮助前事件
                    wzself.DepartDicEntryPicking(); //调入部门帮助前事件
                    wzself.ExportUnitDictEntryPicked(); //调出单位帮助后事件
                    wzself.ImportUnitDictEntryPicked(); //调入单位帮助后事件
                    wzself.DepartDicEntryPicked(); //调入部门帮助后事件
                    wzself.ExportAssetDicEntryPicked(); //调出资产帮助后事件
                    wzself.DataGridDicEntryPicked(); //列表上智能帮助的帮助后事件
                    wzself.DataGridValueChange(); //列表上数值框值改变事件
                    wzself.BindExitFunc(); //绑定退出事件
                    if (param["OPTFLAG"] == "Edit" || param["OPTFLAG"] == "View") {
                        return wzself.loadData(param["dataId"]);
                    }
                }).then(function() {
                    if (param["OPTFLAG"] == "Edit" || param["OPTFLAG"] == "View") {
                        var dcdwbh = wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCDB_DCDWBH"];
                        var dczcbh = wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCDB_DCZCBH"];
                        var dczcid = wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCDB_DCZCID"];
                        wzself.GetAssetInfoforWeb(dczcbh, dcdwbh, curDate, dczcid);
                    }
                    wzself.SetAssetsListDecn(); //设置列表相关字段的精度
                    wzself.ChangeState(); //改变状态
                    wzself.SetUiDisplay(param["OPTFLAG"]); //设置界面
                    //return $.Deferred().resolve();
                }).then(function() {
                    $.loaded();
                    window.parent.$.loaded();
                    loading = false;
                })
            },
            /**
             * 设置界面显示
             */
            SetUiDisplay: function(OperationFlag) {
                var wzself = this;
                wzself.SetTextColor(); //设置文字颜色为黑色
                if (OperationFlag == "Edit") {
                    $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCDW).adplookupbox('readonly', true); //编辑时调入单位只读
                    $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCZC).adplookupbox('readonly', true); //编辑时掉入资产只读
                    $(GDWebBizHandleConstants.ControllerID_ZCDBDateBoxDBRQ).my97datebox('disable'); //编辑时调拨日期只读
                }
                if (fsscflag === "1") {
                    $('#Bar1').parent().hide(); //共享界面需要隐藏自己的工具栏
                }
            },
            /**
             * 根据操作状态控制状态机的变化 
             */
            ChangeState: function() {
                var wzself = this;
                var param = parseUrlParams(window.location);
                OperationFlag = param["OPTFLAG"];
                switch (OperationFlag) {
                    case "Create":
                        wzself.context.view().transitInvoke('Create', [{
                            target: 'GDWebAllocationCardController',
                            methodName: 'AllocateCardCreate',
                            params: []
                        }]);
                        break;
                    case "Edit":
                        wzself.context.view().transitInvoke('Modify', [{
                            target: 'GDWebAllocationCardController',
                            methodName: 'AllocateCardEdit',
                            params: []
                        }]);
                        break;
                    default:
                        break;
                }
            },
            /**
             * 新增方法
             */
            AllocateCardCreate: function() {
                var wzself = this;
                $.loading();
                isADD = "1";
                return wzself.create().then(function() {
                    wzself.SetDefaultValues();
                }).then(function() {
                    dsBackups = $.extend(true, {}, wzself.cardInstance().dataSource.tables(0).rows(0).peek());
                    $.loaded();
                    loading = false;
                }).fail(function() {
                    wzself.cancelAction();
                    $.loaded();
                    loading = false;
                })
            },
            /**
             * 编辑方法
             */
            AllocateCardEdit: function() {
                var wzself = this;
                $.loading();
                loading = true;
                isADD = "0";
                if (wzself.cardInstance().dataSource.tables(0).rows(0)) {
                    var row = wzself.cardInstance().dataSource.tables(0).rows(0).peek();
                } else {
                    $.messager.alert('提示', "不存在可编辑的数据！", 'warning');
                    $.loaded();
                    loading = false;
                    return $.Deferred().reject();
                }
                return wzself.edit().then(function() {
                    dsBackups = $.extend(true, {}, wzself.cardInstance().dataSource.tables(0).rows(0).peek());
                    loading = false;
                    $.loaded();
                })
            },
            /**
             * 保存方法
             */
            AllocateCardSave: function() {
                var wzself = this;
                var param = parseUrlParams(window.location);
                loading = true;
                $.loading();
                var iscansave = wzself.SaveValidate();
                if (iscansave == true) {
                    var savedata = wzself.BuildSaveDataset();
                    //savedata = JSON.stringify(savedata);
                    if (fsscflag === "1") {
                        if (param["OPTFLAG"] == "Edit") {
                            return wzself.SaveAllocation(savedata, false, curCompanyCode, curDate);
                        } else {
                            return wzself.SaveAllocation(savedata, true, curCompanyCode, curDate);
                        }
                    }
                    return wzself.SaveAllocation(savedata, true, curCompanyCode, curDate).then(function() {
                        $.loaded();
                        dsBackups = $.extend(true, {}, wzself.cardInstance().dataSource.tables(0).rows(0).peek());
                        $.notify.success("保存成功");
                        CancelFlag = true;
                        loading = false;
                        isADD = "0";
                    })
                } else {
                    wzself.cancelAction();
                    loading = false;
                    $.loaded();
                    $.notify.error("保存失败");
                    return $.Deferred().reject();
                }
            },
            /**
             * 保存后操作
             */
            AfterSave: function() {
                var wzself = this;
                wzself.notifyGlobalParent();
                return function() {
                    if (JSON.stringify(aftersaveresult) === "{}") {
                        aftersaveresult = wzself.cardInstance().dataSource.tables(0).rows(0).getValue("GDZCDB_ID");
                    }
                    return wzself.loadData(aftersaveresult);
                }().then(function() {
                    $.loaded();
                });
            },
            /**
             * 取消方法
             */
            AllocateCardCancel: function() {
                var wzself = this;
                loading = true;

                if (CancelFlag === false && OperationFlag === "Create" && fsscflag !== "1") {
                    loading = false;
                    return wzself.close().fail(function() {
                        wzself.cancel();
                        isADD = "0";
                    });
                } else {
                    return wzself.cancel().then(function() {
                        if (wzself.cardInstance().dataSource.tables(0).rows(0)) {
                            dsBackups = $.extend(true, {}, wzself.cardInstance().dataSource.tables(0).rows(0).peek());
                        } else {
                            return $.Deferred().resolve();
                        }
                    }).then(function() {
                        isADD = "0";
                        loading = false;
                    })
                }
            },
            /** 
             * 给共享中心使用的删除方法
             */
            DelAllocateforFssc: function() {
                var wzself = this;
                if (!wzself.cardInstance().dataSource.tables(0).rows(0)) {
                    $.messager.alert("提示", "不存在可以删除的数据", "warning");
                    return $.Deferred().reject(false);
                }
                if (!wzself.CheckBizValidator()) {
                    return $.Deferred().reject(false);
                }
                return $.Deferred().resolve();
            },
            /**
             * 检查删除是否合法
             */
            CheckBizValidator: function() {
                var wzself = this;
                var dbdw = wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DWBH"];
                var zdr = wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_ZDR"];
                if (gshsxz == "0" && dbdw !== curCompanyCode) {
                    $.messager.alert('提示', "合并公司不允许删除普通公司创建的调拨单。", 'warning');
                    return false;
                }
                curUserName = gsp.rtf.context.get('UserName'); //获取用户名字
                if (zdr !== "" && zdr !== curUserName) {
                    $.messager.alert('提示', "该调拨资产不允许非制单人删除.", 'warning');
                    return false;
                }
                return true;
            },
            /**
             * 关闭方法
             */
            AllocateCardClose: function() {
                var wzself = this;
                wzself.close();
            },
            /**
             * 设置默认值
             */
            SetDefaultValues: function() {
                var wzself = this;
                //var param = parseUrlParams(window.location); //好像不需要再重新获取
                curUserName = gsp.rtf.context.get('UserName'); //获取用户名字
                wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_DBRQ", curDate); //调拨日期
                wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_CWQR", "0"); //合并确认
                wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_DCCWQR", "0"); //调出确认
                wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_DRCWQR", "0"); //调入确认
                wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_ZDR", curUserName); //制单人
                wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_ID", adp.string.createGUID());
            },
            /**
             * 设置一下文字显示的颜色，以便观察 
             */
            SetTextColor: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCDW).adplookupbox('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRDW).adplookupbox('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCZC).adplookupbox('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRBM).adplookupbox('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRLB).adplookupbox('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRLY).adplookupbox('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBDateBoxDBRQ).my97datebox('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBTextBoxZCMC).text('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBTextBoxDRZC).text('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBTextBoxSPH).text('textbox').css('color', 'black');
                $(GDWebBizHandleConstants.ControllerID_ZCDBTextBoxZY).text('textbox').css('color', 'black');
            },
            /**
             * 调出单位绑定帮助过滤条件
             */
            BindExportUnitHelp: function() {
                var wzself = this;
                var exportUnitHelp = $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCDW).adplookupbox('options').adp;
                var condition = "[" + wzself.ArrangeCondition(" ", "LSBZDW_QYBZ", " = ", " '1' and (LSBZDW_TYBZ = '0' OR LSBZDW_TYBZ = '1' and LSBZDW_TYND > '" + curYear + "') AND LSBZDW_GSXZ<>'1' " +
                    " AND EXISTS (select 1 from SYDOMFP where SYDOMFP_HSDW=LSBZDW_DWBH and SYDOMFP_MKID='GD') AND LSBZDW_ACCOUNT='1' and LSBZDW_DWNM like (SELECT LSBZDW_DWNM{DAE~JoinSymbol}'%' FROM " +
                    " LSBZDW WHERE LSBZDW_DWBH='" + curCompanyCode + "')", "Express", " ", " ") + "]";
                exportUnitHelp.condition = condition;
            },
            /**
             * 调入单位绑定帮助过滤条件
             */
            BindImportUnitHelp: function() {
                var wzself = this;
                var importUnitHelp = $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRDW).adplookupbox('options').adp;
                //普通公司
                //这里是等于2，为了测试改成了不等于2
                if (gshsxz == "2") {
                    var condition = "[" + wzself.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "') AND LSBZDW_GSXZ<>'1' " +
                        " AND EXISTS (select 1 from SYDOMFP where SYDOMFP_HSDW=LSBZDW_DWBH and SYDOMFP_MKID='GD') AND LSBZDW_ACCOUNT='1'", "Express", " ", " ") + "]";
                } else {
                    var condition = "[" + wzself.ArrangeCondition(" ", "LSBZDW_QYBZ", " = ", " '1' and (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "') AND LSBZDW_GSXZ<>'1' " +
                        " AND EXISTS (select 1 from SYDOMFP where SYDOMFP_HSDW=LSBZDW_DWBH and SYDOMFP_MKID='GD') AND LSBZDW_ACCOUNT='1' and LSBZDW_DWNM like (SELECT LSBZDW_DWNM{DAE~JoinSymbol}'%' FROM " +
                        " LSBZDW WHERE LSBZDW_DWBH='" + curCompanyCode + "')", "Express", " ", " ") + "]";
                }
                importUnitHelp.condition = condition;
            },
            /**
             * 调出资产绑定帮助过滤条件
             */
            BindAssetSmartHelp: function(exportUnit, curGDndqj) {
                var wzself = this;
                var AssetHelp = $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCZC).adplookupbox('options').adp;
                if (jtBoforeBg == '1') {
                    var condition1 = " and GDZCZY_ID NOT IN(SELECT GDBGJL_ZCID FROM GDBGJL" + curYear + " WHERE GDBGJL_DWBH='" + exportUnit + "' AND SUBSTRING(GDBGJL_BGRQ,5,2)='" + currGDqj + "' AND GDBGJL_CWQR='1')";
                } else {
                    var condition1 = "";
                }
                if (isNojtlc == '1' || (firstJtThenBiz == '1' && sfJtzj == '1') || (firstJtThenBiz == '0' && sfJtzj == '0')) {
                    var condition2 = "[" + wzself.ArrangeCondition(" ", "GDZCZY_DWBH", " =", "'" + exportUnit + "' and ((GDZCZY_RZRQ<'" + curGDndqj + "' and (GDZCZY_KSQJ<='" + curGDndqj + "')) " +
                        " or(GDZCZY_KSQJ='" + curGDndqj + "' and GDZCZY_QRRQ=GDZCZY_KSQJ and GDZCZY_RZRQ like '" + curGDndqj + "%')) AND GDZCZY_ZZQJ=' ' AND GDZCZY_CWQR='1' " +
                        " AND GDZCZY_ZCBH not in (select GDZCDB_DCZCBH from GDZCDB" + curYear + " where GDZCDB_DCDWBH='" + exportUnit + "' and GDZCDB_KJQJ='" + currGDqj + "' and (GDZCDB_DCCWQR<>'1' " +
                        " or GDZCDB_DRCWQR<>'1')) AND GDZCZY_ZCBH not in (select distinct GDBGJL_ZCBH from GDBGJL" + curYear + " where GDBGJL_DWBH='" + exportUnit + "' and GDBGJL_BGRQ " +
                        " like '" + curGDndqj + "%' and GDBGJL_CWQR='0' ) AND GDZCZY_ZCBH not in (select GDJZQD_ZCBH from GDJZQD" + curYear + " where GDJZQD_DWBH = '" + exportUnit + "' and " +
                        "GDJZQD_KJQJ = '" + currGDqj + "')" + condition1, "Express", " ", " ") + "]";
                } else if (firstJtThenBiz == '1' && sfJtzj == '0') {
                    //业务前计算折旧
                    var condition2 = "[" + wzself.ArrangeCondition(" ", "GDZCZY_DWBH", " =", "'" + exportUnit + "' and ((GDZCZY_RZRQ<'" + curGDndqj + "' and (GDZCZY_KSQJ<='" + curGDndqj + "')) " +
                        " or(GDZCZY_KSQJ='" + curGDndqj + "' and GDZCZY_QRRQ=GDZCZY_KSQJ and GDZCZY_RZRQ like '" + curGDndqj + "%')) AND GDZCZY_ZZQJ=' ' AND GDZCZY_CWQR='1' " +
                        " AND GDZCZY_ZCBH not in (select GDZCDB_DCZCBH from GDZCDB" + curYear + " where GDZCDB_DCDWBH='" + exportUnit + "' and GDZCDB_KJQJ='" + currGDqj + "' and (GDZCDB_DCCWQR<>'1' or GDZCDB_DRCWQR<>'1')) " +
                        " AND GDZCZY_ZCBH not in (select distinct GDBGJL_ZCBH from GDBGJL" + curYear + " where GDBGJL_DWBH='" + exportUnit + "' and GDBGJL_BGRQ like '" + curGDndqj + "%' and GDBGJL_CWQR='0' ) " +
                        " AND GDZCZY_ZCBH not in (select GDJZQD_ZCBH from GDJZQD" + curYear + " where GDJZQD_DWBH = '" + exportUnit + "' and GDJZQD_KJQJ = '" + currGDqj + "')" + condition1, "Express", " ", " ") + "]";

                } else {
                    //只有新增资产
                    if (firstJtThenBiz == "0" && sfJtzj != "0") {
                        $.messager.alert('提示', "调出单位已计提折旧，只可调出当月不计提的新增资产。", 'warning');
                    }
                    var condition2 = "[" + wzself.ArrangeCondition(" ", "GDZCZY_DWBH", " =", "'" + exportUnit + "' and (GDZCZY_KSQJ='" + curGDndqj + "' and GDZCZY_QRRQ=GDZCZY_KSQJ and GDZCZY_RZRQ like '" + curGDndqj + "%' " +
                        " and GDZCZY_DYJT='0') AND GDZCZY_ZZQJ=' ' AND GDZCZY_CWQR='1' AND GDZCZY_ZCBH not in (select GDZCDB_DCZCBH from GDZCDB" + curYear + " where GDZCDB_DCDWBH='" + exportUnit + "' and GDZCDB_KJQJ='" + currGDqj + "' " +
                        " and (GDZCDB_DCCWQR<>'1' or GDZCDB_DRCWQR<>'1')) AND GDZCZY_ZCBH not in (select distinct GDBGJL_ZCBH from GDBGJL" + curYear + " where GDBGJL_DWBH='" + exportUnit + "' " +
                        " and GDBGJL_BGRQ like '" + curGDndqj + "%' and GDBGJL_CWQR='0') AND GDZCZY_ZCBH not in (select GDCHZJL_HZCBH from GDCHZJL" + curYear + " where GDCHZJL_DWBH='" + exportUnit + "' and GDCHZJL_KJQJ='" + currGDqj + "') " + //资产不可是拆装后的
                        " AND GDZCZY_ZCBH not in (select GDJZQD_ZCBH from GDJZQD" + curYear + " where GDJZQD_DWBH = '" + exportUnit + "' and GDJZQD_KJQJ = '" + currGDqj + "')" + condition1, "Express", " ", " ") + "]";
                }
                AssetHelp.condition = condition2;
            },
            /** 
             * 调入部门绑定帮助过滤条件
             */
            BindDepartSmartHelp: function() {
                var wzself = this;
                //var importUnit = wzself.context.getParam('DRDW');
                var importUnit = wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DRDWBH"];
                var DepartHelp = $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRBM).adplookupbox('options').adp;
                var condition = "[" + wzself.ArrangeCondition(" ", "LSBMZD_DWBH", " =", "'" + importUnit + "' and (LSBMZD_TYBZ='0' OR LSBMZD_TYND>'" + curYear + "') AND" +
                    " LSBMZD_HSF='1'", "Express", " ", " ") + "]";
                DepartHelp.condition = condition;

            },
            /**
             * 调出资产帮助前事件
             */
            ExportAssetDicEntryPicking: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCZC).on('OnDictEntryPicking', function(option, dataRow) {
                    //var exportUnit = wzself.context.getParam('DCDW');
                    var exportUnit = wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DCDWBH"];
                    if (exportUnit == "" || exportUnit == null) {
                        $(this).adplookupbox('close');
                        $.messager.alert('提示', "请先选择调出单位！", 'warning');
                        setTimeout(function() {
                            $(this).data('adplookupbox').isOpen = false;
                        }, 100);
                        return false;
                    } else {
                        //var importUnit = wzself.context.getParam('DRDW');
                        var importUnit = wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DRDWBH"];
                        if (importUnit == "" || importUnit == null) {
                            $(this).adplookupbox('close');
                            $.messager.alert('提示', "请先选择调入单位！", 'warning');
                            setTimeout(function() {
                                $(this).data('adplookupbox').isOpen = false;
                            }, 100);
                            return false;
                        } else {
                            return wzself.GetGDParams(curYear, exportUnit, curDate).then(function() {
                                wzself.BindAssetSmartHelp(exportUnit, curGDndqj);
                            })
                        }
                    }
                })
            },
            /**
             * 调入部门帮助前事件
             */
            DepartDicEntryPicking: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRBM).on('OnDictEntryPicking', function(optiom, dataRow) {
                    //var exportUnit = wzself.context.getParam('DCDW');
                    var exportUnit = wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DCDWBH"];
                    if (exportUnit == "" || exportUnit == null) {
                        $(this).adplookupbox('close');
                        $.messager.alert('提示', "请先选择调出单位！", 'warning');
                        setTimeout(function() {
                            $(this).data('adplookupbox').isOpen = false;
                        }, 100);
                        return false;
                    } else {
                        //var importUnit = wzself.context.getParam('DRDW');
                        var importUnit = wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DRDWBH"];
                        if (importUnit == "" || importUnit == null) {
                            $(this).adplookupbox('close');
                            $.messager.alert('提示', "请先选择调入单位！", 'warning');
                            setTimeout(function() {
                                $(this).data('adplookupbox').isOpen = false;
                            }, 100);
                            return false;
                        } else {
                            wzself.BindDepartSmartHelp();
                        }
                    }
                })
            },
            /**
             * 调出单位帮助后事件
             */
            ExportUnitDictEntryPicked: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCDW).on('OnDictEntryPicked', function(option, dataRow) {
                    //检查调出单位期间是否等同于登陆期间
                    var exportUnit = dataRow[0].LSBZDW_DWBH;
                    var exportUnitName = dataRow[0].LSBZDW_DWMC;
                    wzself.context.setParam('DCDW', exportUnit); //更新单位编号全局变量
                    wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_DCDWBH", exportUnit); //需要及时更新数据源上的数据
                    wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_DCDWBH_LSBZDW_DWMC", exportUnitName); //需要及时更新数据源上的数据
                    return wzself.GetGDParams(curYear, exportUnit, curDate).then(function() {
                        //var param = parseUrlParams(window.location);//此处不需要再重新获取一遍了
                        var dlqj = curDate.substring(4, 6);
                        if (dlqj == currGDqj) {
                            wzself.BindAssetSmartHelp(exportUnit, curGDndqj); //切换单位后重新绑定调出资产的帮助
                        } else {
                            $.messager.alert('提示', "[" + exportUnitName + "]单位的固定资产期间非当前登录期间，请检查！", 'warning');
                        }
                    })
                })
            },
            /**
             * 调入单位帮助后事件
             */
            ImportUnitDictEntryPicked: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRDW).on('OnDictEntryPicked', function(option, dataRow) {
                    var importUnit = dataRow[0].LSBZDW_DWBH;
                    var importUnitName = dataRow[0].LSBZDW_DWMC;
                    wzself.context.setParam('DRDW', importUnit); //更新单位编号全局变量
                    wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_DRDWBH", importUnit);
                    wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_DRDWBH_LSBZDW_DWMC", importUnitName);
                    return wzself.GetGDParams(curYear, importUnit, curDate).then(function() {
                        if (dwGslb == "2") {
                            $.messager.alert('提示', "[" + importUnitName + "[为法人单位，不能调入资产！", 'warning');
                        }
                        //var param = parseUrlParams(window.location);
                        var dlqj = curDate.substring(4, 6);
                        if (dlqj == currGDqj) {
                            wzself.BindDepartSmartHelp();
                        } else {
                            $.messager.alert('提示', "[" + importUnitName + "]单位的固定资产期间非当前登录期间，请检查！", 'warning');
                        }
                    })
                })
            },
            /**
             * 调入部门帮助后事件
             */
            DepartDicEntryPicked: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDRBM).on('OnDictEntryPicked', function(option, dataRow) {
                    var departCode = dataRow[0].LSBMZD_BMBH;
                    wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCDB_DRBM"] = departCode;
                })
            },
            /**
             * 调出资产帮助后事件
             */
            ExportAssetDicEntryPicked: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCZC).on('OnDictEntryPicked', function(option, dataRow) {
                    var aseetCode = dataRow[0].GDZCZY_ZCBH;
                    var assetName = dataRow[0].GDZCZY_ZCMC;
                    var exportUnit = wzself.context.getParam('DCDW');
                    wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCDB_DCZCBH"] = aseetCode;
                    wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCDB_DCZCBH_GDZCZY_ZCMC"] = assetName;
                    $(GDWebBizHandleConstants.ControllerID_ZCDBSmartHelpDCZC).adplookupbox('setValue', aseetCode); //为什么帮助后事件还得自己重新加一下
                    $(GDWebBizHandleConstants.ControllerID_ZCDBTextBoxZCMC).val(assetName);
                    return wzself.GetAssetInfo(aseetCode, exportUnit, curDate);
                    wzself.SetAssetsListDecn(); //设置列表相关字段的精度
                })
            },
            /**
             * 获取资产信息
             */
            GetAssetInfo: function(AssetCodeStr, exportUnit, ywrq) {
                var wzself = this;
                var params = [AssetCodeStr, exportUnit, ywrq];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetAssetInfo", params).then(
                    function(result) {
                        if (result) {
                            wzself.BindingAssetsList(result); //重新载入数据
                            wzself.context.setParam('dataforsave', result); //保存ds供保存使用
                            //绑定资产信息
                            $(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX).datagrid('loadData', {
                                    total: 20,
                                    rows: wzself.cardInstance().dataSource.peek().GDZCDB
                                })
                                //wzself.SetAssetsListDecn(); //设置列表相关字段的精度
                        }
                    }).fail(function(result) {
                    $.messager.alert('提示', "获取资产信息失败。", 'warning');
                    return;
                });
            },
            /**
             * 获取资产信息(web专用)
             */
            GetAssetInfoforWeb: function(AssetCodeStr, exportUnit, ywrq, exportZCID) {
                var wzself = this;
                var params = [AssetCodeStr, exportUnit, ywrq, exportZCID];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetAssetInfofroWeb", params).then(
                    function(result) {
                        if (result) {
                            wzself.BindingAssetsList(result); //重新载入数据
                            wzself.context.setParam('dataforsave', result); //保存ds供保存使用
                            //绑定资产信息
                            $(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX).datagrid('loadData', {
                                    total: 20,
                                    rows: wzself.cardInstance().dataSource.peek().GDZCDB
                                })
                                //wzself.SetAssetsListDecn(); //设置列表相关字段的精度
                        }
                    }).fail(function(result) {
                    $.messager.alert('提示', "获取资产信息失败。", 'warning');
                    return;
                });
            },
            /**
             * 绑定资产列表
             */
            BindingAssetsList: function(ds) {
                var wzself = this;
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_ID"] = ds.data.Table[0]["GDZCZY_ID"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_ZCBH"] = ds.data.Table[0]["GDZCZY_ZCBH"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DWBH"] = ds.data.Table[0]["GDZCZY_DWBH"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_ZCMC"] = ds.data.Table[0]["GDZCZY_ZCMC"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DCSL"] = ds.data.Table[0]["GDZCZY_ZCSL"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_ZCSL"] = ds.data.Table[0]["GDZCZY_ZCSL"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_BGXH"] = ds.data.Table[0]["GDZCZY_BGXH"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DBSL"] = ds.data.Table[0]["GDZCZY_ZCSL"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRLB"] = ds.data.Table[0]["GDZCZY_LBBH"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRLB_GDZCLB_LBMC"] = ds.data.Table[0]["GDZCLB_LBMC"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRLY"] = ds.data.Table[0]["GDZCZY_LYBH"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRLY_GDLYZD_LYMC"] = ds.data.Table[0]["GDLYZD_LYMC"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DCZJBH"] = ds.data.Table[0]["GDZCZY_ZJBH"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DCZJBH_GDZJFF_ZJMC"] = ds.data.Table[0]["GDZJFF_ZJMC"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRZJBH"] = ds.data.Table[0]["GDZCZY_ZJBH"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRZJBH_GDZJFF_ZJMC"] = ds.data.Table[0]["GDZJFF_ZJMC"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DCZJYF"] = ds.data.Table[0]["GDZCZY_ZJYF"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRZJYF"] = wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCDB_DRZJYF"]
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DBYZ"] = ds.data.Table[0]["F_ZCYZ"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRYZ"] = ds.data.Table[0]["F_ZCYZ"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DCLJZJ"] = ds.data.Table[0]["F_LJZJ"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRLJZJ"] = ds.data.Table[0]["F_LJZJ"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DCJCZ"] = ds.data.Table[0]["F_JCZ"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_DRJCZ"] = ds.data.Table[0]["F_JCZ"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_ZCYZ"] = ds.data.Table[0]["F_ZCYZ"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_LJZJ"] = ds.data.Table[0]["F_LJZJ"];
                wzself.cardInstance().dataSource.peek().GDZCDB[0]["GDZCZY_JCZ"] = ds.data.Table[0]["F_JCZ"];
            },
            //设置绑定的资产列表的精度
            SetAssetsListDecn: function() {
                var wzself = this;
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCDB_DBSL', sldecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCZY_DCZJYF', sldecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCZY_DRZJYF', sldecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCZY_DBYZ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCZY_DRYZ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCZY_DCLJZJ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCZY_DRLJZJ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCZY_DCJCZ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX, 'GDZCZY_DRJCZ', jedecn);

            },
            /**
             * 保存前检查事件
             */
            SaveValidate: function() {
                var wzself = this;
                var dt = wzself.cardInstance().dataSource.peek().GDZCDB[0];
                //检查调拨信息
                if (dt["GDZCDB_DCDWBH"] == "" || dt["GDZCDB_DCDWBH"] == null) {
                    $.messager.alert('提示', "请选择调出单位！", 'warning');
                    return false;
                }
                if (dt["GDZCDB_DRDWBH"] == "" || dt["GDZCDB_DRDWBH"] == null) {
                    $.messager.alert('提示', "请选择调入单位！", 'warning');
                    return false;
                }
                if (dt["GDZCDB_DCZCBH"] == "" || dt["GDZCDB_DCZCBH"] == null) {
                    $.messager.alert('提示', "请选择调出资产！", 'warning');
                    return false;
                }
                if (dt["GDZCDB_DRBM"] == "" || dt["GDZCDB_DRBM"] == null) {
                    $.messager.alert('提示', "请选择调入部门！", 'warning');
                    return false;
                }
                if (dt["GDZCDB_DBRQ"] == "" || dt["GDZCDB_DBRQ"] == null || dt["GDZCDB_DBRQ"].substring(0, 4) == "00001") {
                    $.messager.alert('提示', "请选择调拨日期！", 'warning');
                    return false;
                }
                //检查资产信息
                var AssetCode = dt["GDZCZY_ZCBH"];
                var assetSL = dt["GDZCZY_DBSL"];
                if (dt["GDZCZY_DBSL"] <= 0) {
                    $.messager.alert('提示', AssetCode + "资产调拨数量需大于零，请检查！", 'warning');
                    return false;
                }
                if (assetSL > dt["GDZCZY_ZCSL"]) {
                    $.messager.alert('提示', AssetCode + "资产调拨数量超过资产数量，请检查！", 'warning');
                    return false;
                }
                if (assetSL.length > 12) {
                    $.messager.alert('提示', AssetCode + "资产调拨数量不能超过12位，请修改！", 'warning');
                    return false;
                }
                if (dt["GDZCZY_DRZJBH"] == "" || dt["GDZCZY_DRZJBH"] == null) {
                    $.messager.alert('提示', AssetCode + "资产未选择调入折旧方法！", 'warning');
                    return false;
                }
                //0==""==true,所以这里要使用0===""
                if (dt["GDZCZY_DRZJYF"] === "" || dt["GDZCZY_DRZJYF"] == null) {
                    $.messager.alert('提示', AssetCode + "资产未输入调入折旧月份！", 'warning');
                    return false;
                }
                if (dt["GDZCZY_DRZJYF"].length > 12) {
                    $.messager.alert('提示', AssetCode + "资产折旧月份不能超过12位，请修改！", 'warning');
                    return false;
                }
                return true;
            },
            /**
             * 构造保存方法需要的ds
             */
            BuildSaveDataset: function() {
                var wzself = this;
                var savedata = {};
                var ds = wzself.context.getParam('dataforsave');
                savedata['GDZCDB'] = wzself.cardInstance().dataSource.peek().GDZCDB;
                //savedata['GDZCZY'] = ds.data.Table;
                savedata['GDZCZY'] = wzself.cardInstance().dataSource.peek().GDZCDB;
                return savedata;
            },
            /**
             * 服务端保存调拨方法
             */
            SaveAllocation: function(ds, isADD, curCompanyCode, curDate) {
                var wzself = this;
                var dsforsave = wzself.ConvertSaveData();
                if (fsscflag === "1") {
                    $.loaded();
                    return $.Deferred().resolve(dsforsave);;
                }
                var params = [ds, isADD, curCompanyCode, curDate];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "SaveAllocation", params).then(
                    function(AllocationID) {
                        wzself.cardInstance().dataSource.tables(0).rows(0).setValue("GDZCDB_ID", AllocationID.data);
                        return AllocationID;
                    })
            },
            /**
             * 构造共享需要的数据
             */
            ConvertSaveData: function() {
                var wzself = this;
                var row = wzself.cardInstance().dataSource.tables(0).rows(0).peek();
                var ds = { "Table1": [{}] };
                var rowNew = ds["Table1"][0];
                rowNew["GDZCDB_ID"] = row["GDZCDB_ID"];
                rowNew["GDZCDB_DBRQ"] = wzself.FormatDate8(row["GDZCDB_DBRQ"]);
                rowNew["GDZCDB_SBBH"] = row["GDZCDB_SBBH"];
                rowNew["GDZCDB_ZCBH"] = row["GDZCDB_DCZCBH"];
                rowNew["GDZCDB_DWBH"] = curCompanyCode;
                rowNew["GDZCDB_DRDWBH"] = row["GDZCDB_DRDWBH"];
                rowNew["GDZCDB_DCDWBH"] = row["GDZCDB_DCDWBH"];
                rowNew["GDZCDB_DRBM"] = row["GDZCDB_DRBM"];
                rowNew["GDZCDB_SPBH"] = row["GDZCDB_SPBH"];
                rowNew["GDZCDB_ZY"] = row["GDZCDB_ZY"];
                rowNew["GDZCDB_ZDR"] = row["GDZCDB_ZDR"];
                rowNew["GDZCDB_FLID"] = row["GDZCDB_FLID"];
                rowNew["GDZCDB_DBSL"] = row["GDZCDB_DBSL"];
                rowNew["GDZCDB_DBYZ"] = row["GDZCDB_DBYZ"];
                rowNew["GDZCDB_ZCMC"] = row["GDZCZY_ZCMC"];
                rowNew["GDZCDB_DRLB"] = row["GDZCDB_DRLB"];
                rowNew["GDZCDB_DRLY"] = row["GDZCDB_DRLY"];
                rowNew["GDZCDB_DRZJBH"] = row["GDZCDB_DRZJBH"];
                rowNew["GDZCDB_DRZJYF"] = row["GDZCDB_DRZJYF"];
                if (fsscflag === "1") {
                    rowNew["GDZCDB_DBRQ"] = row["GDZCDB_DBRQ"];
                    rowNew["curDate"] = curDate;
                    rowNew["Saveflag"] = "1";
                }
                return ds;
            },
            /** 
             * 列表中的智能帮助帮助后事件
             */
            DataGridDicEntryPicked: function() {
                var wzself = this;
                $('#XDataGridZCMZ').datagrid('options').onBeforeEdit = function(rowindex, rowdata) {
                    var dg = this;
                    var fields = $(this).datagrid('getAllColumnFields');
                    $.each(fields, function() {
                        var field = this;
                        if (this == "GDZCZY_DRLB_GDZCLB_LBMC") {
                            var fieldOpts = $(dg).datagrid('getColumnOption', field);
                            if (fieldOpts && fieldOpts.editor) {
                                if (fieldOpts.editor.type == 'adplookupbox') {
                                    fieldOpts.editor.options.adp.OnDictEntryPicked = function(rowData, opts) {
                                        wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DRLB"] = rowData[0].GDZCLB_LBBH;
                                    }
                                }
                            }
                        } else if (this == "GDZCZY_DRLY_GDLYZD_LYMC") {
                            var fieldOpts = $(dg).datagrid('getColumnOption', field);
                            if (fieldOpts && fieldOpts.editor) {
                                if (fieldOpts.editor.type == 'adplookupbox') {
                                    fieldOpts.editor.options.adp.OnDictEntryPicked = function(rowData, opts) {
                                        wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DRLY"] = rowData[0].GDLYZD_LYBH;
                                    }
                                }
                            }
                        } else if (this == "GDZCZY_DRZJBH_GDZJFF_ZJMC") {
                            var fieldOpts = $(dg).datagrid('getColumnOption', field);
                            if (fieldOpts && fieldOpts.editor) {
                                if (fieldOpts.editor.type == 'adplookupbox') {
                                    fieldOpts.editor.options.adp.OnDictEntryPicked = function(rowData, opts) {
                                        wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DRZJBH"] = rowData[0].GDZJFF_ZJBH;
                                    }
                                }
                            }
                        }
                    });
                }
            },
            /** 
             * 列表中数值框值改变事件
             */
            DataGridValueChange: function() {
                var wzself = this;
                $('#XDataGridZCMZ').datagrid('options').onAfterEdit = function(rowindex, rowdata) {
                    var dg = this;
                    var fields = $(this).datagrid('getAllColumnFields');
                    $.each(fields, function() {
                        var field = this;
                        if (field == "GDZCZY_DRZJYF") {
                            var drzjyf = $(GDWebBizHandleConstants.ControllerID_ZCDBDataGridZCMX).datagrid('getData').rows[0]["GDZCZY_DRZJYF"];
                            wzself.cardInstance().dataSource.tables(0).rows(0).peek()["GDZCDB_DRZJYF"] = drzjyf;
                        }
                    });
                }
            },
            /**
             * 获取公司参数
             */
            GetGDParams: function(curYear, curCompanyCode, curDate) {
                var wzself = this;
                var params = [curCompanyCode, curYear, curDate, "ALLOCATION"];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", params).then(
                    function(result) {
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
                            if (dicParams["GD_JT_BG"])
                                jtBoforeBg = dicParams["GD_JT_BG"];
                            if (dicParams["GD_JT_DB"])
                                firstJtThenBiz = dicParams["GD_JT_DB"];
                            if (dicParams["GD_BGZDGXCSYZJE"])
                                bgZdgxCs = dicParams["GD_BGZDGXCSYZJE"];
                            if (dicParams["GDndqj"])
                                curGDndqj = dicParams["GDndqj"];
                            if (dicParams["GD_SFJTZJ"])
                                sfJtzj = dicParams["GD_SFJTZJ"];
                            if (dicParams["GD_ZDRSC"])
                                zdrSc = dicParams["GD_ZDRSC"];
                            if (dicParams["GD_JEDECN"])
                                jedecn = dicParams["GD_JEDECN"];
                            if (dicParams["GD_GSHSXZ"])
                                gshsxz = dicParams["GD_GSHSXZ"];
                            if (dicParams["DW_GSLB"])
                                dwGslb = dicParams["DW_GSLB"];
                            if (dicParams["GD_SLDECN"])
                                sldecn = dicParams["GD_SLDECN"];
                        }
                    }).fail(function(result) {
                    $.messager.alert('提示', "获取单位信息失败。", 'warning');
                    return;
                });;
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
            /** 
             * 设置列精度
             */
            SetColumnsJecn: function(datagridID, columnscode, Jecn) {
                if ($(datagridID).datagrid('getColumnOption', columnscode) && $(datagridID).datagrid('getColumnOption', columnscode).formatter) {
                    $(datagridID).datagrid('getColumnOption', columnscode).formatter = function(v, d, i) {
                        if (d.footRow && !v) {
                            return v;
                        }
                        if (v != undefined && v != null)
                            return gc.accounting.formatMoney(v, '', Jecn, '') + '';
                        else
                            return v;
                    };
                }
            },
            /**
             * 日期格式化
             */
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
            /**
             * 绑定退出的事件
             */
            BindExitFunc: function() {
                var wzself = this;
                setTimeout(function() {
                    $(document).off('framerefresh').on('framerefresh', function() {
                        return wzself.FuncExitCheck("refresh");
                    });
                    $(document).off('frameclose').on('frameclose', function() {
                        return wzself.FuncExitCheck("close");
                    });
                }, 1000);
            },
            /**
             * 功能刷新和退出时的检查 1:刷新 0：退出
             * @param {*string} assetCode - 项目对应的资产编号
             */
            FuncExitCheck: function(flag) {
                var wzself = this;
                if (close) {
                    return true;
                }
                if (wzself.HasChanges(true) && !close) {
                    Pub.ThreeButtonConfirm("提示", "数据已修改，是否保存？").then(function(result) {
                        if (result === "1") {
                            wzself.context.view().transitInvoke('Save', [{
                                target: 'GDWebAllocationCardController',
                                methodName: 'AllocateCardEdit',
                                params: []
                            }]);
                        } else {
                            if (flag === "refresh") {
                                close = true;
                                return window.location.reload();
                            } else {
                                close = true;
                                return window.top.gsp.rtf.func.close(wzself.context.getParam(ctrlLang.funcIdK));
                            }
                        }
                    });
                    return false;
                }
            },
            /**
             * 检查是否修改过
             * @param {*bool} flag - true为深度检查
             */
            HasChanges: function(flag) {
                var wzself = this;
                var ds = wzself.cardInstance().dataSource.tables(0).rows(0).peek();
                for (var key in ds) {
                    if (ds[key] === null) {
                        ds[key] = "";
                    }
                    ds['GDZCDB_BGXH'] = ds['GDZCDB_BGXH'] || 0;
                }
                if (_.isEqual(ds, dsBackups) || _.isEqual({}, dsBackups)) {
                    return false;
                }
                return true;
            },
            /**
             * 三个按钮的选择框 “1”为是，“0”为否
             * @param  {string} title - 标题
             * @param  {string} message - 显示内容
             * @param  {string} ifcancel - 是否有取消按钮（默认为true）
             */
            ThreeButtonConfirm: function(title, message, ifcancel) {
                var defer = $.Deferred(),
                    t = title ? title : ctrlLang.delConfirmT,
                    m = message ? message : ctrlLang.delConfirmM;

                //解决confirm框右上角关闭按钮的点击事件，捕获到是defer的结果
                $.fn.window.defaults.closable = false;
                this.Threeconfirm(t, m, ifcancel, function(r) {
                    if (r === "1") {
                        defer.resolve("1");
                    } else if (r === "0") {
                        defer.resolve("0");
                    } else {
                        defer.reject();
                    }
                });

                $.fn.window.defaults.closable = true;

                return defer;
            },
            /**
             * 形成弹窗的方法
             */
            Threeconfirm: function(title, msg, ifcancel, fn) {
                var content = '<div class="messager-icon messager-question"></div>' +
                    '<div>' + msg + '</div>' +
                    '<div style="clear:both;"/>';
                var buttons = {};
                buttons["是"] = function() {
                    win.window('close');
                    if (fn) {
                        fn("1");
                        return false;
                    }
                };
                buttons["否"] = function() {
                    win.window('close');
                    if (fn) {
                        fn("0");
                        return false;
                    }
                };
                if (ifcancel !== false) {
                    buttons[$.messager.defaults.cancel] = function() {
                        win.window('close');
                        if (fn) {
                            fn("Cancel");
                            return false;
                        }
                    };
                }

                var win = $('<div class="messager-body"></div>').appendTo('body');
                win.append(content);
                if (buttons) {
                    var tb = $('<div class="messager-button"></div>').appendTo(win);
                    for (var label in buttons) {
                        $('<a></a>').attr('href', 'javascript:void(0)').text(label)
                            .css('margin-left', 10)
                            .bind('click', eval(buttons[label]))
                            .appendTo(tb).linkbutton();
                    }
                }
                win.window({
                    title: title,
                    noheader: (title ? false : true),
                    width: 300,
                    height: 'auto',
                    modal: true,
                    collapsible: false,
                    minimizable: false,
                    maximizable: false,
                    resizable: false,
                    onClose: function() {
                        setTimeout(function() {
                            win.window('destroy');
                        }, 100);
                    }
                });
                win.window('window').addClass('messager-window');
                win.children('div.messager-button').children('a:first').focus();

                if (win) {
                    var msgdiv = win.find('.messager-icon').next();
                    if (msgdiv) {
                        var msgHeight = msgdiv.outerHeight();
                        if (msgHeight < 32) {
                            msgdiv.css({ "lineHeight": "32px" });
                        }
                    }
                }
                win.on('keyup', function(e) {
                    if (e.which == 32 || e.which == 13) {
                        win.window('close');
                        if (fn) {
                            fn(true);
                            return false;
                        }
                    }

                    if (e.which == 27) { // esc
                        win.window('close');
                        if (fn) {
                            fn(false);
                            return false;
                        }
                    }
                }).on('click', function() {
                    win.children('div.messager-button').children('a:first').focus();
                });
            },
        }
    });