getJjRoleList();
setSkTable();


function setSkTable() {
    $("#tab_sk").bootstrapTable({
        url:"JjSk/selectJjSkList.do",
        method:"post",
        dataType:"JSON",
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
        uniqueId: "sk_id",
        columns: [{
            title: "员工编号",
            field: "ygNo",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "80px"
        }, {
            title: "姓名",
            field: "name",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "80px"
        }, {
            title: "职务",
            field: "zw",
            align: "center",
            valign: "middle",
            width: "80px"
        }, {
            title: "刷卡类型",
            field: "skType",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px",
            formatter:function (value,row,index) {
                if (value == 0){
                    return "上班"
                } else if (value == 1){
                    return "下班"
                } else if (value == 2){
                    return "开始调机"
                }else if (value == 3){
                    return "调机完成"
                }
            }
        }, {
            title: "ID卡编号",
            field: "idNo",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "机加工 角色",
            field: "roleName",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "刷卡时间",
            field: "skTime",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px",
            formatter:function (value,row,index) {
                return timestampTime(value,6)
            }
        }],
        queryParams: function (params) {
            return {
                idNo: $("#queryIdNo").val(),
                zw: $("#queryZw").val(),
                skType: $("#querySkType").val(),
                ygNo: $("#queryYgNo").val(),
                name: $("#queryName").val(),
                jjRole: $("#queryJjRole").val(),
                skStartTime: $("#querySkStratTime").val(),
                skEndTime: $("#querySkEndTime").val(),
            }
        }
    });
}

$("#querySkStratTime,#querySkEndTime").datetimepicker({
    format: "yyyy-mm-dd",
    language: "zh-CN",
    startView: 4,
    autoclose: true,
    minView: 2,
    maxView: 4
}).on('show', function (event) {
    event.preventDefault();
    event.stopPropagation();
});

$("#select").selectpicker();

function getJjRoleList() {
    var str = "";
    var val = "";
    $.post("jjRole/getJjRoleList.do", function (data) {
        $(data).each(function (i, obj) {
            str += "<option value='" + obj.roleId + "'>" + obj.roleName + "</option>";
            if (i === 0) {
                val = obj.roleId;
            }
        });
        $("#queryJjRole").empty();
        $("#queryJjRole").html("<option value=''>请选择角色</option>" + str);
        $("#queryJjRole").selectpicker("val", 0);
        $("#queryJjRole").selectpicker("refresh");
    }, "json");
}

//**************************查询按钮*****************************
$("#queryBtn").click(function () {
    $('#tab_sk').bootstrapTable('selectPage', 1);
    $('#tab_sk').bootstrapTable('refresh')
});

//*************************重置按钮*************************
$("#result").click(function () {
    $("input[id^='query']").val("");
    $("select[id^='query']").selectpicker('val',"")
});


