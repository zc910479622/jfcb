var oInit = new Object();
var detailsIndex = -1;
window.operatEvents = {
    "click #details": function (e, value, row, index) {
        $.ajax({
            url:"JjJp/selectJjJp.do",
            type:"POST",
            data:row.zqId,
            dataType:"json",
            success:function (data) {
                if (data!=null){
                    $(data).each(function (i,v) {
                        v.name = row.name;
                        v.zqType = row.zqType;
                    })
                    $("#modal_addStaff").one("show.bs.modal", function (event) {
                        $('#tabJp').bootstrapTable('load', data);
                    }).modal("show");
                }else {

                }
            }
        })

    },
};
setStaffTable();
setTabJp();
function setTabJp() {
    $("#tabJp").bootstrapTable({
        data:[],
        pagination: true,
        singleSelect: true,
        striped: true,
        undefinedText: "",
        height: $(window).height() * 0.6,
        pageSize: 5,
        pageList: [5, 10, 20, 30, 50],
        showColumns: false,
        showRefresh: false,
        showToggle: false,
        cache: false,
        clickToSelect: false,
        uniqueId: "jqId",
        columns: [{
            field: 'zqType',
            title: '周期类型',
            halign: "center",
            align: "center",
            formatter:function (value, row, index) {
                if (value==1){
                    return "调机"
                } else if (value==2){
                    return "生产"
                }
            }
        }, {
            field: 'name',
            title: '员工',
            halign: "center",
            align: "center",
        },{
            title: "开始时间",
            halign: "center",
            align: "center",
            valign: "middle",
            formatter:function (value,row,index) {
                return timestampTime(row.startTime,6)
            }
        }, {
            title: "结束时间",
            align: "center",
            valign: "middle",
            formatter:function (value,row,index) {
                return timestampTime(row.stopTime,6)
            }
        }, {
            title: "M30",
            align: "center",
            valign: "middle",
            formatter:function (value,row,index) {
                if (row.isM30) {
                    return "已走到"
                }else {
                    return "未走到"
                }
            }
        }],
        queryParams: function (params) {
            return {
                reId: rwId,
            }
        }
    });
}

function setStaffTable() {
    $("#tabSysYg").bootstrapTable({
        url: "JjRw/queryJjRw.do",
        method: "post",
        dataType: "JSON",
        pagination: true,
        detailView: true,//父子表
        singleSelect: true,
        striped: true,
        undefinedText: "",
        height: $(window).height() * 0.6,
        pageSize: 5,
        pageList: [5, 10, 20, 30, 50],
        showColumns: false,
        showRefresh: false,
        showToggle: false,
        toolbar: "#tabSysYg_toolbar",
        cache: false,
        clickToSelect: false,
        uniqueId: "rwId",
        columns: [{
            title: "计划单",
            field: "jhNo",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "项次",
            field: "jhItm",
            align: "center",
            valign: "middle",
            width: "80px"
        }, {
            title: "日期",
            field: "jhDd",
            align: "center",
            valign: "middle",
            width: "80px",
            formatter:function (value,row,index) {
                return timestampTime(row.jhDd,3)
            }
        }, {
            title: "计划数",
            field: "qtyJh",
            align: "center",
            valign: "middle",
            width: "80px"
        }, {
            title: "型号",
            field: "prdNo",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "毛坯",
            field: "jfMp",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "原机台",
            field: "jfJt",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "现机台",
            field: "jtNo",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "任务数",
            field: "jhQty",
            align: "center",
            valign: "middle",
            width: "100px",
        }, {
            title: "已加工",
            field: "complete",
            align: "center",
            valign: "middle",
            width: "80px",
            formatter:function (value, row, index) {
                if (row.complete!=null){
                    return value
                } else {
                    return 0
                }
            }
        },{
            title: "待加工",
            align: "center",
            valign: "middle",
            width: "80px",
            formatter:function (value, row, index) {
                if (row.complete!=null){
                    return parseInt(row.jhQty)-parseInt(row.complete)
                } else {
                    return 0
                }
            }
        }],
        onExpandRow: function (index, row, $detail) {
            if (index!=detailsIndex)
            $("#tabSysYg").bootstrapTable('collapseRow',detailsIndex);
            detailsIndex = index;
            oInit.InitSubTable(index, row, $detail);
        },
        queryParams: function (params) {
            return {
                jhNo: $("#queryJhNo").val(),
                jhDd: $("#queryJjDd").val(),
                prdNo: $("#queryPrdNo").val(),
                jfMp: $("#queryJfMp").val(),
                jfJt: $("#queryJfJt").val(),
                jtNo: $("#queryJtNo").val(),
            }
        }
    });
}

oInit.InitSubTable = function (index, row, $detail) {
    var parentid = row.rwId;
    var cur_table = $detail.html('<table></table>').find('table');
    $(cur_table).bootstrapTable({
        url: 'JjZq/selectJjZq.do',
        method: 'post',
        queryParams: { rwId: parentid },
        dataType: "JSON",
        clickToSelect: true,
        uniqueId: "zqId",
        pageSize: 10,
        pageList: [10, 25],
        columns: [{
            field: 'zqType',
            title: '周期类型',
            halign: "center",
            align: "center",
            formatter:function (value, row, index) {
                if (value==1){
                    return "调机"
                } else if (value==2){
                    return "生产"
                }
            }
        }, {
            field: 'name',
            title: '员工',
            halign: "center",
            align: "center",
        }, {
            field: 'ygNo',
            title: '员工编号',
            halign: "center",
            align: "center",
        }, {
            field: 'startTime',
            title: '开始时间',
            halign: "center",
            align: "center",
            formatter:function (value,row,index) {
                return timestampTime(row.startTime,6)
            }
        }, {
            field: 'stopTime',
            title: '结束时间',
            halign: "center",
            align: "center",
            formatter:function (value,row,index) {
                return timestampTime(row.stopTime,6)
            }
        },{
            field: 'complete',
            title: '加工数',
            halign: "center",
            align: "center",
        },{
            title: "操作",
            halign: "center",
            align: "center",
            valign: "middle",
            events: operatEvents,
            formatter: aFormatter()
        }],
        //无线循环取子表，直到子表里面没有记录
        onExpandRow: function (index, row, $Subdetail) {
            oInit.InitSubTable(index, row, $Subdetail);
        }
    });
};

function aFormatter(value, row, index) {
    return [
        '<a id="details" href="#">节拍信息</a>'
    ].join("")
}

//**************************查询按钮*****************************
$("#queryBtn").click(function () {
    $('#tabSysYg').bootstrapTable('selectPage', 1);
    $('#tabSysYg').bootstrapTable('refresh')
});

//*************************重置按钮*************************
$("#result").click(function () {
    $("#queryForm input").val("");
});
