window.operatEvents = {
    "click #edit": function (e, value, row, index) {
        $("#modal_addStaff").one("show.bs.modal", function (event) {
            var modal = $(this);
            modal.find("#modal_addStaff_title").text("修改员工信息");
            modal.find("#modal_addStaff_form_name").val(row.name);
            modal.find("#modal_addStaff_form_zw").val(row.zw);
            modal.find("#modal_addStaff_form_ygNo").val(row.ygNo);
            modal.find("#modal_addStaff_form_idNo").val(row.idNo);
            modal.find("#addJjRole").selectpicker("val", row.jjRole);
            modal.find("#modal_addStaff_form_salNo").val(row.salNo);
            modal.find("#modal_addStaff_form_ygNo").val(row.ygNo);
            modal.find("#oldYgNo").val(row.ygNo);
            modal.find("#modal_editStaff_form_submit").removeClass("hidden");
            modal.find("#modal_addStaff_form_submit").addClass("hidden");
        }).modal("show");
    },
    "click #delete": function (e, value, row, index) {
        $("#modal_del").on("show.bs.modal", function (event) {
            var modal = $(this);
            modal.find("#modal_del_info").html("确认要删除【<span style=\"color:#00F;\">" + row.name + "</span>】吗？");
            modal.find("#modal_del_form_ygNo").val(row.ygNo);
            modal.find("#modal_del_form_submit").show();
        }).modal("show");
    }
};
getJjRoleList();
setStaffTable();


function setStaffTable() {
    $("#tabSysYg").bootstrapTable({
        url: "sysYg/getSysYgList.do",
        method: "post",
        dataType: "JSON",
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
        toolbar: "#tabSysYg_toolbar",
        cache: false,
        clickToSelect: false,
        uniqueId: "ygNo",
        columns: [{
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
            title: "工号",
            field: "ygNo",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
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
            title: "天心salm表编号",
            field: "salNo",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "操作",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "60px",
            events: operatEvents,
            formatter: aFormatter()
        }],
        queryParams: function (params) {
            return {
                name: $("#queryName").val(),
                zw: $("#queryZw").val(),
                workId: $("#queryWorkId").val(),
                idNo: $("#queryIdNo").val(),
                jjRole: $("#queryJjRole").val(),
                salNo: $("#querySalNo").val(),
            }
        }
    });
}

function aFormatter(value, row, index) {
    return [
        '<a id="edit" href="#">修改</a>&nbsp;&nbsp;|&emsp;<a id="delete" href="#">删除</a>'
    ].join("")
}

$("#select").selectpicker();

$("#tabSysYg_add").click(function () {
    $("#modal_addStaff").on("show.bs.modal", function (event) {
        var modal = $(this);
        modal.find("#modal_addStaff_title").text("新增员工");
        $("#modal_addStaff_form input").val("");
        $("#modal_addStaff_form_zw").val("");
        $("#addJjRole").val("");
        modal.find("#oldYgNo").val("0");
        modal.find("#modal_editStaff_form_submit").addClass("hidden");
        modal.find("#modal_addStaff_form_submit").removeClass("hidden");
    }).modal("show");
});

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
        $("#addJjRole").empty();
        $("#addJjRole").html(str);
        $("#addJjRole").selectpicker("val", val);
        $("#addJjRole").selectpicker("refresh");
        $("#queryJjRole").empty();
        $("#queryJjRole").html("<option value='0'>请选择角色</option>" + str);
        $("#queryJjRole").selectpicker("val", 0);
        $("#queryJjRole").selectpicker("refresh");
    }, "json");
}

$("#modal_addStaff").on("hide.bs.modal",function () {
    $('#modal_addStaff_form').data('bootstrapValidator').resetForm(true);
});

