import React from 'react';
import { Server } from 'types/Server';
import { Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    regularServerRow: {
      color: 'black !important',
      minHeight: '60px',
    },
  }),
);

export type ServerItemProps = {
  server: Server;
};

export function RegularRow(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} container className={classes.regularServerRow}>
      {props.children}
    </Grid>
  );
}
