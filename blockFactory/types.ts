import { FC, RefObject } from 'react';

import { ComponentType } from '../../../definitions/component';
import { IBlock } from '../types';

export interface BlockFactoryProps {
  onCreateBlock: (block: ICreateBlockProps) => void;
}

export interface ICreateBlockProps {
  id: string;
  view: FC<IBlock<any>>;
  values?: any;
  className?: string;
  type: ComponentType;
}

export interface IButtonProps {
  title: string;
  action: () => void;
}
