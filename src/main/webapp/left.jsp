<%--
  Created by IntelliJ IDEA.
  User: zhongchu
  Date: 2019-06-14
  Time: 13:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% if (request.getParameter("name").equals("jj")) {%>
<ul class="nav" id="side-menu">
    <li class="<% if (request.getParameter("group").equals("1")) {%> mm-active <%} %>">
        <a class="<% if (request.getParameter("group").equals("1")) {%> active <%} %>" href="#" aria-expanded="true"><i class="fa fa-bar-chart-o fa-fw"></i> 物料管理<span
                class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
            <li>
                <a class="<% if (request.getParameter("index").equals("1")) {%> active <%} %>" href="planQuery.jsp"><i class="fa fa-list-alt fa-fw"></i><span> 物料交接</span></a>
            </li>
            <li>
                <a class="<% if (request.getParameter("index").equals("2")) {%> active <%} %>" href="planAdjustment.jsp"><i class="fa fa-cogs fa-fw"></i><span> 物料流转</span></a>
            </li>
            <li>
                <a class="<% if (request.getParameter("index").equals("5")) {%> active <%} %>" href="sk.jsp"><i class="fa fa-cc fa-fw"></i><span> 刷卡记录</span></a>
            </li>
            <li>
                <a class="<% if (request.getParameter("index").equals("3")) {%> active <%} %>" href="cnc.jsp"><i class="fa fa-cc fa-fw"></i><span> 机台程序</span></a>
            </li>
            <li>
                <a class="<% if (request.getParameter("index").equals("4")) {%> active <%} %>" href=""><i class="fa fa-bar-chart-o fa-fw"></i><span> 机台信息</span></a>
            </li>
        </ul>
    </li>
</ul>
<%} %>

<% if (request.getParameter("name").equals("jc")) {%>
<ul class="nav" id="side-menu">
    <li class="<% if (request.getParameter("group").equals("1")) {%> mm-active <%} %>">
        <a class="<% if (request.getParameter("group").equals("1")) {%> active <%} %>" href="#" aria-expanded="true"><i class="fa fa-database fa-fw"></i> 系统信息管理<span
                class="fa arrow"></span></a>
        <ul class="nav nav-second-level">
            <li>
                <a class="<% if (request.getParameter("index").equals("1")) {%> active <%} %>" href="staffTable.jsp"><i class="fa fa-address-card"></i><span> 员工信息</span></a>
            </li>
        </ul>
    </li>
</ul>
<%} %>