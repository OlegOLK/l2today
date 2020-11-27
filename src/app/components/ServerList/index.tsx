import React, { FunctionComponent } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ServerRowComponent, ServerItemProps } from '../ServerRow/index';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import StarsIcon from '@material-ui/icons/Stars';

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
    vipAlert: {
      //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      backgroundColor: '#FBAB7E',
      backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
    },
    normalAlert: {
      backgroundColor: '#D9AFD9',
      backgroundImage: 'linear-gradient(90deg, #8BC6EC 0%, #9599E2 100%)',
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
        <Alert
          severity="success"
          className={
            groupped.label === 'Already VIP'
              ? classes.vipAlert
              : classes.normalAlert
          }
          icon={<StarsIcon fontSize="inherit" />}
        >
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
