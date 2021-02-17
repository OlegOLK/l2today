import React from 'react';
import { Typography, Button } from '@material-ui/core';

export function QuizDescription() {
  return (
    <div>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Викторина
      </Typography>
      <Typography
        style={{ textAlign: 'center' }}
        component="div"
        variant="caption"
      >
        Статус: <em style={{ color: 'orange' }}>СТАРТ В МАРТЕ</em>
      </Typography>
      <Typography>
        Правила: <br />
      </Typography>
      <ol>
        <li>
          Вы должны быть залогинены для того что бы принять участие в викторине.
        </li>
        <li>Вы можете начать/закончить только 1 (одину) викторину за день.</li>
        <li>
          Вы не сможете начать новую викторину если у вас есть не выполененная
          до конца викторина.
        </li>
        <li>Каждый правильный ответ дает вам 1 балл викторины.</li>
        <li>
          В конце месяца ТОП 10 пользователей по баллам получат награды.
          <ul>
            <li>
              Если участников с одинаковым колличестов баллов будет больше
              больше 10, тогда определение 10 победителей будет сделанно с
              помощью РАНДОМАЙЗЕРА.
            </li>
            <li>
              Определение победителей будет происходить в прямом эфтре на{' '}
              <Button>Youtube</Button> и <Button>Twitch</Button>
            </li>
          </ul>
        </li>
        <li>
          Призы победителям от портала l2new - РЕАЛЬНЫЕ ДЕНЬГИ! Но так же могут
          быть и призы выдаваемые АДМИНИСТРАЦИЕЙ СЕРВЕРОВ Л2.
        </li>
        <li>
          ДЕНЕЖНЫЕ призы будут отправлены на любую карту\е-кошелек который вы
          укажете в профиле или же администрация l2new отправит каждому из
          победителей имейл с просьбой о предоставлении данных для перечесления
          денег.{' '}
        </li>
        <li>
          В конце каждого месяца результаты викторины будут опубликованны у нас
          на сайте <Button disabled>ТУТ</Button>, а так же в Discord.
        </li>
      </ol>
      <Button disabled title={'Старт в МАРТЕ'}>
        ПОГНАЛИ!
      </Button>
    </div>
  );
}

/*

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

            */
