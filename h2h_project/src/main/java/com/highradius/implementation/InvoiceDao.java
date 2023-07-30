package com.highradius.implementation;

import java.util.List;

import com.highradius.model.Invoice;

public interface InvoiceDao {
	// Method getInvoice return list of invoices
    public List<Invoice> getInvoice(int limit, int offset);
    // Method insertInvoice takes  invoice object
    public void insertInvoice(Invoice newInvoice);
    // Method updateInvoice takes id, and invoice object to update
    public void updateInvoice(Invoice newInvoice);
    // Method deleteInvoice takes id to be deleted for invoice
    public void deleteInvoice(Invoice newInvoice);
	public List<Invoice> searchInvoice(String cust_order_id);
	public List<String> distChInvoice(String cust_no);
	
}