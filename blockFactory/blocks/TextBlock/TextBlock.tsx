import * as React from 'react';

import { Block } from '../Block';
import { TextView } from './TextView';

import { IBlock } from '../../../types';
import { TextProps } from './types';

export const TextBlock: React.FC<IBlock<TextProps>> = (props) => {
  return (
    <Block
      {...props}
      view={TextView}
    />
  );
};
