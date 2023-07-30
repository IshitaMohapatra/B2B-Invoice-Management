import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    border: "1px solid white",
  },
  margin: {
    margin: theme.spacing(1),
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  formContainer: {
    border: "1px solid white",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  graphContainer: {
    gridColumn: "2"
  },
  chartContainer: {
    gridColumn: "3",
  },
}));

const AnalyticalViewTab = () => {
  const [distributionChannels, setDistributionChannels] = useState([]);

  const fetchDistributionChannels = (customerNumber) => {
    axios.get(`http://localhost:8080/h2h_project/DistributionChannelsServlet?customerNumber=${customerNumber}`)
      .then(res => {
        const fetchedDistributionChannels = res.data;
        setDistributionChannels(fetchedDistributionChannels);
      })
      .catch(error => {
        console.error("Failed to fetch distribution channels:", error);
      });
  };

  const classes = useStyles();
  const handleViewClick = () => {
    const distributionChannel = document.getElementById("distribution-channel").value;
    const customerNumber = document.getElementById("customer-number").value;

    if (customerNumber) {
      fetchDistributionChannels(customerNumber);
    } else {
      console.log("Please enter a customer number.");
    }
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
      backgroundColor: "#777777",
    },
    title: {
      text: "Open and Closed Invoices",
      style: { color: "#ffffff" },
    },
    series: [{
      name: "Categories",
      colorByPoint: true,
      data: [{
        name: "Open",
        y: 100,
      }, {
        name: "Closed",
        y: 0,
      }],
    }],
  };

  const graphChartOptions = {
    chart: {
      type: "bar",
      backgroundColor: "#777777",
    },
    title: {
      text: "Total Amount per Distribution Channel",
      style: { color: "#ffffff" },
    },
    xAxis: {
      categories: distributionChannels.map(channel => channel.name),
    },
    series: [{
      name: "Count",
      data: distributionChannels.map(channel => channel.count),
    }],
  };

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <TextField
            id="distribution-channel"
            label="DISTRIBUTION CHANNEL"
            style={{ backgroundColor: "white", margin: "10px", width: "100%" }}
          />
          <TextField
            id="customer-number"
            label="CUSTOMER NUMBER"
            style={{ backgroundColor: "white", margin: "10px", width: "100%" }}
          />
          <Button
            variant="outlined"
            className={`${classes.button} ${classes.margin}`}
            onClick={handleViewClick}
            style={{ width: "100%" }}
          >
            VIEW
          </Button>
        </div>
        <div className={classes.graphContainer}>
          <HighchartsReact highcharts={Highcharts} options={graphChartOptions} />
        </div>
        <div className={classes.chartContainer}>
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticalViewTab;
