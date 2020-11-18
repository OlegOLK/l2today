import React, { FunctionComponent } from 'react';
import { Grid, Box } from '@material-ui/core';
import { ServerList } from '../ServerList/index';

type RightPanelProps = {};

export const RightPanel: FunctionComponent<RightPanelProps> = ({}) => {
  return (
    <Grid item lg={10} xl={10}>
      <Grid container>
        <Grid item lg={6} md={12}>
          <Box m={1}>
            <ServerList />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
