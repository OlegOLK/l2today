import React, { FunctionComponent } from 'react';
import {
  Container,
  Divider,
  Grid,
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
            <Typography component="div">l2NEW.COM 2020-2021</Typography>
          </Grid>
          {/* <Grid item md={6}>
            <div>
              <Link>Home</Link>
            </div>
            <div>
              <Link>Add server</Link>
            </div>
            <div>
              <Link>Events</Link>
            </div>
          </Grid> */}
          <Grid item md={12}>
            <Typography variant="caption">
              FREE AND MOST FULL DATABASE OF LINEAGE 2 SERVERS
            </Typography>
            <Divider />
            <Typography
              variant="body2"
              style={{ marginBottom: '10px', marginTop: '10px' }}
            >
              &nbsp;На сайте l2new.com вы найдете самый полный список серверов
              Lineage 2. Мы собираем и дополняем нашу базу серверов каждый день
              для того что вы бы не упустили открытие любимого сервера. Под
              каждый сервер собирается детальная информация по хроникам, рейтам,
              дате открытия а так же особенностях сервера. Больше вам не нужно
              просматривать миллион анонсов в поисках нужного сервера т.к. наша
              база позволяет добавлять сервера без оплаты что в свою очередь
              позволяет собирать самую актуальную информацию по новым или
              открытым сервера.
            </Typography>
            <Divider />
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              &nbsp;Этот сайт создан специально геймерами для геймеров. Мы тоже
              устали скролить кучу топов в поисках уникальных проэктов, именно
              для вас мы стараемчя сделать ресурс который позволит забросить
              парсинг аносов в гугле. Все что нужно собрано в одном месте!
            </Typography>

            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              &nbsp;Кроме всего, мы решили что в ожидании открытия сервера было
              бы круто развлечь наших посетителей и дать им возможность
              подзаработать немного денег. На сайте l2new.com действуют крутые
              ивенты и акции которые позволят ТЕБЕ заработать денег на премак
              или другие ништяки на открытии сервера!
            </Typography>

            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              &nbsp;Ну и конечно же ПАТИ. Залетай к нам в{' '}
              <a
                href="https://discord.gg/kdsrYj4xj2"
                target="__blank"
                rel="noopener noreferrer"
                style={{ color: 'green' }}
              >
                DISCORD
              </a>
              . Там ты точно не будешь скучать - ивенты, поиски кп и просто
              флуд! Все это ждет тебя!
            </Typography>
          </Grid>
        </Grid>
      </Container>
      {/* <div className={classes.breadcrumbs}>

            </div> */}
    </div>
  );
};
