import React, { FunctionComponent } from 'react';
import { Server } from 'types/Server';
import { Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { RegularRow } from './rows/regular.row';
import { PremiumVipRow } from './rows/premium.vip.row';
import { PremiumRow } from './rows/premium.row';

const useStyles = makeStyles(theme =>
  createStyles({
    serverRow: {
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
    textAligment: {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
      },
    },
  }),
);

export type ServerItemProps = {
  server: Server;
};

function mapRatesWithType(server: Server) {
  const elements: JSX.Element[] = [];
  if (server.type !== 'Normal') {
    elements.push(
      <Grid item key={'type-' + server.name}>
        {server.type}
      </Grid>,
    );
  }

  server.rates.forEach(rate => {
    if (rate.amount > 0) {
      elements.push(
        <Grid item key={`server-rate-${server.name}-${rate.type}`}>
          {rate.type.toUpperCase()}: x{rate.amount}
        </Grid>,
      );
    }
  });
  return elements;
}

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
          {mapRatesWithType(server)}
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

  const getInfo = (isRegular: boolean) => {
    return (
      <>
        <Grid
          item
          md={isRegular ? 4 : 3}
          sm={5}
          xs={5}
          zeroMinWidth
          style={{ paddingLeft: '1px' }}
          className={clsx(classes.regularText, classes.textAligment)}
        >
          <Typography noWrap variant={'button'}>
            {server.name.toUpperCase()}
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          sm={6}
          xs={6}
          zeroMinWidth
          className={clsx(classes.regularText, classes.textAligment)}
        >
          <Typography noWrap>{getMainRate()}</Typography>
        </Grid>
        <Grid
          item
          md={3}
          sm={5}
          xs={5}
          zeroMinWidth
          className={clsx(classes.regularText, classes.textAligment)}
        >
          <Typography noWrap>{server.chronicles}</Typography>
        </Grid>
        <Grid
          item
          md={3}
          sm={5}
          xs={5}
          zeroMinWidth
          style={{ paddingRight: '5px' }}
          className={clsx(classes.regularText, classes.textAligment)}
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
          {getInfo(false)}{' '}
        </PremiumVipRow>
      ) : server.premium === 1 ? (
        <PremiumRow key={'premium-row-' + server.name}>
          {' '}
          {getInfo(false)}{' '}
        </PremiumRow>
      ) : (
        <RegularRow key={'regular-row-' + server.name}>
          {getInfo(true)}{' '}
        </RegularRow>
      )}
    </Grid>
  );
};
