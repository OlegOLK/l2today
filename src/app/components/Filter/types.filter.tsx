import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { TYPES } from 'app/mocks/chronicles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      fontFamily: "'Google Sans', sans-serif",
      fontSize: '20px',
      textTransform: 'none',
      fontWeight: 400,
    },
  }),
);

export function TypesFilterComponent() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>({});

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (
      anchorRef &&
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.button}
      >
        Типы
        {/* Types */}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {TYPES.map(c => {
                    return (
                      <MenuItem
                        component={Link}
                        to={`/types/${c}`}
                        key={c}
                        onClick={handleClose}
                      >
                        {c}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
