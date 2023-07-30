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

/**
 * Servlet implementation class EditServlet
 */
@WebServlet("/EditServlet")
public class EditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	InvoiceDao objInvoiceDao = new InvoiceDaoImpl();
	Invoice newInvoice = new Invoice();
	
    public EditServlet() {
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
		String order_curr = request.getParameter("order_curr");
		Integer com_code = Integer.parseInt(request.getParameter("com_code"));
		String dist_ch = request.getParameter("dist_ch");
		newInvoice.setId(id);
		newInvoice.setOrder_curr(order_curr);
		newInvoice.setCom_code(com_code);
		newInvoice.setDist_ch(dist_ch);
		PrintWriter out = response.getWriter();
		objInvoiceDao.updateInvoice(newInvoice);
		out.print("Updated");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		doGet(request, response);
	}
}