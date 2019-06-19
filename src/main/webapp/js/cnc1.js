var prdNo = "";
var obj = {"prdNo1":"","prdNo2":"","prdNo3":"","prdNo":"","cnc1":"","cnc2":""};
var dom = $(".initialize").last();
var panelCss = ["panel-success","panel-info","panel-warning","panel-danger"];
var index = 0;

/*********************自动转换大写*********************/
$("#prdNo").on("input propertychange change",function () {
    $(this).val($(this).val().toUpperCase())
});

/**************************查询按钮*****************************/
$("#queryCncBtn").click(function () {
    prdNo = $("#prdNo").val();
    if (prdNo.length<4){
        showMassage("必须不少于4个字符");
        return;
    }
    $(".initialize").remove();
    $.ajax({
        url:"JjCnc/selectJjCnc.do",
        type:"POST",
        data:{"prefix":prdNo},
        dataType:"json",
        success:function (data) {
            $(data).each(function (i,v) {
                if (i==0){
                    $(".addPrdNo2").trigger("click");
                    dom = $(".initialize").last();
                    $(".prdNo2").first().val(v.prdNo2);
                    $(".prdNo3").first().val(v.prdNo3).attr("oldPrdNo",v.prdNo);
                    $(".cnc1").first().val(v.cnc1);
                    $(".cnc2").first().val(v.cnc2);
                }else if (v.prdNo2 == obj.prdNo2){
                    if (v.cnc1 == obj.cnc1&&v.cnc2 == obj.cnc2) {
                        dom.find(".GroupDiv").last().find(".addPrdNo3").trigger("click");
                        dom.find(".GroupDiv").last().find(".prdNo3").last().val(v.prdNo3).attr("oldPrdNo",v.prdNo);
                    }else {
                        dom.find(".addGroup").trigger("click");
                        dom.find(".GroupDiv").last().find(".prdNo3").last().val(v.prdNo3).attr("oldPrdNo",v.prdNo);
                        $(".cnc1").last().val(v.cnc1);
                        $(".cnc2").last().val(v.cnc2);
                    }
                } else {
                    $(".addPrdNo2").trigger("click");
                    dom = $(".initialize").last();
                    dom.find(".prdNo2").first().val(v.prdNo2);
                    dom.find(".prdNo3").first().val(v.prdNo3).attr("oldPrdNo",v.prdNo);
                    dom.find(".cnc1").first().val(v.cnc1);
                    dom.find(".cnc2").first().val(v.cnc2);
                }
                obj = v;
            })
        }
    })
});

$(".addPrdNo2").click(function () {
    let str = '<div class="panel '+panelCss[index%4]+' initialize" >\n' +
        '    <div class="panel-heading " style="padding-bottom: 4%">\n' +
        '        <div class="input-group pull-left" style="width: 30rem;">\n' +
        '            <span class="input-group-addon">规格</span>\n' +
        '            <input type="text" class="form-control prdNo2" autocomplete="off">\n' +
        '        </div>\n' +
        '        <button class="btn btn-primary pull-right deletePrdNo2" onclick="deletePrdNo2($(this))"><span class="glyphicon glyphicon-off"></span></button>\n' +
        '        <p class="pull-right" style="width: 9%;font-weight: bold;">程序2</p>\n' +
        '        <p class="pull-right" style="width: 9%;font-weight: bold;">程序1</p>' +
        '    </div>\n' +
        '    <div class="panel-body">\n' +
        '        <div class="panel-body GroupDiv">\n' +
        '            <div class="input-group pull-left styleDiv">\n' +
        '                <div style="position: relative" class="pull-left">\n' +
        '                    <input type="text" data-pure-clear-button="true" class="form-group input-sm has-feedback prdNo3" style="padding-right: 30px;">\n' +
        '                    <span aria-hidden="true" class="glyphicon glyphicon-remove form-control-feedback" data-pure-clear-button="event" style="cursor: pointer; pointer-events: auto; right: 0px;"></span>\n' +
        '                </div>\n' +
        '                <div class="input-group-btn">\n' +
        '                    <button class="btn btn-primary pull-right addPrdNo3" onclick="addPrdNo3($(this))"><span class="glyphicon glyphicon-plus"></span>\n' +
        '                    </button>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="pull-right codingDiv">\n' +
        '                <input type="text" class="form-group codingInput cnc1 input-sm">\n' +
        '                <input type="text" class="form-group codingInput cnc2 input-sm">\n' +
        '            </div>\n' +
        '            <button class="btn btn-success deleteGroup" onclick="deleteGroup($(this))"><span class="glyphicon glyphicon-minus"></span></button>\n' +
        '        </div>\n' +
        '        <button class="btn btn-success addGroup" onclick="addGroup($(this))"><span class="glyphicon glyphicon-plus"></span></button>\n' +
        '    </div>\n' +
        '</div>';
    $(this).parent().siblings(".panel-body").append(str);
    index++
});

function deletePrdNo2(dom) {
    if (dom.parent().parent().siblings("div").length > 0)
        dom.parent().parent().remove();
}

