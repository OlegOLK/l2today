import React, { FunctionComponent } from 'react';
import { Box, Paper } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ServerRowComponent, ServerItemProps } from '../ServerRow/index';

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

export type GrouppedServers = {
  label: string;
  servers: ServerItemProps[];
};

export type ServerListProps = {
  groupped: GrouppedServers;
};

export const ServerList: FunctionComponent<ServerListProps> = ({
  groupped,
}) => {
  return (
    <Paper>
      <Box textAlign="center">
        <h4> {groupped.label} </h4>
        {groupped.servers.map((server, i) => {
          return (
            <ServerRowComponent
              chronicles={server.chronicles}
              features={server.features}
              key={server.name + i}
              name={server.name}
              openDate={server.openDate}
              rates={server.rates}
            />
          );
        })}
      </Box>
    </Paper>
  );
};
