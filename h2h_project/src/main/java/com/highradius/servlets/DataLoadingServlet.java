package com.highradius.servlets;

import java.util.*;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.highradius.implementation.*;
import com.highradius.model.*;

// Servlet implementation class DataLoadingServlet

@WebServlet("/DataLoadingServlet")
public class DataLoadingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    InvoiceDao objInvoiceDao = new InvoiceDaoImpl();
    
    public DataLoadingServlet() {
        super();
    }
    
	public String getServletInfo(HttpServletRequest request) {
		System.out.println(request.getPathInfo());
		System.out.println(request.getServletPath());
		System.out.println(request.getRequestURL());
		return null;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		doGet(request, response);
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		//out.append("Served at: ").append(request.getContextPath()+"\n");
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.addHeader("Access-Control-Allow-Methods", "GET");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	    response.setHeader("Pragma", "no-cache");
	    response.setHeader("Expires", "0");
		
		// Read the limit and offset values from query parameters
	    int limit = Integer.parseInt(request.getParameter("limit"));
        int offset = Integer.parseInt(request.getParameter("offset"));
	    List<Invoice> list_of_invoices = objInvoiceDao.getInvoice(limit, offset);
	    
		String jsonResponse = new String();
		Gson gson = new Gson();
		jsonResponse = gson.toJson(list_of_invoices);
		out.append(jsonResponse);
	}
}