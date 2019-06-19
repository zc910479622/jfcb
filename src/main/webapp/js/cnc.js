var prdNo = "";
var obj = {"prdNo1": "", "prdNo2": "", "prdNo3": "", "prdNo": "", "cnc1": "", "cnc2": ""};
var dom = $(".initialize").last();
var panelCss = ["panel-success", "panel-info", "panel-warning", "panel-danger"];
var index = 0;

window.operatEvents = {
    "click #delete": function (e, value, row, index) {
        $("#modal_del").on("show.bs.modal", function (event) {
            var modal = $(this);
            modal.find("#modal_del_info").html("确认要删除型号【<span style=\"color:#00F;\">" + row.prdNo + "</span>】吗？");
            modal.find("#modal_del_form_prdNo").val(row.prdNo);
            modal.find("#modal_del_form_submit").show();
        }).modal("show");
    }
};

setStaffTable()

function setStaffTable() {
    $("#tabJjCnc").bootstrapTable({
        url: "JjCnc/getJjCncTable.do",
        method: "post",
        dataType: "JSON",
        pagination: true,
        singleSelect: true,
        striped: true,
        undefinedText: "",
        height: $(window).height() * 0.6,
        pageSize: 10,
        pageList: [5, 10, 20, 30, 50],
        showColumns: false,
        showRefresh: false,
        showToggle: false,
        toolbar: "#tabSysYg_toolbar",
        cache: false,
        clickToSelect: false,
        uniqueId: "prdNo",
        columns: [{
            title: "型号",
            field: "prdNo",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "程序1",
            field: "cnc1",
            align: "center",
            valign: "middle",
            width: "100px"
        }, {
            title: "程序2",
            field: "cnc2",
            halign: "center",
            align: "center",
            valign: "middle",
            width: "100px"
        },{
            title:"操作",
            halign: "center",
            align: "center",
            valign: "middle",
            width:"20px",
            events: operatEvents,
            formatter:function () {
                return "<a href='#' id='delete'>删除</a>"
            }
        }],
        queryParams: function (params) {
            return {
                prdNo: $("#queryPrdNo").val(),
                cnc1: $("#queryCnc1").val(),
                cnc2: $("#queryCnc2").val()
            }
        }
    });
}

function queryClear(){
    $("input[id^='query']").val("")
}

function queryCheck(){
    $('#tabJjCnc').bootstrapTable('selectPage', 1);
    $('#tabJjCnc').bootstrapTable('refresh')
}

$("#showModal").click(function () {
    $("#modal_alert .modal_body").css("height",$(document.body).height()*0.7);
    $("#modal_alert").on("show.bs.modal",function (e) {
        $(".initialize").remove();
        $(".addPrdNo2").trigger("click");
        $("#prdNo").val("");
    }).modal("show")
});

/*********************自动转换大写*********************/
$("#modal_alert").on("input propertychange change","#prdNo,.cnc1,.cnc2", function () {
    $(this).val($(this).val().toUpperCase())
});

/**************************查询按钮*****************************/
$("#queryCncBtn").click(function () {
    prdNo = $("#prdNo").val();
    if (prdNo.length < 2) {
        showMassage("必须不少于2个字符");
        return;
    }
    $(".initialize").remove();
    $.ajax({
        url: "JjCnc/selectJjCnc.do",
        type: "POST",
        data: {"prefix": prdNo},
        dataType: "json",
        success: function (data) {
            $(data).each(function (i, v) {
                if (i == 0) {
                    $(".addPrdNo2").trigger("click");
                    dom = $(".initialize").last();
                    $(".prdNo2").first().val(v.prdNo2);
                    $(".prdNo3").first().val(v.prdNo3).attr("oldPrdNo", v.prdNo);
                    $(".cnc1").first().val(v.cnc1);
                    $(".cnc2").first().val(v.cnc2);
                } else if (v.prdNo2 == obj.prdNo2) {
                    if (v.cnc1 == obj.cnc1 && v.cnc2 == obj.cnc2) {
                        dom.find(".GroupDiv").last().find(".addPrdNo3").trigger("click");
                        dom.find(".GroupDiv").last().find(".prdNo3").last().val(v.prdNo3).attr("oldPrdNo", v.prdNo);
                    } else {
                        dom.find(".addGroup").trigger("click");
                        dom.find(".GroupDiv").last().find(".prdNo3").last().val(v.prdNo3).attr("oldPrdNo", v.prdNo);
                        $(".cnc1").last().val(v.cnc1);
                        $(".cnc2").last().val(v.cnc2);
                    }
                } else {
                    $(".addPrdNo2").trigger("click");
                    dom = $(".initialize").last();
                    dom.find(".prdNo2").first().val(v.prdNo2);
                    dom.find(".prdNo3").first().val(v.prdNo3).attr("oldPrdNo", v.prdNo);
                    dom.find(".cnc1").first().val(v.cnc1);
                    dom.find(".cnc2").first().val(v.cnc2);
                }
                obj = v;
            })
        }
    })
});

