import React, { FunctionComponent } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  Box,
  Grid,
  AccordionDetails,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ServerRowComponent } from '../ServerRow/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

type ServerListProps = {};

export const ServerList: FunctionComponent<ServerListProps> = ({}) => {
  const classes = useStyles();
  return (
    <Paper>
      <Box textAlign="center">
        <h4>СКОРО ОТКРОЮТСЯ VIP</h4>
      </Box>
      <ServerRowComponent
        chronicles="HighFive"
        features={['a', 'b']}
        key="test"
        name="GodWorld"
        openDate="Today"
        rates={[]}
      />
    </Paper>
  );
};