//!***************************验证表单信息***********************************
/*$("#modal_addStaff_form_name").on("input propertychange change", function (event) {
    var regexp = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    ;
    var str = $("#modal_addStaff_form_name").val();
    $("#modal_addStaff_form_name").parent().removeClass("has-success");
    if (str == "" || str == null) {
        $("#modal_addStaff_form_name").parent().addClass("has-error");
        $("#modal_addStaff_form_name").next().html("请输入姓名");
    } else if (!regexp.test(str)) {
        $("#modal_addStaff_form_name").parent().addClass("has-error");
        $("#modal_addStaff_form_name").next().html("姓名长度在2-6之间,且是中文");
    } else {
        $("#modal_addStaff_form_name").parent().removeClass("has-error");
        $("#modal_addStaff_form_name").parent().addClass("has-success");
        $("#modal_addStaff_form_name").next().html("");
    }
    changesubmit()
});

$("#modal_addStaff_form_workId").on("input propertychange change", function (event) {
    var regexp = /^[0-9]{6}$/;
    var str = $("#modal_addStaff_form_workId").val();
    $("#modal_addStaff_form_workId").parent().removeClass("has-success");
    if (str == "" || str == null) {
        $("#modal_addStaff_form_workId").parent().addClass("has-error");
        $("#modal_addStaff_form_workId").next().html("请输入工号,必须为整数");
    } else if (!regexp.test(str)) {
        $("#modal_addStaff_form_workId").parent().addClass("has-error");
        $("#modal_addStaff_form_workId").next().html("工号应为6位数");
    } else {
        $("#modal_addStaff_form_workId").parent().removeClass("has-error");
        $("#modal_addStaff_form_workId").parent().addClass("has-success");
        $("#modal_addStaff_form_workId").next().html("");
    }
    changesubmit()
});

$("#modal_addStaff_form_idNo").on("input propertychange change", function (event) {
    var regexp = /^[0-9]{6,11}$/;
    var str = $("#modal_addStaff_form_idNo").val();
    $("#modal_addStaff_form_idNo").parent().removeClass("has-success");
    if (str == "" || str == null) {
        $("#modal_addStaff_form_idNo").parent().addClass("has-error");
        $("#modal_addStaff_form_idNo").next().html("请输入ID编号");
    } else if (!regexp.test(str)) {
        $("#modal_addStaff_form_idNo").parent().addClass("has-error");
        $("#modal_addStaff_form_idNo").next().html("ID编号最长为11位");
    } else {
        $("#modal_addStaff_form_idNo").parent().removeClass("has-error");
        $("#modal_addStaff_form_idNo").parent().addClass("has-success");
        $("#modal_addStaff_form_idNo").next().html("");
    }
    changesubmit()
});

$("#modal_addStaff_form_salNo").on("input propertychange change", function (event) {
    var regexp = /^([0-9]|[1-5][0-9]|60)$/;
    var str = $("#modal_addStaff_form_salNo").val();
    $("#modal_addStaff_form_salNo").parent().removeClass("has-success");
    if (str == "" || str == null) {
        $("#modal_addStaff_form_salNo").parent().addClass("has-error");
        $("#modal_addStaff_form_salNo").next().html("请输入天心salm编号");
    } else if (!regexp.test(str)) {
        $("#modal_addStaff_form_salNo").parent().addClass("has-error");
        $("#modal_addStaff_form_salNo").next().html("salm编号");
    } else {
        $("#modal_addStaff_form_salNo").parent().removeClass("has-error");
        $("#modal_addStaff_form_salNo").parent().addClass("has-success");
        $("#modal_addStaff_form_salNo").next().html("");
    }
    changesubmit()
});

function changesubmit() {
    var sound = $("#modal_addStaff").find(".has-success").length;
    console.log(sound)
    if (sound == 4) {
        $("#modal_addStaff_form_submit").removeAttr("disabled");
        $("#modal_editStaff_form_submit").removeAttr("disabled");
        return true;
    } else {
        $("#modal_addStaff_form_submit").attr("disabled", true);
        $("#modal_editStaff_form_submit").attr("disabled", true);
        return false;
    }
}*/

//***********************错误信息************************
function submit_fail(fn, msg) {
    fn.hide().html("<label class=\"label label-danger\">" + msg + "</label>").show(300, function () {
        setTimeout(function () {
            fn.hide();
        }, 5000);
    });
}

//**************************查询按钮*****************************
$("#queryBtn").click(function () {
    $('#tabSysYg').bootstrapTable('selectPage', 1);
    $('#tabSysYg').bootstrapTable('refresh')
});

//*************************重置按钮*************************
$("#result").click(function () {
    $("#queryForm input").val("");
    $("#queryJjRole").val(0);
    $("#queryZw").val(0);
});

