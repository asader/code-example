import * as React from 'react';

import { makeid } from '../../../utils/utils';

import { AlertBlock } from './blocks/AlertBlock/AlertBlock';
import { ButtonBlock } from './blocks/ButtonBlock/ButtonBlock';
import { DoubleImageBlock } from './blocks/DoubleImageBlock/DoubleImageBlock';
import { IframeBlock } from './blocks/IframeBlock/IframeBlock';
import { ImageBlock } from './blocks/ImageBlock/ImageBlock';
import { InterviewBlock } from './blocks/InterviewBlock/InterviewBlock';
import { QuoteBlock } from './blocks/QuoteBlock/QuoteBlock';
import { SliderBlock } from './blocks/SliderBlock/SliderBlock';
import { TextBlock } from './blocks/TextBlock/TextBlock';
import { Container } from '../../../components/Container';
import { InlineTextBlockFactory } from './InlineTextBlockFactory';

import { ComponentType } from '../../../definitions/component';
import { MessageType } from '../../../definitions/general';
import { BlockFactoryProps, ICreateBlockProps } from './types';

export const addQuoteBlock = ({ onCreateBlock }: BlockFactoryProps) => {
  onCreateBlock({
    id: makeid(8),
    view: QuoteBlock,
    values: undefined,
    type: ComponentType.QuoteImage,
  });
};

export const addImageBlock = ({ onCreateBlock }: BlockFactoryProps) => {
  onCreateBlock({
    id: makeid(8),
    view: ImageBlock,
    values: undefined,
    className: 'max-w-screen-4xl',
    type: ComponentType.BlogImage,
  });
};

export const addSliderBlock = ({ onCreateBlock }: BlockFactoryProps) => {
  onCreateBlock({
    id: makeid(8),
    view: SliderBlock,
    values: undefined,
    className: 'max-w-screen-xl',
    type: ComponentType.Carousel,
  });
};

export const addAlertBlock = ({ onCreateBlock }: BlockFactoryProps) => {
  onCreateBlock({
    id: makeid(8),
    view: AlertBlock,
    values: {
      type: MessageType.SUCCESS,
      hasIcon: false,
      color: 'transparent',
      cssClasses: '',
      content: undefined,
    },
    type: ComponentType.Message,
  });
};

export const addIframeBlock = ({ onCreateBlock }: BlockFactoryProps) => {
  onCreateBlock({
    id: makeid(8),
    view: IframeBlock,
    values: undefined,
    type: ComponentType.Iframe,
  });
};

export const addTextBlock = ({ onCreateBlock }: BlockFactoryProps, params?: ICreateBlockProps) => {
  onCreateBlock({
    id: makeid(8),
    view: TextBlock,
    values: undefined,
    className: 'max-w-4xl',
    type: ComponentType.HtmlText,
    ...params,
  });
};

export const addButtonBlock = ({ onCreateBlock }: BlockFactoryProps) => {
  onCreateBlock({
    id: makeid(8),
    view: ButtonBlock,
    values: undefined,
    type: ComponentType.Button,
  });
};

export const addDoubleImageBlock = ({ onCreateBlock }: BlockFactoryProps) => {
  onCreateBlock({
    id: makeid(8),
    view: DoubleImageBlock,
    values: undefined,
    type: ComponentType.BlogDoubleImage,
  });
};

export const addInterviewBlock = ({ onCreateBlock }: BlockFactoryProps) => {
  onCreateBlock({
    id: makeid(8),
    view: InterviewBlock,
    values: undefined,
    type: ComponentType.Interview,
  });
};
