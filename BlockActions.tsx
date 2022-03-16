import * as React from 'react';

import { Edit } from '../../components/Icon/Action/Edit';

interface Props {
  onDelete?: () => void;
  onEdit?: () => void;
}

export const BlockActions: React.FC<Props> = (
  {
    onEdit,
    children,
  },
) => {
  return (
    <div>
      <div
        className="absolute space-x-4 group-hover:visible invisible z-40"
        style={{
          top: 24,
          right: 24,
        }}
      >
        {children}
        {onEdit && (
          <button
            onClick={onEdit}
            className="focus:outline-none focus-visible:outline-black"
            type="button"
          >
            <div className="flex items-center space-x-2 bg-white p-2 rounded-md">
              <Edit className="h-4 w-4" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
