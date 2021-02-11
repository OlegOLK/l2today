import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { RightPanel } from '../../components/Rightpanel/index';
import { FilterComponent } from 'app/components/Filter/filter';
import { ServersFilterComponent } from 'app/components/Filter/servers.filter';
export function HomePage() {
  return (
    <>
      <Hidden mdDown>
        <FilterComponent>
          <ServersFilterComponent />
        </FilterComponent>
      </Hidden>
      <Grid container direction="row" justify="space-between" spacing={2}>
        {/* <Hidden mdDown>
        <LeftPanel />
      </Hidden> */}
        <RightPanel />
        {/* <RightPanel /> */}
      </Grid>
    </>
  );
}