//********************************模态框重置按钮*************************************
$("#modal-clear").click(function () {
    $(".initialize").remove();
    $("#prdNo").val("")
    $(".addPrdNo2").trigger("click");
})

//********************************删除按钮*************************************
$("#modal_del_form_submit").click(function () {
    $.post("JjCnc/delete.do", {prdNo: $("#modal_del_form_prdNo").val()}, function (result) {
        if (result == 1) {
            $("#tabJjCnc").bootstrapTable("refresh");
            showMassage('删除【<span style=\"color:#00F;\">'+$("#modal_del_form_prdNo").val()+ '</span>】成功!!!');
        }else {
            showMassage('删除【<span style=\"color:#00F;\">'+$("#modal_del_form_prdNo").val()+ '</span>】失败');
        }
    })
});


$(".addPrdNo2").click(function () {
    let str = '<div class="panel panel-info initialize addHtml">\n' +
        '    <div class="panel-heading " style="display:flex;">\n' +
        '        <div class="input-group" style="width: 76%;">\n' +
        '            <span class="input-group-addon">规格</span>\n' +
        '            <input type="text" class="form-control prdNo2" style="width: 30%" autocomplete="off">\n' +
        '        </div>\n' +
        '        <p style="width: 9%;font-weight: bold;text-align: center">程序1</p>\n' +
        '        <p style="width: 9%;font-weight: bold;text-align: center">程序2</p>\n' +
        '        <button style="flex: 1" class="btn btn-primary deleteSize"\n' +
        '                onclick="deletePrdNo2($(this))"><span\n' +
        '                class="glyphicon glyphicon-off"></span></button>\n' +
        '    </div>\n' +
        '    <div class="panel-body">\n' +
        '        <div class="panel-body GroupDiv">\n' +
        '            <div class="input-group pull-left styleDiv">\n' +
        '                <div style="position: relative" class="pull-left">\n' +
        '                    <input type="text" data-pure-clear-button="true" autocomplete="off"\n' +
        '                           class="form-group input-sm has-feedback prdNo3"\n' +
        '                           style="padding-right: 30px;">' +
        '<span aria-hidden="true" class="glyphicon glyphicon-remove form-control-feedback" data-pure-clear-button="event" style="cursor: pointer; pointer-events: auto; right: -5px;"></span>\n' +
        '                </div>\n' +
        '                <button class="btn btn-primary addPrdNo3"\n' +
        '                        onclick="addPrdNo3($(this))"><span\n' +
        '                        class="glyphicon glyphicon-plus"></span>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '            <div class="pull-right codingDiv">\n' +
        '                <input type="text" autocomplete="off"\n' +
        '                       class="form-group codingInput input-sm cnc1">\n' +
        '                <input type="text" autocomplete="off"\n' +
        '                       class="form-group codingInput input-sm cnc2">\n' +
        '            </div>\n' +
        '            <button class="btn btn-success deleteGroup" onclick="deleteGroup($(this))"><span\n' +
        '                    class="glyphicon glyphicon-minus"></span></button>\n' +
        '        </div>\n' +
        '        <button class="btn btn-success addGroup" onclick="addGroup($(this))"><span\n' +
        '                class="glyphicon glyphicon-plus"></span></button>\n' +
        '    </div>\n' +
        '</div>';
    $(this).parent().siblings(".modal_body").append(str);
    index++
});

function deletePrdNo2(dom) {
    if (dom.parent().parent().siblings("div").length > 0)
        dom.parent().parent().remove();
}

function addGroup(dom) {
    let str = '<div class="panel-body GroupDiv addHtml">\n' +
        '    <div class="input-group pull-left styleDiv">\n' +
        '        <div style="position: relative" class="pull-left">\n' +
        '            <input type="text" data-pure-clear-button="true" autocomplete="off"\n' +
        '                   class="form-group input-sm has-feedback prdNo3"\n' +
        '                   style="padding-right: 30px;">' +
        '<span aria-hidden="true" class="glyphicon glyphicon-remove form-control-feedback" data-pure-clear-button="event" style="cursor: pointer; pointer-events: auto; right: -5px;"></span>\n' +
        '        </div>\n' +
        '        <button class="btn btn-primary addPrdNo3"\n' +
        '                onclick="addPrdNo3($(this))"><span\n' +
        '                class="glyphicon glyphicon-plus"></span>\n' +
        '        </button>\n' +
        '    </div>\n' +
        '    <div class="pull-right codingDiv">\n' +
        '        <input type="text" autocomplete="off"\n' +
        '               class="form-group codingInput input-sm cnc1">\n' +
        '        <input type="text" autocomplete="off"\n' +
        '               class="form-group codingInput input-sm cnc2">\n' +
        '    </div>\n' +
        '    <button class="btn btn-success deleteGroup" onclick="deleteGroup($(this))"><span\n' +
        '            class="glyphicon glyphicon-minus"></span></button>\n' +
        '</div>';

    dom.before(str);
}

