import React, { FunctionComponent, useState } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import { ServerRowComponent } from '../ServerRow/Server.Row';
import { Server, ServersList } from 'types/Server';
import { useTranslation } from 'react-i18next';

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
    boxShadow: {
      boxShadow:
        'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
      boxSizing: 'border-box',
    },
    vip: {
      backgroundColor: '#ff9d2f',
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
  const [visibleServers, setVisibleServers] = useState<Server[]>(
    groupped.sortOrder >= 5 ? groupped.servers.slice(0, 5) : groupped.servers,
  );

  const renderAll = () => {
    setVisibleServers([...groupped.servers]);
  };

  const hasMore = () => {
    return groupped.servers.length > visibleServers.length;
  };

  return (
    <Grid container direction="row" justify="center" style={{ width: '100%' }}>
      <Grid item container xs={12}>
        <Grid
          item
          xs={2}
          sm={2}
          md={1}
          style={{
            height: '',
            padding: 0,
            color: 'white',
            borderRadius: '15% 15% 0 0',
          }}
          className={isPremiumPanel() ? classes.vip : ''}
        >
          {isPremiumPanel() ? (
            <Typography
              style={{
                fontSize: '20px',
                textAlign: 'center',
              }}
            >
              vip
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs={10} sm={10} md={11}>
          <Typography
            style={{
              fontSize: '20px',
              textAlign: 'center',
            }}
          >
            {t(`serverPanel.${groupped.label}`)}
          </Typography>
        </Grid>
      </Grid>

      <Grid item container xs={12}>
        {groupped.servers.map((server, i) => {
          return (
            <ServerRowComponent
              key={'row-' + server.name + i}
              server={server}
            />
          );
        })}
        {/* {hasMore() ? (
          <Button
            variant="outlined"
            onClick={renderAll}
            endIcon={<RefreshIcon />}
          >
            {t('serverPanel.LoadMore')}
          </Button>
        ) : (
          <></>
        )} */}
      </Grid>
    </Grid>
  );
};
