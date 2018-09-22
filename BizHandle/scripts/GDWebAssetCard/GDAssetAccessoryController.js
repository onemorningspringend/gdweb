//资产附件界面
gsp.module('gsp.app').controller('GDAssetAccessoryController', 'ListController', function() {
    //#region 参数
    var curCompanyCode = ""; //单位编号
    var curCompanyName = ""; //单位名称
    var curDate = ""; //8位日期
    var curYear = ""; //年度
    var curPeriod = ""; //期间
    var assetCode = ""; //资产编号
    var funcFlag = ""; //功能ID
    var menuID = ''; // 功能ID
    var needClose = false; //是否需要关闭
    var self;
    //#endregion 
    return {
        //#region 界面加载
        //空方法 专用于其他界面调用
        EmptyFormload: function() {},
        //界面加载（表单加载后）
        AccessoryFormload: function() {
            debugger;
            self = this;
            menuID = gsp.rtf.query.get("funcid");

            //重新注册刷新和关闭事件
            //var vid = this.context.view().element.id;
            $(document).off('framerefresh').on('framerefresh', function() {
                debugger;
                return self.refreshForm();
            });
            $(document).off('frameclose').on('frameclose', function() {
                debugger;
                return self.closeForm();
            });
        },
        /**
         * 带过滤条件和排序的加载数据
         * @param  {Object} filterCondition 过滤条件
         * @param  {Object} orderBy         排序方式
         * @return {Deferred}               对后台数据的异步请求
         * @memberof gsp.app.ListBaseController
         * @memberof gsp.app.ListBaseController
         */
        load: function(filterCondition, orderBy) {
            self = this;
            //获取上个界面传递的参数
            var params = parseUrlParams(window.location);
            curCompanyCode = decodeURI(params.psCompany, "UTF-8");
            assetCode = decodeURI(params.psAssCode, "UTF-8");
            funcFlag = params.psFuncflag;
            curPeriod = params.psPeriod;
            if (funcFlag == "GDZCZY")
                filterCondition = "[" + self.ArrangeCondition(" ", "GDZCFJ_DWBH", " =", "'" + curCompanyCode + "' and GDZCFJ_ZCBH='" + assetCode + "' and GDZCFJ_MKID='" + funcFlag + "' ", "Express", " ", " ") + "]";
            else
                filterCondition = "[" + self.ArrangeCondition(" ", "GDZCFJ_DWBH", " =", "'" + curCompanyCode + "' and GDZCFJ_ZCBH='" + assetCode + "' and GDZCFJ_MKID='" + funcFlag + "' and GDZCFJ_KJQJ='" + curPeriod + "' ", "Express", " ", " ") + "]";
            orderBy = "#GDZCFJ_FJBH# asc ";

            //刷新绑定数据
            var defaultModel = self.defaultModel(),
                instanceKeys = self.dataSourceHelper.getLoadInstance(defaultModel),
                dataUri = {};
            var varService = self.context.injector.get("$variableService");
            dataUri.filterCondition = varService.parse(filterCondition, self.context);
            dataUri.orderBy = varService.parse(orderBy, self.context);

            $.loading();
            return this.loadInstance(instanceKeys, dataUri).always(function() {
                $.loaded();
            });

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
        //#endregion

        //#region 按钮事件
        //更新新增数据
        UpdateAddData: function() {
            self = this;
            // self.listInstance().dataSource.tables('GDZCFJ').defaultView().currentItem.row().setValue('GDZCFJ_DWBH', curCompanyCode);
            // self.listInstance().dataSource.tables('GDZCFJ').defaultView().currentItem.row().setValue('GDZCFJ_ZCBH', assetCode);
            debugger;
            //赋附件编号
            var newCode = '000';
            var dt = self.listInstance().dataSource.tables(0).defaultView();
            var rowCount = self.listInstance().dataSource.tables(0).rowCount();
            for (var i = 0; i < rowCount; i++) {
                var tempCode = dt.items(i).GDZCFJ_FJBH();
                if (tempCode == '') {
                    try {
                        newCode = String(Number(newCode) + 1);
                        while (newCode.length < 3) {
                            newCode = '0' + newCode;
                        }
                    } catch (e) {
                        newCode = '001';
                    }
                    self.listInstance().dataSource.tables(0).rows(i).setValue('GDZCFJ_FJBH', newCode);
                    //self.listInstance().dataSource.tables(0).rows(i).setValue('GDZCFJ_ID', '');
                    // if (funcFlag == "GDJSZC")
                    //     self.listInstance().dataSource.tables(0).rows(i).setValue('GDZCFJ_KJQJ', curPeriod);
                } else if (newCode < tempCode)
                    newCode = tempCode;
            }
            //将刚修改的提交下
            // $('#XDataGrid1').datagrid('acceptChanges');
            // self.gridHelper.endEditing(self.view, $('#XDataGrid1'));

            var ds = self.listInstance().dataSource;
            if (!ds.binded) {
                self.bindData(ds);
            }
        },
        //保存
        SaveFj: function() {
            var saveStr = '';
            //服务端保存
            var dt = self.listInstance().dataSource.tables(0).defaultView();
            var rowCount = self.listInstance().dataSource.tables(0).rowCount();
            for (var i = 0; i < rowCount; i++) {
                var mkid = dt.items(i).GDZCFJ_MKID();
                if (mkid == '') {
                    saveStr += dt.items(i).GDZCFJ_FJBH() + ';' + dt.items(i).GDZCFJ_FJSM() + ';' + dt.items(i).GDZCFJ_FJTP() + '~';
                }
            }
            if (saveStr == '') {
                $.notify.info("数据无变动，不需保存。");
                return;
            } else {
                debugger;
                var param = [curCompanyCode, assetCode, funcFlag, curYear, curPeriod, gsp.rtf.context.get('UserName'), saveStr];
                return self.context.injector.get('$dataServiceProxy').invokeMethod('Genersoft.FI.GD.BizHandleCore.GDWeb.GDWebPublicManagement', 'SaveAssetAccessory', param)
                    .then(function() {
                        debugger;
                        return self.load('', '');
                    }).then(function() {
                        $.notify.success("操作成功。");
                        return;
                    });
            }
        },
        //#region 刷新和关闭
        refreshForm: function() {
            var haveChange = false;
            var dt = self.listInstance().dataSource.tables(0).defaultView();
            var rowCount = self.listInstance().dataSource.tables(0).rowCount();
            for (var i = 0; i < rowCount; i++) {
                var mkid = dt.items(i).GDZCFJ_MKID();
                if (mkid == '') {
                    haveChange = true;
                    break;
                }
            }

            if (haveChange == false) {
                return gsp.rtf.func.refreshFunc(menuID);
            } else {
                self.ThreeButtonConfirm('提示', '数据已修改，是否保存？').then(function(result) {
                    debugger;
                    if (result == '1') {
                        self.SaveFj();
                    } else if (result == '0') {
                        return gsp.rtf.func.refreshFunc(menuID);
                    }
                });
                return false;
            }
        },
        closeForm: function() {
            if (needClose == true)
                return true;

            var haveChange = false;
            var dt = self.listInstance().dataSource.tables(0).defaultView();
            var rowCount = self.listInstance().dataSource.tables(0).rowCount();
            for (var i = 0; i < rowCount; i++) {
                var mkid = dt.items(i).GDZCFJ_MKID();
                if (mkid == '') {
                    haveChange = true;
                    break;
                }
            }

            if (haveChange == false) {
                needClose = true;
                return gsp.rtf.func.close(menuID);
            } else {
                self.ThreeButtonConfirm('提示', '数据已修改，是否保存？').then(function(result) {
                    debugger;
                    if (result == '1') {
                        self.SaveFj();
                    } else if (result == '0') {
                        needClose = true;
                        return gsp.rtf.func.close(menuID);
                    }
                });
                return false;
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
    };
});