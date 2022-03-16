import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import { Next } from '../../components/Icon/Action/Next';
import { Prev } from '../../components/Icon/Action/Prev';

const UndoRedoTemplate: React.FC<any> = ({
  canUndo, canRedo, onUndo, onRedo,
}) => {
  const buttonClassName = 'text-bold-18 p-2 flex items-center justify-center';
  const disabledClassName = ' opacity-50 cursor-not-allowed';
  return (
    <div className="flex flex-row">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`${buttonClassName}${!canUndo && disabledClassName}`}
      >
        <Prev />
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`${buttonClassName}${!canRedo && disabledClassName}`}
      >
        <Next />
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  canUndo: state.blocks.past.length > 1,
  canRedo: state.blocks.future.length > 0,
});

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
});

export const UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UndoRedoTemplate);
