import { Container, Hidden } from '@material-ui/core';
import React, { FunctionComponent, Suspense } from 'react';
import { EvetnsFilterComponent } from 'app/components/Filter/events.filter';
import { FilterComponent } from 'app/components/Filter/filter';
import { Route, useRouteMatch } from 'react-router-dom';
import { EventsDescription } from './EventsDescription';
import { QuizDescription } from './QuizDescription';

export const EventsPage: FunctionComponent = () => {
  let { path } = useRouteMatch();
  return (
    <div style={{ position: 'relative', height: '100%', minHeight: '500px' }}>
      <Hidden mdDown>
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-30px',
            zIndex: -5,
          }}
        >
          <img
            src="/assets/happy.png"
            height="350px"
            width="auto"
            alt="happy user"
          />
        </div>
      </Hidden>
      <FilterComponent>
        <EvetnsFilterComponent />
      </FilterComponent>
      <Container maxWidth="md" style={{ marginTop: '15px' }}>
        <Suspense fallback={null}>
          <Route path={`${path}/quiz`} component={QuizDescription} />
          <Route exact path={`${path}`} component={EventsDescription} />
          {/* <Route path={`${path}/notifications`} component={Notification} />
          <Route path={`${path}/server/:serverId`} component={ServerRegion} />
          <Route exact path={`${path}`} component={UserInformation} /> */}
        </Suspense>

        {/* <Typography variant="h6" style={{ textAlign: 'center' }}>
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
          <Button>Go to quiz</Button> */}
      </Container>
    </div>
  );
};
