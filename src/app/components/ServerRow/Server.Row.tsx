import React, { FunctionComponent } from 'react';
import { Server } from 'types/Server';
import { Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { RegularRow } from './rows/regular.row';
import { PremiumVipRow } from './rows/premium.vip.row';
import { PremiumRow } from './rows/premium.row';

const useStyles = makeStyles(() =>
  createStyles({
    serverRow: {
      fontFamily: "'Google Sans', sans-serif",
      color: 'white',
      position: 'relative',
      transition: 'all .2s ease-in-out',
      paddingTop: '1px',
      borderBottom: '1px solid rgb(222, 226, 230)',
      '&:hover': {
        transform: 'scale(1.05)',
        zIndex: 100,
        backgroundColor: 'wheat',
      },
    },
    serverDetails: {
      fontSize: '12px',
      borderTop: '1px solid rgb(222, 226, 230)',
      paddingTop: '5px',
    },
    regularServerDetails: {
      backgroundColor: 'antiquewhite',
      bottom: 0,
    },
    regularText: {
      fontSize: '20px',
      textOverflow: 'elipsis',
      wordBreak: 'keep-all',
    },
  }),
);

export type ServerItemProps = {
  server: Server;
};

export const ServerRowComponent: FunctionComponent<ServerItemProps> = ({
  server,
}) => {
  const classes = useStyles();

  const getServerRates = () => {
    const hasAnyRates = server.rates.some(x => x.amount !== 0);
    if (!hasAnyRates) {
      return null;
    }
    return (
      <Grid
        item
        xs={12}
        className={
          server.premium === 2
            ? classes.serverDetails
            : classes.regularServerDetails
        }
      >
        <Grid
          item
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{ height: '100%', paddingBottom: 0 }}
        >
          {server.rates.map(rate => {
            return rate.amount > 0 ? (
              <Grid item key={`server-rate-${server.name}-${rate.type}`}>
                {rate.type.toUpperCase()}: x{rate.amount}
              </Grid>
            ) : null;
          })}
        </Grid>
      </Grid>
    );
  };

  const getMainRate = () => {
    var xp = server.rates.find(x => x.type.toLowerCase() === 'xp');
    if (!xp || xp.amount <= 0) {
      return server.type;
    }
    return `x${xp.amount}`;
  };

  const getInfo = () => {
    return (
      <>
        <Grid
          item
          zeroMinWidth
          style={{ textAlign: 'left', marginLeft: '10px', flexGrow: 1 }}
          className={classes.regularText}
        >
          <Typography noWrap variant={'button'}>
            {server.name.toUpperCase()}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          zeroMinWidth
          className={classes.regularText}
          style={{ textAlign: 'left' }}
        >
          <Typography noWrap>{getMainRate()}</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          zeroMinWidth
          className={classes.regularText}
          style={{ textAlign: 'left' }}
        >
          <Typography noWrap>{server.chronicles}</Typography>
        </Grid>
        <Grid
          item
          xs={3}
          zeroMinWidth
          style={{ textAlign: 'right', paddingRight: '5px' }}
          className={classes.regularText}
        >
          <Typography noWrap align="right">
            {server.openDate}
          </Typography>
        </Grid>
        {getServerRates()}
      </>
    );
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.serverRow}
      key={'server-grid-' + server.name}
    >
      {server.premium === 2 ? (
        <PremiumVipRow key={'vip-row-' + server.name}>
          {' '}
          {getInfo()}{' '}
        </PremiumVipRow>
      ) : server.premium === 1 ? (
        <PremiumRow key={'premium-row-' + server.name}>
          {' '}
          {getInfo()}{' '}
        </PremiumRow>
      ) : (
        <RegularRow key={'regular-row-' + server.name}>{getInfo()} </RegularRow>
      )}
    </Grid>
  );
};
