import React, { FunctionComponent } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  Grid,
  AccordionDetails,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

type ServerRates = {
  name: string;
  amount: number;
};

type ServerItemProps = {
  name: string;
  features: string[];
  openDate: string;
  rates: ServerRates[];
  chronicles: string;
};

export const ServerRowComponent: FunctionComponent<ServerItemProps> = ({
  name,
  features,
  openDate,
  rates,
  chronicles,
}) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
        >
          <a href="https://www.google.com/" target="blank">
            <img src="./medal.svg" height="24px" width="24px" /> {name}
          </a>
          <Typography className={classes.heading}>x300</Typography>
          <Typography className={classes.heading}>{chronicles}</Typography>
          <Typography className={classes.heading}>20.20.2020</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
