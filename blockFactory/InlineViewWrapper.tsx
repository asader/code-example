import * as React from 'react';
import { RefObject, useMemo, useRef } from 'react';
import { DraggableProvided, DroppableProvidedProps } from 'react-beautiful-dnd';

import { Check, Close } from '../../../components/Icon/Action';
import { DnDIcon } from '../../../components/Icon/Action/DnDIcon';
import { Edit } from '../../../components/Icon/Action/Edit';
import { useElementSize } from '../../../hooks/useElementSize';
import { useWindowSize } from '../../../hooks/useWindowSize';

interface Props {
  onDelete?: () => void;
  onEdit?: () => void;
  onSave?: () => void;
  dependentRef?: RefObject<HTMLDivElement>;
  className?: string;
  isInline?: boolean;
  dndProps: DraggableProvided;
}

export const InlineViewWrapper: React.FC<Props> = ({
  onDelete, onEdit, onSave, dndProps, isInline, dependentRef,
}) => {
  const leftButtons = useRef<HTMLDivElement>(null);
  const rightButtons = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const elementSize = useElementSize(dependentRef, [dependentRef?.current?.className]);

  const calculatePosition = (button: RefObject<HTMLDivElement>) => {
    if (isInline || !button.current || !leftButtons.current || !rightButtons.current || !button.current.parentElement) {
      return 0;
    }
    const parentElementWidth = button.current.parentElement.offsetWidth;
    const bodyWith = window.document.body.offsetWidth;
    const buttonWith = button.current.offsetWidth;
    const leftButtonsWith = leftButtons.current.offsetWidth;
    const rightButtonsWith = rightButtons.current.offsetWidth;
    const padding = 8;
    const maxButtonWith = Math.max(leftButtonsWith, rightButtonsWith) + padding;

    if (maxButtonWith * 2 + parentElementWidth > bodyWith) {
      return 0;
    }
    return -(buttonWith + padding);
  };

  const leftPosition = useMemo(() => {
    return calculatePosition(leftButtons);
  }, [windowSize.width, elementSize.width]);

  const rightPosition = useMemo(() => {
    return calculatePosition(rightButtons);
  }, [windowSize.width, elementSize.width]);

  const leftClassName = isInline || leftPosition === 0 ? 'opacity-60' : 'rounded-lg';
  const rightClassName = isInline || rightPosition === 0 ? 'opacity-60' : 'rounded-lg';
  return (
    <>
      <div
        className="absolute top-0 h-full z-10"
        ref={leftButtons}
        style={{
          left: leftPosition,
        }}
      >
        <div
          className={`flex w-10 group-hover:visible invisible bg-n-20 hover:bg-n-40 h-full ${leftClassName}`}
          {...dndProps.dragHandleProps}
          draggable={false}
        >
          <div
            draggable={false}
            className="flex-grow flex items-center justify-center focus:outline-none focus-visible:outline-black"
          >
            <DnDIcon className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 right-0 h-full z-10 flex space-x-2"
        ref={rightButtons}
        style={{
          right: rightPosition,
        }}
      >
        {onEdit && (
          <div className={`flex w-10 h-10 group-hover:visible invisible bg-green-200 hover:bg-green-300 ${rightClassName}`}>
            <button
              type="button"
              className="flex-grow flex items-center justify-center focus:outline-none focus-visible:outline-black"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
            </button>
          </div>
        )}
        {onSave && (
          <div className={`flex w-10 h-10 group-hover:visible invisible bg-green-200 hover:bg-green-300 ${rightClassName}`}>
            <button
              type="button"
              className="flex-grow flex items-center justify-center focus:outline-none focus-visible:outline-black"
              onClick={onSave}
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className={`flex w-10 h-10 group-hover:visible invisible bg-red-200 hover:bg-red-300 ${rightClassName}`}>
          <button
            type="button"
            className="flex-grow flex items-center justify-center focus:outline-none focus-visible:outline-black"
            onClick={onDelete}
          >
            <Close className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};
