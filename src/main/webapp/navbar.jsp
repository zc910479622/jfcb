<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8" %>
<div id="navbar" class="navbar navbar-default navbar-collapse collapse">
    <div class="container-fluid">
        <div class="navbar-header">
            <img src="img/jinfei_32X32.ico" style="float: left;padding-top: 0.6em;padding-right: 1em;"/>
            <span class="navbar-brand" style="font-size: 1.8em;font-family: '楷体';">生产现场采集控制平台</span>
        </div>
        <ul class="nav navbar-nav">
            <li <% if (request.getParameter("aItem").equals("1")) {%> class="active" <%} %>><a href="home.jsp"><span
                    class="glyphicon glyphicon-th-large"></span> 首页</a></li>
            <li class=" <% if (request.getParameter("aItem").equals("2")) {%> active <%} %>"><a
                    href="planQuery.jsp"><span class="glyphicon glyphicon-object-align-left"></span> 机加工</a></li>
            <li class=" <% if (request.getParameter("aItem").equals("3")) {%> active <%} %>"><a
                    href="staffTable.jsp"><span class="glyphicon glyphicon-object-align-left"></span> 基础信息</a></li>
        </ul>
    </div>
</div>
