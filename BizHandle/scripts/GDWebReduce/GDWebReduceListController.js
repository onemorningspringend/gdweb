gsp.module("gsp.app").controller("GDWebReduceListController", "ListController", ['BizHandlePub', function (Pub) {
    var ReduceList = $('#XDataGridReduce');
    var MKID = "GD"; //模块ID
    var BIZOBJID = ""; //业务对象组ID
    var BIZOPID = ""; //业务对象ID
    var FUNCID = ""; //功能ID
    var FUNCNAME = ""; //功能名称
    var curCompanyCode = ""; //单位编号
    var curCompanyName = ""; //单位名称
    var curCompanyType = ""; //公司类别，是否法人单位
    var curDate = ""; //8位日期
    var curYear = ""; //年度
    var curPeriod = ""; //期间
    var Jtzj = "0"; //是否计提折旧
    var jtzt = ''; //计提状态
    var isInitEnd = ''; //是否已初始完成
    var njwc = "0"; //是否年结完成
    var jeDecn = 2; //金额精度
    var slDecn = 0; //数量精度
    var isJoinZcgl = '0'; // 是否关联资产管理
    var isSecret = "0"; //是否军工保密版
    var isZdrDel = "0"; //只允许制单人删除单据
    var authorityCondi = ""; //权限条件
    var FirstJtThenBiz = false; //是否先计提折旧后做业务
    var isZDRSC = '';
    var noJtlc = ''; //不计提折旧流程控制
    var isHadBak = false; //是否存在备份的数据
    var zclbContJtJsOrder = ''; //是否由资产类别控制计提折旧顺序
    var dicParams = ''; //服务器端取回参数
    var firstload = false; //用来屏蔽第一次加载不触发的方法
    var lbbh = "%"; //资产类别编号
    var JsDefZc = "";//减少默认暂存


    return {
        /**
         * 表单加载方法
         */
        Formload: function () {
            var listself = this;
            $.loading();
            var params = parseUrlParams(window.location);
            BIZOBJID = params.bizObjectId;
            BIZOPID = params.bizOPId;
            FUNCID = params.funcid;
            if (FUNCID === "GDWEB102") {
                FUNCNAME = "资产减少";
            } else if (FUNCID === "GDWEB111") {
                FUNCNAME = "减少确认"
            }

            curDate = Pub.FormatDate8(gsp.rtf.context.get('BizDate'));
            curYear = gsp.rtf.context.get('BizDate').substring(0, 4);

            listself.SetFirstUI();
            return listself.GetFsscFilterCondi().then(function () {
                if (!curCompanyCode) {
                    return listself.GetFirstAuditMemberCommon().then(function () { //获取第一个公司             
                    }).then(function () {
                        return listself.GetGDParams(curYear, curCompanyCode, curDate); //获得公司参数
                    }).then(function () {
                        return listself.CompanyCheck(); //检查公司
                    });
                } else {
                    return $.Deferred().resolve();
                }
            }).then(function () { //获取并设置核算单位帮助条件
                listself.SetUI(); //设置界面
                listself.BindExitFunc();
                $.loaded();
                return listself.RefreshReduceList(); //获取列表加载过滤条件
            }).fail(function () {
                $.loaded();
            });
        },
        /**
         * 功能开始时初始界面
         */
        SetFirstUI: function () {
            var listself = this;
            if (FUNCID === 'GDWEB102') {
                $('#presetBar').buttongroup('hideButton', GDWebBizHandleConstants.ReduceListDZQRID);
                $('#presetBar').buttongroup('hideButton', GDWebBizHandleConstants.ReduceListPLQRID);
                $('#presetBar').buttongroup('hideButton', GDWebBizHandleConstants.ReduceListQXQRID, true);
            } else if (FUNCID === 'GDWEB111') {
                $('#presetBar').buttongroup('hideButton', GDWebBizHandleConstants.ReduceListCreateID);
                $('#presetBar').buttongroup('hideButton', GDWebBizHandleConstants.ReduceListEditID);
                $('#presetBar').buttongroup('hideButton', GDWebBizHandleConstants.ReduceListDeleteID);
                //$('#presetBar').buttongroup('hideButton', GDWebBizHandleConstants.ReduceListPLJSID, true);
            }
        },
        /**
         * 根据当前的参数构建需要传递的URL
         * @param  {String} CardID - 打开卡片的状态
         */
        MakeURL: function (state) {
            var listself = this;
            var URL = "";
            URL = "&KJQJ=" + curPeriod //会计期间
                +
                "&YEAR=" + curYear //会计年度
                +
                "&DATE=" + curDate //当前日期
                +
                "&COMPANYCODE=" + curCompanyCode //公司编号
                +
                "&OPTFLAG=" + state //当前状态
                +
                "&JEDECN=" + jeDecn //金额精度
                +
                "&SLDECN=" + slDecn //数量精度
                +
                "&JTZJ=" + Jtzj //计提折旧
                +
                "&ZCLBCONTJTJSORDER=" + zclbContJtJsOrder //是否由资产类别控制计提折旧顺序
                +
                "&FIRSTJTTHENBIZ=" + FirstJtThenBiz //是否先计提折旧后做业务
                +
                "&NOJTLC=" + noJtlc //不计提折旧流程控制
                +
                "&ISSECRET=" + isSecret //是否军工保密版
                +
                "&JSDEFZC" + JsDefZc; //减少默认暂存
            return URL;
        },
        /**
         * 查看资产减少卡片方法
         */
        ViewCard: function () {
            var listself = this;
            if (ReduceList.datagrid('getChecked').length === 0) {
                $.notify.info('请选择要查看的数据！');
                return false;
            } else if (ReduceList.datagrid('getChecked').length !== 1) {
                $.notify.info('请选择一行');
                return false;
            } else {
                var ZCID = ReduceList.datagrid('getChecked')[0]['GDJSZC_ID'];
            }
            listself.check('资产减少卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebReduce/7bd075b3-243a-4b39-8610-2f16ba442574/index.html?dataId=' + ZCID + listself.MakeURL("View"), ZCID, { "actionname": "ReduceCardFormload" });
        },
        /**
         * 新增资产减少卡片
         */
        CreateCard: function () {
            var listself = this;
            if (!curCompanyCode) {
                $.messager.alert("提示", "请选择单位！", "warning");
                return false;
            }
            if (listself.CheckBizValidator()) {
                var ZCID = 'ReduceCreate';
                listself.add('资产减少卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebReduce/7bd075b3-243a-4b39-8610-2f16ba442574/index.html?dataId=' + ZCID + listself.MakeURL("Create"), ZCID, { "actionname": "ReduceCardFormload" });
            }
        },
        /**
         * 编辑资产减少卡片
         */
        Editcard: function () {
            var listself = this;
            if (ReduceList.datagrid('getChecked').length === 0) {
                $.notify.info('请选择要编辑的数据！');
                return false;
            } else if (ReduceList.datagrid('getChecked').length !== 1) {
                $.notify.info('请选择一行');
                return false;
            } else {
                var ZCID = ReduceList.datagrid('getChecked')[0]['GDJSZC_ID'];
            }
            var row = ReduceList.datagrid('getChecked')[0];
            $.loading();
            return listself.CheckEditValidator(row).then(function () {
                var assetCode = row['GDJSZC_ZCID'] + '';
                //根据资产类别，判断资产的计提减少业务顺序
                if (zclbContJtJsOrder === "1") {
                    var params = [assetCode, Jtzj, curCompanyCode, curDate];
                    return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "AssetCanReduce", params)
                        .then(function (result) {
                            var checkResult = result.data;
                            if (checkResult) {
                                if (checkResult === "1") {
                                    $.messager.alert("提示", "该资产类别的资产计提折旧前，不允许进行资产减少！", "warning");
                                } else {
                                    $.messager.alert("提示", "该资产类别的资产计提折旧后，不允许进行资产减少！", "warning");
                                }
                                $.loaded();
                                return false;
                            } else {
                                $.loaded();
                                listself.edit('资产减少卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebReduce/7bd075b3-243a-4b39-8610-2f16ba442574/index.html?dataId=' + ZCID + listself.MakeURL('Edit'), "ReduceCreate", { "actionname": "ReduceCardFormload" });
                            }
                        });
                } else {
                    $.loaded();
                    listself.edit('资产减少卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebReduce/7bd075b3-243a-4b39-8610-2f16ba442574/index.html?dataId=' + ZCID + listself.MakeURL('Edit'), ZCID, { "actionname": "ReduceCardFormload" });
                }
            }).fail(function () {
                $.loaded();
            });
        },
        /**
         * 删除减少记录
         */
        DelReduce: function () {
            var listself = this;
            if (ReduceList.datagrid('getChecked').length === 0) {
                $.notify.info('请选择要删除的数据！');
                return false;
            }
            if (!listself.CheckBizValidator()) {
                return false;
            }
            return listself.blockConfirm('提示', "确定对勾选记录进行删除？")
                .then(function () {
                    var listInfo = '';
                    var deletelist = [];
                    if (ReduceList.datagrid('getChecked').length === 0) {
                        deletelist[0] = ReduceList.datagrid('getSelected');
                    } else {
                        deletelist = ReduceList.datagrid('getChecked');
                    }
                    params = [deletelist, gsp.rtf.context.get('UserName'), zclbContJtJsOrder, Jtzj * 1, curPeriod, jeDecn, isZDRSC, "0", "0", curCompanyCode, curDate];
                    return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "DeleteReduceData", params);
                }).then(function (result) {
                    return listself.RefreshReduceList().then(function () {
                        var msg = "删除完成！";
                        if (result.data.length > 0) {
                            msg += "下列资产不符合：<br>";
                            msg += result.data;
                        }
                        $.messager.alert("提示", msg, "warning");
                    });
                });
        },
        /**
         * 获取第一个不违反功能冲突、有权限的成员单位
         */
        GetFirstAuditMemberCommon: function () {
            var listself = this;

            //服务端：获取第一个不违反功能冲突、有权限的成员单位
            var params = ["", "0", "1", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curCompanyName, FUNCID, gsp.rtf.context.get('UserID'), curYear, BIZOBJID, BIZOPID, MKID];
            return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFirstAuditMemberCommon", params)
                .then(function (result) {
                    //获取到返回值
                    curCompanyCode = result.data; //return的值
                    curCompanyName = result.outParams; //ref或out的参数
                    if (!curCompanyCode && curCompanyName) {
                        $.messager.alert("提示", curCompanyName, "warning");
                        return $.Deferred().reject();
                    }
                    if (!curCompanyCode && !curCompanyName) {
                        return $.Deferred().reject();
                    }
                    //赋值给核算单位智能帮助
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setValue', curCompanyCode);
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setText', curCompanyName);
                }).fail(function () {
                    setTimeout(function () {
                        listself.close();
                    }, 2000);
                });
        },
        /**
         * 获取并设置核算单位帮助条件以及帮助后事件(异步)
         */
        GetFsscFilterCondi: function () {
            var listself = this;
            var helpParam = ["0", "0", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curYear, BIZOBJID, BIZOPID, MKID];
            return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFsscAuditMemberSqlCondiRestFul", helpParam)
                .then(function (result) {
                    //设置核算组织帮助
                    var companyHP = $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp);
                    var companyHelp = companyHP.adplookupbox('options').adp;
                    companyHelp.condition = "[" + Pub.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and " + result.data, "Express", " ", " ") + "]";
                    companyHP.off('OnDictEntryPicked.reduce').on('OnDictEntryPicked.reduce', function (e, rowData, opts) {
                        var row = rowData[0] || rowData;
                        var newCompanyCode = row.LSBZDW_DWBH;
                        var newCompanyName = row.LSBZDW_DWMC;
                        if (!newCompanyCode) {
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setValue', curCompanyCode);
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setText', curCompanyName);
                            return;
                        } else if (newCompanyCode === curCompanyCode) { //与原单位相同 退出
                            return;
                        } else {
                            $.loading();
                            //冲突检查
                            return listself.CheckFunCt(newCompanyCode, FUNCID, FUNCNAME, curYear, "1", gsp.rtf.context.get('UserID'), gsp.rtf.context.get('UserName'))
                                .then(function (result) {
                                    if (result) {
                                        //有冲突的 把单位帮助的数据转回
                                        $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setValue', curCompanyCode);
                                        $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setText', curCompanyName);
                                        $.loaded();
                                        $.messager.alert('提示', result, 'warning');
                                        return;
                                    } else {
                                        //获取公司参数
                                        return listself.GetGDParams(curYear, newCompanyCode, curDate).then(function () {
                                            //单位具体检查
                                            return listself.CompanyCheck(newCompanyCode);
                                        }).then(function () {
                                            //更新成新单位
                                            curCompanyCode = newCompanyCode;
                                            curCompanyName = newCompanyName;
                                            listself.SetUI();
                                            //更新功能记录的单位
                                            var uptParam = [gsp.rtf.context.get('UserID'), FUNCID, newCompanyCode, curYear];
                                            listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "UptFuncConflict", uptParam);
                                            //刷新绑定数据
                                            return listself.RefreshReduceList().then(function () {
                                                $.loaded();
                                            });
                                        });
                                    }
                                }).fail(function () {
                                    $.loaded();
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
         * 获得资产减少列表的过滤条件
         */
        GetReduceListFilterCondi: function () {
            var listself = this;
            //资产类别控制计提减少业务顺序参数
            var kjnd = curYear;
            var kjqj = curPeriod;
            var sql = '';
            if (zclbContJtJsOrder == "1") {
                if (Jtzj === "1") {
                    sql = " and exists(select 1 from GDZCZY" + kjnd + " where GDZCZY_ID = GDJSZC_ZCID and GDZCZY_LBBH in (select GDZCLB_LBBH from GDZCLB" + kjnd + " where GDZCLB_JTBEFOREJS = '1'))";
                } else {
                    sql = " and exists(select 1 from GDZCZY" + kjnd + " where GDZCZY_ID = GDJSZC_ZCID and GDZCZY_LBBH in (select GDZCLB_LBBH from GDZCLB" + kjnd + " where GDZCLB_JTBEFOREJS = '0'))";
                }
            }
            var condi = "'" + kjqj + "' and ((GDJSZC_CWQR = '1' and GDZCZY_ZZQJ = '" + kjnd + kjqj + "' and GDJSZC_ZCID=GDZCZY_ID)or(GDJSZC_CWQR <> '1' and (GDZCZY_ZZQJ = ' ' or GDZCZY_ZZQJ is Null))) and GDZCZY_DBBZ= '0'" + sql;
            condi += authorityCondi;
            condi += "AND GDJSZC_DWBH = '" + curCompanyCode + "' and (GDZCZY_CZBZ = '0' OR GDZCZY_CZBZ = '') and GDJSZC_IFBF <> '1'";
            var filter = "[" + Pub.ArrangeCondition("", "GDJSZC_KJQJ", " = ", condi, "Express", " ", " ") + "]";
            return filter;
        },
        /**
         * 获得公司参数（异步）
         * @param  {String} year - 会计年度
         * @param  {String} companyCode - 公司编号
         * @param  {String} date - 业务日期
         */
        GetGDParams: function (year, companyCode, date) {
            var listself = this;
            var params = [companyCode, year, date, "REDUCELIST"];
            return this.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", params)
                .then(function (result) {
                    if (result) {
                        var dicParams = result.data;
                        GDWebBizHandleConstants.GDLSGSCS[companyCode] = dicParams;
                        njwc = dicParams["GD_SFNJWC"];
                        jtzt = dicParams["GD_SFJTZJ"];
                        Jtzj = dicParams["GD_SFJTZJ"];
                        jeDecn = dicParams["GD_JEDECN"] * 1;
                        SlDecn = dicParams["GD_SLDECN"] * 1;
                        curPeriod = dicParams["GD_KJQJ"];
                        isInitEnd = dicParams["GD_SFCSWC"];
                        jtJs = dicParams["GD_JT_JS"] || "1";
                        if (jtJs === "1")
                            FirstJtThenBiz = true;
                        else
                            FirstJtThenBiz = false;
                        isSecret = dicParams['SYS_SecretEdition'];
                        isZDRSC = dicParams["GD_ZDRSC"];
                        isHadBak = (dicParams["GD_JSBAK"] === "1");
                        noJtlc = dicParams["GD_NOJTZJ"];
                        authorityCondi = dicParams["GD_Authority"];
                        curCompanyType = dicParams.DW_GSLB;
                        zclbContJtJsOrder = dicParams['GD_ZCLBCONTJTJSORDER'];
                        JsDefZc = dicParams["GD_JSDEFZC"];
                    }
                }).fail(function (result) {
                    $.messager.alert('提示', "获取单位信息失败。", 'warning');
                    return;
                });;
        },
        /**
         * 编辑前检查（异步）
         * @param  {object} row - 需要检查的数据行
         */
        CheckEditValidator: function (row) {
            var listself = this;
            var zcbh = row['GDJSZC_ZCBH'] + '';
            var bgxh = row['GDJSZC_BGXH'] * 1;
            var params = [curPeriod, zcbh, bgxh, curCompanyCode, curDate];
            return this.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckIsExistFollowReduce", params)
                .then(function (b) {
                    if (b.data) {
                        $.messager.alert('提示', "该资产本期间在此次减少业务后还进行了其它业务，请删除后续业务后再设置该减少记录。", 'warning');
                        return $.Deferred().reject();
                    }
                    if (row['GDJSZC_JSQSL'] * 1 === 0) {
                        $.messager.alert('提示', "该资产是旧系统的资产减少数据，无法修改，请删除后新增。", 'warning');
                        return $.Deferred().reject();
                    }
                    return $.Deferred().resolve();
                });
        },
        /**
         * 设置当前界面的精度、按钮显示等
         */
        SetUI: function () {
            var listself = this;
            Pub.SetColumnDecn('XDataGridReduce', 'GDJSZC_JSSL', SlDecn);
            Pub.SetColumnDecn('XDataGridReduce', 'GDJSZC_JSYZ', jeDecn);
            Pub.SetColumnDecn('XDataGridReduce', 'GDJSZC_JSZJ', jeDecn);

            // if (!isHadBak) {
            //     $('#presetBar').buttongroup('disable', GDWebBizHandleConstants.ReduceListBakID);
            // } else {
            //     $('#presetBar').buttongroup('enable', GDWebBizHandleConstants.ReduceListBakID);
            // }
            $('#Label1').text(curYear + '年' + curPeriod + '月');
            //绑定双击事件
            ReduceList.datagrid({
                onDblClickRow: function (rowIndex, rowData) {
                    ReduceList.datagrid('selectRow', rowIndex);
                    var CardID = rowData['GDJSZC_ID'];
                    listself.ViewCard(CardID);
                }
            });
        },
        /**
         * 设置合计行的显示文字（暂时停用）
         */
        SetFootRow: function () {
            var row = ReduceList.datagrid('getFooterRows');
            row[0]['GDJSZC_ZCID_GDZCZY_ZCMC'] = '当前期间：' + curYear + '年' + curPeriod + '月';
            ReduceList.datagrid('reloadFooter');
        },
        /**
         * 关于 计提折旧 和 做业务 先后顺序的检查
         */
        CheckBizValidator: function () {
            if (noJtlc !== "1" && zclbContJtJsOrder === "0") {
                // if (FirstJtThenBiz && Jtzj !== "1") {
                //     $.messager.alert("提示", '请先计提折旧。', "warning");
                //     return false;
                // }
                if (!FirstJtThenBiz && Jtzj === "1") {
                    $.messager.alert("提示", '已计提折旧，不允许做资产减少业务。', "warning");
                    return false;
                }
            }
            return true;
        },
        /**
         * 对公司的检查
         * @param  {string} companyCode - 公司编号
         */
        CompanyCheck: function (companyCode) {
            var listself = this;
            var checkresult = listself.CheckForm();
            if (!checkresult) {
                // if (!companyCode) {
                //     curCompanyCode = '';
                //     curCompanyName = '';
                // }
                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setValue', curCompanyCode);
                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setText', curCompanyName);
                return listself.GetGDParams(curYear, curCompanyCode, curDate).then(function () {
                    return $.Deferred().reject();
                })
            }
            return $.Deferred().resolve();
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
        CheckFunCt: function (companyCode, funcID, funcName, curYear, compFlag, userID, userName) {
            var listself = this;
            //检查功能冲突：普通单位
            var conflictDs = "";
            var checkresult = "";
            var checkParam = [companyCode, funcID, curYear, compFlag, userID, conflictDs];
            return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckFuncConfRefStr", checkParam)
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
        /**
         * 对当前功能的检查
         */
        CheckForm: function () {
            var title = "资产减少";
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
         * 获取过滤条件并刷新当前减少列表(异步)
         */
        RefreshReduceList: function () {
            var listself = this;
            var order = "#GDJSZC_ZCBH# asc ";
            return listself.load(listself.GetReduceListFilterCondi(), order);
        },
        /**
         * 判断必填项
         * @param  {object} 数据行 - 功能名称
         */
        CheckRequiredXm: function (rows) {
            if (rows.length <= 0)
                return false;

            var msg = "";
            var error = "";
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var zcbh = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
                var qxbh = row[GDWebBizHandleConstants.XPATH_GDJSZC_QXBH];
                var jszt = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZTBH];
                if (!qxbh || !qxbh.trim()) {
                    error += "编号为【" + zcbh + "】的记录没有填写减少原因。<br>";
                    continue;
                }
            }
            if (error) {
                msg += "下列资产不符合：<br>";
                msg += error;
                $.messager.alert("提示", msg, "warning");
                return false;
            }
            return true;
        },
        /**
         * 财务单张确认
         */
        FIConfig: function () {
            var listself = this;
            if (!listself.CheckBizValidator()) {
                return false;
            }
            if (ReduceList.datagrid('getChecked').length === 0) {
                $.notify.info('请选择要确认的数据！');
                return false;
            } else if (ReduceList.datagrid('getChecked').length !== 1) {
                $.notify.info('请选择一行');
                return false;
            } else {
                var ZCID = ReduceList.datagrid('getChecked')[0]['GDJSZC_ID'];
            }
            var row = ReduceList.datagrid('getChecked')[0];
            var cwqr = row[GDWebBizHandleConstants.XPATH_GDJSZC_CWQR];
            if (cwqr === "1") {
                $.messager.alert("提示", "财务已经确认！", "warning");
                return false;
            }
            var rowID = row[GDWebBizHandleConstants.XPATH_GDJSZC_ID];
            var vsZCBH = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
            var jsbgxh = row[GDWebBizHandleConstants.XPATH_GDJSZC_BGXH];
            var assetCode = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID];
            //根据资产类别判断资产的计提减少业务顺序
            $.loading();
            if (zclbContJtJsOrder === "1") {
                var params = [assetCode, Jtzj, curCompanyCode, curDate];
                return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "AssetCanReduce", params)
                    .then(function (result) {
                        var checkResult = result.data;
                        if (checkResult === 0) {
                            $.messager.alert("提示", "该资产类别的资产计提折旧后，不允许进行资产减少！", "warning");
                            $.loaded();
                            return $.Deferred().reject();
                        } else {
                            var params = [curCompanyCode, vsZCBH, curPeriod, jsbgxh, "JS"];
                            return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckOtherBusiness", params);
                        }
                    }).then(function (result) {
                        var msg = result.data;
                        if (msg) {
                            $.messager.alert("提示", "编号为【" + vsZCBH + "】的资产" + msg, "warning");
                            return $.Deferred().reject();
                        }
                        $.loaded();
                        listself.edit('减少确认卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebReduce/7bd075b3-243a-4b39-8610-2f16ba442574/index.html?dataId=' + ZCID + listself.MakeURL('Config'), "Config", { "actionname": "ReduceCardFormload" });
                    }).fail(function () {
                        $.loaded();
                    });
            } else {
                var params = [curCompanyCode, vsZCBH, curPeriod, jsbgxn, "JS"];
                return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckOtherBusiness", params)
                    .then(function (result) {
                        var msg = result.data;
                        if (msg) {
                            $.messager.alert("提示", "编号为【" + vsZCBH + "】的资产" + msg, "warning");
                            return false;
                        }
                        $.loaded();
                        listself.edit('减少确认卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebReduce/7bd075b3-243a-4b39-8610-2f16ba442574/index.html?dataId=' + ZCID + listself.MakeURL('Config'), "Config", { "actionname": "ReduceCardFormload" });
                    });
            }
        },
        /**
         * 财务批量确认
         */
        BatchConfig: function () {
            var listself = this;
            if (!listself.CheckBizValidator()) {
                return false;
            }
            if (ReduceList.datagrid('getChecked').length === 0) {
                $.notify.info('请选择要确认的数据！');
                return false;
            } else {
                var rows = ReduceList.datagrid('getChecked');
            }
            if (!listself.CheckRequiredXm(rows))
                return;
            return listself.blockConfirm("提示", "确定对选择记录进行减少确认？")
                .then(function () {
                    var resultMgr = "";
                    $.loading();
                    return listself.BatchConfigAssetNew(rows);
                }).then(function (resultMgr) {
                    if (resultMgr) {
                        $.loaded();
                        $.messager.alert("提示", resultMgr, "warning");
                        return listself.RefreshReduceList();
                    }
                }).fail(function () {
                    $.loaded();
                });
        },
        /**
         * 批量确认核心方法（异步）
         */
        BatchConfigAssetNew: function (rows) {
            var listself = this;
            var reduceIdStr = "";//选中的减少ID
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var cwqr = row[GDWebBizHandleConstants.XPATH_GDJSZC_CWQR];
                if (cwqr === "1")
                    continue;
                reduceIdStr += row[GDWebBizHandleConstants.XPATH_GDJSZC_ID] + "~";
                reduceIdStr += row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID] + ",";
            }
            reduceIdStr = reduceIdStr.substring(0, reduceIdStr.length - 1);
            if (!reduceIdStr) {
                $.messager.alert("提示", "请勾选未进行财务确认的资产！", "warning");
                return $.Deferred().reject();
            }

            var params = [reduceIdStr, curCompanyCode, curYear, curPeriod, zclbContJtJsOrder, Jtzj, curDate];
            return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "BatchConfig", params)
                .then(function (result) {
                    return result.data;
                });
        },
        /**
         * 财务取消确认
         */
        FICancelConfig: function () {
            var listself = this;
            if (!listself.CheckBizValidator()) {
                return false;
            }
            if (ReduceList.datagrid('getChecked').length === 0) {
                $.notify.info('请选择要取消确认的数据！');
                return false;
            } else {
                var rows = ReduceList.datagrid('getChecked');
            }
            if (!listself.CheckRequiredXm(rows))
                return;
            return listself.blockConfirm("提示", "确定对选择记录进行取消确认？")
                .then(function () {
                    var resultMgr = "";
                    $.loading();
                    return listself.CancelConfigAssetNew(rows);
                }).then(function (resultMgr) {
                    if (resultMgr) {
                        $.loaded();
                        $.messager.alert("提示", resultMgr, "warning");
                        return listself.RefreshReduceList();
                    }
                }).fail(function () {
                    $.loaded();
                });
        },
        /**
         * 取消确认核心方法（异步）
         */
        CancelConfigAssetNew: function (rows) {
            var listself = this;
            var reduceIdStr = "";//选中的减少ID
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var cwqr = row[GDWebBizHandleConstants.XPATH_GDJSZC_CWQR];
                if (cwqr === "0")
                    continue;
                reduceIdStr += row[GDWebBizHandleConstants.XPATH_GDJSZC_ID] + "~";
                reduceIdStr += row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID] + ",";
            }
            reduceIdStr = reduceIdStr.substring(0, reduceIdStr.length - 1);
            if (!reduceIdStr) {
                $.messager.alert("提示", "请勾选已进行财务确认的资产！", "warning");
                return $.Deferred().reject();
            }

            var params = [reduceIdStr, curCompanyCode, curYear, curPeriod, zclbContJtJsOrder, Jtzj, curDate];
            return listself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CancelConfig", params)
                .then(function (result) {
                    return result.data;
                });
        },
        /**
         * 恢复备份
         */
        Resume: function () {
            var listself = this;
            if (listself.CheckBizValidator()) {
                gsp.application.applicationContext.setParam("KJQJ", curPeriod);
                gsp.application.applicationContext.setParam("COMPANYCODE", curCompanyCode);
                gsp.application.applicationContext.setParam("YEAR", curYear);
                gsp.application.applicationContext.setParam("DATE", curDate);
                gsp.application.applicationContext.setParam("JEDECN", jeDecn);
                gsp.application.applicationContext.setParam("SLDECN", slDecn);
                gsp.application.applicationContext.setParam("JSDEFZC", JsDefZc);
                gsp.application.applicationContext.setParam("ZCLBCONTJTJSORDER", zclbContJtJsOrder);
                gsp.application.applicationContext.setParam("JTZJ", Jtzj);
                var RecoverDialog = $("#IFrameRecoverDialog");
                var firstopen = false;
                if (!RecoverDialog.data('dialog')) {
                    firstopen = true;
                    RecoverDialog = RecoverDialog.dialog({
                        modal: true,
                        width: 900,
                        height: 500,
                        title: "恢复备份",
                        onClose: function () {
                            listself.RefreshReduceList();
                        }
                    });
                }
                RecoverDialog.dialog("show");
                if (!firstopen) {
                    listself.view.eventAgent(['FrmRecoverLoad'], 'IFrameRecover', true)();
                }
                //listself.add('恢复备份', '/cwbase/web/FI/GD/BizHandle/runtime/a2ebd154-f1f2-4fd5-8111-dc96b42a9e32/index.html?' + listself.MakeURL("Resume"), "Resume", { "actionname": "ResumeFormLoad" });
            }
        },
        /**
         * 绑定退出事件，删除cookie
         */
        BindExitFunc: function () {
            var cardself = this;
            $(document).on('frameclose', function () {
                document.cookie = '';
            });
        }
    }
}]);