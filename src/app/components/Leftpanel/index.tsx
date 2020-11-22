import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import {
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Divider,
} from '@material-ui/core';
import { CHRONICLES, TYPES, RATES } from '../../mocks/chronicles';

import { RatesRow } from '../Complexfilter/RatesRow';
import { SelectedRatesRow } from '../Complexfilter/SelectedRatesRow';

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
  disabledButton: {
    color: 'black !important',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

type LeftPanelProps = {};

function getCustomFilters() {
  return JSON.parse(localStorage.getItem('filter') ?? '{}');
}

export const LeftPanel: FunctionComponent<LeftPanelProps> = ({}) => {
  const classes = useStyles();
  const chronicles = CHRONICLES.map(function (value) {
    return { label: value, selected: false };
  });

  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState<any[]>([]);
  const [rates, setRates] = React.useState(RATES);
  const [filterName, setFilterName] = React.useState('');
  const [stateChronicles, setState] = React.useState(chronicles);
  const [customFilters, setCustomFilters] = React.useState(getCustomFilters());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index) => {
    let statusCopy = [...stateChronicles];
    statusCopy[index].selected = event.target.checked;
    setState(statusCopy);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleFilterNameChage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilterName(event.target.value);
  };
  const handleClose = (exit: boolean) => {
    if (exit) {
      setOpen(false);
      return;
    }
    const chronicles = stateChronicles.filter(ch => {
      if (ch.selected == true) {
        return ch;
      }
    });

    const jsonFilter = localStorage.getItem('filter');
    let filter;
    if (jsonFilter) {
      filter = JSON.parse(jsonFilter);
      filter.userFilters.push({
        rates: rows,
        chronicles: chronicles,
        name: filterName,
      });
      localStorage.setItem('filter', JSON.stringify(filter));
    } else {
      localStorage.setItem(
        'filter',
        JSON.stringify({
          userFilters: [
            { rates: rows, chronicles: chronicles, name: filterName },
          ],
        }),
      );
    }
    setOpen(false);
  };

  const addNewRow = (name: string, min: number, max: number) => {
    setRows([...rows, { name, min, max }]);
    let statusCopy = [...rates];
    statusCopy.splice(statusCopy.indexOf(name), 1);
    setRates(statusCopy);
  };

  const removeRow = (rowNumber: number) => {
    let copy = [...rows];
    const removed = copy.splice(rowNumber, 1);
    setRates([...rates, removed[0].name]);
    setRows(copy);
  };

  const [name, setName] = React.useState('Cat in the Hat');
  const handleChangeNn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Grid item lg={2} xl={2}>
      <Grid item container>
        <Grid item md={12} sm={12} xs={12}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleClickOpen}
          >
            Расширенный поиск
          </Button>
        </Grid>
        {customFilters.userFilters.map(filter => {
          return (
            <Grid item md={6} sm={6} xs={6}>
              <Box textAlign="left">
                <Button color="primary">{filter.name}</Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Grid item container>
        <Grid item md={12} sm={12} xs={12}>
          <Box textAlign="center">
            <Button
              className={classes.disabledButton}
              fullWidth
              disabled
              variant="outlined"
              color="primary"
            >
              ХРОНИКИ LINEAGE 2
            </Button>
          </Box>
        </Grid>
        {CHRONICLES.map(chronic => {
          return (
            <Grid item md={6} sm={6} xs={6}>
              <Box textAlign="left">
                <Button href="#text-buttons" color="primary">
                  {chronic}
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <Box textAlign="center">
            <Button
              className={classes.disabledButton}
              fullWidth
              disabled
              variant="outlined"
              color="primary"
            >
              ТИПЫ СЕРВЕРОВ:
            </Button>
          </Box>
        </Grid>

        {TYPES.map(type => {
          return (
            <Grid item md={6} sm={6} xs={6}>
              <Box textAlign="left">
                <Button fullWidth href="#text-buttons" color="primary">
                  {type}
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <Box textAlign="center">
            <Button
              className={classes.disabledButton}
              fullWidth
              disabled
              variant="outlined"
              color="primary"
            >
              РЕЙТЫ СЕРВЕРОВ:
            </Button>
          </Box>
        </Grid>

        <Grid item md={12}>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Button fullWidth color="primary">
                x1
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button fullWidth color="primary">
                x3
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button fullWidth color="primary">
                x5
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button fullWidth color="primary">
                x10
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button fullWidth color="primary">
                x100
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button fullWidth color="primary">
                x200
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button fullWidth color="primary">
                x1000
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button fullWidth color="primary">
                x9999
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Select multiple chronicles</Typography>
          <Grid container spacing={1}>
            {stateChronicles.map((ch, index) => {
              return (
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ch.selected}
                        onChange={e => handleChange(e, index)}
                        name={ch.label}
                      />
                    }
                    label={ch.label}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Typography gutterBottom>Select Rates</Typography>

          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            {rows.map((row, i) => {
              return (
                <SelectedRatesRow
                  rowNumber={i}
                  removeRove={removeRow}
                  min={row.min}
                  max={row.max}
                  selectedRate={row.name}
                />
              );
            })}
            {rates.length > 0 && (
              <RatesRow
                rates={rates}
                rowNumber={0}
                removeRove={removeRow}
                addNewRow={addNewRow}
              />
            )}
          </Grid>
          <Typography gutterBottom>Set filter name</Typography>
          <TextField
            label="Filter name"
            id="filter-name"
            placeholder="Filter name"
            fullWidth
            value={filterName}
            onChange={handleFilterNameChage}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={e => handleClose(true)} color="primary">
            Exit
          </Button>
          <Button autoFocus onClick={e => handleClose(false)} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
