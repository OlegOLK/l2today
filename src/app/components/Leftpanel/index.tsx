import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { Grid, Box, Button, Chip } from '@material-ui/core';
import { CHRONICLES, TYPES } from '../../mocks/chronicles';
import { ComplexSearchDialog } from './ComplexSearchDialog';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
  chipOverflow: {
    textOverflow: 'ellipsis',
    maxWidth: '80px',
  },
  normalAlert: {
    backgroundColor: '#D9AFD9',
    backgroundImage: 'linear-gradient(90deg, #8BC6EC 0%, #9599E2 100%)',
  },
}));

type LeftPanelProps = {};

function getCustomFilters() {
  return JSON.parse(localStorage.getItem('filter') ?? '{}');
}

export const LeftPanel: FunctionComponent<LeftPanelProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [customFilters, setCustomFilters] = React.useState(getCustomFilters());
  const [dialogKey, setDialogKey] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (exit: boolean, modalFilter: any) => {
    if (exit) {
      setOpen(false);
      return;
    }
    const jsonFilter = localStorage.getItem('filter');
    let filter;
    if (jsonFilter) {
      filter = JSON.parse(jsonFilter);
      filter.userFilters.push(modalFilter);
      localStorage.setItem('filter', JSON.stringify(filter));
    } else {
      localStorage.setItem(
        'filter',
        JSON.stringify({
          userFilters: [modalFilter],
        }),
      );
    }
    setCustomFilters(getCustomFilters());
    setOpen(false);
    let kk = dialogKey + 1;
    setDialogKey(kk);
  };

  const handleClickFilter = () => {};
  const handleDeleteFilter = (index: number) => {
    const jsonFilter = localStorage.getItem('filter');
    if (!jsonFilter) {
      return;
    }
    var complexFilter = JSON.parse(jsonFilter);
    complexFilter.userFilters.splice(index, 1);
    localStorage.setItem('filter', JSON.stringify(complexFilter));
    setCustomFilters(getCustomFilters());
  };

  return (
    <Grid item lg={2} xl={2}>
      <Grid item container>
        <Grid item md={12} sm={12} xs={12}>
          <Button
            className={classes.normalAlert}
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleClickOpen}
          >
            {t('leftPanel.complexsearch')}
          </Button>
        </Grid>
        {customFilters.userFilters &&
          customFilters.userFilters.map((filter, i) => {
            return (
              <Grid key={'grid' + i + filter.name} item md={4} sm={4} xs={4}>
                <Box key={'box' + i + filter.name} textAlign="left" my={1}>
                  <Chip
                    className={classes.chipOverflow}
                    label={filter.name}
                    clickable
                    size="small"
                    color="primary"
                    variant="outlined"
                    onDelete={() => handleDeleteFilter(i)}
                    onClick={handleClickFilter}
                  />
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
              {t('leftPanel.chronicles')}
            </Button>
          </Box>
        </Grid>
        {CHRONICLES.map((chronic, i) => {
          return (
            <Grid key={'grid' + i + chronic} item md={6} sm={6} xs={6}>
              <Box key={'box' + i + chronic} textAlign="center">
                <Button
                  key={'button' + i + chronic}
                  color="primary"
                  component={Link}
                  to={`/chronicles/${chronic}`}
                >
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
              {t('leftPanel.types')}
            </Button>
          </Box>
        </Grid>

        {TYPES.map((type, i) => {
          return (
            <Grid key={'grid' + i + type} item md={6} sm={6} xs={6}>
              <Box key={'box' + i + type} textAlign="left">
                <Button
                  key={'button' + i + type}
                  fullWidth
                  color="primary"
                  component={Link}
                  to={`/types/${type}`}
                >
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
              {t('leftPanel.rates')}
            </Button>
          </Box>
        </Grid>

        <Grid item md={12}>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/rates/x1`}
              >
                x1
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/rates/x3`}
              >
                x3
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/rates/x5`}
              >
                x5
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/rates/x10`}
              >
                x10
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/rates/x100`}
              >
                x100
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/rates/x200`}
              >
                x200
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/rates/x1000`}
              >
                x1000
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                fullWidth
                color="primary"
                component={Link}
                to={`/rates/x9999`}
              >
                x9999
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ComplexSearchDialog close={handleClose} key={dialogKey} isOpen={open} />
    </Grid>
  );
};
