import undoable from 'redux-undo';

const block = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_BLOCK':
      return {
        ...action.block,
      };
    case 'UPDATE_BLOCK':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        values: {
          ...state.values,
          ...action.block,
        },
      };
    default:
      return state;
  }
};

const blocks = (state: any[] = [], action: any) => {
  switch (action.type) {
    case 'SET_BLOCKS':
      return action.blocks;
    case 'ADD_BLOCK':
      return [
        ...state,
        block(action.block, action),
      ];
    case 'UPDATE_BLOCK':
      return state.map((t) => block(t, action));
    case 'DELETE_BLOCK':
      return state.filter((t) => action.id !== t.id);
    default:
      return state;
  }
};

const undoableBlocks = undoable(blocks);

export default undoableBlocks;
