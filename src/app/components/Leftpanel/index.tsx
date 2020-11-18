import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent, ReactFragment } from 'react';
import {
  Grid,
  Box,
  Button,
  Typography,
  Slider,
  ButtonGroup,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  panel: {
    backgroundColor: 'gray',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

type LeftPanelProps = {};

function valuetext(value: number) {
  return `x${value}`;
}

export const LeftPanel: FunctionComponent<LeftPanelProps> = ({}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Grid item lg={2} xl={2}>
      <Grid item container>
        <Grid item md={12}>
          <Box textAlign="center">
            <h3>ХРОНИКИ LINEAGE 2</h3>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Interlude
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Interlude+
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              HighFive
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Freya
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Epilogue
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Gracia
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              G.Crusade
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Fafurion
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Lindvior
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Classic
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={12}>
          <Box textAlign="center">
            <h3>ТИПЫ СЕРВЕРОВ:</h3>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              PvP
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              RvR
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Multiprof
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Multicraft
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Lowrate
            </Button>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box textAlign="left">
            <Button href="#text-buttons" color="primary">
              Custom
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={12}>
          <Box textAlign="center">
            <h3>РЕЙТЫ СЕРВЕРОВ:</h3>
          </Box>
        </Grid>

        {/* <Grid item md={6}> */}
        <Box className={classes.buttonBox}>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>x1</Button>
            <Button>x3</Button>
            <Button>x5</Button>
          </ButtonGroup>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>x10</Button>
            <Button>x1000</Button>
            <Button>x999</Button>
          </ButtonGroup>
        </Box>
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
};
