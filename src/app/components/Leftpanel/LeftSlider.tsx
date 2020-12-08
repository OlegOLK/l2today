import React, { FunctionComponent } from 'react';
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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'react-i18next';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { LeftPanel } from './index';
type LeftSliderProps = {
  openned: boolean;
  toggleDrawer(open: boolean);
};

export const LeftSlider: FunctionComponent<LeftSliderProps> = ({
  openned,
  toggleDrawer,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <SwipeableDrawer
      anchor={'top'}
      open={openned}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <LeftPanel />
    </SwipeableDrawer>
  );
};
