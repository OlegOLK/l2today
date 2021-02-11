import React, { FunctionComponent } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Server } from 'types/Server';
import { ReactComponent as star } from './svg/star.svg';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
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
    regularServerRow: {
      color: 'black !important',
    },
    premiumServerRowVip: {
      alignItems: 'stretch',
      textAlign: 'center',
      backgroundImage: 'linear-gradient(#ff9d2f, #ff6126)',
      position: 'relative',
      overflow: 'hidden',
      // borderBottom: "1px solid rgb(222, 226, 230)",
      padding: '3px',
      // borderRadius: "5px",

      //rounded p-1
      textDecoration: 'none',
      '&:after': {
        animation: `$shine 5s ${theme.transitions.easing.easeInOut} infinite`,
        animationFillMode: 'forwards',
        content: '""',
        position: 'absolute',
        /* top: -110%; */
        left: '-30%',
        width: '50%',
        height: '100%',
        opacity: 0,
        transform: 'rotate(30deg)',
        background: 'rgba(255, 255, 255, 0.13)',
        backgroundImage:
          'linear-gradient(to right, rgba(255, 255, 255, 0.13) 0 %, rgba(255, 255, 255, 0.13) 77 %, rgba(255, 255, 255, 0.5) 92 %, rgba(255, 255, 255, 0.0) 100 %)',
      },
    },
    '@keyframes shine': {
      '0%': {
        opacity: 1,
        top: '0%',
        left: '-100%',
        transitionProperty: 'left, top, opacity',
        transitionDuration: '0.7s, 0.7s, 0.15s',
        transitionTimingFunction: 'ease',
      },
      '90%': {
        opacity: 1,
        left: '100%',
        transitionProperty: 'left, top',
        transitionDuration: '0.7s, 0.7s',
        transitionTimingFunction: 'ease',
      },
      '100%': {
        opacity: 0,
        left: '100%',
      },
    },
    vipStar: {
      padding: 0,
      color: 'white',
      //col col-1 vip-star
    },
    regularVipStart: {
      backgroundColor: '#ff9d2f',
      padding: 0,
      color: 'white',
    },
    nonVipPlaceholderForStar: {
      padding: 0,
      color: 'white',
    },
    starWrapper: {
      display: 'flex',
      alignItems: 'center',
      // minWidth: '51px',
      // minHeight: "51px",
      height: '100%',
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
    },
    regularText: {
      fontSize: '20px',
      textOverflow: 'elipsis',
      wordBreak: 'keep-all',
    },
    serverDetails: {
      // col col-12 details border-top
      fontSize: '12px',
      borderTop: '1px solid rgb(222, 226, 230)',
      paddingTop: '5px',
    },
    regularServerDetails: {
      backgroundColor: 'antiquewhite',
    },
    nonVipServerDetail: {
      // backgroundColor: 'white'
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

  const getStarClass = () => {
    switch (server.premium) {
      case 0: {
        return classes.nonVipPlaceholderForStar;
      }
      case 1: {
        return classes.regularVipStart;
      }
      case 2: {
        return classes.vipStar;
      }
      default: {
        return '';
      }
    }
  };

  const getDetailsClass = () => {
    return server.premium === 2
      ? classes.serverDetails
      : server.premium === 1
      ? classes.regularServerDetails
      : classes.regularServerDetails;
  };

  const getMainRate = () => {
    var xp = server.rates.find(x => x.type.toLowerCase() === 'xp');
    if (!xp || xp.amount <= 0) {
      return server.features.join(' ');
    }
    return `x${xp.amount}`;
  };

  const getServerRates = () => {
    const hasAnyRates = server.rates.some(x => x.amount !== 0);
    if (!hasAnyRates) {
      return null;
    }
    return (
      <Grid item xs={12} className={clsx(getDetailsClass())}>
        <Grid
          item
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {server.rates.map(rate => {
            return rate.amount > 0 ? (
              <Grid item>
                {rate.type.toUpperCase()}: x{rate.amount}
              </Grid>
            ) : null;
          })}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {/* <!-- badge variant #1 --> */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.serverRow}
      >
        <Grid
          item
          xs={12}
          container
          className={clsx(
            server.premium === 2
              ? classes.premiumServerRowVip
              : classes.regularServerRow,
          )}
        >
          <Grid item md={1} className={clsx(getStarClass())}>
            <div className={classes.starWrapper}>
              {server.premium > 0 ? (
                <SvgIcon key={'icon'} component={star} viewBox="0 0 16 16" />
              ) : null}
            </div>
          </Grid>
          <Grid item md={11}>
            <Grid
              item
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid
                item
                xs={3}
                zeroMinWidth
                style={{ textAlign: 'left', marginLeft: '10px' }}
                className={classes.regularText}
              >
                <Typography noWrap>{server.name}</Typography>
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
                style={{ textAlign: 'right' }}
                className={classes.regularText}
              >
                <Typography noWrap>{server.openDate}</Typography>
              </Grid>
              {/* {
                server.rates.every(x=> x.amount > 0) ? ()
              } */}
              {getServerRates()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
