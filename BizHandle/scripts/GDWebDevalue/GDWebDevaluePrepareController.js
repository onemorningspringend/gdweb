gsp.module("gsp.app").controller("GDWebDevaluePrepareController", "CardController",
    function() {
        var MKID = "GD"; //模块ID
        var BIZOBJID = ""; //业务对象组ID
        var BIZOPID = ""; //业务对象ID
        var FUNCID = ""; //功能ID
        var FUNCNAME = ""; //功能名称
        var curCompanyCode = ""; //单位编号
        var curCompanyName = ""; //单位名称
        var curYear = ""; //年度
        var curPeriod = ""; //期间
        var curDate = ""; //8位业务日期
        var curUserID = ""; //用户ID
        var curUserName = ""; //用户显示名称
        var curUserCode = ""; //用户名（登陆用户名）
        var sfNjwc = ""; //是否年结完成
        var currGDqj = ""; //固定资产期间
        var curGDndqj = ""; //固定年度期间
        var sfJtzj = ""; //本月是否计提折旧
        var authorityCondi = ""; //权限条件
        var jedecn = 2; //金额精度默认为2
        var sldecn = 0; //数量精度默认为
        var isjzzbjcz = ""; //减值准备忽略净残值

        return {
            /**
             * 表单加载方法
             */
            Formload: function() {
                var wzself = this;
                var DWXZDialog = $('#IFrameDWXZDialog');
                var param = parseUrlParams(window.location); //从URL解析出的参数
                fsscflag = param["FSSCFLAG"] || '0';
                Operationfssc = param["OPTFLAG"];
                if (fsscflag === "1" && Operationfssc == "Create") {
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
                                return wzself.DevalueCardFormloadNormal();
                            }
                        });
                    }
                    DWXZDialog.dialog('show');
                } else {
                    return wzself.DevalueCardFormloadNormal();
                }
            },
            /**
             * 界面加载
             */
            DevalueCardFormloadNormal: function() {
                var wzself = this;
                loading = true;
                $.loading();
                var param = parseUrlParams(window.location); //从URL解析出的参数
                curUserName = gsp.rtf.context.get('UserName'); //获取用户名字
                if (fsscflag === "1" && Operationfssc === "Create") {
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

                return wzself.GetGDParams(curYear, curCompanyCode, curDate)
                    .then(function() {
                        wzself.SetUI(); //设置界面
                        wzself.BindDevalueSortPicking(); //减值类别帮助前事件
                        wzself.BindDevalueSortPicked(); //减值类别帮助后事件
                        wzself.BindDevalueSortClear(); //减值类别帮助取消事件
                        wzself.BindDevalueAssetPicking(); //减值资产帮助前事件
                        wzself.BindDevalueAssetPicked(); //减值资产帮助后事件
                        wzself.BindExitFunc();
                        if (param["OPTFLAG"] == "Edit" || param["OPTFLAG"] == "View") {
                            return wzself.loadData(param["dataId"]);
                        }
                    }).then(function() {
                        $.loaded();
                        window.parent.$.loaded();
                        loading = false;
                    });
            },
            /**
             * 计算市值
             */
            CalculateSZ: function() {
                var wzself = this;
                var sortcode = wzself.context.getParam('curSortCode');
                if (sortcode == null || sortcode == "" || sortcode == " ") {
                    return $.Deferred().reject();
                }
                var sortcodefunc = wzself.context.getParam('curSortCodeFunc');
                if (sortcodefunc == null || sortcodefunc == "" || sortcodefunc == " ") {
                    $.messager.alert('提示', "此减值类别未定义公式！", 'warning');
                    return $.Deferred().reject();
                }
                var devaluedata = wzself.cardInstance().dataSource.peek();
                var devaluedatalen = wzself.cardInstance().dataSource.peek().GDJZQD.length;
                if (devaluedata !== null && devaluedatalen > 0) {
                    return wzself.blockConfirm("提示", "将自动更新市值，是否继续？").then(function(result) {
                        if (result === "1") {
                            var params = [devaluedata, sortcode, true, curCompanyCode, curDate];
                            return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CalculateSZ", params).then(
                                function(result) {
                                    if (result) {
                                        var ServerData = result.data;
                                        var devaluedata = wzself.cardInstance().dataSource.peek();
                                        for (var i = 0; i < devaluedata.GDJZQD.length; i++) {
                                            wzself.cardInstance().dataSource.tables(0).rows(i).setValue("GDJZQD_ID", ServerData.GDJZQD[i]["GDJZQD_ID"]);
                                            wzself.cardInstance().dataSource.tables(0).rows(i).setValue("GDJZQD_SZ", ServerData.GDJZQD[i]["GDJZQD_SZ"]);
                                            wzself.cardInstance().dataSource.tables(0).rows(i).setValue("GDJZQD_YTJZ", ServerData.GDJZQD[i]["GDJZQD_YTJZ"]);
                                            wzself.cardInstance().dataSource.tables(0).rows(i).setValue("GDJZQD_ZDR", ServerData.GDJZQD[i]["GDJZQD_ZDR"]);
                                        }
                                    }
                                }).fail(function(result) {
                                $.messager.alert('提示', "无法计算市值！", 'warning');
                                return $.Deferred().reject();
                            })
                        } else {
                            return $.Deferred().reject();
                        }
                    });
                }
            },
            /**
             * 取消减值
             */
            ReDevalue: function() {
                var wzself = this;
                var devaluedata = wzself.cardInstance().dataSource.peek();
                for (var i = 0; i < devaluedata.GDJZQD.length; i++) {
                    wzself.cardInstance().dataSource.tables(0).rows(i).setValue("GDJZQD_SJ", 0);
                    wzself.cardInstance().dataSource.tables(0).rows(i).setValue("GDJZQD_SZ", 0);
                    wzself.cardInstance().dataSource.tables(0).rows(i).setValue("GDJZQD_JZZB", 0);
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
                            target: 'GDWebDevaluePrepareController',
                            methodName: 'DevalueCardCreate',
                            params: []
                        }]);
                        break;
                    case "Edit":
                        wzself.context.view().transitInvoke('Modify', [{
                            target: 'GDWebDevaluePrepareController',
                            methodName: 'DevalueCardEdit',
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
            DevalueCardCreate: function() {
                var wzself = this;
                $.loading();
                isADD = "1";
                return wzself.create().then(function() {}).then(function() {
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
            DevalueCardEdit: function() {
                var wzself = this;
                $.loading();
                loading = true;
                isADD = "0";
                if (wzself.cardInstance().dataSource.tables(0).rows(0)) {
                    var shr = wzself.cardInstance().dataSource.peek().GDJZQD[0].GDJZQD_SHR;
                    if (shr !== null && shr !== "" && shr !== " ") {
                        $.messager.alert('提示', "该减值已审核，不能编辑！", 'warning');
                        $.loaded();
                        loading = false;
                        return $.Deferred().reject();
                    }
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
             * 取消方法
             */
            DevalueCardCancel: function() {
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
             * 删除方法
             */
            DelDevalueforFssc: function() {
                var wzself = this;
                if (!wzself.cardInstance().dataSource.tables(0).rows(0)) {
                    $.messager.alert("提示", "不存在可以删除的数据", "warning");
                    return $.Deferred().reject(false);
                }
                var shr = wzself.cardInstance().dataSource.peek().GDJZQD[0].GDJZQD_SHR;
                if (shr !== null && shr !== "" && shr !== " ") {
                    $.messager.alert('提示', "该减值已审核，不能编辑！", 'warning');
                    $.loaded();
                    loading = false;
                    return $.Deferred().reject(false);
                }
                return $.Deferred().resolve();
            },
            /**
             * 保存方法
             */
            DevalueCardSave: function() {
                var wzself = this;
                var param = parseUrlParams(window.location);
                loading = true;
                $.loading();
                //获取数据源上的基本数据信息
                var sortcode = wzself.context.getParam('curSortCode');
                var bindingdata = wzself.cardInstance().dataSource.peek();
                var bindingdatalen = wzself.cardInstance().dataSource.peek().GDJZQD.length;

                if (bindingdata !== null && bindingdatalen > 0) {
                    var iscansave = wzself.CheckValidate(bindingdata, bindingdatalen);
                    if (iscansave == true) {
                        if (fsscflag === "1") {
                            if (param["OPTFLAG"] == "Create") {
                                return wzself.SavForDevalue(bindingdata, bindingdatalen, sortcode);
                            } else {
                                return wzself.SavForDevalue(bindingdata, bindingdatalen, sortcode);
                            }
                        }
                        return wzself.SavForDevalue(bindingdata, bindingdatalen, sortcode).then(function() {
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
                }
            },
            /**
             * 服务端保存减值方法
             */
            SavForDevalue: function(bindingdata, bindingdatalen, sortcode) {
                var wzself = this;
                var params = [bindingdata, sortcode, curCompanyCode, curDate];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "Save", params).then(
                    function() {
                        var assetcode = bindingdata.GDJZQD[0]["GDJZQD_ZCBH"];
                        //保存方法改了后台中的某些数据，需要重新绑定一下数据源才行
                        return wzself.RefreshDevalueCard(sortcode, assetcode).then(function() {
                            var dsforsave = wzself.ConvertSaveData();
                            if (fsscflag === "1") {
                                $.loaded();
                                return $.Deferred().resolve(dsforsave);;
                            }
                        })
                    }
                )
            },
            /**
             * 保存前数据检查
             */
            CheckValidate: function(bindingdata, bindingdatalen) {
                var wzself = this;
                wzself.SetZero();
                for (i = 0; i < bindingdatalen; i++) {
                    var vssj = parseFloat(bindingdata.GDJZQD[i]["GDJZQD_SJ"]).toFixed(jedecn);
                    if (Math[vssj > 0 ? "floor" : "ceil"](vssj) > 999999999999) {
                        $.messager.alert('提示', "资产的市价的整数部分不能超过12位，请修改！", 'warning');
                        return false;
                    }
                    var vssz = bindingdata.GDJZQD[i]["GDJZQD_SZ"];
                    if (Math[vssz > 0 ? "floor" : "ceil"](vssz).length > 999999999999) {
                        $.messager.alert('提示', "资产的市值的整数部分不能超过12位，请修改！", 'warning');
                        return false;
                    }
                    var vsjzst = bindingdata.GDJZQD[i]["GDJZQD_JZZB"];
                    if (Math[vsjzst > 0 ? "floor" : "ceil"](vsjzst).length > 999999999999) {
                        $.messager.alert('提示', "资产的实提减值的整数部分不能超过12位，请修改！", 'warning');
                        return false;
                    }
                    var vsjz = bindingdata.GDJZQD[i]["GDJZQD_JZ"]; //净值
                    var vsjcz = bindingdata.GDJZQD[i]["GDJZQD_JCZ"]; //净残值
                    var vsytjz = bindingdata.GDJZQD[i]["GDJZQD_YTJZ"]; //已提减值
                    var vsjtcz = bindingdata.GDJZQD[i]["GDJZQD_JTCZ"]; //是否计提残值
                    if (isjzzbjcz == "1" || vsjtcz == "1") {
                        if (vsjzst > vsjz - vsytjz) {
                            $.messager.alert('提示', "资产的实提减值必须小于资产现值（资产现值=资产原值-累计折旧-已提减值）！实提=" +
                                vsjzst + "；现值=" + (vsjz - -vsytjz) + "", 'warning');
                            return false;
                        }
                    } else {
                        if (vsjzst > (vsjz - vsjcz) - vsytjz) {
                            $.messager.alert('提示', "资产的实提减值必须小于资产现值（资产现值=资产原值-累计折旧-净残值-已提减值）！实提=" +
                                vsjzst + "；现值=" + ((vsjz - vsjcz) - vsytjz) + "", 'warning');
                            return false;
                        }
                    }
                }
                return true;
            },
            /**
             * 负数置零
             */
            SetZero: function() {
                var wzself = this;
                if ($('#XCheckBox1').attr('checked') == 'checked') {
                    for (var i = 0; i < wzself.cardInstance().dataSource.peek().GDJZQD.length; i++) {
                        var jzzb = wzself.cardInstance().dataSource.peek().GDJZQD[i].GDJZQD_JZZB;
                        if (jzzb < 0) {
                            wzself.cardInstance().dataSource.peek().GDJZQD[i].GDJZQD_JZZB = 0; //负数置零
                        }
                    }
                }
            },
            /**
             * 构造共享需要的数据
             */
            ConvertSaveData: function() {
                var wzself = this;
                var bindingdata = wzself.cardInstance().dataSource.peek();
                var bindingdatalen = wzself.cardInstance().dataSource.peek().GDJZQD.length;
                var sortcode = wzself.context.getParam('curSortCode');
                var ds = { "Table1": [{}] };
                for (var i = 0; i < bindingdatalen; i++) {
                    var rowNew = ds["Table1"][i];
                    rowNew["GDJZQD_ID"] = bindingdata.GDJZQD[i]["GDJZQD_ID"];
                    rowNew["GDJZQD_KJQJ"] = bindingdata.GDJZQD[i]["GDJZQD_KJQJ"];
                    rowNew["GDJZQD_DWBH"] = bindingdata.GDJZQD[i]["GDJZQD_DWBH"];
                    rowNew["GDJZQD_ZCBH"] = bindingdata.GDJZQD[i]["GDJZQD_ZCBH"];
                    rowNew["GDJZQD_ZCBH_GDZCZY_ZCMC"] = bindingdata.GDJZQD[i]["GDJZQD_ZCBH_GDZCZY_ZCMC"];
                    rowNew["GDJZQD_JZ"] = bindingdata.GDJZQD[i]["GDJZQD_JZ"];
                    rowNew["GDJZQD_SJ"] = bindingdata.GDJZQD[i]["GDJZQD_SJ"];
                    rowNew["GDJZQD_SZ"] = bindingdata.GDJZQD[i]["GDJZQD_SZ"];
                    rowNew["GDJZQD_JZZB"] = bindingdata.GDJZQD[i]["GDJZQD_JZZB"];
                    if (bindingdata.GDJZQD[i]["GDJZQD_ZDR"] == "")
                        rowNew["GDJZQD_ZDR"] = curUserName;
                    else
                        rowNew["GDJZQD_ZDR"] = bindingdata.GDJZQD[i]["GDJZQD_ZDR"];
                    rowNew["GDJZQD_SHR"] = bindingdata.GDJZQD[i]["GDJZQD_SHR"];
                    rowNew["GDJZQD_SHRQ"] = bindingdata.GDJZQD[i]["GDJZQD_SHRQ"];
                    rowNew["GDJZQD_BZ"] = bindingdata.GDJZQD[i]["GDJZQD_BZ"];
                    rowNew["GDJZQD_ZCSL"] = bindingdata.GDJZQD[i]["GDJZQD_ZCSL"];
                    rowNew["GDJZQD_ZCYZ"] = bindingdata.GDJZQD[i]["GDJZQD_ZCYZ"];
                    rowNew["GDJZQD_LJZJ"] = bindingdata.GDJZQD[i]["GDJZQD_LJZJ"];
                    rowNew["GDJZQD_YTJZ"] = bindingdata.GDJZQD[i]["GDJZQD_YTJZ"];
                    rowNew["GDJZQD_LJJZ"] = bindingdata.GDJZQD[i]["GDJZQD_LJJZ"];
                    rowNew["GDJZQD_JCZ"] = bindingdata.GDJZQD[i]["GDJZQD_JCZ"];
                    rowNew["GDJZQD_JTCZ"] = bindingdata.GDJZQD[i]["GDJZQD_JTCZ"];

                    if (fsscflag === "1") {
                        rowNew["curDate"] = curDate;
                        rowNew["Saveflag"] = "1";
                        rowNew["sortcode"] = sortcode;
                    }
                }
                return ds;
            },
            /**
             * 加载界面数据
             */
            SetUI: function() {
                var wzself = this;
                if (fsscflag == "1" && curCompanyCode !== "") {
                    //隐藏保存按钮
                    $('#Bar1').buttongroup('hideButton', 'c11a4bf4-6502-401a-af83-a21ecca55ea2'); //保存按钮
                }
                if (currGDqj == null || currGDqj == "") {
                    $.messager.alert('提示', "不存在会计期间，请检查！", 'warning');
                    return;
                }
                if (sfJtzj == "0") {
                    $.messager.alert('提示', "本月没有计提折旧，不能减值！", 'warning');
                    return;
                }
                wzself.SetGridJecn();
            },
            /**
             * 设置按钮是否可用,设置控件是否只读
             */
            SetBtnAndDev: function(ifsh) {
                var wzself = this;
                if (ifsh == true) {
                    //设置按钮和相关控件样式
                    $('#c019230b-6cb1-4258-9da3-73b2e214b23c').linkbutton('disable'); //计算市值
                    $('#b1ed0794-c37c-4a19-9da9-8da1dc0a3c17').linkbutton('disable'); //取消减值
                    $('#c11a4bf4-6502-401a-af83-a21ecca55ea2').linkbutton('disable'); //保存
                    $('#XCheckBox1').attr('disabled', true); //是否置零复选框
                    $('#Label1').show(); //已审核标签
                    $("#Label1").css({ 'color': 'red' }); //设置已审核标签这三个字为红色
                    //设置控件是否只读
                    $('#XCalculatorSJ').numberbox('textbox').attr('readOnly', true); //市价
                    $('#XCalculatorSZ').numberbox('textbox').attr('readOnly', true); //市值
                    $('#XCalculatorJZZB').numberbox('textbox').attr('readOnly', true); //实体减值
                    $('#XTextBoxBZ').attr('readonly', true); //备注
                } else {
                    $('#c019230b-6cb1-4258-9da3-73b2e214b23c').linkbutton('enable'); //计算市值
                    $('#b1ed0794-c37c-4a19-9da9-8da1dc0a3c17').linkbutton('enable'); //取消减值
                    $('#c11a4bf4-6502-401a-af83-a21ecca55ea2').linkbutton('enable'); //保存
                    $('#XCheckBox1').attr('enable', true); //是否置零复选框
                    $('#Label1').hide(); //已审核标签

                    $('#XCalculatorSJ').numberbox('textbox').attr('readOnly', false); //市价
                    $('#XCalculatorSZ').numberbox('textbox').attr('readOnly', false); //市值
                    $('#XCalculatorJZZB').numberbox('textbox').attr('readOnly', false); //实提减值
                    $('#XTextBoxBZ').attr('readonly', false); //备注
                }
            },
            /**
             * 设置datagrid中的市价、市值等字段可编辑
             */
            SetDatagridColReadonly: function(ifsh) {
                var wzself = this;
                if (ifsh == false) {
                    //设置datagrid可以编辑
                    wzself.gridHelper.bindClickEventForAll(wzself.view);
                }
            },
            /**
             * 减值类别帮助前事件
             */
            BindDevalueSortPicking: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZLB).on('OnDictEntryPicking', function(option, dataRow) {
                    var jzlb = $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZLB).adplookupbox('options').adp;
                    var condition = "[" + wzself.ArrangeCondition(" ", "GDJZLB_DWBH", " = ", "'" + curCompanyCode + "'", "Express", " ", " ") + "]";
                    jzlb.condition = condition;
                })
            },
            /**
             * 减值类别帮助后事件
             */
            BindDevalueSortPicked: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZLB).on('OnDictEntryPicked', function(option, dataRow) {
                    var devaluesort = dataRow[0].GDJZLB_JZLB;
                    wzself.context.setParam('curSortCode', devaluesort); //减值类别编号
                    var devaluesortfunc = dataRow[0].GDJZLB_SZGS;
                    wzself.context.setParam('curSortCodeFunc', devaluesortfunc); //减值类别公式
                })
            },
            /**
             * 减值类别取消帮助事件
             */
            BindDevalueSortClear: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZLB).on('onClear', function() {
                    $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZZC).adplookupbox('clear'); //清空智能帮助

                });
            },
            /**
             * 减值资产帮助前事件
             */
            BindDevalueAssetPicking: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZZC).on('OnDictEntryPicking', function(option, dataRow) {
                    var sortcode = wzself.context.getParam('curSortCode');
                    if (!sortcode) {
                        $(this).adplookupbox('close');
                        $.messager.alert('提示', "请先选择减值类别！", 'warning');
                        setTimeout(function() {
                            $(this).data('adplookupbox').isOpen = false;
                        }, 100);
                    } else {
                        var assetcodestr = "";
                        return wzself.GetDevalueAsset(sortcode).then(function(assetcodestr) {
                            if (assetcodestr) {
                                assetcodestr = assetcodestr;
                                var jzzc = $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZZC).adplookupbox('options').adp;
                                var condition = "[" + wzself.ArrangeCondition(" ", "GDZCZY_DWBH", " = ", "'" + curCompanyCode + "' and GDZCZY_ZCBH in('" + assetcodestr + "')", "Express", " ", " ") + "]";
                                jzzc.condition = condition;
                            }
                        })
                    }
                })
            },
            /**
             * 减值资产帮助后事件
             */
            BindDevalueAssetPicked: function() {
                var wzself = this;
                $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZZC).on('OnDictEntryPicked', function(option, dataRow) {
                    var assetcode = dataRow[0].GDZCZY_ZCBH;
                    var sortcode = wzself.context.getParam('curSortCode');
                    wzself.RefreshDevalueCard(sortcode, assetcode);
                })
            },
            /**
             * 服务端获取减值准备数据
             */
            GetDevalueAsset: function(sortcode) {
                var wzself = this;
                var assetcodestr = "";
                var params = [sortcode, curCompanyCode, curDate];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDevalueData", params).then(
                    function(result) {
                        if (result) {
                            //有的类别下没有资产会报错
                            if (typeof(result.data.GDJZQD[0]) !== "undefined") {
                                for (var i = 0; i < result.data.GDJZQD.length; i++) {
                                    assetcodestr += result.data.GDJZQD[i]["GDJZQD_ZCBH"] + "','";
                                }
                                assetcodestr = assetcodestr.substring(0, assetcodestr.length - 3);
                                return assetcodestr;
                            }
                        }
                    }).fail(function(result) {
                    $.messager.alert('提示', "获取减值信息失败。", 'warning');
                    return;
                });
            },
            /**
             * 获取过滤条件并刷新当前减值界面(异步)
             */
            RefreshDevalueCard: function(sortcode, assetcode) {
                var wzself = this;
                params = [sortcode, assetcode, curCompanyCode, curDate];
                return wzself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetSingleDevalueData", params).then(
                    function(result) {
                        if (result) {
                            //有的类别下没有资产会报错
                            if (typeof(result.data.GDJZQD[0]) !== "undefined") {
                                //绑定资产信息
                                var devalueds = {};
                                devalueds['GDJZQD'] = result.data.GDJZQD;
                                if (!wzself.cardInstance().schema && wzself.cardInstance().formID) {
                                    wzself.cardInstance().loadSchema(wzself.cardInstance().formID);
                                }
                                var datasource = wzself.cardInstance().dataSource = gsp.dataSource(devalueds, {
                                    name: wzself.cardInstance().dataSourceName,
                                    schema: wzself.cardInstance().schema,
                                    primaryKey: 'GDJZQD_ID'

                                });

                                wzself.bindData(datasource);
                                wzself.cardInstance().dataSource.tables(0).primaryKey = 'GDJZQD_ID';

                                var shr = wzself.cardInstance().dataSource.peek().GDJZQD[0].GDJZQD_SHR;
                                var ifsh = false;
                                if (shr !== null && shr !== "" && shr !== " ") {
                                    ifsh = true;
                                }
                                wzself.SetBtnAndDev(ifsh);
                            } else {
                                if (wzself.cardInstance().dataSource !== null) {
                                    wzself.cardInstance().dataSource.tables(0).clear();
                                }
                                wzself.SetBtnAndDev(false);
                            }
                        }
                    }).fail(function(result) {
                    $.messager.alert('提示', "获取减值信息失败。", 'warning');
                    return;
                });
            },
            /**
             * 设置减值卡片相关项目精度
             */
            SetGridJecn: function() {
                var wzself = this;
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardSLID, sldecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardYZID, jedecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardLJZJID, jedecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardJCZID, jedecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardJZID, jedecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardSJID, jedecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardSZID, jedecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardYTJZID, jedecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardLJJZID, jedecn);
                wzself.SetColumnDecn(GDWebBizHandleConstants.DevalueCardJZZBID, jedecn);
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
                        var companyHP = $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ);
                        var companyHelp = companyHP.adplookupbox('options').adp;
                        companyHelp.condition = "[" + wzself.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and " + result.data, "Express", " ", " ") + "]";
                        companyHP.on('OnDictEntryPicked', function(e, rowData, opts) {
                            var row = rowData[0] || rowData;
                            var newCompanyCode = row.LSBZDW_DWBH;
                            var newCompanyName = row.LSBZDW_DWMC;
                            if (!newCompanyCode) {
                                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ).adplookupbox('setValue', curCompanyCode);
                                $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ).adplookupbox('setText', curCompanyName);
                                return;
                            } else if (newCompanyCode === curCompanyCode) { //与原单位相同 退出
                                return;
                            } else {
                                //冲突检查
                                return wzself.CheckFunCt(newCompanyCode, FUNCID, FUNCNAME, curYear, "1", curUserID, curUserName)
                                    .then(function(result) {
                                        if (result) {
                                            //有冲突的 把单位帮助的数据转回
                                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ).adplookupbox('setValue', curCompanyCode);
                                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ).adplookupbox('setText', curCompanyName);
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
                                                if (wzself.cardInstance().dataSource !== null) {
                                                    wzself.cardInstance().dataSource.tables(0).clear(); //清空datagrid数据(直接把数据源清空)
                                                }
                                                $(GDWebBizHandleConstants.ControllerID_ZCJZSmartHelpJZLB).adplookupbox('clear'); //清空智能帮助
                                                wzself.BindDevalueSortPicking();
                                                wzself.SetUI();
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
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ).adplookupbox('setValue', curCompanyCode);
                            $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ).adplookupbox('setText', curCompanyName);
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
                            if (dicParams["GD_KJQJ"])
                                currGDqj = dicParams["GD_KJQJ"];
                            if (dicParams["GDndqj"])
                                curGDndqj = dicParams["GDndqj"];
                            if (dicParams["GD_SFJTZJ"])
                                sfJtzj = dicParams["GD_SFJTZJ"];
                            if (dicParams["GD_Authority"])
                                authorityCondi = dicParams["GD_Authority"];
                            if (dicParams["GD_JEDECN"])
                                jedecn = dicParams["GD_JEDECN"];
                            if (dicParams["GD_SLDECN"])
                                sldecn = dicParams["GD_SLDECN"];
                            if (dicParams["GD_JZZBJCZ"])
                                isjzzbjcz = dicParams["GD_JZZBJCZ"];
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
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ).adplookupbox('setValue', curCompanyCode);
                    $(GDWebBizHandleConstants.ControllerID_CompanySmartHelpforZCJZ).adplookupbox('setText', curCompanyName);
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
                if (currGDqj == "" || currGDqj == null) {
                    $.messager.alert('提示', "不存在会计期间，请检查！", 'warning');
                    return false;
                }
                if (sfJtzj == "0") {
                    $.messager.alert('提示', "本月没有计提折旧，不能减值！", 'warning');
                    return false;
                }
                if (sfNjwc === "2") {
                    $.messager.alert('提示', "本年度已经年结，不能进行减值！", 'warning');
                    return false;
                }
                if (sfNjwc === "3") {
                    $.messager.alert('提示', "上年度没有年结，不能进行本年度减值！", 'warning');
                    return false;
                }
                return true;
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
             * 组织智能帮助条件
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
             * 设置数字控件的精度
             * @param  {string} ID - 控件ID
             * @param  {string} precision - 精度
             */
            SetColumnDecn: function(ID, precision) {
                var wzself = this;
                precision = precision * 1;
                $('#' + ID).numberbox('options').precision = precision;
                $('#' + ID).numberbox('options').formatter = function(v, d, i) {
                    if (!v && v !== 0) {
                        return v;
                    } else {
                        return gc.accounting.formatMoney(v, '', precision, '');
                    }
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
            //形成弹窗的方法
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
)