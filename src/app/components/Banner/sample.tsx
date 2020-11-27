import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
    // backgroundColor: '#FBAB7E',
    // backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
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
      //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      backgroundColor: '#FBAB7E',
      backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type Props = {};

export const SampleCard: FunctionComponent<Props> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <TabPanel value={value} index={0}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="250"
            image="./assets/banner.gif"
            title="Contemplative Reptile"
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
          numquam saepe libero, possimus ipsa, aliquid quod commodi, delectus
          qui asperiores eos deserunt amet perferendis facilis ducimus in
          officia laudantium dicta!
        </TabPanel>

        <TabPanel value={value} index={2}>
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
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            icon={<SvgIcon component={Stats} viewBox="0 0 512 512" />}
            aria-label="favorite"
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tab}
            icon={<SvgIcon component={You} viewBox="0 -74 512.00063 512" />}
            aria-label="person"
            {...a11yProps(2)}
          />
        </Tabs>
      </CardActions>
    </Card>
  );
};
