import { Button, Container, List, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export const EventsPage: FunctionComponent = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2">Welcome on l2new events!</Typography>

      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        commodi illo eos neque exercitationem eum officiis ullam ad? Explicabo
        fugiat autem, illo animi dignissimos doloremque laborum quos nisi quae
        non? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Consectetur eum ipsum in vero laboriosam amet quia perferendis suscipit
        tenetur optio doloremque voluptate nostrum perspiciatis laborum, sequi
        expedita quibusdam corrupti soluta?Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Ullam, natus velit ratione quis eaque
        voluptatum soluta explicabo sed ipsam rerum voluptates. Asperiores
        recusandae laboriosam incidunt enim accusamus, libero ad earum.
      </Typography>
      <Typography>
        Rules: <br />
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
