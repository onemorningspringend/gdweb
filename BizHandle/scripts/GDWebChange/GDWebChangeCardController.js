gsp.module("gsp.app").controller("GDWebChangeCardController", "CardController", ['BizHandlePub', function(Pub) {
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
    var assetCode = '';
    var assetID = '';
    var AssetList = $('#' + GDWebBizHandleConstants.ChangeZCListID);
    var BGXMList = $('#' + GDWebBizHandleConstants.ChangeBGXMListID);
    var ZCBGXM = {};
    var AssetGroup = {};
    var AssetSight = {};
    var currentRow = "";
    var initialActionID = '';
    var jtywFlag = "";
    var GdJtBgywOrdKey = "";
    var ds = {
        GDBGD: [], //变更单表
        GDBGZC: [], //变更资产表
        GDBGZCXM: [], //变更资产项目值表
        GDBGXMJG: [] //变更项目条目表
    };
    var dsBackups = {}; //数据表备份，为取消使用
    var ZCBGXMBackups = {}; //数据表备份，为取消使用
    var smartHelpInfo = {};
    var lasttype = ""; //上一个变更类型
    var isSave = false; //是否点击了保存按钮
    var state = ""; //当前状态，"1":非查看，"0":查看
    var close = false;
    var sfNjwc = "";
    var sfCswc = "";
    var DWXZDialog = $('#IFrameDWXZDialog');
    var editflag = false;
    var Spflag = "0"; //审批标志 解决按钮问题
    var emptydata = []; //空白数据 供取消使用
    var curUserID = ""; //用户ID


    return {
        Frm_Load: function() {
            var cardself = this;
            var param = parseUrlParams(window.location); //从URL解析出的参数
            fsscflag = param["FSSCFLAG"] || '0';
            Operationfssc = param["INITIALACTIONID"];
            gsp.application.applicationContext.setParam('OPERATION', Operationfssc);
            if (fsscflag === "1" && Operationfssc === "Create") {
                if (!DWXZDialog.data('dialog')) {
                    DWXZDialog = DWXZDialog.dialog({
                        modal: true,
                        width: 350,
                        height: 240,
                        onOpen: function() {},
                        onClose: function() {
                            curCompanyCode = gsp.application.applicationContext.getParam('CURCOMPANYCODE');
                            curDate = gsp.application.applicationContext.getParam('CURDATE');
                            curYear = curDate.substring(0, 4);
                            return cardself.NormalFrm_Load();
                        }
                    });
                }
                DWXZDialog.dialog('show');
            } else {
                return cardself.NormalFrm_Load();
            }
        },
        NormalFrm_Load: function() {
            var cardself = this;
            $.loading();
            curUserID = gsp.rtf.context.get('UserID'); //获取用户ID
            URLparams = parseUrlParams(window.location);
            if (fsscflag !== "1") {
                curYear = URLparams["YEAR"] //= "2007";//666
                curCompanyCode = URLparams['COMPANYCODE'] //= "0101";
                curPeriod = URLparams['KJQJ'] //= "11";
                curDate = URLparams['DATE'] //= "20071015";
                curYearPeriod = curYear + curPeriod;
            }
            if (Operationfssc !== "Create" && fsscflag === "1") {
                curCompanyCode = URLparams['COMPANYCODE'];
                curDate = Pub.FormatDate8(URLparams['DATE']);
                curYear = URLparams["YEAR"] || curDate.substring(0, 4);
            }
            return cardself.GetGDParams(curYear, curCompanyCode, curDate).then(function() {
                cardself.SetParams();
                if (changeOrderNO) {
                    return cardself.SetChangeCard();
                } else {
                    return $.Deferred().resolve();
                }
            }).then(function() {
                cardself.SetUI();
                cardself.ChangeState();
                cardself.BindExitFunc();
                $.extend(true, dsBackups, ds); //给ds做备份 供取消使用
                $.extend(true, ZCBGXMBackups, ZCBGXM);
                $.loaded();
                window.parent.$.loaded();
            }).fail(function() {
                if (fsscflag !== "1") {
                    cardself.close();
                }
            });
        },
        /**
         * 绑定退出的事件
         */
        BindExitFunc: function() {
            var cardself = this;
            setTimeout(function() {
                $(document).off('framerefresh').on('framerefresh', function() {
                    return cardself.FuncExitCheck("refresh");
                });
                $(document).off('frameclose').on('frameclose', function() {
                    return cardself.FuncExitCheck("close");
                });
            }, 1000);
        },
        /**
         * 改变起始状态
         */
        ChangeState: function() {
            var cardself = this;
            switch (initialActionID) {
                case "Create":
                    cardself.context.view().transitInvoke('Create', [{
                        target: 'GDWebChangeCardController',
                        methodName: 'ChangeCreate',
                        params: []
                    }]);
                    break;
                case "Edit":
                    state = "1";
                    cardself.BindChangeData()
                    return cardself.ChangeEdit()
                        .then(function() {
                            cardself.context.view().transitInvoke('Edit', [{
                                target: 'GDWebChangeCardController',
                                methodName: 'BindChangeData',
                                params: []
                            }]);
                        });
                    break;
                case "View":
                    state = "0";
                    cardself.HideButton();
                    cardself.BindChangeData();
                    break;
                case "BackupView":
                    break;
                case "QueryView":
                    break;
                default:
                    $.messager.alert("提示", "无法获取初始动作标志！", "warning");
                    cardself.close();
            }
        },
        /**
         * 新增方法
         */
        ChangeCreate: function() {
            var cardself = this;
            state = "1";
            $.loading();
            editflag = false;
            return function() {
                if (cardself.cardInstance().dataSource && cardself.cardInstance().dataSource.tables(0) && cardself.cardInstance().dataSource.tables(0).rows(0)) {
                    return cardself.CheckIfCanMaintainChange();
                } else {
                    return $.Deferred().resolve();
                }
            }().then(function() {
                return cardself.create();
            }).then(function() {
                ZCBGXM = {};
                ds = {
                    GDBGD: [], //变更单表
                    GDBGZC: [], //变更资产表
                    GDBGZCXM: [], //变更资产项目值表
                    GDBGXMJG: [] //变更项目条目表
                };
                AssetList.datagrid({ data: [] });
                BGXMList.datagrid({ data: [] });
                AssetGroup = {};
                AssetSight = {};
                cardself.gridHelper.bindClickCellEvent(cardself.view, BGXMList); //绑定单击事件
                ds.GDBGD = cardself.cardInstance().dataSource.tables(0).peek();
                emptydata = $.extend(true, {}, { GDBGJL: ds.GDBGD });
                //是否默认勾选
                return cardself.AddDefaultValue();
            }).fail(function() {
                $.loaded();
                state = "0";
                cardself.cancelAction();
            });
        },
        /**
         * 新增时添加默认值
         */
        AddDefaultValue: function() {
            var cardself = this;
            if (bgZdgxCs === "1") {
                $("#" + GDWebBizHandleConstants.ChangeCheckID).attr("checked", true);
            } else {
                $("#" + GDWebBizHandleConstants.ChangeCheckID).attr("checked", false);
            }
            var params = [curYear, curCompanyCode];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetNextChangeOrderNO", params)
                .then(function(result) {
                    var dataSourceRow = cardself.cardInstance().dataSource.tables(0).rows(0);
                    var changerow = $.extend({}, dataSourceRow.peek());
                    changerow[GDWebBizHandleConstants.XPATH_GDBGJL_DWBH] = curCompanyCode;
                    changerow[GDWebBizHandleConstants.XPATH_GDBGJL_BGDH] = result.data;
                    if (curDate.substring(4, 6) === curPeriod) {
                        changerow[GDWebBizHandleConstants.XPATH_GDBGJL_BGRQ] = curDate;
                    } else {
                        changerow[GDWebBizHandleConstants.XPATH_GDBGJL_BGRQ] = curYearPeriod + "01";
                    }
                    changerow[GDWebBizHandleConstants.XPATH_GDBGJL_BGR] = gsp.rtf.context.get('UserName');
                    dataSourceRow.setValues(changerow);
                });
        },
        /**
         * 编辑变更单
         */
        ChangeEdit: function() {
            var cardself = this;
            state = "1";
            if (!cardself.cardInstance().dataSource || !cardself.cardInstance().dataSource.tables(0) || !cardself.cardInstance().dataSource.tables(0).rows(0)) {
                $.messager.alert("提示", "不存在可编辑的数据！", "warning");
                return $.Deferred().reject();
            }
            $.loading();
            return cardself.CheckIfCanMaintainChange().then(function() {
                $.loaded();
                if (fsscflag === "1") {
                    editflag = true;
                }
                if (fsscflag === "1" && gsp.application.applicationContext.getParam("firstopen") !== "0") {
                    gsp.application.applicationContext.setParam('EditFlag', "1");
                    if (!DWXZDialog.data('dialog')) {
                        DWXZDialog = DWXZDialog.dialog({
                            modal: true,
                            width: 290,
                            height: 200,
                            onOpen: function() {},
                            onClose: function() {
                                if (!$('#' + GDWebBizHandleConstants.ChangeBGLXID).adplookupbox('textbox').val()) {
                                    return cardself.ChangeCreate();
                                }
                            }
                        });
                    }
                    DWXZDialog.dialog('show');
                } else {
                    if (!$('#' + GDWebBizHandleConstants.ChangeBGLXID).adplookupbox('textbox').val()) {
                        return cardself.ChangeCreate();
                    }
                }
            }).fail(function() {
                $.loaded();
                cardself.cancelAction();
                state = "0";
            });
        },
        /**
         * 取消变更单
         */
        ChangeCancel: function() {
            var cardself = this;
            // console.log(ds);
            // console.log(dsBackups);
            // console.log(ZCBGXM);
            // console.log(ZCBGXMBackups);
            // console.log(_.isEqual(ds, dsBackups));
            // console.log(_.isEqual(ZCBGXM, ZCBGXMBackups));
            // for (var key in ds['GDBGD'][0]) {
            //     if (ds['GDBGD'][0][key] === null) {
            //         ds['GDBGD'][0][key] = "";
            //     }
            //     if (ds['GDBGD'][0][key] !== dsBackups['GDBGD'][0][key]) {
            //         debugger
            //     }
            // }
            // return cardself.cancelAction();
            if (initialActionID === "Create" && !isSave && fsscflag !== "1") {
                return cardself.close().fail(function() {
                    return cardself.cancelAction();
                });
            }
            var data = cardself.cardInstance().dataSource.tables(0).rows(0);
            if (!data) {
                return cardself.create().then(function() {
                    ZCBGXM = {};
                    ds = {
                        GDBGD: [], //变更单表
                        GDBGZC: [], //变更资产表
                        GDBGZCXM: [], //变更资产项目值表
                        GDBGXMJG: [] //变更项目条目表
                    };
                    AssetList.datagrid({ data: [] });
                    BGXMList.datagrid({ data: [] });
                    return cardself.AddDefaultValue();
                });
            } else {
                ds = $.extend(true, {}, dsBackups); //将备份恢复过来
                var dss = {};
                if (ds["GDBGD"].length == "0") {
                    dss = emptydata;
                } else {
                    dss["GDBGJL"] = ds["GDBGD"];
                }
                cardself.cardInstance().updateData(dss);
                ZCBGXM = $.extend(true, {}, ZCBGXMBackups);
                AssetList.datagrid('loadData', Pub.FilterData(ds.GDBGZC, GDWebBizHandleConstants.XPATH_GDBGJL_BJZT, "D", false));
                AssetList.datagrid('selectRow', 0);
                return $.Deferred().resolve();
            }
        },
        /**
         * 保存变更单
         */
        ChangeSave: function() {
            var cardself = this;
            isSave = true;
            state = "0";
            var data = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            $.loading();
            return cardself.TableEndEditing(BGXMList).then(function() {
                ds["GDBGD"][0] = data;
                if (!cardself.HasChanges()) {
                    $.messager.alert("提示", "当前变更单数据未发生改动，不需保存！", "warning");
                    return $.Deferred().reject();
                }
                if (!cardself.Validate()) {
                    return $.Deferred().reject();
                }
                cardself.SetDsValue();
                if ($("#" + GDWebBizHandleConstants.ChangeCheckID).attr("checked") === "checked") {
                    isReCalcCard = true;
                    return cardself.blockConfirm('资产变更', '确定重算变更单中的资产的月折旧额吗？');
                } else {
                    isReCalcCard = false;
                    return $.Deferred().resolve();
                }
            }).then(function() {
                var changeOrderNO = data[GDWebBizHandleConstants.XPATH_GDBGJL_BGDH];
                var params = [curYear, curCompanyCode, changeOrderNO, ds, curPeriod, changeNetSalvageValueBase, isReCalcCard, curDate];
                var b = params[3];
                return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "SaveChangeReCalc", params);
            }).then(function(result) {
                var resultds = result.outParams;
                $.extend(true, ds, resultds);
                AssetList.datagrid('loadData', Pub.FilterData(ds.GDBGZC, GDWebBizHandleConstants.XPATH_GDBGJL_BJZT, "D", false));
                cardself.SetZCBGXM(ds);
                AssetList.datagrid("selectRow", 0);
                $.extend(true, dsBackups, ds); //给ds做备份 供取消使用
                $.extend(true, ZCBGXMBackups, ZCBGXM);
                $.loaded();
                cardself.notifyGlobalParent();
                //cardself.refreshParentFunc();
                $.notify.success('保存成功！');
            }).fail(function() {
                cardself.cancelAction();
                $.loaded();
                state = "1";
            });
            showAssetCount = 0;
            // this.SetChangeItemToStructure();

        },
        /**
         * 共享中心模式下的保存方法
         */
        ChangeSaveforFSSC: function() {
            var cardself = this;
            isSave = true;
            state = "0";
            var data = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            $.loading();
            return cardself.TableEndEditing(BGXMList).then(function() {
                ds["GDBGD"][0] = data;
                if (!cardself.HasChanges()) {
                    $.messager.alert("提示", "当前变更单数据未发生改动，不需保存！", "warning");
                    return $.Deferred().reject();
                }
                if (!cardself.Validate()) {
                    return $.Deferred().reject();
                }
                cardself.SetDsValue();
                if ($("#" + GDWebBizHandleConstants.ChangeCheckID).attr("checked") === "checked") {
                    isReCalcCard = true;
                    return cardself.blockConfirm('资产变更', '确定重算变更单中的资产的月折旧额吗？');
                } else {
                    isReCalcCard = false;
                    return $.Deferred().resolve();
                }
            }).then(function() {
                ds["GDBGD"][0][GDWebBizHandleConstants.XPATH_GDBGJL_CSYZJ] = isReCalcCard ? "1" : "0";
                var changeOrderNO = data[GDWebBizHandleConstants.XPATH_GDBGJL_BGDH];
                var dataParams = {};
                dataParams["curYear"] = curYear;
                dataParams["curCompanyCode"] = curCompanyCode;
                dataParams["changeOrderNO"] = changeOrderNO;
                dataParams["curPeriod"] = curPeriod;
                dataParams["changeNetSalvageValueBase"] = changeNetSalvageValueBase;
                dataParams["isReCalcCard"] = isReCalcCard;
                dataParams["curDate"] = curDate;
                dataParams["JeDecn"] = currJeDecn;
                dataParams["SlDecn"] = currSlDecn;
                dataParams["ZjlDecn"] = currZjlDecn;
                dataParams["curUserID"] = curUserID;
                ds["dataParams"] = [];
                ds["dataParams"][0] = dataParams;
                cardself.SetFSSCParams(ds);
                return $.Deferred().resolve(ds);
            }).fail(function() {
                cardself.cancelAction();
                $.loaded();
            });
        },
        /**
         * 共享中心下设置需要传的值
         */
        SetFSSCParams: function(dsData) {
            var cardself = this;
            var GDBGD = dsData.GDBGD[0];
            var GDBGZC = dsData.GDBGZC[0];
            var FSSCParams = {};
            FSSCParams["BILLID"] = GDBGD[GDWebBizHandleConstants.XPATH_GDBGJL_BGDH] +
                "~" + curCompanyCode + "~" +
                GDBGZC[GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH] + "~" + curYear;
            FSSCParams["GDJSZC_DWBH"] = curCompanyCode;
            FSSCParams["GDJSZC_ZDR"] = GDBGD[GDWebBizHandleConstants.XPATH_GDBGJL_BGR];
            FSSCParams["GDJSZC_JSRQ"] = GDBGD[GDWebBizHandleConstants.XPATH_GDBGJL_BGRQ];
            FSSCParams["GDJSZC_ZY"] = GDBGD[GDWebBizHandleConstants.XPATH_GDBGJL_DESC];
            dsData["FSSCParams"] = [];
            dsData["FSSCParams"][0] = FSSCParams;
        },
        /**
         * 保存后事件（只用于FSSC）
         */
        SaveAfter: function() {
            var cardself = this;
            return cardself.SetChangeCard().then(function() {
                $.extend(true, dsBackups, ds); //给ds做备份 供取消使用
                $.extend(true, ZCBGXMBackups, ZCBGXM);
                cardself.BindChangeData();
                AssetList.datagrid("selectRow", 0);
                $.loaded();
            });
        },
        /**
         * 把ZCBGXM的值更新给DS(可能存在性能问题)
         */
        SetDsValue: function() {
            var cardself = this;
            for (var i = 0; i < ds.GDBGZCXM.length; i++) {
                var zcid = ds.GDBGZCXM[i][GDWebBizHandleConstants.XPATH_GDBGJL_ZCID];
                for (var j = 0; j < ZCBGXM[zcid].length; j++) {
                    if (ds.GDBGZCXM[i][GDWebBizHandleConstants.XPATH_GDBGJL_ID] === ZCBGXM[zcid][j][GDWebBizHandleConstants.XPATH_GDBGJL_ID]) {
                        if (ZCBGXM[zcid][j][GDWebBizHandleConstants.XPATH_GDXMZD_XMLX] !== "N") {
                            ds.GDBGZCXM[i][GDWebBizHandleConstants.XPATH_GDBGJL_BZMC] = ZCBGXM[zcid][j][GDWebBizHandleConstants.XPATH_GDBGJL_BZMC];
                            ds.GDBGZCXM[i][GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = ZCBGXM[zcid][j][GDWebBizHandleConstants.XPATH_GDBGJL_BZ];
                        } else {
                            ds.GDBGZCXM[i][GDWebBizHandleConstants.XPATH_GDBGJL_BZMC] = Pub.formatNum(ZCBGXM[zcid][j][GDWebBizHandleConstants.XPATH_GDBGJL_BZMC], 8);
                            ds.GDBGZCXM[i][GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = Pub.formatNum(ZCBGXM[zcid][j][GDWebBizHandleConstants.XPATH_GDBGJL_BZ], 8);
                            ds.GDBGZCXM[i][GDWebBizHandleConstants.XPATH_GDBGJL_BDZ] = Pub.formatNum(ZCBGXM[zcid][j][GDWebBizHandleConstants.XPATH_GDBGJL_BDZ], 8);
                        }
                    }
                }
            }
            ds.GDBGD[0] = {};
            $.extend(true, ds.GDBGD[0], cardself.cardInstance().dataSource.tables(0).rows(0).peek());
        },
        /**
         * 大型豪华保存前检查
         */
        Validate: function() {
            var cardself = this;
            var sbMessage = "";
            var dataSource = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var changeOrderNO = dataSource[GDWebBizHandleConstants.XPATH_GDBGJL_BGDH].trim();
            if (!changeOrderNO)
                sbMessage += "变更单号不能为空，请修改！<br>";
            var changeTypeName = dataSource[GDWebBizHandleConstants.XPATH_GDBGJL_BGLX].trim();
            if (!changeTypeName)
                sbMessage += "变更类型不能为空，请修改！<br>";
            else if (BGXMList.datagrid('getRows').length <= 0)
                sbMessage += "变更类型没有相应变更项目,请检查！<br>";
            var changeDate = dataSource[GDWebBizHandleConstants.XPATH_GDBGJL_BGRQ].trim();
            if (!changeDate)
                sbMessage += "变更日期不能为空，请修改！<br>";
            else if (Pub.FormatDate8(changeDate).substring(0, 4) !== curYear)
                sbMessage += "变更日期不在当前年度内，请修改！<br>";
            else if (Pub.FormatDate8(changeDate).substring(4, 6) !== curPeriod)
                sbMessage += "变更日期不在当前期间内，请修改！<br>";
            var changePeople = dataSource[GDWebBizHandleConstants.XPATH_GDBGJL_BGR].trim();
            if (!changePeople)
                sbMessage += "变更人不能为空，请修改！<br>";
            var description = dataSource[GDWebBizHandleConstants.XPATH_GDBGJL_DESC].trim();
            if (Pub.CheckTextLength(description) > 225) {
                sbMessage += "摘要长度超长，请修改！<br>";
            }
            if (AssetList.datagrid("getRows").length <= 0)
                sbMessage += "当前不存在变更资产记录，请检查！<br>";

            var ifRequired = '';
            var controlMode = '';
            var originalText = '';
            var latestText = '';
            var originalChangeText = '';
            var originalValue = 0;
            var latestValue = 0;
            var originalChangeValue = 0;
            var itemType = '';
            var assetCode = '';
            var changeItem = '';

            var assetEditState = '';
            var delAssetCodeStr = '';
            var NoDelAssetChangeItem = [];
            for (var i = 0; i < ds.GDBGZC.length; i++) {
                var assetRow = ds.GDBGZC[i];
                assetEditState = assetRow[GDWebBizHandleConstants.XPATH_GDBGJL_BJZT];
                if (assetEditState === "E") {
                    assetRow[GDWebBizHandleConstants.XPATH_GDBGJL_BJZT] = "N";
                }
                if (assetEditState !== "D") {
                    NoDelAssetChangeItem.push(assetRow);
                }
            }

            for (var i = 0; i < NoDelAssetChangeItem.length; i++) {
                var itemRow = NoDelAssetChangeItem[i];
                var assetCode = itemRow[GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH];
                var assetID = itemRow[GDWebBizHandleConstants.XPATH_GDBGJL_ZCID];
                for (var j = 0; j < ZCBGXM[assetID].length; j++) {
                    var structureDr = ZCBGXM[assetID][j];
                    changeItem = structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXM].trim();
                    ifRequired = structureDr[GDWebBizHandleConstants.XPATH_GDXMZD_SFBT].trim();
                    itemType = structureDr[GDWebBizHandleConstants.XPATH_GDXMZD_XMLX].trim();
                    if ((ifRequired === "1") && (!structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BZ].trim()))
                        sbMessage += assetCode + " 资产的 " + structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXMMC] + " 信息为空，请修改！<br>";
                    controlMode = structureDr[GDWebBizHandleConstants.XPATH_GDBGXM_KZFS].trim();
                    originalText = structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_YZ].trim();
                    latestText = structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BZ].trim();
                    originalChangeText = structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_YSBZ].trim();
                    switch (controlMode) {
                        case "1": //必须变
                            if (itemType !== "N") {
                                if (originalText === latestText)
                                    sbMessage += assetCode + " 资产的 " + structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXMMC] + " 信息必须变更，请修改！<br>";
                                else if (latestText !== originalChangeText) {
                                    if (!cardself.UpdateAssetEditState(assetCode, "E"))
                                        return false;
                                }

                            } else {
                                originalValue = originalText * 1;
                                latestValue = latestText * 1;
                                originalChangeValue = originalChangeText * 1;
                                if (originalValue === latestValue)
                                    sbMessage += assetCode + " 资产的 " + structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXMMC] + " 信息必须变更，请修改！<br>";
                                else if ((changeItem.indexOf("GDZCZY_SJ") === -1) && latestValue < 0)
                                    sbMessage += assetCode + " 资产的 " + structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXMMC] + " 信息不能为负数，请修改！<br>";
                                else if (latestValue !== originalChangeValue) {
                                    if (!cardself.UpdateAssetEditState(assetCode, "E"))
                                        return false;
                                }
                            }
                            break;
                        case "2": //可以变
                            if (itemType !== "N") {
                                if (latestText !== originalChangeText) {
                                    if (!cardself.UpdateAssetEditState(assetCode, "E"))
                                        return false;
                                }
                            } else {
                                originalValue = originalText * 1;
                                latestValue = latestText * 1;
                                originalChangeValue = originalChangeText * 1;
                                if ((changeItem.indexOf("GDZCZY_SJ") === -1) && latestValue < 0)
                                    sbMessage += assetCode + " 资产的 " + structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXMMC] + " 信息不能为负数，请修改！<br>";
                                else if (latestValue !== originalChangeValue) {
                                    if (!cardself.UpdateAssetEditState(assetCode, "E"))
                                        return false;
                                }
                            }
                            break;
                        case "0": //不允许变
                        default:
                            if (itemType !== "N") {
                                if (originalText !== latestText)
                                    sbMessage += assetCode + " 资产的 " + structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXMMC] + " 信息不允许变更，请修改！<br>";
                            } else {
                                originalValue = originalText * 1;
                                latestValue = latestText * 1;
                                if (originalValue !== latestValue)
                                    sbMessage += assetCode + " 资产的 " + structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXMMC] + " 信息不允许变更，请修改！<br>";
                                if (changeItem.indexOf("GDZCZY_SJ") === -1 && latestValue < 0)
                                    sbMessage += assetCode + " 资产的 " + structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXMMC] + " 信息不能为负数，请修改！<br>";
                            }
                            break;
                    }
                }
            }
            if (sbMessage) {
                $.messager.alert("提示", sbMessage.trim().substring(0, sbMessage.length - 4), "warning");
                return false;
            } else {
                return true;
            }
        },
        /**
         * 功能刷新和退出时的检查 1:刷新 0：退出
         * @param {*string} assetCode - 项目对应的资产编号
         */
        FuncExitCheck: function(flag) {
            var cardself = this;
            if (close || state === "0") {
                return true;
            }
            cardself.TableEndEditing(BGXMList).then(function() {
                if (cardself.HasChanges(true) && state === "1" && !close) {
                    return Pub.ThreeButtonConfirm("提示", "数据已修改，是否保存？").then(function(result) {
                        if (result === "1") {
                            cardself.context.view().transitInvoke('Cancel', [{
                                target: 'GDWebChangeCardController',
                                methodName: 'ChangeSave',
                                params: []
                            }]);
                        } else {
                            if (flag === "refresh") {
                                close = true;
                                return window.location.reload();
                            } else {
                                close = true;
                                return gsp.rtf.func.close(cardself.context.getParam(ctrlLang.funcIdK));
                            }
                        }
                    });
                } else {
                    if (flag === "refresh") {
                        close = true;
                        return window.location.reload();
                    } else {
                        close = true;
                        return gsp.rtf.func.close(cardself.context.getParam(ctrlLang.funcIdK));
                    }
                }
            });
            return false;
        },
        /**
         * 检查是否修改过
         * @param {*bool} flag - true为深度检查
         */
        HasChanges: function(flag) {
            var cardself = this;
            //帮助清空的时候会自动赋值为null,此处赋为空
            for (var key in ds['GDBGD'][0]) {
                if (ds['GDBGD'][0][key] === null) {
                    ds['GDBGD'][0][key] = "";
                }
            }
            if (ds['GDBGD'][0][GDWebBizHandleConstants.XPATH_GDBGJL_BGXH]) {
                ds['GDBGD'][0][GDWebBizHandleConstants.XPATH_GDBGJL_BGXH] = ds['GDBGD'][0][GDWebBizHandleConstants.XPATH_GDBGJL_BGXH];
            }
            if (flag) {
                if (_.isEqual(ds, dsBackups) && _.isEqual(ZCBGXM, ZCBGXMBackups)) {
                    return false;
                }
            }
            if (ds['GDBGD'].length > 0 && ZCBGXM !== {} && _.isEqual(ds, dsBackups) && _.isEqual(ZCBGXM, ZCBGXMBackups)) {
                return false;
            }
            return true;
        },
        /**
         * 检查是否可以新增资产
         */
        CheckIfCanMaintainChangeAsset: function() {
            var cardself = this;
            var bglx = cardself.cardInstance().dataSource.tables(0).rows(0).peek()[GDWebBizHandleConstants.XPATH_GDBGJL_BGLX];
            var changeTypeName = (bglx + '').trim();
            if (!bglx || !changeTypeName) {
                $.messager.alert("提示", "请先选择变更类型！", "warning");
                return false;
            }
            return true;
        },
        /**
         * 检查是否允许做变更
         */
        CheckIfCanMaintainChange: function() {
            var cardself = this;
            if (cardself.cardInstance().dataSource) {
                var dataSourceRow = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
                if (fsscflag !== "1" && dataSourceRow["GDBGJL_FSSCFLAG"] === "1") {
                    $.messager.alert("提示", "该资产是共享中心生成的，不允许操作！", "warning");
                    return $.Deferred().reject();
                }
                if (isNojtlc !== "1") {
                    if (GdJtBgywOrdKey === "1") {
                        var currChangeTypeClass = dataSourceRow[GDWebBizHandleConstants.XPATH_GDBGJL_BGLX].trim();
                        if (!currChangeTypeClass) {
                            $.messager.alert("提示", "请先选择变更类型！", "warning");
                            return $.Deferred().reject();
                        }
                        var params = [curYear, currChangeTypeClass];
                        return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetChangeTypeInfo", params)
                            .then(function(result) {
                                if (result.data === "1") {
                                    if (ifJtzj === "1") {
                                        $.messager.alert("提示", "已计提折旧不允许再维护变更业务", "warning");
                                        return $.Deferred().reject();
                                    }
                                } else {
                                    // if (ifJtzj === "0") {
                                    //     $.messager.alert("提示", "请先计提折旧再维护变更业务", "warning");
                                    //     return $.Deferred().reject();
                                    // }
                                }
                            });
                    } else {
                        if (jtywFlag === "1" && ifJtzj === "0") {
                            // $.messager.alert("提示", "请先计提折旧再维护变更业务", "warning");
                            // return $.Deferred().reject();
                        } else if (jtywFlag === "0" && ifJtzj === "1") {
                            $.messager.alert("提示", "已计提折旧不允许再维护变更业务", "warning");
                            return $.Deferred().reject();
                        }
                    }
                }
            }
            return $.Deferred().resolve();
        },
        /**
         * 更新资产编辑信息
         * @param {*string} assetCode - 项目对应的资产编号
         * @param {*string} editState - 需要更改的编辑状态
         */
        UpdateAssetEditState: function(assetCode, editState) {
            var cardself = this;
            for (var i = 0; i < ds.GDBGZC.length; i++) {
                var assetRow = ds.GDBGZC[i];
                if (!assetRow) {
                    $.messager.alert("提示", "更改 " + assetCode + " 资产的编辑状态时无法获取该资产的信息！", "warning");
                    return false;
                } else if (assetRow[GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH] === assetCode && assetRow[GDWebBizHandleConstants.XPATH_GDBGJL_BJZT] === "N") {
                    assetRow[GDWebBizHandleConstants.XPATH_GDBGJL_BJZT] = editState;
                }
            }
            return true;
        },
        /**
         * 新增资产
         */
        AddAsset: function() {
            var cardself = this;
            if (!cardself.CheckIfCanMaintainChangeAsset()) {
                return false;
            }
            var zcnum = ds.GDBGZC.length;
            if (fsscflag === "1" && zcnum === 1) {
                $.messager.alert("提示", "不允许变更多个资产！", "warning");
                return false;
            }
            return cardself.CheckIfCanMaintainChange().then(function() {

                var AssetHelp = $('#' + GDWebBizHandleConstants.AddAssetHelp).adplookupbox('options').adp;
                var condition = " '" + curCompanyCode + "' and GDZCZY_CWQR = '1' and (GDZCZY_ZZQJ = ' ' or GDZCZY_ZZQJ is null)" +
                    " and not exists (select 1 from GDJSZC" + curYear + " where GDZCZY_ZCBH=GDJSZC_ZCBH and GDJSZC_DWBH = GDZCZY_DWBH  and GDJSZC_KJQJ='" + curPeriod + "' and GDJSZC_IFBF='0')" +
                    " and not exists (select 1 from GDZCDB" + curYear + " where GDZCZY_ZCBH=GDZCDB_DCZCBH and GDZCDB_DCDWBH=GDZCZY_DWBH and GDZCDB_KJQJ='" + curPeriod + "') " + authorityWhere + " ";
                condition += cardself.GetAssetOtherCondition();
                var filter = "[" + Pub.ArrangeCondition("", "GDZCZY_DWBH", " = ", condition, "Express", " ", " ") + "]";
                AssetHelp.condition = filter; //过滤条件
                AssetHelp.oldCondition = '';
                $('#' + GDWebBizHandleConstants.AddAssetHelp).next().find(".icon-lookup").click(); //调用按钮的click方法
            });
        },
        /**
         * 删除资产
         */
        RemoveAsset: function() {
            var cardself = this;
            if (!cardself.CheckIfCanMaintainChangeAsset()) {
                return false;
            }
            if (fsscflag === "1" && (initialActionID === "Edit" || editflag === true)) {
                $.messager.alert("提示", "编辑状态禁止删除资产,请删除变更单！", "warning");
                return false;
            }
            if (BGXMList.datagrid("getRows").length <= 0) {
                $.messager.alert("提示", "当前不存在变更资产记录", "warning");
                return false;
            }
            var currAssetDr = AssetList.datagrid("getSelected");
            var index = AssetList.datagrid("getRowIndex", currAssetDr);
            var AssetRownum = AssetList.datagrid("getRows").length;
            var emptyList = false;
            if (index === AssetRownum - 1 && AssetRownum !== 1) {
                index = index - 1;
            } else if (AssetRownum === 1) {
                emptyList = true
            }
            if (!currAssetDr) {
                $.messager.alert("提示", "无法获得变更资产列表中当前记录信息", "warning");
                return false;
            }
            var assetEditState = currAssetDr[GDWebBizHandleConstants.XPATH_GDBGJL_BJZT].trim();
            if (assetEditState === "A") {
                var assetCode = currAssetDr[GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH];
                var assetID = currAssetDr[GDWebBizHandleConstants.XPATH_GDBGJL_ZCID];
                for (var i = 0; i < ds.GDBGZC.length; i++) {
                    if (assetCode === ds.GDBGZC[i][GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH]) {
                        ds.GDBGZC.splice(i, 1); //remove方法无效，自己写的删除方法
                        i--;
                    }
                }
                for (var i = 0; i < ds.GDBGZCXM.length; i++) {
                    if (assetCode === ds.GDBGZCXM[i][GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH]) {
                        ds.GDBGZCXM.splice(i, 1); //remove方法无效，自己写的删除方法
                        i--;
                    }
                }
                delete(ZCBGXM[assetID]);
                AssetList.datagrid('loadData', Pub.FilterData(ds.GDBGZC, GDWebBizHandleConstants.XPATH_GDBGJL_BJZT, "D", false));
                if (emptyList) {
                    BGXMList.datagrid("loadData", ds.GDBGXMJG);
                    BGXMList.datagrid('options').readonly = true;
                } else {
                    AssetList.datagrid('selectRow', index);
                }
            } else {
                return cardself.blockConfirm('询问', '删除当前变更资产后就不能在当前变更单上对该资产进行重新变更。<br>确定要删除吗？')
                    .then(function() {
                        currAssetDr[GDWebBizHandleConstants.XPATH_GDBGJL_BJZT] = "D";
                        AssetList.datagrid('loadData', Pub.FilterData(ds.GDBGZC, GDWebBizHandleConstants.XPATH_GDBGJL_BJZT, "D", false));
                        if (emptyList) {
                            BGXMList.datagrid("loadData", ds.GDBGXMJG);
                            BGXMList.datagrid('options').readonly = true;
                        } else {
                            AssetList.datagrid('selectRow', index);
                        }
                    });
            }
        },
        /**
         * 获得变更信息并绑定（异步）
         */
        SetChangeCard: function() {
            var cardself = this;
            ds = {
                GDBGD: [], //变更单表
                GDBGZC: [], //变更资产表
                GDBGZCXM: [], //变更资产项目值表
                GDBGXMJG: [] //变更项目条目表
            };
            if (cardself.cardInstance().dataSource) {
                changeOrderNO = cardself.cardInstance().dataSource.tables(0).rows(0).peek()[GDWebBizHandleConstants.XPATH_GDBGJL_BGDH];
            } else {
                changeOrderNO = URLparams["BGDH"];
            }
            var params = [curYear, curCompanyCode, changeOrderNO, fsscflag, curDate];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetChangeInfo", params)
                .then(function(result) {
                    ds = result.data;
                    if (!cardself.cardInstance().schema && cardself.cardInstance().formID) {
                        cardself.cardInstance().loadSchema(cardself.cardInstance().formID);
                    }
                    var dss = {}; //新建一个对象以保证表名相同
                    dss.GDBGJL = ds.GDBGD;
                    cardself.cardInstance().dataSource = gsp.dataSource(dss, {
                        name: cardself.cardInstance().dataSourceName,
                        schema: cardself.cardInstance().schema
                    });

                    cardself.context.view().bindData(cardself.cardInstance().dataSource);
                    cardself.SetZCBGXM(ds);
                    return cardself.GetXMSmartInfo(ds.GDBGXMJG);
                }).fail(function() {
                    if (fsscflag !== 1) {
                        cardself.close();
                    }
                });
        },
        /**
         * 给smartHelpInfo赋值
         * @param  {Object} XMList - 取回的项目结果集
         */
        GetXMSmartInfo: function(XMList) {
            var cardself = this;
            var params = [XMList, curYear, curCompanyCode, curDate];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetCzzd", params)
                .then(function(result) {
                    smartHelpInfo = result.data;
                });
        },
        /**
         * 给ZCBGXM赋值
         * @param  {Object} dataset - 取回的变更结果集
         */
        SetZCBGXM: function(dataset) {
            var cardself = this;
            var ZC = dataset.GDBGZC;
            var XM = dataset.GDBGXMJG;
            var BD = dataset.GDBGZCXM;
            AssetGroup = ds.GDBGZC;
            if (!XM) {
                XM = ds.GDBGXMJG;
            }
            for (var i = 0; i < ZC.length; i++) {
                if (ZC[i][GDWebBizHandleConstants.XPATH_GDBGJL_BJZT] === "D") {
                    continue;
                }
                for (var j = 0; j < XM.length; j++) {
                    var temp = $.extend({}, XM[j], true);
                    for (var k = 0; k < BD.length; k++) {
                        if (BD[k]['GDBGJL_ZCID'] === ZC[i]['GDBGJL_ZCID'] && BD[k]['GDBGJL_BGXM'] === XM[j]['GDBGJL_BGXM']) {
                            if (!ZCBGXM[ZC[i]['GDBGJL_ZCID']]) {
                                ZCBGXM[ZC[i]['GDBGJL_ZCID']] = [];
                            }
                            ZCBGXM[ZC[i]['GDBGJL_ZCID']][j] = $.extend(temp, BD[k], true);
                            if (ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDXMZD_XMLX"] === "D") {
                                ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_BZMC"] = Pub.FormatDate10(ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_BZMC"]);
                                ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_YZMC"] = Pub.FormatDate10(ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_YZMC"]);
                            } else if (ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDXMZD_XMLX"] === "N") {
                                var decn = ZCBGXM[ZC[i]['GDBGJL_ZCID']][j][GDWebBizHandleConstants.XPATH_GDXMZD_DECN] * 1;
                                ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_BZMC"] = gc.accounting.formatMoney(ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_BZMC"], '', decn, '');
                                ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_BZ"] = gc.accounting.formatMoney(ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_BZ"], '', decn, '');
                                ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_YZMC"] = gc.accounting.formatMoney(ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_YZMC"], '', decn, '');
                                ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_YZ"] = gc.accounting.formatMoney(ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_YZ"], '', decn, '');
                                ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_BDZ"] = gc.accounting.formatMoney(ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_BDZ"], '', decn, '');
                                //ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_YSBZ"] = gc.accounting.formatMoney(ZCBGXM[ZC[i]['GDBGJL_ZCID']][j]["GDBGJL_YSBZ"], '', decn, '');
                            }
                            break;
                        };
                    }
                }
            }
        },
        /**
         * 设置属性值
         */
        SetParams: function() {
            var cardself = this;
            currJeDecn = dicParams["GD_JEDECN"] * 1;
            currSlDecn = dicParams["GD_SLDECN"] * 1;
            currBlDecn = dicParams["GD_BLDECN"] * 1;
            currZjlDecn = dicParams["GD_ZJLDECN"] * 1;
            isNojtlc = dicParams["GD_NOJTZJ"];
            bgZdgxCs = dicParams["GD_BGZDGXCSYZJE"];
            jtywFlag = dicParams["GD_JT_BG"];
            GdJtBgywOrdKey = dicParams["GD_JT_BG_TYPE"];
            ifJtzj = dicParams["GD_SFJTZJ"]
            authorityWhere = dicParams['GD_Authority'];
            changeOrderNO = URLparams['BGDH'] //= "00000013";//666
            Spflag = URLparams["SPFLAG"] || "0";
            assetCode = URLparams["ZCBH"];
            assetID = URLparams["ZCID"];
            changeNetSalvageValueBase = URLparams["CHANGENETSALVAGEVALUEBASE"] || gsp.application.applicationContext.getParam('changeNetSalvageValueBase', changeNetSalvageValueBase);
            initialActionID = URLparams["INITIALACTIONID"]; //= "Edit";
            if (dicParams["GD_SFNJWC"])
                sfNjwc = dicParams["GD_SFNJWC"];
            if (dicParams["GD_SFCSWC"])
                sfCswc = dicParams["GD_SFCSWC"];
            if (dicParams["GD_KJQJ"])
                curPeriod = dicParams["GD_KJQJ"];
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
            curYearPeriod = curYear + curPeriod;
            if (fsscflag === "1") {
                GDWebBizHandleConstants.AddAssetHelp = "XSmartDictLookup_AddAssetFSSC";
            }
        },
        /**
         * 获得公司参数（异步）
         * @param  {String} year - 会计年度
         * @param  {String} companyCode - 公司编号
         * @param  {String} date - 业务日期
         */
        GetGDParams: function(year, companyCode, date) {
            var cardself = this;
            var params = [companyCode, year, date, "CHANGECARD"];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", params)
                .then(function(result) {
                    if (result) {
                        dicParams = result.data;
                    }
                    var params = [companyCode, year, date, "CHANGELIST"];
                    if (fsscflag === "1") {
                        return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", params);
                    } else {
                        return $.Deferred().resolve();
                    }
                }).then(function(result) {
                    if (result) {
                        dicParams = $.extend({}, result.data, dicParams);
                    }
                });
        },
        /**
         * 设置界面显示
         */
        SetUI: function() {
            var cardself = this;
            cardself.SetTextColor();
            cardself.SetColumns();
            if (isNojtlc === "1") {
                $('#' + GDWebBizHandleConstants.ChangeCheckID).attr("disabled", true);
            }
            $(".numberbox").find(".textbox-text").css("text-align", "right");
            if (fsscflag === "1") {
                $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeCreateButtonID);
                $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeEditButtonID);
                $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeCancelButtonID);
                $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeSaveButtonID);
                $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeExitButtonID);
                if (initialActionID === "Create") {
                    parent.$('#BarPubBill').buttongroup('disable', 'd858c873-f520-42af-baab-b32ec75076f3');
                }
                //if (Spflag === "1") {
                // parent.$('#BarPubBill').buttongroup('hideButton', '5d9a83be-aa53-4433-af6c-a26b0260dbbd');
                // parent.$('#BarPubBill').buttongroup('hideButton', '9fd8efe6-e7ce-43f0-ac1c-7770a4181788');
                // parent.$('#BarPubBill').buttongroup('hideButton', '05cf7259-b88b-4859-82ca-e8da98b2df81');
                // parent.$('#BarPubBill').buttongroup('hideButton', 'e12bf832-aa32-4e50-9ab5-d2a4537eae59');
                // parent.$('#BarPubBill').buttongroup('hideButton', 'c0af96a7-c73b-4578-b73b-afcce1876af1');
                // parent.$('#BarPubBill').buttongroup('hideButton', '5b85ded0-e509-48d7-b6a2-947fe152ec10');
                // parent.$('#BarPubBill').buttongroup('hideButton', '4f8dc3b5-7f82-49f7-ad4f-42f3f7c82358', true);
                //}
            }
            cardself.SetXMEditor();
            cardself.SetChangeHelp();
        },
        /**
         * 设置变更单帮助的过滤条件
         */
        SetChangeHelp: function() {
            var cardself = this;
            var BGRHelp = $('#' + GDWebBizHandleConstants.ChangeBGRID).adplookupbox('options').adp; //变更人帮助
            var SHRHelp = $('#' + GDWebBizHandleConstants.ChangeSHRID).adplookupbox('options').adp; //审核人帮助
            var FZRHelp = $('#' + GDWebBizHandleConstants.ChangeFZRID).adplookupbox('options').adp; //负责人帮助
            var BGLXHelp = $('#' + GDWebBizHandleConstants.ChangeBGLXID).adplookupbox('options').adp; //变更类型帮助
            var filter = "[" + Pub.ArrangeCondition("", "LSZGZD_DWBH", " = ", curCompanyCode, "String", " ", " ") + "]";
            var bmfilter = "[" + Pub.ArrangeCondition("", "LSBMZD_DWBH", " = ", curCompanyCode, "String", " ", " ") + "]";
            var bglxfilter = "[" + Pub.ArrangeCondition("", "GDBGLX_TYBZ", " = ", "0", "String", " ", " ") + "]";
            BGRHelp.condition = SHRHelp.condition = FZRHelp.condition = filter;
            SHRHelp.navcondition = FZRHelp.navcondition = bmfilter;
            BGLXHelp.condition = bglxfilter;
            cardself.SetAddAssetHelp(); //设置新增资产帮助
            return cardself.SetBGLXHelp();
        },
        /**
         * 设置变更类型帮助
         */
        SetBGLXHelp: function() {
            var cardself = this;
            var BGLXHelp = $('#' + GDWebBizHandleConstants.ChangeBGLXID);
            BGLXHelp.on('OnDictEntryPicking', function(e, rowData, opts) {
                var BGDDataSource = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
                lasttype = BGDDataSource['GDBGJL_BGLX'];
            });
            BGLXHelp.on('OnDictEntryPicked', function(e, rowData, opts) {
                var row = rowData[0] || rowData;
                var changeType = row['GDBGLX_LXBH'];
                if (changeType !== lasttype && changeType) {
                    $.loading();
                    var params = [curYear, curCompanyCode, changeType];
                    return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetChangeItemStructure", params)
                        .then(function(result) {
                            ZCBGXM = {};
                            ds.GDBGZC = [];
                            ds.GDBGZCXM = [];
                            ds.GDBGXMJG = result.data['GDBGXMJG'];
                            AssetGroup = {};
                            AssetSight = {};
                            AssetList.datagrid({ data: [] });
                            BGXMList.datagrid("loadData", ds['GDBGXMJG']);
                            BGXMList.datagrid('options').readonly = true;
                            return cardself.GetXMSmartInfo(ds.GDBGXMJG);
                        }).then(function() {
                            $.loaded();
                        });
                }
            });
        },
        /**
         * 设置新增资产帮助
         */
        SetAddAssetHelp: function() {
            var cardself = this;
            var AssetHelp = $('#' + GDWebBizHandleConstants.AddAssetHelp);
            AssetHelp.on('OnDictEntryPicked', function(e, rowData, opts) {
                $.loading();
                var data = rowData;
                var assetCodes = "'";
                for (var i = 0; i < data.length; i++) {
                    assetCodes += data[i]["GDZCZY_ZCBH"] + "','";
                }
                assetCodes = assetCodes.trim().substring(0, assetCodes.length - 2);
                var BGJL = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
                var currChangeTypeClass = BGJL[GDWebBizHandleConstants.XPATH_GDBGJL_BGLX_GDBGLX_LBBH].trim();
                var existAsset = '';
                for (var i = 0; i < AssetGroup.length; i++) {
                    existAsset += AssetGroup[i][GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH] + ";";
                }
                existAsset = existAsset.trim().substring(0, existAsset.length - 1);
                $("#XSmartDictLookup_AddAsset").next().find(".panel-tool-close").click(); //清空一下帮助框，避免自动选择的问题
                return cardself.AddNewChangeAssetInfo(assetCodes, currChangeTypeClass, existAsset, "");
            });
        },
        /**
         * 添加新的资产信息
         */
        AddNewChangeAssetInfo: function(assetCodesOrCondi, currChangeTypeClass, existAsset, customCondition) {
            var cardself = this;
            var BGJL = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var params = [
                curYear,
                curCompanyCode,
                BGJL[GDWebBizHandleConstants.XPATH_GDBGJL_BGDH],
                BGJL[GDWebBizHandleConstants.XPATH_GDBGJL_BGLX],
                curPeriod,
                assetCodesOrCondi,
                currChangeTypeClass,
                existAsset,
                customCondition,
                curDate
            ];
            $.loading();
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetNewChangeAssetInfo", params)
                .then(function(result) {
                    var dsGDBGZC = result.data;
                    var dtGDBGZC = dsGDBGZC["GDBGZC"];
                    var length = AssetList.datagrid("getRows").length;
                    ds["GDBGZC"] = ds["GDBGZC"].concat(dtGDBGZC);
                    ds['GDBGZCXM'] = ds['GDBGZCXM'].concat(dsGDBGZC["GDBGZCXM"]);
                    cardself.SetZCBGXM(dsGDBGZC);
                    AssetList.datagrid('loadData', Pub.FilterData(ds.GDBGZC, GDWebBizHandleConstants.XPATH_GDBGJL_BJZT, "D", false));
                    AssetList.datagrid("selectRow", length);
                    BGXMList.datagrid('options').readonly = false;
                    $.loaded();
                });
        },
        /**
         * 获得资产其他条件
         */
        GetAssetOtherCondition: function() {
            var cardself = this;
            var condition = '';
            var BGJL = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var currChangeTypeClass = BGJL[GDWebBizHandleConstants.XPATH_GDBGJL_BGLX_GDBGLX_LBBH].trim();
            if (!(currChangeTypeClass === "%")) {
                condition += " and GDZCZY_LBBH='" + currChangeTypeClass + "'";
            }
            var existAsset = '';
            for (var i = 0; i < AssetGroup.length; i++) {
                var dr = AssetGroup[i]
                existAsset += dr[GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH] + "','";
            }
            existAsset = existAsset.trim().substring(0, existAsset.length - 3);
            if (existAsset) {
                condition += " and GDZCZY_ZCBH not in ('" + existAsset + "')";
            }
            return condition;
        },
        /**
         * 设置项目编辑控件
         */
        SetXMEditor: function() {
            var cardself = this;
            BGXMList.on('beforeEditCell', function(event, data) {
                var field = data["field"];
                var rowIndex = data["rowIndex"];
                if (BGXMList.datagrid('options').readonly) {
                    return false;
                }
                var changeItemStructureDr = $(this).datagrid("getRows")[rowIndex];
                var type = changeItemStructureDr[GDWebBizHandleConstants.XPATH_GDXMZD_XMLX];
                var assetCode = changeItemStructureDr[GDWebBizHandleConstants.XPATH_GDBGJL_ZCID];
                if (!assetCode) {
                    return false;
                }
                if (field === GDWebBizHandleConstants.XPATH_GDBGJL_BDZ && type !== "N") {
                    return false;
                }
                cardself.SetParamValueEdit(changeItemStructureDr, field);
            });
            BGXMList.datagrid("options").onBeginEdit = function(index, row) {
                var editors = BGXMList.datagrid('getEditors', index);
                var changeItemStructureDr = $(this).datagrid("getRows")[index];
                var length = changeItemStructureDr[GDWebBizHandleConstants.XPATH_GDXMZD_LENG] * 1;
                if (editors.length) {
                    var editor = editors[0];
                    var index = index;
                    var field = editor.field;
                    var nowValue = editor.oldHtml;
                    setTimeout(function() {
                        if (nowValue && editor.type === "adplookupbox") {
                            editor.target.next().children().val(nowValue); //解决点一下值就消失的问题
                        }
                        if (editor.type !== "my97datebox") {
                            $(editor.target).bind('keyup', function(e) {
                                var input = $(this).val();
                                if (input.length > length)
                                    $(this).val(input.substring(0, 4));
                            });
                        }
                        if (editor.type === "checkbox") {
                            editor.target.parent().css("text-align", "center");
                            if (editor.oldHtml === "1") {
                                BGXMList.prev().find("[type='checkbox']").attr("checked", true);
                            }
                        }
                    });
                }
            };
            BGXMList.datagrid("options").onEndEdit = function(rowIndex, rowData, changes) {
                var XMLX = rowData[GDWebBizHandleConstants.XPATH_GDXMZD_XMLX]; //项目类型
                var changeItem = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BGXM];
                var BDZ = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BDZ];
                var BZMC = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC];
                var YZMC = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_YZMC];
                var decn = rowData[GDWebBizHandleConstants.XPATH_GDXMZD_DECN] * 1;
                var assetCode = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_ZCBH];
                var assetID = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_ZCID];
                var ifchange = changes.hasOwnProperty("GDBGJL_BZMC"); //值是否改变

                switch (XMLX) {
                    case "B":
                        if ($(this).prev().find("[type='checkbox']").attr("checked") === "checked") {
                            rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC] = "1";
                        } else {
                            rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC] = "0";
                        }
                        rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC];
                        break;
                    case "N":
                        if (changes[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC]) {
                            BDZ = Pub.Calculate(BZMC, YZMC, "-");
                        } else if (changes[GDWebBizHandleConstants.XPATH_GDBGJL_BDZ]) {
                            BZMC = Pub.Calculate(YZMC, BDZ, "+");
                        }
                        rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BDZ] = gc.accounting.formatMoney(BDZ, '', decn, '');
                        rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC] = gc.accounting.formatMoney(BZMC, '', decn, '');
                        rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC];
                        break;
                    case "C": //char
                        var ifCompare = rowData[GDWebBizHandleConstants.XPATH_GDXMZD_IFDZ];
                        var ifReference = rowData[GDWebBizHandleConstants.XPATH_GDXMZD_IFCZ].trim();
                        if (!(ifCompare === "1") && !(ifReference === "1")) {
                            rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC];
                        } else if (!rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC].trim()) {
                            rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = '';
                        }
                        break;
                    case "D":
                        date = BZMC;
                        if (!BZMC) {
                            rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = "";
                        } else {
                            rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = Pub.FormatDate8(date);
                        }
                        break;
                    default:
                        rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC];
                        break;
                }
                var currAssetDr = AssetList.datagrid("getSelected");
                if (!currAssetDr) {
                    $.messager.alert("提示", "无法获得资产信息！", "warning");
                    return cardself.EditFail(rowData);
                }
                var assetZJYF = 0;
                assetZJYF = currAssetDr["GDZCZY_ZJYF"];
                if ((assetZJYF + '').indexOf(".") !== -1) {
                    $.messager.alert("提示", "资产的已提折旧月份[" + assetZJYF + "]不符，应是正整数，请重新导入。", "warning");
                    return cardself.EditFail(rowData);
                }
                var needCalNetSalvageValue = false;
                var latestValue = '';
                var latestName = '';
                switch (changeItem) {
                    case "GDZCZY_SYNX": //变更使用年限
                        //使用时间
                        var nx = Math.floor(rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] * 1);
                        var yf = (rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] * 1 - nx) * 100;
                        var useMonth = nx * 12 + yf;
                        if (useMonth < assetZJYF) {
                            $.messager.alert("提示", assetCode + " 资产变更后的(使用年限×12)小于已提折旧月份！", "warning");
                            return cardself.EditFail(rowData);
                        } else if (rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] * 1 - nx > 0.11) {
                            $.messager.alert("提示", assetCode + " 资产变更后使用年限中月份数据(小数点后的数据)不能大于11！", "warning");
                            return cardself.EditFail(rowData);
                        } else {
                            cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_SYSJ", useMonth + '', useMonth + '', "N");
                        }
                        break;
                    case "GDZCZY_YZJE": //变更月折旧额
                        var latestNZJE = Pub.formatNum(rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] * 12, '', currJeDecn, '');
                        cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_NZJE", Pub.formatNum(latestNZJE, currJeDecn), latestNZJE, "N");
                        break;
                    case "GDZCZY_YZJL": //变更月折旧率
                        var latestNZJL = Pub.formatNum(rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] * 12, '', currZjlDecn, '');
                        cardself.UpdateChangeItemStructureValue(assetID, Pub.formatNum(latestNZJL, currJeDecn), latestNZJL, "N");
                        break;
                    case "GDZCZY_ZCYZ":
                    case "GDZCZY_JCZL":
                    case "GDZCZY_JCZ":
                    case "GDZCZY_JZZB":
                    case "GDZCZY_LJZJ":
                        needCalNetSalvageValue = true;
                        break;
                    case "GDZCZY_SYDW":
                        var changeCompanyCode = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] + '';
                        if (changeCompanyCode) {
                            if (changeCompanyCode === curCompanyCode) {
                                var departmentCode = currAssetDr[GDWebBizHandleConstants.XPATH_GDZCZY_BMBH];
                                var departmentName = currAssetDr[GDWebBizHandleConstants.XPATH_GDZCZY_BMMC];
                                var resultValue = cardself.GetChangeItemStructureValue(assetID, "GDZCZY_BMBH");
                                if (resultValue["isExist"]) {
                                    departmentCode = resultValue["latestValue"];
                                    departmentName = resultValue["latestName"];
                                }
                                cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_SYBM", departmentCode, departmentName, "C");
                            } else {
                                if (ifchange) {
                                    cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_SYBM", "", "", "C");
                                }
                            }
                            if (ifchange) {
                                cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_SYR", "", "", "C");
                            }
                        } else {
                            cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_SYBM", "", "", "C");
                            cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_SYR", "", "", "C");
                        }
                        cardself.ChangeSmartHelpInfo(changeCompanyCode);
                        //cardself.GetXMSmartInfo(ds.GDBGXMJG, changeCompanyCode);
                        break;
                    default:
                        break;
                }
                if (needCalNetSalvageValue) {
                    var assetZCYZ = currAssetDr["GDZCZY_ZCYZ"] * 1;
                    var assetJCZL = currAssetDr["GDZCZY_JCZL"] * 1;
                    var assetJZZB = currAssetDr["GDZCZY_JZZB"] * 1;
                    var assetLJZJ = currAssetDr["GDZCZY_LJZJ"] * 1;
                    var assetJCZ = currAssetDr["GDZCZY_JCZ"] * 1;
                    var returnValue = cardself.GetChangeItemStructureValue(assetID, "GDZCZY_ZCYZ");
                    if (returnValue["isExist"]) {
                        assetZCYZ = returnValue['latestValue'] * 1;
                    }
                    returnValue = cardself.GetChangeItemStructureValue(assetID, "GDZCZY_JZZB");
                    if (returnValue["isExist"]) {
                        assetJZZB = returnValue['latestValue'] * 1;
                    }
                    returnValue = cardself.GetChangeItemStructureValue(assetID, "GDZCZY_LJZJ");
                    if (returnValue["isExist"]) {
                        assetLJZJ = returnValue['latestValue'] * 1;
                    }

                    //由于允许净残值率变更，因此在计算净残值的时候，应该考虑净残值率的变化
                    if (changeNetSalvageValueBase === "1") //以净残值率为准
                    {
                        returnValue = cardself.GetChangeItemStructureValue(assetID, "GDZCZY_JCZL");
                        if (returnValue["isExist"]) {
                            assetJCZL = returnValue['latestValue'] * 1;
                        }
                        assetJCZ = Pub.formatNum(Pub.Calculate(assetZCYZ, assetJCZL, "*") / 100, currJeDecn);
                        if (assetJCZ > Pub.Calculate(assetZCYZ, Pub.Calculate(assetLJZJ, assetJZZB, "+"), "-")) {
                            $.messager.alert("提示", assetCode + " 资产变更后的净残值大于现值！", "warning");
                            return cardself.EditFail(rowData);
                        } else
                            cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_JCZ", Pub.formatNum(assetJCZ, currJeDecn), assetJCZ, "N");
                    }
                    //由于允许净残值变更，因此在计算净残值率的时候，应该考虑净残值的变化
                    else //以净残值为准
                    {
                        returnValue = cardself.GetChangeItemStructureValue(assetID, "GDZCZY_JCZ");
                        if (returnValue["isExist"]) {
                            assetJCZ = returnValue['latestValue'] * 1;
                        }
                        if (assetZCYZ === 0)
                            assetJCZL = 0;
                        else
                            assetJCZL = Pub.formatNum(Pub.Calculate(assetJCZ * 100, assetZCYZ, "/"), currZjlDecn);
                        if (assetJCZ > Pub.Calculate(assetZCYZ, Pub.Calculate(assetLJZJ, assetJZZB, "+"), "-")) {
                            $.messager.alert("提示", assetCode + " 资产变更后的净残值大于现值！", "warning");
                            return cardself.EditFail(rowData);
                        } else
                            cardself.UpdateChangeItemStructureValue(assetID, "GDZCZY_JCZL", Pub.formatNum(assetJCZL, currJeDecn), assetJCZL, "N");
                    }
                }
                //rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = rowData[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] + '';
            };
            BGXMList.datagrid("options").onAfterEdit = function(rowIndex, rowData, changes) {
                BGXMList.datagrid("loadData", ZCBGXM[rowData[GDWebBizHandleConstants.XPATH_GDBGJL_ZCID]]);
            };
        },
        /**
         * 根据选择的使用单位去改变使用人和使用部门的过滤条件
         * @param {string} SYDW - 使用单位
         */
        ChangeSmartHelpInfo: function(SYDW) {
            var cardself = this;
            if (!SYDW) {
                var bglist = BGXMList.datagrid("getRows");
                for (var i = 0; i < bglist.length; i++) {
                    if (bglist[i]['GDBGJL_BGXM'] === "GDZCZY_SYDW") {
                        SYDW = bglist[i]['GDBGJL_BZ'] || bglist[i]['GDBGJL_YZ'];
                        break;
                    }
                }
            }
            if (SYDW) {
                if (smartHelpInfo["GDZCZY_SYBM"]) {
                    smartHelpInfo["GDZCZY_SYBM"]['strHelpCondi'][0]['DisplayValue'] = smartHelpInfo["GDZCZY_SYBM"]['strHelpCondi'][0]['Value'] = "'" + SYDW + "'";
                }
                if (smartHelpInfo["GDZCZY_SYR"]) {
                    smartHelpInfo["GDZCZY_SYR"]['strHelpCondi'][0]['DisplayValue'] = smartHelpInfo["GDZCZY_SYR"]['strHelpCondi'][0]['Value'] = SYDW;
                    smartHelpInfo["GDZCZY_SYR"]['strHelpNavCondi'][0]['DisplayValue'] = smartHelpInfo["GDZCZY_SYR"]['strHelpNavCondi'][0]['Value'] = SYDW;
                }
            }
        },
        /**
         * 编辑失败时清空输入的值
         */
        EditFail: function(row) {
            var cardself = this;
            row[GDWebBizHandleConstants.XPATH_GDBGJL_BDZ] = "";
            row[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = "";
            row[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC] = "";
        },
        /**
         * 更新其他列的值
         * @param {*string} assetCode - 项目对应的资产ID 
         * @param {*string} changeItem - 需要变更的项目编号
         * @param {*string} value - 需要变更的值
         * @param {*string} name - 需要变更的名称
         * @param {*string} itemType - 需要变更的类型
         */
        UpdateChangeItemStructureValue: function(assetId, changeItem, value, name, itemType) {
            var isUpdate = false;
            for (var i = 0; i < ZCBGXM[assetId].length; i++) {
                var structureDr = ZCBGXM[assetId][i];
                if (structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXM] === changeItem) {
                    structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = value + '';
                    structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC] = name + '';
                    if (itemType === "N") {
                        var originalValue = structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_YZ];
                        var latestValue = value;
                        structureDr["GDBGJL_BDZ"] = Pub.formatNum(Pub.Calculate(latestValue, originalValue, "-"), currJeDecn);
                    }
                    isUpdate = true;
                    break;
                }
            }
            return isUpdate;
        },
        /**
         * 获得其他列的值
         * @param {*string} assetCode - 项目对应的资产ID 
         * @param {*string} changeItem - 需要获得的项目编号
         */
        GetChangeItemStructureValue: function(assetCode, changeItem) {
            var resultValue = {};
            resultValue["isExist"] = false;
            for (var i = 0; i < ZCBGXM[assetCode].length; i++) {
                var structureDr = ZCBGXM[assetCode][i];
                if (structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BGXM] === changeItem) {
                    {
                        resultValue["isExist"] = true;
                        resultValue["latestValue"] = structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BZ];
                        resultValue["latestValueName"] = structureDr[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC];
                        break;
                    }
                }
            }
            return resultValue;
        },
        /**
         * 设置具体控件类型
         * @param  {Object} changeItemStructureDr - 当前编辑行
         * @param  {String} field - 过滤行
         */
        SetParamValueEdit: function(changeItemStructureDr, field) {
            var cardself = this;
            var type = changeItemStructureDr[GDWebBizHandleConstants.XPATH_GDXMZD_XMLX].trim() + '';
            var ifCompare = changeItemStructureDr["GDXMZD_IFDZ"].trim();
            var ifReference = changeItemStructureDr["GDXMZD_IFCZ"].trim();
            var length = changeItemStructureDr[GDWebBizHandleConstants.XPATH_GDXMZD_LENG] * 1;
            var itemField = changeItemStructureDr["GDBGJL_BGXM"].trim();
            switch (type) {
                case "B": //bool
                    BGXMList.datagrid("getColumnOption", field).editor = cardself.GetEditor("B");
                    break;
                case "C": //char
                    if (ifCompare === "1" || ifReference === "1") {
                        //设置帮助
                        cardself.SetXMSmartHelp(itemField, field);
                    } else {
                        var editor = cardself.GetEditor("C");
                        length = "length[0," + length * 2 + "]";
                        editor.options.validType = length;
                        BGXMList.datagrid("getColumnOption", field).editor = editor;
                    }
                    break;
                case "D": //date
                    BGXMList.datagrid("getColumnOption", field).editor = cardself.GetEditor("D");
                    break;
                case "N": //number
                    var editor = cardself.GetEditor("N");
                    var decn = changeItemStructureDr[GDWebBizHandleConstants.XPATH_GDXMZD_DECN] * 1;
                    editor.options.precision = 8;
                    BGXMList.datagrid("getColumnOption", field).editor = editor;
                    break;
                default:
                    var editor = cardself.GetEditor("C");
                    length = "length[0," + length * 2 + "]";
                    editor.options.validType = length;
                    BGXMList.datagrid("getColumnOption", field).editor = editor;
                    break;
            }
        },
        /**
         * 设置项目帮助的内容和事件
         * @param  {String} strXMBH - 项目编号
         * @param  {Object} element - 列元素
         */
        SetXMSmartHelp: function(strXMBH, field) {
            var cardself = this;
            var editor = cardself.GetEditor("A");
            editor.options.adp.helpID = smartHelpInfo[strXMBH]["strHelpID"]; //智能帮助所需帮助ID
            var strHelpCondi = smartHelpInfo[strXMBH]["strHelpCondi"];
            var strHelpNavCondi = smartHelpInfo[strXMBH]["strHelpNavCondi"];
            if (typeof(strHelpCondi) !== "string") {
                strHelpCondi = JSON.stringify(smartHelpInfo[strXMBH]["strHelpCondi"]);
                if (strXMBH !== "GDZCZY_SYBM" && strXMBH !== "GDZCZY_SYR") {
                    smartHelpInfo[strXMBH]["strHelpCondi"] = JSON.stringify(smartHelpInfo[strXMBH]["strHelpCondi"]);
                }
            }
            if (strXMBH === "GDZCZY_SYR") {
                if (strHelpCondi) {
                    strHelpNavCondi = JSON.stringify(strHelpNavCondi);
                }
                editor.options.adp.navcondition = strHelpNavCondi;
            }
            editor.options.adp.condition = strHelpCondi; //条件         
            editor.options.gridOptions.idField = smartHelpInfo[strXMBH]['strHelpField'];
            editor.options.valueField = smartHelpInfo[strXMBH]['strHelpField'];
            editor.options.textField = smartHelpInfo[strXMBH]['strHelpField'];
            var map = {};
            map[GDWebBizHandleConstants.XPATH_GDBGJL_BZ] = smartHelpInfo[strXMBH]['strHelpValue'];
            map[GDWebBizHandleConstants.XPATH_GDBGJL_BZMC] = smartHelpInfo[strXMBH]['strHelpField'];
            editor.options.adp.mapFields = map;
            BGXMList.datagrid("getColumnOption", field).editor = editor;
        },
        /**
         * 非新增状态下加载数据
         */
        BindChangeData: function() {
            var cardself = this;
            AssetList.datagrid('loadData', Pub.FilterData(ds.GDBGZC, GDWebBizHandleConstants.XPATH_GDBGJL_BJZT, "D", false));
            BGXMList.datagrid('loadData', ds.GDBGXMJG);
            cardself.gridHelper.bindClickCellEvent(cardself.view, BGXMList); //绑定单击事件
            AssetList.datagrid('selectRow', 0);
            if (ds.GDBGD[0][GDWebBizHandleConstants.XPATH_GDBGJL_CSYZJ] === "1") {
                $("#" + GDWebBizHandleConstants.ChangeCheckID).attr("checked", true);
            } else {
                $("#" + GDWebBizHandleConstants.ChangeCheckID).attr("checked", false);
            }
        },
        /**
         * 设置动态列
         */
        SetColumns: function() {
            var cardself = this;
            var columnsSchema = {
                columns: [
                    []
                ]
            };
            var ZCBH = {
                field: 'GDBGJL_ZCID_GDZCZY_ZCBH',
                width: 180,
                title: '资产编号',
                halign: 'center',
                readonly: true,
                editor: {
                    type: 'text'
                }
            };
            columnsSchema.columns[0].push(ZCBH);
            var ZCMC = {
                field: 'GDBGJL_ZCID_GDZCZY_ZCMC',
                width: 180,
                title: '资产名称',
                halign: 'center',
                readonly: true,
                editor: {
                    type: 'text'
                }
            };
            columnsSchema.columns[0].push(ZCMC);
            AssetList.datagrid(columnsSchema);
            columnsSchema = {
                columns: [
                    []
                ]
            };
            var BGXM = {
                field: 'GDBGJL_BGXMMC',
                width: 180,
                title: '变更项目',
                halign: 'center',
                readonly: true,
                editor: {
                    type: 'text'
                }
            };
            columnsSchema.columns[0].push(BGXM);
            var BQZ = {
                field: 'GDBGJL_YZMC',
                width: 180,
                title: '变前值',
                halign: 'center',
                align: 'right',
                readonly: true,
                editor: {
                    type: 'text',
                    options: {
                        tipPosition: 'right',
                        validType: 'length[0,128]'
                    }
                }
            };
            columnsSchema.columns[0].push(BQZ);
            var BDZ = {
                field: 'GDBGJL_BDZ',
                width: 180,
                title: '变动值',
                halign: 'center',
                align: 'right',
                readonly: false,
                editor: {
                    type: 'text',
                    options: {
                        tipPosition: 'right',
                        validType: 'length[0,128]'
                    }
                }
            };
            columnsSchema.columns[0].push(BDZ);
            var BHZ = {
                field: 'GDBGJL_BZMC',
                width: 180,
                title: '变后值',
                align: 'right',
                halign: 'center',
                editor: {
                    type: 'text'
                }
            };
            columnsSchema.columns[0].push(BHZ);
            BGXMList.datagrid(columnsSchema);

        },
        /**
         * 设置一下文字显示的颜色，以便观察
         */
        SetTextColor: function() {
            var cardself = this;
            $('#' + GDWebBizHandleConstants.ChangeBGDHID).text('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ChangeBGLXID).adplookupbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ChangeBGRQID).my97datebox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ChangeBGRID).adplookupbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ChangeSHRID).adplookupbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ChangeFZRID).adplookupbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ChangeZYID).text('textbox').css('color', 'black');
        },
        /**
         * 行选中事件
         */
        SelectRow: function() {
            var cardself = this;
            if (!cardself.cardInstance().dataSource || !cardself.cardInstance().dataSource.tables(0) || !cardself.cardInstance().dataSource.tables(0).rows(0)) {
                return;
            }
            return cardself.TableEndEditing(BGXMList).then(function() {
                var row = AssetList.datagrid('getSelected');
                var selectIndex = AssetList.datagrid('getRowIndex', row);
                currentRow = selectIndex;
                if (!row) {
                    BGXMList.datagrid("loadData", []);
                } else {
                    var zcid = row['GDBGJL_ZCID'];
                    BGXMList.datagrid("loadData", ZCBGXM[zcid]);
                    BGXMList.datagrid("selectRow", 0);
                    var returnValue = cardself.GetChangeItemStructureValue(zcid, "GDZCZY_SYDW");
                    cardself.ChangeSmartHelpInfo();
                }
            });
        },
        /**
         * 获取不同的控件类型
         * @param  {String} flag - 控件类型
         */
        GetEditor: function(flag) {
            var cardself = this;
            var helpEditor = {
                type: 'adplookupbox',
                options: {
                    tipPosition: 'right',
                    editable: true,
                    enableFaavorite: true,
                    enableLocalstorage: false,
                    gridOptions: {
                        idField: '',
                        singleSelect: true
                    },
                    valueField: '',
                    textField: '',
                    adp: {
                        helpID: '',
                        condition: '',
                        mappingOnce: true,
                        navcondition: '',
                        nosearch: false,
                        fullTreeCondition: '',
                        mapFields: {}
                    },
                    dialogOptions: {
                        title: '',
                        width: 550,
                        height: 580
                    },
                    tipFields: []
                },
            };
            var dateEditor = {
                "type": "my97datebox",
                "options": {
                    "tipPosition": "right",
                    "dateFmt": "yyyy-MM-dd",
                    "realDateFmt": "yyyy-MM-dd"
                },
            };
            var textEditor = {
                type: 'text',
                options: {
                    required: false,
                    tipPosition: 'right',
                    validType: 'length[0,128]'
                }
            };
            var NumEditor = {
                type: 'numberbox',
                "options": {
                    "tipPosition": "right"
                }
            };
            var BoolEditor = {
                type: 'checkbox',
                "options": {
                    on: 1,
                    off: 0
                }
            }
            switch (flag) {
                case "B":
                    return BoolEditor;
                case "C":
                    return textEditor;
                case "N":
                    return NumEditor;
                case "A":
                    return helpEditor;
                case "D":
                    return dateEditor;
                default:
                    return false;
            }
        },
        /**
         * 离开datagrid上的焦点(异步)
         * @param  {object} datagrid - 需要离开焦点的表格$
         */
        TableEndEditing: function(datagrid) {
            if (datagrid[0]) {
                return this.treeGridHelper.getEditHelper(datagrid).endEditing();
            } else {
                return $.Deferred().reject();
            }
        },
        /**
         * 离开datagrid上的焦点(异步)
         */
        HideButton: function() {
            $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeCreateButtonID);
            $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeEditButtonID);
            $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeCancelButtonID);
            $('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeSaveButtonID);
            //$('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeAssetAddButtonID);
            //$('#PresetedBar').buttongroup('hideButton', GDWebBizHandleConstants.ChangeAssetRemoveButtonID);
        },
        /**
         * 摘要失去焦点事件
         */
        DescLostFocus: function() {
            var cardself = this;
        },
        /**
         * 删除方法（供共享中心使用）
         */
        RemoveChange: function() {
            var wzself = this;
            if (!wzself.CheckIfCanMaintainChange(false)) {
                return $.Deferred.reject([false]);
            }
            $.loading();
            return wzself.DeleteChange(zdrSc);
        },
        /**
         * 删除变更的方法 仅为共享模式使用
         */
        DeleteChange: function(zdrSc) {
            var cardself = this;
            var DateSet = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var zcbh = ds["GDBGZC"][0]['GDBGJL_ZCBH'];
            var flid = DateSet['GDBGJL_FLID'].trim();
            var zdr = DateSet['GDBGJL_BGR'];
            if (flid !== null && flid !== "") {
                $.messager.alert('提示', "编号为【" + zcbh + "】记录是实物申请的变更记录，不能删除！<br/>", 'warning');
                return $.Deferred().reject();
            }
            var curUserName = gsp.rtf.context.get('UserName');
            if ((zdr !== null && zdr !== "") && zdr !== curUserName && zdrSc === "1") {
                $.messager.alert('提示', "编号为【" + zcbh + "】的记录不允许非变更人删除！<br/>", 'warning');
                return $.Deferred().reject();
            }
            return $.Deferred().resolve();
        },
        /**
         * 保存后更新FSSCFLAG字段
         */
        UpdateFlag: function() {
            var cardself = this;
            var data = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var params = ["GDBGJL", data[GDWebBizHandleConstants.XPATH_GDBGJL_BGDH], curCompanyCode, Pub.FormatDate8(data[GDWebBizHandleConstants.XPATH_GDBGJL_BGRQ])];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "UpdateFSSCflag", params);
        },
        /**
         * 稽核前台扩展方法
         */
        BatchConfig: function() {
            var cardself = this;
            var data = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            return cardself.CheckIfCanMaintainChange();
        }
    }
}]);