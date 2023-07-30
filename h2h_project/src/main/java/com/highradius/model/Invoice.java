package com.highradius.model;

public class Invoice {
	public int id;
	public int cust_order_id;
	public int sales_org;
	public String dist_ch;
	public int com_code;
	public String order_creation;
	public String order_curr;
	public int cust_no;
	public double amt_in_usd;
	public double order_amt;

	// constructor
	public Invoice() {
		super();
	}
	// getter
	public int getId() {
		return id;
	}
	// setter
	public void setId(int id) {
		this.id = id;
	}
	public int getCust_order_id() {
		return cust_order_id;
	}
	public void setCust_order_id(int cust_order_id) {
		this.cust_order_id = cust_order_id;
	}
	public int getSales_org() {
		return sales_org;
	}
	public void setSales_org(int sales_org) {
		this.sales_org = sales_org;
	}
	public String getDist_ch() {
		return dist_ch;
	}
	public void setDist_ch(String dist_ch) {
		this.dist_ch = dist_ch;
	}
	public int getCom_code() {
		return com_code;
	}
	public void setCom_code(int com_code) {
		this.com_code = com_code;
	}
	public String getOrder_creation() {
		return order_creation;
	}
	public void setOrder_creation(String order_creation) {
		this.order_creation = order_creation;
	}
	public String getOrder_curr() {
		return order_curr;
	}
	public void setOrder_curr(String order_curr) {
		this.order_curr = order_curr;
	}
	public int getCust_no() {
		return cust_no;
	}
	public void setCust_no(int cust_no) {
		this.cust_no = cust_no;
	}
	public double getAmt_in_usd() {
		return amt_in_usd;
	}
	public void setAmt_in_usd(double amt_in_usd) {
		this.amt_in_usd = amt_in_usd;
	}
	public double getOrder_amt() {
		return order_amt;
	}
	public void setOrder_amt(double order_amt) {
		this.order_amt = order_amt;
	}
}