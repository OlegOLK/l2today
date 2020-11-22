import { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Grid,
  Menu,
  Box,
} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  },
  box: {
    display: 'flex',
  },
}));

type CardProps = {
  title: string;
  paragraph: string;
};

export const NavBar: FunctionComponent<CardProps> = ({ title, paragraph }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          className={classes.root}
        >
          <Button>Home</Button>
          <Button>Add server</Button>

          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            endIcon={<ArrowDropDownIcon />}
          >
            Discuss
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Discord</MenuItem>
            <MenuItem onClick={handleClose}>Forum</MenuItem>
          </Menu>

          <Button>Knowledge base</Button>
          <Button>Add feature</Button>
          <Button color="inherit">Login</Button>
        </Grid>
        <Box className={classes.toolbar}>
          <img
            src="./assets/united-kingdom.svg"
            height="36px"
            width="auto"
            alt="EN"
          />{' '}
          &nbsp;
          <img src="./assets/russia.svg" height="36px" width="auto" alt="RU" />
        </Box>
        {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Typography className={classes.title}>News</Typography>
         */}
      </Toolbar>
    </AppBar>
  );
};
