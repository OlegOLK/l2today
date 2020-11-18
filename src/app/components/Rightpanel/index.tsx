import React, { FunctionComponent } from 'react';
import { Grid, Box } from '@material-ui/core';
import { GrouppedServers, ServerList } from '../ServerList/index';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ServerRowComponent, ServerItemProps } from '../ServerRow/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0,
    },
  }),
);

type RightPanelProps = {};

const servers: GrouppedServers[] = [
  {
    label: 'Soon VIP',
    servers: [
      {
        chronicles: 'HighFive',
        features: ['OBT', 'PTS'],
        name: 'Scryde',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'G.Crusade',
        features: ['OBT', 'PTS'],
        name: 'GodWorld',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'G.Crusade',
        features: ['OBT', 'PTS'],
        name: 'GodWorld2',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
    ],
  },
  {
    label: 'Already VIP',
    servers: [
      {
        chronicles: 'HighFive',
        features: ['OBT', 'PTS'],
        name: 'Scryde',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'G.Crusade',
        features: ['OBT', 'PTS'],
        name: 'GodWorld',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'G.Crusade',
        features: ['OBT', 'PTS'],
        name: 'GodWorld2',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
    ],
  },
  {
    label: 'Today',
    servers: [
      {
        chronicles: 'HighFive',
        features: ['OBT', 'PTS'],
        name: 'Scryde',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'G.Crusade',
        features: ['OBT', 'PTS'],
        name: 'GodWorld',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'G.Crusade',
        features: ['OBT', 'PTS'],
        name: 'GodWorld2',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'HighFive',
        features: ['OBT', 'PTS'],
        name: 'Scryde',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'G.Crusade',
        features: ['OBT', 'PTS'],
        name: 'GodWorld',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
      {
        chronicles: 'G.Crusade',
        features: ['OBT', 'PTS'],
        name: 'GodWorld2',
        openDate: 'today',
        rates: [
          { amount: 30, name: 'XP' },
          { amount: 30, name: 'SP' },
          { amount: 30, name: 'Adena' },
          { amount: 30, name: 'Drop' },
        ],
      },
    ],
  },
];

export const RightPanel: FunctionComponent<RightPanelProps> = ({}) => {
  const classes = useStyles();
  return (
    <Grid container item lg={10} xl={10} spacing={2}>
      {servers.map((server, i) => {
        return (
          <Grid item lg={6} md={12}>
            <ServerList groupped={server} />
          </Grid>
        );
      })}
    </Grid>
  );
};
