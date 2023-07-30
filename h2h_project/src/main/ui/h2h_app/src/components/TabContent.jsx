import React, { useState } from "react";
import axios from "axios";
import {
  Tabs as MuiTabs, Tab, Box, InputBase, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import './DataGrid.css';
import Grid from './Grid';
import AddData from "./AddData";
import AnalyticalView from "./AnalyticViewTab";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#8fd163",
    '&:hover': {
      backgroundColor: "#8fd163",
    },
  },
}))(Button);

const TabContent = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    clearSearchResults();
  };

  const handleSearchTextChange = (event) => {
      setSearchText(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      axios.get(`http://localhost:8080/h2h_project/SearchServlet?cust_order_id=${searchText}`)
      .then(res => {
        const fetchedInvoice = res.data;
        setSearchResults(fetchedInvoice);
        setShowSearchResults(true);
        setSelectedTab(2); // Update the selectedTab to "Search Result" tab
      })
      .catch(error => {
        console.error("Failed to fetch data:", error);
      });
    }
  };

  const clearSearchResults = () => {
    setSearchText("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <InputBase
          placeholder="Search Customer Order ID"
          style={{ backgroundColor: "white", margin: "10px 5px 5px 10px" }}
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyPress={handleSearch}
        />
        {showSearchResults ? (
          <Button variant="contained" onClick={clearSearchResults}>
            Clear
          </Button>
        ) : (
          <ColorButton variant="contained">
            Advanced Search
          </ColorButton>
        )}
      </Box>
      <MuiTabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Homepage" />
        <Tab label="Add Data" />
        {showSearchResults && <Tab label="Search Result" />}
        <Tab label="Analytical View" />
      </MuiTabs>
      <Box p={3}>
        {selectedTab === 0 && <HomepageTab />}
        {selectedTab === 1 && <AddDataTab />}
        {selectedTab === 2 && showSearchResults && <SearchResultsTab results={searchResults} />}
        {selectedTab === 2 && !showSearchResults && <AnalyticalViewTab />}
        {selectedTab === 3 && !showSearchResults && <AnalyticalViewTab />}
      </Box>
    </Box>
  );
};

const HomepageTab = () => {
  // Implement the content for the Homepage tab (table and buttons) here
  return <div><Grid /></div>;
};

const AddDataTab = () => {
  return <div><AddData /></div>;
};

const SearchResultsTab = ({ results }) => {
  // Implement the search results component here
  return (
    <div className="DataGrid">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
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
            {results.map(Invoice => (
              <TableRow key={Invoice.cust_order_id}>
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
    </div>
  );
};

const AnalyticalViewTab = () => {
  return <div><AnalyticalView /></div>;
};

export default TabContent;