import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  TextField,
} from '@material-ui/core';
import { UserServer } from 'types/Server';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ServerRatesFormFields } from '../../AddServerForm/ServerRatesFormFields';
import { ServerPlatformAndTypeFormFields } from '../../AddServerForm/ServerPlatformAndTypeFormFields';
import { ServerQuizForm } from './ServerQuiz';
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 250,
    //minWidth: 475,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  serverHeaderRow: {
    backgroundColor: '#FBAB7E',
    backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
    color: 'white',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

interface SimpleCardProps {
  server: UserServer;
  handleDataChange(server: UserServer): void;
}

export const SimpleCard: FunctionComponent<SimpleCardProps> = ({
  server,
  handleDataChange,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('');

  const handleChange = panel => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
  };

  const handleServerNameChange = event => {
    event.preventDefault();
    handleDataChange({ ...server, uri: event.target.value as string });
  };

  return (
    // <Paper elevation={3} className={classes.root}>
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="baseline"
    >
      <Grid
        container
        item
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.serverHeaderRow}
      >
        <Grid item>
          <Typography
            variant="caption"
            style={{ fontSize: '25px', fontWeight: 700 }}
          >
            Configuration section for server: {server.name}
          </Typography>
        </Grid>
        <Grid item>
          <Button disableRipple variant="outlined" color="secondary">
            {server.approved ? 'approved' : 'under moderation'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </Grid>
      </Grid>

      <Grid item md={12}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading} style={{ fontWeight: 500 }}>
              {' '}
              General settings
            </Typography>
            <Typography color="textSecondary">
              Server name and website
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form
              noValidate
              autoComplete="off"
              style={{ display: 'flex', width: '100%' }}
            >
              <TextField
                id="outlined-full-width"
                label="Server website"
                style={{ margin: 8 }}
                placeholder="Server name"
                value={server.name}
                disabled
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-full-width"
                label="Server website"
                style={{ margin: 8 }}
                placeholder="Server website"
                value={server.uri}
                onChange={handleServerNameChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </form>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading} style={{ fontWeight: 500 }}>
              Settings
            </Typography>
            <Typography color="textSecondary">
              Server platform and type
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ServerPlatformAndTypeFormFields
              handleDataChange={handleDataChange}
              server={server}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading} style={{ fontWeight: 500 }}>
              Specifications
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Server chronicles and rates
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ServerRatesFormFields
              handleDataChange={handleDataChange}
              server={server}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel6'}
          onChange={handleChange('panel6')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading} style={{ fontWeight: 500 }}>
              Quiz
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Add, update or remove quiz questions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ServerQuizForm
              server={server}
              handleDataChange={handleDataChange}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
    // </Paper>
  );
};
