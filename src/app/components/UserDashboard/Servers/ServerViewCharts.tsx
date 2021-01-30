import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import ReactApexChart from 'react-apexcharts';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

export const ServerViewCharts: FunctionComponent = () => {
  const data = {
    series: [
      {
        name: 'server views',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'quiz',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2021-01-18T00:00:00.000Z',
          '2021-01-19T01:30:00.000Z',
          '2021-01-20T02:30:00.000Z',
          '2021-01-21T03:30:00.000Z',
          '2021-01-22T04:30:00.000Z',
          '2021-01-23T05:30:00.000Z',
          '2021-01-24T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
  };

  return (
    <Paper>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
        style={{ padding: '10px' }}
      >
        <Grid item md={12}>
          <Typography style={{ fontWeight: 600 }}>Server Traffic</Typography>
        </Grid>
        <Grid item md={12}>
          <Divider component="div" />
        </Grid>
        <Grid item md={12}>
          <ReactApexChart
            options={data.options}
            series={data.series}
            type="area"
            height={350}
          />
        </Grid>
        <Grid item md={12}>
          <Divider component="div" />
        </Grid>
        <Grid
          item
          container
          md={12}
          style={{ marginTop: '20px' }}
          direction="row"
          justify="space-around"
          alignItems="stretch"
        >
          <Grid item md={3}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              <TrendingUpIcon /> 189 (example)
            </Typography>
            <small style={{ color: 'gray' }}>Server details clicks</small>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              <TrendingUpIcon /> 189 (example)
            </Typography>
            <small style={{ color: 'gray' }}>Server details clicks</small>
          </Grid>

          <Grid item md={3}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              <TrendingUpIcon /> 189 (example)
            </Typography>
            <small style={{ color: 'gray' }}>Server details clicks</small>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
