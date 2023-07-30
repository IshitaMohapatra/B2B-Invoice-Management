package com.highradius.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.implementation.InvoiceDao;
import com.highradius.implementation.InvoiceDaoImpl;
import com.highradius.model.Invoice;

// Servlet implementation class DeleteServlet

@WebServlet("/DeleteServlet")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	InvoiceDao objInvoiceDao = new InvoiceDaoImpl();
	Invoice newInvoice = new Invoice();
	
    public DeleteServlet() {
        super();
    }
	
	public String getServletInfo(HttpServletRequest request) {
		System.out.println(request.getPathInfo());
		System.out.println(request.getServletPath());
		System.out.println(request.getRequestURL());
		return null; 
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		getServletInfo(request);
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.addHeader("Access-Control-Allow-Methods", "GET");
		
		Integer id = Integer.parseInt(request.getParameter("id"));
		PrintWriter out = response.getWriter();
		newInvoice.setId(id);
		objInvoiceDao.deleteInvoice(newInvoice);
		out.print("Deleted");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		doGet(request, response);
	}
}