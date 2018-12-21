gsp.module("gsp.app").controller("GDWebReduceCardController", "CardController", ['BizHandlePub', function(Pub) {
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
    var curUserID = ""; //用户ID
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
    var OperationFlag = ''; //操作标志位 1：查看 2：新增 3：编辑 4：财务确认 5：共享中心
    var linkedFlag = ''; //联查标志位
    var dicParams = {}; //公司参数列表
    var JsDefZc = ''; //减少默认暂存
    var IsJsjeReadonly = ''; //资产减少卡片金额是否只读
    var jt_bg = '';
    var loading = false //用来屏蔽第一次加载不触发的方法
    var ZcTotalSl = 0; //数量
    var ZcTotalYz = 0; //原值
    var ZcTotalZj = 0; //折旧
    var ZcTotalJcz = 0; //净残值
    var ZcTotalJzzb = 0;
    var ZcTotalYgzl = 0; //工作量
    var isADD = "0"; //是否是新增状态 1:新增 0：其他状态
    var CancelFlag = false;
    var lbbh = "%";
    var dsOthXsxm = {}; //自定义项目集合
    var dsOthValue = {}; //自定义值的集合
    var dsBackups = {};
    var close = false;
    var parentFuncId = ''; //父窗口ID
    var fsscflag = '0'; //共享中心flag 判断是否由共享中心进入
    var aftersaveresult = {};
    var Operationfssc = ''; //共享中心操作

    return {
        ReduceCardFormload: function() {
            var cardself = this;
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
                            return cardself.ReduceCardFormloadNormal();
                        }
                    });
                }
                DWXZDialog.dialog('show');
            } else {
                return cardself.ReduceCardFormloadNormal();
            }
        },
        /**
         * 界面加载方法
         * @param  {String} billId - 单据编号
         */
        loadJSData: function(billId) {
            var cardself = this;
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetReduceInfo", [billId])
                .then(function(result) {
                    if (!cardself.cardInstance().schema && cardself.cardInstance().formID) {
                        cardself.cardInstance().loadSchema(cardself.cardInstance().formID);
                    }
                    var datasource = cardself.cardInstance().dataSource = gsp.dataSource({ GDJSZC: result.data["Table"] }, {
                        name: cardself.cardInstance().dataSourceName,
                        schema: cardself.cardInstance().schema
                    });

                    return cardself.bindData(datasource);
                });
        },
        /**
         * 界面加载方法
         */
        ReduceCardFormloadNormal: function() {
            var cardself = this;
            curUserID = gsp.rtf.context.get('UserID'); //获取用户ID
            loading = true;
            $.loading();
            var param = parseUrlParams(window.location); //从URL解析出的参数
            // if (fsscflag === "1") {//共享模式不从URL中解析参数
            //     if (Operationfssc !== "Create") {
            //         return cardself.GetCompany(param['dataId']).then(function () {
            //             return cardself.GetGDParams(curYear, curCompanyCode, curDate);
            //         }).then(function () {
            //             cardself.SetProperValueByPass(param);//给属性赋值
            //             cardself.SetCalcDecnDisplay();//设置精度
            //             cardself.SetUIDisplay(OperationFlag);//设置界面显示
            //             return cardself.loadJSData(param['dataId']);
            //         }).then(function () {
            //             cardself.ChangeState(OperationFlag);//更改表单状态
            //             return cardself.AddJsXsxm();//新增状态下不重复走此方法
            //         }).then(function () {
            //             $.loaded();
            //             window.parent.$.loaded();
            //             loading = false;
            //         }).fail(function () {
            //             $.loaded();
            //         });
            //     }
            //     param["YEAR"] = curYear;
            //     param["COMPANYCODE"] = curCompanyCode;
            //     param["DATE"] = curDate;
            // }
            if (fsscflag === "1" && Operationfssc === "Create") {
                param["YEAR"] = curYear;
                param["COMPANYCODE"] = curCompanyCode;
                param["DATE"] = curDate;
            }
            if (!param["YEAR"]) {
                param["YEAR"] = param["DATE"].substring(0, 4);
            }
            return cardself.GetGDParams(param["YEAR"], param["COMPANYCODE"], Pub.FormatDate8(param["DATE"]))
                .then(function() {
                    cardself.SetProperValueByPass(param); //给属性赋值
                    cardself.SetCalcDecnDisplay(); //设置精度
                    cardself.SetUIDisplay(OperationFlag); //设置界面显示
                    cardself.RegistEvent(); //注册帮助
                    cardself.BindExitFunc(); //绑定退出事件
                    return cardself.loadData(param['dataId']); //加载表单数据
                }).then(function() {
                    cardself.ChangeState(OperationFlag); //更改表单状态
                    if (OperationFlag !== "2") {
                        return cardself.AddJsXsxm(); //新增状态下不重复走此方法
                    } else {
                        return $.Deferred().resolve();
                    }
                }).then(function() {
                    $.loaded();
                    window.parent.$.loaded();
                    loading = false;
                });
        },
        /**
         * 获得公司参数（异步）
         * @param  {String} year - 会计年度
         * @param  {String} companyCode - 公司编号
         * @param  {String} date - 业务日期
         */
        GetGDParams: function(year, companyCode, date) {
            var cardself = this;
            var params = [companyCode, year, date, "REDUCECARD"];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetDwParams", params)
                .then(function(result) {
                    if (result) {
                        dicParams = result.data;
                    }
                    var params = [companyCode, year, date, "REDUCELIST"];
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
         * 保存方法
         */
        ReduceCardSave: function() {
            var cardself = this;
            loading = true;
            $.loading();
            if (cardself.Validate()) {
                if (fsscflag === "1") {
                    return cardself.SaveReduceBill();
                }
                return cardself.SaveReduceBill().then(function() {
                    //cardself.refreshParentFunc();//刷新父级界面
                    //debugger;
                    //执行重新加载数据的方法
                    //var _fid = parentFuncID.replace(/adp_/g, "");
                    //gsp.rtf.func.refreshFunc("GDWEB102");
                    cardself.notifyGlobalParent();
                    $.loaded();
                    dsBackups = $.extend(true, {}, cardself.cardInstance().dataSource.tables(0).rows(0).peek());
                    $.notify.success("保存成功");
                    CancelFlag = true;
                    loading = false;
                    isADD = "0";
                });
            } else {
                cardself.cancelAction();
                loading = false
                $.loaded()
                return $.Deferred().reject();
            }
        },
        /**
         * 保存前校验
         */
        Validate: function() {
            var cardself = this;
            var row = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var zcbh = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID];
            var jsyy = row[GDWebBizHandleConstants.XPATH_GDJSZC_QXBH];
            var tempJssl = Pub.toDecimal(row[GDWebBizHandleConstants.XPATH_GDJSZC_JSSL], slDecn) * 1;
            var tempJsyz = Pub.toDecimal(row[GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ], jeDecn) * 1;
            var tempJscz = Pub.toDecimal(row[GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ], jeDecn) * 1;
            var tempJsgz = Pub.toDecimal(row[GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ], jeDecn) * 1;
            var tempJszj = Pub.toDecimal(row[GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ], jeDecn) * 1;
            var tempJsjz = Pub.toDecimal(row[GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ], jeDecn) * 1;

            if (!zcbh) {
                $.messager.alert("提示", "资产编号不能为空！", "warning");
                return false;
            }
            if (!jsyy) {
                $.messager.alert("提示", "请输入减少原因！", "warning");
                return false;
            }
            if (tempJssl > ZcTotalSl) {
                $.messager.alert("提示", "减少数量不允许超过资产数量。", "warning");
                return false;
            }
            if (tempJssl <= 0) {
                $.messager.alert("提示", "减少数量必须大于0。", "warning");
                return false;
            }
            if (tempJssl === ZcTotalSl) {
                if (tempJsyz != ZcTotalYz) {
                    $.messager.alert("提示", "完全减少时减少原值必须与资产原值一致！", "warning");
                    return false;
                }
                if (tempJscz != ZcTotalJcz) {
                    $.messager.alert("提示", "完全减少时减少残值必须与资产净残值一致！", "warning");
                    return false;
                }
                if (tempJsgz != ZcTotalYgzl) {
                    $.messager.alert("提示", "完全减少时减少工作量必须与资产工作量一致！", "warning");
                    return false;
                }
                if (tempJszj != ZcTotalZj) {
                    $.messager.alert("提示", "完全减少时减少折旧必须与资产折旧一致！", "warning");
                    return false;
                }
                if (tempJsjz != ZcTotalJzzb) {
                    $.messager.alert("提示", "完全减少时减少减值必须与资产减值准备一致！", "warning");
                    return false;
                }
            }
            //部分减少时减少金额不能超过原有的值
            if (tempJsyz > ZcTotalYz) {
                $.messager.alert("提示", "减少原值不允许超过原资产原值！", "warning");
                return false;
            }
            if (tempJscz > ZcTotalJcz) {
                $.messager.alert("提示", "减少残值不允许超过原资产净残值！", "warning");
                return false;
            }
            if (tempJsgz > ZcTotalYgzl) {
                $.messager.alert("提示", "减少工作量不允许超过原资产工作量！", "warning");
                return false;
            }
            if (tempJszj > ZcTotalZj) {
                $.messager.alert("提示", "减少折旧不允许超过原资产折旧！", "warning");
                return false;
            }
            if (tempJsjz > ZcTotalJzzb) {
                $.messager.alert("提示", "减少减值不允许超过原资产减值准备！", "warning");
                return false;
            }
            //部分减少是减少金额不能小于0
            if (tempJsyz < 0) {
                $.messager.alert("提示", "减少原值不能小于0！", "warning");
                return false;
            }
            if (tempJscz < 0) {
                $.messager.alert("提示", "减少残值不能小于0！", "warning");
                return false;
            }
            if (tempJsgz < 0) {
                $.messager.alert("提示", "减少工作量不能小于0！", "warning");
                return false;
            }
            if (tempJszj < 0) {
                $.messager.alert("提示", "减少折旧不能小于0！", "warning");
                return false;
            }
            if (tempJsjz < 0) {
                $.messager.alert("提示", "减少减值不能小于0！", "warning");
                return false;
            }
            //部分减少后，减少后的资产要满足：原值-净残值-累计折旧-减值准备>=0
            var jshYz = ZcTotalYz - tempJsyz;
            var jshJcz = ZcTotalJcz - tempJscz;
            var jshLjzj = ZcTotalZj - tempJszj;
            var jshJzzb = ZcTotalJzzb - tempJsjz;
            var sfjtcz = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID_GDZCZY_JTCZ] + '';
            if (sfjtcz === "1") {
                if (jshYz - jshLjzj - jshJzzb < 0) {
                    $.messager.alert("提示", "减少后的资产不满足公式：原值-累计折旧-减值准备≥0，请修改！", "warning");
                    return false;
                }
            } else {
                if (jshYz - jshJcz - jshLjzj - jshJzzb < 0) {
                    $.messager.alert("提示", "减少后的资产不满足公式：原值-净残值-累计折旧-减值准备≥0，请修改！", "warning");
                    return false;
                }
            }
            var tabValue = Pub.FormatDate8(row[GDWebBizHandleConstants.XPATH_GDJSZC_JSRQ]).substring(0, 6);
            if (!tabValue) {
                $.messager.alert("提示", "请输入减少日期", "warning");
                return false;
            }
            var strDQRQ = curYear + curPeriod;
            if (tabValue !== strDQRQ) {
                $.messager.alert("提示", "减少日期不在当前期间内。", "warning");
                return false;
            }
            var JSZY = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZY];
            if (Pub.CheckTextLength(JSZY) > 60) {
                $.messager.alert("提示", "摘要长度超长，请修改！", "warning");
                return false;
            }
            return true;
        },
        /**
         * 保存后操作
         */
        AfterSave: function() {
            var cardself = this;
            cardself.SynchReduceBill();
            cardself.notifyGlobalParent();
            return function() {
                if (JSON.stringify(aftersaveresult) === "{}") {
                    aftersaveresult = cardself.cardInstance().dataSource.tables(0).rows(0).getValue(GDWebBizHandleConstants.XPATH_GDJSZC_ID);
                }
                return cardself.loadData(aftersaveresult);
            }().then(function() {
                $.loaded();
            });
        },
        /**
         * 保存到服务端方法
         */
        SaveReduceBill: function() {
            var cardself = this;
            var ds = cardself.ConvertSaveDataSet();
            if (fsscflag === "1") {
                $.loaded();
                return $.Deferred().resolve(ds);
            }
            return cardself.SaveCarry(ds).then(function(result) {
                //保存成功后，要回写Card部分列的值
                aftersaveresult = result.data;
                return cardself.AfterSave();
            });
        },
        /**
         * 共享下保存到服务端的方法
         */
        SaveCarryforFSSC: function(ds) {
            var cardself = this;
            return $.Deferred().resolve(ds);
        },
        /**
         * 保存核心方法
         * @param  {Object} ds - 数据集
         */
        SaveCarry: function(ds) {
            var cardself = this;
            if (isADD === "1") {
                return cardself.SaveForAdd(ds);
            } else {
                if (OperationFlag === "4")
                    return cardself.SaveForConfig(ds);
                else
                    return cardself.SaveForEdit(ds);
            }
        },
        /**
         * 保存新增状态单据
         * @param  {Object} ds - 数据集
         */
        SaveForAdd: function(ds) {
            var cardself = this;
            var isZc = false;
            if ($('#XCheckBox_ZC').attr("checked") === "checked") {
                isZc = true;
            }
            var params = [ds, curPeriod, jeDecn, isZc, curCompanyCode, curDate];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "SaveReduceBiz", params)
                .then(function(result) {
                    cardself.cardInstance().dataSource.tables(0).rows(0).setValue(GDWebBizHandleConstants.XPATH_GDJSZC_ID, result.data);
                    return result;
                }).fail(function() {
                    $.notify.error("保存失败！");
                    cardself.cancelAction();
                });
        },
        /**
         * 保存确认状态单据
         * @param  {Object} ds - 数据集
         */
        SaveForConfig: function(ds) {
            var cardself = this;
            var row = ds["Table1"][0];
            var billId = row[GDWebBizHandleConstants.XPATH_GDJSZC_ID];
            if (!billId) {
                $.messager.alert('提示', '未获取到减少单据的内码。', "warning");
                cardself.cancelAction();
                return $.Deferred().reject();
            }
            var zcbh = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
            var params = [ds, curPeriod, jeDecn, curCompanyCode, curDate];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "SaveRedceForCon", params)
                .fail(function() {
                    $.notify.error("保存失败！");
                    cardself.cancelAction();
                });;
        },
        /**
         * 保存编辑状态单据
         * @param  {Object} ds - 数据集
         */
        SaveForEdit: function(ds) {
            var cardself = this;
            var row = ds["Table1"][0];
            var billId = row[GDWebBizHandleConstants.XPATH_GDJSZC_ID];
            if (!billId) {
                $.messager.alert('提示', '未获取到减少单据的内码。', "warning");
                cardself.cancelAction();
                return $.Deferred().reject();
            }
            var zcbh = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
            var params = [billId, zcbh, curPeriod, jeDecn, ds, curCompanyCode, curDate];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "EditReduce", params)
                .fail(function() {
                    $.notify.error("保存失败！");
                    cardself.cancelAction();
                });;
        },
        SynchReduceBill: function() {
            var cardself = this;
            var row = cardself.cardInstance().dataSource.tables(0).rows(0);
            row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSQSL, ZcTotalSl);
            row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSQYZ, ZcTotalYz);
            row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSQZJ, ZcTotalZj);
            row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSQJZZB, ZcTotalJzzb);
            row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSQGZ, ZcTotalYgzl);
        },
        /**
         * 构造保存的对象
         */
        ConvertSaveDataSet: function() {
            var cardself = this;
            var row = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var ds = { "Table1": [{}] };
            var rowNew = ds["Table1"][0];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSRQ] = Pub.FormatDate8(row[GDWebBizHandleConstants.XPATH_GDJSZC_JSRQ]);
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID] = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH] = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSDH] = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSDH];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_QXBH] = row[GDWebBizHandleConstants.XPATH_GDJSZC_QXBH];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_ZTBH] = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZTBH];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_ZY] = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZY];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSSL] = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSSL];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ] = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ] = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ] = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ] = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ] = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_CWQR] = row[GDWebBizHandleConstants.XPATH_GDJSZC_CWQR];
            rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_ID] = row[GDWebBizHandleConstants.XPATH_GDJSZC_ID];
            rowNew["GDJSZC_ZCMC"] = row["GDJSZC_ZCID_GDZCZY_ZCMC"];
            rowNew["GDJSZC_DWBH"] = curCompanyCode;
            rowNew["GDJSZC_ZDR"] = gsp.rtf.context.get('UserName');
            rowNew["curUserID"] = curUserID;
            if (fsscflag === "1") {
                rowNew[GDWebBizHandleConstants.XPATH_GDJSZC_JSRQ] = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSRQ];
                rowNew["curPeriod"] = curPeriod;
                rowNew["jeDecn"] = jeDecn;
                rowNew["slDecn"] = slDecn;
                rowNew["curCompanyCode"] = curCompanyCode;
                rowNew["curDate"] = curDate;
                if (isADD === "1") { //保存新增状态的单据
                    if ($('#XCheckBox_ZC').attr("checked") === "checked") {
                        isZc = true;
                    } else {
                        isZc = false;
                    }
                    rowNew["isZc"] = isZc;
                    rowNew["Saveflag"] = "1";
                } else {
                    if (OperationFlag === "4")
                        rowNew["Saveflag"] = "0";
                    else
                        rowNew["Saveflag"] = "2";
                }
            }
            return ds;
        },
        /**
         * 保存并新增方法
         */
        ReduceCardSAC: function() {
            var cardself = this;
            return cardself.ReduceCardSave().then(function() {
                return cardself.ReduceCardCreate();
            });
        },
        /**
         * 取消方法
         */
        ReduceCardCancel: function() {
            var cardself = this;
            loading = true;

            if (CancelFlag === false && OperationFlag === "2" && fsscflag !== "1") {
                loading = false;
                return cardself.close().fail(function() {
                    cardself.cancelAction();
                    isADD = "0";
                });
            } else {
                return cardself.cancel().then(function() {
                    if (cardself.cardInstance().dataSource.tables(0).rows(0)) {
                        dsBackups = $.extend(true, {}, cardself.cardInstance().dataSource.tables(0).rows(0).peek());
                    }
                    if (isADD === "1") {
                        return cardself.AddJsXsxm();
                    } else {
                        return $.Deferred().resolve();
                    }
                }).then(function() {
                    isADD = "0";
                    loading = false;
                });
            }

        },
        /**
         * 编辑方法
         */
        ReduceCardEdit: function() {
            var cardself = this;
            $.loading();
            loading = true;
            isADD = "0";
            if (cardself.cardInstance().dataSource.tables(0).rows(0)) {
                var row = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            } else {
                $.messager.alert('提示', "不存在可编辑的数据！", 'warning');
                $.loaded();
                loading = false;
                return $.Deferred().reject();
            }
            return cardself.CheckEditValidator(row).then(function() {
                if (!cardself.SetTotalValue(row)) {
                    $.messager.alert('提示', "该资产是旧系统的资产减少数据，无法修改，请删除后新增。", 'warning');
                    $.loaded();
                    loading = false;
                    return $.Deferred().reject();
                } else {
                    cardself.edit();
                    dsBackups = $.extend(true, {}, cardself.cardInstance().dataSource.tables(0).rows(0).peek());
                    loading = false;
                    $.loaded();
                }
            }).fail(function() {
                cardself.cancelAction();
                loading = false;
                $.loaded();
            });;
        },
        /**
         * 新增方法
         */
        ReduceCardCreate: function() {
            var cardself = this;
            $.loading();
            loading = true;
            isADD = "1";
            return cardself.create().then(function() {
                lbbh = "%";
                cardself.SetDefaultValues();
                return cardself.AddJsXsxm();
            }).then(function() {
                dsBackups = $.extend(true, {}, cardself.cardInstance().dataSource.tables(0).rows(0).peek());
                $.loaded();
                loading = false;
            }).fail(function() {
                cardself.cancelAction();
                $.loaded();
                loading = false;
            });
        },
        /**
         * 联查资产
         */
        QueryAssetCard: function() {
            var cardself = this;
            var row = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            if (!row)
                return;
            var zcId = '';
            var billId = row[GDWebBizHandleConstants.XPATH_GDJSZC_ID];
            if (isADD === "1") //新增
            {
                zcId = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID];
                var zcCode = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
                var zcLb = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID_GDZCZY_LBBH];
                if (!zcId) {
                    $.messager.alert("提示", "未获取到资产内码，请选择资产。", "warning");
                    return false;
                }
                cardself.QueryAssetCardOpen(zcId, zcCode, zcLb);
            } else //保存后，查看或编辑
            {
                var zcCode = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
                var bgxh = row[GDWebBizHandleConstants.XPATH_GDJSZC_BGXH] * 1;
                if (!zcCode) {
                    $.messager.alert("提示", "未获取到资产编号，请选择资产。", "warning");
                    return false;
                }
                //查看时，可根据 减少前数量和减少数据比较是否完全减少，编辑时，可能编辑了减少数量，因此已无法得知是否完全减少
                var params = [curYear, curCompanyCode, zcCode, bgxh];
                $.loading();
                return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetNextBgxhZcId", params)
                    .then(function(result) {
                        $.loaded();
                        if (result.data) {
                            zcId = result.data;
                        } else {
                            zcId = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID];
                        }
                        if (!zcId) {
                            $.messager.alert("提示", "未获取到资产内码，请选择资产。", "warning");
                            return false;
                        }
                        var zcLb = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID_GDZCZY_LBBH];
                        cardself.QueryAssetCardOpen(zcId, zcCode, zcLb);
                    });
            }
        },
        /**
         * 联查打开资产卡片
         * @param  {String} zcId - 资产ID
         * @param  {String} zcCode - 资产编号
         * @param  {String} zcLb - 资产类别
         */
        QueryAssetCardOpen: function(zcId, zcCode, zcLb) {
            var cardself = this;
            cardself.openMenu('查看资产卡片', '/cwbase/web/FI/GD/BizHandle/runtime/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=Q&psInitAsset=0&psAssetID=' + zcId + '&psAssetCode=' + zcCode + '&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=&psCopyFjFlag=&psAssetType=' + zcLb, 'ZCKP' + zcCode, '{"actionName":"EmptyFormload"}');
        },
        /**
         * 打开申请附件界面
         */
        OpenAcce: function() {
            var cardself = this;
            var row = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var curZcbh = row[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH];
            if (!curZcbh)
                return;
            gsp.application.applicationContext.setParam("curDWBH", curCompanyCode);
            gsp.application.applicationContext.setParam("curZCBH", curZcbh);
            gsp.application.applicationContext.setParam("curFlag", "GDJSZC");
            gsp.application.applicationContext.setParam("curKJQJ", curPeriod);
            var AcceDialog = $("#IFrameAcceDialog");
            var firstopen = false;
            if (!AcceDialog.data('dialog')) {
                firstopen = true;
                AcceDialog = AcceDialog.dialog({
                    modal: true,
                    width: 450,
                    height: 400,
                });
            }
            AcceDialog.dialog("show");
            if (!firstopen) {
                cardself.view.eventAgent(['PageLoad'], 'IFrameAcce', true)();
            }
        },
        /**
         * 设置默认值
         */
        SetDefaultValues: function() {
            var cardself = this;
            var date = cardself.GetDefaultReduceDate(curPeriod, curDate, curYear);
            cardself.cardInstance().dataSource.tables(0).rows(0).setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSRQ, date);
            if (fsscflag === "1") {
                cardself.cardInstance().dataSource.tables(0).rows(0).setValue(GDWebBizHandleConstants.XPATH_GDJSZC_ID, adp.string.createGUID());
            }
            ZcTotalSl = 0;
            ZcTotalYz = 0;
            ZcTotalZj = 0;
            ZcTotalJcz = 0;
            ZcTotalJzzb = 0;
            ZcTotalYgzl = 0;
        },
        /**
         * 修改时，设置减少单据 减少前的金额
         */
        SetTotalValue: function(row) {
            if (!row)
                return false;
            ZcTotalSl = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSQSL] * 1;
            if (ZcTotalSl === 0)
                return false;
            ZcTotalYz = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSQYZ] * 1;
            ZcTotalZj = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSQZJ] * 1;
            ZcTotalJcz = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSQCZ] * 1;
            ZcTotalJzzb = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSQJZZB] * 1;
            ZcTotalYgzl = row[GDWebBizHandleConstants.XPATH_GDJSZC_JSQGZ] * 1;
            return true;
        },
        /**
         * 获得减少的默认业务日期
         * @param  {String} kjqj - 会计期间
         * @param  {String} date - 业务日期
         * @param  {String} year - 会计年度
         */
        GetDefaultReduceDate: function(kjqj, date, year) {
            var cardself = this;
            if (date.substring(4, 6) === kjqj) {
                reduceDate = date;
            } else {
                reduceDate = year + kjqj + "01";
            }
            return reduceDate;
        },
        /**
         * 根据URL传递的数据给属性赋值
         * @param  {object} param - 参数列表
         */
        SetProperValueByPass: function(param) {
            if (fsscflag === "1") {
                curPeriod = dicParams["GD_KJQJ"];
                jeDecn = dicParams["GD_JEDECN"];
                slDecn = dicParams["GD_SLDECN"];
                Jtzj = dicParams["GD_SFJTZJ"];
                zclbContJtJsOrder = param["ZCLBCONTJTJSORDER"] || dicParams["GD_ZCLBCONTJTJSORDER"];
                jtJs = dicParams["GD_JT_JS"] || "1";
                if (jtJs === "1")
                    FirstJtThenBiz = true;
                else
                    FirstJtThenBiz = false;
                noJtlc = dicParams["GD_NOJTZJ"];
                isSecret = param["ISSECRET"] || dicParams["SYS_SecretEdition"];
                JsDefZc = dicParams["GD_JSDEFZC"];
                jt_bg = dicParams["GD_JT_BG"];
                authorityCondi = dicParams["GD_Authority"];
                GDWebBizHandleConstants.IsJsjeReadonly = IsJsjeReadonly = dicParams["GD_ZCJSCARD_ISEDIT"] //= "1";//设置一个全局变量来控制控件只读
                isZDRSC = dicParams["GD_ZDRSC"];
                if (Operationfssc !== "Create") {
                    curDate = Pub.FormatDate8(param["DATE"]);
                    curYear = param["YEAR"] || curDate.substring(0, 4);
                    curCompanyCode = param["COMPANYCODE"];
                }
            } else {
                parentFuncId = param["parentFuncId"];
                curPeriod = param["KJQJ"];
                curDate = Pub.FormatDate8(param["DATE"]);
                curYear = param["YEAR"] || curDate.substring(0, 4);
                curCompanyCode = param["COMPANYCODE"];
                jeDecn = param["JEDECN"];
                slDecn = param["SLDECN"];
                Jtzj = param["JTZJ"];
                zclbContJtJsOrder = param["ZCLBCONTJTJSORDER"] || dicParams["GD_ZCLBCONTJTJSORDER"];
                FirstJtThenBiz = param["FIRSTJTTHENBIZ"];
                noJtlc = param["NOJTLC"];
                isSecret = param["ISSECRET"] || dicParams["SYS_SecretEdition"];
                JsDefZc = dicParams["GD_JSDEFZC"];
                jt_bg = dicParams["GD_JT_BG"];
                authorityCondi = dicParams["GD_Authority"];
                GDWebBizHandleConstants.IsJsjeReadonly = IsJsjeReadonly = dicParams["GD_ZCJSCARD_ISEDIT"] //= "1";//设置一个全局变量来控制控件只读
            }
            var operation = param["OPTFLAG"];
            if (!operation)
                operation = "View";
            switch (operation) {
                case "Create":
                    OperationFlag = "2";
                    break;

                case "Edit":
                    OperationFlag = "3";
                    break;

                case "Config":
                    OperationFlag = "4";
                    break;

                case "View":
                    OperationFlag = "1";
                    break;
                default:
                    break;
            }
            var linkedFlag = param["linkedKey"];
            //base.SetFormState(linkedKey, linkedFlag);
            if (linkedFlag === "1") {
                cardself.LinkedReduceCard();
            }
        },
        /**
         * 设置金额输入框精度显示
         */
        SetCalcDecnDisplay: function() {
            var cardself = this;
            cardself.SetColumnDecn(GDWebBizHandleConstants.ReduceCardJSSLID, slDecn);
            cardself.SetColumnDecn(GDWebBizHandleConstants.ReduceCardJSYZID, jeDecn);
            cardself.SetColumnDecn(GDWebBizHandleConstants.ReduceCardJSZJID, jeDecn);
            cardself.SetColumnDecn(GDWebBizHandleConstants.ReduceCardJSCZID, jeDecn);
            cardself.SetColumnDecn(GDWebBizHandleConstants.ReduceCardJSJZID, jeDecn);
            cardself.SetColumnDecn(GDWebBizHandleConstants.ReduceCardJSGZLID, jeDecn);
        },
        /**
         * 加载项目定义允许显示项目
         */
        AddJsXsxm: function() {
            var cardself = this;
            if (cardself.cardInstance().dataSource.tables(0).peek().length !== 0) {
                lbbh = cardself.cardInstance().dataSource.tables(0).rows(0).peek()['GDJSZC_ZCID_GDZCZY_LBBH'] || "%";
            }
            var params = [curCompanyCode, curYear, lbbh, curDate];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetXmHTML", params)
                .then(function(response) {
                    $('#TableLayoutPanel_XM').data('tablelayout', null); //清空一下tablelayout以供渲染
                    $('#TableLayoutPanel_XM').html(response.data);
                    return $.parser.parse($('#TableLayoutPanel_XM').parent());
                }).then(function() {
                    return cardself.BindingOthXmValue();
                });
        },
        /**
         * 绑定自定义项目的值
         */
        BindingOthXmValue: function() {
            var cardself = this;
            if (cardself.cardInstance().dataSource.tables(0).peek().length !== 0) {
                var zcCode = cardself.cardInstance().dataSource.tables(0).rows(0).peek()[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID];
            } else {
                var zcCode = "";
            }
            dsOthXsxm = {};
            dsOthValue = {};
            var params = [curCompanyCode, curYear, lbbh, zcCode, dsOthXsxm, curDate];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "GetOthXmValue", params)
                .then(function(result) {
                    dsOthXsxm = result.outParams["Table"];
                    if (result.data) {
                        dsOthValue = result.data["Table"][0];
                    }
                    for (var i = 0; i < dsOthXsxm.length; i++) {
                        var txtValue = "";
                        var strXmbh = dsOthXsxm[i]["GDXMZD_XMBH"];
                        var strXmlx = dsOthXsxm[i]["GDXMZD_XMLX"];
                        var TextBox = $("#XTextBox" + strXmbh);
                        if (dsOthValue[strXmbh]) {
                            if (strXmlx === "N") {
                                var tempValue = dsOthValue[strXmbh] * 1;
                                if (tempValue === 0)
                                    txtValue = "0";
                                else
                                    txtValue = gc.accounting.formatMoney(tempValue, '', jeDecn, '');
                            } else if (strXmlx == "B") {
                                var tempValue = dsOthValue[strXmbh] + '';
                                if (!tempValue || !tempValue.trim() || tempValue === "0")
                                    txtValue = "否";
                                else
                                    txtValue = "是";
                            } else
                                txtValue = dsOthValue[strXmbh] + '';
                        } else {
                            if (strXmlx === "N") {
                                txtValue = "0";
                            } else if (strXmlx == "B") {
                                txtValue = "否";
                            } else
                                txtValue = '';
                        }
                        TextBox.val(txtValue);
                    }
                });
        },

        /**
         * 根据操作状态控制状态机的变化
         * @param  {object} param - 参数列表
         */
        ChangeState: function(OperationFlag) {
            var cardself = this;
            switch (OperationFlag) {
                case "2":
                    cardself.context.view().transitInvoke('Create', [{
                        target: 'GDWebReduceCardController',
                        methodName: 'ReduceCardCreate',
                        params: []
                    }]);
                    break;
                case "3":
                    cardself.context.view().transitInvoke('Modify', [{
                        target: 'GDWebReduceCardController',
                        methodName: 'ReduceCardEdit',
                        params: []
                    }]);
                    break;
                case "4":
                    cardself.context.view().transitInvoke('Modify', [{
                        target: 'GDWebReduceCardController',
                        methodName: 'ReduceCardEdit',
                        params: []
                    }]);
                default:
                    break;

            }
        },
        /**
         * 根据操作状态控制按钮显示
         * @param  {object} param - 参数列表
         */
        SetUIDisplay: function(OperationFlag) {
            var cardself = this;
            cardself.SetTextColor(); //设置文字颜色为黑色
            switch (OperationFlag) {
                case "1":
                    if (fsscflag === "1") {
                        //parent.$('#BarPubBill').buttongroup('hideButton', 'd28e2d6a-0f70-4a5d-8e62-0094077b1f05');
                        //parent.$('#BarPubBill').buttongroup('hideButton', 'b06e9c23-3a4b-451c-a226-bd081719a36c');
                        // parent.$('#BarPubBill').buttongroup('hideButton', '5d9a83be-aa53-4433-af6c-a26b0260dbbd');
                        // parent.$('#BarPubBill').buttongroup('hideButton', '9fd8efe6-e7ce-43f0-ac1c-7770a4181788');
                        // parent.$('#BarPubBill').buttongroup('hideButton', '05cf7259-b88b-4859-82ca-e8da98b2df81');
                        // parent.$('#BarPubBill').buttongroup('hideButton', 'e12bf832-aa32-4e50-9ab5-d2a4537eae59');
                    }
                    $('#Bar1').buttongroup('hideButton', GDWebBizHandleConstants.ReduceCardCancelSaveID);
                case "4":
                    $('#Bar1').buttongroup('hideButton', GDWebBizHandleConstants.ReduceCardCreateID);
                    $('#Bar1').buttongroup('hideButton', GDWebBizHandleConstants.ReduceCardEditID);
                    $('#Bar1').buttongroup('hideButton', GDWebBizHandleConstants.ReduceCardCancelID);
                    $('#Bar1').buttongroup('hideButton', GDWebBizHandleConstants.ReduceCardCancelSACID);
                    break;
                case "2":
                    parent.$('#BarPubBill').buttongroup('disable', 'd858c873-f520-42af-baab-b32ec75076f3');
                case "3":
                default:
                    break;
            }
            if (fsscflag === "1") {
                $('#Bar1').parent().hide();
            }
            $(".numberbox").find(".textbox-text").css("text-align", "right");
            //$("#XCheckBox_ZC").parent().hide();

        },
        /**
         * 注册帮助事件和过滤条件
         */
        RegistEvent: function() {
            var cardself = this;
            var filter = cardself.GetAllowReduceCondi(curPeriod, "");
            var ZCIDHP = $('#' + GDWebBizHandleConstants.ReduceCardZCBHID);
            var ZCIDHelp = ZCIDHP.adplookupbox('options').adp;
            ZCIDHelp.condition = filter;
            //帮助后事件
            ZCIDHP.on('OnDictEntryPicked', function(e, rowData, opts) {
                $.loading();
                loading = true;
                var row = rowData[0] || rowData;
                var currentRow = cardself.cardInstance().dataSource.tables(0).rows(0);
                var zcId = row['GDZCZY_ID']
                if (zclbContJtJsOrder == "1") {
                    var params = [zcId, curCompanyCode, curDate];
                    return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "AssetReduceAfterDepre", params)
                        .then(function(result) {
                            var reduceAfterDepre = result.data;
                            if (reduceAfterDepre === "1" && Jtzj !== "1") {
                                $.messager.alert("提示", "该资产所属的资产类别计提折旧前，不允许资产减少！", "warning");
                                return $.Deferred().reject();
                            } else if (reduceAfterDepre === "0" && Jtzj === "1") {
                                $.messager.alert("提示", "该资产所属的资产类别计提折旧后，不允许资产减少！", "warning");
                                return $.Deferred().reject();
                            }
                            return cardself.QryGdzc(zcId, curPeriod, '', currentRow);
                        }).then(function(result) {
                            return cardself.AddJsXsxm();
                        }).then(function() {
                            $.loaded();
                            loading = false;
                        }).fail(function() {
                            var rowCard = $.extend({}, currentRow.peek());
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH] = '';
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID_GDZCZY_ZCMC] = '';
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZTBH_GDZTZD_ZTMC] = '';
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSSL] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ] = 0;
                            currentRow.setValues(rowCard);
                            $.loaded();
                            loading = false;
                        });
                } else {
                    return cardself.QryGdzc(zcId, curPeriod, '', currentRow)
                        .then(function() {
                            return cardself.AddJsXsxm();
                        }).then(function() {
                            $.loaded();
                            loading = false;
                        }).fail(function() {
                            var rowCard = $.extend({}, currentRow.peek());
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH] = '';
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID_GDZCZY_ZCMC] = '';
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZTBH_GDZTZD_ZTMC] = '';
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSSL] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ] = 0;
                            rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ] = 0;
                            currentRow.setValues(rowCard);
                            $.loaded();
                            loading = false;
                        })
                }
            });
        },
        /**
         * 查询固定资产内容并赋值（异步）
         * @param  {string} zcId - 资产ID
         * @param  {string} Kjqj - 会计期间
         * @param  {string} filterCondi - 过滤条件
         * @param  {object} currentRow - 当前数据行(row)
         */
        QryGdzc: function(zcId, Kjqj, filterCondi, currentRow) {
            var cardself = this;
            var ifds = true;
            var params = [zcId, Kjqj, '', ifds, curCompanyCode, curDate]
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "QryGdzc", params)
                .then(function(result) {
                    ifds = result.outParams;
                    var ds = result.data;
                    if (!ifds) {
                        var rowCard = $.extend({}, currentRow.peek());
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZCBH] = '';
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID_GDZCZY_ZCMC] = '';
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZTBH_GDZTZD_ZTMC] = '';
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSSL] = 0;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ] = 0;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ] = 0;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ] = 0;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ] = 0;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ] = 0;
                        currentRow.setValues(rowCard);
                    } else {
                        var row = ds.Table[0];
                        var rowCard = $.extend({}, currentRow.peek());
                        var Sfjtcz = row[GDWebBizHandleConstants.XPATH_GDZCZY_JTCZ] + '';
                        ZcTotalSl = row[GDWebBizHandleConstants.XPATH_GDZCZY_ZCSL] * 1;
                        ZcTotalYz = row[GDWebBizHandleConstants.XPATH_GDZCZY_ZCYZ] * 1;
                        ZcTotalZj = row[GDWebBizHandleConstants.XPATH_GDZCZY_LJZJ] * 1;
                        ZcTotalJcz = row[GDWebBizHandleConstants.XPATH_GDZCZY_JCZ] * 1;
                        ZcTotalJzzb = row[GDWebBizHandleConstants.XPATH_GDZCZY_JZZB] * 1;
                        ZcTotalYgzl = row[GDWebBizHandleConstants.XPATH_GDZCZY_YGZL] * 1;

                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_ZCID_GDZCZY_JTCZ] = Sfjtcz;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSSL] = ZcTotalSl;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ] = ZcTotalYz;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ] = ZcTotalZj;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ] = ZcTotalJcz;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ] = ZcTotalJzzb;
                        rowCard[GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ] = ZcTotalYgzl;
                        currentRow.setValues(rowCard);
                    }
                });
        },
        /**
         * 减少原值离开焦点事件(值改变事件)
         */
        JsyzLostFocus: function() {
            if (!loading) {
                var cardself = this;
                var row = cardself.cardInstance().dataSource.tables(0).rows(0);
                if (!row) {
                    return;
                }
                var zcyz = $('#' + GDWebBizHandleConstants.ReduceCardJSYZID).val() * 1;
                var jczl = row.getValue(GDWebBizHandleConstants.XPATH_GDZCZY_JCZL) * 1;
                var jcz = gc.accounting.formatMoney(Pub.Calculate(zcyz, jczl, "*"), '', jeDecn, '');
                row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ, jcz);
            }
        },
        /**
         * 减少数量离开焦点事件(值改变事件)
         */
        JsslLostFocus: function() {
            var cardself = this;
            if (!loading) {
                loading = true;
                var bl = 1;
                var row = cardself.cardInstance().dataSource.tables(0).rows(0);
                var newSl = $('#' + GDWebBizHandleConstants.ReduceCardJSSLID).val() * 1;
                if (!row) {
                    return;
                }
                if (newSl <= 0 || newSl > ZcTotalSl) {
                    setTimeout(function() {
                        row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSSL, ZcTotalSl);
                    });
                } else {
                    bl = Pub.Calculate(newSl, ZcTotalSl, "/");
                    row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSYZ, Pub.Calculate(ZcTotalYz, bl, "*"));
                    row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSZJ, Pub.Calculate(ZcTotalZj, bl, "*"));
                    row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSJZ, Pub.Calculate(ZcTotalJzzb, bl, "*"));
                    row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSGZ, Pub.Calculate(ZcTotalYgzl, bl, "*"));
                    row.setValue(GDWebBizHandleConstants.XPATH_GDJSZC_JSCZ, Pub.Calculate(ZcTotalJcz, bl, "*"));
                }
                loading = false;
            }

        },
        /**
         * 联查减少卡片
         */
        LinkedReduceCard: function() {

        },
        /**
         * 设置一下文字显示的颜色，以便观察
         */
        SetTextColor: function() {
            var cardself = this;
            $('#XSmartDictLookupZCBH').adplookupbox('textbox').css('color', 'black');
            $('#My97Datebox1').my97datebox('textbox').css('color', 'black');
            $('#XCalculatorJSSL').numberbox('textbox').css('color', 'black');
            $('#XTextBoxZY').text('textbox').css('color', 'black');
            $('#XTextBoxZCMC').text('textbox').css('color', 'black');
            $('#XSmartDictLookupJSYY').adplookupbox('textbox').css('color', 'black');
            $('#XSmartDictLookupJSZT').adplookupbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ReduceCardJSYZID).numberbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ReduceCardJSZJID).numberbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ReduceCardJSCZID).numberbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ReduceCardJSJZID).numberbox('textbox').css('color', 'black');
            $('#' + GDWebBizHandleConstants.ReduceCardJSGZLID).numberbox('textbox').css('color', 'black');
        },
        /**
         * 设置数字控件的精度
         * @param  {string} ID - 控件ID
         * @param  {string} precision - 精度
         */
        SetColumnDecn: function(ID, precision) {
            var cardself = this;
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
         * 获取可以减少的资产条件
         * @param  {string} Kjqj - 会计期间
         * @param  {string} appendCondi - 附加条件
         */
        GetAllowReduceCondi: function(Kjqj, appendCondi) {
            var condi = "'" + curYear + Kjqj + "' " +
                " and not exists (select 1 from GDJZQD" + curYear + " where GDZCZY_ZCBH=GDJZQD_ZCBH and GDJZQD_DWBH = '" + curCompanyCode + "' and GDJZQD_KJQJ = '" + Kjqj + "')" +
                " and not exists (select 1 from GDJSZC" + curYear + " where GDZCZY_ZCBH=GDJSZC_ZCBH and GDJSZC_DWBH = '" + curCompanyCode + "' and GDJSZC_KJQJ = '" + Kjqj + "' and GDJSZC_IFBF = '1')" +
                " and not exists (select 1 from GDZCDB" + curYear + " where GDZCZY_ID=GDZCDB_DCZCID and GDZCDB_DCDWBH = '" + curCompanyCode + "' and GDZCDB_KJQJ = '" + Kjqj + "')" +
                " and not exists (select 1 from GDJSZC" + curYear + " where GDZCZY_ID=GDJSZC_ZCID and GDJSZC_DWBH='" + curCompanyCode + "' and GDJSZC_KJQJ='" + Kjqj + "' and GDJSZC_CWQR='0') " +
                " and GDZCZY_DWBH = '" + curCompanyCode + "' and (GDZCZY_ZZQJ is null or GDZCZY_ZZQJ = ' ') and GDZCZY_CWQR = '1' and GDZCZY_JSBZ = '0' " + authorityCondi;
            if (appendCondi)
                condi += " and " + appendCondi;
            var filter = "[" + Pub.ArrangeCondition("", "GDZCZY_KSQJ", " <= ", condi, "Express", " ", " ") + "]";
            return filter;
        },
        /**
         * 编辑前检查（异步）
         * @param  {object} row - 需要检查的数据行
         */
        CheckEditValidator: function(row) {
            var cardself = this;
            var zcbh = row['GDJSZC_ZCBH'] + '';
            var bgxh = row['GDJSZC_BGXH'] * 1;
            if (fsscflag !== "1" && row["GDJSZC_FSSCFLAG"] === "1") {
                $.messager.alert('提示', "该资产为共享中心生成，不能编辑。", 'warning');
                return $.Deferred().reject();
            }
            var params = [curPeriod, zcbh, bgxh, curCompanyCode, curDate];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "CheckIsExistFollowReduce", params)
                .then(function(b) {
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
         * 功能刷新和退出时的检查 1:刷新 0：退出
         * @param {*string} assetCode - 项目对应的资产编号
         */
        FuncExitCheck: function(flag) {
            var cardself = this;
            if (close) {
                return true;
            }
            if (cardself.HasChanges(true) && !close) {
                Pub.ThreeButtonConfirm("提示", "数据已修改，是否保存？").then(function(result) {
                    if (result === "1") {
                        cardself.context.view().transitInvoke('Save', [{
                            target: 'GDWebReduceCardController',
                            methodName: 'ReduceCardSave',
                            params: []
                        }]);
                    } else {
                        if (flag === "refresh") {
                            close = true;
                            return window.location.reload();
                        } else {
                            close = true;
                            return window.top.gsp.rtf.func.close(cardself.context.getParam(ctrlLang.funcIdK));
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
            var cardself = this;
            var ds = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            for (var key in ds) {
                if (ds[key] === null) {
                    ds[key] = "";
                }
                ds['GDJSZC_BGXH'] = ds['GDJSZC_BGXH'] || 0;
            }
            if (_.isEqual(ds, dsBackups) || _.isEqual({}, dsBackups)) {
                return false;
            }
            return true;
        },
        /**
         * 给共享中心使用的删除方法
         */
        DelReduceforFSSC: function() {
            var cardself = this;
            if (!cardself.cardInstance().dataSource.tables(0).rows(0)) {
                $.messager.alert("提示", "不存在可以删除的数据", "warning");
                return $.Deferred().reject(false);
            }
            if (!cardself.CheckBizValidator()) {
                return $.Deferred().reject(false);
            }
            return $.Deferred().resolve();
        },
        /**
         * 关于 计提折旧 和 做业务 先后顺序的检查
         */
        CheckBizValidator: function() {
            if (noJtlc !== "1" && zclbContJtJsOrder === "0") {
                if (FirstJtThenBiz && Jtzj !== "1") {
                    // $.messager.alert("提示", '请先计提折旧。', "warning");
                    // return false;
                }
                if (!FirstJtThenBiz && Jtzj === "1" && false) {
                    $.messager.alert("提示", '已计提折旧，不允许做资产减少业务。', "warning");
                    return false;
                }
            }
            return true;
        },
        /**
         * 保存后更新FSSCFLAG字段
         */
        UpdateFlag: function() {
            var cardself = this;
            var data = cardself.cardInstance().dataSource.tables(0).rows(0).peek();
            var params = ["GDJSZC", data[GDWebBizHandleConstants.XPATH_GDJSZC_ID], curCompanyCode, Pub.FormatDate8(data[GDWebBizHandleConstants.XPATH_GDJSZC_JSRQ])];
            return cardself.context.injector.get("$dataServiceProxy").invokeMethod("Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement", "UpdateFSSCflag", params);
        }
    }
}]);