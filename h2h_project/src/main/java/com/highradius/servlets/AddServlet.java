package com.highradius.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.highradius.implementation.InvoiceDao;
import com.highradius.implementation.InvoiceDaoImpl;
import com.highradius.model.Invoice;

// Servlet implementation class AddServlet

@WebServlet("/AddServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	InvoiceDao objInvoiceDao = new InvoiceDaoImpl();
	List<Invoice> list_of_invoices = new ArrayList<Invoice>();
	Invoice newInvoice = new Invoice();

	public AddServlet() {
		super();
	}

	public String getServletInfo(HttpServletRequest request) {
		System.out.println(request.getPathInfo());
		System.out.println(request.getServletPath());
		System.out.println(request.getRequestURL());
		return null;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.addHeader("Access-Control-Allow-Methods", "POST");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type");

        String contentType = request.getHeader("Content-Type");
        if (contentType != null && contentType.equals("application/json")) {
            Gson gson = new Gson();
            Invoice ninvoice = gson.fromJson(request.getReader(), Invoice.class);

                try {
                    Integer cust_order_id = ninvoice.getCust_order_id();
                    Integer sales_org = ninvoice.getSales_org();
                    String dist_ch = ninvoice.getDist_ch();
                    Integer com_code = ninvoice.getCom_code();
                    String order_creation = ninvoice.getOrder_creation();
                    String order_curr = ninvoice.getOrder_curr();
                    Integer cust_no = ninvoice.getCust_no();
                    Double amt_in_usd = ninvoice.getAmt_in_usd();

                    newInvoice.setCust_order_id(cust_order_id);
                    newInvoice.setSales_org(sales_org);
                    newInvoice.setDist_ch(dist_ch);
                    newInvoice.setCom_code(com_code);
    				newInvoice.setOrder_creation(order_creation);
    				newInvoice.setOrder_curr(order_curr);
    				newInvoice.setCust_no(cust_no);
    				newInvoice.setAmt_in_usd(amt_in_usd);
                    list_of_invoices.add(newInvoice);
                    objInvoiceDao.insertInvoice(newInvoice);

                    response.setContentType("application/json");
                    response.getWriter().write(gson.toJson(newInvoice));
                } catch (NumberFormatException e) {
                    response.getWriter().append("Invalid ID or Invoice format");
                } 
        } else {
            response.getWriter().append("Invalid request format");
        }
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		getServletInfo(request);
		response.getWriter().append("GET method is not supported in this servlet.");
		response.getWriter().append("\nServed at: ").append(request.getContextPath());
	}
}