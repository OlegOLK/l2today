import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Grid,
  Hidden,
  makeStyles,
  ThemeProvider,
  Drawer,
  Typography,
  Paper,
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import { useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer } from '../../components/RegisterDialog/slice';
import { selectIsAuthenticated } from '../../components/RegisterDialog/selectors';
import { userFromSaga } from '../../components/RegisterDialog/saga';

import { SimpleCard } from '../../components/UserDashboard/ServerInfo';
import { ServerViewCharts } from '../../components/UserDashboard/ServerViewCharts';
import { ServerPremiumStats } from '../../components/UserDashboard/ServerPremiumStats';
import { CHRONICLES } from 'app/mocks/chronicles';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    minHeight: '40em',
    marginTop: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: '420px',
  },
  paper: {
    height: '250px',
    width: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundImage: "url('/assets/graph-bar.svg')",
    backgroundSize: 'stretch',
    backgroundPosition: 'center' /* Center the image */,
  },
  paperNoBg: {
    height: '250px',
    width: 'auto',
  },
  card: {
    minWidth: 375,
  },
  // footer {
  //     clear: 'both',
  //     position: 'relative',
  //     height: '200px',
  //     marginTop: '-200px'
  // }
}));

export function UserDashboardPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userFromSaga });
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // const useEffectOnAuthenticated = (effect: React.EffectCallback) => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     useEffect(effect, [isAuthenticated]);
  // };

  // useEffectOnAuthenticated(() => {
  //     if (!isAuthenticated) {
  //         history.push('/');
  //     }
  // });

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      spacing={1}
      className={classes.root}
    >
      {/* <Grid item lg={2} xl={1}> */}
      {/* <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                > */}
      <Grid item>
        <Paper style={{ flex: '1 1 auto', height: '100%' }}>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <SendIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Account information" />
              {/* login / pass / mail + balance + total servers count etc. */}
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={event => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <DraftsIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Buy coins" />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Servers" />
              {open ? (
                <ExpandLess color="primary" />
              ) : (
                <ExpandMore color="primary" />
              )}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  selected={selectedIndex === 2}
                  onClick={event => handleListItemClick(event, 2)}
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <StarBorder color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="l2Hello" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 5}
                  onClick={event => handleListItemClick(event, 5)}
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <StarBorder color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="l2Today" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={event => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <DraftsIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>

            <ListItem
              button
              selected={selectedIndex === 4}
              onClick={event => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <DraftsIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Paper>
        {/* server list */}
        {/* </Grid> */}
        {/* </Drawer> */}
      </Grid>

      <Grid
        item
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        spacing={1}
        lg
      >
        <Grid item md={4}>
          <Paper
            elevation={3}
            style={{
              height: '75px',
              padding: '16px',
              backgroundColor: '#F4D03F',
              backgroundImage:
                'linear-gradient(132deg, #F4D03F 0%, #16A085 100%)',
            }}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid item>
                <Typography
                  style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}
                >
                  Server View
                </Typography>
                <Typography
                  style={{ fontSize: '14px', fontWeight: 400, color: 'gray' }}
                >
                  Total server views
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}
                >
                  2380
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={4}>
          <Paper
            elevation={3}
            style={{
              height: '75px',
              padding: '16px',
              backgroundColor: '#D9AFD9',
              backgroundImage:
                'linear-gradient(90deg, #8BC6EC 0%, #9599E2 100%)',
            }}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid item>
                <Typography
                  style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}
                >
                  Server View
                </Typography>
                <Typography
                  style={{ fontSize: '14px', fontWeight: 400, color: 'gray' }}
                >
                  Today server views
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}
                >
                  +231
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={4}>
          <Paper
            elevation={3}
            style={{
              height: '75px',
              padding: '16px',
              backgroundColor: '#FBAB7E',
              backgroundImage:
                'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
            }}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid item>
                <Typography
                  style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}
                >
                  Server quiz starts
                </Typography>
                <Typography
                  style={{ fontSize: '14px', fontWeight: 400, color: 'gray' }}
                >
                  All time quiz starts
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}
                >
                  480
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item md={8}>
            <ServerViewCharts />
          </Grid>
          <Grid item md={4}>
            <ServerPremiumStats />
          </Grid>
        </Grid>

        <Grid item md={12}>
          <SimpleCard
            server={{
              name: 'l2Hello',
              chronicles: CHRONICLES[0],
              features: [],
              openDate: '02/20/2021',
              premium: 1,
              rates: [],
              uri: 'https://l2hello.com',
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
