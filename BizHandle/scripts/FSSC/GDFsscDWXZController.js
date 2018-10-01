gsp.module("gsp.app").controller("GDFsscDWXZController", "CardController", ['BizHandlePub', function(Pub) {
    var curcompany = "";
    var curCompanyName = "";
    var curCompanyCode = "";
    var curDate = "";
    var curYear = "";
    var MKID = "GD"; //模块ID
    var BIZOBJID = ""; //业务对象组ID
    var BIZOPID = ""; //业务对象ID
    var FUNCID = ""; //功能ID
    var FUNCNAME = ""; //功能名称
    var companyHPid = "#SmartDWXZ";
    var njwc = "";
    var curPeriod = ""; //期间
    var Jtzj = "0"; //是否计提折旧
    var jtzt = ''; //计提状态
    var isInitEnd = ''; //是否已初始完成
    var njwc = "0"; //是否年结完成
    var jeDecn = 2; //金额精度
    var slDecn = 0; //数量精度
    var isJoinZcgl = '0'; // 是否关联资产管理
    var isZdrDel = "0"; //只允许制单人删除单据
    var noJtlc = ''; //不计提折旧流程控制
    var dicParams = ''; //服务器端取回参数
    var curCompanyType = '';
    var loading = false; //是否正在加载标志
    var EditFlag = "0"; //是否编辑打开窗口标志，去除检查单位和年度

    return {
        DWXZFormload: function() {
            var dwself = this;
            var params = parseUrlParams(window.location); //从URL解析出的参数
            dwself.SetUI();
            $.loading();
            loading = true;
            BIZOBJID = params.bizObjectId;
            BIZOPID = params.bizOPId;
            FUNCID = params.funcid;
            gsp.application.applicationContext.setParam("firstopen", "0");
            if (FUNCID === "GDWEB102") {
                $("#XRadioGroup_BGJCZ").parent().parent().hide();
                FUNCNAME = "资产减少";
            } else if (FUNCID === "GDWEB101") {
                $("#XRadioGroup_BGJCZ").parent().parent().hide();
                FUNCNAME = "资产增加"
            } else if (FUNCID === "GDWEB105") {
                FUNCNAME = "资产变更"
                    //设置变更净残值radiogroup
                $('#XRadioGroup_BGJCZ_0').attr('checked', true); //默认勾选以净残值为准
                EditFlag = gsp.application.applicationContext.getParam('EditFlag');
                if (EditFlag === "1") {
                    $("#SmartDWXZ").parent().parent().hide();
                    $("#YWDate").parent().parent().hide();
                    $.loaded();
                    return $.Deferred().reject();
                }
            } else if (FUNCID === "GDWEB109") {
                $("#XRadioGroup_BGJCZ").parent().parent().hide();
                FUNCNAME = "资产调拨";
            } else if (FUNCID === "GDWEB107") {
                $("#XRadioGroup_BGJCZ").parent().parent().hide();
                FUNCNAME = "资产减值";
            }
            var dataSource = dwself.cardInstance().dataSource.tables(0).rows(0);
            dataSource.setValue("YWDate", Pub.FormatDate8(gsp.rtf.context.get('BizDate')));
            curDate = Pub.FormatDate8(dataSource.peek()["YWDate"]);
            curYear = curDate.substring(0, 4);
            return dwself.GetFsscFilterCondi().then(function() {
                return dwself.GetFirstAuditMemberCommon();
            }).then(function() {
                loading = false;
                $.loaded();
            }).fail(function() {
                loading = false;
                $.loaded();
            });
        },
        OK: function() {
            var dwself = this;
            var dwxzsource = dwself.cardInstance().dataSource.tables(0).rows(0).peek();
            if (EditFlag === "1") {
                var changeNetSalvageValueBase = $('#XRadioGroup_BGJCZ').find(":checked").val();
                gsp.application.applicationContext.setParam('changeNetSalvageValueBase', changeNetSalvageValueBase);
                parent.$("#BarPubBill").show();
                $('#IFrameDWXZDialog').dialog('close');
                return true;
            }
            if (!curDate || !curYear || !dwxzsource.YWDate) {
                $.messager.alert("提示", "请输入业务日期！", "warning");
                return false;
            }
            if (!curCompanyCode || !dwxzsource.XZDW) {
                $.messager.alert("提示", "请输入核算单位！", "warning");
                return false;
            }
            $.loading();
            return dwself.CheckFunCt(curCompanyCode, FUNCID, FUNCNAME, curYear, "1", gsp.rtf.context.get('UserID'), gsp.rtf.context.get('UserName'))
                .then(function(result) {
                    if (result) {
                        //有冲突的 把单位帮助的数据转回
                        //dataSource.setValue("XZDW", "");
                        //$(curhelpid).adplookupbox('setValue', "");
                        //$(curhelpid).adplookupbox('setText', "");
                        $.loaded();
                        $.messager.alert('提示', result, 'warning');
                        return;
                    }
                    return dwself.GetGDParams(curYear, curCompanyCode, curDate);
                }).then(function() {
                    return dwself.CompanyCheck();
                }).then(function() {
                    $.loaded();
                    if (curCompanyCode && curDate && dwxzsource.YWDate && dwxzsource.XZDW) {
                        gsp.application.applicationContext.setParam('CURCOMPANYCODE', curCompanyCode);
                        gsp.application.applicationContext.setParam('CURCOMPANYNAME', curCompanyName);
                        gsp.application.applicationContext.setParam('CURDATE', curDate);
                        var changeNetSalvageValueBase = $('#XRadioGroup_BGJCZ').find(":checked").val();
                        gsp.application.applicationContext.setParam('changeNetSalvageValueBase', changeNetSalvageValueBase);
                        parent.$("#BarPubBill").show();
                        $('#IFrameDWXZDialog').dialog('close');
                    }
                }).fail(function() {
                    $.loaded();
                })
        },
        DateChange: function() {
            var dwself = this;
            var dataSource = dwself.cardInstance().dataSource.tables(0).rows(0);
            if (Pub.FormatDate8(dataSource.peek()["YWDate"]) !== curDate && !loading) {
                //dataSource.setValue("XZDW", curCompanyCode);
                //$(companyHPid).adplookupbox('setValue', "");
                //$(companyHPid).adplookupbox('setText', "");
                //curCompanyCode = "";
                curDate = Pub.FormatDate8(dataSource.peek()["YWDate"]);
                curYear = curDate.substring(0, 4);
                if (curYear) {
                    var helpParam = ["0", "0", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curYear, BIZOBJID, BIZOPID, MKID];
                    return dwself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFsscAuditMemberSqlCondiRestFul", helpParam)
                        .then(function(result) {
                            //设置核算组织帮助
                            companyHP = $(companyHPid);
                            var companyHelp = companyHP.adplookupbox('options').adp;
                            companyHelp.condition = "[" + Pub.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and " + result.data, "Express", " ", " ") + "]";
                        }).fail(function() {
                            dataSource.setValue("YWDate", Pub.FormatDate8(gsp.rtf.context.get("bizdate")));
                        });
                }
            }
        },
        SetUI: function() {
            var params = parseUrlParams(window.location);
            //parent.$('#BarPubBill').buttongroup('hideButton', 'd28e2d6a-0f70-4a5d-8e62-0094077b1f05');
            //parent.$('#BarPubBill').buttongroup('hideButton', 'b06e9c23-3a4b-451c-a226-bd081719a36c');
            // parent.$('#BarPubBill').buttongroup('hideButton', '9fd8efe6-e7ce-43f0-ac1c-7770a4181788');
            // parent.$('#BarPubBill').buttongroup('hideButton', 'e12bf832-aa32-4e50-9ab5-d2a4537eae59');
            parent.$('#BarPubBill').buttongroup('hideButton', 'c0af96a7-c73b-4578-b73b-afcce1876af1');
            parent.$('#BarPubBill').buttongroup('hideButton', '5b85ded0-e509-48d7-b6a2-947fe152ec10', true);
            parent.$('#BarPubBill').buttongroup('hideButton', '4f8dc3b5-7f82-49f7-ad4f-42f3f7c82358', true);
            parent.$('#BarPubBill').buttongroup('hideButton', '5d9a83be-aa53-4433-af6c-a26b0260dbbd');
            parent.$('#BarPubBill').buttongroup('hideButton', '05cf7259-b88b-4859-82ca-e8da98b2df81');
            //parent.$('#BarPubBill').buttongroup('hideButton', 'd4e85994-36c2-4f77-b889-702538c62d6b'); //上传影像
            // if (params.funcid === "GDWEB107") {
            //     parent.$('#BarPubBill').buttongroup('hideButton', 'c8aff1d0-fac8-4df9-8699-1cd9f88dbf52'); //新增
            //     parent.$('#BarPubBill').buttongroup('hideButton', '2b111168-62b9-425e-b4b7-4c6c0a26222e'); //编辑
            //     parent.$('#BarPubBill').buttongroup('hideButton', 'd858c873-f520-42af-baab-b32ec75076f3'); //取消
            //     parent.$('#BarPubBill').buttongroup('hideButton', '50939bcf-587e-4677-a9aa-100c6e5f1971'); //删除
            // }
            parent.$("#BarPubBill").hide();
        },
        /**
         * 获取并设置核算单位帮助条件以及帮助后事件(异步)
         */
        GetFsscFilterCondi: function() {
            var dwself = this;
            var helpParam = ["0", "0", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curYear, BIZOBJID, BIZOPID, MKID];
            companyHP = $(companyHPid);
            companyHP.off('OnDictEntryPicked.reduce').on('OnDictEntryPicked.reduce', function(e, rowData, opts) {
                var row = rowData[0] || rowData;
                curCompanyCode = row.LSBZDW_DWBH;
                curCompanyName = row.LSBZDW_DWMC;
            });
            companyHP.adplookupbox('textbox').off('keydown');
            return dwself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFsscAuditMemberSqlCondiRestFul", helpParam)
                .then(function(result) {
                    //设置核算组织帮助
                    var dataSource = dwself.cardInstance().dataSource.tables(0).rows(0);
                    var companyHelp = companyHP.adplookupbox('options').adp;
                    companyHelp.condition = "[" + Pub.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and " + result.data, "Express", " ", " ") + "]";
                })
                .fail(function(result) {
                    //$.messager.alert('提示', "核算组织帮助条件获取失败。", 'warning');
                });
        },
        /**
         * 获取第一个不违反功能冲突、有权限的成员单位
         */
        GetFirstAuditMemberCommon: function() {
            var dwself = this;
            //服务端：获取第一个不违反功能冲突、有权限的成员单位
            var params = ["", "0", "1", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curCompanyName, BIZOPID, gsp.rtf.context.get('UserID'), curYear, BIZOBJID, BIZOPID, MKID];
            return dwself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFirstAuditMemberCommon", params)
                .then(function(result) {
                    //获取到返回值
                    companyHP = $(companyHPid);
                    curCompanyCode = result.data; //return的值
                    curCompanyName = result.outParams; //ref或out的参数
                    if (!curCompanyCode && curCompanyName) {
                        $.messager.alert("提示", curCompanyName, "warning");
                        return $.Deferred().reject();
                    }
                    if (!curCompanyCode && !curCompanyName) {
                        return $.Deferred().reject();
                    }
                    var dataSource = dwself.cardInstance().dataSource.tables(0).rows(0);
                    //赋值给核算单位智能帮助
                    dataSource.setValue("XZDW", curCompanyCode);
                    companyHP.adplookupbox('setValue', curCompanyCode);
                    companyHP.adplookupbox('setText', curCompanyName);
                }).fail(function() {});
        },
        /**
         * 对公司的检查
         * @param  {string} companyCode - 公司编号
         */
        CompanyCheck: function(companyCode) {
            var dwself = this;
            var checkresult = dwself.CheckForm();
            if (!checkresult) {
                //curCompanyCode = '';
                //curCompanyName = '';
                // var dataSource = dwself.cardInstance().dataSource.tables(0).rows(0);
                //dataSource.setValue("XZDW", curCompanyCode);
                //$(companyHPid).adplookupbox('setValue', curCompanyCode);
                //$(companyHPid).adplookupbox('setText', curCompanyName);
                // return dwself.GetGDParams(curYear, curCompanyCode, curDate).then(function () {
                //     return $.Deferred().reject();
                // })
                return $.Deferred().reject();
            }
            return $.Deferred().resolve();
        },
        /**
         * 对当前功能的检查
         */
        CheckForm: function() {
            var title = FUNCNAME;
            if (curCompanyType === "2") {
                $.messager.alert(title, "该单位为法人单位，不能进行" + title, 'warning');
                return false;
            }
            if (njwc === "2") {
                $.messager.alert(title, "该单位本年度已经年结，不能进行" + title, 'warning');
                return false;
            }
            if (njwc === "3") {
                $.messager.alert(title, "该单位上年度没有年结，本年度不能进行" + title, 'warning');
                return false;
            }
            if (isInitEnd === "0") {
                $.messager.alert(title, "该单位系统初始化没有完成，不能进行" + title, 'warning');
                return false;
            }
            if (!curPeriod) {
                $.messager.alert(title, "编号为" + curCompanyCode + "的单位固定资产会计期间不存在！", 'warning');
                return false;
            }
            return true;
        },
        /**
         * 获得公司参数（异步）
         * @param  {String} year - 会计年度
         * @param  {String} companyCode - 公司编号
         * @param  {String} date - 业务日期
         */
        GetGDParams: function(year, companyCode, date) {
            var dwself = this;
            var params = [companyCode, year, date, "REDUCELIST"];
            return this.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", params)
                .then(function(result) {
                    if (result) {
                        var dicParams = result.data;
                        GDWebBizHandleConstants.GDLSGSCS[companyCode] = dicParams;
                        njwc = dicParams["GD_SFNJWC"];
                        curPeriod = dicParams["GD_KJQJ"];
                        isInitEnd = dicParams["GD_SFCSWC"];
                        noJtlc = dicParams["GD_NOJTZJ"];
                        authorityCondi = dicParams["GD_Authority"];
                        curCompanyType = dicParams.DW_GSLB;
                    }
                }).fail(function(result) {
                    //$.messager.alert('提示', "获取单位信息失败。", 'warning');
                    return;
                });;
        },
        /**
         * 功能冲突的检查(异步)
         * @param  {string} companyCode - 公司编号
         * @param  {string} funcID - 功能编号
         * @param  {string} funcName - 功能名称
         * @param  {string} curYear - 当前年度
         * @param  {string} compFlag - 电脑标志
         * @param  {string} userID - 用户ID
         * @param  {string} userName - 用户名称
         */
        CheckFunCt: function(companyCode, funcID, funcName, curYear, compFlag, userID, userName) {
            var dwself = this;
            //检查功能冲突：普通单位
            var conflictDs = "";
            var checkresult = "";
            var checkParam = [companyCode, funcID, curYear, compFlag, userID, conflictDs];
            return dwself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckFuncConfRefStr", checkParam)
                .then(function(result) {
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
                }).fail(function(result) {
                    $.messager.alert('提示', "功能冲突检查失败。", 'warning');
                });
        }
    }
}]);