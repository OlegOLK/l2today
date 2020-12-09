import React, { FunctionComponent } from 'react';
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Collapse,
  Divider,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as xp } from './svg/swords.svg';
import { ReactComponent as sp } from './svg/ancient-scroll.svg';
import { ReactComponent as adena } from './svg/dollar.svg';
import { ReactComponent as drop } from './svg/loot.svg';
import { ReactComponent as vip } from './svg/medal.svg';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Premium, Server } from 'types/Server';
import { ServerFeature } from '../ServerFeatures/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      textAlign: 'right',
    },
    details: {
      backgroundColor: 'aliceblue',
    },
    serverName: {
      textAlign: 'left',
      display: 'flex',
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    flip: {
      textAlign: 'right',
    },
    serverFeatures: {
      textAlign: 'right',
      display: 'flex',
    },
    serverLinkName: {
      textDecoration: 'none',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: '#7351b5', //orange[500],
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
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  const isPremium = () => {
    return server.premium !== Premium.none;
  };

  return (
    <>
      <Collapse in={!checked}>
        <ListItem button key={server.name + '-header-' + server.chronicles}>
          <Grid container className={classes.root}>
            <Grid
              item
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              md={5}
              xs={12}
            >
              <Box className={classes.serverName}>
                <a
                  href={server.uri}
                  className={classes.serverLinkName}
                  target="_blank"
                  rel="noopener nofollow noreferrer"
                >
                  {isPremium() ? (
                    <SvgIcon component={vip} viewBox="0 0 512 512" />
                  ) : null}
                  {server.name}
                </a>
              </Box>
              <Box className={classes.serverFeatures}>
                <ServerFeature
                  key={server.name + '-feature-' + server.chronicles}
                  serverName={server.name}
                  features={server.features}
                  isTextVariant={true}
                />
              </Box>
            </Grid>

            <Grid item md={2} xs={3}>
              <Typography noWrap={true} className={classes.heading}>
                {server.rates[0].amount !== -1
                  ? 'x' + server.rates[0].amount
                  : ''}
              </Typography>
            </Grid>
            <Grid item md={2} xs={4}>
              <Typography noWrap={true} className={classes.heading}>
                {server.chronicles}
              </Typography>
            </Grid>
            <Grid item md={2} xs={4}>
              <Typography noWrap={true} className={classes.heading}>
                {server.openDate}
              </Typography>
            </Grid>
            <Grid item md={1} xs={1} className={classes.flip}>
              <IconButton
                size={'small'}
                onClick={handleChange}
                aria-label="expand-server-info"
              >
                <ArrowLeftIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListItem>
      </Collapse>

      <Collapse in={checked}>
        <ListItem button key={server.name + '-header'}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.root}
          >
            {server.rates.map((rate, i) => {
              return (
                <Box key={server.name + rate.type + i}>
                  <SvgIcon
                    key={'icon' + rate.type + server.name}
                    component={
                      rate.type.toLowerCase() === 'xp'
                        ? xp
                        : rate.type.toLowerCase() === 'sp'
                        ? sp
                        : rate.type.toLowerCase() === 'adena'
                        ? adena
                        : rate.type.toLowerCase() === 'drop'
                        ? drop
                        : xp
                    }
                    viewBox="0 0 512 512"
                  />
                  <strong>{rate.type}</strong> :{rate.amount}
                </Box>
              );
            })}
            <Box>
              <ServerFeature
                key={server.name + '-feature-' + server.chronicles}
                serverName={server.name}
                features={server.features}
                isTextVariant={false}
              />
            </Box>
            <Grid item md={1} xs={1} className={classes.flip}>
              <IconButton
                size={'small'}
                onClick={handleChange}
                aria-label="hide-server-info"
              >
                <ArrowRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListItem>
      </Collapse>
      <Divider key={'d' + server.name + server.chronicles} />
    </>
  );
};
