import React, { FunctionComponent } from 'react';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as obt } from '../ServerRow/svg/under-construction.svg';
import { ReactComponent as zbt } from '../ServerRow/svg/cauldron.svg';
import { ReactComponent as pts } from '../ServerRow/svg/crown.svg';
export type FeaturesProps = {
  features: string[];
  serverName: string;
  isTextVariant: boolean;
};

export const ServerFeature: FunctionComponent<FeaturesProps> = ({
  features,
  serverName,
  isTextVariant,
}) => {
  const featureIcons = [
    { name: 'obt', val: obt },
    { name: 'zbt', val: zbt },
    { name: 'pts', val: pts },
  ];

  return (
    <>
      {features.map(feature => {
        return (
          <Tooltip
            key={'tooltip-' + serverName + feature}
            placement="top"
            title={feature}
          >
            <IconButton
              // component={Link}
              // to={`/types/${feature}`}
              color={'primary'}
              aria-label={feature}
              size="small"
            >
              {isTextVariant ? (
                <Typography noWrap={true} variant="caption" color={'primary'}>
                  {feature.toUpperCase()}
                </Typography>
              ) : (
                <SvgIcon
                  component={
                    featureIcons.find(f => f.name === feature)?.val ?? obt
                  }
                  viewBox="0 0 512 512"
                />
              )}
            </IconButton>
          </Tooltip>
        );
      })}
    </>
  );
};
