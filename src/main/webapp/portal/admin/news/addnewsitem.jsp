<%@ include file="../../include.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

<link href="${contextPath}/<spring:theme code="globalstyles"/>" media="screen" rel="stylesheet"  type="text/css" />
<link href="${contextPath}/<spring:theme code="stylesheet"/>" media="screen" rel="stylesheet" type="text/css" />
<link href="${contextPath}/<spring:theme code="teacherprojectstylesheet" />" media="screen" rel="stylesheet" type="text/css" />
<link href="${contextPath}/<spring:theme code="teacherhomepagestylesheet" />" media="screen" rel="stylesheet" type="text/css" />

<title><spring:message code="wiseAdmin" /></title>
</head>
<body>
<h3><spring:message code="admin.news.addNewsItem" /></h3>

	<form:form method="post" action="addnewsitems.html" id="addnewsitems" autocomplete='off'>
		<dl>
		<dt><label for="titleField"><spring:message code="title" /></label></dt>
		<dd><input name="title" size="75" id="titleField"></input> </dd>
		<dt><label for="newsField"><spring:message code="message" /></label></dt>
		<dd><textarea rows="20" cols="100" name="news" id="newsField"></textarea></dd>
		</dl>
   	    <input type="submit" id="save" value="<spring:message code="submit" />" />
	    <input type="hidden" id="action" name="action" value="add"></input>

	</form:form>
</body>
</html>