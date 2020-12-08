import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box, NoSsr } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as You } from './svg/youtube.svg';
import { ReactComponent as Castle } from './svg/castle.svg';
import { ReactComponent as Stats } from './svg/crystal.svg';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    maxHeight: 320,
    boxShadow: '0 20px 20px -17px rgba(0,111,255,0.6)',
    transition: 'all 0.3s',

    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 30px 45px -15px #FBAB7E ',
    },
  },
  actionArea: {
    height: 250,
    width: 240,
  },
  actions: {
    bottom: 0,
  },
  tab: {
    minWidth: '10px !important',
  },
  tabsContainer: {
    width: '100%',
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    vipAlert: {
      backgroundColor: '#FBAB7E',
      backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  a11yIndex: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, a11yIndex, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}-${a11yIndex}`}
      aria-labelledby={`simple-tab-${index}-${a11yIndex}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any, a11yIndex: number) {
  return {
    id: `simple-tab-${index}-${a11yIndex}`,
    'aria-controls': `simple-tabpanel-${index}-${a11yIndex}`,
  };
}

type Props = {
  a11yIndex: number;
  isLoading: boolean;
};

export const SampleCard: FunctionComponent<Props> = ({
  a11yIndex,
  isLoading,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <TabPanel value={value} index={0} a11yIndex={a11yIndex}>
          {isLoading ? (
            <Skeleton variant="rect" height={250} width={240} />
          ) : (
            <CardMedia
              component="img"
              alt="pinned vip server"
              height="250"
              width="240"
              src="/assets/ad.svg"
            />
          )}
        </TabPanel>

        <TabPanel value={value} index={1} a11yIndex={a11yIndex}>
          {t('banner.description')}
        </TabPanel>

        <TabPanel value={value} index={2} a11yIndex={a11yIndex}>
          <NoSsr>
            <iframe
              width="100%"
              height="100%"
              title="server-promo"
              allowFullScreen
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>
          </NoSsr>
        </TabPanel>
      </CardActionArea>
      <CardActions className={classes.actions}>
        {isLoading ? (
          <Skeleton variant="rect" height={48} width="100%" />
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabsContainer}
          >
            <Tab
              className={classes.tab}
              icon={<SvgIcon component={Castle} viewBox="0 0 512 512" />}
              aria-label="phone"
              {...a11yProps(0, a11yIndex)}
            />
            <Tab
              className={classes.tab}
              icon={<SvgIcon component={Stats} viewBox="0 0 512 512" />}
              aria-label="favorite"
              {...a11yProps(1, a11yIndex)}
            />
            <Tab
              className={classes.tab}
              icon={<SvgIcon component={You} viewBox="0 -74 512.00063 512" />}
              aria-label="person"
              {...a11yProps(2, a11yIndex)}
            />
          </Tabs>
        )}
      </CardActions>
    </Card>
  );
};
