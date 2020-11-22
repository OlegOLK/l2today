import React, { FunctionComponent } from 'react';
import { Grid, Box } from '@material-ui/core';
import { GrouppedServers, ServerList } from '../ServerList/index';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { SERVERS } from '../../mocks/servers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0,
    },
  }),
);

type RightPanelProps = {};

export const RightPanel: FunctionComponent<RightPanelProps> = ({}) => {
  const classes = useStyles();
  return (
    <Grid container item lg={10} xl={10} spacing={2}>
      {SERVERS.map((server, i) => {
        return (
          <Grid item lg={6} md={12}>
            <ServerList groupped={server} />
          </Grid>
        );
      })}
    </Grid>
  );
};
