/**************日期时间转换插件***************/
function timestampTime(str, index) {
    if (str != null) {
        var date = new Date(str);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + " ";
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        if (index == 6) {
            return Y + M + D + h + m + s;
        } else if (index == 3) {
            return Y + M + D;
        }
    } else {
        return null
    }
}
/******************提示信息弹窗******************/
function showMassage(text) {
    $("#successMessage > strong").html(text);
    $("#successMessage").removeClass("hidden");
    setTimeout(function () {
        $("#successMessage").addClass("hidden");
    }, "3000")
};
/*****************左侧导航初始化*****************/
$(function() {
    $('#side-menu').metisMenu(); // ul.nav#side-menu
})