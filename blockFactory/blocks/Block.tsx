import * as React from 'react';
import {
  FC,
  PropsWithChildren, useEffect,
  useState,
} from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

import { InlineViewWrapper } from '../InlineViewWrapper';

import { IBlock } from '../../types';

export type IBlockProps<T> = IBlock<T> & IProps<T>;

export interface IViewProps<T> {
  values?: T;
  id: string;
  isEditMode?: boolean;
  dndProps: DraggableProvided;
  className?: string;
  onSubmit: (val: Partial<T>) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}

export interface IFormProps<T> {
  values?: T;
  id: string;
  blockActions: (submitForm: any) => void;
  onSubmit: (val: Partial<T>) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

interface IProps<T> {
  view: FC<IViewProps<T>>;
  form?: FC<IFormProps<T>>;
}

export function Block<T>(
  {
    values,
    id,
    onDelete,
    onSave,
    className,
    view: View,
    form: Form,
    dndProps,
  }: PropsWithChildren<IBlockProps<T>>,
) {
  const [isEditMode, setEditMode] = useState<boolean>();

  const onSubmit = (val: Partial<T>) => {
    setEditMode(false);
    onSave(id, val);
  };

  const onBlockDelete = onDelete ? () => onDelete(id) : undefined;

  if (Form && (!values || isEditMode)) {
    return (
      <div className={`w-full group mx-auto ${className}`}>
        <Form
          values={values as any}
          onSubmit={onSubmit as any}
          onDelete={onBlockDelete}
          onCancel={typeof isEditMode !== 'undefined' ? () => setEditMode(false) : undefined}
          id={id}
          blockActions={(submitForm: any) => (
            <InlineViewWrapper
              dndProps={dndProps}
              onSave={() => submitForm()}
              onDelete={onBlockDelete}
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className={`w-full group mx-auto ${className}`}>
      <View
        dndProps={dndProps}
        values={values}
        onSubmit={onSubmit}
        onDelete={onBlockDelete}
        isEditMode={isEditMode}
        id={id}
      >
        <InlineViewWrapper
          dndProps={dndProps}
          onEdit={isEditMode || !Form ? undefined : () => setEditMode(true)}
          onDelete={onBlockDelete}
        />
      </View>
    </div>
  );
}
