gsp.module("gsp.app").controller("GDWebSplitListController", "ListController",
    function() {
        var MKID = "GD"; //模块ID
        var BIZOBJID = "GD01"; //业务对象组ID
        var BIZOPID = "GD116"; //业务对象ID
        var FUNCID = "GD116"; //功能ID
        var FUNCNAME = "资产拆分"; //功能名称
        var curCompanyCode = ""; //单位编号
        var curCompanyName = ""; //单位名称
        var curCompanyType = ""; //公司类别，是否法人单位
        var curYear = ""; //年度
        var curPeriod = ""; //期间
        var curDate = ""; //8位业务日期
        var currGDqj = ""; //会计期间
        var authorityCondi = ""; //权限条件
        var curUserName = ""; //用户显示名称
        var curUserCode = ""; //用户名（登陆用户名）

        return {
            //界面加载方法
            Formload: function() {
                var wzself = this;
                curYear = gsp.rtf.context.get('BizDate').substring(0, 4); //获取当前年度
                curPeriod = gsp.rtf.context.get('BizDate').substring(5, 7); //获取当前期间
                curUserID = gsp.rtf.context.get('UserID'); //获取当前用户ID
                curUserName = gsp.rtf.context.get('UserName'); //获取用户名字
                curUserCode = gsp.rtf.context.get('UserCode'); //获取登陆用户名
                curDate = wzself.FormatDate8(gsp.rtf.context.get('BizDate'));
                return wzself.GetFirstAuditMemberCommon(curYear, curUserID).then(function() { //获取第一个符合的单位
                    return wzself.GetGDParams(curYear, curCompanyCode, curDate); //获得公司参数
                }).then(function() {
                    return wzself.CompanyCheck(curCompanyCode); //检查公司
                }).then(function() {
                    return wzself.GetFsscFilterCondi(curYear, curUserID, curUserName, curDate); //获取并设置核算单位帮助条件 
                }).then(function() {
                    wzself.RefreshUI();
                });
            },
            /**
             * 界面显示
             */
            RefreshUI: function() {
                var wzself = this;
                $.loaded();
                wzself.GetRecord(curYear, curCompanyCode, currGDqj, curDate); //获取列表数据
                wzself.SetColumnDecn('GDCHZJL_YZCBH_GDZCZY_ZCYZ', jeDecn);
                wzself.SetColumnDecn('GDCHZJL_YZCBH_GDZCZY_ZCSL', slDecn);
                wzself.SetColumnDecn('GDCHZJL_YZCBH_GDZCZY_JCZ', jeDecn);
                wzself.SetColumnDecn('GDCHZJL_YZCBH_GDZCZY_LJZJ', jeDecn);
                wzself.SetColumnDecn('GDCHZJL_YZCBH_GDZCZY_JZZB', jeDecn);
            },
            /**
             * 新增按钮事件
             */
            btnAdd: function() {
                var wzself = this;
                //判断计提业务
                if (isNojtlc !== "1") {
                    if (jtBoforeYw === "1") {
                        if (sfJtzj !== "1") {
                            $.messager.alert('提示', "没有进行计提折旧，请先提折旧再做业务。", 'warning');
                            return;
                        }
                    } else if (jtBoforeYw === "0") {
                        if (sfJtzj === "1") {
                            $.messager.alert('提示', "已经提折旧，不允许再做业务。", 'warning');
                            return;
                        }
                    }
                }
                var ZCID = 'Create';
                wzself.add('资产拆分详细', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebSplit/58524825-f0fd-4aa1-9c9a-d48a98863d04/Index.html?dataID=' +
                    ZCID, ZCID, { "actionname": "Formload" });
                wzself.RefreshUI();
            },
            /**
             * 查看拆分后资产按钮事件
             */
            btnView: function() {
                var wzself = this;
                var ZCID = 'View';
                wzself.check('拆分列表', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebSplit/ac73bfda-c4c8-445a-af81-e9c975dc4d4a/Index.html?dataID=' +
                    ZCID, ZCID, { "actionname": "Formload" });
            },
            /**
             * 获取拆分资产界面显示数据
             */
            GetRecord: function(curYear, curCompanyCode, currGDqj, curDate) {
                var wzself = this;
                //服务端方法获取资产拆分界面数据
                var params = [curYear, curCompanyCode, currGDqj, curDate];
                var dataService = wzself.context.injector.get('$dataServiceProxy');
                return dataService.invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetRecord", params).then(
                    function(data) {
                        var dataset = data;
                        $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCCF).datagrid('loadData', { //绑定数据到datagrid
                            total: 20,
                            rows: dataset.data.Table
                        })
                    }
                )
            },
            /**
             * 获取第一个符合要求的单位
             */
            GetFirstAuditMemberCommon: function(curYear, curUserID) {
                var wzself = this;
                //调用服务端方法的参数
                var params = ["", "0", "1", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curCompanyName, BIZOPID, curUserID, curYear, BIZOBJID, BIZOPID, MKID];
                var dataService = wzself.context.injector.get('$dataServiceProxy'); //服务端获取第一个符合要求的单位方法
                return dataService.invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFirstAuditMemberCommon", params).then(
                    function(result) {
                        if (result) {
                            curCompanyCode = result.data; //获取核算单位的编号
                            wzself.context.setParam('strCompanyCode', curCompanyCode);
                            curCompanyName = result.outParams; //获取核算单位的名字
                            //给当前核算单位符默认值
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF).adplookupbox('setValue', curCompanyCode);
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF).adplookupbox('setText', curCompanyName);
                        };
                    }
                )
            },
            /**
             * 获取公司参数
             */
            GetGDParams: function(curYear, curCompanyCode, curDate) {
                var wzself = this;
                var params = [curCompanyCode, curYear, curDate, "CHANGELIST"];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", params).then(
                    function(result) {
                        if (result) {
                            var dicParams = result.data;
                            GDWebBizHandleConstants.GDLSGSCS[curCompanyCode] = dicParams;
                            if (dicParams["GD_JEDECN"]) //GD_JEDECN 金额精度
                                jeDecn = dicParams["GD_JEDECN"];
                            if (dicParams["GD_SLDECN"]) //GD_SLDECN 数量精度
                                slDecn = dicParams["GD_SLDECN"];
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
                            if (dicParams["GD_JT_YW"])
                                jtBoforeYw = dicParams["GD_JT_YW"];
                            if (dicParams["GD_BGZDGXCSYZJE"])
                                bgZdgxCs = dicParams["GD_BGZDGXCSYZJE"];
                            if (dicParams["GDndqj"])
                                curGDndqj = dicParams["GDndqj"];
                            if (dicParams["GD_SFJTZJ"])
                                sfJtzj = dicParams["GD_SFJTZJ"];
                            if (dicParams["GD_ZDRSC"])
                                zdrSc = dicParams["GD_ZDRSC"];
                        }
                    }).fail(function(result) {
                    $.messager.alert('提示', "获取单位信息失败。", 'warning');
                    return;
                });;
            },
            /**
             * 检查公司
             */
            CompanyCheck: function(curCompanyCode) {
                var wzself = this;
                var checkresult = wzself.CheckForm();
                if (!checkresult) {
                    if (!curCompanyCode) {
                        curCompanyCode = '';
                        curCompanyName = '';
                    }
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF).adplookupbox('setValue', curCompanyCode);
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF).adplookupbox('setText', curCompanyName);
                    return wzself.GetGDParams(curYear, curCompanyCode, curDate).then(function() {
                        return $.Deferred().reject();
                    })
                }
                return $.Deferred().resolve();
            },
            /**
             * 对当前功能的检查
             */
            CheckForm: function() {
                if (sfCswc === "0") {
                    $.messager.alert('提示', "初始化未完成，不能进行拆分业务。", 'warning');
                    return false;
                }
                if (sfNjwc === "2") {
                    $.messager.alert('提示', "本年度已经年结，不能进行资产拆分业务。", 'warning');
                    return false;
                }
                if (sfNjwc === "3") {
                    $.messager.alert('提示', "上年度未年结，不能进行本年度资产拆分业务。", 'warning');
                    return false;
                }
                return true;
            },
            /**
             * 获取并设置核算单位帮助条件以及帮助后事件（异步）
             */
            GetFsscFilterCondi: function(curYear, curUserID, curUserName, curDate) {
                var wzself = this;
                var helpParam = ["0", "0", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curYear, BIZOBJID, BIZOPID, MKID];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFsscAuditMemberSqlCondiRestFul", helpParam)
                    .then(function(result) {
                        //设置核算组织帮助
                        var companyHP = $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF);
                        var companyHelp = companyHP.adplookupbox('options').adp;
                        companyHelp.condition = "[" + wzself.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and " + result.data, "Express", " ", " ") + "]";
                        companyHP.on('OnDictEntryPicked', function(e, rowData, opts) {
                            var row = rowData[0] || rowData;
                            var newCompanyCode = row.LSBZDW_DWBH;
                            var newCompanyName = row.LSBZDW_DWMC;
                            if (!newCompanyCode) {
                                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF).adplookupbox('setValue', curCompanyCode);
                                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF).adplookupbox('setText', curCompanyName);
                                return;
                            } else if (newCompanyCode === curCompanyCode) { //与原单位相同 退出
                                return;
                            } else {
                                //冲突检查
                                return wzself.CheckFunCt(newCompanyCode, FUNCID, FUNCNAME, curYear, "1", curUserID, curUserName)
                                    .then(function(result) {
                                        if (result) {
                                            //有冲突的 把单位帮助的数据转回
                                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF).adplookupbox('setValue', curCompanyCode);
                                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCCF).adplookupbox('setText', curCompanyName);
                                            $.messager.alert('提示', result, 'warning');
                                            return;
                                        } else {
                                            //获取公司参数
                                            return wzself.GetGDParams(curYear, newCompanyCode, curDate).then(function() {
                                                //单位具体检查
                                                return wzself.CompanyCheck(newCompanyCode);
                                            }).then(function() {
                                                //更新成新单位
                                                curCompanyCode = newCompanyCode;
                                                curCompanyName = newCompanyName;
                                                //更新功能记录的单位
                                                var uptParam = [curUserID, FUNCID, newCompanyCode];
                                                wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "UptFuncConflict", uptParam);
                                                //刷新绑定数据
                                                return wzself.GetRecord(curYear, curCompanyCode, curGDndqj);
                                            });
                                        }
                                    });
                            }
                        });
                        companyHP.adplookupbox('textbox').off('keydown');
                    })
                    .fail(function(result) {
                        $.messager.alert('提示', "核算组织帮助条件获取失败。", 'warning');
                    });
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
            //设置精度格式
            toDecimal: function(number, decn) {
                var f = parseFloat(number);
                var p = decn * 1;
                if (isNaN(f)) {
                    return 0.0;
                }
                var decnStr = Math.pow(10, p);
                f = Math.round(f * decnStr) / decnStr;
                var s = f.toString();
                var rs = s.indexOf('.');
                if (rs < 0) {
                    rs = s.length;
                    if (p !== 0) {
                        s += '.';
                    }
                }
                while (s.length <= rs + p && p !== 0) {
                    s += '0';
                }
                return s;
            },
            //设置列精度
            SetColumnDecn: function(ColumnField, precision) {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCCF).datagrid('getColumnOption', ColumnField).formatter = function(v, d, i) {
                    if (!v && v !== 0) {
                        return v;
                    } else if (v == 0) {
                        return "";
                    } else {
                        return wzself.toDecimal(v, precision);
                    }
                }
            },
            /**
             * 冲突检查
             */
            CheckFunCt: function(companyCode, funcID, funcName, curYear, compFlag, userID, userName) {
                var wzself = this;
                //检查功能冲突：普通单位
                var conflictDs = "";
                var checkresult = "";
                var checkParam = [companyCode, funcID, curYear, compFlag, userID, conflictDs];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckFuncConfRefStr", checkParam)
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
            },
        }
    }
)