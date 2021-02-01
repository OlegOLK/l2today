import { Typography, Grid, Paper, Button, Link } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Discord } from './svg/Discord-Logo-White.svg';
export const Donate: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Grid item md={12}>
      <Paper elevation={3} style={{ height: '40em' }}>
        <Typography style={{ textAlign: 'center' }} variant="h4">
          {t('advert.header')}
          <Link
            href="https://discord.gg/kdsrYj4xj2"
            target="__blank"
            rel="noreferrer noopener"
            style={{ textDecoration: 'none' }}
          >
            <Button
              style={{ backgroundColor: '#7289DA', margin: '5px' }}
              startIcon={<SvgIcon component={Discord} viewBox="0 0 245 240" />}
            >
              Discord
            </Button>
          </Link>
        </Typography>
        <Typography style={{ textAlign: 'center' }} variant="h5">
          {t('advert.sub')}
        </Typography>
      </Paper>
    </Grid>
  );
};
