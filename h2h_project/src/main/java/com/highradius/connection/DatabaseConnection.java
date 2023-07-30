package com.highradius.connection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.highradius.model.Invoice;

public class DatabaseConnection {
	public List<Invoice> list_of_invoices = new ArrayList<Invoice>(); // create an empty list of invoices
	
    // method getInvoices to return list of invoices
    public List<Invoice> getInvoices(int limit, int offset) {
    	Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
    	try {
    		Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/H2H_SQL", "root", "ruhi2002");
			//here H2H_SQL is database name, root is user name and password
			ps = con.prepareStatement("SELECT Sl_no,CUSTOMER_ORDER_ID,SALES_ORG,DISTRIBUTION_CHANNEL,COMPANY_CODE,ORDER_CREATION_DATE,ORDER_CURRENCY,CUSTOMER_NUMBER,AMOUNT_IN_USD,ORDER_AMOUNT FROM h2h_oap LIMIT ?, ?");
			ps.setInt(1, offset);
			ps.setInt(2, limit);
            rs = ps.executeQuery();
			while (rs.next()) {
				Invoice objInvoice = new Invoice();
				objInvoice.setId(rs.getInt("Sl_no"));
				objInvoice.setCust_order_id(rs.getInt("CUSTOMER_ORDER_ID"));
				objInvoice.setSales_org(rs.getInt("SALES_ORG"));
				objInvoice.setDist_ch(rs.getString("DISTRIBUTION_CHANNEL"));
				objInvoice.setCom_code(rs.getInt("COMPANY_CODE"));
				objInvoice.setOrder_creation(rs.getString("ORDER_CREATION_DATE"));
				objInvoice.setOrder_curr(rs.getString("ORDER_CURRENCY"));
				objInvoice.setCust_no(rs.getInt("CUSTOMER_NUMBER"));
				objInvoice.setAmt_in_usd(rs.getDouble("AMOUNT_IN_USD"));
				objInvoice.setOrder_amt(rs.getDouble("ORDER_AMOUNT"));
				list_of_invoices.add(objInvoice);
			}
			con.close();
		} catch (Exception e) {
			System.out.println(e);
		} finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (ps != null) {
                try {
                    ps.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return this.list_of_invoices;
    }
    
    // method addInvoice to Add Invoice to the list
    public void addInvoice(Invoice newInvoice) {
    	try {
    		Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/H2H_SQL", "root", "ruhi2002");
			PreparedStatement ps = con.prepareStatement("INSERT INTO h2h_oap (CUSTOMER_ORDER_ID,SALES_ORG,DISTRIBUTION_CHANNEL,COMPANY_CODE,ORDER_CREATION_DATE,ORDER_CURRENCY,CUSTOMER_NUMBER,AMOUNT_IN_USD) VALUES (?,?,?,?,?,?,?,?,?)");
			ps.setInt(1, newInvoice.getCust_order_id());
			ps.setInt(2, newInvoice.getSales_org());
			ps.setString(3, newInvoice.getDist_ch());
			ps.setInt(4, newInvoice.getCom_code());
			ps.setString(5, newInvoice.getOrder_creation());
			ps.setString(6, newInvoice.getOrder_curr());
			ps.setInt(7, newInvoice.getCust_no());
			ps.setDouble(8, newInvoice.getAmt_in_usd());
			ps.executeUpdate();
			con.close();
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
    	this.list_of_invoices.add(newInvoice);
    }
}