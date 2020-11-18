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
    xp: {
      '&::before': {
        content: `''`,
        width: '24px',
        height: '24px',
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundImage: 'url(./assets/swords.svg)',
      },
    },
    sp: {
      '&::before': {
        content: `''`,
        width: '24px',
        height: '24px',
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundImage: 'url(./assets/ancient-scroll.svg)',
        alt: 'scroll',
      },
    },
    drop: {
      '&::before': {
        content: `''`,
        width: '24px',
        height: '24px',
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundImage: 'url(./assets/loot.svg)',
      },
    },
    adena: {
      '&::before': {
        content: `''`,
        width: '24px',
        height: '24px',
        display: 'inline-block',
        verticalAlign: 'middle',
        backgroundImage: 'url(./assets/dollar.svg)',
      },
    },
  }),
);

export type ServerRates = {
  name: string;
  amount: number;
};

export type ServerItemProps = {
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
        aria-controls={name + '-content'}
        id={name + '-header'}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
        >
          <a href="https://www.google.com/" target="blank">
            <img
              src="./assets/medal.svg"
              alt="vip"
              height="24px"
              width="24px"
            />{' '}
            {name}
          </a>
          <Typography className={classes.heading}>x300</Typography>
          <Typography className={classes.heading}>{chronicles}</Typography>
          <Typography className={classes.heading}>20.20.2020</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
        >
          {rates.map((rate, i) => {
            return (
              <Box
                key={rate.name + i}
                className={classes[rate.name.toLowerCase()]}
              >
                <strong>{rate.name}</strong> :{rate.amount}
              </Box>
            );
          })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
