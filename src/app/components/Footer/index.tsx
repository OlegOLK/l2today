import React, { FunctionComponent } from 'react';
import {
  Container,
  Grid,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
const useStyles = makeStyles(() => ({
  edgeMask: {
    height: '200px',
    marginBottom: '-90px',
    top: 0,
    left: 0,
    transform: 'translate(0, -50%)',
    backgroundPosition: 'center 150%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: 'url(/assets/valley-white-static.svg)',
  },
  edgeAnimated: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: 'url(/assets/valley-white.svg)',
  },
}));

export const Footer: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        height: '500px',
        width: '100%',
        bottom: 0,
        position: 'sticky',
        backgroundImage:
          'linear-gradient(135deg, rgb(0, 17, 34), rgb(34, 34, 17) 70%, rgb(51, 51, 34) 90%)',
        color: 'white',
        backgroundClip: 'border-box',
        marginTop: '110px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          opacity: '1',
          visibility: 'visible',
          backgroundPositionX: '50%',
          backgroundPositionY: '0%',
          backgroundSize: 'cover',
          backgroundImage: 'url(/assets/cloud-dark.svg)',
          height: '500px',
          width: '100%',
          zIndex: -1,
        }}
      ></div>
      <div className={classes.edgeMask}>
        <div className={classes.edgeAnimated}></div>
      </div>
      <Container maxWidth="md" style={{ zIndex: 100 }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item md={12}>
            <Typography component="div">l2NEW.com 2020-2021</Typography>
          </Grid>
          <Grid item md={6}>
            <div>
              <Link>Home</Link>
            </div>
            <div>
              <Link>Add server</Link>
            </div>
            <div>
              <Link>Events</Link>
            </div>
          </Grid>
          <Grid item md={6}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            modi quibusdam perferendis eius. Officiis, veritatis corrupti
            eligendi sapiente alias commodi explicabo ipsam hic, ratione,
            voluptatibus pariatur vel magni ipsa quaerat.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            obcaecati numquam asperiores, corporis hic ad exercitationem, earum,
            cumque ipsam eos ipsum ut fugit! Vitae libero vero eum quis ad nemo.
          </Grid>
        </Grid>
      </Container>
      {/* <div className={classes.breadcrumbs}>

            </div> */}
    </div>
  );
};
