gsp.module('gsp.app').provider('BizHandlePub', function () {
    this.$get = function () {
        return {
            /**
            * 组织智能帮助条件
            * @param  {string} pLbracket - 左括号
            * @param  {string} pField - 字段
            * @param  {string} pCompare - 比较符
            * @param  {string} pFieldValue - 字段值
            * @param  {string} pDataType - 值类型
            * @param  {string} pRbracket - 右括号
            * @param  {string} pRelation - 关系
            */
            ArrangeCondition: function (pLbracket, pField, pCompare, pFieldValue, pDataType, pRbracket, pRelation) {
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
            * 格式化8位日期
            * @param  {string} date - 日期
            */
            FormatDate8: function (date) {
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
             * 格式化10位日期 0001-00-00
             * @param {string} data - 日期
             */
            FormatDate10: function (date) {
                if (!date.trim()) {
                    return '';
                } else if (typeof date == 'string' && date.length == 10 && date[0] == '2') {
                    return date;
                } else {
                    date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
                    return date;
                }
            },
            /**
            * 对数字取精度
            * @param  {string} number - 数字
            * @param  {string} decn - 精度
            */
            toDecimal: function (number, decn) {
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
            /**
            * 设置对应列表中列的精度
            * @param  {string} ColumnField - 列表ID
            * @param  {string} ColumnField - 列字段名
            * @param  {string} precision - 精度
            */
            SetColumnDecn: function (GridID, ColumnField, precision) {
                var listself = this;
                $('#' + GridID).datagrid('getColumnOption', ColumnField).formatter = function (v, d, i) {
                    if (!v && v !== 0) {
                        return v;
                    } else {
                        return gc.accounting.formatMoney(v, '', precision, '');
                    }
                }
            },
            /**
            * 浮点数计算
            * @param  {string} arg1
            * @param  {string} arg2
            * @param  {string} flag - 计算标志位
            */
            Calculate: function (arg1, arg2, flag) {
                var r1, r2, m;
                try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
                try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
                m = Math.pow(10, Math.max(r1, r2));
                switch (flag) {
                    case "+":
                        return (arg1 * m + arg2 * m) / m;
                    case "-":
                        return (arg1 * m - arg2 * m) / m;
                    case "*":
                        return ((arg1 * m) * (arg2 * m)) / (m * m);
                    case "/":
                        return ((arg1 * m) / (arg2 * m));
                }
            },
            /**
             * 对数字取精度，包装一下formatmoney方法
             * @param  {string} num - 数字
             * @param  {string} decn - 精度
             */
            formatNum: function (num, decn) {
                if (num) {
                    num = num * 1;
                } else {
                    num = 0;
                }
                decn = decn * 1;
                return gc.accounting.formatMoney(num, '', decn, '');
            },
            /**
             * 获取过滤后的结果集
             * @param  {object} data - 需要过滤的数据
             * @param  {string} filed - 需要过滤的字段
             * @param  {string} value - 字段所规定值
             * @param  {bool} flag - true:等于;false:不等于
             */
            FilterData: function (data, filed, value, flag) {
                var newdata = [];
                for (var i = 0; i < data.length; i++) {
                    if ((data[i][filed] === value && flag) || (data[i][filed] !== value && !flag)) {
                        newdata.push(data[i]);
                    }
                }
                return newdata;
            },
            /**
             * 三个按钮的选择框 “1”为是，“0”为否
             * @param  {string} title - 标题
             * @param  {string} message - 显示内容
             * @param  {string} ifcancel - 是否有取消按钮（默认为true）
             */
            ThreeButtonConfirm: function (title, message, ifcancel) {
                var defer = $.Deferred(),
                    t = title ? title : ctrlLang.delConfirmT,
                    m = message ? message : ctrlLang.delConfirmM;

                //解决confirm框右上角关闭按钮的点击事件，捕获到是defer的结果
                $.fn.window.defaults.closable = false;
                this.Threeconfirm(t, m, ifcancel, function (r) {
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
            Threeconfirm: function (title, msg, ifcancel, fn) {
                var content = '<div class="messager-icon messager-question"></div>' +
                    '<div>' + msg + '</div>' +
                    '<div style="clear:both;"/>';
                var buttons = {};
                buttons["是"] = function () {
                    win.window('close');
                    if (fn) {
                        fn("1");
                        return false;
                    }
                };
                buttons["否"] = function () {
                    win.window('close');
                    if (fn) {
                        fn("0");
                        return false;
                    }
                };
                if (ifcancel !== false) {
                    buttons[$.messager.defaults.cancel] = function () {
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
                    onClose: function () {
                        setTimeout(function () {
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
                win.on('keyup', function (e) {
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
                }).on('click', function () {
                    win.children('div.messager-button').children('a:first').focus();
                });
            },
            /**
             * 检查字符串实际长度（汉字为两字符）
             * @param  {string} str - 字符串
             */
            CheckTextLength: function (str) {
                var strnum = 0;
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 255) {
                        strnum += 2;
                    } else {
                        strnum++;
                    }
                }
                return strnum;
            }
        }
    }
});