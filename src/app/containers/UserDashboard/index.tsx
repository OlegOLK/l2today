import React, { Suspense, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FaceIcon from '@material-ui/icons/Face';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  sliceKey,
  reducer,
  actions,
} from '../../components/RegisterDialog/slice';

import {
  reducer as serverReducer,
  sliceKey as serverSliceKey,
  actions as serverActions,
} from 'app/components/AddServerForm/slice';
import {
  selectServers,
  selectUserServersLoading,
} from 'app/components/AddServerForm/selectors';
import { selectIsAuthenticated } from '../../components/RegisterDialog/selectors';
import { userFromSaga } from '../../components/RegisterDialog/saga';
import { serversFromSaga } from 'app/components/AddServerForm/saga';
import { Route, useRouteMatch } from 'react-router-dom';
import { ServerRegion } from 'app/components/UserDashboard/Servers/ServerRegion';
import { UserInformation } from 'app/components/UserDashboard/UserData/UserInformation';
import { Donate } from 'app/components/UserDashboard/Donate/Donate';
import { Notification } from 'app/components/UserDashboard/Notifications/Notification';

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
  useInjectReducer({ key: serverSliceKey, reducer: serverReducer });
  useInjectSaga({ key: sliceKey, saga: userFromSaga });
  useInjectSaga({ key: sliceKey, saga: serversFromSaga });
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  let { path } = useRouteMatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const servers = useSelector(selectServers);
  const userServersIsLoading = useSelector(selectUserServersLoading);
  const useEffectOnAuthenticated = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [isAuthenticated]);
  };

  useEffectOnAuthenticated(() => {
    if (!isAuthenticated) {
      history.push('/');
    }

    dispatch(serverActions.getServers());
  });

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (location.pathname.includes('/server/') && !userServersIsLoading) {
      const serverId = location.pathname.substring(
        location.pathname.indexOf('/server/', 0) + '/server/'.length,
      );
      if (serverId && servers.findIndex(x => x.id === serverId) !== -1) {
        setSelectedIndex(servers.findIndex(x => x.id === serverId) + 50);
      }
    }
  }, [userServersIsLoading, location.pathname, servers]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index, subRoute: string) => {
    setSelectedIndex(index);
    history.push(`${path}${subRoute}`);
  };

  const handleLogout = () => {
    dispatch(actions.logout());
    history.push('/');
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
      <Grid item>
        <Paper style={{ flex: '1 1 auto', height: '100%' }}>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0, '/')}
            >
              <ListItemIcon>
                <FaceIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Account information" />
              {/* login / pass / mail + balance + total servers count etc. */}
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={event => handleListItemClick(event, 1, '/donate')}
            >
              <ListItemIcon>
                <AttachMoneyIcon color="primary" />
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
                {servers.map((s, i) => {
                  return (
                    <ListItem
                      button
                      selected={selectedIndex === 50 + i}
                      onClick={event =>
                        handleListItemClick(event, 50 + i, `/server/${s.id}`)
                      }
                      className={classes.nested}
                      key={`server-${s.id}`}
                    >
                      <ListItemIcon>
                        <StarBorder color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={s.name} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>

            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={event => handleListItemClick(event, 3, '/notifications')}
            >
              <ListItemIcon>
                <NotificationsActiveIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>

            <ListItem
              button
              selected={selectedIndex === 4}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <ExitToAppIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Paper>
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
        <Suspense fallback={null}>
          <Route path={`${path}/donate`} component={Donate} />
          <Route path={`${path}/notifications`} component={Notification} />
          <Route path={`${path}/server/:serverId`} component={ServerRegion} />
          <Route exact path={`${path}`} component={UserInformation} />
        </Suspense>
      </Grid>
    </Grid>
  );
}
