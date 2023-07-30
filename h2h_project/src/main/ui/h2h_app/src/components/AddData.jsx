import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { deepOrange,red } from '@material-ui/core/colors';
import axios from "axios";

const ColorButton1 = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
}))(Button);
const ColorButton2 = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const AddData = () => {
  const [cust_order_id, setCust_order_id] = useState("");
  const [sales_org, setSales_org] = useState("");
  const [dist_ch, setDist_ch] = useState("");
  const [com_code, setCom_code] = useState("");
  const [order_creation, setOrder_creation] = useState("");
  const [order_curr, setOrder_curr] = useState("");
  const [cust_no, setCust_no] = useState("");
  const [amt_in_usd, setAmt_in_usd] = useState("");

  const handleAddData = () => {
    // Send data to the server
    axios.post('http://localhost:8080/h2h_project/AddServlet', {
      cust_order_id: parseInt(cust_order_id),
      sales_org: parseInt(sales_org),
      dist_ch: dist_ch,
      com_code: parseInt(com_code),
      order_creation: order_creation,
      order_curr: order_curr,
      cust_no: parseInt(cust_no),
      amt_in_usd: parseFloat(amt_in_usd)
    })
      .then(response => {
        console.log('Data added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding data:', error);
        // Handle error
      });
  };

  const handleClearData = () => {
    // Clear the input fields
    setCust_order_id("");
    setSales_org("");
    setDist_ch("");
    setCom_code("");
    setOrder_creation("");
    setOrder_curr("");
    setCust_no("");
    setAmt_in_usd("");
  };

  return (
    <div>
      <TextField
        label="CUSTOMER ORDER ID"
        value={cust_order_id}
        onChange={(event) => setCust_order_id(event.target.value)}
        style={{ backgroundColor: "white", margin: "10px 5px 5px 10px", width: "24%" }}
      />
      <TextField
        label="SALES ORG"
        value={sales_org}
        onChange={(event) => setSales_org(event.target.value)}
        style={{ backgroundColor: "white", margin: "10px 5px 5px 10px", width: "24%" }}
      />
      <TextField
        label="DISTRIBUTION CHANNEL"
        value={dist_ch}
        onChange={(event) => setSales_org(event.target.value)}
        style={{ backgroundColor: "white", margin: "10px 5px 5px 10px", width: "49%" }}
      />
      <TextField
        label="CUSTOMER NUMBER"
        value={cust_no}
        onChange={(event) => setSales_org(event.target.value)}
        style={{ backgroundColor: "white", margin: "10px 5px 5px 10px", width: "24%" }}
      />
      <TextField
        label="COMPANY CODE"
        value={com_code}
        onChange={(event) => setSales_org(event.target.value)}
        style={{ backgroundColor: "white", margin: "10px 5px 5px 10px", width: "24%" }}
      />
      <TextField
        label="ORDER CURRENCY"
        value={order_curr}
        onChange={(event) => setSales_org(event.target.value)}
        style={{ backgroundColor: "white", margin: "10px 5px 5px 10px", width: "16%" }}
      />
      <TextField
        label="AMOUNT IN USD"
        value={amt_in_usd}
        onChange={(event) => setSales_org(event.target.value)}
        style={{ backgroundColor: "white", margin: "10px 5px 5px 10px", width: "16%" }}
      />
      <TextField
        label="ORDER CREATION DATE"
        value={order_creation}
        onChange={(event) => setSales_org(event.target.value)}
        style={{ backgroundColor: "white", margin: "10px 5px 5px 10px", width: "15%" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }} className={useStyles().buttonContainer}>
        <ColorButton1
          variant="contained"
          onClick={handleAddData}
          style={{ width: "49%" }}
          className={useStyles().margin}
        >ADD</ColorButton1>
        <ColorButton2
          variant="contained"
          onClick={handleClearData}
          style={{ width: "49%" }}
          className={useStyles().margin}
        >CLEAR DATA</ColorButton2>
      </div>
    </div>
  );
};

export default AddData;
