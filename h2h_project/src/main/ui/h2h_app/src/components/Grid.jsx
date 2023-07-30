import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Checkbox,
  Button
} from "@material-ui/core";
import { deepOrange } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './DataGrid.css';
import Edit from './Edit';
import Delete from "./Delete";
import PredictButton from './PredictButton';

const rowsPerPageOptions = [5, 10, 20, 50, 100];
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}));
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
}))(Button);

export default function Grid() {
  const [invoice, setInvoice] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]); //to keep track of selected rows
  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const displayedInvoices = invoice.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    getData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const getData = (page, rowsPerPage) => {
    const limit = 100;
    const offset = 0;

    axios.get(`http://localhost:8080/h2h_project/DataLoadingServlet?limit=${limit}&offset=${offset}`)
      .then(res => {
        const fetchedInvoice = res.data;
        setInvoice(fetchedInvoice);
      })
      .catch(error => {
        // Handle the error as needed
        console.error("Failed to fetch data:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //CHECKBOX
  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Add the selected row to the array
      setSelectedRows([...selectedRows, id]);
    } else {
      // Remove the deselected row from the array
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }

    const updatedInvoice = invoice.map(item =>
      item.id === id ? { ...item, checked: event.target.checked } : item
    );
    setInvoice(updatedInvoice);
  };

  //MASTERCHECKBOX
  const handleMasterCheckboxChange = (event) => {
    const checked = event.target.checked;
    const updatedInvoice = invoice.map(item => ({
      ...item,
      checked
    }));
    setInvoice(updatedInvoice);
    setSelectAll(checked);

    if (!checked) { //clear the selected rows when the master checkbox is unchecked
      setSelectedRows([]);
    }
  };

  const handleRefresh = () => {
    getData(page, rowsPerPage);
  };

  const classes = useStyles();

  return (
    <div className="DataGrid">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={handleMasterCheckboxChange}
                />
              </TableCell>
              <TableCell>Sl No</TableCell>
              <TableCell>Customer Order ID</TableCell>
              <TableCell>Sales Org</TableCell>
              <TableCell>Distribution Channel</TableCell>
              <TableCell>Company Code</TableCell>
              <TableCell>Order Creation Date</TableCell>
              <TableCell>Order Currency</TableCell>
              <TableCell>Customer Number</TableCell>
              <TableCell>Amount in USD</TableCell>
              <TableCell>Order Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedInvoices.map(Invoice => (
              <TableRow key={Invoice.id}>
                <TableCell>
                  <Checkbox
                    checked={Invoice.checked || false}
                    onChange={event => handleCheckboxChange(event, Invoice.id)}
                  />
                </TableCell>
                <TableCell>{Invoice.id}</TableCell>
                <TableCell>{Invoice.cust_order_id}</TableCell>
                <TableCell>{Invoice.sales_org}</TableCell>
                <TableCell>{Invoice.dist_ch}</TableCell>
                <TableCell>{Invoice.com_code}</TableCell>
                <TableCell>{Invoice.order_creation}</TableCell>
                <TableCell>{Invoice.order_curr}</TableCell>
                <TableCell>{Invoice.cust_no}</TableCell>
                <TableCell>{Invoice.amt_in_usd}</TableCell>
                <TableCell>{Invoice.order_amt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={invoice.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div className={classes.buttonContainer}>
        <ColorButton variant="contained" className={classes.margin} onClick={handleRefresh}>
          REFRESH DATA
        </ColorButton>
        <Edit invoice={invoice} setInvoice={setInvoice} selectedRows={selectedRows} />
        <Delete invoice={invoice} selectedRows={selectedRows} />
        <PredictButton />
      </div>
    </div>
  );
}