//**************************添加按钮*************************************
$("#modal_addStaff_form_submit").click(function () {
    let bootstrapValidator = $("#modal_addStaff_form").data('bootstrapValidator');
    bootstrapValidator.validate();
    if (bootstrapValidator.isValid()) {
        $.ajax({
            url: "sysYg/addTSysYg.do",
            async: false,//同步，会阻塞操作
            type: "post",//PUT DELETE POST
            data: $("#modal_addStaff_form").serialize(),
            complete: function (msg) {
                console.log("完成了");
            },
            success: function (result) {
                console.log(result);
                if (result == 1) {
                    $("#modal_addStaff").modal("hide");
                    $("#tabSysYg").bootstrapTable("refresh");
                } else {
                    submit_fail($("#modal_addStaff_message"), "保存失败，请检查编号是否有重复！");
                }
            }, error: function () {
                submit_fail($("#modal_addStaff_message"), "保存失败，请检查编号是否有重复！");
            }
        });
    }
});

//******************************修改按钮***********************************
$("#modal_editStaff_form_submit").click(function () {
    let bootstrapValidator = $("#modal_addStaff_form").data('bootstrapValidator');
    bootstrapValidator.validate();
    if (bootstrapValidator.isValid()) {
        $.ajax({
            url: "sysYg/updateTSysYg.do",
            async: false,//同步，会阻塞操作
            type: "post",//PUT DELETE POST
            data: $("#modal_addStaff_form").serialize(),
            complete: function (msg) {
                console.log("完成了");
            },
            success: function (result) {
                console.log(result);
                if (result == 1) {
                    $("#modal_addStaff").modal("hide");
                    $("#tabSysYg").bootstrapTable("refresh");
                } else {
                    submit_fail($("#modal_addStaff_message"), "修改失败，请检查编号是否有重复！");
                }
            }, error: function () {
                submit_fail($("#modal_addStaff_message"), "修改失败，请检查编号是否有重复！");
            }
        });
    }
});

//********************************删除按钮*************************************
$("#modal_del_form_submit").click(function () {
    $.post("sysYg/delete.do", {ygNo: $("#modal_del_form_ygNo").val()}, function (result) {
        if (result == 1) {
            $("#tabSysYg").bootstrapTable("refresh");
        }
    })
});

$('#modal_addStaff_form').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        ygNo: {
            message: 'The username is not valid',
            threshold: 6,//有2字符以上才发送ajax请求
            validators: {
                notEmpty: {message: '员工号不能为空'},
                stringLength: {min: 6, max: 6, message: '员工号由6位数字组成'},
                remote: {
                    url: "sysYg/checkYgNo.do",
                    message: '员工号已存在,请重新输入',
                    delay: 1000,//ajax刷新的时间是1秒一次
                    type: 'POST', //自定义提交数据，默认值提交当前input value
                    data: function (validator) {
                        return {
                            oldYgNo: $("#oldYgNo").val()//UserServlet判断调用方法关键字。
                        };
                    }
                }
            }
        },
        name: {
            message: 'The username is not valid',
            validators: {
                notEmpty: {message: '员工姓名不能为空'},
                regexp: {
                    regexp: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/,
                    message: '姓名长度在2-6之间,且是中文'
                },
            },
        },
        zw: {
            message: 'The username is not valid',
            validators: {
                notEmpty: {
                    message: '职务不能为空'
                },
                regexp: {
                    regexp: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/,
                    message: '职务长度在2-6之间,且是中文'
                },
            },
        },
        idNo: {
            message: 'The username is not valid',
            validators: {
                notEmpty: {message: 'ID编号不能为空'},
                regexp: {
                    regexp: /^[0-9]{6,11}$/,
                    message: 'ID编号最长为11位'
                },
                remote: {
                    url: "sysYg/checkIdNo.do",
                    message: 'ID卡已存在,请重新输入',
                    delay: 1000,//ajax刷新的时间是1秒一次
                    type: 'POST', //自定义提交数据，默认值提交当前input value
                    data: function (validator) {
                        return {
                            oldYgNo: $("#oldYgNo").val()//UserServlet判断调用方法关键字。
                        };
                    }
                }
            },
        },
        salNo: {
            message: 'The username is not valid',
            validators: {
                notEmpty: {message: 'salm编号不能为空'},
                regexp: {
                    regexp: /^[0-9]{6,11}$/,
                    message: 'salm编最短6位,最长为11位'
                },
            },
        },
    }
});
