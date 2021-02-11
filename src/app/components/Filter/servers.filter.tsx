import React from 'react';
import { Grid, Divider, Button } from '@material-ui/core';
import { RatesFilterComponent } from './rates.filter';
import { ChroniclesFilterComponent } from './chronicles.fiter';
import { TypesFilterComponent } from './types.filter';
import { CustomFilterComponent } from './custom.filter';

export function ServersFilterComponent() {
  return (
    <>
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
      <Grid item>
        <Button
          disabled
          style={{
            fontSize: '20px',
            textTransform: 'none',
            fontWeight: 400,
          }}
        >
          Дата
        </Button>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <CustomFilterComponent />
    </>
  );
}
