<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>EditServlet</title>
</head>
<body>
	<form method="post" action="EditServlet">
		<h1>Edit Invoice</h1>
		<div>
			<label for="id">Invoice ID:</label>
			<input type="text" id="id" name="id"> <br>
			<label for="invoice">New Invoice:</label>
			<input type="text" id="invoice" name="invoice">
		</div>
		<button type="submit" id="submit-btn">Edit</button>
	</form>
</body>
</html>