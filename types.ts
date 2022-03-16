import { DraggableProvided } from 'react-beautiful-dnd';

export interface IBlock<T> {
  id: string;
  values: T;
  dndProps: DraggableProvided;
  isModalVisible?: boolean;
  className?: string;
  onDelete?: (id: string) => void;
  onSave: (id: string, newValue: any) => void;
}
