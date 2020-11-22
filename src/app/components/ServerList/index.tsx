import React, { FunctionComponent } from 'react';
import { Box, Paper, Typography, Button } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ServerRowComponent, ServerItemProps } from '../ServerRow/index';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    grouppedLable: {
      textAlign: 'center',
      margin: 0,
    },
    disabledButton: {
      color: 'black !important',
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
  const classes = useStyles();
  return (
    <Paper>
      <Typography component="div">
        {/* <Box className={classes.grouppedLable} fontWeight="fontWeightBold"> */}
        <Alert icon={false} severity="success">
          {groupped.label}
        </Alert>
        {/* <Paper elevation={3}>{groupped.label}</Paper>
        </Box> */}
      </Typography>
      {/* <Button
              className={classes.disabledButton}
              fullWidth
              disabled
              variant="outlined"
              color="primary"
            >
              {groupped.label}
            </Button> */}
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
    </Paper>
  );
};
