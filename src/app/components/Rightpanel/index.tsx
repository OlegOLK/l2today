import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { ServerList } from '../ServerList/index';

import { SERVERS } from '../../mocks/servers';

type RightPanelProps = {};

export const RightPanel: FunctionComponent<RightPanelProps> = () => {
  return (
    <Grid container item lg={10} xl={10} spacing={2}>
      {SERVERS.map((server, i) => {
        return (
          <Grid key={'grid' + server + i} item lg={6} md={12}>
            <ServerList key={'serverlist' + server + i} groupped={server} />
          </Grid>
        );
      })}
    </Grid>
  );
};
