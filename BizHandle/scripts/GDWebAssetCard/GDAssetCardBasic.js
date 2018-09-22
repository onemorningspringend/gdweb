//资产卡片界面初始基类
var params = parseUrlParams(window.location);
var psCompany = params.psCompany; //单位编号
var psYear = params.psYear; //年度
var psPeriod = params.psPeriod; //固定资产期间
var psDate = params.psDate; //登录日期
var psFlag = params.psFlag; //编辑标识：A增加 E编辑 F复制 C确认 Q查询
var psInitAsset = params.psInitAsset; //是否资产卡片维护界面
var psAssetID = ''; //资产ID A新增、F复制时为空
var psAssetCode = ''; //资产编号 A新增、F复制时为空
var psCopyAssetID = ''; //复制资产ID F复制时才有值
var psCopyFssbFlag = ''; //是否复制附属设备 F复制时才有值
var psCopyFjFlag = ''; //是否复制附件 F复制时才有值
var psAssetType = ''; //资产类别编号 A新增切换类别、E编辑、F复制、C确认会有值
var psChangeTypeFlag = ''; //是否切换类别 1切换类别 0未切换
if (params.psAssetID)
    psAssetID = params.psAssetID;
if (params.psAssetCode)
    psAssetCode = params.psAssetCode;
if (params.psCopyAssetID)
    psCopyAssetID = params.psCopyAssetID;
if (params.psCopyFssbFlag)
    psCopyFssbFlag = params.psCopyFssbFlag;
if (params.psCopyFjFlag)
    psCopyFjFlag = params.psCopyFjFlag;
if (params.psAssetType)
    psAssetType = params.psAssetType;
if (params.psChangeTypeFlag)
    psChangeTypeFlag = params.psChangeTypeFlag;

if (psCompany && psDate && psPeriod) {
    $.ajax({
        type: "get",
        url: "GDAssetCardHandler.ashx?psCompany=" + psCompany + "&psYear=" + psYear + "&psPeriod=" + psPeriod + "&psDate=" + psDate + "&psFlag=" + psFlag + "&psInitAsset=" + psInitAsset + "&psAssetID=" + psAssetID + "&psAssetCode=" + psAssetCode + "&psByIDorCode=ID&psCopyAssetID=" + psCopyAssetID + "&psCopyFssbFlag=" + psCopyFssbFlag + "&psCopyFjFlag=" + psCopyFjFlag + "&psAssetType=" + psAssetType + "&psChangeTypeFlag=" + psChangeTypeFlag,
        async: false,
        beforeSend: function (XHR) {
            var state = gsp.rtf.context.state();
            XHR.setRequestHeader("GSPStateCount", "1");
            XHR.setRequestHeader("GSPState0", escape(state).replace(/\+/g, "%2b"));
        }
    }).then(function (response) {
        $('#TableLayoutPanel_Card').html(response);
    });
}