gsp.module("gsp.app").controller("GDWebAllocationController", "ListController",
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
        var curPeriod = ""; //期间
        var curDate = ""; //8位业务日期
        var authorityCondi = ""; //权限条件
        var curUserName = ""; //用户显示名称
        var curUserCode = ""; //用户名（登陆用户名）
        var sfNjwc = ""; //是否年结完成
        var sfCswc = ""; //是否初始完成
        var currGDqj = ""; //固定会计期间
        var isNojtlc = ""; //计提控制
        var authorityCondi = ""; //权限条件
        var currGDqj = ""; //固定资产期间
        var curGDndqj = ""; //固定年度期间
        var sfJtzj = ""; //本月是否计提折旧
        var jedecn = 2; //金额精度，默认为2
        var sldecn = 0; //数量精度，默认为0
        var gshsxz = ""; //公司核算性质

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
                return wzself.GetFsscFilterCondi(curYear, curUserID, curUserName, curDate).then(function() {
                    if (!curCompanyCode) {
                        return wzself.GetFirstAuditMemberCommon(curYear, curUserID) //获取第一个符合的单位
                            .then(function() {
                                return wzself.GetGDParams(curYear, curCompanyCode, curDate); //获得公司参数
                            }).then(function() {
                                return wzself.CompanyCheck(curCompanyCode); //检查公司
                            });
                    } else {
                        return $.Deferred().resolve();
                    }
                }).then(function() {
                    wzself.SetUI(); //设置界面
                    wzself.BindExitFunc();
                }).then(function() {
                    $.loaded();
                    window.parent.$.loaded();
                    //return wzself.GetListData(curYear, curCompanyCode, currGDqj); //获取列表加载过滤条件
                    return wzself.RefreshAllocationList(curCompanyCode, curPeriod, authorityCondi); //获取明细加载过滤条件
                });
            },
            /**
             * 根据当前的参数构建需要传递的URL
             * @param  {String} CardID - 打开卡片的状态
             */
            MakeURL: function(state) {
                var listself = this;
                var URL = "";
                URL = "&KJQJ=" + currGDqj //会计期间
                    +
                    "&YEAR=" + curYear //会计年度
                    +
                    "&DATE=" + curDate //当前日期
                    +
                    "&COMPANYCODE=" + curCompanyCode //公司编号
                    +
                    "&OPTFLAG=" + state //当前状态
                    +
                    "&JEDECN=" + jedecn //金额精度    
                return URL;
            },
            /**
             * 资产调拨增加按钮
             */
            AllocateCreate: function() {
                var wzself = this;
                var ZCID = 'AllocateCreate'
                wzself.add('资产调拨卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAllocation/5f4b5bc8-a955-4f67-adc9-d74bc91db812/index.html?dataId=' + ZCID + wzself.MakeURL("Create"), ZCID, { "actionname": "AllocateCardFormload" });
            },
            /**
             * 资产调拨编辑按钮
             */
            AllocateEdit: function() {
                var wzself = this;
                var ZCID = $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked')[0]["GDZCDB_ID"];
                if ($(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked').length === 0) {
                    $.notify.info('请选择要编辑的数据！');
                    return false;
                }
                if ($(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked').length > 1) {
                    $.notify.info('请选择一条记录！');
                    return false;
                }
                var iscanedit = wzself.CheckIsCanEdit();
                if (iscanedit) {
                    wzself.edit('资产调拨卡片', '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAllocation/5f4b5bc8-a955-4f67-adc9-d74bc91db812/index.html?dataId=' + ZCID + wzself.MakeURL('Edit'), ZCID, { "actionname": "AllocateCardFormload" });
                }
            },
            /**
             * 资产调拨删除按钮
             */
            AllocateDelete: function() {
                var wzself = this;
                if ($(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked').length === 0) {
                    $.notify.info('请选择要删除的数据！');
                    return false;
                }
                if ($(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked').length > 1) {
                    $.notify.info('请选择一条记录！');
                    return false;
                }
                if (!wzself.CheckBizValidator()) {
                    return false;
                }
                return wzself.blockConfirm('提示', "确定对勾选记录进行删除？")
                    .then(function() {
                        var AllocateID = $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked')[0]["GDZCDB_ID"];
                        params = [AllocateID, curCompanyCode, curDate];
                        return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CancelAllocation", params);
                    }).then(function() {
                        return wzself.RefreshAllocationList(curCompanyCode, curPeriod, authorityCondi).then(function() {
                            $.messager.alert("提示", "删除完成！", "warning");
                        });
                    });
            },
            /** 
             * 合并(取消)确认
             */
            HBConfirm: function(flag) {
                var wzself = this;
                if ($(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked').length === 0) {
                    $.notify.info('请选择要确认的数据！');
                    return false;
                }
                if ($(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked').length > 1) {
                    $.notify.info('请选择一条记录！');
                    return false;
                }
                var row = $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked')[0]
                if (gshsxz == "0" && row["GDZCDB_DWBH"] == curCompanyCode) {
                    $.messager.alert("提示", "合并公司创建调拨，不需设置合并确认。", "warning");
                    return;
                }
                if (flag == "1") //确认
                {
                    //已确认直接返回
                    if (row["GDZCDB_CWQR"] == "1") {
                        $.messager.alert("提示", "该调拨已合并确认，不需再次确认。", "warning");
                        return;
                    }
                } else //取消确认
                {
                    //未确认直接返回
                    if (row["GDZCDB_CWQR"] == "0") {
                        $.messager.alert("提示", "该调拨未合并确认，不需取消确认。", "warning");
                        return;
                    }

                    //是否已调入确认
                    if (row["GDZCDB_DRCWQR"] == "1") {
                        $.messager.alert("提示", "此调拨已经调入确认，不可取消合并确认。", "warning");
                        return;
                    }
                }
                var allocateID = row["GDZCDB_ID"];
                var params = [allocateID, curYear, flag];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "HBConfirm", params).then(
                    function(result) {
                        if (result) {
                            if (flag == "1") {
                                row["GDZCDB_CWQR"] = "1";
                                $.notify.success("合并确认成功。");
                            } else {
                                row["GDZCDB_CWQR"] = "0";
                                $.notify.success("取消合并确认成功。");
                            }
                            wzself.RefreshAllocationList(curCompanyCode, curPeriod, authorityCondi);
                        }
                    }
                )
            },
            /**
             * 检查是否可以编辑
             */
            CheckIsCanEdit: function() {
                var wzself = this;
                var dbdw = $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked')[0]["GDZCDB_DWBH"];
                var cwqr = $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked')[0]["GDZCDB_CWQR"];
                if (gshsxz == "0" && dbdw !== curCompanyCode) {
                    $.messager.alert('提示', "合并公司不允许编辑普通公司创建的调拨单。", 'warning');
                    return false;
                }
                if (gshsxz == "2" && cwqr == "1") {
                    $.messager.alert('提示', "此调拨已合并确认，不允许编辑。", 'warning');
                    return false;
                }
                return true;
            },
            /**
             * 检查删除是否合法
             */
            CheckBizValidator: function() {
                var wzself = this;
                var dbdw = $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked')[0]["GDZCDB_DWBH"];
                var zdr = $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('getChecked')[0]["GDZCDB_ZDR"];
                if (gshsxz == "0" && dbdw !== curCompanyCode) {
                    $.messager.alert('提示', "合并公司不允许删除普通公司创建的调拨单。", 'warning');
                    return false;
                }
                if (zdr !== "" && zdr !== curUserName) {
                    $.messager.alert('提示', "该调拨资产不允许非制单人删除.", 'warning');
                    return false;
                }
                return true;
            },
            /**
             * 设置界面
             */
            SetUI: function() {
                //设置精度
                var wzself = this;
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_DBSL', sldecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_ZJYF', sldecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_DRZJYF', sldecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_DBYZ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_DRYZ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_LJZJ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_DRLJZJ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_DCJCZ', jedecn);
                wzself.SetColumnsJecn(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB, 'GDZCDB_DRJCZ', jedecn);

                //普通公司不显示合并确认按钮和取消合并确认按钮
                if (gshsxz !== "0") {
                    $('#presetBar').buttongroup('hideButton', '2dad43f2-13b2-43bc-897a-7e3b071f0fec'); //合并确认
                    $('#presetBar').buttongroup('hideButton', 'bc361917-9d91-4378-9cb4-007308330f96'); //取消确认
                } else {
                    $('#presetBar').buttongroup('showButton', '2dad43f2-13b2-43bc-897a-7e3b071f0fec'); //合并确认
                    $('#presetBar').buttongroup('showButton', 'bc361917-9d91-4378-9cb4-007308330f96'); //取消确认
                }
            },
            /**
             * 获取第一个符合要求的单位
             */
            GetFirstAuditMemberCommon: function(curYear, curUserID) {
                var wzself = this;
                //调用服务端方法的参数
                var params = ["", "0", "1", " AND (LSBZDW_TYBZ = '0' OR LSBZDW_TYND > '" + curYear + "')", curCompanyName, FUNCID, curUserID, curYear, BIZOBJID, BIZOPID, MKID];
                var dataService = wzself.context.injector.get('$dataServiceProxy'); //服务端获取第一个符合要求的单位方法
                return dataService.invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetFirstAuditMemberCommon", params).then(
                    function(result) {
                        if (result) {
                            curCompanyCode = result.data; //获取核算单位的编号
                            wzself.context.setParam('strCompanyCode', curCompanyCode);
                            curCompanyName = result.outParams; //获取核算单位的名字
                            //给当前核算单位符默认值
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB).adplookupbox('setValue', curCompanyCode);
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB).adplookupbox('setText', curCompanyName);
                        };
                    },
                    function() {
                        setTimeout(function() {
                            wzself.close();
                        }, 2000);
                    }
                )
            },
            /**
             * 获取公司参数
             */
            GetGDParams: function(curYear, curCompanyCode, curDate) {
                var wzself = this;
                var params = [curCompanyCode, curYear, curDate, "ASSETLIST"];
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
                            if (dicParams["GD_NOJTZJ"])
                                isNojtlc = dicParams["GD_NOJTZJ"];
                            if (dicParams["GD_Authority"])
                                authorityCondi = dicParams["GD_Authority"];
                            if (dicParams["GD_JT_BG_TYPE"])
                                bglxContJTBGOrder = dicParams["GD_JT_BG_TYPE"];
                            if (dicParams["GD_JT_BG"])
                                jtBoforeBg = dicParams["GD_JT_BG"];
                            if (dicParams["GD_JT_DB"])
                                firstJtThenBiz = dicParams["GD_JT_DB"];
                            if (dicParams["GDndqj"])
                                curGDndqj = dicParams["GDndqj"];
                            if (dicParams["GD_SFJTZJ"])
                                sfJtzj = dicParams["GD_SFJTZJ"];
                            if (dicParams["GD_ZDRSC"])
                                zdrSc = dicParams["GD_ZDRSC"];
                            if (dicParams["GD_JEDECN"])
                                jedecn = dicParams["GD_JEDECN"];
                            if (dicParams["GD_SLDECN"])
                                sldecn = dicParams["GD_SLDECN"];
                            if (dicParams["GD_GSHSXZ"])
                                gshsxz = dicParams["GD_GSHSXZ"];
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
                    // if (!curCompanyCode) {
                    //     // curCompanyCode = '';
                    //     // curCompanyName = '';
                    // }
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB).adplookupbox('setValue', curCompanyCode);
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB).adplookupbox('setText', curCompanyName);
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
                if (sfNjwc === "2") {
                    $.messager.alert('提示', "本年度已经年结，不能进行调拨业务！", 'warning');
                    return false;
                }
                if (sfNjwc === "3") {
                    $.messager.alert('提示', "上年度没有年结，不能进行调拨业务！", 'warning');
                    return false;
                }
                /*if (sfCswc !== "1") {
                    $.messager.alert('提示', "系统初始化没有完成，不能进行调拨业务！", 'warning');
                    return false;
                }*/
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
                        var companyHP = $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB);
                        var companyHelp = companyHP.adplookupbox('options').adp;
                        companyHelp.condition = "[" + wzself.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and " + result.data, "Express", " ", " ") + "]";
                        companyHP.on('OnDictEntryPicked', function(e, rowData, opts) {
                            var row = rowData[0] || rowData;
                            var newCompanyCode = row.LSBZDW_DWBH;
                            var newCompanyName = row.LSBZDW_DWMC;
                            if (!newCompanyCode) {
                                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB).adplookupbox('setValue', curCompanyCode);
                                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB).adplookupbox('setText', curCompanyName);
                                return;
                            } else if (newCompanyCode === curCompanyCode) { //与原单位相同 退出
                                return;
                            } else {
                                //冲突检查
                                return wzself.CheckFunCt(newCompanyCode, FUNCID, FUNCNAME, curYear, "1", curUserID, curUserName)
                                    .then(function(result) {
                                        if (result) {
                                            //有冲突的 把单位帮助的数据转回
                                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB).adplookupbox('setValue', curCompanyCode);
                                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCDB).adplookupbox('setText', curCompanyName);
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
                                                var uptParam = [curUserID, FUNCID, newCompanyCode, curYear];
                                                wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "UptFuncConflict", uptParam);
                                                //刷新界面
                                                wzself.SetUI();
                                                //刷新绑定数据
                                                return wzself.RefreshAllocationList(curCompanyCode, curPeriod, authorityCondi);
                                                //return wzself.RefreshAllocationListMx(curCompanyCode, curYear, curGDndqj, currGDqj, authorityCondi);
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
             * 获取列表数据
             */
            GetListData: function() {
                var wzself = this;
                var params = [curYear, curCompanyCode, currGDqj];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetListData", params).then(
                    function(result) {
                        //绑定资产信息
                        // $(GDWebBizHandleConstants.ControllerID_MainXDataGridforZCDB).datagrid('loadData', {
                        //         total: 20,
                        //         rows: result.data.Table
                        //     })
                        //将当前数据绑定到数据模型上
                        var allocateds = {};
                        allocateds['GDZCDB'] = result.data.Table;
                        if (!wzself.listInstance().schema && wzself.listInstance().formID) {
                            wzself.listInstance().loadSchema(wzself.listInstance().formID);
                        }
                        var datasource = wzself.listInstance().dataSource = gsp.dataSource(allocateds, {
                            name: wzself.listInstance().dataSourceName,
                            schema: wzself.listInstance().schema,
                            primaryKey: 'GDZCDB_ID'

                        });

                        wzself.bindData(datasource);
                        wzself.listInstance().dataSource.tables(0).primaryKey = 'GDZCDB_ID';
                    })
            },
            /**
             * 获取过滤条件并刷新当前调拨列表(异步)
             */
            RefreshAllocationList: function(curCompanyCode, currGDqj, authorityCondi) {
                var wzself = this;
                var condi = "[" + wzself.ArrangeCondition(" ", "GDZCDB_KJQJ", " =", "'" + curPeriod + "' and (GDZCDB_DWBH = '" + curCompanyCode + "' OR GDZCDB_DCDWBH IN" +
                    " (select LSBZDW_DWBH from LSBZDW where LSBZDW_DWNM like (select LSBZDW_DWNM+'_%' from LSBZDW where LSBZDW_DWBH='" + curCompanyCode + "')) " +
                    " AND GDZCDB_DRDWBH in (select LSBZDW_DWBH from LSBZDW where LSBZDW_DWNM like (select LSBZDW_DWNM+'_%' from LSBZDW where LSBZDW_DWBH='" + curCompanyCode + "'))) " + authorityCondi, "Express", " ", " ") + "]";
                var order = "#GDZCDB_DCDWBH# ASC,#GDZCDB_DRDWBH# ASC,#GDZCDB_DCZCBH# ASC,#GDZCDB_DRZCBH# ASC ";
                return wzself.load(condi, order);
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
            /**
             * 绑定退出事件，删除cookie
             */
            BindExitFunc: function() {
                var wzself = this;
                $(document).on('frameclose', function() {
                    document.cookie = '';
                });
            }
        }
    }
);