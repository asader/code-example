import * as React from 'react';
import { RefObject } from 'react';

import { Divider } from '../../../components/Divider';
import { List } from '../../../components/List';
import {
  addAlertBlock,
  addButtonBlock,
  addDoubleImageBlock,
  addIframeBlock,
  addImageBlock,
  addInterviewBlock,
  addQuoteBlock,
  addSliderBlock, addTextBlock,
} from './blockFactory';

import { BlockFactoryProps, IButtonProps } from './types';

const Button = ({ title, action, editorBottomRef }: IButtonProps & { editorBottomRef: RefObject<HTMLDivElement> }) => {
  const onClick = () => {
    action();
    setTimeout(() => {
      if (editorBottomRef.current) {
        const screenHeight = window.screen.height;
        const offsetTop = editorBottomRef.current?.offsetTop;
        const y = Math.abs(offsetTop + 77 + 115 - screenHeight);
        window.scrollTo(0, y);
      }
    }, 100);
  };
  return (
    <button type="button" onClick={onClick} className="w-full flex focus:outline-none focus-visible:outline-black hover:bg-n-20">
      <div className="text-bold-16 2xl:text-regular-18 px-2 2xl:px-4 py-2">
        <span>{title}</span>
      </div>
    </button>
  );
};

export const BlockButtonsList: React.FC<
BlockFactoryProps & { editorBottomRef: RefObject<HTMLDivElement> }
> = ({ onCreateBlock, editorBottomRef }) => {
  const blockFactoryButtons: any[] = [
    <Button
      title="Текст"
      editorBottomRef={editorBottomRef}
      action={() => addTextBlock({ onCreateBlock })}
    />,
    <Button
      title="Сообщение"
      editorBottomRef={editorBottomRef}
      action={() => addAlertBlock({ onCreateBlock })}
    />,
    <Button
      title="Цитата"
      editorBottomRef={editorBottomRef}
      action={() => addQuoteBlock({ onCreateBlock })}
    />,
    <Button
      title="Интервью"
      editorBottomRef={editorBottomRef}
      action={() => addInterviewBlock({ onCreateBlock })}
    />,

    <Divider className="h-full mx-2 border-solid border-gray-900 border-l-2" />,

    <Button
      title="Фото"
      editorBottomRef={editorBottomRef}
      action={() => addImageBlock({ onCreateBlock })}
    />,
    <Button
      title="Коллаж"
      editorBottomRef={editorBottomRef}
      action={() => addDoubleImageBlock({ onCreateBlock })}
    />,
    <Button
      title="Слайдер"
      editorBottomRef={editorBottomRef}
      action={() => addSliderBlock({ onCreateBlock })}
    />,

    <Divider className="h-full mx-2 border-solid border-gray-900 border-l-2" />,

    <Button
      title="Кнопка"
      editorBottomRef={editorBottomRef}
      action={() => addButtonBlock({ onCreateBlock })}
    />,
    <Button
      title="Iframe"
      editorBottomRef={editorBottomRef}
      action={() => addIframeBlock({ onCreateBlock })}
    />,
  ];

  return (
    <List
      className="flex flex-row items-center border-solid border-gray-900 border-2 rounded-lg overflow-hidden"
      dataSource={blockFactoryButtons}
      renderItem={(View) => View}
    />
  );
};
