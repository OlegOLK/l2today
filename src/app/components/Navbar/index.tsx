import { FunctionComponent } from 'react';
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
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/Inbox';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
}));

type CardProps = {
  title: string;
  paragraph: string;
};

export const NavBar: FunctionComponent<CardProps> = ({}) => {
  const { t, i18n } = useTranslation();
  const [
    discussAnchorEl,
    setDiscussAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpenState] = React.useState(false);
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

  const [
    languageAnchorEl,
    setLanguageAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [] = React.useState<string>('RU');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDiscussAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Hidden mdDown>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.root}
          >
            <Button>{t('nav.home')}</Button>
            <Button>{t('nav.addserver')}</Button>

            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon />}
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
              <MenuItem onClick={handleClose}>Discord</MenuItem>
              <MenuItem onClick={handleClose}>{t('nav.forum')}</MenuItem>
            </Menu>

            <Button>{t('nav.knowledgebase')}</Button>
            <Button>{t('nav.addfeature')}</Button>
          </Grid>
          <Grid container direction="row" justify="flex-end" spacing={1}>
            <Button color="inherit">{t('nav.login')}</Button>

            <Button
              aria-controls="language-selector"
              aria-haspopup="true"
              onClick={handleSelectLanguage}
              endIcon={<ArrowDropDownIcon />}
            >
              {i18n.language}
            </Button>
            <Menu
              id="language-selector"
              anchorEl={languageAnchorEl}
              keepMounted
              open={Boolean(languageAnchorEl)}
              onClose={e => handleSelectLanguageClose('')}
            >
              <MenuItem onClick={e => handleSelectLanguageClose('en')}>
                EN
              </MenuItem>
              <MenuItem onClick={e => handleSelectLanguageClose('ru')}>
                RU
              </MenuItem>
            </Menu>
            {/* <img
            src="./assets/united-kingdom.svg"
            height="36px"
            width="auto"
            alt="EN"
          />{' '}
          &nbsp;
          <img src="./assets/russia.svg" height="36px" width="auto" alt="RU" /> */}
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <Button onClick={toggleDrawer(true)}>Open</Button>
          <SwipeableDrawer
            anchor={'left'}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t('nav.home')} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={t('nav.addserver')} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={t('nav.discuss')} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={t('nav.knowledgebase')} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={t('nav.addfeature')} />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary={t('nav.login')} />
              </ListItem>
              <ListItem button onClick={toggleSwipeableDrawer}>
                <ListItemText primary={i18n.language} />
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
      </Toolbar>
    </AppBar>
  );
};