function addGroup(dom) {
    let str =  '<div class="panel-body GroupDiv addHtml">\n' +
        '    <div class="input-group pull-left styleDiv">\n' +
        '        <div style="position: relative" class="pull-left">\n' +
        '            <input type="text" data-pure-clear-button="true" class="form-group input-sm has-feedback prdNo3" style="padding-right: 30px;">\n' +
        '            <span aria-hidden="true" class="glyphicon glyphicon-remove form-control-feedback" data-pure-clear-button="event" style="cursor: pointer; pointer-events: auto; right: 0px;"></span>\n' +
        '        </div>\n' +
        '        <div class="input-group-btn">\n' +
        '            <button class="btn btn-primary pull-right addPrdNo3" onclick="addPrdNo3($(this))"><span class="glyphicon glyphicon-plus">\n' +
        '            </button>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="pull-right codingDiv">\n' +
        '        <input type="text" class="form-group codingInput cnc1 input-sm">\n' +
        '        <input type="text" class="form-group codingInput cnc2 input-sm">\n' +
        '    </div>\n' +
        '    <button class="btn btn-success deleteGroup" onclick="deleteGroup($(this))"><span class="glyphicon glyphicon-minus"></span></button>\n' +
        '</div>\n';

    dom.before(str);
}

function deleteGroup(dom) {
    if (dom.parent().siblings("div").length > 0)
        dom.parent().remove();
}

function addPrdNo3(dom) {
    let str = '<div style="position: relative" class="pull-left addHtml">\n' +
        '    <input type="text" data-pure-clear-button="true" class="form-group input-sm has-feedback prdNo3" style="padding-right: 30px;">' +
        '<span aria-hidden="true" class="glyphicon glyphicon-remove form-control-feedback" data-pure-clear-button="event" style="cursor: pointer; pointer-events: auto; right: 0px;"></span>\n' +
        '</div>';
    dom.parent().before(str);
}

$.pureClearButton.setDefault({
    icon: 'glyphicon-remove'
});

$(".container").on("change",".prdNo3",function (event) {
   let arr = $(this).parent().parent().parent().parent().find(".prdNo3");
   let t = $(this);
   let num = 0;
    $(arr).each(function (i,dom) {
        if (dom.value==t.val()&&dom.value!=''){
            t.css("color","red");
            num++
        }
    });
    if (num>1){
       showMassage("存在重复字段,请更改");
    }else {
        t.css("color","#000")
    }
});

$(".container").on("change",".cnc1,.cnc2",function (event) {
    let arr = $(this).parent().parent().parent().find(".codingDiv");
    let t = $(this);
    let v = t.parent().find(".cnc1").val()+t.parent().find(".cnc2").val()
    console.log(v)
    let num = 0;
    $(arr).each(function (i,dom) {
        let value = dom.children[0].value+dom.children[1].value;
        console.log(v == value&&value!="")
        if (v == value&&value!=""){
            t.parent().find(".cnc1").css("color","red");
            t.parent().find(".cnc2").css("color","red");
            num++
        }
    });
    if (num>1){
        showMassage("存在重复程序,请更改");
    }else {
        t.parent().find(".cnc1").css("color","#000");
        t.parent().find(".cnc2").css("color","#000");
    }
});

$(".container").on("change",".prdNo2",function (event) {
    let arr = $(this).parent().parent().parent().parent().find(".prdNo2");
    let t = $(this);
    let num = 0;
    $(arr).each(function (i,dom) {
        if (dom.value==t.val()&&dom.value!=''){
            t.css("color","red");
            num++
        }
    });
    if (num>1){
        showMassage("存在重复尺寸,请更改");
    }else {
        t.css("color","#000")
    }
});

$("#save").click(function () {
    let prdNo1 = $("#prdNo").val();
    if (prdNo1==""){
        showMassage("请输入型号!");
        $("#prdNo").focus();
        return
    }
    let jsonArray = [];
    let arr = $(".initialize");
    $(arr).each(function (i,dom) {
        let prdNo2 = $(dom).find(".prdNo2").val();
        let GroupDivArr = $(dom).find(".GroupDiv");
        $(GroupDivArr).each(function (j,dom1) {
            let prdNo3Arr = $(dom1).find(".prdNo3");
            let cnc1 = $(dom1).find(".cnc1").val();
            let cnc2 = $(dom1).find(".cnc2").val();
            $(prdNo3Arr).each(function (k,dom2) {
                let prdNo3 = $(dom2).val();
                let oldPrdNo = $(dom2).attr("oldPrdNo");
                let json = {"prdNo":prdNo1+prdNo2+prdNo3,"cnc1":cnc1,"cnc2":cnc2,"oldPrdNo":oldPrdNo};
                jsonArray.push(json);
            })
        })
    });
    $.ajax({
        url:"JjCnc/updateJjCnc.do",
        data:JSON.stringify(jsonArray),
        contentType:"application/json",
        type:"post",
        dataType:"json",
        success: function(data){
            if (data){
                showMassage("保存成功")
            }
        }
    })
});