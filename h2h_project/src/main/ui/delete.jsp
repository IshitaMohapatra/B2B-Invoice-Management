<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>DeleteServlet</title>
</head>
<body>
	<form method="post" action="DeleteServlet">
		<h1>Delete Invoice</h1>
		<div>
			<label for="id">Invoice ID:</label>
			<input type="text" id="id" name="id">
		</div>
		<button type="submit" id="submit-btn">Delete</button>
	</form>
</body>
</html>