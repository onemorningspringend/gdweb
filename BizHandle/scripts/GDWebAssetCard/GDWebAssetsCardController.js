//资产卡片界面
gsp.module('gsp.app').controller('GDWebAssetsCardController', 'CardController',
    function() {

        //#region 参数
        var cardSelf;
        var curFuncID = ''; // 功能ID
        var needClose = false; //是否需要关闭
        //界面传参
        var curCompanyCode = ''; // 单位编号
        var curCompanyName = ''; //单位名称
        var curYear = ''; // 年度
        var curPeriod = ''; // 期间
        var curDate = ''; // 8位日期
        var formFlag = 'A'; // 界面标识 A增加 E编辑 F复制 C确认 Q查询
        var isInitAsset = '0'; // 是否初始资产 formFlag=Q时不需处理
        var assetID = ''; // 资产ID
        var assetCode = ''; // 资产编号
        var byIDorCode = 'ID'; // 以ID查询还是以编号查询 "ID" "CODE"
        var copyAssetID = ''; // 复制的资产ID
        var copyFssbFlag = 'N'; // 是否复制附属设备
        var copyFjFlag = 'N'; // 是否复制附件
        var changeTypeFlag = ''; //切换类别刷新界面的标志
        var changeType = ''; //切换类别编号
        var parentFuncID = ''; //父窗体功能ID
        var cancelFlag = '0'; //取消编辑标志
        var editFlag = '0'; //编辑标志，解决共享中心编辑问题
        //单位参数
        var isJtzj = '0'; // 是否计提折旧
        var isCswc = '0'; // 是否初始完成
        var iiJeDecn = 2; // 金额精度
        var iiSlDecn = 0; // 数量精度
        var iiZjlDecn = 3; // 折旧率精度
        var isJoinZcgl = '0'; // 是否关联资产管理
        var isAddDyjt = '0'; // 新增加的固定资产自动勾选当月计提
        var isOneResOneCard = '0'; // 是否一物一卡
        var isSecret = '0'; // 是否军工保密版
        var isAddZc = '0'; // 新增资产是否默认暂存
        var isAddBtGzl = '0'; // 新增资产必须输入总工作量
        var isNotJt = '0'; // 是否不计提折旧
        var isNotMouseWheel = '0'; // 是否不使用鼠标滚轮调数值文本框
        var uniqueCheck = ''; // 固定资产唯一性标识
        var isAssetCodeReadonly = '0'; // 资产编号是否只读
        var isAssetCodeAuto = '0'; // 是否自动生成编号
        var assetCodeFunc = ''; // 资产编号规则公式
        var lbAuthorityCondi = ""; //类别权限条件
        var bmAuthorityCondi = ""; //部门权限条件
        var sybmAuthorityCondi = ""; //使用部门权限条件
        var isZdrDel = "0"; //只允许制单人删除单据
        //绑定数据
        var cardBindingDt = {}; // 卡片DataSet绑定数据集
        var preCardDr = {}; // 记录修改前卡片数据 供保存使用
        var changeCardDr = {}; // 记录修改前的卡片数据 供重算判断值变化使用 实时
        //单位项目信息
        var companyItemDt = {}; // 单位项目DataSet数据集
        var itemDecnDict = {}; //精度
        var dateFields = ''; //日期字段的字段名 以逗号隔开
        //类别信息
        var cardType = ''; // 卡片类别编号
        var cardTypeDt = {}; // 卡片类别相关信息DataTable
        var cardTypeDr = {}; // 卡片类别相关信息DataRow
        //折旧信息
        var cardDeprecDt = {}; //折旧方法相关信息DataTable
        var cardDeprecDr = {}; //折旧方法相关信息DataRow
        //保存多份
        var mulSaveCount = 0; //保存多份份数
        var mulSaveCodeRage = "0"; //是否使用临时编号规则
        var mulSaveCodeLen = 0; //保存多份 临时编号规则-编号长度
        var mulSaveFixCode = ''; //保存多份 临时编号规则-前缀
        var mulSaveStartRunCode = ''; //保存多份 临时编号规则-起始编号

        var Operationfssc = "";
        var fsscflag = "";
        var firstopen = "";
        var firstcancel = "1"; //给共享中心使用的取消标志，第一次打开的单据不可取消

        //资产类别--折旧方法--月折旧额/率--年折旧额/率--累计折旧--月折旧额/率--年折旧额/率
        //入账日期--已提月份--入账折旧--累计折旧--月折旧额/率--年折旧额/率
        //折旧方法涉及字段--月折旧额/率--年折旧额/率--累计折旧--月折旧额/率--年折旧额/率
        //资产原值--净残值--入账折旧--月折旧额/率--年折旧额/率--累计折旧--月折旧额/率--年折旧额/率
        //使用年月--已提月份--月折旧额/率--年折旧额/率--累计折旧--月折旧额/率--年折旧额/率
        //减值准备--月折旧额/率--年折旧额/率--累计折旧--月折旧额/率--年折旧额/率
        //总工作量--已工作量--月折旧额/率--年折旧额/率--累计折旧--月折旧额/率--年折旧额/率
        //入账折旧=入账折旧+入账前当年折旧
        //使用年月=使用年限+使用月份
        // $("#XCalculatorGDZCZY_ZCYZ").numberbox('options')
        // $("#DateboxGDZCZY_RZRQ").my97datebox('options')
        // $("#XTextBoxGDZCZY_ZCBH").text('options')
        //#endregion 

        return {
            //#region 界面加载
            //共享中心调用分支
            CardFormload: function() {
                var cardSelf = this;
                var DWXZDialog = $('#IFrameDWXZDialog');
                var param = parseUrlParams(window.location); //从URL解析出的参数
                fsscflag = param["FSSCFLAG"] || '0';
                firstopen = param['FIRSTOPEN'] || '1';
                Operationfssc = param["psFlag"];
                if (fsscflag === "1" && firstopen !== '0' && Operationfssc === "A") {
                    if (!DWXZDialog.data('dialog')) {
                        DWXZDialog = DWXZDialog.dialog({
                            modal: true,
                            width: 350,
                            height: 185,
                            onOpen: function() {},
                            onClose: function() {
                                curCompanyCode = gsp.application.applicationContext.getParam('CURCOMPANYCODE');
                                curCompanyName = gsp.application.applicationContext.getParam("CURCOMPANYNAME");
                                curDate = gsp.application.applicationContext.getParam('CURDATE');
                                curYear = curDate.substring(0, 4);
                                return cardSelf.CardFormloadNormal();
                            }
                        });
                    }
                    DWXZDialog.dialog('show');
                } else {
                    return cardSelf.CardFormloadNormal();
                }
            },
            //#region 界面加载
            //空方法 专用于其他界面调用
            EmptyFormload: function() {},
            //界面加载（表单加载后） 单位编号 年度 期间 日期 动作标识 (资产ID 资产编号 以ID查询还是以编号查询) (复制的资产ID 是否复制附属设备 是否复制附件)
            CardFormloadNormal: function() {
                cardSelf = this;
                //获取上个界面传递的参数
                return function() {
                    if (fsscflag === "1" && firstopen !== '0') {
                        var params = parseUrlParams(window.location);
                        if (params.psAssetID)
                            assetID = decodeURI(params.psAssetID, "UTF-8");
                        if (Operationfssc !== "A") {
                            var dataSource = cardSelf.cardInstance().dataSource.tables(0).rows(0).peek();
                            curCompanyCode = dataSource["GDZCZY_DWBH"];
                            curDate = cardSelf.FormatDate8(dataSource["GDZCZY_RZRQ"]);
                            curYear = curDate.substring(0, 4);
                        }
                        return cardSelf.GetCompanyParams(curCompanyCode, curYear, curDate);
                    } else {
                        var params = parseUrlParams(window.location);
                        curCompanyCode = decodeURI(params.psCompany, "UTF-8");
                        curCompanyName = decodeURI(params.psCompanyName, "UTF-8");
                        curYear = params.psYear;
                        curPeriod = params.psPeriod;
                        curDate = params.psDate;
                        formFlag = decodeURI(params.psFlag, "UTF-8");
                        isInitAsset = params.psInitAsset;
                        if (params.psAssetID)
                            assetID = decodeURI(params.psAssetID, "UTF-8");
                        if (params.psAssetCode)
                            assetCode = decodeURI(params.psAssetCode, "UTF-8");
                        if (params.psByIDorCode)
                            byIDorCode = params.psByIDorCode;
                        if (params.psCopyAssetID)
                            copyAssetID = decodeURI(params.psCopyAssetID, "UTF-8");
                        if (params.psCopyFssbFlag)
                            copyFssbFlag = params.psCopyFssbFlag;
                        if (params.psCopyFjFlag)
                            copyFjFlag = params.psCopyFjFlag;
                        if (params.psChangeTypeFlag)
                            changeTypeFlag = params.psChangeTypeFlag;
                        if (params.psAssetType)
                            changeType = decodeURI(params.psAssetType, "UTF-8");
                        if (params.psParentFuncID)
                            parentFuncID = decodeURI(params.psParentFuncID, "UTF-8");
                        if (params.psCurFuncID) {
                            //debugger;
                            curFuncID = decodeURI(params.psCurFuncID, "UTF-8");
                        }
                        if (params.psCancelFlag)
                            cancelFlag = params.psCancelFlag;
                        if (params.psEditFlag) {
                            editFlag = params.psEditFlag;
                        }
                        return $.Deferred().resolve();
                    }
                }().then(function() {
                    //debugger;
                    if (fsscflag === "1" && firstopen !== "0") {
                        location = '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=' + Operationfssc + '&psAssetID=' + assetID + '&psInitAsset=0&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psChangeTypeFlag=0&FSSCFLAG=1&FIRSTOPEN=0&psEditFlag=1';
                        return;
                    }
                    if (formFlag == 'A' || formFlag == 'F') {
                        //create是异步 因此要写个方法
                        return cardSelf.context.view().transitInvoke('Create', [{
                            target: 'GDWebAssetsCardController',
                            methodName: 'MyCreate',
                            params: []
                        }]);
                    } else if (formFlag == 'E' || formFlag == 'C') {
                        //默认状态
                        cardSelf.context.view().stateMachine.transitInvoke('Modify', [{ target: '', methodName: '', params: [] }]);
                        //cardSelf.context.view().stateMachine.transitInvoke('Modify', [{ target: 'CardController', methodName: 'edit', params: [] }]);

                        //数据加载
                        return cardSelf.CardUniteLoad();

                    } else if (formFlag == 'Q') {
                        //数据加载
                        return cardSelf.CardUniteLoad();
                    }
                });

            },
            //加载新增 重写
            MyCreate: function() {
                var cardself = this;
                return cardSelf.create().then(function() {
                    //数据加载
                    return cardSelf.CardUniteLoad();
                });
            },
            //统一加载
            CardUniteLoad: function() {
                if (changeTypeFlag == '1')
                    cardType = changeType;
                else
                    cardType = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_LBBH'); //类别编号
                // cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_LBBH'); //类别编号

                //设置按钮显示
                cardSelf.SetBtn_DisPlay('init');

                //服务端：获取公司参数 单位项目 类别信息 资产数据
                cardSelf.CardLoadData('ASSETCARD').then(function() {
                    //debugger;
                    //将资产数据赋给界面
                    cardSelf.SetBindingData();

                    if (formFlag != 'Q') {
                        //资产项目事件和帮助 查看不需要设置
                        cardSelf.AssetItemControlSetting();

                        //设置只读 资产类别 当月计提 查看不需要设
                        if (cardTypeDt[0]) {
                            cardTypeDr = cardTypeDt[0];
                            if (cardTypeDr.PUBNX == '1') {
                                $("#XCalculatorGDZCZY_SYNX").numberbox('textbox').attr('readOnly', true);
                                $("#XCalculatorGDZCZY_SYSJ").numberbox('textbox').attr('readOnly', true);
                            }
                            if (cardTypeDr.PUBCZL == '1') {
                                $("#XCalculatorGDZCZY_JCZL").numberbox('textbox').attr('readOnly', true);
                                $("#XCalculatorGDZCZY_JCZ").numberbox('textbox').attr('readOnly', true);
                            }
                        }
                        var sbbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SBBH'); //设备编号
                        if (isJoinZcgl == "1" && (formFlag == "E" || formFlag == "C") && sbbh != '') {
                            $("#XTextBoxGDZCZY_ZCBH").attr('readOnly', true);
                        }
                        if (formFlag == "E") {
                            var cwqr = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_CWQR'); //财务确认
                            if (cwqr == '1')
                                $("#XCheckBoxGDZCZY_SFZC").attr('disabled', 'disabled');
                        }
                        if (isAssetCodeAuto != "0" && (isInitAsset == "0" || (isInitAsset == "1" && isCswc == "0"))) {
                            if (isJoinZcgl == "1" && (formFlag == "E" || formFlag == "C") && sbbh != '') {
                                $("#ButtonGDZCZY_ZCBH").attr('disabled', 'disabled'); //资产编号按钮只读
                            } else {
                                $("#ButtonGDZCZY_ZCBH").off("click").on("click", function() {
                                    cardSelf.GetNewAssetCode(false); //资产编号按钮 注册事件
                                });
                            }
                        }

                        //切换资产类别：重算净残值 入账折旧 累计折旧 月折旧额等等
                        //cardSelf.TypeDefaultValue(); //切换类别的相关信息被cookie覆盖,再覆盖回去
                        if (formFlag == 'A' || formFlag == 'F' || formFlag == 'C' || changeTypeFlag == '1') { // 新增时 或 切换类别时 重算
                            if (cardType != '' && $.trim(cardType) != '') {
                                var zcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                                var jczl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZL'), itemDecnDict.GDZCZY_JCZL));
                                cardSelf.CalculateNetSalvage(zcyz, jczl); //重算净残值
                                if (cardDeprecDr.YZJE != '' || cardDeprecDr.YZJL != '') {
                                    if (formFlag == 'C') {
                                        cardSelf.CalculatorDepre(false); //重算累计折旧 是否计算月折旧额
                                        cardSelf.CalculateMonthDepreRate(); //重算月折旧率
                                        cardSelf.CalculateYearDepreRate(); //重算年折旧率
                                        cardSelf.CalculateMonthDepre(); //重算月折旧额
                                        cardSelf.CalculateYearDepre(); //重算年折旧额
                                    } else {
                                        cardSelf.CalculateMonthDepreRate(); //重算月折旧率
                                        cardSelf.CalculateYearDepreRate(); //重算年折旧率
                                        cardSelf.CalculateMonthDepre(); //重算月折旧额
                                        cardSelf.CalculateYearDepre(); //重算年折旧额
                                        cardSelf.CalculateDepreMonth(); //重算已提月份
                                        cardSelf.CalculatorDepre(true); //重算累计折旧 是否计算月折旧额
                                        cardSelf.CalculatorRzzj(); //重算入账折旧
                                    }
                                }
                            }
                        }

                        //记录卡片数据
                        cardSelf.ReportCardData();
                        if (changeTypeFlag == '1') { //修改类别刷新的 需要特殊处理表示修改过
                            preCardDr.GDZCZY_LBBH = '';
                        }
                        //debugger;
                        //重新注册刷新和关闭事件
                        //var vid = this.context.view().element.id;
                        $(document).off('framerefresh').on('framerefresh', function() {
                            //debugger;
                            return cardSelf.refreshForm();
                        });
                        $(document).off('frameclose').on('frameclose', function() {
                            //debugger;
                            return cardSelf.closeForm();
                        });

                        //取消编辑 刷新后特殊处理
                        if (cancelFlag && cancelFlag != undefined && cancelFlag == '1') {
                            //设置状态机
                            cardSelf.context.view().stateMachine.transitInvoke('Save', [{ target: '', methodName: '', params: [] }]);
                            formFlag = 'Q';
                            cardSelf.SetBtn_DisPlay('cancel');
                        }
                    }
                });
                window.parent.$.loaded();
            },
            //获取公司参数 单位项目 类别信息 资产信息 折旧信息
            CardLoadData: function(paramFlag) {
                var dicParams = {};
                //获取cookie
                var cookieData = cardSelf.CutoutData('ZCKP=', ';', document.cookie);
                var param = [curCompanyCode, curYear, curPeriod, curDate, paramFlag, cardType, formFlag, isInitAsset, "", dicParams, assetID, assetCode, byIDorCode, changeTypeFlag, cookieData];
                if (formFlag == 'F')
                    param = [curCompanyCode, curYear, curPeriod, curDate, paramFlag, cardType, formFlag, isInitAsset, "", dicParams, copyAssetID, "", byIDorCode, changeTypeFlag, cookieData];
                return this.context.injector.get('$dataServiceProxy').invokeMethod('Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement', 'GetCardLoadData', param).then(function(result) {
                    if (result) {
                        var resultDs = JSON.parse(result.data);
                        companyItemDt = resultDs.GDDWXM; //单位项目数据集
                        cardTypeDt = resultDs.GDZCLB; //资产类别信息
                        cardBindingDt = resultDs.GDZCZY; //资产数据
                        cardDeprecDt = resultDs.GDZJFF; //折旧信息
                        dicParams = result.outParams; //公司参数
                        if (dicParams.GD_SFJTZJ)
                            isJtzj = dicParams.GD_SFJTZJ;
                        if (dicParams.GD_SFCSWC)
                            isCswc = dicParams.GD_SFCSWC;
                        if (dicParams.GD_JEDECN)
                            iiJeDecn = parseInt(dicParams.GD_JEDECN, 10);
                        if (dicParams.GD_SLDECN)
                            iiSlDecn = parseInt(dicParams.GD_SLDECN, 10);
                        if (dicParams.GD_ZJLDECN)
                            iiZjlDecn = parseInt(dicParams.GD_ZJLDECN, 10);
                        if (dicParams.JionGDZCFlag)
                            isJoinZcgl = dicParams.JionGDZCFlag;
                        if (dicParams.GD_XZDYJT)
                            isAddDyjt = dicParams.GD_XZDYJT;
                        if (dicParams.GD_KPFS)
                            isOneResOneCard = dicParams.GD_KPFS;
                        if (dicParams.SYS_SecretEdition)
                            isSecret = dicParams.SYS_SecretEdition;
                        if (dicParams.GD_XZDEFAULTZC)
                            isAddZc = dicParams.GD_XZDEFAULTZC;
                        if (dicParams.GD_VALIZGZL)
                            isAddBtGzl = dicParams.GD_VALIZGZL;
                        if (dicParams.GD_NOJTZJ)
                            isNotJt = dicParams.GD_NOJTZJ;
                        if (dicParams.LS_NOTMOUSEWHEEL)
                            isNotMouseWheel = dicParams.LS_NOTMOUSEWHEEL;
                        if (dicParams.GD_GDZCWYXFIELD)
                            uniqueCheck = dicParams.GD_GDZCWYXFIELD;
                        if (dicParams.GD_ZCBH_READONLY)
                            isAssetCodeReadonly = dicParams.GD_ZCBH_READONLY;
                        if (dicParams.GD_ZCBHAUTO)
                            isAssetCodeAuto = dicParams.GD_ZCBHAUTO;
                        if (isAssetCodeAuto != '0') // #warning 自动生成为什么不允许批量复制？
                            mulSaveCodeRage = '0';
                        if (dicParams.GD_ZCBHGS)
                            assetCodeFunc = dicParams.GD_ZCBHGS;
                        if (dicParams.GD_LBAuthority)
                            lbAuthorityCondi = dicParams.GD_LBAuthority;
                        if (dicParams.GD_BMAuthority)
                            bmAuthorityCondi = dicParams.GD_BMAuthority;
                        if (dicParams.GD_SYBMAuthority)
                            sybmAuthorityCondi = dicParams.GD_SYBMAuthority;
                        //折旧公式
                        if (isNotJt == '0' && cardDeprecDt[0]) {
                            cardDeprecDr = cardDeprecDt[0];
                        } else {
                            cardDeprecDr.ZJMC = '';
                            cardDeprecDr.YZJE = '';
                            cardDeprecDr.YZJL = '';
                            cardDeprecDr.JSZQ = '';
                            cardDeprecDr.ZJEZQ = '';
                            cardDeprecDr.ZJLZQ = '';
                        }
                    }
                }).fail(function(result) {
                    $.messager.alert('提示', '获取单位信息失败。', 'warning');
                    return;
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
                        //debugger;
                        //$.messager.alert('提示', "获取单位信息失败。", 'warning');
                        return;
                    });
            },
            //将资产数据赋给绑定数据
            SetBindingData: function() {
                var cardBindingDr = cardBindingDt[0];
                cardType = cardBindingDr.GDZCZY_LBBH;
                //给界面数据赋值
                var mainRow = cardSelf.cardInstance().dataSource.tables('GDZCZY').peek()[0];
                for (var field in mainRow) {
                    var fieldValue = cardBindingDr[field];
                    if (!fieldValue || fieldValue == 'null')
                        fieldValue = '';
                    cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().setValue(field, fieldValue); //不用替换成UpdateBindData
                }
                //复选框需要特殊设置
                for (var i = 0; i < companyItemDt.length; i++) {
                    var itemRow = companyItemDt[i];
                    var itemCode = itemRow.GDXMZD_XMBH;
                    var itemType = itemRow.GDXMZD_XMLX;
                    if (itemType == 'B') {
                        if (cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(itemCode).toUpperCase() == 'TRUE')
                            $('#XCheckBox' + itemCode).attr('checked', true);
                        else
                            $('#XCheckBox' + itemCode).attr('checked', false);
                    }
                }
            },
            //项目控件设置：注册事件 绑定帮助
            AssetItemControlSetting: function() {
                //数值控件 焦点丢失事件
                $('.easyui-numberbox').each(function() {
                    var id = $(this).attr('id');
                    $(this).numberbox('textbox').on('blur', function() {
                        //console.log(id);
                        cardSelf.NumberBoxBlur(id.substring(11), $(this).val());
                    });
                });
                //日期控件 值变化事件
                $('.easyui-my97datebox').on('change', function() {
                    var id = $(this).attr('id');
                    cardSelf.my97dateboxchanged(id.substring(7), $(this).val());
                });

                dateFields = '';
                //设置资产项目帮助
                if (companyItemDt && companyItemDt.length >= 1) {

                    for (var j = 0; j < companyItemDt.length; j++) {
                        var itemRow = companyItemDt[j];
                        var itemCode = itemRow.GDXMZD_XMBH;
                        var itemAssetType = itemRow.GDXMZD_LBBH;
                        if (itemAssetType != '%' && cardType != itemAssetType)
                            continue; // 非公共类别 且 非卡片类别 不处理 
                        var itemType = itemRow.GDXMZD_XMLX;
                        var itemDecn = itemRow.GDXMZD_DECN;
                        if (itemType == 'N') { //数值型
                            //记录下各字段的精度
                            itemDecnDict[itemCode] = itemDecn;

                            //数值框值变化事件
                            // $("#XCalculator" + itemCode).numberbox({
                            //     "onChange": function(newValue, oldValue) {
                            //         var controlItemCode = this.id.substring(11); //例如XCalculatorGDZCZY_ZCYZ去掉前缀
                            //         cardSelf.NumberBoxInChange(controlItemCode, newValue, oldValue);
                            //     }
                            // });
                            //数值框丢失焦点事件

                            // $("#XCalculator" + itemCode).numberbox('textbox').on('blur', function(e) {
                            //     //setTimeout(function() {
                            //     var zcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                            //     //e.target.value
                            //     ////debugger;
                            //     console.log('数值丢失焦点');
                            //     //$.messager.alert('提示', '数值丢失焦点');

                            //     //alert('数值丢失焦点');
                            //     //});
                            // });

                        } else if (itemType == 'D') { //日期框
                            //dateFields += ',' + itemCode;//#warning 待测试

                            //日期框值变化事件 !绑定日期数据修改不会触发这个事件#warning
                            var opts = $("#Datebox" + itemCode).my97datebox('options');
                            opts.dchanged = function(dp) {
                                var controlItemCode = dp.el.id.substring(7); //例如DateboxGDZCZY_RZRQ去掉前缀
                                //console.log(controlItemCode + '日期框值变化');
                                var newValue = dp.cal.getNewDateStr(opts.realDateFmt);
                                cardSelf.my97dateboxDchanged(controlItemCode, newValue);
                            };
                        } else if (itemType == 'C') { //字符型
                            var helpItemDz = itemRow.GDXMZD_IFDZ;
                            var helpItemCz = itemRow.GDXMZD_IFCZ;
                            var helpItemCzzd = itemRow.GDXMZD_CZZD;
                            var helpItemCzHelpID = itemRow.GDCZLB_HELPID;

                            if (helpItemDz != '1' && helpItemCz != '1') { //文本框
                                //文本框丢失焦点事件
                                $("#XTextBox" + itemCode).text('textbox').on('blur', function(e) {
                                    //console.log(e.target.id.substring(8));
                                    cardSelf.TextBoxBlur(e.target.id.substring(8));
                                });

                            } else { //智能帮助
                                var helpControl = $("#XSmart" + itemCode).adplookupbox('options').adp;

                                //设置帮助前事件
                                helpControl.OnDictEntryPicking = function(adp) {
                                    var controlItemCode = this.id.substring(6);
                                    //debugger;
                                    cardSelf.SmarthelpOnDictEntryPicking(controlItemCode, adp);
                                };

                                //设置帮助后事件
                                helpControl.OnDictEntryPicked = function(rowData, opts) {
                                    //debugger;
                                    var controlItemCode = opts.adp.OnDictEntryPicked.caller.arguments[1].id.substring(6); //例如XSmartGDZCZY_LBBH去掉前缀
                                    cardSelf.SmarthelpOnDictEntryPicked(controlItemCode, rowData[0]);
                                };

                                //设置帮助条件       
                                if (helpItemDz == '1') { //设置对照条件
                                    if (itemCode == 'GDZCZY_LBBH') //资产类别
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "GDZCLB_SFTY", " =", "'0' " + lbAuthorityCondi, "Express", " ", " ") + "]";
                                    else if (itemCode == 'GDZCZY_ZJBH')
                                        continue;
                                    else if (itemCode == 'GDZCZY_ZTBH')
                                        continue;
                                    else if (itemCode == 'GDZCZY_LYBH')
                                        continue;
                                    else if (itemCode == 'GDZCZY_YTBH')
                                        continue;
                                    else if (itemCode == 'GDZCZY_BMBH') //所属部门
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "LSBMZD_DWBH", " =", "'" + curCompanyCode + "' and (LSBMZD_TYBZ='0' or LSBMZD_TYND>'" + curYear + "') and LSBMZD_HSF='1' " + bmAuthorityCondi, "Express", " ", " ") + "]";
                                    else if (itemCode == 'GDZCZY_YSBM') //验收部门
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "LSBMZD_DWBH", " =", "'" + curCompanyCode + "' and (LSBMZD_TYBZ='0' or LSBMZD_TYND>'" + curYear + "') and LSBMZD_HSF='1' ", "Express", " ", " ") + "]";
                                    else if (itemCode == 'GDZCZY_SYDW') //使用单位
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "LSBZDW_QYBZ", " =", "'1' and (LSBZDW_TYBZ='0' or LSBZDW_TYND>'" + curYear + "') and ((exists(select 1 from LSBZDW where LSBZDW_GSLB = '3' and LSBZDW_DWBH = '" + curCompanyCode + "') AND LSBZDW_GSLB = '3') OR (LSBZDW_GSXZ='0' or LSBZDW_GSXZ='2'))", "Express", " ", " ") + "]";
                                    else if (itemCode == 'GDZCZY_SYBM') { //使用部门
                                        var tmpSydw = cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_SYDW'); //使用单位
                                        if (tmpSydw == '')
                                            tmpSydw = curCompanyCode;
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "LSBMZD_DWBH", " =", "'" + tmpSydw + "' and (LSBMZD_TYBZ='0' or LSBMZD_TYND>'" + curYear + "') and LSBMZD_HSF='1' " + sybmAuthorityCondi, "Express", " ", " ") + "]";
                                    } else if (itemCode == 'GDZCZY_SYR') { //使用人
                                        var tmpSyrdw = cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_SYDW'); //使用单位
                                        if (tmpSyrdw == '')
                                            tmpSyrdw = curCompanyCode;
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "LSZGZD_DWBH", " =", "'" + tmpSyrdw + "' and (LSZGZD_TYBZ='0' or LSZGZD_TYND>'" + curYear + "')", "Express", " ", " ") + "]";
                                        helpControl.navcondition = "[" + cardSelf.ArrangeCondition(" ", "LSBMZD_DWBH", " =", "'" + tmpSyrdw + "' and (LSBMZD_TYBZ='0' or LSBMZD_TYND>'" + curYear + "') and LSBMZD_HSF='1' ", "Express", " ", " ") + "]";
                                    } else if (itemCode == 'GDZCZY_ZRR') { //责任人
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "LSZGZD_DWBH", " =", "'" + curCompanyCode + "' and (LSZGZD_TYBZ='0' or LSZGZD_TYND>'" + curYear + "')", "Express", " ", " ") + "]";
                                        helpControl.navcondition = "[" + cardSelf.ArrangeCondition(" ", "LSBMZD_DWBH", " =", "'" + curCompanyCode + "' and (LSBMZD_TYBZ='0' or LSBMZD_TYND>'" + curYear + "') and LSBMZD_HSF='1' ", "Express", " ", " ") + "]";
                                    } else if (itemCode == 'GDZCZY_CFDD') //存放地点
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "GDCFDD_DWBH", " =", "'" + curCompanyCode + "'", "Express", " ", " ") + "]";
                                    else { //自定义目录
                                        helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "GDXMMX_XMBH", " =", "'" + itemCode + "' and (GDXMMX_LBBH='%' or GDXMMX_LBBH='" + itemAssetType + "')", "Express", " ", " ") + "]";
                                    }
                                } else if (helpItemCz == '1') { //此处不设置 到帮助前再处理
                                    // if(helpItemCzHelpID =="505896b9-a1ba-4538-8056-d2b3d98bec25")
                                    // helpControl.FullTreeFilterExpression = IntelligentHelpBasic.GetHelpExpress("COMPANYID", " > ", "' '");
                                }
                            }
                        }
                    }
                } else {
                    $.messager.alert('警告', '未获取到单位项目，请检查！', 'warning');
                    return;
                }
            },
            //设置按钮显示
            SetBtn_DisPlay: function(stateFlag) {
                if (stateFlag == 'init') { //初始加载
                    if (formFlag == "Q") {
                        //新增按钮不可见
                        $('#presetBar').buttongroup('hideButton', '124a4252-6e74-4e31-9938-84fff9e5b81a');
                        //编辑按钮不可见
                        $('#presetBar').buttongroup('hideButton', '9e5fe46a-d77f-45e0-9f5d-ba3e2cf7251d');
                        //取消按钮不可见
                        $('#presetBar').buttongroup('hideButton', 'a15fa001-bd39-4f4d-8cae-7282bfb69529');
                        //保存按钮不可见
                        $('#presetBar').buttongroup('hideButton', '13c7b28e-32bf-4199-8e99-073999918325');
                    } else {
                        //新增按钮不可用
                        $('#presetBar').buttongroup('disable', '124a4252-6e74-4e31-9938-84fff9e5b81a');
                        //编辑按钮不可用
                        $('#presetBar').buttongroup('disable', '9e5fe46a-d77f-45e0-9f5d-ba3e2cf7251d');
                        if (fsscflag === "1" && formFlag == "A") {
                            parent.$('#BarPubBill').buttongroup('disable', 'd858c873-f520-42af-baab-b32ec75076f3');
                        }
                    }
                } else if (stateFlag == 'Add') { //新增 enable
                    //可直接用init的
                } else if (stateFlag == 'Edit') { //编辑
                    //新增按钮不可用
                    $('#presetBar').buttongroup('disable', '124a4252-6e74-4e31-9938-84fff9e5b81a');
                    //编辑按钮不可用
                    $('#presetBar').buttongroup('disable', '9e5fe46a-d77f-45e0-9f5d-ba3e2cf7251d');
                    //取消按钮可用
                    $('#presetBar').buttongroup('enable', 'a15fa001-bd39-4f4d-8cae-7282bfb69529');
                    //保存按钮可用
                    $('#presetBar').buttongroup('enable', '13c7b28e-32bf-4199-8e99-073999918325');
                } else if (stateFlag == 'Save') { //保存
                    //新增按钮可用
                    $('#presetBar').buttongroup('enable', '124a4252-6e74-4e31-9938-84fff9e5b81a');
                    //编辑按钮可用
                    $('#presetBar').buttongroup('enable', '9e5fe46a-d77f-45e0-9f5d-ba3e2cf7251d');
                    //取消按钮不可用
                    $('#presetBar').buttongroup('disable', 'a15fa001-bd39-4f4d-8cae-7282bfb69529');
                    //保存按钮不可用
                    $('#presetBar').buttongroup('disable', '13c7b28e-32bf-4199-8e99-073999918325');
                } else if (stateFlag == 'cancel') { //取消编辑
                    //新增按钮可用
                    $('#presetBar').buttongroup('enable', '124a4252-6e74-4e31-9938-84fff9e5b81a');
                    //取消按钮不可用
                    $('#presetBar').buttongroup('disable', 'a15fa001-bd39-4f4d-8cae-7282bfb69529');
                    //保存按钮不可用
                    $('#presetBar').buttongroup('disable', '13c7b28e-32bf-4199-8e99-073999918325');

                    assetID = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ID');
                    if (assetID == '') { //新增
                        //编辑按钮不可用
                        $('#presetBar').buttongroup('disable', '9e5fe46a-d77f-45e0-9f5d-ba3e2cf7251d');
                        if (fsscflag === "1") {
                            setTimeout(function() {
                                parent.$('#BarPubBill').buttongroup('disable', '50939bcf-587e-4677-a9aa-100c6e5f1971');
                                parent.$('#BarPubBill').buttongroup('disable', '2b111168-62b9-425e-b4b7-4c6c0a26222e');
                            });
                        }
                    } else {
                        //编辑按钮可用
                        $('#presetBar').buttongroup('enable', '9e5fe46a-d77f-45e0-9f5d-ba3e2cf7251d');
                    }
                }
                if (fsscflag === "1") {
                    $("#presetBar").parents().find(".layout-panel-north").hide();
                    $("#presetBar").parents().find(".layout-panel-north").next().css("top", "0px");
                }
            },
            //#endregion

            //#region 按钮事件

            //#region 新增
            //新增
            AddCard: function() {
                // if (gsp.rtf.query.get("funcid") == '')
                //     gsp.rtf.query.get('funcid') = curFuncID;
                //刷新
                if (fsscflag === "1") {
                    location = '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=A&psInitAsset=' + isInitAsset + '&psAssetID=&psAssetCode=&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psAssetType=&psChangeTypeFlag=0&psParentFuncID=' + parentFuncID + '&psCurFuncID=' + curFuncID + '&FSSCFLAG=1&FIRSTOPEN=0';
                } else {
                    gsp.rtf.func.openUrl({
                        id: curFuncID,
                        name: '',
                        url: '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=A&psInitAsset=' + isInitAsset + '&psAssetID=&psAssetCode=&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psAssetType=&psChangeTypeFlag=0&psParentFuncID=' + parentFuncID + '&psCurFuncID=' + curFuncID,
                        reload: true
                    });
                }
            },
            //#endregion

            //#region 编辑
            //编辑
            EditCard: function() {
                formFlag = 'E';
                assetID = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ID');
                assetCode = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                cardType = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_LBBH');
                mulSaveCount = 0;
                copyAssetID = "";
                copyFssbFlag = "N";
                copyFjFlag = "N";
                if (cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_FSSCFLAG') == "1") {
                    $.messager.alert("提示", "该资产是共享中心生成的，不允许操作！", "warning");
                    return $.Deferred().reject();
                }
                cardSelf.ReportCardData(); //记录卡片数据
                //默认状态
                cardSelf.context.view().stateMachine.transitInvoke('Modify', [{ target: '', methodName: '', params: [] }]);
                cardSelf.SetBtn_DisPlay('Edit');
                if (fsscflag === "1" && editFlag !== "0") {
                    location = location = '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=E&psInitAsset=' + isInitAsset + '&psAssetID=' + assetID + '&psAssetCode=' + assetCode + '&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psAssetType=' + cardType + '&psChangeTypeFlag=0&psParentFuncID=' + parentFuncID + '&psCurFuncID=' + curFuncID + '&psCancelFlag=0&FSSCFLAG=1&FIRSTOPEN=0';
                }
                return $.Deferred().resolve();
            },
            //#endregion

            //#region 取消
            //取消
            CancelCard: function() {
                if (formFlag == 'A') {
                    //清空
                    // if (fsscflag === "1") {
                    //     $.notify.message("提示", "新增的单据不允许取消!", "warning");
                    //     return $.Deferred().reject();
                    // }
                    var mainRow = cardSelf.cardInstance().dataSource.tables('GDZCZY').peek()[0];
                    for (var field in mainRow) {
                        cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().setValue(field, '');
                    }
                    //设置状态机
                    cardSelf.context.view().stateMachine.transitInvoke('Save', [{ target: '', methodName: '', params: [] }]);
                    cardSelf.SetBtn_DisPlay('cancel');
                    formFlag = 'Q';
                } else if (formFlag == 'E') {
                    assetID = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ID');
                    //刷新
                    // if (gsp.rtf.query.get("funcid") == '')
                    //     gsp.rtf.query.get("funcid") = curFuncID;
                    //刷新
                    if (fsscflag === "1") {
                        location = '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=E&psInitAsset=' + isInitAsset + '&psAssetID=' + assetID + '&psAssetCode=' + assetCode + '&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psAssetType=' + cardType + '&psChangeTypeFlag=0&psParentFuncID=' + parentFuncID + '&psCurFuncID=' + curFuncID + '&psCancelFlag=1&FSSCFLAG=1&FIRSTOPEN=0';
                    } else {
                        gsp.rtf.func.openUrl({
                            id: curFuncID,
                            name: '',
                            url: '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=E&psInitAsset=' + isInitAsset + '&psAssetID=' + assetID + '&psAssetCode=' + assetCode + '&psByIDorCode=ID&psCopyAssetID=&psCopyFssbFlag=N&psCopyFjFlag=N&psAssetType=' + cardType + '&psChangeTypeFlag=0&psParentFuncID=' + parentFuncID + '&psCurFuncID=' + curFuncID + '&psCancelFlag=1',
                            reload: true
                        });
                    }
                }
            },
            //#endregion

            //#region 获取编号
            //获取最新编号:项目空值直接停止
            GetNewAssetCode: function(itemEmptyStop) {
                if (isAssetCodeAuto == '0')
                    return;
                else {
                    var tmpAssetDs = cardSelf.cardInstance().dataSource.peek();
                    var assetDataStr = JSON.stringify(tmpAssetDs);
                    var resultMsg = '';
                    //调用服务端获取新编号
                    //debugger;
                    var param = [curCompanyCode, curYear, isAssetCodeAuto, itemEmptyStop, assetDataStr, resultMsg];
                    this.context.injector.get('$dataServiceProxy').invokeMethod('Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement', 'GetNewAssetCode', param).then(
                        function(result) {
                            if (result) {
                                var newCode = result.data;
                                var resultMsg = result.outParams;
                                if (resultMsg == '') {
                                    if ($.trim(newCode) != '')
                                        cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().setValue('GDZCZY_ZCBH', newCode); //不用替换成UpdateBindData
                                } else if (resultMsg.indexOf('生成编号所属项目') >= 0) {
                                    cardSelf.blockConfirm('提示', resultMsg + '是否继续？')
                                        .then(function() { //点是
                                            cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().setValue('GDZCZY_ZCBH', newCode); //不用替换成UpdateBindData
                                        });
                                }
                            }
                        });
                }
            },
            //#endregion

            //#region 保存卡片
            //保存卡片
            MainSave: function() {
                //查看 退出
                if (formFlag == 'Q')
                    return $.Deferred().reject();
                //编辑未修改 退出
                if (formFlag == 'E') {
                    if (cardSelf.CheckHaveChanged() == false) {
                        $.notify.info("数据无变动，不需保存。");
                        return $.Deferred().reject();
                    }
                }
                //检查唯一性标识
                if (uniqueCheck != '' && mulSaveCount > 0) {
                    $.notify.error("存在唯一性标识字段，不可保存多份。");
                    mulSaveCount = 0;
                    return $.Deferred().reject();
                }
                //检查数据
                if (cardSelf.CheckCardData() == false) {
                    mulSaveCount = 0;
                    return $.Deferred().reject();
                }

                //检查资产编号
                var zcbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                if ((zcbh == '' || $.trim(zcbh) == '') && mulSaveCount == 0 && (isAssetCodeAuto == '0' || fsscflag === "1")) { //保存一份 且 不自动生成编号 且 编号空
                    $.notify.error("请填写资产编号。");
                    mulSaveCount = 0;
                    return $.Deferred().reject();
                } else if ((zcbh == '' || $.trim(zcbh) == '') && mulSaveCount == 0 && isAssetCodeAuto != '0') { //保存一份 且 自动生成编号 且 编号空
                    //调用服务端
                    //资产编号为空 并且 自动生成编号
                    cardSelf.GetNewAssetCode(false).then(function() {
                        zcbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                        if (zcbh == '' || $.trim(zcbh) == '')
                            return $.Deferred().reject();
                        else {
                            return cardSelf.SaveCard('');
                        }
                    });
                } else { //保存多份(服务端生成编号) 或 保存一份 且 编号非空
                    if (fsscflag === "1") {
                        return cardSelf.SaveCardforFSSC();
                    }
                    return cardSelf.SaveCard('');
                }
            },
            //保存后事件
            AfterSave: function(result, ifReFreshClose) {
                if (result) {
                    var resultStr = result.data;
                    var newAssetID = cardSelf.CutoutData('ZCID:', ';', resultStr);
                    var newAssetCode = cardSelf.CutoutData('ZCBH:', ';', resultStr);
                    //保存成功后做这些：
                    if (mulSaveCount > 0) { //保存多份的显示最后一个资产
                        cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().setValue('GDZCZY_ID', newAssetID); //不用替换成UpdateBindData
                        cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().setValue('GDZCZY_ZCBH', newAssetCode); //不用替换成UpdateBindData
                    }
                }

                $.loaded();

                if (formFlag == "A") {
                    $.notify.success('新增保存成功。');
                } else if (formFlag == "F") {
                    $.notify.success('复制保存成功。');
                } else if (formFlag == "E") {
                    $.notify.success('修改成功。');
                } else if (formFlag == "C") {
                    $.notify.success('确认成功。');
                    cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).setValue('GDZCZY_CWQR', '1'); //不用替换成UpdateBindData
                    cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).setValue('GDZCZY_SFZC', '0'); //不用替换成UpdateBindData
                }

                //刷新父列表页 兼容 Ie 8
                if (parentFuncID != '') {
                    ////debugger;
                    //执行重新加载数据的方法
                    var _fid = parentFuncID.replace(/adp_/g, "");
                    gsp.rtf.func.refreshFunc(_fid);
                }

                if (ifReFreshClose == 'refresh') { //刷新
                    return gsp.rtf.func.refreshFunc(curFuncID);
                } else if (ifReFreshClose == 'close') { //关闭
                    needClose = true;
                    return gsp.rtf.func.close(curFuncID);
                } else {
                    cardSelf.ReportCardData(); //记录卡片数据
                    assetID = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ID');
                    assetCode = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                    cardType = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_LBBH');
                    mulSaveCount = 0;
                    copyAssetID = "";
                    copyFssbFlag = "N";
                    copyFjFlag = "N";
                    formFlag = 'Q';
                    //设置状态机
                    cardSelf.context.view().stateMachine.transitInvoke('Save', [{ target: '', methodName: '', params: [] }]);
                    cardSelf.SetBtn_DisPlay('Save');
                    // //保存多份 按钮不可用
                    // //#warning GetButton(Control_Btn_ItemMulti).IsEnabled = false;
                    // formFlag = "E";
                }
                return $.Deferred().resolve();
            },
            //服务端保存卡片
            SaveCard: function(ifReFreshClose) {
                var cardSelf = this;
                var tmpAssetDs = cardSelf.cardInstance().dataSource.peek();
                var assetDataStr = JSON.stringify(tmpAssetDs);
                var param = [curCompanyCode, curYear, curPeriod, gsp.rtf.context.get('UserName'), assetDataStr, formFlag, isInitAsset, copyAssetID, copyFssbFlag, copyFjFlag, mulSaveCount, mulSaveCodeRage, mulSaveFixCode, mulSaveStartRunCode, mulSaveCodeLen];
                ////debugger;
                $.loading();
                return this.context.injector.get('$dataServiceProxy').invokeMethod('Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement', 'SaveAssetCard', param).then(function(result) {
                    if (result) {
                        return cardSelf.AfterSave(result, ifReFreshClose);
                    }
                }).fail(function(result) {
                    $.loaded();
                    //$.messager.alert('提示', '保存失败。', 'warning');
                    //return false;
                });
            },
            //共享中心模式保存方法
            SaveCardforFSSC: function() {
                var cardSelf = this;
                $.loading();
                var tmpAssetDs = cardSelf.cardInstance().dataSource.peek();
                var fsscdata = $.extend({}, tmpAssetDs);
                var datarow = fsscdata['GDZCZY'][0];
                datarow["IFZC"] = tmpAssetDs["GDZCZY"][0]["GDZCZY_SFZC"];
                tmpAssetDs["GDZCZY"][0]["GDZCZY_SFZC"] = "1";
                var assetDataStr = JSON.stringify(tmpAssetDs);
                datarow["curCompanyCode"] = curCompanyCode;
                datarow["curYear"] = curYear;
                datarow["curPeriod"] = curPeriod;
                datarow["UserName"] = gsp.rtf.context.get("UserName");
                datarow["assetDataStr"] = assetDataStr;
                datarow["formFlag"] = formFlag;
                datarow["isInitAsset"] = isInitAsset;
                datarow["copyAssetID"] = copyAssetID;
                datarow["copyFssbFlag"] = copyFssbFlag;
                datarow["copyFjFlag"] = copyFjFlag;
                datarow["mulSaveCount"] = mulSaveCount;
                datarow["mulSaveCodeRage"] = mulSaveCodeRage;
                datarow["mulSaveFixCode"] = mulSaveFixCode;
                datarow["mulSaveStartRunCode"] = mulSaveStartRunCode;
                datarow["mulSaveCodeLen"] = mulSaveCodeLen;
                datarow["zcid"] = tmpAssetDs["GDZCZY"][0]["GDZCZY_ID"];
                $.loaded();
                return $.Deferred().resolve(fsscdata);
            },
            //保存前检查
            CheckCardData: function() {
                //判断单位使用项目中是否勾选启用日期项目
                if (cardSelf.CheckFieldExists('GDZCZY_QYRQ') == false) {
                    $.notify.error("单位项目缺少启用日期项目，请打开【单位使用项目】功能保存后再增加资产。");
                    return false;
                }
                var zcbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                var zcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                var zcsl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCSL'), itemDecnDict.GDZCZY_ZCSL));
                var jcz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZ'), itemDecnDict.GDZCZY_JCZ));
                var rzzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_RZZJ'), itemDecnDict.GDZCZY_RZZJ));
                var bnrzzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_BNRZZJ'), itemDecnDict.GDZCZY_BNRZZJ));
                var ljzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_LJZJ'), itemDecnDict.GDZCZY_LJZJ));
                var synx = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYNX'), itemDecnDict.GDZCZY_SYNX));
                var sysj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYSJ'), itemDecnDict.GDZCZY_SYSJ));
                var zjyf = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJYF'), itemDecnDict.GDZCZY_ZJYF));
                var zgzl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZGZL'), itemDecnDict.GDZCZY_ZGZL));
                var ygzl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YGZL'), itemDecnDict.GDZCZY_YGZL));
                var jzzb = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JZZB'), itemDecnDict.GDZCZY_JZZB));
                var jlzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JLZJ'), itemDecnDict.GDZCZY_JLZJ));
                var jtcz = '0';
                if (cardSelf.CheckFieldExists('GDZCZY_JTCZ') == true)
                    jtcz = cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_JTCZ');
                // //自动生成资产编号
                // if (zcbh == '') {
                //     if (isAssetCodeAuto != "0" && formFlag != "Q" && (isInitAsset == "0" || (isInitAsset == "1" && isCswc == "0")))
                //         cardSelf.GetNewAssetCode(false);
                // }
                //原值、累计、减值等值
                if (jtcz == "1") {
                    if (zcyz - ljzj - jzzb < 0) {
                        $.notify.error("资产原值-累计折旧-减值准备不能小于0。");
                        return false;
                    }
                    if (zcyz - jlzj - jzzb < 0) {
                        $.notify.error("资产原值-减值调整时累计折旧-减值准备不能小于0。");
                        return false;
                    }
                } else {
                    if (zcyz - ljzj - jcz - jzzb < 0) {
                        $.notify.error("资产原值-累计折旧-净残值-减值准备不能小于0。");
                        return false;
                    }
                    if (zcyz - jlzj - jcz - jzzb < 0) {
                        $.notify.error("资产原值-减值调整时累计折旧-净残值-减值准备不能小于0。");
                        return false;
                    }
                }
                if (zcyz < ljzj) {
                    $.notify.error("资产原值不能小于当前累计折旧。");
                    return false;
                }
                if (zcsl <= 0) {
                    $.notify.error("资产数量须大于0。");
                    return false;
                }
                // if (GDZCZY_JCZL < 0) {
                //     $.notify.error("净残值率不能小于0。");
                //     return false;
                // }
                // if (ljzj < 0) {
                //     $.notify.error("累计折旧不能小于0。");
                //     return false;
                // }
                if (ljzj < rzzj) {
                    $.notify.error("累计折旧不能小于入账折旧。");
                    return false;
                }
                // if (synx < 0) {
                //     $.notify.error("使用年限不能小于0。");
                //     return false;
                // }
                // if (sysj < 0) {
                //     $.notify.error("使用月份不能小于0。");
                //     return false;
                // }
                // if (zjyf < 0) {
                //     $.notify.error("已提月份不能小于0。");
                //     return false;
                // }
                if (zjyf > sysj) {
                    $.notify.error("已提月份不能大于使用月份。");
                    return false;
                }
                // if (zgzl < 0) {
                //     $.notify.error("总工作量不能小于0。");
                //     return false;
                // }
                // if (ygzl < 0) {
                //     $.notify.error("已完成工作量不能小于0。");
                //     return false;
                // }
                if (ygzl > zgzl) {
                    $.notify.error("已完成工作量不能大于总工作量。");
                    return false;
                }
                // if (rzzj < 0) {
                //     $.notify.error("入账折旧不能小于0。");
                //     return false;
                // }
                // if (bnrzzj < 0) {
                //     $.notify.error("入账前当年折旧不能小于0。");
                //     return false;
                // }
                if (bnrzzj > rzzj) {
                    $.notify.error("入账前当年折旧不能大于入账折旧。");
                    return false;
                }
                if (bnrzzj > ljzj) {
                    $.notify.error("入账前当年折旧不能大于累计折旧。");
                    return false;
                }
                // if (GDZCZY_JZZB < 0) {
                //     $.notify.error("减值准备不能小于0。");
                //     return false;
                // }
                // if (GDZCZY_JLYF < 0) {
                //     $.notify.error("减值后尚可使用月份不能小于0。");
                //     return false;
                // }
                // if (GDZCZY_JLZJ < 0) {
                //     $.notify.error("减值调整时累计折旧不能小于0。");
                //     return false;
                // }
                // if (GDZCZY_YRZYF < 0) {
                //     $.notify.error("已入账月份不能小于0。");
                //     return false;
                // }

                //检查是否必填
                for (var i = 0; i < companyItemDt.length; i++) {
                    var itemRow = companyItemDt[i];
                    var itemCode = itemRow.GDXMZD_XMBH;
                    var itemName = itemRow.GDXMZD_XMMC;
                    var itemType = itemRow.GDXMZD_XMLX;
                    var itemBt = itemRow.GDXMZD_SFBT;
                    var itemCz = itemRow.GDXMZD_IFCZ;
                    var itemDz = itemRow.GDXMZD_IFDZ;
                    var itemLen = itemRow.GDXMZD_LENG;
                    var itemValue;
                    if (itemType == 'N') { //数值型
                        itemValue = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(itemCode), itemDecnDict[itemCode]));
                        if (itemBt == '1' && itemValue == 0) { //检查必填
                            $.notify.error("请填写" + itemName + "。");
                            return false;
                        }
                        if (itemCode.indexOf('GDZCZY_SJ') < 0 && itemValue < 0) { //检查小于0
                            $.notify.error(itemName + "不能小于0。");
                            return false;
                        }

                    } else if (itemType == 'C') { //字符型
                        itemValue = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(itemCode);
                        //检查必填
                        if (itemBt == '1' && (itemValue == null || itemValue == '')) {
                            $.notify.error("请填写" + itemName + "。");
                            return false;
                        }
                        //检查长度
                        if (cardSelf.GetLength(itemValue) > itemLen) {
                            $.notify.error(itemName + "不允许超过" + itemLen + "字符（汉字占两个字符），请检查。");
                            return false;
                        }
                        // if(itemCz!='1' && itemDz!='1'){//字符是否包含非法字符
                        //服务端判断
                        // }

                    } else if (itemType == 'D') { //日期型
                        itemValue = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(itemCode);
                        if (itemBt == '1' && itemValue == '') { //检查必填
                            $.notify.error("请填写" + itemName + "。");
                            return false;
                        }
                    } else { //布尔型
                        itemValue = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(itemCode);
                        if (itemValue == '') {
                            cardSelf.UpdateBindData(itemCode, false);
                        }
                    }
                }
                //使用单位使用部门后台设置必填的情况，直接赋值就没用了，改在null值提示后再赋//设置某些列为空时的默认值
                var sydw = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYDW');
                if (sydw == '' || $.trim(sydw) == '') {
                    //debugger;
                    sydw = curCompanyCode;
                    cardSelf.UpdateBindData('GDZCZY_SYDW', sydw);
                    cardSelf.UpdateBindData('GDZCZY_SYDWMC', curCompanyName);
                }
                var dwbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_DWBH');
                var bmbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_BMBH');
                var bmbhmc = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_BMBHMC');
                var sybm = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYBM');
                if (sybm == '' || $.trim(sybm) == '') {
                    if (sydw != '' && $.trim(sydw) != '' && sydw == dwbh) {
                        sybm = bmbh;
                        cardSelf.UpdateBindData('GDZCZY_SYBM', sybm);
                        cardSelf.UpdateBindData('GDZCZY_SYBMMC', bmbhmc);
                    } else {
                        $.notify.error("请填写使用部门。");
                        return false;
                    }
                }
                //入账日期
                var rzrq = cardSelf.FormatDate8(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_RZRQ'));
                if (rzrq == '' || $.trim(rzrq) == '') {
                    $.notify.error("请填写入账日期。");
                    return false;
                }
                var rzqj = rzrq.substring(0, 6); //入账期间
                var sfzc = '0';
                if (cardSelf.CheckFieldExists('GDZCZY_SFZC') == true)
                    sfzc = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SFZC');
                if (isInitAsset == '1') { //初始
                    if (rzqj >= curYear + curPeriod) {
                        $.notify.error("入账日期必须小于当前期间。");
                        return false;
                    }
                } else {
                    if (rzqj != curYear + curPeriod && (sfzc == '0' || formFlag == 'C')) {
                        $.notify.error("入账日期必须在当前期间内。");
                        return false;
                    }
                }
                //启用日期必须早于入账日期
                var qyrq = cardSelf.FormatDate8(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_QYRQ'));
                if (qyrq == '' || $.trim(qyrq) == '') {
                    $.notify.error("请填写启用日期。");
                    return false;
                }
                if (qyrq < rzrq) {
                    $.notify.error("入账日期不能早于启用日期。");
                    return false;
                }
                //折旧方法
                if (jzzb > 0) {
                    if (cardDeprecDr.YZJE.indexOf('GDZCZY_JZZB') < 0) {
                        $.notify.error("该资产已做减值，请选择包含减值准备的折旧方法。");
                        return false;
                    }
                }
                //总工作量
                if (cardDeprecDr.YZJE.indexOf('GDZCZY_ZGZL') >= 0 && isAddBtGzl == "1") {
                    if (zgzl <= 0) {
                        $.notify.error("请输入总工作量。");
                        return false;
                    }
                }
                return true;
            },
            //记录卡片数据
            ReportCardData: function() {
                var mainRow = cardSelf.cardInstance().dataSource.tables('GDZCZY').peek()[0];
                for (var field in mainRow) {
                    preCardDr[field] = mainRow[field];
                    changeCardDr[field] = mainRow[field];
                }
            },
            //检查是否修改
            CheckHaveChanged: function() {
                var mainRow = cardSelf.cardInstance().dataSource.tables('GDZCZY').peek()[0];
                for (var field in mainRow) {
                    if (preCardDr[field] != mainRow[field])
                        return true;
                }
                return false;
            },
            //字段是否存在
            CheckFieldExists: function(fieldName) {
                if (cardSelf.cardInstance().dataSource.tables('GDZCZY').peek()[0][fieldName] == undefined)
                    return false;
                else
                    return true;
            },
            //#endregion

            //#region 刷新和关闭
            refreshForm: function() {
                var haveChange = false;
                if (formFlag == 'Q') {
                    return gsp.rtf.func.refreshFunc(curFuncID);
                } else if (formFlag == 'A' || formFlag == 'F')
                    haveChange = true;
                else if (cardSelf.CheckHaveChanged() == true)
                    haveChange = true;
                else {
                    return gsp.rtf.func.refreshFunc(curFuncID);
                }
                if (haveChange == true) {
                    cardSelf.ThreeButtonConfirm('提示', '数据已修改，是否保存？').then(function(result) {
                        //debugger;
                        if (result == '1') {
                            //检查数据
                            if (cardSelf.CheckCardData() == false) {
                                mulSaveCount = 0;
                                return false;
                            }

                            //检查资产编号
                            var zcbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                            if ((zcbh == '' || $.trim(zcbh) == '') && mulSaveCount == 0 && isAssetCodeAuto == '0') { //保存一份 且 不自动生成编号 且 编号空
                                $.notify.error("请填写资产编号。");
                                mulSaveCount = 0;
                                return false;
                            } else if ((zcbh == '' || $.trim(zcbh) == '') && mulSaveCount == 0 && isAssetCodeAuto != '0') { //保存一份 且 自动生成编号 且 编号空
                                //调用服务端
                                //资产编号为空 并且 自动生成编号
                                cardSelf.GetNewAssetCode(false).then(function() {
                                    zcbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                                    if (zcbh == '' || $.trim(zcbh) == '')
                                        return false;
                                    else {
                                        cardSelf.SaveCard('refresh');
                                    }
                                });
                            } else { //保存多份(服务端生成编号) 或 保存一份 且 编号非空
                                cardSelf.SaveCard('refresh');
                            }
                        } else if (result == '0') {
                            return gsp.rtf.func.refreshFunc(curFuncID);
                        }
                    });
                    return false;
                } else {
                    return gsp.rtf.func.refreshFunc(curFuncID);
                }
            },
            closeForm: function() {
                if (needClose == true)
                    return true;
                var haveChange = false;
                if (formFlag == 'Q') {
                    needClose = true;
                    return gsp.rtf.func.close(curFuncID);
                } else if (formFlag == 'A' || formFlag == 'F')
                    haveChange = true;
                else if (cardSelf.CheckHaveChanged() == true)
                    haveChange = true;
                else {
                    needClose = true;
                    return gsp.rtf.func.close(curFuncID);
                }
                if (haveChange == true) {
                    cardSelf.ThreeButtonConfirm('提示', '数据已修改，是否保存？').then(function(result) {
                        //debugger;
                        if (result == '1') {
                            //检查数据
                            if (cardSelf.CheckCardData() == false) {
                                mulSaveCount = 0;
                                return false;
                            }

                            //检查资产编号
                            var zcbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                            if ((zcbh == '' || $.trim(zcbh) == '') && mulSaveCount == 0 && isAssetCodeAuto == '0') { //保存一份 且 不自动生成编号 且 编号空
                                $.notify.error("请填写资产编号。");
                                mulSaveCount = 0;
                                return false;
                            } else if ((zcbh == '' || $.trim(zcbh) == '') && mulSaveCount == 0 && isAssetCodeAuto != '0') { //保存一份 且 自动生成编号 且 编号空
                                //调用服务端
                                //资产编号为空 并且 自动生成编号
                                cardSelf.GetNewAssetCode(false).then(function() {
                                    zcbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCBH');
                                    if (zcbh == '' || $.trim(zcbh) == '')
                                        return false;
                                    else {
                                        cardSelf.SaveCard('close');
                                    }
                                });
                            } else { //保存多份(服务端生成编号) 或 保存一份 且 编号非空
                                cardSelf.SaveCard('close');
                            }
                        } else if (result == '0') {
                            needClose = true;
                            return gsp.rtf.func.close(curFuncID);
                        }
                    });
                    return false;
                } else {
                    needClose = true;
                    return gsp.rtf.func.close(curFuncID);
                }
            },
            //三个按钮的选择框 “1”为是，“0”为否
            ThreeButtonConfirm: function(title, message) {
                var wvself = this;
                var defer = $.Deferred(),
                    t = title ? title : ctrlLang.delConfirmT,
                    m = message ? message : ctrlLang.delConfirmM;

                //解决confirm框右上角关闭按钮的点击事件，捕获到是defer的结果
                $.fn.window.defaults.closable = false;

                wvself.Threeconfirm(t, m, function(r) {
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
            Threeconfirm: function(title, msg, fn) {
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

                buttons[$.messager.defaults.cancel] = function() {
                    win.window('close');
                    if (fn) {
                        fn("Cancel");
                        return false;
                    }
                };

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
            //#endregion

            //#endregion

            //#region 控件事件
            //数据变化操作
            UpdateBindData: function(field, value) {
                cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().setValue(field, value);
                changeCardDr[field] = value;
            },
            //数值框丢失焦点事件
            NumberBoxBlur: function(controlItemCode) {
                //值无变化 直接返回
                var oldValue = Number(cardSelf.toDecimal(changeCardDr[controlItemCode], itemDecnDict[controlItemCode]));
                var newValue = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(controlItemCode), itemDecnDict[controlItemCode]));
                if (newValue == oldValue)
                    return;
                changeCardDr[controlItemCode] = newValue; //更新判断值实时变化的数据

                var needCalculate = false; //特殊情况需要重算：入账折旧导致累计折旧变了等
                var zcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                var jczl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZL'), itemDecnDict.GDZCZY_JCZL));
                var jcz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZ'), itemDecnDict.GDZCZY_JCZ));
                var rzzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_RZZJ'), itemDecnDict.GDZCZY_RZZJ));
                var bnrzzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_BNRZZJ'), itemDecnDict.GDZCZY_BNRZZJ));
                var ljzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_LJZJ'), itemDecnDict.GDZCZY_LJZJ));
                var synx = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYNX'), itemDecnDict.GDZCZY_SYNX));
                var sysj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYSJ'), itemDecnDict.GDZCZY_SYSJ));
                var zjyf = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJYF'), itemDecnDict.GDZCZY_ZJYF));
                var zgzl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZGZL'), itemDecnDict.GDZCZY_ZGZL));
                var ygzl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YGZL'), itemDecnDict.GDZCZY_YGZL));
                var jtcz = '0';
                if (cardSelf.CheckFieldExists('GDZCZY_JTCZ') == true)
                    jtcz = cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_JTCZ');
                var zjbh = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJBH');

                if (controlItemCode == 'GDZCZY_ZCYZ') {
                    //资产原值-净残值-入账折旧-累计折旧-月折旧额/率
                    //                  |-入账前当年折旧
                    cardSelf.CalculateNetSalvage(zcyz, jczl); //重算净残值
                    cardSelf.CalculatorRzzj(); //重算入账折旧
                    cardSelf.CalculatorDepre(true); //重算累计折旧
                } else if (controlItemCode == 'GDZCZY_JCZL') {
                    if (jczl > 100 || jczl < 0) {
                        $.messager.alert('提示', '净残值率取值范围：0~100。', 'warning');
                        //用jcz算出原来的jczl
                        cardSelf.CalculateNetSalvageRate(zcyz, jcz);
                        return;
                    }
                    cardSelf.CalculateNetSalvage(zcyz, jczl); //重算净残值
                    cardSelf.CalculatorRzzj(); //重算入账折旧
                    cardSelf.CalculatorDepre(true); //重算累计折旧
                } else if (controlItemCode == 'GDZCZY_JCZ') {
                    //净残值-净残值率-月折旧额/率
                    cardSelf.CalculateNetSalvageRate(zcyz, jcz);
                } else if (controlItemCode == 'GDZCZY_RZZJ') {
                    //入账折旧-累计折旧-月折旧额/率
                    //   |-入账前当年折旧
                    if (rzzj < bnrzzj) {
                        bnrzzj = rzzj;
                        cardSelf.UpdateBindData('GDZCZY_BNRZZJ', cardSelf.toDecimalZeroize(bnrzzj, itemDecnDict.GDZCZY_BNRZZJ));
                    }
                    if (rzzj > ljzj) {
                        ljzj = rzzj;
                        cardSelf.UpdateBindData('GDZCZY_LJZJ', cardSelf.toDecimalZeroize(ljzj, itemDecnDict.GDZCZY_LJZJ));
                        if (cardSelf.CheckNeedCalculate("GDZCZY_LJZJ", cardDeprecDr.YZJL) == true || cardSelf.CheckNeedCalculate("GDZCZY_LJZJ", cardDeprecDr.YZJE) == true)
                            needCalculate = true;
                    }
                } else if (controlItemCode == 'GDZCZY_LJZJ') {
                    if ((rzzj > ljzj) || (rzzj == 0)) {
                        rzzj = ljzj;
                        cardSelf.UpdateBindData('GDZCZY_RZZJ', cardSelf.toDecimalZeroize(rzzj, itemDecnDict.GDZCZY_RZZJ));
                    }
                } else if (controlItemCode == 'GDZCZY_BNRZZJ') { //入账前当年折旧
                    //入账前当年折旧-入账折旧-累计折旧
                    if (bnrzzj > rzzj) {
                        rzzj = bnrzzj;
                        cardSelf.UpdateBindData('GDZCZY_RZZJ', cardSelf.toDecimalZeroize(rzzj, itemDecnDict.GDZCZY_RZZJ));
                    }
                    if (rzzj > ljzj) {
                        ljzj = rzzj;
                        cardSelf.UpdateBindData('GDZCZY_LJZJ', cardSelf.toDecimalZeroize(ljzj, itemDecnDict.GDZCZY_LJZJ));
                        if (cardSelf.CheckNeedCalculate("GDZCZY_LJZJ", cardDeprecDr.YZJL) == true || cardSelf.CheckNeedCalculate("GDZCZY_LJZJ", cardDeprecDr.YZJE) == true)
                            needCalculate = true;
                    }
                } else if (controlItemCode == 'GDZCZY_SYNX') { //使用年限
                    //使用年限-使用月份-已提月份-入账折旧
                    if (synx > 999 || (synx - Math.floor(synx)) * 100 > 11) {
                        $.messager.alert('提示', '使用年限整数表示年份，范围0~998，小数表示月份，范围01~11。', 'warning');
                        cardSelf.UpdateBindData(controlItemCode, 0);
                        return;
                    }
                    sysj = Math.floor(synx) * 12 + (synx - Math.floor(synx)) * 100;
                    cardSelf.UpdateBindData('GDZCZY_SYSJ', cardSelf.toDecimalZeroize(sysj, itemDecnDict.GDZCZY_SYSJ));
                    cardSelf.CalculateDepreMonth(); //重算已提月份
                    cardSelf.CalculateNetSalvage(zcyz, jczl); //重算净残值
                    cardSelf.CalculatorRzzj(); //重算入账折旧
                    cardSelf.CalculatorDepre(true); //重算累计折旧
                } else if (controlItemCode == 'GDZCZY_SYSJ') { //使用时间
                    //使用月份-使用年限-已提月份-入账折旧
                    if (sysj > 11988) {
                        $.messager.alert('提示', '使用月份不可超过11988，即999年。', 'warning');
                        //用synx算出原来的sysj
                        sysj = Math.floor(synx) * 12 + (synx - Math.floor(synx)) * 100;
                        cardSelf.UpdateBindData(controlItemCode, cardSelf.toDecimalZeroize(sysj, itemDecnDict.GDZCZY_SYSJ));
                        return;
                    }
                    synx = Math.floor(sysj / 12) + sysj - Math.floor(sysj / 12) * 12 / 100;
                    cardSelf.UpdateBindData('GDZCZY_SYNX', cardSelf.toDecimalZeroize(synx, itemDecnDict.GDZCZY_SYNX));
                    cardSelf.CalculateDepreMonth(); //重算已提月份
                    cardSelf.CalculateNetSalvage(zcyz, jczl); //重算净残值
                    cardSelf.CalculatorRzzj(); //重算入账折旧
                    cardSelf.CalculatorDepre(true); //重算累计折旧
                } else if (controlItemCode == 'GDZCZY_ZGZL') {
                    //总工作量-已工作量--入账折旧
                    if (zgzl < ygzl) {
                        ygzl = zgzl;
                        cardSelf.UpdateBindData('GDZCZY_YGZL', cardSelf.toDecimalZeroize(ygzl, itemDecnDict.GDZCZY_YGZL));
                    }
                    cardSelf.CalculatorRzzj(); //重算入账折旧
                } else if (controlItemCode == 'GDZCZY_YGZL') {
                    //已工作量-总工作量
                    if (ygzl > zgzl) {
                        zgzl = ygzl;
                        cardSelf.UpdateBindData('GDZCZY_ZGZL', cardSelf.toDecimalZeroize(zgzl, itemDecnDict.GDZCZY_ZGZL));
                    }
                    cardSelf.CalculatorRzzj(); //重算入账折旧
                } else if (controlItemCode == 'GDZCZY_ZJYF') {
                    cardSelf.CalculateNetSalvage(zcyz, jczl); //重算净残值
                    cardSelf.CalculatorRzzj(); //重算入账折旧
                    cardSelf.CalculatorDepre(true); //重算累计折旧
                } else if (controlItemCode == 'GDZCZY_JZZB') {
                    cardSelf.CalculateNetSalvage(zcyz, jczl); //重算净残值
                    cardSelf.CalculatorRzzj(); //重算入账折旧
                    if (zjbh == "J3")
                        cardSelf.CalculatorDepre(true); //重算累计折旧
                }
                cardSelf.CalculateFunc();
                if (needCalculate == true || cardSelf.CheckNeedCalculate(controlItemCode, cardDeprecDr.YZJL) == true || cardSelf.CheckNeedCalculate(controlItemCode, cardDeprecDr.YZJE) == true || cardDeprecDr.JSZQ == "0") {
                    cardSelf.CalculateMonthDepreRate(); //重算月折旧率
                    cardSelf.CalculateMonthDepre(); //重算月折旧额
                }

                cardSelf.CalculateYearDepreRate(); //重算年折旧率
                cardSelf.CalculateYearDepre(); //重算年折旧额
            },
            //文本框丢失焦点事件
            TextBoxBlur: function(controlItemCode) {
                //值无变化 直接返回
                var oldValue = changeCardDr[controlItemCode];
                var newValue = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(controlItemCode);
                if (newValue == oldValue)
                    return;
                changeCardDr[controlItemCode] = newValue; //更新判断值实时变化的数据

                //自动生成编号
                if (isAssetCodeAuto != "0" && formFlag == "A" && assetCodeFunc.indexOf("," + controlItemCode + ",") >= 0)
                    cardSelf.GetNewAssetCode(true);
            },
            //日期框变化事件
            my97dateboxDchanged: function(controlItemCode, newValue) {
                var oldValue = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(controlItemCode);
                changeCardDr[controlItemCode] = newValue; //更新判断值实时变化的数据
                if (newValue == '')
                    return;
                if (controlItemCode == "GDZCZY_RZRQ" || controlItemCode == "GDZCZY_QYRQ") {
                    if (controlItemCode == "GDZCZY_RZRQ") {
                        if (cardSelf.CheckFieldExists("GDZCZY_QYRQ") == false) {
                            throw new Error("单位项目缺少启用日期项目，请打开【单位使用项目】功能保存后再增加资产。");
                        }
                        cardSelf.UpdateBindData('GDZCZY_QYRQ', newValue);
                    }
                    if (controlItemCode == "GDZCZY_QYRQ" && isInitAsset == "1")
                        cardSelf.UpdateBindData('GDZCZY_RZRQ', newValue);
                    //年月变化才触发
                    if (cardSelf.FormatDate8(oldValue).substring(0, 6) != cardSelf.FormatDate8(newValue).substring(0, 6)) {
                        cardSelf.CalculateDepreMonth(); //重算已提月份
                        cardSelf.CalculatorDepre(true); //重算累计折旧
                        cardSelf.CalculatorRzzj(); //重算入账折旧
                        cardSelf.CalculateFunc();
                    }
                }
                //自动生成编号
                if (isAssetCodeAuto != "0" && formFlag == "A" && assetCodeFunc.indexOf("," + controlItemCode + ",") >= 0)
                    cardSelf.GetNewAssetCode(true);
            },
            my97dateboxchanged: function(controlItemCode, newValue) {
                var oldValue = changeCardDr[controlItemCode];
                changeCardDr[controlItemCode] = newValue; //更新判断值实时变化的数据
                if (newValue == '')
                    return;
                if (controlItemCode == "GDZCZY_RZRQ" || controlItemCode == "GDZCZY_QYRQ") {
                    if (controlItemCode == "GDZCZY_RZRQ") {
                        if (cardSelf.CheckFieldExists("GDZCZY_QYRQ") == false) {
                            throw new Error("单位项目缺少启用日期项目，请打开【单位使用项目】功能保存后再增加资产。");
                        }
                        cardSelf.UpdateBindData('GDZCZY_QYRQ', newValue);
                    }
                    if (controlItemCode == "GDZCZY_QYRQ" && isInitAsset == "1")
                        cardSelf.UpdateBindData('GDZCZY_RZRQ', newValue);
                    //年月变化才触发
                    if (cardSelf.FormatDate8(oldValue).substring(0, 6) != cardSelf.FormatDate8(newValue).substring(0, 6)) {
                        cardSelf.CalculateDepreMonth(); //重算已提月份
                        cardSelf.CalculatorDepre(true); //重算累计折旧
                        cardSelf.CalculatorRzzj(); //重算入账折旧
                        cardSelf.CalculateFunc();
                    }
                }
                //自动生成编号
                if (isAssetCodeAuto != "0" && formFlag == "A" && assetCodeFunc.indexOf("," + controlItemCode + ",") >= 0)
                    cardSelf.GetNewAssetCode(true);
            },
            //智能帮助前事件
            SmarthelpOnDictEntryPicking: function(controlItemCode, help) {
                var helpControl = $("#XSmart" + controlItemCode).adplookupbox('options').adp;

                if (controlItemCode == 'GDZCZY_SYBM') { //使用部门
                    var tmpSydw = cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_SYDW'); //使用单位
                    if (tmpSydw == '')
                        tmpSydw = curCompanyCode;
                    helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "LSBMZD_DWBH", " =", "'" + tmpSydw + "' and (LSBMZD_TYBZ='0' or LSBMZD_TYND>'" + curYear + "') and LSBMZD_HSF='1' " + sybmAuthorityCondi, "Express", " ", " ") + "]";
                } else if (controlItemCode == 'GDZCZY_SYR') { //使用人
                    var tmpSyrdw = cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_SYDW'); //使用单位
                    if (tmpSyrdw == '')
                        tmpSyrdw = curCompanyCode;
                    helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", "LSZGZD_DWBH", " =", "'" + tmpSyrdw + "' and (LSZGZD_TYBZ='0' or LSZGZD_TYND>'" + curYear + "')", "Express", " ", " ") + "]";
                    helpControl.navcondition = "[" + cardSelf.ArrangeCondition(" ", "LSBMZD_DWBH", " =", "'" + tmpSyrdw + "' and (LSBMZD_TYBZ='0' or LSBMZD_TYND>'" + curYear + "') and LSBMZD_HSF='1' ", "Express", " ", " ") + "]";
                } else if (controlItemCode.indexOf('GDZCZY_XM') >= 0) { //自定义项
                    for (var i = 0; i < companyItemDt.length; i++) {
                        var itemRow = companyItemDt[i];
                        if (itemRow.GDXMZD_XMBH == controlItemCode) {
                            var helpItemDz = itemRow.GDXMZD_IFDZ;
                            var helpItemCz = itemRow.GDXMZD_IFCZ;
                            var helpItemCzzd = itemRow.GDXMZD_CZZD;
                            var helpItemCondi = itemRow.GDCZLB_WHER;
                            var helpItemHelpCode = itemRow.GDCZLB_HELPCODECOL;
                            //设置帮助条件       
                            if (helpItemCz == '1') { //设置参照条件 //注意参照资产自身的
                                // if(helpItemCzHelpID =="505896b9-a1ba-4538-8056-d2b3d98bec25")
                                // helpControl.FullTreeFilterExpression = IntelligentHelpBasic.GetHelpExpress("COMPANYID", " > ", "' '");

                                helpItemCondi = helpItemCondi.replace(/@YY@/g, curYear);
                                helpItemCondi = helpItemCondi.replace(/&HSDW&/g, curCompanyCode);
                                //helpItemCondi = helpItemCondi.replace(/||/g, " {DAE~JoinSymbol} ");
                                while (helpItemCondi.indexOf("@") >= 0) {
                                    var field = cardSelf.CutoutData("@", "@", helpItemCondi);
                                    if (cardSelf.CheckFieldExists(field) == true) {
                                        helpItemCondi = helpItemCondi.replace('@' + field + '@', cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(field));
                                    } else {
                                        break;
                                    }
                                }
                                if (helpItemCondi.indexOf("@") >= 0) //(未选类别 且 过滤中有类别特性项目) 或 错误过滤条件
                                    helpItemCondi = '';

                                if ($.trim(helpItemCondi) == '')
                                    helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", helpItemHelpCode, " <>", "' '", "Express", " ", " ") + "]";
                                else
                                    helpControl.condition = "[" + cardSelf.ArrangeCondition(" ", helpItemHelpCode, " <>", "' ' and " + helpItemCondi, "Express", " ", " ") + "]";
                            }
                        }
                    }
                }
            },
            //智能帮助后事件
            SmarthelpOnDictEntryPicked: function(controlItemCode, rowData) {
                //值无变化 直接返回
                var oldValue = changeCardDr[controlItemCode];
                var newValue = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(controlItemCode);
                if (newValue == oldValue)
                    return;
                changeCardDr[controlItemCode] = newValue; //更新判断值实时变化的数据

                if (controlItemCode == "GDZCZY_LBBH") { //资产类别
                    cardSelf.ReloadForm(rowData.GDZCLB_LBBH);
                } else if (controlItemCode == "GDZCZY_ZJBH") { //折旧方法
                    cardDeprecDr.ZJMC = rowData.GDZJFF_ZJMC;
                    cardDeprecDr.YZJE = rowData.GDZJFF_YZJE;
                    cardDeprecDr.YZJL = rowData.GDZJFF_YZJL;
                    cardDeprecDr.JSZQ = rowData.GDZJFF_JSZQ;
                    cardDeprecDr.ZJEZQ = rowData.GDZJFF_YZJEZQ;
                    cardDeprecDr.ZJLZQ = rowData.GDZJFF_YZJLZQ;
                    if (isNotJt == '0') {
                        //重算
                        if (cardDeprecDr.YZJE != '' || cardDeprecDr.YZJL != '') {
                            cardSelf.CalculatorDepre(false); //重算累计折旧 是否计算月折旧额
                            cardSelf.CalculateMonthDepreRate(); //重算月折旧率
                            cardSelf.CalculateYearDepreRate(); //重算年折旧率
                            cardSelf.CalculateMonthDepre(); //重算月折旧额
                            cardSelf.CalculateYearDepre(); //重算年折旧额
                            cardSelf.CalculatorRzzj(); //重算入账折旧
                        }
                    }
                } else if (controlItemCode == "GDZCZY_ZTBH") { //资产状态
                    //重算 当状态为不提折旧时累计折旧不自动计算
                }

                //自动生成编号
                if (isAssetCodeAuto != "0" && formFlag == "A" && assetCodeFunc.indexOf("," + controlItemCode + ",") >= 0)
                    cardSelf.GetNewAssetCode(true);
            },
            //#endregion

            //#region 重算项目
            //检查是否需要重算
            CheckNeedCalculate: function(itemCode, itemFunc) {
                var blNeed = false;
                if (itemFunc.indexOf(itemCode) > 0)
                    return true;
                switch (itemCode) {
                    case "GDZCZY_ZCYZ":
                        if (itemFunc.indexOf("GDZCZY_JCZ") >= 0 || itemFunc.indexOf("GDZCZY_JCZL") >= 0)
                            blNeed = true;
                        break;
                    case "GDZCZY_JCZL":
                        if (itemFunc.indexOf("GDZCZY_ZCYZ") >= 0 || itemFunc.indexOf("GDZCZY_JCZ") >= 0)
                            blNeed = true;
                        break;
                    case "GDZCZY_JCZ":
                        if (itemFunc.indexOf("GDZCZY_ZCYZ") >= 0 || itemFunc.indexOf("GDZCZY_JCZL") >= 0)
                            blNeed = true;
                        break;
                    case "GDZCZY_SYNX":
                        if (itemFunc.indexOf("GDZCZY_SYSJ") >= 0)
                            blNeed = true;
                        break;
                    case "GDZCZY_SYSJ":
                        if (itemFunc.indexOf("GDZCZY_SYNX") >= 0)
                            blNeed = true;
                        break;
                    default:
                        blNeed = false;
                        break;
                }
                return blNeed;
            },
            //重算入账折旧
            CalculatorRzzj: function() {
                if (isNotJt == "1")
                    return;

                //不计提状态的不处理？ if (isZJZT == "0") return;

                //月折旧额公式中使用累计折旧或入账折旧的 不需算
                if (cardDeprecDr.YZJE.indexOf("GDZCZY_LJZJ") >= 0 || cardDeprecDr.YZJE.indexOf("GDZCZY_RZZJ") >= 0)
                    return;

                var decRzzj = 0;
                var decTemZje = 0;
                var strZJBH = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJBH');
                var decYzje = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YZJE'), itemDecnDict.GDZCZY_YZJE));
                if (decYzje == 0) {
                    cardSelf.CalculateMonthDepreRate();
                    cardSelf.CalculateMonthDepre();
                }
                decYzje = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YZJE'), itemDecnDict.GDZCZY_YZJE));
                var decZjyf = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJYF'), itemDecnDict.GDZCZY_ZJYF));
                //检查是否存在使用月份字段
                if (cardSelf.CheckFieldExists("GDZCZY_SYSJ") == false) {
                    throw new Error("单位项目缺少使用月份项目，请打开【单位使用项目】功能保存后再增加资产。");
                }
                var decSysj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYSJ'), itemDecnDict.GDZCZY_SYSJ));
                var decZgzl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZGZL'), itemDecnDict.GDZCZY_ZGZL));
                var decYgzl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YGZL'), itemDecnDict.GDZCZY_YGZL));
                var decZcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                var decJcz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZ'), itemDecnDict.GDZCZY_JCZ));
                var decJzzb = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JZZB'), itemDecnDict.GDZCZY_JZZB));
                var decLjzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_LJZJ'), itemDecnDict.GDZCZY_LJZJ));

                if (strZJBH != '' && decYzje > 0 && strZJBH != "02" && strZJBH != "J2" && decZjyf > 0) {
                    for (var i = 1; i <= decZjyf; i++) {
                        if (cardDeprecDr.JSZQ == "0" && (cardDeprecDr.ZJEZQ != "M" || cardDeprecDr.ZJLZQ != "M")) {
                            if ((i == 1) || (i % 12 == 1)) {
                                if (strZJBH != "03" || ((strZJBH == "03") && ((decSysj - decZjyf) >= 24))) {
                                    if (cardDeprecDr.YZJE != '') {
                                        decTemZje = Number(cardSelf.toDecimal(cardSelf.Evaluate(cardSelf.AnalysisExpress(cardDeprecDr.YZJE)), itemDecnDict.GDZCZY_YZJE));
                                    }
                                }
                                if ((strZJBH == "03") && ((decSysj - decZjyf) == 23)) {
                                    decTemZje = Number(cardSelf.toDecimal((decZcyz - decLjzj - decJcz) / 24, itemDecnDict.GDZCZY_YZJE));
                                }
                            }
                        } else {
                            if (cardDeprecDr.YZJE != '') {
                                decTemZje = Number(cardSelf.toDecimal(cardSelf.Evaluate(cardSelf.AnalysisExpress(cardDeprecDr.YZJE)), itemDecnDict.GDZCZY_YZJE));
                            }
                        }
                        decRzzj = Number(cardSelf.toDecimal(decRzzj + decTemZje, iiJeDecn));
                    }
                }
                if (decZgzl > 0 && decYgzl > 0 && strZJBH == "02" && decZcyz > 0) {
                    decRzzj = Number(cardSelf.toDecimal((decYgzl / decZgzl) * (decZcyz - decJcz), itemDecnDict.GDZCZY_RZZJ));
                }
                if (decZgzl > 0 && decYgzl > 0 && strZJBH == "J2" && decZcyz > 0 && decJzzb > 0) {
                    decRzzj = Number(cardSelf.toDecimal((decYgzl / decZgzl) * (decZcyz - decJcz - decJzzb), itemDecnDict.GDZCZY_RZZJ));
                }
                var decSyjz = Number(cardSelf.toDecimal(decZcyz - decJcz - decJzzb, iiJeDecn)); //剩余价值
                if (decZjyf >= decSysj || decRzzj > decSyjz) {
                    decRzzj = decSyjz;
                }
                var tabLjzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_LJZJ'), itemDecnDict.GDZCZY_LJZJ));
                if (tabLjzj > decSyjz) {
                    tabLjzj = decSyjz;
                    cardSelf.UpdateBindData('GDZCZY_LJZJ', cardSelf.toDecimalZeroize(tabLjzj, itemDecnDict.GDZCZY_LJZJ));
                }

                var cwqr = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_CWQR'); //财务确认
                if (decRzzj > tabLjzj || formFlag == 'A' || formFlag == 'F' || cwqr == '0') {
                    cardSelf.UpdateBindData('GDZCZY_LJZJ', cardSelf.toDecimalZeroize(decRzzj, itemDecnDict.GDZCZY_LJZJ));
                    cardSelf.UpdateBindData('GDZCZY_RZZJ', cardSelf.toDecimalZeroize(decRzzj, itemDecnDict.GDZCZY_RZZJ));
                } else
                    cardSelf.UpdateBindData('GDZCZY_RZZJ', cardSelf.toDecimalZeroize(decRzzj, itemDecnDict.GDZCZY_RZZJ));
            },
            //重算累计折旧 是否计算月折旧额
            CalculatorDepre: function(JSYzje) {
                //双倍余额递减法 已提折旧月份变化，月折旧额也变化
                var strZJBH = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJBH');
                if (strZJBH == "03" || strZJBH == "J3") {
                    var zcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                    var jcz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZ'), itemDecnDict.GDZCZY_JCZ));
                    var jzzb = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JZZB'), itemDecnDict.GDZCZY_JZZB));
                    var sysj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYSJ'), itemDecnDict.GDZCZY_SYSJ));
                    var zjyf = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJYF'), itemDecnDict.GDZCZY_ZJYF));
                    //更新累计折旧
                    var ljzj = Number(cardSelf.toDecimal(cardSelf.CalLjzj(strZJBH, zcyz, jcz, jzzb, zjyf, sysj), itemDecnDict.GDZCZY_LJZJ));
                    cardSelf.UpdateBindData('GDZCZY_LJZJ', cardSelf.toDecimalZeroize(ljzj, itemDecnDict.GDZCZY_LJZJ));
                    //更新月折旧额
                    if (JSYzje == true)
                        cardSelf.CalculateMonthDepre();
                }
            },
            //重算月折旧率
            CalculateMonthDepreRate: function() {
                if (isNotJt == "1")
                    return;
                if (cardDeprecDr.YZJL.indexOf("GDZCZY_YZJE") >= 0 && cardDeprecDr.YZJE.indexOf("GDZCZY_YZJL") >= 0) {
                    throw new Error("月折旧率与月折旧额为互算关系，请修改折旧公式。");
                }

                if (cardDeprecDr.YZJL.indexOf("GDZCZY_YZJE") >= 0)
                    cardSelf.CalculateMonthDepre();

                if (cardDeprecDr.YZJL != '') {
                    var strYzjl = cardSelf.Evaluate(cardSelf.AnalysisExpress(cardDeprecDr.YZJL));
                    strYzjl = Number(cardSelf.toDecimal(cardSelf.Evaluate(strYzjl + "*100"), itemDecnDict.GDZCZY_YZJL)); //月折旧率存储百分数%
                    if (Math.floor(strYzjl).toString().length > 12) {
                        throw new Error("月折旧率整数部分不能超过12位。");
                    }
                    cardSelf.UpdateBindData('GDZCZY_YZJL', cardSelf.toDecimalZeroize(strYzjl, itemDecnDict.GDZCZY_YZJL));
                }
            },
            //重算月折旧额
            CalculateMonthDepre: function() {
                if (isNotJt == "1")
                    return;
                if (cardDeprecDr.YZJL.indexOf("GDZCZY_YZJE") >= 0 && cardDeprecDr.YZJE.indexOf("GDZCZY_YZJL") >= 0) {
                    throw new Error("月折旧率与月折旧额为互算关系，请修改折旧公式。");
                }
                if (cardDeprecDr.YZJE.indexOf("GDZCZY_YZJL") >= 0)
                    cardSelf.CalculateMonthDepreRate();

                var strZJEGS = cardDeprecDr.YZJE;
                var strZJBH = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJBH');
                var sysj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYSJ'), itemDecnDict.GDZCZY_SYSJ));
                var zjyf = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJYF'), itemDecnDict.GDZCZY_ZJYF));

                //双倍余额递减法 最后两年的公式
                if ((strZJBH == "03" || strZJBH == "J3") && sysj - zjyf <= 24) {
                    if (strZJBH == "03")
                        strZJEGS = "({@GDZCZY_ZCYZ}-!{@GDZCZY_LJZJ}-!{@GDZCZY_JCZ})/!{" + (sysj - zjyf) + "}";
                    else
                        strZJEGS = "({@GDZCZY_ZCYZ}-!{@GDZCZY_LJZJ}-!{@GDZCZY_JCZ}-!{@GDZCZY_JZZB})/!{" + (sysj - zjyf) + "}";
                }
                if (strZJEGS != '') {
                    var strYzje = Number(cardSelf.toDecimal(cardSelf.Evaluate(cardSelf.AnalysisExpress(strZJEGS)), itemDecnDict.GDZCZY_YZJE));
                    cardSelf.UpdateBindData('GDZCZY_YZJE', cardSelf.toDecimalZeroize(strYzje, itemDecnDict.GDZCZY_YZJE));
                }
            },
            //重算净残值 原值,净残值率
            CalculateNetSalvage: function(zcyz, jczl) {
                var jcz = Number(cardSelf.toDecimal(zcyz * jczl / 100, iiJeDecn));
                cardSelf.UpdateBindData('GDZCZY_JCZ', cardSelf.toDecimalZeroize(jcz, itemDecnDict.GDZCZY_JCZ));
            },
            //重算净残值率 原值,净残值
            CalculateNetSalvageRate: function(zcyz, jcz) {
                var jczl = Number(cardSelf.toDecimal(jcz / zcyz * 100, iiJeDecn));
                cardSelf.UpdateBindData('GDZCZY_JCZL', cardSelf.toDecimalZeroize(jczl, itemDecnDict.GDZCZY_JCZL));
            },
            //重算已提月份
            CalculateDepreMonth: function() {
                if (isNotJt == "1")
                    return;
                if (cardSelf.CheckFieldExists("GDZCZY_QYRQ") == false) {
                    throw new Error("请在【单位使用项目】中勾选“启用日期”资产项目，保存后再增加资产。");
                }
                var strRZRQ = cardSelf.FormatDate8(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_RZRQ'));
                var strQyRQ = cardSelf.FormatDate8(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_QYRQ'));
                if (strRZRQ == '')
                    return;

                //计算根据启用日期、入账日期计算已提月份
                var inRzYear, inDqYear, inRzMonth, inDqMonth, inPoYear, inPoMonth, inToMonth;
                if (isInitAsset == "1") {
                    inRzYear = strRZRQ.substring(0, 4);
                    inRzMonth = strRZRQ.substring(4, 2);
                    inDqYear = curYear;
                    inDqMonth = curPeriod;
                } else {
                    inRzYear = strQyRQ.substring(0, 4);
                    inRzMonth = strQyRQ.substring(4, 2);
                    inDqYear = strRZRQ.substring(0, 4);
                    inDqMonth = strRZRQ.substring(4, 2);
                }
                inPoYear = inRzYear - inDqYear;
                inPoMonth = inDqMonth - inRzMonth;
                //资产卡片初始，初始完成后，会计提折旧，所以已提月份要减1
                if (isInitAsset == "1")
                    inToMonth = Math.abs(inPoYear) * 12 + inPoMonth - 1;
                else
                    inToMonth = Math.abs(inPoYear) * 12 + inPoMonth;

                var decSynx = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYNX'), itemDecnDict.GDZCZY_SYNX));
                var decSS = Math.floor(decSynx) * 12 + (decSynx - Math.floor(decSynx)) * 100;
                var strZJBH = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJBH');

                var decZcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                var decJcz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZ'), itemDecnDict.GDZCZY_JCZ));
                var decJzzb = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JZZB'), itemDecnDict.GDZCZY_JZZB));
                var decYzje = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YZJE'), itemDecnDict.GDZCZY_YZJE));
                var decZgzl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZGZL'), itemDecnDict.GDZCZY_ZGZL));
                var decYgzl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YGZL'), itemDecnDict.GDZCZY_YGZL));

                if (Number(inToMonth) > Number(decSS)) {
                    inToMonth = decSS;
                }
                if (Number(inToMonth < 0)) {
                    inToMonth = 0;
                }
                cardSelf.UpdateBindData('GDZCZY_ZJYF', cardSelf.toDecimalZeroize(inToMonth, itemDecnDict.GDZCZY_ZJYF));

                //若折旧公式中包含GDZCZY_LJZJ和GDZCZY_RZZJ退出
                if (cardDeprecDr.YZJE.indexOf("GDZCZY_LJZJ") >= 0 || cardDeprecDr.YZJE.indexOf("GDZCZY_RZZJ") >= 0)
                    return;
                //更新GDZCZY_LJZJ和GDZCZY_RZZJ
                var ljzj, rzzj = 0;
                if (decZcyz > 0 && decSynx > 0 && strZJBH != '' && strZJBH != "02" && strZJBH != "J2") {
                    ljzj = Number(cardSelf.toDecimal(decYzje * inToMonth, iiJeDecn));
                    rzzj = ljzj;
                    cardSelf.UpdateBindData('GDZCZY_LJZJ', cardSelf.toDecimalZeroize(ljzj, itemDecnDict.GDZCZY_LJZJ));
                    cardSelf.UpdateBindData('GDZCZY_RZZJ', cardSelf.toDecimalZeroize(rzzj, itemDecnDict.GDZCZY_RZZJ));
                }
                if (decZgzl > 0 && decYgzl > 0 && strZJBH == "02" && decZcyz > 0) {
                    ljzj = Number(cardSelf.toDecimal((decYgzl / decZgzl) * (decZcyz - decJcz), iiJeDecn));
                    rzzj = ljzj;
                    cardSelf.UpdateBindData('GDZCZY_LJZJ', cardSelf.toDecimalZeroize(ljzj, itemDecnDict.GDZCZY_LJZJ));
                    cardSelf.UpdateBindData('GDZCZY_RZZJ', cardSelf.toDecimalZeroize(rzzj, itemDecnDict.GDZCZY_RZZJ));
                }
                if (decZgzl > 0 && decYgzl > 0 && strZJBH == "J2" && decZcyz > 0 && decJzzb > 0) {
                    ljzj = Number(cardSelf.toDecimal((decYgzl / decZgzl) * (decZcyz - decJcz - decJzzb), iiJeDecn));
                    rzzj = ljzj;
                    cardSelf.UpdateBindData('GDZCZY_LJZJ', cardSelf.toDecimalZeroize(ljzj, itemDecnDict.GDZCZY_LJZJ));
                    cardSelf.UpdateBindData('GDZCZY_RZZJ', cardSelf.toDecimalZeroize(rzzj, itemDecnDict.GDZCZY_RZZJ));
                }
            },
            //重算年折旧率
            CalculateYearDepreRate: function() {
                if (isNotJt == "1")
                    return;
                var strYzjl = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YZJL'), itemDecnDict.GDZCZY_YZJL));
                var strNzjl = Number(cardSelf.toDecimal(cardSelf.Evaluate(strYzjl + "*12"), itemDecnDict.GDZCZY_NZJL));
                if (strNzjl > 100)
                    strNzjl = "100";
                cardSelf.UpdateBindData('GDZCZY_NZJL', cardSelf.toDecimalZeroize(strNzjl, itemDecnDict.GDZCZY_NZJL));
            },
            //重算年折旧额
            CalculateYearDepre: function() {
                if (isNotJt == "1")
                    return;
                var decZcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                var decJcz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZ'), itemDecnDict.GDZCZY_JCZ));
                var decJzzb = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JZZB'), itemDecnDict.GDZCZY_JZZB));
                var strYzje = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_YZJE'), itemDecnDict.GDZCZY_YZJE));
                var decNzje = Number(cardSelf.toDecimal(cardSelf.Evaluate(strYzje.toString() + "*12"), itemDecnDict.GDZCZY_NZJE));
                var decJtcz = "0"; //计提残值否
                if (cardSelf.CheckFieldExists('GDZCZY_JTCZ') == true)
                    decJtcz = cardSelf.cardInstance().dataSource.tables('GDZCZY').defaultView().currentItem.row().getValue('GDZCZY_JTCZ');

                if (decJtcz == "1") { //计提残值
                    if (decNzje < Number(cardSelf.toDecimal(decZcyz - decJzzb, itemDecnDict.GDZCZY_NZJE)))
                        decNzje = cardSelf.Evaluate(strYzje + "*12");
                    else //一次性折旧
                        decNzje = decZcyz - decJzzb;
                } else { //不计提残值
                    if (decNzje < Number(cardSelf.toDecimal(decZcyz - decJzzb - decJcz, itemDecnDict.GDZCZY_NZJE)))
                        decNzje = cardSelf.Evaluate(strYzje + "*12");
                    else //一次性折旧
                        decNzje = decZcyz - decJzzb - decJcz;
                }
                cardSelf.UpdateBindData('GDZCZY_NZJE', cardSelf.toDecimalZeroize(decNzje, itemDecnDict.GDZCZY_NZJE));
            },
            //重算公式项
            CalculateFunc: function() {
                for (var j = 0; j < companyItemDt.length; j++) {
                    var itemRow = companyItemDt[j];
                    var itemCode = itemRow.GDXMZD_XMBH;
                    var itemName = itemRow.GDXMZD_XMMC;
                    var itemType = itemRow.GDXMZD_XMLX;
                    var itemFunc = itemRow.GDXMZD_JSGS;
                    if (itemType == "N") {
                        if ($.trim(itemFunc) != '') {
                            try {
                                var itemValue = Number(cardSelf.Evaluate(cardSelf.AnalysisExpress(itemFunc)));
                                cardSelf.UpdateBindData(itemCode, cardSelf.toDecimalZeroize(itemValue, itemDecnDict[itemCode]));
                            } catch (e) {
                                throw new Error("“" + itemName + "”公式定义错误或所需计算项目引用不全." + e.message);
                            }
                        }
                    }
                }
            },
            //#endregion

            //#region 解析公式
            //解析计算公式 表达式
            AnalysisExpress: function(expresstion) {
                if (expresstion == '')
                    return "0";

                var tmpStr = $.trim(expresstion).toUpperCase();

                //替换固定项目
                tmpStr = tmpStr.replace(/GDYZFLZ_DQYE/g, "GDZCZY_ZCYZ");
                tmpStr = tmpStr.replace(/GDYZFLZ_QCYE/g, "GDZCZY_ZCYZ");
                tmpStr = tmpStr.replace(/GDYZFLZ_JFFS/g, "0");
                tmpStr = tmpStr.replace(/GDYZFLZ_DFFS/g, "0");
                tmpStr = tmpStr.replace(/GDZJFLZ_DQYE/g, "(-GDZCZY_LJZJ)");
                tmpStr = tmpStr.replace(/GDZJFLZ_QCYE/g, "(-GDZCZY_LJZJ)");
                tmpStr = tmpStr.replace(/GDZJFLZ_JFFS/g, "0");
                tmpStr = tmpStr.replace(/GDZJFLZ_DFFS/g, "0");
                tmpStr = tmpStr.replace(/GDZJFLZ_SLDFFS/g, "0");
                tmpStr = tmpStr.replace(/GDZJFLZ_CLCS/g, "0");
                //资产原值
                if (tmpStr.indexOf("GDZCZY_ZCYZ") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_ZCYZ/g, cardSelf.TurnToValue("GDZCZY_ZCYZ"));
                //资产数量
                if (tmpStr.indexOf("GDZCZY_ZCSL") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_ZCSL/g, cardSelf.TurnToValue("GDZCZY_ZCSL"));
                //使用年限
                //if (tmpStr.indexOf("GDZCZY_SYNX") >= 0)
                //    tmpStr = tmpStr.replace(/GDZCZY_SYNX/g, cardSelf.TurnToValue("GDZCZY_SYNX"));
                //使用月份
                if (tmpStr.indexOf("GDZCZY_SYSJ") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SYSJ/g, cardSelf.TurnToValue("GDZCZY_SYSJ"));
                //月折旧率
                if (tmpStr.indexOf("GDZCZY_YZJL") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_YZJL/g, cardSelf.TurnToValue("GDZCZY_YZJL"));
                //年折旧率
                if (tmpStr.indexOf("GDZCZY_NZJL") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_NZJL/g, cardSelf.TurnToValue("GDZCZY_NZJL"));
                //净残值率
                if (tmpStr.indexOf("GDZCZY_JCZL") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_JCZL/g, cardSelf.TurnToValue("GDZCZY_JCZL"));
                //净残值
                if (tmpStr.indexOf("GDZCZY_JCZ") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_JCZ/g, cardSelf.TurnToValue("GDZCZY_JCZ"));
                //累计折旧
                if (tmpStr.indexOf("GDZCZY_LJZJ") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_LJZJ/g, cardSelf.TurnToValue("GDZCZY_LJZJ"));
                //入账折旧
                if (tmpStr.indexOf("GDZCZY_RZZJ") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_RZZJ/g, cardSelf.TurnToValue("GDZCZY_RZZJ"));
                //减值准备
                if (tmpStr.indexOf("GDZCZY_JZZB") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_JZZB/g, cardSelf.TurnToValue("GDZCZY_JZZB"));
                //月折旧额
                if (tmpStr.indexOf("GDZCZY_YZJE") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_YZJE/g, cardSelf.TurnToValue("GDZCZY_YZJE"));
                //年折旧额
                if (tmpStr.indexOf("GDZCZY_NZJE") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_NZJE/g, cardSelf.TurnToValue("GDZCZY_NZJE"));
                //总工作量
                if (tmpStr.indexOf("GDZCZY_ZGZL") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_ZGZL/g, cardSelf.TurnToValue("GDZCZY_ZGZL"));
                //已完成工作量
                if (tmpStr.indexOf("GDZCZY_YGZL") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_YGZL/g, cardSelf.TurnToValue("GDZCZY_YGZL"));
                //已提月份
                if (tmpStr.indexOf("GDZCZY_ZJYF") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_ZJYF/g, cardSelf.TurnToValue("GDZCZY_ZJYF"));
                //减值后尚可使用月份
                if (tmpStr.indexOf("GDZCZY_JLYF") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_JLYF/g, cardSelf.TurnToValue("GDZCZY_JLYF"));
                //减值调整后累计折旧
                if (tmpStr.indexOf("GDZCZY_JLZJ") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_JLZJ/g, cardSelf.TurnToValue("GDZCZY_JLZJ"));
                //已入账月份
                if (tmpStr.indexOf("GDZCZY_YRZYF") >= 0) {
                    if (itemDecnDict.GDZCZY_YRZYF) {
                        tmpStr = tmpStr.replace(/GDZCZY_YRZYF/g, cardSelf.TurnToValue("GDZCZY_YRZYF"));
                    } else {
                        throw new Error("该折旧方法需要使用已入账月份项目，请在单位使用项目中勾选保存。");
                    }
                }

                //替换自定义数值项目
                if (tmpStr.indexOf("GDZCZY_SJ01") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ01/g, cardSelf.TurnToValue("GDZCZY_SJ01"));
                if (tmpStr.indexOf("GDZCZY_SJ02") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ02/g, cardSelf.TurnToValue("GDZCZY_SJ02"));
                if (tmpStr.indexOf("GDZCZY_SJ03") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ03/g, cardSelf.TurnToValue("GDZCZY_SJ03"));
                if (tmpStr.indexOf("GDZCZY_SJ04") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ04/g, cardSelf.TurnToValue("GDZCZY_SJ04"));
                if (tmpStr.indexOf("GDZCZY_SJ05") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ05/g, cardSelf.TurnToValue("GDZCZY_SJ05"));
                if (tmpStr.indexOf("GDZCZY_SJ06") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ06/g, cardSelf.TurnToValue("GDZCZY_SJ06"));
                if (tmpStr.indexOf("GDZCZY_SJ07") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ07/g, cardSelf.TurnToValue("GDZCZY_SJ07"));
                if (tmpStr.indexOf("GDZCZY_SJ08") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ08/g, cardSelf.TurnToValue("GDZCZY_SJ08"));
                if (tmpStr.indexOf("GDZCZY_SJ09") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ09/g, cardSelf.TurnToValue("GDZCZY_SJ09"));
                if (tmpStr.indexOf("GDZCZY_SJ10") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ10/g, cardSelf.TurnToValue("GDZCZY_SJ10"));
                if (tmpStr.indexOf("GDZCZY_SJ11") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ11/g, cardSelf.TurnToValue("GDZCZY_SJ11"));
                if (tmpStr.indexOf("GDZCZY_SJ12") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ12/g, cardSelf.TurnToValue("GDZCZY_SJ12"));
                if (tmpStr.indexOf("GDZCZY_SJ13") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ13/g, cardSelf.TurnToValue("GDZCZY_SJ13"));
                if (tmpStr.indexOf("GDZCZY_SJ14") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ14/g, cardSelf.TurnToValue("GDZCZY_SJ14"));
                if (tmpStr.indexOf("GDZCZY_SJ15") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ15/g, cardSelf.TurnToValue("GDZCZY_SJ15"));
                if (tmpStr.indexOf("GDZCZY_SJ16") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ16/g, cardSelf.TurnToValue("GDZCZY_SJ16"));
                if (tmpStr.indexOf("GDZCZY_SJ17") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ17/g, cardSelf.TurnToValue("GDZCZY_SJ17"));
                if (tmpStr.indexOf("GDZCZY_SJ18") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ18/g, cardSelf.TurnToValue("GDZCZY_SJ18"));
                if (tmpStr.indexOf("GDZCZY_SJ19") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ19/g, cardSelf.TurnToValue("GDZCZY_SJ19"));
                if (tmpStr.indexOf("GDZCZY_SJ20") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SJ20/g, cardSelf.TurnToValue("GDZCZY_SJ20"));

                //替换公式中的函数
                if (tmpStr.indexOf("FLOOR") >= 0)
                    tmpStr = tmpStr.replace(/FLOOR/g, "Math.floor");
                if (tmpStr.indexOf("ABS") >= 0)
                    tmpStr = tmpStr.replace(/ABS/g, "Math.abs");
                if (tmpStr.indexOf("CEILING") >= 0)
                    tmpStr = tmpStr.replace(/CEILING/g, "Math.ceil");

                //替换公式中的标识符
                if (tmpStr.indexOf("{") >= 0)
                    tmpStr = tmpStr.replace(/{/g, "");
                if (tmpStr.indexOf("}") >= 0)
                    tmpStr = tmpStr.replace(/}/g, "");
                if (tmpStr.indexOf("@") >= 0)
                    tmpStr = tmpStr.replace(/@/g, "");
                if (tmpStr.indexOf("!") >= 0)
                    tmpStr = tmpStr.replace(/!/g, "");
                if (tmpStr.indexOf("^") >= 0)
                    tmpStr = tmpStr.replace(/^/g, "+");

                /*使用年限的处理因为使用使用年限字段包括 
                  使用年限 和 使用月份 两部分数据,
                  所以需要对折旧方法中的使用年限进行特殊处理*/
                if (tmpStr.indexOf("GDZCZY_SYNX*12") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SYNX*12/g, cardSelf.TurnToUseYearValue("GDZCZY_SYNX*12"));
                if (tmpStr.indexOf("12*GDZCZY_SYNX") >= 0)
                    tmpStr = tmpStr.replace(/12*GDZCZY_SYNX/g, cardSelf.TurnToUseYearValue("12*GDZCZY_SYNX"));
                if (tmpStr.indexOf("GDZCZY_SYNX") >= 0)
                    tmpStr = tmpStr.replace(/GDZCZY_SYNX/g, cardSelf.TurnToUseYearValue("GDZCZY_SYNX"));

                return tmpStr;
            },
            //转换为具体值
            TurnToValue: function(itemCode) {
                var strZJBH = cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJBH');
                var zcyz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZCYZ'), itemDecnDict.GDZCZY_ZCYZ));
                var jcz = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JCZ'), itemDecnDict.GDZCZY_JCZ));
                var jzzb = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_JZZB'), itemDecnDict.GDZCZY_JZZB));
                var ljzj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_LJZJ'), itemDecnDict.GDZCZY_LJZJ));
                var sysj = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYSJ'), itemDecnDict.GDZCZY_SYSJ));
                var zjyf = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_ZJYF'), itemDecnDict.GDZCZY_ZJYF));
                var reValue = "";
                if (itemCode == "GDZCZY_LJZJ" && (strZJBH == "03" || strZJBH == "J3") && sysj - zjyf > 24)
                //双倍余额递减法 非最后两年的累计折旧计算
                    reValue = cardSelf.CalFuncLjzj(strZJBH, zcyz, jcz, jzzb, zjyf, sysj);
                else
                    reValue = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue(itemCode), itemDecnDict[itemCode]));
                if (itemCode == "GDZCZY_YZJL" || itemCode == "GDZCZY_JCZL" || itemCode == "GDZCZY_NZJL")
                    reValue = reValue + "/100";
                return reValue;
            },
            //转换为具体年度值
            TurnToUseYearValue: function(itemField) {
                var value = Number(cardSelf.toDecimal(cardSelf.cardInstance().dataSource.tables('GDZCZY').rows(0).getValue('GDZCZY_SYNX'), itemDecnDict.GDZCZY_SYNX));
                var resultValue;
                var reValue = '';
                if (itemField == "GDZCZY_SYNX*12" || itemField == "12*GDZCZY_SYNX") {
                    value = Math.floor(value) * 12 + (value - Math.floor(value)) * 100;
                }
                if (itemField == "GDZCZY_SYNX") { //年限小数位转成十进制的
                    value = Math.floor(value) + (value - Math.floor(value)) / 0.12;
                }
                return value;
            },
            //双倍余额递减法||减值或变动后的双倍余额递减法 计算公式使用的累计折旧
            CalFuncLjzj: function(tempZJFF, tempZCYZ, tempJCZ, tempJZZB, tempZJYF, vsSYSJ) {
                if (vsSYSJ == 0 || tempZCYZ == 0)
                    return 0;
                var resultLJZJ = 0;
                var tempZJNF = 0;
                if (vsSYSJ - tempZJYF <= 24)
                    tempZJNF = Math.floor((vsSYSJ - 24) / 12);
                else
                    tempZJNF = Math.floor(tempZJYF / 12);
                //非最后两年的累计折旧
                resultLJZJ = cardSelf.CalDoubleBalanceFuncLjzj(tempZJFF, tempZCYZ, 0, tempJZZB, tempZJNF, vsSYSJ);
                //最后两年的累计折旧
                if (vsSYSJ - tempZJYF <= 24) {
                    if (tempZJFF == "03")
                        resultLJZJ += (tempZCYZ - resultLJZJ - tempJCZ) / 24 * (24 - vsSYSJ + tempZJYF);
                    else if (tempZJFF == "J3")
                        resultLJZJ += (tempZCYZ - resultLJZJ - tempJCZ - tempJZZB) / 24 * (24 - vsSYSJ + tempZJYF);
                }
                return Number(cardSelf.toDecimal(resultLJZJ, iiJeDecn));
            },
            //
            CalDoubleBalanceFuncLjzj: function(tempZJFF, tempZCYZ, tempLJZJ, tempJZZB, tempZJNF, vsSYSJ) {
                if (tempZJNF == 0)
                    return tempLJZJ;
                else {
                    if (tempZJFF == "03")
                        tempLJZJ += Number(cardSelf.toDecimal(((tempZCYZ - tempLJZJ) * 2 / vsSYSJ) * 12, iiJeDecn));
                    else if (tempZJFF == "J3")
                        tempLJZJ += Number(cardSelf.toDecimal(((tempZCYZ - tempLJZJ - tempJZZB) * 2 / vsSYSJ) * 12, iiJeDecn));
                    return cardSelf.CalDoubleBalanceFuncLjzj(tempZJFF, tempZCYZ, tempLJZJ, tempJZZB, --tempZJNF, vsSYSJ);
                }
            },
            //双倍余额递减法||减值或变动后的双倍余额递减法 计算真实的累计折旧
            CalLjzj: function(tempZJFF, tempZCYZ, tempJCZ, tempJZZB, tempZJYF, vsSYSJ) {
                if (vsSYSJ == 0 || tempZCYZ == 0)
                    return 0;
                if (vsSYSJ < tempZJYF)
                    throw new Error("使用月份应大于已提月份。");

                var resultLJZJ = 0;
                var tempZJNF = 0;
                if (vsSYSJ <= 24) {
                    if (tempZJYF == 0)
                        return 0;
                    else {
                        if (tempZJFF == "03")
                            resultLJZJ = ((tempZCYZ - tempJCZ) / vsSYSJ) * tempZJYF;
                        else if (tempZJFF == "J3")
                            resultLJZJ = ((tempZCYZ - tempJCZ - tempJZZB) / vsSYSJ) * tempZJYF;
                        return Number(cardSelf.toDecimal(resultLJZJ, iiJeDecn));
                    }
                } else {
                    if (vsSYSJ - tempZJYF <= 24)
                        tempZJNF = Math.floor((vsSYSJ - 24) / 12);
                    else
                        tempZJNF = Math.floor(tempZJYF / 12);

                    //非最后两年的累计折旧
                    resultLJZJ = cardSelf.CalDoubleBalanceLjzj(tempZJFF, tempZCYZ, 0, tempJZZB, tempZJNF, tempZJYF, vsSYSJ);
                    //最后两年的累计折旧
                    if (vsSYSJ - tempZJYF <= 24) {
                        if (tempZJFF == "03")
                            resultLJZJ += (tempZCYZ - resultLJZJ - tempJCZ) / 24 * (24 - vsSYSJ + tempZJYF);
                        else if (tempZJFF == "J3")
                            resultLJZJ += (tempZCYZ - resultLJZJ - tempJCZ - tempJZZB) / 24 * (24 - vsSYSJ + tempZJYF);
                    }
                    return Number(cardSelf.toDecimal(resultLJZJ, iiJeDecn));
                }
            },
            //
            CalDoubleBalanceLjzj: function(tempZJFF, tempZCYZ, tempLJZJ, tempJZZB, tempZJNF, tempZJYF, vsSYSJ) {
                if (tempZJNF == 0) {
                    if ((vsSYSJ - tempZJYF) > 24 && tempZJYF % 12 != 0) {
                        if (tempZJFF == "03")
                            tempLJZJ += ((tempZCYZ - tempLJZJ) * 2 / vsSYSJ) * (tempZJYF % 12);
                        else if (tempZJFF == "J3")
                            tempLJZJ += ((tempZCYZ - tempLJZJ - tempJZZB) * 2 / vsSYSJ) * (tempZJYF % 12);
                    }
                    return Number(cardSelf.toDecimal(tempLJZJ, iiJeDecn));
                } else {
                    if (tempZJFF == "03")
                        tempLJZJ += Number(cardSelf.toDecimal(((tempZCYZ - tempLJZJ) * 2 / vsSYSJ) * 12, iiJeDecn));
                    else if (tempZJFF == "J3")
                        tempLJZJ += Number(cardSelf.toDecimal(((tempZCYZ - tempLJZJ - tempJZZB) * 2 / vsSYSJ) * 12, iiJeDecn));
                    return cardSelf.CalDoubleBalanceLjzj(tempZJFF, tempZCYZ, tempLJZJ, tempJZZB, --tempZJNF, tempZJYF, vsSYSJ);
                }
            },
            //计算公式
            Evaluate: function(express) {
                var reValue = "0";
                try {
                    reValue = String(eval(express));
                } catch (e) {
                    throw new Error("项目定义公式错误：所需项目信息不全，" + e.message);
                }
                if (reValue == "非数字" || reValue == "正无穷大" || reValue == "负无穷大" || reValue.indexOf("∞") >= 0 || reValue.indexOf("NaN") >= 0) {
                    reValue = "0";
                }
                return reValue;
            },
            //#endregion

            //#region 界面重新加载
            //切换类别后重新加载界面控件
            ReloadForm: function(changeType) {
                //保存资产数据到cookie    
                cardSelf.SaveCookieData();
                //debugger;
                // if (gsp.rtf.query.get("funcid") == '')
                //     gsp.rtf.query.get("funcid") = curFuncID;
                //平台需要传递的参数
                var fixParam = ''; //'&funcid=' + gsp.rtf.query.get("funcid") + '&bizObjectId=' + gsp.rtf.query.get("bizObjectId") + '&bizOPId=' + gsp.rtf.query.get("bizOPId") + '&parentFuncId=' + gsp.rtf.query.get("parentFuncId") + '&initialAction=' + gsp.rtf.query.get("initialAction") + '&parentFormId=' + gsp.rtf.query.get("parentFormId") + '&nameField=';
                //刷新
                if (fsscflag === "1") {
                    location = '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=' + formFlag + '&psInitAsset=' + isInitAsset + '&psAssetID=' + assetID + '&psAssetCode=' + assetCode + '&psByIDorCode=ID&psCopyAssetID=' + copyAssetID + '&psCopyFssbFlag=' + copyFssbFlag + '&psCopyFjFlag=' + copyFjFlag + '&psAssetType=' + changeType + '&psChangeTypeFlag=1&psParentFuncID=' + parentFuncID + '&psCurFuncID=' + curFuncID + fixParam + '&FSSCFLAG=1&FIRSTOPEN=0';
                } else {
                    gsp.rtf.func.openUrl({
                        id: curFuncID,
                        name: '',
                        url: '/cwbase/web/FI/GD/BizHandle/runtime/GDWebAssetCard/d560189e-4ef2-407b-97a8-69a4071cdbec/Index.html?psCompany=' + curCompanyCode + '&psCompanyName=' + curCompanyName + '&psYear=' + curYear + '&psPeriod=' + curPeriod + '&psDate=' + curDate + '&psFlag=' + formFlag + '&psInitAsset=' + isInitAsset + '&psAssetID=' + assetID + '&psAssetCode=' + assetCode + '&psByIDorCode=ID&psCopyAssetID=' + copyAssetID + '&psCopyFssbFlag=' + copyFssbFlag + '&psCopyFjFlag=' + copyFjFlag + '&psAssetType=' + changeType + '&psChangeTypeFlag=1&psParentFuncID=' + parentFuncID + '&psCurFuncID=' + curFuncID + fixParam,
                        reload: true
                    });
                }
            },
            //保存Cookie数据
            SaveCookieData: function() {
                var data = 'ZCKP=';
                var formCookie = document.cookie;
                var mainRow = cardSelf.cardInstance().dataSource.tables('GDZCZY').peek()[0];
                for (var field in mainRow) {
                    // if (dateFields.indexOf(field) >= 0)
                    //     data += "&" + field + ":" + cardSelf.FormatDate8(mainRow[field]); //字段名
                    // else
                    data += "&" + field + ":" + mainRow[field]; //字段名
                }
                document.cookie = data;
            },
            //清空Cookie数据
            //#warning需要吗
            //#endregion

            //#region 公共函数
            //四舍五入
            toDecimal: function(number, decn) {
                var f = parseFloat(number);
                if (isNaN(f)) {
                    return 0;
                }
                var decnStr = Math.pow(10, decn);
                f = Math.round(number * decnStr) / decnStr;
                return f;
            },
            //四舍五入补零
            toDecimalZeroize: function(number, decn) {
                var f = parseFloat(number);
                if (isNaN(f)) {
                    return 0.0;
                }
                var decnStr = Math.pow(10, decn);
                f = Math.round(number * decnStr) / decnStr;
                var s = f.toString();
                var rs = s.indexOf('.');
                if (rs < 0) {
                    rs = s.length;
                    s += '.';
                }
                while (s.length <= rs + 2) {
                    s += '0';
                }
                return s;
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
            // 组织智能帮助条件 左括号 字段 比较符 字段值 值类型 右括号 关系 
            ArrangeCondition: function(pLbracket, pField, pCompare, pFieldValue, pDataType, pRbracket, pRelation) {
                var Cond = '';
                if (pDataType == 'String') {
                    Cond = '{"Lbracket":"' + pLbracket + '","Compare":" ' + pCompare + '","Field":"' + pField + '","DataType":"' + pDataType + '","Value":"' + pFieldValue + '","Rbracket":" ' + pRbracket + '","Relation":" ' + pRelation + ' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":0,"FieldCaption":"","InnerFormula":"","Owner":"","DisplayValue":"' + pFieldValue + '","Description":""}';
                } else if (pDataType == 'Integer') {
                    Cond = '{"Lbracket":"' + pLbracket + '","Compare":" ' + pCompare + '","Field":"' + pField + '","DataType":"' + pDataType + '","Value":"' + pFieldValue + '","Rbracket":" ' + pRbracket + '","Relation":" ' + pRelation + ' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":0,"FieldCaption":"","InnerFormula":"","Owner":"","DisplayValue":"' + pFieldValue + '","Description":""}';
                } else if (pDataType == 'Express') {
                    Cond = '{"Lbracket":"' + pLbracket + '","Compare":" ' + pCompare + '","Field":"' + pField + '","DataType":"' + pDataType + '","Value":"' + pFieldValue + '","Rbracket":" ' + pRbracket + '","Relation":" ' + pRelation + ' ","IsCanChange":true,"ConvertUpperToCompare":false,"Expresstype":1,"FieldCaption":"","InnerFormula":"","Owner":"","DisplayValue":"' + pFieldValue + '","Description":""}';
                }
                return Cond;
            },
            // 日期格式化
            FormatDate8: function(date) {
                if (!date)
                    return '';
                else if (typeof date == 'string' && date.length == 8 && date[0] == '2')
                    return date;
                else {
                    date = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
                    return date;
                }
            },
            //获取字符串长度
            GetLength: function(str) {
                if (str !== null && str !== undefined) {
                    return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
                } else {
                    return 0;
                }
            },
            GetGuid: function() {
                return (GetS4() + GetS4() + "-" + GetS4() + "-" + GetS4() + "-" + GetS4() + "-" + GetS4() + GetS4() + GetS4());
            },
            GetS4: function() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            },
            //#endregion 
            //资产删除共享中心模式
            RemoveAssetCardforFSSC: function() {
                var cardSelf = this;
                return $.Deferred().resolve([true]);
                if (curCompanyCode == '') {
                    $.notify.error("请选择核算组织。");
                    return;
                }
                var deleteflag = true;
                //获取选中行
                var clientMgs = "";
                //组织资产的ID
                var assetIDStr = "";
                var selectRows = cardSelf.cardInstance().dataSource.tables(0).rows(0).peek();
                if (isJoinZcgl == "1" && selectRows.GDZCZY_SBBH != "" && selectRows.GDZCZY_SBBH != " ") {
                    clientMgs += "<br>编号为[" + selectRows.GDZCZY_ZCBH + "]的资产是管理进入资产，不允许删除！";
                    deleteflag = false;
                } else if (isZdrDel == "1" && selectRows.GDZCZY_ZDR != gsp.rtf.context.get('UserName')) {
                    clientMgs += "<br>编号为[" + selectRows.GDZCZY_ZCBH + "]的资产只允许制单人删除！";
                    deleteflag = false;
                } else {
                    assetIDStr += selectRows.GDZCZY_ID + ";";
                }
                if (deleteflag) {
                    //服务端 检查并删除
                    return $.Deferred().resolve();
                } else {
                    $.messager.alert('提示', "删除失败。" + clientMgs, 'warning');
                    return $.Deferred().reject();
                }
            }

        };
    });