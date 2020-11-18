import { FunctionComponent } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(Theme => ({
  header: {
    height: '200px',
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
  },
}));

type BannerProps = {};

export const Banner: FunctionComponent<BannerProps> = ({}) => {
  const classes = useStyles();
  return (
    <header>
      <Box textAlign="center" className={classes.header}>
        <h1>AD HERE</h1>
      </Box>
    </header>
  );
};
