$.ajax({
    async:false,
});
$(".modal").modal({backdrop: 'static', keyboard: false});
var sss = 0;
var selectStr;
var ulOn= [];
var deleteArr = [];
setHtml();
function setHtml() {
    let string = "";
    let optionJt = "";
    $.post("JjRw/selectJjRw.do", function (data) {
        selectStr = "<select name='jtNo' class='selectpicker'>";
        $(data).each(function (i, v) {
            let str = "";
            selectStr += "<option value='" + v.jtNo + "'>" + v.jtNo + "</option>";
            str += '<div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ' + v.jtNo + '">' +
                '<div class="portlet-header ui-widget-header ui-corner-all">' + v.jtNo + '</div>';
            str += '<ul class="connectedSortable sortable sortable1" id="' + v.jtNo + '">';
            optionJt += "<li class='ui-state-active' onclick='setDiv(\"" + v.jtNo + "\",$(this))'>" + v.jtNo + "</a></li>"
            $(v.arr).each(function (j, obj) {
                let st = JSON.stringify(obj);
                if (obj.isJg) {
                    str += '<li class="ui-state-error qwe" value="' + i + '|' + j + '">' +
                        '<p class="jhNo">编&emsp;&emsp;号:' + obj.jhNo + '</p>' +
                        '<p class="jhItm">项&emsp;&emsp;次:' + obj.jhItm + '</p>' +
                        '<p class="jhDd">日&emsp;&emsp;期:' + timestampTime(obj.jhDd,3) + '</p>' +
                        '<p class="jfJt">原&ensp;机&ensp;台:' + obj.jfJt + '</p>' +
                        '<p class="prdNo">产品型号:' + obj.prdNo + '</p>' +
                        '<p class="jfMp">毛&ensp;胚&ensp;号:' + obj.jfMp + '</p>' +
                        '<p class="qtyJh">总计划数:' + obj.qtyJh + '</p>' +
                        '<p class="jhQty">机床计划:' + obj.jhQty + '</p>' +
                        '<p class="jhItm">已&ensp;加&ensp;工:' + obj.complete + '</p>' +
                        '<p class="num">待&ensp;加&ensp;工:' + (obj.jhQty - obj.complete) + '</p>' +
                        '<p name="object" class="hidden">' + st + '</p>' +
                        '</li>'
                } else {
                    str += '<li class="ui-state-default" value="' + i + '|' + j + '">' +
                        '<p class="jhNo">编&emsp;&emsp;号:' + obj.jhNo + '</p>' +
                        '<p class="jhItm">项&emsp;&emsp;次:' + obj.jhItm + '</p>' +
                        '<p class="jhDd">日&emsp;&emsp;期:' + timestampTime(obj.jhDd,3) + '</p>' +
                        '<p class="jfJt">原&ensp;机&ensp;台:' + obj.jfJt + '</p>' +
                        '<p class="prdNo">产品型号:' + obj.prdNo + '</p>' +
                        '<p class="jfMp">毛&ensp;胚&ensp;号:' + obj.jfMp + '</p>' +
                        '<p class="qtyJh">总计划数:' + obj.qtyJh + '</p>' +
                        '<p class="jhQty">机床计划:' + obj.jhQty + '</p>' +
                        '<p class="jhItm">已&ensp;加&ensp;工:' + obj.complete + '</p>' +
                        '<p class="num">待&ensp;加&ensp;工:' + (obj.jhQty - obj.complete) + '</p>' +
                        '<p name="object" class="hidden">' + st + '</p>' +
                        '</li>'
                }
            });
            str += '</ul></div>';
            string += str
        });
        $("#optionJt").html(optionJt);
        selectStr += "</select>";
        $("#div-box").html(string);
        if(ulOn.length<data.length){
            ulOn = Array($("#optionJt").children().length).fill(1);
            console.log("重置触发")
        }
        $(".sortable").sortable({
            connectWith: ".sortable",
            placeholder: "ui-state-highlight",
            items: "li:not(.qwe)",
        });

        /********************sotrable**********************/
        $(".sortable1").on("sortreceive", function (event, ui) {
            let sorttable = event;
            let jtNo = sorttable.target.attributes.id.nodeValue;//放置触发机台号
            let jhObj = JSON.parse(ui.item[0].lastChild.innerHTML);//当前拖拽对象
            let newObj = Object.assign({}, jhObj);
            let oldObj = Object.assign({}, jhObj);
            var number = 0; //判断机台是否存在同一计划单
            let index;
            $(sorttable.target.children).each(function (l, child) {
                if (JSON.parse(child.lastChild.innerHTML).jhId == jhObj.jhId && JSON.parse(child.lastChild.innerHTML).jhItm == jhObj.jhItm && JSON.parse(child.lastChild.innerHTML).jtNo == jtNo) {
                    number++;
                    index = l;
                }
            });
            $("#modal_alert").off("show.bs.modal").on("show.bs.modal", function (event) {
                $("#modal_alert_info").html("需要拆分计划<span style='color: #ff4341;font-weight: bold'>(" + jhObj.jhNo + ")</span>吗?");
                //拆分计划按钮触发事件
                $("#modal_alert_form_submit").off("click").on("click", function () {
                    $("#modal_plan").off("show.bs.modal").on("show.bs.modal", function (event) {
                        let modal = $(this);
                        modal.find("#modal_plan_title").html("计划调整");
                        modal.find("#jhNo").val(jhObj.jhNo);//编号
                        modal.find("#jhDd").val(timestampTime(jhObj.jhDd,6));//日期
                        modal.find("#jhItm").val(jhObj.jhItm);//项次
                        modal.find("#jfMp").val(jhObj.jfMp);//毛坯
                        modal.find("#prdNo").val(jhObj.prdNo);//型号
                        modal.find("#oldJtNo").val(jhObj.jtNo);//原机台编号
                        modal.find("#qtyJh").val(jhObj.qtyJh);//订单总数
                        modal.find("#oldJhQty").val(parseInt(jhObj.jhQty)-parseInt(jhObj.complete));//待加工数
                        modal.find("#rwNum").val(jhObj.complete);//已加工数
                        modal.find("#jtNo").val(jtNo).css("color", "red");//调整机台号
                        modal.find("#jhId").val(jhObj.jhId);//计划单ID
                        modal.find("#rwId").val(jhObj.rwId);//任务单ID
                        modal.find("#sxNo").val(jhObj.sxNo);//任务单顺序
                        modal.find("#newNum").val("");
                        $("#modal_alert").modal("hide")
                        modal.find("#modal_plan_form_submit").off("click").on("click", function () {
                            if ($("#newNum").val()>(parseInt(jhObj.jhQty)-parseInt(jhObj.complete))){
                                $("#ms").html("拆分数不得大于待加工数")
                            }else if(!/^[1-9]\d*$/.test($("#newNum").val())){
                                $("#ms").html("拆分数为大于0的正整数");
                            }else {
                            newObj.jhQty = parseInt($("#newNum").val());
                            oldObj.jhQty = parseInt(oldObj.jhQty) - $("#newNum").val();
                            tZPlan(newObj, oldObj, jhObj, sorttable, ui, number, $("#newNum").val(), jtNo, index);
                            $("#modal_plan").modal("hide");
                            }
                        })
                    }).modal("show");
                });

                //不拆分计划按钮触发事件
                $("#modal_alert_form_break").off("click").on("click", function () {
                    tZPlan(newObj, oldObj, jhObj, sorttable, ui, number, -1, jtNo, index);
                })
            }).modal("show")
        });
    }, "json");
}

