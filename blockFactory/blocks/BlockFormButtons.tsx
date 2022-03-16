import * as React from 'react';

import { RectangleButton } from '../../../../components/Button';

import { ButtonColor } from '../../../../constants/button';

interface Props {
  onCancel?: () => void;
  submitTitle: string;
}

export const BlockFormButtons: React.FC<Props> = ({ onCancel, submitTitle }) => {
  return (
    <div className={'col-span-2 gap-4 flex flex-col md:flex-row p-0'}>
      <RectangleButton
        className="w-full"
        color={ButtonColor.Green}
        isSubmit
      >
        <span className="text-bold-20 py-4 flex justify-center items-center">
          {submitTitle}
        </span>
      </RectangleButton>
      {onCancel && (
        <RectangleButton
          onClick={() => onCancel()}
          className="w-full"
          color={ButtonColor.Green}
          isSubmit
        >
          <span className="text-bold-20 py-4 flex justify-center items-center">
            Отмена
          </span>
        </RectangleButton>
      )}
    </div>
  );
};
