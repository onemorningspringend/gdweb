//资产增加界面
gsp.module('gsp.app').controller('GDAssetAddList', 'ListController', function() {
    //#region 参数
    var MKID = "GD"; //模块ID
    var BIZOBJID = "GD01"; //业务对象组ID
    var BIZOPID = "GD101"; //业务对象ID
    var FUNCID = "GDWEB101"; //功能ID
    var FUNCNAME = "资产增加"; //功能名称
    var curCompanyCode = ""; //单位编号
    var curCompanyName = ""; //单位名称
    var curCompanyType = ""; //公司类别，是否法人单位
    var curDate = ""; //8位日期
    var curYear = ""; //年度
    var curPeriod = ""; //期间
    var isJtzj = "0"; //是否计提折旧
    var isCswc = "0"; //是否初始完成
    var isNjwc = "0"; //是否年结完成
    var iiJeDecn = 2; //金额精度
    var iiSlDecn = 0; //数量精度
    var isJoinZcgl = '0'; // 是否关联资产管理
    var isSecret = "0"; //是否军工保密版
    var isZdrDel = "0"; //只允许制单人删除单据
    var authorityCondi = ""; //权限条件
    var mainSelf;
    var ChooseAssetIsFirstShown = true; //复制选择资产界面 第一次展示
    //#endregion 
    return {
        //#region 界面加载
        //界面加载（表单加载后）
        Formload: function() {
            mainSelf = this;
            curDate = mainSelf.FormatDate8(gsp.rtf.context.get('BizDate'));
            curYear = gsp.rtf.context.get('BizDate').substring(0, 4);
            debugger;
            $(document).on('frameclose', function() {
                mainSelf.SaveCookieData('');
            });
            var cookieData = mainSelf.CutoutData(gsp.rtf.query.get("funcid") + 'DWBH=', ';', document.cookie);
            if (cookieData == '') {
                //服务端：获取第一个不违反功能冲突、有权限的成员单位
                var params = ["", "0", "1", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curCompanyName, FUNCID, gsp.rtf.context.get('UserID'), curYear, BIZOBJID, BIZOPID, MKID];
                mainSelf.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFirstAuditMemberCommon", params)
                    .then(function(result) {
                        //获取到单位
                        if (result) {
                            //获取到返回值
                            curCompanyCode = result.data; //return的值
                            curCompanyName = result.outParams; //ref或out的参数
                            mainSelf.SaveCookieData(curCompanyCode + '~' + curCompanyName);
                            mainSelf.LoadFormData();
                        }
                    })
                    .fail(function(result) {
                        //延迟关闭
                        setTimeout(function() {
                            mainSelf.close();
                        }, 1000);
                    });
            } else {
                //获取到返回值
                curCompanyCode = cookieData.split('~')[0];
                curCompanyName = cookieData.split('~')[1];

                mainSelf.LoadFormData();
            }
        },
        LoadFormData: function() {
            //赋值给核算单位智能帮助
            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setValue', curCompanyCode);
            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setText', curCompanyName);

            //服务端：获取公司参数
            mainSelf.GetCompanyParams(curCompanyCode, curYear, curDate).then(function() {
                //显示单位的固定资产期间
                $(GDWebBizHandleConstants.ControllerID_PeriodLabel).html(curYear + '年' + curPeriod + '月');
                //设置界面数值精度
                mainSelf.SetColumnDecn(GDWebBizHandleConstants.ControllerID_MainXDataGrid, 'GDZCZY_ZCYZ', iiJeDecn);
                mainSelf.SetColumnDecn(GDWebBizHandleConstants.ControllerID_MainXDataGrid, 'GDZCZY_ZCSL', iiSlDecn);
                mainSelf.SetColumnSummationDecn(GDWebBizHandleConstants.ControllerID_MainXDataGrid, 'GDZCZY_ZCYZ', iiJeDecn);
                mainSelf.SetColumnSummationDecn(GDWebBizHandleConstants.ControllerID_MainXDataGrid, 'GDZCZY_ZCSL', iiSlDecn);
                // 更新列表中现有的数据 #warning 可注释 for (var i = 0; i <
                // $(GDWebBizHandleConstants.ControllerID_MainXDataGrid).datagrid('getRows').leng
                // th; i++)
                // $(GDWebBizHandleConstants.ControllerID_MainXDataGrid).datagrid('refreshRow',
                // i); CheckBox事件 #warning 设置按钮显示
                mainSelf.SetBtn_DisPlay();

                //单位具体检查
                var isWarningMgs = mainSelf.CheckCompanyInfo();
                if (isWarningMgs != "") {
                    $.messager.alert('提示', isWarningMgs, 'warning', function() {
                        curCompanyCode = "";
                        curCompanyName = "";
                    });
                } else {
                    //刷新绑定数据
                    var condi = "[" + mainSelf.ArrangeCondition(" ", "GDZCZY_DWBH", " =", "'" + curCompanyCode + "' and ((GDZCZY_RZRQ like '" + curYear + curPeriod + "%' and GDZCZY_QRRQ='" + curYear + curPeriod + "' and GDZJJL_IFDR='0' and GDZJJL_IFCZ='0') or GDZCZY_CWQR='0') " + authorityCondi, "Express", " ", " ") + "]";
                    var order = "#GDZCZY_ZCBH# asc ";
                    mainSelf.load(condi, order);
                }
            });

            //获取核算组织帮助条件
            var helpParam = ["0", "0", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curYear, BIZOBJID, BIZOPID, MKID];
            mainSelf.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFsscAuditMemberSqlCondiRestFul", helpParam).then(function(result) {
                    //设置核算组织帮助
                    var companyHelp = $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('options').adp;
                    companyHelp.helpID = "31984442-8579-4de9-a178-ae441747c31b"; //帮助ID
                    companyHelp.mapFields = "LSBZDW_DWBH"; //影射字段{'表单字段ID':'帮助字段ID',...}
                    companyHelp.condition = "[" + mainSelf.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and " + result.data, "Express", " ", " ") + "]"; //左括号 字段 比较符 字段值 值类型 右括号 关系
                })
                .fail(function(result) {
                    debugger;
                    //$.messager.alert('提示', "核算组织帮助条件获取失败。", 'warning', function() {});
                });

            //核算单位帮助 帮助后事件
            var compHelp = $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp);
            compHelp.on('OnDictEntryPicked', function(e, rowData, opts) {
                var newCompanyCode = rowData[0].LSBZDW_DWBH,
                    newCompanyName = rowData[0].LSBZDW_DWMC;

                //单位为空 把单位帮助的数据转回
                if (newCompanyCode == "") {
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setValue', curCompanyCode);
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setText', curCompanyName);
                    return;
                } else if (newCompanyCode == curCompanyCode) { //与原单位相同 退出
                    return;
                } else {
                    //冲突检查
                    mainSelf.CheckFunCt(newCompanyCode, FUNCID, FUNCNAME, curYear, "1", gsp.rtf.context.get('UserID'), gsp.rtf.context.get('UserName')).then(function(result) {
                        if (result != "") {
                            //有冲突的 把单位帮助的数据转回
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setValue', curCompanyCode);
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setText', curCompanyName);
                            $.messager.alert('提示', result, 'warning');
                            return;
                        } else {
                            //获取公司参数
                            mainSelf.GetCompanyParams(newCompanyCode, curYear, curDate).then(function() {
                                //单位具体检查
                                var isWarningMgs = mainSelf.CheckCompanyInfo();
                                if (isWarningMgs != "") {
                                    $.messager.alert('提示', isWarningMgs, 'warning', function() {
                                        $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setValue', curCompanyCode);
                                        $(GDWebBizHandleConstants.ControllerID_CompanySmartHelp).adplookupbox('setText', curCompanyName);
                                        mainSelf.GetCompanyParams(curCompanyCode, curYear, curDate);
                                    });
                                } else {
                                    //更新成新单位
                                    curCompanyCode = newCompanyCode;
                                    curCompanyName = newCompanyName;
                                    //显示单位的固定资产期间
                                    $(GDWebBizHandleConstants.ControllerID_PeriodLabel).html(curYear + '年' + curPeriod + '月');
                                    //更新功能记录的单位
                                    var uptParam = [gsp.rtf.context.get('UserID'), FUNCID, newCompanyCode,curYear];
                                    mainSelf.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "UptFuncConflict", uptParam);
                                    //保存cookie
                                    debugger;
                                    mainSelf.SaveCookieData(curCompanyCode + '~' + curCompanyName);
                                    //刷新绑定数据
                                    mainSelf.load('', '');
                                }
                            });
                        }
                    });
                }
            });
        },
        //获取公司参数
        GetCompanyParams: function(companyCode, year, date) {
            var param = [companyCode, year, date, "ASSETLIST"];
            return this.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", param).then(function(result) {
                    if (result) {
                        var dicParams = result.data; //单位信息
                        if (dicParams.GD_KJQJ)
                            curPeriod = dicParams.GD_KJQJ;
                        if (dicParams.GD_SFJTZJ)
                            isJtzj = dicParams.GD_SFJTZJ;
                        if (dicParams.GD_SFCSWC)
                            isCswc = dicParams.GD_SFCSWC;
                        if (dicParams.GD_JEDECN)
                            iiJeDecn = parseInt(dicParams.GD_JEDECN, 10);
                        if (dicParams.GD_SLDECN)
                            iiSlDecn = parseInt(dicParams.GD_SLDECN, 10);
                        if (dicParams.JionGDZCFlag)
                            isJoinZcgl = dicParams.JionGDZCFlag;
                        if (dicParams.SYS_SecretEdition)
                            isSecret = dicParams.SYS_SecretEdition;
                        if (dicParams.GD_ZDRSC)
                            isZdrDel = dicParams.GD_ZDRSC;
                        if (dicParams.DW_GSLB)
                            curCompanyType = dicParams.DW_GSLB;
                        if (dicParams.GD_SFNJWC)
                            isNjwc = dicParams.GD_SFNJWC;
                        if (dicParams.GD_Authority)
                            authorityCondi = dicParams.GD_Authority;
                    }
                })
                .fail(function(result) {
                    debugger;
                    //$.messager.alert('提示', "获取单位信息失败。", 'warning');
                    return;
                });
        },
        //设置列精度
        SetColumnDecn: function(gridID, xmbh, xmDecn) {
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
        SetColumnSummationDecn: function(gridID, xmbh, xmDecn) {
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
        //设置按钮显示
        SetBtn_DisPlay: function() {
            if (isSecret == "1") $('#presetBar').buttongroup('hideButton', '402f3abf-d694-456a-b9ed-b3db81f49cdb');
        },
        //单位信息具体检查
        CheckCompanyInfo: function() {
            var isWarningMgs = "";
            if (curCompanyType == "2") {
                isWarningMgs = '当前单位为法人单位，不能做业务。';
                return isWarningMgs;
            }
            if (isNjwc == "2") {
                isWarningMgs = '本年度已经年结，不能进行资产增加。';
                return isWarningMgs;
            }
            if (isNjwc == "3") {
                isWarningMgs = '上年度没有年结，不能进行本年资产增加。';
                return isWarningMgs;
            }
            if (isCswc == "0") {
                isWarningMgs = "尚未初始完成，不能进行资产增加！";
                return isWarningMgs;
            }

            if (curPeriod == "") {
                isWarningMgs = "编号为" + curCompanyCode + "的单位固定资产会计期间不存在！";
                return isWarningMgs;
            }
            return isWarningMgs;
        },
        //刷新绑定数据
        /**
         * 带过滤条件和排序的加载数据
         * @param  {Object} filterCondition 过滤条件
         * @param  {Object} orderBy         排序方式
         * @return {Deferred}               对后台数据的异步请求
         * @memberof gsp.app.ListBaseController
         * @memberof gsp.app.ListBaseController
         */
        load: function(filterCondition, orderBy) {
            filterCondition = "[" + mainSelf.ArrangeCondition(" ", "GDZCZY_DWBH", " =", "'" + curCompanyCode + "' and ((GDZCZY_RZRQ like '" + curYear + curPeriod + "%' and GDZCZY_QRRQ='" + curYear + curPeriod + "' and GDZJJL_IFDR='0' and GDZJJL_IFCZ='0') or GDZCZY_CWQR='0') " + authorityCondi, "Express", " ", " ") + "]";
            orderBy = "#GDZCZY_ZCBH# asc ";
            debugger;
            //刷新绑定数据
            var defaultModel = mainSelf.defaultModel(),
                instanceKeys = mainSelf.dataSourceHelper.getLoadInstance(defaultModel),
                dataUri = {};
            var varService = mainSelf.context.injector.get("$variableService");
            dataUri.filterCondition = varService.parse(filterCondition, mainSelf.context);
            dataUri.orderBy = varService.parse(orderBy, mainSelf.context);

            $.loading();
            return this.loadInstance(instanceKeys, dataUri).always(function() {
                $.loaded();
            });
        },
        // RefreshData: function(companyCode) {
        //     var condi = "[" + mainSelf.ArrangeCondition(" ", "GDZCZY_DWBH", " =", "'" + companyCode + "' and ((GDZCZY_RZRQ like '" + curYear + curPeriod + "%' and GDZCZY_QRRQ='" + curYear + curPeriod + "' and GDZJJL_IFDR='0' and GDZJJL_IFCZ='0') or GDZCZY_CWQR='0') " + authorityCondi, "Express", " ", " ") + "]";
        //     var order = "#GDZCZY_ZCBH# asc ";
        //     mainSelf.load(condi, order);
        // },
        //保存Cookie数据
        SaveCookieData: function(value) {
            debugger;
            var data = gsp.rtf.query.get("funcid") + 'DWBH=' + value;
            document.cookie = data;
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
        //冲突检查
        CheckFunCt: function(companyCode, funcID, funcName, curYear, compFlag, userID, userName) {
            //检查功能冲突：普通单位
            var conflictDs = "";
            var checkResult = "";
            var checkParam = [companyCode, funcID, curYear, compFlag, userID, conflictDs];
            return this.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckFuncConfRefStr", checkParam)
                .then(function(result) {
                    if (result) {
                        if (result.data == 'false') {
                            conflictDs = result.outParams;
                            var ds = JSON.parse(conflictDs);
                            var row = ds.CONFLICT[0];
                            checkResult = funcName + "与" + row.FUNCNAME + "功能冲突,用户[" + row.USERNAME + "]正在" + row.FUNCNAME + "。";
                            return checkResult;
                        } else
                            return checkResult;
                    } else
                        return checkResult;
                })
                .fail(function(result) {
                    $.messager.alert('提示', "功能冲突检查失败。", 'warning');
                    return "";
                });
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
        //截取数据：前段（需去掉）,后段（需去掉）,截取前字符串
        CutoutData: function(startStr, endStr, allStr) {
            if (allStr.length > 0) {
                var startIdx = allStr.indexOf(startStr);
                var endIdx = -1;
                if (startIdx != -1) {
                    startIdx += startStr.length;
                    endIdx = allStr.indexOf(endStr, startIdx);
                    if (endIdx == -1)
                        endIdx = allStr.length;
                    return unescape(allStr.substring(startIdx, endIdx));
                } else
                    return "";
            } else
                return "";
        },
        //#endregion

        //#region 按钮事件
        //资产新增
        AddAssetCard: function() {
            if (curCompanyCode == '') {
                $.notify.error("请选择核算组织。");
                return;
            }

            debugger;
            mainSelf.add('资产卡片编辑', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=A&psInitAsset=0&psAssetID=&psAssetCode=&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psAssetType=&psChangeTypeFlag=0&psParentFuncID=' + gsp.rtf.query.get("funcid") + '&psCurFuncID=ZCKPADD', 'ZCKPADD', '{"actionName":"EmptyFormload"}');
        },
        //资产编辑
        EditAssetCard: function() {
            if (curCompanyCode == '') {
                $.notify.error("请选择核算组织。");
                return;
            }

            //获取选中行
            var selectRows = $(GDWebBizHandleConstants.ControllerID_MainXDataGrid).datagrid('getChecked');
            if (selectRows.length <= 0 || selectRows.length >= 2) {
                $.notify.error("请选择一行数据。");
                return;
            } else {
                if (!selectRows || selectRows == null || selectRows == undefined) {
                    $.notify.error("请选择一行数据。");
                    return;
                }
                //检查资产是否允许修改
                var assetID = selectRows[0].GDZCZY_ID;
                var assetCode = selectRows[0].GDZCZY_ZCBH;
                var assetType = selectRows[0].GDZCZY_LBBH;
                // var assetID = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_ID');
                // var assetCode = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_ZCBH');
                // var assetType = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_LBBH');
                var param = [curCompanyCode, curYear, curPeriod, assetID, assetCode];
                mainSelf.context.injector.get('$dataServiceProxy').invokeMethod('Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement', 'CheckAssetCanEdit', param).then(function(result) {
                    if (result) {
                        var checkInfo = result.data;
                        if (checkInfo == '')
                            mainSelf.edit('资产卡片编辑', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=E&psInitAsset=0&psAssetID=' + assetID + '&psAssetCode=' + assetCode + '&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psAssetType=' + assetType + '&psChangeTypeFlag=0&psParentFuncID=' + gsp.rtf.query.get("funcid") + '&psCurFuncID=ZCKPEDIT', 'ZCKPEDIT', '{"actionName":"EmptyFormload"}');
                        else
                            $.notify.error(checkInfo);
                    }
                });
            }
        },
        //资产查看
        QueryAssetCard: function() {
            if (curCompanyCode == '') {
                $.notify.error("请选择核算组织。");
                return;
            }
            var rowCount = mainSelf.listInstance().dataSource.tables('GDZCZY').rowCount();
            if (rowCount <= 0) {
                $.notify.error("请选择一行数据。");
                return;
            }

            var assetID = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_ID');
            var assetCode = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_ZCBH');
            var assetType = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_LBBH');
            mainSelf.check('资产卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=Q&psInitAsset=0&psAssetID=' + assetID + '&psAssetCode=' + assetCode + '&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psAssetType=' + assetType + '&psChangeTypeFlag=0&psParentFuncID=' + gsp.rtf.query.get("funcid") + '&psCurFuncID=ZCKP' + assetCode, 'ZCKP' + assetCode, '{"actionName":"EmptyFormload"}');
        },
        //资产删除
        RemoveAssetCard: function() {
            if (curCompanyCode == '') {
                $.notify.error("请选择核算组织。");
                return;
            }
            //获取选中行
            var selectRows = $(GDWebBizHandleConstants.ControllerID_MainXDataGrid).datagrid('getChecked');
            if (selectRows.length <= 0) {
                $.notify.error("请选择一行数据。");
                return;
            } else {
                //提示是否删除
                mainSelf.blockConfirm('询问', '该操作将删除资产所有信息，确定删除？').then(function() { //点是
                    var clientMgs = "";
                    //组织资产的ID
                    var assetIDStr = "";
                    for (var i = 0; i < selectRows.length; i++) {
                        if (isJoinZcgl == "1" && selectRows[i].GDZCZY_SBBH != "" && selectRows[i].GDZCZY_SBBH != " ")
                            clientMgs += "<br>编号为[" + selectRows[i].GDZCZY_ZCBH + "]的资产是管理进入资产，不允许删除！";
                        else if (isZdrDel == "1" && selectRows[i].GDZCZY_ZDR != gsp.rtf.context.get('UserName'))
                            clientMgs += "<br>编号为[" + selectRows[i].GDZCZY_ZCBH + "]的资产只允许制单人删除！";
                        else
                            assetIDStr += selectRows[i].GDZCZY_ID + ";";
                    }
                    //服务端 检查并删除
                    var serverMgs = "";
                    var delParams = [curCompanyCode, curYear, curPeriod, gsp.rtf.context.get('UserID'), gsp.rtf.context.get('UserName'), assetIDStr, serverMgs];
                    mainSelf.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "BatchRemoveAsset", delParams).then(function(result) {
                        if (result) {
                            serverMgs = result.outParams; //删除反馈
                            var isSuccess = result.data; //删除反馈
                            if (isSuccess == "true") {
                                $.notify.success("删除成功。" + clientMgs + serverMgs);
                                mainSelf.load('', '');
                            } else {
                                $.messager.alert('提示', "删除失败。" + clientMgs + serverMgs, 'warning');
                            }
                        }
                    }).fail(function(result) {
                        return;
                    });
                });
            }
        },
        //附属设备
        AccessoryEquipment: function() {
            if (curCompanyCode == '') {
                $.notify.error("请选择核算组织。");
                return;
            }
            //获取选中行
            var selectRows = $(GDWebBizHandleConstants.ControllerID_MainXDataGrid).datagrid('getChecked');
            if (selectRows.length <= 0 || selectRows.length >= 2) {
                $.notify.error("请选择一行数据。");
                return;
            } else {
                if (!selectRows || selectRows == null || selectRows == undefined) {
                    $.notify.error("请选择一行数据。");
                    return;
                }
                //检查资产是否允许修改
                var assetCode = selectRows[0].GDZCZY_ZCBH;
                var zcyz = selectRows[0].GDZCZY_ZCYZ;
                mainSelf.check('资产附属设备', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/17e2fe27-290d-4ee9-bf17-ca3c0b2bffe7/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psAssCode=' + assetCode + '&psAssZcyz=' + zcyz + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psJeDecn=' + iiJeDecn + '&psSlDecn=' + iiSlDecn, 'ZCFSSB' + assetCode, '{"actionName":"EmptyFormload"}');
            }
            // var assetCode = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_ZCBH');
            // var zcyz = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_ZCYZ');
            // mainSelf.check('资产附属设备', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/17e2fe27-290d-4ee9-bf17-ca3c0b2bffe7/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psAssCode=' + assetCode + '&psAssZcyz=' + zcyz + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psJeDecn=' + iiJeDecn + '&psSlDecn=' + iiSlDecn, 'ZCFSSB' + assetCode, '{"actionName":"EmptyFormload"}');
        },
        //附件
        AccessoryFile: function() {
            if (curCompanyCode == '') {
                $.notify.error("请选择核算组织。");
                return;
            }
            //获取选中行
            var selectRows = $(GDWebBizHandleConstants.ControllerID_MainXDataGrid).datagrid('getChecked');
            if (selectRows.length <= 0 || selectRows.length >= 2) {
                $.notify.error("请选择一行数据。");
                return;
            } else {
                if (!selectRows || selectRows == null || selectRows == undefined) {
                    $.notify.error("请选择一行数据。");
                    return;
                }
                //检查资产是否允许修改
                var assetCode = selectRows[0].GDZCZY_ZCBH;
                //mainSelf.check('资产附件', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/a72349a3-f215-4fee-a33d-86c9fda31348/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psAssCode=' + assetCode + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFuncflag=GDZCZY', 'ZCFJ' + assetCode, '{"actionName":"EmptyFormload"}');
                mainSelf.check('资产附件', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/027ee879-1259-48bd-b2f4-3b6e3177ba63/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psAssCode=' + assetCode + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFuncflag=GDZCZY', 'ZCFJ' + assetCode, '{"actionName":"EmptyFormload"}');
            }
            // var assetCode = mainSelf.listInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_ZCBH');
            // mainSelf.check('资产附件', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/05d121ac-6b5a-468c-8274-982371a07277/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psAssCode=' + assetCode + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFuncflag=GDZCZY', 'ZCFJ' + assetCode, '{"actionName":"EmptyFormload"}');
        },
        //复制资产卡片
        CopyAssetCard: function() {
            if (curCompanyCode == '') {
                $.notify.error("请选择核算组织。");
                return;
            }
            return mainSelf.OpenDialogChooseAsset();
        },
        OpenDialogChooseAsset: function() {
            debugger;
            mainSelf.context.setParam('curCompanyCode', curCompanyCode);
            mainSelf.context.setParam('curYear', curYear);
            mainSelf.context.setParam('curPeriod', curPeriod);
            mainSelf.context.setParam('authorityCondi', authorityCondi);
            //
            var $DialogChooseAsset = $('#IFrameChooseAssetDialog');
            if (!$DialogChooseAsset.data('dialog')) {
                ChooseAssetIsFirstShown = true;
                $DialogChooseAsset = $DialogChooseAsset.dialog({
                    width: 400,
                    height: 200,
                    modal: true,
                    // collapsible: false,
                    // minimizable: false,
                    // maximizable: false,
                    // resizable: false,
                    onClose: function() {
                        debugger;
                        return $.Deferred().resolve()
                            .then(function() {
                                //return $.Deferred().resolve();
                                var action = gsp.application.applicationContext.getParam('formAction');
                                if (action == 'CANCEL') {
                                    return $.Deferred().resolve();
                                } else if (action == 'OK') { //复制资产
                                    var copyAssetID = gsp.application.applicationContext.getParam('copyAssetID');
                                    var copyFssbFlag = gsp.application.applicationContext.getParam('copyFssbFlag');
                                    var copyFjFlag = gsp.application.applicationContext.getParam('copyFjFlag');
                                    var assetType = gsp.application.applicationContext.getParam('assetType');

                                    mainSelf.add('新增资产卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=F&psInitAsset=0&psAssetID=&psAssetCode=&psByIDorCode=ID&psCopyAssetID=' + copyAssetID + '&psCopyFssbFlag=' + copyFssbFlag + '&psCopyFjFlag=' + copyFjFlag + '&psAssetType' + assetType + '&psChangeTypeFlag=0&psParentFuncID=' + gsp.rtf.query.get("funcid") + '&psCurFuncID=ZCKPADD', 'ZCKPADD', '{"actionName":"EmptyFormload"}');
                                } else if (action == 'PreView') {
                                    return $.Deferred().resolve();
                                }
                            }).always(function() {
                                //移除遮罩
                                $('.window-mask').remove();
                            });
                    },
                    onLoad: function() {}
                });
            } else {
                ChooseAssetIsFirstShown = false;
                gsp.application.applicationContext.setParam('formAction', 'CANCEL');
            }

            mainSelf.DialogHandleMask();
            $DialogChooseAsset.dialog('show');
            //不是第一次打开，将不会自动执行表单加载事件，手动触发
            if (ChooseAssetIsFirstShown == false) {
                mainSelf.view.eventAgent(['ChooseAssetFormload'], 'IFrameChooseAsset', true)();
            }
        },
        /**
         * 弹窗处理遮罩
         */
        DialogHandleMask: function() {
            //处理遮罩
            var mask = $('.window-mask');
            var z_index = $('.window-shadow').css('z-index');
            z_index = parseInt(z_index);
            //if(mask.length<=0){//没有遮罩
            //屏幕width,height
            var body = $("div#ZW_WebVoucherWebForm.panel-body");

            if (body.lenght <= 0) {
                if (console && console.log)
                    console.log('未获取body');
            } else {
                var width = body.width(),
                    height = body.height();
                var newDiv = $("<div class='window-mask' style='width:" + width + "px;height:" + height + "px;display:block;z-index:" + (z_index - 1) + "'></div>")
                $('.window-shadow').parent().append(newDiv);
            }

            //}
            if (mask.length > 0)
                mask.css('display', 'block');
        },
        //打开弹出界面 不用
        OpenWindow: function(dialogID, methodFlag, formParam) {
            // var formParam = [curCompanyCode, curCompanyName, assetCode, curYear, curPeriod, curDate, iiJeDecn, iiSlDecn];
            // mainSelf.OpenWindow('#IFrame1Dialog', 'EquipmentFormload', formParam);
            var self = this;
            var $dia = $(dialogID);
            if ($dia.data('dialog')) {
                // 打开dialog之后再次打开dialog
                $dia.dialog('refresh');
                // 延时处理，等到界面加载完毕
                setTimeout(function() {
                    $dia.dialog('show').then(function() {
                        $('#d311f2d7-def1-472c-8620-1c3f507dc941').off('click').on('click', function() {
                            $dia.dialog('close');
                        });
                        // 清空数据源
                        gsp.application.applicationContext.injector.get('$model')('Instance_DM_GD_GDZCBJ').getDefaultInstance().dataSource = null;

                        var frameView = gsp.application.applicationContext.injector.get('$view')('IFrame1');
                        // 更新视图根元素
                        frameView.element = $('#IFrame1')[0];
                        // 初始化视图
                        frameView.init('IFrame1', $('#Form1'), null, self.context.newContext($('#IFrame1'), false, {}));
                    })
                }, 1000);
            } else {
                $dia = $dia.dialog({
                    modal: true,
                    width: 1200,
                    height: 500,
                    onLoad: function() {
                        //关闭按钮点击事件重写
                        $('#d311f2d7-def1-472c-8620-1c3f507dc941').off('click').on('click', function() {
                            $dia.dialog('close');
                        });
                        //新界面的状态机
                        gsp.application.invoke({
                            target: 'GDAssetEquipmentController',
                            methodName: methodFlag,
                            params: formParam,
                            scope: 'IFrame1'
                        });
                    }
                });
                $dia.dialog('open');
            }

            // $dia = $dia.dialog({
            //     modal: true,
            //     width: 1200,
            //     height: 500,
            //     onLoad: function() {
            //         //关闭按钮点击事件重写
            //         $('#d311f2d7-def1-472c-8620-1c3f507dc941').off('click').on('click', function() {
            //             $dia.dialog('close');
            //         });
            //         //新界面的状态机
            //         gsp.application.invoke({
            //             target: 'GDAssetEquipmentController',
            //             methodName: methodFlag,
            //             params: formParam,
            //             scope: 'IFrame1'
            //         });
            //     }
            // });
            // $dia.dialog('open');

        },

        //下载模板
        DownLoadModel: function() {
            //获取存储路径
            var domain = document.domain; //10.24.11.42
            var path = "http://" + domain + "/cwbase/web/fi/gd/file/GSGDCardTemplate.xls";
            var $eleForm = $("<form method='get'></form>");
            $eleForm.attr("action", path);
            $(document.body).append($eleForm);
            $eleForm.submit(); //提交表单，实现下载
        },
        //#endregion

        //#region 11
        //#endregion
    };
});