function tZPlan(newObj, oldObj, jhObj, sorttable, ui, number, newNum, jtNo, index) {
    if (jhObj.complete > 0) {//有完工数
        console.log("有完工");
        if (newNum >= 0) {
            console.log("拆分")
            newObj.complete = 0;
            newObj.rwId = null;
        } else {
            console.log("不拆分")
            oldObj.complete = jhObj.complete;
            oldObj.jhQty = jhObj.complete;
            newObj.complete = 0;
            newObj.jhQty = jhObj.jhQty - jhObj.complete;
            newObj.rwId = null;
        }
    } else {
        console.log("没完工");
        if (newNum >= 0) {
            console.log("拆分")
            newObj.rwId = null;
        } else {
            oldObj = 0;
            console.log("不拆分")
        }
    }
    if (number > 0) {
        console.log("有订单");
        let x = JSON.parse(sorttable.target.children[index].lastChild.innerHTML);//原机台计划对象
        if(oldObj == 0){
            newObj.oldRw = newObj.rwId;
            console.log(newObj.rwId)
        }
        newObj.jhQty = newObj.jhQty + x.jhQty;
        newObj.complete = x.complete;
        newObj.jtNo = jtNo;
        newObj.rwId = x.rwId;
        sorttable.target.children[index].remove();

    } else {
        console.log("没订单");
        newObj.jtNo = jtNo;
    }

    if (newNum >= 0) {
        console.log("拆分了");
        addObj(oldObj, $("#" + jhObj.jtNo), "");
    } else if (oldObj != 0) {
        console.log("添加隐藏div");
        addObj(oldObj, jhObj.jtNo, "hidden");
    }
    addObj(newObj, ui.item.parent(), "");
    ui.item.remove()
}

