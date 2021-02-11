import React, { FunctionComponent } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ServerRowComponent } from '../ServerRow/Server.Row';
import { ServersList } from 'types/Server';
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
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ width: '100%', fontFamily: "'Google Sans', sans-serif" }}
    >
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
                fontFamily: "'Google Sans', sans-serif",
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
              fontFamily: "'Google Sans', sans-serif",
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
      </Grid>
    </Grid>
    //     <div class="col mb-5  rounded shadow-sm me-3 server-list">
    //     <div class="row border-bottom" style="align-items: center; text-align: center;">
    //         <div class="col col-1 rounded-top">
    //             <!-- vip -->
    //         </div>
    //         <div class="col">
    //             Open Soon
    //         </div>
    //     </div>
    //     <div class="server-list-root-soon">
    //     </div>
    // </div>

    // <Paper>
    //   <Typography component="div">
    //     <Alert
    //       severity="success"
    //       className={isPremiumPanel() ? classes.vipAlert : classes.normalAlert}
    //       icon={<StarsIcon fontSize="inherit" />}
    //     >
    //       {t(`serverPanel.${groupped.label}`)}
    //     </Alert>
    //   </Typography>
    //   <List component="nav" aria-label={'list-' + groupped.sortOrder}>
    //     {groupped.servers.map((server, i) => {
    //       return (
    //         <ServerRowComponent
    //           key={'row-' + server.name + i}
    //           server={server}
    //         />
    //       );
    //     })}
    //   </List>
    // </Paper>
    // <Grid item md={5}></Grid>
    // <div class="col mb-5  rounded shadow-sm me-3 server-list">
    //   <div class="row border-bottom" style="align-items: center; text-align: center;">
    //     <div class="col col-1 rounded-top">
    //       {/* <!-- vip --> */}
    //     </div>
    //     <div class="col">
    //       Open Soon
    //     </div>
    //   </div>
    //   <div class="server-list-root-soon">
    //   </div>
    // </div>
  );
};
