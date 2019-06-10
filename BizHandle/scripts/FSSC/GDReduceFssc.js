//----------------给共享中心任务模式定义的方法调用------------------//
var self = this;
//初始化全局方法类
window["invoker"] = {};

//新增操作
window["invoker"].FSSC_add = function() {
        return function() {
            var gdself = $('[data-view="Form1"]').data('viewInstance');
            return gdself.context.invoke([{
                target: 'GDWebReduceCardController',
                methodName: 'ReduceCardCreate',
                params: []
            }]).then(function() {
                gdself.context.view().transitInvoke('Create', [{
                    target: '',
                    methodName: '',
                    params: []
                }]);
                return [true];
                //return $.Deferred().resolve();
            }, function() {
                return [false];
            });
        }
    }
    ();
//编辑操作
window["invoker"].FSSC_edit = function() {
        return function(fsmode) {
            var gdself = $('[data-view="Form1"]').data('viewInstance');
            return gdself.context.invoke([{
                target: 'GDWebReduceCardController',
                methodName: 'ReduceCardEdit',
                params: []
            }]).then(function() {
                gdself.context.view().transitInvoke('Modify', [{
                    target: '',
                    methodName: '',
                    params: []
                }]);
                return [true];
                //return $.Deferred().resolve();
            }, function() {
                return [false];
            });
        }
    }
    ();
//取消操作
window["invoker"].FSSC_cancel = function() {
        return function() {
            var gdself = $('[data-view="Form1"]').data('viewInstance');
            return gdself.context.invoke([{
                target: 'GDWebReduceCardController',
                methodName: 'ReduceCardCancel',
                params: []
            }]).then(function() {
                gdself.context.view().transitInvoke('Cancel', [{
                    target: '',
                    methodName: '',
                    params: []
                }]);
                gdself.context.view().transitInvoke('Cancel', [{
                    target: '',
                    methodName: '',
                    params: []
                }]);
                return $.Deferred().resolve([true]);
            }, function() {
                return [false];
            });
        }
    }
    ();
//保存操作
window["invoker"].FSSC_save = function() {
        return function() {
            var gdself = $('[data-view="Form1"]').data('viewInstance');
            return gdself.context.invoke([{
                target: 'GDWebReduceCardController',
                methodName: 'ReduceCardSave',
                params: []
            }]).then(function(data) {
                var params = [];
                params[0] = true;
                var cardInstanceinner = gdself.context.injector.get('$model')('DM_GDWEB_GDJSZC_CardInstance');
                var controllerinner = gdself.context.controllers["GDWebReduceCardController"];
                controllerinner.dataSourceHelper.dealForeignKeyValue(cardInstanceinner, controllerinner.defaultModel());
                params[1] = controllerinner.defaultModel().dataModelID;
                _.each(data, function(rows, tableName) {
                    if (rows.length === 0) {
                        delete data[tableName];
                    }
                });
                //data = cardInstanceinner.dataSource.peek();
                params[2] = data;
                return $.Deferred().resolve(params);
            }, function() {
                return [false];
            });
        }
    }
    ();
//保存后操作
window["invoker"].FSSC_saveafter = function() {
        return function() {
            var def = $.Deferred();
            var selfinner = $('[data-view="Form1"]').data('viewInstance');
            return selfinner.context.invoke([{
                target: 'GDWebReduceCardController',
                methodName: 'AfterSave',
                params: []
            }]).then(function() {
                selfinner.context.view().transitInvoke('Save', [{
                    target: '',
                    methodName: '',
                    params: []
                }]);
                selfinner.context.view().transitInvoke('Save', [{
                    target: '',
                    methodName: '',
                    params: []
                }]);
            });

            def.resolve(true);

            return def.promise();
        }
    }
    ();
//删除操作
window["invoker"].FSSC_delete = function() {
        return function() {
            var gdself = $('[data-view="Form1"]').data('viewInstance');
            return gdself.context.invoke([{
                target: 'GDWebReduceCardController',
                methodName: 'DelReduceforFSSC',
                params: []
            }]).then(function() {
                var params = [];
                var cardInstanceinner = gdself.context.injector.get('$model')('DM_GDWEB_GDJSZC_CardInstance');
                var controllerinner = gdself.context.controllers["GDWebReduceCardController"];
                controllerinner.dataSourceHelper.dealForeignKeyValue(cardInstanceinner, controllerinner.defaultModel());
                params[0] = true;
                params[1] = controllerinner.defaultModel().dataModelID;
                return params;
            }, function() {
                return [false];
            });
        };
    }
    ();
//提交操作
window["invoker"].FSSC_submit = function() {
        return function() {
            // var def = $.Deferred();
            // def.resolve(true);
            // return def.promise();
            return $.Deferred().resolve([true]);
        }
    }
    ();
//撤回操作
window["invoker"].FSSC_withdraw = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//初审通过
window["invoker"].FSSC_auditpass = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//初审取消
window["invoker"].FSSC_auditcancel = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//初审退回
window["invoker"].FSSC_auditback = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//初审提交审批
window["invoker"].FSSC_auditsubmit = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//初审提交审批撤回
window["invoker"].FSSC_auditwithdraw = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//稽核通过
window["invoker"].FSSC_jhpass = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//稽核退回
window["invoker"].FSSC_jhback = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//复核通过
window["invoker"].FSSC_fhpass = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();
//复核退回
window["invoker"].FSSC_fhback = function() {
        return function() {
            var def = $.Deferred();
            def.resolve(true);
            return def.promise();
        }
    }
    ();

//打印
window["invoker"].FSSC_print = function() {
        return function() {
            var gdself = $('[data-view="Form1"]').data('viewInstance');
            gdself.context.invoke([{
                target: 'GDWebReduceCardController',
                methodName: 'PrintCard',
                params: []
            }]);
            return $.Deferred().resolve([true]);
        }
    }
    ();

//刷新
window["invoker"].FSSC_refresh = function() {
        return function() {
            var def = $.Deferred();
            var selfinner = $('[data-view="Form1"]').data('viewInstance');

            def.resolve(true);

            return def.promise();
        }
    }
    ();

function GDWEBREDUCEASSET_ListSubmitBefore(djnm, djlx, contextFSSC) {
    var def = $.Deferred();
    def.resolve(true);
    return def.promise();
};