function addObj(obj, jtNo, hidden) {
    console.log(obj);
    let str = "";
    $(obj).each(function (sss, obj) {
        str += '<li class="ui-state-default ' + hidden + '">' +
            '<p class="jhNo">编&emsp;&emsp;号:' + obj.jhNo + '</p>' +
            '<p class="jhItm">项&emsp;&emsp;次:' + obj.jhItm + '</p>' +
            '<p class="jhDd">日&emsp;&emsp;期:' + timestampTime(obj.jhDd,3) + '</p>' +
            '<p class="jfJt">原&ensp;机&ensp;台:' + obj.jfJt + '</p>' +
            '<p class="prdNo">产品型号:' + obj.prdNo + '</p>' +
            '<p class="jfMp">毛&ensp;胚&ensp;号:' + obj.jfMp + '</p>' +
            '<p class="qtyJh">总计划数:' + obj.qtyJh + '</p>' +
            '<p class="qtyJh">机床计划:' + obj.jhQty + '</p>' +
            '<p class="jhItm">已&ensp;加&ensp;工:' + obj.complete + '</p>' +
            '<p class="num">待&ensp;加&ensp;工:' + (obj.jhQty - obj.complete) + '</p>' +
            '<p name="object" class="hidden">' + JSON.stringify(obj) + '</p>' +
            '</li>'
    });
    if (hidden == "") {
        jtNo.append(str)
    } else {
        $("#" + jtNo).append(str)
    }
}

$("#save").button().on("click", function () {
    var arr = new Array();
    $(".connectedSortable").each(function (i, v) {
        arr[i] = new Array();
        $(v.childNodes).each(function (j, value) {
            var address = value.attributes.value.nodeValue.split("|");
            arr[i][j] = abc[address[0]][address[1]];
        })
    });
});

$("#reset").click(function () {
    setHtml();
    setTimeout(function () {
        setOption()
    },"200")
});

$("#modal_plan_form_add").click(function () {
    var str = '<form class="form-group form-inline" style="border-bottom: 1px solid #dddddd;height: 3.5em">\n' +
        '<label class="ui-dlist-tit" >机台选择</label>\n' + selectStr +
        '<label class="ui-dlist-tit">加工数量</label>\n' +
        '<input name="jhQty" type="text" class="form-control">\n' +
        '</form>';
    $(".modal-body .panel-body").append(str);
    $(".selectpicker").selectpicker();
});

$("#modal_plan").on("hidden.bs.modal", function () {
    $("#newNum").val("");
    $("#ms").text("");
});

function setDiv(jt, dom) {
    if ($("." + jt).hasClass("hidden")) {
        $("." + jt).removeClass("hidden")
    } else {
        $("." + jt).addClass("hidden")
    }
    if (dom.hasClass("ui-state-active")) {
        dom.removeClass("ui-state-active");
        dom.addClass("ui-state-default")
    } else {
        dom.removeClass("ui-state-default");
        dom.addClass("ui-state-active")
    }
    if (ulOn[dom.index()]){
        ulOn[dom.index()] = 0
    } else if (ulOn[dom.index()]){
        ulOn[dom.index()] = 1
    }
}

function serializeObject() {
    var data = $('.modal-body .panel-body form');
    var json = [];
    var obj = {};
    $(data).each(function (i, v) {
        obj = {};
        $($(v).serializeArray()).each(function (j, k) {
            obj[k.name] = k.value;
        });
        json.push(obj)
    });
    return json;
}

//***********************错误信息************************
function submit_fail(fn, msg) {
    fn.hide().html("<label class=\"label label-danger\">" + msg + "</label>").show(300, function () {
        setTimeout(function () {
            fn.hide();
        }, 1000);
    });
}

$("#merge").click(function () {
    let json = [];
    let ul = $(".sortable")
    $(ul).each(function (i,obj) {
        $(obj.children).each(function (j,li) {
            let o = JSON.parse(li.children[10].innerHTML);
            o.sxNo = j+1;
            json.push(o);
        })
    });
    $.ajax({
        url:"JjRw/updataSplit.do",
        data:JSON.stringify(json),
        contentType:"application/json",
        type:"post",
        dataType:"json",
        success: function(data){
            if (data){
                showMassage("保存成功");
                setHtml();
            }
        }
    });

    setTimeout(function () {
        setOption()
    },"1000")
});

function setOption() {
    for (i= 0;i<ulOn.length;i++){
        if (!ulOn[i]){
            let a = ulOn[i];
            $("#optionJt").children()[i].click();
            ulOn[i] = a
        }
    }
}