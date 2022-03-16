import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { ICreateBlockProps } from './blockFactory/types';

interface BlockListProps {
  blocks: ICreateBlockProps[];
  onDelete: (id: string) => void;
  onBlockSubmit: (id: string, newValue: any) => void;
}

export const BlockList: React.FC<BlockListProps> = ({
  blocks,
  onDelete,
  onBlockSubmit,
}) => {
  return (
    <div className="">
      {blocks.map((
        {
          id,
          view: View,
          values,
          type,
          className,
        }, index,
      ) => (
        <Draggable draggableId={id} key={id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="pt-5 pb-5 md:pt-8 md:pb-7"
            >
              <View
                values={values}
                dndProps={provided}
                id={id}
                onDelete={() => onDelete(id)}
                onSave={onBlockSubmit}
                className={className}
              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};
