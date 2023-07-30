package com.highradius.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.highradius.implementation.InvoiceDao;
import com.highradius.implementation.InvoiceDaoImpl;

@WebServlet("/DistributionChannelsServlet")
public class DistributionChannelsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private InvoiceDao objInvoiceDao = new InvoiceDaoImpl();

    public DistributionChannelsServlet() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.addHeader("Access-Control-Allow-Methods", "GET");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");

        String searchQuery = request.getParameter("customerNumber");

        if (searchQuery != null && !searchQuery.isEmpty()) {
            List<String> searchResults = objInvoiceDao.distChInvoice(searchQuery);

            Gson gson = new Gson();
            String jsonResponse = gson.toJson(searchResults);

            out.append(jsonResponse);
        } else {
            // if no search query provided, return an empty response
            out.append("[]");
        }
    }
}
