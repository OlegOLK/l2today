import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider } from '@material-ui/core';
import { RatesFilterComponent } from './rates.filter';
import { ChroniclesFilterComponent } from './chronicles.fiter';
import { TypesFilterComponent } from './types.filter';
import { CustomFilterComponent } from './custom.filter';

const useStyles = makeStyles(() =>
  createStyles({
    section: {
      width: '100%',
      marginTop: '-5vw',
    },
    root: {
      zIndex: 100,
      fontFamily: "'Google Sans', sans-serif",
      fontSize: '20px',
    },
    wrapper: {
      height: '100%',
      zIndex: 100,
    },
    button: {
      fontFamily: "'Google Sans', sans-serif",
      fontSize: '20px',
      textTransform: 'none',
      fontWeight: 400,
    },
  }),
);

export function FilterComponent() {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Grid container direction="row" justify="center" className={classes.root}>
        <Grid item md={6} style={{ zIndex: 100 }}>
          <Paper
            elevation={3}
            style={{ minHeight: '80px', display: 'flex', alignItems: 'center' }}
          >
            <Grid
              item
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              className={classes.wrapper}
            >
              <Grid item>
                <RatesFilterComponent />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item>
                <ChroniclesFilterComponent />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item>
                <TypesFilterComponent />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item>Дата</Grid>
              <Divider orientation="vertical" flexItem />
              <CustomFilterComponent />
              {/* <Grid item>
                                <CustomFilterComponent />
                            </Grid> */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
}