function deleteGroup(dom) {
    if (dom.parent().siblings("div").length > 0)
        dom.parent().remove();
}

function addPrdNo3(dom) {
    let str = '<div style="position: relative" class="pull-left">\n' +
        '    <input type="text" data-pure-clear-button="true" autocomplete="off"\n' +
        '           class="form-group input-sm has-feedback prdNo3"' +
        '           style="padding-right: 30px;">\n' +
        '    <span aria-hidden="true" class="glyphicon glyphicon-remove form-control-feedback" data-pure-clear-button="event" style="cursor: pointer; pointer-events: auto; right: -5px;"></span>' +
        '</div>';
    dom.before(str);
}

$.pureClearButton.setDefault({
    icon: 'glyphicon-remove'
});

$("#modal_alert").on("focus input propertychange change blur", ".prdNo3", function (event) {
    let arr = $(this).parent().parent().parent().parent().find(".prdNo3");
    let arrRed = [];
    let t = $(this);
    let num = 0;
    $(arr).each(function (i, dom) {
        if (dom.value == t.val() && dom.value != '') {
            t.css("color", "red");
            num++
        }
    });
    if (num > 1) {
        showMassage("存在重复字段,请更改");
    } else {
        t.css("color", "#000")
    }
});

$("#modal_alert").on("focus input propertychange change blur", ".cnc1,.cnc2", function (event) {
    let arr = $(this).parent().parent().parent().find(".codingDiv");
    let t = $(this);
    let v = t.parent().find(".cnc1").val() + t.parent().find(".cnc2").val();
    let num = 0;
    $(arr).each(function (i, dom) {
        let value = dom.children[0].value + dom.children[1].value;
        console.log(v == value && value != "")
        if (v == value && value != "") {
            t.parent().find(".cnc1").css("color", "red");
            t.parent().find(".cnc2").css("color", "red");
            num++
        }
    });
    if (num > 1) {
        showMassage("存在重复程序,请更改");
    } else {
        t.parent().find(".cnc1").css("color", "#000");
        t.parent().find(".cnc2").css("color", "#000");
    }
});

$("#modal_alert").on("focus input propertychange change blur", ".prdNo2", function (event) {
    let arr = $(this).parent().parent().parent().parent().find(".prdNo2");
    let t = $(this);
    let num = 0;
    $(arr).each(function (i, dom) {
        if (dom.value == t.val() && dom.value != '') {
            t.css("color", "red");
            num++
        }
    });
    if (num > 1) {
        showMassage("存在重复尺寸,请更改");
    } else {
        t.css("color", "#000")
    }
});

$("#save").click(function () {
    let b = false;
    let prdNo1 = $("#prdNo").val();
    if (prdNo1 == "") {
        showMassage("请输入型号!");
        $("#prdNo").focus();
        b = true;
        return;
    }
    let inputArr = $(".modal_body").find("input");
    let prdNo3Arr = $(".prdNo3,.cnc1,.cnc2");
    let prdNo2Arr = $(".prdNo2");
    let k = 0;
    $(inputArr).each(function (i,dom) {
        if ( $(dom).css("color") === "rgb(255, 0, 0)"){
            $(dom).focus();
            showMassage("请确认填写参数后保存");
            b = true;
            return;
        }
    });
    $(prdNo3Arr).each(function (i,dom) {
        if ( $(dom).val() === ""){
            $(dom).focus();
            showMassage("请确认填写参数后保存");
            b = true;
            return;
        }
    });
    $(prdNo2Arr).each(function (i,dom) {
        if ( $(dom).val() === ""){
            k++;
        }
    });
    if (k>1){
        showMassage("规格不允许多个输入框为空")
        return
    };
    if (b)return;
    let jsonArray = [];
    let arr = $(".initialize");
    $(arr).each(function (i, dom) {
        let prdNo2 = $(dom).find(".prdNo2").val();
        let GroupDivArr = $(dom).find(".GroupDiv");
        $(GroupDivArr).each(function (j, dom1) {
            let prdNo3Arr = $(dom1).find(".prdNo3");
            let cnc1 = $(dom1).find(".cnc1").val();
            let cnc2 = $(dom1).find(".cnc2").val();
            $(prdNo3Arr).each(function (k, dom2) {
                let prdNo3 = $(dom2).val();
                let oldPrdNo = $(dom2).attr("oldPrdNo");
                let json = {"prdNo": prdNo1 + prdNo2 + prdNo3, "cnc1": cnc1, "cnc2": cnc2, "oldPrdNo": oldPrdNo};
                jsonArray.push(json);
            })
        })
    });
    $.ajax({
        url: "JjCnc/updateJjCnc.do",
        data: JSON.stringify(jsonArray),
        contentType: "application/json",
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data) {
                showMassage("保存成功");
                $("#tabJjCnc").bootstrapTable("refresh");
                $("#modal-clear").trigger("click");
            }else {
                showMassage("保存失败");
            }
        }
    })
});

