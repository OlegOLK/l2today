import { Button, Container, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export const EventsPage: FunctionComponent = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2">Ивенты от l2new уже тут!</Typography>

      <Typography>
        Привет чемпион! <br /> Ищешь способ развлечься или подзаработать
        аденки?! Тогда ты попал на правильный анонс. У нас ты сможешь нафармить
        на ПА и не только, все что нужно сделать залутать дроп с викторины или
        же залететь на любой другой ивент (список активных ивентов ниже на этой
        же странице) который сейчас активен на l2new.com!
      </Typography>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Викторина
      </Typography>
      <Typography
        style={{ textAlign: 'center' }}
        component="div"
        variant="caption"
      >
        Статус: <em style={{ color: 'green' }}>активен</em>
      </Typography>
      <Typography>
        Правила: <br />
      </Typography>
      <ol>
        <li>You should be logged in to start answer quiz qeustions</li>
        <li>You can start/conplete only 1 (one) quiz per day</li>
        <li>If will not have a new quiz until you complete started quiz</li>
        <li>Each correct answer will give you points</li>
        <li>
          By the end of each month TOP 10 users by points will recieve awards
          <ul>
            <li>
              If there will be more then 10 participants with higest number of
              points then we will use RANDOMIZER to identify our winners
            </li>
            <li>
              Winners will be chosen during online translation on{' '}
              <Button>youtube</Button> and <Button>Twitch</Button>
            </li>
          </ul>
        </li>
        <li>
          Awards from l2new is MONEY, but there could be some awards from
          SERVERS as well
        </li>
        <li>
          MONEY awards will be transefered to any of your wallets/cards that you
          provide in your PROFILE, or l2new administrators will reach everyone
          winner by email and ask for payment details.
        </li>
        <li>
          At the end of each month l2new stuff will publish event results{' '}
          <Button>HERE</Button>
        </li>
      </ol>
      <Button>Go to quiz</Button>
    </Container>
  );
};
