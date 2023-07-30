import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Edit = ( {invoice, setInvoice, selectedRows} ) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false); // state for edit dialog
  const [selectedRowData, setSelectedRowData] = useState({ id: "", order_curr: "", com_code: "", dist_ch: "" }); // state for storing selected row data
  const classes = useStyles();
  // EDIT BUTTON
  const handleEditClick = () => {
    const selectedRow = invoice.find(item => item.id === selectedRows[0]);
    setSelectedRowData(selectedRow);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogSave = () => {
    const { id, order_curr, com_code, dist_ch } = selectedRowData;
    const params = new URLSearchParams();
    params.append('id', id);
    params.append('order_curr', order_curr);
    params.append('com_code', com_code);
    params.append('dist_ch', dist_ch);
  
    axios.post("http://localhost:8080/h2h_project/EditServlet", params)
      .then(res => {
        // Handle the response as needed
        console.log("Edit request successful:", res.data);
        setEditDialogOpen(false);
      })
      .catch(error => {
        // Handle the error as needed
        console.error("Edit request failed:", error);
      });
  };  

  return (
    <div>
      <ColorButton
        variant="contained"
        className={classes.margin}
        disabled={selectedRows.length !== 1} // Disable when no row selected or multiple rows selected
        onClick={handleEditClick}
      >
        EDIT
      </ColorButton>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          <TextField
            label="ID"
            value={selectedRowData.id}
            disabled
          />
          <TextField
            label="ORDER CURRENCY"
            value={selectedRowData.order_curr}
            onChange={event => setSelectedRowData(prevState => ({ ...prevState, order_curr: event.target.value }))}
          />
          <TextField
            label="COMPANY CODE"
            value={selectedRowData.com_code}
            onChange={event => setSelectedRowData(prevState => ({ ...prevState, com_code: event.target.value }))}
          />
          <TextField
            label="DISTRIBUTION CHANNEL"
            value={selectedRowData.dist_ch}
            onChange={event => setSelectedRowData(prevState => ({ ...prevState, dist_ch: event.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditDialogSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Edit;