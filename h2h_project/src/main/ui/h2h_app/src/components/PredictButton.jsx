import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

export default function PredictButton() {
  const classes = useStyles();
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={classes.buttonContainer}>
      <ColorButton variant="contained" className={classes.margin} onClick={handlePredict}>
        PREDICT
      </ColorButton>
      {prediction && (
        <p>Received prediction: {prediction}</p>
      )}
    </div>
  );
}
