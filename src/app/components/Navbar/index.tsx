import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from '../RegisterDialog/slice';
import { userFromSaga } from '../RegisterDialog/saga';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  MenuItem,
  Grid,
  Menu,
  Hidden,
  SwipeableDrawer,
  Divider,
  List,
  ListItemText,
  Collapse,
  IconButton,
  Link as MaterialLink,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { LeftSlider } from '../Leftpanel/LeftSlider';
import React from 'react';
import BuildIcon from '@material-ui/icons/Build';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import InfoIcon from '@material-ui/icons/Info';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import MemoryIcon from '@material-ui/icons/Memory';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { RegisterDialog } from '../RegisterDialog/register';
import { selectName, selectIsAuthenticated } from '../RegisterDialog/selectors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
  toolbar: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  box: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list: {
    textTransform: 'uppercase',
  },
}));

type CardProps = {};

export const NavBar: FunctionComponent<CardProps> = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userFromSaga });
  const isAuthenticaed = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectName);
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [
    discussAnchorEl,
    setDiscussAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpenState] = React.useState(false);
  const [filtersOpen, setFiltersOpenState] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpenState(open);
  };

  const toggleFiltersDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setFiltersOpenState(open);
  };

  const [
    languageAnchorEl,
    setLanguageAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDiscussAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    //https://discord.gg/kdsrYj4xj2
    //window.open('https://discord.gg/kdsrYj4xj2', '__blank', 'noopener noreferrer');
    setDiscussAnchorEl(null);
  };

  const handleSelectLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };
  const handleSelectLanguageClose = (locale: string) => {
    setLanguageAnchorEl(null);
    i18n.changeLanguage(locale);
  };
  const [open, setOpen] = React.useState(false);

  const toggleSwipeableDrawer = () => {
    setOpen(!open);
  };

  const [authDialogOpen, setAuthDialogOpen] = React.useState(false);
  const openDialog = () => {
    setAuthDialogOpen(true);
  };
  // const dispatch = useDispatch();
  const logout = () => {
    history.push('/dashboard');
    // OPen LC
    // dispatch(actions.logout());
  };

  const closeDialog = () => {
    setAuthDialogOpen(false);
  };

  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Hidden mdDown>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.root}
          >
            <Grid item></Grid>
            <Grid item>
              <Button
                color="primary"
                component={Link}
                to={`/`}
                startIcon={<HomeIcon color="primary" />}
              >
                {t('nav.home')}
              </Button>
              {isAuthenticaed ? (
                <Button
                  color="primary"
                  component={Link}
                  to={'/addserver'}
                  startIcon={<AddToQueueIcon color="primary" />}
                >
                  {t('nav.addserver')}
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={openDialog}
                  startIcon={<AddToQueueIcon color="primary" />}
                >
                  {t('nav.addserver')}
                </Button>
              )}

              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                color="primary"
                onClick={handleClick}
                startIcon={<QuestionAnswerIcon color="primary" />}
                endIcon={<ArrowDropDownIcon color="primary" />}
              >
                {t('nav.discuss')}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={discussAnchorEl}
                keepMounted
                open={Boolean(discussAnchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <MaterialLink
                    href="https://discord.gg/kdsrYj4xj2"
                    target="__blank"
                    rel="noreferrer noopener"
                    color="primary"
                  >
                    Discord
                  </MaterialLink>
                </MenuItem>
                <MenuItem disabled onClick={handleClose}>
                  {t('nav.forum')}
                </MenuItem>
              </Menu>

              <Button disabled startIcon={<InfoIcon color="primary" />}>
                {t('nav.knowledgebase')}
              </Button>
              <Button startIcon={<MemoryIcon color="primary" />}>
                <MaterialLink
                  href="https://discord.gg/GEgCbHkWb4"
                  target="__blank"
                  rel="noreferrer noopener"
                  color="primary"
                >
                  {t('nav.addfeature')}
                </MaterialLink>
              </Button>
              <Button
                color="primary"
                component={Link}
                to={`/events`}
                startIcon={<AttachMoneyIcon color="primary" />}
              >
                {'Earn money'}
              </Button>
            </Grid>
            <Grid item>
              {isAuthenticaed ? (
                <Button
                  color="primary"
                  startIcon={<AccountCircleIcon color="primary" />}
                  onClick={logout}
                >
                  {userName}
                </Button>
              ) : (
                <Button
                  color="primary"
                  startIcon={<LockOpenIcon color="primary" />}
                  onClick={openDialog}
                >
                  {t('nav.login')}
                </Button>
              )}

              <Button
                aria-controls="language-selector"
                aria-haspopup="true"
                color="primary"
                onClick={handleSelectLanguage}
                startIcon={<GTranslateIcon />}
                endIcon={<ArrowDropDownIcon />}
              >
                {i18n.language}
              </Button>
              <Menu
                id="language-selector"
                anchorEl={languageAnchorEl}
                keepMounted
                open={Boolean(languageAnchorEl)}
                onClose={() => handleSelectLanguageClose('')}
              >
                <MenuItem onClick={() => handleSelectLanguageClose('en')}>
                  EN
                </MenuItem>
                <MenuItem onClick={() => handleSelectLanguageClose('ru')}>
                  RU
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuOpenIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />

          <Button startIcon={<BuildIcon />} onClick={toggleFiltersDrawer(true)}>
            Filters
          </Button>
          <LeftSlider
            openned={filtersOpen}
            toggleDrawer={toggleFiltersDrawer}
          />
          <SwipeableDrawer
            anchor={'left'}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <List
              className={classes.list}
              component="nav"
              aria-label="main mailbox folders"
            >
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.home')} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AddToQueueIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.addserver')} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <QuestionAnswerIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.discuss')} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  color="primary"
                  primary={t('nav.knowledgebase')}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MemoryIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.addfeature')} />
              </ListItem>
            </List>
            <Divider />
            <List
              component="nav"
              className={classes.list}
              aria-label="secondary mailbox folders"
            >
              <ListItem button>
                <ListItemIcon>
                  <LockOpenIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={t('nav.login')} />
              </ListItem>
              <ListItem button onClick={toggleSwipeableDrawer}>
                <ListItemIcon>
                  <GTranslateIcon color="primary" />
                </ListItemIcon>
                <ListItemText color="primary" primary={i18n.language} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="EN" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="RU" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </SwipeableDrawer>
        </Hidden>
        <RegisterDialog open={authDialogOpen} close={closeDialog} />
      </Toolbar>
    </AppBar>
  );
};
