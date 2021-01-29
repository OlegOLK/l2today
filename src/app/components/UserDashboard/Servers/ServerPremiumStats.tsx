import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import { UserServer } from 'types/Server';

interface Props {
  server?: UserServer;
}

export const ServerPremiumStats: FunctionComponent<Props> = ({ server }) => {
  const questions = !server
    ? null
    : server.questions.map(q => {
        return (
          <>
            <Grid item md={10}>
              <Typography
                align="left"
                component="div"
                style={{ fontWeight: 600, fontSize: '18px' }}
              >
                Question: <em>{q.question}</em>
              </Typography>
            </Grid>
            <Grid item md={10}>
              <Typography
                align="left"
                component="div"
                style={{ fontWeight: 600, fontSize: '18px' }}
              >
                Answer: <em>{q.answer}</em>
              </Typography>
            </Grid>
            <Grid item md={10}>
              <Typography
                align="left"
                component="div"
                style={{ fontWeight: 600, fontSize: '18px' }}
              >
                Status: <em>APPROVED</em>
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Divider
                variant="inset"
                style={{ backgroundColor: 'white', marginBottom: '10px' }}
              />
            </Grid>
          </>
        );
      });

  return (
    <Paper style={{ height: '483px' }}>
      <Grid item container style={{ padding: '10px' }}>
        <Grid item md={12}>
          <Typography style={{ fontWeight: 600 }}>
            Server Premium stats
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Divider />
        </Grid>
        {/* <Grid item md={12} container direction="row"
                    justify="space-around"
                    alignItems="stretch"
                    alignContent="center"  style={{ padding: '10px', height: '365px' }}>
                    <CircularProgressWithLabel value={60} />
                </Grid>
                <Grid item md={12}>
                    <Divider />
                </Grid> */}
        <Grid
          item
          container
          md={12}
          // style={{ marginTop: '20px' }}
          direction="row"
          justify="space-around"
          alignItems="stretch"
          alignContent="center"
        >
          <Grid
            item
            container
            style={{
              padding: '20px',
              color: 'white',
              backgroundColor: 'rgb(251, 171, 126)',
              backgroundImage:
                'linear-gradient(62deg, rgb(251, 171, 126) 0%, rgb(247, 206, 104) 100%)',
            }}
          >
            <Grid item md={12}>
              <Typography
                align="left"
                style={{ fontWeight: 600, paddingTop: '15px' }}
              >
                Premium status: <span style={{ color: 'green' }}>ON</span>
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Divider
                style={{ backgroundColor: 'white', marginBottom: '10px' }}
              />
            </Grid>
            <Grid item md={6}>
              <Typography
                align="center"
                variant="caption"
                component="div"
                style={{ fontWeight: 600 }}
              >
                <EventAvailableIcon /> Premium start:
              </Typography>
              <Typography
                align="center"
                variant="caption"
                component="div"
                style={{ fontWeight: 600 }}
              >
                01/20/2021
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography
                align="center"
                variant="caption"
                component="div"
                style={{ fontWeight: 600 }}
              >
                <EventBusyIcon /> Premium end:
              </Typography>
              <Typography
                align="center"
                variant="caption"
                component="div"
                style={{ fontWeight: 600 }}
              >
                02/20/2021
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            style={{
              marginTop: '10px',
              padding: '20px',
              color: 'white',
              backgroundColor: '#4caf50',
            }}
          >
            {/* //'rgb(217, 175, 217)', backgroundImage: 'linear-gradient(to right, #0ac282, #0df3a3)' }}> */}
            <Grid item md={12}>
              <Typography
                align="left"
                style={{ fontWeight: 600, paddingTop: '15px' }}
              >
                Quiz questions:{' '}
                <span> {server ? server.questions.length : 0} </span>
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Divider
                style={{ backgroundColor: 'white', marginBottom: '10px' }}
              />
            </Grid>
            {questions}
            {/* <Grid item md={10}>
              <Typography
                align="left"
                component="div"
                style={{ fontWeight: 600, fontSize: '18px' }}
              >
                Question: <em>When did server first launch?</em>
              </Typography>
            </Grid>
            <Grid item md={10}>
              <Typography
                align="left"
                component="div"
                style={{ fontWeight: 600, fontSize: '18px' }}
              >
                Answer: <em>01/20/2021</em>
              </Typography>
            </Grid>
            <Grid item md={10}>
              <Typography
                align="left"
                component="div"
                style={{ fontWeight: 600, fontSize: '18px' }}
              >
                Status: <em>UNDER MODERATION</em>
              </Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
