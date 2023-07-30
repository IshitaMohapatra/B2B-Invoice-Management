import React, { useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
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

const Delete = ({ invoice, selectedRows }) => {
    const [deleteDialogOpen, setdeleteDialogOpen] = useState(false); // state for edit dialog
    const [selectedRowData, setSelectedRowData] = useState({ id: "", invoice: "" }); // state for storing selected row data
    const classes = useStyles();
    // DELETE BUTTON
  const handleDeleteClick = () => {
    const selectedRow = invoice.find(item => item.id === selectedRows[0]);
    setSelectedRowData(selectedRow);
    setdeleteDialogOpen(true);
  };

  const handleDelete = () => {  
    const { id } = selectedRowData;
    const params = new URLSearchParams();
    params.append('id', id);
  
    axios.post("http://localhost:8080/h2h_project/DeleteServlet", params)
      .then(res => {
        // Handle the response as needed
        console.log("Edit request successful:", res.data);
        setdeleteDialogOpen(false);
      })
      .catch(error => {
        // Handle the error as needed
        console.error("Edit request failed:", error);
      });
  };

  const handleClose = () => {
    setdeleteDialogOpen(false);
  };

  return (
    <div>
      <ColorButton
        variant="contained"
        className={classes.margin}
        disabled={selectedRows.length === 0}
        onClick={handleDeleteClick}
      >
        Delete
      </ColorButton>

      <Dialog open={deleteDialogOpen} onClose={handleClose}>
        <DialogTitle>Delete Records?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete these record[s]?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Delete;