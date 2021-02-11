import React, { FunctionComponent } from 'react';
import { Server } from 'types/Server';

export type ServerItemProps = {
  server: Server;
};

export const ServerRowComponent: FunctionComponent<ServerItemProps> = ({
  server,
}) => {
  return (
    <div className={'row border-bottom server-row'}>
      {/* <div className={"col col-1 vip-star"}>
                <div className={"star-wrapper"}></div>
            </div> */}
      <div className={'col'}>
        <div className={'row'}>
          <div className={'col regular-text'} style={{ textAlign: 'left' }}>
            <span style={{ textOverflow: 'elipsis', wordBreak: 'keep-all' }}>
              {server.name}
            </span>
          </div>
          <div className={'col regular-text'} style={{ textAlign: 'left' }}>
            x100
          </div>
          <div className={'col regular-text'} style={{ textAlign: 'left' }}>
            {server.chronicles}
          </div>
          <div className={'col regular-text'}>{server.openDate}</div>
          <div
            className={'col col-12 notVip'}
            style={{ backgroundColor: '#d0d0d0' }}
          >
            <div className={'row'}>
              {server.rates.map(rate => {
                return (
                  <div className={'col'}>
                    {rate.type}: {rate.amount}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
