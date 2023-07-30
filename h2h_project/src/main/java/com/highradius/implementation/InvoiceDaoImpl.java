package com.highradius.implementation;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import com.highradius.connection.DatabaseConnection;
import com.highradius.model.Invoice;

public class InvoiceDaoImpl implements InvoiceDao {
	DatabaseConnection objConnection =  new DatabaseConnection();
	
    // Method insertInvoice should call DatabaseConnection addInvoice method
	public void insertInvoice(Invoice newInvoice) {
		objConnection.addInvoice(newInvoice);
		System.out.println("New Invoice added");
	}
	
	// Method getInvoice should call DatabaseConnection getInvoices method
    public List<Invoice> getInvoice(int limit, int offset) {
    	List<Invoice> res = objConnection.getInvoices(limit, offset);
        return res;
    }
    
    public List<Invoice> searchInvoice(String cust_order_id) {
        List<Invoice> searchResults = new ArrayList<>();
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/H2H_SQL", "root", "ruhi2002");
            ps = con.prepareStatement("SELECT * FROM h2h_oap WHERE CUSTOMER_ORDER_ID = ?");
            ps.setString(1, cust_order_id);
            rs = ps.executeQuery();

            while (rs.next()) {
                Invoice invoice = new Invoice();
                invoice.setId(rs.getInt("Sl_no"));
				invoice.setCust_order_id(rs.getInt("CUSTOMER_ORDER_ID"));
				invoice.setSales_org(rs.getInt("SALES_ORG"));
				invoice.setDist_ch(rs.getString("DISTRIBUTION_CHANNEL"));
				invoice.setCom_code(rs.getInt("COMPANY_CODE"));
				invoice.setOrder_creation(rs.getString("ORDER_CREATION_DATE"));
				invoice.setOrder_curr(rs.getString("ORDER_CURRENCY"));
				invoice.setCust_no(rs.getInt("CUSTOMER_NUMBER"));
				invoice.setAmt_in_usd(rs.getDouble("AMOUNT_IN_USD"));
				invoice.setOrder_amt(rs.getDouble("ORDER_AMOUNT"));
                searchResults.add(invoice);
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
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

        return searchResults;
    }
    
    public void updateInvoice(Invoice newInvoice) {
    	Connection con;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/H2H_SQL", "root", "ruhi2002");
			PreparedStatement ps = con.prepareStatement("UPDATE h2h_oap SET ORDER_CURRENCY = ?,COMPANY_CODE = ?,DISTRIBUTION_CHANNEL = ? WHERE Sl_no = ?");
			ps.setString(1, newInvoice.getOrder_curr());
			ps.setInt(2, newInvoice.getCom_code());
			ps.setString(3, newInvoice.getDist_ch());
			ps.setInt(4, newInvoice.getId());
			int i = ps.executeUpdate();
	        if(i!=0)
	        {
	            System.out.println("Updating row");
	        }
	        else if(i==0)
	        {
	            System.out.print("Updated");
	        }
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
    }
    
    public void deleteInvoice(Invoice newInvoice) {
    	Connection con;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/H2H_SQL", "root", "ruhi2002");
			PreparedStatement ps = con.prepareStatement("DELETE FROM h2h_oap_test WHERE Sl_no = ?");
			ps.setInt(1, newInvoice.getId());
			int i = ps.executeUpdate();
	        if(i!=0)
	        {
	            System.out.println("Deleting rows");
	        }
	        else if(i==0)
	        {
	            System.out.print("Deleted");
	        }
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
    }
    
    public List<String> distChInvoice(String cust_no) {
        List<String> searchResults = new ArrayList<>();
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/H2H_SQL", "root", "ruhi2002");
            ps = con.prepareStatement("SELECT DISTRIBUTION_CHANNEL FROM h2h_oap WHERE CUSTOMER_NUMBER = ?");
            ps.setString(1, cust_no);
            rs = ps.executeQuery();

            while (rs.next()) {
                searchResults.add(rs.getString("DISTRIBUTION_CHANNEL"));
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
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
        return searchResults;
    }
}