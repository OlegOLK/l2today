import React, { FunctionComponent } from 'react';
import { Paper, Typography, List } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ServerRowComponent } from '../ServerRow/index';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import StarsIcon from '@material-ui/icons/Stars';
import { ServersList } from 'types/Server';
import { useTranslation } from 'react-i18next';
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

export type ServerListProps = {
  groupped: ServersList;
};

export const ServerList: FunctionComponent<ServerListProps> = ({
  groupped,
}) => {
  const isPremiumPanel = () => {
    if (groupped.sortOrder === 1 || groupped.sortOrder === 0) {
      return true;
    }

    return false;
  };
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Paper>
      <Typography component="div">
        <Alert
          severity="success"
          className={isPremiumPanel() ? classes.vipAlert : classes.normalAlert}
          icon={<StarsIcon fontSize="inherit" />}
        >
          {t(`serverPanel.${groupped.label}`)}
        </Alert>
      </Typography>
      <List component="nav" aria-label={'list-' + groupped.sortOrder}>
        {groupped.servers.map((server, i) => {
          return (
            <ServerRowComponent
              key={'row-' + server.name + i}
              server={server}
            />
          );
        })}
      </List>
    </Paper>
  );
};
